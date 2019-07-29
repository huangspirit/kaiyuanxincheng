<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>账号绑定</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="AccountBind">
      <ul>
        <li>
          <img src="@/assets/image/PersonalCenter/u133711.png" alt>
          <span>手机号：</span>
          <span>136****4976</span>
          <span class="ban" @click="dialogVisible = true">更换手机号</span>
        </li>
        <li>
          <img src="@/assets/image/PersonalCenter/u146525.png" alt>
          <span>微信号：</span>
          <span>已绑定</span>
          <span class="ban">解绑</span>
        </li>
        <!-- <li>
          <img src="@/assets/image/PersonalCenter/u133715.png" alt>
          <span>QQ号：</span>
          <span>未绑定</span>
          <span>绑定</span>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "AccountBind",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import "./AccountBind.less";
</style>

