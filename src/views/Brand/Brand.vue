<template>
  <div class="brand" id="brand">
    <!-- banner -->
    <div class="banner" @click="joinOriginFactory">
        <div class="wrap allWidth">
            <img src="@/assets/image/brand/cover.png" alt class="bg" />
        </div>
    </div>
    <!-- 最新入驻 -->
    <div class="prodclass-r allWidth">
      <div class="title">最新入驻</div>
      <div class="slideWrap" >
        <ul :class="{anim:animate==true}" class="clear" @mouseenter="handleEnter" @mouseleave="handleLeave">
            <router-link  v-for="(item) in imgList"  :key="item.id" tag="li" :to="{
            path:'/BrandDetail',
            query:{
            tag:'brand',
            documentid:item.id,
            name:item.brand
            }
            }">
                <ImgE :src="item.imgurl" :W="200" :H="75" ></ImgE>
            </router-link>
        </ul>
      </div>
    </div>
    <!-- 全部品牌 -->
    <div class="allWidth">
        <div class="all-brands">
      <!-- <p class="tit">全部品牌</p> -->
      <!-- 品牌列表 -->
      <ul class="list" id="topList">
          <li>中国芯</li>
        <li
          v-for="(item,index) in findBrandListKey"
          :key="index"
          class="item"
          :class="{active:listKey == item}"
          @click="send(item)"
        >{{item}}</li>
      </ul>
      <div class="brand-content">
        <p v-if="!findBrandList">暂无数据</p>
        <ul v-else v-for="(item,index) in findBrandListKey" :key="index">
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
               <img :src="mark" alt="" v-if="subitem.hasFactorySeller" class="mark" title="原厂已入驻" />{{subitem.brand}}
            </router-link>
        </ul>
      </div>
    </div>
    </div>
      <div class="leftSlide" :style="'height:'+screenHeight+'px'" :class="siderListShow?'siderActive':''">
          <div class="siderList bgGray">
              <ul>
                  <li
                      v-for="(item,index) in findBrandListKey"
                      :key="index"
                      :class="{active:listKey == item}"
                      @click="send(item)"
                  ><span>{{item}}</span></li>
              </ul>
              <p @click="toTop" class="toTop bgGray"><i class="el-icon-upload2"></i></p>
          </div>
      </div>
  </div>
</template>
<style lang="less" scoped>
@import "./Brand.less";
</style>

<script>
import {mapMutations} from "vuex";
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
      siderListShow: false,
        screenHeight:1000,
        mark:require("../../assets/image/icon/zhu1.png")
    };
  },
  computed: {
  },
  mounted() {
    this.$loading(this.$store.state.loading);
    this.getBrandList();
    window.addEventListener("scroll", this.handleScroll);
    this.screenHeight=window.screen.height-80
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
      clearInterval(this.interval)
  },
  methods: {
    ...mapMutations(['setshowlogin']),
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
              //this.$router.push("/Login")
              this.setshowlogin(true)
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
        this.$loading(this.$store.state.loading).close();
          if (res.resultCode == "200") {
            this.findBrandList = res.data.result1;
            this.findBrandListKey = Object.keys(this.findBrandList);
            this.listKey = this.findBrandListKey[0];
           // this.imgList = this.findBrandList[this.listKey]
             this.imgList = res.data.brandPicture[true]
              if(this.imgList.length>5){
                  this.animate = true;
                  this.interval = setInterval(this.scroll, 5000);
              }else{
                  clearInterval(this.interval)
              }
          }
        });
    },
    send(val) {
      this.imgList = this.findBrandList[val];
      this.listKey = val;
      var _id = document.getElementById(val);
      window.scrollTo(0, _id.offsetTop - 65);
        if(this.imgList.length>5){
            this.animate = true;
            this.interval = setInterval(this.scroll, 5000);
        }else{
            clearInterval(this.interval)
        }
    },
    handleEnter() {
        this.animate = false
      clearInterval(this.interval);
    },
    handleLeave() {
          if(this.imgList.length>5){
              this.animate = true;
              this.interval = setInterval(this.scroll,5000);
          }
    },
    scroll() {
        this.animate = false; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        let obj=this.imgList[0]
        this.imgList.shift(); //删除数组的第一个元素
        this.imgList.push(obj); // 将数组的第一个元素添加到数组的
        setTimeout(() => {
          //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
            this.animate = true; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        },0);
      }
  }
};
</script>
