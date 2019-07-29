<template>
  <!-- 个人设置 -->
  <div class="PersonalSet">
    <!-- 用户名和头像 -->
    <div class="user">
      <div class="username">
        <img :src="UserInforma.headImgUrl" class="head-portrait" alt>
        <div class="info">
          <p class="name">{{UserInforma.nickname}}</p>
          <p  class="type">{{UserInforma.userTagMap.tag | typeFilter}}</p>
        </div>
      </div>
    </div>
    <!-- 个人信息设置 -->
    <ul class="informa-set">
      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u65597.png" alt>
          </span>
          <span>我的等级：</span>
          <span class="red">{{UserInforma.userTagMap.userLevel}}</span>
        </div>
        <router-link to='/PersonalCenter/UpgradeLevel' tag="span">提升等级</router-link>
      </li>
      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u133711.png" alt>
          </span>
          <span>手&nbsp;机&nbsp;号：</span>
          <span style="margin-right:20px">{{UserInforma.phone}}</span>
          <!-- <span>
            <img src="@/assets/image/PersonalCenter/u133715.png" alt>已绑定1
          </span>-->
          <span>
            <img src="@/assets/image/PersonalCenter/u133720.png" alt>
            {{UserInforma.bindWeChat ? '已绑定' : '未绑定'}}
          </span>
        </div>
        <router-link to="/PersonalCenter/PersonalData" tag="span">修改</router-link>
      </li>
      <li v-if="UserInforma.userTagMap && UserInforma.userTagMap.seller && UserInforma.userTagMap.tag!=1">
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u26343.png" alt>
          </span>
          <span>售卖额度：</span>
          <span class="red" >￥{{UserInforma.userTagMap['credit-seller']}}</span>
           <span>剩余售卖额度：</span>
          <span class="red" >￥{{UserInforma.userTagMap['restcredit-seller']}}</span>
        </div>
        <!-- <span>详情</span> -->
      </li>
      <li v-if="UserInforma.userTagMap.vip">
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u65597.png" alt>
          </span>
          <span>购买额度：</span>
          <span class="red">
            ￥{{UserInforma.userTagMap['credit-vip']}}
          </span>
          <span>剩余购买额度：</span>
          <span class="red">
            ￥{{UserInforma.userTagMap['restcredit-vip']}}
          </span>
        </div>

        <router-link to="/PersonalCenter/CredibiliForehead" tag="span">详情</router-link>
      </li>
      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u133700.png" alt>
          </span>
          <span>押&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：</span>
          <span class="red">￥0</span>
        </div>
         <!-- <router-link to="/PersonalCenter/CredibiliForehead" tag="span">充值</router-link> -->
      </li>
      <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u37900.png" alt>
          </span>
          <span>收货地址：</span>
          <span v-if="defaultAddress.receivingName" class="detailAddress">
            <span>{{defaultAddress.receivingName}}</span>
            <span> {{defaultAddress.phone}}</span>
            <span>{{defaultAddress.address}}</span>
            <span>{{defaultAddress.detailedAddress}}</span>
          </span>
          <span v-else>暂无收货地址</span>
        </div>
        <router-link tag="span" to='/PersonalCenter/ShippingAddress'>管理收货地址</router-link>
      </li>
      <!-- <li>
        <div>
          <span>
            <img src="@/assets/image/PersonalCenter/u37838.png" alt>
          </span>
          <span>提醒设置：</span>
          <span>系统通知</span>
          <span>短信通知</span>
        </div>
        <span>设置</span>
      </li> -->
    </ul>
  </div>
</template>
<style lang="less" scoped>
  @import "./PersonalSet.less";
</style>
<script>
import {mapState,mapActions} from "vuex"
export default {
  name: "PersonalSet",
  data() {
    return {
      //默认的用户收货地址
      defaultAddress:{}
      // 用户的信息
     // UserInforma: {},
      // 用户的map
     // userTagMap: {}
    };
  },
  computed: {
    ...mapState({
      "UserInforma":state=>state.Login.UserInforma
    }),
    // access_token() {
    //   return sessionStorage.getItem("access_token");
    // }
  },
  filters:{
    typeFilter(val){
      switch (val){
        case 1:
          return '原厂';
        case 2:
          return '代理商';
        case 3:
          return '普通商家'
      }
    }
  },
  mounted() {
    this.$store.dispatch("Login/GetUserInforma")
    this.GetAllAddress()

  },
  methods:{
    ...mapActions('ShippingAddress',[
      "GetAllReceivingAddress"
    ]),
    GetAllAddress(){
        this.GetAllReceivingAddress({
                start: 0,
                length: 10
              }).then(res=>{
                console.log(res)
                if(res.total>0){
                  let obj= res.data.find(item=>item.isdefault)
                  if(obj){
                    this.defaultAddress=obj
                  }else{
                    this.defaultAddress=res.data[0]
                  }
                  console.log(this.defaultAddress)
                }

              })
    }

  }
};
</script>

<style>
</style>
