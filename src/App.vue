<template>
  <div id="app">
    <div id="container" class="clear">
    <headTop id="HeaderBar" class="noprint"></headTop>
      <div id="content" class="clear" :class="headerFxed?'headerFxed':''">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <Footer class="noprint"></Footer>
      <side class="noprint"></side>
      <login v-if="showlogin"></login>
    </div>
    
  </div>
</template>
<script>
import login from "_c/login";
import side from "_c/side";
import Footer from "_c/Footer";
import headTop from "@/views/header"
import { mapActions,mapState,mapMutations,mapGetters} from "vuex";
export default {
  name: "app",
  data() {
    return {
      // UserInforma: ""
       isRouterAlive: true,
    };
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  components: {
    Footer,
    // Sidebar,
    headTop,
    side,
    login
  },
  methods: {
    ...mapActions("Login", ["GetUserInforma"]),
    ...mapMutations(['setloginState']),
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
  computed:{
    ...mapGetters([
      "showlogin"
      // ...
    ]),
    ...mapState({
      UserInforma:state => state.Login.UserInforma,
      headerFxed: state => state.headerFxed,
     // showlogin:state => state.showlogin
    })
  },
  mounted() {
    if (sessionStorage.getItem("access_token")) {
     // this.$store.state.loginState = true;
     this.setloginState(true)
    //  this.$store.dispatch("setloginState",true)
      this.GetUserInforma({
        access_token: sessionStorage.getItem("access_token")
      }).then(res => {
          //   this.UserInforma = res;
      });
    } else {
       this.setloginState(false)
    }
  }
};
</script>
<style lang="less" >
    html{
        height:100%;
        overflow-y: scroll;
    }
    body{
        overflow-y: auto;
        background: #fff!important;
        min-width:1080px;
    }
    .el-timeline{
    max-height: 400px;
    overflow-y:auto;
  }
    .allWidth{
        min-width:1024px;
        max-width:1200px;
        margin:0 auto;
        padding:0 30px;
        width:100%;
        box-sizing: border-box;
    }

    a{
        cursor: pointer;
        color:#2c7be6;
        text-decoration: none;
        &:hover{
            color:peru;
        }
    }
    strong{
        color:#FF5754;
    }
    img{
        vertical-align: middle;
    }
#app {
  .bgd5{
    background:#d5d5d5;
    color:#fff;
  }
  .peruBg{
    background: #fce9e5
  }
  .yellowBg{
    background:#F9C94B;
    color:#fff;
  }
  .yellowBorder{
    border: 1px solid #F9C94B;
  }
 
  .deepgreenBg{
    background: #4dcd99;
    color:#fff;
  }
   .greenColor{
     background:#8DD444;
     color:#fff;
   }
   .borderGreen{
      border:1px solid #8DD444;
   }
  
    .bgColor{
        background: #FF5754;
        color:#fff;
    }
    .borderColor{
      border:1px solid #FF5754;
    }
    
    .bgBlu{
      background:#1890FF;
      color:#fff;
    }
    .lightBgBlu{
      background: #59A5EB;
      color:#fff;
    }
    .bgpurple{
      background: #B196FF;
      color:#fff;
    }
    .borderBlu{
      border:1px solid #1890FF;
    }
   
    .bgOrange{
      background: #FF6300;
      color:#fff;
    }
    .borderOrange{
      border:1px solid #FF6300;
    }
    .bgGray{
        background:#4f4f4f ;
        color:#fff;
    }
    .bgLightGray{
        background: #d8d8d8;
        color:#999;
    }
    .gray{
     color:#999;
   }
    .orange{
      color:#FF6300;
    }
   .green{
     color:#529641;
   }
    .color{
        color:#FF5754;
    }
     .deepgreen{
    color:#4DCD99;
  }
    .blu{
     color:#1890FF;
    }
    color:#999;
    background: #f5f5f5;
    .defaultradioSquare .el-radio__inner{
      border-radius: 0;
      width:20px;
      height:20px;
    }
    .defaultradioSquare .el-checkbox__inner{
        width:20px;
        height:20px;
    }
    .defaultradioSquare .el-checkbox__inner::after{
        border:3px solid #fff;
        width:13px;
        height:4px;
        border-top-color:transparent;
        border-right-color: transparent;
        transform:rotate(-45deg)!important;
        left:0;
        top:0px;
        border-radius: 0;
        background:transparent;
    }
    .defaultradioSquare .el-radio__inner::after{
      border:3px solid #fff;
      width:13px;
      height:4px;
      border-top-color:transparent;
      border-right-color: transparent;
      transform:rotate(-45deg)!important;
      left:0;
      top:0px;
      border-radius: 0;
      background:transparent;
    }
  .el-button.default{
   display:block;
   width:50%;
   border:none;
   background:transparent;
   padding:0;
   margin-left:0;
   margin-top:10px;
    span{
    border:1px solid #409EFF;
    color:#409EFF;
    padding:5px 8px;
    font-size:14px;
    border-radius: 3px;
    background: #fff;
    a{
        color:#409EFF;
        text-decoration: none;
       &:hover{
           font-weight: bolder;
           color:peru;
           font-size:15px;
           background:#fff;
       }
    }
    &:hover{
        font-weight: bolder;
        color:peru;
        font-size:15px;
        background:#fff;
      }
    }

}
.el-button.cancle {
    display: block;
    width: 50%;
    border: none;
    background: transparent;
    padding: 0;
    margin-left: 0;
    margin-top: 10px;

    span {
        border: 1px solid #999;
        color: #999;
        padding: 5px 8px;
        font-size: 14px;
        border-radius: 3px;
        background: #fff;

        &:hover {
            font-weight: bolder;
            color: peru;
            font-size: 15px;
            background: #fff;
            border-color: peru;
        }
    }
}
    .el-button.primary {
        display: block;
        width: 50%;
        border: none;
        background: transparent;
        padding: 0;
        margin-left: 0;
        margin-top: 10px;
        span {
            border: 1px solid #409eff;
            color: #fff;
            padding: 5px 8px;
            font-size: 14px;
            border-radius: 3px;
            background: #409eff;
            &:hover {
                border-color: #409eff;
                font-weight: bolder;
                /*color: peru;*/
                font-size: 15px;
                background: #409eff;
                border-color: peru;
            }
        }
    }
    .el-button.info{
        display:block;
        width:50%;
        border:none;
        background:transparent;
        padding:0;
        margin-left:0;
        margin-top:10px;
        span{
            border:1px solid #a6a9ad;
            color:#fff;
            padding:5px 8px;
            font-size:14px;
            border-radius: 3px;
            background:#a6a9ad;
            &:hover{
                border-color:#d2d9df;
                font-weight: bolder;
                color:peru;
                font-size:15px;
                background:#d2d7de;
                border-color:peru;
            }
        }

    }
  .fr{
    float: right;
  }
  .fl{
    float: left;
  }
  .text_left{
    text-align:left;
  }
  .text-right{
    text-align: right;
  }
  .clear:after{
    display: block;
    content: "";
    clear: both;
  }
  label{
    font-weight: bolder;
  }
  // overflow: hidden;
  #container {
    width:100%;
    margin: 0 auto;
  }
    #content.headerFxed{
        margin-top:80px;
    }
  .router-link-exact-active {
    color: #df3f2f;
    font-weight:bold;
  }
  
}
</style>
