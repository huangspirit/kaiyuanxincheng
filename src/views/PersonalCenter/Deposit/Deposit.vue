<template>
  <div id="topupDeposit">
    <h3>充值</h3>
    <div>
      <ul class="topupAmount">
        <span>充值金额：</span>
        <li
          v-for="(item,index) in descData"
          :class="item.show?'amountIndex':''"
          :key="index"
          @click="chooseAmount(index)"
        >{{item.credit}}</li>
      </ul>
      <ul class="topupType">
        <span>充值方式：</span>
        <li
          v-for="(item,index) in uptopType"
          :key="index"
          class="moneyList"
          :class="item.show?'active':''"
          @click="uptopClick(index)"
        >{{item.name}}</li>
      </ul>
      <ul class="topupType" v-if="qrcode">
        <span></span>
        <li>
          <img :src="'data:image/png;base64,'+qrcode" alt />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import "./Deposit.less";
import { axios, topupDeposit } from "@/api/apiObj.js";
import { setInterval } from "timers";
import { async } from "q";
export default {
  name: "Deposit",
  data() {
    return {
      uptopType: [
        {
          name: "微信",
          show: false,
          id: 1
        },
        {
          name: "支付宝",
          show: false,
          id: 2
        }
      ],
      descData: [],
      vipDesc: "",
      amountIndex: "",
      qrcode: "",
      amount: "",
      countNum: 0,
      noParams:""
    };
  },
  mounted() {
    this.getDepositList();
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
          console.log(res);
          if (res.resultCode == "200") {
            this.descData = res.data.data;
            for (var i = 0; i < this.descData.length; i++) {
              this.descData[i]["show"] = false;
            }
          }
        });
    },
    chooseAmount(index) {
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
      console.log(this.amount);
      var obj = {
        amount: this.amount
      };
      axios
        .request({ ...topupDeposit.getWechatPayVip, params: obj })
        .then(res => {
          console.log(res);
          if (res.resultCode == "200") {
            if (res.data) {
              let str = res.data.prepay_id.replace(/\. +/g, "");
              str = str.replace(/[\r\n]/g, "");
              this.qrcode = str;
              this.noParams = res.data.no;
              this.queryUserVipConsumeDetail();
            }
          }
        });
    },
    pagePayDeposit() {
      var obj = {
        amount: this.amount
      };

      console.log(this.$refs);
      axios
        .request({ ...topupDeposit.pagePayDeposit, params: obj })
        .then(res => {
          const div = document.createElement("divform");
          div.innerHTML = res.data.prepay_id;
          document.body.appendChild(div);
          document.forms[0].charset = "UTF-8";
          document.forms[0].target = "_blank";
          document.forms[0].submit();
        });
    },
    queryUserVipConsumeDetail() {
      var time = setTimeout(() => {
        if (this.countNum >= 60) {
          clearInterval(time);
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
                clearInterval(time);
              }
              clearInterval(time);
              if (res.data == "1") {
                this.$message.success("充值成功");
                clearInterval(time);
                this.$router.push('/PersonalCenter/PersonalSet')
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