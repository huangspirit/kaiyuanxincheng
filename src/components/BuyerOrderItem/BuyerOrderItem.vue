<template>
  <div class="BuyerOrderItem">
    <p v-if="item == null">32424</p>
    <div class="list-item">
      <div class="list-item-tit">
        <span>
          <strong>下单时间:</strong>
          {{item.orderVo.createtime | formatDate}}
        </span>
        <span>
          <strong>订单号：</strong>
          {{item.orderVo.order_no}}
        </span>
        <span v-if="item.orderVo.firtPayNo && item.orderVo.firtPayNo==item.orderVo.lastPayNo">
          <strong>付款编号:</strong>
          {{item.orderVo.firtPayNo}}
          <img
            :src="payTypeMark[item.orderVo.prePayChannel]['imgurl']"
            class="payTypeMark"
            :title="payTypeMark[item.orderVo.prePayChannel].title"
          />
        </span>
        <span v-if="item.orderVo.firtPayNo && item.orderVo.firtPayNo!=item.orderVo.lastPayNo">
          <strong v-if="item.orderVo.prePayChannel == 3">预付款凭证:</strong>
          <img
            v-if="item.orderVo.prePayChannel == 3"
            @click="PrvExampleDiagram(item.orderVo.firtPayNo)"
            :src="item.orderVo.firtPayNo + '?imageView2/2/w/80/h/46'"
          />
          <strong v-if="item.orderVo.prePayChannel != 3">付款编号:</strong>
          <span v-if="item.orderVo.prePayChannel != 3">{{item.orderVo.firtPayNo}}</span>
          <img
            :src="payTypeMark[item.orderVo.prePayChannel]['imgurl']"
            class="payTypeMark"
            :title="payTypeMark[item.orderVo.prePayChannel].title"
          />
        </span>
        <span v-if="item.orderVo.lastPayNo && item.orderVo.firtPayNo!=item.orderVo.lastPayNo">
          <strong v-if="item.orderVo.lastPayChannel!=3">尾款编号:</strong>
          <span v-if="item.orderVo.lastPayChannel!=3">{{item.orderVo.lastPayNo}}</span>
          <strong v-if="item.orderVo.lastPayChannel==3">尾款凭证:</strong>
          <img
            v-if="item.orderVo.lastPayChannel==3"
            @click="PrvExampleDiagram(item.orderVo.lastPayNo)"
            :src="item.orderVo.lastPayNo + '?imageView2/2/w/80/h/46'"
          />
          <img
            :src="payTypeMark[item.orderVo.lastPayChannel]['imgurl']"
            class="payTypeMark"
            :title="payTypeMark[item.orderVo.prePayChannel].title"
          />
        </span>
        <span class="isMonth-con">
          <span class="isMonth">{{item.orderVo.isMonth ? '月结订单' :'普通订单'}}</span>
          <strong>订单类型：</strong>
        </span>
      </div>
      <table
        width="100%"
        border="1"
        cellpadding="0"
        cellspacing="0"
        style="table-layout:fixed;"
        class="table"
      >
        <tr>
          <td style="width:30%;" class="receiverInfo">
            <div class="text_left">
              <label for>收件人：</label>
              <p>{{item.orderVo.receivingName}}</p>
            </div>
            <div class="text_left">
              <label for>电&nbsp;&nbsp; 话：</label>
              <p>{{item.orderVo.phone}}</p>
            </div>
            <div class="text_left">
              <label for>地&nbsp;&nbsp; 址：</label>
              <p>{{item.orderVo.address}}{{item.orderVo.detailedAddress}}</p>
            </div>
          </td>
          <!-- <td style="width:15%">
            <p>{{item.orderVo.goods_type ? '$' : '￥'}}{{item.orderVo.postage}}</p>
            <span v-if="item.orderVo.postage">(预付邮费)</span>
            <span v-else>(到付)</span>
          </td> -->
          <td style="width:15%" class="operation">
            <div>
              <span style="font-weight:bolder;" class="color">{{item.orderVo.orderStatesDesc}}</span>
            </div>
            <el-popover placement="top-start" width="500" trigger="hover" @show="showPopover(item)">
              <div class="orderpress">
                <p style="margin-bottom:15px;font-size:20px">订单号：{{item.orderVo.order_no}}</p>
                <p style="margin-bottom:15px;font-size:20px">当前订单状态</p>
                <el-timeline>
                  <el-timeline-item
                    :timestamp="val.createtime"
                    placement="top"
                    v-for="(val, k) in OrderProcessList"
                    :key="val.id"
                    type="success"
                    :class="k === val.length - 1 ? 'lastfood' : '' "
                  >
                    <el-card>
                      <h4>{{val.ordesc}}</h4>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <span slot="reference" style="color:#0d98ff; cursor: pointer;margin-top:10px">查看订单进程</span>
            </el-popover>
            <!-- 合同的按钮 -->

          </td>
          <td style="width:15%">
            <p
              class="num"
              v-if="item.orderVo.order_prepay"
            >
