<template>
  <div class="PersonalCenter" id="PersonalCenter">
    <div class="sideMenu">
      <sideMenu :list="list"></sideMenu>
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
import sideMenu from "../sideMenu"
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
            name:"SellerCenter",
          index: "1",
          path: "/PersonalCenter/SellerCenter",
          icon: require("@/assets/image/sidemenuicon/sellerCenter.png"),
          diabled: true,
          children: [
            {
              title: "订单管理",
                name:"SellerOrderManagement",
              index: "1_1",
              path: "/PersonalCenter/SellerOrderManagement",
              icon: require("@/assets/image/sidemenuicon/sellerorder.png")
            },
            {
              title: "商品管理",
              index: "1_2",
              path: "/PersonalCenter/SellerCommodityManagement",
              icon: require("@/assets/image/sidemenuicon/SellerCommodityManagement.png")
            },
            {
              title: "发布商品",
              index: "1_3",
              path: "/PersonalCenter/SellerIssuesProduct",
              icon: require("@/assets/image/sidemenuicon/SellerIssuesProduct.png")
            },
            {
                name:"inquiryList",
              title: "询价单列表",
              index: "1_4",
              path: "/PersonalCenter/inquiryList",
              icon: require("@/assets/image/sidemenuicon/inquiryList.png")
            },
            {
              title: "发票管理",
              index: "1_5",
              path: "/PersonalCenter/SellerInvoiceManagement",
              icon: require("@/assets/image/sidemenuicon/SellerInvoiceManagement.png")
            },
            {
              title: "账单中心",
              index: "1_6",
              name:'SellerBillCenter',
              path: "/PersonalCenter/SellerBillCenter",
              icon: require("@/assets/image/sidemenuicon/BuyerBillCenter.png")
            },
            {
              title: "代理资质",
              index: "1_7",
              path: "/PersonalCenter/AgencyQualification",
              icon: require("@/assets/image/sidemenuicon/AgencyQualification.png")
            }
          ]
        },
        {
          isShow: true,
          title: "买家中心",
          index: "2",
          name:"BuyerCenter",
          path: "/PersonalCenter/BuyerCenter",
          icon: require("@/assets/image/sidemenuicon/buyercenter.png"),
          children: [
            {
              title: "我的订单",
              index: "2_1",
              path: "/PersonalCenter/BuyerOrderManagement",
              icon: require("@/assets/image/sidemenuicon/BuyerOrderManagement.png")
            },
            {
              title: "关注的商品",
              index: "2_2",
              path: "/PersonalCenter/CommoditiesInterest",
              icon: require("@/assets/image/sidemenuicon/CommoditiesInterest.png")
            },
            {
              title: "关注的商家",
              index: "2_3",
              path: "/PersonalCenter/MerchantsConcerned",
              icon: require("@/assets/image/sidemenuicon/MerchantsConcerned.png")
            },
            {
              title: "我的询价",
              index: "2_4",
              path: "/PersonalCenter/myInquire",
              icon: require("@/assets/image/sidemenuicon/MerchantsConcerned.png")
            },
            {
              title: "账单中心",
              name:'BuyerBillCenter',
              index: "2_5",
              path: "/PersonalCenter/BuyerBillCenter",
              icon: require("@/assets/image/sidemenuicon/BuyerBillCenter.png"),
            },
            {
              title: "发票管理",
              index: "2_6",
              path: "/PersonalCenter/BuyerInvoiceManagement",
              icon: require("@/assets/image/sidemenuicon/SellerInvoiceManagement.png")
            },
            {
              title: "申请月结",
              name:'UpgradeLevel',
              index: "2_7",
              path: "/PersonalCenter/UpgradeLevel",
              icon: require("@/assets/image/sidemenuicon/UpgradeLevel.png")
            }
          ]
        },
        {
          isShow: true,
          title: "个人中心",
          index: "3",
          path: "/PersonalCenter",
          name:"PersonalCenter",
          icon: require("@/assets/image/sidemenuicon/personal.png"),
          children: [
             
            {
              title: "收货地址",
              index: "3_1",
              path: "/PersonalCenter/ShippingAddress",
              icon: require("@/assets/image/sidemenuicon/ShippingAddress.png")
            },
              {
                    title: "申请进度查询",
                    index: "3_2",
                    path: "/PersonalCenter/GetVipApplyDetail",
                    icon: require("@/assets/image/sidemenuicon/GetVipApplyDetail.png")
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

  components: {
    sideMenu
  },
  mounted() {
    var UserInforma = JSON.parse(sessionStorage.getItem("UserInforma"));
    this.list = this.list.map(item => {
      if (item.index == 1) {
        if (UserInforma.userTagMap) {
          item.isShow = UserInforma.userTagMap.seller;
          item.diabled = !UserInforma.userTagMap.seller;
          if(UserInforma.userTagMap.seller == true) {
            if(UserInforma.userTagMap.tag != 1) {
                item.children=item.children.map(item0=>{
                    if(item0.name=='inquiryList'){
                        item0.show="hidden"
                    }
                    if(item0.name=='SellerBillCenter'){
                      item0.isPassWord=true
                    }
                    return item0;
                })
            }else{
              item.children=item.children.map(item0=>{
                    if(item0.name=='SellerBillCenter'){
                      item0.isPassWord=true
                    }
                    return item0;
                })
            }
          }
        }
      }else if(item.index==2){
          if(!UserInforma.userTagMap.vip) {
              item.children= item.children.map(item0=>{
                  if(item0.name=='BuyerBillCenter'){
                      item0.show="hidden"
                  }
                  return item0;
              })

          }else if(UserInforma.userTagMap.vip){
            item.children= item.children.map(item0=>{
                  if(item0.name=='UpgradeLevel'){
                      item0.show="hidden"
                  }
                   if(item0.name=='BuyerBillCenter'){
                      item0.isPassWord=true
                  }
                  return item0;
              })
          }
      }
      return item;
    });
  }
};
</script>
