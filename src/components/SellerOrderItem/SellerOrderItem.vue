<template>
  <div class="SellerOrderItem">
    <div class="list-item">
      <div class="list-item-tit">
        <span>
          <strong>流水号：</strong>
          {{item.goods_seller_no}}
        </span>
        <span v-if="item.trans_no">
          <strong>物流单号：</strong>
          <span>{{item.trans_no}}</span>
          <el-popover
            placement="top-start"
            width="500"
            trigger="click"
            @show="getDiliverInfo(item.goods_seller_no)"
          >
            <div class="orderpress" style="max-height:600px;overflow-y:auto;">
              <p style="margin-bottom:15px;font-size:20px">物流单号：{{item.trans_no}}</p>
              <p style="margin-bottom:15px;font-size:20px">当前物流状态</p>
              <el-timeline>
                <el-timeline-item
                  :timestamp="val.datetime"
                  placement="top"
                  v-for="(val, k) in expressList"
                  :key="k"
                  type="success"
                  :class="k === val.length - 1 ? 'lastfood' : '' "
                >
                  <el-card>
                    <h4>{{val.remark}}</h4>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
            <span slot="reference" style="color:#0d98ff; cursor: pointer;margin-left:15px;">查询物流</span>
          </el-popover>
        </span>
      </div>
      <table width="100%" border="1" cellpadding="0" cellspacing="0" style="table-layout:fixed">
        <tr>
          <td style="width:24%">
            <!-- <img :src="item.goods_image" alt> -->
            <div class="goodsInfo">
              <!-- <label  v-if="item.diliverButton && item.priceunit" class="priceunit">
                <input type="checkbox" name="checking" :value="item.id" v-model="checklist1" ref="input">
                {{item.diliver_place}}发货
              </label>-->

              <ImgE :src="item.goods_image" :W="50" :H="50"></ImgE>
              <div class="detail">
                <p>
                  <router-link
                    tag="span"
                    class="goodsname color"
                    :to="{
                    path:'/BrandDetail/GoodsDetails',
                    query:{
                      tag:'goodsinfo',
                      documentid:item.goods_id,
                      name:item.goods_name
                    }
                  }"
                  >{{item.goods_name}}</router-link>
                </p>
                <p style="color:#999;">
                  品牌：
                  <router-link
                    :to="{
                    path:'/BrandDetail',
                    query:{
                      tag:'brand',
                      documentid:item.goods_brand_id,
                      name:item.goods_brand
                    }
                  }"
                  >{{item.goods_brand}}</router-link>
                </p>
              </div>
            </div>
          </td>
          <td style="width:10%">
            <div v-if="item.price_type" class="jieti">
              <p v-for="(item0,index0) in priceList" :key="index0">
                <strong class="price">{{item0.num}}</strong>--
                <strong
                  class="price"
                >{{item.priceunit ? '$' : '￥'}}{{item0.price | toFixed(item.priceunit?3:2)}}</strong>
              </p>
            </div>
            <div v-else>
              <strong
                class="price"
              >{{item.priceunit ? '$' : '￥'}}{{item.seckil_price | toFixed(item.priceunit?3:2)}}</strong>
            </div>
            <strong>({{item.clude_bill?'含13%增值税':'不含税'}})</strong>
          </td>
          <td style="width:8%;">
            <strong
              class="price"
            >{{item.priceunit ? '$' : '￥'}}{{item.totalPay | toFixed(item.priceunit?3:2)}}</strong>
          </td>
          <td style="width:8%;">
            <strong class="price">{{item.totalPayCount | toFixed(0)}}</strong>
          </td>
          <td style="width:15%">
            <p>{{item.expireTime | formatDate}}</p>
            <div v-if="item.status==3">
              <p>
                已逾期:
                <span class="color">{{item.violate_count}}天</span>
              </p>
              <p>
                滞纳金：
                <span class="color">¥ {{item.violate_monney}}</span>
              </p>
            </div>
          </td>
          <td style="width:15%" class="place">
            <template v-if="item.status==1">
              <div v-if="item.diliver_place!='香港'" style="text-align: left;padding:0 5px;">
                <p>
                  <strong>收货人</strong>
                  ：{{item.warehouseRecipient}}
                </p>
                <p>
                  <strong>电话</strong>
                  ：{{item.warehousePhone}}
                </p>
                <p>
                  <strong>地址</strong>
                  ：{{item.warehouseAddr}}
                </p>
              </div>
            </template>
            <div v-else>
              暂未发货
              <CountTime
                class="countTime"
                v-if="item.currentTime"
                v-on:end_callback="countDownE_cb()"
                :currentTime="item.currentTime"
                :startTime="item.currentTime"
                :endTime="item.expireTime"
                :tipText="''"
                :tipTextEnd="'剩余：'"
                :endText="'已逾期'"
                :dayTxt="'天'"
                :hourTxt="'时'"
                :minutesTxt="'钟'"
                :secondsTxt="'秒'"
              ></CountTime>
            </div>
          </td>
          <td style="width:10%">
            <p class="orderStatus">{{item.status | orderStatusFilter}}</p>
            <el-popover
              placement="bottom-end"
              width="400"
              trigger="hover"
              @show="showPopover(item)"
            >
              <div>
                <div>
                  <el-timeline>
                    <el-timeline-item
                      :timestamp="val.createtime"
                      placement="top"
                      v-for="(val, k) in OrderProcessList"
                      :key="k"
                      type="success"
                      :class="k === val.length - 1 ? 'lastfood' : '' "
                    >
                      <el-card>
                        <h4>{{val.opdesc}}</h4>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>
              <span slot="reference" style="color:#0d98ff; cursor: pointer;margin-top:10px">订单进程</span>
            </el-popover>
          </td>
          <td style="width:10%" class="wrapbtn">
            <div>
              <el-button
                class="btn bgColor"
                v-if="item.diliverButton && !item.priceunit"
                size="mini"
                  style="display:block;margin:5px auto"
              >
                <label>
                  <input
                    type="checkbox"
                    name="checking"
                    :value="item.id"
                    v-model="checklist0"
                    ref="input0"
                  />
                  {{item.diliver_place}}发货
                </label>
              </el-button>
              <el-button
                class="btn bgColor"
                @click="DeliverGoods(item)"
                v-if="item.diliverButton"
                size="mini"
                  style="display:block;margin:5px auto"
              >发货</el-button>
              <el-button
                class="btn bgColor"
                @click="DeliverGoodsChangeDue(item)"
                v-if="item.changDiliverButton"
                size="mini"
              >更改交期</el-button>
              <el-button
                class="btn bgColor"
                @click="DeliverGoodsInvoice(item)"
                v-if="item.billButton"
                size="mini"
              >确认开票</el-button>
              <slot name="detail"></slot>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { TimeForma, TimeForma2 } from "@/lib/utils";
