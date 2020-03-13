<template>
  <div class="sellerGoodsDetail">
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
        <el-breadcrumb-item>{{sellerGoodsInfo.goods_name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sellerGoodsInfo allWidth">
      <div class="title">商品详情</div>
      <div class="cont clear">
        <div class="fl left">
          <div
            class="mark"
            :class="sellerGoodsInfo.goods_type?'greenColor':'bgColor'"
            :title="sellerGoodsInfo.goods_type?'现货':'订货'"
          >{{sellerGoodsInfo.goods_type?'现':'订'}}</div>
          <div class="bigImg">
            <ImgE :src="bigImgstr" :W="200" :H="200"></ImgE>
          </div>
          <div class="imglistwrap">
            <span class="icon" @click="prev">
              <i class="el-icon-arrow-left"></i>
            </span>
            <div class="imgList">
              <div
                @mouseenter="handleEnter(item)"
                v-for="(item,k) in  sellerGoodsImageUrlList"
                :key="k"
                class="imgewrap"
                :class="selectedstr==item ? 'active':''"
              >
                <ImgE :src="item" :W="80" :H="80"></ImgE>
              </div>
            </div>
            <span class="icon" @click="next">
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
          <div class="icon">
            <span v-if="sellerGoodsInfo.focus">
              <i class="el-icon-star-on"></i>&nbsp;已关注
            </span>
            <span @click="addFocus" v-if="!sellerGoodsInfo.focus" class="btn">
              <i class="el-icon-star-off"></i>&nbsp;关注此零件
            </span>
            <span @click="addInquiry(sellerGoodsInfo.sellerId)" v-if="sellerGoodsInfo.tag == 1" class="btn">
              <i class="el-icon-circle-plus-outline"></i>&nbsp;询价蓝
            </span>
            <!-- <span class="btn"><img src="@/assets/image/icon/share.png" style="height:12px;" alt="">&nbsp;分享给好友</span> -->
            <!-- <span class="btn" @click="pushlishspecialPrice"><i class="el-icon-plus "></i>&nbsp;我有特价</span> -->
          </div>
        </div>
        <div class="fl right">
          <!-- <router-link tag="p" class="goodsName" :to="{
                        path:'/BrandDetail/GoodsDetails',
                        query:{
                            tag:'goodsinfo',
                            documentid:sellerGoodsInfo.goods_id,
                            name:sellerGoodsInfo.goods_name,

                        }
                    }">
          {{sellerGoodsInfo.goods_name}}</router-link>-->
          <p class="goodsName">{{sellerGoodsInfo.goods_name}}</p>
          <p class="brandDesc">
            制造商：
            <router-link
              class="brand"
              :to="{
                            path:'BrandDetail',
                            query:{
                                tag:'brand',
                                documentid:sellerGoodsInfo.brandId,
                                name:sellerGoodsInfo.brandName
                            }
                        }"
            >
              {{goodsinfo.brand}}
              <img :src="goodsinfo.brandImageUrl"  style="height:30px;width:80px;"/>
              <!-- <ImgE :src="goodsinfo.brandImageUrl" :W="80" :H="40" style="margin-left:25px;"></ImgE> -->
            </router-link>

            <!--                        <span>官方参考价：暂无</span>-->
          </p>
          <p class="brandDesc" style="word-break:break-all;">描述：{{sellerGoodsInfo.goodsDesc}}</p>
          <p class="brandDesc" @click="openBig">
            数据手册Datasheet：
            <img src="@/assets/image/brandDetail/pdf.png" alt style="cursor:pointer;" />
          </p>
          <div
            class="time clear bgColor"
            v-if="!sellerGoodsInfo.seller_always && sellerGoodsInfo.currentTime"
          >
            <img src="@/assets/image/index/timer.png" alt class />
            <CountTime
              v-on:end_callback="countDownE_cb()"
              :currentTime="sellerGoodsInfo.currentTime"
              :startTime="sellerGoodsInfo.currentTime"
              :endTime="sellerGoodsInfo.expireTime"
              :tipText="'距离活动开始'"
              :tipTextEnd="'剩余跟单时间：'"
              :endText="'活动已失效'"
              :dayTxt="'天'"
              :hourTxt="'小时'"
              :minutesTxt="'分'"
              :secondsTxt="'秒'"
            ></CountTime>
          </div>
          <div class="cont1 clear">
            <div class="price color jieti clear" v-if="sellerGoodsInfo.priceType">
              <div class="priceList">
                <p
                  v-for="(item,index) in sellerGoodsInfo.priceList"
                  :key="index"
                >{{item.num}}+ ~ {{sellerGoodsInfo.priceUnit?'$':'￥'}}{{item.price | toFixed(sellerGoodsInfo.priceUnit?3:2)}}</p>
              </div>
              <span class="includBill blu">{{!sellerGoodsInfo.priceUnit?'(含13%增值税)':'香港交货'}}</span>
            </div>
            <p class="price color" v-if="!sellerGoodsInfo.priceType">
              一口价：{{sellerGoodsInfo.priceUnit?'$':'￥'}}{{sellerGoodsInfo.goodsPrice | toFixed(sellerGoodsInfo.priceUnit?3:2)}}
              <span
                class="includBill blu"
              >{{!sellerGoodsInfo.priceUnit?'(含13%增值税)':'香港交货'}}</span>
            </p>
            <div class="mpq">
              <div class="fl">
                <p>库存量：{{sellerGoodsInfo.goodsStockCount}}只</p>
                <p>已售出：{{sellerGoodsInfo.sellerCount}}只</p>
              </div>
              <div>
                <p class="line"></p>
              </div>
              <div class="fl">
                <p
                  v-if="sellerGoodsInfo.deliverTime "
                >预计交期：{{sellerGoodsInfo.deliverTime | formatDate}}</p>
                <p
                  v-if="sellerGoodsInfo.day_interval "
                >预计交期：{{sellerGoodsInfo.day_interval | filterHours}}小时内发货</p>
                <p>交货地址：{{sellerGoodsInfo.diliverPlace}}</p>
              </div>
              <div>
                <p class="line"></p>
              </div>
              <div class="fl">
                <p>起订量：{{sellerGoodsInfo.moq}}只</p>
                <p>增量：{{sellerGoodsInfo.mpq}}只</p>
              </div>
            </div>
          </div>
          <div class="seller fl">
            此零件由以下供应商提供：
            <img
              :src="sellerGoodsInfo.userImgeUrl"
              alt
              @click="chipShop"
              style="cursor:pointer;"
            />
            <span
              class="sellerName"
              style="cursor:pointer;"
              @click="chipShop"
            >{{sellerGoodsInfo.sellerName}}</span>
            <span
              class="color"
              v-if="sellerGoodsInfo.tag == 1"
            >({{sellerGoodsInfo.tag | tagFilter}})</span>
            <span class="blue" v-if="sellerGoodsInfo.tag == 2">({{sellerGoodsInfo.tag | tagFilter}})</span>
            <span
              class="orange"
              v-if="sellerGoodsInfo.tag == 18"
            >({{sellerGoodsInfo.tag | tagFilter}})</span>
          </div>
          <div class="count fl" style="width:100%;" v-if="sellerGoodsInfo.moq">
            数量：
            <el-input-number
              v-model="count"
              size="mini"
              @blur="handleBlur($event)"
              @change="handleChange($event)"
              :min="sellerGoodsInfo.goodsStockCount>sellerGoodsInfo.moq?sellerGoodsInfo.moq:sellerGoodsInfo.goodsStockCount"
              :max="sellerGoodsInfo.goodsStockCount"
              :step="sellerGoodsInfo.mpq"
            ></el-input-number>
            <span>库存：{{sellerGoodsInfo.goodsStockCount}}只</span>
          </div>
          <div class="btnwrap fl" style="width:100%">
            <span class="btn bgColor" @click="submitPurchase(sellerGoodsInfo.sellerId)">立即下单</span>
            <span
              class="btn bgOrange"
              @click="pushlishspecialPrice"
              v-if="sellerGoodsInfo.tag != 1"
            >我有特价</span>
            <span class="btn bgOrange" @click="specialPrice(sellerGoodsInfo.sellerId)" v-if="sellerGoodsInfo.tag == 1">申请特价</span>
            <span class="btn bgGray" @click="addShopingCar(sellerGoodsInfo.sellerId)">加入购物车</span>
            <router-link
              style="font-size:14px;margin-left:10px;"
              :to="{
                    path:'/BrandDetail/GoodsDetails',
                    query:{
                        tag:'goodsinfo',
                        documentid:sellerGoodsInfo.goods_id,
                        name:sellerGoodsInfo.goods_name,

                    }
                }"
            >查看其他商家报价&nbsp;>></router-link>
            <Purchase
              :item="purchaseObj"
              @closeCallBack="showPurchase=false"
              v-if="showPurchase"
              :mini="true"
            ></Purchase>
          </div>
          <!-- <div class="mark fl" style="width:100%;">
                        * 标注现货字样的商品需要付全款购买，发货日期大于当前购买日期七天的按照用户信用额度进行百分比预付款，以订单支付日期为准
          </div>-->
        </div>
      </div>
      <div class="step">
        <p>交易流程</p>
        <ul>
          <li class="item">
            <span class="imgwrap">
              <img src="@/assets/image/step/1.png" alt />
            </span>
            <span>下单成功</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
          <li class="item">
            <span class="imgwrap">
              <img src="@/assets/image/step/2.png" alt />
            </span>

            <span>卖家发货</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
          <li class="item">
            <span class="imgwrap">
              <img src="@/assets/image/step/5.png" alt />
            </span>

            <span>平台指定仓</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
          <li class="item">
            <span class="imgwrap">
              <img src="@/assets/image/step/6.png" alt />
            </span>

            <span>报关/目测检验</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
          <li>
            <span class="imgwrap">
              <img src="@/assets/image/step/4.png" alt />
            </span>

            <span>国内快递</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="detail">
      <div class="allWidth">
        <div class="title">详细信息</div>
        <div class="detail-informan-con">
          <p class="tit">
            <span>技术参数</span>
            <span>
              数据手册 |
              <a class="el-icon-zoom-in" @click="openBig" title="放大查看">&nbsp;放大</a>
              <!-- <a class="color"  @click="openBig" >放大查看</a> -->
            </span>
          </p>
          <ul class="parameter clear">
            <li>
              <table class="canshu">
                <thead>
                  <tr>
                    <th>类型</th>
                    <th>参数</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="item in goodsinfo.list">
                    <tr  :key="item.id" v-if="item.value">
                      <td>{{item.name}}</td>
                      <td>{{item.value}}</td>
                  </tr>
                  </template>
                </tbody>
              </table>
              <!-- <el-table :data="parameterList" stripe border>
                <el-table-column property="name" label="类型"></el-table-column>
                <el-table-column property="value" label="参数"></el-table-column>
              </el-table> -->
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
                height="99%"
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
<script>
import { mapMutations, mapActions,mapState } from "vuex";
import { baseURL, baseURL2, baseURL3 } from "@/config";
import { axios, shoppingCar, BrandDetail, home } from "@/api/apiObj";
import { TimeForma2, TimeForma, ladderPrice } from "../../lib/utils";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      sellerGoodsInfo: {},
      goodsinfo: {},
      purchaseObj: {},
      // 技术参数
      parameterList: [],
      datasheet: "",
      // 下载技术参数的路径
      downDatasheet: "",
      // loading
      loading: true,
      showPurchase: false,
      //加载pdf
      dialogVisible: false,
      //购买量
      count: 0,
      //对应的购买价格
      price: 0,
      //对应的总价
      money: 0,
      //详情图片
      selectedstr: "",
      bigImgstr: "",
      sellerGoodsImageUrlList: []
    };
  },
  mounted() {
    let obj = sessionStorage.getItem("sellerGoodsDetail");
    if (this.$route.query.seller_goods_id) {
      this.getSellerGoodsId(this.$route.query.seller_goods_id);
    } else if (!this.$route.query.seller_goods_id && obj) {
       this.getSellerGoodsId(JSON.parse(obj).id);
    }
  },
  methods: {
    ...mapMutations("MerchantList", ["setBuyOneGoodsDetail"]),
    ...mapMutations(["setshowlogin"]),
    ...mapActions("Login", ["GetUserInforma"]),
    getsellerGoodsDetail() {},
    chipShop() {
      if (this.sellerGoodsInfo.tag == 1) {
        this.$router.push({
          path: "/BrandDetail",
          query: {
            tag: "brand",
            documentid: this.sellerGoodsInfo.brandId,
            name: this.sellerGoodsInfo.brandName
          }
        });
      } else {
        this.$router.push({
          path: "/sellerShopDetail",
          query: {
            sellerId: this.sellerGoodsInfo.sellerId
          }
        });
      }
    },
    init() {
      this.getDetail();
      this.searchDatasheet(this.sellerGoodsInfo.goods_id);
    },
    next() {
      if (this.sellerGoodsImageUrlList.length > 3) {
        this.sellerGoodsImageUrlList.push(this.sellerGoodsImageUrlList[0]);
        this.sellerGoodsImageUrlList.shift();
      }
    },
    prev() {
      if (this.sellerGoodsImageUrlList.length > 3) {
        this.sellerGoodsImageUrlList.unshift(
          this.sellerGoodsImageUrlList[this.sellerGoodsImageUrlList.length - 1]
        );
        this.sellerGoodsImageUrlList.pop();
      }
    },
    handleEnter(k) {
      this.selectedstr = k;
      this.bigImgstr = k;
    },
    handleBlur(event) {
      let e = event.target.value;
      if (
        this.sellerGoodsInfo.goodsStockCount >
        this.sellerGoodsInfo.mpq + this.sellerGoodsInfo.moq
      ) {
        this.count =
          this.sellerGoodsInfo.moq +
          Math.round(
            (e - this.sellerGoodsInfo.moq) / this.sellerGoodsInfo.mpq
          ) *
            this.sellerGoodsInfo.mpq;
      } else {
        this.count = e;
      }
      this.handleChange(e);
    },
    handleChange(e) {
      let obj = this.purchaseObj;
      let currentPrice = 0;
      if (obj.price_type) {
        if (obj.priceList.length == 1) {
          currentPrice = parseFloat(obj.priceList[0].price);
        } else if (obj.priceList.length == 2) {
          if (e <= Number(obj.priceList[1].num)) {
            currentPrice = parseFloat(obj.priceList[0].price);
          } else {
            currentPrice = parseFloat(obj.priceList[1].price);
          }
        } else if (obj.priceList.length == 3) {
          if (e <= Number(obj.priceList[1].num)) {
            currentPrice = parseFloat(obj.priceList[0].price);
          } else if (e <= Number(obj.priceList[2].num)) {
            currentPrice = parseFloat(obj.priceList[1].price);
          } else {
            currentPrice = parseFloat(obj.priceList[2].price);
          }
        }
      } else {
        currentPrice = obj.seckil_price;
      }
      this.price = currentPrice;
      this.money = this.count * currentPrice;
    },
    submitPurchase(seller_id) {
      if (!this.loginState) {
        this.setshowlogin(true);
        return;
      }
      if(seller_id==this.UserInforma.id){
        this.$message.error("不能对自己发布的商品进行购买")
        return;
      }
      let item = this.purchaseObj;
      let orderJson = [];
      let obj = {
        goods_id: item.goods_id,
        goodsDesc: item.goodsDesc,
        goodsImage: item.goodsImage,
        goods_name: item.goods_name,
        diliver_place: item.diliver_place,
        seckill_goods_id: item.seckill_goods_id,
        clude_bill: item.clude_bill,
        price_unit: item.price_unit,
        goods_type: item.goods_type,
        sellerName: item.sellerName,
        sellerHeader: item.sellerHeader,
        seller_id: item.seller_id,
        tag: item.tag,
        goods_count: this.count,
        goods_price: this.price,
        order_channe: 1,
        pay_channe: 1
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
        type: 0,
        orderSource: 1
      };
      this.$store.dispatch("MerchantList/GetOrder", obj2).then(res => {
        localStorage.setItem(
          "buyOneGoodsDetail",
          JSON.stringify({
            data: JSON.stringify(res),
            obj2: JSON.stringify(obj2)
          })
        );
        this.setBuyOneGoodsDetail(
          JSON.stringify({
            data: JSON.stringify(res),
            obj2: JSON.stringify(obj2)
          })
        );

        this.$router.push({
          path: "/ShoppingCart/ShoppingSettlement"
        });
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
    getSellerGoodsId(seller_goods_id) {
      let obj = {
        length: 5,
        seller_goods_id: seller_goods_id,
        start: 0
      };
      axios.request({ ...home.queryDirectGoodsDetail, params: obj }).then(result => {
        console.log(result);
        this.sellerGoodsInfo = result.data;
        if(this.sellerGoodsInfo.priceLevel){
            this.sellerGoodsInfo.priceList=ladderPrice(this.sellerGoodsInfo.priceLevel)
        }
        if (this.sellerGoodsInfo.sellerGoodsImageUrl) {
          let arr = this.sellerGoodsInfo.sellerGoodsImageUrl.split("@");
          this.sellerGoodsImageUrlList = arr.map(item => {
            return baseURL3 + "/" + item;
          });
          this.sellerGoodsImageUrlList.unshift(
            this.sellerGoodsInfo.goodsImageUrl
          );
        }
        this.bigImgstr = this.sellerGoodsInfo.goodsImageUrl;
        this.purchaseObj = {
          goods_id: this.sellerGoodsInfo.goods_id,
          goods_name: this.sellerGoodsInfo.goods_name,
          goodsDesc: this.sellerGoodsInfo.goodsDesc,
          goodsImage: this.sellerGoodsInfo.goodsImageUrl,
          clude_bill: this.sellerGoodsInfo.includBill,
          price_unit: this.sellerGoodsInfo.priceUnit,
          seckill_goods_id: this.sellerGoodsInfo.id,
          goods_type: this.sellerGoodsInfo.goods_type,
          diliver_place: this.sellerGoodsInfo.diliverPlace,
          moq: Number(this.sellerGoodsInfo.moq),
          mpq: Number(this.sellerGoodsInfo.mpq),
          stockcount: this.sellerGoodsInfo.goodsStockCount,
          price_type: this.sellerGoodsInfo.priceType,
          priceList: this.sellerGoodsInfo.priceList,
          seckil_price: this.sellerGoodsInfo.goodsPrice,
          sellerName: this.sellerGoodsInfo.sellerName,
          sellerHeader: this.sellerGoodsInfo.userImgeUrl,
          seller_id: this.sellerGoodsInfo.sellerId,
          tag: this.sellerGoodsInfo.tag
        };
        this.init();
      });
    },
    getDetail() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let obj = {
        id: this.sellerGoodsInfo.goods_id,
        tag: "goodsinfo",
        name: this.sellerGoodsInfo.goods_name
      };
      axios
        .request({ ...BrandDetail.searchResult, params: obj })
        .then(result => {
          this.parameterList = result.data.goodsinfo.list;
          this.goodsinfo = result.data.goodsinfo;
          this.sellerGoodsInfo.focus = result.data.goodsinfo.focus;
          loading.close();
        });
    },
    addInquiry(seller_id) {
      if (!this.loginState) {
        this.setshowlogin(true);
        return;
      }
      if(seller_id==this.UserInforma.id){
        this.$message.error("不能对自己品牌下的产品加")
        return;
      }
      var obj = {
        sellerGoodsId: this.sellerGoodsInfo.id,
        goodsId: this.sellerGoodsInfo.goods_id,
        sellerId: this.sellerGoodsInfo.brandId,
        goodsSource: "2",
        goodsName: this.sellerGoodsInfo.goods_name
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          this.$message.success("添加成功");
          var _this=this;
            setTimeout(()=>{
              _this.GetUserInforma();
            },2000)
        });
    },
    addFocus() {
      if (!this.loginState) {
        //this.$router.push("/Login");
        this.setshowlogin(true);
        return;
      }
      let obj = {
        goods_id: this.sellerGoodsInfo.goods_id,
        catergory_id: this.goodsinfo.classificationId,
        favour_type: "1"
      };
      var _this = this;
      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          _this.$set(_this.sellerGoodsInfo, "focus", true);
          _this.$message.success("已关注");
        });
    },
    addShopingCar(seller_id) {
      if (!this.loginState) {
        //this.$router.push("/Login");
        this.setshowlogin(true);
        return;
      }
      if(seller_id==this.UserInforma.id){
        this.$message.error("不能对自己发布的商品加购物车进行购买")
        return;
      }
      var obj = {
        sellerGoodsId: this.sellerGoodsInfo.id,
        sellerId: this.sellerGoodsInfo.sellerId,
        goodsSource: "1",
        goodsName: this.sellerGoodsInfo.goods_name,
        goodsId: this.goodsinfo.id,
         goodsCount:this.count
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          if (res) {
            this.$message.success("添加成功");
            var _this=this;
            setTimeout(()=>{
              _this.GetUserInforma();
            },2000)
            
          }
        });
    },
    purchase(seller_id) {
      if (!this.loginState) {
        this.setshowlogin(true);
        return;
      }
      if(seller_id==this.UserInforma.id){
        this.$message.error("不能对自己发布的商品进行购买")
        return;
      }
      this.showPurchase = true;
    },
    specialPrice(seller_id) {
      if (!this.loginState) {
        //this.$router.push("/Login");
        this.setshowlogin(true);
        return;
      }
      if(seller_id==this.UserInforma.id){
        this.$message.error("不能对自己品牌下的产品申请特价")
        return;
      }
      let factorySellerInfo = this.goodsinfo.factorySellerInfo;
      factorySellerInfo.priceType = factorySellerInfo.price_type;
      factorySellerInfo.priceLevel = factorySellerInfo.price_level;
      factorySellerInfo.seckilPrice = factorySellerInfo.seckil_price;
      this.$store.dispatch("promation", [
        {
          ...this.goodsinfo,
          factorySellerInfo: factorySellerInfo
        }
      ]);
      this.$router.push("/InquiryBasket/ApplySpecialPrice");
    },
    pushlishspecialPrice() {
      //发布特价
      if (!this.loginState) {
        //this.$router.push("/Login");
        this.setshowlogin(true);
        return;
      }
      if (this.UserInforma) {
        if (this.UserInforma.userTagMap && this.UserInforma.userTagMap.seller) {
          this.$router.push(
            "/PersonalCenter/SellerIssuesProduct?name=" +
              this.sellerGoodsInfo.goods_name
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
    }
  },
  computed: {
    ...mapState({
      UserInforma:state=>state.Login.UserInforma,
      loginState:state => state.loginState
    })
  },
  filters: {
    filterHours(val) {
      return Number(val) * 24;
    },
    formatDate(val) {
      return TimeForma(val);
    }
  }
};
</script>
<style scoped lang="less">
@import "./sellerGoodsDetail.less";
</style>
