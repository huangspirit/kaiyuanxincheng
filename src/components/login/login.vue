.<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="850px" class="loginCont">
      <div  class="item">
        <div class="left ">
          <img src="@/assets/logo2.png" alt>
          <div class="title">
           
            <div class="gray desc">welcome to</div>
             <span>水木晶城</span>
            <div class="intro">
              <span class="line">---</span>
              <span class="little"> 用芯链接世界</span>
            </div>
             <!-- <p class="de"><i>特价直通车，平台0差价</i></p> -->
          </div>
         
        </div>
        <div class="right">
          <div v-show="loginType===1" class="wrap">
              <div id="wechat_redirect"  v-show="loginType===1"></div>
          </div>
          <div class="form-con-list wrap" v-if="loginType===3">
             <p class="type">
                    <span>欢迎来到水木晶城，10秒内急速注册成功！</span>
                </p>
            <div class="tel">
              <el-input v-model="phoneLoginValue" placeholder="手机号码"></el-input>
            </div>
            <div class="code">
              <el-input v-model="phoneCode" placeholder="验证码"></el-input>
              <span v-if="count <= 0" class="spa bgColor" @click="sendPhoneCode">发送验证码</span>
              <span v-else class="spb bgGray">{{count}}s后重新发送</span>
            </div>
            <div class="submit-login" @click="LoginPhone" v-if="!isNew">登 录</div>
            <div class="submit-login bgColor" @click="bindPhone" v-if="isNew">绑定</div>
          </div>
          <div v-if="loginType==2" class="wrap">
            <iframe
              :src="qqSrc"
              frameborder="0"
              scrolling="no"
              width="100%"
              height="380px"
              v-if="loginType==2"
            ></iframe>
          </div>
          <div class="logintypeSel" :class="loginType==2?'qq':''">
          <p class="desc">切换不同的登录方式</p>
          <img
            src="@/assets/image/icon/weixin.png"
            alt
            @click="wxLogin"
            :class="loginType==1?'active':''"
          />
          <img
            src="@/assets/image/icon/qq.png"
            alt
            @click="qqLogin"
            :class="loginType==2?'active':''"
          />

          <img
            src="@/assets/image/icon/phone.png"
            alt
            @click="phLogin"
            :class="loginType==3?'active':''"
          />
        </div>
        </div>
        
      </div>
      
      
    </el-dialog>
  </div>
