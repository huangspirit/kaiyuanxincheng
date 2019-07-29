<template>
    <li class="SpecialOfferItem">
      <div class="top">
        <div class="prod-img">
          <ImgE :src="item.goodsImageUrl" :W="200" :H="200"></ImgE>
        </div>
        <div class="introduce">
          <router-link
            :to="{
            path:'/BrandDetail/GoodsDetails',
            query:{
              tag:'goodsinfo',
              name:item.goods_name,
              documentid:item.goods_id
            }
          }"
            tag="p"
            class="title"
          >{{item.goods_name}}</router-link>
          <router-link
            :to="{
            path:'/BrandDetail',
            query:{
              tag:'brand',
              name:item.brandName,
              documentid:item.brandId
            }
          }"
            tag="p"
            class="brand"
          >
            <span>品牌：</span>
            {{item.brandName}}
          </router-link>
          <!-- <router-link to="/BrandDetail" tag="p" class="brand-img">
            <ImgE :src="item.brandImageUrl" :W="200" :H="40"></ImgE>
          </router-link>-->
          <p>
            <span>型号描述：</span>
            {{item.goodsDesc}}
          </p>
          <!-- <p>
            <span>分类名称：</span>
            {{item.catergoryName}}
          </p>
          <p>
            <span>剩余库存：</span>
            {{item.goodsStockCount}}件
          </p>
          <p>
            <span>已售出：</span>
            {{item.sellerCount}}件
          </p>-->
        </div>
        <div class="merchant" @mouseleave="merchantInformaleave">
          <div @mouseenter="merchantInforma">
            <!-- <ImgE :src="item.userImgeUrl" :W="89" :H="89" class="merchant-img"></ImgE> -->
            <div class="merchant-img">
              <img :src="item.userImgeUrl" alt>
            </div>
            <p class="name">{{item.sellerName}}</p>
          </div>
          <div class="merchant-information" v-if="merchantInformaFlag">
            <img
              src="@/assets/image/home/u226.png"
              alt
              class="close"
              @click="merchantInformaFlag = false"
            />

            <div>
              <!-- <ImgE :src="item.userImgeUrl" :W="89" :H="89" class="user-img"></ImgE> -->
              <div class="merchant-img">
                <img :src="item.userImgeUrl" alt>
                <div class="username">
                <span class="name">{{item.sellerName}}</span>
                <span class="brd">原厂商户</span>
              </div>
              </div>
            </div>
            <p>历史发单数量：{{item.publisCount}}笔</p>
            <p>历史成交量：{{item.historyCount}}笔</p>
            <p>
              产品质量:
              <img src="@/assets/image/home/u194.png" alt class="start">
              <img src="@/assets/image/home/u194.png" alt class="start">
            </p>
            <p>
              交货速度:
              <img src="@/assets/image/home/u194.png" alt class="start">
              <img src="@/assets/image/home/u194.png" alt class="start">
            </p>
            <p>
              描述相符:
              <img src="@/assets/image/home/u194.png" alt class="start">
            </p>
            <span
              :class="{follow:true,yfollow:followFlag}"
              @click="follow"
            >{{followFlag ? '-已关注':'+关注'}}</span>
          </div>
        </div>
      </div>
      <table class="table">
        <tr class="title">
          <td>MOQ</td>
          <td>MPQ</td>
          <td>货源</td>
          <td>交货地</td>
          <td>预计交期</td>
          <td rowspan="3" v-if="!item.priceType">
            <p>{{item.priceUnit ? '$' : '￥'}}{{item.goodsPrice}}</p>
            {{item.priceType ? '阶梯价' : "一口价"}}({{item.includBill ? '含税' : "不含税"}})
          </td>
          <td rowspan="3" v-else>
            <div>
              {{item.priceType ? '阶梯价' : "一口价"}}({{item.includBill ? '含税' : "不含税"}})
              <ul class="priceLevel">
                <li v-for="val in priceLevel" :key="val[0]">
                  <span>{{val[0]}}</span>
                  <span class="num">{{item.priceUnit ? '$' : '￥'}}{{val[1]}}</span>
                  <!-- <span>({{item.includBill ? '含税' : "不含税"}})</span> -->
                </li>
              </ul>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{item.moq}}</td>
          <td>{{item.mpq}}</td>
          <td>{{item.goods_type ? '现货' : '期货'}}</td>
          <td>{{item.diliverPlace}}</td>
          <td v-if="item.seller_always">{{`下单${item.day_interval}天后交货`}}</td>
          <td v-else>{{item.deliverTime | formatDate }}</td>
        </tr>
      </table>

      <div class="end-time" v-if="!item.seller_always">
        <p class="goodsStockCount">当前剩{{item.goodsStockCount}}只可采</p>
        <img src="@/assets/image/home/u93.png" alt class="naoz" v-if="item.sellStatus == 1">
         <CountTime
         class="CountTime"
         v-if="!item.seller_always"
          v-on:start_callback="countDownS_cb(item)"
          v-on:end_callback="countDownE_cb(item)"
          :currentTime="item.currentTime"
          :startTime="item.currentTime"
          :endTime="item.expireTime"
          :tipText="'距离开始文字1'" 
          :tipTextEnd="'距离此特价结束:'" 
          :endText="'结束自定义文字2'" 
          :dayTxt="'天'" 
          :hourTxt="'小时'" 
          :minutesTxt="'分钟'" 
          :secondsTxt="'秒'"
        ></CountTime>
      
      </div>
      <div class="documentary" >
        <span @click="documentary">立刻跟单</span>
        <img src="@/assets/image/home/u139.png" alt>
      </div>
      <div class="submit-settlement" v-if="submitFlag">
        <div class="submit-settlement-t">
          <div class="number">
            <span class="text">数量:</span>
            <el-input-number
              v-model="purchaseObj.num"
              :step="item.mpq"
              :min="1"
              :max="item.goodsStockCount"
              label="描述文字"
              @change="numberChange"
            ></el-input-number>
          </div>
          <div class="total">
            <span>总计：</span>
            <span>￥{{purchaseObj.total}}</span>
          </div>
        </div>
        <p class="error-number" v-if="numberFlag">*数量必须是MOQ的整数倍</p>
        <div class="submit-settlement-b">
          <div :class="{sub:true,noSubmit:numberFlag}" @click="goodsSubmit">提交结算</div>
          <router-link to="/InquiryBasket/ApplySpecialPrice" tag="div" class="sq">申请特价</router-link>
          <div class="add-car">+加购物车</div>
        </div>
        <span class="close" @click="colse">
          <img src="@/assets/image/home/u172.png" alt>
        </span>
      </div>
    </li>
