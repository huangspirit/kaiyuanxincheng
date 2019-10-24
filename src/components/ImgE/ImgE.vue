<template>
  <span class="ImgE">
     <img :src="`${ src ? src : 'errorGoodsImgUrl'}?imageView2/2/w/${this.W}/h/${this.H}` " alt=''
     :onerror="`this.src='${errorGoodsImgUrl}?imageView2/2/w/${this.W}/h/${this.H}'`">
  </span>
</template>

<script>
import './ImgE.less'
export default {
  name:'ImgE',
  props:{
    src:{
      type:String,
    },
    W:{
      type:Number,
    },
    H:{
      type:Number,
    }
  },
  data(){
    return {
      errorGoodsImgUrl:require("../../assets/image/public/errorImg.png")
    }
  },

}
</script>

<style>

</style>
