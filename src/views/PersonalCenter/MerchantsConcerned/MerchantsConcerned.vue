<template>
  <!-- 关注的商家 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>买家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>关注的商家</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="MerchantsConcerned">
      <ul class="tab-list clear" v-if="total">
        <li
            v-for="(item, k) in title"
          :class="{bgColor:item.catergoryId === catergory_id}"
          :key="k"
          @click="tabChange(k)"
        >
          <span class="text">{{item.catergoryId | catergoryIdFilter}} ({{item.summaryTotal}})</span>
        </li>
      </ul>
      <!-- 商家列表 -->
        <div class="nocontent" v-if="!list.data || list.data.length==0">您还没有关注任何商家</div>
      <ul class="merchant-list">
        <li v-for="item in data" :key="item.id">
          <!-- 品牌信息 -->
          <div class="brand-information">
            <div @click="chipShop(item)"><ImgE :src="item.headUrl" :W="100" :H="100" style="width:10vw;text-align:center;cursor:pointer" ></ImgE></div>
            <p class="name">{{item.sellerName}}<span class="tag yc bgColor">{{item.user_tag | catergoryIdFilter}}</span></p>
            <span class="focus-on" @click="deleteGoodsFavourite(item.id)">取消关注</span>
          </div>
          <!-- 关注商家产品列表 -->
          <MerchantsConcernedImgTab v-if="item.goodsListBySeller" :list="item.goodsListBySeller" :item0="{seller_id:item.seller_id,sellerName:item.sellerName,headUrl:item.headUrl,userImgeUrl:item.headUrl,tag:item.user_tag}"></MerchantsConcernedImgTab>
        </li>
      </ul>
        <Pagination
            v-if="total"
            :pageSize="pageSize"
            :total="total"
            :currentPage="currentPage"
            @current-change="currentChange"
        ></Pagination>
    </div>
  </div>
</template>
<script>
import {axios,buyerOrderCenter,shoppingCar} from "../../../api/apiObj"
import MerchantsConcernedImgTab from "_c/MerchantsConcernedImgTab";
export default {
  name: "MerchantsConcerned",
  data() {
    return {
        pageSize:10,
        currentPage:1,
        total:0,
        catergory_id:0,
        list:[],
        data:[],
        title:[]
    };
  },
  components: {
    MerchantsConcernedImgTab
  },
    mounted(){
      this.init()
    },
    filters:{
        catergoryIdFilter(val){
            switch (val) {
                case 0:
                    return "全部商家";
                case 1:
                    return "原厂";
                case 2:
                    return "代理商";
                case 3:
                    return "普通商家";
                case 18:
                    return "企业分销商";
            }
        }
    },
  methods: {
    chipShop(item){
               
                if(item.user_tag==1){
                    this.$router.push({
                        path:"/BrandDetail",
                        query:{
                           seller_id:item.seller_id
                        }
                    })
                }else{
                    this.$router.push({
                        path:"/sellerShopDetail",
                        query:{
                         
                            sellerId:item.sellerId
                        }
                    })
                }
            },
    tabChange(x) {
      this.catergory_id = this.title[x].catergoryId;
      this.currentPage=1;
      this.init()
    },
      currentChange(x){
        this.currentPage=x;
        this.init()
      },
      init(){
        let obj={
            start:this.start,
            length:this.pageSize,
            favour_type:2
        }
        if(this.catergory_id>0){
            obj.user_tag=this.catergory_id
        }
        axios.request({...buyerOrderCenter.queryGoodsFavouriteList,params:obj}).then(res=>{
            this.list=res.data.list;
            this.data=res.data.list.data;
            let count=0
            this.title=res.data.title.map(item0=>{
                count+=item0.summaryTotal;
                return item0;
            });
            this.title.unshift({summaryTotal:count,catergoryId:0})
            this.total=res.data.list.total;
        })
      },
      deleteGoodsFavourite(itemId){
          axios.request({...shoppingCar.deleteGoodsFavourite,params:{id:itemId}}).then(res=>{
              this.$message.success("已取消关注")
              this.currentChange=1;
              this.init()
          })
      }
  },
    computed:{
      start(){
          return this.pageSize*(this.currentPage-1)
      }
    }
};
</script>

<style lang="less" scoped>
@import "./MerchantsConcerned.less";
</style>

