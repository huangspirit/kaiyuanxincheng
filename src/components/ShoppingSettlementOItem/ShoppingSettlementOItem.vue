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
        <!-- <p>
                  <span>运费：免运费</span>
                  <span>支付方式：人民币</span>
                  <span>配送方式：国内快递</span>
                  <span>交货地：大陆内地</span>
        </p>-->
        <div>
          <span class="num">￥{{this.totalPrice}}</span>
          <span class="fw">店铺合计：</span>
          <!-- <span>分期付款</span> -->
          <!-- <span class="hook">
            <img src="@/assets/image/inquirybasket/_u11390.png" alt>
          </span>-->
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import "./ShoppingSettlementOItem.less";
import { TimeForma } from "@/lib/utils";
export default {
  name: "ShoppingSettlementOItem",
  data() {
    return {
      totalPrice: 0
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

    this.item.list.forEach(item => {
      this.totalPrice += item.total_price;
    });

  }
};
</script>

<style>
</style>
