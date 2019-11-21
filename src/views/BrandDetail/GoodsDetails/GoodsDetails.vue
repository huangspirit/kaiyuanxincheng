<template>
  <!-- 商品详情页 -->
  <div class="GoodsDetails">
    <div class="BrandDetail-tit">
      <el-breadcrumb separator-class="el-icon-arrow-right " class="allWidth">
        <el-breadcrumb-item :to="{ path: '/brand' }">全部品牌</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: '/BrandDetail',query:{tag:'brand',documentid:goodsinfo.brandId,name:goodsinfo.brand} }"
        >{{goodsinfo.branda}}</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{
                 path: '/BrandDetail/Direct',
                 query:{
                 tag:'direct',
                 documentid:goodsinfo.classificationId,
                 name:goodsinfo.classification,
                 }
                 }"
        >{{goodsinfo.classification}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{goodsinfo.productno}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 商品详情 -->
    <div class="sellerGoodsInfo allWidth">
      <div class="title tit-h">商品详情</div>
      <div class="cont clear">
        <div class="fl left">
          <ImgE :src="goodsinfo.imageUrl" :W="200" :H="200"></ImgE>
        </div>
        <div class="fl right">
          <p class="goodsName">{{goodsinfo.productno}}</p>
          <p class="goodsdesc">
            制造商：
            <router-link
              tag="a"
              class="brandName"
              :to="{
                    path:'/BrandDetail',
                    query:{
                        tag:'brand',
                        documentid:goodsinfo.brandId,
                        name:goodsinfo.brand
                        }
                    }"
            >
              {{goodsinfo.brand}}
              <ImgE :src="goodsinfo.brandImageUrl" :W="80" :H="40" style="margin-left:25px;"></ImgE>
            </router-link>
          </p>
          <p class="goodsdesc" style="word-break:break-all;">描述：{{goodsinfo.productdesc}}</p>
          <P class="goodsdesc">器件状态：{{status}}</P>
          <div class="cont1">
            <span @click="openBig" class="txt">
              数据手册Datasheet：
              <img
                src="@/assets/image/brandDetail/pdf.png"
                alt
                style="cursor:pointer;"
              />
            </span>
            <span>
              官方参考价：
              <span style="text-decoration:line-through;font-size:16px" >${{goodsinfo.referPrice}}</span>
            </span>
          </div>
          <div class="icon">
            <span v-if="goodsinfo.focus" class="btn">
              <i class="el-icon-star-on"></i>&nbsp;已关注
            </span>
            <span @click="addFocus" v-if="!goodsinfo.focus" class="btn unactive">
              <i class="el-icon-star-off"></i>&nbsp;关注此器件
            </span>
            <span class="blu" v-if="loginState">目前已<i v-if="goodsinfo.favorCount>=0">有{{goodsinfo.favorCount | toFixed(0)}}人关注</i><i v-if="goodsinfo.favorCount>=0 && goodsinfo.searchCount>0">,</i><i v-if="goodsinfo.searchCount>0">有{{goodsinfo.searchCount | toFixed(0)}}次的搜索</i></span>
            <!-- <span class="btn"><img src="@/assets/image/icon/share.png" alt="" style="height:13px;">&nbsp;分享给好友</span> -->
          </div>
          <div class="btnwrap">
            <span class="btn bgColor" @click="pushlishspecialPrice">发布特价</span>
            <template
              v-if="goodsinfo.factorySellerInfo && goodsinfo.factorySellerInfo.seller_goods_id"
            >
              <span class="btn bgOrange" @click="specialPrice">申请特价</span>
              <span class="btn bgGray" @click="addInquiry">加入询价篮</span>
            </template>
            <template v-else>
              <span style=" cursor: unset;background:#bbb">申请特价</span>
              <span style=" cursor: unset;background:#bbb">加入询价篮</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 特价共享区 -->
    <div class="special-offer allWidth">
      <MerchantList :id="goodsinfo.id" v-if="goodsinfo.id" @specialPrice="specialPrice"></MerchantList>
    </div>
    <!-- 详细信息 -->
    <div class="detail-informan">
      <div class="allWidth">
        <div class="tit-h">
          <span>详细信息</span>
        </div>
        <div class="detail-informan-con">
          <p class="tit">
            <span>技术参数</span>
            <span>
              数据手册 |
              <a class="el-icon-zoom-in" @click="openBig" title="放大查看">&nbsp;放大</a>
            </span>
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
              element-loading-background="rgba(0, 0, 0, 0.8)"
            >
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
    <el-dialog title :visible.sync="dialogVisible" width="70%">
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <iframe
          id="ifra1"
          :src="datasheet"
          frameborder="0"
          width="100%"
          height="600px"
          v-if="datasheet"
        ></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
