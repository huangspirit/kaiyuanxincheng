<template>
  <div class="ShoppingSettlement">
    <div class="Order-information">
      <div class="Order-title">
        <img src="@/assets/image/inquirybasket/u26965.png" alt />
        <span>核对订单信息</span>
      </div>
      <!-- 配送地址 -->
      <div class="delivery-address">
        <p class="address-title">
          <span>配送地址</span>
          <span @click="addNewAdrress">{{addressText ? '新增配送地址' : '编辑配送地址'}}</span>
          <router-link to="/PersonalCenter/ShippingAddress" tag="span">管理配送地址</router-link>
        </p>
         <div class="desc" v-if="!addressList || addressList.length==0">您还没有填写收货地址，请先新增配送地址</div>
        <ul class="addressList">
          <li :class="{active:addressValue === item.id}" v-for="item in addressList" :key="item.id">
<!--<label class="label">
               <input type="radio" :value="item.id" v-model="addressValue" />
              <span class="imgwrap">
                <img
                  src="@/assets/image/inquirybasket/_u11390.png"
                  alt
                  v-if="addressValue === item.id"
                />
              </span> -->
              <el-radio-group v-model="addressValue" class="defaultradioSquare label editAddress">
                    <el-radio :label="item.id" :value="item.id" name="defaultInvoice">
                      <span class="edit" @click="editAddress(item)">编辑该地址</span>
                      <span class="defaultAddress" v-if="item.isdefault">默</span>
                      <span>{{item.receivingName}}&nbsp;&nbsp; {{item.phone}}</span>&nbsp;&nbsp;
                      <span>{{item.address}} {{item.detailedAddress}}</span>&nbsp;&nbsp;

                      </el-radio>
              </el-radio-group>

            <!-- </label> -->
          </li>
        </ul>
      </div>
      <!-- 订单商品 -->
      <div class="order-product">
        <p class="product-total">
          <span>订单商品</span>
          <span class="num">x 6</span>
        </p>
        <ul>
          <ShoppingSettlementOItem v-for="(item,k) in DetaileData" :key="k" :item="item"></ShoppingSettlementOItem>
        </ul>
        <!-- 开具发票 -->
        <div class="Invoice">
          <span>发票信息</span>
          <el-checkbox v-model="InvoiceFlag" class="invoiceFlag">开具发票</el-checkbox>
          <span class="select-invoice" @click="selectInvoice">选择/管理开票信息</span>
        </div>
        <div class="Invoice-content" v-if="InvoiceFlag">
          <p>
            <span>发票类型：增值税发票</span>
            <span>发票抬头：{{DefaultInvoiceObject.corporatename}}</span>
            <span>纳税人识别号：{{DefaultInvoiceObject.billno}}</span>
            <span>发票内容：商品明细</span>
          </p>
        </div>
        <!-- 结算金额明细 -->
        <div class="place-order">
          <div class="detail">
            <p v-if="priceTotalDetail.Postage">
              <label for="">运费合计：</label>
              <span class="num">￥{{priceTotalDetail.Postage}}</span>
            </p>
            <p v-if="priceTotalDetail.usdTotalPrice">
              <label for="">美元金额：</label>
              <span class="num">${{priceTotalDetail.usdTotalPrice}}</span>
            </p>
            <p v-if="priceTotalDetail.exchange">
              <label for="">美元汇率：</label>
              <span class="num">1：{{priceTotalDetail.exchange}}</span>
            </p>

            <p v-if="priceTotalDetail.needPayBillTotal">
             <label for="">增值税：</label>
              <span class="num">￥{{priceTotalDetail.needPayBillTotal | ToFixed}}</span>
            </p>
            <p>
              <label for="">报关服务费：</label>
              <span class="num">￥{{priceTotalDetail.Guanshui}}</span>
            </p>
            <p v-if="priceTotalDetail.
            rmbtotalPrice">
              <label for="">商品总额：</label>
              <span class="num">￥{{priceTotalDetail.rmbtotalPrice}}</span>
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
              <span>支付方式：</span>
              <ul>
                <li v-for="payWayVal in payWayList" :key="payWayVal.id">
                  <label class="label">
                    <input type="radio" :value="payWayVal.id" v-model="payWay">
                    <span>
                      <img
                        src="@/assets/image/inquirybasket/_u11390.png"
                        alt
                        v-if="payWay === payWayVal.id"
                      >
                    </span>
                  </label>
                  <img class="icon-s" :src="payWayVal.url" alt>
                  <span>{{payWayVal.name}}</span>
                  <span v-if="payWayVal.id === '4' && isVIP" class="num">余额：￥100000</span>
                </li>
                <li class="Apply-yj" v-if="payWay === '4' && !isVIP">
                  <p>
                    你还不是月结用户
                    <router-link to="/PersonalCenter/UpgradeLevel" tag="span">申请月结用户</router-link>
                  </p>
                </li>
              </ul>
            </div>-->
            <div class="payWayList">
              <label for="">邮费方式：</label>
              <el-radio v-model="dilivertype" label="0" border>到付</el-radio>
              <el-radio v-model="dilivertype" label="1" border>垫付</el-radio>

            </div>
          </div>
          <div class="information">
            <p>
              <label for="">配送地址：</label>
              <span>{{curentAdressItem.address}}{{curentAdressItem.detailedAddress}}</span>
            </p>
            <p>
              <label for="">收件人：</label>
              <span>{{curentAdressItem.receivingName}}</span>
            </p>
            <p>
              <label for="">电话：</label>
              <span>{{curentAdressItem.phone}}</span>
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
    <el-dialog :visible.sync="dialogInvoice" width="1000px" center class="dialog-ruleForm-Invoice">
      <p slot="title" class="title">发票历史信息</p>
      <!-- 添加发票的模态框 -->
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
              <el-input v-model="ruleFormAddInvoice.billno"></el-input>
            </el-form-item>
            <el-form-item label="开户银行：" prop="openingbank">
              <el-input v-model="ruleFormAddInvoice.openingbank"></el-input>
            </el-form-item>
            <el-form-item label="银行账号：" prop="bankaccount">
              <el-input v-model="ruleFormAddInvoice.bankaccount"></el-input>
            </el-form-item>
            <el-form-item label="开票电话：" prop="registeredphone">
              <el-input v-model="ruleFormAddInvoice.registeredphone"></el-input>
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
  </div>
