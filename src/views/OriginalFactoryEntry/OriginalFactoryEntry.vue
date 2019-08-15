<template>
  <div class="OriginalFactoryEntry">
    <div class="tit">
      <div class="wrap">
        <div class="text" @click="$router.push('/PersonalCenter/PersonalSet')">商家入驻</div>
        <div class="ShoppingCart-steps">
          <el-steps :active="this.$store.state.OriginalFactoryEntry.active" align-center>
            <el-step title="基本信息" description></el-step>
            <el-step title="详细信息"></el-step>
            <el-step title="等待审核"></el-step>
            <el-step title="入驻成功"></el-step>
          </el-steps>
        </div>
      </div>
    </div>
    <div class="FactoryEntry-con">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "OriginalFactoryEntry"
};
</script>
<style lang="less" scoped>
@import "./OriginalFactoryEntry.less";
// @import "../../assets/css/ele-form.less";
</style>


