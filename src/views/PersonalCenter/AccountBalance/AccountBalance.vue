<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>账户余额</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="AccountBalance">
      <p>
        <span>账户余额</span>
        <span class="withdrawal">余额提现</span>
        <span class="top-up">余额充值</span>
      </p>
      <table>
        <thead>
          <th>操作金额</th>
          <th>操作类型</th>
          <th>操作时间</th>
          <th>操作后余额</th>
          <th>备注说明</th>
        </thead>
        <tbody>
          <tr v-for="(item, k) in list" :key="`list_${k}`">
            <td :class="{addCol:item.amount > 0, delCol:item.amount < 0 }">{{item.amount}}</td>
            <td>{{item.type}}</td>
            <td>{{item.time}}</td>
            <td>{{item.balance}}</td>
            <td>
              <span>{{item.note}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: "AccountBalance",
  data() {
    return {
      list: [
        {
          amount: 10000,
          type: "充值",
          time: "2019-06-15 22:10:22",
          balance: 2000,
          note: "订单：22122020021"
        },
        {
          amount: -10000,
          type: "充值",
          time: "2019-06-15 22:10:22",
          balance: 2000,
          note: "订单：22122020021"
        },
        {
          amount: 10000,
          type: "充值",
          time: "2019-06-15 22:10:22",
          balance: 2000,
          note: "订单：22122020021"
        },
        {
          amount: -10000,
          type: "充值",
          time: "2019-06-15 22:10:22",
          balance: 2000,
          note: "订单：22122020021"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
  @import "./AccountBalance.less";
</style>

