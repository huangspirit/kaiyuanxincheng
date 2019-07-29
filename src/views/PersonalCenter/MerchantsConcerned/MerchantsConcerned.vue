<template>
  <!-- 关注的商家 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>买家中心</el-breadcrumb-item>
      <el-breadcrumb-item>关注的商家</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="MerchantsConcerned">
      <ul class="tab-list">
        <li
          :class="{active:k === tabFlag}"
          v-for="(item, k) in tabList"
          :key="`tabList_${k}`"
          @click="tabChange(k)"
        >
          <span class="text">{{item.tit}}</span>
          <div class="select">
            <img src="@/assets/image/home/u1076.png" alt>
          </div>
        </li>
      </ul>
      <!-- 商家列表 -->
      <ul class="merchant-list">
        <li v-for="(item, k) in 3" :key="`item_${k}`">
          <!-- 品牌信息 -->
          <div class="brand-information">
            <img src="@/assets/image/PersonalCenter/u12093.png" class="bd-img">
            <p class="name">罗彻斯特电子</p>
            <span class="tag yc">原厂商户</span>
            <ul class="start">
              <li v-for="(item , k) in startList" :key="`startList_${k}`">
                <span>{{item.tit}} ：</span>
                <img
                  src="@/assets/image/PersonalCenter/u194.png"
                  v-for="v in item.start"
                  :key="`img_${v}`"
                  alt
                >
              </li>
            </ul>
            <span class="focus-on">-已关注</span>
          </div>
          <!-- 关注商家产品列表 -->
          <MerchantsConcernedImgTab></MerchantsConcernedImgTab>
        </li>
      </ul>
      <TabImageFoot :num="4">猜你可能会买</TabImageFoot>
    </div>
  </div>
</template>

<script>

import MerchantsConcernedImgTab from "_c/MerchantsConcernedImgTab";
export default {
  name: "MerchantsConcerned",
  data() {
    return {
      // tabflag
      tabFlag: 0,
      tabList: [
        {
          tit: "全部商家"
        },
        {
          tit: "原厂商家"
        },
        {
          tit: "认证商家"
        },
        {
          tit: "其他商家"
        }
      ],
      // 星级列表
      startList: [
        {
          tit: "交货质量",
          start: 5
        },
        {
          tit: "交货速度",
          start: 4
        },
        {
          tit: "描述相符",
          start: 3
        }
      ]
    };
  },
  components: {
    MerchantsConcernedImgTab
  },
  methods: {
    tabChange(x) {
      this.tabFlag = x;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./MerchantsConcerned.less";
</style>

