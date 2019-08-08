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
      errorGoodsImgUrl:'http://brand.113ic.com/6cb875d1fc454665a3e78b5ac675e391.jpg'
    }
  },

}
</script>

<style>

</style>
