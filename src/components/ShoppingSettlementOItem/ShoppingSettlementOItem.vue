<template>
  <li class="ShoppingSettlementOItem">
    <div class="title">
      <img :src="item.list[0].sellerHeader" alt />
      <div>
        <p>{{item.name}}</p>
        <span
          class="tag bgColor"
          v-if="item.list[0].tag==1"
          style="margin-right:10px;"
        >{{item.list[0].tag | tagFilter}}</span>
        <span
          class="tag bgBlu"
          v-if="item.list[0].tag==2"
          style="margin-right:10px;"
        >{{item.list[0].tag | tagFilter}}</span>
        <!-- <span
          class="tag bgOrange"
          v-if="item.list[0].tag==18"
          style="margin-right:10px;"
        >{{item.list[0].tag | tagFilter}}</span> -->
        <!-- <span class="bgColor" v-if="item.list[0].tag!=3">{{item.list[0].tag | tagFilter}}</span> -->
        <!-- <span v-if="item.list[0].tag === '1'">原厂商户</span>
        <span v-if="item.list[0].tag === '2'">代理商</span>
        <span v-if="item.list[0].tag === '3'">商家</span>-->
      </div>
    </div>
    <div class="list">
      <ul class="title">
        <li class="desc">零件信息</li>
        <li class="item">状态</li>
        <li class="item">单价</li>
        <li class="item">数量</li>
        <li class="item">金额</li>
        <li class="item">关税</li>
        <li class="item">交货</li>
        <li  style="width:150px;">备注</li>
      </ul>
      <div class="item" v-for="value in item.list" :key="value.goods_id" >
        <div class="desc">
          <span class="img">
            <ImgE :src="value.goodsImage" :W="60" :H="60"></ImgE>
          </span>
          <div class="text">
            <router-link
              :to="{
                  path:'/BrandDetail/GoodsDetails',
                  query:{
                    tag:'goodsinfo',
                    documentid:value.goods_id,
                    name:value.goods_name
                  }
              }"
              class="name color"
              tag="p"
            >{{value.goods_name}}</router-link>
            <p class="desc" :title="value.goodsDesc">{{value.goodsDesc}}</p>
          </div>
        </div>
        <div class="oneitem">
          <span :class="value.goods_type?'green':'color'">{{value.goods_type?'现货':'订货'}}</span>
          <!-- <strong >{{value.goods_type?'现货':'订货'}}</strong> -->
        </div>
        <div class="oneitem">
          <span class="color">
            {{value.price_unit ? '$' : '￥'}}{{value.goods_price | toFixed(item.price_unit?3:2)}}
            <br />
            <span class="clude_bill blu">({{!value.price_unit ? '含13%增值税' : '不含税'}})</span>
          </span>
        </div>
        <div class="oneitem">{{value.goods_count}}只</div>
        <div
          class="oneitem"
        >{{value.price_unit ? '$' : '￥'}}{{value.total_price | toFixed(item.price_unit?3:2)}}</div>
        <div class="oneitem">￥{{value.guanshuiTotal | toFixed(2)}}</div>
        <div class="oneitem">
          <span v-if="value.diliver_date">{{value.diliver_date | TimeFormaTime}}</span>
          <span v-if="value.goods_type">{{value.day_interval | filterhours}}小时内</span>
          <br />
          {{value.diliver_place}}交货
        </div>
        <!-- <div style="width:100%;margin-top:10px;text-align:left;">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="备注"
            v-model="value.order_mark"
            style="">
          </el-input>
        </div> -->
        <div class="oneitem">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="订单备注，选填"
            v-model="value.order_mark"
            style="font-size:12px;width:150px;">
          </el-input>
        </div>
      </div>
    </div>
    <!-- <div class="foot">
      <div class="foot-r">
          <span>店铺合计：</span>
            <span class="color" v-if="totalPrice">￥{{this.totalPrice | toFixed(3)}}</span>
            <span class="color" v-if="unittotalPrice && totalPrice">&nbsp;+&nbsp;</span>
            <span class="color" v-if="unittotalPrice">${{this.unittotalPrice | toFixed(3)}}</span>
      </div>
    </div>-->
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
      unittotalPrice: 0
    };
  },
  props: {
    item: Object
  },
  filters: {
    TimeFormaTime(x) {
      return TimeForma(x);
    },
    // toFixed(val,num){
    //   return Number(val).toFixed(num)
    // },
    filterhours(val) {
      return Number(val) * 24;
    }
  },
  mounted() {
    this.item.list.forEach(item => {
      if (item.price_unit) {
        this.unittotalPrice += item.total_price;
      } else {
        this.totalPrice += item.total_price;
      }
    });
  }
};
</script>
<style>
</style>
