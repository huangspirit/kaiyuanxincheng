<template>
  <!-- 等待审核 -->
  <div class="WaitingAudit">
    <div class="WaitingAudit-con">
        <img src="@/assets/image/icon/bgSuccess.png" alt="">
        <p class="color title">入驻申请已提交！</p>

        <p class="">您的入驻已进入审批流程，审核将于72小时内完成，审核结果系统将会以短信和系统内信息的方式通知您！</p>
        <p class="desc">若您希望通过微信接收审核结果，请前往用户中心绑定微信号；若已经绑定，请耐心等待！</p>
        <p>
            <el-button class="bgColor"> <router-link to="/PersonalCenter" tag="p" class="link">前往用户中心</router-link></el-button>
            <el-button class="bgColor"><router-link to="/" tag="p" class="link">返回 首页</router-link></el-button>
        </p>
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
                margin-top:10px;
            }
        }
    }

  /*@import "./WaitingAudit.less";*/

</style>