</template>
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
<script>
import VDistpicker from 'v-distpicker'
import { mapState, mapActions, mapMutations } from "vuex"
import ShoppingSettlementOItem from "_c/ShoppingSettlementOItem"
import { setTimeout, setInterval, clearInterval } from "timers"
import { constants } from "crypto";
export default {
  name: "ShoppingSettlement",
  data() {
    return {
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
        access_token: ""
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
      // 默认发票的对象
      DefaultInvoiceObject: {},
      // 返回来的详细数据
      DetaileData: [],
      // 价格总和明细
      priceTotalDetail: {},
      // 下单的所有信息
      OrderInformation: {},
      // 是不是VIP
      isVIP: false,
      // 支付方式的列表
      payWayList: [
        {
          name: "支付宝",
          id: "1",
          url: require("@/assets/image/ShoppingSettlement/zhifubao.png")
        },
        {
          name: "微信",
          id: "2",
          url: require("@/assets/image/ShoppingSettlement/weixin.png")
        },
        {
          name: "汇款",
          id: "3",
          url: require("@/assets/image/ShoppingSettlement/bank.png")
        },
        {
          name: "月结",
          id: "4",
          url: require("@/assets/image/ShoppingSettlement/yuer.png")
        }
      ]
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
      if(!this.DefaultInvoice){
        this.$message.error("请选择发票信息")
        return;
      }
      if(!this.addressValue){
        this.$message.error("请选择配送地址")
        return;
      }
      let bill = JSON.parse(this.OrderInformation.bill);
      bill.content_id = this.DefaultInvoice;
      this.OrderInformation.add_id = this.addressValue;
      this.OrderInformation.dilivertype = this.dilivertype;
      this.OrderInformation.type = "1";
      this.OrderInformation.bill = JSON.stringify(bill);
      // 进行下单,三种情况
      if(this.priceTotalDetail.isVIP && this.priceTotalDetail.isEnough){
        //月结用户直接生成订单，去往个人中心
        this.GetOrderCreater(this.OrderInformation).then(res=>{
          console.log(res)
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
            console.log(res)
              console.log("月结用户直接生成普通订单，去直接支付")
              this.$router.push({
                path: "/ShoppingCart/PaymentOrders",
                query: {
                  orderNumber:res.data,
                  // payType: 2,
                  // totalPrice: this.totalPrice
                }
              });
            })
        }).catch(() => {
          console.log('已取消删除')
        });
      }else{
        //普通用户，直接去付款
          this.GetOrderCreater(this.OrderInformation).then(res=>{
            console.log(res)
            console.log("普通用户直接生成普通订单，去直接支付")
             this.$router.push({
                path: "/ShoppingCart/PaymentOrders",
                query: {
                  orderNumber:res.data,
                  // payType: 2,
                  // totalPrice: this.totalPrice
                }
              });
          })
      }

      return;
      this.GetOrderCreater(this.OrderInformation)
        .then(res => {
          let loading2 = this.$loading({
            lock: true,
            text: "下单成功，后台正在确认订单,请稍等。。。",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          let orderTimer = setInterval(() => {
            this.$store
              .dispatch("SignContract/GetQueryOrderTag", {
                orderNo: res.data,
                access_token: this.access_token
              })
              .then(resp => {
                if (resp.url) {
                  //生成订单成功，删除缓存和store内关于一件商品的购买信息
                  clearInterval(orderTimer);
                  localStorage.removeItem("buyOneGoodsDetail");
                  this.setBuyOneGoodsDetail("{}")
                  this.$router.push({
                    path: "/ShoppingCart/SignContract",
                    query: {
                      url: resp.url,
                      flag: resp.flag,
                      orderNumber: res.data,
                      totalPrice: this.priceTotalDetail.totalPrice
                    }
                  });
                  loading2.close();
                }
              })
              .catch(err => {
                this.$message.error(err);
              });
          },3000);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },

    // 请求所有的发票信息
    AllInvoice() {
      this.GetAllPersonalInvoice({
        start: 0,
        length: 10,
        access_token: this.access_token
      });
    },
    // 新增开票信息
    addInvoiceInforma() {
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
                this.AllInvoice();
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

    submitForm(formName) {

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.address = `${this.province}/${this.city}/${this.area}`;
          this.ruleForm.access_token = this.access_token;
          if (this.addressText) {
             console.log(this.ruleForm)
            this.GetAddAddress(this.ruleForm)
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
    // 获取全部的收货地址
    allAddress() {

     this.GetAllReceivingAddress({
        start: 0,
        length: 10
      })

    },
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
      return localStorage.getItem("access_token");
    }
  },
  created(){
    if(!this.buyOneGoodsDetail.data){
       this.$router.push({
                    path: "/",
                  });
    }


  },
  mounted() {
    this.AllInvoice();
    //获取全部的收货地址
    this.allAddress();

    this.$store.state.shoppingCart.active = 2;
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
      this.DetaileData.push({
        name: key,
        list: DetailData[key]
      });
    }
  }
};
</script>
