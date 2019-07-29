<template>
  <div class="MerchantsConcernedImgTab">
    <!-- 关注商家产品列表 -->
    <div class="product-list">

      <ul class="product-list-con">
        <li
          v-for='(item, k) in 3'
          :key='`item_${k}`'
          v-if='k === hoverIndx'
          :class="{ blockStyle: k === hoverIndx}"
        >
          <div v-for="item in 3" :key="`item_${item}`">
            <p class="num price">￥3.5{{k}}</p>
            <img src="@/assets/image/PersonalCenter/_u24718.png" alt class="prod-img">
            <p class="num">CDHDFJHKS-234J</p>
            <p>DIP 盒子 1/8</p>
            <ButtonIcon :width="140" :height="36">
              <img src="@/assets/image/PersonalCenter/u6221.png" alt>
              立即采购
            </ButtonIcon>
          </div>
        </li>
      </ul>
        <p class="product-list-tab">
        <span
            :class="{active: k === hoverIndx}"
            v-for="(item, k) in 3"
            :key="`item_${k}`"
            @mouseenter="hover(k)"
        >{{k+1}}</span>
        </p>
    </div>
  </div>
</template>

<script>
import "./MerchantsConcernedImgTab.less";
export default {
  name: "MerchantsConcernedImgTab",
  data() {
    return {
      hoverIndx: 1
    };
  },
  methods: {
    hover(k) {
      this.hoverIndx = k;
    }
  }
};
</script>

<style>
</style>
