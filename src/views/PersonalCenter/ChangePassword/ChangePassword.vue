<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>更改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="ChangePassword">
      <p>
        <span>
          <img src="@/assets/image/PersonalCenter/u148019.png" alt>
          交易密码：未设定
        </span>
        <span class="go-set">去设定</span>
      </p>
      <p class="advice">强烈建议您设定交易密码，以保障账户余额和保证金安全</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "ChangePassword"
};
</script>
<style lang="less" scoped>
@import "./ChangePassword.less";
</style>

