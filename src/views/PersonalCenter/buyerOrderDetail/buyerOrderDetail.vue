<template>
<div>
    <div  class="buyerOrderDetail">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                 <el-breadcrumb-item :to="{ path: '/PersonalCenter/BuyerOrderManagement' }">我的订单</el-breadcrumb-item>
                <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="content">
                <div class="step clear">
                    <div class="left">
                        <p class="">订单号：{{item.orderVo.order_no}}</p>
                        <p class="icon" v-if="item.orderVo.order_status==4">
                            <i class="el-icon-success"></i><br><br>
                            <span >{{item.orderVo.orderStatesDesc}}</span>
                        </p>
                        <p class="icon" v-if="item.orderVo.order_status!=4" style="color:#999;">
                            <i class="el-icon-warning"></i><br><br>
                            <span>{{item.orderVo.orderStatesDesc}}</span>
                        </p>
                    </div>
                    <div class="right" v-if="OrderProcessList.length">
                        <p>当前订单状态</p>
                        <div class="wrap">
                            <ul class="clear" :style="'width:'+OrderProcessList.length*200+'px'">
                                <li v-for="item in OrderProcessList" :key="item.id" class="fl">
                                    <p>{{item.createtime | formatDate2}}</p>
                                    <p class="mark">
                                        <span class="dot"></span>
                                        <span class="line"></span>
                                    </p>
                                    <p class="desc">
                                    {{item.ordesc}}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <ul>
                        <li class="item">
                            <div class="title">收货信息</div>
                            <div class="center">
                                <p>收货人：{{item.orderVo.receivingName}}</p>
                                <p>地址：{{item.orderVo.address}}{{item.orderVo.detailedAddress}}</p>
                                <p>手机号：{{item.orderVo.phone}}</p>
                            </div>
                            <div></div>
                        </li>
                        <li class="item">
                             <div class="title">合同签署</div>
                             <div class="center">
                                 <p>用户类型：{{item.orderVo.userType}}</p>
                                 <p>订单类型：{{item.orderVo.isMonth?'月结订单':'普通订单'}}</p>
                                 <p v-if="item.orderVo.userCheckDay">月结白条周期：{{item.orderVo.userCheckDay}}天</p>
                                 <p>订单状态：{{item.orderVo.orderStatesDesc}}</p>
                             </div>
                             <div  style="display:flex;">
                                 <div style="margin-right:10px;">
                                    <el-button  @click="downLoadOrderContract(item.orderVo.contractUrl)" size="mini">
                                        下载合同
                                    </el-button>
                                 </div>
                                <el-upload
                                    class="upload-demo-uploadContract"
                                    :action="uploadUrl"
                                    :limit="1"
                                    :data="uploadObj"
                                    :on-success="uploadSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    v-if="item.orderVo.order_status !== 11 && item.orderVo.download"
                                >
                                    <el-button size="mini">
                                        上传合同
                                    </el-button>
                                </el-upload>
                             </div>
                        </li>
                        <li class="item">
                             <div class="title">发票信息</div>
                             <div class="center">
                                 <p class="">发票类型：{{item.orderVo.billType}}</p>
                                 <p class="">单位名称：{{item.orderVo.danweiName}}</p>
                                 <p>纳税人识别号：{{item.orderVo.nashuirenNo}}</p>
                                 <p>开户行：{{item.orderVo.bandType}}</p>
                                 <p>账号：{{item.orderVo.bandNum}}</p>
                                 <p>地址（电话）：{{item.orderVo.billAdress}}&nbsp;&nbsp;{{item.orderVo.billPhone}}</p>
                             </div>
                        </li>
                        <li class="item">
                             <div class="title">付款方式/明细</div>
                             <div class="center">
                                 <p v-if="item.orderVo.need_pre_pay && !item.orderVo.prePayButton && item.orderVo.prePayChannel">
                                     <strong>预付款：￥{{item.orderVo.order_prepay}} （{{payTypeMark[item.orderVo.prePayChannel].title}}）</strong><br>
                                      <span v-if="item.orderVo.prePayChannel == 3">凭证：</span>
                                    <img
                                        v-if="item.orderVo.prePayChannel == 3"
                                        @click="PrvExampleDiagram(item.orderVo.firtPayNo)"
                                        :src="item.orderVo.firtPayNo + '?imageView2/2/w/80/h/46'"
                                    />
                                    <strong v-if="item.orderVo.prePayChannel != 3">付款编号：</strong>
                                    <span v-if="item.orderVo.prePayChannel != 3">{{item.orderVo.firtPayNo}}</span><br>
                                    <span> 时间：{{item.orderVo.prePayTime | formatDate2}}</span>
                                 </p>
                                 <p v-else-if="item.orderVo.prePayChannel">
                                      <strong>全额付款：￥{{item.orderVo.order_amount}} （{{payTypeMark[item.orderVo.prePayChannel].title}}）</strong><br>
                                      <span v-if="item.orderVo.prePayChannel == 3">凭证：</span>
                                    <img
                                        v-if="item.orderVo.prePayChannel == 3"
                                        @click="PrvExampleDiagram(item.orderVo.firtPayNo)"
                                        :src="item.orderVo.firtPayNo + '?imageView2/2/w/80/h/46'"
                                    />
                                    <strong v-if="item.orderVo.prePayChannel != 3">付款编号：</strong>
                                    <span v-if="item.orderVo.prePayChannel != 3">{{item.orderVo.firtPayNo}}</span><br>
                                   
                                      <span>时间：{{item.orderVo.prePayTime | formatDate2}}</span>
                                 </p>
                             </div>
                        </li>
                        
                    </ul>
                </div>
                <div class="list clear">
                    <div class="title">采购清单</div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>供应商</th>
                                <th>器件信息</th>
                                <th>单价</th>
                                <th>数量</th>
                                <th>金额</th>
                               
                                <th>物流信息</th>
                                <th>关税</th>
                                <th>预计交货时间地点</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template  v-for="item in orderInfoList">
                                <div :key="item.id"></div>
                                <tr v-for="(value,index) in item.list" :key="value.id">
                                    <td :rowspan="item.list.length" v-if="index==0" style="border-right:1px solid #ddd;">
                                        <img :src="value.headImgUrl" alt="" class="userimage">
                                        {{value.username}}
                                    </td>
                                    <td>
                                        <div class="gpoodsinfo">
                                            <ImgE :src="value.goods_image" :W="50" :H="50"></ImgE>
                                            <div>
                                                <router-link class="color" :to="{
                                                    path:'/sellerGoodsDetail',
                                                    query:{
                                                        seller_goods_id:value.seckill_goods_id
                                                    }
                                                    }">
                                                    {{value.goods_name}}
                                                    </router-link>
                                                   <p>
                                                       <router-link :to="{
                                                    path:'/BrandDetail',
                                                    query:{
                                                        name:value.goods_brand,
                                                        documentid:value.goods_brand_id,
                                                        tag:'brand'
                                                    }
                                                    }">{{value.goods_brand}}</router-link>
                                                       </p> 
                                                <!-- <p class="name">{{value.goods_name}}</p> -->
                                                <p>{{value.goods_desc}}</p>
                                            </div>
                                        </div>
                                        </td>
                                    <td>
                                       <p v-if="value.good_price"> {{value.priceunit?'$':'￥'}}{{value.good_price | toFixed(value.priceunit?3:2)}}
                                           <!-- <br><strong>({{value.priceunit ? '不含税' : '含13%增值税'}})</strong> -->
                                       </p>
                                    </td>
                                    <td>{{value.goods_count}}</td>
                                    <td>{{value.priceunit?'$':'￥'}}{{value.total_price | toFixed(value.priceunit?3:2)}}</td>
                                    <!-- <td class="rcf ">
                                         <p><strong>￥{{value.pre_pay  | toFixed(2)}}</strong></p>
                                       <p v-if="value.pay_channel">
                                           <span >{{payTypeMark[value.pay_channel].title}}:</span> 
                                           <img :src="imgBaseUrl+value.payno" alt="" v-if="value.pay_channel==3" class="paynoImg" @click="PrvExampleDiagram(imgBaseUrl+value.payno)">
                                           <span v-if="value.pay_channel!=3">{{value.payno}}</span>
                                        </p> 
                                        <p v-else>等待支付</p>
                                       <span>{{value.update_time | formatDate2}}</span>
                                       
                                    </td> -->
                                    <td>
                                        <div v-if="value.trans_no">
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
                                    <p v-else>暂无物流信息</p>
                                    </td>
                                    <td>￥{{value.guanshui}}</td>
                                    <td>
                                        <p>{{value.complete_date | formatDate}}</p>
                                         <p>{{value.diliver_place}}</p>
                                         <p>{{value.order_status | filtersStatus}}</p>
                                    </td>
                                    <td class="btn">
                                        <p v-if="value.confirmChangeDiliverTimeButton"><el-button size="mini" 
                                                @click="confirmChangeDiliverTime(value)">确认新交期</el-button></p>
                                        <p v-if="value.cancleButton"> <el-button size="mini"  
                                                @click="cancleOrder(2,value)">取消商品</el-button></p>
                                        <p v-if="value.receivingGoodsButton">
                                             <el-button size="mini" @click="confirmRecieveGoods(value.id)"
                                                >确认收货</el-button>
                                        </p>
                                         <div v-if="value.reason" class="cancleReason">取消原因：{{value.reason}}</div>
                                    </td>
                                </tr>
                            </template>
                            
                        </tbody>
                    </table>
                    <div class="fr total">
                        <p class=""><strong class="">人民币</strong>共{{countObj.renCount}}种器件，金额小计：<span class="right">{{countObj.ren | toFixed(2)}}</span></p>
                         <p class=""><strong class="">美元</strong>共{{countObj.usdCount}}种器件，金额小计：<span class="right">US${{countObj.usd | toFixed(3)}}</span></p>
                         <P>今日美元汇率牌价：<span class="right">{{item.orderVo.today_exchange}}</span></P>
                         <P>海关增值税13%：<span class="right">{{item.orderVo.order_bill | toFixed(2)}}</span></P>
                         <P>关税：<span class="right">￥{{item.orderVo.guanshui_total | toFixed(2)}}</span></P>
                         <P>清关服务费：<span class="right">￥{{item.orderVo.guanshui_service | toFixed(2)}}</span></P>
                    </div>
                     <div class="footer" v-if="item.orderVo.order_status!=3">订单总额：<label>￥{{item.orderVo.order_amount | toFixed(2)}}</label></div>
                     <div class="footer" v-if="item.orderVo.order_status==3"><label for="">订单已取消</label></div>
                </div>
            </div>
            
        </div>
        <SetTankuang :title="'更新交期提示'" v-if="dialogVisible" @closeDialogCallBack="dialogVisible=false">
            <div class="dialog-body" slot="dialog-body" style="line-height:30px;">
                <p>
                卖家将此商品的交期更新为
                <strong style>{{currentSecondOrder.complete_date | formatDate}}</strong>
                </p>
                <p>接受后无法撤销订单，如未付尾款请务必在新交期前支付尾款</p>
                <p>若拒绝接收新交期，请在订单中心取消商品</p>
            </div>
            <div slot="footer" class="dialog-footer AcceptNewTime" style="text-align:center;margin-top:20px;" >
            
                <el-button type="info"  @click="isAcceptNewTime(2)" size="mini">拒绝新交期</el-button>
                <el-button @click="dialogVisible = false" size="mini" type="info" >关 闭</el-button>
                <el-button type="primary"  @click="isAcceptNewTime(1)" size="mini">确认，接受新交期</el-button>
                <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>  -->
            </div>
            </SetTankuang>
          <el-dialog
            center
            :visible.sync="dialogVisible2"
            width="500px"
            class="cancleorder"
            top="20vh"
            lock-scroll
            >
            <p slot="title" class="title">取消订单</p>
            <div class="cancleOrderReason">
                <div class="reason">
                    <el-input v-model="cancleOrderForm.reason" placeholder="取消订单的原因" @mouseenter="showcanclereasonList=true"></el-input>
                    <ul class="list" v-show="showcanclereasonList">
                    <li  v-for="item in cancleReason" :key="item.value" @click="ensurecanclereason(item.label)">{{item.value}}</li>
                    <!-- <li class="zidingyi">
                        <el-input v-model="canclereason" placeholder="自定义取消订单的原因">
                            <el-button slot="append" @click="ensurecanclereason(canclereason)">确定</el-button>
                        </el-input>
                    
                    </li> -->
                    </ul>
                </div>
                <!-- <el-input type="textarea" v-model="cancleOrderForm.reason" placeholder="请填写取消订单的原因"></el-input> -->
                <p class="desc">取消后该订单无法恢复</p>
                <p class="desc">
                取消后已支付订单款项会在下一个结账日按原路返回
                结账日为每月15日
                </p>
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
               <el-dialog :visible.sync="imgDialogVisible">
                <img width="100%;" :src="dialogImageUrl" alt />
            </el-dialog>
              <SetTankuang :title="'取消订单条件'" v-if="showDialogcancle" @closeDialogCallBack="closeDialogCallBack">
          <div class="dialog-body" slot="dialog-body">
              <div class="RemittancNotes">
                <div class="color" style="text-align:center;margin-bottom:10px;font-weight:bolder;font-size:16px">{{cancleOrderPay.desc}}</div>
                  <el-form  label-width="120px" :model="cancleOrderPay">
                    <el-form-item label="支付方式：">
                      <el-radio-group v-model="cancleOrderPay.paytype">
                        <el-radio :label="0" :value="0">对公转账</el-radio>
                        <el-radio :label="1" :value="1">在线支付</el-radio>
                      </el-radio-group>
                    </el-form-item>
                      <el-form-item label="汇款凭证：" v-if="cancleOrderPay.paytype==0">
                          <!-- <el-input v-model="bankPayNumber" placeholder="请仔细填写银行汇款编号" type="text"></el-input> -->
                          <el-upload
                              class="upload-demo"
                              ref="upload"
                              :limit="1"
                              :action="requestUrlcancle"
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
                    
                      <el-form-item label="汇款金额：">
                          <strong class="color" style="font-size:20px;">￥{{cancleOrderPay.amount}}</strong>
                      </el-form-item>
                        <el-form-item label="在线支付：" v-if="cancleOrderPay.paytype==1">
                           <el-radio-group v-model="cancleOrderPay.type">
                            <el-radio :label="0" :value="0">微信</el-radio>
                            <el-radio :label="1" :value="1">支付宝</el-radio>
                          </el-radio-group>
                      </el-form-item>
                  </el-form>
                  <div class="desc"  v-if="cancleOrderPay.paytype==0">
                      <p class="tishi">温馨提示：</p>
                      <p><label for="">汇款方式：</label> <span> 1. 通过专属帐号进行线下汇款充值 > 2. 然后在此处上传汇款凭证</span> </p>
                      <p><label for="">查看结果：</label><span>平台审核结果会以短信或者微信公众号推送给您</span></p>
                      <P><label for="">开户银行：</label> <span>招商银行上地支行</span> </p>
                      <P><label for="">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：</label><span>110 906 335 410 201</span> </P>
                  </div>
                  <div slot="footer" class="dialog-footer " v-if="cancleOrderPay.paytype==1" style="text-align:right" >
                    <el-button @click="showDialogcancle = false" size="mini" type="info" >取消</el-button>
                    <el-button type="primary"  @click="payCancleOrder" size="mini">确定</el-button>
                  </div>
              </div>
          </div>
      </SetTankuang>
        <el-dialog
        :visible.sync="dialogCode1"
        width="300px"
        :close-on-click-modal="false"
        center
        class="dialog-ruleForm-code"
        >
        <p slot="title" class="title">扫码支付</p>
        <div class="dialog-ruleForm-code-body">
            <div class="code-image">
            <img :src="`data:image/jpeg;base64,${payCodeImgUrl}`" />
            <div class="Invalid" v-if="InvalidFlag">
                <img src="@/assets/image/PersonalCenter/_u1118.png" alt @click="paymentHandle1()" />
            </div>
            </div>
            <p>{{InvalidFlag ? '刷新重新获取支付二维码' : '请使用手机微信扫描二维码进行支付'}}</p>
        </div>
        </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { TimeForma,TimeForma2 } from "@/lib/utils";
