
<template>
  <div id="Footer" class="bgGray">
    <div class="footer-con">
      <div class="footer-t">
        <ul class="allWidth">
          <li>
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
          </li>
        </ul>
      </div>
      <div class="footer-m allWidth clear">
        <div class="item">
          <p>站点导航</p>
          <ul>
            <!-- <li>bom</li> -->
            <!-- <li>申请特价</li> -->
            <li @click="inquery">我的询价</li>
            <li @click="settle" v-if="!isSeller">厂商入驻</li>
            <li @click="publish">我要售卖</li>
            <!-- <li >咨询中心</li> -->
            <li @click="chipAll">产品大全</li>
            <li @click="chipCenter">用户中心</li>
          </ul>
        </div>
        <div class="item">
          <p>使用帮助</p>
          <ul>
            <!-- <li>下单流程</li>
            <li>售后说明</li>
            <li>发票开具规则</li>
            <li>注册方式</li>
            <li>忘记密码怎么办</li>
            <li>如何上传库存</li>
            <li>怎么更新库存</li>-->
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
          </ul>
        </div>
        <div class="item" style="margin-right:13%;">
          <p>关于我们</p>
          <ul>
            <router-link
              v-for="item in navmap[2]"
              :key="item.id"
              tag="li"
              :to="{
              path:'/footerNav',
              query:{
                id:item.id
              }
            }"
            >{{item.webName}}</router-link>
            <!-- <li>关于我们</li>
            <li>用户协议</li>
            <li>版权政策</li>
            <li>免责声明</li>
            <li>权利通知</li>-->
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
                  <p class="num">400-871-6266</p>
                </div>
              </div>
              <div class="btn bgColor fl">服务热线</div>
            </li>
            <li>商务合作 : bd@163.com</li>
            <li>官方微信 : 3333333333</li>
            <li>Q Q群: 13811683823</li>
            <li>地 址：北京市海淀区xxxxxxxxxxxxxxxxx</li>
          </ul>
        </div>
        <div class="item code">
          <img src="@/assets/image/footer/u1697.png" alt />
          <p>小程序</p>
          <img src="@/assets/image/footer/u1697.png" alt />
          <p>公众号</p>
        </div>
      </div>
      <div class="friendslink">
        <div>
          <ul class="allWidth">
            <li style="color:#fff;">友情链接:</li>
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
            <li>免费录屏软</li>
          </ul>
        </div>
        <p>©2019 北京市芯手网科技有限公司 ALL RIGHTS RESERVED | 京ICP备172114931号 | 增值电信业务经营许可证:京B1-201602150</p>
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
    this.getfooterNav({ isEnable: 1 }).then(res => {
      this.navmap = res.data;
    });
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
    ...mapMutations(["setloginState","setshowlogin"]),

    chipAll() {
      this.$router.push("/");
    },
    chipCenter() {
      if (this.loginState) {
        this.$router.push("/PersonalCenter");
      } else {
       // this.$router.push("/Login");
       this.setshowlogin(true)
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
       this.setshowlogin(true)
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
        this.setshowlogin(true)
      }
    },
    inquery() {
      //我的询价
      if (this.loginState) {
        this.$router.push("/PersonalCenter/myInquire");
      } else {
        //this.$router.push("/Login");
        this.setshowlogin(true)
      }
    }
  }
};
</script>
