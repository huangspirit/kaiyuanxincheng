<template>
  <div class="Direct">
    <div class="BrandDetail-tit">
      <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">全部品牌</el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.query.brandName">
            <span @click="$router.go(-2)" class="span_">{{this.query.brandName}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="!this.query.tag">
            <span @click="AllSend()" class="span_">{{preName}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.query.tag">
            <span>{{preName}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{currentName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="screen">
      <div class="tit-h">
        <div class="wrapper">
          <img src="@/assets/image/brandDetail/u8717.png" alt>
          <span>筛选</span>
        </div>
      </div>
      <!-- 筛选条件列表 -->
      <table class="screen-list">
        <tr v-for="item in screenTypeListOne" :key="`screenTypeList_${item.propertyId}`">
          <td class="screen-class-tit">{{item.propertyName}}</td>
          <ScreenItem
            :childList="item.childList"
            :item="item"
            :screenListOne.sync="screenListOne"
            :flags.sync="flag"
            :currentPage.sync="currentPage"
            :query='query'
          ></ScreenItem>
        </tr>
      </table>
      <div class="screen-bar">
        <img
          :src="`${screenBarFlag ? require('@/assets/image/brandDetail/u4530.png') : require('@/assets/image/brandDetail/u4650.png') }`"
          alt
          @click="blockScreen"
        >
      </div>
      <!-- 筛选数量 -->
      <div class="screen-number">
        <span class="number">
          共筛选出
          <span>{{ScreenProductTotal}}</span>个结果
        </span>
        <span class="search" @click="changeType()">搜索</span>
        <div class="reset" @click="resetScreen">重置条件</div>
      </div>
      <!-- 筛选结果商品列表 -->
      <!-- <div class="screen-result">
        <div class="result-tit">
          <div class="wrapper">
            <ul class="tabList">
              <li class="active">综合排序</li>
              <li>按综合销量</li>
              <li>按原厂价格</li>
              <li>按经销商价格</li>
            </ul>
            <SearchInput></SearchInput>
          </div>
        </div>
      </div> -->
    </div>
    <div class="all-brand">
      <!-- 经营品类 -->
      <div class="management-class">
        <SubstituModelList :list="ScreenProductList.length ? ScreenProductList : ProductnformaList"></SubstituModelList>
        <Pagination
          :currentPage.sync="currentPage"
          :total="ScreenProductTotal ? ScreenProductTotal : total"
        ></Pagination>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./Direct.less";
</style>

<script>

import { mapGetters, mapActions, mapState } from "vuex";
import SubstituModelList from "_c/SubstituModelList";
import ScreenItem from "_c/ScreenItem";
export default {
  name: "Direct",
  data() {
    return {
      currentPage: 1,
      currentName: "全部分类",
      preName: "",
      sort_type: 0,
      screenVal: "",
      screenBarFlag: true,
      screenTypeListOne: "",
      screenListOne: {},
      flag: true,
      fullscreenLoading: false
    };
  },
  watch: {
    currentPage() {
      this.$loading(this.$store.state.loading);
      let arr = Object.keys(this.screenListOne);
      if (arr.length > 4) {
        this.GetScreenProductList({
          map: this.screenListOne,
          start: this.start,
          brand_id: this.query.brandId ? this.query.brandId : "",
          parent_id: this.query.brandId
            ? this.query.parent_id
            : this.query.documentid
        }).then(() => {
          this.$loading(this.$store.state.loading).close();
        });
      } else {
        if (this.query.brandId) {
          this.$store
            .dispatch("Direct/GetDirectList", {
              brandId: this.query.brandId,
              name: "",
              sort_filds: 0,
              parent_id: this.query.parent_id,
              start: this.start
            })
            .then(() => {
              this.$loading(this.$store.state.loading).close();
            });
        } else if (this.query.tag) {
          this.$store
            .dispatch("Direct/GetSearchDirect", {
              tag: this.query.tag,
              documentid: this.query.documentid,
              name: this.query.name,
              start: this.start
            })
            .then(() => {
              this.$loading(this.$store.state.loading).close();
            });
        }
      }
    }
  },
  components: {
    SubstituModelList,
    ScreenItem
  },
  computed: {
    query() {
      return this.$route.query;
    },
    start() {
      return (this.currentPage - 1) * 10;
    },
    ...mapState({
      ProductnformaList: state => state.Direct.ProductnformaList,
      total: state => state.Direct.total,
      screenTypeList: state => state.Direct.screenTypeList,
      ScreenProductList: state => state.Direct.ScreenProductList,
      ScreenProductTotal: state => state.Direct.ScreenProductTotal
    })
  },
  methods: {
    ...mapActions("Direct", [
      "GetDirectList",
      "GetScreenType",
      "GetScreenProductList",
      "GetScreenTotal"
    ]),
    // 查询全部
    changeType() {
      this.$loading(this.$store.state.loading);
      this.currentPage = 1;
      this.GetScreenProductList({
        map: this.screenListOne,
        brand_id: this.query.brandId ? this.query.brandId : "",
        parent_id: this.query.brandId
          ? this.query.parent_id
          : this.query.documentid
      }).then(res => {
        this.$loading(this.$store.state.loading).close();
      });
    },
    // 返回上一级
    AllSend() {
      this.$router.go(-1);
      this.screenListOne = {};
      this.flag = !this.flag;
    },
    // 重置筛选
    resetScreen() {
      this.screenListOne = {};
      this.flag = !this.flag;
    },

    // 点击箭头显示全部
    blockScreen() {
      this.screenBarFlag = !this.screenBarFlag;
      if (!this.screenBarFlag) {
        this.screenTypeListOne = this.screenTypeList;
      } else {
        this.screenTypeListOne = this.screenTypeList.slice(0, 2);
      }
    }
  },
  mounted() {
    
    this.$loading(this.$store.state.loading);
    if (this.query.brandId) {
      this.currentName = this.query.name;
      this.preName = this.query.preName;
      this.listFlag = this.query.parent_id;
      this.$store
        .dispatch("Direct/GetDirectList", {
          brandId: this.query.brandId,
          name: "",
          sort_filds: 0,
          parent_id: this.query.parent_id,
          start: 0
        })
        .then(() => {
          this.$loading(this.$store.state.loading).close();
        });
      //筛查类型
      this.GetScreenType({
        catergoryId: this.query.parent_id,
        brandId: this.query.brandId
      }).then(res => {
        this.screenTypeListOne = this.screenTypeList.slice(0, 2);
      });
    } else {
      this.currentName = this.query.name;
      this.$store
        .dispatch("Direct/GetSearchDirect", {
          tag: this.query.tag,
          documentid: this.query.documentid,
          name: this.query.name,
          start: 0
        })
        .then(res => {
          this.$loading(this.$store.state.loading).close();
          this.preName = res.parentName;
        });
      //筛查类型
      this.GetScreenType({
        catergoryId: this.query.documentid
      }).then(res => {
        this.screenTypeListOne = this.screenTypeList.slice(0, 2);
      });
    }
  }
};
</script>
<style lang="less">
.span_ {
  cursor: pointer;
  &:hover {
    color: #0d98ff;
  }
}
</style>
