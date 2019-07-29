<template>
  <!-- 关注的商品 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>买家中心</el-breadcrumb-item>
      <el-breadcrumb-item>关注的商品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="CommoditiesInterest">
      <ul class="tab-list">
        <li
          v-for="(item, k) in tabList"
          :class="{active:tableFlag === k}"
          :key="k"
          @click="tabChange(k)"
        >
          <img :src="item.icon" alt class="img-1">
          <span class="text">{{item.name}}{{item.num}}</span>
          <div class="select">
            <img src="@/assets/image/home/u1076.png" alt>
          </div>
        </li>
      </ul>
      <ul class="interes-list">
        <li>
          <TabImage :width="146"></TabImage>
          <div class="text">
            <router-link to="/BrandDetail/GoodsDetails" class="name" tag="p">CDHDFJHKS-234J</router-link>
            <router-link to="/BrandDetail" class="brand" tag="p">
              <span>品牌：</span>
              罗彻斯特电子(RE)
            </router-link>
            <p>
              <span>基本参数：</span>
              DIP 盒子 1/8W
            </p>
            <P class="xh">
              <span>型号描述：</span>
              The current in the input circuit isdetermined by the switching element instate and characteristic of the input stage in state “1”.
            </P>
            <p>
              共有
              <span class="num">3</span>
              个供应商报价
              <span class="num">￥2.5——￥4.0</span>
            </p>
          </div>
          <div class="operation">
            <div class="focus-collection">
              <img src="@/assets/image/PersonalCenter/_u4518.png" alt>
              <img src="@/assets/image/PersonalCenter/_u4512.png" alt>
            </div>
            <div>
              <ButtonIcon :width="175" :height="51">
                <img src="@/assets/image/PersonalCenter/u4504.png" alt>
                我有特价
              </ButtonIcon>
              <ButtonIcon :width="175" :height="51">
                <img src="@/assets/image/PersonalCenter/u6221.png" alt>
                去采购
              </ButtonIcon>
            </div>
          </div>
        </li>
        <li>
          <TabImage :width="146"></TabImage>
          <div class="text">
            <router-link to="/BrandDetail/GoodsDetails" class="name" tag="p">CDHDFJHKS-234J</router-link>
            <router-link to="/BrandDetail" class="brand" tag="p">
              <span>品牌：</span>
              罗彻斯特电子(RE)
            </router-link>
            <p>
              <span>基本参数：</span>
              DIP 盒子 1/8W
            </p>
            <P class="xh">
              <span>型号描述：</span>
              The current in the input circuit isdetermined by the switching element instate and characteristic of the input stage in state “1”.
            </P>
            <p>
              共有
              <span class="num">3</span>
              个供应商报价
              <span class="num">￥2.5——￥4.0</span>
            </p>
          </div>
          <div class="operation">
            <div class="focus-collection">
              <img src="@/assets/image/PersonalCenter/_u4518.png" alt>
              <img src="@/assets/image/PersonalCenter/_u4512.png" alt>
            </div>
            <div>
              <ButtonIcon :width="175" :height="51">
                <img src="@/assets/image/PersonalCenter/u4504.png" alt>
                我有特价
              </ButtonIcon>
              <ButtonIcon :width="175" :height="51">
                <img src="@/assets/image/PersonalCenter/u6221.png" alt>
                去采购
              </ButtonIcon>
            </div>
          </div>
        </li>
        <li>
          <TabImage :width="146"></TabImage>
          <div class="text">
            <router-link to="/BrandDetail/GoodsDetails" class="name" tag="p">CDHDFJHKS-234J</router-link>
            <router-link to="/BrandDetail" class="brand" tag="p">
              <span>品牌：</span>
              罗彻斯特电子(RE)
            </router-link>
            <p>
              <span>基本参数：</span>
              DIP 盒子 1/8W
            </p>
            <P class="xh">
              <span>型号描述：</span>
              The current in the input circuit isdetermined by the switching element instate and characteristic of the input stage in state “1”.
            </P>
            <p>
              共有
              <span class="num">3</span>
              个供应商报价
              <span class="num">￥2.5——￥4.0</span>
            </p>
          </div>
          <div class="operation">
            <div class="focus-collection">
              <img src="@/assets/image/PersonalCenter/_u4518.png" alt>
              <img src="@/assets/image/PersonalCenter/_u4512.png" alt>
            </div>
            <div>
              <ButtonIcon :width="175" :height="51">
                <img src="@/assets/image/PersonalCenter/u4504.png" alt>
                我有特价
              </ButtonIcon>
              <ButtonIcon :width="175" :height="51">
                <img src="@/assets/image/PersonalCenter/u6221.png" alt>
                去采购
              </ButtonIcon>
            </div>
          </div>
        </li>
      </ul>
      <TabImageFoot :num="4">猜你可能会买</TabImageFoot>
    </div>
  </div>
</template>
<script>

export default {
  name: "CommoditiesInterest",
  data() {
    return {
      // tab的flag
      tableFlag: 0,
      // tab的列表
      tabList: [
        {
          name: "全部",
          icon: require("@/assets/image/home/u1086.png"),
          num: 1
        },
        {
          name: "集成电路",
          icon: require("@/assets/image/home/u1071.png"),
          num: 1
        },
        {
          name: "继电器",
          icon: require("@/assets/image/home/u1091.png"),
          num: 1
        },
        {
          name: "接插件",
          icon: require("@/assets/image/home/u1076.png"),
          num: 1
        },
        {
          name: "晶振",
          icon: require("@/assets/image/home/u1076.png"),
          num: 1
        }
      ]
    };
  },
  methods: {
    tabChange(k) {

      this.tableFlag = k;
        console.log(k);
        console.log(this.tableFlag);
        console.log(this.tableFlag === k);
    }
  }
};
</script>
<style lang="less" scoped>
  @import "./CommoditiesInterest.less";
</style>

