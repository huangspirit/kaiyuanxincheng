<template>
  <!-- 个人设置 -->
  <div class="PersonalSet">
    <!-- 用户名和头像 -->
    <div class="user">
      <div class="username">
        <img :src="UserInforma.headImgUrl" class="head-portrait" alt />
        <div class="info">
          <p class="name">{{UserInforma.nickname}}</p>
            <p>
                <span  class="type" v-if="UserInforma.userTagMap.seller">{{UserInforma.userTagMap.tag | typeFilter}}</span>
                <router-link to="/OriginalFactoryEntry" tag="span"  class="type" v-if="!UserInforma.userTagMap.seller">申请入驻</router-link>
                <span  class="type"  v-if="UserInforma.userTagMap.vip">月结用户</span>
            </p>
        </div>
      </div>
    </div>
    <!-- 个人信息设置 -->
    <ul class="informa-set">
      <li>
        <div class="clear">
          <span class=" fl">
            <img src="@/assets/image/PersonalCenter/u65597.png" alt />
          </span>
          <span class=" fl">信用等级：</span>
          <span class="red fl">{{UserInforma.userTagMap.userLevel}}</span>
            <div class="mark fl">
                <span class="bgColor">?</span>
                <div class="cont">
                    <p>
                        <span>信用等级</span><span>预付款比列</span>
                    </p>
                    <p v-for="item in levelList" :class="item.level==UserInforma.userTagMap.userLevel ? 'color':''">
                        <span>{{item.level}}</span><span>{{item.val}}</span>
                    </p>
                    <div class="color">提示：系统会根据您购买商品的能力进行等级的调整</div>
                </div>
            </div>
