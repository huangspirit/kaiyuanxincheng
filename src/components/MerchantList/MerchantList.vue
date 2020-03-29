<template>
  <!-- 商家列表 -->
  <div class="MerchantList" ref="searchBar" v-if="total">
    <ul class="title bgGray clear">
      <li style="width:7%">实物图</li>
      <li style="width:20%">商家</li>
      <!-- <li>零件与订购描述</li> -->
      <li class="itemone">交货周期</li>
      <li class="itemone">订购条件</li>
      <li class="itemone">剩余数量</li>
      <li class="itemone">单价</li>
      <li class="itemone">操作</li>
    </ul>
    <div>
      <template v-for="(item,index) in MerchantList">
        <div v-if="item.tag==1" class="item originFactory clear" :key="index" @click="chipDetail(item.id)">
          <div class="flexitemwrap">
            <div class="infoimg clear" style="width:7%">
              <div>
                <span class="cover" @click.stop="bigimg(item.sellerGoodsImageUrl,0)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <ImgE :src="baseURL3+'/'+item.sellerGoodsImageUrl.split('@')[0]" :W="50" :H="50"></ImgE>
              </div>
            </div>
            <div class="info" style="width:20%">
              <div>
                <!-- <img :src="item.userImgeUrl" :onerror="`this.src='${HeaderImg}'`"/> -->
                <div>
                  <p
                    style="font-size:15px;cursor:pointer;max-width:200px;overflow:hidden;text-overflow:ellipsis;
                  white-space:nowrap;"
                    @click.stop="chipShop(item)"
                    :title="item.sellerName"
                  >{{item.sellerName}} 
                  <i  v-if="item.isSelf" style="font-style:normal;font-size:10px;margin-left:5px;border-radius:2px;padding:1px 5px;" class="bgColor">自营</i>
                  </p>
                  <p>
                    <span
                      class="tag bgColor"
                      style="margin-right:10px;"
                      v-if="item.tag==1"
                    >{{item.tag | tagFilter}}</span>
                    <span
                      class="tag bgColor"
                      style="margin-right:10px;"
                      v-if="item.tag==2 && item.isAgent"
                    >{{item.tag | tagFilter}}</span>
                    <span
                      class="bgColor tag"
                      v-if="!item.focus"
                      @click.stop="focus(index)"
                      style="cursor:pointer;"
                    >关注此卖家</span>
                    <span class="bgd5 tag" v-if="item.focus">已关注</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="timer flexitem">
              <div style="text-align:center;">
                <p>
                  <label class="blue">{{item.goods_type ? '现货' : '订货'}}</label>
                </p>
                <p>
                  
                  <span v-if="item.goods_type">下单后{{item.day_interval | filterHours}}小时内</span>
                  <span v-else>{{item.deliverTime | formatDate}}</span>
                </p>
                <p>{{item.diliverPlace}}发货</p>
              </div>
            </div>
            <div class="sellerInfo flexitem">
              <div>
                <p v-if="item.base_no" class="green">批号：{{item.base_no}}</p>
                <p class="gray">起订量：{{item.moq | toFixed(0)}}</p>
                <p class="gray">增量：{{item.mpq | toFixed(0)}}</p>
              </div>

              <!-- <p>总数量：{{item.goodsCount}}只</p>
              <p>(已成交：{{item.sellerCount}})</p>-->
            </div>
            <div class="flexitem">
              <p class="blue">{{item.goodsStockCount | toFixed(0)}}</p>
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
                <a href="javascript:;" @click.stop="specialPrice(index)" v-if="item.priceType">更多数量可申请特价</a>
              </p>
            </div>
            <div class="btnWrap flexitem">
              <p class="bgColor" @click.stop="purchase(index)">立即下单</p>
              <p class="specialPrice" @click.stop="specialPrice(index)">申请特价</p>
              <p class="borderColor" @click.stop="addCar(index)">加入购物车</p>
              <p class="yellowBg" @click.stop="addRate(index)" v-if="MerchantList.length>2">加入比价</p>
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
        <div v-else class="item clear" :key="index" @click="chipDetail(item.id)">
          <div class="flexitemwrap">
            <div class="infoimg" style="width:7%">
              <div>
                <span class="cover" @click.stop="bigimg(item.sellerGoodsImageUrl,0)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <ImgE :src="baseURL3+'/'+item.sellerGoodsImageUrl.split('@')[0]" :W="50" :H="50"></ImgE>
              </div>
            </div>
            <div class="info" style="width:20%">
              <div>
                <!-- <img :src="item.userImgeUrl" :onerror="`this.src='${HeaderImg}'`"/> -->
                <div>
                  <p
                    style="font-size:15px;cursor:pointer;font-size:15px;cursor:pointer;max-width:200px;overflow:hidden;text-overflow:ellipsis;
                  white-space:nowrap;"
                    @click.stop="chipShop(item)"
                    :title="item.sellerName"
                  >{{item.sellerName}} <i  v-if="item.isSelf" style="font-style:normal;font-size:10px;margin-left:5px;border-radius:2px;padding:1px 5px;" class="bgColor">自营</i></p>
                  <p>
                    <span
                      class="tag bgOrange"
                      v-if="item.tag==1"
                      style="margin-right:10px;"
                    >{{item.tag | tagFilter}}</span>
                    <span
                      class="tag bgBlu"
                      v-if="item.tag==2 && item.isAgent"
                      style="margin-right:10px;"
                    >{{item.tag | tagFilter}}</span>
                    <!-- <span
                      class="tag bgOrange"
                      v-if="item.tag==18"
                      style="margin-right:10px;"
                    >{{item.tag | tagFilter}}</span> -->
                    <span
                      class="bgGray tag"
                      v-if="!item.focus"
                     @click.stop="focus(index)"
                      style="cursor:pointer;"
                    >关注此卖家</span>
                    <!-- <span class="bgd5 tag" v-if="item.focus">已关注</span> -->
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
                  <span v-if="item.goods_type">{{item.day_interval |filterHours}}小时内</span>
                  <span v-else>{{item.deliverTime | formatDate}}</span>
                </p>
                <p>{{item.diliverPlace}}发货</p>
              </div>
            </div>
            <div class="sellerInfo flexitem">
              <!-- <ImgE :src="item.goodsImageUrl" :W="50" :H="50"></ImgE> -->
              <div>
                <p v-if="item.base_no" class="green">批号：{{item.base_no}}</p>
                <p class="gray">起订量：{{item.moq | toFixed(0)}}</p>
                <p class="gray">增量：{{item.mpq | toFixed(0)}}</p>
                <!-- <p>总数量：{{item.goodsCount}}只</p>
                <p>(已成交：{{item.sellerCount}})</p>-->
              </div>
            </div>
            <div class="flexitem">
              <p class="blue">{{item.goodsStockCount | toFixed(0)}}</p>
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
              <p class="bgColor" @click.stop="purchase(index)">立即下单</p>
              <p class="borderColor" @click.stop="addCar(index)">加入购物车</p>
              <p class="yellowBg" @click.stop="addRate(index)" v-if="MerchantList.length>2">加入比价</p>
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
    <Purchase
      :item="purchaseObj"
      v-if="showPurchase"
      :showPurchase="showPurchase"
      @closeCallBack="showPurchase=false"
    ></Purchase>
    <div class="rate bgColor" v-if="ratelistArr.length>0" @click="showRate=true">
      <span class="num color">{{ratelistArr.length}}</span>去比价
    </div>
    <el-dialog :visible.sync="showRate" title="比价购买" :center="true" class="showRate">
      <ul class="table1">
        <li class="tittle">
          <div class="one">供应商</div>
          <div class="one">售卖类型</div>
          <div class="one">发货地址</div>
          <div class="one">起订量</div>
          <div class="one">最小增量</div>
          <div class="one">剩余</div>
          <div class="price">价格</div>
          <div class="btnwrap" >操作</div>
        </li>
        <li v-for="(item,index) in ratelistArr" :key="item.id" class="itemone">
          <div style="font-weight:bolder;" class="one">{{item.sellerName}}</div>
          <div  class="one">
            <label class="blue">{{item.goods_type ? '现货' : '订货'}}</label>
          </div>
          <div class="one">{{item.diliverPlace}}发货</div>
          <div  class="one">{{item.moq}}</div>
          <div  class="one">{{item.mpq}}</div>
          <div class="one">{{item.goodsStockCount | toFixed(0)}}</div>
          <div class="price">
            <ul v-if="item.priceType">
              <li v-for="(val, k) in item.priceList" :key="k" class="clear color" style="display:flex;justify-content: center;">
                <span class="num">{{val.num}}+</span>
                <span>{{item.priceUnit ? '$' : '￥'}}{{val.price | toFixed(item.priceUnit?3:2)}}</span>
              </li>
            </ul>
            <div v-if="!item.priceType">
              <span class="color mark">{{item.priceUnit ? '$' : '￥'}}</span>
              <span class="price-num color">{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</span>
            </div>
            
          </div>
          <div class="btnWrap" style='height:80px;'>
            <p class="bgColor" @click.stop="purchase(index)">立即下单</p>
            <p class="bgOrange" @click.stop="addCar(index)" >加入购物车</p>
            <p class="bgLightGray" @click.stop="specialPrice(index)" v-if="item.tag==1">申请特价</p>
          </div>
        </li>
      </ul>
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
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
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
      showRate: false,
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
      pageSize: 20,
      getMore: false,
      showOriginFactory: false,
      purchaseObj: {},
      showPurchase: false,
      ratelistObj: {},
      ratelistArr: [],

    };
  },
  watch:{
     id:{
      immediate:true,
      deep:true,
      handler:function(){
        this.GetMerchantList()
     }
    }
  },
  computed: {
    ...mapState({
      UserInforma:state => state.Login.UserInforma,
      loginState:state => state.loginState
    }),
    closeTable() {
      if (this.MerchantList.length) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions("Login", ["GetUserInforma"]),
    ...mapMutations(["setshowlogin"]),
    chipDetail(sellerGoodsId){
      this.$router.push({
        path:"/sellerGoodsDetail",
        query:{
          seller_goods_id:sellerGoodsId
        }
      })
    },
    chipShop(item) {
      if (item.tag == 1) {
        this.$router.push({
          path: "/BrandDetail",
          query: {
            tag: "brand",
            documentid: item.brandId,
            name: item.brandName
          }
        });
      } else {
        this.$router.push({
          path: "/sellerShopDetail",
          query: {
            sellerId: item.sellerId
          }
        });
      }
    },

    bigimg(url, index) {
      this.dialogVisible = true;
      this.dialogImageUrl = url;
      this.initialIndex = index;
    },
    handlemouseenter(index) {
      this.initialIndex = index;
    },
    focus(k) {
      if (!this.loginState) {
        //this.$router.push("/Login");
        this.setshowlogin(true)
        return;
      }
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
            var _this = this;
            setTimeout(() => {
              _this.GetUserInforma();
            }, 2000);
            this.$set(this.MerchantList[k], "focus", true);
          }
        });
    },
    specialPrice(k) {
      if (!this.loginState) {
        this.setshowlogin(true);
        return;
      }
      this.$emit("specialPrice",this.MerchantList[k].sellerId);
    },
    GetMerchantList() {
      let obj = {
        goods_id: this.id,
        start: 0,
        length: this.pageSize,
        status: "1"
      };
      axios.request({ ...home.queryDirectGoods2, params: obj }).then(res => {
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
    addRate(k) {
      if (
        this.ratelistArr.length < 4 &&
        !this.ratelistObj[this.MerchantList[k].id]
      ) {
        this.ratelistObj[this.MerchantList[k].id] = this.MerchantList[k];
        this.ratelistArr = Object.values(this.ratelistObj);
      } else {
        this.$message({
          message: "比价商家不能超过5个或者重复加入"
        });
      }
    },
    purchase(k) {
      if (!this.loginState) {
        // this.$router.push("/Login");
        this.setshowlogin(true);
        return;
      }
  
      let res = this.MerchantList[k];
      if(res.sellerId==this.UserInforma.id){
        this.$message.error("不能购买自己发布的商品")
        return;
      }
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
      // this.MerchantList[k].purchaseObj = purchaseObj;
      // this.$set(this.MerchantList[k], "showPurchase", true);
      this.purchaseObj = purchaseObj;
      this.showPurchase = true;
    },
    addCar(k) {
      if (!this.loginState) {
        //this.$router.push("/Login");
        this.setshowlogin(true);
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
          if (res) {
            this.$message.success("添加成功");
            var _this = this;
            setTimeout(() => {
              _this.GetUserInforma();
            }, 2000);
          }
        });
    }
  },
  mounted() {
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