<!--                {{item.orderVo.goods_type ? '$' : '￥'}}-->
                ￥
                {{item.orderVo.order_prepay | toFixed(2)}}
            </p>
          </td>
          <td style="width:15%">
            <p class="num">总额：￥{{item.orderVo.order_amount | toFixed(2) }}</p>
            <span v-if="item.orderVo.order_bill">附加发票金额（￥{{item.orderVo.order_bill | toFixed(2)}}）</span><br>
            <span v-if="item.orderVo.guanshui">关税（￥{{item.orderVo.guanshui | toFixed(2)}}）</span>
          </td>
          <td style="width:25%" class="operation">
            <!-- 是不是月结 -->
              <div class="box-con">
                  <div class="wrapbtn" v-if="item.orderVo.download">
                    <span class="downloadContract bgLightGray"  @click="downLoadOrderContract(item.orderVo.contractUrl)">
                     下载合同
                    </span>
                  </div>
                  <el-upload
                      class="upload-demo-uploadContract"
                      :action="uploadUrl"
                      :limit="1"
                      :data="uploadObj"
                      :on-success="uploadSuccess"
                      :before-upload="beforeAvatarUpload"
                      style="margin-bottom:10px;position: relative"
                      v-if="item.orderVo.order_status !== 11 && item.orderVo.download"
                  >
                      <!--                    v-if="item.orderVo.order_status !== 11 && item.orderVo.download"-->
                      <span class="uploadContract btn bgLightGray">
                        上传合同
                      </span>
                  </el-upload>
              </div>
            <div class="box-con">

              <div class="wrapbtn " v-if="item.orderVo.prePayButton">
                <span @click="payment(0)" class="bgColor">去付定金</span>
              </div>
              <div class="wrapbtn" v-if="item.orderVo.finalPayButton">
                <span @click="payment(1)" class="bgColor">去付尾款</span>
              </div>
              <div
                class="wrapbtn"
                v-if="item.orderVo.isMonth && item.orderVo.payButton"
              >
                <span @click="vipPayment" class="bgColor">全额付款</span>
              </div>
              <div
                class="wrapbtn"
                v-if="!item.orderVo.isMonth && !item.orderVo.need_pre_pay && item.orderVo.payButton"
              >
                <span @click="payment(2)" class="bgColor">全额付款</span>
              </div>
              <div class="wrapbtn" v-if="item.orderVo.cancelButton">
                <span @click="cancleOrder(1,item.orderVo.id)" class="bgLightGray">取消订单</span>
              </div>

            </div>

            <!-- 判断倒计时是否失效 -->
            <div class="counttimewrap">
              <div v-if="item.orderVo.expireTime">
                <!-- <p>订单剩余有效时间：</p> -->
                <CountTime
                  class="CountTime color"
                  v-on:end_callback="countDownE_cb()"
                  :currentTime="item.orderVo.currentTime"
                  :startTime="item.orderVo.currentTime"
                  :endTime="item.orderVo.expireTime"
                  :tipText="'距离开始文字1'"
                  :tipTextEnd="''"
                  :endText="'订单已失效'"
                  :dayTxt="'天'"
                  :hourTxt="'小时'"
                  :minutesTxt="'分钟'"
                  :secondsTxt="'秒'"
                ></CountTime>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <!-- list的详细 -->
      <div class="list-detail" v-if="flag">
        <table
          width="100%"
          border="1"
          cellpadding="0"
          cellspacing="0"
          style="table-layout:fixed;"
          class="secondTable"
        >
          <thead>
            <tr>
              <th>商品详细</th>
              <th>单价/数量</th>
              <th>交货周期</th>
              <th>金额明细</th>
              <th>物流编号</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(value ,index) in item.orderInfoList">
              <tr :key="index">
                <td colspan="6" class="sellerInfo">
                  <div class="fr sellerInfowrap">
                    <!-- <span>{{value.sellerName}}</span> -->
                    <img :src="value.headImgUrl" alt class="sellerImg" />
                    <div class="hisinfo">
                      <p>
                        <span class="sellername">{{value.username}}</span>
                        <span class="type" :class="'type'+value.tag">{{value.tag | tagfilter }}</span>
                      </p>
                      <p>
                        成交量
                        <span>{{value.finishOrder}}</span>
                      </p>
                      <p>
                        发布产品
                        <span>{{value.historyPublish}}</span>
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr :key="value.id">
                <td>
                  <div class="goodsDetail">
                      <ImgE :src="value.goods_image" :W="50" :H="50">
                      </ImgE>