import { axios, buyerOrderCenter } from "@/api/apiObj";
import { baseURL, baseURL2,imgBaseUrl } from "@/config";
// import { watch } from 'fs';
    export default{
        //  props: {
        //     item: {
        //         type: Object,
        //         default: () => ({})
        //     }
        // },
        data(){
            return {
                showcanclereasonList:false,//显示取消订单的原因
                imgBaseUrl:imgBaseUrl,
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
                    title: "对公转账"
                    },
                    4: {
                    imgurl: require("@/assets/image/ShoppingCart/yue.png"),
                    title: "白条支付"
                    }
                },
                  cancleReason:[
                    {
                    label:'订单信息拍错了',
                    value:'订单信息拍错了'
                    },
                    {
                    label:'不想要了',
                    value:'不想要了'
                    },
                    {
                    label:'地址电话信息填写错误',
                    value:'地址电话信息填写错误'
                    },
                    {
                    label:'没有优惠',
                    value:'没有优惠'
                    },
                    {
                    label:'发货时间延迟了',
                    value:'发货时间延迟了'
                    },
                    {
                    label:'缺货',
                    value:'缺货'
                    },
                    
                ],
                OrderProcessList:[],
                orderInfoList:{},
                 expressList: [],
                item:{
                    orderVo:{},
                    orderInfoList:[]
                },
                cancleOrderForm:{},
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
                 dialogImageUrl: "",
                imgDialogVisible: false,
                countObj:{},
                orderNo:'',
                cancleOrderPay:{
                    paytype:0,//在线支付
                    type:0//微信
                },
                timep:null,//微信支付后的轮训计时器
                payCodeImgUrl:'',
                dialogCode1: false,
                // 刷新二维码的flag
                InvalidFlag: false,
                showDialogcancle:false,
                currentSecondOrder:{}
                
            }
        },
        mounted(){
            this.getorderDetail()
           },
        filters:{
            formatDate(val){
                return TimeForma(val)
            },
             formatDate2(val){
                return TimeForma2(val)
            },
            filtersStatus(val){
                switch(val){
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
                    case 5:
                        return "预付款";
                    case 6:
                        return "商家已发货";
                    case 7:
                        return "质检中心已发货"
                }
            }
        },
        methods:{
            ...mapActions("BuyerOrderManagement", [
            "GetBuyerOrderOrderProcess",
            "GetBuyerOrdervipPay",
            "CancleOrderSubmit",
            "queryExpress"
            ]),
            getorderDetail(){
                 let orderNo=this.$route.query.orderNo;
                axios.request({...buyerOrderCenter.queryOrderDeatil,params:{orderNo:orderNo}}).then(res=>{
                    this.item=res.data.data[0];
                     this.getprogress()
                    let obj={};
                    let count={
                        usdCount:0,
                        usd:0,
                        renCount:0,
                        ren:0
                    }
                    this.item.orderInfoList.forEach(item=>{
                        if(item.priceunit){
                            count.usdCount++;
                            count.usd+=item.total_price
                        }else{
                            count.renCount++;
                            count.ren+=item.total_price
                        }
                            if(obj[item.username]){
                            obj[item.username].list.push(item)
                            }else{
                                obj[item.username]={
                                id:item.uid,
                                info:{
                                    headImgUrl:item.headImgUrl,
                                    username:item.username,
                                    tag:item.tag,
                                    historyPublish:item.historyPublish,
                                    finishOrder:item.finishOrder
                                },
                                list:[item]
                                }
                            }
                        })
                        this.orderInfoList=obj;
                        this.countObj=count;
        
                })
            },
             ensurecanclereason(reason){
                this.showcanclereasonList=false
                this.$set(this.cancleOrderForm,'reason',reason)
             },
             // 展开示例图图片
            PrvExampleDiagram(src) {
            this.dialogImageUrl = src;
            this.imgDialogVisible = true;
            },
            getprogress(){
                this.GetBuyerOrderOrderProcess({
                    orderno: this.item.orderVo.order_no,
                }).then(res => {
                     this.OrderProcessList = res.data
                    
                });
            },
            getDiliverInfo(orderId) {
    
                this.queryExpress({ orderId }).then(res => {
                
                    this.expressList = res.data;
                });
            },
            // 上传合同成功的函数
                uploadSuccess(response, file, fileList) {
                this.$message({
                    type: "success",
                    message: "上传成功"
                });
              
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
                    this.getorderDetail();
                }
                });
            },
             //取消订单
    cancleOrder(type, orderId) {
      //type==1,标识大订单，type==2,标识小订单
      this.dialogVisible2 = true;
      this.cancleOrderForm.flag = type == 1 ? true : false;
      this.cancleOrderForm.orderId = orderId;
      if(type==2){
        this.cancleOrderForm.orderId = orderId.id;
         this.cancleOrderPay.id=orderId.id;
         this.cancleOrderPay.orderNo=orderId.order_no;
      }
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
        if(res.resultCode=='400'){
              this.showDialogcancle=true
              this.cancleOrderPay={
                ...this.cancleOrderPay,
                ...res.data,
              }
        }else{
         
           this.getorderDetail()
        }
        
      });
    },
      payCancleOrder(){
          if(this.cancleOrderPay.type==0){
              this.payCancleOrderWe()
            }else if(this.cancleOrderPay.type==1){
              axios.request({...buyerOrderCenter.payGuanshui,method:'post',data:{orderId:this.cancleOrderPay.id},params:{orderId:this.cancleOrderPay.id}}).then(res=>{
                const div = document.createElement("div");
                div.setAttribute("id","divId")
               
                  div.innerHTML = res.data.prepay_id;
                  document.body.appendChild(div);
                  document.getElementById('divId').getElementsByTagName('form')[0].charset= "UTF-8";
                  document.getElementById('divId').getElementsByTagName('form')[0].target = "_blank";
                    document.getElementById('divId').getElementsByTagName('form')[0].submit();
           
              })
        }
    },
    payCancleOrderWe(){
      axios.request({...buyerOrderCenter.getWechatPayBaoguan,params:{orderId:this.cancleOrderPay.id}}).then(codeResp=>{
        codeResp=codeResp.data;
         this.dialogCode1 = true;
          this.payCodeImgUrl = codeResp.prepay_id;
          let count = 0;
          var _this=this;
          // 拿到二维码之后进行轮训获取支付状态
          this.timep = setInterval(() => {
            count++;
            if (count === 40) {
              clearInterval(_this.timep);
              _this.timep=null;
              _this.InvalidFlag = true;
            } else {
              _this.InvalidFlag = false;
              
              _this.$store
                .dispatch("SignContract/GetPayStatus", {
                  orderno: _this.cancleOrderPay.orderNo,
                  messageid: codeResp.flag,
                })
                .then(statusResp => {
                  // 如果支付状态是1，支付成功，跳到我的订单页面
                  if (statusResp === 1) {
                      _this.InvalidFlag=true;
                    _this.showDialogcancle=false;
                    _this.dialogCode1=false;
                    _this.dialogVisible2=false;
                    _this.all();
                  }
                });
            }
          }, 3000);
        })
        .catch(err => {
          this.$message.error(err.message);
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
          this.getorderDetail()
        }
        })
        },
    closeDialogCallBack(){
        this.showDialog=false
        this.showDialoglittle=false;
        this.showDialogcancle=false;
      },
      handleAvatarSuccess(res, file) {
          if(res.resultCode =='200'){
              this.$message({
                  type:'success',
                  message:'上传成功，等待审核'
              })
              this.showDialog=false;
            
              this.showDialogcancle=false;
              this.dialogVisible2=false;
              this.getorderDetail();
          }
      },
    },
        watch:{
             showDialogcancle(val){
    
                    if(!val){
                        clearInterval(this.timep)
                        var element = document.getElementById("divId");
                        if(element){
                            element.parentNode.removeChild(element);
                        }
                    
                    }
            },
            dialogCode1(val){
                if(!val){clearInterval(this.timep)}
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
                 requestUrlcancle() {
                    //type==1,标志是报关税上传对公转账凭证
                    return (
                        baseURL +
                        `api-order/customerCenter/uploadBankTransferNo?access_token=${this.access_token}&orderNo=${this.cancleOrderPay.orderNo}&orderId=${this.cancleOrderPay.id}&type=1`
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
    }
</script>
<style lang="less" scoped>
    .buyerOrderDetail{
        max-width:100%;
        color:#333;
        .content{
            .step{
                    background:#fff;
                    display:flex;
                    align-items: center;
                    width:100%;
                    .left{
                        padding:0 30px;
                        float:left;
                        .icon{
                            text-align: center;
                            color:#7bbc52;
                            margin-top:20px;
                            i{
                                font-size:40px;
                                
                            }
                        }
                    
                    }
                    .right{
                        border-left:1px solid #ddd;
                        padding:20px 30px;
                        padding-right:0;
                        box-sizing: border-box;
                      
                        float:left;
                        flex:1;
                        width:0;
                        .wrap{
                            width:100%;
                              overflow-x:auto;
                            ul{
                                width:auto;
                                white-space:nowrap;
                                li{
                                    width:200px;
                                    text-align: center;
                                    padding-top:20px;
                                    .mark{
                                        padding-top:10px;
                                        position: relative;
                                        .dot{
                                            width:10px;
                                            height:10px;
                                            background:#7bbc52;
                                            border-radius: 100%;
                                        }
                                        .line{
                                            position: absolute;
                                            left:60%;
                                            height:1px;
                                            width:80%;
                                            background:#7bbc52;
                                            top:20px;
                                        }
                                    }
                                    .desc{
                                        padding:10px 20px;
                                        font-size:12px;
                                        text-align: left;
                                        white-space:normal;
                                    }
                                    &:last-child{
                                        .mark{
                                            .line{
                                                display: none;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                          
                    
                    }
                }
        


            .cont{
                background:#fff;
                margin-top:10px;
                ul{
                    display:flex;
                    .item{
                        flex:1;
                    }
                    li{
                        
                        border-right: 1px solid #ddd;
                        padding:20px;
                        &:last-child{
                            border:none;
                        }
                        .title{
                            font-weight: bold;
                        }
                        .center{
                            padding:20px 0;
                            p{
                                line-height:1.7;
                                font-size:14px;
                            }
                            img{
                                cursor: cell;
                            }
                        }
                    }
                }
            }
            .list{
                margin-top:10px;
                background:#fff;
                .title{
                    background:#ddd;
                    line-height:40px;
                    padding:0 20px;
                   
                }
                table{
                    width:100%;
                    text-align: center;
                    td,th{
                        padding:8px;
                        
                    }
                    th{
                        font-size:1vw;
                         white-space: nowrap;
                    }
                    td{
                        font-size:13px;
                        &.btn{
                            p{
                                margin-top:10px;
                                /deep/button{
                                    width:80px;
                                    box-sizing:border-box;
                                    padding:5px 0;
                                    
                                }
                            }
                        }
                    }
                    tr{
                        border-bottom:1px solid #ddd;
                    }
                    .paynoImg{
                        height:20px;
                        cursor: cell;

                    }
                    .userimage{
                        width:50px;
                        height:50px;
                        border-radius: 100%;
                    }
                    .gpoodsinfo{
                        display:flex;
                        align-items: center;
                        text-align: left;
                        justify-content: center;
                        .ImgE{
                                /deep/img{
                              
                                height:80px;
                            }
                            position: relative;
                            margin-right:15px;
                            &:after{
                                content:"";
                                position: absolute;
                                top:0;
                                left:0;
                                bottom: 0;
                                right: 0;
                                background: rgba(0,0,0,0.03)
                            }
                        } 
                        .name{
                            font-weight: bold;
                            margin-bottom:10px;
                        }
                    }
                }
                .total{
                    text-align: right;
                    margin-top:20px;
                    font-size:14px;
                    padding-bottom:20px;
                    padding-right:20px;
                    p{
                        line-height:1.7;
                    }
                    .right{
                        width:100px;
                    }
                    
                }
                .footer{
                        height:90px;
                        line-height:90px;
                        font-size:24px;
                        background:#d7d7d7;
                        width:100%;
                        float: right;
                        text-align:right;
                        padding-right:20px;
                        box-sizing:border-box;
                        
                    }
            }
        }
         
        
    }
     .cancleorder{
    .cancleOrderReason{
      min-height:200px;
      .desc{
        margin-top:10px;
      }
      .reason{
        position: relative;
        margin:10px 0;
        cursor: pointer;
        .list{
          margin-top:-1px;
          position:absolute;
          background:#fff;
          width:100%;
          border:1px solid #ddd;
         
          padding:15px;
          box-sizing:border-box;
          li{
            padding:5px 15px;
            cursor: pointer;
            &:hover{
              background:#ddd;
            }
          }
        }
      }
    }
  }  
</style>