<!--            <span>(预付款比例：{{UserInforma.userTagMap.credit_discount}})</span>-->
        </div>
        <!--        <router-link to="/PersonalCenter/UpgradeLevel" tag="span">提升等级</router-link>-->
      </li>
      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u133711.png" alt />
          </span>
          <span>手&nbsp;机&nbsp;号：</span>
          <span style="margin-right:20px">{{UserInforma.phone}}</span>
          <!-- <span>
            <img src="@/assets/image/PersonalCenter/u133715.png" alt>已绑定1
          </span>-->
        </div>
        <span
          :class="{noBan:UserInforma.phone}"
          @click="dialogVisibleCode = true"
          class="operation btn"
        >更换手机号</span>
        <!--        <router-link to="/PersonalCenter/PersonalData" tag="span">修改</router-link>-->
      </li>
      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u133720.png" alt />
          </span>
          <span>绑定微信：</span>
          <span>{{UserInforma.bindWeChat ? '已绑定' : '未绑定'}}</span>
        </div>
        <!-- <span
                  class="noBan"
                  @click="dialogVisibleWeChat = true"
                  v-if="UserInforma.bindWeChat"
        >解绑</span>-->
        <span class="ban" v-if="!UserInforma.bindWeChat" @click="dialogVisibleWeChatBindHandle">绑定</span>
      </li>
      <li
        v-if="UserInforma.userTagMap && UserInforma.userTagMap.seller && UserInforma.userTagMap.tag!=1"
      >
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u26343.png" alt />
          </span>
          <span>售卖额度：</span>
          <span class="color">￥{{UserInforma.userTagMap['credit-seller']}}</span>
          <span>剩余售卖额度：</span>
          <span class="color">￥{{UserInforma.userTagMap['restcredit-seller']}}</span>
        </div>
          <router-link to="/PersonalCenter/sellerDetailList" tag="span">详细</router-link>
      </li>
      <li v-if="UserInforma.userTagMap.vip">
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u65597.png" alt />
          </span>
          <span>购买额度：</span>
          <span class="color">￥{{UserInforma.userTagMap['credit-vip']}}</span>
          <span>剩余购买额度：</span>
          <span class="color">￥{{UserInforma.userTagMap['restcredit-vip']}}</span>
        </div>
        <router-link to="/PersonalCenter/vipDetailList" tag="span">月结明细</router-link>
      </li>
      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u26343.png" alt />
          </span>
          <span>钱包余额：</span>
          <span class="color">￥{{UserInforma.userTagMap.wallet}}</span>
        </div>
          <div>
              <a href="javascript:;" @click="withDraw" v-if="UserInforma.userTagMap.wallet>10">提现</a>&nbsp;&nbsp;
              <router-link to="/PersonalCenter/withdraw" >提现管理</router-link>&nbsp;&nbsp;
              <router-link to="/PersonalCenter/buyerDetailList" >明细</router-link>
          </div>
      </li>
      <li v-if="UserInforma.userTagMap && UserInforma.userTagMap.seller">
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u26343.png" alt />
          </span>
          <span>押&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：</span>
          <span class="color">￥{{UserInforma.userTagMap.deposit}}</span>
        </div>
          <div>
              <router-link to="/PersonalCenter/deposit" >充值</router-link>&nbsp;&nbsp;
              <router-link to="/PersonalCenter/depositDetailList" >详细</router-link>
          </div>
      </li>
      <li v-if="UserInforma.userTagMap && UserInforma.userTagMap.seller">
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u26343.png" alt />
          </span>
          <span>基础额度：</span>
          <span
            class="color"
          >￥{{UserInforma.userTagMap.baseCredit?UserInforma.userTagMap.baseCredit:0}}</span>
        </div>
        <router-link
          to="/PersonalCenter/UpgradeLevel"
          tag="span"
          v-if="!UserInforma.userTagMap.seller"
        >原厂入驻</router-link>
      </li>
      <li v-if="UserInforma.userTagMap && UserInforma.userTagMap.seller">
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u26343.png" alt />
          </span>
          <span>信用额度：</span>
          <span class="color">￥{{amount}}</span>&nbsp;
          <span>=</span>&nbsp;&nbsp;
          <span class="color">￥{{UserInforma.userTagMap.deposit}}&nbsp;</span>
          <span>x&nbsp;10&nbsp;+</span>&nbsp;
          <span
            class="color"
          >￥{{UserInforma.userTagMap.baseCredit?UserInforma.userTagMap.baseCredit:0}}</span>
        </div>
        <!--            <router-link to="/PersonalCenter/CredibiliForehead" tag="span">详情</router-link>-->
      </li>

      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u37900.png" alt />
          </span>
          <span>收货地址：</span>
          <span v-if="defaultAddress&&defaultAddress.receivingName" class="detailAddress">
            <span>{{defaultAddress.receivingName}}</span>
            <span>{{defaultAddress.phone}}</span>
            <span>{{defaultAddress.address}}</span>
            <span>{{defaultAddress.detailedAddress}}</span>
          </span>
          <span v-else>暂无收货地址</span>
        </div>
        <router-link tag="span" to="/PersonalCenter/ShippingAddress">管理收货地址</router-link>
      </li>
    </ul>
    <!-- 修改手机号的模态框 -->
    <SetTankuang
      :title="newFlagTitle"
      v-if="dialogVisibleCode"
      @closeDialogCallBack="closeDialogCallBack"
    >
      <div class="dialog-body" slot="dialog-body">
        <el-form ref="form" label-width="150px">
          <div class="form-item">
            <el-form-item :label="labelmark">
              <div v-if="newFlag">
                <el-input v-model="newPhoneValue" placeholder="新手机号码"></el-input>
              </div>
              <div v-else>{{UserInforma.phone}}</div>
            </el-form-item>
          </div>
          <p v-if="phoneBindFlag" class="phoneBindFlag">*该手机号已被绑定</p>
          <el-form-item label="验证码:">
            <el-input v-model="phoneCodeValue" class="indetifyCode">
              <el-button slot="append" @click="changePhone" v-if="flag">发送验证码</el-button>
              <template slot="append" v-else>
                <i class="counttime">{{countTime}}s</i>后重新发送
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button class="cancle" @click="centerDialogVisible = false">取消</el-button> -->
        <el-button class="default" style="width:100%;" @click="submitCodePhone">{{newFlagbtn}}</el-button>
      </div>
    </SetTankuang>
    <!--      <el-dialog-->
    <!--          :visible.sync="dialogVisibleWeChat"-->
    <!--          width="600px"-->
    <!--          class="dialog-code-wechat"-->
    <!--          :close-on-click-modal="false"-->
    <!--      >-->
    <!--          <p slot="title" class="title">提示</p>-->
    <!--          <div class="body-wechat">-->
    <!--              <p>确认解绑微信号？</p>-->
    <!--              <p class="small">解绑之后微信将不再接收系统提示信息</p>-->
    <!--          </div>-->
    <!--          <div slot="footer" class="footer-wechat">-->
    <!--              <span @click="sureUnboundWeChat">确认解绑</span>-->
    <!--              <span @click="dialogVisibleWeChat = false" class="close">取消</span>-->
    <!--          </div>-->
    <!--      </el-dialog>-->
    <!-- 绑定微信的二维码模态框 -->
    <el-dialog
      :visible.sync="dialogVisibleWeChatBind"
      width="600px"
      class="dialog-code-wecha-bind"
      :close-on-click-modal="false"
    >
      <p slot="title" class="title">绑定微信</p>
      <div class="dialog-code-wecha-bind-body" style="text-align: center">
        <img :src="dialogVisibleWeChatBindCodeUrl" alt />
      </div>
    </el-dialog>
      <el-dialog
          :visible.sync="showinputPassword"
          width="500px"
      >
          <p slot="title" class="title">输入密码</p>
          <div >
              <el-input placeholder="请输入密码" v-model="inputpassword" show-password></el-input>
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
          <p slot="title" class="title"><strong>钱包余额：￥{{UserInforma.userTagMap.wallet}}</strong></p>
          <div class="withdrawApplyTotalCont">
              <el-input placeholder="请输入提现金额" v-model="withdrawApplyTotal"  @input="changewithdrawApplyTotal" ></el-input>
              <div v-if="withdrawApplyTotal" class="clear">
                  <div class="withdrawCharge">
                      手续费：<span class="color">￥{{withdrawApplyTotalObj.withdrawCharge}}</span>
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
                  </div>
                  <p>实际提现金额：<span class="color">￥{{withdrawApplyTotalObj.withdrawRealityTotal}}</span></p>
                  <p>申请提现金额：<span class="color">￥{{withdrawApplyTotalObj.withdrawApplyTotal}}</span></p>
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
  </div>
