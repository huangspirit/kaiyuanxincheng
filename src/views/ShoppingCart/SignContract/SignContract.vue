<template>
  <div class="SignContract">
    <div class="SignContract-information">
      <div class="SignContract-title">
        <img src="@/assets/image/inquirybasket/u26965.png" alt />
        <span>核对订单信息</span>
      </div>
      <div class="SignContract-con">
        <div>
          <p>合同签署说明</p>
          <p>鉴于芯片商品的特殊性，为了保证买卖双方的利益，您在付款前需要签署交易合同，鉴于芯片商品的特殊性，为了保证买卖双方的利益，您在付款前需要签署交易合同，鉴于芯片商品的特殊性，为了保证买卖双方的利益，您在付款前需要签署交易合同，鉴于芯片商品的特殊性，为了保证买卖双方的利益，您在付款前需要签署交易合同，</p>
        </div>
        <div>
          <p>注意事项</p>
          <p>鉴于芯片商品的特殊性，为了保证买卖双方的利益，您在付款前需要签署交易合同，鉴于芯片商品的特殊性，为了保证买卖双方的利益，您在付款前需要签署交易合同，鉴于芯片商品的特殊性，为了保证买卖双方的利益，您在付款前需要签署交易合同，鉴于芯片商品的特殊性，为了保证买卖双方的利益，您在付款前需要签署交易合同，</p>
        </div>
      </div>
      <div class="SignContract-download">
        <p class="p_on">
          <i class="el-icon-download"></i>
          <a :href="downloadUrl3" download>下载合同</a>
        </p>
        <p class="xzfl">
          <span @click="downLoadOrderContract">查看合同</span>
        </p>
        <p class="p_on">
          <span>
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :limit="1"
              :data="uploadObj"
              :on-success="uploadSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <span>
                <i class="el-icon-upload2"></i>上传合同
              </span>
            </el-upload>
          </span>
        </p>
        <p class="cla-sp">您后续也可以在'用户中心>我的订单>待付款'栏目中上传合同</p>
        <p class="contract">
          <!-- <label class="label">
            <input type="checkbox" v-model="contractValue" />
            <span>
              <img src="@/assets/image/inquirybasket/_u11390.png" alt v-if="contractValue" />
            </span>
          </label> -->
          
           <el-checkbox  v-model="contractValue">不签合同<span class="cla-sp" v-if="WholeParagraph">您是全款买家，可以不签合同，直接付款</span></el-checkbox>
        </p>
        <p class="submit" @click="submit">{{contractValue ? '直接去付款' : '我已上传合同，下一步'}}</p>
        <!-- <div style="height:800px;width:300px">
          <form
            name="punchout_form"
            method="post"
            action="https://openapi.alipay.com/gateway.do?charset=utf-8&amp;method=alipay.trade.page.pay&amp;sign=Hg7MBQcAGL0%2F9GGDCUVWlsc4PK3MER%2BzPBjcMBOgQ2mHVxYyixaWgvoE%2FST3GS1XuiE6v4FV73SOwvVPEIldKYX4f%2BkknrXidXXZxy1DSrAx%2BxStCf5Ab%2FF%2BF7zuuo3Eo%2B1eiyZutrACbVhohCekHkrvwxURaq8j578Su6xWhWoPo%2B%2FsmNAp0kq0vhly9A4eMlDtVL6cF0Zx0QcH2WjACF8cexfNbaNYnXsaKtQlul%2BaCsPMjDmOKIqOc4jKWiz%2BqBjGl2LJXa9lgevvyi3B6z3dwEMhQTou2hYT6QzHdQCnQpdJdS9cPj9w%2FxnaBKJ14vRvScpS%2FRLgQ9kl7k6rEA%3D%3D&amp;return_url=https%3A%2F%2Fwww.113ic.com%2F&amp;notify_url=https%3A%2F%2Fapi.113ic.com%2Fapi-order%2Falipay%2Fnotisfy&amp;version=1.0&amp;app_id=2019062665646509&amp;sign_type=RSA&amp;timestamp=2019-06-29+13%3A40%3A57&amp;alipay_sdk=alipay-sdk-java-dynamicVersionNo&amp;format=json"
          >
            <input
              type="hidden"
              name="biz_content"
              value="{&quot;out_trade_no&quot;:&quot;CO61-201906281774&quot;,&quot;total_amount&quot;:0.60,&quot;subject&quot;:&quot;订单CO61-201906281774共1种商品&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;,&quot;goods_detail&quot;:&quot;[{\&quot;body\&quot;:\&quot;人民币\&quot;,\&quot;goods_id\&quot;:\&quot;6\&quot;,\&quot;goods_name\&quot;:\&quot;25AA02E64T-I/OT\&quot;,\&quot;price\&quot;:0.1000,\&quot;quantity\&quot;:6}]&quot;}"
            >
            <input type="submit" value="立即支付">
          </form>
        </div>-->
      </div>
    </div>

    <!-- 已成功上传合同的模态框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogContract"
      width="800px"
      :show-close="false"
      class="successful-upload-contract"
      center
      :close-on-click-modal="false"
    >
      <p slot="title" class="title">您已成功上传合同</p>
      <div class="contract-body">
        <p>
          系统会在24小时内审核合同，您可在
          <span>'用户中心>我的订单>待付款'</span> 栏目中查看订单审核状态，系统会以短信、微信小程序、系统通知等方式通知您审核进程
        </p>
      </div>
      <span slot="footer" class="contract-footer">
        <router-link to="/PersonalCenter/BuyerOrderManagement" tag="span">去往我的订单</router-link>
        <router-link to="/ShoppingCart" tag="span">留在购物车</router-link>
        <router-link to="/" tag="span">返回首页</router-link>
      </span>
    </el-dialog>
    <!-- 预览合同 -->
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
  </div>
