<template>
  <div>
    <div class="BuyerCenter">
      <div class="user clear">
        <div class="username clear fl">
          <el-upload
            class="upload-demo fl"
            :action="requestUrl"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            title="点击更换"
          >
            <img :src="UserInforma.headImgUrl" class="head-portrait" alt />
            <div class="vipwrap" v-if="UserInforma.userTagMap.vip">
              <img src="@/assets/image/icon/VIP.png" alt />
              <span
                class="vipLevel"
              >{{UserInforma.userTagMap.vipLevel?UserInforma.userTagMap.vipLevel:0}}</span>
            </div>
          </el-upload>
          <div class="info fl">
            <p class="name" style="overflow:hidden;max-width:200px;">
              {{UserInforma.nickname}}
              <img
                src="@/assets/image/icon/edit.png"
                style="height:15px;margin-left:15px;cursor:pointer;"
                @click="editUserName"
                title="更新用户名称"
              />
            </p>
            <p>
              <span class="type color" v-if="UserInforma.userTagMap.vip">月结用户</span>
              <span
                class="type color"
                v-if="UserInforma.userTagMap.seller && UserInforma.userTagMap.tag!=3"
              >{{UserInforma.userTagMap.tag | tagFilter}}</span>
              <router-link
                to="/OriginalFactoryEntry"
                tag="span"
                class="type color"
                v-if="!UserInforma.userTagMap.seller"
                style="cursor:pointer;"
              >申请入驻</router-link>
            </p>
            <!-- <p>信用等级：{{UserInforma.userTagMap.userLevel}}</p> -->
          </div>
        </div>
        <div class="right">
          <ul class="clear">
            <li>
              <div class="cont">
                <p class="money">{{UserInforma.userTagMap.wallet | toFixed(2)}}</p>
                <p class="desc">钱包余额（元）</p>
                <p class="router">
                  <a
                    href="javascript:;"
                    @click="withDraw"
                    v-if="UserInforma.userTagMap.wallet>10"
                  >提现</a>&nbsp;&nbsp;
                  <a v-if="UserInforma.userTagMap.wallet>10">|&nbsp;&nbsp;</a>
                  <router-link to="/PersonalCenter/withdraw">提现管理</router-link>&nbsp;&nbsp;
                  <a>|&nbsp;&nbsp;</a>
                  <router-link to="/PersonalCenter/buyerDetailList">明细</router-link>
                </p>
              </div>
            </li>
            <li>
              <div class="cont">
                <p class="money">{{UserInforma.userTagMap.dou | toFixed(0) }}</p>
                <p class="desc">晶豆（个）</p>
                <p class="router">
                  <!-- <a href="javascript:;" @click="withDraw" v-if="UserInforma.userTagMap.wallet>10">提现</a>&nbsp;&nbsp; -->
                  <!-- <a v-if="UserInforma.userTagMap.wallet>10">|&nbsp;&nbsp;</a>
                <router-link to="/PersonalCenter/withdraw">提现管理</router-link>&nbsp;&nbsp;
                  <a>|&nbsp;&nbsp;</a>-->
                  <a href="javascript:;">
                    获取原则及使用方法
                    <div class="cont">
                      <h2>晶豆是大麦晶城的内部虚拟货币</h2>
                      <div class="title">一、如何获取晶豆？</div>
                      <div>
                        <p>
                         ① 用户连续
                          <label class="blu">3</label>个月如期付款可获得10个晶豆
                        </p>
                        <p>
                         ② 用户连续
                          <label class="blu">6</label>个月如期付款可获得30个晶豆
                        </p>
                        <p>
                        ③  用户连续
                          <label class="blu">12</label>个月如期付款可获得100个晶豆
                        </p>
                      </div>
                      <div class="title">二、晶豆的功能</div>
                      <div>
                        <p>1.晶豆主要用来实现平台对用户各种行为的奖励，以及用于兑换平台的道具与推广功能等；</p>
                        <p>2.买家用于兑换月结额度，每一个晶豆可以兑换月结额度100元；</p>
                        <p>3.卖家用于兑换售卖额度，每一个晶豆可以兑换售卖额度100元；</p>
                        <p>4.兑换现金,兑换现金后可直接提现，一颗晶豆可兑现金2元；</p>
                      </div>
                    </div>
                  </a>
                  <!-- <router-link to="/PersonalCenter/buyerDetailList">获取原则及使用方法</router-link> -->
                </p>
              </div>
            </li>
            <li v-if="UserInforma.userTagMap.vip">
              <div class="cont yajin">
                <p class="money">{{UserInforma.userTagMap['restcredit-vip'] |toFixed(2)}}</p>
                <p class="desc">剩余月结额度（元）</p>
                <p class="router">
                  <span>月结额度：{{UserInforma.userTagMap['credit-vip'] | toFixed(0)}}</span>&nbsp;&nbsp;
                  <a>|&nbsp;&nbsp;</a>
                  <router-link to="/PersonalCenter/vipDetailList" class="route">明细</router-link>
                </p>
              </div>
              <!-- <div class="cont circle clear">
                            <el-progress type="circle" :width="70" :percentage="creditvipPercente"  class="fl"></el-progress>
                            <div class="text fl">
                                <p class="desc">
                                    月结额度:{{UserInforma.userTagMap['credit-vip'] }}
                                </p>
                                <p class="rest">剩余额度：{{UserInforma.userTagMap['restcredit-vip']}}</p>
                                <router-link to="/PersonalCenter/vipDetailList" class="route">额度明细</router-link>
                            </div>
              </div>-->
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品状态 -->
      <ul class="goods-state">
        <router-link tag="li" :to="item.path" v-for="(item,index) in messageCount" :key="index">
          <div>
            <!--                    <div class="img">-->
            <!--                        <img :src="item.imgUrl" alt>-->
            <!--                    </div>-->
            <p class="name">{{item.name}}</p>
            <template>
              <p class="desc" v-if="item.num">
                您有
                <span class="color">{{item.num}}</span>
                {{item.desc}}
              </p>
              <p v-else class="desc">{{item.nocont}}</p>
            </template>
            <p class="num">
              {{item.num}}
              <i class="el-icon-arrow-right fr"></i>
            </p>
          </div>
        </router-link>
        <!--            <router-link tag="li" to="BuyerOrderManagement">-->
        <!--                <div class="img">-->
        <!--                    <img src="@/assets/image/PersonalCenter/u37206.png" alt>-->
        <!--                </div>-->
        <!--                <p>我的订单</p>-->
        <!--                <p class="num">11</p>-->
        <!--            </router-link>-->
      </ul>
      <!-- 品牌入驻 -->
      <!--      <div class="brands">-->
      <!--        <span>品牌入驻</span>-->
      <!--      </div>-->
    </div>
    <el-dialog :visible.sync="showinputPassword" width="500px">
      <p slot="title" class="title">输入交易密码</p>
      <div>
        <el-input placeholder="请输入交易密码" v-model="inputpassword" show-password></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showinputPassword = false">取 消</el-button>
        <el-button type="primary" @click="checkpassword">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showinputwithdrawTotal" width="700px" class="withdrawApplyTotal">
      <p slot="title" class="title">
        <strong>钱包余额：￥{{UserInforma.userTagMap.wallet | toFixed(2)}}</strong>
      </p>
      <div class="withdrawApplyTotalCont">
        <el-input
          placeholder="请输入提现金额"
          v-model="withdrawApplyTotal"
          @input="changewithdrawApplyTotal"
        ></el-input>
        <div v-if="withdrawApplyTotal" class="clear">
          <div class="withdrawCharge">
            手续费：
            <span class="color">￥{{withdrawApplyTotalObj.withdrawCharge | toFixed(2)}}</span>
            <div class="desc">
              <i class="el-icon-question color"></i>
              <div class="cont">
                <p>
                  <strong>手续费说明</strong>
                </p>
                <p>当单笔提现金额 < 1500元，y=2元+提现金额*0.55%</p>
                <p>当单笔提现金额≥1500元，y=提现金额*0.7%</p>
                <br />
                <p>当天17:00点前申请提现的，提现金额当日到账；</p>
                <p>当天17:00点后申请提现的，提现金额次日到账；</p>
                <p>周末及节假日申请提现的，提现金额将在下个工作日到账；</p>
                <br />
                <p>温馨提示：单笔提现金额≥1500为最优提现方案</p>
              </div>
            </div>
          </div>
          <p>
            实际提现金额：
            <span class="color">￥{{withdrawApplyTotalObj.withdrawRealityTotal | toFixed(2)}}</span>
          </p>
          <p>
            申请提现金额：
            <span class="color">￥{{withdrawApplyTotalObj.withdrawApplyTotal | toFixed(2)}}</span>
          </p>
          <ul v-if="bankList.length">
            <li class="title">
              <span>提现方式</span>
              <span>账号</span>
              <span>账户名</span>
            </li>
            <li
              v-for="(item,k) in bankList"
              :class="selectedBank==k?'bgColor':''"
              :key="k"
              @click="selectedBank=k"
            >
              <span>{{item.bankCode | filterBankCode}}</span>
              <span>{{item.bankNumber}}</span>
              <span>{{item.cnname}}</span>
            </li>
          </ul>
          <router-link
            v-if="bankList.length==0"
            to="/PersonalCenter/withdraw"
            class="band"
          >没有提现账号，去绑定</router-link>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showinputwithdrawTotal = false">取 消</el-button>
        <el-button type="primary" @click="saveDraw">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { axios, personCenter, common } from "../../../api/apiObj";
