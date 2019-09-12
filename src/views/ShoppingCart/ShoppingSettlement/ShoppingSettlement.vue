<template>
  <div class="ShoppingSettlement">
    <div class="Order-information">
<!--      <div class="Order-title">-->
<!--        <img src="@/assets/image/inquirybasket/u26965.png" alt />-->
<!--        <span>核对订单信息</span>-->
<!--      </div>-->
      <!-- 配送地址 -->
        <div class="address">
            <div class="title">
                <div class="fr" @click="showResetAddress=true" v-if="allAddress.length>1">
                    <span class="btn bgColor" >选择</span>
                </div>
                <span>配送地址</span>
            </div>
            <div class="cont" v-if="allAddress.length">
                  <span>{{defaultAddress.receivingName}}&nbsp;&nbsp; {{defaultAddress.phone}}</span>&nbsp;&nbsp;
                  <span>{{defaultAddress.address}} {{defaultAddress.detailedAddress}}</span>&nbsp;&nbsp;
            </div>
            <div  v-else class="cont">
                暂无收货地址 &nbsp;&nbsp;<a href="javascript:;" class="btn bgColor" @click="addNewAdrress">添加</a>
            </div>
        </div>
        <div class="setinvoice">
            <div class="title">
                <div class="fr" @click="showResetVoice=true" v-if="allInvoice.length>1">
                    <span class="btn bgColor" >选择</span>
                </div>
                <span>发票信息</span>
            </div>
            <div class="cont">
                <p>
<!--                    是否需要发票：-->
<!--                        <el-radio-group v-model="needInvoice">-->
<!--                            <el-radio :label="true" :value="true">是</el-radio>-->
<!--                            <el-radio :label="false" :value="false">否</el-radio>-->
<!--                        </el-radio-group>-->
                  选择发票类型：
                    <el-radio-group v-model="selectedGoodsBillSetOff" @change="handleChangeGoodsBillSetOff">
                        <el-radio v-for="item in GoodsBillSetOffList" :value="item.id" :label="item.id" :key="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                   </p>
                <div v-if="needInvoice">
                    <p v-if="allInvoice.length" class="invoice">
                        <span>发票类型：{{selectedGoodsBillSetOffObj.name}}</span>
                        <span>发票抬头：{{DefaultInvoiceObject.corporatename}}</span>
                        <span>统一信用代码：{{DefaultInvoiceObject.billno}}</span>
<!--                        <span>发票内容：商品明细</span>-->
                    </p>
                    <p v-else class="invoice">暂无开票信息 &nbsp;&nbsp; <a href="javascript:;" class="btn bgColor" @click="addInvoiceInforma">添加</a></p>
                </div>
                <p class="color">
                    提醒：订单提交后不可更改！如有疑问或其他需求请先联系客服人员，否则相关损失由客户自行承担。
                </p>
            </div>
        </div>
      <!-- 订单商品 -->
      <div class="order-product">
        <p class="title">
          <span>订单商品</span>
          <span class="color">x{{goodsCount}}</span>
        </p>
        <ul>
          <ShoppingSettlementOItem v-for="(item,k) in DetaileData" :key="k" :item="item"></ShoppingSettlementOItem>
        </ul>
        <!-- 开具发票 -->
        <!-- 结算金额明细 -->
        <div class="place-order">
          <div class="detail">
            <p v-if="priceTotalDetail.Postage">
              <label for="">运费合计：</label>
              <span class="num">￥{{priceTotalDetail.Postage}}</span>
            </p>
