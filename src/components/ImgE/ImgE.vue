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
      errorGoodsImgUrl:'http://brand.113ic.com/8edd1edf1169493cbdae9dcd303be337.jpg'
    }
  },

}
</script>

<style>

</style>
