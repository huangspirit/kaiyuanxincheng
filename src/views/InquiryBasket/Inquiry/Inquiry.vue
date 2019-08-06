<template>
  <div class="WaitInquiry">
    <div class="tit">
      <span>询价篮</span>
      <span class="more">更多申请特价技巧</span>
    </div>
    <!-- 搜索内容部分 -->
    <div class="waitContent">
      <div class="inquiryTab">
        <li>
          <span @click="waitInquiry" :class="tabShow? 'active':'' ">待询价</span>
          <span @click="alreadyInquiry" :class="!tabShow? 'active':''">已询价</span>
        </li>
        <li class="search">
          <img src="@/assets/image/inquirybasket/u26.png" alt />
          <el-input @keyup.enter.native="searchSheetList" placeholder="搜索询价蓝" v-model="seachText"></el-input>
        </li>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import WaitInquiry from "../WaitInquiry";
import AleadyInquiry from "../ApplySpecialPrice";
import { axios, shoppingCar } from "@/api/apiObj";
import "./Inquiry.less";
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
      console.log("111");
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
  width: 100%;
  min-width: 850px;
  max-width: 1350px;
  margin: 0 auto;
  overflow: hidden;
  background: #fff;

  > .tit {
    width: 100%;
    padding: 54px 0 28px 0;
    display: flex;
    background: #f4f4f4;
    box-sizing: border-box;
    justify-content: space-between;
    span {
      font-size: 28px;
      font-weight: 600;
      color: rgba(77, 154, 243, 1);
    }

    .more {
      font-size: 20px;
      color: rgba(153, 153, 153, 1);
    }
  }
  .waitContent {
    padding-top: 60px;
    min-height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    .inquiryTab {
      display: flex;
      padding: 0 42px;
      justify-content: space-between;
      padding-bottom: 22px;
      border-bottom: 1px solid #e8e8e8;
      > li {
        span {
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
          margin-right: 78px;
        }
        .active {
          font-size: 20px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(244, 86, 24, 1);
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
