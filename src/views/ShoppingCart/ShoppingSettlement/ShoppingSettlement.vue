<template>
  <div class="ShoppingSettlement">
    <div class="Order-information">
      <div class="address">
        <div class="title">
          <span>配送地址</span>
        </div>
        <div class="cont" v-if="allAddress.length">
          <span v-if="defaultAddress.isdefault">默认</span>&nbsp;&nbsp;
          <span>{{defaultAddress.receivingName}}&nbsp;&nbsp; {{defaultAddress.phone}}</span>&nbsp;&nbsp;
          <span>{{defaultAddress.address}} {{defaultAddress.detailedAddress}}</span>&nbsp;&nbsp;
          <span class="btn blue" @click="showResetAddress=true">地址管理</span>
        </div>
        <div v-else class="cont">
          暂无收货地址 &nbsp;&nbsp;
          <a href="javascript:;" class="btn bgColor" @click="addNewAdrress">添加</a>
        </div>
      </div>
      <div class="setinvoice">
        <div class="title">
          <!-- <div class="fr" @click="showResetVoice=true" v-if="allInvoice.length>1">
                    <span class="btn bgColor" >选择</span>
          </div>-->
          <span>发票信息</span>
        </div>
        <div class="cont">
          <p style="margin-bottom:20px;"  v-if="selectedGoodsBillSetOff!=3">
            发票公司：{{DefaultInvoiceObject.id?DefaultInvoiceObject.corporatename:'暂无发票信息'}}
            <span
              class="btn blue"
              @click="showAllInvoice=true"
            >修改</span>
            <span class="btn blue" @click="addInvoiceInforma">使用新的开票信息</span>
          </p>
          <p>
            <el-radio-group v-model="selectedGoodsBillSetOff" @change="handleChangeGoodsBillSetOff">
              <el-radio
                v-for="item in GoodsBillSetOffList"
                :value="item.id"
                :label="item.id"
                :key="item.id"
              >{{item.name}}</el-radio>
            </el-radio-group>
          </p>
          <p class="color" v-show="showAllInvoice">提醒：订单提交后不可更改！如有疑问或其他需求请先联系客服人员，否则相关损失由客户自行承担。</p>
          <ul class="showallInvoice" v-show="showAllInvoice">
            <li
              v-for="item in allInvoice"
              :key="item.id"
              :class="{default:item.isdefault,active:item.id==DefaultInvoiceObject.id}"
            >
              <div class="wrap" @click="resetInvoce(item)">
                <span class="mark bgColor" v-if="item.isdefault">默认</span>
                <p>公司名称： {{item.corporatename}}</p>
                <p>税号/统一信用代码证号：{{item.billno}}</p>
                <p>开户银行：{{item.openingbank}}</p>
                <p>银行账户：{{item.bankaccount}}</p>
                <p>开票地址：{{item.registeredaddress}}</p>
                <p>开票电话：{{item.registeredphone}}</p>
              </div>
            </li>
          </ul>
          <div
            @click="showAllInvoice=false"
            v-if="showAllInvoice"
            style="text-align:center;border:1px solid #ddd;margin-top:10px;"
            title="确认"
            class="btn"
          >
            <i class="el-icon-arrow-up blue" style="font-size:20px;"></i>
            <i class style="font-size:14px;font-style:normal;">确认</i>
          </div>
        </div>
      </div>
      <div class="payType">
        <p class="title">
          <span>支付方式</span>
        </p>
        <ul class="type">
          <li class="typeone">
            <el-radio v-model="paytype" label="0">在线支付</el-radio>
            <span>
              <img src="../../../assets/image/icon/weichat.png" alt />微信
            </span>
            <span>
              <img src="../../../assets/image/icon/zhifubao.png" alt />支付宝
            </span>
          </li>
          <li class="typetwo clear">
            <el-radio v-model="paytype" label="1">公对公转账</el-radio>
            <br />
            <div v-if="paytype==1" class="desc clear">
              <p>
                <strong>*收款账户信息如下：</strong>
                <!-- <a href="" class="blue fr downbtn" >下载汇款信息</a> -->
              </p>
              <p>
                <span>公&nbsp;司&nbsp;名&nbsp;称&nbsp;：</span>
                <span>北京晶圆电子有限公司</span>
              </p>
              <p>
                <span>开&nbsp;户&nbsp;银&nbsp;行&nbsp;：</span>
                <span>招商银行北京上地支行</span>
              </p>
              <p>
                <span>银&nbsp;行&nbsp;账&nbsp;号&nbsp;：</span>
                <span>110 906 335 410 201</span>
              </p>
              <p>请务必用对应的开票公司汇款，汇款完成后请上传汇款底单或者转账凭证;</p>
            </div>
          </li>
          <li class="typethree">
            <!-- v-if="this.priceTotalDetail.isVIP" -->
            <el-radio
              v-model="paytype"
              label="2"
              v-if="this.priceTotalDetail.isVIP && this.priceTotalDetail.isEnough"
            >月结白条</el-radio>
            <el-radio
              v-model="paytype"
              label="2"
              v-if="(!this.priceTotalDetail.isVIP) || !this.priceTotalDetail.isEnough"
              disabled
            >月结白条</el-radio>
            <span v-if="this.priceTotalDetail.isVIP">
              目前剩余月结白条额度￥{{priceTotalDetail.restLine | toFixed(2)}}元;
              <!-- <a
                class="blue"
                href="javascript:;"
                @click="showUplevel=true"
              >提升额度</a>-->
              &nbsp;
              <a class="blue" href="/#/footerWrap/monthquota?index=4">如何提升额度？</a>
            </span>
            <span v-if="!this.priceTotalDetail.isVIP">
              目前您还不是月结用户;
              <router-link class="blue" to="/PersonalCenter/UpgradeLevel">申请月结</router-link>
            </span>
          </li>
        </ul>
      </div>
      <!-- 订单商品 -->
      <div class="order-product">
        <p class="title">
          <span>采购清单</span>
          <router-link to="/ShoppingCart" class="fr">返回购物车</router-link>
          <!-- <span class="color">x{{goodsCount}}</span> -->
        </p>
        <ul>
          <ShoppingSettlementOItem v-for="(item,k) in DetaileData" :key="k" :item="item"></ShoppingSettlementOItem>
        </ul>
        <!-- 开具发票 -->
        <!-- 结算金额明细 -->
        <div class="totalDetail clear">
          <div>
            <div class="left"></div>
            <div class="count">
              <p>
                <span class="fr">￥{{priceTotalDetail.rmbtotalPrice | toFixed(2)}}</span>
                <strong>人民币</strong>
                共{{unuscount}}种零件，金额小计：
              </p>
              <p>
                <strong>美元</strong>
                共{{UScount}}种零件，金额小计：
                <span
                  class="fr"
                >US${{priceTotalDetail.usdTotalPrice | toFixed(3)}}</span>
              </p>
              <p>
                今日美元汇率牌价：
                <span class="fr">{{priceTotalDetail.exchange}}</span>
              </p>
            </div>
          </div>
          <div>
            <div class="desc">
              <!-- <p>*海关增值税13%；与国内产品销售暂行税率一致；</p>
              <p>*关税：是依据海关公布的产品来对应关税，若有关税疑问，请联系客服</p>
              <p>*清关服务费；按本批次总货值的万分之五收取，不足300元按300收取；每报关一次收取一次费用；</p>-->
            </div>
            <div class="count">
              <p>
                海关增值税13%：
                <span
                  class="fr"
                >￥{{priceTotalDetail.usdTotalPrice*priceTotalDetail.exchange*0.13 | toFixed(2)}}</span>
              </p>
              <p>
                关税：
                <span class="fr">￥{{priceTotalDetail.Guanshui}}</span>
              </p>
              <p>
                清关服务费：
                <span class="fr">￥{{priceTotalDetail.GuanshuiService}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="clear totalCount">
          <p class="fl">
            <!-- *运费说明，单一供应商购买金额500元以上为包国内邮费，500元以下为顺丰到付 -->
          </p>
          <p class="fr">应付人民币总额：￥{{priceTotalDetail.totalPrice | toFixed(2)}}</p>
        </div>

        <div class="clear">
          <span class="fl" style="margin-top:45px;">
            <label>
              <!-- <input type="checkbox" :checked="isAccept" v-model="isAccept" /> -->

              <!-- 本人已阅读并同意下方交易提示的内容 -->
              <h3 class="color">交易提示：</h3>
            </label>
          </span>

          <span class="submit bgColor fr" @click="submit">提交订单</span>
        </div>
        <div style="font-size:14px;line-height:1.8;margin-top:10px;">
          <hr />

          <p>平台目前提供人民币与美元两种报价，取决于卖家的交货地址；但买家目前只能使用人民币付款；</p>
          <div>
            <p>1、关于海关增值税</p>此部分只针对美元交易的产品，此部分随国家政策做相应调整；
          </div>
          <div>
            <p>2.关税与费用多退少补</p>根据国家海关规定：集成电路类的进口免关税，部分非集成电路类的元零件将收取关税。如果您所提交的订单中包含需要缴纳关税的型号，我们在后台做了初步的设置，我们会根据实际发生情况进行多退少补;
          </div>
          <div>
            <p>3、香港交货报关费补差价情况</p>由于部分型号体积较大或重量较重等原因出现超重情况时，视供应商不同可能需要客户补交超出部分的运费；出现超重情况时，我们客服人员会第一时间与您取得联系，提醒您补交运费事项。
          </div>
          <div>
            <p>4、国内运费</p>从单一供应商购买金额超过500元以上为国内包邮，500元以下为顺丰到付；
          </div>
          <div>
            <p>5、清关服务费</p>针对美元交易的部分，平台将按总货值的万分之五收到，不足300元时按300收到；合并报关癔味者你此订单所有香港交换会等所有货物收齐后统一报关收一次清关服务费；单独清关，我们将单独为每一个型号报关，将分多次收取清关服务费；
          </div>
          <div>
            <p>6、关于付款问题</p>对公转账用户将于订单生成后24小时完成支付，月结用户需要收24小时内完成合同回签并使用月结白条支付，逾期未支付订单将被自动取消，库存补自释放；
          </div>
        </div>
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
    <el-dialog :visible.sync="dialogVisibleAddInvoice" width="700px">
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
            <el-input v-model="ruleFormAddInvoice.billno" maxlength="18" show-word-limit @input="setBillo"></el-input>
          </el-form-item>
          <el-form-item label="开户银行：" prop="openingbank">
            <el-input v-model="ruleFormAddInvoice.openingbank"></el-input>
          </el-form-item>
          <el-form-item label="银行账号：" prop="bankaccount">
            <el-input v-model="ruleFormAddInvoice.bankaccount" @input="setBankCount"></el-input>
          </el-form-item>
          <el-form-item label="开票电话：" prop="registeredphone">
            <el-input v-model="ruleFormAddInvoice.registeredphone" @input="setPhone"></el-input>
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
        <el-button @click="dialogVisibleAddInvoice = false">取 消</el-button>
        <el-button type="primary" @click="submitFormAddInvoice('ruleForm')">确认发票信息</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogInvoice" width="1000px" center class="dialog-ruleForm-Invoice">
      <p slot="title" class="title">发票历史信息</p>
      <!-- 添加发票的模态框 -->
      <div class="list">
        <ul class="InvoiceInforma-list">
          <li v-for="item in InvoiceList" :key="item.id" class="Invoiceitem">
            <div class="defaultInvoiceMark" v-if="item.isdefault">
              <span class="cont">默认</span>
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
                  <el-radio-group v-model="DefaultInvoice" class="defaultradioSquare">
                    <el-radio :label="item.id" :value="item.id" name="defaultInvoice">设为开票信息</el-radio>
                  </el-radio-group>
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
    <el-dialog :title="title" :visible.sync="showGoIndex" width="600px">
      <div class="showGoIndex">
        <h2 class="color">您的订单已提交成功！</h2>
        <p class="blue">
          <span class="counttime">{{count}}s</span>后自动跳转到
          <a @click="chipCenterOrder">“我的订单”</a>
        </p>
        <div class="blue">
          <p>1、在线支付与公对公转账订单将务必于24小时内完成支付，否则订单将自动取消;</p>
          <p>
            2、月结“白条用户” 请到对应订单中下载《购销合同》，在完成签字和盖章上传后订单方可使用白条进行全额支付！谢谢您的配合！
          </p>

          <!-- 尊敬的月结用户,为了不影响贵公司的正常交期，
              请务必于24小时内去订单中心下载对应的购销合同、盖章、扫描或拍照上传并完成支付,否则系统将会自动取消您的订单；
          谢谢您的配合！-->
        </div>
        <!-- <p>尊敬的月结用户，您的订单已提交，<span class="counttime">{{count}}s</span>后自动跳转到<a @click="chipCenterOrder">用户中心>>>我的订单</a>下载上传合同 </p> -->
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="chipCenterOrder" type="info">前往用户中心</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="showGoIndex1" width="600px">
      <div class="showGoIndex">
        <h2 class="color">您的订单已提交成功！</h2>
        <p class="blue">
          <span class="counttime">{{count}}s</span>后自动跳转到
          <a @click="chipCenterOrder">“我的订单”</a>
        </p>
        <div class="blue">
          <p>1、在线支付与公对公转账订单将务必于24小时内完成支付，否则订单将自动取消;</p>
          <p>2、月结“白条用户” 请到对应订单中下载《购销合同》，在完成签字和盖章上传后订单方可使用白条进行全额支付！谢谢您的配合！</p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="payMount" class="bgColor">立即支付</el-button>
        <el-button type="info">
          <span @click="chipCenterOrder">前往用户中心</span>
        </el-button>
      </div>
    </el-dialog>
    <bankTransfer
      :bankTransferObj="bankTransferObj"
      v-if="showDialog"
      @closeBankTransfer="showDialog=false"
      @bankSuccess="bankSuccess"
    ></bankTransfer>
    <el-dialog title="选择收货地址" :visible.sync="showResetAddress" width="60%">
      <div class="selectedAddress">
        <ul>
          <li
            v-for="(item,k) in allAddress"
            :key="k"
            @click="selectedDefaultAddress(k)"
            :class="defaultAddress.id==item.id?'bgColor':''"
          >
            <span class="defaultAddress" v-if="item.isdefault">默</span>
            <span>{{item.receivingName}}&nbsp;&nbsp; {{item.phone}}</span>&nbsp;&nbsp;
            <span>{{item.address}} {{item.detailedAddress}}</span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addNewAdrress">添加新地址</el-button>
        <el-button type="primary" @click="showResetAddress = false">确认</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选择开票信息" :visible.sync="showResetVoice" width="70%">
      <div class="selectedVoice">
        <ul>
          <li
            v-for="(item,k) in allInvoice"
            :key="k"
            @click="selectedDefaultVoice(k)"
            :class="DefaultInvoiceObject.id==item.id?'bgColor':''"
          >
            <div class="defaultInvoiceMark">
              <span v-if="item.isdefault">默</span>
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
    <el-dialog :title="`${title}交易说明`" :visible.sync="showTishi" width="70%"></el-dialog>
    <el-dialog :title="`${title}销售合同`" :visible.sync="showhetong" width="70%">
      <div>暂无内容</div>
    </el-dialog>
    <el-dialog title="提升额度" :visible.sync="showUplevel" width="600px">
      <div>
        <el-form
          ref="upLevelform"
          :model="upLevelform"
          label-width="150px"
          :rules="rulesUpLevelform"
        >
          <el-form-item label="申请额度：" prop="creditTotal">
            <el-input v-model="upLevelform.creditTotal" type="number">
              <span slot="prefix">￥</span>
            </el-input>
          </el-form-item>
          <el-form-item label="申请人姓名：" prop="contactname">
            <el-input v-model="upLevelform.contactname"></el-input>
          </el-form-item>
          <el-form-item label="申请人电话" prop="contactphone">
            <el-input v-model="upLevelform.contactphone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUplevel = false">取 消</el-button>
        <el-button type="primary" @click="submitUplevel('upLevelform')">确 定</el-button>
      </span>
    </el-dialog>
    <payType v-if="showPayTypeOnline" @closePayType="closePayType" :orderNumber="orderNumber"></payType>
  </div>
</template>

<script>
import { baseURL } from "@/config";
import VDistpicker from "v-distpicker";
import { mapState, mapActions, mapMutations } from "vuex";
import bankTransfer from "_c/bankTransfer";
import ShoppingSettlementOItem from "_c/ShoppingSettlementOItem";
import { setTimeout, setInterval, clearInterval } from "timers";
import {
  axios,
  presonalAdress,
  shoppingCar,
  buyerOrderCenter,
  common
} from "../../../api/apiObj";
//import { constants } from "crypto";
export default {
  name: "ShoppingSettlement",
  data() {
    return {
      showTishi: false,
      isAccept: false,
      showxieyi: false,
      showhetong: false,
      showResetVoice: false,
      showResetAddress: false,
      showAllInvoice: false,
      showUplevel: false,
      upLevelform: {},
      rulesUpLevelform: {
        creditTotal: [
          { required: true, message: "请输入申请的额度", trigger: "blur" }
        ],
        contactname: [
          { required: true, message: "请输入申请人姓名", trigger: "blur" }
        ],
        contactphone: [
          { required: true, message: "请输入申请人联系电话", trigger: "blur" }
        ]
      },
      timer: null,
      businessList: [],
      //收货地址
      defaultAddress: {},
      allAddress: [],
      //开票
      DefaultInvoiceObject: {},
      needInvoice: true,
      allInvoice: [],
      GoodsBillSetOffList: [],
      selectedGoodsBillSetOff: 0,
      selectedGoodsBillSetOffObj: {},
      //0标识在线支付
      paytype: "0",
      //生成的订单bianhao
      orderNumber: "",
      getOrderInfo: {},
      //对公转账
      showDialog: false,
      //购买商品总数
      goodsCount: 0,
      //月结用户提交订单成功后需要跳转
      count: 15,
      //月结订单跳转
      showGoIndex: false,
      //普通订单跳转
      showGoIndex1: false,
      //自定跳转计时器
      chipCenterOrderCount: null,
      //判断是否有订单信息
      hasCont: true,
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
        isdefault: false,
        address: "",
        receivingName: "",
        phone: "",
        phoneAreaCode: "中国+0086",
        tel: "",
        telAreaCode: "010",
        postalCode: "",
        detailedAddress: "",
        isEnable: 1
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
      unuscount: 0,
      UScount: 0,
      bankTransferObj: {}, //公对公转账
     
    };
  },
  destroyed() {
    clearInterval(this.chipCenterOrderCount);
    this.chipCenterOrderCount = null;
  },

  components: {
    VDistpicker,
    ShoppingSettlementOItem,
    bankTransfer
  },
  watch: {
    showGoIndex1(newval, oldval) {
      if (newval == false && oldval == true) {
        this.$router.push("/PersonalCenter/BuyerOrderManagement");
      }
    },
    showGoIndex(newval, oldval) {
      if (newval == false && oldval == true) {
        this.$router.push("/PersonalCenter/BuyerOrderManagement");
      }
    },
    addressList() {
      let count = 0;
      this.addressList.forEach(item => {
        if (item.isdefault) {
          count++;
          this.curentAdressItem = item;
          this.addressValue = item.id;
        }
      });
      if (!count) {
        this.curentAdressItem = this.addressList[0];
        this.addressValue = this.addressList[0].id;
      }
    },
    InvoiceList() {
      let count = 0;
      this.InvoiceList.forEach(item => {
        if (item.isdefault) {
          count++;
          this.DefaultInvoice = item.id;
          this.DefaultInvoiceObject = item;
        }
      });
      if (!count) {
        this.DefaultInvoice = this.InvoiceList[0].id;
        this.DefaultInvoiceObject = this.InvoiceList[0];
      }
    },
    // 监听收货地址的变化
    addressValue() {
      this.curentAdressItem = this.addressList.find(
        item => item.id === this.addressValue
      );
    }
  },
  computed: {
    ...mapState({
      title: state => state.title,
      buyOneGoodsDetail: state =>
        JSON.parse(state.MerchantList.buyOneGoodsDetail),
      addressList: state => state.ShoppingSettlement.addressList,
      InvoiceList: state => state.ShoppingSettlement.InvoiceList,
      showPayTypeOnline: state => state.showPayTypeOnline
    }),
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    setBillo(){
      this.ruleFormAddInvoice.billno=this.ruleFormAddInvoice.billno.replace(/[^a-z0-9]/g,'')
    },
    setBankCount(){
      this.ruleFormAddInvoice.bankaccount=this.ruleFormAddInvoice.bankaccount.replace(/[^0-9]/g,'')
    },
    setPhone(){
      this.ruleFormAddInvoice.registeredphone=this.ruleFormAddInvoice.registeredphone.replace(/[^0-9]/g,'')
    },
    requestUrl() {
      return (
        baseURL +
        `api-order/customerCenter/uploadBankTransferNo?access_token=${this.access_token}&orderNo=${this.orderNumber}`
      );
    }
  },
  methods: {
    ...mapMutations(["setshowPayTypeOnline"]),
    ...mapMutations("MerchantList", ["setBuyOneGoodsDetail"]),
    ...mapActions("ShoppingSettlement", [
      "GetAllReceivingAddress",
      "GetAddAddress",
      "GetUpdateAddress",
      "GetFindgAddressById",
      "GetAllPersonalInvoice",
      "GetOrderCreater"
    ]),
    ...mapActions("Login", ["GetUserInforma"]),
    closePayType(){
      this.setshowPayTypeOnline(false);
      this.$router.push("/PersonalCenter/BuyerOrderManagement")
    },
    submitUplevel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .request({
              ...buyerOrderCenter.increaseCredit,
              data: this.upLevelform
            })
            .then(res => {
              if (res) {
                // this.handleChangeGoodsBillSetOff();
                this.showUplevel = false;
                this.$message("申请已提交");
              }
            });
        }
      });
    },
    resetInvoce(item) {
      this.DefaultInvoice = item.id;
      this.DefaultInvoiceObject = item;
    },
    //修改发票类型
    handleChangeGoodsBillSetOff(e) {
      this.GoodsBillSetOffList.map(item => {
        if (item.id == e) {
          this.selectedGoodsBillSetOffObj = item;
          let val1 = 0,
            val2 = 0;
          if (this.priceTotalDetail.rmbtotalPrice) {
            val1 = (item.setoff * this.priceTotalDetail.rmbtotalPrice) / 100;
          }
          if (this.priceTotalDetail.usdTotalPrice) {
            val2 =
              (item.setoff *
                (this.priceTotalDetail.exchange *
                  this.priceTotalDetail.usdTotalPrice)) /
              100;
          }
          this.$set(this.priceTotalDetail, "needPayBillTotal", val1 + val2);
        }
      });
    },
    //修改地址
    selectedDefaultAddress(k) {
      this.defaultAddress = this.allAddress[k];
    },
    //修改发票
    selectedDefaultVoice(k) {
      this.DefaultInvoice = this.allInvoice[k].id;
      this.DefaultInvoiceObject = this.allInvoice[k];
    },
    //跳转到个人中心订单列表
    chipCenterOrder() {
      clearInterval(this.chipCenterOrderCount);
      this.count = 15;
      //this.showGoIndex=false;
      this.$router.push({ path: "/PersonalCenter/BuyerOrderManagement" });
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
      this.showResetAddress = false;
    },
    //提交订单后需要选择是否立即支付
    payMount() {
      clearInterval(this.chipCenterOrderCount)
      if (this.paytype == 0) {
        //在线支付
        this.setshowPayTypeOnline(true)
        // axios.request(common.getToken).then(res0 => {
        //   this.GetOrderCreater({
        //     data: this.OrderInformation,
        //     token: res0.data
        //   }).then(res => {
        //     this.orderNumber = res.data;
        //     this.setshowPayTypeOnline(true)
        //   });
        // });
      } else if (this.paytype == 1) {
        //对公转账
        this.getOrderType();
      }
    },
    // 提交订单
    submit() {
       let bill = JSON.parse(this.OrderInformation.bill);
      if(this.selectedGoodsBillSetOff!=3){
        if (!this.DefaultInvoiceObject.id) {
          this.$message.error("请选择发票信息");
          return;
        }else{
          bill.content_id = this.DefaultInvoiceObject.id;
        }
      }
      if (!this.defaultAddress.id) {
        this.$message.error("请选择配送地址");
        return;
      }
      // if (!this.isAccept) {
      //   this.$message.error("您还未同意接受用户协议");
      //   return;
      // }
     
      bill.billtype = this.selectedGoodsBillSetOff;
      this.OrderInformation.add_id = this.defaultAddress.id;
      this.OrderInformation.dilivertype = this.dilivertype;
      this.OrderInformation.type = "1";
      if (this.OrderInformation.fromCar == 1) {
        //标志来源于于购物车
        this.OrderInformation.fromCar = this.OrderInformation.fromCar;
      }
      this.OrderInformation.bill = JSON.stringify(bill);
      // 进行下单,三种情况
      let orderlist = JSON.parse(this.OrderInformation.order)
      this.DetaileData.forEach(item0=>{
        item0.list.forEach(item1=>{
            for(var i = 0; i<orderlist.length;i++){
              if(orderlist[i].seckill_goods_id==item1.seckill_goods_id && item1.order_mark){
                orderlist[i].order_mark=item1.order_mark
                return;
              }
            }
        })
      })
       this.OrderInformation.order=JSON.stringify(orderlist)
      if (this.paytype == 0) {
        //在线支付
        this.OrderInformation.payWay = false;
        
        axios.request(common.getToken).then(res0 => {
          this.GetOrderCreater({
            data: this.OrderInformation,
            token: res0.data
          }).then(res => {
            if(res){
              this.showGoIndex1=true;
              var _this = this;
              this.orderNumber = res.data;
            this.chipCenterOrderCount = setInterval(function() {
              if (_this.count == 0) {
                _this.chipCenterOrder();
              } else {
                _this.count--;
              }
            }, 1000);
              setTimeout(() => {
                _this.GetUserInforma();
              }, 1000);
            }
          });
        });
      } else if (this.paytype == 1) {
        //对公转账
        this.OrderInformation.payWay = false;
        axios.request(common.getToken).then(res0 => {
          this.GetOrderCreater({
            data: this.OrderInformation,
            token: res0.data
          }).then(res => {
          
            if(res){
              this.showGoIndex1=true;
              var _this = this;
              this.chipCenterOrderCount = setInterval(function() {
          if (_this.count == 0) {
            _this.chipCenterOrder();
          } else {
            _this.count--;
          }
        }, 1000);
              setTimeout(() => {
                    _this.GetUserInforma();
                  }, 1000);
                  this.orderNumber = res.data;
            }  
          });
        });
      } else if (this.paytype == 2) {
        //白条支付
        this.OrderInformation.payWay = true;
        axios.request(common.getToken).then(res0 => {
          this.GetOrderCreater({
            data: this.OrderInformation,
            token: res0.data
          }).then(res => {
            if(res){
              var _this = this;
            setTimeout(() => {
              _this.GetUserInforma();
            }, 1000);
            this.showGoIndex = true;
            this.chipCenterOrderCount = setInterval(function() {
              if (_this.count == 0) {
                _this.chipCenterOrder();
              } else {
                _this.count--;
              }
            }, 1000);
            }
            
          });
        });
      }
    },

    // 请求所有的发票信息
    getAllInvoice() {
      axios
        .request({
          ...shoppingCar.queryUserBill,
          params: { start: 0, length: 20 }
        })
        .then(res => {
          console.log(res);
          if (res.data.total == 1) {
            this.DefaultInvoiceObject = res.data.data[0];
          } else if (res.data.total > 1) {
            let count = 0;
            res.data.data.forEach(item => {
              if (item.isdefault) {
                this.DefaultInvoiceObject = item;
                count++;
              }
            });
            if (count == 0) {
              this.DefaultInvoiceObject = res.data.data[0];
            }
          }
          this.allInvoice = res.data.data;
        });
      // this.GetAllPersonalInvoice({
      //   start: 0,
      //   length: 10,
      //   access_token: this.access_token
      // });
    },
    // 获取全部的收货地址
    getAllAddress() {
      axios
        .request({
          ...presonalAdress.getAllAdress,
          params: { start: 0, length: 20 }
        })
        .then(res => {
          if (res.data) {
            if (res.data.total == 1) {
              this.defaultAddress = res.data.data[0];
            } else if (res.data.total > 1) {
              let count = 0;
              res.data.data.forEach(item => {
                if (item.isdefault) {
                  this.defaultAddress = item;
                  count++;
                }
              });
              if (count == 0) {
                this.defaultAddress = res.data.data[0];
              }
            }
            this.allAddress = res.data.data;
          }
        });
    },
    // 新增开票信息
    addInvoiceInforma() {
      this.ruleFormAddInvoice = {};
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

          if (this.addressText) {
            axios
              .request({
                ...presonalAdress.AddAddress,
                method: "post",
                data: this.ruleForm
              })
              .then(res => {
                // this.GetAddAddress(this.ruleForm)
                //   .then(res => {

                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.dialogAddress = false;
                this.getAllAddress();
              })
              .catch(err => {
                this.$message.error(err);
              });
          } else {
            this.GetUpdateAddress(this.ruleForm)
              .then(res => {
                console.log("gengxin");
                this.$message({
                  type: "success",
                  message: res.message
                });
                this.dialogAddress = false;
                this.getAllAddress();
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
      if (!this.DefaultInvoiceObject) {
        this.$message.error("请先选择开票信息");
      } else {
        this.dialogInvoice = false;
      }
    },
    closeDialogCallBack() {
      this.showDialog = false;
    },
    handleAvatarSuccess(res, file) {
      if (res.resultCode == "200") {
        this.$message({
          type: "success",
          message: "上传成功，等待审核"
        });
        this.showDialog = false;
        this.$router.push("/PersonalCenter/BuyerOrderManagement");
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

    bankSuccess() {
      this.showGoIndex1 = false;
      this.showGoIndex = false;
    },
    getOrderType() {
      let countime = 1000;
      var _this = this;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let count = 30;
      this.timer = setInterval(function() {
        count--;
        if (count < 0) {
          clearInterval(_this.timer);
        }
        _this.$store
          .dispatch("SignContract/getQueryOrderInfo", {
            orderNo: _this.orderNumber,
            access_token: _this.access_token
          })
          .then(res => {
            _this.getOrderInfo = res;
            if (_this.getOrderInfo.money) {
              _this.totalPrice = _this.getOrderInfo.money;
              loading.close();
              clearInterval(_this.timer);
              _this.showDialog = true;
              _this.bankTransferObj = {
                url: _this.requestUrl,
                money: _this.getOrderInfo.money,
                title: "订单",
                danweiName: _this.DefaultInvoiceObject.corporatename
              };
            }
          });
      }, countime);
    },
    getGoodsBillSetOffList() {
      axios
        .request({
          ...shoppingCar.queryGoodsBillSetOffList,
          params: { isenable: true, start: 0, length: 100 }
        })
        .then(res => {
          if (res) {
            this.GoodsBillSetOffList = res.data.data;
            res.data.data.forEach((item, index) => {
              if (index == 0) {
                this.selectedGoodsBillSetOff = item.id;
                this.selectedGoodsBillSetOffObj = item;
                return;
              }
            });
          }
        });
    }
  },
  filters: {
    // ToFixed(x,length) {
    //   if(length){
    //       return Number(x).toFixed(length);
    //   }else{
    //       return  Number(x).toFixed(2);
    //   }
    // }
  },
  
  created() {
    if (!this.buyOneGoodsDetail.data) {
      this.$router.push({
        path: "/"
      });
    }
  },
  mounted() {
    this.getGoodsBillSetOffList();
    this.getAllInvoice();
    //获取全部的收货地址
    this.getAllAddress();
    this.$store.state.shoppingCart.active = 1;
    // 获取全部的发票
    // 将运费方式改为到付
    this.dilivertype = "0";
    let DetailData = JSON.parse(this.buyOneGoodsDetail.data).deatil;
    this.OrderInformation = JSON.parse(this.buyOneGoodsDetail.obj2);
    this.priceTotalDetail = JSON.parse(this.buyOneGoodsDetail.data);
    this.isVIP = JSON.parse(this.buyOneGoodsDetail.data).isVIP;
    let UScount = 0;
    let unuscount = 0;
    for (var key in DetailData) {
      DetailData[key].forEach(item => {
        if (item.price_unit) {  
          UScount++;
        } else {
          unuscount++;
        }
        this.goodsCount = this.goodsCount + Number(item.goods_count);
      });
      this.DetaileData.push({
        name: key,
        list: DetailData[key]
      });
    }
    this.UScount = UScount;
    this.unuscount = unuscount;
  }
};
</script>
<style lang="less" scoped>
@import "./ShoppingSettlement.less";

.counttime {
  color: red;
  font-weight: bolder;
}
.invoiceFlag {
  .el-checkbox__label {
    font-size: 16px;
  }
}
.el-radio__inner {
  display: none;
}
.address-distpicker {
  .distpicker-address-wrapper {
    select {
      font-size: 14px;
    }
  }
}
.Add-Invoice-shpoing {
  .el-form-item__label {
    font-size: 14px;
  }
  .el-input__inner {
    height: 40px;
    border-width: 1px;
  }
}
</style>
<style scoped>
.editAddress > label {
  width: 100%;
}
.editAddress >>> .el-radio__label {
  width: 100%;
}
.wrap >>> .el-icon-close {
  display: none;
}
.wrap >>> .el-dialog__body {
  padding-top: 0;
}
.wrap >>> .el-dialog__body p {
  width: 80%;
  margin: 0 auto;
  font-size: 16px;
  line-height: 40px;
  padding-bottom: 50px;
}
.wrap >>> .el-dialog__body p a {
  display: inline-block;
  color: #0068df;
  cursor: pointer;
  margin: 0 10px;
}
.wrap >>> .el-dialog__body p a:hover {
  text-decoration: underline;
  font-weight: bolder;
  color: peru;
}
</style>
