<template>
  <div>
    <div class="BuyerCenter">
      <!-- 个人信息 -->
<!--      <div class="personal-information">-->
<!--        <div class="personal-information-l clear">-->
<!--          &lt;!&ndash; 名字信息 &ndash;&gt;-->
<!--          <div class="img fl">-->
<!--            <img :src="UserInforma.headImgUrl" alt>-->
<!--&lt;!&ndash;              <p><span>编辑资料</span></p>&ndash;&gt;-->
<!--          </div>-->
<!--          <div class="text fl">-->
<!--            <p class="name">{{UserInforma.nickname}}</p>-->
<!--            <p class="tag" v-if="UserInforma.userTagMap.seller">-->
<!--                <span>{{UserInforma.userTagMap.tag | typeFilter}}</span>-->
<!--            </p>-->
<!--            <p class="tel">{{UserInforma.phone}}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="personal-information-r">-->
<!--          <p class="tit">买家中心</p>-->
<!--        </div>-->
<!--      </div>-->
        <div class="user clear">
            <div class="username clear fl">
                <img :src="UserInforma.headImgUrl" class="head-portrait fl" alt />
                <div class="info fl">
                    <p class="name">{{UserInforma.nickname}}</p>
                    <p>
                        <span  class="type color"  v-if="UserInforma.userTagMap.vip">月结用户</span>
                        <span  class="type color" v-if="UserInforma.userTagMap.seller">{{UserInforma.userTagMap.tag | typeFilter}}</span>
                        <router-link to="/OriginalFactoryEntry" tag="span"  class="type color" v-if="!UserInforma.userTagMap.seller">申请入驻</router-link>
                    </p>
                    <p>信用等级：{{UserInforma.userTagMap.userLevel}}</p>
                </div>
            </div>
            <div class="right">
                <p class="title">我的钱包</p>
                <ul>
                    <li>
                        <p>￥<span>{{UserInforma.userTagMap.wallet}}</span></p>
                        <p class="desc">钱包余额</p>
                        <p>
<!--                            <a href="javascript:;" @click="withDraw" v-if="UserInforma.userTagMap.wallet>10">提现</a>&nbsp;&nbsp;-->
<!--                            <a v-if="UserInforma.userTagMap.wallet>10">|&nbsp;&nbsp;</a>-->
<!--                            <router-link to="/PersonalCenter/withdraw" >提现管理</router-link>&nbsp;&nbsp;-->
<!--                            <a>|&nbsp;&nbsp;</a>-->
                            <router-link to="/PersonalCenter/buyerDetailList" >明细</router-link>
                        </p>
                    </li>
                    <li>
                        <p>￥{{UserInforma.userTagMap.deposit}}</p>
                        <p class="desc">押金</p>
                        <p>
<!--                            <router-link to="/PersonalCenter/deposit" >充值</router-link>&nbsp;&nbsp; <a>|&nbsp;&nbsp;</a>-->
                            <router-link to="/PersonalCenter/depositDetailList" >明细</router-link>
                        </p>
                    </li>
                    <li>
                        <p>￥{{UserInforma.userTagMap.baseCredit?UserInforma.userTagMap.baseCredit:0}}</p>
                        <p class="desc">基础额度</p>
                    </li>
                </ul>
            </div>
        </div>
      <!-- 商品状态 -->
        <ul class="goods-state">
            <router-link tag="li" :to="item.path" v-for="(item,index) in messageCount" :key="index">
                <div>
<!--                    <div class="img">-->
<!--                        <img :src="item.imgUrl" alt>-->
<!--                    </div>-->
                    <p class="name">{{item.name}}</p>
                    <template>
                        <p class="desc" v-if="item.num">
                            您有<span class="color">{{item.num}}</span>{{item.desc}}
                        </p>
                        <p v-else class="desc">
                            {{item.nocont}}
                        </p>
                    </template>
                    <p class="num">{{item.num}} <i class="el-icon-arrow-right fr"></i>    </p>
                </div>
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
                path:'BuyerOrderManagement',
                desc:'个订单，点击查看',
                nocont:"您还没有下过订单呦"
            },
            sgoods:{
                name:'询价篮',
                imgUrl:require('@/assets/image/PersonalCenter/u37824.png'),
                num:0,
                path:'/InquiryBasket/Inquiry/waitInquiry',
                desc:"个询价，点击查看",
                nocont:"您还未做任何商品询价"
            },
            ssller:{
                name:'购物车',
                imgUrl:require('@/assets/image/PersonalCenter/u25552.png'),
                num:0,
                path:'/ShoppingCart',
                desc:"个商品躺在购物车中，点击查看",
                nocont:"购物车空空如也"
            },
            fgoods:{
                name:'关注商品',
                imgUrl:require('@/assets/image/PersonalCenter/u37868.png'),
                num:0,
                path:'CommoditiesInterest',
                desc:"个关注的商品，点击查看",
                nocont:"您还没有关注任何商品，继续逛逛吧"
            },
            message:{
                name:'我的消息',
                imgUrl:require('@/assets/image/PersonalCenter/u37838.png'),
                num:0,
                path:'/News',
                desc:"条信息，点击查看",
                nocont:"您还没有任何信息呢"
            },
            fsller:{
                name:'关注商家',
                imgUrl:require('@/assets/image/PersonalCenter/u37882.png'),
                num:0,
                path:'MerchantsConcerned',
                desc:"个关注的商家，点击查看",
                nocont:"您还没有关注任何商家，继续逛逛吧"
            },
          address:{
              name:'收货地址',
                  imgUrl:require('@/assets/image/PersonalCenter/u37900.png'),
              num:12,
              path:'/PersonalCenter/ShippingAddress',
              desc:"个收货地址，点击管理",
              nocont:"您还没有收货地址呢，点击添加"
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
              let obj=res.data;
              Object.keys(res.data).forEach(item=>{
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
