<template>
  <div class="SubstituModelList">
    <ul class="substitu-model-list clear" v-if="modelList.length">
      <li v-for="(item,k) in modelList" :key="`list_${item.id}`" >
        <div class="product clear">
            <div class="model-list-b fr">
                <ButtonIcon :width="100" :height="40" @click="specialPrice(k)">
                    <img src="@/assets/image/brandDetail/u4504.png" alt />
                    申请特价
                </ButtonIcon>
<!--                <ButtonIcon :width="100" :height="40" @click="focus(k)" v-if="!item.focus">-->
<!--                    <img src="@/assets/image/brandDetail/_u4510.png" alt />-->
<!--                    +关注-->
<!--                </ButtonIcon>-->

<!--                <ButtonIcon :width="145" :height="50">-->
<!--                    <img src="@/assets/image/brandDetail/u4504.png" alt />-->
<!--                    我有特价-->
<!--                </ButtonIcon>-->
                <span @click="addInquiry(k)">
                  <img src="@/assets/image/brandDetail/_u4518.png" alt />
                </span>
                <span @click="focus(k)" v-if="!item.focus">
                  <img src="@/assets/image/brandDetail/_u4510.png" alt />
                </span>
            </div>
          <div class="model-list-t clear fl">
            <div class="TabImage">
              <ImgE :src="item.imageUrl" :W="190" :H="190"></ImgE>
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
                <p>
                    <span>品牌：</span>
                    {{item.brand}}
                </p>
              <P>
                <span>型号描述：</span>
                {{item.productdesc}}
              </P>
              <p v-if="item.map">
                <span v-if="!item.map.totalSeller">
                  <span class="nolist">暂无供应商报价</span>
                </span>
                <span v-else>
                  <span>共有</span>
                  <span class="num">{{item.map.totalSeller}}</span>
                  <span>供应商报价</span>
                  <span
                    class="num"
                  >{{ item.map.minPrice}} --- {{item.map.maxPrice}}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <MerchantList :id="item.id" v-if="item.map.totalSeller"></MerchantList>
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
      modelList:[]
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
          factorySellerInfo.priceLevel=factorySellerInfo.price_level
          this.$store.dispatch("promation", {...item,factorySellerInfo:factorySellerInfo});
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

