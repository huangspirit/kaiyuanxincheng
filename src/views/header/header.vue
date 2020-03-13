<template>
    <div class="header" :class="headerFxed?'headerFxed':''">
        <div class="header-c clear">
            <router-link to="/" tag="div" class="logo">
                <h1 class="logoText">{{title}}</h1>
                <div class="logowrap">
                    <img src="http://brand.113ic.com/8904e4fe85564325847710fe9d3f3277.jpg" alt>
                    <div>
                        <p class="text">{{title}}</p>
                        <p class="route">icmap.cn</p>
                    </div>
                </div>
               
            </router-link>
            <div class="searchInputWrap"  >
                <div v-if="headerFxed" class="inputwrap">
                    <HeaderSearch ref="HeaderSearch" :mini="true" ></HeaderSearch>
                </div>
                 
            </div>
            <div class="nav ">
                     <router-link to="/brand">原厂直营店</router-link>
                    <router-link to="/specialPrice">现货直通车</router-link>
                    <router-link to="/order">订货拼购区</router-link>
                    <router-link to="/oldGoods">呆料掘金池</router-link>
                     <!-- <router-link to="/chinaXin">中国芯</router-link> -->
                    <router-link to="/OriginalFactoryEntry" v-if="!UserInforma.userTagMap || (UserInforma.userTagMap && !UserInforma.userTagMap.seller)">商家入驻</router-link>
                </div>
            <div class="rightwrap clear">
                <!-- <div class="wrap ">
                    <router-link to="/InquiryBasket" class="busket"><i style="display:inline-block;height:15px; vertical-align: middle;"></i>询价篮</router-link>&nbsp;|&nbsp;
                    <router-link to="/ShoppingCart" class="shoppingCar"><i></i>购物车</router-link>&nbsp;|&nbsp;
                    <router-link to="/News"  class="messageCountWrap">
                    <i></i>
                        消息
                        <span v-if="UserInforma.messageCount" class="mess">{{UserInforma.messageCount}}</span>
                    </router-link>
                </div> -->
                <div class="login" v-if="!loginState" @click="uplogin">
                    登陆/注册
                </div>
                <!-- <router-link class="login" tag="div" to="/Login" v-if="!loginState">
                    快速登录
                </router-link> -->
                <div class="person-center " @click="PersonalCenter" v-if="loginState">
                    <img :src="UserInforma.headImgUrl" alt class="userImg">
                    <div class="PersonalCenter-con bgGray" >
                        <span  @click="signOut" style="cursor:pointer">退出账号</span>
                    </div>
                    <!-- <div class="PersonalCenter-con bgGray" v-if="UserInforma.userTagMap">
                        <p class="personInfo">
                            <span class="name">{{UserInforma.nickname}}</span>
                        </p>
                        <div v-if="UserInforma.userTagMap.tag" class="clear identity">
                            <div>
                                <span  class="type bgColor">{{UserInforma.userTagMap.tag | tagFilter}}</span>
                                <span class="type bgColor"  v-if="UserInforma.userTagMap.vip">月结用户</span>
                            </div>
                        </div>
                        <p class="account-number">
                            <router-link to="/PersonalCenter/PersonalData" tag="span">
                                <img src="@/assets/image/Login/u2031.png" alt>
                                账号设置
                            </router-link>
                            <span class="bar">|</span>
                            <span class="logout fr" @click="signOut">
                            <img src="@/assets/image/Login/u2025.png" alt>
                            退出账号
                        </span>
                        </p>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState ,mapMutations} from "vuex";
    export default {
        data(){
            return {

            }
        },
        mounted(){
            console.log("头部")
            console.log()
        },
        computed: {
            ...mapState({
                title: state => state.title,
                loginState: state => state.loginState,
                headerFxed: state => state.headerFxed,
                UserInforma:state => state.Login.UserInforma
            })
        },
        methods:{
            ...mapMutations([
                "setloginState",
                "setshowlogin"
            ]),
            ...mapMutations("Login",[
                "GetUserInforma"
            ]),
            uplogin(){
                this.setshowlogin(true)
            },
            // 退出登录
            signOut() {
                sessionStorage.removeItem("access_token");
                sessionStorage.removeItem("refresh_token");
                sessionStorage.removeItem("UserInforma");
                sessionStorage.removeItem("loginState");
               this.GetUserInforma({})
                this.$router.push({
                    path: "/"
                });
                this.flag = false;
                this.setloginState(false)
            },
            PersonalCenter() {
                this.$router.push({
                    path: "/PersonalCenter"
                });
            },
        }
    }
</script>
<style lang="less" scoped>
    @import "./header.less";
</style>
