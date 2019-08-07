<template>
  <!-- 商品详情页 -->
  <div class="GoodsDetails">
    <!-- 商品详情 -->
    <div class="goods-detail">
      <div class="tit-h">
          <img src="@/assets/image/brandDetail/u9664.png" alt />
          <span>商品详情</span>
      </div>
      <div class="goods-detail-con clear">
          <!-- 商品文字信息 -->
            <!-- 图片切换 -->
          <Purchase :item="purchaseObj" @closeCallBack="showPurchase=false" v-if="showPurchase"></Purchase>
              <ImgE :src="goodsinfo.imageUrl" :W="210" :H="210" class="ImgE fl"></ImgE>
            <div class="text-cont fl">
              <p class="name">{{goodsinfo.productno}}</p>
                <p class="brand">
                    <label>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</label>
                    {{goodsinfo.brand}}
                    <ImgE :src="goodsinfo.brandImageUrl" :W="82" :H="32"></ImgE>
                </p>
                <p class="classification brand">
                    <label>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</label>
                    <a>{{goodsinfo.classification}}</a>
                </p>

                <p class="desc brand">
                  <label>功能描述：</label>
                  {{goodsinfo.productdesc}}
                </p>
                  <p class="btn">
                      <template>
                          <span v-if="goodsinfo.focus">
                            <img src="@/assets/image/brandDetail/_u4510.png"  alt />
                            已关注
                          </span>
                          <span @click="addFocus" v-if="!goodsinfo.focus">
                            <img src="@/assets/image/brandDetail/_u4510.png"  alt />
                            +关注
                          </span>
                      </template>
                       <span  @click="addInquiry">
                        <img src="@/assets/image/brandDetail/_u4518.png" alt />
                        +询价篮
                      </span>
                      <span @click="addShopingCar">
                        <img src="@/assets/image/brandDetail/u10698.png"  alt />
                        +购物车
                      </span>
                      <span @click="purchase" >
                          <img src="@/assets/image/brandDetail/u10698.png" alt />
                        +立即购买
                      </span>
                  </p>
            </div>
          <div
            class="goods-detail-price"
            v-if="goodsinfo.factorySellerInfo && goodsinfo.factorySellerInfo.diliver_place"
          >
              <p class="title">原厂直供</p>
              <ul>
                <li>
                  <span class="name">MOQ：</span>
                  <span class="fr">{{goodsinfo.factorySellerInfo.moq}}</span>
                </li>
                <li>
                  <span class="name">MPQ：</span>
                  <span class="fr">{{goodsinfo.factorySellerInfo.mpq}}</span>
                </li>
                <li>
                  <span class="name">预计交期：</span>
                  <span v-if="goodsinfo.factorySellerInfo.seller_always" class="fr">{{goodsinfo.factorySellerInfo.day_interval}}天</span>
                  <span v-else>{{goodsinfo.factorySellerInfo.complete_date | formatDate}}</span>
                </li>
                <li>
                  <span class="name">交货地址：</span>
                  <span class="fr">{{goodsinfo.factorySellerInfo.diliver_place}}</span>
                </li>
                  <li v-if="!goodsinfo.factorySellerInfo.price_type">
                      <span class="name">一口价：</span>
                      <span class="fr">{{goodsinfo.priceunit?"$":"￥"}}{{goodsinfo.factorySellerInfo.seckil_price}}</span>
                  </li>
                <li class="LadderPrice" v-if="goodsinfo.factorySellerInfo.price_type">
                    <p v-for="item0 in goodsinfo.factorySellerInfo.priceList">
                        <span class="name">{{item0.num}}+</span>
                        <strong class="fr">{{goodsinfo.priceunit?"$":"￥"}}{{item0.price}}</strong>
                    </p>
                </li>
              </ul>

          </div>
          <div v-else class="goods-detail-price no-factorySellerInfo">
              暂无原厂报价
<!--            <div>-->
<!--              <router-link to="/OriginalFactoryEntry" class="factorySeller" tag="p">原厂入驻</router-link>-->
<!--            </div>-->
          </div>
      </div>
    </div>
    <!-- 特价共享区 -->
    <div class="special-offer">
      <div class="tit-h">
          <img src="@/assets/image/brandDetail/u9664.png" alt />
          <span>特价共享区</span>
<!--          <span class="more-special">申请更低价</span>-->
      </div>
      <p class="StatementStatus">* 标注现货货字样的需要付全款购买，发货日期大于当前购买日期七天的按照用户信用额度进行百分比预付款，以订单支付日期为准</p>
      <!-- 商家信息列表 -->
      <MerchantList :id="goodsinfo.id" v-if="goodsinfo.id"></MerchantList>
    </div>
    <!-- 详细信息 -->
    <div class="detail-informan">
      <div class="tit-h">
          <img src="@/assets/image/brandDetail/u10011.png" alt />
          <span>详细信息（RMC1/16-102JTP）</span>
      </div>
      <div class="detail-informan-con">
          <p class="tit">
            <span>技术参数</span>
            <span>产品手册</span>
          </p>
          <ul class="parameter clear">
            <li>
              <el-table :data="goodsinfo.list" stripe border>
                <el-table-column property="name" label="类型"></el-table-column>
                <el-table-column property="value" label="参数"></el-table-column>
              </el-table>
            </li>
            <li
                class="datasheet"
                style="height:700px"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <iframe
                    id="ifra"
                    :src="datasheet"
                    frameborder="0"
                    width="100%"
                    height="100%"
                    v-if="datasheet"
                ></iframe>
                <p v-else>暂无产品手册</p>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./GoodsDetails.less";
