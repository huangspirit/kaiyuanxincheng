<template>
  <div class="PersonalCenter" id="PersonalCenter">
    <div class="sideMenu">
      <SideMenu :list="list"></SideMenu>
    </div>
    <div class="content">
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./PersonalCenter.less";
</style>

<script>
import SideMenu from "_c/SideMenu";
import { mapState } from "vuex";
import { stat } from "fs";
export default {
  name: "PersonalCenter",
  data() {
    return {
      list: [
        {
          isShow: false,
          title: "卖家中心",
          index: "1",
          path: "/PersonalCenter/SellerCenter",
          icon: require("@/assets/image/PersonalCenter/u37925.png"),
          diabled: true,
          children: [
            {
              title: "订单管理",
              index: "1-1",
              path: "/PersonalCenter/SellerOrderManagement",
              icon: require("@/assets/image/PersonalCenter/u10006.png")
            },
            {
              title: "商品管理",
              index: "1-2",
              path: "/PersonalCenter/SellerCommodityManagement",
              icon: require("@/assets/image/PersonalCenter/u37933.png")
            },
            {
              title: "发布商品",
              index: "1-3",
              path: "/PersonalCenter/SellerIssuesProduct",
              icon: require("@/assets/image/PersonalCenter/u28037.png")
            },
            {
              title: "询价单列表",
              index: "1-4",
              path: "/PersonalCenter/inquiryList",
              icon: require("@/assets/image/PersonalCenter/u28037.png")
            },
            {
              title: "发票管理",
              index: "1-5",
              path: "/PersonalCenter/SellerInvoiceManagement",
              icon: require("@/assets/image/PersonalCenter/u38134.png")
            },
            {
              title: "账单中心",
              index: "1-6",
              path: "/PersonalCenter/SellerBillCenter",
              icon: require("@/assets/image/PersonalCenter/u28045.png")
            },
            {
              title: "代理资质",
              index: "1-7",
              path: "/PersonalCenter/AgencyQualification",
              icon: require("@/assets/image/PersonalCenter/u28045.png")
            }
          ]
        },
        {
          isShow: true,
          title: "买家中心",
          index: "2",
          path: "/PersonalCenter/BuyerCenter",
          icon: require("@/assets/image/PersonalCenter/u9664.png"),
          children: [
            {
              title: "我的订单",
              index: "2-1",
              path: "/PersonalCenter/BuyerOrderManagement",
              icon: require("@/assets/image/PersonalCenter/u10006.png")
            },
            // {
            //   title: "我的购物车",
            //   index: "2-2",
            //   path: "/ShoppingCart",
            //   icon: require("@/assets/image/PersonalCenter/u37933.png")
            // },
            // {
            //   title: "我的询价篮",
            //   index: "2-3",
            //   path: "/InquiryBasket",
            //   icon: require("@/assets/image/PersonalCenter/u28037.png")
            // },
            // {
            //   title: "我的BOM",
            //   index: "2-4",
            //   path: "/InquiryBasket",
            //   icon: require("@/assets/image/PersonalCenter/b_2342.png")
            // },
            {
              title: "关注的商品",
              index: "2-3",
              path: "/PersonalCenter/CommoditiesInterest",
              icon: require("@/assets/image/PersonalCenter/u9664.png")
            },
            {
              title: "关注的商家",
              index: "2-4",
              path: "/PersonalCenter/MerchantsConcerned",
              icon: require("@/assets/image/PersonalCenter/u37925.png")
            },
            {
              title: "账单中心",
              index: "2-5",
              path: "/PersonalCenter/BuyerBillCenter",
              icon: require("@/assets/image/PersonalCenter/u28045.png")
            },
            {
              title: "发票管理",
              index: "2-6",
              path: "/PersonalCenter/BuyerInvoiceManagement",
              icon: require("@/assets/image/PersonalCenter/u38134.png")
            },
            {
              title: "申请月结",
              index: "2-7",
              path: "/PersonalCenter/UpgradeLevel",
              icon: require("@/assets/image/PersonalCenter/u44756.png")
            }
          ]
        },
        {
          isShow: true,
          title: "个人中心",
          index: "3",
          path: "/PersonalCenter/PersonalSet",
          icon: require("@/assets/image/PersonalCenter/u1874.png"),
          children: [
            {
              title: "个人资料",
              index: "3-1",
              path: "/PersonalCenter/PersonalData",
              icon: require("@/assets/image/PersonalCenter/u37980.png")
            },
            // {
            //   title: "账户余额",
            //   index: "3-2",
            //   path: "/PersonalCenter/AccountBalance",
            //   icon: require("@/assets/image/PersonalCenter/u28045.png")
            // },
            {
              title: "我的信誉额",
              index: "3-3",
              path: "/PersonalCenter/CredibiliForehead",
              icon: require("@/assets/image/PersonalCenter/u10011.png")
            },
            {
              title: "收货地址",
              index: "3-4",
              path: "/PersonalCenter/ShippingAddress",
              icon: require("@/assets/image/PersonalCenter/u37960.png")
            },
              {
                    title: "申请结果",
                    index: "3-5",
                    path: "/PersonalCenter/GetVipApplyDetail",
                    icon: require("@/assets/image/PersonalCenter/u38134.png")
              }
            // {
            //   title: "个人发票",
            //   index: "3-5",
            //   path: "/PersonalCenter/PersonalInvoice",
            //   icon: require("@/assets/image/PersonalCenter/u38134.png")
            // },
            // {
            //   title: "账号绑定",
            //   index: "3-6",
            //   path: "/PersonalCenter/AccountBind",
            //   icon: require("@/assets/image/PersonalCenter/u6221.png")
            // },

            // {
            //   title: "更改密码",
            //   index: "3-7",
            //   path: "/PersonalCenter/ChangePassword",
            //   icon: require("@/assets/image/PersonalCenter/u37968.png")
            // },
            // {
            //   title: "提醒设置",
            //   index: "3-8",
            //   path: "/PersonalCenter/RemindSet",
            //   icon: require("@/assets/image/PersonalCenter/u37972.png")
            // }
          ]
        }
      ]
    };
  },
  created() {},
  components: {
    SideMenu
  },
  computed: {},
  mounted() {
    var UserInforma = JSON.parse(sessionStorage.getItem("UserInforma"));
    this.list = this.list.map(item => {
      if (item.index == 1) {
        if (UserInforma.userTagMap) {
          item.isShow = UserInforma.userTagMap.seller;
          item.diabled = !UserInforma.userTagMap.seller;
          if(UserInforma.userTagMap.seller == true) {
            if(UserInforma.userTagMap.tag != 1) {
                 item.children.splice(3,1)
            }
          }
        }
      }
      return item;
    });
  }
};
</script>
