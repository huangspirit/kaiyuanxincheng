<template>
  <div class="index">
    <div class="message" :class="headerFxed?'headerFxed':''" v-if="messageList.length">
      <el-carousel height="28px" :interval="200000" v-if="messageList.length" :loop="true">
        <el-carousel-item v-for="(item,k) in messageList" :key="k">
          <ul class="clear" :class="animate1?'anim':'animFalse'">
            <li :style="'width:'+screenWidth+'px'" class="clear">
              <h3 class="small">
                <img src="@/assets/image/index/message.png" alt style="margin-right:10px;" />
                {{ item.desc }}
              </h3>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="banner">
      <img :src="bannerList[2]['url']" alt style="height:100%;width:100%;" />
      <!-- <el-carousel>
                <el-carousel-item v-for="(item,k) in bannerList" :key="k" >
                    <img :src="item.url" alt="" >
                </el-carousel-item>
      </el-carousel>-->
      <div class="wrapSearch allWidth">
        <p class="tit">
          <span>用芯链接世界</span>
          <span style="margin-left:30px;">低价才是王道</span>
          <!-- 找低价   买特价   开源节流 -->
          <!-- <countTo :endVal="brandTotal" :duration="4"></countTo>个厂商
                    <countTo :endVal="catergoryTotal" :duration="4"></countTo>种产品
          <countTo :endVal="productTotal" :duration="4"></countTo>个产品-->
        </p>
        <p class="desc">
          <!-- <span>用芯链接世界</span><span style="margin-left:30px;">低价才是王道</span> -->
        </p>
        <HeaderSearch ref="HeaderSearch" class="headerSeach"></HeaderSearch>
        <ul class="hot-search clear">
          <li
            @click="searchLink(item)"
            v-for="(item, k) in HotSearchList"
            :key="`list_${k}_${item.name}`"
          >{{item.name}}</li>
        </ul>
      </div>
      
      <span @click="settle" class="topRuzhu bgColor" v-if="!UserInforma.userTagMap || (UserInforma.userTagMap && !UserInforma.userTagMap.seller)">立即入驻</span>
    </div>
    <div class="specialGoods allWidth">
      <router-link tag="div" class="title btn" to="/specialPrice">特价直通车</router-link>
      <div class="desc color">跟着特价买，越来越便宜</div>
      <ul class="list clear">
        <li v-for="(item,k) in specialList" class="item fl" :class="(k+1)%3==0?'noMargin':''" :key="k">
          <span
            class="goodsType"
            :class="item.goods_type?'greenColor':'bgColor'"
            :title="item.goods_type?'现货':'订货'"
          >{{item.goods_type?'现':'订'}}</span>
          <div class="wrapImg" @click="chipSellerGoodsDetal(item)">
            <ImgE
              :src="baseURL3+'/'+item.sellerGoodsImageUrl.split('@')[0]"
              :W="350"
              :H="200"
              v-if="item.sellerGoodsImageUrl"
            ></ImgE>
            <ImgE :src="item.goodsImageUrl" :W="350" :H="200" v-if="!item.sellerGoodsImageUrl"></ImgE>
          </div>
          <div style="padding:0 15px;" class="newClass">
            <div @click="chipSellerGoodsDetal(item)" class="goodsName" :title="item.goods_name">{{item.goods_name}}</div>
            <div class="gray desc" :title="item.goodsDesc">{{item.goodsDesc}}</div>
            <div class="brand">
              品牌：
              <router-link
                :to="{
                                    path:'/BrandDetail',
                                    query:{
                                        tag:'brand',
                                        documentid:item.brandId,
                                        name:item.brandName
                                    }
                                }"
              >{{item.brandName}}</router-link>
            </div>
            <div class="tagwrap">
              <span :class="item.goods_type?'borderGreen green':'borderColor color'">{{item.goods_type?'现货':'订货'}}</span>
              <span class="borderColor">{{item.diliverPlace}}交货</span>
              <span class="borderBlu" :class="item.seller_always?'':'color'">{{item.seller_always?'长期特价':'限时抢购'}}</span>
            </div>
            <div class="info">
              <div class="sellerInfo ">
                <p class="img">
                  <img :src="item.userImgeUrl" alt @click="chipShop(item)" />
                </p>
                <div class="wrapInfo clear">
                    <div class="wrap" @click="chipShop(item)">
                      <img :src="item.userImgeUrl" alt />
                      <div :title="item.sellerName" >
                        <p style="margin:10px 0;">{{item.sellerName}}</p>
                      
                        <span class="tag bgColor" v-if="item.tag==1">{{item.tag | tagFilter}}</span>
                        <span class="tag bgBlu" v-if="item.tag==2">{{item.tag | tagFilter}}</span>
                        <span class="tag bgOrange" v-if="item.tag==18">{{item.tag | tagFilter}}</span>
                         <span class="tag bgOrange">保</span>
                      </div>
                    </div>
                 
                 <div class="score">
                     <div >入驻时间：{{item.settleTime | formatDate}}</div>
                     <div style="margin-bottom:20px;">企业资质：已认证</div>
                     <div class="scoreitem">
                        <span>产品质量：</span>
                        <span class="color" v-if="item.mapComment.profileA>item.mapComment.profileB">
                            <span>{{item.mapComment.profileA | toFixed(1)}}</span>
                            <span>高于平均值{{item.mapComment.profileB | toFixed(1)}}</span>
                            <span class="el-icon-top"></span>
                        </span>
                        <span class="green" v-if="item.mapComment.profileA<item.mapComment.profileB">
                            <span>{{item.mapComment.profileA | toFixed(1)}}</span>
                            <span>低于平均值{{item.mapComment.profileB | toFixed(1)}}</span>
                            <span class="el-icon-bottom"></span>
                        </span>
                        <span v-if="item.mapComment.profileA==item.mapComment.profileB">
                            <span>{{item.mapComment.profileA | toFixed(1)}}</span>
                            <span>等于平均值{{item.mapComment.profileB | toFixed(1)}}</span>
                        </span>
                    </div>
                     <div class="scoreitem">
                        <span>发货速度：</span>
                        <span class="color" v-if="item.mapComment.deliverA>item.mapComment.deliverB">
                        <span>{{item.mapComment.deliverA | toFixed(1)}}</span>
                        
                        <span>高于平均值{{item.mapComment.deliverB | toFixed(1)}}</span>
                        <span class="el-icon-top"></span>
                        </span>
                        <span class="green" v-if="item.mapComment.deliverA<item.mapComment.deliverB">
                        <span>{{item.mapComment.deliverA | toFixed(1)}}</span>
                        <span>低于平均值{{item.mapComment.deliverB | toFixed(1)}}</span>
                        <span class="el-icon-bottom"></span>
                        </span>
                        <span v-if="item.mapComment.deliverA==item.mapComment.deliverB">
                        <span>{{item.mapComment.deliverA | toFixed(1)}}</span>
                        <span>等于平均值{{item.mapComment.deliverB | toFixed(1)}}</span>
                        </span>
                    </div>
                     <div class="scoreitem">
                        <span>服务支持：</span>
                        <span class="color" v-if="item.mapComment.serviceA>item.mapComment.serviceB">
                        <span>{{item.mapComment.serviceA | toFixed(1)}}</span>
                        
                        <span>高于平均值{{item.mapComment.serviceB | toFixed(1)}}</span>
                        <span class="el-icon-top"></span>
                        </span>
                        <span class="green" v-if="item.mapComment.serviceA<item.mapComment.serviceB">
                        <span>{{item.mapComment.serviceA | toFixed(1)}}</span>

                        
                        <span>低于平均值{{item.mapComment.serviceB | toFixed(1)}}</span>
                        <span class="el-icon-bottom"></span>
                        </span>
                        <span v-if="item.mapComment.serviceA==item.mapComment.serviceB">
                        <span>{{item.mapComment.serviceA | toFixed(1)}}</span>
                        <span>等于平均值{{item.mapComment.serviceB | toFixed(1)}}</span>
                        </span>
                    </div>
                 </div>
                  <p style="center">
                    <span class="borderColor" style="padding:2px 5px;border-radius:4px;cursor:pointer;"  @click="chipShop(item)">进入店铺</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="price">
              <strong
                class="green"
                v-if="!item.priceType"
              >一口价：{{item.priceUnit?'$':'￥'}}{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</strong>
              <strong
                class="color fr"
                v-if="item.priceType"
              >阶梯价：{{item.priceUnit?'$':'￥'}}{{item.priceList[item.priceList.length-1].price | toFixed(item.priceUnit?3:2)}}</strong>
              <span  v-if="item.priceType">起</span>
            </div>

            <div class="blu" >
                <span v-if="item.day_interval">下单后{{item.day_interval | filterHours}}小时内可发货</span>
            </div>
              <div class="time clear blu" v-if="!item.seller_always && item.expireTime">
                <span class="fl">
                  <img src="@/assets/image/index/timer.png" alt />
                  距离特价结束：
                </span>
                <CountTime
                  class="fl"
                  v-on:end_callback="countDownE_cb()"
                  :currentTime="item.currentTime"
                  :startTime="item.currentTime"
                  :endTime="item.expireTime"
                  :tipText="'距离活动开始'"
                  :tipTextEnd="''"
                  :endText="'活动已失效'"
                  :dayTxt="'天'"
                  :hourTxt="'小时'"
                  :minutesTxt="'分'"
                  :secondsTxt="'秒'"
                ></CountTime>
              </div>
            <!-- <div @click="chipSellerGoodsDetal(item)" class="btn bgColor">立即跟单</div> -->
          </div>
        </li>
      </ul>
      <router-link
        tag="div"
        class="more bluebtn"
        to="/specialPrice"
        style="height:60px;line-height:60px;background:#f5f5f5;margin-bottom:35px;"
      >查看更多特价</router-link>
    </div>
    <div class="origin specialGoods">
      <router-link tag="div" class="title" to="/brand">原厂直营店</router-link>
      <div class="desc color">原厂直购、正品保障</div>
      <div class="cont clear allWidth">
        <div class="fl left">
          <img src="@/assets/image/banner/4.jpg" alt />
        </div>
        <ul class="originGoodsList fl">
          <li
            v-for="(item ,index) in originGoodsList"
            @click="chipSellerGoodsDetal(item)"
            :key="index"
          >
            <ImgE
              :src="baseURL3+'/'+item.sellerGoodsImageUrl.split('@')[0]"
              :W="250"
              :H="150"
              v-if="item.sellerGoodsImageUrl"
            ></ImgE>
            <ImgE :src="item.goodsImageUrl" :W="250" :H="150" v-if="!item.sellerGoodsImageUrl"></ImgE>
            <div class="goodsInfo">
              <div @click="chipSellerGoodsDetal(item)" class="goodsName color">{{item.goods_name}}</div>
              <div>
                <router-link
                  :to="{
                                    path:'/BrandDetail',
                                    query:{
                                        tag:'brand',
                                        documentid:item.brandId,
                                        name:item.brandName
                                    }
                                }"
                >{{item.brandName}}</router-link>
              </div>

              <div class="desc gray">{{item.goodsDesc}}</div>
              <div class="count gray">
                <span>起订量:&nbsp;{{item.moq}}只</span>&nbsp;&nbsp;
                <span>最小增量:&nbsp;{{item.mpq}}只</span>
              </div>
              <div class="marking">
                <span class="tag color borderColor" v-if="item.tag==1">{{item.tag | tagFilter}}</span>
                <span class="tag blu borderBlu" v-if="item.tag==2">{{item.tag | tagFilter}}</span>
                <span class="tag orange borderOrange" v-if="item.tag==18">{{item.tag | tagFilter}}</span>
                <span class="borderColor">{{item.diliverPlace}}发货</span>
                <span :class="item.goods_type?'borderGreen green':'borderColor color'">{{item.goods_type?'现货':'订货'}}</span>
              </div>
            </div>
            <div class="price">
              <div>
                <ol v-if="item.priceType">
                  <li
                    v-for="(item0,index0) in item.priceList"
                    class="color"
                    :key="index0"
                    style="font-size:18px"
                  >
                    <strong>{{item0.num}}+---{{item.priceUnit?'$':'￥'}}{{item0.price | toFixed(item.priceUnit?3:2)}}</strong>
                  </li>
                </ol>
                <p class="color" v-if="!item.priceType" style="font-size:22px;">
                  <strong>{{item.priceUnit?'$':'￥'}}{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</strong>
                </p>
                <!--                                        <p class="bgColor btn" @click="addCar(item)">加入购物车</p>-->
                <p
                  style="color:#354cd9;font-size:12px;margin-bottom:12px;"
                >({{!item.priceUnit?'含13%增值税':'不含税'}})</p>
                <p class="bgColor btn">立即跟单</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="allWidth">
        <router-link
          tag="div"
          class="more bluebtn"
          to="/brand"
          style="height:60px;line-height:60px;background:#fff;margin-bottom:35px;margin-top:20px;"
        >查看更多原厂商品</router-link>
      </div>
    </div>
    <div class="specialGoods origin oldProduct">
      <router-link tag="div" class="title" to="/oldGoods">呆料掘金池</router-link>
      <div class="desc color">呆料里也有宝贝，库里的呆料本身已没有价值，卖了换钱吧......</div>
      <div class="allWidth clear">
        <!-- <span class="fr dailiao bgColor" @click="pulish">我有呆料</span> -->
        <span class="fr btn dailiao" @click="pulish">我有呆料</span>
      </div>
      <div class="cont clear allWidth">
        <!-- <div class="fl left">
                    <img src="@/assets/image/banner/4.jpg" alt="">
        </div>-->
        <div class="goodsList fl">
          <ul class="titleList bgColor">
            <li class="goodsName">供应商</li>
            <li class="goodsName" style="text-align:left;">型号</li>
            <li class="item">品牌</li>
            <li class="item">批号</li>
            <li class="item">数量</li>
            <li class="item">清仓价</li>
            <li class="item">交货地点</li>
            <li class="item">购买</li>
          </ul>
          <ol>
            <li v-for="(item,k) in oldProductList" :key="k">
              <div class="goodsName taginfo">
                <img :src="item.userImgeUrl" alt style="cursor:pointer;" @click="chipShop(item)" />
                <div>
                  <p class="sellerName" @click="chipShop(item)" :title="item.sellerName">{{item.sellerName}}</p>
                  <p>
                    <span class="btn blue" v-if="item.tag!=3">{{item.tag | tagFilter}}</span>
                    <span v-if="item.focus" class="btn bgd5">已关注</span>
                    <span
                      v-if="!item.focus"
                      class="btn focus bgColor"
                      @click.stop="addFocus(k,'oldProduct')"
                    >关注</span>
                  </p>
                </div>
              </div>
              <p
                :title="item.goods_name"
                class="goodsName"
                @click="chipSellerGoodsDetal(item)"
              >{{item.goods_name}}</p>
              <div class="oneitem brand">
                <router-link
                  :to="{
                                    path:'/BrandDetail',
                                    query:{
                                        tag:'brand',
                                        documentid:item.brandId,
                                        name:item.brandName
                                    }
                                }"
                >{{item.brandName}}</router-link>
              </div>
              <div class="oneitem green">{{item.base_no}}</div>
              <div class="oneitem">{{item.goodsStockCount}}</div>

              <div class="color stepPriceWrap oneitem">
                <div v-if="item.priceType" class="stepPrice">
                  {{item.priceUnit?'$':'￥'}}{{item.priceList[item.priceList.length-1]['price'] | toFixed(item.priceUnit?3:2)}}&nbsp;
                  <i class="el-icon-circle-plus-outline" style="font-size:12px;"></i>
                  <ul class="priceList">
                    <li
                      v-for="(item0,index0) in item.priceList"
                      :key="index0"
                    >{{item0.num}}+---{{item.priceUnit?'$':'￥'}}{{item0.price | toFixed(item.priceUnit?3:2)}}</li>
                    <li style="color:#354cd9;">({{!item.priceUnit?'含13%增值税':'不含税'}})</li>
                  </ul>
                </div>
                <span
                  v-if="!item.priceType"
                >{{item.priceUnit?'$':'￥'}}{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</span>
              </div>
              <div class="oneitem">{{item.diliverPlace}}</div>
              <div @click="chipSellerGoodsDetal(item)" class="color oneitem purchase">立即购买</div>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <!-- 已入驻原厂 -->
    <div class="settledIn">
      <div class="title allWidth clear">
    
        <div class="fr ruzhu" v-if="!UserInforma.userTagMap || (UserInforma.userTagMap && !UserInforma.userTagMap.seller)">
          <span class="bgColor" @click="settle">立即入驻</span>
        </div>
        <div class="fl left clear">
          <div class="count color fl">
            <countTo :endVal="100" :duration="4"></countTo>
            <span class="jia">+</span>
          </div>
          <div class="fl right">
            <p class="tit">已入驻原厂</p>
            <p class="small">数百家厂商的选择,{{title}}值得您信赖</p>
          </div>
        </div>
      </div>
      <ul class="clear allWidth">
        <template v-for="(item,index) in originFactoryList">
          <router-link
            :to="{
                               path:'/BrandDetail',
                                query:{
                                  tag:'brand',
                                  name:item.brand,
                                  documentid:item.id
                                }
                                  }"
            tag="li"
            :key="index"
            @click="sendLink(item)"
            :class="(index+1)%5==0?'rightCoverFlag':'leftCoverFlag'"
          >
            <div class="wrap" @mouseleave="item.show=false" @mouseenter="item.show=true">
              <ImgE :src="item.imgurl" :W="200" :H="150"></ImgE>
              <transition name="el-zoom-in-left">
                <div class="coverFlag clear bgColor" v-show="item.show">
                  <p class="brandName">{{item.branda}}</p>
                  <p class="brandDesc">
                    <i class="el-icon-circle-plus-outline"></i>
                  </p>
                </div>
              </transition>
            </div>
          </router-link>
        </template>
      </ul>
    </div>
    <!-- 产品分类 -->
    <div class="prodclass">
      <div class="prodclass-con clear allWidth">
        <div class="prodclass-l">
          <p>
            <img src="@/assets/image/index/u1491.png" alt />
            产品分类
          </p>
          <ul>
            <li
              v-for="(item,k) in CatergoryList"
              :class="selected==k?'active':''"
              @click="selected=k"
              :key="k"
            >
              <!--                            <span class="fr el-icon-arrow-right"></span>-->
              <!--                            <ImgE :src="item.imgUrl" :W="30" :H="30" class="fl"></ImgE>-->
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="prodclass-m">
          <div class="fl wrap">
            <div v-for="(item,k ) in secondCategory" @click="chipUndirect(k)" :key="k" class="item">
              <a :title="item.name">
                <ImgE :src="item.imgUrl" :W="40" :H="25" style="text-align:center;"></ImgE>
                {{item.name}}
              </a>
            </div>
          </div>
        </div>
        <div class="prodclass-r">
          <p>热门厂商</p>
          <div class="slideWrap" @mouseenter="handleEnter" @mouseleave="handleLeave">
            <ul :class="{anim:animate==true}">
              <li v-for="(item) in catergoryBrandList" :key="item.id">
                <router-link
                  :to="{
                                    path:'/BrandDetail',
                                    query:{
                                        tag:'brand',
                                        documentid:item.id,
                                        name:item.brand
                                    }
                                }"
                >
                  <ImgE :src="item.imgurl" :W="160" :H="80"></ImgE>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { axios, home, shoppingCar, common } from "../../api/apiObj";