</template>
.<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { proBaseUrl } from "@/config";
export default {
  data() {
    return {
      dialogVisible: true,
      loginType: 1, //1：微信 2：qq 3:phone
      count: 0,
      timer: null,
      wxState: "",
      hasWxCode: false,
      isWX:true,
      openid: "",
      state:'',
      code:'',
      qqSrc: "",
      phoneLoginValue: "",
      phoneCode: "",
      phoneKey: "",
      isNew:false,
      
      
    };
  },
  mounted() {
    this.wxLogin();
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  watch: {
    dialogVisible(newval) {
      if (!newval) {
        this.setshowlogin(false);
      }
    },
    $route() {
      const code = this.$route.query.code;
      var _this = this;
      if (code) {
        this.hasWxCode = true;
        this.GetWxBack({
          state: this.wxState,
          code: code
        }).then(() => {
          var count = 60;
          this.timer = setInterval(() => {
            _this.GetWxSuccess(this.wxState).then(res => {
              _this.openid = res.openid;
              if (res.type == 1) {
                //新用户扫码注册，需要吊起来手机输入
                _this.loginType = 3;
                _this.count=0;
                _this.isNew=true;
                clearInterval(this.timer);
              } else if (res.type == 2) {
                //老用户扫码登录
                _this
                  .GetSignIn({
                    isWX: _this.isWX,
                    openid: _this.openid,
                    state: _this.wxState
                  })
                  .then(res => {
                    sessionStorage.setItem("access_token", res.access_token);
                    sessionStorage.setItem("refresh_token", res.refresh_token);
                    let query = _this.$route.query;
                    delete query.code;
                    delete query.state;
                    this.$router.push({
                      path: _this.$route.path,
                      query: query
                    });
                    _this.setloginState(true);
                     _this.GetUserInforma()
                  });
                _this.dialogVisible = false;
                clearInterval(_this.timer);
              } else {
                _this.dialogVisible = false;
                clearInterval(_this.timer);
              }
              //else if(res.type==3 ){
              //   //二维码失效

              // }else if(res.type==4){
              //     //用户取消登录
              // }
            });
          }, 1000);
        });
      }
    }
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
      "GetWxBack",
      "GetUserInforma"
    ]),
    ...mapMutations(["setloginState", "setshowlogin"]),
    //微信登录
    wxLogin() {
      this.loginType = 1;
      this.isWX=true;
      clearInterval(this.timer);
      this.count = 0;
      this.GetWxLogin().then(res => {
        if (res) {
          this.wxState = res.state;
          let href =
          "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7Y29sb3I6I2ZmZn0NCi5pbXBvd2VyQm94IC5pbmZvIHtkaXNwbGF5OiBub25lO30="
           // "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZTt9";
          let redirectUrl = proBaseUrl + '/#' +this.$route.fullPath;
          let arr = res.url.split("?")[1].split("&");
          let appid = arr.find(item => {
            item.indexOf("appid");
            return item;
          });
          if (appid) {
            let obj = new WxLogin({
              self_redirect: false,
              id: "wechat_redirect",
              appid: appid.split("=")[1],
              scope: "snsapi_login",
              redirect_uri: encodeURIComponent(redirectUrl),
              state: res.state,
              style: "",
              href: href
            });
            let _this = this;
            this.count = 60;
            this.timer = setInterval(function() {
              if (_this.count == 0) {
                clearInterval(_this.timer);
              } else {
                _this.count--;
              }
            }, 1000);
          }
        }
      });
    },
    //qq登录
    qqLogin() {
      this.loginType = 2;
      this.isWX=false;
      var _this = this;
      clearInterval(this.timer);
      this.count = 0;
      this.GetQqLogin().then(res0 => {
        // 返回state
        this.state = res0.state;
        this.qqSrc = res0.url;
        this.count = 60;
        this.timer = setInterval(() => {
          this.count--;
          if (_this.count > 0) {
            _this.GetQqSuccess(res0.state).then(res => {
              _this.openid = res.openid;
              if (res.type == 1) {
                //新用户扫码注册，需要吊起来手机输入
                _this.loginType = 3;
                _this.count=0;
                _this.isNew=true;
                clearInterval(this.timer);
              } else if (res.type == 2) {
                //老用户扫码登录
                _this
                  .GetSignIn({
                    isWX: _this.isWX,
                    openid: _this.openid,
                    state: _this.state
                  })
                  .then(res => {
                    sessionStorage.setItem("access_token", res.access_token);
                    sessionStorage.setItem("refresh_token", res.refresh_token);
                    _this.setloginState(true);
                    _this.GetUserInforma()
                  });
                _this.dialogVisible = false;
                clearInterval(_this.timer);
              } else if (res.type == 4) {
                //用户取消登录
                _this.dialogVisible = false;
                clearInterval(_this.timer);
              } else if (res.type == 3) {
                //等待用户授权登录
              }
            });
          } else {
            clearInterval(_this.timer);
          }
        }, 1000);
      });
    },
    //新用户绑定手机号
    bindPhone() {
        if(!(/^1[3456789]\d{9}$/.test(this.phoneLoginValue))){
            this.$message.info("手机号码有误，请重填");
            return false;
        }
        let obj={
          isWX: this.isWX,
          phone: this.phoneLoginValue,
          key: this.phoneKey,
          state: this.state,
          code:this.phoneCode
        }
        
      this.GetQqBindPhone(obj).then(res => {
        if (res.resultCode === "200") {
          this.GetSignIn({
            isWX: this.isWX,
            openid: this.openid,
            state: this.state
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.dialogVisible=false;
            this.setloginState(true);
             this.GetUserInforma()
            
          });
        } else if (res.resultCode === "5001") {
           this.$confirm(res.message + ",是否合并账户信息?", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.mergeAcount()
            }).catch(() => {
              console.log("取消合并")         
            });
        } else if (res.resultCode === "400") {
          this.$message.error(res.message);
          this.count=0;
        }
      });
    },
    //合并账户
     mergeAcount() {
      let obj={
          isWX: this.isWX,
          phone: this.phoneLoginValue,
          key: this.phoneKey,
          state: this.state,
          code:this.phoneCode,
          flag:true
        }
      this.GetQqBindPhone(obj).then(res => {
        if (res.resultCode === "200") {
          this.GetSignIn({
            isWX: this.isWX,
            openid: this.openid,
            state: this.state
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.dialogVisible=false;
            this.setloginState(true);
             this.GetUserInforma()
            
          });
        } else if (res.resultCode === "5001") {
           this.$confirm(res.message + ",是否合并账户信息?", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.mergeAcount()
            }).catch(() => {
              console.log("取消合并")         
            });
        } else if (res.resultCode === "400") {
          this.$message.error(res.message);
          this.count=0;
        }
      });
    },
    //手机登录
    phLogin() {
      this.loginType = 3;
      clearInterval(this.timer);
      this.count = 0;
    },
    // 发送手机验证码
    sendPhoneCode() {
      if (!/^1[3456789]\d{9}$/.test(this.phoneLoginValue)) {
        this.$message.info("手机号码有误，请重填");
        return false;
      }
      this.count = 60;
      this.GetPhoneLoginCode({
        phone: this.phoneLoginValue
      }).then(res => {
        this.phoneKey = res.key;
      });
      var _this = this;
      this.timer = setInterval(() => {
        _this.count--;
        if (_this.count == 0) {
          clearInterval(_this.timer);
        }
      }, 1000);
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
            this.setloginState(true);
             this.GetUserInforma()
            this.dialogVisible=false
          });
        } else {
          // this.$message.error("登录失败!");
        }
      });
    },
  }
};
</script>
.<style lang="less" scoped>
@import "./login.less";
</style>