<template>
    <div class="cont">
       <!-- <router-link to="/News"  class="messageCountWrap" tag="div">
            <span></span>
            <p>消息</p> 
            <div v-if="UserInforma.messageCount" class="mess">{{UserInforma.messageCount}}</div>
        </router-link> -->
      <router-link to="/PersonalCenter" class="personal" tag="div">
            <span></span>
            <p>用户中心</p> 
        </router-link>
        <router-link to="/OriginalFactoryEntry" class="join" tag="div" v-if="!UserInforma.userTagMap || (UserInforma.userTagMap && !UserInforma.userTagMap.seller)">
            <span></span>
            <p>商家入驻</p> 
        </router-link>
        <router-link to="/InquiryBasket" class="busket" tag="div">
            <span></span>
            <p>询价篮</p> 
        </router-link>
        <router-link to="/ShoppingCart" class="shoppingCar" tag="div">
            <span></span>
            <p>购物车</p> 
        </router-link>
       
        <!-- <div class="feedback" @click="feedBack">
          <span></span>
            <p>反馈</p> 
        </div> -->
        <router-link to="/feedback"  class="feedback" tag="div">
            <span></span>
            <p>反馈</p> 
        </router-link>
        <el-dialog title="问题反馈" :visible.sync="showModal" style="position:fixed;">
              <el-form :model="form">
                 <el-form-item label="反馈内容">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer" >
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
    </div>
</template>
<script>
  import { mapState ,mapMutations} from "vuex";
export default {
    data(){
        return {
            showModal:false,
            form:{},
            formLabelWidth:'120'
        }
    },
    mounted(){
     
    },
    computed: {
        ...mapState({
            UserInforma:state => state.Login.UserInforma
        })
    },
    methods:{
      feedBack(){
        this.showModal=true;
      }
    }
}
</script>
<style lang="less" scoped>
.cont{
    position: fixed;
    right:0;
    top:30vh;
    z-index: 9;
    color:#fff;
    background: #5c5f63;
    border:1px solid #fff;
    border-right:none;
    
    &:hover{
      &>div{
        padding:10px 20px;
        transition: all 0.3s;
      }
    }
        &>div{
          color:#fff;
          font-size:14px;
          position: relative;
          z-index:1;
          text-align: center;
          padding:10px 0;
          border-top:1px solid #fff;
          cursor: pointer;
          height:55px;
          line-height:30px;
          box-sizing: border-box;
          transition: all 0.3s;
          p{
            position: absolute;
            width:100%;
            height:100%;
            line-height:50px;
            top:0;
            left:0;
            background:rgba(0,0,0,0.5);
            opacity: 0;
            font-size:12px;
          }
           span{
               width:25px;
               padding-top:20px;
               margin-right:2px;
               margin-bottom:5px;
            }
          &.busket{
            span{
              background:url("../../assets/image/side/inquery.png") center center no-repeat;
               background-size:22px auto;
            }
          }
          &.shoppingCar{
            span{
              background:url("../../assets/image/side/shoppingCar.png") center center no-repeat;
              background-size:35px auto;
            }
          }
          &.messageCountWrap{
            span{
              background:url("../../assets/image/side/message.png") center center no-repeat;
              background-size:35px auto;
            }
          }
          &.feedback{
            span{
              background:url("../../assets/image/side/feedback.png") center center no-repeat;
              background-size:35px auto;
            }
          }
          &.join{
            span{
              background:url("../../assets/image/side/join.png") center center no-repeat;
              background-size:35px auto;
            }
          }
          &.personal{
            span{
              background:url("../../assets/image/side/personal.png") center center no-repeat;
              background-size:35px auto;
            }
          }
          &:hover{
            p{
              opacity: 1;
              transition: all 1.5s;
            }
            span{
              opacity: 0;
              transition: all 1s;
            }
          }
          &.router-link-active{
            background: #df3f2f;
            color:#fff!important;
            // &.busket{
            //   span{
            //     background:url("../../assets/image/icon/busketActive.png") center center no-repeat;
              
            //    background-size:17px auto ;
            //   }
            // }
            // &.shoppingCar{
            //   span{
            //     background:url("../../assets/image/icon/shoppingCarActive.png") center center no-repeat;
               
            //    background-size:17px auto ;
            //   }
            // }
            // &.messageCountWrap{
            //   span{
            //     background:url("../../assets/image/icon/messageActive.png") center center no-repeat;
             
            //    background-size:15px auto ;
            //   }
            // }
            // &.feedback{
            //   span{
            //     background:url("../../assets/image/icon/feedbackActive.png") center center no-repeat;
             
            //    background-size:15px auto ;
            //   }
            // }
          }
          .mess{
              position: absolute;
              right: 0;
              top:0;
              background:#F22E2E;
              color:#fff;
              padding:2px 5px;
              line-height: 1;
              border-radius:20px;
              font-size:12px;
          }
        }
}
</style>