</template>
<style lang="less" scoped>
@import "./SignContract.less";
</style>

<script>

import "@/assets/css/label-checkbox.less";
import { mapState, mapActions } from "vuex";
import { baseURL, baseURL2 } from "@/config";
import { setTimeout } from "timers";
import pdf from "vue-pdf";
export default {
  name: "SignContract",
  data() {
    return {
      // 预览合同模态框
      dialogContractFlag: false,
      // 是否签合同
      contractValue: false,
      // 上传完合同提示的模态框
      dialogContract: false,
      // 下单以后返回来的信息
      orderNumber: "",
      // 是不是全款
      WholeParagraph: false,
      // 扫码支付模态框
      dialogCode: false,
      // 支付二维码的图片
      payCodeImgUrl: "",
      // 下载合同的连
      downloadUrl: "",
      // 合同
      downloadUrl2: "",
      // 下载合同的连接
      downloadUrl3: "",
      box: "",
      totalPrice: 0
    };
  },
  computed: {
    access_token() {
      return localStorage.getItem("access_token");
    },
    // 上传文件的地址
    uploadUrl() {
      return `${baseURL}api-order/customerCenter/uploadOrderContract`;
    },
    uploadObj() {
      return {
        orderno: this.orderNumber,
        access_token: this.access_token
      };
    }
  },
  components: {
    pdf
  },
  methods: {
    ...mapActions("SignContract", [
      "GetWeChatPay",
      "GetPayStatus",
      "GetQueryOrderTag",
      "GetdownLoadOrderContract",
      "GetAlipayPagePay"
    ]),
    // 上传成功的函数
    uploadSuccess(response, file, fileList) {
      this.$message({
        type: "success",
        message: "上传成功"
      });
    },
    // 上传合同
    beforeAvatarUpload(file) {
      const isJPG = file.type === "application/pdf";

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 pdf格式!");
      }
      return isJPG;
    },
    //下载合同
    async downLoadOrderContract() {
      this.dialogContractFlag = true;
      let res =
        baseURL2 +
        "static/pdf/web/viewer.html?file=" +
        encodeURIComponent(this.downloadUrl3);
      this.downloadUrl2 = res;
    },
    submit() {
      if (!this.contractValue) {
        this.dialogContract = true;
      } else {
        this.$router.push({
          path: "/ShoppingCart/PaymentOrders",
          query: {
            orderNumber: this.orderNumber,
            payType: 2,
            totalPrice: this.totalPrice
          }
        });
      }
    }
  },
  mounted() {
    console.log(this.$route.query.totalPrice);
    this.$store.state.shoppingCart.active = 3;
    this.orderNumber = this.$route.query.orderNumber;
    this.downloadUrl = this.$route.query.url;
    this.WholeParagraph = this.$route.query.flag;
    this.totalPrice = this.$route.query.totalPrice;
    // 拿到需要下载的合同
    let ret =
      baseURL +
      "api-order/customerCenter/downLoad?urls=" +
      this.downloadUrl +
      "&access_token=" +
      this.access_token;
      this.downloadUrl3 = ret;
  }
};
</script>

<style>
</style>
