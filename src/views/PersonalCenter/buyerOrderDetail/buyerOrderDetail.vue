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
                            <i class="el-icon-success"></i>
                            <span style="display:block;" v-if="item.orderVo.orderStatesDesc">{{item.orderVo.orderStatesDesc}}</span>
                        </p>
                        <p class="icon" v-if="item.orderVo.order_status!=4" style="color:#999;">
                            <i class="el-icon-warning"></i>
                            <span  style="display:block;" v-if="item.orderVo.orderStatesDesc">{{item.orderVo.orderStatesDesc}}</span>
                        </p>
                    </div>
                     <div v-if="OrderProcessList.length" class="center" style="padding:15px;flex:1;">
                         <p>当前订单状态</p>
                         <div style="height:80px;overflow-y:auto;" class="steps">
                            <el-steps direction="vertical" >
                                <el-step :title="TimeForma2(item.createtime)"  icon="el-icon-s-tools" v-for="item in OrderProcessList" :key="item.id" :description="item.ordesc"></el-step>
                            </el-steps>
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
                                 <!-- <p>订单状态：{{item.orderVo.orderStatesDesc}}</p> -->
                             </div>
                             <div  style="display:flex;">
                                 <div style="margin-right:10px;">
                                    <el-button  size="mini">
                                           <a  :href="`${baseURL}api-order/customerCenter/downLoad?urls=${item.orderVo.contractUrl}&access_token=${access_token}`">
                                         下载合同(系统)</a>
                                    </el-button>
                                 </div>
                                 <div style="margin-right:10px;">
                                    <el-button  size="mini" v-if="item.orderVo.customerContractUrl">
                                           <a :href="`${baseURL}api-order/customerCenter/downLoad?urls=${item.orderVo.customerContractUrl}&access_token=${access_token}`">
                                         下载合同(已上传)</a>
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
                        <li class="item" v-if="item.orderVo.billType">
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
                                 <div class style="border-bottom:1px solid #ddd;padding-bottom:10px">
                                    <p class="color" style="margin-right:10px;">总金额：￥{{item.orderVo.order_amount | toFixed(2)}}</p>
                                    <p class="" style="margin-right:10px;">已付金额：￥{{item.orderVo.alreadyPay | toFixed(2)}}</p>
                                    <p class="green" style="margin-right:10px;">未付金额：￥{{item.orderVo.shouldPay | toFixed(2)}}</p>
                                     <!-- <p >优惠金额：￥{{item.orderVo.counpPay | toFixed(2)}}</p> -->
                                       
                                     <!-- <p
                                    v-if="item.orderVo.order_status==5"
                                    class=""
                                    >已付金额：￥{{item.orderVo.order_prepay | toFixed(2)}}</p> -->
                                    <!-- <p
                                    class=""
                                    v-if="item.orderVo.order_status==1 || item.orderVo.order_status==4 || item.orderVo.order_status==6 || item.orderVo.order_status==6"
                                    >已付金额：￥{{item.orderVo.order_amount | toFixed(2)}}</p> -->
                                    <div style="white-space:nowrap;display:flex;">
                                        <!-- <p
                                            v-if="!item.orderVo.prePayChannel && !item.orderVo.need_pre_pay"
                                            class="green"
                                            style="margin-right:10px;"
                                            >未付金额：￥{{item.orderVo.order_amount | toFixed(2)}}</p>
                                        <p
                                       v-if="item.orderVo.prePayButton"
                                        class="green"
                                        style="margin-right:10px;"
                                        >未付金额：￥{{item.orderVo.order_prepay | toFixed(2)}}</p>  -->
                                        <p style="white-space: nowrap;" v-if="item.orderVo.prePayButton">
                                        <a
                                        href="javascript:;"
                                        @click="payment(0,item)"
                                        
                                        class="btnColor"
                                    >去付款
                                    </a>
                                    <i class="el-icon-question color" title="本次预付款金额为总金额的30%;" style="cursor:pointer;font-size:18px;margin-left:10px;"></i>
                                    </p>
                                    
                                    <a
                                        href="javascript:;"
                                        @click="vipPayment(item)"
                                        v-if="item.orderVo.isMonth && item.orderVo.payButton"
                                        class="btnColor"
                                        style="display:block;"
                                    >白条支付</a>
                                    <a
                                        href="javascript:;"
                                        @click="transPayment(item)"
                                        v-if="item.orderVo.isMonth && item.orderVo.order_status==0 && !item.orderVo.payButton"
                                        class="btnColor"
                                    >转普通订单</a>

                                    <a
                                        href="javascript:;"
                                        @click="payment(2,item)"
                                        v-if="!item.orderVo.isMonth && !item.orderVo.need_pre_pay && item.orderVo.payButton"
                                        class="btnColor"
                                    >全额付款</a>
                                    </div>
                                </div>
                    
                                 <div v-if="item.orderVo.need_pre_pay && !item.orderVo.prePayButton && item.orderVo.prePayChannel" :class="item.orderVo.order_status==0?'color':'green'" class="paychannel">
                                     <!-- <strong>预付款：￥{{item.orderVo.order_prepay}} （{{payTypeMark[item.orderVo.prePayChannel].title}}）</strong><br>
                                      <span v-if="item.orderVo.prePayChannel == 3">凭证：</span>
                                    <img
                                        v-if="item.orderVo.prePayChannel == 3"
                                        @click="PrvExampleDiagram(item.orderVo.firtPayNo)"
                                        :src="item.orderVo.firtPayNo + '?imageView2/2/w/80/h/46'"
                                    />
                                    <strong v-if="item.orderVo.prePayChannel != 3">付款编号：</strong>
                                    <span v-if="item.orderVo.prePayChannel != 3">{{item.orderVo.firtPayNo}}</span><br>
                                    <span> 时间：{{item.orderVo.prePayTime | formatDate2}}</span> -->
                                    <span>{{item.orderVo.prePayTime | formatDate}}</span>
                                    <span>
                                        {{item.orderVo.prePayChannel | prePayChannel}}
                                    </span>
                                    <span>￥{{item.orderVo.order_prepay | toFixed(2)}}</span>
                                    <span v-if="item.orderVo.order_status==0">确认中</span>
                                      <span v-if="item.orderVo.order_status!=0">已到账</span>
                                       <span v-if="item.orderVo.prePayChannel != 3">{{item.orderVo.firtPayNo}}</span>
                                    <img
                                        v-if="item.orderVo.prePayChannel == 3"
                                        @click="PrvExampleDiagram(item.orderVo.firtPayNo)"
                                        :src="item.orderVo.firtPayNo + '?imageView2/2/w/80/h/46'"
                                    />
                                 </div>
                                 <div v-else-if="item.orderVo.prePayChannel" :class="item.orderVo.order_status==0?'color':'green'" class="paychannel">
                                      <!-- <strong>全额付款：￥{{item.orderVo.order_amount}} （{{payTypeMark[item.orderVo.prePayChannel].title}}）</strong><br>
                                      <span v-if="item.orderVo.prePayChannel == 3">凭证：</span>
                                    <img
                                        v-if="item.orderVo.prePayChannel == 3"
                                        @click="PrvExampleDiagram(item.orderVo.firtPayNo)"
                                        :src="item.orderVo.firtPayNo + '?imageView2/2/w/80/h/46'"
                                    />
                                    <strong v-if="item.orderVo.prePayChannel != 3">付款编号：</strong>
                                    <span v-if="item.orderVo.prePayChannel != 3">{{item.orderVo.firtPayNo}}</span><br>
                                   
                                      <span>时间：{{item.orderVo.prePayTime | formatDate}}</span>-->
                                       <span>{{item.orderVo.prePayTime | formatDate}}</span>
                                    <span>
                                        {{item.orderVo.prePayChannel | prePayChannel}}
                                    </span>
                                    <span >￥{{item.orderVo.order_amount | toFixed(2)}} </span>
                                    <span v-if="item.orderVo.order_status==0">确认中</span>
                                     <span v-if="item.orderVo.order_status!=0">已到账</span>
                                    <img
                                        v-if="item.orderVo.prePayChannel == 3"
                                        @click="PrvExampleDiagram(item.orderVo.firtPayNo)"
                                        :src="item.orderVo.firtPayNo + '?imageView2/2/w/80/h/46'"
                                    />
                                 </div>
                                 
                             </div>
                        </li>
                        
                    </ul>
                </div>
                <div class="list clear">
                    <!-- <div class="title">采购清单</div> -->
                    <table border="1">
                        <thead>
                            <tr>
                                <th>零件信息</th>
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
                                <template v-for="(value,index) in item.list" >
                                  <tr :key="index" v-if="index==0" class="tit">
                                    <td colspan="8">
                                      <div style="cursor:pointer;display:flex;"  @click="chipShop(value)">
                                            <img :src="value.headImgUrl" alt="" class="userimage" style="margin-right:10px;">
                                            <div>
                                                    <p style="margin:5px;">{{value.username}}</p>
                                        <span class="tag bgColor" v-if="value.tag==1">{{value.tag | tagFilter}}</span>
                                             <span class="tag bgBlu" v-if="value.tag==2">{{value.tag | tagFilter}}</span>
                                              <!-- <span class="tag bgOrange" v-if="value.tag==18">{{value.tag | tagFilter}}</span> -->
                                            </div>
                                       
                                        </div>
                                    </td>
                                  </tr>
                                <tr :key="value.id">
                                    <!-- <td :rowspan="item.list.length" v-if="index==0" style="border-right:1px solid #ddd;">
                                        <div style="cursor:pointer;display:flex;"  @click="chipShop(value)">
                                            <img :src="value.headImgUrl" alt="" class="userimage" style="margin-right:10px;">
                                            <div>
                                                    <p style="margin:5px;">{{value.username}}</p>
                                        <span class="tag bgColor" v-if="value.tag==1">{{value.tag | tagFilter}}</span>
                                             <span class="tag bgBlu" v-if="value.tag==2">{{value.tag | tagFilter}}</span>
                                              <span class="tag bgOrange" v-if="value.tag==18">{{value.tag | tagFilter}}</span>
                                            </div>
                                       
                                        </div>
                                    </td> -->
                                    <td>
                                        <div class="gpoodsinfo" style="max-width:300px">
                                            <ImgE :src="value.goods_image" :W="80" :H="80"></ImgE>
                                            <div style="max-width:300px">
                                                <router-link class="color" :to="{
                                                   path:'/BrandDetail/GoodsDetails',
                                                    query:{
                                                        tag:'goodsinfo',
                                                        name:value.goods_name,
                                                        documentid:value.goods_id
                                                    }
                                                    }" style="font-size:15px;">
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
                                                    }">{{value.goods_branda}}</router-link>
                                                       </p> 
                                             
                                                <p class="gray desc">{{value.goods_desc}}</p>
                                            </div>
                                        </div>
                                        </td>
                                    <td>
                                     
                                       <div v-if="value.good_price"> {{value.priceunit?'$':'￥'}}{{value.good_price | toFixed(value.priceunit?3:2)}}
                                         
                                            </div>
                                    </td>
                                    <td>{{value.goods_count}}</td>
                                    <td>
                                      <el-popover
                                        placement="bottom"
                                        trigger="hover"
                                        >
                                        <div v-if="!value.goods_type" style="white-space:nowrap;">
                                          <p v-if="!value.pay_channel && !value.last_pay_channel">未付款</p>
                                          <p  v-if="value.pay_channel">
                                            <span style="margin-right:10px;">预付款：￥{{value.pre_pay | toFixed(2)}}</span>
                                            <span v-if="value.pay_channel==3" style="margin-right:10px;">
                                              <ImgE :src="value.prePayNo" :W="40" :H="40" :isBig="true"></ImgE>
                                              </span>
                                             <span v-if="value.pay_channel && value.pay_channel!=3 && value.prePayNo"  class="blu" style="margin-right:10px;">{{value.prePayNo}}</span>
                                            
                                             <span v-if="value.pay_channel==3 && value.final_pay">已审核</span>   
                                              <span v-if="value.pay_channel==3 && !value.final_pay">待审核</span>   
                                          </p>
                                          <p  v-if="value.final_pay">
                                            <span style="margin-right:10px;">尾  &nbsp;&nbsp;款：￥{{value.final_pay | toFixed(2)}}</span>
                                            <span v-if="value.last_pay_channel==3" style="margin-right:10px;">
                                              <ImgE :src="value.finalPayNo" :W="40" :H="40" :isBig="true"></ImgE>
                                              </span>
                                             <span v-if="value.last_pay_channel && value.last_pay_channel!=3 && value.finalPayNo" class="blu" style="margin-right:10px;">{{value.finalPayNo}}</span>
                                            <span v-if="value.last_pay_channel" style="margin-right:10px;">（{{value.last_pay_channel | prePayChannel}}）</span>
                                            <span v-if="!value.last_pay_channel" style="margin-right:10px;">（待支付）</span>
                                            <span v-if="value.last_pay_channel==3 && value.order_status!=5">已审核</span>   
                                              <span v-if="value.last_pay_channel==3 && value.order_status==5">待审核</span>   
                                            </p>
                                        </div>
                                        <div v-if="value.goods_type">
                                           <p v-if="!value.pay_channel && !value.last_pay_channel">未付款</p>
                                          <p  v-if="value.pay_channel">
                                            <span style="margin-right:10px;">总金额：￥{{value.pre_pay | toFixed(2)}}</span>
                                          <span v-if="value.pay_channel==3" style="margin-right:10px;">
                                              <ImgE :src="value.prePayNo" :W="40" :H="40" :isBig="true"></ImgE>
                                              </span>
                                             <span v-if="value.pay_channel && value.pay_channel!=3 && value.prePayNo"  class="blu" style="margin-right:10px;">{{value.prePayNo}}</span>
                                             <span style="margin-right:10px;">（{{value.pay_channel | prePayChannel}}）</span>
                                             <span v-if="value.pay_channel==3 && value.order_status">已审核</span>   
                                              <span v-if="value.pay_channel==3 && value.order_status==0">待审核</span>   
                                          </p>

                                        </div>
                                        <a href="javascript:;" slot="reference"> {{value.priceunit?'$':'￥'}}{{value.total_price | toFixed(value.priceunit?3:2)}}</a>
                                      </el-popover>
                                      </td>
                                  
                                    <td>
                                        <div v-if="value.trans_no">
                                            <!-- <span>{{value.trans_no}}</span> -->
                                        <el-popover
                                        placement="top-start"
                                        width="500"
                                        trigger="click"
                                        @show="getDiliverInfo(value.id)"
                                        >
                                        <div class="orderpress" style="max-height:600px;overflow-y:auto;">
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
                                            style="color:#0d98ff; cursor: pointer;margin-left:10px;text-decoration: underline;"
                                        >{{value.trans_no}}</span>
                                        </el-popover>
                                    </div>
                                    <p v-else>暂无物流信息</p>
                                    </td>
                                    <td>
                                      <span v-if="value.guanshui">￥{{value.guanshui}}</span>
                                      </td>
                                    <td >
                                      <div style="position:relative;">
                                          <p>{{value.complete_date | formatDate}}</p>
                                          <p>{{value.diliver_place}}</p>
                                          <template v-if="value.order_status==3">
                                            <p v-if="item.orderVo.order_status==3">{{value.order_status | filtersStatus}}</p>
                                            <img v-if="item.orderVo.order_status!=3" src="@/assets/image/PersonalCenter/cancleMark.png" alt="" class="cancleMark" style="top:0;width:60px;">
                                          </template>
                                          <template v-if="value.order_status!=3">
                                            <p>{{value.order_status | filtersStatus}}</p>
                                          </template>
                                         
                                      </div>
                            
                                        
                                    </td>
                                    <td class="btn">
                                      <p v-if="value.order_mark">
                                        <el-popover
                                              placement="right"
                                              title="买家备注："
                                              width="200"
                                              trigger="hover"
                                              :content="value.order_mark">
                                              <a  slot="reference">查看备注</a>
                                            </el-popover>
                                      </p>
                                        <p v-if="value.confirmChangeDiliverTimeButton"><el-button size="mini" 
                                                @click="confirmChangeDiliverTime(value)">确认新交期</el-button></p>
                                        <p v-if="value.cancleButton"> <el-button size="mini"  
                                                @click="cancleOrder(2,value)">取消此零件</el-button></p>
                                        <p v-if="value.receivingGoodsButton">
                                             <el-button size="mini" @click="confirmRecieveGoods(value.id)"
                                                >确认收货</el-button>
                                        </p>
                                         <div v-if="value.reason" class="cancleReason">取消原因：{{value.reason}}</div>
                                                <p><el-button size="mini" @click="rate(value)" v-if="value.commentButton"
                                                >去评价</el-button></p>
                                    </td>
                                </tr>
                                </template>
                            </template>
                            
                        </tbody>
                    </table>
                    <div class="fr total relative" style="position:relative;">
                        <img v-if="item.orderVo.order_status==3" src="@/assets/image/PersonalCenter/bigCancleMark.png" alt="" class="cancleMark">
                        <p class=""><strong class="">人民币</strong>共{{countObj.renCount}}种零件，金额小计：<span class="right">{{countObj.ren | toFixed(2)}}</span></p>
                         <p class=""><strong class="">美元</strong>共{{countObj.usdCount}}种零件，金额小计：<span class="right">US${{countObj.usd | toFixed(3)}}</span></p>
                         <P>今日美元汇率牌价：<span class="right">{{item.orderVo.today_exchange}}</span></P>
                         <P>海关增值税13%：<span class="right">{{item.orderVo.order_bill | toFixed(2)}}</span></P>
                         <P>关税：<span class="right">￥{{item.orderVo.guanshui_total | toFixed(2)}}</span></P>
                         <P>清关服务费：<span class="right">￥{{item.orderVo.guanshui_service | toFixed(2)}}</span></P>
                    </div>
                     <div class="footer" v-if="item.orderVo.order_status!=3">订单总额：<label>￥{{item.orderVo.order_amount | toFixed(2)}}</label></div>
                     <!-- <div class="footer" v-if="item.orderVo.order_status==3"><label for="">订单已取消</label></div> -->
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
                <p>若拒绝接收新交期，请在订单中心取消零件</p>
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
                    </ul>
                </div>
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
                   <div style="text-align:center;line-height:500px;">
