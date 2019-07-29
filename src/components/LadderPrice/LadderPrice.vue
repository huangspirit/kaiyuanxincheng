<template>
  <div class="LadderPrice">
    <p class="tit">
      <slot></slot>
    </p>
    <div class="LadderPrice-list">
      <div v-for="(item, k) in LadderPriceList" :key="`${item}_${k}`" :class="borderColor">
        <span>{{item.num}}+</span>
        <span>￥{{item.price}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import './LadderPrice.less'
export default {
  name: 'LadderPrice',
  props: {
    borderColor: {
      type: String,
      default: 'bd-t'
    }
  },
  data () {
    return {
      LadderPriceList: [
        {
          num: 1000,
          price: 3.5
        },
        {
          num: 1000,
          price: 3.5
        },
        {
          num: 1000,
          price: 3.5
        }
      ]
    }
  }
}
</script>
