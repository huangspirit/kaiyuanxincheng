<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>账单中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="BuyerBillCenter">
        <div class="top">
            <div>
                <p class='title'> 订单总金额：</p>
                <p ><strong>￥{{obj.orderToatl}}</strong>   &nbsp;<strong v-if="obj.usdTotal" style="font-size:14px;">(包含:${{obj.usdTotal}})</strong></p>
            </div>
            <div>
                <p class="title">到期应结算金额（RMB）</p>
                <P><STRONG>￥{{obj.waitingPayTotal}}</STRONG></P>
            </div>
        
        </div>
        <div class="tit clear">
            <el-date-picker
                class="fl"
                v-model="value2"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="left"
                size="mini">
            </el-date-picker>
            <div class="clear search btn fl">
                <span class="fl" @click="handleChangeAll" :class="{bgColor:changeAll==true}">全部</span>
                <p class="fl">状态|<span :class="{bgColor:is_checkout==true}" @click="changeCheckout(true)">已结算</span>&nbsp;
                    <span :class="{bgColor:is_checkout==false}" @click="changeCheckout(false)">未结算</span></p>
                <p class="fl">发票|<span :class="{bgColor:isOpenBill==true}" @click="changeOpenBill(true)">已开票</span>&nbsp;
                    <span :class="{bgColor:isOpenBill==false}" @click="changeOpenBill(false)">未开票</span></p>
