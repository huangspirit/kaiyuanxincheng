<template>
  <div class="Login" :style="`height:${this.contHeight}px`">
      <div class="carousel">
         <img src="@/assets/image/Login/bg.jpg" alt="" style="height:100%;width:100%">
          <!-- <el-carousel :interval="5000" height="100%" :loop="true">
              <el-carousel-item>
                  <img src="@/assets/image/Login/bg0.jpg" alt="">
              </el-carousel-item>
              <el-carousel-item>
                 <img src="@/assets/image/Login/bg1.jpg" alt="">
              </el-carousel-item>
              <el-carousel-item>
                  <img src="@/assets/image/Login/bg.jpg" alt="">
              </el-carousel-item>
          </el-carousel> -->
      </div>
    <div v-if="!dialogVisible" class="cont">
        <div class="formWrap allWidth clear" v-if="loginFlag">
            
            <div class="form fr" >
            
                <p class="type">
                    <span @click="change(1)">欢迎来到大麦晶城，10秒内急速注册成功！</span>
                </p>
                <div class="form-con">
                    <div class="form-con-list" v-if="flag === 1">
                        <div class="tel">
                            <el-input v-model="phoneLoginValue" placeholder="手机号码"></el-input>
                        </div>
                        <div class="code">
                            <el-input v-model="phoneCode" placeholder="验证码"></el-input>
                            <span v-if="sendPhoneCodeFlag" class="spa bgColor" @click="sendPhoneCode" >发送验证码</span>
                            <span v-else class="spb bgGray">{{sentPhoneCodeTime}}s后重新发送</span>
                        </div>
                        <div class="submit-login" @click="LoginPhone">登 录</div>
                    </div>
                    <div class="code" v-if="flag === 2">
                        <img src="@/assets/image/Login/code_u36512.png" alt class="cod" v-if="codeFlag" />
                        <img src="@/assets/image/Login/_u36514.png" alt class="pho" v-if="codeFlag" />
                    </div>
                </div>
                <p class="qq-wx">
                    其他登录方式：
                        <img src="@/assets/image/icon/qq.png" alt @click="qqLogin" />
                        <img src="@/assets/image/icon/weixin.png" alt @click="wxLogin" />
                </p>
            </div>
            <div class="desc fl">
                <p class="title">
                  <span>大麦晶城</span>
                  <span class="line">---</span>
                  <span class="little"> 用芯链接世界</span>
                </p>
                <p class="de"><i>特价直通车，缩短中间环节，平台0差价</i></p>
            </div>
        </div>
      <div class="bind-phone form" v-else>
        <span class="close-span" @click="loginFlagClose">
          <i class="el-icon-circle-close"></i>
        </span>
        <p class="title color">绑定手机号</p>
        <p class="type">
          <span>新用户需要绑定手机，绑定之后可以用手机直接登录</span>
        </p>
        <div class="form-con">
          <div class="form-con-list">
            <div class="tel">
                <el-input v-model="qqPhoneValue" placeholder="手机号码"></el-input>
            </div>
            <div class="code">
                <el-input v-model="qqCode" placeholder="验证码"></el-input>
              <span @click="sendCode" v-if="sendCodeFlag" class="spa bgColor">发送验证码</span>
              <span v-else class="spb bgGray">{{sentCodeTime}}s后重新发送</span>
            </div>
            <div class="submit-login bgColor" @click="bindPhone">绑定</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="45%" class="iframe" :before-close="handleClose">
      <div class="timer">
        扫码倒计时
        <span>{{count}}</span>s
      </div>
      <iframe :src="qqSrc" frameborder="0" scrolling="no" width="100%" height="400px" v-if="!code"></iframe>
      <iframe
        :src="wxSrc"
        sandbox="allow-scripts allow-top-navigation allow-same-origin"
        frameborder="0"
        scrolling="no"
        width="100%"
        height="380px"
        v-else
      ></iframe>
    </el-dialog>
    <el-dialog :visible.sync="bindPHoneDialog" center top="35vh" class="bindPHoneDialog">
      <p slot="title" class="title">提示</p>
      <span>{{bindPHoneDialogText}}</span>
      <span slot="footer" class="dialog-footer">
        <span @click="bindPHoneDialogSure" class="sure">确 定</span>
        <span @click="bindPHoneDialogClose" class="close">取 消</span>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { setToken } from "@/lib/utils";
