<template>
  <div class="SellerOrderItem">
    <div class="list-item">
      <div class="list-item-tit">
        <span>
          <strong>批次号：</strong>
          {{item.goods_seller_no}}
        </span>
        <span>
          <strong>物流单号：</strong>
          {{item.trans_no ? item.trans_no : '暂无物流'}}
        </span>
      </div>
      <table width="100%" border="1" cellpadding="0" cellspacing="0" style="table-layout:fixed">
        <tr>
          <td style="width:20%">
            <!-- <img :src="item.goods_image" alt> -->
            <div class="goodsInfo">
              <ImgE :src="item.goods_image" :W="50" :H="50"></ImgE>
              <div class="detail">
                <p>
                  <label for="">名称：</label>
                  <span class="goodsname">{{item.goods_name}}</span>
                </p>
                <p>
                  <label for=""> 品牌：</label>
                <span>{{item.goods_brand}}</span></p>
              </div>
            </div>
          </td>
          <td style="width:10%">
            <p>
              <strong class="price">{{item.priceunit ? '$' : '￥'}}{{item.seckil_price}}</strong> x
              <strong class="price">{{item.totalPayCount}}</strong>
              </p>
              <p>
总额：<strong class="price">{{item.priceunit ? '$' : '￥'}}{{(item.seckil_price*parseInt(item.totalPayCount)) | toFixed(2)}}</strong>
              <!-- {{item.stock_count}} -->
              </p>
            <!-- <span>
              剩余：({{item.stock_count}})
            </span> -->
          </td>
          <td style="width:20%">
           <p>交期：{{item.expireTime | formatDate}}</p>
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
             <div v-else>
               <p>已逾期: <span style="color:#f40;">{{item.violate_count}}天</span></p>
               <p>滞纳金：<span style="color:#f40;">¥ {{item.violate_monney}}</span></p>
               </div>
            <!-- <div v-if="item.status === 1">
            <p>{{item.complete_date | formatDate}}</p>
              <p v-if="item.completeDate < 0">距离交期:{{ item.completeDate | completeDate}}天</p>
              <p v-else style="color:#ff6600">已过交期：{{item.completeDate }}天</p>
            </div> -->
          </td>
          <td style="width:5%">
            <p>{{item.diliver_place}}</p>
          </td>
          <td style="width:15%">
            <div v-if="item.status==1">
              <p>收货人：{{item.warehouseRecipient}}</p>
              <p>电话：{{item.warehousePhone}}</p>
              <p>地址：{{item.warehouseAddr}}</p>
            </div>
            <div v-else>暂未发货</div>
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
                <!-- <p style="margin-bottom:30px;font-size:20px">订单号：{{item.order_no}}</p> -->
                <!-- <p style="margin-bottom:30px;font-size:20px">当前订单状态</p> -->
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
          <td style="width:20%" class="wrapbtn">
            <!-- <div v-if="item.diliver_place === '香港' ">
              <el-button class="default" v-if="item.diliverButon" @click="DeliverGoodsPI">发货</el-button>
            </div> -->
            <div>
              <el-button class="default" @click="DeliverGoods(item)" v-if="item.diliverButon">发货</el-button>
              <!-- <p v-if="!item.diliverBuuton" class="no-change">已发货</p> -->
              <el-button class="default" @click="DeliverGoodsChangeDue(item)" v-if="item.changDiliverButton">更改交期</el-button>
              <!-- <p v-if="!item.diliverBuuton" class="no-change">已更改交期</p> -->
              <el-button class="default" @click="DeliverGoodsInvoice(item)" v-if="item.billButton">确认开票</el-button>
             <el-button class="default" v-if="item.expressButton">物流信息</el-button>
                <slot name="detail"></slot>
<!--             <el-button class="default" >订单明细</el-button>-->
            </div>
          </td>
        </tr>
      </table>
      <!-- list的详细 -->
      <!-- <div class="list-detail" v-if="flag">
        <p class="tab-list-con-tit" v-if="SellerOrderDetailList.length">
          <span style="width:380px">单价/数量</span>
          <span style="width:380px">订单金额</span>
          <span style="width:380px">订单状态</span>
        </p>
        <div
          class="list-item"
          v-for="value in SellerOrderDetailList"
          :key="value.id"
          v-if="SellerOrderDetailList.length"
        >
          <div class="list-item-tit">
            <span v-if="value.create_time">
              <strong>下单时间：</strong>
              {{value.create_time | formatDate}}
            </span>
            <span v-if="value.pay_date">
              <strong>支付时间：</strong>
              {{value.pay_date | formatDate}}
            </span>
            <span v-if="value.payno">
              <strong>付款编号：</strong>
              {{value.payno}}
            </span>
            <span v-if="value.order_no">
              <strong>支付编号：</strong>
              {{value.order_no}}
            </span>
            <span v-if="value.order_no">
              <strong>订单编号：</strong>
              {{value.order_no}}
            </span> -->
            <!-- <span class="inform">
              {{value.username}}
              <img :src="value.headImgUrl" alt />
            </span>-->
          <!-- </div>
          <table width="100%" border="1" cellpadding="0" cellspacing="0" style="table-layout:fixed">
            <tr>
              <td>
                <p
                  class="num"
                >{{value.priceunit ? '$' : '￥'}}{{value.good_price}}x{{value.goods_count}}</p>
              </td>
              <td>
                <p
                  class="num"
                >{{value.priceunit ? '$' : '￥'}}{{value.total_price}}（{{value.clude_bill ? '含税' : '不含税' }}）</p>
              </td>
              <td>
                <p>{{value.order_status | status}}</p>
              </td>
            </tr>
          </table>
        </div>
        <div class="zanwu" v-if="!SellerOrderDetailList.length">暂无数据</div>
      <Pagination :currentPage.sync="currentPage" :total="total"></Pagination>
      </div> -->
      <!-- <div class="list-detail-bar" @click="DetailList(item)">
        {{flag ? '收起订单商品详细' : '查看订单商品详细'}}
        <i class="el-icon-caret-bottom" v-if="!flag"></i>
        <i class="el-icon-caret-top" v-else></i>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { TimeForma, TimeForma2 } from "@/lib/utils";
import Countdown from "_c/Countdown";
export default {
  name: "SellerOrderItem",
  data() {
    return {
      SellerOrderDetailList: [],
      flag: false,
      goods_seller_id: "",
      OrderProcessList: []
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapActions("SellerOrderManagement", [
      "GetSellerOrderDetaileList",
      "GetQueryGoodsOperationLog"
    ]),
      countDownE_cb: function(item) {
          this.$emit("reload")
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
    toFixed(x,y) {
      return Number(x).toFixed(y);
    },
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
      return TimeForma(value);
    }
  }
};
</script>
<style lang="less" scoped>
  @import "./SellerOrderItem.less";
</style>