<!--            <p v-if="priceTotalDetail.usdTotalPrice">-->
<!--              <label for="">美元金额：</label>-->
<!--              <span class="num">${{priceTotalDetail.usdTotalPrice}}</span>-->
<!--            </p>-->
            <p v-if="priceTotalDetail.exchange">
              <label for="">美元汇率：</label>
              <span class="num">1：{{priceTotalDetail.exchange}}</span>
            </p>

            <p v-if="priceTotalDetail.needPayBillTotal">
             <label for="">发票服务费：</label>
              <span class="num">￥{{priceTotalDetail.needPayBillTotal | ToFixed}}</span>
            </p>
            <p>
              <label for="">报关服务费：</label>
              <span class="num">￥{{priceTotalDetail.GuanshuiService}}</span>
            </p>
            <p>
              <label for="">关税：</label>
              <span class="num">￥{{priceTotalDetail.Guanshui}}</span>
            </p>
            <p >
              <label for="">商品总额：</label>
              <span class="num" v-if="priceTotalDetail.rmbtotalPrice">￥{{priceTotalDetail.rmbtotalPrice}}</span>
                <span v-if="priceTotalDetail.rmbtotalPrice && priceTotalDetail.usdTotalPrice">&nbsp;+&nbsp;</span>
                <span class="num" v-if="priceTotalDetail.usdTotalPrice">$&nbsp;{{priceTotalDetail.usdTotalPrice}}</span>
            </p>
            <p>

              <label for="">订单总额：</label>
              <span class="num">￥{{priceTotalDetail.totalPrice | ToFixed}}</span>
            </p>
            <p v-if="priceTotalDetail.isVIP">
               <label for="">剩余额度：</label>
              <span class="num">￥{{priceTotalDetail.restLine}}</span>
            </p>
            <!-- <div class="payWayList">
              <label for="">邮费方式：</label>
              <el-radio v-model="dilivertype" label="0" border>到付</el-radio>
              <el-radio v-model="dilivertype" label="1" border>垫付</el-radio>
            </div> -->
        <div class="payWayList" v-if="!(this.priceTotalDetail.isVIP && this.priceTotalDetail.isEnough)">
                  <label for="">支付方式：</label>
                  <el-radio v-model="paytype" label="0" border>在线支付</el-radio>
                  <el-radio v-model="paytype" label="1" border>转账支付</el-radio>
              </div>
                 <strong>提示：单个店铺货物总额超过￥500包邮，￥500以下到付</strong>
          </div>
          <div class="information">
            <p>
              <label for="">配送地址：</label>
              <span>{{defaultAddress.address}}{{defaultAddress.detailedAddress}}</span>
            </p>
            <p>
              <label for="">收件人：</label>
              <span>{{defaultAddress.receivingName}}</span>
            </p>
            <p>
              <label for="">电话：</label>
              <span>{{defaultAddress.phone}}</span>
            </p>
          </div>
        </div>
        <p class="submit" @click="submit">提交订单</p>
        <!-- <p class="submit" @click="submit">直接付款</p> -->
      </div>
    </div>
    <!-- 编辑收货地址 -->
    <el-dialog
      :visible.sync="dialogAddress"
      width="1000px"
      center
      class="dialog-ruleForm-address"
      @close="closeDialogAddress('ruleForm')"
    >
      <p slot="title" class="title">收货人地址</p>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm-address"
        >
          <div class="form-item">
            <label for class="area">
              <span>*</span>
              所在地区:
            </label>
            <div class="address-distpicker">
              <v-distpicker :province="province" :city="city" :area="area" @selected="distpicker"></v-distpicker>
            </div>
          </div>
          <el-form-item label="收货人:" prop="receivingName">
            <el-input v-model="ruleForm.receivingName"></el-input>
          </el-form-item>
          <el-form-item label="详细地址:" prop="detailedAddress">
            <el-input v-model="ruleForm.detailedAddress"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="固定电话:">
            <el-input v-model="ruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码:">
            <el-input v-model="ruleForm.postalCode"></el-input>
          </el-form-item>
          <el-form-item label="设置默认地址">
            <el-switch v-model="ruleForm.isdefault"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialo-footer">
        <span @click="addressCancel('ruleForm')" class="canlebtn">取消</span>
        <span @click="submitForm('ruleForm')" class="ensurebtn">保存</span>
      </span>
    </el-dialog>
    <!-- 选择管理发票 -->
      <el-dialog
          :visible.sync="dialogVisibleAddInvoice"
          width="900px"
          :lock-scroll="false"
          class="Add-Invoice-shpoing"
          top="10vh"
          @close="handleClose2('ruleForm')"
          append-to-body
      >
          <p slot="title" class="title">{{dialogTitleAddInvoice ? "新增开票信息" : '编辑开票信息'}}</p>
          <div class="dialo-body">
              <el-form
                  :model="ruleFormAddInvoice"
                  :rules="rulesAddInvoice"
                  ref="ruleForm"
                  label-width="200px"
                  class="demo-ruleForm"
              >
                  <el-form-item label="公司名称：" prop="corporatename">
                      <el-input v-model="ruleFormAddInvoice.corporatename"></el-input>
                  </el-form-item>
                  <el-form-item label="税号/统一信用代码证号：" prop="billno">
                      <el-input v-model="ruleFormAddInvoice.billno"  maxlength="18"
                                show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="开户银行：" prop="openingbank">
                      <el-input v-model="ruleFormAddInvoice.openingbank"></el-input>
                  </el-form-item>
                  <el-form-item label="银行账号：" prop="bankaccount">
                      <el-input v-model="ruleFormAddInvoice.bankaccount"></el-input>
                  </el-form-item>
                  <el-form-item label="开票电话：" prop="registeredphone">
                      <el-input v-model="ruleFormAddInvoice.registeredphone"
                               ></el-input>
                  </el-form-item>
                  <el-form-item label="开票地址：" prop="registeredaddress">
                      <el-input v-model="ruleFormAddInvoice.registeredaddress"></el-input>
                  </el-form-item>
                  <el-form-item label="设为默认">
                      <el-switch v-model="ruleFormAddInvoice.isdefault"></el-switch>
                  </el-form-item>
              </el-form>
          </div>
          <div slot="footer" class="dialo-footer">
              <span @click="dialogVisibleAddInvoice = false" class="cancel">取消</span>
              <span @click="submitFormAddInvoice('ruleForm')" class="ensure">确认发票信息</span>
          </div>
      </el-dialog>
    <el-dialog :visible.sync="dialogInvoice" width="1000px" center class="dialog-ruleForm-Invoice">
      <p slot="title" class="title">发票历史信息</p>
      <!-- 添加发票的模态框 -->
      <div class="list">
        <ul class="InvoiceInforma-list">
          <li v-for="item in InvoiceList" :key="item.id" class="Invoiceitem">
            <div class="defaultInvoiceMark" v-if="item.isdefault">
              <span class="cont"> 默认</span>
              </div>
            <div class="item-l">
              <div class="item-l-name">
                <p>
                  公司名称：
                  <span>{{item.corporatename}}</span>
                </p>
                <p>开户银行：{{item.openingbank}}</p>
                <p>开票电话：{{item.registeredphone}}</p>
                <p>
                  <!-- <label class="label">
                    <input type="radio" :value="item.id" v-model="DefaultDefaultInvoice" />
                    <span>
                      <img
                        src="@/assets/image/OriginalFactoryEntry/_u11446.png"
                        alt
                        v-if="item.id === DefaultInvoice"
                      />
                    </span>
                  </label>
                  <span>设为默认的开票信息</span> -->
                  <el-radio-group v-model="DefaultInvoice" class="defaultradioSquare">
                    <el-radio :label="item.id" :value="item.id" name="defaultInvoice">设为开票信息</el-radio>
                  </el-radio-group>
                   <!-- <el-checkbox-group v-model="DefaultInvoice">
                    <el-checkbox :label="item.id" :value="item.id">选为开票信息</el-checkbox>
                  </el-checkbox-group> -->
                </p>
              </div>
            </div>
            <div class="item-r">
              <div class="item-r-t">
                <p>税号/统一信用代码证号：{{item.billno}}</p>
                <p>银行账户：{{item.bankaccount}}</p>
                <p>开票地址：{{item.registeredaddress}}</p>
              </div>
              <p class="item-r-t">
                <span @click="delectInvoice(item)" class="del">删除</span>
                <span @click="editInvoice(item)" class="edit">编辑</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-invoice-footer">
        <p @click="addInvoiceInforma" class="addInvoiceInforma">+新增开票信息</p>
          <p @click="selectInvoiceSubmit" class="InvoiceSubmit">确定</p>
        <p @click="dialogInvoice = false" class="cancle">取消</p>
      </div>
    </el-dialog>
    <SetTankuang v-if="showGoIndex" :title="'温馨提示'">
      <div class="dialog-body" slot="dialog-body">
          <p>尊敬的月结用户，您的订单已提交，<span class="counttime">{{count}}s</span>后自动跳转到<a @click="chipCenterOrder">个人中心>>>我的订单</a>下载上传合同 </p>
      </div>
    </SetTankuang>
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
                              :before-upload="beforeAvatarUpload"
                              :on-success="handleAvatarSuccess"
                              :on-preview="handlePictureCardPreview"
                              :on-remove="handleRemove"
                              :file-list="businessList"
                          >
                              <i class="el-icon-plus"></i>
                              <div
                                  slot="tip"
                                  class="el-upload__tip"
                              >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
                          </el-upload>
                      </el-form-item>
                      <el-form-item label="汇款金额:">
                          <strong class="color" style="font-size:20px;">￥{{getOrderInfo.money}}</strong>
                      </el-form-item>
                  </el-form>
                  <div class="desc">
                      <p class="tishi">温馨提示:</p>
                      <p><label for="">汇款方式：</label> <span>1. 通过专属帐号进行线下汇款充值 > 2. 然后在此处上传汇款凭证</span> </p>
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
      <el-dialog
          title="选择收货地址"
          :visible.sync="showResetAddress"
          width="60%"
          >
          <div class="selectedAddress">
              <ul>
                  <li v-for="(item,k) in allAddress" :key="k" @click="selectedDefaultAddress(k)" :class="defaultAddress.id==item.id?'bgColor':''">
                    <span class="defaultAddress" v-if="item.isdefault">默</span>
                    <span>{{item.receivingName}}&nbsp;&nbsp; {{item.phone}}</span>&nbsp;&nbsp;
                    <span>{{item.address}} {{item.detailedAddress}}</span>
                  </li>
              </ul>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="showResetAddress = false">关闭</el-button>
  </span>
      </el-dialog>

      <el-dialog
          title="选择开票信息"
          :visible.sync="showResetVoice"
          width="70%"
         >
          <div class="selectedVoice">
              <ul>
                  <li v-for="(item,k) in allInvoice" :key="k"  @click="selectedDefaultVoice(k)" :class="DefaultInvoiceObject.id==item.id?'bgColor':''">
                      <div class="defaultInvoiceMark">
                          <span v-if="item.isdefault" >默</span>
                      </div>
                      <div class="list clear">
                          <p>公司名称：{{item.corporatename}}</p>
                          <p>统一信用代码：{{item.billno}}</p>
                          <p>开票电话：{{item.registeredphone}}</p>
                          <p>开户地址：{{item.registeredaddress}}</p>
                          <p>开户银行：{{item.openingbank}}</p>
                          <p>银行账户：{{item.bankaccount}}</p>
                      </div>

                  </li>
              </ul>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="showResetVoice = false">关闭</el-button>
  </span>
      </el-dialog>
  </div>
