<template>
  <div class="SubstituModelList">
    <el-table
    :data="modelList"
    border
    style="width: 100%"
    max-height="500">
    <el-table-column
      fixed
      prop="date"
      label="图片"
      width="150"
      align="center">
      <template slot-scope="scope">
            <ImgE :src="scope.row.imageUrl" :W="190" :H="190"></ImgE>
      </template>
    </el-table-column>
    <el-table-column
     fixed
      prop="name"
      label="器件描述"
      width="300"
      >
      <template slot-scope="scope">
            <router-link
                :to="{
                path:'/BrandDetail/GoodsDetails',
                query:{
                  tag:'goodsinfo',
                  name:scope.row.productno,
                  documentid:scope.row.id
                }
              }"
                class="name color"
                tag="p"
              >{{scope.row.productno}}</router-link>
                <p>
                    <span>制造商：</span>
                    <router-link
                :to="{
                path:'/BrandDetail',
                query:{
                  tag:'brand',
                  name:scope.row.brand,
                  documentid:scope.row.brandId
                }
              }"
                class=""
                
              > {{scope.row.brand}}</router-link>
                   
                </p>
              <p>
                <span>型号描述：</span>
                {{scope.row.productdesc}}
              </p>
              <p v-if="scope.row.map">
                <span v-if="!scope.row.map.totalSeller">
                  <span class="nolist">暂无供应商报价</span>
                </span>
                <span v-else>
                  <span>共有</span>
                  <span class="color">{{scope.row.map.totalSeller}}</span>
                  <span>供应商报价</span>
                  <span
                    class="color"
                  >{{ scope.row.map.minPrice}} --- {{scope.row.map.maxPrice}}</span>
                </span>
              </p>
      </template>
    </el-table-column>
     <el-table-column
      fixed
      label="操作"
      width="150"
      align="center">
      <template slot-scope="scope">
        <p class="btnWrap">
            <el-button class="orange btn" @click="addInquiry(scope.$index)" size="mini">询价篮</el-button><br>
            <el-button class="orange btn "  @click="specialPrice(scope.$index)" size="mini">申请特价</el-button><br>
            <el-button v-if="!scope.row.focus" class="orange btn" @click="focus(scope.$index)" size="mini">收藏商品</el-button>
            <span v-if="scope.row.focus" class="bgLightGray btn">已收藏</span>
        </p>
      </template>
    </el-table-column>
    <template v-for="(item,k) in titleList">
         <el-table-column
            prop="list"
            :label="item.name"
            width="150"
            :key="item.id"
            align="center"
            >
            <template slot-scope="scope">
          <span >
            {{scope.row.list[k].value}}
          </span>
      </template>
    </el-table-column>
    </template>
    
   
  </el-table>
  </div>
</template>
<style lang="less" scoped>
    @import "./SubstituModelListTable.less";
</style>
<script>
//import Pdf from "_c/Pdf";
import { setTimeout } from "timers";
import {ladderPrice} from "../../lib/utils";
//import pdf from "vue-pdf";
import MerchantList from "_c/MerchantList";
import { axios, shoppingCar } from "@/api/apiObj";
export default {
  name: "SubstituModelList",
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisible2: false,
      loading: true,
      modelList:[],
      titleList:[]
    };
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
    watch:{
      list:{
          deep:true,
          handler(val){
              this.modelList=val
          }
      }
    },
    mounted(){
      this.modelList=this.list
      this.titleList=this.list[0].list
    },
  methods: {
    viewDocument() {
      this.loading = true;
      this.dialogTableVisible2 = true;
      setTimeout(() => {
        this.loading = false;
      }, 4000);
    },
    addInquiry(k) {
        if(!this.loginState){
            this.$router.push('/Login')
            return;
        }
      let val=this.modelList[k]
      var obj = {
        sellerGoodsId: val.id,
        goodsId:val.id,
        sellerId: val.brandId,
        goodsSource: "2",
        goodsName:val.productno
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          console.log(res);
          if(res.resultCode == "200"){
            this.$message.success("添加成功")
          }
        });
    },
      focus(k){
          if(!this.loginState){
              this.$router.push('/Login')
              return;
          }
          let obj={
              goods_id:this.modelList[k].id,
              catergory_id: this.modelList[k].classificationId,
              favour_type: "1",
          };
          axios
              .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
              .then(res => {
                  this.$set(this.modelList[k],"focus",true)
                  this.$message.success("已关注");
              });
      },
      specialPrice(k){
        let item=this.modelList[k]
          let factorySellerInfo=item.factorySellerInfo
          factorySellerInfo.priceType=factorySellerInfo.price_type
          if(factorySellerInfo.price_level){
              factorySellerInfo.priceList=ladderPrice(factorySellerInfo.price_level)
          }else if(factorySellerInfo.priceLevel){
              factorySellerInfo.priceList=ladderPrice(factorySellerInfo.priceLevel)
          }
          if(factorySellerInfo.seckil_price){
              factorySellerInfo.seckilPrice=factorySellerInfo.seckil_price;
          }
          let obj={goodsbaseIno:{...item,factorySellerInfo:factorySellerInfo}}
          this.$store.dispatch("promation", obj);
          this.$router.push("/InquiryBasket/ApplySpecialPrice");

      }
  },
  components: {
      //pdf,
      MerchantList
  },
    computed: {
        loginState(){
            return this.$store.state.loginState
        }
    },
};
</script>

