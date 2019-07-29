<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
      <el-breadcrumb-item>代理资质</el-breadcrumb-item>
      <el-breadcrumb-item>新增资质</el-breadcrumb-item>
      <el-breadcrumb-item>新增品牌</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="NewsBrandQualifica">
      <NewsBrand :sureUrl='sureUrl'></NewsBrand>
    </div>
  </div>
</template>

<script>

import NewsBrand from "_c/NewsBrand";
export default {
  name: "NewsBrandQualifica",
  data() {
    return {
      sureUrl:'/PersonalCenter/AdditionalQualifications'
    };
  },
  components: {
    NewsBrand
  }
};
</script>
<style lang="less" scoped>
@import "./NewsBrandQualifica.less";
</style>

