<template>
  <div class="SellerCenter">
    <!-- 个人信息 -->
    <div class="personal-information">
      <div class="personal-information-l">
        <!-- 名字信息 -->
        <div class="img">
          <img src='@/assets/image/PersonalCenter/u23123.png' alt>
          <span>编辑资料</span>
        </div>
        <div class="text">
          <span class="name">爱就这么玩</span>
          <span class="rz">未认证</span>
          <span >111111111</span>
        </div>
      </div>
      <div class="personal-information-r">
        <p class="tit">卖家中心</p>
        <div class="certifica-lines">
          <!-- 认证 -->
          <div class="certifica">
            <span>
              <img src='@/assets/image/PersonalCenter/u24984.png' alt>
              认证状态
            </span>
            <span class="no-rz">未认证</span>
            <span class="go-rz">去认证</span>
          </div>
          <!-- 额度 -->
          <div class="lines">
            <span>
              <img src='@/assets/image/PersonalCenter/u53657.png' alt>
              我的信誉额度
            </span>
            <span class="num">￥50000</span>
            <span class="about">关于信誉额</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品状态 -->
    <ul class="goods-state">
      <li>
        <div class="img">
          <img src="@/assets/image/PersonalCenter/u37206.png" alt="">
        </div>
        <p>在售商品</p>
        <p class="num">11</p>
      </li>
      <li>
        <div class="img" >
          <img src="@/assets/image/PersonalCenter/u37838.png" alt="">
        </div>
        <p>待付款</p>
        <p class="num"> 11</p>
      </li>
      <li>
        <div class="img">
          <img src="@/assets/image/PersonalCenter/u37824.png" alt="">
        </div>
        <p>待成团</p>
        <p class="num">11</p>
      </li>
      <li>
        <div class="img">
          <img src="@/assets/image/PersonalCenter/u37838.png" alt="">
        </div>
        <p>待发货</p>
        <p class="num">11</p>
      </li>
    </ul>
    <!-- 商家数据 -->
    <div class="business-data">
      <p class="tit">商家数据</p>
      <div class="business-data-tab">
        <ul>
          <li class="active">今日</li>
          <li>周</li>
          <li>月</li>
          <li>年</li>
        </ul>
        <!-- 选择日期 -->
        <!-- <select name="" id=""></select> -->
      </div>
      <ul class="business-data-con">
        <li>
          <span>订单数</span>
          <span>10单</span>
        </li>
        <li>
          <span>成交额</span>
          <span>10单</span>
        </li>
        <li>
          <span>商品被收藏</span>
          <span>10单</span>
        </li>
        <li>
          <span>商品被浏览</span>
          <span>10单</span>
        </li>
         <li>
          <span>订单数</span>
          <span>10单</span>
        </li>
        <li>
          <span>成交额</span>
          <span>10单</span>
        </li>
        <li>
          <span>商品被收藏</span>
          <span>10单</span>
        </li>
        <li>
          <span>商品被浏览</span>
          <span>10单</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./SellerCenter.less";
</style>

<script>


export default {
  name: "SellerCenter"
};
</script>
