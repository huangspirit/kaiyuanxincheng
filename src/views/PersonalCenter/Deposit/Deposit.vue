<template>
  <div id="topupDeposit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>充值管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="cont">
      <div class="contWrap">
        <p class="tit">充值金额(RMB)</p>
        <ul class="topupAmount">
          <li
            v-for="(item,index) in descData"
            :class="item.show?'amountIndex':''"
            :key="index"
            @click="chooseAmount(index)"
          >{{item.credit}}</li>
        </ul>
        <p class="tit">充值方式：</p>
        <ul class="topupType">
          <li
            v-for="(item,index) in uptopType"
            :key="index"
            class="moneyList"
            :class="item.show?'active':''"
            @click="uptopClick(index)"
          >
            <img :src="item.imgUrl" alt />
            {{item.name}}
            <span class="mark" v-show="item.show">
              <i class="el-icon-check"></i>
            </span>
          </li>
        </ul>
        <ul class="topupType" v-if="qrcode">
          <li>
            <img :src="'data:image/png;base64,'+qrcode" alt />
          </li>
        </ul>
        <div class="color" v-if="isFF">温馨提示：
          系统检测到您是火狐浏览器，选择支付宝支付时如若失败请去支付宝官网下载安全控件
          </div>
      </div>
    </div>
    <div v-html="formhtml" ref="formwrap"></div>
  </div>
</template>
<script>
import "./Deposit.less";
import { axios, topupDeposit } from "@/api/apiObj.js";
import { setInterval } from "timers";
import { async } from "q";
import { mapState } from "vuex";
export default {
  name: "Deposit",
  data() {
    return {
      uptopType: [
        {
          name: "微信",
          show: false,
          id: 1,
          imgUrl: require("@/assets/image/icon/weichat.png")
        },
        {
          name: "支付宝",
          show: false,
          id: 2,
          imgUrl: require("@/assets/image/icon/zhifubao.png")
        }
      ],
      descData: [],
      vipDesc: "",
      amountIndex: "",
      qrcode: "",
      amount: "",
      countNum: 0,
      noParams: "",
      timer: null,
      isNeedTimer: false,
      formhtml: ""
    };
  },
  computed: {
    ...mapState({
      isFF: state => state.isFF
    })
  },
  mounted() {
    this.getDepositList();
  },
  destroyed() {
    this.isNeedTimer = false;
  },
  methods: {
    getDepositList() {
      var obj = {
        start: 0,
        length: 10,
        is_enable: true
      };
      axios
        .request({ ...topupDeposit.getDepositList, params: obj })
        .then(res => {
          if (res.resultCode == "200") {
            this.descData = res.data.data;
            for (var i = 0; i < this.descData.length; i++) {
              this.descData[i]["show"] = false;
            }
          }
        });
    },
    chooseAmount(index) {
      this.countNum = 0;
      clearTimeout(this.timer);
      for (var i = 0; i < this.descData.length; i++) {
        this.descData[i].show = false;
      }
      this.descData[index].show = true;
      this.descData = Object.assign([], this.descData);
      for (var i = 0; i < this.uptopType.length; i++) {
        this.uptopType[i].show = false;
      }
      this.qrcode = "";
      this.amount = this.descData[index].credit;
    },
    getWechatPayVip() {
      var obj = {
        amount: this.amount
      };
      axios
        .request({ ...topupDeposit.getWechatPayVip, params: obj })
        .then(res => {
          if (res.resultCode == "200") {
            if (res.data) {
              let str = res.data.prepay_id.replace(/\. +/g, "");
              str = str.replace(/[\r\n]/g, "");
              this.qrcode = str;
              this.noParams = res.data.no;
              this.isNeedTimer = true;
              this.countNum = 0;
              this.getResult();
              //  this.queryUserVipConsumeDetail();
            }
          }
        });
    },
    pagePayDeposit() {
      var obj = {
        amount: this.amount
      };
      axios
        .request({ ...topupDeposit.pagePayDeposit, params: obj })
        .then(res => {
          this.formhtml = res.data.prepay_id;
          let _this = this;
          setTimeout(function() {
            _this.$refs.formwrap.getElementsByTagName("form")[0].charset =
              "UTF-8";
            _this.$refs.formwrap.getElementsByTagName("form")[0].target =
              "_blank";
            _this.$refs.formwrap.getElementsByTagName("form")[0].submit();
          }, 0);
          return;
          const div = document.createElement("divform");
          div.innerHTML = res.data.prepay_id;
          document.body.appendChild(div);
          document.forms[0].charset = "UTF-8";
          document.forms[0].target = "_blank";
          document.forms[0].submit();
        });
    },
    getResult() {
      let _this = this;
      if (!this.isNeedTimer) {
        clearTimeout(this.timer);
        return;
      }
      this.timer = setTimeout(function() {
        _this.countNum++;
        axios
          .request({
            ...topupDeposit.queryUserVipConsumeDetail,
            params: { no: _this.noParams }
          })
          .then(res => {
            if (res) {
              if (res.data == "1") {
                _this.$message.success("充值成功");
                _this.$router.push("/PersonalCenter");
              } else if (res.data == "0") {
                if (_this.countNum >= 60) {
                  clearTimeout(_this.timer);
                  _this.qrcode = "";
                  _this.$message({
                    type: "warning",
                    message: "请重新获取支付二维码"
                  });
                } else {
                  _this.getResult();
                }
              }
            }
          });
      }, 1000);
    },
    queryUserVipConsumeDetail() {
      let time = setTimeout(() => {
        if (this.countNum >= 60) {
          clearTimeout(time);
          this.qrcode = "";
          this.$message({
            type: "warning",
            message: "请重新获取支付二维码"
          });
          return;
        }
        this.countNum++;
        axios
          .request({
            ...topupDeposit.queryUserVipConsumeDetail,
            params: { no: this.noParams }
          })
          .then(res => {
            if (res.resultCode == "200") {
              if (res.data == "0") {
                this.queryUserVipConsumeDetail();
                clearTimeout(time);
              }
              clearTimeout(time);
              if (res.data == "1") {
                this.$message.success("充值成功");
                clearTimeout(time);
                this.$router.push("/PersonalCenter/PersonalSet");
              }
            }
          });
      }, 1000);
    },
    uptopClick(index) {
      if (index == 0) {
        if (this.amount == "") {
          this.$message({
            type: "warning",
            message: "请选择金额"
          });
        } else {
          for (var i = 0; i < this.uptopType.length; i++) {
            this.uptopType[i].show = false;
          }
          this.uptopType[index].show = true;
          this.getWechatPayVip();
        }
      } else if (index == 1) {
        //标识支付宝

        this.isNeedTimer = false;
        this.countNum = 0;
        this.qrcode = "";
        if (this.amount == "") {
          this.$message({
            type: "warning",
            message: "请选择金额"
          });
        } else {
          for (var i = 0; i < this.uptopType.length; i++) {
            this.uptopType[i].show = false;
          }
          this.uptopType[index].show = true;
          this.pagePayDeposit();
        }
      }
    }
  }
};
</script>
<style scoped>
</style>
