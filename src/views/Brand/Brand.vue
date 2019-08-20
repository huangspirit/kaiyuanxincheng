<template>
  <div class="brand" id="brand">
    <!-- banner -->
    <div class="banner">
      <img src="@/assets/image/brand/bg.jpg" alt class="bg" @click="joinOriginFactory"/>
    </div>
    <!-- 最新入驻 -->
    <div class="prodclass-r allWidth">
      <div class="title">最新入驻</div>
      <div class="slideWrap" @mouseenter="handleEnter" @mouseleave="handleLeave">
        <ul :class="{anim:animate==true}">
          <li v-for="(item,k) in imgList" :key="k">
            <ImgE :src="item.imgurl" :W="300" :H="100"></ImgE>
          </li>
        </ul>
      </div>
    </div>
    <!-- 全部品牌 -->
    <div class="all-brands allWidth">
      <p class="tit">全部品牌</p>
      <!-- 品牌列表 -->
      <ul class="list" id="topList">
          <li>中国芯</li>
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
            <router-link
                tag="li"
                v-for="(subitem,k) in findBrandList[item]"
                :key="k"
                :to="{
                path:'/BrandDetail',
                query:{
                tag:'brand',
                documentid:subitem.id,
                name:subitem.brand
                }
                }"
            >
                {{subitem.brand}}
            </router-link>
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
// import { mapState, mapGetters, mapActions } from "vuex";
// import Swiper from "swiper";
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
      animate: false,
      siderListShow: false
    };
  },
  computed: {
  },
  mounted() {
    this.getBrandList();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
      joinOriginFactory(){
          //入驻原厂
          let UserInforma=sessionStorage.getItem("UserInforma")
          if(UserInforma){
              UserInforma=JSON.parse(UserInforma)
              if(UserInforma.userTagMap.seller){
                  this.$message.success("您已入驻！")
              }else{
                  this.$router.push("/OriginalFactoryEntry")
              }
          }else{
              this.$router.push("/Login")
          }
      },
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
          }
        });
    },
    send(val) {
      this.imgList = [];
      this.imgList = this.findBrandList[val];
      this.listKey = val;
      var _id = document.getElementById(val);
      window.scrollTo(0, _id.offsetTop - 65);
    },
    handleEnter() {
      clearInterval(this.interval);
    },
    handleLeave() {
      this.interval = setInterval(this.scroll, 5000);
    },
    scroll() {
      console.log("gundong");
      if (this.imgList.length > 6) {
        this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(() => {
          //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.imgList.push(this.imgList[0]); // 将数组的第一个元素添加到数组的
          this.imgList.shift(); //删除数组的第一个元素
          this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        }, 500);
      }
    }
  }
};
</script>
