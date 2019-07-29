<template>
  <div class="brand" id="brand">
    <!-- banner -->
    <div class="banner">
      <img src="@/assets/image/brand/u3555.jpg" alt class="bg">
      <div class="text">
        <p>1800+知名品牌的选择</p>
        <ul>
          <li>
            <img src="@/assets/image/brand/u3561.png" alt>
            <span>可靠</span>
          </li>
          <li>
            <img src="@/assets/image/brand/u3563.png" alt>
            <span>可信</span>
          </li>
          <li>
            <img src="@/assets/image/brand/u3565.png" alt>
            <span>安全</span>
          </li>
        </ul>
      </div>
      <div class="mask"></div>
    </div>
    <!-- 最新入驻 -->
    <div class="new-settledin">
      <span>最新入驻</span>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in 14" :key="`${item}`">
            <img src="@/assets/image/brand/logo1_u3569_mouseOver.png" alt>
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
          <img src="@/assets/image/brand/u3748.png" alt>
          <span>中国芯</span>
        </div>
      </div>
      <!-- 品牌列表 -->
      <ul class="list">
        <li
          v-for="item in list"
          :key="`list_${item}`"
          :class="{active:indx == item}"
          @click="send(item)"
        >{{item}}</li>
      </ul>
      <div class="brand-content">
        <p v-if="!findBrandList.length">暂无数据</p>
        <ul v-if="findBrandList.length">
          <li v-for="item in findBrandList" :key="`findBrandList_${item.uid}`" :title="item.brand">{{item.brand}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./Brand.less";
</style>

<script>

import { mapState, mapGetters, mapActions } from "vuex";
import Swiper from "swiper";
import "../../../node_modules/swiper/dist/css/swiper.css";
export default {
  name: "Brand",
  data() {
    return {
      indx: "A",
      list: [
        "#",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  computed: {
    ...mapState({
      findBrandList: state => state.home.findBrandList
    })
  },
  mounted() {
    this.send(this.indx);
    var mySwiper = new Swiper(".swiper-container", {
      autoplay:true,
      slidesPerView: 6,
      spaceBetween: 0,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
    });
  },
  methods: {
    send(x) {
     
      this.indx = x;
      this.$store.dispatch("home/GetfindBrandList", {
        type: x
      });
    }
  }
};
</script>
