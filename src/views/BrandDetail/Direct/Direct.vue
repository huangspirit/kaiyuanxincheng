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
<!--      <table class="screen-list">-->
<!--        <tr v-for="item in screenTypeListOne" :key="`screenTypeList_${item.propertyId}`">-->
<!--          <td class="screen-class-tit">{{item.propertyName}}</td>-->
<!--          <ScreenItem-->
<!--            :childList="item.childList"-->
<!--            :item="item"-->
<!--            :screenListOne.sync="screenListOne"-->
<!--            :flags.sync="flag"-->
<!--            :currentPage.sync="currentPage"-->
<!--            :query='query'-->
<!--          ></ScreenItem>-->
<!--        </tr>-->
<!--      </table>-->
        <transition name="el-zoom-in-top">
            <ul class="screen-list" v-show="showScreenList">
                <li v-for="(item,k) in screenTypeList" :key="k" class="item">
                    <div class="title"><p>{{item.propertyName}}</p></div>
                    <div class="itemList">
                        <template  v-for="(item0,index0) in item.childList">
                            <p  v-show="index0<limitNum || !item.showmore" :class="item.selected==index0?'active':''" @click="selected(k,index0)" :key="index0">
                                <a>{{item0}}</a>
                            </p>
                        </template>
                    </div>
                    <div class="showmore">
                        <a v-if="item.showmore" @click="item.showmore=!item.showmore"><span>更多</span> >></a>
                        <a v-if="!item.showmore && item.childList.length>limitNum" @click="item.showmore=!item.showmore"> << <span>收起</span></a>
                    </div>
                </li>
            </ul>
            </transition >
<!--      <div class="screen-bar">-->
<!--          <p v-text="`${showScreenList ?'收起筛选项':'展开筛选项'}`"></p>-->
<!--        <img-->
<!--          :src="`${showScreenList ?require('@/assets/image/brandDetail/u4650.png') : require('@/assets/image/brandDetail/u4530.png')  }`"-->
<!--          alt-->
<!--          @click="showScreenList=!showScreenList"-->
<!--        >-->
<!--      </div>-->
      <!-- 筛选数量 -->
      <div class="showSelectedScreen">
          <span v-for="(item,k) in selectedScreen" :key="k">{{item}} <i @click="delselectedScreenItem(k)" class="el-icon-circle-close"></i> </span>
      </div>
      <div class="screenBtn clear">
        <div class="number">
          共筛选出
          <strong>{{ScreenProductTotal}}</strong>个结果
        </div>
        <div class="search btn" v-show="ScreenProductTotal">
            <span @click="changeType">筛选搜索</span></div>
        <div class="reset btn" v-show="showScreenList">
            <span @click="resetScreen">重置条件</span></div>
         <div class="screen-bar btn">
             <span  @click="showScreenList=!showScreenList">
                 <img
                     :src="`${showScreenList ?require('@/assets/image/brandDetail/u4650.png') : require('@/assets/image/brandDetail/u4530.png')  }`"
                     alt

                 >
                <span v-text="`${showScreenList ?'收起':'展开'}`"></span>
             </span>
             </div>
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
      <div class="brand-hot brand-msg">
            <div class="tit">
                <img src="@/assets/image/brandDetail/u4832.png" alt>
                <span>热卖</span>
                <!--            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>-->
                <!--            <span>查看全部</span>-->
                <!-- 搜索热卖 -->
                <SearchInput
                    class="clear fr"
                    :value="valueName"
                    :width="350"
                    :height="40"
                    :placeholder="'搜索热卖产品'"
                    :fontSize="14"
                    :btnImgWidth="20"
                    :btnWidth="40"
                    :borderColor="'#fff'"
                    @input="hotSearchValue"
                    @submit="hotSearchsubmit"
                ></SearchInput>
                <!-- 品牌热卖 -->
            </div>
        </div>
      <div class="management-class">
       <SubstituModelList :list="ProductnformaList" v-if="ProductnformaList.length"></SubstituModelList>
          <div class="nocontent" v-if="total==0">暂无此类产品</div>
