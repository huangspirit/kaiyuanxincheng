<template>
  <div class="InquiryBasket">
    <!--banner -->
    <div class="banner">
      <img src="@/assets/image/inquirybasket/u11855.jpg" class="bg" alt>
      <div class="text">
        <p>5.11芯手芯片节，万种商品折扣到底</p>
        <p class="h3">促销专场</p>
      </div>
    </div>
    <!-- 询价篮 -->
    <div class="inquiry-basket">
      <router-view/>
      <!-- 大家都在询价 -->
      <TabImageFoot>大家都在询价</TabImageFoot>
    </div>
  </div>
</template>

<script>
import Page from "_c/Page";
export default {
  name: "InquiryBasket",
  components: {
    Page
  }
};
</script>
<style lang="less" scoped src="./InquiryBasket.less"></style>

