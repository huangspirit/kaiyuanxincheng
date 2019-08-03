<template>
  <div class="MerchantsConcernedImgTab">
    <!-- 关注商家产品列表 -->
    <div class="product-list">
      <ul class="product-list-con">
        <li
          v-for='(item, k) in list.data'
          :key='k'
        >
            <p class="num price">￥3.5{{k}}</p>
            <img :src="item.goodsImageUrl" alt class="prod-img">
            <p class="num">{{item.goods_name}}</p>
            <p>{{item.goodsDesc}}</p>
            <ButtonIcon :width="140" :height="36">
              <img src="@/assets/image/PersonalCenter/u6221.png" alt>
              立即采购
            </ButtonIcon>
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
    props:{
      list:{
          type:Object,
          default:{}
      },
        total:{
          type:Number,
            default: 0
        }
    },
  data() {
    return {
      hoverIndx: 1
    };
  },
    mounted(){
      console.log(this.list)
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
