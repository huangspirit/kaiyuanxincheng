<template>
  <div class="SubstituModelList">
    <ul class="substitu-model-list clear clear" v-if="modelList.length">
      <li v-for="(item,k) in modelList" :key="`list_${item.id}`" >
        <div class="product clear">
          <div class="model-list-t clear">
            <div class="TabImage">
              <ImgE :src="item.imageUrl" :W="160" :H="160"></ImgE>
            </div>
            <div class="text">
              <router-link
                :to="{
                path:'/BrandDetail/GoodsDetails',
                query:{
                  tag:'goodsinfo',
                  name:item.productno,
                  documentid:item.id
                }
              }"
                class="name"
                tag="p"
              >{{item.productno}}</router-link>
              
                <p >
                    <!-- <span>品牌：</span> -->
                    <router-link
                      :to="{
                      path:'/BrandDetail',
                      query:{
                        tag:'goodsinfo',
                        name:item.brand,
                        documentid:item.brandId
                      }
                    }"
                    > {{item.brand}}</router-link>
                </p>
              <p class="gray">
                <!-- <span>描述：</span> -->
                {{item.productdesc}}
              </p>
              <!-- <p v-if="item.map">
                <span v-if="!item.map.totalSeller">
                  <span class="nolist color">该零件暂无特价，赶紧抢先发布吧</span>
                </span>
                <span v-else>
                  <span>共有</span>
                  <span class="color">{{item.map.totalSeller}}</span>
                  <span>供应商报价</span>
                  <span
                    class="color"
                  >{{ item.map.minPrice}} --- {{item.map.maxPrice}}</span>
                </span>
              </p> -->
                <p class="btnWrap">
                    <span class="bgColor btn" @click="pushlishspecialPrice(k)" >我有特价</span>
                    <span class="bgOrange btn "  @click="specialPrice(k)" v-if="item.factorySellerInfo && item.factorySellerInfo.seller_goods_id">申请特价</span>
                      <span class="bgColor btn" @click="addInquiry(k)"  v-if="item.factorySellerInfo && item.factorySellerInfo.seller_goods_id">询价篮</span>
                    <span v-if="!item.focus" class="bgGray btn" @click="focus(k)">关注此零件</span>
                    <span v-if="item.focus" class="bgd5">已关注</span>
                </p>
            </div>
          </div>
        </div>
<!--        <MerchantList :id="item.id" v-if="item.map.totalSeller"></MerchantList>-->
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
    @import "./SubstituModelList.less";
</style>
<script>
//import Pdf from "_c/Pdf";
import { setTimeout } from "timers";
import {ladderPrice} from "../../lib/utils";
//import pdf from "vue-pdf";
import MerchantList from "_c/MerchantList";
import { axios, shoppingCar } from "@/api/apiObj";

import { mapState, mapActions, mapGetters,mapMutations } from "vuex";
export default {
  name: "SubstituModelList",
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisible2: false,
      loading: true,
      modelList:[],
      UserInforma:sessionStorage.getItem('UserInforma')

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
    },
  methods: {
     ...mapActions("Login", ["GetUserInforma"]),
     ...mapMutations(["setshowlogin"]),
    pushlishspecialPrice(k){
            //发布特价
                if(!this.loginState){
                      //  this.$router.push('/Login')
                        this.setshowlogin(true)
                        return;
                    } 
                if(this.UserInforma){
                    this.UserInforma=JSON.parse(this.UserInforma)
                    if(this.UserInforma.userTagMap && this.UserInforma.userTagMap.seller){
                      let val=this.modelList[k]
                        this.$router.push("/PersonalCenter/SellerIssuesProduct?name="+val.productno);
                    }else{
                        this.$router.push("/OriginalFactoryEntry");
                    }
                }else{
                    this.UserInforma={
                        userTagMap:{}
                    }
                }
                
            },
    viewDocument() {
      this.loading = true;
      this.dialogTableVisible2 = true;
      setTimeout(() => {
        this.loading = false;
      }, 4000);
    },
    addInquiry(k) {
        if(!this.loginState){
            //this.$router.push('/Login')
              this.setshowlogin(true)
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
          if(res.resultCode == "200"){
            this.$message.success("添加成功")
            var _this=this;
            setTimeout(()=>{
              _this.GetUserInforma();
            },2000)
          }
        });
    },
      focus(k){
          if(!this.loginState){
            //  this.$router.push('/Login')
              this.setshowlogin(true)
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
        
          let obj=[{...item,factorySellerInfo:factorySellerInfo}]
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

