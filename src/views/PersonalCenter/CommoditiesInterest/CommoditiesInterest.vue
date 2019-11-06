<template>
  <!-- 关注的商品 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>买家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>关注的商品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="CommoditiesInterest">
      <ul class="tab-list clear" v-if="total">
        <li
          v-for="(item,k) in tabList"
          :class="{bgColor:catergoryId === item.catergoryId}"
          :key="k"
          @click="tabChange(k)"
        >
          <span class="text">{{item.catergoryName}}（{{item.summaryTotal}}）</span>      
        </li>
      </ul>
        <p v-if="goodsList.length==0" class="nocontent">您还没有关注的商品</p>
      <ul class="interes-list">
        <li v-for="(item,index) in goodsList" class="clear" :key="index">
<!--          <TabImage :width="146"></TabImage>-->
            <div class="left">
                <div class="imgwrap fl">
                    <router-link
                        :to="{
                            path:'/BrandDetail/GoodsDetails',
                            query:{
                            tag:'goodsinfo',
                            documentid:item.goodsBase.id,
                            name:item.goodsBase.productno
                            }
                            }"
                    >  <ImgE :src="item.goodsBase.imageUrl" :W="100" :H="100"></ImgE></router-link>

                </div>
                <div class="text fl">
                  
                    <router-link
                        :to="{
                            path:'/BrandDetail/GoodsDetails',
                            query:{
                            tag:'goodsinfo',
                            documentid:item.goodsBase.id,
                            name:item.goodsBase.productno
                            }
                            }"
                        tag="p"
                        class="name"
                    > {{item.goodsBase.productno}}</router-link>
                    <p>
                     <span>品牌：</span>
                    <router-link
                        :to="{
                path:'/BrandDetail',
                query:{
                        tag:'brand',
                        documentid:item.goodsBase.brandId,
                        name:item.goodsBase.brand
                    }
                }" class="brand">
                       
                        {{item.goodsBase.branda}}
                    </router-link>
                    </p>
                    <P class="xh gray">
                        <span>描述：</span>
                        {{item.goodsBase.productdesc}}
                    </P>
                    <p  v-if="item.goodsBase.map && item.goodsBase.map.totalSeller">
                        共有
                        <span class="num">{{item.goodsBase.map.totalSeller}}</span>
                        个供应商报价
                        <span class="num">{{item.goodsBase.map.minPrice }}——{{item.goodsBase.map.maxPrice}}</span>
                    </p>
                </div>
            </div>
            <div class="operation fr">
                <span @click="addInquiry(index)" class="bgColor">
                    <i class="el-icon-open"></i>加询价篮
                </span>
                <br>
                <span @click="canclePub(index)" class="bgColor">
                    <i class="el-icon-star-on"></i>取消关注
                </span>
                <br>
                <span class="specialPrice bgColor" @click="specialPrice">
                    <i class="el-icon-plus"></i> 我有特价
                </span>
                <br>
                <router-link
                    :to="{
                            path:'/BrandDetail/GoodsDetails',
                            query:{
                            tag:'goodsinfo',
                            documentid:item.goodsBase.id,
                            name:item.goodsBase.productno
                            }
                            }"
                    tag="span"
                    class="bgColor"
                    v-if="item.goodsBase.map && item.goodsBase.map.totalSeller"
                >
                    <i class="el-icon-s-promotion"></i>
                    立即采购
                </router-link>
            </div>
        </li>
      </ul>
        <Pagination
            v-if="total"
            class="page"
            @current-change="handleCurrentChange"
            :currentPage.sync="currentPage"
            :pageSize="pageSize"
            :total="total">
        </Pagination>
<!--      <TabImageFoot :num="4">猜你可能会买</TabImageFoot>-->
    </div>
  </div>
</template>
<script>
import {axios,buyerOrderCenter,shoppingCar} from "../../../api/apiObj";

export default {
  name: "CommoditiesInterest",
  data() {
    return {
        pageSize:5,
        currentPage:1,
        total:0,
        catergoryId:-1,
      // tab的列表
      tabList: [
        {
            catergoryName: "全部",
            catergoryUrl: require("@/assets/image/index/u1086.png"),
            summaryTotal: 1,
            catergoryId:-1
        },

      ],
        goodsList:[]
    };
  },
    computed:{
      start(){
          return this.pageSize*(this.currentPage-1)
      }
    },
    mounted(){
      this.init()
    },
  methods: {
      specialPrice(){
          this.$message.success("开发中。。。")
      },
    tabChange(k) {
      this.catergoryId = this.tabList[k].catergoryId;
      this.currentPage=1;
      this.init();
    },
      handleCurrentChange(x){
        this.currentPage=x;
        this.init()
      },
      init(){
        let obj={
            start:this.start,
            length:this.pageSize,
            favour_type:1
        }
        if(this.catergoryId>0){
            obj.catergory_id=this.catergoryId;
        }
        axios.request({...buyerOrderCenter.queryGoodsFavouriteList,params:obj}).then(res=>{
            let count=0
            let arr=res.data.title.map(item=>{
                count+=item.summaryTotal;
                return item;
            })
            arr.unshift({...this.tabList[0],summaryTotal:count})
            this.tabList=arr;
            this.goodsList=res.data.list.data;
            this.total=res.data.list.total
        })
      },
      addInquiry(index){
        let obj={
            goodsSource:'2',
            sellerGoodsId:this.goodsList[index].goods_id,
            sellerId:this.goodsList[index].goodsBase.brandId,
            goodsName:this.goodsList[index].goodsBase.productno,
            goodsId:this.goodsList[index].goods_id
        }
          axios.request({...shoppingCar.insertShoppingCar,params:obj}).then(res=>{
                this.$message.success("已加入询价篮")
          })
      },
      canclePub(index){
        axios.request({...shoppingCar.deleteGoodsFavourite,params:{id:this.goodsList[index].id}}).then(res=>{
            this.currentPage=1;
            this.init()
        })
      }
  },
    filters:{
      // tofixed(val,length){
      //     return Number(val).toFixed(length);
      // }
    }
};
</script>
<style lang="less" scoped>
  @import "./CommoditiesInterest.less";
</style>