<img width="100%;" :src="dialogImageUrl" alt style="max-width:500px;max-height:500px;"/>
                   </div>
                
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
                              >图片尺寸请确保800px*800px以上，文件大小在2MB以内，支持png、jpg、gif格式</div>
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
         <add-rate :item="addRateItem" @submitRateSuc="submitRateSuc" v-if="showAddRate" :showAddRate="showAddRate"></add-rate>
      <el-dialog title="选择付款方式" :visible.sync="selectedPayType" width="30%">
      <div>
        <div class="selectpayType">
          <el-button @click="payType=1" :class="{bgColor:payType==1}" class="btn">对公转账</el-button>
          <!-- <el-button  @click="payType=2" :class="{bgColor:payType==2}" class="btn">在线支付</el-button> -->
          <el-button @click="payType=3" :class="{bgColor:payType==3}" class="btn">微信支付</el-button>
          <el-button @click="payType=4" :class="{bgColor:payType==4}" class="btn">支付宝支付</el-button>
        </div>
       
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectedPayType = false">取 消</el-button>
        <el-button type="primary" @click="submitpayType">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogCode"
      width="350px"
      :close-on-click-modal="false"
      title="微信扫码支付"
      class="weichatCode"
    >
      <div class="weichatCodeCont">
        <img :src="`data:image/jpeg;base64,${payCodeImgUrl}`" class="codeImg" />
        <div class="Invalid" v-if="InvalidFlag">
          <img src="@/assets/image/PersonalCenter/_u1118.png" alt @click="paymentHandle()" />
          <br />
          <span>刷新重新获取支付二维码</span>
        </div>
      </div>
    </el-dialog>
    <bankTransfer
      :bankTransferObj="bankTransferObj"
      v-if="bankTransferShow"
      @closeBankTransfer="bankTransferShow=false"
      @bankSuccess="bankSuccess"
    ></bankTransfer>
    <el-dialog title="温馨提示" :visible.sync="transPaymentshow" width="30%">
      <strong>如果转其他的支付方式，则月结订单会自动转成普通订单，不可再转化成月结订单，请慎重选择</strong>
      <span slot="footer" class="dialog-footer">
        <el-button @click="transPaymentshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmtransPayment">确定转换</el-button>
      </span>
    </el-dialog>
    <div v-html="formhtml" ref="formwrap"></div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { TimeForma,TimeForma2 } from "@/lib/utils";
