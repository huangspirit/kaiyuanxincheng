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
          <ul class="clear">
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
                        <th colspan="4">采购器件明细</th>
                        <th>订单状态</th>
                        <th>合同状态</th>
                        <th>订单金额</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-if="BuyerOrderList.length==0">
                    <td colspan="8">暂无数据</td>
                    
                    </tr>
                    <template v-for="item in BuyerOrderList">
                        <tr :key="item.id" class="title">
                            <td colspan="8" >
                                <span v-if="item.orderVo.togetherPay==true" class="he bgColor">合并报关</span>
                                <span  v-if="item.orderVo.togetherPay==false" class="fen">单独报关</span>
                                <span class="">订单编号：{{item.orderVo.order_no}}</span>
                                <span>下单日期：{{item.orderCreateTime | formatDate}}</span>
                                <span>收货人：{{item.orderVo.receivingName}} {{item.orderVo.phone}}</span>
                                <strong>{{item.orderVo.isMonth?'月结订单':'普通订单'}}</strong>
                                <div v-if="item.expireTime" class="counttimewrap">
                                    <CountTime
                                    class="CountTime"
                                    v-on:end_callback="countDownE_cb()"
                                    :currentTime="item1.currentTime"
                                    :startTime="item1.currentTime"
                                    :endTime="item1.expireTime"
                                    :tipText="'距离开始文字1'"
                                    :tipTextEnd="'离付款截止时间还剩：'"
                                    :endText="'订单已失效'"
                                    :dayTxt="'天'"
                                    :hourTxt="'时'"
                                    :minutesTxt="'分'"
                                    :secondsTxt="'秒'"
                                    ></CountTime>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(item1,index) in item.orderInfoList" :key="item1.id">
                            <td class="goodsinfo">
                                <div style="display:inline-flex;align-items:center;">
                                    <ImgE :src="item1.goods_image" :W="60" :H="60"></ImgE>
                                    <span style="display:inline-flex;flex-direction: column;justify-content: space-around ">
                                        <router-link class="color" :to="{
                                          path:'/BrandDetail/GoodsDetails',
                                          query:{
                                            tag:'goodsinfo',
                                            name:item1.goods_name,
                                            documentid:item1.goods_id
                                          }
                                        }">
                                          {{item1.goods_name}}
                                        </router-link>
                                        <router-link :to="{
                                          path:'/BrandDetail',
                                          query:{
                                            name:item1.goods_brand,
                                            documentid:item1.goods_brand_id,
                                            tag:'brand'
                                          }
                                        }">{{item1.goods_branda}}</router-link>
                                        <span class="desc">{{item1.goods_desc}}</span>
                                    </span>
                                </div>
                            </td>
                            <td class="" style="white-space:nowrap;">
                                <strong class="">{{item1.priceunit?'$':'￥'}}{{item1.good_price | toFixed(item1.priceunit?3:2)}}</strong>x{{item1.goods_count}}<br>
                                <strong v-if="!item1.goods_type">预计于{{item1.complete_date | formatDate}}</strong>
                                <strong v-if="item1.goods_type">现货</strong>
                                <br>
                                <span>{{item1.diliver_place}}交货</span>
                            </td>
                            <td>
                              <!-- <span>{{item1.order_status | filterstatus}}</span><br> -->
                              <strong v-if="item1.payFinalButton">待付尾款:￥{{item1.final_pay | toFixed(2)}}</strong>
                            </td>
                            <td class="" style="width:10%;">
                                 <div class="operaBtn">
                                    <div v-if="item1.reason" class="cancleReason">取消原因：{{item1.reason}}</div>
                                    <div class="wrapbtn">
                                        <p class="" v-if="item1.confirmChangeDiliverTimeButton">
                                          <a href="javascript:;" @click="confirmChangeDiliverTime(item1)" >交期确认</a>
                                        </p>
                                        <p class="" v-if="item1.cancleButton">
                                           <a href="javascript:;"  @click="cancleOrder(2,item1)">取消此零件</a>
                                        </p>
                                       <p v-if="item1.receivingGoodsButton">
                                         <a href="javascript:;"
                                            @click="confirmRecieveGoods(item1.id)"
                                        >确认收货</a>
                                       </p>
                                       
                                        <a href="javascript:;"
                                        @click="payment(1,item1)"
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
                                    :tipText="'距离活动开始'"
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
                                <td  :rowspan="item.orderInfoList.length" class="border_right" style="width:10%;">
                                    {{item.orderVo.orderStatesDesc}}<br>
                
                                </td>
                                <td  :rowspan="item.orderInfoList.length" class="border_right hetong" >
                                        <p>{{item.orderVo.download?'合同未上传':'合同已上传'}}</p>
                                        <a href="javascript:;" @click="downLoadOrderContract(item.orderVo.contractUrl)" >下载合同</a>
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
                                  <div v-if="item.orderVo.order_status==3">{{item.orderVo.orderStatesDesc}}</div>
                                  <div class="" v-else>
                                      <p>总订单金额：￥{{item.orderVo.order_amount | toFixed(2)}}</p>
                                      <p v-if="!item.orderVo.prePayChannel && !item.orderVo.need_pre_pay">当前应付款：￥{{item.orderVo.order_amount | toFixed(2)}}</p>
                                      <p v-if="!item.orderVo.prePayChannel && item.orderVo.need_pre_pay">当前应付款：￥{{item.orderVo.order_prepay | toFixed(2)}}</p>
                                      <div class="">
                                          <a href="javascript:;" @click="payment(0,item)" v-if="item.orderVo.prePayButton">去付定金</a>
                                
                                          <a href="javascript:;"  @click="vipPayment(item)" v-if="item.orderVo.isMonth && item.orderVo.payButton">全额付款</a>
                                          <a href="javascript:;"  @click="payment(2,item)" v-if="!item.orderVo.isMonth && !item.orderVo.need_pre_pay && item.orderVo.payButton">全额付款</a>
                                        
                                      </div> 
                                  </div>       
                                </td>
                                <td  :rowspan="item.orderInfoList.length" class="border_right">
                                        <router-link   
                                        :to="{
                                          path:'/PersonalCenter/buyerOrderDetail',
                                          query:{orderNo:item.orderVo.order_no}
                                          }"
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
      <div class="dialog-body" slot="dialog-body" style="line-height:30px;">
        <p>
          卖家将此商品的交期更新为
          <strong style>{{currentSecondOrder.complete_date | formatDate}}</strong>
        </p>
        <p>接受后无法撤销订单，如未付尾款请务必在新交期前支付尾款</p>
        <p>若拒绝接收新交期，请在订单中心取消此零件</p>
      </div>
      <div slot="footer" class="dialog-footer AcceptNewTime" >
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
            <el-input v-model="cancleOrderForm.reason" placeholder="取消订单的原因">
               <el-button slot="append" icon="el-icon-arrow-down" @click="canclelistShow=true"></el-button>
            </el-input>
            <ul class="list" v-if="canclelistShow">
              <li v-for="item in cancleReason" :key="item.value" @click="ensurecanclereason(item.label)">{{item.value}}</li>
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
              <!-- <el-button  @click="payType=2" :class="{bgColor:payType==2}" class="btn">在线支付</el-button> -->
              <el-button  @click="payType=3" :class="{bgColor:payType==3}" class="btn">微信支付</el-button>
              <el-button  @click="payType=4" :class="{bgColor:payType==4}" class="btn">支付宝支付</el-button>
          </div>
          <div v-if="cancleOrderPayShow" class="color" style="margin-top:20px;">取消商品条件：合并报关下取消该订单需要支付对应的报关费<strong>￥{{item.amount}}</strong></div>
         </div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="selectedPayType = false">取 消</el-button>
                <el-button type="primary" @click="submitpayType">确 定</el-button>
              </span>
      </el-dialog>
   
    <!-- <el-dialog
      :visible.sync="showDialog"
      center
    >
      <p slot="title" class="title">对公转账</p>
        <div class="RemittancNotes">
                  <div class="dialog-body" slot="dialog-body">
              <div class="RemittancNotes">
                  <el-form  label-width="80px">
                      <el-form-item label="转账凭证:">
                       
                          <el-upload
                              class="upload-demo"
                              ref="upload0"
                              :limit="1"
                              :action="requestUrl"
                              :auto-upload="false"
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
              <div slot="footer" class="dialog-footer " style="text-align:right" >
                
                <el-button @click="showDialog = false" size="mini" type="info" >取消</el-button>
                <el-button type="primary"  @click="submitBank('upload0')" size="mini">确定</el-button>
                
              </div>
          </div>
    </el-dialog> -->
        <!-- <el-dialog
      :visible.sync="showDialoglittle"
      center
    >
      <p slot="title" class="title">支付尾款</p>
        <div class="RemittancNotes">
                  <el-form  label-width="120px" :model="litleOrderPay">
                    <el-form-item label="支付方式：">
                      <el-radio-group v-model="litleOrderPay.paytype">
                        <el-radio :label="0" :value="0">对公转账</el-radio>
                        <el-radio :label="1" :value="1">在线支付</el-radio>
                      </el-radio-group>
                    </el-form-item>
                      <el-form-item label="汇款凭证：" v-if="litleOrderPay.paytype==0">
                     
                          <el-upload
                              class="upload-demo"
                              ref="upload1"
                              :limit="1"
                              :action="requestUrllittle"
                              :auto-upload="false"
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
                          <strong class="color" style="font-size:20px;">￥{{litleOrderPay.final_pay | toFixed(2)}}</strong>
                      </el-form-item>
                        <el-form-item label="在线支付：" v-if="litleOrderPay.paytype==1">
                           <el-radio-group v-model="litleOrderPay.type">
                            <el-radio :label="0" :value="0">微信</el-radio>
                            <el-radio :label="1" :value="1">支付宝</el-radio>
                          </el-radio-group>
                      </el-form-item>
                  </el-form>
                  <div class="desc"  v-if="litleOrderPay.paytype==0">
                      <p class="tishi">温馨提示：</p>
                      <p><label for="">汇款方式：</label> <span> 1. 通过专属帐号进行线下汇款充值 > 2. 然后在此处上传汇款凭证</span> </p>
                      <p><label for="">查看结果：</label><span>平台审核结果会以短信或者微信公众号推送给您</span></p>
                      <P><label for="">开户银行：</label> <span>招商银行上地支行</span> </p>
                      <P><label for="">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：</label><span>110 906 335 410 201</span> </P>
                  </div>
                  <div slot="footer" class="dialog-footer "  style="text-align:right" >
                    <el-button @click="showDialoglittle = false" size="mini" type="info" >取消</el-button>
                    <el-button type="primary"  @click="paylitleOrder" size="mini" v-if="litleOrderPay.paytype==1">确定</el-button>
                    <el-button type="primary"  @click="submitBank('upload1')" size="mini" v-if="litleOrderPay.paytype==0">确定</el-button>
                  </div>
              </div>
    </el-dialog> -->
       <!-- <SetTankuang :title="'取消订单条件'" v-if="showDialogcancle" @closeDialogCallBack="closeDialogCallBack">
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
                      
                          <el-upload
                              class="upload-demo"
                              ref="upload2"
                              :limit="1"
                              :action="requestUrlcancle"
                              :auto-upload="false"
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
                      <p><label for="">查看结果：</label><span>平台审核结果会以短信或者微信众号推送给您</span></p>
                      <P><label for="">开户银行：</label> <span>招商银行上地支行</span> </p>
                      <P><label for="">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：</label><span>110 906 335 410 201</span> </P>
                  </div>
                  <div slot="footer" class="dialog-footer " style="text-align:right" >
                    <el-button @click="showDialogcancle = false" size="mini" type="info" >取消</el-button>
                    <el-button type="primary"  @click="payCancleOrder" size="mini"  v-if="cancleOrderPay.paytype==1">确定</el-button>
                     <el-button type="primary"   @click="submitBank('upload2')" size="mini"  v-if="cancleOrderPay.paytype==0">确定</el-button>
                  </div>
              </div>
          </div>
      </SetTankuang> -->
      <el-dialog
      :visible.sync="dialogCode"
      width="600px"
      :close-on-click-modal="false"
      center
      class="weichatCode"
    >
    <div class="weichatCodeCont">
       <img :src="`data:image/jpeg;base64,${payCodeImgUrl}`" class="codeImg"/>
       <div class="Invalid" v-if="InvalidFlag">
            <img src="@/assets/image/PersonalCenter/_u1118.png" alt @click="paymentHandle()" /><br>
            <span>刷新重新获取支付二维码</span>
        </div>
    </div>

    </el-dialog>
      <!-- <el-dialog
      :visible.sync="dialogCode1"
      width="600px"
      :close-on-click-modal="false"
      center
      class="weichatCode"
    >
    <div class="weichatCodeCont">
       <img :src="`data:image/jpeg;base64,${payCodeImgUrl}`" class="codeImg"/>
       <div class="Invalid" v-if="InvalidFlag">
            <img src="@/assets/image/PersonalCenter/_u1118.png" alt @click="paymentHandle1()" /><br>
            <span>刷新重新获取支付二维码</span>
        </div>
    </div>
    </el-dialog> -->
    <bankTransfer :bankTransferObj="bankTransferObj" v-if="bankTransferShow" @closeBankTransfer="bankTransferShow=false" @bankSuccess="bankSuccess"></bankTransfer>
    <div v-html="formhtml" ref='formwrap'></div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import BuyerOrderItem from "_c/BuyerOrderItem";
