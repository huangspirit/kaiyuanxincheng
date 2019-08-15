<template>
  <div :class="{header:true,headerFxed:headerFxed}" @click="noSearch()">
    <div class="header-c">
      <router-link to="/" tag="div" class="logo">
       <h1 class="logoText">芯手网</h1>
        <img src="@/assets/logo.png" alt>
      </router-link>
      <div class="searchInputWrap">
          <HeaderSearch v-if="headerFxed" ref="HeaderSearch" :mini="true"></HeaderSearch>
      </div>
      <div class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/Brand">品牌</router-link>
        <router-link to="/InquiryBasket">询价篮</router-link>
        <router-link to="/ShoppingCart">购物车</router-link>
          <router-link to="/News" v-if="loginState" class="messageCountWrap">消息 <span v-if="UserInforma.messageCount" class="messageCount">{{UserInforma.messageCount}}</span></router-link>

      </div>
      <router-link class="login" tag="div" to="/Login" v-if="!loginState">
        <span>快速登录</span>
        <img src="@/assets/image/home/u1874.png" alt>
      </router-link>
      <div class="person-center" @click="PersonalCenter" v-else>
        个人中心
        <img :src="UserInforma.headImgUrl" alt>
          <div class="PersonalCenter-con" v-if="UserInforma.userTagMap">
              <p class="personInfo">
                  <span class="tel fr">{{UserInforma.phone}}</span>
                  <span class="name">{{UserInforma.nickname}}</span>
              </p>
              <div v-if="UserInforma.userTagMap.tag" class="clear identity">
                  <div>
                      <span class="type type1" v-if="UserInforma.userTagMap.tag === 1">原厂</span>
                      <span class="type type2" v-if="UserInforma.userTagMap.tag === 2">代理商</span>
                      <span class="type type3" v-if="UserInforma.userTagMap.tag === 3">普通商户</span>
                  </div>

                  <!-- <template  v-if="UserInforma.userTagMap.vip">
                    <div class="num">
                    白条额度
                    <span>
                      ￥{{UserInforma.userTagMap['credit-vip']}}
                      </span>
                  </div>
                  <div class="num">
                    剩余额度
                    <span>￥{{UserInforma.userTagMap['restcredit-vip']}}</span>
                  </div>
                  </template>
                  <template  v-if="UserInforma.userTagMap.seller">
                    <div class="num">
                    售卖额度
                    <span>
                      ￥{{UserInforma.userTagMap['credit-seller']}}
                      </span>
                  </div>
                  <div class="num">
                    剩余额度
                    <span>￥{{UserInforma.userTagMap['restcredit-seller']}}</span>
                  </div>
                  </template> -->

              </div>
              <!-- <ul>
                <router-link
                  v-for="item in list"
                  :to="item.router"
                  :key="`${item.name}`"
                  tag="li"
                >{{item.name}}</router-link>
              </ul>-->
              <p class="account-number">
                  <router-link to="/PersonalCenter/PersonalData" tag="span">
                      <img src="@/assets/image/Login/u2031.png" alt>
                      账号设置
                  </router-link>
                  <span class="bar">|</span>
                  <span class="logout" @click="signOut">
            <img src="@/assets/image/Login/u2025.png" alt>
            退出账号
          </span>
              </p>
          </div>
      </div>

    </div>
  </div>
</template>
<script>

import { mapState ,mapMutations} from "vuex";
export default {
  data() {
    return {
     // flag: false,
      list: [
        {
          router: "/InquiryBasket",
          name: "我的询价单"
        },
        {
          router: "/ShoppingCart",
          name: "购物车"
        },
        {
          router: "/PersonalCenter/BuyerOrderManagement",
          name: "我的订单"
        },
        {
          router: "/PersonalCenter/CommoditiesInterest",
          name: "关注的商品"
        },
        {
          router: "/PersonalCenter/MerchantsConcerned",
          name: "关注的商家"
        },
        {
          router: "/PersonalCenter/PersonalSet",
          name: "个人中心"
        }
        // {
        //   router: "/PersonalCenter/PersonalSet",
        //   name: "帮助中心"
        // },
        // {
        //   router: "/PersonalCenter/PersonalSet",
        //   name: "成为商家"
        // },
        // {
        //   router: "/PersonalCenter/PersonalSet",
        //   name: "品牌入驻"
        // }
      ]
    };
  },
  computed: {
    ...mapState({
      loginState: state => state.loginState,
      headerFxed: state => state.headerFxed,
      UserInforma:state => state.Login.UserInforma
    })
  },
  methods: {
    ...mapMutations([
      "setloginState"
    ]),
    // onMouseenter() {
    //   this.flag = true;
    // },
    // onMouseleave() {
    //   this.flag = false;
    // },
    // 跳到个人中中心
    PersonalCenter() {
      this.$router.push({
        path: "/PersonalCenter/SellerCenter"
      });
    },
    // 退出登录
    signOut() {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      this.$router.push({
        path: "/"
      });
      this.flag = false;
      // 更改导航栏是否为登录的状态
     // this.$store.state.loginState = false;
     this.setloginState(false)
     // this.$store.dispatch("setloginState",false)
    },
    noSearch() {
      if (this.headerFxed) {
        this.$refs.HeaderSearch.noSearch();
      }
    }
  },
  mounted() {
    //console.log(this.$store.state)
    //console.log("UserInforma:",this.UserInforma)
  }
};
</script>
<style lang="less" >
  @import "./headTop.less";
</style>


