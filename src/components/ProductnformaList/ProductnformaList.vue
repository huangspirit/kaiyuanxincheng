<template>
<!-- 产品信息列表 -->
  <div class="ProductnformaList">
    <ul class="brand-hot-con">
      <li v-for="item in list" :key="`list_${item.id}`">
        <!-- 产品信息 -->
        <div class="product-msg">
          <div class="wrapper">
            <div class="product-msg-l">
              <!-- <img :src="item.imageUrl" alt="" class="product-msg-l-img" > -->
              <ImgE :src="item.imageUrl" class="product-msg-l-img" :W='190' :H='190'></ImgE>
              <div class="product-msg-l-text">
                <router-link to="/BrandDetail/GoodsDetails" class="name" tag="p">{{item.productno}}</router-link>
                <p>
                  <span>基本参数：</span>
                  DIP 盒子
                </p>
                <P>
                  <span>描述：</span>
                  {{item.productdesc}}
                </P>
              </div>
            </div>
            <!-- 特价 -->
            <div class="product-msg-r">
              <div>
                <ButtonIcon :width='207' :height='50'>
                  <img src="@/assets/image/brandDetail/u4504.png" alt>
                  申请特价
                </ButtonIcon>
                <ButtonIcon :width='207' :height='50'>
                  <img src="@/assets/image/brandDetail/u4504.png" alt>
                  我有特价
                </ButtonIcon>
                <span class="addcar">
                  <img src="@/assets/image/brandDetail/_u4518.png" alt>
                </span>
                <span class="addcar">
                  <img src="@/assets/image/brandDetail/_u4510.png" alt>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 商家信息列表 -->
        <!-- <MerchantList :id='item.id'></MerchantList> -->

      </li>
    </ul>
  </div>
</template>

<script>
import "./ProductnformaList.less";
import MerchantList from "_c/MerchantList";
export default {
  name: "ProductnformaList",
  props:{
    list:{
      type:Array,
      default:[]
    }
  },
  components: {
    MerchantList
  },
  methods:{

  },
  mounted(){
    
  }
};
</script>

<style>
</style>
