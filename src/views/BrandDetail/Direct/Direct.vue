<template>
  <div class="Direct AllBrand">
    <div class="BrandDetail-tit">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">全部品牌</el-breadcrumb-item>
          <el-breadcrumb-item v-if="query.brandName"
                              :to="{
            path:'/BrandDetail',
            query:{
              tag:'brand',
              id:query.brandId,
              name:query.name
            }
          }">
              {{query.brandName}}
<!--            <span @click="$router.go(-2)" class="span_">{{query.brandName}}</span>-->
          </el-breadcrumb-item>
<!--          <el-breadcrumb-item v-if="!query.tag">-->
<!--            <span @click="AllSend()" class="span_">{{preName}}</span>-->
<!--          </el-breadcrumb-item>-->
          <el-breadcrumb-item
              :to="{
            path:'/BrandDetail/Undirect',
            query:{
              tag:'undirect',
              documentid:query.parentId,
              name:query.parentName,
              brandId:query.brandId,
              brandName:query.brandName,
              catergoryId:query.firstCatergoryId
            }
          }">
            <span>{{query.parentName}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{query.name}}</el-breadcrumb-item>
        </el-breadcrumb>

    </div>
    <div class="screen management-class">
      <div class="tit">
          <img src="@/assets/image/brandDetail/u8717.png" alt>
          <span>筛选</span>
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
       <SubstituModelList :list="ProductnformaList" v-if="ProductnformaList.length"></SubstituModelList>
      <SubstituModelList :list="ScreenProductList" v-if="ScreenProductList.length "></SubstituModelList>
        <Pagination
          :currentPage.sync="currentPage"
          :total="ScreenProductTotal ? ScreenProductTotal : total"
        ></Pagination>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../AllBrand/AllBrand.less";
@import "./Direct.less";
</style>

<script>
import {axios,BrandDetail} from "../../../api/apiObj";
import { mapGetters, mapActions, mapState} from "vuex";
import SubstituModelList from "_c/SubstituModelList";
import ScreenItem from "_c/ScreenItem";
export default {
  name: "Direct",
  data() {
    return {
      currentPage: 1,
      ProductnformaList:[],
      total:0,
      currentName: "全部分类",
      query:{},
      preName: "",
      sort_type: 0,
      screenVal: "",
      screenBarFlag: true,
      screenTypeListOne: "",
      screenListOne: {},
      flag: true,
      fullscreenLoading: false,
    };
  },
  watch: {
      $route: {
          // val是改变之后的路由，oldVal是改变之前的val
          handler: function(val, oldVal){
              console.log(val);
              this.init()
          },
          // 深度观察监听
          deep: true
      },
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
    start() {
      return (this.currentPage - 1) * 10;
    },
    ...mapState({
      directJOSN:state => state.Direct.directJOSN,
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
    },
      init(){
          this.$loading(this.$store.state.loading);
          if(this.$route.query.tag){
              this.query=this.$route.query
          }else{
              this.query=this.directJOSN
          }
          if (this.query.brandId) {
              console.log(this.query)
              let obj={
                  type:3,
                  parent_id:this.query.parentId,
                  brandId:this.query.brandId,
                  start:0,
                  length:10
              }
              axios.request({...BrandDetail.findGoodsBaseInfoAndExInfo,params:obj}).then(res=>{
                  console.log(res)
                  this.$loading(this.$store.state.loading).close();
              })
              // this.$store
              //   .dispatch("Direct/GetDirectList", {
              //     brandId: this.query.brandId,
              //     name: "",
              //     sort_filds: 0,
              //     parent_id: this.query.parent_id,
              //     start: 0
              //   })
              //   .then(() => {
              //     this.$loading(this.$store.state.loading).close();
              //   });
              //筛查类型
              this.GetScreenType({
                  catergoryId: this.query.parentId,
                  brandId: this.query.brandId
              }).then(res => {
                  this.screenTypeListOne = this.screenTypeList.slice(0, 2);
              });
          } else {
              let obj={
                  tag: this.query.tag,
                  id: this.query.documentid,
                  name: this.query.name,
                  start:0,
                  length:10
              }
              axios.request({...BrandDetail.searchResult,params:obj}).then(res=>{
                  this.$loading(this.$store.state.loading).close();
                  this.ProductnformaList=res.data.direct.data;
                  console.log(res.data.direct)
                  this.total=res.data.direct.total;
                  this.query={...this.query,parentName:res.data.parentName,parentId:res.data.parentId,}
              })
              //筛查类型
              this.GetScreenType({
                  catergoryId: this.query.documentid
              }).then(res => {
                  this.screenTypeListOne = this.screenTypeList.slice(0, 2);
              });
          }
      }
  },
  mounted() {
      this.init()
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
