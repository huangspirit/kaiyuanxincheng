<template>
  <div class="WaitInquiry">
    <div class="tit">
      <span>
        <img src="@/assets/image/inquirybasket/u11940.png" alt>
        询价篮
      </span>
      <span class="more">
        <img src="@/assets/image/inquirybasket/u11991.png" alt>
        更多申请特价技巧
      </span>
    </div>
    <div class="tit-bg">
      <span>不折腾.也能找到低价产品</span>
      <img src="@/assets/image/inquirybasket/u11998.jpg" alt>
    </div>
    <!-- 搜索内容部分 -->
    <div class="inquiry-basket-con">
      <div class="search">
        <div class="inquiry">
          <router-link to="/InquiryBasket/WaitInquiry" tag="span" class="inquiry-n">
            <img src="@/assets/image/inquirybasket/u12008.png" alt>待询价
          </router-link>
          <span>|</span>
          <router-link to="/InquiryBasket/AlreadyInquiry" tag="span" class="inquiry-y">
            <img src="@/assets/image/inquirybasket/u12013.png" alt>已询价
          </router-link>
        </div>
        <SearchInput :placeholder="'搜索询价篮'" v-model="value" @input="change" :height="34" :width="400" :btnWidth="34" :btnImgWidth="20" :fontSize="16"></SearchInput>
      </div>
      <!-- 批量申请 -->
      <div class="batch-application">
        <div class="batch-all">
           <div class="total">
            <span class="delet">
              <img src="@/assets/image/inquirybasket/u11448.png" alt>
            </span>
            <span class="all-apply">
              <img src="@/assets/image/inquirybasket/u4504.png" alt>
              <span>批量申请</span>
            </span>
            <span class="total-num">
              <span>总计已选</span>
              <span class="num">0</span>
              <span>件商品</span>
            </span>
          </div>
          <div class="all-election">
            <span class="all-box" @click="isAllCheck=!isAllCheck">
              <img src="@/assets/image/inquirybasket/对号_u11390.png" alt v-show="isAllCheck">
            </span>
            <span>全选</span>
          </div>
        </div>
        <!-- 申请列表 -->
        <div class="apply-list">
          <div class="apply-item">
            <!-- 全选 -->
            <div class="batch-all">
              <span class="all-election">
                <span class="all-box">
                  <img src="@/assets/image/inquirybasket/对号_u11390.png" alt>
                </span>
                <div class="name">
                  <img src="@/assets/image/inquirybasket/u12093.png" alt>
                  <span>罗彻斯特电子（RE）</span>
                </div>
              </span>
              <div class="total">
                <span class="delet">
                  <img src="@/assets/image/inquirybasket/u11448.png" alt>
                </span>
                <span class="all-apply">
                  <img src="@/assets/image/inquirybasket/u4504.png" alt>
                  <span>申请特价</span>
                </span>
                <span class="total-num">
                  <span>总计已选</span>
                  <span class="num">0</span>
                  <span>件商品</span>
                </span>
              </div>
            </div>
            <ul class="apply-item-list">
              <li>
                <div class="box">
                  <span>
                    <img src="@/assets/image/inquirybasket/对号_u11390.png" alt>
                  </span>
                </div>
                <div class="content">
                  <TabImage class="content-l"></TabImage>
                  <div class="content-m">
                    <p>
                      <span class="name">CDHDFJHKS-234J</span>
                      <span class="follow">-已关注</span>
                    </p>
                    <p>
                      <span>品牌：</span>罗彻斯特电子
                    </p>
                    <p>
                      <span>基本参数：</span>DIP 盒子 1/8W 100-15Ω
                    </p>
                    <p>
                      <span>型号描述：</span>The 7721-7PPSG is an Insulating Shoulder Washer made of 40% glass filled polyphenylene sulfide (PPS) body. Its recommended .
                    </p>
                    <p>
                      <span>共有</span>
                      <span class="num-r">3</span>
                      <span>个供应商报价</span>
                      <span class="num-r">￥2.5</span>
                      ——
                      <span class="num-r">￥2.5</span>
                    </p>
                  </div>
                  <!-- 原厂报价 -->
                  <div class="quote">
                    <LadderPrice>原厂报价</LadderPrice>
                  </div>
                  <div class="content-r">
                    <span>
                      <img src="@/assets/image/inquirybasket/u4504.png" alt>
                      申请特价
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "WaitInquiry",
  data() {
    return {
      isAllCheck:false,
      value: "1"
    };
  },
  methods: {
    change() {

    }
  }
};
</script>
<style lang="less" scoped src="./WaitInquiry.less"></style>