</template>
<style lang="less" scoped>
@import "./PersonalSet.less";
</style>
<script>
import { mapActions } from "vuex";
// import "@/assets/css/ele-form.less";
// import "@/assets/css/label-checkbox.less";
import { setInterval, clearInterval } from "timers";
import { baseURL } from "@/config";
import {axios,personCenter} from "../../../api/apiObj";
//import { parse } from "querystring";
export default {
  name: "PersonalSet",
  data() {
    return {
        levelList:[
            {level:'AAA',val:'10%'},
            {level:'AA',val:'20%'},
            {level:'A',val:'30%'},
            {level:'BBB',val:'40%'},
            {level:'BB',val:'50%'},
            {level:'B',val:'60%'},
            {level:'CCC',val:'70%'},
            {level:'CC',val:'80%'},
            {level:'C',val:'90%'},
            {level:'D',val:'100%'},
        ],
        showinputPassword:false,
        inputpassword:"",
        showinputwithdrawTotal:false,
        withdrawApplyTotal:"",
        withdrawApplyTotalObj:{},
        bankList:[],
        selectedBank:0,
        UserInforma: {
        userTagMap: {}
      },
      //信用额度
      amount: 0,
      //默认的用户收货地址
      defaultAddress: {},
      // 用户的信息
      // 绑定微信二维码的url
      dialogVisibleWeChatBindCodeUrl: "",
      // 绑定微信二维码模态框
      dialogVisibleWeChatBind: false,
      // 微信的模态框
      dialogVisibleWeChat: false,
      // 已被绑定的文字
      phoneBindFlag: false,
      phoneBindFlagText: false,
      // 绑定新的手机号
      newPhoneValue: "",
      newFlag: false,
      newFlagTitle: "验证当前手机号",
      newFlagbtn: "确认",
      labelmark: "已绑定手机号：",
      // 用户的信息列表
      dialogImageUrl: "",
      // 修改手机号的模态框
      dialogVisibleCode: false,
      flag: true,
      countTime: 60,
      // 手机的验证码
      phoneCodeValue: "",
      // 验证码的key
      codeKey: "",
      ruleForm: {
        headImgUrl: "",
        nickname: ""
      },
      rules: {
        headImgUrl: [
          { required: true, message: "请上传图片", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ]
      },
      timer: null
    };
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    url() {
      return (
        baseURL +
        `api-f/files/uploadWithCloud?access_token=${this.access_token}&fileSource=QINIUYUN&type=7&id=1`
      );
    }
  },
  watch: {
    newPhoneValue() {
      if (this.newPhoneValue.length === 11) {
        this.GetQueryphone({
          phone: this.newPhoneValue,
          access_token: this.access_token
        })
          .then(res => {
            this.phoneBindFlagText = false;
            this.phoneBindFlag = false;
          })
          .catch(err => {
            this.phoneBindFlagText = true;
            this.phoneBindFlag = true;
            this.$message.error(err);
          });
      } else {
        this.phoneBindFlagText = true;
      }
    },
    newFlag(newval) {
      this.newFlagTitle = newval ? "绑定新手机号" : "验证当前手机号";
      this.newFlagbtn = newval ? "绑定" : "确认";
      this.labelmark = newval ? "绑定新手机号：" : "已绑定手机号：";
    }
  },
  filters: {
    typeFilter(val) {
      switch (val) {
        case 1:
          return "原厂";
        case 2:
          return "代理商";
        case 3:
          return "认证商家";
      }
    },
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
  mounted() {
    // this.$store.dispatch("Login/GetUserInforma");
    var queryAlign = this.$route.query;
    if (queryAlign.code) {
      if (queryAlign.code == "success") {
        this.$message.success("充值成功");
      } else {
        this.$message({
          type: "warning",
          message: "充值失败"
        });
      }
      let path = this.$route.path;
      this.$router.push({
        path: path
      });
    }
    this.GetAllAddress();
    this.all();
  },
  methods: {
    ...mapActions("ShippingAddress", ["GetAllReceivingAddress"]),
    ...mapActions("Login", ["GetUserInforma"]),
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
                                    console.log(res)
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
              console.log(res)
              if(res){
                  this.showinputPassword=false;
                  this.showinputwithdrawTotal=true;
                  axios.request({...personCenter.getBankList,params:{
                          start:0,
                          length:100,
                      }}).then(res=>{
                          console.log(res)
                      this.bankList=res.data.data;
                  })
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
                }
            })
      },
    GetAllAddress() {
      this.GetAllReceivingAddress({
        start: 0,
        length: 10
      }).then(res => {
        if (res != null) {
          if (res.total > 0) {
            let obj = res.data.find(item => item.isdefault);
            if (obj) {
              this.defaultAddress = obj;
            } else {
              this.defaultAddress = res.data[0];
            }
          }
        }
      });
    },
    ...mapActions("PersonalData", [
     // "GetPersonalData",
      "GetRefreshToken",
      "GetNotification",
      "GetInternalPhone",
      "GetQueryphone",
      "GetReplacePhone",
      "GetUnboundWeChat",
      "GetGongZongCodes",
      "GetCheckBind"
    ]),
    closeDialogCallBack() {
      this.dialogVisibleCode = false;
      this.newFlag = false;
      this.newPhoneValue = "";
      this.phoneCodeValue = "";
    },
    // 绑定微信
    dialogVisibleWeChatBindHandle() {
      this.dialogVisibleWeChatBind = true;
      this.GetGongZongCodes({
        access_token: this.access_token
      })
        .then(res => {
          this.dialogVisibleWeChatBindCodeUrl = res;
          let timeBindWechat = setInterval(() => {
            this.GetCheckBind({
              access_token: this.access_token
            }).then(res => {
              if (res) {
                clearInterval(timeBindWechat);
                this.dialogVisibleWeChatBind = false;
                this.all();
              }
            });
          }, 2000);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 成功上传之后
    successUpload(x) {
      this.ruleForm.headImgUrl = "http://head.113ic.com/" + x;
    },
    // 保存提交
    submitForm(formName) {
      this.$message({
        type: "success",
        message: "保存成功！"
      });
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //
      //     this.ruleForm.access_token = this.access_token;
      //     if (this.ruleForm.headImgUrl) {
      //       obj.headImgUrl =
      //         "http://head.113ic.com/" + this.ruleForm.headImgUrl;
      //     }
      //     this.GetPersonalData(this.ruleForm).then(res => {
      //
      //       this.RefreshToken();
      //     });
      //   } else {
      //
      //     return false;
      //   }
      // });
    },
    // 刷新token
    RefreshToken() {
      this.GetRefreshToken({
        refresh_token: sessionStorage.getItem("refresh_token")
      }).then(res => {
        sessionStorage.setItem("refresh_token", res.refresh_token);
        sessionStorage.setItem("access_token", res.access_token);
        this.$forceUpdate();
        // this.$message({
        //   message: "保存成功!",
        //   type: "success"
        // });
      });
    },
    all() {
      this.GetUserInforma({
        access_token: this.access_token
      }).then(res => {
        this.UserInforma = res;
        let baseCredit = res.userTagMap.baseCredit
          ? res.userTagMap.baseCredit
          : 0;
        this.amount = (
          Number(baseCredit) + parseFloat(res.userTagMap.deposit * 10)
        ).toFixed(4);
      });
    },
    // 发送验证码
    changePhone() {
      if (!this.phoneBindFlagText) {
        this.flag = false;
        this.GetNotification({
          phone: this.newFlag ? this.newPhoneValue : this.UserInforma.phone,
          type: 0,
          access_token: this.access_token
        })
          .then(res => {
            this.codeKey = res.key;
            this.$message({
              type: "success",
              message: "验证码已发送成功，请注意查收！"
            });
          })
          .catch(err => {
            this.$message.error(err);
          });
        this.timer = setInterval(() => {
          this.countTime = this.countTime - 1;
          if (this.countTime === 0) {
            this.flag = true;
            this.countTime = 60;
            clearInterval(this.timer);
          }
        }, 1000);
      }
    },
    // 验证二维码
    submitCodePhone() {
      if (!this.newFlag) {
        if (this.phoneCodeValue) {
          this.GetInternalPhone({
            key: this.codeKey,
            code: this.phoneCodeValue,
            access_token: this.access_token
          }).then(res => {
            if (res) {
              this.newFlag = true;
              this.flag = true;
              this.phoneCodeValue = "";
              this.countTime = 60;
              clearInterval(this.timer);
              this.phoneBindFlagText = true;
            } else {
              this.$message.error("验证码输入不正确！");
            }
          });
        } else {
          this.$message.error("验证码不能为空！");
        }
      } else {
        if (!this.phoneBindFlagText) {
          this.GetReplacePhone({
            key: this.codeKey,
            code: this.phoneCodeValue,
            access_token: this.access_token,
            phone: this.newPhoneValue
          })
            .then(res => {
              this.$message({
                type: "success",
                message: "绑定成功，请重新登录！"
              });
              this.RefreshToken();
              this.dialogVisibleCode = false;
              this.newPhoneValue = "";
              this.phoneCodeValue = "";
              this.phoneBindFlagText = false;
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      }
    },

    // 解绑微信
    sureUnboundWeChat() {
      this.GetUnboundWeChat({
        access_token: this.access_token
      })
        .then(res => {
          this.$message({
            type: "success",
            message: "解绑成功!"
          });
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>

<style>
</style>
