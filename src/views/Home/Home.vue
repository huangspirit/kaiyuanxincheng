<template>
  <div class="home" @click="noSearch()">
    <!-- banner -->
    <img src="../../assets/image/home/u12.gif" alt="" class="bannerbg">
    <img src="../../assets/image/home/u12.gif" alt="" class="bannerbg">
    <div class="banner">
      <!-- <p class="tit">用芯链接世界</p> -->
      <p class="tit">
        <countTo :endVal="brandTotal" :duration="4"></countTo>个厂商
        <countTo :endVal="catergoryTotal" :duration="4"></countTo>种产品
        <countTo :endVal="productTotal" :duration="4"></countTo>个产品
      </p>
      <div class="searchInputWrap">
        <HeaderSearch ref="HeaderSearch"></HeaderSearch>
      </div>
      <div class="hot-search">
        <ul>
          <li
            @click="searchLink(item)"
            v-for="(item, k) in HotSearchList.list"
            :key="`list_${k}_${item.name}`"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <!-- 特价直通车 -->
    <div class="special">
      <p class="tit">特价直通车</p>
      <p class="small">跟着特价买，越来越便宜......</p>
      <div class="list-con">
        <div class="tab-list">
          <span>猜你喜欢</span>
          <div class="change" @click="tabChange">
            <span>换一批</span>
            <img src="@/assets/image/home/_u1118.png" alt>
          </div>
        </div>
        <ul class="tab-con">
          <SpecialOfferItem
            v-for="(item, k) in SpecialOfferList"
            :key="`list_${item.goods_id}_${item.sellerId}_${k}`"
            :item="item"
          ></SpecialOfferItem>
        </ul>
      </div>
    </div>
    <!-- 已入驻原厂 -->
    <div class="settledIn">
      <p class="tit">已入驻原厂</p>
      <p class="small">数百家厂商的选择，芯手网值得您信赖</p>
      <ul>
        <template  v-for="(item,index) in findBrandList">
          <li
            :key="`findBrandList_${item.id}`"
            @click="sendLink(item)"
            :class="(index+1)%4==0?'rightCoverFlag':'leftCoverFlag'"
          >
          <!-- <img :src="item.imgurl" alt=""> -->
            <ImgE :src="item.imgurl" :W="430" :H="170"></ImgE>
            <div class="coverFlag">
              <p class="brandName">{{item.branda}}</p>
              <p class="brandDesc">{{item.brand_desc}}</p>
            </div>
          </li>
        </template>
      </ul>
      <div class="more">
        <span>+立即入驻</span>
        <router-link to="/Brand" tag="a">更多厂商>></router-link>
        <!-- <a href="###"></a> -->
      </div>
    </div>
    <!-- 企业 -->
    <div class="enterprise">
      <p class="tit">
        <span>{{brandTotal}}</span> 个企业正在用芯手网搜特价
        <span></span>
      </p>
      <p class="small">数百家厂商的选择，芯手网值得您信赖</p>
      <ul>
        <li>
          <img src="@/assets/image/home/1_u1472.jpg" alt>
        </li>
        <li>
          <img src="@/assets/image/home/1_u1475.jpg" alt>
        </li>
        <li>
          <img src="@/assets/image/home/1_u1478.jpg" alt>
        </li>
      </ul>
    </div>

    <!-- 产品分类 -->
    <!-- <div class="prodclass">
      <div class="prodclass-con">
        <div class="prodclass-l">
          <p>
            <img src="@/assets/image/home/u1491.png" alt>
            产品分类
          </p>
          <ul>
            <li>
              电阻
              <span>></span>
            </li>
            <li>
              晶体
              <span>></span>
            </li>
            <li>
              二极
              <span>></span>
            </li>
            <li>
              晶
              <span>></span>
            </li>
            <li>
              放大器,线性
              <span>></span>
            </li>
            <li>
              电源芯
              <span>></span>
            </li>
            <li>
              电感/磁珠/变压
              <span>></span>
            </li>
            <li>
              存储
              <span>></span>
            </li>
          </ul>
        </div>
        <div class="prodclass-m">
          <ul>
            <li>
              <span>贴片电阻</span>
              <span>贴片超低阻值电阻</span>
              <span>贴片高精密电阻</span>
              <span>贴片压敏电阻</span>
            </li>
            <li>
              <span>贴片电阻</span>
              <span>贴片超低阻值电阻</span>
              <span>贴片高精密电阻</span>
              <span>贴片压敏电阻</span>
            </li>
            <li>
              <span>贴片电阻</span>
              <span>贴片超低阻值电阻</span>
              <span>贴片高精密电阻</span>
              <span>贴片压敏电阻</span>
            </li>
            <li>
              <span>贴片电阻</span>
              <span>贴片超低阻值电阻</span>
              <span>贴片高精密电阻</span>
              <span>贴片压敏电阻</span>
            </li>
          </ul>
        </div>
        <div class="prodclass-r">
          <p>入驻厂商</p>
          <ul>
            <li>
              <img src="@/assets/image/home/logo1_u1153.jpg" alt>
            </li>
            <li>
              <img src="@/assets/image/home/logo1_u1153.jpg" alt>
            </li>
            <li>
              <img src="@/assets/image/home/logo1_u1153.jpg" alt>
            </li>
            <li>
              <img src="@/assets/image/home/logo1_u1153.jpg" alt>
            </li>
            <li>
              <img src="@/assets/image/home/logo1_u1153.jpg" alt>
            </li>
          </ul>
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
// import "./home.less";
import HeaderSearch from "_c/HeaderSearch";
import { SearchData } from "@/api/home";
import { SearchJump } from "@/lib/utils";
import SpecialOfferItem from "_c/SpecialOfferItem";
import { mapState, mapGetters, mapActions ,mapMutations} from "vuex";
import countTo from "_c/countTo";

