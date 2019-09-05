<template>
  <tr class="MerchantItem">
    <td class="business">
      <div>
        <img :src="item.userImgeUrl" alt>

        <div>
          <p>{{item.sellerName}}</p>
          <span v-if="item.tag === 1" class="tag y-con">原厂商户</span>
          <span v-if="item.tag === 2" class="tag y-con">代理商</span>
          <span v-if="item.tag === 3" class="tag r-con">商城买家</span>
        </div>
      </div>
    </td>
    <td>
      <div>
        <p>{{item.moq}}</p>
      </div>
    </td>
    <td>
      <div>
        <p>{{item.mpq}}</p>
      </div>
    </td>
    <td>
      <div>
        <p>{{item.goodsStockCount}}</p>
      </div>
    </td>
    <td>
      <div>
        <p>
          <span>{{item.priceType ? '现货' : '期货'}}</span>
          <!-- <span v-if="item.priceType" class="num">（付全款）</span> -->
        </p>
      </div>
    </td>
    <td>
      <div>
        <p>{{item.diliverPlace}}</p>
        <p>
          <span>交期:</span>
          {{item.deliverTime | formatDateTime}}
        </p>
      </div>
    </td>
    <td class="price">
      <div>
        <div class="stepped-price" v-if="item.priceType">
          <ul>
            <li v-for="(val, k) in priceLevelList" :key="k">
              <span class="num">
                <span>{{val.num[1]}}+</span>
              </span>
              <span
                class="price"
              >{{item.priceUnit ? '$' : '￥'}}{{val.price}} {{item.priceUnit ? '(不含税)' : '(含税)'}}</span>
            </li>
          </ul>
        </div>
        <div v-else>
          <span class="price-num">{{item.priceUnit ? '$' : '￥'}}{{item.goodsPrice}}</span>
        </div>
        <div v-if="!item.seller_always">
          <p v-if="item.sellStatus === 0">距离活动开始还有：</p>
          <p v-if="item.sellStatus === 1">距离特价结束还有：</p>
          <Countdown
            v-on:start_callback="countDownS_cb()"
            v-on:end_callback="countDownE_cb()"
            :startTime="item.endTime - item.remainSeconds"
            :endTime="item.endTime"
            :tipText="''"
            :tipTextEnd="''"
            :endText="'活动已结束'"
            :dayTxt="'天'"
            :hourTxt="'小时'"
            :minutesTxt="'分钟'"
            :secondsTxt="'秒'"
          ></Countdown>
        </div>
        <p v-else>
          <span>交货时间：</span>
          <span class="num">{{item.day_interval}}</span> 天后开始交货
        </p>
        <div class="box">
          <div>{{item.priceType ? '阶梯价' : "一口价"}}</div>
        </div>
      </div>
    </td>
    <td class="operation">
      <div>
        <div class="shopping-bar" v-if="purchaseFlag">
          <span class="name">{{item.goods_name}}</span>
          <div class="number">
            <span>数量:</span>
            <el-tooltip
              placement="top center"
              effect="dark"
              :content="`最小起订量为${item.mpq},${item.mpq}为增量单位`"
            >
              <el-input-number
                v-model="purchaseObj.num"
                :min="item.moq"
                :max="item.goodsStockCount"
                :step="item.mpq"
                @change="handleChange"
                label="描述文字"
              ></el-input-number>
            </el-tooltip>
            <p class="text" v-if="numberFlag">数量必须是MOQ的整数倍</p>
          </div>
          <div class="price">
            <p>
              <span>单价：</span>
              <span class="num">{{item.priceUnit ? '$' : '￥'}}{{purchaseObj.price}}</span>
            </p>
            <!-- <p class="small">MOQ：1000pcs</p> -->
          </div>
          <div class="total price">
            <p>
              <span>总计:</span>
              <span class="num">{{item.priceUnit ? '$' : '￥'}}{{purchaseObj.total}}</span>
            </p>
            <p class="small">含13%增值税</p>
          </div>
          <span :class="{submit:true,noSubmit:numberFlag}" @click="submit">提交结算</span>
          <span class="close" @click="closePurchase">X</span>
        </div>
        <div class="shopping-bar" v-if="addCarFlag">
          <span class="name">{{item.goods_name}}</span>
          <div class="number">
            <span>数量:</span>
            <el-tooltip placement="top center" effect="light">
              <div slot="content">最小起订量为2000,1000为增量单位</div>
              <el-input-number v-model="num" :min="2000" :step="1000" label="描述文字"></el-input-number>
            </el-tooltip>
          </div>
          <div class="price">
            <p>
              <span>单价：</span>
              <span class="num">￥3.55</span>
            </p>
            <p class="small">MOQ：1000pcs</p>
          </div>

          <span class="submit">加入购物车</span>
          <span class="close" @click="closeAddCar">X</span>
          <span class="arrow"></span>
        </div>
        <ButtonIcon :width="130" :height="34" :fonstSize="12" @click="purchase">购买</ButtonIcon>
        <ButtonIcon :width="130" :height="34" :fonstSize="12" @click="addCar">加入购物车</ButtonIcon>
      </div>
    </td>
  </tr>
