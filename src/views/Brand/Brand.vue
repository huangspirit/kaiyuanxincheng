<template>
  <div class="brand" id="brand">
    <!-- banner -->
    <div class="banner">
      <img src="@/assets/image/brand/u3555.jpg" alt class="bg" />
      <div class="text">
        <p>1800+知名品牌的选择</p>
        <ul>
          <li>
            <img src="@/assets/image/brand/u3561.png" alt />
            <span>可靠</span>
          </li>
          <li>
            <img src="@/assets/image/brand/u3563.png" alt />
            <span>可信</span>
          </li>
          <li>
            <img src="@/assets/image/brand/u3565.png" alt />
            <span>安全</span>
          </li>
        </ul>
      </div>
      <div class="mask"></div>
    </div>
    <!-- 最新入驻 -->
    <div class="new-settledin">
      <span>最新入驻</span>
      <div v-if="imgList.length>0" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in imgList" :key="index">
            <img :src="item.imgurl" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- 全部品牌 -->
    <div class="all-brands">
      <p class="tit">全部品牌</p>
      <div class="china-settledin">
        <span class="settledin">我是原厂，现在入驻</span>
        <div class="china-xin">
          <img src="@/assets/image/brand/u3748.png" alt />
          <span>中国芯</span>
        </div>
      </div>
      <!-- 品牌列表 -->
      <ul class="list" id="topList">
        <li
          v-for="(item,index) in findBrandListKey"
          :key="index"
          :class="{active:listKey == item}"
          @click="send(item)"
        >{{item}}</li>
      </ul>
      <div class="brand-content">
        <p v-if="!findBrandList">暂无数据</p>
        <ul v-if="findBrandList" v-for="(item,index) in findBrandListKey" :key="index">
          <h3 :id="item">{{item}}</h3>
          <li v-for="(subitem,k) in findBrandList[item]" :key="k">{{subitem.brand}}</li>
        </ul>
      </div>
    </div>
    <div class="siderList" :class="siderListShow?'siderActive':''">
      <ul>
        <li
          v-for="(item,index) in findBrandListKey"
          :key="index"
          :class="{active:listKey == item}"
          @click="send(item)"
        >{{item}}</li>
      </ul>
      <li @click="toTop">顶部</li>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./Brand.less";
</style>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Swiper from "swiper";
import { axios, home } from "@/api/apiObj";
import "../../../node_modules/swiper/dist/css/swiper.css";
export default {
  name: "Brand",
  data() {
    return {
      listKey: "",
      findBrandList: [],
      findBrandListKey: [],
      imgList: [],
      siderListShow: false
    };
  },
  computed: {},
  mounted() {
    this.getBrandList();
    window.addEventListener("scroll", this.handleScroll);
    this.swriper();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      // // 设备/屏幕高度
      let scrollObj = document.getElementById("topList"); // 滚动区域
      let scrollHeight = scrollObj.offsetTop; // 滚动条的总高度
      // 侧边栏是否显示
      if (scrollTop > scrollHeight) {
        this.siderListShow = true;
      } else {
        this.siderListShow = false;
      }
    },
    toTop() {
      document.documentElement.scrollTop = 0;
    },
    getBrandList() {
      axios
        .request({
          ...home.queryBrandHomePage,
          params: {}
        })
        .then(res => {
          console.log(res);
          if (res.resultCode == "200") {
            this.findBrandList = res.data;
            this.findBrandListKey = Object.keys(this.findBrandList);
            this.listKey = this.findBrandListKey[0];
            this.imgList = [];
            this.imgList = this.findBrandList[this.listKey];
            this.swriper();
          }
        });
    },
    send(val) {
      this.imgList = [];
      this.imgList = this.findBrandList[val];
      console.log(this.imgList);
      this.swriper();
      this.listKey = val;
      var _id = document.getElementById(val);
      window.scrollTo(0, _id.offsetTop - 65);
    },
    swriper() {
      var mySwiper = new Swiper(".swiper-container", {
        speed: 3000,
        autoplay: true,
        slidesPerView: 6,
        spaceBetween: 0,
        loop: true
      });
    }
  }
};
</script>
