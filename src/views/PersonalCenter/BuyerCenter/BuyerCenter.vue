<template>
  <div>
    <div class="BuyerCenter">
      <!-- 个人信息 -->
      <div class="personal-information">
        <div class="personal-information-l clear">
          <!-- 名字信息 -->
          <div class="img fl">
            <img :src="UserInforma.headImgUrl" alt>
<!--              <p><span>编辑资料</span></p>-->
          </div>
          <div class="text fl">
            <p class="name">{{UserInforma.nickname}}</p>
            <p class="tag" v-if="UserInforma.userTagMap.seller">
                <span>{{UserInforma.userTagMap.tag | typeFilter}}</span>
            </p>
            <p class="tel">{{UserInforma.phone}}</p>
          </div>
        </div>
        <div class="personal-information-r">
          <p class="tit">买家中心</p>
          <div class="certifica-lines">
            <!-- 未认证 -->
            <!-- <div class="unauthorized">
            <span>
              <img src="@/assets/image/PersonalCenter/u24984.png" alt>
              认证状态
            </span>
            <span class="no-rz">未认证</span>
            <span class="go-rz">去认证</span>
            </div>-->
            <!-- 已认证 -->
<!--            <div class="certified">-->
<!--              <span>-->
<!--                <img src="@/assets/image/PersonalCenter/u26343.png" alt>-->
<!--                我的余额-->
<!--              </span>-->
<!--              <span class="num">￥50000</span>-->
<!--              <span class="top-up">充值</span>-->
<!--            </div>-->
            <!-- 额度 -->
            <!-- <div class="lines">
            <span>
              <img src="@/assets/image/PersonalCenter/u53657.png" alt>
              我的信誉额度
            </span>
            <span class="num">￥50000</span>
            <span class="about">关于信誉额</span>
            </div>-->
          </div>
        </div>
      </div>
      <!-- 商品状态 -->
        <ul class="goods-state">
            <router-link tag="li" :to="item.path" v-for="(item,index) in messageCount" :key="index">
                <div class="img">
                    <img :src="item.imgUrl" alt>
                </div>
                <p>{{item.name}}</p>
                <p class="num">{{item.num}}</p>
            </router-link>
<!--            <router-link tag="li" to="BuyerOrderManagement">-->
<!--                <div class="img">-->
<!--                    <img src="@/assets/image/PersonalCenter/u37206.png" alt>-->
<!--                </div>-->
<!--                <p>我的订单</p>-->
<!--                <p class="num">11</p>-->
<!--            </router-link>-->


        </ul>
      <!-- 品牌入驻 -->
<!--      <div class="brands">-->
<!--        <span>品牌入驻</span>-->
<!--      </div>-->
    </div>
  </div>
</template>
<script>
import {mapActions } from "vuex";
import {axios,personCenter} from "../../../api/apiObj";
export default {
  name: "BuyerCenter",
  data(){
    return {
        UserInforma:{
            userTagMap:{}
        },
        messageCount:{
            orderCount:{
                name:'我的订单',
                imgUrl:require('@/assets/image/PersonalCenter/u37206.png'),
                num:0,
                path:'BuyerOrderManagement'
            },
            sgoods:{
                name:'询价篮',
                imgUrl:require('@/assets/image/PersonalCenter/u37824.png'),
                num:0,
                path:'/InquiryBasket/Inquiry/waitInquiry'
            },
            ssller:{
                name:'购物车',
                imgUrl:require('@/assets/image/PersonalCenter/u25552.png'),
                num:0,
                path:'/ShoppingCart'
            },
            fgoods:{
                name:'关注商品',
                imgUrl:require('@/assets/image/PersonalCenter/u37868.png'),
                num:0,
                path:'CommoditiesInterest'
            },
            message:{
                name:'我的消息',
                imgUrl:require('@/assets/image/PersonalCenter/u37838.png'),
                num:0,
                path:'/News'
            },
            fsller:{
                name:'关注商家',
                imgUrl:require('@/assets/image/PersonalCenter/u37882.png'),
                num:0,
                path:'MerchantsConcerned'
            },
          address:{
              name:'收货地址',
                  imgUrl:require('@/assets/image/PersonalCenter/u37900.png'),
              num:12,
              path:'/PersonalCenter/ShippingAddress'
          }
        },
    }
  },
    filters:{
        typeFilter(val) {
            switch (val) {
                case 1:
                    return "原厂";
                case 2:
                    return "代理商";
                case 3:
                    return "认证商";
            }
        }
    },
    methods:{
        ...mapActions("Login",[
            "GetUserInforma"
        ]),
        all() {
            this.GetUserInforma().then(res => {
                this.UserInforma=res;
            });
        },
        queryCustomerCenterSummary(){
          axios.request(personCenter.queryCustomerCenterSummary).then(res=>{
              console.log(res)
              let obj=res.data;
              Object.keys(res.data).forEach(item=>{
                    console.log(item)
                  this.$set(this.messageCount[item],'num',obj[item])
              })
          })
        },
    },
    mounted(){
        this.all()
        this.queryCustomerCenterSummary()
    }
};
</script>

<style lang="less" scoped>
  @import "./BuyerCenter.less";
</style>