import Countdown from "_c/Countdown";
import { axios, sellerOrderCenter } from "../../api/apiObj";
export default {
  name: "SellerOrderItem",
  data() {
    return {
      SellerOrderDetailList: [],
      flag: false,
      goods_seller_id: "",
      OrderProcessList: [],
      priceList: [],
      expressList: [],
      checklist1: [],
      checklist0: []
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    checklist1: {
      handler(val, old) {
        this.$emit("DeliverCheck", {
          goods_seller_no: this.item.goods_seller_no,
          goods_seller_id: this.item.goods_seller_id,
          support_bill: this.item.clude_bill,
          uid: this.item.uid,
          itemid: val.length ? val[0] : old[0],
          flag: 1,
          selected: val.length ? true : false
        });
      }
    },
    checklist0: {
      handler(val, old) {
        this.$emit("DeliverCheck", {
          goods_seller_no: this.item.goods_seller_no,
          goods_seller_id: this.item.goods_seller_id,
          support_bill: this.item.clude_bill,
          uid: this.item.uid,
          itemid: val.length ? val[0] : old[0],
          flag: 0,
          selected: val.length ? true : false
        });
      }
    }
  },
  created() {
    if (this.item.price_type) {
      //标识阶梯价
      let arr = this.item.price_level.split("@");
      arr.forEach(item => {
        let arr1 = item.split("-");
        this.priceList.push({
          num: arr1[0],
          price: arr1[1]
        });
      });
    }
  },
  methods: {
    ...mapActions("SellerOrderManagement", [
      "GetSellerOrderDetaileList",
      "GetQueryGoodsOperationLog"
    ]),
    getDiliverInfo(seller_no) {
      axios
        .request({
          ...sellerOrderCenter.queryExpress,
          params: { seller_no: seller_no }
        })
        .then(res => {
          this.expressList = res.data;
        });
    },
    countDownE_cb: function(item) {
      this.$emit("reload");
    },

    all() {
      this.$loading(this.$store.state.loading);
      this.GetSellerOrderDetaileList({
        start: 0,
        length: 100,
        access_token: this.access_token,
        userImgUrl: "1",
        goods_seller_id: this.goods_seller_id
      }).then(res => {
        this.SellerOrderDetailList = res.data.data;
        this.$loading(this.$store.state.loading).close();
      });
    },
    DetailList(item) {
      this.flag = !this.flag;
      if (this.flag) {
        this.goods_seller_id = item.goods_seller_id;
        this.all();
      }
    },
    // 点击发货按钮
    DeliverGoods() {
      this.$emit("DeliverGoods");
    },
    // 点击发货按钮
    DeliverGoodsPI() {
      this.$emit("DeliverGoodsPI");
    },
    // 点击更改交期
    DeliverGoodsChangeDue(item) {
      this.$emit("DeliverGoodsChangeDue", item);
    },
    // 点击开票
    DeliverGoodsInvoice() {
      this.$emit("DeliverGoodsInvoice");
    },
    // 获取订单进程
    showPopover(item) {
      this.GetQueryGoodsOperationLog({
        goods_seller_no: item.goods_seller_no,
        access_token: this.access_token
      }).then(res => {
        this.OrderProcessList = res.data;
        this.OrderProcessList.map(item => {
          return (item.createtime = TimeForma(item.createtime));
        });
      });
    }
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    }
  },
  components: {
    Countdown
  },
  filters: {
    // toFixed(x,y) {
    //   return Number(x).toFixed(y);
    // },
    pay_channel(x) {
      switch (x) {
        case 1:
          return "微信";
          break;
        case 2:
          return "支付宝";
          break;
        case 3:
          return "银行转账";
          break;
      }
    },
    completeDate(x) {
      return Math.abs(x);
    },
    orderStatusFilter(x) {
      switch (x) {
        case 0:
          return "待发货";
        case 1:
          return "已发货";

        case 2:
          return "取消中";
        case 3:
          return "已逾期";
      }
    },
    status(x) {
      switch (x) {
        case 0:
          return "未支付";
          break;
        case 1:
          return "已支付";
          break;
        case 2:
          return "取消中";
          break;
        case 3:
          return "已取消";
          break;
        case 4:
          return "已完成";
          break;
        case 5:
          return "预付款已付款";
          break;
        case 6:
          return "待付尾款";
          break;
        case 13:
          return "已逾期";
          break;
      }
    },
    formatDate(value) {
      return TimeForma2(value);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./SellerOrderItem.less";
</style>
