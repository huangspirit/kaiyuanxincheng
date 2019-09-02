<template>
    <!-- 等待审核 -->
    <div class="WaitingAudit">
        <div class="WaitingAudit-con">
            <img src="@/assets/image/icon/bgSuccess.png" alt="">
            <p class="color title">发布成功！</p>
            <div class="desc">
                <span>该商品已成功发布，敬请期待用户采购！</span><br>
                <span>您可在订单管理中查看销售情况，如有新进展，系统将会以短信和系统消息通知您</span>

            </div>
            <p class="color">
                <router-link to="/PersonalCenter/SellerIssuesProduct" class="color">继续发布 >></router-link>
            </p>
            <p class="btnwrap">
                <el-button class="bgColor"> <router-link to="/PersonalCenter/SellerOrderManagement" tag="p" class="link">前往订单管理</router-link></el-button>
                <el-button class="bgColor"><router-link to="/PersonalCenter/SellerCommodityManagement" tag="p" class="link">前往商品管理</router-link></el-button>
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
                margin-bottom:40px;
            }
            .btnwrap{
                margin-top:100px;
            }
        }
    }
</style>

