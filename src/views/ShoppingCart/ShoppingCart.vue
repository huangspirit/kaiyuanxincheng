<template>
  <div class="ShoppingCart">
    <div class="ShoppingCart-steps">
      <el-steps :active="this.$store.state.shoppingCart.active" align-center>
        <el-step title="购物车选择商品" description></el-step>
        <el-step title="填写订单信息"></el-step>
        <el-step title="签署合同"></el-step>
        <el-step title="支付订单"></el-step>
      </el-steps>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped>
@import "./ShoppingCart.less";
</style>

<script>

export default {
  name: "ShoppingCart",
  mounted(){

  }
};
</script>