import { clearInterval, setInterval } from "timers";
export default {
  name: "Login",
  data() {
    return {
      //扫码登陆倒计时
      timer: null,
      count: 60,
      // 手机登录和微信登陆flag
      flag: 1,
      // 登陆以后绑定手机的falg
      loginFlag: true,
      // 二维码登陆的flag
      dialogVisible: false,
      bindPHoneDialog: false,
      codeFlag: false,
      sendCodeFlag: true,
      bindPHoneDialogText: "",
      qqSrc: "",
      qqState: "",
      qqTime: null,
      qqPhoneValue: "",
      qqKey: "",
      qqCode: null,
      openid: "",
      sentCodeTime: 60,
      phoneLoginValue: "",
      phoneKey: "",
      phoneCode: "",
      sendPhoneCodeFlag: true,
      sentPhoneCodeTime: 60,
      wxSrc: "",
      wxState: "",
      wxTime: null,
      code: false,
        contHeight:1000
    };
  },

  methods: {
    ...mapActions("Login", [
      "GetQqLogin",
      "GetQqSuccess",
      "GetQqSendCode",
      "GetQqBindPhone",
      "GetSignIn",
      "GetPhoneLoginCode",
      "GetPhoneLogin",
      "GetPhoneSignIn",
      "GetWxLogin",
      "GetWxSuccess",
      "GetWxBack"
    ]),
    ...mapMutations(["setloginState"]),
    bindPHoneDialogClose() {
      this.bindPHoneDialog = false;
      this.$router.push({
        path: "/Login"
      });
    },
    bindPHoneDialogSure() {
      this.bindPHoneDialog = false;
      this.GetQqBindPhone({
        phone: this.qqPhoneValue,
        key: this.qqKey,
        code: this.qqCode,
        state: this.qqState,
        flag: true,
        wxSrc: this.code
      }).then(res => {
        if (res.resultCode === "200") {
          this.GetSignIn({
            wxSrc: this.code,
            openid: this.openid,
            state: this.qqState
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.$router.push({
              path: "/"
            });
            // this.$router.go(-1)
            this.setloginState(true);
            // this.$store.state.loginState = true;
          });
        } else if (res.resultCode === "5001") {
          this.bindPHoneDialog = true;
          this.bindPHoneDialogText = res.message + ",是否合并账户信息?";
        } else if (res.resultCode === "400") {
          this.$message.error(res.message);
        }
      });
    },
    change(x) {
      this.flag = x;
    },
    loginFlagClose() {
      this.loginFlag = true;
      this.$router.push({
        path: "/"
      });
      //  this.$router.go(-1)
      this.setloginState(false);
      //this.$store.state.loginState = false;
    },
    handleClose() {
      this.dialogVisible = false;
      clearInterval(this.timer);
      this.code = false;
      if (this.qqSrc) {
        clearInterval(this.qqTime);
        this.qqTime = null;
        this.qqSrc = "";
      } else if (this.wxSrc) {
        clearInterval(this.wxTime);
        this.wxTime = null;
        this.wxSrc = "";
      }
    },
    bindPhone() {
        if(!(/^1[3456789]\d{9}$/.test(this.qqPhoneValue))){
            this.$message.info("手机号码有误，请重填");
            return false;
        };
        console.log(this.qqState);
      this.GetQqBindPhone({
        wxSrc: this.code,
        phone: this.qqPhoneValue,
        key: this.qqKey,
        code: this.qqCode,
        state: this.qqState
      }).then(res => {
        if (res.resultCode === "200") {
          this.GetSignIn({
            wxSrc: this.code,
            openid: this.openid,
            state: this.qqState
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.$router.push({
              path: "/"
            });
            //  this.$router.go(-1)
            this.setloginState(true);
            // this.$store.state.loginState = true;
          });
        } else if (res.resultCode === "5001") {
          this.bindPHoneDialog = true;
          this.bindPHoneDialogText = res.message + ",是否合并账户信息?";
        } else if (res.resultCode === "400") {
          this.$message.error(res.message);
        }
      });
    },
    // qq登录
    qqLogin() {
      var _this = this;
      this.GetQqLogin()
        .then(res0 => {
          // 返回state
          this.qqSrc = res0.url;
          this.dialogVisible = true;
          this.count = 60;
          this.timer = setInterval(function() {
            if (_this.count == 0) {
              clearInterval(_this.timer);
            } else {
              _this.count--;
            }
          }, 1000);
          this.qqState = res0.state;
          var cont = 0;

          this.qqTime = setInterval(function() {
            cont++;

            _this.GetQqSuccess(res0.state).then(res => {
              _this.openid = res.openid;
              // tyep 为1的时候
              if (res.type === 1) {
                _this.loginFlag = false;
                _this.dialogVisible = false;
                clearInterval(_this.timer);
                clearInterval(_this.qqTime);
                _this.qqTime = null;
                // tyep 为2的时候
              } else if (res.type === 2) {
                clearInterval(_this.qqTime);
                _this.qqTime = null;
                _this
                  .GetSignIn({
                    wxSrc: _this.code,
                    openid: _this.openid,
                    state: _this.qqState
                  })
                  .then(res => {
                    sessionStorage.setItem("access_token", res.access_token);
                    sessionStorage.setItem("refresh_token", res.refresh_token);
                    _this.$router.push({
                      path: "/"
                    });
                    //  this.$router.go(-1)
                    _this.setloginState(true);
                    //this.$store.state.loginState = true;
                  });
              } else if (res.type === 3) {
                if (cont > 19) {
                  // this.$message.error("登录失败!");
                  _this.dialogVisible = false;
                  clearInterval(_this.timer);
                  clearInterval(_this.qqTime);
                  _this.qqTime = null;
                }
              }
            });
          }, 3000);
        })
        .catch(err => {
          this.$message.error(res);
        });
    },
    // 关闭QQ登录
    closeQqiframe() {
      this.qqSrc = "";
    },
    // 发送验证码
    sendCode() {
        if(!(/^1[3456789]\d{9}$/.test(this.qqPhoneValue))){
            this.$message.info("手机号码有误，请重填");
            return false;
        }
      this.sendCodeFlag = false;
      var t = setInterval(() => {
        this.sentCodeTime--;
        if (this.sentCodeTime < 1) {
          this.sendCodeFlag = true;
          this.sentCodeTime = 60;
          clearInterval(t);
        }
      }, 1000);
      this.GetQqSendCode({
        phone: this.qqPhoneValue
      }).then(res => {
        this.qqKey = res.key;
      });
    },
    // 发送手机验证码
    sendPhoneCode() {
        if(!(/^1[3456789]\d{9}$/.test(this.phoneLoginValue))){
           this.$message.info("手机号码有误，请重填");
            return false;
        }
        this.sendPhoneCodeFlag = false;
        var phoneT = setInterval(() => {
            this.sentPhoneCodeTime--;
            if (this.sentPhoneCodeTime < 1) {
                this.sentPhoneCodeTime = 60;
                clearInterval(phoneT);
                this.sendPhoneCodeFlag=true
            }
        }, 1000);
        this.GetPhoneLoginCode({
            phone: this.phoneLoginValue
        }).then(res => {
                this.phoneKey = res.key;
        });
    },
    // 手机登录
    LoginPhone() {
      this.GetPhoneLogin({
        phone: this.phoneLoginValue,
        key: this.phoneKey,
        code: this.phoneCode
      }).then(res => {
        if (res.resultCode === "200") {
          this.GetPhoneSignIn({
            phone: this.phoneLoginValue,
            key: this.phoneKey,
            code: this.phoneCode
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.$router.push({
              path: "/"
            });
            //  this.$router.go(-1)
            this.setloginState(true);
            //this.$store.state.loginState = true;
          });
        } else {
          // this.$message.error("登录失败!");
        }
      });
    },
    // 微信登陆
    wxLogin() {
      var _this = this;
      this.code = true;
      this.codeFlag = true;
      this.GetWxLogin().then(res => {
        this.wxSrc = res.url;
        this.dialogVisible = true;
        this.count = 60;
        this.timer = setInterval(function() {
          if (_this.count == 0) {
            clearInterval(_this.timer);
          } else {
            _this.count--;
          }
        }, 1000);
        this.qqState = res.state;
      });
    }
  },
  // 监听路由参数的变化
  watch: {
    $route() {
      const code = this.$route.query.code;
      if (code) {
        this.loginFlag = false;
        this.code = true;
        this.GetWxBack({
          state: this.qqState,
          code: code
        }).then(() => {
          var cont2 = 0;
          this.wxTime = setInterval(() => {
            cont2++;
            this.GetWxSuccess(this.qqState).then(res => {
              this.openid = res.openid;
              // tyep 为1的时候
              if (res.type === 1) {
                this.loginFlag = false;
                this.dialogVisible = false;
                clearInterval(this.timer);
                clearInterval(this.wxTime);
                this.wxTime = null;
                // tyep 为2的时候
              } else if (res.type === 2) {
                clearInterval(this.wxTime);
                this.wxTime = null;
                console.log(this.qqState)
                this.GetSignIn({
                  wxSrc: this.code,
                  openid: this.openid,
                  state: this.qqState
                }).then(res => {
                  sessionStorage.setItem("access_token", res.access_token);
                  sessionStorage.setItem("refresh_token", res.refresh_token);
                  this.$router.push({
                    path: "/"
                  });
                  // this.$router.go(-1)
                  this.setloginState(true);
                  //this.$store.state.loginState = true;
                });
              } else if (res.type === 3) {
                if (cont2 > 59) {
                  // this.$message.error("二维码失效，请重新扫码!");
                  this.dialogVisible = false;
                  clearInterval(this.timer);
                  clearInterval(this.wxTime);
                  this.wxTime = null;
                }
              }
            });
          }, 1000);
        });
      } else {
        this.loginFlag = true;
        this.code = false;
      }
    }
  },
    created(){
      this.contHeight=window.screen.height-180
    },
  mounted() {
    console.log(this.$route)
    this.qqState = this.$route.query.state;
    this.setloginState(false);
    //this.$store.state.loginState = false;
  },
  beforeDestroy() {
    if (this.qqTime) {
      clearInterval(this.qqTime);
      this.qqTime = null;
    }
  }
};
</script>
<style lang="less"  scoped>

@import "./Login.less";
</style>

