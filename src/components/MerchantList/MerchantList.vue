<template>
  <!-- 商家列表 -->
  <div class="MerchantList" ref="searchBar" v-if="total">
    <ul class="title bgGray clear">
      <li>实物图</li>
      <li>商家</li>
      <!-- <li>器件与订购描述</li> -->
      <li>交货周期</li>
      <li>订购条件</li>
      <li>剩余数量</li>
      <li>跟单价</li>
      <li>操作</li>
    </ul>
    <div>
      <template v-for="(item,index) in MerchantList">
        <div v-if="item.tag==1" class="item originFactory clear" :key="index">
          <div class="flexitemwrap">
            <div class="infoimg flexitem clear">
              <template v-for="(item0 ,index0) in item.sellerGoodsImageUrl.split('@')">
                <div :key="item0" v-if="index0<3">
                  <span class="cover" @click="bigimg(item.sellerGoodsImageUrl,index0)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <ImgE :src="baseURL3+'/'+item0" :W="50" :H="50"></ImgE>
                </div>
              </template>
            </div>
            <div class="info flexitem">
              <div>
                <!-- <img :src="item.userImgeUrl" :onerror="`this.src='${HeaderImg}'`"/> -->
                <div>
                  <p style="font-size:15px;">{{item.sellerName}}</p>
                  <p>
                    <span
                      class="tag bgColor"
                      style="margin-right:10px;"
                      v-if="item.tag!=3"
                    >{{item.tag | tagFilter}}</span>
                    <span class="btn tag" v-if="!item.focus" @click="focus(index)">
                      <img src="@/assets/image/icon/unfocus.png" alt />关注此卖家
                    </span>
                    <span class="tag" v-if="item.focus">
                      <img src="@/assets/image/icon/focus.png" alt />已关注
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="timer flexitem">
              <div>
                <p>
                  <label class="blue">{{item.goods_type ? '现货' : '订货'}}</label>
                </p>
                <p>
                  预计于
                  <span v-if="item.seller_always">{{item.day_interval | filterHours}}小时内</span>
                  <span v-else>{{item.deliverTime | formatDate}}</span>
                </p>
                <p>{{item.diliverPlace}}发货</p>
              </div>
            </div>
            <div class="sellerInfo flexitem">
              <div>
                <p v-if="item.base_no" class="green">批号：{{item.base_no}}</p>
                <p class="gray">起订量：{{item.moq | toFixed(0)}}只</p>
                <p class="gray">最小增量：{{item.mpq | toFixed(0)}}只</p>
              </div>

              <!-- <p>总数量：{{item.goodsCount}}只</p>
              <p>(已成交：{{item.sellerCount}})</p>-->
            </div>
            <div class="flexitem">
              <p class="blue">{{item.goodsStockCount | toFixed(0)}}只</p>
              <p v-if="item.customerCount" class="gray">已有{{item.customerCount}}人跟单</p>
            </div>
            <div class="price flexitem">
              <div class="stepped-price color" v-if="item.priceType && item.is_old_product">
                <p class="color">
                  <span>
                    {{item.priceUnit ? '$' : '￥'}}
                    <strong
                      class="price-num"
                    >{{item.priceList[item.priceList.length-1].price | toFixed(item.priceUnit?3:2)}}</strong>
                    <i class="el-icon-circle-plus-outline"></i>
                  </span>
                  <template v-if="item.is_old_product">
                    <br />
                    <span class="btn oldProduct" style="margin-top:3px;">呆料清仓</span>
                  </template>
                </p>
                <ul>
                  <li v-for="(val, k) in item.priceList" :key="k" class="clear color">
                    <span
                      class="fr"
                    >{{item.priceUnit ? '$' : '￥'}}{{val.price | toFixed(item.priceUnit?3:2)}}</span>
                    <span class="fl">{{val.num}}+</span>
                  </li>
                </ul>
              </div>
              <div class="stepped-price-origin color" v-if="item.priceType && !item.is_old_product">
                <ul class="clear">
                  <li v-for="(val, k) in item.priceList" :key="k" class="clear color">
                    <span
                      class="fr"
                    >{{item.priceUnit ? '$' : '￥'}}{{val.price | toFixed(item.priceUnit?3:2)}}</span>
                    <span class="fl">{{val.num}}+</span>
                  </li>
                </ul>
              </div>

              <div v-if="!item.priceType" class="goodsprice">
                <span class="color mark">{{item.priceUnit ? '$' : '￥'}}</span>
                <span class="price-num color">{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</span>
                <br />
                <span class="btn bgColor">一口价</span>
                <template v-if="item.is_old_product">
                  <br />
                  <span class="btn oldProduct" style="margin-top:3px;">呆料清仓</span>
                </template>
              </div>

              <p style="margin-top:5px;">
                <a href="javascript:;" @click="specialPrice" v-if="item.priceType">更多数量可申请特价</a>
              </p>
            </div>
            <div class="btnWrap flexitem">
              <p class="bgColor" @click="purchase(index)">立即跟单</p>
              <p class="specialPrice" @click="specialPrice">申请特价</p>
              <p class="addCark" @click="addCar(index)">加入购物车</p>
              <Purchase
                :item="item.purchaseObj"
                v-if="item.showPurchase"
                @closeCallBack="item.showPurchase=false"
              ></Purchase>
            </div>
          </div>
          <div v-if="!item.seller_always" class="countTime blue">
            <CountTime
              v-on:end_callback="countDownE_cb()"
              :currentTime="item.currentTime"
              :startTime="item.currentTime"
              :endTime="item.expireTime"
              :tipText="''"
              :tipTextEnd="'距特价结束：'"
              :endText="'活动已结束'"
              :dayTxt="'天'"
              :hourTxt="'小时'"
              :minutesTxt="'分钟'"
              :secondsTxt="'秒'"
            ></CountTime>
          </div>
        </div>
        <div v-else class="item clear" :key="index">
          <div class="flexitemwrap">
            <div class="infoimg flexitem">
              <template v-for="(item0 ,index0) in item.sellerGoodsImageUrl.split('@')">
                <div :key="item0" v-if="index0<3">
                  <span class="cover" @click="bigimg(item.sellerGoodsImageUrl,index0)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <ImgE :src="baseURL3+'/'+item0" :W="50" :H="50"></ImgE>
                </div>
              </template>
            </div>
            <div class="info flexitem">
              <div>
                <!-- <img :src="item.userImgeUrl" :onerror="`this.src='${HeaderImg}'`"/> -->
                <div>
                  <p style="font-size:15px;">{{item.sellerName}}</p>
                  <p>
                    <span
                      class="tag blue greenColor"
                      style="margin-right:10px;"
                      v-if="item.tag!=3"
                    >{{item.tag | tagFilter}}</span>
                    <span class="btn tag" v-if="!item.focus" @click="focus(index)">
                      <img src="@/assets/image/icon/unfocus.png" alt />关注此卖家
                    </span>
                    <span class="tag" v-if="item.focus">
                      <img src="@/assets/image/icon/focus.png" alt />已关注
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="timer flexitem">
              <div>
                <p>
                  <label class="blue">{{item.goods_type ? '现货' : '订货'}}</label>
                </p>
                <p>
                  预计于
                  <span v-if="item.seller_always">{{item.day_interval |filterHours}}小时内</span>
                  <span v-else>{{item.deliverTime | formatDate}}</span>
                </p>
                <p>{{item.diliverPlace}}发货</p>
              </div>
            </div>
            <div class="sellerInfo flexitem">
              <!-- <ImgE :src="item.goodsImageUrl" :W="50" :H="50"></ImgE> -->
              <div>
                <p v-if="item.base_no" class="green">批号：{{item.base_no}}</p>
                <p class="gray">起订量：{{item.moq | toFixed(0)}}只</p>
                <p class="gray">最小增量：{{item.mpq | toFixed(0)}}只</p>
                <!-- <p>总数量：{{item.goodsCount}}只</p>
                <p>(已成交：{{item.sellerCount}})</p>-->
              </div>
            </div>
            <div class="flexitem">
              <p class="blue">{{item.goodsStockCount | toFixed(0)}}只</p>
              <p v-if="item.customerCount" class="gray">已有{{item.customerCount}}人跟单</p>
            </div>
            <div class="price flexitem">
              <div class="stepped-price" v-if="item.priceType && item.is_old_product">
                <p class="color">
                  {{item.priceUnit ? '$' : '￥'}}
                  <strong
                    class="price-num"
                  >{{item.priceList[item.priceList.length-1].price | toFixed(item.priceUnit?3:2)}}</strong>
                  <i class="el-icon-circle-plus-outline"></i>
                  <span class="btn oldProduct" v-if="item.is_old_product">呆料清仓</span>
                </p>
                <ul>
                  <li v-for="(val, k) in item.priceList" :key="k" class="clear color">
                    <span
                      class="fr"
                    >{{item.priceUnit ? '$' : '￥'}}{{val.price | toFixed(item.priceUnit?3:2)}}</span>
                    <span class="fl">{{val.num}}+</span>
                  </li>
                </ul>
              </div>
              <div class="stepped-price-origin" v-if="item.priceType && !item.is_old_product">
                <ul>
                  <li v-for="(val, k) in item.priceList" :key="k" class="clear color">
                    <span
                      class="fr"
                    >{{item.priceUnit ? '$' : '￥'}}{{val.price | toFixed(item.priceUnit?3:2)}}</span>
                    <span class="fl">{{val.num}}+</span>
                  </li>
                </ul>
              </div>
              <div v-if="!item.priceType" class="goodsprice">
                <span class="color mark">{{item.priceUnit ? '$' : '￥'}}</span>
                <span class="price-num color">{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</span>
                <br />
                <span class="btn bgColor">一口价</span>
                <template v-if="item.is_old_product">
                  <br />
                  <span class="btn oldProduct" style="margin-top:3px;">呆料清仓</span>
                </template>
              </div>

              <!-- <div v-if="item.customerCount" style="color:#448aca;">目前已有{{item.customerCount}}人参与</div> -->
            </div>
            <div class="btnWrap flexitem">
              <p class="bgColor" @click="purchase(index)">立即跟单</p>
              <p class="addCark" @click="addCar(index)">加入购物车</p>
            </div>
          </div>
          <Purchase
            :item="item.purchaseObj"
            v-if="item.showPurchase"
            @closeCallBack="item.showPurchase=false"
          ></Purchase>
          <div v-if="!item.seller_always" class="countTime blue">
            <CountTime
              class="color"
              v-on:end_callback="countDownE_cb()"
              :currentTime="item.currentTime"
              :startTime="item.currentTime"
              :endTime="item.expireTime"
              :tipText="''"
              :tipTextEnd="'距离此特价结束跟单：'"
              :endText="'活动已结束'"
              :dayTxt="'天'"
              :hourTxt="'小时'"
              :minutesTxt="'分钟'"
              :secondsTxt="'秒'"
            ></CountTime>
          </div>
        </div>
      </template>
    </div>
    <div class="arrow-bar">
      <span class="bgColor" v-show="getMore" @click="getMoreList">
        展开更多供应商
        <img src="@/assets/image/icon/down.png" alt />
      </span>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <el-carousel
        indicator-position="outside"
        :autoplay="false"
        :loop="true"
        :initial-index="initialIndex"
      >
        <el-carousel-item
          v-for="item0 in dialogImageUrl.split('@')"
          :key="item0"
          style="text-align:center;"
        >
          <img :src="baseURL3+'/'+item0" alt style="height:100%;max-width:100%;" />
        </el-carousel-item>
      </el-carousel>
      <div>
        <!-- <ul style="height:50px;" class="clear">
            <li v-for="(item0,index0) in dialogImageUrl.split('@')" :key="item0" class="fl" style="height:100%;">
                <img :src="baseURL3+'/'+item0" alt="" style="height:100%;max-width:100%;margin-right:3px;width:50px;cursor:pointer;" v-on:mouseenter="handlemouseenter(index0)">
            </li>
        </ul>-->
      </div>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
@import "./MerchantList.less";
</style>
<script>
import { TimeForma2, ladderPrice, TimeForma } from "../../lib/utils";
import { baseURL3 } from "@/config";
import { axios, home, shoppingCar } from "../../api/apiObj";
export default {
  name: "MerchantList",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      initialIndex: 0,
      dialogVisible: false,
      dialogImageUrl: "",
      baseURL3: baseURL3,
      flag: false,
      // 阶梯价
      priceLevelList: [],
      // 总数量
      total: 0,
      MerchantList: [],
      pageSize: 10,
      getMore: false,
      showOriginFactory: false
      // purchaseObj:{},
      // showPurchase:false
    };
  },
  computed: {
    closeTable() {
      if (this.MerchantList.length) {
        return true;
      } else {
        return false;
      }
    },
    loginState() {
      return this.$store.state.loginState;
    }
  },

  methods: {
    bigimg(url, index) {
      console.log("fangda");
      this.dialogVisible = true;
      this.dialogImageUrl = url;
      this.initialIndex = index;
    },
    handlemouseenter(index) {
      console.log(index);
      this.initialIndex = index;
    },
    focus(k) {
      let obj = {
        favour_type: 2, //标识关注卖家
        user_tag: this.MerchantList[k].tag,
        seller_id: this.MerchantList[k].sellerId
      };
      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          if (res) {
            this.$message.success(res.message);
            this.$set(this.MerchantList[k], "focus", true);
          }
        });
    },
    specialPrice() {
      if (!this.loginState) {
        this.$router.push("/Login");
        return;
      }
      this.$emit("specialPrice");

      // let factorySellerInfo=this.goodsinfo.factorySellerInfo
      // factorySellerInfo.priceType=factorySellerInfo.price_type
      // factorySellerInfo.priceLevel=factorySellerInfo.price_level
      // factorySellerInfo.seckilPrice=factorySellerInfo.seckil_price;
      // this.$store.dispatch("promation", {...this.goodsinfo,factorySellerInfo:factorySellerInfo});
      // this.$router.push("/InquiryBasket/ApplySpecialPrice");
    },
    GetMerchantList() {
      let obj = {
        goods_id: this.id,
        start: 0,
        length: this.pageSize,
        status: "1"
      };
      axios.request({ ...home.SpecialOfferList, params: obj }).then(res => {
        this.flag = true;
        this.total = res.data.total;
        this.MerchantList = res.data.data.map(item0 => {
          if (item0.priceType) {
            item0.priceList = ladderPrice(item0.priceLevel);
          }
          if (item0.tag == 1) {
            this.showOriginFactory = true;
          }
          return item0;
        });
        if (this.total > this.pageSize) {
          //未完全请求，需展示请求更多的按钮
          this.getMore = true;
        } else {
          //不再请求更多数据
          this.getMore = false;
        }
      });
    },
    getMoreList() {
      this.pageSize += 10;
      this.GetMerchantList();
    },
    closeEvent() {
      this.MerchantList = [];
      this.getMore = true;
    },
    handleScroll() {
      if (this.flag) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        let offsetTop = this.$refs.searchBar.offsetTop;
        scrollTop - 300 < offsetTop ? (this.flag = true) : (this.flag = false);
      }
    },
    countDownE_cb() {
      this.init();
    },
    purchase(k) {
      if (!this.loginState) {
        this.$router.push("/Login");
        return;
      }
      let res = this.MerchantList[k];
      let purchaseObj = {
        goods_id: res.goods_id,
        goods_name: res.goods_name,
        goodsDesc: res.goodsDesc,
        goodsImage: res.goodsImageUrl,
        clude_bill: res.includBill,
        price_unit: res.priceUnit,
        seckill_goods_id: res.id,
        goods_type: res.goods_type,
        diliver_place: res.diliverPlace,
        moq: res.moq,
        mpq: res.mpq,
        stockcount: res.goodsStockCount,
        price_type: res.priceType,
        priceList: res.priceList,
        seckil_price: res.goodsPrice,
        sellerName: res.sellerName,
        sellerHeader: res.userImgeUrl,
        seller_id: res.sellerId,
        tag: res.tag,
        complete_date: res.deliverTime,
        diliver_date: res.deliverTime,
        end_date: res.expireTime
      };
      this.MerchantList[k].purchaseObj = purchaseObj;
      this.$set(this.MerchantList[k], "showPurchase", true);
      // this.showPurchase=true;
    },
    addCar(k) {
      if (!this.loginState) {
        this.$router.push("/Login");
        return;
      }

      var obj = {
        sellerGoodsId: this.MerchantList[k].id,
        sellerId: this.MerchantList[k].sellerId,
        goodsSource: "1",
        goodsName: this.MerchantList[k].goods_name,
        goodsId: this.MerchantList[k].goods_id
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          this.$message.success("添加成功");
        });
    }
  },
  mounted() {
    console.log(this.HeaderImg);
    this.GetMerchantList();
  },
  filters: {
    formatDate(val) {
      return TimeForma(val);
    },
    filterHours(val) {
      return Number(val) * 24;
    }
    // toFixed(val,length){
    //     return Number(val).toFixed(length)
    // }
  }
};
</script>
