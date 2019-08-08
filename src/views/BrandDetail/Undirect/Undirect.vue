<template>
  <div class="Undirect AllBrand">
    <div class="BrandDetail-tit">
      <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">全部品牌</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{
            path:'/BrandDetail',
            query:{
              tag:'brand',
              id:query.brandId,
              name:query.name
            }
          }"
          v-if="query.brandId">{{query.brandName}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{query.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="all-brand">
      <!-- 经营品类 -->
      <div class="management-class brand-msg">
        <!-- <div class="tit">
          <div class="wrapper">
            <img src="@/assets/image/brandDetail/u4675.png" alt>
            <span>经营品类</span>
            <span>|</span>
            <span>查看全部</span>
          </div>
        </div>-->
          <div class="tit">
              <img src="@/assets/image/brandDetail/u4675.png" alt>
              <span>品类</span>
          </div>
        <ul class="list">
          <li @click="AllSend" :class="{avtive:listFlag = ''}">
            <img src="@/assets/image/brandDetail/u1086.png" alt>
            <p>全部品类</p>
            <p class="num">({{titleObj.productTotal}})</p>
          </li>
          <li
            v-for="(item, k)  in titleObj.list"
            :key="`parentList_${item.catergoryId}`"
            @click="send(item)"
            :class="{avtive:listFlag == item.catergoryId}"
          >
            <ImgE :src="item.catergoryUrl" :W="60" :H="60"></ImgE>
            <p>{{item.catergoryName}}</p>
            <p class="num">({{item.summaryTotal}})</p>
          </li>
        </ul>
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
        <SubstituModelList :list="ProductnformaList" v-if="ProductnformaList.length"></SubstituModelList>
        <Pagination :currentPage.sync="currentPage" :total="total" @current-change="handleChangePage"></Pagination>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../AllBrand/AllBrand.less";
</style>
<script>
import {axios,BrandDetail} from "../../../api/apiObj";
import { mapGetters, mapActions, mapState,mapMutations } from "vuex";
import SubstituModelList from "_c/SubstituModelList";
export default {
  name: "Undirect",
  data() {
    return {
      currentPage: 1,
      pageSize:10,
      listFlag: -1,
      parent_id: "",
      //sort_type: 0,
      valueName:"",
      titleObj:{},
        ProductnformaList:[],
        total:0
    };
  },
  computed: {
  //  ...mapGetters("Undirect", ["ProductnformaList", "total"]),
  //   ...mapState({
  //     parentName: state => state.Undirect.parentName,
  //     parentId: state => state.Undirect.parentId,
  //     productTotal: state => state.Undirect.productTotal,
  //     parentList: state => state.Undirect.parentList
  //   }),
  //   brandName() {
  //     return this.$route.query.brandName;
  //   },
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    // brandId() {
    //   return this.$route.query.brandId;
    // },
    query(){
      return this.$route.query
    }
  },
  // watch: {
  //   currentPage() {
  //     this.AllSend();
  //   }
  // },
  components: {
    SubstituModelList
  },
  methods: {
      ...mapMutations("Direct",["savedirectJOSN"]),
     init(){
          this.$loading(this.$store.state.loading);
          if (this.query.brandId) {
              let obj={
                  brandId:this.query.brandId,
                  firstCatergoryId:this.query.catergoryId
              }
              axios.request({...BrandDetail.queryCatergoryByParentId,params:obj}).then(res=>{
                  console.log(res);
                  this.titleObj=res
                  this.AllSend();
              })
              // this.$store
              //   .dispatch("Undirect/GetUndirect", {
              //     firstCatergoryId: this.query.catergoryId,
              //     brandId: this.query.brandId
              //   })
              //   .then(res => {
              //       this.titleObj=res;
              //       this.AllSend();
              //   });
          } else{
              let obj={
                  tag: this.query.tag,
                  id: this.query.documentid,
                  name: this.query.name
              }
              axios.request({...BrandDetail.searchResult,params:obj}).then(res=>{
                  this.titleObj=res.data.undirect;
                  this.AllSend();
              })
              // this.$store
              //   .dispatch("Undirect/GetSearchDirect", {
              //     tag: this.query.tag,
              //     documentid: this.query.documentid,
              //     name: this.query.name,
              //     start: this.start
              //   })
              //   .then(res => {
              //     this.listFlag = this.query.documentid;
              //     this.AllSend();
              //   });
          }
      },
    AllSend() {
      this.$loading(this.$store.state.loading);
        this.ProductnformaList=[];
      let obj={
          type:2,
          name:this.valueName,
          first_id: this.$route.query.catergoryId,
          start:this.start,
          length:this.pageSize
      };
      if(this.$route.query.brandId){
          obj.brandId=this.$route.query.brandId;
      }else{
          obj.first_id=this.$route.query.documentid
      }
      axios.request({...BrandDetail.findGoodsBaseInfoAndExInfo,params:obj}).then(res=>{
          this.total=res.data.total;
          this.ProductnformaList=res.data.data;
          this.$loading(this.$store.state.loading).close();
      })
        // this.$store
      //   .dispatch("Undirect/GetDirectList", {
      //     brandId: this.$route.query.brnadId,
      //     name: "",
      //     sort_filds: 0,
      //     first_id: this.$route.query.catergoryId,
      //     start: this.start,
      //     sort_type: this.sort_type,
      //   })
      //   .then(() => {
      //     this.$loading(this.$store.state.loading).close();
      //   });
    },
      // 获取热搜的值
      hotSearchValue(val) {
           this.valueName = val;
          this.AllSend()
      },
      // 点击搜索按钮
      hotSearchsubmit() {
          this.AllSend();
      },
      handleChangePage(x){
         this.currentPage=x;
         this.AllSend()
      },
    send(item) {
      this.parent_id = item.catergoryId;
      this.listFlag = item.catergoryId;
      console.log(item)
        console.log(this.query)
      let query = {
        parentId: item.catergoryId,
        parentName: this.query.name,
        name: item.catergoryName,
        brandId: this.query.brandId,
        brandName: this.query.brandName,
        firstCatergoryId:this.query.brandId ? this.query.catergoryId : this.query.brandId,
        documentid:item.catergoryId,
        tag:this.query.tag ? 'direct' : ''
      };
      this.savedirectJOSN(query)
      this.$router.push({
        path: "/BrandDetail/Direct",
      });
    }
  },
  mounted() {
   this.init()
  }
};
</script>


