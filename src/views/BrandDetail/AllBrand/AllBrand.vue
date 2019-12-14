<template>
  <div class="AllBrand">
    <!-- // 全部品牌 -->
    <div class="all-brand ">
      <!-- 品牌信息 -->
      <div class="brand-msg allWidth">
          <div class="top">
              <p class="title"><a :href="brandInfo.brandWeb">{{brandInfo.name}}</a> </p>
              <!-- <p v-if="brandInfo.brandWeb"><a :href="brandInfo.brandWeb" target="_blank">{{brandInfo.brandWeb}}</a></p>
              <p v-if="brandInfo.tel">电话：{{brandInfo.tel}}</p>
              <p v-if="brandInfo.email">邮件：{{brandInfo.email}}</p> -->
          </div>
        <div class="brand-msg-con clear">
            <div class="brand-msg-con-l">
              <ImgE :src="brandInfo.imageUrl" :W="250" :H="178" style="line-height:178px;text-align:center;"></ImgE>
            </div>
            <div class="brand-msg-con-r">
              <div class="tit">
                <a :href="brandInfo.brandWeb" >{{brandInfo.name}}
                  <!-- <a :href="brandInfo.brandWeb" target="_blank" v-if="brandInfo.brandWeb" style="font-size:14px;">({{brandInfo.brandWeb}})</a> -->
                  </a> 
                  <strong v-if="brandInfo.hasSeller">该原厂已入驻</strong>
                <a v-if="!brandInfo.hasSeller" class="bgColor ruzhu"  @click="chipOriginalFactoryEntry">立即入驻</a>
              </div>
              <p>
                {{brandInfo.brandDesc}}
              </p>
              <div v-if="brandInfo.brandWeb">官方网址：<label for=""><a :href="brandInfo.brandWeb">{{brandInfo.brandWeb}}</a></label></div>
            </div>
        </div>
      </div>
      <!-- 经营品类 -->
      <div class="management-class  brand-msg allWidth">
        <div class="tit bgGray">
            <span>经营品类</span>
        </div>
        <ul class="list">
          <li @click="AllSend(-1)" :class="{avtive:listFlag = -1}">
            <span>全部品类</span>
            <span>({{brandInfo.count | toFixed(0)}})</span>
          </li>
          <li
            v-for="(item, k)  in brandInfo.childrenList"
            :key="item.catergoryId"
            @click="send(k,item)"
            :class="{avtive:listFlag === k}"
          >
            <span>{{item.catergoryName}}</span>
            <span>({{item.summaryTotal | toFixed(0)}})</span>
          </li>
        </ul>
      </div>
      <div class="brand-hot brand-msg allWidth">
        <div class="tit bgGray">
           <el-input
                  placeholder="在结果中查找型号"
                  class="fr inputSearch"
                  v-model="valueName"
                  size="mini"
                  style="width:250px;"
                  @keyup.enter.native="hotSearchValue"
                  clearable
                  >
                   <el-button slot="append" icon="el-icon-search" @click="hotSearchValue"></el-button>
                </el-input>
<!--            <img src="@/assets/image/brandDetail/u4832.png" alt>-->
            <span>产品列表</span>
<!--            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>-->
<!--            <span>查看全部</span>-->
            <!-- 搜索热卖 -->
<!--            <SearchInput-->
<!--                class="clear fr"-->
<!--                :value="valueName"-->
<!--                :width="350"-->
<!--                :height="40"-->
<!--                :placeholder="'搜索热卖产品'"-->
<!--                :fontSize="14"-->
<!--                :btnImgWidth="20"-->
<!--                :btnWidth="40"-->
<!--                :borderColor="'#fff'"-->
<!--                @input="hotSearchValue"-->
<!--                @submit="hotSearchsubmit"-->
<!--            ></SearchInput>-->
            <!-- 品牌热卖 -->
        </div>
          <div class="nocontent" v-if="total==0">暂无此类产品</div>
        <SubstituModelList :list="ProductnformaList" v-if="ProductnformaList.length"></SubstituModelList>
        <Pagination :currentPage.sync="currentPage" :total="total" @current-change="handleChangePage" v-if="total"></Pagination>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./AllBrand.less";
</style>
<script>
import SubstituModelList from "_c/SubstituModelList";

import { mapMutations} from "vuex";

import {axios,BrandDetail} from "../../../api/apiObj";

export default {
  name: "AllBrand",
  data() {
    return {
        pageSize:10,
        currentPage: 1,
        ProductnformaList:[],
        valueName: "",
        total:0,
        brandInfo:{},
    };
  },
  computed: {
   ...mapState({
         title: state => state.title,
      loginState: state => state.loginState,
      UserInforma:state => state.Login.UserInforma,
    }),
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
 
  },
  components: {
   // MerchantList,
   // HotSearch,
    SubstituModelList
  },
  methods: {
      ...mapMutations("OriginalFactoryEntry", ["setJoinForm"]),
      ...mapMutations(['setshowlogin']),
    chipOriginalFactoryEntry(){
      if (this.loginState) {
       
        if(this.UserInforma.userTagMap.seller){
          this.$message({
            message:'您已是'+this.title+'的商家，不能再次入驻！',
            type:'warning'
          })
            return;
        }
     this.setJoinForm({brandIds:this.brandInfo.id,brandName:[this.brandInfo.name],residencetype:1});
      this.$router.push("/OriginalFactoryEntry/BasicInforma")
      } else {
       // this.$router.push("/Login");
       this.setshowlogin(true)
      }
    },
      init(){
          this.$loading(this.$store.state.loading)
          let obj={
              id:this.$route.query.documentid,
              tag:this.$route.query.tag,
              name:this.$route.query.name,
              start:0,
              length:10
          }
          axios.request({...BrandDetail.searchResult,params:obj}).then(res=>{
              this.brandInfo=res.data.brand;
              this.AllSend();
          });
        //  this.$store.commit("SetBrandId", this.$route.query);
      },
    AllSend(k) {
        this.$loading(this.$store.state.loading)
        let obj={
            type:1,
            brandId: this.$route.query.documentid,
            name: this.valueName,
            start: this.start,
            length:this.pageSize
        };
        axios.request({...BrandDetail.findGoodsBaseInfoAndExInfo,params:obj}).then(res=>{
          this.$loading(this.$store.state.loading).close();
            this.ProductnformaList=res.data.data;
            this.total=res.data.total;
        })
    },
    // 获取热搜的值
    hotSearchValue(val) {
     // this.valueName = val;
      this.currentPage=1;
        this.AllSend()
    },
    // 点击搜索按钮
    hotSearchsubmit() {
       this.currentPage=1;
      this.AllSend();
    },
    send(k, item) {
     // this.listFlag = k;
      this.parent_id = item.catergoryId;
      this.$router.push({
        path: "/BrandDetail/Undirect",
        query: {
          catergoryId: item.catergoryId,
          name: item.catergoryName,
          brandName: this.brandInfo.name,
          brandId: this.$route.query.documentid
        }
      });
    },
    // 排序
    // sortTab(k, item) {
    //  this.sortFlag = k;
    //   this.sort_filds = item.val;
    //   item.sortImgFlag = !item.sortImgFlag;
    //   this.sort_type = item.sortImgFlag;
    // },
      //翻页器
      handleChangePage(x){
        this.currentPage=x;
        this.AllSend()
      }
  },
  mounted() {
    this.init()
  },
  watch:{
      $route: {
          // val是改变之后的路由，oldVal是改变之前的val
          handler: function(val, oldVal){
              this.init();
          },
          // 深度观察监听
          deep: true
      },
  }
};
</script>

