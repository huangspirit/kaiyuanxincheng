<template>
  <div class="ShoppingCart">
      <div class="shoppingCartWrap allWidth">
      <div class="step">
        <ul>
          <li class="item" :class="this.$store.state.shoppingCart.active>=0?'active':''">
            <img src="@/assets/image/ShoppingCart/icon/1.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/1a.png" class="img active" alt="">
            <span>购物车</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
           <li class="item" :class="this.$store.state.shoppingCart.active>=0?'active':''">
            <img src="@/assets/image/ShoppingCart/icon/2.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/2a.png" class="img active" alt="">
            <span>选择型号</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
           <li class="item" :class="this.$store.state.shoppingCart.active>=1?'active':''" >
            <img src="@/assets/image/ShoppingCart/icon/3.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/3a.png" class="img active" alt="">
            <span>去结算</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
           <li class="item" :class="this.$store.state.shoppingCart.active>=1?'active':''">
            <img src="@/assets/image/ShoppingCart/icon/4.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/4a.png" class="img active" alt="">
            <span>收货地址<br>开票信息</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
           <li class="item" :class="this.$store.state.shoppingCart.active>=4?'active':''">
            <img src="@/assets/image/ShoppingCart/icon/5.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/5a.png" class="img active" alt="">
            <span>付款</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
           <li class="item"  :class="this.$store.state.shoppingCart.active>=5?'active':''">
            <img src="@/assets/image/ShoppingCart/icon/6.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/6a.png" class="img active" alt="">
            <span>签署合同</span>
             <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li> 
          <li :class="this.$store.state.shoppingCart.active>=5?'active':''">
            <img src="@/assets/image/ShoppingCart/icon/7.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/7a.png" class="img active" alt="">
            <span>发&nbsp;&nbsp;&nbsp;货<br>开发票</span>
          </li>
        </ul>
      </div>
          <router-view></router-view>
      </div>
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
