<template>
  <!-- 个人设置 -->
  <div class="PersonalSet">
    <!-- 用户名和头像 -->
    <div class="user">
      <div class="username">
        <img :src="UserInforma.headImgUrl" class="head-portrait" alt />
        <div class="info">
          <p class="name">{{UserInforma.nickname}}</p>
          <p class="type">{{UserInforma.userTagMap.tag | typeFilter}}</p>
        </div>
      </div>
    </div>
    <!-- 个人信息设置 -->
    <ul class="informa-set">
      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u65597.png" alt />
          </span>
          <span>我的等级：</span>
          <span class="red">{{UserInforma.userTagMap.userLevel}}</span>
        </div>
        <router-link to="/PersonalCenter/UpgradeLevel" tag="span">提升等级</router-link>
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
          <span>
            <img src="@/assets/image/PersonalCenter/u133720.png" alt />
            {{UserInforma.bindWeChat ? '已绑定' : '未绑定'}}
          </span>
        </div>
        <router-link to="/PersonalCenter/PersonalData" tag="span">修改</router-link>
      </li>
      <li
        v-if="UserInforma.userTagMap && UserInforma.userTagMap.seller && UserInforma.userTagMap.tag!=1"
      >
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u26343.png" alt />
          </span>
          <span>售卖额度：</span>
          <span class="red">￥{{UserInforma.userTagMap['credit-seller']}}</span>
          <span>剩余售卖额度：</span>
          <span class="red">￥{{UserInforma.userTagMap['restcredit-seller']}}</span>
        </div>
        <!-- <span>详情</span> -->
      </li>
      <li v-if="UserInforma.userTagMap.vip">
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u65597.png" alt />
          </span>
          <span>购买额度：</span>
          <span class="red">￥{{UserInforma.userTagMap['credit-vip']}}</span>
          <span>剩余购买额度：</span>
          <span class="red">￥{{UserInforma.userTagMap['restcredit-vip']}}</span>
        </div>

        <router-link to="/PersonalCenter/CredibiliForehead" tag="span">详情</router-link>
      </li>
      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u133700.png" alt />
          </span>
          <span>押&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：</span>
          <span class="red">￥0</span>
        </div>
         <router-link to="/PersonalCenter/CredibiliForehead" tag="span">充值</router-link>
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
      <div class="PersonalData">
          <div class="GradeCredit">
              <p class="title">
                  等级及信誉额度
                  <span class="btn">查看信誉额说明及详情</span>
              </p>
              <ul>
                  <li>
                      <span>当前用户等级：</span>
                      <span class="num">{{UserInforma.userTagMap.userLevel}}</span>
                      <span class="operation btn">提升用户等级</span>
                  </li>
                  <li>
                      <span>钱包余额 :</span>
                      <span class="num">￥13000</span>
                  </li>
                  <li>
                      <span>保证金：</span>
                      <span class="num">￥0</span>
                      <!-- <span class="operation btn">保证金充值</span> -->
                  </li>
                  <li>
                      <span>基础额度：</span>
                      <span class="num">￥{{UserInforma.userTagMap.totalcredit}}</span>
                      <span class="typr-s" >{{UserInforma.userTagMap.tag | typeFilter}}</span>
                      <span class="operation btn">原厂入驻</span>
                  </li>
                  <li>
                      <span>我的信用额度：</span>
                      <span class="num">￥190000</span>
                      <span>=</span>
                      <span class="num">￥13000</span>
                      <span>x10+</span>
                      <span class="num">￥5000</span>
                      <span>x10+</span>
                      <span class="num">￥10000</span>
                  </li>
              </ul>
          </div>
          <div class="PersonalData-form GradeCredit">
              <p class="title">网站信息</p>
              <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="200px"
                  class="demo-ruleForm"
              >
                  <!-- <el-form-item label="头像：" prop="headImgUrl">
                    <uploadImg
                      @successUpload="successUpload"
                      :imageUrl.sync="ruleForm.headImgUrl"
                      :tip="'图片横宽比例1：1，文件大小在1MB以内，支持png、jpg、gif格式'"
                    ></uploadImg>

                  </el-form-item>
                  <el-form-item label="昵称：" prop="nickname">
                    <el-input v-model="ruleForm.nickname"></el-input>
                  </el-form-item>-->
                  <ul>
                      <li>
                          <img src="@/assets/image/PersonalCenter/u133711.png" alt>
                          <span>手机号：</span>
                          <span>{{UserInforma.phone}}</span>
                          <span :class="{noBan:UserInforma.phone}" @click="dialogVisibleCode = true" class="operation btn">更换手机号</span>
                      </li>
                      <li>
                          <img src="@/assets/image/PersonalCenter/u146525.png" alt>
                          <span>微信号</span>
                          <span class="operation btn">{{UserInforma.bindWeChat ? '已绑定' : '未绑定'}}</span>
                          <!-- <span
                            class="noBan"
                            @click="dialogVisibleWeChat = true"
                            v-if="UserInforma.bindWeChat"
                          >解绑</span>-->
                          <span
                              class="ban"
                              v-if="!UserInforma.bindWeChat"
                              @click="dialogVisibleWeChatBindHandle"
                          >绑定</span>
                      </li>
                  </ul>
                  <div class="submit" @click="submitForm('ruleForm')">保存并提交</div>
              </el-form>
          </div>
      </div>
      <!-- 修改手机号的模态框 -->
      <SetTankuang :title="newFlagTitle" v-if="dialogVisibleCode" @closeDialogCallBack="closeDialogCallBack">
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
                          <el-button
                              slot="append"
                              @click="changePhone"
                              v-if="flag"
                          >发送验证码</el-button>
                          <template slot="append" v-else> <i class="counttime">{{countTime}}s</i>后重新发送</template>
                      </el-input>
                  </el-form-item>
              </el-form>
          </div>
          <div slot="footer" class="dialog-footer " >
              <!-- <el-button class="cancle" @click="centerDialogVisible = false">取消</el-button> -->
              <el-button class="default" style="width:100%;" @click="submitCodePhone">{{newFlagbtn}}</el-button>
          </div>
      </SetTankuang>
      <el-dialog
          :visible.sync="dialogVisibleWeChat"
          width="600px"
          class="dialog-code-wechat"
          :close-on-click-modal="false"
      >
          <p slot="title" class="title">提示</p>
          <div class="body-wechat">
              <p>确认解绑微信号？</p>
              <p class="small">解绑之后微信将不再接收系统提示信息</p>
          </div>
          <div slot="footer" class="footer-wechat">
              <span @click="sureUnboundWeChat">确认解绑</span>
              <span @click="dialogVisibleWeChat = false" class="close">取消</span>
          </div>
      </el-dialog>
      <!-- 绑定微信的二维码模态框 -->
      <el-dialog
          :visible.sync="dialogVisibleWeChatBind"
          width="600px"
          class="dialog-code-wecha-bind"
          :close-on-click-modal="false"
      >
          <p slot="title" class="title">绑定微信</p>
          <div class="dialog-code-wecha-bind-body">
              <img :src="dialogVisibleWeChatBindCodeUrl" alt>
          </div>
      </el-dialog>
  </div>