import bankTransfer from "_c/bankTransfer";
import {axios,buyerOrderCenter} from "../../../api/apiObj";
import { TimeForma,TimeForma2 } from "@/lib/utils";
import { baseURL, baseURL2 } from "@/config";
export default {
  name: "BuyerOrderManagement",
  data() {
    return {
      formhtml:"",
      paymentType:0,
      paymoney:0,
      bankTransferShow:false,
      bankTransferObj:{},//公对公转账传参
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
      canclelistShow:false,
      cancleOrderPayShow:false,
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
       // 取消订单支付二维码的模态框
      dialogCode1: false,
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
      showDialogcancle:false,
      //选中的当前订单
      item:{
          orderVo:{}
      },
      litleOrderPay:{
        paytype:0,//在线支付
        type:0//微信
      },
      cancleOrderPay:{
         paytype:0,//在线支付
        type:0//微信
      },
      timep:null,//微信支付后的轮训计时器
    };
  },
  components: {
    BuyerOrderItem,
    bankTransfer
  },

  watch: {
    currentPage() {
      // this.all();
    }
    ,canclereason(reason){
        this.$set(this.cancleOrderForm,'reason',reason)
    },
    showDialoglittle(val){
     
      if(!val){
         clearInterval(this.timep)
        var element = document.getElementById("divId");
        if(element){
            element.parentNode.removeChild(element);
        }
       
      }
    },
    showDialogcancle(val){
      if(!val){
        clearInterval(this.timep)
        this.timep=null;
        var element = document.getElementById("divId");
        if(element){
            element.parentNode.removeChild(element);
        }
       
      }
    },
    dialogCode(val){
        if(!val){clearInterval(this.timep);  this.timep=null;}
    },
    dialogCode1(val){
        if(!val){clearInterval(this.timep);  this.timep=null;}
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
   ensurecanclereason(reason){
     this.canclelistShow=false;
     this.$set(this.cancleOrderForm,'reason',reason);
   },
   //银行汇款凭证提交
  //  submitBank(name){
  //     this.$refs[name].submit();
  //  },
    
    handleCurrentPageChange(x) {
      this.currentPage = x;
       this.orderParams={
        ...this.orderParams,
        start:this.start
      }
      console.log(this.orderParams)
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
            if(res && res.data){
                this.BuyerOrderList=res.data.data;
                this.BuyerOrderManagementTotal=res.data.total
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              });
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
            this.all()
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
    // 微信支付的轮训失败后刷新获得新的二维码
    paymentHandle() {
      this.paymentWe(this.paymentWeSendData)
      // return;
      // this.InvalidFlag = false;
      // let obj = {
      //     message_id: this.litleOrderPay.id,
      //     access_token: this.access_token,
      //     type: 1,
      // };
      // this.$store
      //   .dispatch("SignContract/GetWeChatPay", obj)
      //   .then(codeResp => {
      //     this.dialogCode = true;
      //     this.payCodeImgUrl = codeResp.prepay_id;
      //     let count = 0;
      //     // 拿到二维码之后进行轮训获取支付状态
      //     var _this=this;
      //     this.timep = setInterval(() => {
      //       count++;
      //       if (count === 40) {
      //         clearInterval(_this.timep);
      //         _this.timep=null;
      //         _this.InvalidFlag = true;
      //       } else {
      //         _this.InvalidFlag = false;
      //         _this.$store
      //           .dispatch("SignContract/GetPayStatus", {
      //             orderno: this.litleOrderPay.order_no,
      //             messageid: codeResp.flag,
      //             access_token: this.access_token
      //           })
      //           .then(statusResp => {
      //             // 如果支付状态是1，支付成功
      //             if (statusResp === 1) {
      //               clearInterval(_this.timep);
      //                 _this.timep=null;
      //               _this.$message({
      //                 type: "success",
      //                 message: "支付成功!"
      //               });
      //               _this.all()
      //             }
      //           });
      //       }
      //     }, 3000);
      //   })
      //   .catch(err => {
      //     this.$message.error(err.message);
      //   });
    },
     // 取消支付的轮训
    // paymentHandle1() {
    //   this.InvalidFlag = false;
    //   this.payCancleOrderWe();
    // },
    // payCancleOrder(){
    //       if(this.cancleOrderPay.type==0){
    //           this.payCancleOrderWe()
    //         }else if(this.cancleOrderPay.type==1){
    //           axios.request({...buyerOrderCenter.payGuanshui,method:'post',params:{orderId:this.cancleOrderPay.id}}).then(res=>{
    //             const div = document.createElement("div");
    //             div.setAttribute("id","divId")
    //               div.innerHTML = res.data.prepay_id;
    //               document.body.appendChild(div);
    //               console.log( document.getElementById('divId').getElementsByTagName('form'))
    //               document.getElementById('divId').getElementsByTagName('form')[0].charset= "UTF-8";
    //               document.getElementById('divId').getElementsByTagName('form')[0].target = "_blank";
    //               document.getElementById('divId').getElementsByTagName('form')[0].submit();
           
    //           })
    //     }
    // },
    // payCancleOrderWe(){
    //   axios.request({...buyerOrderCenter.getWechatPayBaoguan,params:{orderId:this.cancleOrderPay.id}}).then(codeResp=>{
    //     codeResp=codeResp.data;
    //      this.dialogCode1 = true;
    //       this.payCodeImgUrl = codeResp.prepay_id;
    //       let count = 0;
    //       var _this=this;
    //       // 拿到二维码之后进行轮训获取支付状态
    //       this.timep = setInterval(() => {
    //         count++;
    //         if (count === 40) {
    //           clearInterval(_this.timep);
    //           _this.timep=null;
    //           _this.InvalidFlag = true;
    //         } else {
    //           _this.InvalidFlag = false;
    //           _this.$store
    //             .dispatch("SignContract/GetPayStatus", {
    //               orderno: _this.cancleOrderPay.orderNo,
    //               messageid: codeResp.flag,
    //             })
    //             .then(statusResp => {
    //               // 如果支付状态是1，支付成功，跳到我的订单页面
    //               if (statusResp == 1) {
                  
    //                  _this.InvalidFlag=true;
    //                 _this.showDialogcancle=false;
    //                 _this.dialogCode1=false;
    //                 _this.dialogVisible2=false;
    //                 _this.all();
    //               }else{
    //                    console.log("等待支付")
    //               }
    //             });
    //         }
    //       }, 3000);
    //     })
    //     .catch(err => {
    //       this.$message.error(err.message);
    //     });
    // },
    paymentWe(data) {
       if(this.paymentType==3){
        //取消零件补交报关费
        axios.request({...buyerOrderCenter.getWechatPayBaoguan,params:{orderId:this.cancleOrderPay.id}})
        .then(codeResp=>{
          this.wepayRes(codeResp.data)
        })
        return;
      }
      this.$store
        .dispatch("SignContract/GetWeChatPay", data)
        .then(codeResp => {
          this.wepayRes(codeResp)
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    wepayRes(codeResp){
          let order_no="";
          if(this.paymentType==1 || this.paymentType==3){
            //尾款或者取消零件补交的报关费
              order_no=this.item.order_no;
          }else if(this.paymentType==0 || this.paymentType==2 ){
              //预付款或者全款
              order_no=this.item.orderVo.order_no;
          }
          this.dialogCode = true;
          this.payCodeImgUrl = codeResp.prepay_id;
          let count = 0;
          var _this=this;
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
                  messageid: codeResp.flag,
                })
                .then(statusResp => {
                  // 如果支付状态是1，支付成功，跳到我的订单页面
                  if (statusResp === 1) {
                    clearInterval(_this.timep);
                    _this.timep=null;
                    this.selectedPayType=false;
                    this.dialogCode = false;
                    _this.all();
                  }
                });
            }
          }, 3000);
    },
    // 点击付款
    payment(x,item) {
      this.item=item;
      this.currentStatus = x;
      this.payType=1
      let totalPrice = 0;
      switch (x) {
        case 0:
          this.paymentType=0;//标志付定金
          totalPrice = this.item.orderVo.order_prepay;
          break;
        case 1:
            this.paymentType=1;//标志付尾款
          totalPrice = this.item.orderVo.final_pay;
          break;
        case 2:
           this.paymentType=2;//标志付全款
          totalPrice = this.item.orderVo.order_amount;
          break;
      }
      console.log("全款：", totalPrice)
      this.paymoney=totalPrice;
      this.selectedPayType=true;
      this.cancleOrderPayShow=false;
    },
    // //去付子订单的尾款
    //  payfinal(item1){
    //    this.paymentType=1;//标识付尾款
    //    this.item=item1;
    //    this.selectedPayType=true;
    //    return;
    //      //需要获取尾款的金额
    //     this.showDialoglittle=true;
    //     this.litleOrderPay={
    //       ...this.litleOrderPay,
    //       final_pay:item1.final_pay,
    //       order_no:item1.order_no,
    //       id:item1.id
    //     }
    // },
    //确认在线订单尾款支付
    // paylitleOrder(){
    //     if(this.litleOrderPay.type==0){
    //       this.paymentWe()
    //     }else if(this.litleOrderPay.type==1){
    //        this.$store
    //       .dispatch("SignContract/GetAlipayPagePay", {
    //         orderNo: this.litleOrderPay.id,
    //         type: 1,
    //        // access_token: this.access_token
    //       })
    //       .then(res => {
           
    //          const div = document.createElement("div");
    //         div.setAttribute("id","divId")
    //           div.innerHTML = res.prepay_id;
    //           document.body.appendChild(div);
    //           document.getElementById('divId').getElementsByTagName('form')[0].charset= "UTF-8";
    //            document.getElementById('divId').getElementsByTagName('form')[0].target = "_blank";
    //             document.getElementById('divId').getElementsByTagName('form')[0].submit();
    //       });
    //     }
    // },
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
    //付款事件
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
              this.showDialoglittle=false;
              this.showDialogcancle=false;
              this.dialogVisible2=false;
              this.all();
          }
      },
      submitpayType(){
        console.log(this.paymentType)
            if(this.payType==1){//对公转账
              if(this.paymentType==1){
                //标识付尾款
                this.bankTransferObj={
                url:this.requestUrllittle,
                money:this.item.final_pay,
                title:'订单尾款'
               // time:this.item.orderVo.expireTime
                }
              }else if(this.paymentType==3){
                    //取消零件补交报关税
                    this.bankTransferObj={
                    url:this.requestUrlcancle,
                    money:this.item.amount,
                    title:'取消零件补交合并报关费'
                  // time:this.item.orderVo.expireTime
                    }
              }
              else if(this.paymentType==0){
                //预付款
                  this.bankTransferObj={
                    url:this.requestUrl,
                    money:this.item.orderVo.order_prepay,
                    time:this.item.orderVo.expireTime,
                    title:this.paymentType==0?'订单预付款':'订单全额'
                  }
              }else if(this.paymentType==2){
                //预付款
                  this.bankTransferObj={
                    url:this.requestUrl,
                    money:this.item.orderVo.order_amount,
                    time:this.item.orderVo.expireTime,
                    title:this.paymentType==0?'订单预付款':'订单全额'
                  }
              }
              this.bankTransferShow=true;
             this.selectedPayType=false;
            }
            else if(this.payType==3){
              //微信支付
              let sendData={}
              if(this.paymentType==1){
              //需要获取尾款的金额
                sendData={
                   message_id:this.item.id,
                  type:1,//尾款
                }
              }else if(this.paymentType==2){
                //微信支付全款
                sendData={
                  message_id:this.item.orderVo.order_no,
                  type:2,//全款
                }
              }else if(this.paymentType==0){
                //微信支付预付款
                sendData={
                  message_id:this.item.orderVo.order_no,
                  type:0,//预付款
                }
              }else if(this.paymentType==3){
                //补交报关费
                sendData={
                  orderId:this.item.id
                }
              }
              this.paymentWeSendData=sendData;
               this.paymentWe(sendData)

            }else if(this.payType==4){
              //支付宝支付
              let sendData={}
              if(this.paymentType==1){
                //支付宝尾款支付
                sendData={
                  orderNo: this.item.id,
                  type: 1,//尾款
                }
              }else if(this.paymentType==2){
                //支付宝支付全款
                sendData={
                   orderNo: this.item.orderVo.order_no,
                  type:2,//全款
                }
              }else if(this.paymentType==0){
                //支付宝支付预付款
                sendData={
                  orderNo: this.item.orderVo.order_no,
                  type:0,//预付款
                }
              }else if(this.paymentType==3){
                //支付宝支付预付款
                sendData={
                  orderId:this.item.id
                }
                   axios.request({...buyerOrderCenter.payGuanshui,method:'post',params:sendData}).then(res=>{
                        this.formhtml=res.data.prepay_id;
                        let _this=this;
                        setTimeout(function(){
                          _this.$refs.formwrap.getElementsByTagName('form')[0].charset = "UTF-8";
                          _this.$refs.formwrap.getElementsByTagName('form')[0].target = "_blank";
                          _this.$refs.formwrap.getElementsByTagName('form')[0].submit();
                        },0)
                    })
                   return;
              }
              this.$store
                .dispatch("SignContract/GetAlipayPagePay", sendData)
                .then(res => {
                   this.formhtml=res.prepay_id;
                  let _this=this;
                  setTimeout(function(){
                    _this.$refs.formwrap.getElementsByTagName('form')[0].charset = "UTF-8";
                    _this.$refs.formwrap.getElementsByTagName('form')[0].target = "_blank";
                    _this.$refs.formwrap.getElementsByTagName('form')[0].submit();
                  },0)
                });
            }
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
      if(type==2){
        this.item=orderId;
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
              this.cancleOrderPayShow=true;
              this.selectedPayType=true;
              this.paymentType=3;
              this.item.amount=res.data.amount
        }else{
          this.all();
        }
        
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
     bankSuccess(){
      this.all();
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
         //type==1,标志是报关税上传对公转账凭证
          return (
              baseURL +
              `api-order/customerCenter/uploadBankTransferNo?access_token=${this.access_token}&orderNo=${this.item.order_no}&orderId=${this.item.id}`
          );
      },
      requestUrlcancle() {
         //type==1,标志是报关税上传对公转账凭证
         console.log(this.item)
          return (
              baseURL +
              `api-order/customerCenter/uploadBankTransferNo?access_token=${this.access_token}&orderNo=${this.item.order_no}&orderId=${this.item.id}&type=1`
          );
      },
    // 上传文件的地址
    uploadUrl() {
      return `${baseURL}api-order/customerCenter/uploadOrderContract`;
    },
   
  },
  destroyed(){
    clearInterval(this.timep);
    this.timep=null;
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
      },
      filterstatus(val){
        switch(val){
          case 0:
            return '未支付';
          case 1:
            return '已完成支付';
          case 2:
            return '取消中';
          case 3:
            return '已取消';
          case 4:
            return '已交货';
          case 5:
            return '已付预付款';
          case 6:
            return '已发货到质检中心';
          case 7:
            return '已从质检中心发出';
        }
      }
  }
};
</script>
<style lang="less" scoped>
@import "./buyerOrder.less";
</style>