import { axios, buyerOrderCenter } from "@/api/apiObj";
import { baseURL, baseURL2,imgBaseUrl } from "@/config";

import AddRate from "@/components/addRate";
import bankTransfer from "_c/bankTransfer";
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
                baseURL:baseURL,
                addRateItem:{},
                showAddRate:false,
                TimeForma2:TimeForma2,
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
                currentSecondOrder:{},
                //订单付款模块
                transPaymentshow: false,
                transPaymentobj: {},
                formhtml: "",
                paymentType: 0,
                paymoney: 0,
                bankTransferShow: false,
                bankTransferObj: {}, //公对公转账传参
                currentSecondOrder: {},
                payType: 1,
                selectedPayType: false,
                showDialog: false,
                showDialoglittle: false,
                showDialogcancle: false,
                 orderStatus: true,
                // 需要支付付二维码
                payCodeImgUrl: "",
                // 支付二维码的模态框
                dialogCode: false,
                // 取消订单支付二维码的模态框
                dialogCode1: false,
                // 刷新二维码的flag
                InvalidFlag: false,
                // 当前支付的状态
                currentStatus: 0,
                
            }
        },
        components:{
            AddRate,
             bankTransfer
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
            prePayChannel(val){
                switch (val){
                    case 1:
                    return '微信支付';
                    case 2:
                    return '支付宝支付';
                    case 3:
                    return '对公支付';
                    case 4:
                    return '白条支付'
                }
                
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
            chipShop(item){
              
                if(item.tag==1){
                    this.$router.push({
                        path:"/BrandDetail",
                        query:{
                            seller_id:item.seller_id
                        }
                    })
                }else{
                    this.$router.push({
                        path:"/sellerShopDetail",
                        query:{
                           
                            sellerId:item.seller_id
                        }
                    })
                }
            },
            submitRateSuc(){
                this.showAddRate=false;
                this.getorderDetail()
            },
            getorderDetail(){
              this.$loading(this.$store.state.loading);
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
                      if( item.order_status!=3){
                      if(item.priceunit ){
                            count.usdCount++;
                            count.usd+=item.total_price
                        }else{
                            count.renCount++;
                            count.ren+=item.total_price
                        }
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
                        this.$loading(this.$store.state.loading).close();
        
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
                    _this.getorderDetail();
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
        //this.dialogVisible3=true;
         this.$confirm('请确认您已收到货品，确认后系统将会放款给卖家', '温馨提示', {
          confirmButtonText: '确认收货',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.request({...buyerOrderCenter.confirmRecieveGoods,params:{
        orderId:this.confirmRecieveGoodsId
        }}).then(res=>{
        if(res){
         //   this.dialogVisible3=false;
          this.getorderDetail()
        }
        })
        }).catch(() => {
                  
        });
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
        rate(item){
            this.showAddRate=true;
            this.addRateItem=item;
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
       // 微信支付的轮训失败后刷新获得新的二维码
    paymentHandle() {
      this.paymentWe(this.paymentWeSendData);
      
    },
    paymentWe(data) {
      if (this.paymentType == 3) {
        //取消零件补交报关费
        axios
          .request({
            ...buyerOrderCenter.getWechatPayBaoguan,
            params: { orderId: this.cancleOrderPay.id }
          })
          .then(codeResp => {
            this.wepayRes(codeResp.data);
          });
        return;
      }
      this.$store
        .dispatch("SignContract/GetWeChatPay", data)
        .then(codeResp => {
          this.wepayRes(codeResp);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    wepayRes(codeResp) {
      let order_no = "";
      if (this.paymentType == 1 || this.paymentType == 3) {
        //尾款或者取消零件补交的报关费
        order_no = this.item.order_no;
      } else if (this.paymentType == 0 || this.paymentType == 2) {
        //预付款或者全款
        order_no = this.item.orderVo.order_no;
      }
      this.dialogCode = true;
      this.payCodeImgUrl = codeResp.prepay_id;
      let count = 0;
      var _this = this;
      // 拿到二维码之后进行轮训获取支付状态
      this.timep = setInterval(() => {
        count++;
        if (count === 40) {
          clearInterval(_this.timep);
          _this.InvalidFlag = true;
        } else {
          _this.InvalidFlag = false;
          _this.$store
            .dispatch("SignContract/GetPayStatus", {
              orderno: order_no,
              messageid: codeResp.flag
            })
            .then(statusResp => {
              // 如果支付状态是1，支付成功，跳到我的订单页面
              if (statusResp === 1) {
                clearInterval(_this.timep);
                _this.timep = null;
                this.selectedPayType = false;
                this.dialogCode = false;
                _this.getorderDetail();
              }
            });
        }
      }, 3000);
    },
    transPayment(item) {
      this.transPaymentshow = true;
      this.transPaymentobj = item;
    },
    confirmtransPayment() {
      axios
        .request({
          ...buyerOrderCenter.changePayMent,
          params: { orderNo: this.transPaymentobj.orderVo.order_no }
        })
        .then(res => {
          if(res.resultCode==200){
             this.transPaymentshow = false;
             this.getorderDetail();
this.payment(2, this.transPaymentobj);
          }else{
            this.$message({
              message:res.message,
              type:warning
            })
          }
          
        });
    },
    // 点击付款
    payment(x, item) {
      this.item = item;
      this.currentStatus = x;
      this.payType = 1;
      let totalPrice = 0;
      switch (x) {
        case 0:
          this.paymentType = 0; //标志付定金
          totalPrice = this.item.orderVo.order_prepay;
          break;
        case 1:
          this.paymentType = 1; //标志付尾款
          console.log(this.item);
          totalPrice = this.item.final_pay;
          break;
        case 2:
          this.paymentType = 2; //标志付全款
          totalPrice = this.item.orderVo.order_amount;
          break;
      }
      console.log("全款：", totalPrice);
      this.paymoney = totalPrice;
      this.selectedPayType = true;
   
    },
       vipPayment(item) {
      this.item = item;
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
            this.getorderDetail();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //付款事件
    closeDialogCallBack() {
      this.showDialog = false;
      this.showDialoglittle = false;
      this.showDialogcancle = false;
    },
    handleAvatarSuccess(res, file) {
      if (res.resultCode == "200") {
        this.$message({
          type: "success",
          message: "上传成功，等待审核"
        });
        this.showDialog = false;
        this.showDialoglittle = false;
        this.showDialogcancle = false;
        this.dialogVisible2 = false;
        this.all();
      }
    },
    submitpayType() {
      
      if (this.payType == 1) {
        //对公转账
        if (this.paymentType == 1) {
          //标识付尾款
          this.bankTransferObj = {
            url: this.requestUrllittle,
            money: this.item.final_pay,
            title: "订单尾款"
            // time:this.item.orderVo.expireTime
          };
        } else if (this.paymentType == 3) {
          //取消零件补交报关税
          this.bankTransferObj = {
            url: this.requestUrlcancle,
            money: this.item.amount,
            title: "取消零件补交合并报关费"
            // time:this.item.orderVo.expireTime
          };
        } else if (this.paymentType == 0) {
          //预付款
          this.bankTransferObj = {
            url: this.requestUrl,
            money: this.item.orderVo.order_prepay,
            time: this.item.orderVo.expireTime,
            title: this.paymentType == 0 ? "订单预付款" : "订单全额"
          };
        } else if (this.paymentType == 2) {
          //预付款
          this.bankTransferObj = {
            url: this.requestUrl,
            money: this.item.orderVo.order_amount,
            time: this.item.orderVo.expireTime,
            title: this.paymentType == 0 ? "订单预付款" : "订单全额"
          };
        }
        this.bankTransferShow = true;
        this.selectedPayType = false;
      } else if (this.payType == 3) {
        //微信支付
        let sendData = {};
        if (this.paymentType == 1) {
          //需要获取尾款的金额
          sendData = {
            message_id: this.item.id,
            type: 1 //尾款
          };
        } else if (this.paymentType == 2) {
          //微信支付全款
          sendData = {
            message_id: this.item.orderVo.order_no,
            type: 2 //全款
          };
        } else if (this.paymentType == 0) {
          //微信支付预付款
          sendData = {
            message_id: this.item.orderVo.order_no,
            type: 0 //预付款
          };
        } else if (this.paymentType == 3) {
          //补交报关费
          sendData = {
            orderId: this.item.id
          };
        }
        this.paymentWeSendData = sendData;
        this.paymentWe(sendData);
      } else if (this.payType == 4) {
        //支付宝支付
        let sendData = {};
        if (this.paymentType == 1) {
          //支付宝尾款支付
          sendData = {
            orderNo: this.item.id,
            type: 1 //尾款
          };
        } else if (this.paymentType == 2) {
          //支付宝支付全款
          sendData = {
            orderNo: this.item.orderVo.order_no,
            type: 2 //全款
          };
        } else if (this.paymentType == 0) {
          //支付宝支付预付款
          sendData = {
            orderNo: this.item.orderVo.order_no,
            type: 0 //预付款
          };
        } else if (this.paymentType == 3) {
          //支付宝支付预付款
          sendData = {
            orderId: this.item.id
          };
          axios
            .request({
              ...buyerOrderCenter.payGuanshui,
              method: "post",
              params: sendData
            })
            .then(res => {
              this.formhtml = res.data.prepay_id;
              let _this = this;
              setTimeout(function() {
                _this.$refs.formwrap.getElementsByTagName("form")[0].charset =
                  "UTF-8";
                _this.$refs.formwrap.getElementsByTagName("form")[0].target =
                  "_blank";
                _this.$refs.formwrap.getElementsByTagName("form")[0].submit();
              }, 0);
            });
          return;
        }
        this.$store
          .dispatch("SignContract/GetAlipayPagePay", sendData)
          .then(res => {
            this.formhtml = res.prepay_id;
            let _this = this;
            setTimeout(function() {
              _this.$refs.formwrap.getElementsByTagName("form")[0].charset =
                "UTF-8";
              _this.$refs.formwrap.getElementsByTagName("form")[0].target =
                "_blank";
              _this.$refs.formwrap.getElementsByTagName("form")[0].submit();
            }, 0);
          });
      }
    },
    bankSuccess() {
     this.getorderDetail()
    }
     
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
.tag{
  padding:2px 5px;
  font-size: 12px;
  border-radius: 3px;
}
.cancleMark{
  position: absolute;
  left:40%;
  
}
 // 支付二维码的模态框
  .weichatCode{
    /deep/.el-dialog{
      // background: url('../../../assets/image/ShoppingCart/wechatpay.jpg') center center no-repeat;
      // background-size:600px 333px;
      position: relative;
      .el-dialog__header{
          // position: absolute;
          // right:0;
          // top:0px;
          // cursor: pointer;
          // z-index: 1;
          i{
            font-size:25px;
          }
  
      }
      .el-dialog__body{
        background: transparent;
        padding:0;
      }
    }
    .weichatCodeCont{
      position: relative;
      .codeImg{
        width: 95%;
        margin-left:10px;
      }
      .Invalid{
        width:200px;
        height:200px;
        position: absolute;
        top:75px;
        left:75px;
        background: rgba(255,255,255,0.85);
        text-align: center;
        color:#333;
        font-size:12px;
        font-weight: bold;
        cursor: pointer;
        img{
          margin-top:50px;
          margin-bottom:15px;
          width:50px;
        }
      }
    }
  }
    .buyerOrderDetail{
        max-width:100%;
        color:#333;
        .steps{
            color:green;
            padding-top:20px;
            /deep/.el-steps{
                display:block!important;
           
            .el-step{
            flex-basis:auto!important;
            .el-step__title{
                line-height:1;
                font-size:14px;
               
            }
            .el-step__line{
                background-color:green;
            }
            .el-step__icon{
                color:green;
            }
            .el-step__main{
               padding-bottom:5px;
               .el-step__description{
                   color:#333;
               }
            }
             } 
        }
    }
        .content{
            .step{
                    background:#fff;
                    display:flex;
                    align-items: center;
                    width:100%;
                    .left{
                        padding:0 30px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .icon{
                            text-align: center;
                            color:#7bbc52;
                           
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
                  .btnGreen{
                        border:1px solid forestgreen;
                        border-radius: 3px;
                        padding:0px 5px;
                        color:#333;
                        margin-top:10px ;
                        display: inline-block;
                        min-width:60px;
                        text-align: center;
                        font-size:12px;
                        }
                    .btnColor{
                        border:1px solid #df3f2f;
                        border-radius: 3px;
                        padding:0px 5px;
                        color:#333;
                        margin:auto 0;
                        display: inline-block;
                        min-width:60px;
                        width:70px;
                        text-align: center;
                         font-size:12px;
                        }
                    .btnbgGray{
                        border-radius: 3px;
                        padding:0px 10px;
                        color:#fff;
                    
                        background:#e3e3e3;
                        width:70px;
                        margin:10px auto 0;
                         font-size:12px;
                        
                        }
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
                            .paychannel{
                                white-space: nowrap;
                                padding-right:10px;
                                margin-top:10px;
                                span{
                                    margin-right:8px;
                                    font-size: 14px;
                                }
                                img{
                                    width:40px;
                                }
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
                    border:1px solid #ddd;
                    td,th{
                        padding:8px;
                        
                    }
                    th{
                        font-size:1vw;
                         white-space: nowrap;
                         background:#ddd;
                         line-height:40px;
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
                    .tit{
                      background:#f2f2f2;
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
                        // justify-content: center;
                       
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
                        p{
                            margin-top:10px;
                            width:100%;
                            &.desc{
                              min-height:0;
                              width:100%;
                              overflow: hidden;
                              white-space: nowrap;
                              text-overflow: ellipsis;
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