<!--                    <img :src="value.goods_image" :W="50" :H="50" />-->
                    <div>
                      <p class="num">{{value.goods_name}}</p>
                      <p>品牌：{{value.goods_brand}}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p
                    class="num"
                  >{{value.priceunit ? '$' : '￥'}}{{value.good_price | toFixed(value.priceunit?3:2)}}x{{value.goods_count}}</p>
                  <p class="num">({{value.priceunit ? '不含税' : '含13%增值税'}})</p>
                </td>
                <td>
                  <p>{{value.diliver_place}}</p>
                  <p>{{value.complete_date | formatDate}}</p>
                </td>
                <td>
                  <p
                    class="num"
                  >总额：{{value.priceunit ? '$' : '￥'}}{{value.total_price | toFixed(value.priceunit?3:2)}}（{{value.goods_type ? '现货' : '订货'}}）</p>
                  <!-- <span>需预付款：（{{value.priceunit ? '$' : '￥'}}{{value.pre_pay}}）</span>
                <span>发票扣税额（￥{{value.bill_price}}）</span>

                <div v-if="value.priceunit">
                  <span>预付款汇率汇率（${{value.pre_exchange}}）</span>
                  <span v-if="value.fi_exchange">最终付款汇率（${{value.fi_exchange}}）</span>
                  </div>-->
                </td>
                <td>
                  <div v-if="value.expressButton">
                    <el-popover
                      placement="top-start"
                      width="500"
                      trigger="hover"
                      @show="getDiliverInfo(value.id)"
                    >
                      <div class="orderpress">
                        <p style="margin-bottom:15px;font-size:20px">物流单号：{{value.trans_no}}</p>
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
                      <span
                        slot="reference"
                        style="color:#0d98ff; cursor: pointer;margin-top:10px"
                      >{{value.trans_no}}</span>
                    </el-popover>
                  </div>
                  <p v-else>暂无物流编号</p>
                </td>
                <td>
                  <div class="operaBtn">
                    <div v-if="value.reason" class="cancleReason">取消原因：{{value.reason}}</div>
                    <div class="wrapbtn" v-else>
                      <span
                        v-if="value.confirmChangeDiliverTimeButton"
                        @click="confirmChangeDiliverTime(value)"
                        class="btn bgColor"
                      >确认新交期</span>
                      <!-- <span v-else class="yjs">已接受新交期</span> -->
                      <span
                        v-if="value.cancleButton"
                        class="btn cancleBtn"
                        @click="cancleOrder(2,value.id)"
                      >取消订单</span>
                      <span
                        @click="confirmRecieveGoods(value.id)"
                        v-if="value.receivingGoodsButton"
                        class="btn bgColor"
                      >确认收货</span>
                      <!-- <p>交期延期至{{value.complete_date | formatDate}}</p> -->
                    </div>
                  </div>
                  <div v-if="item.expireTime" class="counttimewrap">
                    <!-- <p>订单剩余有效时间：</p> -->

                    <CountTime
                      class="CountTime"
                      v-on:end_callback="countDownE_cb()"
                      :currentTime="value.currentTime"
                      :startTime="value.currentTime"
                      :endTime="value.expireTime"
                      :tipText="'距离开始文字1'"
                      :tipTextEnd="''"
                      :endText="'订单已失效'"
                      :dayTxt="'天'"
                      :hourTxt="'小时'"
                      :minutesTxt="'分钟'"
                      :secondsTxt="'秒'"
                    ></CountTime>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- </div> -->
      </div>
      <div class="list-detail-bar" @click="DetailList(item)">
        <span class="bgColor btn">
            {{flag ? '收起订单商品详细' : '查看订单商品详细'}}
        <i class="el-icon-caret-bottom" v-if="!flag"></i>
        <i class="el-icon-caret-top" v-else></i>
        </span>
      </div>
    </div>
    <!-- 确认交期模态框 -->
    <SetTankuang :title="'更新交期提示'" v-if="dialogVisible" @closeDialogCallBack="dialogVisible=false">
      <div class="dialog-body" slot="dialog-body">
        <p>
          卖家将此商品的交期更新为
          <strong style>{{currentSecondOrder.complete_date | formatDate}}</strong>
        </p>
        <p>接受后无法撤销订单，如未付尾款请务必在新交期前支付尾款</p>
      </div>
      <div slot="footer" class="dialog-footer AcceptNewTime" >
        <el-button type="primary"  @click="isAcceptNewTime(1)" size="mini">确认，接受新交期</el-button>
        <el-button type="info"  @click="isAcceptNewTime(2)" size="mini">拒绝，取消订单</el-button>
        <el-button @click="dialogVisible = false" size="mini" type="info" >关 闭</el-button>
        <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>  -->
      </div>
    </SetTankuang>
    <el-dialog
      center
      :visible.sync="dialogVisible2"
      width="500px"
      class="confirma-delivery-dialog"
      top="20vh"
      lock-scroll
    >
      <p slot="title" class="title">取消订单</p>
      <div class="cancleOrderReason">
        <!-- <p>确认取消此订单吗?</p> -->
        <el-input type="textarea" v-model="cancleOrderForm.reason" placeholder="请填写取消订单的原因"></el-input>
        <p class="desc">取消后该订单无法恢复</p>
        <p class="desc">
          取消后已支付订单款项会在下一个结账日按原路返回
          结账日为每月15日
        </p>
        <p></p>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button  @click="dialogVisible2 = false" class="close">不取消</el-button>
        <el-button type="primary" @click="DeliveryCancel">确认取消</el-button>
      </span>
    </el-dialog>
    <!-- 确认收货 -->
    <el-dialog
      center
      :visible.sync="dialogVisible3"
      width="500px"
      class="confirma-delivery-dialog"
      top="20vh"
      lock-scroll
    >
      <p slot="title" class="title">确认收货</p>
      <div class="con color">
        <p>请确认您已收到货品</p>
        <p>确认后系统将会放款给卖家</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button class="bgColor" @click="ConfirmReceipt">确认收货</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogContractFlag"
      width="1000px"
      center
      class="dialog-ruleForm-code"
    >
      <div class="dialog-ruleForm-code-Contract-body">
        <iframe :src="downloadUrl2" frameborder="0" width="100%" height="600px"></iframe>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgDialogVisible">
      <img width="100%;" :src="dialogImageUrl" alt />
    </el-dialog>
      <el-dialog
          title="选择付款方式"
          :visible.sync="selectedPayType"
          width="30%"
        >
         <div>
             <div class="selectpayType">
                 <span @click="payType=1" :class="{bgColor:payType==1}" class="btn">对公转账</span>
                 <span  @click="payType=2" :class="{bgColor:payType==2}" class="btn">在线支付</span>
             </div>
         </div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="selectedPayType = false">取 消</el-button>
                <el-button type="primary" @click="submitpayType">确 定</el-button>
              </span>
      </el-dialog>
      <SetTankuang :title="'银行汇款'" v-if="showDialog" @closeDialogCallBack="closeDialogCallBack">
          <div class="dialog-body" slot="dialog-body">
              <div class="RemittancNotes">
                  <el-form  label-width="80px">
                      <el-form-item label="汇款凭证:">
                          <!-- <el-input v-model="bankPayNumber" placeholder="请仔细填写银行汇款编号" type="text"></el-input> -->
                          <el-upload
                              class="upload-demo"
                              ref="upload"
                              :limit="1"
                              :action="requestUrl"
                              :auto-upload="true"
                              list-type="picture-card"
                              :on-success="handleAvatarSuccess"
                          >
                              <i class="el-icon-plus"></i>
                              <div
                                  slot="tip"
                                  class="el-upload__tip"
                              >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
                          </el-upload>
                      </el-form-item>
                      <el-form-item label="汇款金额:">
                          <strong class="color" style="font-size:20px;">￥{{item.orderVo.order_prepay | toFixed(2)}}</strong>
                      </el-form-item>
                  </el-form>
                  <div class="desc">
                      <p class="tishi">温馨提示:</p>
                      <p><label for="">汇款方式：</label> <span> 1. 通过专属帐号进行线下汇款充值 > 2. 然后在此处上传汇款凭证</span> </p>
                      <p><label for="">查看结果：</label><span>平台审核结果会以短信或者微信公众号推送给您</span></p>
                      <P><label for="">开户银行：</label> <span>招商银行上地支行</span> </p>
                      <P><label for="">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：</label><span>110 906 335 410 201</span> </P>
                  </div>
              </div>
          </div>
          <div slot="footer" class="dialog-footer fr">
              <!-- <el-button @click="showDialog = false">取 消</el-button>
              <el-button type="primary" @click="submitBankPayNumberbtn">提 交</el-button> -->
          </div>
      </SetTankuang>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { TimeForma } from "@/lib/utils";
