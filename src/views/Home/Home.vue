<template>
  <div class="home">
    <!-- banner -->
    <img src alt class="bannerbg" />
    <img src alt class="bannerbg" />
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
            <img src alt />
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
      <p class="small">数百家厂商的选择，{{title}}值得您信赖</p>
      <ul class="clear">
        <template v-for="(item,index) in BrandList">
          <li
            :key="`BrandList_${item.id}`"
            @click="sendLink(item)"
            :class="(index+1)%5==0?'rightCoverFlag':'leftCoverFlag'"
            @mouseleave="item.show=false"
            @mouseenter="item.show=true"
          >
            <!-- <img :src="item.imgurl" alt=""> -->
            <div class="wrap">
              <ImgE :src="item.imgurl" :W="300" :H="150"></ImgE>
              <transition name="el-zoom-in-left">
                <div class="coverFlag clear" v-show="item.show">
                  <p class="brandName fl">{{item.branda}}</p>
                  <p class="brandDesc fl">{{item.brand_desc}}</p>
                </div>
              </transition>
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
        <span>{{brandTotal}}</span> 个企业正在用{{title}}搜特价
        <span></span>
      </p>
      <p class="small">数百家厂商的选择，{{title}}值得您信赖</p>
      <ul>
        <li></li>
      </ul>
    </div>

    <!-- 产品分类 -->
    <div class="prodclass">
      <div class="prodclass-con clear">
        <div class="prodclass-l">
          <p>产品分类</p>
          <ul>
            <li
              v-for="(item,k) in CatergoryList"
              :class="selected==k?'active':''"
              @click="selected=k"
              :key="k"
            >
              <span class="fr el-icon-arrow-right"></span>
              <ImgE :src="item.imgUrl" :W="30" :H="30" class="fl"></ImgE>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="prodclass-m">
          <div class="fl wrap">
            <a v-for="(item,k ) in secondCategory" @click="chipUndirect(k)" :key="k">{{item.name}}</a>
          </div>
        </div>
        <div class="prodclass-r">
          <p>入驻厂商</p>
          <div class="slideWrap" @mouseenter="handleEnter" @mouseleave="handleLeave">
            <ul :class="{anim:animate==true}">
              <li v-for="(item,k) in catergoryBrandList" :key="item.id" @click="chipBrand(k)">
                <ImgE :src="item.imgurl" :W="300" :H="100"></ImgE>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import "./home.less";
import HeaderSearch from "_c/HeaderSearch";
import { SearchData } from "@/api/home";
import { SearchJump } from "@/lib/utils";
import SpecialOfferItem from "_c/SpecialOfferItem";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import countTo from "_c/countTo";
import { axios, home } from "../../api/apiObj";

export default {
  name: "home",
  data() {
    return {
      interval: null,
      animate: false,
      //分类
      CatergoryList: [],
      catergoryBrandList: [],
      selected: 0,
      secondCategory: [],
      //品牌
      BrandList: [],
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
      title:state => state.title
      // findBrandList: state => state.home.findBrandList,
      // BrandListTotal: state => state.home.BrandListTotal
    })
  },
  watch: {
    selected(k) {
      this.catergoryBrandList = this.CatergoryList[k].list;
      this.querySecondCatergory(k);
    }
  },
  methods: {
    ...mapMutations(["setloginState"]),
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
    // 大搜索跳转
    searchLink(item) {
      this.searchValue = item.name;
      this.$router.push({
        path: SearchJump(item.tag),
        query: item
      });
    },
    // noSearch() {
    //   this.$refs.HeaderSearch.noSearch();
    // },
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
    //获取品牌
    findBrandList() {
      axios
        .request({
          ...home.findBrandList,
          params: { start: 0, length: 20, type: "", name: "" }
        })
        .then(res => {
          console.log(res);
          this.BrandList = res.data.data.map(item => {
            item.show = false;
            return item;
          });
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
    //获取分类
    queryCatergoryHomePage(catergory_id) {
      let obj = {
        catergory_id: catergory_id,
        flag: true
      };
      axios
        .request({ ...home.queryCatergoryHomePage, params: obj })
        .then(res => {
          console.log(res);
          this.CatergoryList = res.data;
          this.catergoryBrandList = res.data[0].list;
          this.interval = setInterval(this.scroll, 5000);
          this.querySecondCatergory(0);
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
          console.log(res);
          this.secondCategory = res.data;
        });
    },
    //二级分类跳转
    chipUndirect(k) {
      let obj = this.secondCategory[k];
      //  /BrandDetail/Direct?tag=direct&documentid=7&name=FPGA
      this.$router.push({
        path: "/BrandDetail/Direct",
        query: {
          tag: "direct",
          documentid: obj.id,
          name: obj.name
        }
      });
    },
    //厂商跳转
    chipBrand(k) {
      let obj = this.catergoryBrandList[k];
      console.log(obj);
      //BrandDetail?tag=brand&documentid=70&name=Xilinx%20Inc.
      this.$router.push({
        path: "/BrandDetail",
        query: {
          tag: "brand",
          documentid: obj.id,
          name: obj.brand
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
    this.findBrandList();
    //获取分类
    this.queryCatergoryHomePage(0);
  },
  destroyed() {
    console.log("銷毀首頁");
    this.$store.state.headerFxed = true;
    window.removeEventListener("scroll", this.handleScroll);
    clearInterval(this.interval);
  }
};
</script>
<style lang="less" scoped src="./home.less"></style>


