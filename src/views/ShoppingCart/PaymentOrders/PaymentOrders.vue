<template>
  <div class="PaymentOrders">
    <p class="title">支付订单</p>
    <div class="PaymentOrders-con">
      <div class="goods">
        <p class="orderNo">订单：{{orderNumber}}</p>
      </div>
      <div class="payType">
        <p class="title">支付方式</p>

        <ul class="payTypeList">
          <li
            :class="{active:payTabFlag === val.id}"
            v-for="val in payTabList"
            :key="val.id"
            @click="changePayTab(val)"
          >
            <img :src="val.imgUrl" alt class="bgs" v-if="val.id === 0 || val.id === 1" />
            <div class="bgf bgs" v-if="val.id === 2 || val.id === 3">
                <img :src="val.imgUrl" alt   />
                <div v-if="val.name" class="nameDesc">{{val.name}}</div>
            </div>
          </li>
        </ul>
        <div style="line-height:50px;height:50px;">
            <span
              class="color"
              v-if="isFF && payTabFlag == 0"
            >温馨提示：
            系统检测到您是火狐浏览器，选择支付宝支付时如若失败请去支付宝官网下载安全控件
            </span>
          </div>
      </div>
      <div class="pay-price">
        <span class="pay-price-l">*请在完成下单24小时内完成支付，如未完成此订单将自动关闭。需重新购买！</span>
        <div class="pay-price-r">
          <p>
            <span>{{orderInfo.payType | payTypeFilter}}</span>
            <span class="price">￥{{totalPrice}}</span>
          </p>
          <div>
            <span class="goCenter submit" @click="goCenter">返回订单中心</span>
            <span class="submit" @click="submit">立即支付</span>
          </div>
          <!-- <p>我有疑问，需要反馈？</p> -->
        </div>
      </div>
    </div>
    <!-- 扫码支付模态框 -->
    <el-dialog
      :visible.sync="dialogCode"
      width="350px"
      :close-on-click-modal="false"
      title="微信扫码支付"
      class="weichatCode"
    >
    <div class="weichatCodeCont">
       <img :src="`data:image/jpeg;base64,${payCodeImgUrl}`" class="codeImg"/>
       <div class="Invalid" v-if="InvalidFlag">
            <img src="@/assets/image/PersonalCenter/_u1118.png" alt @click="paymentWe" /><br>
            <span>刷新重新获取支付二维码</span>
        </div>
    </div>

    </el-dialog>
    <SetTankuang :title="'银行汇款'" v-if="showDialog" @closeDialogCallBack="closeDialogCallBack">
      <div class="dialog-body" slot="dialog-body">
        <div v-if="payTabFlag==2" class="RemittancNotes" >
        <el-form  label-width="80px">
          <el-form-item label="汇款凭证">
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
              >图片尺寸请确保800px*800px以上，文件大小在2MB以内，支持png、jpg、gif格式</div>
            </el-upload>

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
  </div>
</template>
<style lang="less" scoped>
@import "./PaymentOrders.less";
</style>

