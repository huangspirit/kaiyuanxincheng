<template>
  <div id="app">
    <div id="container" class="clear">
      <headTop id="HeaderBar" ></headTop>
      <div id="content" class="clear">
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
import headTop from "_c/headTop";
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
    headTop
  },
  methods: {
    ...mapActions("Login", ["GetUserInforma"]),
    ...mapMutations(['setloginState']),
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  computed:{
    ...mapState({
      UserInforma:state=>state.UserInforma
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
        //this.UserInforma = res;
      });
    } else {
      // this.$store.state.loginState = false;
       this.setloginState(false)
      // this.$store.dispatch("setloginState",false)
    }
  }
};
</script>
<style lang="less" >
    a{
        cursor: pointer;
        color:#0d94fb;
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
background:#f4f4f4;
.defaultradioSquare .el-radio__inner{
  border-radius: 0;
  width:20px;
  height:20px;
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
    #content{
        margin-top:60px;
    }
  .router-link-exact-active {
    color: #3da8f5;
    font-weight:bold;
  }
  .wrapper {
    // width: 1350px;
    margin: 0 auto;
    overflow: hidden;
  }
  .tit-h {
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: #4a5a6a;
    font-size: 28px;
    color: #fff;

    .wrapper {
      & > img {
        width: 35px;
        height: 35px;
        margin-right: 20px;
        position: relative;
        top: 7px;
      }
    }
  }
}
</style>
