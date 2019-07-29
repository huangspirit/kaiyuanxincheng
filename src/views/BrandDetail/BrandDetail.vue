<template>
  <div class="BrandDetail">
    <!-- banner -->
    <div class="banner">
      <img src="@/assets/image/brandDetail/u4888.jpg" alt>
      <div class="text">
        <div>
          <p>现在原厂入驻，多重好礼相送</p>
          <p class="time">4.11——4.30</p>
        </div>
        <span>立即入驻</span>
      </div>
      <div class="bg"></div>
    </div>
    <!-- <div class="BrandDetail-tit">
      <div class="wrapper">
        <p>
          全部品牌&nbsp;>
          <span>罗彻斯特电子(RE)</span>
        </p>
      </div>
    </div>-->
      <router-view />
  </div>
</template>
<style lang="less" scoped>
@import "./BrandDetail.less";
</style>

<script>


export default {
  name: "BrandDetail",
  data() {
    return {};
  }
};
</script>
