<template>
  <div class="cont" :class="isPersonalCenter?'percenter':''">
    <router-link to="/PersonalCenter/Message" class="messageCountWrap" tag="div">
      <span></span>
      <p>消息</p>
      <div v-if="UserInforma.messageCount" class="mess">{{UserInforma.messageCount}}</div>
    </router-link>
    <router-link to="/PersonalCenter" class="personal" tag="div">
      <span></span>
      <p>用户<br>中心</p>
    </router-link>
    <router-link
      to="/OriginalFactoryEntry"
      class="join"
      tag="div"
      v-if="!UserInforma.userTagMap || (UserInforma.userTagMap && !UserInforma.userTagMap.seller)"
    >
      <span></span>
      <p>商家入驻</p>
    </router-link>
    <router-link to="/InquiryBasket" class="busket" tag="div">
      <span></span>
      <p>询价篮</p>
        <div v-if="UserInforma.shoppingCarMap && UserInforma.shoppingCarMap[2]" class="mess">{{UserInforma.shoppingCarMap[2]}}</div>
    </router-link>
    <router-link to="/ShoppingCart" class="shoppingCar" tag="div">
      <span></span>
      <p>购物车</p>
        <div v-if="UserInforma.shoppingCarMap && UserInforma.shoppingCarMap[1]" class="mess">{{UserInforma.shoppingCarMap[1]}}</div>
    </router-link>
    <div class="feedback" @click="showModal=true">
      <span></span>
      <p>反馈</p>
    </div>
    <div class="miniparams" @click="feedBack">
      <span></span>
      <p>小程序</p>
      <div class="img">
        <img src="@/assets/image/footer/u1697.png" alt="">
      </div>
    </div>
    <feed-back v-if="showModal" :showfeedback="showModal" @submitSuc="showModal=false"></feed-back>

  </div>
</template>
<script>
import feedBack from "_c/feedback"
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      showModal: false,
      isPersonalCenter:false
    };
  },
  watch:{
    "$route":'fetchDate'

  },
  created(){
    this.fetchDate()
  },
  mounted() {},
  components:{
    feedBack
  },
  computed: {
    ...mapState({
      UserInforma: state => state.Login.UserInforma
    })
  },
  methods: {
    fetchDate(){
 
      if(this.$route.path.indexOf("PersonalCenter")!=-1){
//标识进入了个人中心
          this.isPersonalCenter=true;
      }else{
        this.isPersonalCenter=false
      }
    },
    feedBack() {
      this.showModal = true;
    }
  }
};
</script>
<style lang="less" scoped>
.cont {
  position: fixed;
  right: 0;
  top: 20vh;
  z-index: 9;
  color: #fff;
  background: #5c5f63;
  border: 1px solid #fff;
  border-right: none;
  &.percenter{
     &:hover {
        & > div {
          width:70px;
          transition: all 0.3s;
          p{
            display:block;
          }
        }
      }
    &>div{
      width:25px;
      display:flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      p {
        display: none;
    }
    }
  }
 
  & > div {
    color: #fff;
    font-size: 12px;
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 8px 0;
    border-top: 1px solid #fff;
    cursor: pointer;
    height: 70px;
    width:60px;
    box-sizing: border-box;
    transition: all 0.3s;
    
    span {
      width: 25px;
      padding-top: 20px;
      margin-right: 2px;
      margin-bottom: 5px;
      opacity: 1;
    }
    &.miniparams {
      .img {
       height:150px;
       width:150px;
        position: absolute;
        right: 103%;
        bottom:-2px;
        z-index:-1;
        text-align: center;
        line-height: 150px;
        display: none;
        border:1px solid #5c5f63;
        background:#fff;
        img{
          width:130px;
          height:130px;
        }
      }
      &:hover {
        .img {
          display: block;
        }
      }
      span {
        background: url("../../assets/image/side/miniparams.png") center center
          no-repeat;
        background-size: 22px auto;
      }
    }
    &.busket {
      span {
        background: url("../../assets/image/side/inquery.png") center center
          no-repeat;
        background-size: 22px auto;
      }
    }
    &.shoppingCar {
      span {
        background: url("../../assets/image/side/shoppingCar.png") center center
          no-repeat;
        background-size: 35px auto;
      }
    }
    &.messageCountWrap {
      span {
        background: url("../../assets/image/side/message.png") center center
          no-repeat;
        background-size: 35px auto;
      }
    }
    &.feedback {
      span {
        background: url("../../assets/image/side/feedback.png") center center
          no-repeat;
        background-size: 35px auto;
      }
    }
    &.join {
      span {
        background: url("../../assets/image/side/join.png") center center
          no-repeat;
        background-size: 35px auto;
      }
    }
    &.personal {
      span {
        background: url("../../assets/image/side/personal.png") center center
          no-repeat;
        background-size: 35px auto;
      }
    }
    &:hover {
       background:#df3f2f;
      p {
        opacity: 1;
        transition: all 1.5s;
      }
      span {
        opacity: 1;
        transition: all 1s;
      }
    }
    &.router-link-exact-active {
      background: #df3f2f;
      color: #fff !important;
      .mess {
        background: #5c5f63;
      }
      // &.busket{
      //   span{
      //     background:url("../../assets/image/icon/busketActive.png") center center no-repeat;

      //    background-size:17px auto ;
      //   }
      // }
      // &.shoppingCar{
      //   span{
      //     background:url("../../assets/image/icon/shoppingCarActive.png") center center no-repeat;

      //    background-size:17px auto ;
      //   }
      // }
      // &.messageCountWrap{
      //   span{
      //     background:url("../../assets/image/icon/messageActive.png") center center no-repeat;

      //    background-size:15px auto ;
      //   }
      // }
      // &.feedback{
      //   span{
      //     background:url("../../assets/image/icon/feedbackActive.png") center center no-repeat;

      //    background-size:15px auto ;
      //   }
      // }
    }
    .mess {
      position: absolute;
      right: 0px;
      top: 0px;
      background: #f22e2e;
      color: #fff;
      padding: 2px 5px;
      line-height: 1.2;
      border-radius: 20px;
      font-size: 12px;
      min-width: 20px;
      box-sizing: border-box;
      text-align: center;
      
    }
  }
}
</style>