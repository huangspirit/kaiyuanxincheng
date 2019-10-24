<template>
  <div class="WaitInquiry allWidth">
    <div class="tit">
      <span class="total">询价篮</span>
<!--      <span class="more">更多申请特价技巧</span>-->
    </div>
    <!-- 搜索内容部分 -->
    <div class="waitContent">
      <!-- <ul class="inquiryTab">
        <li>
          <span @click="waitInquiry" :class="tabShow? 'bgColor':'' ">待询价</span>
          <span @click="alreadyInquiry" :class="!tabShow? 'bgColor':''">已询价</span>
        </li>
       <li class="search">
         <img src="@/assets/image/inquirybasket/u26.png" alt />
         <el-input @keyup.enter.native="searchSheetList" placeholder="搜索询价蓝" v-model="seachText"></el-input>
        </li>
      </ul> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import WaitInquiry from "../WaitInquiry";
import AleadyInquiry from "../ApplySpecialPrice";
import { axios, shoppingCar } from "@/api/apiObj";

export default {
  name: "Inquiry",
  data() {
    return {
      isAllCheck: false,
      value: "1",
      seachText: "",
      tabShow: true,
      waitMoney: ""
    };
  },
  components: {
    WaitInquiry,
    AleadyInquiry
  },
  watch: {
    $route(to, from) {
      if (to.name == "waitInquiry") {
        this.tabShow = true;
      } else {
        this.tabShow = false;
      }
    }
  },
  mounted() {
    var routeAlign = this.$route;
    if (routeAlign.name == "waitInquiry") {
        this.tabShow = true;
      } else {
        this.tabShow = false;
      }
  },
  methods: {
    change() {},
    waitInquiry() {
      this.tabShow = true;
      this.$router.push("/InquiryBasket/Inquiry/waitInquiry");
    },
    alreadyInquiry() {
      this.tabShow = false;
      this.$router.push("/InquiryBasket/Inquiry/AlreadyInquiry");
    },
    searchSheetList() {
   
      var obj = {
        start: 0,
        length: 1,
        type: true
      };
      axios
        .request({ ...shoppingCar.searchSheetList, params: obj })
        .then(res => {
          console.log(res);
          eventBus.$emit("waitMoney", "789987");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.WaitInquiry {
    background:#fff;
  > .tit {
        font-size:18px;
      color:#333;
      font-weight: bold;
      padding:25px 0;
      .total{
            font-size: 28px;
            color: #4D9AF3;
            font-weight: bolder;
            border-left: 4px solid #4D9AF3;
            padding-left: 20px;
      }
  }
  .waitContent {
    .inquiryTab {
      > li {
        background:#f5f5f5;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          line-height:60px;
          overflow: hidden;
         &>span{
             padding:0 30px;
             cursor: pointer;
             &:hover{
                 font-weight: bold;
             }
         }
      }
      .search {
        width: 360px;
        height: 38px;
        background: rgba(242, 242, 242, 1);
        border-radius: 10px;
        padding-left: 20px;
        > img {
          width: 16px;
          height: 18px;
          float: left;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