<!--                <span class="fl btn" :class="{bgColor:is_checkout==false}" @click="is_checkout=false">全部</span>-->
<!--                <span class="fl btn" :class="{bgColor:is_checkout==false}" @click="is_checkout=false">待结算</span>-->
<!--                <span class="fl btn" :class="{bgColor:is_checkout==true}" @click="is_checkout=true">已结算</span>-->
<!--                <span class="fl btn" :class="{bgColor:is_checkout==false}" @click="is_checkout=false">已开票</span>-->
<!--                <span class="fl btn" :class="{bgColor:is_checkout==true}" @click="is_checkout=true">未开票</span>-->
            </div>

        </div>


        <div class="content">
            <div class="title clear">
                <div class="left">总计</div>
                <ul class="right clear">
                <li>发货日期</li>
                <li>商品</li>
                <li>单价/数量</li>
                <li><span>结算汇率</span><br>
                    <span>支付汇率</span>
                </li>
                <li>清关费</li>
                <li>运费</li>
                <li>
                    汇率差
                </li>
                <li>小计</li>
                <li>操作</li>
                </ul>
            </div>
            <div class="nocont" v-if="orderList.length==0" style="height:500px;
            line-height:300px;text-align:center;">暂无数据</div>
            <ul class="list" v-if="orderList.length">
                <li class="item" v-for="(item,index) in orderList" :key='index'>
                    <div class="left">
                        <p class="blue">订单号：{{item.orderNo}}</p>
                        <p><span>交易额：￥{{item.orderAmount}}</span><strong v-if="item.orderUsdAmount">(包含${{item.orderUsdAmount}})</strong></p>
                         <p><span>实际结算：￥{{item.payRealTotal}}</span>   </p>
                        <p v-if="item.guanshui">关税：￥{{item.guanshui}}</p>
                        <p><span>运费：{{item.postage}}</span> <strong style="margin-left:15px;">{{item.isOpenBill?'已开票':'未开票'}}</strong></p>
                    </div>
                    <div class="right">
                        <ol>
                            <li class="item0" v-for="(item0,k) in item.checkDetailList" :key='k'>
                                <div>{{item0.diliverTime}}</div>
                                <div>{{item0.goodsName}}</div>
                                <div>
                                    {{item0.priceunit?'$':'￥'}}{{item0.price}}&nbsp;&nbsp;/&nbsp;&nbsp;{{item0.goodsCount}}只
                                        <br><strong  style="font-size:8px;">({{!item0.priceunit?'含税':'不含税'}})</strong>
                                    </div>
                                <div>
                                    <div v-if="item0.checkExchange || item0.payExchange">
                                        <span >{{item0.checkExchange}}</span>
                                        <hr style="width:60%;margin:3px auto">
                                        <span >{{item0.payExchange}}</span></div>
                                    </div>
                                <div>{{item0.guanshui}}</div>
                                <div >
                                    <span v-if="item0.postPrice">￥{{item0.postPrice}}</span></div>
                                <div><span v-if="item0.incomeGoods" class=" red">-￥{{item0.incomeGoods+item0.incomeTax}}</span>
                                     <span v-if="item0.outTax" class="color blue">+￥{{item0.outTax+item0.outGoods}}</span>
                                     <span v-if="item0.incomeGoods==0 && item0.outTax==0">0</span>
                                </div>
                                <div>
                                    <p>{{item0.priceunit?'$':'￥'}}{{item0.orderAmount}}</p>
                                    <strong>实付：￥{{item0.orderRealAmount}}</strong>
                                </div>
                                <div>
                                    <span v-if="!item0.checkButton">{{item0.is_checkout_sys | filterCheckout}}</span>
                                    <el-button v-if="item0.checkButton && item0.is_checkout_sys==0" size="mini" class="bgColor">结算</el-button>
                                    <el-button v-if="item0.checkButton && item0.is_checkout_sys==2" size="mini" class=bgColor>重新结算</el-button>
                                     <countTime
                                        class="color"
                                        v-on:end_callback="getAllReplyList()"
                                        :startTime="item0.currentTime"
                                        v-if="item0.expireTime"
                                        dayTxt="天"
                                        hourTxt="时"
                                        minutesTxt="分"
                                        secondsTxt="秒"
                                        :endTime="item0.currentTime"
                                        :currentTime="item0.expireTime"
                                    ></countTime>
                                </div>

                            </li>
                        </ol>
                    </div>
                </li>
            </ul>
        </div>

        <Pagination
            v-if="total>pageSize"
            @current-change="handleCurrentChange"
            :pageIndex.sync="currentPage"
            :pageSize="pageSize"
            :total="total">
        </Pagination>
    </div>
      <SetTankuang :title="'银行汇款'" v-if="showDialog" @closeDialogCallBack="closeDialogCallBack">
          <div class="dialog-body" slot="dialog-body">
              <div class="RemittancNotes" >
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
                          <strong class="color" style="font-size:20px;">￥{{sendData.payRealTotal}}</strong>
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
import {TimeForma2} from "../../../lib/utils";
import {axios,buyerOrderCenter} from "../../../api/apiObj";
import { baseURL, } from "@/config";
export default {
  name: "BuyerBillCenter",
    data(){
      return{
          changeAll:true,
          is_checkout:null,
          isOpenBill:null,
          startTime:"",
          endTime:"",
          pageSize:5,
          total:0,
          currentPage:1,
          sendData:{},
          showDialog:false,
          obj:{
              list:{}
          },
          orderList:[],
          value2:"",
          pickerOptions: {
              shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                  }
              }, {
                  text: '最近一个月',
                  onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                  }
              }, {
                  text: '最近三个月',
                  onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit('pick', [start, end]);
                  }
              }]
          },
      }
    },
    watch:{
        is_checkout(val){
            this.currentPage=1
            this.init()
        },
        value2(val){
            this.startTime=TimeForma2(val[0])
            this.endTime=TimeForma2(val[1])
            this.init()
        }
    },
    mounted(){
      this.init()
    },
    methods:{
        handleChangeAll(){
            this.is_checkout=null;
             this.isOpenBill=null
        },
        getAllReplyList(){
            this.init()
        },
      changeCheckout(val){
          if(this.is_checkout==val){
                this.is_checkout=null
                if(this.isOpenBill!=false && this.isOpenBill!=true){
                    this.changeAll=true
                }
          }else{
              this.is_checkout=val
               this.changeAll=false
          }
      },
        changeOpenBill(val){
          if(this.isOpenBill==val){
                this.isOpenBill=null;
                 if(this.is_checkout!=false && this.is_checkout!=true){
                    this.changeAll=true
                }
          }else{
              this.isOpenBill=val
              this.changeAll=false
          }
        },
        handleCurrentChange(x){
            this.currentPage=x;
            this.init()
        },
      init(){
            if(this.is_checkout){
                //获取已结算的订单
                axios.request({...buyerOrderCenter.queryOrderBillCheckList,params:{
                        beginTime :this.startTime,
                        endTime:this.endTime,
                        length:this.pageSize,
                        start:this.start
                    }}).then(res=>{
                    if(res){
                        this.orderList=res.data.data;
                        this.total=res.data.total
                    }
                })
            }else {
                axios.request({...buyerOrderCenter.vipOrderBill,params:{
                     
                        startTime:this.startTime,
                        endTime:this.endTime,
                        length:this.pageSize,
                        start:this.start
                    }}).then(res=>{
                    if(res){
                        this.obj=res.data;
                        this.orderList=res.data.list.data
                        this.total=res.data.list.total
                    }
                })
            }

      },
        jiesuan(k){
            let obj = this.obj.list.data[k];
            this.sendData={
                orderNo:obj.orderNo,
                payRealTotal:obj.payRealTotal
            }
            this.showDialog=true;
        },
        handleAvatarSuccess(res, file) {
            if(res.resultCode =='200'){
                this.$message.success("结算凭证已上传，请等待审核")
                //this.sendData.imageUrl=res.data.name
                // axios.request({...buyerOrderCenter.vipOrderBillCheck,data:this.sendData}).then(res=>{
                //     this.showDialog=false;
                //     this.currentPage=1;
                //     this.init()
                // })
                //  this.$router.push("/PersonalCenter/BuyerOrderManagement")
            }
        },
        closeDialogCallBack(){
            this.showDialog=false
        },
    },
    filters:{
        filterCheckout(val){
            switch(val){
                 case 0:
                    return '系统待结算'
                case 1:
                    return '结算待审核'
            }
        }
    },
    computed:{
      start(){
          return this.pageSize*(this.currentPage-1)
      },
        access_token() {
            return sessionStorage.getItem("access_token");
        },
        requestUrl() {
            return (
                baseURL +
                `api-order/customerCenter/uploadCustomerBillCenterBankTransfer?access_token=${this.access_token}&orderNo=${this.sendData.orderNo}`
            );
        },
    }
};
</script>

<style lang="less" scoped>
  @import "./BuyerBillCenter.less";
</style>

