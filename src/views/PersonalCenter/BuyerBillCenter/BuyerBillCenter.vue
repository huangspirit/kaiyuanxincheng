<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>账单中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="BuyerBillCenter">
        <div class="top">
             <div @click="getalldetail"  :class="{active:modules==0}">
                <p class="title">应付账单金额合计：</p>
                <P><STRONG>人民币：{{obj.currentPay+obj.unCurrentPay | toFixed(2)}}</STRONG><a href="javascript:;">(查看全部)</a></P>
            </div>
            <div  :class="{active:modules==2}">
                <p class='title'> 账单到期应付账款：</p>
                <p ><strong>人民币：{{obj.currentPay}}</strong> &nbsp;&nbsp;
                    <a href="javascript:;" @click="getdetail(true)" style="margin-right:10px;font-size:14px;" v-if="obj.currentPay">查看明细</a>
                    <a href="javascript:;" @click="AllcheckSubmit(true)" style="font-size:14px;" v-if="obj.currentPay">快速结算</a>
                </p>
                <p class="desc">当前结算周期：{{obj.day}}天（以发货时间为准）</p>
            </div>
            <div  :class="{active:modules==1}">
                <p class="title">已发货未到期账款：</p>
                <P><STRONG>人民币：{{obj.unCurrentPay}}</STRONG>  &nbsp;&nbsp;</P>
                <p style="margin-top:10px;">
                    <a href="javascript:;"  @click="getdetail(false)" style="font-size:14px;" v-if="obj.unCurrentPay">查看明细</a>
                    <a href="javascript:;" @click="AllcheckSubmit(false)" style="font-size:14px;margin-left:20px;" v-if="obj.unCurrentPay">快速结算</a>
                </p>
            </div>
           
        </div>
        <div class="tit clear"  v-if="isSearchTitle==false">
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
            <div class="clear search btn fl" >
                <span class="fl" @click="handleChangeAll" :class="{bgColor:changeAll==true}">全部</span>
                <p class="fl">
                    状态|
                    <span :class="{bgColor:is_checkout==3}" @click="changeCheckout(3)">已结算</span>&nbsp;
                    <span :class="{bgColor:is_checkout==0}" @click="changeCheckout(0)">待结算</span>
                    <span :class="{bgColor:is_checkout==1}" @click="changeCheckout(1)">结算待审核</span>
                    <!-- <span :class="{bgColor:is_checkout==2}" @click="changeCheckout(2)">结算被驳回</span> -->
                    </p>
                    
                <!-- <p class="fl">发票|<span :class="{bgColor:isOpenBill==true}" @click="changeOpenBill(true)">已开票</span>&nbsp;
                    <span :class="{bgColor:isOpenBill==false}" @click="changeOpenBill(false)">未开票</span></p> -->
