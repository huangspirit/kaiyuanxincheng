<template>
  <div class="ButtonIcon" :style="butStyle" @click="click">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ButtonIcon',
  props: {
    width: {
      type: Number,
      default: 349
    },
    height: {
      type: Number,
      default: 57
    },
    color: {
      type: String,
      default: '#fff'
    },
    background: {
      type: String,
      default: '#4A5A6A'
    },
    fonstSize: {
      type: Number,
      default: 20
    },
    hoverColor: {
      type: String,
      default: '#fff'
    }
  },
  data: function () {
    return {

    }
  },
  computed: {
    // 按钮宽度
    butStyle () {
      return {
        'width': `${this.width}px`,
        'lineHeight': `${this.height}px`,
        'color': this.color,
        'background': this.background,
        'fonstSize': `${this.fonstSize}px`
      }
    },
    // imgStyle(){
    //   return {
    //     'top':`calc(${(this.height - this.fonstSize) /2})`
    //   }
    // }
  },
  methods: {
    click(){
      this.$emit('click')
    }
  }
}
</script>
<style lang="less" scoped>
.ButtonIcon{
    text-align: center;
    cursor: pointer;
    &:hover{
        color: peru !important;
    }
  img {
      vertical-align: middle;
      width:20px;
  }
}
</style>
