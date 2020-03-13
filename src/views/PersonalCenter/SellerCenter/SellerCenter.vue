<template>
  <div class="SellerCenter">
      <div class="user clear">
          <div class="username clear fl">
            <el-upload
                class="upload-demo fl"
                :action="requestUrl"
                 :on-success="handleAvatarSuccess"
                  :show-file-list="false"
                  title="点击更换"
                >
            <img :src="UserInforma.headImgUrl" class="head-portrait " alt />
            <div class="vipwrap" v-if="UserInforma.userTagMap.vip">
                <img src="@/assets/image/icon/VIP.png" alt="">
                <span class="vipLevel">{{UserInforma.userTagMap.vipLevel?UserInforma.userTagMap.vipLevel:0}}</span>
          </div>
            </el-upload>
              <div class="info fl">
                  <p class="name" style="max-width:200px;">
                      {{UserInforma.nickname}}
                        <img src="@/assets/image/icon/edit.png" style="height:15px;margin-left:15px;cursor:pointer;" @click="editUserName" title="更新用户名称"/>
                  </p>
                  <p>
                      <span  class="type color"  v-if="UserInforma.userTagMap.vip">月结用户</span>
                      <span  class="type color" v-if="UserInforma.userTagMap.seller && UserInforma.userTagMap.tag!=3">{{UserInforma.userTagMap.tag | tagFilter}}</span>
                      <router-link to="/OriginalFactoryEntry" tag="span"  class="type color" v-if="!UserInforma.userTagMap.seller">申请入驻</router-link>
                  </p>
                  <p>信用等级：{{UserInforma.userTagMap.userLevel}}</p>
              </div>
          </div>
          <div class="right">
              <ul class="clear">
                  <li>
                      <div class="cont">
                          <p class="money">{{UserInforma.userTagMap.wallet | toFixed(2)}}</p>
                          <p class="desc">钱包余额（元）</p>
                          <p class="router">
                              <a href="javascript:;" @click="withDraw" v-if="UserInforma.userTagMap.wallet>10">提现</a>&nbsp;&nbsp;
                              <a v-if="UserInforma.userTagMap.wallet>10">|&nbsp;&nbsp;</a>
                              <router-link to="/PersonalCenter/withdraw" >提现管理</router-link>&nbsp;&nbsp;
                              <a>|&nbsp;&nbsp;</a>
                              <router-link to="/PersonalCenter/buyerDetailList" >明细</router-link>
                          </p>
                      </div>
                  </li>
                  <li  v-if="UserInforma.userTagMap && UserInforma.userTagMap.seller">
                      <div class="cont yajin">
                          <p class="money">{{UserInforma.userTagMap.deposit | toFixed(2)}}</p>
                          <p class="desc">保证金（元）</p>
                          <p class="router">
                              <router-link to="/PersonalCenter/deposit" >充值</router-link>&nbsp;&nbsp; <a>|&nbsp;&nbsp;</a>
                              <router-link to="/PersonalCenter/depositDetailList" >明细</router-link>
                          </p>
                        
                      </div>
                  </li>
                  <li v-if="UserInforma.userTagMap && UserInforma.userTagMap.seller && UserInforma.userTagMap.tag!=1">
                        <div class="cont yajin">
                            <p class="money">{{UserInforma.userTagMap['restcredit-seller'] | toFixed(2)}}</p>
                            <p class="desc">剩余售卖额度（元）</p>
                            <p class="router">
                            <span>售卖额度：{{UserInforma.userTagMap['credit-seller'] | toFixed(0)}}</span>&nbsp;&nbsp; <a>|&nbsp;&nbsp;</a>
                            <router-link to="/PersonalCenter/sellerDetailList" class="route">明细</router-link>
                            </p>
                            <p style="font-size:14px;">售卖额度 = 保证金*10 + 基础额度</p>
                        </div>
                      <!-- <div class="cont circle clear">
                          <el-progress type="circle" :width="70" :percentage="creditsellerPercente"  class="fl"></el-progress>
                          <div class="text fl">
                              <p class="desc">
                                  售卖额度：{{UserInforma.userTagMap['credit-seller']}}
                              </p>
                              <p class="rest">剩余额度：{{UserInforma.userTagMap['restcredit-seller']}}</p>
                              <router-link to="/PersonalCenter/sellerDetailList" class="route">明细</router-link>
                               <p style="font-size:14px;">售卖额度 = 保证金*10 + 基础额度</p>
                          </div>
                            
                      </div>
                      -->

                  </li>
              </ul>
          </div>
      </div>
      <ul class="goods-state">
          <router-link tag="li" to="/PersonalCenter/SellerCommodityManagement?status=1">
              <div class="color">
                  <p class="name">在售商品</p>
                      <p class="desc" >
                          您有<span class="color">{{obj.isSelling}}</span>件在售商品，立即查看
                      </p>

                  <p class="num">{{obj.isSelling}} <i class="el-icon-arrow-right fr"></i>    </p>
              </div>
          </router-link>
              <router-link tag="li" to="/PersonalCenter/SellerCommodityManagement?status=0">
                  <div class="color">
                      <p class="name">已下架商品</p>
                      <p class="desc" >
                          <br>