export default {
  name: "home",
  data() {
    return {
      // 商家总数
      brandTotal: 0,
      // 产品总数
      productTotal: 0,
      // 种类数
      catergoryTotal: 0,
      specialParams: {
        status: 1,
        length: 6,
        start: 0
      }
    };
  },
  components: {
    HeaderSearch,
    SpecialOfferItem,
    countTo
  },
  computed: {
    ...mapGetters("home", [
      "SpecialOfferList",
      "OfferListTotal",
      "HotSearchList"
    ]),

    ...mapState({

      findBrandList: state => state.home.findBrandList,
      BrandListTotal: state => state.home.BrandListTotal
    })
  },
  watch: {},
  methods: {
    ...mapMutations([
      "setloginState"
    ]),
    // 大搜索跳转
    searchLink(item) {
      this.searchValue = item.name;
      this.$router.push({
        path: SearchJump(item.tag),
        query: item
      });
    },
    noSearch() {
      this.$refs.HeaderSearch.noSearch();
    },
    // 换一批
    tabChange() {
      this.$loading(this.$store.state.loading);
      this.specialParams.start += 6;
      this.$store
        .dispatch("home/GetSpecialOfferList", this.specialParams)
        .then(res => {
          if (!res.length) {
            this.specialParams.start = 0;
            this.$store
              .dispatch("home/GetSpecialOfferList", this.specialParams)
              .then(() => {
                this.$loading(this.$store.state.loading).close();
              });
          }
        });
    },
    // 品牌跳转
    sendLink(item) {
      this.$router.push({
        path: "/BrandDetail",
        query: {
          tag: item.tag,
          documentid: item.id,
          name: item.brand
        }
      });
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 200) {
        this.$store.state.headerFxed = true;
      } else {
        this.$store.state.headerFxed = false;
      }
    }
  },
  mounted() {
    this.$store.state.headerFxed = false;
    // 滚动监听
    window.addEventListener("scroll", this.handleScroll);
    this.$store.dispatch("home/GetSpecialOfferList", this.specialParams);
    // 获取热搜
    this.$store.dispatch("home/GetHotSearch").then(res => {
      this.brandTotal = res.brandTotal;
      this.catergoryTotal = res.catergoryTotal;
      this.productTotal = res.productTotal;
    });
    // 获取品牌列表
    this.$store.dispatch("home/GetfindBrandList",{
        type:'',
        name:'',
        start:0,
        length:1000
    });
    if (sessionStorage.getItem("access_token")) {
      this.setloginState(true)
      //this.$store.state.loginState = true;
      this.$store.dispatch("Login/GetUserInforma", {
        access_token: sessionStorage.getItem("access_token")
      });
    }
  },
  destroyed() {
    this.$store.state.headerFxed = true;
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang="less" scoped src="./home.less"></style>
<style lang="less">
.settledIn{
  .ImgE{
    img {
        width: 100%;
        min-height:100%;
        // height: 75px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
  }
}

</style>


