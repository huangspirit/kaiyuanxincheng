<template>
  <div style="position:relative;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>买家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item class="itemActive">我的订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="BuyerOrderManagement">
      <!-- 订单列表 -->
      <div class="tab-list">
        <!-- 一级切换 -->
        <div class="tab-list-t clear">
          <ul class="fl">
            <li
              v-for="item in tabFirstList"
              :key="item.id"
              :class="{bgColor:tabFirstFlag === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>
          <el-select
            class="all-time fl"
            @change="getOrderList(orderDate)"
            v-model="orderDate"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- 二级切换 -->
        <div class="tab-list-b">
          <ul>
            <li v-if="tabFirstFlag === 0">
              <span
                v-for="(item,index) in subWaitPay"
                :key="index"
                :class="item.show==true?'color':''"
                @click="getsubWait(item,index)"
              >{{item.name}}</span>
            </li>
            <li v-if="tabFirstFlag === 1">
              <span
                v-for="(item,index) in subConfirm"
                :key="index"
                :class="item.show==true?'color':''"
                @click="getSubConfirm(item,index)"
              >{{item.name}}</span>
            </li>
            <li v-if="tabFirstFlag === 4">
              <span
                v-for="(item,index) in abnormalData"
                :class="item.show==true?'color':''"
                :key="index"
                @click="subAbnormal(item,index)"
              >{{item.name}}</span>
            </li>
          </ul>
        </div>
        <!-- 列表的内容 -->
        <div class="tab-list-con">
            <table class="table">
                <thead>
                    <tr>
                        <th colspan="3">采购器件明细</th>
                        <th>订单状态</th>
                        <th>合同状态</th>
                        <th>订单金额</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item in BuyerOrderList">
                        <tr :key="item.id" class="title">
                            <td colspan="7" >
                                <span class="">订单编号：{{item.orderVo.order_no}}</span>
                                <span>下单日期：{{item.orderCreateTime | formatDate}}</span>
                                <span>收货人：{{item.orderVo.receivingName}} {{item.orderVo.phone}}</span>
                                <span>{{item.orderVo.isMonth?'月结订单':'普通订单'}}</span>
                            </td>
                        </tr>
                        <tr v-for="(item1,index) in item.orderInfoList" :key="item1.id">
                            <td class="goodsinfo">
                                <div style="display:inline-flex;">
                                    <ImgE :src="item1.goods_image" :w="40" :H="40"></ImgE>
                                    <span style="display:inline-flex;flex-direction: column;justify-content: space-around ">
                                        <label for="" >{{item1.goods_name}}</label><br>
                                        <span>{{item1.goods_desc}}</span>
                                    </span>
                                </div>
                            </td>
                            <td class="" style="white-space:nowrap;">
                                x{{item1.goods_count}}<br>
                                <strong v-if="!item1.goods_type">预计于{{item1.complete_date | formatDate}}</strong>
                                <strong v-if="item1.goods_type">现货</strong>
                                <br>
                                <span>{{item1.diliver_place}}交货</span>
                            </td>
                            <td class="">
                                 <div class="operaBtn">
                                    <div v-if="item1.reason" class="cancleReason">取消原因：{{item1.reason}}</div>
                                    <div class="wrapbtn">
                                        <a href="javascript:;"
                                            v-if="item1.confirmChangeDiliverTimeButton"
                                            @click="confirmChangeDiliverTime(item1)"
                                        >确认新交期</a>
                                        <a href="javascript:;"
                                            v-if="item1.cancleButton"
                                            size="mini"
                                            @click="cancleOrder(2,item1.id)"
                                        >移除商品</a>
                                        <a href="javascript:;"
                                            @click="confirmRecieveGoods(item1.id)"
                                            v-if="item1.receivingGoodsButton"
                                        >确认收货</a><br>
                                        <a href="javascript:;"
                                        @click="payfinal(item,item1)"
                                            v-if="item1.payFinalButton"
                                        >去付尾款</a>
                                    </div>
                                </div>
                                <div v-if="item1.expireTime" class="counttimewrap">
                                
                                    <CountTime
                                    class="CountTime"
                                    v-on:end_callback="countDownE_cb()"
                                    :currentTime="item1.currentTime"
                                    :startTime="item1.currentTime"
                                    :endTime="item1.expireTime"
                                    :tipText="'距离开始文字1'"
                                    :tipTextEnd="''"
                                    :endText="'订单已失效'"
                                    :dayTxt="'天'"
                                    :hourTxt="'时'"
                                    :minutesTxt="'分'"
                                    :secondsTxt="'秒'"
                                    ></CountTime>
                                </div>
                            </td>
                            <template v-if="index==0">  
                                <td  :rowspan="item.orderInfoList.length" class="border_right">
                                    {{item.orderVo.orderStatesDesc}}<br>
                                    <!-- <router-link   @click.native="storageItem(item)" 
                                        :to="{path:'/PersonalCenter/buyerOrderDetail'}"
                                    >订单详情</router-link> -->
                                </td>
                                <td  :rowspan="item.orderInfoList.length" class="border_right hetong" >
                                        <p>{{item.orderVo.download?'合同未上传':'合同已上传'}}</p>
                                        <a href="javascript:;" @click="downLoadOrderContract(item.orderVo.contractUrl)"  v-if="item.orderVo.download">下载合同</a>
                                    <el-upload
                                        class="upload-demo-uploadContract"
                                        :action="uploadUrl"
                                        :limit="1"
                                        :data="{
                                             orderno: item.orderVo.order_no,
                                            access_token: access_token
                                        }"
                                        :on-success="uploadSuccess"
                                        :before-upload="beforeAvatarUpload"
                                        style="margin-bottom:10px;position: relative"
                                        v-if="item.orderVo.order_status !== 11 && item.orderVo.download"
                                    >
                                        <a href="javascript:;">
                                            上传合同
                                        </a>
                                    </el-upload>          
                                </td>
                                <td  :rowspan="item.orderInfoList.length" class="border_right">
                                    <p>订单金额：￥{{item.orderVo.order_amount}}</p>
                                    <p v-if="item.orderVo.order_prepay">当前应付款：￥{{item.orderVo.order_prepay}}</p>
                                    <div class="">
                                        <a href="javascript:;" @click="payment(0,item)" v-if="item.orderVo.prePayButton">去付定金</a>
                                        <!-- <a href="javascript:;" @click="payment(1,item)" v-if="item.orderVo.finalPayButton">去付尾款</a> -->
                                        <a href="javascript:;"  @click="vipPayment(item)" v-if="item.orderVo.isMonth && item.orderVo.payButton">全额付款</a>
                                        <a href="javascript:;"  @click="payment(2,item)" v-if="!item.orderVo.isMonth && !item.orderVo.need_pre_pay && item.orderVo.payButton">全额付款</a>
                                       
                                    </div>           
                                </td>
                                <td  :rowspan="item.orderInfoList.length" class="border_right">
                                        <router-link   @click.native="storageItem(item)" 
                                        :to="{path:'/PersonalCenter/buyerOrderDetail'}"
                                    >订单详情</router-link><br>
                                    <a href="javascript:;"  @click="cancleOrder(1,item.orderVo.id)" v-if="item.orderVo.cancelButton">取消订单</a>
                                </td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
      </div>
      <Pagination
        v-if="BuyerOrderManagementTotal"
        :currentPage.sync="currentPage"
        :page-size="pageSize"
        :total="BuyerOrderManagementTotal"
        @current-change="handleCurrentPageChange"
      ></Pagination>
    </div>
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
                 <el-button @click="payType=1" :class="{bgColor:payType==1}" class="btn">对公转账</el-button>
                 <el-button  @click="payType=2" :class="{bgColor:payType==2}" class="btn">在线支付</el-button>
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
      </SetTankuang>
         <SetTankuang :title="'银行汇款'" v-if="showDialoglittle" @closeDialogCallBack="closeDialogCallBack">
          <div class="dialog-body" slot="dialog-body">
              <div class="RemittancNotes">
                  <el-form  label-width="80px">
                      <el-form-item label="汇款凭证:">
                          <!-- <el-input v-model="bankPayNumber" placeholder="请仔细填写银行汇款编号" type="text"></el-input> -->
                          <el-upload
                              class="upload-demo"
                              ref="upload"
                              :limit="1"
                              :action="requestUrllittle"
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
      </SetTankuang>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import BuyerOrderItem from "_c/BuyerOrderItem";