@import "./GoodsDetails.less";
</style>

<script>
import { TimeForma2, ladderPrice } from "../../../lib/utils";
import MerchantList from "_c/MerchantList";
import SubstituModelList from "_c/SubstituModelList";
import { baseURL, baseURL2 } from "@/config";
import { axios, shoppingCar, BrandDetail, home } from "@/api/apiObj";
import { parse } from "path";

export default {
  name: "GoodsDetails",
  data() {
    return {
      status: "暂无",
      goodsinfo: {},
      purchaseObj: {},
      // 技术参数
      datasheet: "",
      // 下载技术参数的路径
      downDatasheet: "",
      // loading
      loading: true,
      showPurchase: false,
      dialogVisible: false,
      showSelling: false,
      UserInforma: sessionStorage.getItem("UserInforma")
    };
  },
  components: {
    MerchantList,
    SubstituModelList
  },
  methods: {
    pushlishspecialPrice() {
      //发布特价
      if (!this.loginState) {
        this.$router.push("/Login");
        return;
      }
      if (this.UserInforma) {
        this.UserInforma = JSON.parse(this.UserInforma);
        if (this.UserInforma.userTagMap && this.UserInforma.userTagMap.seller) {
          this.$router.push(
            "/PersonalCenter/SellerIssuesProduct?name=" +
              this.goodsinfo.productno
          );
        } else {
          this.$router.push("/OriginalFactoryEntry");
        }
      } else {
        this.UserInforma = {
          userTagMap: {}
        };
      }
    },
    GetMerchantList() {
      let obj = {
        goods_id: this.goodsinfo.id,
        start: 0,
        length: 1,
        status: "1"
      };
      axios.request({ ...home.SpecialOfferList, params: obj }).then(res => {
        if (res.data.total > 0) {
          this.showSelling = true;
        }
      });
    },
    openBig() {
      this.loading = true;
      this.dialogVisible = true;
      var _this = this;
      setTimeout(function() {
        _this.loading = false;
      }, 3000);
    },
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
      if (!this.loginState) {
        this.$router.push("/Login");
        return;
      }
      var obj = {
        sellerGoodsId: this.goodsinfo.id,
        goodsId: this.goodsinfo.id,
        sellerId: this.goodsinfo.brandId,
        goodsSource: "2",
        goodsName: this.goodsinfo.productno
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          this.$message.success("添加成功");
        });
    },
    addFocus() {
      if (!this.loginState) {
        this.$router.push("/Login");
        return;
      }
      let obj = {
        goods_id: this.goodsinfo.id,
        catergory_id: this.goodsinfo.classificationId,
        favour_type: "1"
      };
      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          this.$set(this.goodsinfo, "focus", true);
          // this.$message.success("已关注");
        });
    },
    addShopingCar() {
      if (!this.loginState) {
        this.$router.push("/Login");
        return;
      }
      var obj = {
        sellerGoodsId: this.goodsinfo.factorySellerInfo.seller_goods_id,
        sellerId: this.goodsinfo.factorySellerInfo.seller_id,
        goodsSource: "1",
        goodsName: this.goodsinfo.productno,
        goodsId: this.goodsinfo.id
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          this.$message.success("添加成功");
        });
    },
    purchase() {
      if (!this.loginState) {
        this.$router.push("/Login");
        return;
      }
      this.showPurchase = true;
    },
    specialPrice() {
      if (!this.loginState) {
        this.$router.push("/Login");
        return;
      }
      let factorySellerInfo = this.goodsinfo.factorySellerInfo;
      factorySellerInfo.priceType = factorySellerInfo.price_type;
      factorySellerInfo.priceLevel = factorySellerInfo.price_level;
      factorySellerInfo.seckilPrice = factorySellerInfo.seckil_price;
      this.$store.dispatch("promation", [{
        ...this.goodsinfo,
        factorySellerInfo: factorySellerInfo
      }]);
      console.log({
        ...this.goodsinfo,
        factorySellerInfo: factorySellerInfo
      })
      this.$router.push("/InquiryBasket/ApplySpecialPrice");
    }
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    let obj = {
      id: this.$route.query.documentid,
      tag: this.$route.query.tag,
      name: this.$route.query.name
    };
    axios.request({ ...BrandDetail.searchResult, params: obj }).then(result => {
      let res = result.data.goodsinfo;
      if (res.factorySellerInfo.price_type) {
        res.factorySellerInfo.priceList = ladderPrice(
          res.factorySellerInfo.price_level
        );
      }
      res.list.find(item => {
        if (item.name == "零件状态") {
          this.status = item.value;
        }
      });
      this.goodsinfo = res;
      this.purchaseObj = {
        goods_id: res.id,
        goods_name: res.productno,
        goodsDesc: res.productdesc,
        goodsImage: res.imageUrl,
        clude_bill: res.factorySellerInfo.clude_bill,
        price_unit: res.factorySellerInfo.priceunit,
        seckill_goods_id: res.factorySellerInfo.seller_goods_id,
        goods_type: res.factorySellerInfo.goods_type,
        diliver_place: res.factorySellerInfo.diliver_place,
        moq: Number(res.factorySellerInfo.moq),
        mpq: Number(res.factorySellerInfo.mpq),
        stockcount: res.factorySellerInfo.stockcount,
        price_type: res.factorySellerInfo.price_type,
        priceList: res.factorySellerInfo.priceList,
        seckil_price: res.factorySellerInfo.seckil_price,
        sellerName: res.factorySellerInfo.seller_name,
        sellerHeader: res.factorySellerInfo.seller_header,
        seller_id: res.factorySellerInfo.seller_id,
        tag: 1
      };
      this.GetMerchantList();
      this.searchDatasheet(res.id);
      loading.close();
    });
  },
  watch: {
    $route: {
      // val是改变之后的路由，oldVal是改变之前的val
      handler: function(val, oldVal) {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        let obj = {
          id: this.$route.query.documentid,
          tag: this.$route.query.tag,
          name: this.$route.query.name
        };
        axios
          .request({ ...BrandDetail.searchResult, params: obj })
          .then(result => {
            let res = result.data.goodsinfo;
            if (res.factorySellerInfo.price_type) {
              res.factorySellerInfo.priceList = ladderPrice(
                res.factorySellerInfo.price_level
              );
            }
            this.goodsinfo = res;
            this.purchaseObj = {
              goods_id: res.id,
              goods_name: res.productno,
              goodsDesc: res.productdesc,
              goodsImage: res.imageUrl,
              clude_bill: res.factorySellerInfo.clude_bill,
              price_unit: res.factorySellerInfo.priceunit,
              seckill_goods_id: res.factorySellerInfo.seller_goods_id,
              goods_type: res.factorySellerInfo.goods_type,
              diliver_place: res.factorySellerInfo.diliver_place,
              moq: Number(res.factorySellerInfo.moq),
              mpq: Number(res.factorySellerInfo.mpq),
              stockcount: res.factorySellerInfo.stockcount,
              price_type: res.factorySellerInfo.price_type,
              priceList: res.factorySellerInfo.priceList,
              seckil_price: res.factorySellerInfo.seckil_price,
              sellerName: res.factorySellerInfo.seller_name,
              sellerHeader: res.factorySellerInfo.seller_header,
              seller_id: res.factorySellerInfo.seller_id,
              tag: 1
            };
            this.GetMerchantList();
            this.searchDatasheet(res.id);
            loading.close();
          });
      },
      // 深度观察监听
      deep: true
    }
  },
  computed: {
    loginState() {
      return this.$store.state.loginState;
    }
  },
  filters: {
    formatDate(val) {
      return TimeForma2(val);
    }
  }
};
</script>

