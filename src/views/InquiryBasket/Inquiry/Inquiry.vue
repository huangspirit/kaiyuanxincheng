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
          <span @click="tabShow = true" :class="tabShow? 'active':''">待询价</span>
          <span @click="tabShow = false" :class="!tabShow? 'active':''">已询价</span>
        </li>
        <li class="search">
          <img src="@/assets/image/inquirybasket/u26.png" alt="">
          <el-input placeholder="搜索询价蓝" v-model="seachText"></el-input>
        </li>
      </div>
      <WaitInquiry v-if="tabShow == true" />
      <AleadyInquiry v-if="tabShow == false" />
    </div>
  </div>
</template>

<script>
import WaitInquiry from "../waitInquiry/waitInquiry";
import AleadyInquiry from "../AlreadyInquiry";
import "./WaitInquiry.less"
export default {
  name: "Inquiry",
  data() {
    return {
      isAllCheck: false,
      value: "1",
      seachText: "",
      tabShow: true
    };
  },
  components: {
    WaitInquiry,
    AleadyInquiry
  },
  methods: {
    change() {}
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
    padding: 62px 42px;
    .inquiryTab {
      display: flex;
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
        >img {
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
