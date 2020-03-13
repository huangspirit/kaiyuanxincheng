<template>
    <div class="originFactoryEntry" :style="`height:${this.contHeight}px`">
        <router-link to="/OriginalFactoryEntry/BasicInforma">
        <div class="wrap">
            <p class="one">- - I C M A P .C N - -</p>
            <h1>入驻大麦晶城</h1>
            <div class="two">
                <p>0 差 价，你 的 价 格 你 做 主 ！</p>
                </div>
            <p class="three">国内交货0费率，香港交货提供一站式物流报关服务</p>
        </div>
            <img src="@/assets/image/OriginalFactoryEntry/bg2.jpg" alt=""  >
        </router-link>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data(){
        return {
            contHeight:1000
        }
    },
    created() {
        console.log(window.screen.height)
        this.contHeight=window.screen.height-180;
       
    },
    methods:{
         ...mapMutations("OriginalFactoryEntry", ["setJoinForm"]),
    },
    mounted(){
           this.setJoinForm({});
    }
}
</script>
<style scoped lang="less">
.originFactoryEntry{
    position: relative;
    .wrap{
        position: absolute;
        top:40%;
        left:50%;
        transform: translate(-50%,-50%);
        text-align:center;
        color:#fff;
        .one{
            font-size:3.5vw;
        }
        h1{
            font-size:6.5vw;
            padding:10px 50px 50px;
            white-space: nowrap;
        }
        .two{
            font-size:2vw;
            font-family: 楷体,楷体_GB2312;
            display: flex;
            margin-bottom:6vh;
            p{
                background: #FFF;
                height:4vw;
                line-height:4vw;
                color:#c33f4c;
                width:110%;
            }
           
            &:before{
                display:block;
                content:"";
                border:2vw solid #fff;
                height:0;
                width:0;
                border-left-color: transparent;
                margin-right:-1px;
            }
            &:after{
                display:block;
                content:"";
                border:2vw solid #fff;
                height:0;
                width:0;
                border-right-color: transparent;
                margin-left:-1px;
            }
        }
        .three{
            margin-top:30px;
            font-size:1vw;
        }
    }
    img{
        width:100%;
        height:100%;
    }
}
</style>