<script>
import { mapActions, mapState } from "vuex";
import { baseURL } from "@/config";
import { setInterval, clearInterval } from 'timers';
export default {
  name: "PaymentOrders",
  data() {
    return {
      //计时器查询价格
      loading:true,
      timer:null,
      //显示和隐藏弹框
      showDialog:false,
      //银行付款编号
      bankPayNumber:"",
      dialogCode: false,
      payCodeImgUrl: "",
      payTabFlag: 0,
      orderNumber: "",
      // 刷新二维码的flag
      InvalidFlag: false,
      // 支付的类型，是全款还是预付款
      payType: "",
      // 需要支付的总价格
      totalPrice: 0,
      orderInfo:{},
      payTabList: [
        {
          imgUrl: require("@/assets/image/ShoppingCart/zhifubao.png"),
          name: "",
          id: 0
        },
        {
          imgUrl: require("@/assets/image/ShoppingCart/weixin.png"),
          name: "",
          id: 1
        },
        // {
          //   imgUrl: require("@/assets/image/ShoppingCart/bank.png"),
          //   name: "汇款",
          //   id: 2
          // },
        // {
        //   imgUrl: require("@/assets/image/ShoppingCart/yue.png"),
        //   name: "我的余额",
        //   id: 3
        // }
      ],
      businessList:[]
    };
  },
  computed: {
    ...mapState({
      isFF:state=>state.isFF
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
  filters:{
    payTypeFilter(val){
      switch (val){
        case 0:
          return "预付金额：";
        case 1:
          return "支付尾款：";
        case 2:
          return "支付全款：";
      }
    }
  },
  mounted() {
    //根据订单号获取订单的详细信息及付款金额

    //this.payType = this.$route.query.payType;
    this.$store.state.shoppingCart.active = 4;
    this.orderNumber = this.$route.query.orderNumber;
    //this.totalPrice = Number(this.$route.query.totalPrice).toFixed(4);
    this.getOrderType();
  },
  methods: {
    ...mapActions("SignContract",["submitBankPayNumber"]),
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
          _this.orderInfo=res
          if( _this.orderInfo.money){

            _this.totalPrice = _this.orderInfo.money;
            _this.payType =_this.orderInfo.payType;
            loading.close()
            clearInterval(_this.timer)
          }
        })
      },countime)

    },
    changePayTab(item) {
      this.payTabFlag = item.id;
    },
    // 微信支付
    paymentWe() {
      this.InvalidFlag = false;
      this.$store
        .dispatch("SignContract/GetWeChatPay", {
          message_id: this.orderNumber,
          access_token: this.access_token,
          type: this.payType
        })
        .then(codeResp => {
          this.dialogCode = true;
          this.payCodeImgUrl = codeResp.prepay_id;
          let count = 0;
          // 拿到二维码之后进行轮训获取支付状态
          let timep = setInterval(() => {
            count++;
            if (count === 40) {
              clearInterval(timep);
              this.InvalidFlag = true;
            } else {
              this.InvalidFlag = false;
              this.$store
                .dispatch("SignContract/GetPayStatus", {
                  orderno: this.orderNumber,
                  messageid: codeResp.flag,
                  access_token: this.access_token
                })
                .then(statusResp => {
                  // 如果支付状态是1，支付成功，跳到我的订单页面
                  if (statusResp === 1) {
                    clearInterval(timep);
                    let loading2 = this.$loading({
                      lock: true,
                      text: "支付成功，正在前往我的订单页面。。。",
                      spinner: "el-icon-loading",
                      background: "rgba(0, 0, 0, 0.7)"
                    });
                    setTimeout(() => {
                      loading2.close();
                      this.$router.push({
                        path: "/PersonalCenter/BuyerOrderManagement"
                      });
                    }, 2000);
                  }
                });
            }
          }, 3000);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    goCenter(){
        this.$router.push("/PersonalCenter/BuyerOrderManagement")
      },
    submit() {
      if (this.payTabFlag === 1) {
        this.paymentWe();
      } else if (this.payTabFlag === 0) {
        this.$store
          .dispatch("SignContract/GetAlipayPagePay", {
            orderNo: this.orderNumber,
            type: this.payType,
            access_token: this.access_token
          })
          .then(res => {
            const div = document.createElement("divform");
            div.innerHTML = res.prepay_id;
            document.body.appendChild(div);
            // //保持与支付宝默认编码格式一致，如果不一致将会出现：调试错误，请回到请求来源地，重新发起请求，
            // // 错误代码 invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配
            // 在form submit 前，必须设置 acceptCharset='GBK' ，此处不一定是要GBK ,可以是UTF-8 ,前提是支付宝返回的action 必须是UTF-8  ,需保持一致
            document.forms[0].acceptCharset = "UTF-8";
            document.forms[0].target = "_blank";
            document.forms[0].submit();
          });
      }else{
        //this.$message.error("请按照温馨提示进行汇款")
        this.showDialog=true

      }
    },
    //上传银行
    // submitBankPayNumberbtn(){
    //   if(!this.bankPayNumber){
    //     this.$message("请填写好汇款编号")
    //     return;
    //   }
    //     this.submitBankPayNumber({
    //       order_no:this.orderNumber
    //     }).then(res=>{
    //       this.showDialog=false
    //       this.$router.push("/PersonalCenter/BuyerOrderManagement")
    //     })
    // },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
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
    closeDialogCallBack(){
       this.showDialog=false
    }
  }
};
</script>

<style>
</style>