import Countdown from "_c/Countdown";
import { baseURL, baseURL2 } from "@/config";
import { axios, buyerOrderCenter } from "@/api/apiObj";
export default {
  name: "BuyerOrderItem",
  data() {
    return {
      //付款方式
      payTypeMark: {
        1: {
          imgurl: require("@/assets/image/ShoppingCart/wechat.jpg"),
          title: "微信支付"
        },
        2: {
          imgurl: require("@/assets/image/ShoppingCart/zhifubao.jpg"),
          title: "支付宝支付"
        },
        3: {
          imgurl: require("@/assets/image/ShoppingCart/bank.png"),
          title: "银行汇款"
        },
        4: {
          imgurl: require("@/assets/image/ShoppingCart/yue.png"),
          title: "白条支付"
        }
      },
      downloadUrl2: "",
      //取消订单需要的传参
      cancleOrderForm: {},
      BuyerOrderDetaileList: [],
      OrderProcessList: [],
      flag: false,
      order_no: "",
      // 取消提示
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
        //确认收货
        confirmRecieveGoodsId:"",
      // 下载合同的连接
      dialogContractFlag: false,
      downloadContracturl: "",
      orderStatus: true,
      // 需要支付付二维码
      payCodeImgUrl: "",
      // 支付二维码的模态框
      dialogCode: false,
      // 刷新二维码的flag
      InvalidFlag: false,
      // 当前支付的状态
      currentStatus: 0,
      //物流列表
      expressList: [],
      currentSecondOrder: {},
      dialogImageUrl: "",
      imgDialogVisible: false,
        payType:1,
        selectedPayType:false,
        showDialog:false,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Countdown
  },
  methods: {
    ...mapActions("BuyerOrderManagement", [
      "GetBuyerOrderDetaileList",
      "GetBuyerOrderOrderProcess",
      "GetBuyerOrdervipPay",
      "CancleOrderSubmit",
      "queryExpress"
    ]),
      closeDialogCallBack(){
          this.showDialog=false
      },
      handleAvatarSuccess(res, file) {
          if(res.resultCode =='200'){
              this.$message({
                  type:'success',
                  message:'上传成功，等待审核'
              })
              this.showDialog=false;
              this.$parent.all();
            //  this.$router.push("/PersonalCenter/BuyerOrderManagement")
          }
      },
      submitpayType(){
            if(this.payType==1){
                this.showDialog=true;
            }else if(this.payType==2){
                this.$router.push({
                    path: "/ShoppingCart/PaymentOrders",
                    query: {
                        // payType: x,
                        // totalPrice: totalPrice,
                        orderNumber: this.item.orderVo.order_no
                    }
                });
            }
            this.selectedPayType=false;
      },
    //确认交期的操作
    confirmChangeDiliverTime(item) {
      this.currentSecondOrder = item;
      this.dialogVisible = true;
    },
    isAcceptNewTime(isconfirm) {
      let obj = {
        id: this.currentSecondOrder.id,
        uid: this.currentSecondOrder.uid,
        isconfirm: isconfirm,
        order_no: this.currentSecondOrder.order_no,
        goods_name: this.currentSecondOrder.goods_name
      };
      axios
        .request({ ...buyerOrderCenter.confirmChangeDiliverTime, params: obj })
        .then(res => {
       
          if (res.resultCode == "200") {
            this.dialogVisible = false;
            this.$emit("successFlagHandel");
          }
        });
    },
    //预览下载合同
    downLoadOrderContract(contractUrl) {
      this.dialogContractFlag = true;
      let ret =
        baseURL +
        "api-order/customerCenter/downLoad?urls=" +
        contractUrl +
        "&access_token=" +
        this.access_token;
 
      // this.downloadUrl3 = ret;
      let res =
        baseURL2 + "static/pdf/web/viewer.html?file=" + encodeURIComponent(ret);
   
      this.downloadUrl2 = res;
    },
    getDiliverInfo(orderId) {
    
      this.queryExpress({ orderId }).then(res => {
      
        this.expressList = res.data;
      });
    },
    countDownE_cb: function(item) {
      item.sellStatus = 2;
    },
    // 支付的轮训
    paymentHandle() {
      this.InvalidFlag = false;
      let obj = {
        message_id: this.item.orderVo.order_no,
        access_token: this.access_token,
        type: this.currentStatus
      };
      console.log(obj);
      this.$store
        .dispatch("SignContract/GetWeChatPay", obj)
        .then(codeResp => {
          console.log(codeResp);
          this.dialogCode = true;
          this.payCodeImgUrl = codeResp.prepay_id;
          let count = 0;
          // 拿到二维码之后进行轮训获取支付状态
          let timep = setInterval(() => {
            count++;
            if (count === 40) {
              clearInterval(timep);
              this.InvalidFlag = true;
            } else {
              this.InvalidFlag = false;
              this.$store
                .dispatch("SignContract/GetPayStatus", {
                  orderno: this.item.orderVo.order_no,
                  messageid: codeResp.flag,
                  access_token: this.access_token
                })
                .then(statusResp => {
                  console.log(statusResp);
                  // 如果支付状态是1，支付成功
                  if (statusResp === 1) {
                    clearInterval(timep);
                    this.$message({
                      type: "success",
                      message: "支付成功!"
                    });
                    this.$router.go(0);
                  }
                });
            }
          }, 3000);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    // 点击付款
    payment(x) {
      this.currentStatus = x;
      // this.paymentHandle();
      let totalPrice = 0;
      switch (x) {
        case 0:
          totalPrice = this.item.order_prepay;
          break;
        case 1:
          totalPrice = this.item.order_amount - this.item.order_prepay;
          break;
        case 2:
          totalPrice = this.item.order_amount;
          break;
      }
        this.selectedPayType=true;

    },
    // 月结的付款
    vipPayment() {
      this.$confirm("是否要支付此订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.GetBuyerOrdervipPay({
            orderNo: this.item.orderVo.order_no,
            access_token: this.access_token
          }).then(res => {
            this.$message({
              type: "success",
              message: "支付成功"
            });
            this.$emit("successFlagHandel");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    all() {
      this.$loading(this.$store.state.loading);
      this.GetBuyerOrderDetaileList({
        access_token: this.access_token,
        order_no: this.item.orderVo.order_no
      }).then(res => {
        this.BuyerOrderDetaileList = res.data.data;
        this.$loading(this.$store.state.loading).close();
      });
    },
    DetailList(item) {
      this.flag = !this.flag;
      if (this.flag) {
        this.order_no = item.orderVo.order_no;
        // this.all();
      }
    },
    // 上传合同成功的函数
    uploadSuccess(response, file, fileList) {
        console.log("shangchuan")
      this.$message({
        type: "success",
        message: "上传成功"
      });
      this.$parent.all();
      // this.$emit("successFlagHandel");
    },
    // 上传合同之前的验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "application/pdf";
      if (!isJPG) {
        this.$message.error("上传合同只能是 pdf格式!");
      }
      return isJPG;
    },
    countDownS_cb: function(item) {
      this.orderStatus = true;
    },
    countDownE_cb: function(item) {
      this.orderStatus = false;
    },
    // 确认接收交期
    comfirmaDelivery() {
      console.log("确认接收交期");
    },
    //取消订单
    cancleOrder(type, orderId) {
      //type==1,标识大订单，type==2,标识小订单
      this.dialogVisible2 = true;
      this.cancleOrderForm.flag = type == 1 ? true : false;
      this.cancleOrderForm.orderId = orderId;
    },
    // 确认取消订单并提交
    DeliveryCancel() {
      this.CancleOrderSubmit({
        access_token: this.access_token,
        reason: this.cancleOrderForm.reason,
        orderId: this.cancleOrderForm.orderId,
        flag: this.cancleOrderForm.flag
      }).then(res => {
        this.dialogVisible2 = false;
        this.$emit("successFlagHandel");
      });
    },
      confirmRecieveGoods(id){
        this.confirmRecieveGoodsId=id;
        this.dialogVisible3=true;
      },
    // 确认收货
    ConfirmReceipt() {
      axios.request({...buyerOrderCenter.confirmRecieveGoods,params:{
          orderId:this.confirmRecieveGoodsId
          }}).then(res=>{
          if(res){
              this.dialogVisible3=false;
              this.$emit("successFlagHandel");
          }
      })
    },
    showPopover(item) {
      this.GetBuyerOrderOrderProcess({
        orderno: item.orderVo.order_no,
        access_token: this.access_token
      }).then(res => {
        this.OrderProcessList = res.data;
        this.OrderProcessList.map(item => {
          return (item.createtime = TimeForma(item.createtime));
        });
      });
    },
    // 展开示例图图片
    PrvExampleDiagram(src) {
      this.dialogImageUrl = src;
      this.imgDialogVisible = true;
    }
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    },
      requestUrl() {
          return (
              baseURL +
              `api-order/customerCenter/uploadBankTransferNo?access_token=${this.access_token}&orderNo=${this.item.orderVo.order_no}`
          );
      },
    // 上传文件的地址
    uploadUrl() {
      return `${baseURL}api-order/customerCenter/uploadOrderContract`;
    },
    // 上传合同的参数
    uploadObj() {
      return {
        orderno: this.item.orderVo.order_no,
        access_token: this.access_token
      };
    }
  },
  filters: {
    toFixed(val,length){
        return Number(val).toFixed(length)
    },
    tagfilter(val) {
      console.log("tagfilter:", val);
      switch (Number(val)) {
        case 1:
          return "原厂";
        case 2:
          return "代理商";
        case 3:
          return "普通商户";
      }
    },
    payStatus(val) {
      switch (val) {
        case 0:
          return "未支付";
        case 1:
          return "已支付";
        case 2:
          return "取消中";
        case 3:
          return "已取消";
        case 4:
          return "已完成";
        // case 5:
        //   return "预付款已付款";
        case 5:
          return "待付尾款";
        case 13:
          return "已逾期";
      }
    },
    pay_channel(x) {
      switch (x) {
        case 0:
          return "未支付";
          break;
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
    formatDate(value) {
      return TimeForma(value);
    },
    countdown(x, y) {
      return x + y;
    }
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
@import "./BuyerOrderItem.less";
</style>
<style scoped>
.orderpress >>> .el-timeline {
  max-height: 400px;
  overflow-y: scroll;
}
.cancleorder >>> .ensure {
  padding: 4px 14px;
  margin-right: 15px;
  border-radius: 5px;
  border: 1px solid #4a5a6a;
  cursor: pointer;
}
.cancleorder >>> .ensure:hover {
  color: peru;
  font-weight: bolder;
  transition: all 0.2s;
}
.cancleorder >>> .close {
  background: #4a5a6a;
  color: #fff;
  padding: 4px 14px;
  margin-right: 15px;
  border-radius: 5px;
  cursor: pointer;
}
.cancleorder >>> .close:hover {
  color: peru;
  font-weight: bolder;
  transition: all 0.2s;
}
.box-con >>> .el-upload-list--text {
    position: absolute;
    top: 25px;
    width: 180%;
    left: -90%;
    background:#fff;
    color:#df3f2f;
    li{
        line-height: 20px;
        margin:0;
        a{
            font-size:12px;
        }
    }
}
</style>