import HeaderSearch from "_c/HeaderSearch";
import { SearchJump } from "@/lib/utils";
import countTo from "_c/countTo";
import { TimeForma2, TimeForma } from "../../lib/utils";
import { ladderPrice } from "../../lib/utils";
import { baseURL3 } from "@/config";

export default {
  data() {
    return {
      baseURL3: baseURL3,
      bannerList: [
        {
          url: require("@/assets/image/banner/1.jpg")
        },
        {
          url: require("@/assets/image/banner/2.jpg")
        },
        {
          url: require("@/assets/image/banner/3.jpg")
        }
      ],
      bannerHeight: "auto",
      messageList: [],
      HotSearchList: [],
      searchValue: "",
      specialList: [],
      originGoodsList: [],
      oldProductList: [],
      originFactoryList: [],
      //
      interval: null,
      animate: false,
      animate1: false,
      //分类
      CatergoryList: [],
      catergoryBrandList: [],
      selected: 0,
      secondCategory: [],
      brandTotal: 0,
      catergoryTotal: 0,
      productTotal: 0,
      screenHeight: 0,
      screenWidth: 0,
      //isSeller: false
    };
  },
  computed: {
    ...mapState({
      title: state => state.title,
      headerFxed: state => state.headerFxed,
      loginState: state => state.loginState,
      UserInforma:state => state.Login.UserInforma,
    })
  },
  watch: {
    selected(k) {
      this.catergoryBrandList = this.CatergoryList[k].brandList;
      this.secondCategory = this.CatergoryList[k].childernList;
    //  this.querySecondCatergory(k);
        
    }
  },
  filters: {
    formatDate(val) {
      return TimeForma(val);
    },
    filterHours(val) {
      return Number(val) * 24;
    }
  },
  methods: {
    ...mapActions("Login", ["GetUserInforma"]),
    ...mapMutations(["setloginState","setshowlogin"]),
    async init() {
      await this.querySysMessage();
      await this.getHotSearchList();
      await this.getSpecialOfferList();
      await this.getOriginGoodsList();
      await this.getoldProductList();
      await this.getOriginFactoryList();
      //获取分类
      await this.queryCatergoryHomePage(0);
    },
    querySysMessage() {
      var _this = this;
      axios
        .request({
          ...common.querySysMessage,
          params: {
            length: 10,
            start: 0,
            is_enable: true
          }
        })
        .then(res => {
          if (res.data.total == 1) {
            this.messageList = [...res.data.data, ...res.data.data];
          } else if (res.data.total > 1) {
            this.messageList = res.data.data;
          }
          if (res.data.total) {
            setTimeout(() => {
              _this.animate1 = true;
            }, 0);
            setInterval(function() {
              _this.animate1 = false;
              // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
              setTimeout(() => {
                //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                _this.messageList.push(_this.messageList[0]); // 将数组的第一个元素添加到数组的
                _this.messageList.shift(); //删除数组的第一个元素
                // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                _this.animate1 = true;
              }, 0);
            }, 20200);
          }
        });
    },
    getHotSearchList() {
      axios.request(home.GetHotSearch).then(res => {
        this.HotSearchList = res.list;
        this.brandTotal = res.brandTotal;
        this.catergoryTotal = res.catergoryTotal;
        this.productTotal = res.productTotal;
      });
    },
    getSpecialOfferList() {
      let obj = {
        start: 0,
        length: 6,
        special_price: false,
        // goods_type:true,
        status: 1
      };
      axios.request({ ...home.SpecialOfferList, params: obj }).then(res => {
        this.specialList = res.data.data.map(item => {
          if (item.priceType) {
            //标识阶梯价
            item.priceList = ladderPrice(item.priceLevel);
          }
          return item;
        });
      });
    },
    searchLink(item) {
      this.searchValue = item.name;
      this.$router.push({
        path: SearchJump(item.tag),
        query: item
      });
    },
    getOriginGoodsList() {
      let obj = {
        start: 0,
        length: 3,
        create_tag: true,
        status: 1
      };
      axios.request({ ...home.SpecialOfferList, params: obj }).then(res => {
        this.originGoodsList = res.data.data.map(item => {
          if (item.priceType) {
            //标识阶梯价
            item.priceList = ladderPrice(item.priceLevel);
          }
          return item;
        });
      });
    },
    getoldProductList() {
      let obj = {
        start: 0,
        length: 100,
        is_old_product: true,
        status: 1
      };
      axios.request({ ...home.SpecialOfferList, params: obj }).then(res => {
        this.oldProductList = res.data.data.map(item => {
          if (item.priceType) {
            //标识阶梯价
            item.priceList = ladderPrice(item.priceLevel);
          }
          return item;
        });
      });
    },
    getOriginFactoryList() {
      axios
        .request({
          ...home.findBrandList,
          params: { start: 0, length: 15, type: "", name: "" }
        })
        .then(res => {
          this.originFactoryList = res.data.data.map(item => {
            item.show = false;
            return item;
          });
        });
    },
    //获取分类
    queryCatergoryHomePage(catergory_id) {
      let obj = {
        catergory_id: catergory_id,
        flag: true
      };
      axios
        .request({ ...home.queryCatergoryHomePage, params: obj })
        .then(res => {
          this.CatergoryList = res.data;
          this.catergoryBrandList = res.data[0].brandList;
          this.secondCategory = res.data[0].childernList;
          this.interval = setInterval(this.scroll, 5000);
         // this.querySecondCatergory(0);
        });
    },
    querySecondCatergory(k) {
      let obj = {
        catergory_id: this.CatergoryList[k].id,
        flag: false
      };
      axios
        .request({ ...home.queryCatergoryHomePage, params: obj })
        .then(res => {
          this.secondCategory = res.data;
        });
    },
    //二级分类跳转
    chipUndirect(k) {
      let obj = this.secondCategory[k];
      this.$router.push({
        path: "/BrandDetail/Direct",
        query: {
          tag: "direct",
          documentid: obj.id,
          name: obj.name
        }
      });
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > this.screenHeight / 2) {
        this.$store.state.headerFxed = true;
      } else {
        this.$store.state.headerFxed = false;
      }
    },
    handleEnter() {
      clearInterval(this.interval);
    },
    handleLeave() {
      this.interval = setInterval(this.scroll, 5000);
    },
    scroll() {
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.catergoryBrandList.push(this.catergoryBrandList[0]); // 将数组的第一个元素添加到数组的
        this.catergoryBrandList.shift(); //删除数组的第一个元素
        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 500);
    },

    scroll1() {
      this.animate1 = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.messageList.push(this.messageList[0]); // 将数组的第一个元素添加到数组的
        this.messageList.shift(); //删除数组的第一个元素
        this.animate1 = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 4999);
    },
    //加入购物车
    addCar(item) {
      let obj = {
        sellerId: item.sellerId,
        sellerGoodsId: item.id,
        goodsSource: 1,
        goodsName: item.goods_name,
        goodsId: item.goods_id
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          if(res){
            this.$message.success("已加入购物车");
            var _this=this;
            setTimeout(()=>{
              _this.GetUserInforma();
            },2000)
          }
          
        });
    },
    countDownE_cb() {
      console.log("计时器回调");
      //重新获取特价商品//
      this.getSpecialOfferList();
    },
    pulish() {
      //发布呆料
      if (this.loginState) {
        if (this.UserInforma.userTagMap.seller) {
          this.$router.push("/PersonalCenter/SellerIssuesProduct");
        } else {
          this.$router.push("/OriginalFactoryEntry");
        }
      } else {
       // this.$router.push("/Login");
       this.setshowlogin(true)
      }
    },
    settle() {
      //商家入驻
      if (this.loginState) {
        //  if(this.UserInforma.userTagMap.seller){
        //   this.$message({
        //     message:'您已是'+this.title+'的商家，不能再次入驻！',
        //     type:'warning'
        //   })
        //     return;
        // }
    
        this.$router.push("/OriginalFactoryEntry");
      } else {

       // this.$router.push("/Login");
       this.setshowlogin(true)
      }
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
    chipSellerGoodsDetal(item) {
      //跳转商品详情
      sessionStorage.setItem("sellerGoodsDetail", JSON.stringify(item));
      this.$router.push("/sellerGoodsDetail");
    },
    addFocus(index, mark) {
      if (!this.loginState) {
       // this.$router.push("/Login");
       this.setshowlogin(true)
        return;
      }
      let obj = {};
      if (mark == "oldProduct") {
        obj = {
          user_tag: this.oldProductList[index].tag,
          seller_id: this.oldProductList[index].sellerId,
          favour_type: 2 //标识关注卖家
        };
      } else if (mark == "special") {
        obj = {
          user_tag: this.specialList[index].tag,
          seller_id: this.specialList[index].sellerId,
          favour_type: 2 //标识关注卖家
        };
      }

      var _this = this;
      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          if (mark == "oldProduct") {
            _this.$set(_this.oldProductList[index], "focus", true);
          } else if (mark == "special") {
            _this.$set(_this.specialList[index], "focus", true);
          }
          _this.$message.success("已关注");
        });
    }
  },
  mounted() {
    this.bannerHeight = window.innerHeight + "px";
    // if (sessionStorage.getItem("access_token")) {
    //   this.setloginState(true);
    //   this.GetUserInforma({
    //     access_token: sessionStorage.getItem("access_token")
    //   }).then(res => {
    //      this.UserInforma = res;
    //     this.isSeller = this.UserInforma.userTagMap.seller;
    //   });
    // } else {
    //   this.setloginState(false);
    // }
    this.screenHeight = window.screen.height;
    this.screenWidth = window.screen.width;
    this.$store.state.headerFxed = false;
    // 滚动监听
    window.addEventListener("scroll", this.handleScroll);
    this.init();
  },
  components: {
    countTo,
    HeaderSearch
  },
  destroyed() {
    this.$store.state.headerFxed = true;
    window.removeEventListener("scroll", this.handleScroll);
    clearInterval(this.interval);
  }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
