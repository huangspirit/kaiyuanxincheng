<template>
  <div class="BrandDetail">
    <!-- banner -->
<!--    <div class="banner">-->
<!--      <img src="@/assets/image/brandDetail/u4888.jpg" alt>-->
<!--      <div class="text clear">-->
<!--            <span class="">-->
<!--              <span>现在原厂入驻，多重好礼相送</span><br>-->
<!--              <span class="time">4.11——4.30</span>-->
<!--            </span>-->
<!--          <span class="btn ">立即入驻</span>-->
<!--      </div>-->
<!--      <div class="bg"></div>-->
<!--    </div>-->
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
