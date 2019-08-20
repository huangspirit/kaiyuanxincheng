<template>
  <div class="Login" :style="`background-image:url(${bgUrl})`">
    <div v-if="!dialogVisible">
      <div class="form" v-if="loginFlag">
        <p class="title">登陆芯手网</p>
        <p class="type">
          <span @click="change(1)">手机免登陆</span>
        </p>
        <div class="form-con">
          <div class="form-con-list" v-if="flag === 1">
            <div class="tel">
              <label for>手机号</label>
              <input type="number" v-model="phoneLoginValue" />
            </div>
            <div class="code">
              <label for>验证码</label>
              <input type="text" v-model="phoneCode" />
              <span v-if="sendPhoneCodeFlag" class="spa" @click="sendPhoneCode">发送验证码</span>
              <span v-else class="spb">{{sentPhoneCodeTime}}s后重新发送</span>
            </div>
            <div class="submit-login" @click="LoginPhone">登陆</div>
          </div>
          <div class="code" v-if="flag === 2">
            <img src="@/assets/image/Login/code_u36512.png" alt class="cod" v-if="codeFlag" />
            <img src="@/assets/image/Login/_u36514.png" alt class="pho" v-if="codeFlag" />
          </div>
        </div>
        <p class="qq-wx">
          <span>
            <img src="@/assets/image/Login/u36508.png" alt @click="qqLogin" />
          </span>
          <span>
            <img src="@/assets/image/Login/u36510.png" alt @click="wxLogin" />
          </span>
        </p>
      </div>
      <div class="bind-phone form" v-else>
        <span class="close-span" @click="loginFlagClose">
          <i class="el-icon-circle-close"></i>
        </span>
        <p class="title">绑定手机号</p>
        <p class="type">
          <span>新用户需要绑定手机，绑定之后可以用手机直接登录</span>
        </p>
        <div class="form-con">
          <div class="form-con-list">
            <div class="tel">
              <label for>手机号</label>
              <input type="number" v-model="qqPhoneValue" />
            </div>
            <div class="code">
              <label for>验证码</label>
              <input type="text" v-model="qqCode" />
              <span @click="sendCode" v-if="sendCodeFlag" class="spa">发送验证码</span>
              <span v-else class="spb">{{sentCodeTime}}s后重新发送</span>
            </div>
            <div class="submit-login" @click="bindPhone">绑定</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="45%" class="iframe" :before-close="handleClose">
      <div class="timer">
        扫码倒计时
        <span>{{count}}</span>s
      </div>
      <iframe :src="qqSrc" frameborder="0" scrolling="no" width="100%" height="100%" v-if="!code"></iframe>
      <iframe
        :src="wxSrc"
        sandbox="allow-scripts allow-top-navigation allow-same-origin"
        frameborder="0"
        scrolling="no"
        width="100%"
        height="100%"
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
      bgUrl: require("@/assets/image/Login/u36495.png"),
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
      code: false
    };
  },

  methods: {
    ...mapActions("Login", [
      "GetQqLogin",
      "GetQqSuccess",
      "GetQqSendCode",
      "GetQqBindPhone",
      "GetQqSignIn",
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
          this.GetQqSignIn({
            wxSrc: this.code,
            openid: this.openid,
            state: this.qqState
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.$router.push({
              path: "/"
            });
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
      this.GetQqBindPhone({
        wxSrc: this.code,
        phone: this.qqPhoneValue,
        key: this.qqKey,
        code: this.qqCode,
        state: this.qqState
      }).then(res => {
        if (res.resultCode === "200") {
          this.GetQqSignIn({
            wxSrc: this.code,
            openid: this.openid,
            state: this.qqState
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.$router.push({
              path: "/"
            });
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
                  .GetQqSignIn({
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
      this.sendCodeFlag = false;
      var t = setInterval(() => {
        this.sentCodeTime--;
        if (this.sentCodeTime < 0) {
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
      this.sendPhoneCodeFlag = false;
      var phoneT = setInterval(() => {
        this.sentPhoneCodeTime--;
        if (this.sentPhoneCodeTime < 0) {
          this.sentPhoneCodeTime = 60;
          clearInterval(phoneT);
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
            console.log(res)
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.$router.push({
              path: "/"
            });
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
                this.GetQqSignIn({
                  wxSrc: this.code,
                  openid: this.openid,
                  state: this.qqState
                }).then(res => {
                  sessionStorage.setItem("access_token", res.access_token);
                  sessionStorage.setItem("refresh_token", res.refresh_token);
                  this.$router.push({
                    path: "/"
                  });
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
  mounted() {
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
<style lang="less"  >
@import "./Login.less";
</style>

