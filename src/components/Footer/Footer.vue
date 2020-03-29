
<template>
  <div id="Footer" class="bgGray">
    <div class="footer-con">
      <div class="footer-t">
        <ul class="" style="max-width:1600px;margin:0 auto;">
          <!-- <li>
            <img src="@/assets/image/footer/1.png" alt />
            <p>100,000+特价大放送</p>
          </li>
          <li>
            <img src="@/assets/image/footer/2.png" alt />
            <p>3000+商家入驻</p>
          </li>
          <li>
            <img src="@/assets/image/footer/3.png" alt />
            <p>5000+万产品收录</p>
          </li>
          <li>
            <img src="@/assets/image/footer/4.png" alt />
            <p>100+家原厂销售</p>
          </li> -->
          <li>
            <p class="mark color borderColor">多</p>
            <div>
              <h3>搜得到是核心</h3>
              <p class="desc gray">
                全球厂商 一一收录
              </p>
            </div>
          </li>
           <li>
            <p class="mark color borderColor">简</p>
            <div>
              <h3>简单快捷是关键</h3>
              <p class="desc gray">
                现货订货 可香港交货
              </p>
            </div>
          </li>
           <li>
            <p class="mark color borderColor">好</p>
            <div>
              <h3>原装正品是底线</h3>
              <p class="desc gray">
                原厂代理 直接入驻
              </p>
            </div>
          </li>
           <li>
            <p class="mark color borderColor">省</p>
            <div>
              <h3>价格便宜才是王道</h3>
              <p class="desc gray">
                没有差价 渠道穿透
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="footer-m allWidth clear">
        <div class="item">
          <p>新手上路</p>
          <ul>
            <router-link to="/footerWrap/signIn?index=1" tag="li">用户注册</router-link>
            <router-link to="/footerWrap/bindWeChat?index=1" tag="li">公众号绑定</router-link>
            <router-link to="/footerWrap/searchSpecial?index=1" tag="li">搜索特价</router-link>
            <router-link to="/footerWrap/createOrder?index=1" tag="li">如何下单</router-link>
            
          </ul>
        </div>
        <div class="item">
          <p>交易说明</p>
          <ul>
            <router-link to="/footerWrap/interDeliver?index=2" tag="li">交货周期</router-link>
            <router-link to="/footerWrap/hkDeliver?index=2" tag="li">交货地点</router-link>
             <router-link to="/footerWrap/payType?index=2" tag="li">支付方式</router-link>
          </ul>
          <!-- <ul>
            <router-link
              v-for="item in navmap[1]"
              :key="item.id"
              tag="li"
              :to="{
              path:'/footerNav',
              query:{
                id:item.id
              }
            }"
            >{{item.webName}}</router-link>
          </ul>-->
        </div>
        <div class="item">
          <p>商家支持</p>
          <ul>
             <router-link to="/footerWrap/publishSpe?index=3" tag="li">发布特价</router-link>
            <!-- <router-link to="/footerWrap/pulishPro?index=3" tag="li">发布产品</router-link> -->
            <router-link to="/footerWrap/hdeliver?index=3" tag="li">如何发货</router-link>
            <router-link to="/footerWrap/sellMoney?index=3" tag="li">售卖额度</router-link>
            <router-link to="/footerWrap/openbillProcess?index=3" tag="li">开票流程</router-link>
         
          </ul>
        </div>
        <div class="item">
          <p>会员中心</p>
          <ul>
            <router-link to="/footerWrap/viplevel?index=4" tag="li">用户等级</router-link>
            <router-link to="/footerWrap/jingDou?index=4" tag="li">晶豆</router-link>
            <router-link to="/footerWrap/monthWhitestrip?index=4" tag="li">月结白条</router-link>
            <router-link to="/footerWrap/monthquota?index=4" tag="li">月结额度</router-link>
            <router-link to="/footerWrap/billcenter?index=4" tag="li">账单中心</router-link>
          </ul>
        </div>
        <div class="item">
          <p>政策协议</p>
          <ul>
             <router-link to="/footerWrap/Registration?index=5" tag="li">《用户注册协议》</router-link>
             <router-link to="/footerWrap/Settlement?index=5" tag="li">《商家入驻协议》</router-link>
             <router-link to="/footerWrap/Buyandsell?index=5" tag="li">《购销框架协议》</router-link>
             <router-link to="/footerWrap/Privacyprotection?index=5" tag="li">《隐私保护政策》</router-link>
          </ul>
        </div>
        <div class="item contact">
          <p>联系我们</p>
          <ul>
            <li class="tel clear">
              <div class="clear">
                <div class="fl mark">
                  <i class="el-icon-phone-outline"></i>
                </div>
                <div class="clear fl">
                  <p>电话：</p>
                  <p class="num">400-888-2483</p>
                </div>
              </div>
              <div class="btn bgColor fl">服务热线</div>
            </li>
            <li>招商合作 : bd@icmap.cn</li>
            <li>官方微信 : 15701142448</li>
            <li>官方 &nbsp;QQ : 2702658732</li>
            <li>地 址：北京市海淀区安宁庄西路9号金泰富地大厦3层</li>
          </ul>
        </div>
        <div class="item code">
          <img src="@/assets/image/footer/minparam.jpg" alt />
          <p>小程序<i class="color" style="font-style:normal">(即将上线)</i></p>
          <img src="@/assets/image/footer/public.jpg" alt />
          <p>公众号</p>
        </div>
      </div>
      <div class="friendslink">
        <div>
          <ul class="allWidth">
            <!-- <li style="color:#fff;">友情链接:</li>
            <li>友台半导体</li>
            <li>IC网</li>
            <li>智能电子</li>
            <li>北京电子网</li>
            <li>盘古机械网</li>
            <li>电路板打样</li>
            <li>扫IC网</li>
            <li>码库网</li>
            <li>阻容1号</li>
            <li>中国PCB技术网</li>
            <li>中国PCB论坛</li>
            <li>51电子贸易网</li>
            <li>贴片电感</li>
            <li>华科代理</li>
            <li>芯片丝印反查网</li>
            <li>免费录屏软</li> -->
          </ul>
        </div>
        <p>©2019 北京晶圆电子有限公司  |  京ICP备13034140号-16 
          <!-- | 增值电信业务经营许可证:京B1-201602150 -->
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import "./Footer.less";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Footer",
  data() {
    return {
      isSeller: false,
      UserInforma: {},
      navmap: {}
    };
  },
  computed: {
    ...mapState({
      title: state => state.title,
      loginState: state => state.loginState
    })
  },
  mounted() {
    // this.getfooterNav({ isEnable: 1 }).then(res => {
    //   this.navmap = res.data;
    // });
    if (sessionStorage.getItem("access_token")) {
      this.setloginState(true);
      this.GetUserInforma({
        access_token: sessionStorage.getItem("access_token")
      }).then(res => {
        this.UserInforma = res;
        this.isSeller = this.UserInforma.userTagMap.seller;
      });
    } else {
      this.setloginState(false);
    }
  },
  methods: {
    ...mapActions("Login", ["GetUserInforma", "getfooterNav"]),
    ...mapMutations(["setloginState", "setshowlogin"]),

    chipAll() {
      this.$router.push("/");
    },
    chipCenter() {
      if (this.loginState) {
        this.$router.push("/PersonalCenter");
      } else {
        // this.$router.push("/Login");
        this.setshowlogin(true);
      }
    },
    settle() {
      //商家入驻
      if (this.loginState) {
        if (this.isSeller) {
          this.$message({
            message: "您已是" + this.title + "的商家，不能再次入驻！",
            type: "warning"
          });
          return;
        }
        this.$router.push("/OriginalFactoryEntry");
      } else {
        // this.$router.push("/Login");
        this.setshowlogin(true);
      }
    },
    publish() {
      //发布
      if (this.loginState) {
        if (this.isSeller) {
          this.$router.push("/PersonalCenter/SellerIssuesProduct");
        } else {
          this.$router.push("/OriginalFactoryEntry");
        }
      } else {
        //this.$router.push("/Login");
        this.setshowlogin(true);
      }
    },
    inquery() {
      //我的询价
      if (this.loginState) {
        this.$router.push("/PersonalCenter/myInquire");
      } else {
        //this.$router.push("/Login");
        this.setshowlogin(true);
      }
    }
  }
};
</script>