<!--      <SubstituModelList :list="ScreenProductList" v-if="ScreenProductList.length "></SubstituModelList>-->
        <Pagination
            v-if="total"
          :currentPage.sync="currentPage"
          :total="total"
            @current-change="handleCurrentPageChange"
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
        pageSize:10,
      ProductnformaList:[],
      total:0,
      query:{},
      screenTypeList:[],
      limitNum:12,
      showScreenList:true,
      selectedScreen:{},
      ScreenProductTotal:0,
        //搜索类型1：标识按照筛查条件搜索0：是按照热搜搜索
        searchType:0,
        valueName:"",
        hasHotResearch:false,
      //
      // currentName: "全部分类",
      // preName: "",
      // sort_type: 0,
      // screenVal: "",
      // screenBarFlag: true,
      // screenTypeListOne: "",
      // screenListOne: {},
      // flag: true,
      // fullscreenLoading: false,
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
      selectedScreen:{
          deep:true,
          handler: function(val, oldVal){
              this.queryMatchCount()
          },
      }
    // currentPage() {
    //   this.$loading(this.$store.state.loading);
    //   let arr = Object.keys(this.screenListOne);
    //   if (arr.length > 4) {
    //     this.GetScreenProductList({
    //       map: this.screenListOne,
    //       start: this.start,
    //       brand_id: this.query.brandId ? this.query.brandId : "",
    //       parent_id: this.query.brandId
    //         ? this.query.parent_id
    //         : this.query.documentid
    //     }).then(() => {
    //       this.$loading(this.$store.state.loading).close();
    //     });
    //   } else {
    //     if (this.query.brandId) {
    //       this.$store
    //         .dispatch("Direct/GetDirectList", {
    //           brandId: this.query.brandId,
    //           name: "",
    //           sort_filds: 0,
    //           parent_id: this.query.parent_id,
    //           start: this.start
    //         })
    //         .then(() => {
    //           this.$loading(this.$store.state.loading).close();
    //         });
    //     } else if (this.query.tag) {
    //       this.$store
    //         .dispatch("Direct/GetSearchDirect", {
    //           tag: this.query.tag,
    //           documentid: this.query.documentid,
    //           name: this.query.name,
    //           start: this.start
    //         })
    //         .then(() => {
    //           this.$loading(this.$store.state.loading).close();
    //         });
    //     }
    //   }
    // }
  },
  components: {
    SubstituModelList,
    ScreenItem
  },
  computed: {
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    ...mapState({
      directJOSN:state => state.Direct.directJOSN,
    })
  },
  methods: {
      // 获取热搜的值
      hotSearchValue(val) {
          console.log("val:",val)
          this.valueName = val;
          this.currentPage=1;
          this.hasHotResearch=true;
          this.getSearchByBrandId()
      },
      // 点击搜索按钮
      hotSearchsubmit() {
          this.hasHotResearch=true;
          this.currentPage=1
          this.getSearchByBrandId()
      },
     //改变筛选条件
      selected(k,index0){
          this.$set(this.screenTypeList[k],"selected",index0)
          this.$set(this.selectedScreen,this.screenTypeList[k].propertyId,this.screenTypeList[k].childList[index0])
      },
      //筛选总数
      queryMatchCount(){
          let obj={
              parent_id: this.query.brandId
                  ? this.query.parentId
                  : this.query.documentid,
              start:this.start,
              length:this.pageSize,
              ...this.selectedScreen
          }
          if(this.query.brandId){
              obj.brand_id=this.query.brandId
          }
          axios.request({...BrandDetail.queryMatchCount,data:obj}).then(res=>{
              console.log(res)
              this.ScreenProductTotal=res.data
          })
      },
    // 筛选搜索查询全部
    changeType() {
    //改变全局的搜索类型
      this.searchType=1;
      this.$loading(this.$store.state.loading);
      this.currentPage = 1;
      let obj={
          parent_id: this.query.brandId
              ? this.query.parentId
              : this.query.documentid,
          start:this.start,
          length:this.pageSize,
          ...this.selectedScreen
      };
      if(this.query.brandId){
          obj.brand_id=this.query.brandId
      }
        axios.request({...BrandDetail.queryByProperty,data:obj}).then(res=>{
            console.log(res)
            this.$loading(this.$store.state.loading).close();
            if(res.data.data){
                this.ProductnformaList=res.data.data;
            }else{
                this.ProductnformaList=[]
            }
            this.total=res.data.total;
        });
    },
    // 返回上一级
    // AllSend() {
    //   this.$router.go(-1);
    //   this.screenListOne = {};
    //   this.flag = !this.flag;
    // },
      //获取筛选条件列表
      getPropertyByParentId(){
          let data={
              catergoryId:this.query.brandId?this.query.parentId:this.query.documentid,
              brandId: this.query.brandId
          }
          //筛查类型
          axios.request({...BrandDetail.queryPropertyByParentId,params:data}).then(res=>{
              console.log(res)
              this.screenTypeList=res.data.map(item=>{
                  if(item.childList.length>this.limitNum){
                      item.showmore=true
                  }
                  return item;
              })
          })
      },
    // 重置筛选
    resetScreen() {
        this.screenTypeList=this.screenTypeList.map(item=>{
            item.selected=-1;
            return item;
        })
        this.selectedScreen={}
    },
      delselectedScreenItem(k){
          let obj=this.selectedScreen;
          delete obj[k];
          this.selectedScreen={...obj};
          this.screenTypeList=this.screenTypeList.map(item=>{
              if(item.propertyId==k){
                  item.selected=-1;
              }
              return item;
          })
      },
      //按照brandId 搜索
      getSearchByBrandId(){
          console.log(this.query)
          let obj={
              type:3,
              parent_id:this.query.brandId?this.query.parentId:this.query.documentid,
              brandId:this.query.brandId,
              start:this.start,
              length:this.pageSize,
              name:this.valueName
          }
          axios.request({...BrandDetail.findGoodsBaseInfoAndExInfo,params:obj}).then(res=>{
              console.log(res)
              this.$loading(this.$store.state.loading).close();
              this.ProductnformaList=res.data.data;
              this.total=res.data.total;
          })
      },
      init(){
         this.$loading(this.$store.state.loading);
          //改变全局的搜索类型
          this.searchType=0;
          if (this.query.brandId) {
            this.getSearchByBrandId()
          }
          else {
              let obj={
                  tag: this.query.tag,
                  id: this.query.documentid,
                  name: this.query.name,
                  start:this.start,
                  length:this.pageSize
              }
              axios.request({...BrandDetail.searchResult,params:obj}).then(res=>{
                  this.$loading(this.$store.state.loading).close();
                  this.ProductnformaList=res.data.direct.data;
                  this.total=res.data.direct.total;
                  this.query={...this.query,parentName:res.data.parentName,parentId:res.data.parentId,}
              })
          }
      },
      handleCurrentPageChange(x){
          this.currentPage=x;
           if(this.searchType==0){
               //判断是否是热搜过
               if(this.hasHotResearch){
                   this.getSearchByBrandId()
               }else{
                   this.init()
               }

           }else if(this.searchType==1){
                //标识筛选
               this.changeType()
           }
      }
  },
  mounted() {
      if(this.$route.query.tag){
          this.query=this.$route.query
      }else{
          this.query=this.directJOSN
      }
      this.init();
      this.getPropertyByParentId()
  }
};
</script>