</template>

<script>
    import { baseURL } from "@/config";
import VDistpicker from 'v-distpicker'
import { mapState, mapActions, mapMutations } from "vuex"
import ShoppingSettlementOItem from "_c/ShoppingSettlementOItem"
import { setTimeout, setInterval, clearInterval } from "timers"
import {axios,presonalAdress,shoppingCar} from "../../../api/apiObj";
//import { constants } from "crypto";
export default {
  name: "ShoppingSettlement",
  data() {
    return {
        showResetVoice:false,
        showResetAddress:false,
        timer:null,
        businessList:[],
        //收货地址
        defaultAddress:{},
        allAddress:[],
        //开票
        DefaultInvoiceObject: {},
        needInvoice:true,
        allInvoice:[],
        GoodsBillSetOffList:[],
        selectedGoodsBillSetOff:0,
        selectedGoodsBillSetOffObj:{},
        //0标识在线支付
        paytype:"0",
        //生成的订单bianhao
        orderNumber:"",
        getOrderInfo:{},
        //对公转账
        showDialog:false,
        //购买商品总数
        goodsCount:0,
      //月结用户提交订单成功后需要跳转
      count:60,
      showGoIndex:false,
      //自定跳转计时器
      chipCenterOrderCount:null,
      //判断是否有订单信息
      hasCont:true,
      // 添加发票的模态框的title
      dialogTitleAddInvoice: true,
      // 添加发票的flag
      dialogVisibleAddInvoice: false,
      // 添加发票的规则
      ruleFormAddInvoice: {
        billtiltle: "",
        // 税号
        billno: "",
        billcontent: 1,
        billtype: 1,
        // 公司名称
        corporatename: "",
        // 开户银行
        openingbank: "",
        // 开票地址
        registeredaddress: "",
        // 开票电话
        registeredphone: "",
        // 银行账号
        bankaccount: "",
        access_token: ""
      },
      rulesAddInvoice: {
        corporatename: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        openingbank: [
          { required: true, message: "请输入开户银行", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        bankaccount: [
          { required: true, message: "请输入银行账号", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        registeredaddress: [
          { required: true, message: "请输入开票地址", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        registeredphone: [
          { required: true, message: "请输入开票电话", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        billno: [
          {
            required: true,
            message: "请输入税号/统一信用代码证号",
            trigger: "blur"
          }
        ]
      },
      // 支付发二维码
      payCodeImgUrl: "",
      // 收货地址模态框的title
      addressText: true,
      // 收货地址
      province: "",
      city: "",
      area: "",

      addressValue: 0,
      // 收货地址的模态框
      dialogAddress: false,
      // 当前编辑的收货地址
      curentAdressItem: "",
      // 支付的方式
      payWay: "1",
      // 配送的方式
      dilivertype: "1",
      ruleForm: {
        isdefault:false,
        address: "",
        receivingName: "",
        phone: "",
        phoneAreaCode: "中国+0086",
        tel: "",
        telAreaCode: "010",
        postalCode: "",
        detailedAddress: "",
        isEnable: 1,
      },
      rules: {
        receivingName: [
          { required: true, message: "请输入收货人", trigger: "blur" },
          { min: 1, message: "收货人长度最低为2个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, message: "手机号码最低为11位数", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入固定电话", trigger: "blur" },
          { min: 8, message: "固定电话最低为8位数", trigger: "blur" }
        ],
        detailedAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 3, message: "详细地址最低为3个字符数", trigger: "blur" }
        ],
        postalCode: [
          { required: true, message: "请输入邮政编码", trigger: "blur" },
          { min: 3, message: "邮政编码最低为3个字符数", trigger: "blur" }
        ]
      },
      // 是否开发票
      InvoiceFlag: true,
      // 选择发票的模态框的flag
      dialogInvoice: false,
      // 默认的发票
      DefaultInvoice: "",
      // 返回来的详细数据
      DetaileData: [],
      // 价格总和明细
      priceTotalDetail: {},
      // 下单的所有信息
      OrderInformation: {},
      // 是不是VIP
      isVIP: false,
    };
  },

  components: {
    VDistpicker,
    ShoppingSettlementOItem
  },
  watch: {
    addressList(){
      this.addressList.forEach(item => {
      if(item.isdefault){
        this.curentAdressItem=item;
        this.addressValue=item.id
      }
    });
    },
    InvoiceList(){
      this.InvoiceList.forEach(item=>{
      if(item.isdefault){
        this.DefaultInvoice=item.id;
        this.DefaultInvoiceObject=item;
      }
    })
    },

    // 判断运输方式
    dilivertype() {
      if (this.dilivertype === "1") {
        this.priceTotalDetail.Postage = 100;
        this.priceTotalDetail.totalPrice =
        this.priceTotalDetail.totalPrice + 100;
      } else {
        this.priceTotalDetail.Postage = 0;
        this.priceTotalDetail.totalPrice =
        this.priceTotalDetail.totalPrice - 100;
      }
    },
    // 监听收货地址的变化
    addressValue() {
      this.curentAdressItem = this.addressList.find(
        item => item.id === this.addressValue
      );
    }
  },
  methods: {
    ...mapMutations("MerchantList",["setBuyOneGoodsDetail"]),
    ...mapActions("ShoppingSettlement", [
      "GetAllReceivingAddress",
      "GetAddAddress",
      "GetUpdateAddress",
      "GetFindgAddressById",
      "GetAllPersonalInvoice",
      "GetOrderCreater"
    ]),
      //修改发票类型
      handleChangeGoodsBillSetOff(e){
          this.GoodsBillSetOffList.map(item=>{
              if(item.id==e){
                  this.selectedGoodsBillSetOffObj=item;
                  let val1=0,val2=0;
                  if(this.priceTotalDetail.rmbtotalPrice){
                       val1=(item.setoff)*(this.priceTotalDetail.rmbtotalPrice)/100;
                  }
                  if(this.priceTotalDetail.usdTotalPrice){
                       val2=(item.setoff)*(this.priceTotalDetail.exchange*this.priceTotalDetail.usdTotalPrice)/100;
                  }
                  this.$set(this.priceTotalDetail,'needPayBillTotal',val1+val2)
              }
          })
      },
      //修改地址
      selectedDefaultAddress(k){
          this.defaultAddress=this.allAddress[k]
      },
        //修改发票
      selectedDefaultVoice(k){
        this.DefaultInvoiceObject=this.allInvoice[k]
      },
    //跳转到个人中心订单列表
    chipCenterOrder(){
        clearInterval(this.chipCenterOrderCount)
        this.count=60;
        //this.showGoIndex=false;
        this.$router.push({"path":"/PersonalCenter/BuyerOrderManagement"})
    },
    // 关闭信息的模态框
    handleClose2(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取选择的收货地址
    distpicker(x) {
      this.province = x.province.value;
      this.city = x.city.value;
      this.area = x.area.value;
    },
    // 编辑收货地址
    editAddress(item) {
      this.GetFindgAddressById({
        id: item.id,
        access_token: this.access_token
      }).then(res => {
        let arr = res.address.split("/");
        this.province = arr[0];
        this.city = arr[1];
        this.area = arr[2];
        this.ruleForm = res;
      });
      // this.curentAdressItem = item;
      this.dialogAddress = true;
      this.addressText = false;
    },
    // 新增收货地址
    addNewAdrress() {
      this.dialogAddress = true;
      this.addressText = true;
    },
    // 提交订单
    submit() {
      if(!this.DefaultInvoiceObject.id){
        this.$message.error("请选择发票信息")
        return;
      }
      if(!this.defaultAddress.id){
        this.$message.error("请选择配送地址")
        return;
      }
      let bill = JSON.parse(this.OrderInformation.bill);
      bill.content_id = this.DefaultInvoiceObject.id;
      bill.billtype=this.selectedGoodsBillSetOff;
      this.OrderInformation.add_id = this.defaultAddress.id;
      this.OrderInformation.dilivertype = this.dilivertype;
      this.OrderInformation.type = "1";
      this.OrderInformation.bill = JSON.stringify(bill);
      console.log(this.OrderInformation)
      // 进行下单,三种情况
      if(this.priceTotalDetail.isVIP && this.priceTotalDetail.isEnough){
        //月结用户直接生成订单，去往个人中心
        this.GetOrderCreater(this.OrderInformation).then(res=>{
          console.log("月结用户直接生成订单，去往个人中心")
          this.showGoIndex=true;
          var _this=this;
          this.chipCenterOrderCount=setInterval(function(){
            if(_this.count==0){
                _this.chipCenterOrder()
            }else{
              _this.count--
            }
          },1000)
        })
      }else if(this.priceTotalDetail.isVIP && !this.priceTotalDetail.isEnough){
        //月结用户是否愿意生成普通订单，直接去付款
         this.$confirm('尊敬的月结用户，由于您的余额不足，此订单将转为普通订单，继续提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.GetOrderCreater(this.OrderInformation).then(res=>{
              this.orderNumber=res.data;
              if(this.paytype==0){
                  this.$router.push({
                      path: "/ShoppingCart/PaymentOrders",
                      query: {
                          orderNumber:res.data,
                          // payType: 2,
                          // totalPrice: this.totalPrice
                      }
                  });
              }else{
                  this.getOrderType()
              }
            })
        }).catch(() => {
          console.log('已取消删除')
        });
      }else{
        //普通用户，直接去付款
          this.GetOrderCreater(this.OrderInformation).then(res=>{
              this.orderNumber=res.data;
              if(this.paytype==0){
                  this.$router.push({
                      path: "/ShoppingCart/PaymentOrders",
                      query: {
                          orderNumber:res.data,
                          // payType: 2,
                          // totalPrice: this.totalPrice
                      }
                  });
              }else{
                  this.getOrderType()
              }
          })
      }
    },

    // 请求所有的发票信息
    getAllInvoice()
    {
        axios.request({...shoppingCar.queryUserBill,params:{start:0,length:20}}).then(res=>{
            console.log(res)
           if(res.data.total==1){
                this.DefaultInvoiceObject=res.data.data[0]
            }else if(res.data.total>1){
               let count=0;
                res.data.data.forEach(item=>{
                    if(item.isdefault){
                        this.DefaultInvoiceObject=item;
                        count++;
                    }
                })
               if(count==0){
                   this.DefaultInvoiceObject=res.data.data[0]
               }
            }
            this.allInvoice=res.data.data
        })
      // this.GetAllPersonalInvoice({
      //   start: 0,
      //   length: 10,
      //   access_token: this.access_token
      // });
    },
      // 获取全部的收货地址
      getAllAddress() {
          axios.request({...presonalAdress.getAllAdress,params:{start:0,length:20}}).then(res=>{
              if(res.data){
                  if(res.data.total==1){
                      this.defaultAddress=res.data.data[0]
                  }
                  else if(res.data.total>1){
                      let count=0;
                      res.data.data.forEach(item=>{
                          if(item.isdefault){
                              this.defaultAddress=item;
                              count++
                          }
                      })
                      if(count==0){
                          this.defaultAddress=res.data.data[0]
                      }
                  };
                  this.allAddress= res.data.data;
              }

          })
      },
    // 新增开票信息
    addInvoiceInforma() {
        console.log("ertgr")
      this.dialogVisibleAddInvoice = true;
    },
    // 确认开票信息
    submitFormAddInvoice(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleFormAddInvoice.access_token = this.access_token;
          if (this.dialogTitleAddInvoice) {
            this.$store
              .dispatch(
                "InvoiceInformationManagement/GetAddPersonalInvoice",
                this.ruleFormAddInvoice
              )
              .then(res => {
                this.$message({
                  type: "success",
                  message: res
                });
                this.getAllInvoice();
                this.dialogVisibleAddInvoice = false;
              });
          } else {
            this.$store
              .dispatch(
                "InvoiceInformationManagement/GetChangePersonalInvoice",
                this.ruleFormAddInvoice
              )
              .then(res => {
                this.$message({
                  type: "success",
                  message: res
                });
                this.AllInvoice();
                this.dialogVisibleAddInvoice = false;
                this.dialogTitleAddInvoice = true;
              });
          }
        } else {
          this.$message.error("请完善信息");
        }
      });
    },
    // 删除开票信息
    delectInvoice(item) {
      this.$store
        .dispatch("InvoiceInformationManagement/GetDelPersonalInvoice", {
          id: item.id,
          access_token: this.access_token
        })
        .then(res => {
          this.$message({
            type: "success",
            message: res
          });
          this.AllInvoice();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 编辑发票信息
    editInvoice(item) {
      this.dialogVisibleAddInvoice = true;
      this.dialogTitleAddInvoice = false;
      this.$store
        .dispatch("InvoiceInformationManagement/GetQueryUserBillById", {
          id: item.id,
          access_token: this.access_token
        })
        .then(res => {
          this.ruleFormAddInvoice = res;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
      //新建地址
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.address = `${this.province}/${this.city}/${this.area}`;
          // this.ruleForm.access_token = this.access_token;
            return;
          if (this.addressText) {
              axios.request({...presonalAdress.AddAddress,method:"post",data:this.ruleForm}).then(res=>{
            // this.GetAddAddress(this.ruleForm)
            //   .then(res => {
                this.$message({
                  type: "success",
                  message: res.message
                });
                this.dialogAddress = false;
                this.allAddress();
              })
              .catch(err => {
                this.$message.error(err);
              });
          } else {
            this.GetUpdateAddress(this.ruleForm)
              .then(res => {
                this.$message({
                  type: "success",
                  message: res
                });
                this.dialogAddress = false;
                this.allAddress();
              })
              .catch(err => {
                this.$message.error(err);
              });
          }
        } else {
          this.$message.error("请完善信息");
          return false;
        }
      });
    },
     // this.GetAllReceivingAddress({
     //    start: 0,
     //    length: 10
     //  })
   // },
    // 关闭时的回调
    closeDialogAddress(formName) {
      this.$refs[formName].resetFields();
    },
    // 收货地址模态框取消
    addressCancel(formName) {
      this.dialogAddress = false;
      this.$refs[formName].resetFields();
    },
    // 选择管理开票信息
    selectInvoice() {
      this.dialogInvoice = true;
    },
    // 确认选择的发票
    selectInvoiceSubmit() {
      this.DefaultInvoiceObject = this.InvoiceList.find(
        item => item.id === this.DefaultInvoice
      );
      if(!this.DefaultInvoiceObject){
        this.$message.error(
          '请先选择开票信息'
        )
      }else{
            this.dialogInvoice = false;
      }
    },
      closeDialogCallBack(){
          this.showDialog=false
      },
      handleAvatarSuccess(res, file) {
          if(res.resultCode =='200'){
              this.$message({
                  type:'success',
                  message:'上传成功，等待审核'
              })
              this.showDialog=false
              this.$router.push("/PersonalCenter/BuyerOrderManagement")
          }
      },
      beforeAvatarUpload(file) {
          // const isJPG = file.type === 'image/jpeg';
          // const isLt2M = file.size / 1024 / 1024 < 2;

          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          // if (!isLt2M) {
          //   this.$message.error('上传头像图片大小不能超过 2MB!');
          // }
          // return isJPG && isLt2M;
      },
      handleRemove(file, fileList) {
          console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
          console.log(file);
      },
      getOrderType(){
          let countime=1000
          var _this = this;
          const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          });
          let count=30
          this.timer=setInterval(function(){
              count--;
              if(count<0){
                  clearInterval(_this.timer)
              }
              _this.$store
                  .dispatch("SignContract/getQueryOrderInfo", {
                      orderNo: _this.orderNumber,
                      access_token: _this.access_token
                  }).then(res=>{
                  _this.getOrderInfo=res
                  if( _this.getOrderInfo.money){
                      _this.totalPrice = _this.getOrderInfo.money;
                      loading.close()
                      clearInterval(_this.timer)
                      _this.showDialog=true;
                  }
              })
          },countime)

      },
      getGoodsBillSetOffList(){
        axios.request({...shoppingCar.queryGoodsBillSetOffList,params:{isenable:true,start:0,length:100}}).then(res=>{
            if(res){
                    this.GoodsBillSetOffList=res.data.data;
                    res.data.data.forEach(item=>{
                        if(item.name=='增值税发票'){
                            this.selectedGoodsBillSetOff=item.id;
                            this.selectedGoodsBillSetOffObj=item
                            return;
                        }
                    })
            }
        })
      }
    },
  filters: {
    ToFixed(x) {
      if (x) {
        return x.toFixed(2);
      }
    }
  },
  computed: {
    ...mapState({
      buyOneGoodsDetail:state =>JSON.parse(state.MerchantList.buyOneGoodsDetail),
      addressList: state => state.ShoppingSettlement.addressList,
      InvoiceList: state => state.ShoppingSettlement.InvoiceList
    }),
    access_token() {
      return sessionStorage.getItem("access_token");
    },
      requestUrl() {
          return (
              baseURL +
              `api-order/customerCenter/uploadBankTransferNo?access_token=${this.access_token}&orderNo=${this.orderNumber}`
          );
      },
  },
  created(){
    if(!this.buyOneGoodsDetail.data){
       this.$router.push({
                    path: "/",
                  });
    }


  },
  mounted(){
      this.getGoodsBillSetOffList();
      this.getAllInvoice();
      //获取全部的收货地址
      this.getAllAddress();
      this.$store.state.shoppingCart.active = 1;
      // 获取全部的发票
      // 将运费方式改为到付
      this.dilivertype = "0";
      // let DetailData = JSON.parse(this.$route.query.data).deatil;
      // console.log(DetailData);
      // this.OrderInformation = JSON.parse(this.$route.query.obj2);
      // this.priceTotalDetail = JSON.parse(this.$route.query.data);
      let DetailData = JSON.parse(this.buyOneGoodsDetail.data).deatil;
      console.log(JSON.parse(this.buyOneGoodsDetail.data))
      this.OrderInformation = JSON.parse(this.buyOneGoodsDetail.obj2);
      this.priceTotalDetail = JSON.parse(this.buyOneGoodsDetail.data);
      this.isVIP = JSON.parse(this.buyOneGoodsDetail.data).isVIP;
      for (var key in DetailData) {
          DetailData[key].forEach(item => {
              console.log(item)
              this.goodsCount = this.goodsCount + Number(item.goods_count)
          })
          this.DetaileData.push({
              name: key,
              list: DetailData[key]
          });
      }
  }
}
</script>
<style lang="less" scoped>
    @import "./ShoppingSettlement.less";

    .counttime{
        color:red;
        font-weight:bolder;
    }
    .invoiceFlag{
        .el-checkbox__label{
            font-size:16px;
        }
    }
    .el-radio__inner{
        display: none;
    }
    .address-distpicker {
        .distpicker-address-wrapper{
            select{
                font-size:14px;
            }
        }
    }
    .Add-Invoice-shpoing{
        .el-form-item__label{
            font-size:14px;
        }
        .el-input__inner{
            height:40px;
            border-width:1px;
        }
    }
</style>
<style scoped>

    .editAddress>label{
        width: 100%;
    }
    .editAddress>>>.el-radio__label{
        width:100%;
    }
    .wrap>>>.el-icon-close{
        display:none;
    }
    .wrap>>>.el-dialog__body{
        padding-top:0;
    }
    .wrap>>>.el-dialog__body p{
        width:80%;
        margin:0 auto;
        font-size:16px;
        line-height: 40px;
        padding-bottom: 50px;
    }
    .wrap>>>.el-dialog__body p a{
        display:inline-block;
        color:#0068df;
        cursor: pointer;
        margin:0 10px;

    }
    .wrap>>>.el-dialog__body p a:hover{
        text-decoration:underline;
        font-weight: bolder;
        color:peru;
    }
</style>
