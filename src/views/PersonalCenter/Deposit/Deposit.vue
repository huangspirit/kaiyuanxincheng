<template>
  <div id="topupDeposit">
    <h3>充值</h3>
    <div>
      <div class="topupMoney">
        <span>充值金额：</span>
        <el-input v-model="amount" placeholder="请输入金额"></el-input>
      </div>
      <ul class="topupAmount">
        <li
          v-for="(item,index) in descData"
          @click="chooseAmount(index)"
          :class="item.id == amountIndex?'amuntActive':''"
          :key="index"
        >{{item.credit}}</li>
      </ul>
      <ul class="topupType">
        <span>充值方式：</span>
        <li
          v-for="(item,index) in uptopType"
          :key="index"
          :class="item.show?'active':''"
          @click="uptopClick(index)"
        >{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import "./Deposit.less";
import { axios, topupDeposit } from "@/api/apiObj.js";
export default {
  name: "Deposit",
  data() {
    return {
      uptopType: [
        {
          name: "微信",
          show: true,
          id: 1
        },
        {
          name: "支付宝",
          show: false,
          id: 2
        },
        {
          name: "转账",
          show: false,
          id: 3
        }
      ],
      descData: [],
      vipDesc: "",
      amount: "",
      amountIndex: ""
    };
  },
  mounted() {
    this.getDepositList();
    // this.getWechatPayVip();
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
          }
        });
    },
    chooseAmount(index) {
      this.amountIndex = index + "";
    },
    // getWechatPayVip() {
    //   var obj = {
    //     amount: 400
    //   };
    //   axios
    //     .request({ ...topupDeposit.getWechatPayVip, params: obj })
    //     .then(res => {
    //       console.log(res);
    //     });
    // },
    uptopClick(index) {
      for (var i = 0; i < this.uptopType.length; i++) {
        this.uptopType[i].show = false;
      }
      this.uptopType[index].show = true;
    }
  }
};
</script>
<style scoped>
</style>