import {axios,buyerOrderCenter} from "../../../api/apiObj";
import { TimeForma,TimeForma2 } from "@/lib/utils";
import { baseURL, baseURL2 } from "@/config";
export default {
  name: "BuyerOrderManagement",
  data() {
    return {
      // 一级分类列表
      tabFirstList: [
        {
          id: "",
          params: "",
          name: "全部"
        },
        {
          id: 0,
          params: "2",
          name: "待付款"
        },
        {
          id: 1,
          params: "3",
          name: "待确认"
        },
        {
          id: 2,
          params: "4",
          name: "待收货"
        },
        {
          id: 3,
          params: "5",
          name: "已完成"
        },
        {
          id: 4,
          params: "6",
          name: "违规/异常"
        }
      ],
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "7",
          label: "近一周"
        },
        {
          value: "30",
          label: "近一月"
        },
        {
          value: "90",
          label: "近三月"
        },
        {
          value: "180",
          label: "近半年"
        }
      ],
      subWaitPay: [
        {
          name: "新订单",
          params: "2.1",
          show: false
        },
        {
          name: "待付尾款",
          params: "2.2",
          show: false
        },
        {
          name: "到期未付",
          params: "2.3",
          show: false
        },
        {
          name: "月结",
          params: "2.4",
          show: false
        }
      ],
      subConfirm: [
        {
          name: "交期变更确认",
          params: "3.1",
          show: false
        },
        {
          name: "合同被驳回",
          params: "3.2",
          show: false
        },
        {
          name: "待上传合同",
          params: "3.3",
          show: false
        },
        {
          name: "合同待确认",
          params: "3.4",
          show: false
        },
        {
          name: "汇款单待确认",
          params: "3.5",
          show: false
        },
        {
          name: "汇款单待驳回",
          params: "3.6",
          show: false
        }
      ],
      abnormalData: [
        {
          name: "已取消",
          params: "6.1",
          show: false
        },
        {
          name: "失效订单",
          params: "6.2",
          show: false
        }
      ],
      orderDate: "",
      tabFirstFlag: "",
      orderParams: {},
      currentPage: 1,
      pageSize: 10,
      SearchInputValue: "",
        BuyerOrderList:[],
        BuyerOrderManagementTotal:0,
          orderInfoList:{},
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
      showDialoglittle:false,
      //选中的当前订单
      item:{
          orderVo:{}
      },
      //小订单的ID
      litleorderId:0,
    };
  },
  components: {
    BuyerOrderItem
  },

  watch: {
    currentPage() {
      // this.all();
    }
  },
  methods: {
     ...mapActions("BuyerOrderManagement", [
         "GetBuyerOrderManagement",
        "GetBuyerOrderDetaileList",
        "GetBuyerOrderOrderProcess",
        "GetBuyerOrdervipPay",
        "CancleOrderSubmit",
        "queryExpress"
    ]),
   
    //付款事件
     closeDialogCallBack(){
          this.showDialog=false
          this.showDialoglittle=false;
      },
      handleAvatarSuccess(res, file) {
          if(res.resultCode =='200'){
              this.$message({
                  type:'success',
                  message:'上传成功，等待审核'
              })
              console.log("shenpi")
              this.showDialog=false;
              this.showDialoglittle=false;
              this.all();
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
      //订单详情跳转
    storageItem(item){
          localStorage.setItem("buyerOrderDetail",JSON.stringify(item))
    },
    handleCurrentPageChange(x) {
      this.currentPage = x;
      this.all();
    },
    tabFirst(item) {
      this.tabFirstFlag = item.id;
      this.currentPage = 1;
      if (this.orderDate) {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: item.params,
          day: this.orderDate
        };
      } else {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: item.params
        };
      }
      this.all();
    },
    getsubWait(val, index) {
      for (var i = 0; i < this.subWaitPay.length; i++) {
        this.subWaitPay[i].show = false;
      }
      this.subWaitPay[index].show = true;
      if (this.orderDate) {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params,
          day: this.orderDate
        };
      } else {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params
        };
      }

      this.all();
    },
    getSubConfirm(val, index) {
      for (var i = 0; i < this.subConfirm.length; i++) {
        this.subConfirm[i].show = false;
      }
      this.subConfirm[index].show = true;

      if (this.orderDate) {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params,
          day: this.orderDate
        };
      } else {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params
        };
      }
      this.all();
    },
    subAbnormal(val, index) {
      for (var i = 0; i < this.abnormalData.length; i++) {
        this.abnormalData[i].show = false;
      }
      this.abnormalData[index].show = true;

      if (this.orderDate) {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params,
          day: this.orderDate
        };
      } else {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params
        };
      }
      this.all();
    },
    getOrderList(val) {
      this.orderParams["day"] = val;
      this.all();
    },
    all() {
        axios.request({...buyerOrderCenter.queryOrderPersonal,params:this.orderParams}).then(res=>{
            if(res){
                this.BuyerOrderList=res.data.data;
                this.BuyerOrderManagementTotal=res.data.total
            }
        })
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
    //去付子订单的尾款
     payfinal(item,item1){
         //需要获取尾款的金额
         console.log(item1)
        this.showDialoglittle=true;
        this.item=item;
        this.litleorderId=item1.id
    },
    // 点击付款
    payment(x,item) {
        this.item=item
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
    vipPayment(item) {
        this.item=item;
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
    // 上传合同成功的函数
    uploadSuccess(response, file, fileList) {
      this.$message({
        type: "success",
        message: "上传成功"
      });
      this.all()
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
        this.all();
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
  },
  computed: {
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    
    access_token() {
      return sessionStorage.getItem("access_token");
    },
      requestUrl() {
          return (
              baseURL +
              `api-order/customerCenter/uploadBankTransferNo?access_token=${this.access_token}&orderNo=${this.item.orderVo.order_no}`
          );
      },
       requestUrllittle() {
          return (
              baseURL +
              `api-order/customerCenter/uploadBankTransferNo?access_token=${this.access_token}&orderNo=${this.item.orderVo.order_no}&orderId=${this.litleorderId}`
          );
      },
    // 上传文件的地址
    uploadUrl() {
      return `${baseURL}api-order/customerCenter/uploadOrderContract`;
    },
  },
  mounted() {
    
    if (this.$route.query.code == "success") {
      let path = this.$route.path;
      this.$message.success("订单支付成功");
      this.$router.push({
        path: path
      });
    }
    this.orderParams = {
      start: this.start,
      length: this.pageSize
    };
    this.all();
  },
  filters:{
      formatDate(val){
          return TimeForma(val)
      },
      formatDate2(val){
          return TimeForma2(val)
      }
  }
};
</script>
<style lang="less" scoped>
@import "./buyerOrder.less";
</style>