import { baseURL } from "@/config";
export default {
  name: "BuyerCenter",
  data() {
    return {
      UserInforma: {
        userTagMap: {}
      },
      access_token: sessionStorage.getItem("access_token"),
      refresh_token: sessionStorage.getItem("refresh_token"),
      showinputPassword: false,
      inputpassword: "",
      showinputwithdrawTotal: false,
      withdrawApplyTotal: "",
      withdrawApplyTotalObj: {},
      bankList: [],
      selectedBank: 0,
      messageCount: {
        orderCount: {
          name: "我的订单",
          imgUrl: require("@/assets/image/PersonalCenter/u37206.png"),
          num: 0,
          path: "BuyerOrderManagement",
          desc: "个订单，点击查看",
          nocont: "您还没有下过订单呦"
        },
        sgoods: {
          name: "询价篮",
          imgUrl: require("@/assets/image/PersonalCenter/u37824.png"),
          num: 0,
          path: "/InquiryBasket/Inquiry/waitInquiry",
          desc: "个询价，点击查看",
          nocont: "您还未做任何商品询价"
        },
        ssller: {
          name: "购物车",
          imgUrl: require("@/assets/image/PersonalCenter/u25552.png"),
          num: 0,
          path: "/ShoppingCart",
          desc: "个商品躺在购物车中，点击查看",
          nocont: "购物车空空如也"
        },
        fgoods: {
          name: "关注商品",
          imgUrl: require("@/assets/image/PersonalCenter/u37868.png"),
          num: 0,
          path: "CommoditiesInterest",
          desc: "个关注的商品，点击查看",
          nocont: "您还没有关注任何商品，继续逛逛吧"
        },
        message: {
          name: "我的消息",
          imgUrl: require("@/assets/image/PersonalCenter/u37838.png"),
          num: 0,
          path: "/News",
          desc: "条信息，点击查看",
          nocont: "您还没有任何信息呢"
        },
        fsller: {
          name: "关注商家",
          imgUrl: require("@/assets/image/PersonalCenter/u37882.png"),
          num: 0,
          path: "MerchantsConcerned",
          desc: "个关注的商家，点击查看",
          nocont: "您还没有关注任何商家，继续逛逛吧"
        },
        address: {
          name: "收货地址",
          imgUrl: require("@/assets/image/PersonalCenter/u37900.png"),
          num: 12,
          path: "/PersonalCenter/ShippingAddress",
          desc: "个收货地址，点击管理",
          nocont: "您还没有收货地址呢，点击添加"
        }
      }
    };
  },
  filters: {
    filterBankCode(val) {
      switch (val) {
        case "ICBC":
          return "工商银行";
        case "ABC":
          return "农业银行";
        case "CCB":
          return "建设银行";
        case "CMB":
          return "招商银行";
        case "COMM":
          return "交通银行";
        case "alipay":
          return "支付宝";
      }
    }
  },
  computed: {
    creditvipPercente() {
      if (
        this.UserInforma.userTagMap &&
        this.UserInforma.userTagMap["restcredit-vip"]
      ) {
        return parseFloat(
          (
            (this.UserInforma.userTagMap["restcredit-vip"] /
              this.UserInforma.userTagMap["credit-vip"]) *
            100
          ).toFixed(1)
        );
      }
    },
    requestUrl() {
      return (
        baseURL + `api-u/files/uploadHead?access_token=${this.access_token}`
      );
    }
  },
  methods: {
    ...mapActions("Login", ["GetUserInforma"]),
    editUserName() {
      this.$prompt("更新用户昵称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.UserInforma.nickname
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          axios
            .request({
              ...common.resetme,
              method: "put",
              data: { nickname: value }
            })
            .then(res => {
              if (res) {
                //更新用户信息
                // this.all()
                axios
                  .request({
                    url:
                      common.refresh_token.url +
                      "?refresh_token=" +
                      this.refresh_token,
                    method: "post",
                    data: { refresh_token: this.refresh_token }
                  })
                  .then(res => {
                    console.log(res);
                    sessionStorage.setItem("refresh_token", res.refresh_token);
                    sessionStorage.setItem("access_token", res.access_token);
                    this.refresh_token = res.refresh_token;
                    this.access_token = res.access_token;
                    this.all();
                  });
              }
            });
        })
        .catch(() => {});
    },
    handleAvatarSuccess(res) {
      axios
        .request({
          ...common.resetme,
          method: "put",
          data: { headImgUrl: res.data }
        })
        .then(res => {
          if (res) {
            //更新用户信息
            // this.all()
            axios
              .request({
                url:
                  common.refresh_token.url +
                  "?refresh_token=" +
                  this.refresh_token,
                method: "post",
                data: { refresh_token: this.refresh_token }
              })
              .then(res => {
                console.log(res);
                sessionStorage.setItem("refresh_token", res.refresh_token);
                sessionStorage.setItem("access_token", res.access_token);
                this.refresh_token = res.refresh_token;
                this.access_token = res.access_token;
                this.all();
              });
          }
        });
    },
    changewithdrawApplyTotal(k) {
      let obj = this.withdrawApplyTotal;
      obj = obj.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      obj = obj.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      obj = obj
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, "$1$2.$3"); //只能输入4个小数
      if (obj.indexOf(".") < 0 && obj != "") {
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj = parseFloat(obj);
      }
      if (obj > this.UserInforma.userTagMap.wallet) {
        this.withdrawApplyTotal = (obj + "").substring(0, obj.length - 2);
      } else {
        this.withdrawApplyTotal = obj;
      }
      if (this.withdrawApplyTotal) {
        axios
          .request({
            ...personCenter.count,
            params: { withdrawApplyTotal: this.withdrawApplyTotal }
          })
          .then(res => {
            this.withdrawApplyTotalObj = res.data;
          });
      }
    },
    //提现的相关操作
    withDraw() {
      //先验证是否设置提现密码
      this.inputpassword = "";
      axios.request(personCenter.checkSetPassword).then(res => {
        if (res.data == 1) {
          this.showinputPassword = true;
        } else {
          //需要新增
          this.$prompt("请设置提现密码", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(({ value }) => {
              //校验密码
              axios
                .request({
                  ...personCenter.savedrawPassword,
                  data: { password: value }
                })
                .then(res => {
                  console.log(res);
                  if (res) {
                    this.showinputPassword = false;
                    this.showinputwithdrawTotal = true;
                    axios
                      .request({
                        ...personCenter.getBankList,
                        params: {
                          start: 0,
                          length: 100
                        }
                      })
                      .then(res => {
                        console.log(res);
                        this.bankList = res.data.data;
                      });
                  }
                });
            })
            .catch(() => {});
        }
      });
    },
    checkpassword() {
      axios
        .request({
          ...personCenter.checkdrawPassword,
          data: { password: this.inputpassword }
        })
        .then(res => {
          console.log(res);
          if (res) {
            this.showinputPassword = false;
            this.showinputwithdrawTotal = true;
            axios
              .request({
                ...personCenter.getBankList,
                params: {
                  start: 0,
                  length: 100
                }
              })
              .then(res => {
                console.log(res);
                this.bankList = res.data.data;
              });
          }
        });
    },
    saveDraw() {
      let obj = {
        withdrawBankId: this.bankList[this.selectedBank].id,
        ...this.withdrawApplyTotalObj
      };
      axios.request({ ...personCenter.saveDraw, data: obj }).then(res => {
        if (res) {
          this.showinputwithdrawTotal = false;
          this.all();
        }
      });
    },
    all() {
      this.GetUserInforma().then(res => {
        sessionStorage.setItem("UserInforma", JSON.stringify(res));
        this.UserInforma = res;
      });
    },
    queryCustomerCenterSummary() {
      axios.request(personCenter.queryCustomerCenterSummary).then(res => {
        let obj = res.data;
        Object.keys(res.data).forEach(item => {
          this.$set(this.messageCount[item], "num", obj[item]);
        });
      });
    }
  },
  mounted() {
    this.all();
    this.queryCustomerCenterSummary();
  }
};
</script>

<style lang="less" scoped>
@import "./BuyerCenter.less";
</style>
