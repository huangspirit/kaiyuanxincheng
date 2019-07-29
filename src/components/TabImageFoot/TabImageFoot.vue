<template>
  <!-- 底部图片轮播切换 -->
  <div class="TabImageFoot">
    <div class="TabImageFoot-title">
      <span class="name">
        <slot></slot>
      </span>
      <p class="tab">
        <span
          :class="{active: k === hoverIndx}"
          v-for="(item, k) in 3"
          :key="`item_${k}`"
          @mouseenter="hover(k)"
        >{{k+1}}</span>
      </p>
    </div>
    <ul class="TabImageFoot-list">
      <li
        v-for="(item, k) in 3"
        :key="`item_${k}`"
        v-if="k === hoverIndx"
        :class="{ blockStyle: k === hoverIndx}"
      >
        <router-link
          to="/BrandDetail/GoodsDetails"
          v-for="item in num"
          :key="`item_${item}`"
          tag="div"
        >
          <img src="@/assets/image/PersonalCenter/_u24718.png" alt class="prod-img">
          <p class="num">CDHDFJHKS-234J</p>
          <p>厚膜电阻</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import "./TabImageFoot.less";
export default {
  name: "TabImageFoot",
  props: {
    num: {
      type: Number,
      default: 5
    }
  },
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
