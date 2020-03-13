<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的信誉额</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 我的信誉额 -->
    <div class="CredibiliForehead">
      <!-- 关于信誉额度 -->
      <div class="about">
        <p class="tit">
          <img src="@/assets/image/PersonalCenter/u26343.png" alt>关于信用额度
        </p>
        <div class="detail">
          <p>
            信用额度是决定您发布商品总价的额度，您当前在售商品的价格总额度不能超过信用总额度
            <br>信用额度由以下三部分因素决定，采购额度、保证金额度(注：不是余额)、基础额度，计算公式如下:
          </p>
          <p class="xy">
            <span>信用额度</span>
            <span>=采购（消费）总额</span>
            <span class="num">x10</span>
            <span>+保证金额度</span>
            <span class="num">x10</span>
            <span>+基础额度</span>
          </p>
          <p class="jc">
            <span>基础额度：未认证商户￥10000元</span>
            <span>认证商户￥50000元</span>
            <span>原厂商户￥1000000元</span>
          </p>
        </div>
      </div>
      <!-- 我的信誉额度 -->
      <div class="my">
        <p class="tit">
          <img src="@/assets/image/PersonalCenter/u81478.png" alt>我的信用额度
        </p>
        <ul class="detail">
          <li>
            <span>采购（消费）总额 :</span>
            <span class="num">￥130000</span>
          </li>
          <li>
            <span>保证金额度 :</span>
            <span class="num">￥130000</span>
            <div class="fr" style="display:flex;">
              <el-button class="default" style="margin-right:20px;">保证金充值</el-button>
               <el-button class="default">保证金提现</el-button>
              <!-- <span>保证金充值</span>
              <span>保证金提现</span> -->
            </div>
          </li>
          <li>
            <span>基础额度 :</span>
            <span class="num">￥100000</span>
            <span>未认证商户</span>
            <div class="fr" style="display:flex;">
              <el-button class="default" style="margin-right:20px;"><router-link to="/OriginalFactoryEntry" tag="div">商户入驻</router-link></el-button>
               <el-button class="default"><router-link to="/OriginalFactoryEntry" tag="div">原厂入驻</router-link></el-button>
            </div>
            <!-- <div>
              <router-link to="/OriginalFactoryEntry" tag="span">商户入驻</router-link>
              <router-link to="/OriginalFactoryEntry" tag="span">原厂入驻</router-link>
            </div> -->
          </li>
          <li>
            <span>我的信誉额度 :</span>
            <span class="num ed">￥100000</span>
            <span>=</span>
            <span class="num">￥100000</span>
            <span>x10</span>
            <span>+</span>
            <span class="num">￥50000</span>
            <span>x10</span>
            <span>+</span>
            <span class="num">￥50000</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CredibiliForehead",
    data(){
      return{
          UserInforma:{

          }
      }
    },
    created() {

    }

};
</script>
<style lang="less" scoped>
  @import "./CredibiliForehead.less";
</style>