</style>

<script>
import {TimeForma2,ladderPrice} from "../../../lib/utils";
import MerchantList from "_c/MerchantList";
import SubstituModelList from "_c/SubstituModelList";
import {mapActions} from "vuex";
import { baseURL, baseURL2 } from "@/config";
import { axios, shoppingCar } from "@/api/apiObj";

export default {
  name: "GoodsDetails",
  data() {
    return {
      loading: false,
      goodsinfo: {},
      purchaseObj:{},
      // 技术参数
      datasheet: "",
      // 下载技术参数的路径
      downDatasheet: "",
      // loading
      loading: true,
      showPurchase:false
    };
  },
  components: {
    MerchantList,
    SubstituModelList
  },
  methods: {
    ...mapActions("GoodsDetails", ["GetQueryGoodsDatesheet"]),
    // 查看产品手册
    searchDatasheet(id) {
      let ret = baseURL + "api-g/gods-anon/queryGoodsDatesheet?id=" + id;
      this.downDatasheet = ret;
      let resp =
        baseURL2 + "static/pdf/web/viewer.html?file=" + encodeURIComponent(ret);
      this.datasheet = resp;
      const self = this;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    },
    addInquiry() {
        if(!this.loginState){
            this.$router.push('/Login')
            return;
        }
      var obj = {
        sellerGoodsId: this.goodsinfo.id,
        sellerId:this.goodsinfo.brandId,
        goodsSource: "2",
        goodsName: this.goodsinfo.productno,
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
            this.$message.success("添加成功");
        });
    },
      addFocus(){
          if(!this.loginState){
              this.$router.push('/Login')
              return;
          }
          let obj={
              goods_id:this.goodsinfo.id,
              catergory_id :this.goodsinfo.classificationId,
              favour_type: "1",
          };
          axios
              .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
              .then(res => {
                  this.$set(this.goodsinfo,"focus",true)
                 // this.$message.success("已关注");
              });

      },
      addShopingCar(){
          if(!this.loginState){
              this.$router.push('/Login')
              return;
          };
          var obj = {
              sellerGoodsId: this.goodsinfo.factorySellerInfo.seller_goods_id,
              sellerId:this.goodsinfo.factorySellerInfo.seller_id,
              goodsSource: "1",
              goodsName:this.goodsinfo.productno,
              goodsId:this.goodsinfo.id
          };
          axios
              .request({ ...shoppingCar.insertShoppingCar, params: obj })
              .then(res => {
                  this.$message.success("添加成功");
              });
      },
      purchase(){
          if(!this.loginState){
              this.$router.push('/Login')
              return;
          }
          this.showPurchase=true
      }

  },
  mounted() {
    this.$store
      .dispatch("GoodsDetails/GetGoodsDetailData", this.$route.query)
      .then(res => {
       if(res.factorySellerInfo.price_type){
           res.factorySellerInfo.priceList=ladderPrice(res.factorySellerInfo.price_level)
       }
       this.goodsinfo = res;
       this.purchaseObj={
           goods_id: res.id,
           goods_name: res.productno,
           goodsDesc: res.productdesc,
           goodsImage: res.imageUrl,
           clude_bill: res.factorySellerInfo.clude_bill,
           price_unit: res.factorySellerInfo.priceunit,
           seckill_goods_id: res.factorySellerInfo.seller_goods_id,
           goods_type:res.factorySellerInfo.goods_type,
           diliver_place: res.factorySellerInfo.diliver_place,
           moq:Number(res.factorySellerInfo.moq),
           mpq:Number(res.factorySellerInfo.mpq),
           stockcount:res.factorySellerInfo.stockcount,
           price_type:res.factorySellerInfo.price_type,
           priceList:res.factorySellerInfo.priceList,
           seckil_price:res.factorySellerInfo.seckil_price,
           sellerName: res.factorySellerInfo.seller_name,
           sellerHeader: res.factorySellerInfo.seller_header,
           seller_id: res.factorySellerInfo.seller_id,
           tag: 1,
       }
       // if(!res.factorySellerInfo.seller_always){
       //     this.purchaseObj={
       //         ...this.purchaseObj,
       //         complete_date: res.factorySellerInfo.complete_date,
       //         diliver_date: res.factorySellerInfo.complete_date,
       //         end_date: res.factorySellerInfo.end_date
       //     }
       // }
        this.searchDatasheet(res.id)
      });
  },
  computed: {
      loginState(){
          return this.$store.state.loginState
      }
  },
    filters:{
      formatDate(val){
          return TimeForma2(val)
      }
    }
};
</script>