<!--                          您有<span class="color">{{obj.noSelling}}</span>件在售商品，立即查看-->
                      </p>
                      <p class="num">{{obj.noSelling}} <i class="el-icon-arrow-right fr"></i>    </p>
                  </div>
              </router-link>
              <router-link tag="li" to="/PersonalCenter/SellerOrderManagement?status=0">
                  <div class="color">
                      <p class="name">待发货订单数</p>
                      <p class="desc" >
                          您有<span class="color">{{obj.undiliver}}</span>个待发货的订单，立即查看
                      </p>

                      <p class="num">{{obj.undiliver}} <i class="el-icon-arrow-right fr"></i>    </p>
                  </div>
              </router-link>
              <router-link tag="li" to="" @click.native='getbilldetail()'>
                  <div class="color">
                      <p class="name">待结算货款</p>
                      <p class="desc" style="white-space: nowrap">
                        结算金额以卖家发货为准，立即查看
                      </p>

                      <p class="num" style="display:flex;font-size:30px;line-height:48px;"><span style="flex:1;overflow:hidden; text-overflow: ellipsis;" >￥{{obj.uncheck | toFixed(2)}}</span> <i class="el-icon-arrow-right"></i>    </p>
                  </div>
              </router-link>
      </ul>
      <el-dialog
          :visible.sync="showinputPassword"
          width="500px"
      >
          <p slot="title" class="title">输入交易密码</p>
          <div >
              <el-input placeholder="请输入交易密码" v-model="inputpassword" show-password></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showinputPassword = false">取 消</el-button>
            <el-button type="primary" @click="checkpassword">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog
          :visible.sync="showinputwithdrawTotal"
          width="700px"
          class="withdrawApplyTotal"
      >
          <p slot="title" class="title"><strong>钱包余额：￥{{UserInforma.userTagMap.wallet | toFixed(2)}}</strong></p>
          <div class="withdrawApplyTotalCont">
              <el-input placeholder="请输入提现金额" v-model="withdrawApplyTotal"  @input="changewithdrawApplyTotal" ></el-input>
              <div v-if="withdrawApplyTotal" class="clear">
                  <!-- <div class="withdrawCharge">
                      手续费：<span class="color">￥{{withdrawApplyTotalObj.withdrawCharge | toFixed(2)}}</span>
                      <div class="desc">
                          <i class="el-icon-question color" ></i>
                          <div class="cont">
                              <p><strong>手续费说明</strong></p>
                              <p>
                                  当单笔提现金额<1500元，y=2元+提现金额*0.55%
                              </p>
                              <p>
                                  当单笔提现金额≥1500元，y=提现金额*0.7%
                              </p>
                              <br>
                              <p>当天17:00点前申请提现的，提现金额当日到账；</p>
                              <p>当天17:00点后申请提现的，提现金额次日到账；</p>
                              <p>周末及节假日申请提现的，提现金额将在下个工作日到账；</p><br>
                              <p>温馨提示：单笔提现金额≥1500为最优提现方案</p>
                          </div>
                      </div>
                  </div> -->
                  <p>实际提现金额：<span class="color">￥{{withdrawApplyTotalObj.withdrawRealityTotal | toFixed(2)}}</span></p>
                  <p>申请提现金额：<span class="color">￥{{withdrawApplyTotalObj.withdrawApplyTotal | toFixed(2)}}</span></p>
                  <ul v-if="bankList.length">
                      <li class="title">
                          <span>提现方式</span>
                          <span>账号</span>
                          <span>账户名</span>
                      </li>
                      <li v-for="(item,k) in bankList" :class="selectedBank==k?'bgColor':''" :key="k" @click="selectedBank=k">
                          <span>{{item.bankCode | filterBankCode}}</span>
                          <span>{{item.bankNumber}}</span>
                          <span>{{item.cnname}}</span>
                      </li>
                  </ul>
                  <router-link v-if="bankList.length==0" to="/PersonalCenter/withdraw" class="band">没有提现账号，去绑定</router-link>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showinputwithdrawTotal = false">取 消</el-button>
            <el-button type="primary" @click="saveDraw">确 定</el-button>
          </span>
      </el-dialog>
      <div class="chartWrap clear">
          <div id="main" ></div>
          <div id="main1" ></div>
      </div>

  </div>