</template>
<style scoped lang="less">
    @import "./MerchantItem.less";
</style>
<script>

import Countdown from "_c/Countdown";
import { TimeForma } from "@/lib/utils";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "MerchantItem",
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      num: 100,
      // 购买商品的flag
      purchaseFlag: false,
      addCarFlag: false,
      priceLevelList: [],
      purchaseObj: {
        num: 0,
        price: 0,
        total: 0
      },
      numberFlag: false
    };
  },
  components: {
    Countdown
  },
  filters: {
    formatDateTime(x) {
      return TimeForma(x);
    }
  },
  mounted() {

    this.priceLevelList = this.item.priceLevelList;
    if (this.item.priceType) {
      this.purchaseObj = {
        num: this.item.moq,
        price: this.item.priceLevelList[0].price
      };
    } else {
      this.purchaseObj = {
        num: this.item.moq,
        price: this.item.goodsPrice
      };
    }
  },
  watch: {
    "purchaseObj.num": {
      handler() {
        this.purchaseObj.total = (
          this.purchaseObj.num * this.purchaseObj.price
        ).toFixed(4);
      }
    }
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    }
  },
  methods: {
    ...mapActions("MerchantList", ["GetOrder"]),
    // 购买的数量变化时
    handleChange(value) {
      if (this.purchaseObj.num % this.item.moq === 0) {
        this.numberFlag = false;
      } else {
        this.numberFlag = true;
      }
      if (this.item.priceType) {
        this.priceLevelList.forEach(item => {
          if (value < Number(item.num[1]) && value > Number(item.num[0])) {
            this.purchaseObj.price = item.price;
          }
        });
      }
    },
    // 提交结算
    submit() {
      if (!this.numberFlag) {
        // 生成orderJson
        let orderJson = [];
        let obj = {
          seckill_goods_id: this.item.id,
          goods_id: this.item.goods_id,
          goods_name: this.item.goods_name,
          goods_count: this.purchaseObj.num,
          goods_price: this.purchaseObj.price,
          order_channe: 1,
          clude_bill: this.item.includBill,
          pay_channe: 1,
          price_unit: this.item.priceUnit,
          goods_type: this.item.priceType,
          sellerName: this.item.sellerName,
          sellerHeader: this.item.userImgeUrl,
          tag: this.item.tag,
          goodsDesc: this.item.goodsDesc,
          goodsImage: this.item.goodsImageUrl,
          diliver_place: this.item.diliverPlace,
          complete_date: this.item.deliverTime,
          seller_id: this.item.sellerId,
          diliver_date:this.item.deliverTime,
          end_date:this.item.endTime
        };
        orderJson.push(obj);
        let billObj = {
          billtype: "1",
          content_id: "1"
        };
        // 生成bill对象
        let obj2 = {
          bill: JSON.stringify(billObj),
          dilivertype: "1",
          order: JSON.stringify(orderJson),
          add_id: 1,
          access_token: this.access_token,
          type: 0,
          orderSource: 1
        };
        this.GetOrder(obj2)
          .then(res => {
            this.$router.push({
              path: "/ShoppingCart/ShoppingSettlement",
              query: {
                data: JSON.stringify(res),
                obj2: JSON.stringify(obj2)
              }
            });
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
    countDownS_cb: function() {
      // item.sellStatus = 1;
    },
    countDownE_cb: function() {
      // item.sellStatus = 2;
    },
    // 购买商品
    purchase() {
      this.purchaseFlag = true;
      this.addCarFlag = false;
    },
    // 关闭购买商品框
    closePurchase() {
      this.purchaseFlag = false;
    },
    // 关闭购买加入购物车
    closeAddCar() {
      this.addCarFlag = false;
    },
    // 加入购物车
    addCar() {
      this.purchaseFlag = false;
      this.addCarFlag = true;
    }
  }
};
</script>

<style>
</style>
