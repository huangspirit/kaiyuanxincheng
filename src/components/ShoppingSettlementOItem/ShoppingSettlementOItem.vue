<template>
  <li class="ShoppingSettlementOItem">
    <div class="title">
      <img :src="item.list[0].sellerHeader" alt>
      <div>
        <p>{{item.name}}</p>
        <span v-if="item.list[0].tag === '1'">原厂商户</span>
        <span v-if="item.list[0].tag === '2'">代理商</span>
        <span v-if="item.list[0].tag === '3'">商家</span>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="value in item.list" :key="value.goods_id">
        <span class="img">
          <ImgE :src="value.goodsImage" :W="158" :H="158"></ImgE>
        </span>
        <div class="text">
          <p class="name">{{value.goods_name}}</p>
          <p class="desc">{{value.goodsDesc}}</p>
          <p>
            <span>
              <label>交货地:</label>
              {{value.diliver_place}}
            </span>

          </p>
          <p v-if="value.diliver_date">
            <span >
              <label>预计交期:</label>
              {{value.diliver_date | TimeFormaTime}}
            </span>
            </p>
          <p>
            <label>价格:</label><span class="num">{{value.price_unit ? '$' : '￥'}}{{value.goods_price}}<span class="clude_bill">({{value.clude_bill ? '含税' : '不含税'}})</span></span>
            <span><label>数量:</label>{{value.goods_count}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="foot-r">
          <span>店铺合计：</span>
            <span class="color" v-if="totalPrice">￥{{this.totalPrice}}</span>
            <span class="color" v-if="unittotalPrice && totalPrice">&nbsp;+&nbsp;</span>
            <span class="color" v-if="unittotalPrice">${{this.unittotalPrice}}</span>
      </div>
    </div>
  </li>
</template>
<style lang="less" scoped>
    @import "./ShoppingSettlementOItem.less";
</style>
<script>
import { TimeForma } from "@/lib/utils";
export default {
  name: "ShoppingSettlementOItem",
  data() {
    return {
        totalPrice: 0,
        unittotalPrice:0
    };
  },
  props: {
    item: Object
  },
  filters: {
    TimeFormaTime(x) {

      return TimeForma(x);
    }
  },
  mounted() {
      console.log(this.item)
    this.item.list.forEach(item => {
        if(item.price_unit){
            this.unittotalPrice += item.total_price;
        }else{
            this.totalPrice += item.total_price;
        }

    });

  }
};
</script>

<style>
</style>
