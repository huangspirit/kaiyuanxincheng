<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
      <el-breadcrumb-item>代理资质</el-breadcrumb-item>
      <el-breadcrumb-item>新增资质</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="SuccessfulAddiQualifica">
      <!-- 等待审核 -->
      <div class="WaitingAudit">
        <div class="WaitingAudit-con">
          <p class="sp_1">
            <span class="img_">
              <img src="@/assets/image/OriginalFactoryEntry/u15735.png" alt>
            </span>
            <span>您的新增的代理资质信息已成功提交</span>
          </p>
          <p>您的认证信息已成功提交，请等待系统审核</p>
          <p>审核如有新进展，系统将以如下方式通知您</p>
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
          <router-link to="/PersonalCenter/AgencyQualification" tag="p" class="link">去往代理资质>></router-link>
          <router-link to="/" tag="p" class="link">返回首页>></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./SuccessfulAddiQualifica.less";
</style>

<script>

export default {
  name: "SuccessfulAddiQualifica",
  data() {
    return {};
  }
};
</script>
