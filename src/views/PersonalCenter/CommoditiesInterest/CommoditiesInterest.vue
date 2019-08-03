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
          v-for="(item,k) in tabList"
          :class="{active:catergoryId === item.catergoryId}"
          :key="k"
          @click="tabChange(k)"
        >
          <img :src="item.catergoryUrl" alt class="img-1">
          <span class="text">{{item.catergoryName}} <span class="num">（{{item.summaryTotal}}）</span>     </span>
          <div class="select">
            <img src="@/assets/image/home/u1076.png" alt>
          </div>
        </li>
      </ul>
      <ul class="interes-list">
        <li v-for="(item,index) in goodsList" class="clear">
<!--          <TabImage :width="146"></TabImage>-->
            <div class="operation">
                <div class="focus-collection">
                    <img src="@/assets/image/PersonalCenter/_u4518.png" alt @click="addInquiry(index)">
                    <img src="@/assets/image/PersonalCenter/_u4512.png" alt @click="canclePub(index)">
                </div>
                <div class="buttonIcon">
                    <div class="specialPrice">
                        <img src="@/assets/image/PersonalCenter/u4504.png" alt> 我有特价
                    </div>
                    <div class="purchase" v-if="item.goodsBase.map && item.goodsBase.map.totalSeller">
                        <img src="@/assets/image/PersonalCenter/u6221.png" alt>
                        去采购
                    </div>
                        <!--                    <ButtonIcon :width="175" :height="51">-->
<!--                        <img src="@/assets/image/PersonalCenter/u4504.png" alt>-->
<!--                        我有特价-->
<!--                    </ButtonIcon>-->
<!--                    <ButtonIcon :width="175" :height="51">-->
<!--                        <img src="@/assets/image/PersonalCenter/u6221.png" alt>-->
<!--                        去采购-->
<!--                    </ButtonIcon>-->
                </div>
            </div>
          <div class="imgwrap fl"><img :src="item.goodsBase.imageUrl" alt=""></div>
          <div class="text fl">
            <router-link to="/BrandDetail/GoodsDetails" class="name" tag="p">{{item.goodsBase.productno}}</router-link>
            <router-link to="/BrandDetail" class="brand" tag="p">
              <span>品牌：</span>
              {{item.goodsBase.brand}}
            </router-link>
            <P class="xh">
              <span>型号描述：</span>
            {{item.goodsBase.productdesc}}
            </P>
            <p  v-if="item.goodsBase.map && item.goodsBase.map.totalSeller">
              共有
              <span class="num">{{item.goodsBase.map.totalSeller}}</span>
              个供应商报价
              <span class="num">{{item.goodsBase.map.minPrice }}——{{item.goodsBase.map.maxPrice}}</span>
            </p>
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
        pageSize:2,
        currentPage:1,
        total:0,
        catergoryId:-1,
      // tab的列表
      tabList: [
        {
            catergoryName: "全部",
            catergoryUrl: require("@/assets/image/home/u1086.png"),
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
    tabChange(k) {
      this.catergoryId = this.tabList[k].catergoryId;
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
            goodsSource:2,
            sellerGoodsId:this.goodsList[index].goods_id,
            sellerId:this.goodsList[index].goodsBase.brandId,
            goodsName:this.goodsList[index].goodsBase.productno
        }
          axios.request({...shoppingCar.insertShoppingCar,params:obj}).then(res=>{
                this.$message.success("已加入询价篮")
          })
      }
  },
    filters:{
      tofixed(val,length){
          return Number(val).toFixed(length);
      }
    }
};
</script>
<style lang="less" scoped>
  @import "./CommoditiesInterest.less";
</style>

