<template>
  <div>
    <div class="BuyerCenter">
      <!-- 个人信息 -->
      <div class="personal-information">
        <div class="personal-information-l clear">
          <!-- 名字信息 -->
          <div class="img fl">
            <img src="@/assets/image/PersonalCenter/u23123.png" alt>
              <p><span>编辑资料</span></p>
          </div>
          <div class="text fl">
            <p class="name">爱就这么玩</p>
            <p class="tag">
                <span>认证商家</span>
            </p>
            <p class="tel">1771****9639</p>
          </div>
        </div>
        <div class="personal-information-r">
          <p class="tit">买家中心</p>
          <div class="certifica-lines">
            <!-- 未认证 -->
            <!-- <div class="unauthorized">
            <span>
              <img src="@/assets/image/PersonalCenter/u24984.png" alt>
              认证状态
            </span>
            <span class="no-rz">未认证</span>
            <span class="go-rz">去认证</span>
            </div>-->
            <!-- 已认证 -->
            <div class="certified">
              <span>
                <img src="@/assets/image/PersonalCenter/u26343.png" alt>
                我的余额
              </span>
              <span class="num">￥50000</span>
              <span class="top-up">充值</span>
            </div>
            <!-- 额度 -->
            <!-- <div class="lines">
            <span>
              <img src="@/assets/image/PersonalCenter/u53657.png" alt>
              我的信誉额度
            </span>
            <span class="num">￥50000</span>
            <span class="about">关于信誉额</span>
            </div>-->
          </div>
        </div>
      </div>
      <!-- 商品状态 -->
      <ul class="goods-state">
<!--        <router-link tag="li" to="">-->
<!--        </router-link>-->
        <li>
          <div class="img">
            <img src="@/assets/image/PersonalCenter/u37206.png" alt>
          </div>
          <p>我的订单</p>
          <p class="num">11</p>
        </li>
        <li>
          <div class="img">
              <img src="@/assets/image/PersonalCenter/u25552.png" alt>
          </div>
          <p>我的购物车</p>
          <p class="num">11</p>
        </li>
          <li>
              <div class="img">
                  <img src="@/assets/image/PersonalCenter/u37882.png" alt>
              </div>
              <p>我关注的商家</p>
              <p class="num">11</p>
          </li>
          <li>
              <div class="img">
                  <img src="@/assets/image/PersonalCenter/u37900.png" alt>
              </div>
              <p>我的收货地址</p>
              <p class="num">11</p>
          </li>
        <li>
          <div class="img">
            <img src="@/assets/image/PersonalCenter/u37824.png" alt>
          </div>
          <p>我的询价篮</p>
          <p class="num">11</p>
        </li>
        <li>
          <div class="img">
              <img src="@/assets/image/PersonalCenter/u37838.png" alt>
          </div>
          <p>我的消息</p>
          <p class="num">11</p>
        </li>
        <li>
          <div class="img">
            <img src="@/assets/image/PersonalCenter/u37868.png" alt>
          </div>
          <p>我关注的商品</p>
          <p class="num">11</p>
        </li>

      </ul>
      <!-- 品牌入驻 -->
      <div class="brands">
        <span>品牌入驻</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "BuyerCenter",
  data(){
    return {
      list:[
        {
          name:'我的订单',
          imgUrl:require('@/assets/image/PersonalCenter/u37206.png'),
          num:12,
          path:'/PersonalCenter/BuyerOrderManagement'
        },
        {
          name:'我的购物车',
          imgUrl:require('@/assets/image/PersonalCenter/u37206.png'),
          num:12,
          path:'/PersonalCenter/BuyerOrderManagement'
        },
        {
          name:'我的询价篮',
          imgUrl:require('@/assets/image/PersonalCenter/u37206.png'),
          num:12,
          path:'/PersonalCenter/BuyerOrderManagement'
        },
         {
          name:'我的消息',
          imgUrl:require('@/assets/image/PersonalCenter/u37206.png'),
          num:12,
          path:'/PersonalCenter/BuyerOrderManagement'
        },
        {
          name:'我关注的商品',
          imgUrl:require('@/assets/image/PersonalCenter/u37206.png'),
          num:12,
          path:'/PersonalCenter/BuyerOrderManagement'
        },
        {
          name:'我关注的商家',
          imgUrl:require('@/assets/image/PersonalCenter/u37882.png'),
          num:12,
          path:'/PersonalCenter/MerchantsConcerned'
        },
        {
          name:'我的收货地址',
          imgUrl:require('@/assets/image/PersonalCenter/u37900.png'),
          num:12,
          path:'/PersonalCenter/ShippingAddress'
        }
      ]
    }
  }
};
</script>

<style lang="less" scoped>
  @import "./BuyerCenter.less";
</style>
