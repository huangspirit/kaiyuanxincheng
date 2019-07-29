<template>
  <div class="News">
    <!-- 侧边栏 -->
    <div class="sideMenu">
      <ul class="menu-tab">
        <li v-for="(item, k) in MenuTabList" :key="`MenuTabList_${k}`">
          <img :src="item.imgUrl" alt>
          <span>{{item.text}}</span>
          <span class="news-num">{{item.num}}</span>
        </li>
      </ul>

    </div>
    <!-- 消息内容 -->
    <div class="news-con">
      <ul>
        <li>
          <div class="news-con-l">
            <img src="@/assets/image/News/u181.png" alt="">
            <div>
              <p>Nicky WU</p>
              <p>罗彻斯特电子(RE)</p>
              <p>销售经理</p>
            </div>
          </div>
          <div class="news-con-m">
            <span class="news-num">4</span>
            <p><span>您好，您咨询的特价产品有货。但是库存不多了，请尽快下单吧</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  name: "News",
  data() {
    return {
      MenuTabList: [
        {
          imgUrl: require("@/assets/image/News/u28023.png"),
          num: 3,
          text: "原厂沟通"
        },
        {
          imgUrl: require("@/assets/image/News/u28031.png"),
          num: 3,
          text: "系统消息"
        },
         {
          imgUrl: require("@/assets/image/News/u28037.png"),
          num: 3,
          text: "询价通知"
        },
        {
          imgUrl: require("@/assets/image/News/u28041.png"),
          num: 3,
          text: "新订单"
        },
         {
          imgUrl: require("@/assets/image/News/u28045.png"),
          num: 3,
          text: "支付状态"
        },
        {
          imgUrl: require("@/assets/image/News/u28051.png"),
          num: 3,
          text: "发货通知"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
  @import "./News.less";
</style>