</template>
<style lang="less" scoped>
@import "./SellerCenter.less";
</style>
<script>
    //var echarts = require('echarts/lib/echarts');
    import echarts from "echarts";
    import {mapActions } from "vuex";
    import {axios,sellerOrderCenter,personCenter, common } from "../../../api/apiObj";
    import { baseURL } from "@/config";
    export default {
        name: "BuyerCenter",
        data(){
            return {
                UserInforma:{
                    userTagMap:{}
                },
                showinputPassword:false,
                inputpassword:"",
                showinputwithdrawTotal:false,
                withdrawApplyTotal:"",
                withdrawApplyTotalObj:{},
                bankList:[],
                selectedBank:0,
                source0:[],
                source1:[],
                obj:{},
                access_token:sessionStorage.getItem("access_token"),
                refresh_token:sessionStorage.getItem("refresh_token"),

                chipBillMark:false,//标志着提现或者结算账单的跳转
                // note: {
                //     backgroundImage: "url(" + require("./assets/bg.jpg") + ")",
                //     backgroundRepeat: "no-repeat",
                //     backgroundSize:'100% 100%',
                //     marginTop: "5px",
                // },
            }
        },
        filters:{
         
            filterBankCode(val){
                switch (val) {
                    case "ICBC":
                        return '工商银行';
                    case "ABC":
                        return '农业银行';
                    case "CCB":
                        return '建设银行';
                    case "CMB":
                        return '招商银行';
                    case "COMM":
                        return '交通银行';
                    case 'alipay':
                        return "支付宝"
                }
            }
        },
        computed:{
            creditsellerPercente(){
                if(this.UserInforma.userTagMap && this.UserInforma.userTagMap['credit-seller']){
                    return parseFloat(((this.UserInforma.userTagMap['restcredit-seller']/this.UserInforma.userTagMap['credit-seller'])*100).toFixed(1));
                }
            },
            requestUrl() {
                return (
                    baseURL +
                    `api-f/files/uploadHead?access_token=${this.access_token}`
                );
            },
        },
        methods:{
            ...mapActions("Login",[
                "GetUserInforma"
            ]),
            editUserName(){
                     this.$prompt('更新用户昵称', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputValue:this.UserInforma.nickname
                        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                        // inputErrorMessage: '邮箱格式不正确'
                        }).then(({ value }) => {
                             axios.request({...common.resetme,method:"put",data:{nickname:value}}).then(res=>{
                        if(res){
                            //更新用户信息
                           // this.all()
                            axios.request({url:common.refresh_token.url+"?refresh_token="+this.refresh_token,method:'post',data:{refresh_token:this.refresh_token}}).then(res=>{
                               
                                sessionStorage.setItem("refresh_token",res.refresh_token);
                                sessionStorage.setItem("access_token",res.access_token);
                                this.refresh_token=res.refresh_token;
                                this.access_token=res.access_token;
                                  this.all()
                            })
                           
                        }
                    })
                        }).catch(() => {
                             
                        });
            },
            handleAvatarSuccess(res){
                    axios.request({...common.resetme,method:"put",data:{headImgUrl:res.data}}).then(res=>{
                        if(res){
                            //更新用户信息
                           // this.all()
                            axios.request({url:common.refresh_token.url+"?refresh_token="+this.refresh_token,method:'post',data:{refresh_token:this.refresh_token}}).then(res=>{
                             
                                sessionStorage.setItem("refresh_token",res.refresh_token);
                                sessionStorage.setItem("access_token",res.access_token);
                                this.refresh_token=res.refresh_token;
                                this.access_token=res.access_token;
                                  this.all()
                            })
                           
                        }
                    })
            },
            changewithdrawApplyTotal(k){
                let obj =this.withdrawApplyTotal;
                obj = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                obj = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
                obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');//只能输入4个小数
                if(obj.indexOf(".")< 0 && obj !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    obj= parseFloat(obj);
                };
                if(obj>this.UserInforma.userTagMap.wallet){
                    this.withdrawApplyTotal=(obj+"").substring(0, obj.length-2);
                }else{
                    this.withdrawApplyTotal=obj;
                }
                if(this.withdrawApplyTotal){
                    axios.request({...personCenter.count,params:{withdrawApplyTotal:this.withdrawApplyTotal  }}).then(res=>{
                        this.withdrawApplyTotalObj=res.data
                    })
                }

            },
            //提现的相关操作
            withDraw(){
                //先验证是否设置提现密码
                this.chipBillMark=false
                this.inputpassword="";
                axios.request(personCenter.checkSetPassword).then(res=>{
                    if(res.data==1){
                        this.showinputPassword=true;
                    }else{
                        //需要新增
                        this.$prompt('请设置提现密码', '', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({ value }) => {
                            //校验密码
                            axios.request({...personCenter.savedrawPassword,data:{password:value}}).then(res=>{
                                console.log(res)
                                if(res){
                                    this.showinputPassword=false;
                                    this.showinputwithdrawTotal=true;
                                    axios.request({...personCenter.getBankList,params:{
                                            start:0,
                                            length:100,
                                        }}).then(res=>{
                                        this.bankList=res.data.data;
                                    })
                                }
                            })
                        }).catch(() => {

                        });
                    }
                })
            },
            checkpassword(){
                axios.request({...personCenter.checkdrawPassword,data:{password:this.inputpassword}}).then(res=>{
                    if(res){
                        this.showinputPassword=false;
                        if(this.chipBillMark){
                            this.$router.push("/PersonalCenter/SellerBillCenter")
                        }else{
                            this.showinputwithdrawTotal=true;
                            axios.request({...personCenter.getBankList,params:{
                                    start:0,
                                    length:100,
                                }}).then(res=>{
                                this.bankList=res.data.data;
                            })
                        }
                    }

                })
            },
            saveDraw(){
                let obj={
                    withdrawBankId:this.bankList[this.selectedBank].id,
                    ...this.withdrawApplyTotalObj
                }
                axios.request({...personCenter.saveDraw,data:obj}).then(res=>{
                    if(res){
                        this.showinputwithdrawTotal=false;
                        this.all();
                    }
                })
            },
            getbilldetail(){
                this.inputpassword="";
                this.chipBillMark=true
                axios.request(personCenter.checkSetPassword).then(res=>{
                    if(res.data==1){
                        this.showinputPassword=true;
                    }else{
                        //需要新增
                        this.$prompt('请设置提现密码', '', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({ value }) => {
                            //校验密码
                            axios.request({...personCenter.savedrawPassword,data:{password:value}}).then(res=>{
                                if(res){
                                    this.showinputPassword=false;
                                    this.$router.push("/PersonalCenter/SellerBillCenter")
                                }
                            })
                        }).catch(() => {

                        });
                    }
                })
            },
            all() {
                this.GetUserInforma().then(res => {
                    sessionStorage.setItem("UserInforma",JSON.stringify(res))
                    this.UserInforma=res;
                });
            },
            querySellerCenterSummary(){
                axios.request(sellerOrderCenter.querySellerCenterSummary).then(res=>{
                    console.log(res)

                    if(res){
                        this.obj={
                            ...res.data
                        }
                       Object.keys(res.data.count).forEach(item=>{
                           let arr0=[];
                           if(item=='day'){
                               arr0=['今日',res.data.count[item].total,res.data.count[item]['1'],res.data.count[item]['5'],res.data.count[item]['3']]
                               this.source0[0]=arr0
                           }else if(item=='week'){
                               arr0=['本周',res.data.count[item].total,res.data.count[item]['1'],res.data.count[item]['5'],res.data.count[item]['3']]
                               this.source0[1]=arr0
                           }else if(item=='month'){
                               arr0=['本月',res.data.count[item].total,res.data.count[item]['1'],res.data.count[item]['5'],res.data.count[item]['3']]
                               this.source0[2]=arr0
                           }else if(item=='3month'){
                               arr0=['本季度',res.data.count[item].total,res.data.count[item]['1'],res.data.count[item]['5'],res.data.count[item]['3']]
                               this.source0[3]=arr0
                           }
                       })
                        Object.keys(res.data.amount).forEach(item=>{
                            let arr0=[];
                            if(item=='day'){
                                arr0=['今日',res.data.amount[item].total,res.data.amount[item]['total_final'],res.data.amount[item]['total_pre']]
                                this.source1[0]=arr0
                            }else if(item=='week'){
                                arr0=['本周',res.data.amount[item].total,res.data.amount[item]['total_final'],res.data.amount[item]['total_pre']]
                                this.source1[1]=arr0
                            }else if(item=='month'){
                                arr0=['本月',res.data.amount[item].total,res.data.amount[item]['total_final'],res.data.amount[item]['total_pre']]
                                this.source1[2]=arr0
                            }else if(item=='3month'){
                                arr0=['本季度',res.data.amount[item].total,res.data.amount[item]['total_final'],res.data.amount[item]['total_pre']]
                                this.source1[3]=arr0
                            }
                        })
                    }
                    // this.source0=
                    //     [
                    //     ['今日', 4,1,1,1],
                    //         ['本周', 4,1,1,1],
                    //         ['本月', 4,1,1,1],
                    //         ['本季度', 4,1,1,1],
                    //     ]
                    this.histogram();
                })
            },
            histogram(){
                var myChart = echarts.init(document.getElementById('main'));

                var myChart1 = echarts.init(document.getElementById('main1'));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '订单成交数量',
                        textStyle: {
                            rich: {
                                big: {
                                    fontSize: 48,
                                    color: '#8DEAFB',
                                },
                                vcolor: {
                                    fontSize: 24,
                                    color: '#8DEAFB',
                                    fontFamily: 'SimSun',
                                }
                            }
                        }
                    },
                    legend: {
                        right: 100,
                        top: 0,
                        textStyle: {
                            color: '#333',
                        },
                        data: [
                            {
                                name: '总订单数',
                                icon: 'circle',
                            },
                            {
                                name: '全款订单数',
                                icon: 'circle',
                            },
                            {
                                name: '预付款订单数',
                                icon: 'circle',
                            },
                            {
                                name: '已取消订单',
                                icon: 'circle',
                            },
                        ],
                    },
                    color: [
                        new echarts.graphic.LinearGradient(231,97,79,1, [{
                            offset: 0,
                            color: '#e7614f'
                        }, {
                            offset: 1,
                            color: '#e7614f'
                        }]),
                        new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#e7c54f'
                        }, {
                            offset: 1,
                            color: '#e7c54f'
                        }]),
                        new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#75c96d'
                        }, {
                            offset: 1,
                            color: '#75c96d'
                        }]),
                        new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#6db0c9'
                        }, {
                            offset: 1,
                            color: '#6db0c9'
                        }])
                    ],
                    tooltip: {},

                    dataset: {
                        // 提供一份数据。
                        dimensions: ['', '总订单数', '全款订单数', '预付款订单数', '已取消订单'],
                        source:this.source0
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#46EEF4'
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            color: '#00f4fc',
                            fontSize: 14,
                        },
                        axisTick: {
                            show: false
                        },
                        triggerEvent: true //将x轴的标签声明为可点击 触发事件
                    },
                    yAxis: [{
                        type: 'value',
                        // splitNumber: 5,
                        // interval: 400,

                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#333',
                                opacity: 0.5
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#333',
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    ],
                    series: [
                        {
                            type: 'bar',
                            barWidth: '15',
                            itemStyle: {
                                // barBorderRadius: 6,

                            },
                        },
                        {
                            type: 'bar',
                            barWidth: '15',
                        },
                        {
                            type: 'bar',
                            barWidth: '15',
                        }
                        ,
                        {
                            type: 'bar',
                            barWidth: '15',
                        }
                    ]
                };
                var option1 = {
                    title: {
                        text: '订单成交金额（元）',
                        textStyle: {
                            rich: {
                                big: {
                                    fontSize: 48,
                                    color: '#8DEAFB',
                                },
                                vcolor: {
                                    fontSize: 24,
                                    color: '#8DEAFB',
                                    fontFamily: 'SimSun',
                                }
                            }
                        }
                    },
                    legend: {
                        right: 100,
                        top: 0,
                        textStyle: {
                            color: '#333',
                        },
                        data: [
                            {
                                name: '订单总金额',
                                icon: 'circle',
                            },
                            {
                                name: '总全款金额',
                                icon: 'circle',
                            },
                            {
                                name: '总预付款金额',
                                icon: 'circle',
                            },
                        ],
                    },
                    color: [
                        new echarts.graphic.LinearGradient(231,97,79,1, [{
                            offset: 0,
                            color: '#e7614f'
                        }, {
                            offset: 1,
                            color: '#e7614f'
                        }]),
                        new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#e7c54f'
                        }, {
                            offset: 1,
                            color: '#e7c54f'
                        }]),
                        new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#75c96d'
                        }, {
                            offset: 1,
                            color: '#75c96d'
                        }]),
                        new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#6db0c9'
                        }, {
                            offset: 1,
                            color: '#6db0c9'
                        }])
                    ],
                    tooltip: {},

                    dataset: {
                        // 提供一份数据。
                        dimensions: ['', '订单总金额', '总全款金额', '总预付款金额'],
                        source:this.source1
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#46EEF4'
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            color: '#00f4fc',
                            fontSize: 14,
                        },
                        axisTick: {
                            show: false
                        },
                        triggerEvent: true //将x轴的标签声明为可点击 触发事件
                    },
                    yAxis: [{
                        type: 'value',
                        // splitNumber: 5,
                        // interval: 400,

                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#333',
                                opacity: 0.5
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#333',
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    ],
                    series: [
                        {
                            type: 'bar',
                            barWidth: '15',
                            itemStyle: {
                                // barBorderRadius: 6,

                            },
                        },
                        {
                            type: 'bar',
                            barWidth: '15',
                        },
                        {
                            type: 'bar',
                            barWidth: '15',
                        }
                        ,

                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                myChart1.setOption(option1);
            },
        },
        mounted(){
           this.all()
           this.querySellerCenterSummary()
        }
    };
</script>
