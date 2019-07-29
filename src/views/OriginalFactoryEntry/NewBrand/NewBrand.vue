<template>
  <div class="NewBrand">
    <div class="NewBrand-con">
      <p class="title">
        <span>新建品牌</span>
      </p>
      <NewsBrand :sureUrl='sureUrl' :residencetype='this.$route.query.residencetype'></NewsBrand>
    </div>
  </div>
</template>
<script>
import NewsBrand from "_c/NewsBrand";
export default {
  name: "NewBrand",
  data() {
    return {
      sureUrl: "/OriginalFactoryEntry"
    };
  },
  components: {
    NewsBrand
  },
  mounted(){

  }
};
</script>
<style lang="less" scoped>
@import "./NewBrand.less";
</style>

