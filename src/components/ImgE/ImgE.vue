<template>
  <div style="display:inline-block;vertical-align: middle;" :style="`height:${this.H}px;width:${this.W}px;`">
    <span class="ImgE" :style="`height:${this.H}px;width:${this.W}px;line-height:${this.H}px;text-align:center;`">
        <span class="cover el-icon-zoom-in" :style="`line-height:${this.H}px`"  @click="showBigImg=true" v-if="isBig"></span>
        <img :src="`${ (src && src!='-') ? src : errorGoodsImgUrl}?imageView2/2/w/${this.W}/h/${this.H}` " alt=''
        :onerror="`this.src='${errorGoodsImgUrl}?imageView2/2/w/${this.W}/h/${this.H}'`">
      </span>
      <div class="big" v-show="showBigImg" @click="showBigImg=false">
        <div class="wrap" v-if="!srcArr">
          <i class="el-icon-close fr close" @click="showBigImg=false"></i>
          <img  :src="`${ src ? src : errorGoodsImgUrl}` " alt=''
          :onerror="`this.src='${errorGoodsImgUrl}'`">
        </div>
        <div class="wrap" v-if="srcArr && srcArr.length">
          <i class="el-icon-close fr close" @click="showBigImg=false"></i>
            <el-carousel height="500PX">
              <el-carousel-item v-for="item in srcArr" :key="item">
                <div style="line-height:500px;">
                  <img  :src="item" alt='' style="max-height:500px;">
                </div>
              </el-carousel-item>
            </el-carousel>
        </div>
      </div>
  </div>
</template>
<script>
import {baseURL4,baseURL3} from "@/config";
export default {
  name:'ImgE',
  props:{
    height:{
      type:String
    },
    srcArr:{
      type:Array,
     
    },
    src:{
      type:String,
    },
    W:{
      type:Number,
    },
    H:{
      type:Number,
    },
    isBig:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
     // errorGoodsImgUrl:require("../../assets/image/public/errorImg.png")
       errorGoodsImgUrl:baseURL3+"/dfdea895130640e790e87c7390014ca8.jpg",
       showBigImg:false
    }
  },
  methods:{}
}
</script>
<style scoped lang="less">
.big{
  position: fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  z-index:999999;
  background:rgba(0,0,0,0.5);

  .wrap{
    width:600px;
    margin:20vh auto;
    text-align: center;
    padding:20px;
    background:#fff;
    border-radius: 5px;
    img{
      max-width:450px;
      max-height:450px;
    }
    .close{
      cursor: pointer;
      font-size:20px;
      border:1px solid #ddd;
      border-radius: 20px;
      color:#ddd;
      &:hover{
         color:#1989fa;
         border-color:#1989fa;
      }
    }
  }
 
}
.ImgE{
  position: relative;
  &:hover{
    .cover{
      display:block;
    }
  }
  img{
    max-width:99%;
    max-height:99%;
  }
  .cover{
    position: absolute;
    height:100%;
    width:100%;
    cursor: pointer;
    top:0;
    left:0;
    background:rgba(0,0,0,0.5);
    color:#fff;
    display:none;
  }
}
</style>
