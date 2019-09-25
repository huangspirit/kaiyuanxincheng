<template>
<div>
    <div  class="buyerOrderDetail">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="content">
                <div class="step">
                    <div class="left">
                        <p class="">订单号：{{item.orderVo.order_no}}</p>
                        <p class="icon" v-if="item.orderVo.order_status==4">
                            <i class="el-icon-success"></i><br>
                            <span >订单已完成</span>
                        </p>
                        <p class="icon" v-if="item.orderVo.order_status!=4">
                            <i class="el-icon-warning color"></i><br>
                            <span class="color">订单未完成</span>
                        </p>
                    </div>
                    <div class="right" v-if="OrderProcessList.length">
                        <p>当前订单状态</p>
                        <ul >
                            <li v-for="item in OrderProcessList" :key="item.id">
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
                <div class="cont">
                    <ul>
                        <li>
                            <div class="title">收货信息</div>
                            <div class="center">
                                <p>收货人：{{item.orderVo.receivingName}}</p>
                                <p>地址：{{item.orderVo.address}}{{item.orderVo.detailedAddress}}</p>
                                <p>手机号：{{item.orderVo.phone}}</p>
                            </div>
                            <div></div>
                        </li>
                        <li>
                             <div class="title">合同签署</div>
                             <div class="center">
                                 <p>用户类型：{{item.orderVo.userType}}</p>
                                 <p>订单类型：{{item.orderVo.isMonth?'月结订单':'普通订单'}}</p>
                                 <p v-if="item.orderVo.userCheckDay">月结白条周期：{{item.orderVo.userCheckDay}}天</p>
                                 <p>订单状态：{{item.orderVo.orderStatesDesc}}</p>
                             </div>
                             <div v-if="item.orderVo.download" style="display:flex;">
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
                        <li>
                             <div class="title">付款方式/明细</div>
                             <div class="center">
                                 <div v-if="item.orderVo.firtPayNo && item.orderVo.firtPayNo!=item.orderVo.lastPayNo">
                                     <p v-if="item.orderVo.prePayChannel == 3">
                                         预付款：
                                         {{item.orderVo.createtime | formatDate2}}
                                         <strong class="">对公转账</strong>
                                          <img
                                                @click="PrvExampleDiagram(item.orderVo.firtPayNo)"
                                                :src="item.orderVo.firtPayNo + '?imageView2/2/w/40/h/20'"
                                            />
                                     </p>
                                 </div>
                                 <!-- <p class="">2019-12-10 10:10:10 对公转账 ￥20000</p>
                                 <p class="">2019-12-10 10:10:10 对公转账 ￥20000</p> -->
                             </div>
                        </li>
                        <li>
                             <div class="title">发票信息</div>
                             <div class="center">
                                 <p class="">发票类型：{{item.orderVo.billType}}</p>
                                 <p class="">单位名称：{{item.orderVo.danweiName}}</p>
                                 <p>纳税人识别号：{{item.orderVo.nashuirenNo}}</p>
                                 <p>地址（电话）：{{item.orderVo.billAdress}}<br>{{item.orderVo.phone}}</p>
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
                                    <td rowspan="item.list.length" v-if="index==0" style="border-right:1px solid #ddd;">
                                        <img :src="value.headImgUrl" alt="" class="userimage">
                                        {{value.username}}
                                    </td>
                                    <td>
                                        <div class="gpoodsinfo">
                                            <ImgE :src="value.goods_image" :W="50" :H="50"></ImgE>
                                            <div>
                                                <p class="name">{{value.goods_name}}</p>
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
                                    <td>{{value.priceunit?'$':'￥'}}{{value.total_price | toFixed(3)}}</td>
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
                                        >{{item1.trans_no}}</span>
                                        </el-popover>
                                    </div>
                                    <p v-else>暂无物流编号</p>
                                    </td>
                                    <td>35</td>
                                    <td>
                                        <p>{{value.complete_date | formatDate}}</p>
                                         <p>{{value.diliver_place}}</p>
                                         <p>{{value.order_status | filtersStatus}}</p>
                                    </td>
                                    <td>
                                        <el-button size="mini" v-if="value.confirmChangeDiliverTimeButton"
                                                @click="confirmChangeDiliverTime(value)">确认新交期</el-button>
                                        <el-button size="mini"  v-if="value.cancleButton"
                                                @click="cancleOrder(2,value.id)">取消订单</el-button>
                                        <el-button size="mini" @click="confirmRecieveGoods(value.id)"
                                                v-if="value.receivingGoodsButton">确认收货</el-button>
                                     
                                        <div v-if="value.reason" class="cancleReason">取消原因：{{value.reason}}</div>
                                    </td>
                                </tr>
                            </template>
                            
                        </tbody>
                    </table>
                    <div class="fr total">
                        <p class=""><strong class="">人民币</strong>共1种器件，金额小计：<span class="right">￥888</span></p>
                         <p class=""><strong class="">美元</strong>共1种器件，金额小计：<span class="right">US$888</span></p>
                         <P>今日美元汇率牌价：<span class="right">7.38234</span></P>
                         <P>海关增值税13%：<span class="right">232</span></P>
                         <P>关税：<span class="right">7.38234</span></P>
                         <P>清关服务费：<span class="right">7.38234</span></P>
                        
                    </div>
                     <div class="footer">应付人民币总额：￥324234523</div>
                </div>
            </div>
            
        </div>
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
               <el-dialog :visible.sync="imgDialogVisible">
                <img width="100%;" :src="dialogImageUrl" alt />
            </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { TimeForma,TimeForma2 } from "@/lib/utils";
import { axios, buyerOrderCenter } from "@/api/apiObj";
import { baseURL, baseURL2 } from "@/config";
    export default{
        //  props: {
        //     item: {
        //         type: Object,
        //         default: () => ({})
        //     }
        // },
        data(){
            return {
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
            }
        },
        created(){
           this.item=JSON.parse(localStorage.getItem("buyerOrderDetail"));
        },
        mounted(){
            this.getprogress()
            let obj={}
            this.item.orderInfoList.forEach(item=>{
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
                this.orderInfoList=obj
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
                    this.$emit("successFlagHandel");
                }
                });
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
    }
</script>
<style lang="less" scoped>
    .buyerOrderDetail{
        // position :absolute;
        left:0;
        top:0;
        background:#f0f3ef;
        right:0;
        bottom:0;
        z-index:2;
        color:#333;
        .content{
            // height:80%;
            // overflow-y: auto;
            .step{
                    background:#fff;
                    display:flex;
                    align-items: center;
                    width:100%;
                    .left{
                        padding:0 30px;
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
                        width:70%;
                        box-sizing: border-box;
                        overflow: hidden;
                        ul{
                            display:flex;
                            overflow-x: auto;
                            width:100%;
                            li{
                                width:15vw;
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
        


            .cont{
                background:#fff;
                margin-top:10px;
                ul{
                    display:flex;
                    li{
                        flex:1;
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
                    tr{
                        border-bottom:1px solid #ddd;
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
                    }
            }
        }   
        
    }
</style>