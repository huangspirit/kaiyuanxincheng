<template>
  <div class="SellerOrderItem">
    <div class="list-item">
      <div class="list-item-tit">
        <span>
          <strong>批次号：</strong>
          {{item.goods_seller_no}}
        </span>
        <span v-if="item.trans_no">
          <strong>物流单号：</strong>
              <el-popover
                  placement="top-start"
                  width="500"
                  trigger="hover"
                  @show="getDiliverInfo(item.goods_seller_no)"
              >
                     <div class="orderpress">
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
                     <span slot="reference" style="color:#0d98ff; cursor: pointer;margin-top:10px">{{item.trans_no}}</span>
                 </el-popover>
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
              <div v-if="item.price_type" class="jieti">
                    <p v-for="item0 in priceList"><strong class="price">{{item0.num}}</strong>--<strong class="price">{{item.priceunit ? '$' : '￥'}}{{item0.price}}</strong> </p>
              </div>
              <div v-else>
                  <strong class="price">{{item.priceunit ? '$' : '￥'}}{{item.seckil_price}}</strong>
              </div>
          </td>
            <td style="width:10%;" >
                <strong class="price">{{item.priceunit ? '$' : '￥'}}{{item.totalPay}}</strong>/
                <strong class="price">{{item.totalPayCount | toFixed(0)}}</strong>
            </td>
          <td style="width:15%">
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
             <div v-if="item.status==3">
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
          <td style="width:13%">
              <template v-if="item.status==1">
                  <div v-if="item.diliver_place!='香港'" style="text-align: left;padding:0 5px;">
                      <p><strong>收货人</strong>：{{item.warehouseRecipient}}</p>
                      <p><strong>电话</strong>：{{item.warehousePhone}}</p>
                      <p><strong>地址</strong>：{{item.warehouseAddr}}</p>
                  </div>
              </template>
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

          <td style="width:17%" class="wrapbtn">
            <!-- <div v-if="item.diliver_place === '香港' ">
              <el-button class="default" v-if="item.diliverButon" @click="DeliverGoodsPI">发货</el-button>
            </div> -->
            <div>
              <el-button class="default" @click="DeliverGoods(item)" v-if="item.diliverButton">发货</el-button>
              <!-- <p v-if="!item.diliverBuuton" class="no-change">已发货</p> -->
              <el-button class="default" @click="DeliverGoodsChangeDue(item)" v-if="item.changDiliverButton">更改交期</el-button>
              <!-- <p v-if="!item.diliverBuuton" class="no-change">已更改交期</p> -->
              <el-button class="default" @click="DeliverGoodsInvoice(item)" v-if="item.billButton">确认开票</el-button>
                <slot name="detail"></slot>
<!--             <el-button class="default" >订单明细</el-button>-->
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
import {axios,sellerOrderCenter} from "../../api/apiObj";


export default {
  name: "SellerOrderItem",
  data() {
    return {
      SellerOrderDetailList: [],
      flag: false,
      goods_seller_id: "",
      OrderProcessList: [],
      priceList:[],
      expressList:[]
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
    created(){

      if(this.item.price_type){
          //标识阶梯价
          let arr=this.item.price_level.split("@")
          arr.forEach(item=>{
              let arr1=item.split("-")

              this.priceList.push({
                  num:arr1[0],
                  price:arr1[1]
              })

          })


      }
    },
  methods: {
    ...mapActions("SellerOrderManagement", [
      "GetSellerOrderDetaileList",
      "GetQueryGoodsOperationLog"
    ]),
      getDiliverInfo(seller_no ){
        axios.request({...sellerOrderCenter.queryExpress,params:{seller_no:seller_no }}).then(res=>{
            this.expressList=res.data
        })


      },
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
