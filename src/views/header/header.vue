<template>
    <div class="header" :class="headerFxed?'headerFxed':''">
        <div class="header-c clear">
            <router-link to="/" tag="div" class="logo">
                <h1 class="logoText">芯手网</h1>
                <img src="@/assets/logo.png" alt>
            </router-link>
            <div class="searchInputWrap">
                <HeaderSearch v-if="headerFxed" ref="HeaderSearch" :mini="true"></HeaderSearch>
            </div>
            <div class="rightwrap clear">
                <div class="nav ">
                    <router-link to="/specialPrice">现货特价</router-link>
                    <router-link to="/Brand">原厂直供</router-link>
                    <router-link to="/order">订货拼单</router-link>
                    <router-link to="/oldGoods">呆料掘金</router-link>
                    <router-link to="/OriginalFactoryEntry"
                                 v-if="!(UserInforma && UserInforma.userTagMap && UserInforma.userTagMap.seller)">
                        商家入驻</router-link>

                    <!--                <router-link to="/Brand" v-if="loginState">品牌</router-link>-->
                </div>
                <div class="wrap ">
                    <router-link to="/InquiryBasket">询价篮</router-link>&nbsp;|&nbsp;
                    <router-link to="/ShoppingCart">购物车</router-link>&nbsp;|&nbsp;
                    <router-link to="/News"  class="messageCountWrap">
                        消息
                        <span v-if="UserInforma.messageCount" class="mess">{{UserInforma.messageCount}}</span>
                    </router-link>
                </div>
                <router-link class="login" tag="div" to="/Login" v-if="!loginState">
                    快速登录
                    <!--                <img src="@/assets/image/home/u1874.png" alt>-->
                </router-link>
                <div class="person-center " @click="PersonalCenter" v-if="loginState">
                    <img :src="UserInforma.headImgUrl" alt class="userImg">
                    <div class="PersonalCenter-con bgGray" v-if="UserInforma.userTagMap">
                        <p class="personInfo">
                            <span class="tel fr color">{{UserInforma.phone}}</span>
                            <span class="name">{{UserInforma.nickname}}</span>
                        </p>
                        <div v-if="UserInforma.userTagMap.tag" class="clear identity">
                            <div>
                                <span class="type bgColor" v-if="UserInforma.userTagMap.tag === 1">原厂</span>
                                <span class="type bgColor" v-if="UserInforma.userTagMap.tag === 2">代理商</span>
                                <span class="type bgColor" v-if="UserInforma.userTagMap.tag === 3">普通商户</span>
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
                    </div>
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
        mounted(){},
        computed: {
            ...mapState({
                loginState: state => state.loginState,
                headerFxed: state => state.headerFxed,
                UserInforma:state => state.Login.UserInforma
            })
        },
        methods:{
            ...mapMutations([
                "setloginState"
            ]),
            ...mapMutations("Login",[
                "GetUserInforma"
            ]),
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
