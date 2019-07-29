<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
    <el-breadcrumb-item>发布商品</el-breadcrumb-item>
    <el-breadcrumb-item>发布完成</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="SuccessfulCommodityRelease">
    <!-- 等待审核 -->
    <div class="WaitingAudit">
      <div class="WaitingAudit-con">
        <p class="sp_1">
          <span class="img_">
            <img src="@/assets/image/OriginalFactoryEntry/u15735.png" alt>
          </span>
          <span>该商品已成功发布</span>
        </p>
        <p>该商品已成功发布，敬请期待用户采购！</p>
        <p>您可在订单管理中查看销售情况，如有新进展，系统将以如下方式通知您</p>
        <p>
          <span>
            <img src="@/assets/image/OriginalFactoryEntry/u15745.png" alt>
            系统通知
          </span>
          <span>
            <img src="@/assets/image/OriginalFactoryEntry/u15748.png" alt>
            短信通知
          </span>
          <router-link to="/PersonalCenter/RemindSet" tag="span" class="Open-immediate">立即开通</router-link>
        </p>
        <router-link to="/PersonalCenter/SellerOrderManagement" tag="p" class="link">去往订单管理>></router-link>
        <router-link to="/PersonalCenter/SellerCommodityManagement" tag="p" class="link">去往商品管理>></router-link>
        <router-link to="/" tag="p" class="link">返回首页>></router-link>
      </div>
    </div>
  </div>
  </div>
</template>
<style lang="less" scoped>
@import './SuccessfulCommodityRelease.less';
</style>

<script>

export default {
  name: "SuccessfulCommodityRelease"
};
</script>