</template>
<style lang="less" scoped>
@import "./PersonalSet.less";
</style>
<script>
import { mapState, mapActions } from "vuex";
import "@/assets/css/ele-form.less";
import "@/assets/css/label-checkbox.less";
import { setInterval, clearInterval } from "timers";
import { baseURL } from "@/config";
import {axios,personCenter} from "../../../api/apiObj";

export default {
  name: "PersonalSet",
  data() {
    return {
        UserInforma:{},
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
        phoneBindFlag:false,
        phoneBindFlagText: false,
        // 绑定新的手机号
        newPhoneValue: "",
        newFlag: false,
        newFlagTitle:"验证当前手机号",
        newFlagbtn:"确认",
        labelmark:"已绑定手机号：",
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
                { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
            ]
        },
        timer: null
    };
  },
  computed: {
    // ...mapState({
    //   UserInforma: state => state.Login.UserInforma
    // }),
      access_token() {
          return sessionStorage.getItem("access_token");
      },
      url() {
          return (
              baseURL +
              `api-f/files/uploadWithCloud?access_token=${
                  this.access_token
                  }&fileSource=QINIUYUN&type=7&id=1`
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
        newFlag(newval){
            this.newFlagTitle=newval?"绑定新手机号":"验证当前手机号";
            this.newFlagbtn=newval?'绑定':"确认";
            this.labelmark=newval?'绑定新手机号：':"已绑定手机号："
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
          return "普通商家";
      }
    }
  },
  mounted() {
    this.$store.dispatch("Login/GetUserInforma");
    this.GetAllAddress();
    this.all();
     // this.init();
  },
  methods: {
    ...mapActions("ShippingAddress", ["GetAllReceivingAddress"]),
      ...mapActions("Login",[
          "GetUserInforma"
      ]),
      // init(){
      //       this.queryCustomerCenterSummary()
      // },
      // queryCustomerCenterSummary(){
      //   axios.request(personCenter.queryCustomerCenterSummary).then(res=>{
      //       console.log(res)
      //   })
      // },
    GetAllAddress() {
      this.GetAllReceivingAddress({
        start: 0,
        length: 10
      }).then(res => {
        console.log(res);
        if (res != null) {
          if (res.total > 0) {
            let obj = res.data.find(item => item.isdefault);
            if (obj) {
              this.defaultAddress = obj;
            } else {
              this.defaultAddress = res.data[0];
            }
            console.log(this.defaultAddress);
          }
        }
      });
    },
      ...mapActions("PersonalData", [
          "GetPersonalData",
          "GetRefreshToken",
          "GetNotification",
          "GetInternalPhone",
          "GetQueryphone",
          "GetReplacePhone",
          "GetUnboundWeChat",
          "GetGongZongCodes",
          "GetCheckBind"
      ]),
      closeDialogCallBack(){
          this.dialogVisibleCode = false;
          this.newFlag=false;
          this.newPhoneValue='';
          this.phoneCodeValue=''
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
              this.$message({
                  message: "保存成功!",
                  type: "success"
              });
          });
      },
      all() {
          this.GetUserInforma({
              access_token: this.access_token
          }).then(res => {
              console.log(res)
              this.UserInforma=res;
           //   console.log("state",this.$store.state)
              // this.UserInforma = res;
              // this.userTagMap = res.userTagMap;
              // this.ruleForm = {
              //   headImgUrl: res.headImgUrl,
              //   nickname: res.nickname
              // };
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
                              message: "绑定成功!"
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
