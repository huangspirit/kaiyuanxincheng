<template>
  <!-- 等待审核 -->
  <div class="WaitingAudit">
    <div class="WaitingAudit-con">
        <img src="@/assets/image/icon/bgSuccess.png" alt="">
        <p class="color title">入驻申请已提交！</p>
        <p class="desc">入驻信息正在审核中，预计72小时内审核结束，系统将会以发送短信和系统信息的方式通知您审核的结果</p>
        <p>
            <el-button class="bgColor"> <router-link to="/Brand" tag="p" class="link">前往品牌中心</router-link></el-button>
            <el-button class="bgColor"><router-link to="/" tag="p" class="link">前往 首页</router-link></el-button>
        </p>
<!--      <p class="sp_1">-->
<!--        <span class="img_">-->
<!--          <img src="@/assets/image/OriginalFactoryEntry/u15735.png" alt>-->
<!--        </span>-->
<!--        <span>商家入驻申请已提交！</span>-->
<!--      </p>-->
<!--      <p>您已成功申请商家入驻</p>-->
<!--      <p>入驻信息正在审核中，预计72小时内审核结束</p>-->
<!--      <p>申请如有进展，系统将以如下方式通知您</p>-->
<!--      <p>-->
<!--        <span>-->
<!--          <img src="@/assets/image/OriginalFactoryEntry/u15745.png" alt>-->
<!--          系统通知-->
<!--        </span>-->
<!--        <span>-->
<!--          <img src="@/assets/image/OriginalFactoryEntry/u15748.png" alt>-->
<!--          短信通知-->
<!--        </span>-->
<!--        <router-link to="/PersonalCenter/RemindSet" tag="span" class="Open-immediate">立即开通</router-link>-->
<!--      </p>-->
<!--      <router-link to="/Brand" tag="p" class="link">去往品牌中心>></router-link>-->
<!--      <router-link to="/" tag="p" class="link">返回首页>></router-link>-->
    </div>
  </div>
</template>

<script>

export default {
  name: "WaitingAudit",
  mounted() {
    this.$store.state.OriginalFactoryEntry.active = 3;
  }
};
</script>
<style lang="less" scoped>
    .WaitingAudit{
        background: #fff;
        text-align: center;
        color:#333;
        .WaitingAudit-con{
            min-height:500px;
            padding:50px 0;
            .title{
                padding:30px;
                font-size:30px;
            }
            .desc{
                margin-bottom:100px;
            }
        }
    }

  /*@import "./WaitingAudit.less";*/

</style>