</template>
<script>
import "./SpecialOfferItem.less";
import { formatDate } from "@/lib/utils";

import { mapState, mapActions, mapGetters,mapMutations } from "vuex";
export default {
  name: "SpecialOfferItem",
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      numberFlag: false,
      // 提交结算
      submitFlag: false,
      //  商家信息
      merchantInformaFlag: false,
      //  关注
      followFlag: false,
      // 阶梯价格
      priceLevel: [],
      //下单产品的数量和价格
      purchaseObj: {
        num: 0,
        price: 0,
        total: 0
      }
    };
  },
  filters: {
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "yyyy-MM-dd");
    }
  },
  watch: {
    "purchaseObj.num": {
      handler() {
        this.purchaseObj.total = (
          this.purchaseObj.num * this.purchaseObj.price
        ).toFixed(4);
      }
    }
  },

  computed: {
    access_token() {
      return localStorage.getItem("access_token");
    }
  },
  methods: {
    ...mapMutations("MerchantList",["setBuyOneGoodsDetail"]),
    ...mapActions([]),
    // 提交结算
    goodsSubmit() {
      if (!this.numberFlag) {
        // 生成orderJson
        let orderJson = [];
        let obj = {
          seckill_goods_id: this.item.id,
          goods_id: this.item.goods_id,
          goods_name: this.item.goods_name,
          goods_count: this.purchaseObj.num,
          goods_price: this.purchaseObj.price,
          order_channe: 1,
          clude_bill: this.item.includBill,
          pay_channe: 1,
          price_unit: this.item.priceUnit,
          goods_type: this.item.priceType,
          sellerName: this.item.sellerName,
          sellerHeader: this.item.userImgeUrl,
          tag: this.item.tag,
          goodsDesc: this.item.goodsDesc,
          goodsImage: this.item.goodsImageUrl,
          diliver_place: this.item.diliverPlace,
          complete_date: this.item.deliverTime,
          seller_id: this.item.sellerId,
          diliver_date: this.item.deliverTime,
          end_date: this.item.endTime
        };
        orderJson.push(obj);
        let billObj = {
          billtype: "1",
          content_id: "1"
        };
        // 生成bill对象
        let obj2 = {
          bill: JSON.stringify(billObj),
          dilivertype: "1",
          order: JSON.stringify(orderJson),
          add_id: 1,
          access_token: this.access_token,
          type: 0,
          orderSource: 1
        };
        this.$store
          .dispatch("MerchantList/GetOrder", obj2)
          .then(res => {
            localStorage.setItem("buyOneGoodsDetail",JSON.stringify({
                data: JSON.stringify(res),
                obj2: JSON.stringify(obj2)
              }))
            this.setBuyOneGoodsDetail(JSON.stringify({
                data: JSON.stringify(res),
                obj2: JSON.stringify(obj2)
              }));
            this.$router.push({
              path: "/ShoppingCart/ShoppingSettlement",
              // query: {
              //   data: JSON.stringify(res),
              //   obj2: JSON.stringify(obj2)
              // }
            });
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
    countDownS_cb: function(item) {
      item.sellStatus = 1;
    },
    countDownE_cb: function(item) {
      item.sellStatus = 2;
    },
    colse() {
      this.submitFlag = false;
    },
    documentary() {
      console.log
      if (!sessionStorage.getItem("access_token")) {
        this.$router.push({
          path: "/Login"
        });
      } else {
        this.submitFlag = true;
      }
    },
    merchantInforma() {
      this.merchantInformaFlag = true;
    },
    merchantInformaleave() {
      this.merchantInformaFlag = false;
    },
    follow() {
      this.followFlag = !this.followFlag;
    },
    //下单想数量改变时
    numberChange(value) {
      if (this.purchaseObj.num % this.item.moq === 0) {
        this.numberFlag = false;
      } else {
        this.numberFlag = true;
      }
      if (this.item.priceType) {
        this.priceLevel.forEach((item, index) => {
          if (index === 0 && value < Number(item[0])) {
            this.purchaseObj.price = Number(item[1]);
          } else if (
            value < Number(item[0]) &&
            value > Number(this.priceLevel[index - 1][0])
          ) {
            this.purchaseObj.price = Number(item[1]);
          }
        });
      }
    }
  },
  mounted() {
    if (this.item.priceType) {
      let ret = this.item.priceLevel.split("@");
      ret.forEach((item, index) => {
        ret[index] = item.split("-");
      });
      this.priceLevel = ret;
    }
    this.purchaseObj.num = this.item.moq;
    if (this.item.goodsPrice) {
      this.purchaseObj.price = this.item.goodsPrice;
    } else {
      this.purchaseObj.price = this.priceLevel[0][1];
    }

    this.purchaseObj.total = (
      this.purchaseObj.num * this.purchaseObj.price
    ).toFixed(4);
  }
};
</script>

<style>
</style>
