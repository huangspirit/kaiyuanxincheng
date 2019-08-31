<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>账单中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="BuyerBillCenter">
        <div class="tit clear">
            <p class="fr" v-if="obj.orderToatl"><span>订单总额：</span><span class="color">￥{{obj.orderToatl}}</span><span class="color" v-if="obj.usdTotal">(包含 ${{obj.usdTotal}})</span></p>
            <div class="clear search">
                <span class="fl btn" :class="{bgColor:is_checkout==false}" @click="is_checkout=false">待结算</span>
                <span class="fl btn" :class="{bgColor:is_checkout==true}" @click="is_checkout=true">已结算</span>
                <el-date-picker
                    class="fl"
                    v-model="value2"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="left">
                </el-date-picker>
            </div>
        </div>
        <div class="cont">
            <table class="table">
                <thead>
                <tr>
                    <th>订单号</th>
                    <th>订单总额</th>
                    <th>商品列表</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,k) in obj.list.data" :key="k">
                        <td>
                            {{item.orderNo}}<br>
                            总量：{{item.goodsCount}}只
                        </td>
                        <td>
                            <p ><span class="color">￥{{item.orderAmount}}</span><span v-if="item.orderUsdAmount">（包含 <span class="color">${{item.orderUsdAmount}}</span>）</span></p>
                            <p v-if="item.payRealTotal">实际结算：<strong>￥{{item.payRealTotal}}</strong></p>
                        </td>
                        <td>
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>商品名称</th>
                                    <th>购买单价/数量</th>
                                    <th>状态</th>
                                    <th>支付汇率/结算汇率</th>
                                    <th>关税（￥）</th>
                                    <th>
                                        <span class="jian">商家应补货款</span> <br>
                                        <span class="jia">系统应退货款</span>

                                    </th>
                                    <th>
                                        <span class="jian">商家应补税款</span>
                                        <br>
                                        <span class="jia">系统应退税款</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item0 in item.checkDetailList">
                                    <td>{{item0.goodsName}}</td>
                                    <td> <strong>{{item0.priceunit?"$":"￥"}}{{item0.price}}</strong> / {{item0.goodsCount}}只</td>
                                    <td>{{item0.desc}}</td>
                                    <td>{{item0.payExchange}}/{{item0.checkExchange}}</td>
                                    <td>{{item0.guanshui}}</td>
                                    <td>
                                        <span v-if="item0.incomeGoods" class="jian">￥{{item0.incomeGoods}}</span>
                                        <span v-if="item0.outTax" class="color jia">￥{{item0.outTax}}</span>
                                        <span v-if="item0.incomeGoods==0 && item0.outTax==0">0</span>
                                    </td>
                                    <td>
                                        <span v-if="item0.incomeTax" class="jian">￥{{item0.incomeTax}}</span>
                                        <span v-if="item0.outGoods" class="color jia">￥{{item0.outGoods}}</span>
                                        <span v-if="item0.incomeTax==0 && item0.outGoods==0">0</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <el-button class="bgColor" @click="jiesuan(k)" v-if="item.checkButton">结算</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination
                v-if="total>pageSize"
                @current-change="handleCurrentChange"
                :pageIndex.sync="currentPage"
                :pageSize="pageSize"
                :total="total">
            </Pagination>
        </div>
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
          is_checkout:false,
          startTime:"",
          endTime:"",
          pageSize:10,
          total:0,
          currentPage:1,
          sendData:{},
          showDialog:false,
          obj:{
              list:{}
          },
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
        handleCurrentChange(x){
            this.currentPage=x;
            this.init()
        },
      init(){
          axios.request({...buyerOrderCenter.vipOrderBill,params:{
              is_checkout: this.is_checkout,
                  startTime:this.startTime,
                  endTime:this.endTime,
                  length:this.pageSize,
                  start:this.start
              }}).then(res=>{
                  if(res){
                      this.obj=res.data;
                      this.total=res.data.list.total
                  }
          })
      },
        jiesuan(k){
            let obj = this.obj.list.data[k]
            this.sendData={
                orderNo:obj.orderNo,
            }
            this.showDialog=true;
        },
        handleAvatarSuccess(res, file) {
            if(res.resultCode =='200'){
                this.$message({
                    type:'success',
                    message:'上传成功，等待审核'
                })
                this.showDialog=false;
                axios.request({...buyerOrderCenter.vipOrderBillCheck,data:this.sendData}).then(res=>{
                    this.currentPage=1;
                    this.init()
                })
                //  this.$router.push("/PersonalCenter/BuyerOrderManagement")
            }
        },
        closeDialogCallBack(){
            this.showDialog=false
        },
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
                `api-order/customerCenter/uploadBankTransferNo?access_token=${this.access_token}&orderNo=${this.sendData.order_no}`
            );
        },
    }
};
</script>

<style lang="less" scoped>
  @import "./BuyerBillCenter.less";
</style>

