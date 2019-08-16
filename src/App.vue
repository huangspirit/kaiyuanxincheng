<template>
  <div id="app">
    <div id="container" class="clear">
    <headTop id="HeaderBar" ></headTop>

      <div id="content" class="clear" :class="headerFxed?'headerFxed':''">
            <router-view v-if="isRouterAlive"/>
      </div>
      <Footer></Footer>
      <Sidebar></Sidebar>
    </div>
  </div>
</template>
<script>
import Footer from "_c/Footer";
import Sidebar from "_c/Sidebar";
//import headTop from "_c/headTop";
import headTop from "@/views/header"
import { mapActions,mapState,mapMutations} from "vuex";
export default {
  name: "app",
  data() {
    return {
      // UserInforma: ""
       isRouterAlive: true
    };
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  components: {
    Footer,
    Sidebar,
    headTop,
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
    ...mapState({
      UserInforma:state=>state.UserInforma,
      headerFxed: state => state.headerFxed,
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
           console.log("根據access_token獲取用戶信息:",res)
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
    .allWidth{
        min-width:800px;
        max-width:1200px;
        margin:0 auto;
    }
    .color{
        color:#df3f2f;
    }
    .bgColor{
        background: #df3f2f;
        color:#fff;
    }
    .bgGray{
        background:#4f4f4f ;
    }
    a{
        cursor: pointer;
        color:#0d94fb;
        text-decoration: none;
        &:hover{
            color:peru;
        }
    }
    strong{
        color:#f40;
    }
    img{
        vertical-align: middle;
    }
#app {
    img{
        vertical-align: middle;
    }
    color:#999;
    font-family:"Microsoft YaHei"!important;
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
