<template>
  <div class="AllBrand">
    <!-- // 全部品牌 -->
    <div class="all-brand ">
      <!-- 品牌信息 -->
      <div class="brand-msg allWidth">
<!--        <div class="tit bgGray">-->
<!--            <img src="@/assets/image/brandDetail/u5426.png" alt><span>品牌信息</span>-->
<!--        </div>-->
          <div class="top">
              <p class="title">{{brandInfo.name}}</p>
              <p v-if="brandInfo.brandWeb"><a :href="brandInfo.brandWeb" target="_blank">{{brandInfo.brandWeb}}</a></p>
              <p v-if="brandInfo.tel">电话：{{brandInfo.tel}}</p>
              <p v-if="brandInfo.email">邮件：{{brandInfo.email}}</p>
          </div>
        <div class="brand-msg-con clear">
          <!--  -->
            <!-- 图片信息 -->
            <div class="brand-msg-con-l">
              <ImgE :src="brandInfo.imageUrl" :W="438" :H="178"></ImgE>
<!--              <ul>-->
<!--                <li v-if="brandInfo.brandWeb">网址：<a :href="brandInfo.brandWeb" target="_blank">{{brandInfo.brandWeb}}</a></li>-->
<!--                <li v-if="brandInfo.tel">电话：{{brandInfo.tel}}</li>-->
<!--                <li v-if="brandInfo.email">邮件：{{brandInfo.email}}</li>-->
<!--              </ul>-->
            </div>
            <!-- 文字信息 -->
            <div class="brand-msg-con-r">
              <div class="tit">
                <span>{{brandInfo.name}}</span>
<!--                  <span class="bgColor btn">收藏</span>-->
              </div>
              <p>
                {{brandInfo.brandDesc}}
              </p>
            </div>
        </div>
      </div>
      <!-- 经营品类 -->
      <div class="management-class  brand-msg allWidth">
        <div class="tit bgGray">
<!--            <img src="@/assets/image/brandDetail/u4675.png" alt>-->
            <span>经营品类</span>
        </div>
        <ul class="list">
          <li @click="AllSend(-1)" :class="{avtive:listFlag = -1}">
<!--            <img src="@/assets/image/brandDetail/u1086.png" alt>-->
            <span>全部品类</span>
            <span>({{brandInfo.count}})</span>
          </li>
          <li
            v-for="(item, k)  in brandInfo.childrenList"
            :key="item.catergoryId"
            @click="send(k,item)"
            :class="{avtive:listFlag === k}"
          >
<!--            <ImgE :src="item.catergoryUrl" :W="60" :H="60"></ImgE>-->
            <span>{{item.catergoryName}}</span>
            <span>({{item.summaryTotal}})</span>
          </li>
        </ul>
      </div>
      <div class="brand-hot brand-msg allWidth">
        <div class="tit bg">
<!--            <img src="@/assets/image/brandDetail/u4832.png" alt>-->
            <span>商品列表</span>
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
        <!--  排序-->
<!--        <ul class="sort-type clear">-->
<!--          <li-->
<!--            :class="{active:sortFlag == k }"-->
<!--            v-for="(item, k) in sortTypeList"-->
<!--            :key="`sortTypeList_${item.val}`"-->
<!--            @click="sortTab(k,item)"-->
<!--          >-->
<!--            {{item.name}}-->
<!--            <img-->
<!--              :src="item.sortImgFlag ? require('@/assets/image/home/arrow_b.png') :  require('@/assets/image/home/arrow_t.png')"-->
<!--              alt-->
<!--            >-->
<!--          </li>-->
<!--        </ul>-->
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
//import { BrandDetailData } from "@/api/BrandDetail";
//import MerchantList from "_c/MerchantList";
import SubstituModelList from "_c/SubstituModelList";
//import HotSearch from "_c/HotSearch";
//import { mapGetters} from "vuex";
//import { stat } from "fs";
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
        //
      // sortFlag: "",
      // // 当前类的id
      // parent_id: "",
      // listFlag: -1,
      // sort_filds: "",
      // // 排序列表
      // sortTypeList: [
      //   {
      //     val: "",
      //     name: "综合排序",
      //     sortImgFlag: true
      //   },
      //   {
      //     val: 0,
      //     name: "销售总量",
      //     sortImgFlag: true
      //   },
      //   {
      //     val: 1,
      //     name: "原厂价格",
      //     sortImgFlag: true
      //   }
      // ],
      // sort_type: 0,
    };
  },
  computed: {
    // ...mapGetters([
    //  // "brandInfo",
    //  // "managementList",
    // //  "totalCount",
    //  // "childrenList"
    // ]),
    // brandId() {
    //   return this.$route.query.id;
    // },
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    // 参数
    // params() {
    //   return {
    //         type:1,
    //         brandId: this.brandId,
    //         name: this.valueName,
    //         start: this.start,
    //         length:this.pageSize
    //   };
    // }
  },
  // watch: {
  //   params: {
  //     handler() {
  //       this.AllSend()
  //     },
  //     deep: true
  //   }
  // },
  components: {
   // MerchantList,
   // HotSearch,
    SubstituModelList
  },
  methods: {
      init(){
          this.$loading(this.$store.state.loading)
          // this.$store
          //     .dispatch("GetBrandDetailData", {
          //         tag: this.$route.query.tag,
          //         brandId: this.$route.query.brandId,
          //         name: this.$route.query.name,
          //         start: this.start
          //     })
          //     .then(res => {
          //         this.AllSend();
          //     });
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
    //  this.listFlag = k;
     // this.ProductnformaList=[];
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
      this.valueName = val;
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
  }
};
</script>

