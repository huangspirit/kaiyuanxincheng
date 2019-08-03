<template>
  <div class="ShoppingCart">
    <div class="ShoppingCart-steps">
<!--        <div class="item active">-->
<!--            <div class="dot"></div>-->
<!--            <div class="line"></div>-->
<!--            <div class="txt">购物车选择商品</div>-->
<!--        </div>-->
<!--        <div  class="item">-->
<!--            <div class="dot"></div>-->
<!--            <div class="line"></div>-->
<!--            <div class="txt">核对订单信息</div>-->
<!--        </div>-->
<!--        <div  class="item">-->
<!--            <div class="dot"></div>-->
<!--            <div class="line"></div>-->
<!--            <span class="txt">签署合同</span>-->
<!--        </div>-->
<!--        <div  class="item">-->
<!--            <div class="dot"></div>-->
<!--            <div class="txt">支付订单</div>-->
<!--        </div>-->
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
