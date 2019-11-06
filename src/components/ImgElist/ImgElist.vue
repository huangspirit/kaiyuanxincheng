<template>

  <!-- <span class="ImgE">
     <img :src="`${ src ? src : 'errorGoodsImgUrl'}?imageView2/2/w/${this.W}/h/${this.H}` " alt=''
     :onerror="`this.src='${errorGoodsImgUrl}?imageView2/2/w/${this.W}/h/${this.H}'`">
  </span> -->
  <div class="wrap">
      <div class="listwrap">
          <div class="left"></div>
          <div class="list">
            <ul v-if="srclist.length">
              <li v-for="(item) in srclist" :key="item" >
                  <ImgE :src="item" :W="W" :H="H"></ImgE>
                  <span class="cover"></span>
              </li>
            </ul>
          </div>
          <div class="right"></div>
      </div>
  </div>
</template>
<script>
import {baseURL3} from "@/config";
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
      errorGoodsImgUrl:require("../../assets/image/public/errorImg.png"),
     // errorGoodsImgUrl:baseURL+"4fb7614a118341568c33e3b09d855405.jpg",
      srclist:[]

    }
  },
  mounted(){
      this.init()
  },
  methods:{
      init(){
          this.srclist=this.src.split("@").map(item=>{
              return baseURL3+"/"+item;
          });

      }
  }

}
</script>

<style scoped lang="less">
    .listwrap{
        display:flex;
        li{
            position:relative;
            .cover{
                height:100%;
                width:100%;
                position: absolute;
            }
            &:hover{
                .cover{
                    display: block;
                }
            }
        }
    }
    .left{
        width:0;
        border-top:30px solid transparent;
        border-bottom:30px solid transparent;
        border-left:20px solid transparent;
        border-right:20px solid #fff;
    }
    .right{
        width:0;
        border-top:30px solid transparent;
        border-bottom:30px solid transparent;
        border-left:20px solid #fff;
        border-right:20px solid transparent;
    }
</style>
