<template>
  <div class="SearchInput" >
    <div class="ipt"
    :style='inputWrapStyle'>
      <input type="text" :placeholder="placeholder" :value="value" @input="change" :style="inputStyle">
      <div class="btn" :style="btnStyle" @click="submit">
        <img src="@/assets/image/inquirybasket/u26.png" alt :style="btnImgStyle">
      </div>
    </div>
  </div>
</template>
<script>
import './SearchInput.less'    

export default {
  name: 'SearchInput',
  props: {
    value: {

      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },

    // 按钮的颜色
    btnColor: {
      type: String,
      default: '#4A5A6A'
    },
    // 按钮的宽度
    btnWidth: {
      type: Number,
      default: 80
    },
    //按钮内图片的宽度
    btnImgWidth: {
      type: Number,
      default: 40
    },
    // 搜索框的边框颜色
    borderColor: {
      type: String,
      default: '#4A5A6A'
    },
    // 搜索框的宽度
    width: {
      type: Number,
      default: 530
    },
    //搜索框的字体大小
    fontSize:{
      type: Number,
      default: 26
    },
    // 搜索框的高度
    height: {
      type: Number,
      default: 54
    },
    // 搜索框的背景
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    // 搜索框字体颜色
    fontColor: {
      type: String,
      default: '#4A5A6A'
    }
  },
  computed: {
    // 搜索框的样式
    inputWrapStyle () {
      return {
        'width': `${this.width - 30}px`,
        'height': `${this.height - 14}px`,
        'border': `1px solid ${this.borderColor}`,
        'background': `${this.backgroundColor}`,
        'color': this.fontColor,
        
      }
    },
    inputStyle(){
      return {
        'fontSize':`${this.fontSize}px`
      }
    },
    // 按钮的样式
    btnStyle () {
      return {
        'background': this.btnColor,
        'height': `${this.height}px`,
        'width': `${this.btnWidth}px`
      }
    },
    //按钮内图片的样式
    btnImgStyle(){
      return{
        'width':`${this.btnImgWidth}px`
      }
    }
  },
  methods: {
    change (e) {
      this.$emit('input', e.target.value)
    },
    submit(){
         this.$emit('submit')
    }
  }
}
</script>

<style>
</style>