<!--                <span class="fl btn" :class="{bgColor:is_checkout==false}" @click="is_checkout=false">全部</span>-->
<!--                <span class="fl btn" :class="{bgColor:is_checkout==false}" @click="is_checkout=false">待结算</span>-->
<!--                <span class="fl btn" :class="{bgColor:is_checkout==true}" @click="is_checkout=true">已结算</span>-->
<!--                <span class="fl btn" :class="{bgColor:is_checkout==false}" @click="is_checkout=false">已开票</span>-->
<!--                <span class="fl btn" :class="{bgColor:is_checkout==true}" @click="is_checkout=true">未开票</span>-->
            </div>

        </div>


        <div class="content" v-if="!isSearchTitle">
            <div class="title clear">
                <div class="left">总计</div>
                <ul class="right clear">
                    <!-- <li>
                        <label>
                            <input type="checkbox" @change="allCheck" ref="allcheckmark">
                            全选
                        </label>
                    </li> -->
                <li>发货日期</li>
                <li>商品</li>
                <li>数量</li>
                <li>单价</li>
                <li>增值税(RMB)</li>
                <li>关税/税率
                </li>
                <li>清关费</li>
                <li>运费</li>
                <li>
                    汇率差(RMB)
                </li>
                <li>小计</li>
                <li>状态</li>
                </ul>
            </div>
            <div class="nocont" v-if="orderList.length==0" style="height:500px;
            line-height:300px;text-align:center;">暂无数据</div>
      
            <ul class="list" v-if="orderList.length">
                <li class="item" v-for="(item,index) in orderList" :key='index'>
                    <div class="mark">
                        <p class="togetherPay bgColor" v-if="item.togetherPay==true">合并报关</p>
                         <p class="togetherPay bgLightGray undo" v-if="item.togetherPay==false">单独报关</p>
                    </div>
                    <div class="left">
                        <p class="blue">订单号：{{item.orderNo}}</p>
                        <p><span>订单总额：￥{{item.orderAmount}}</span><strong v-if="item.orderUsdAmount">(包含${{item.orderUsdAmount}})</strong></p>
                         <!-- <p><span>实际结算：￥{{item.payRealTotal}}</span>   </p> -->
                        <p v-if="item.guanshui">关税：￥{{item.guanshui}}</p>
                        <p v-if="item.guanshuiService">清关税：￥{{item.guanshuiService}}</p>
                        <p>
                            <span v-if="item.postage">运费：{{item.postage}}</span>
                             <!-- <strong style="margin-left:15px;">{{item.isOpenBill?'已开票':'未开票'}}</strong> -->
                             </p>
                    </div>
                    <div class="right">
                        <ol class="detaillist">
                            <li class="item0" v-for="(item0,k) in item.checkDetailList" :key='k'>
                                <!-- <div>
                                    <label v-if="item0.checkButton">
                                        <input type="checkbox" name="checking" :value="item0.orderId" v-model="checklist" ref="input">
                                    </label>
                                    </div> -->
                                <div>{{item0.diliverTime}}</div>
                                <div>{{item0.goodsName}}</div>
                                <div>{{item0.goodsCount}}只</div>
                                <div>
                                    {{item0.priceunit?'$':'￥'}}{{item0.price}}
                                        <br><strong  style="font-size:8px;">({{item0.cludeBill?'含增值税':'不含税'}})</strong> 
                            
                                </div>
                                <div class="dataDesc">
                                    <span class="red">
                                        {{item0. bill_price}}</span> 
                                        <div class="wrap">
                                            <p>增值税率：{{item0.bill_rate}}</p>
                                        </div>
                                </div>
                                <div>
                                    ￥{{item0.guanshuiTotal}}&nbsp;/
                                    {{item0.guanshuiRate}}
                                </div>
                                <div>￥{{item0.guanshuiService}}</div>
                                <div >
                                    <span v-if="item0.postPrice">{{item0.postPrice}}</span>
                                    </div>
                                <div class="dataDesc">
                                    <span :class="item0.exchang_make<0?'blue':'red'">{{item0.exchang_make | filterExchang_make}}</span>
                                    <!-- <span v-if="item0.incomeGoods || item0.incomeGuan" class=" red">-￥{{item0.incomeGoods+item0.incomeTax+item0.incomeGuan | toFixed(2)}}</span>
                                    <span v-if="item0.outTax || item0.outGuan" class="blue">+￥{{item0.outTax+item0.outGoods+item0.outGuan | toFixed(2)}}</span>
                                    <span v-if="item0.incomeGoods==0 && item0.outTax==0 && item0.outGuan==0">0</span> -->
                                    <div class="wrap">
                                        <p>结算汇率：{{item0.checkExchange}}</p>
                                        <p>支付汇率：{{item0.payExchange}}</p>
                                      <!-- <p> 结算汇率/支付汇率： {{item0.checkExchange}}/{{item0.payExchange}}</p>
                                      <p>个人补货款：<strong>-￥{{item0.incomeGoods}}</strong> </p>
                                      <p>个人补税款：<strong>-￥{{item0.incomeTax}}</strong> </p>
                                       <p>个人补关税：<strong>-￥{{item0.incomeGuan}}</strong> </p>
                                      <p>平台退货款：<strong class="blue">+￥{{item0.outGoods}}</strong> </p>
                                      <p>平台退税款：<strong class="blue">+￥{{item0.outTax}}</strong> </p>
                                      <p>平台退关税：<strong class="blue">+￥{{item0.outGuan}}</strong> </p> -->
                                    </div>
                                </div>
                                <div>
                                    <p>{{item0.priceunit?'$':'￥'}}{{item0.orderAmount}}</p>
                                    <strong>实付：￥{{item0.orderRealAmount}}</strong>
                                </div>
                                 <div>
                                    <span>{{item0.is_checkout_sys | filterCheckout}}</span>
                                    <!-- <el-button v-if="item0.checkButton && item0.is_checkout_sys==0" size="mini" class="bgColor">结算</el-button>
                                    <el-button v-if="item0.checkButton && item0.is_checkout_sys==2" size="mini" class=bgColor>重新结算</el-button> -->
                    
                                </div> 

                            </li>
                        </ol>
                    </div>
                </li>
            </ul>
              <Pagination
            v-if="total>pageSize"
            @current-change="handleCurrentChange"
            :pageIndex.sync="currentPage"
            :pageSize="pageSize"
            :total="total">
        </Pagination>
        </div>
        <table class="table" v-if="isSearchTitle">
            <thead>
                <tr>
                    
                    <!-- <th>
                        <label>
                            <input type="checkbox" @change="allCheck" ref="allcheckmark">
                            全选
                        </label>
                    </th> -->
                <th>发货日期</th>
                <th>商品</th>
                <th>数量</th>
                <th>单价</th>
                <th>增值稅(RMB)</th>
                <th>关税/税率
                </th>
                <th>清关费</th>
                <th>运费</th>
                <th>
                    汇率差(RMB)
                </th>
                <th>小计</th>
                <th>状态</th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item0,k) in checkDetailList" :key='k'>
                    <!-- <td><label v-if="item0.checkButton">
                                        <input type="checkbox" name="checking" :value="item0.orderId" v-model="checklist" ref="input">
                                    </label></td> -->
                     <td>{{item0.diliverTime}}</td>
                                <td>{{item0.goodsName}}</td>
                                <td>{{item0.goodsCount}}只</td>
                                <td>
                                    {{item0.priceunit?'$':'￥'}}{{item0.price}}
                                        <br><strong  style="font-size:8px;">({{item0.cludeBill?'含增值税':'不含税'}})</strong>
                            
                                </td>
                                <td class="dataDesc">
                                    <span class="red">
                                        {{item0. bill_price}}</span> 
                                        <div class="wrap">
                                            <p>增值税率：{{item0.bill_rate}}</p>
                                        </div>
                                </td>
                                <td>
                                    ￥{{item0.guanshuiTotal}}&nbsp;/
                                    {{item0.guanshuiRate}}
                                </td>
                                <td>￥{{item0.guanshuiService}}</td>
                                <td>
                                    <span v-if="item0.postPrice">{{item0.postPrice}}</span>
                                    </td>
                                <td class="dataDesc">
                                     <span :class="item0.exchang_make<0?'blue':'red'">{{item0.exchang_make | filterExchang_make}}</span>
                                    <!-- <span v-if="item0.incomeGoods || item0.incomeGuan" class=" red">-￥{{item0.incomeGoods+item0.incomeTax+item0.incomeGuan | toFixed(2)}}</span>
                                    <span v-if="item0.outTax || item0.outGuan" class=" blue">+￥{{item0.outTax+item0.outGoods+item0.outGuan | toFixed(2)}}</span>
                                    <span v-if="item0.incomeGoods==0 && item0.outTax==0 && item0.outGuan==0">0</span> -->
                                    <div class="wrap">
                                        <p>结算汇率：{{item0.checkExchange}}</p>
                                        <p>支付汇率：{{item0.payExchange}}</p>
                                      <!-- <p> 结算汇率/支付汇率： {{item0.checkExchange}}/{{item0.payExchange}}</p>
                                      <p>个人补货款：<strong>-￥{{item0.incomeGoods}}</strong> </p>
                                      <p>个人补税款：<strong>-￥{{item0.incomeTax}}</strong> </p>
                                       <p>个人补关税：<strong>-￥{{item0.incomeGuan}}</strong> </p>
                                      <p>平台退货款：<strong class="blue">+￥{{item0.outGoods}}</strong> </p>
                                      <p>平台退税款：<strong class="blue">+￥{{item0.outTax}}</strong> </p>
                                      <p>平台退关税：<strong class="blue">+￥{{item0.outGuan}}</strong> </p> -->
                                    </div>
                                </td>
                                <td>
                                    <p>{{item0.priceunit?'$':'￥'}}{{item0.orderAmount}}</p>
                                    <strong>实付：￥{{item0.orderRealAmount}}</strong>
                                </td>
                                <td>
                                    <span>{{item0.is_checkout_sys | filterCheckout}}</span>
                                    <!-- <el-button v-if="item0.checkButton && item0.is_checkout_sys==0" size="mini" class="bgColor">结算</el-button>
                                    <el-button v-if="item0.checkButton && item0.is_checkout_sys==2" size="mini" class=bgColor>重新结算</el-button> -->
                                </td>

                </tr>
            </tbody>
        </table>
        <div class="nocont" v-if="checkDetailList.length==0 && isSearchTitle" style="height:500px;
            line-height:300px;text-align:center;">暂无数据</div>
        <div><el-button class="bgColor fr" @click="AllcheckSubmit" v-if="checklist.length>1" style="margin:15px 0;margin-right:2%;">结算</el-button></div>
        <Pagination
            v-if="total1>pageSize1 && isSearchTitle"
            @current-change="handleCurrentChange"
            :pageIndex.sync="currentPage1"
            :pageSize="pageSize1"
            :total="total1">
        </Pagination>
    </div>
      <SetTankuang :title="'银行汇款'" v-if="showDialog" @closeDialogCallBack="closeDialogCallBack">
          <div class="dialog-body" slot="dialog-body">
              <div class="RemittancNotes" >
                  <el-form  label-width="80px">
                      <el-form-item label="汇款凭证:">
                          <!-- <el-input v-model="bankPayNumber" placeholder="请仔细填写银行汇款编号" type="text"></el-input> -->
                          <el-upload
                                v-if="showDialog"
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
          pageSize:3,
          pageSize1:20,
          total:0,
          total1:0,
          currentPage:1,
          currentPage1:1,
          sendData:{},
          checklist:[],
          showDialog:false,
          obj:{
              list:{}
          },
          orderList:[],
          checkDetailList:[],
          isSearchTitle:false,
          modules:0,
          flag:false,
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
        isOpenBill(val){
            this.currentPage=1;
            this.init();
        },
        is_checkout(val){
            this.currentPage=1
            this.init();
        },
        value2(val){
            this.startTime=TimeForma2(val[0])
            this.endTime=TimeForma2(val[1])
            this.init()
        },
        checklist(val){
                if(this.checklist.length<this.$refs.input.length || this.$refs.input.length==0){
                 this.$refs.allcheckmark.checked=false
                }else{
                  this.$refs.allcheckmark.checked=true;
                }
        }
    },
    mounted(){
      this.init()
    },
    methods:{
        allCheck(val){
            this.checklist=[];
            Array.from(this.$refs.input).forEach(el => {
                if(val.target.checked){
                    this.checklist.push(el.value)
                }
                    el.checked=val.target.checked
            });
        },
        AllcheckSubmit(flag){
                if(flag){
                    this.sendData={
                        payRealTotal:this.obj.currentPay,
                        flag:flag
                    }
                }else{
                    this.sendData={
                        payRealTotal:this.obj.unCurrentPay,
                        flag:flag
                    }
                }
               this.showDialog=true;
            // alert("待开发")

        },
        handleChangeAll(){
            this.is_checkout=null;
             this.isOpenBill=null;
             this.changeAll=true;
        },
        getalldetail(){
            this.currentPage=1;
            this.init();
            this.checklist=[]
        },
        getdetail(status){
            this.checklist=[]
            this.isSearchTitle=true;
            this.currentPage1=1;
            this.flag=status;
            this.modules=status?2:1
            axios.request({...buyerOrderCenter.vipOrderBillForPay,params:{
                flag:status,
                start:this.start1,
                length:this.pageSize1,
                day:this.obj.day
            }}).then(res=>{
                if(res){
                    this.checkDetailList=res.data.data;
                    this.total1=res.data.total
                }
                
            })
        },
        getAllReplyList(){
            this.init()
        },
      changeCheckout(val){
          console.log(val)
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
            
            if(this.isSearchTitle){
                this.currentPage1=x;
            axios.request({...buyerOrderCenter.vipOrderBillForPay,params:{
                flag:this.flag,
                start:this.start1,
                length:this.pageSize1,
                day:this.obj.day
            }}).then(res=>{
                
                if(res){
                    this.checkDetailList=res.data.data;
                    this.total1=res.data.total
                }
                
            })
            }else{
                this.currentPage=x;
                this.init()
            }
        },
      init(){
          this.isSearchTitle=false;
          this.modules=0
            // if(this.is_checkout){
            //     //获取已结算的订单
            //     axios.request({...buyerOrderCenter.queryOrderBillCheckList,params:{
            //             beginTime :this.startTime,
            //             endTime:this.endTime,
            //             length:this.pageSize,
            //             start:this.start
            //         }}).then(res=>{
            //         if(res){
            //             this.orderList=res.data.data;
            //             this.total=res.data.total
            //         }
            //     })
            // }else {
                axios.request({...buyerOrderCenter.vipOrderBill,params:{
                     is_checkout:this.is_checkout,
                     check_bill_result:this.isOpenBill,
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
//}

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
                this.showDialog=false;
                this.getalldetail(this.sendData.flag)
                // this.sendData.imageUrl=res.data.name
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
                    return '待结算'
                case 1:
                    return '待审核'
                case 2:
                    return '被驳回'
            }
        },
        toFixed(val,length){
            return val.toFixed(length)
        },
        filterExchang_make(val){
            return (0-val).toFixed(2)
        }
    },
    computed:{
        start1(){
             return this.pageSize1*(this.currentPage1-1)
        },
      start(){
          return this.pageSize*(this.currentPage-1)
      },
        access_token() {
            return sessionStorage.getItem("access_token");
        },
        requestUrl() {
            console.log(this.sendData)
            return (
                baseURL +
                `api-order/customerCenter/uploadCustomerBillCenterBankTransfer?access_token=${this.access_token}&flag=${this.sendData.flag}`
            );
        },
    }
};
</script>

<style lang="less" scoped>
  @import "./BuyerBillCenter.less";
</style>

