<template>
<div>
    <el-menu 
     class="sidemenu" 
     id="sidemenu"
     :collapse="false"
     :unique-opened='true'
     text-color="#fff"
     background-color="#3f3f3f"
     :router="true"
     :default-openeds="defaultOpeneds"
     :default-active="defaultActive"
     >
     <template v-for="item0 in list" >
          <el-submenu :index="item0.index" :key="item0.index" class="onemenu" >
            <router-link :to="item0.path" slot="title" tag="div" class="onetitle" v-if="item0.isShow">
                    <img :src="item0.icon" alt="">
                {{item0.title}}
            </router-link>
            <template slot="title" tag="div" class="onetitle" v-if="!item0.isShow" @click="dialogVisible=true">
                    <img :src="item0.icon" alt="">
                {{item0.title}}
            </template>
            <template  v-for="item1 in item0.children">
                <el-submenu :index="item1.index" :key="item1.index" class="twomenu" v-if="item1.show!='hidden' && !item1.isPassWord">
                    <router-link :to="item1.path" slot="title" tag="div" class="twotitle">
                        <img :src="item1.icon" alt="">
                        <span>{{item1.title}}</span>
                    </router-link>
                </el-submenu>
                 <el-submenu :index="item1.index" :key="item1.index" class="twomenu" v-if="item1.show!='hidden' && item1.isPassWord" @click.native="withDraw(item1)">
                    <template slot="title" class="twotitle">
                        <div class="twotitle">
                            <img :src="item1.icon" alt="">
                            <span slot="title">{{item1.title}}</span>
                        </div>
                    </template>
                </el-submenu>
            </template>
        </el-submenu>
     </template>
    </el-menu>
    <el-dialog
      center
      :visible.sync="dialogVisible"
      width="500px"
      class="confirma-delivery-dialog"
      top="20vh"
      lock-scroll
    >
      <p slot="title" class="title">提示</p>
      <div class="con">
        <p>
          您还不是商家身份
          是否进行商家入驻？
        </p>
        <p></p>
      </div>
      <span slot="footer" class="dialog-footer ruzhu">
        <span @click="dialogVisible = false" class="close">取消</span>
        <span @click="ensure" class="ensure">立刻进行商家入驻</span>
      </span>
    </el-dialog>
     <el-dialog
          :visible.sync="showinputPassword"
          width="500px"
      >
          <p slot="title" class="title">输入交易密码</p>
          <div >
              <el-input placeholder="请输入交易密码" v-model="inputpassword" show-password></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showinputPassword = false">取 消</el-button>
            <el-button type="primary" @click="checkpassword">确 定</el-button>
          </span>
      </el-dialog>
</div>
</template>
<style lang="less">
    .sideMenu{
        .router-link-exact-active{
            color:#fff!important;
        }
        img{
            width:16px;
            margin-right:15px;
        }
        .el-menu{
            border:none;
        }
        .onemenu{
           >.el-submenu__title{
               padding:0!important;
               .onetitle{
                    padding-left:20px;
               }
                     &>.router-link-exact-active{
                        background:#000!important;
                       
                    }
                }
            &.is-opened{
                >.el-submenu__title{
                    background:#000!important;
                     &>.router-link-exact-active{
                        background:#000!important;
                    }
                }
                .twomenu{
                     .el-submenu__icon-arrow{
                            display:none!important;
                        }
                        >.el-submenu__title{
                            padding: 0!important;
                            .twotitle{
                                padding-left:40px;
                                padding-right:20px;
                                &.router-link-exact-active{
                                    background:#df3f2f!important;
                                }
                            }
                            
                        }
                       &.is-opened{
                           .twotitle{
                                    background:#df3f2f!important;
                            }
                       } 
                   
                }
            }
        }
    }
</style>
<script>
import {axios,personCenter} from "@/api/apiObj"
export default {
    name:"sideMenu",
    props:{
         list: {
            type: Array,
            default: () => []
        },
    },
    data(){
        return {
            defaultOpeneds:[],
            defaultActive:"",
            dialogVisible: false,
            showSetPassword:false,
            showinputPassword:false,
            inputpassword:'',
            obj:{}
        }
    },
    created(){
        this.fetchDate();
    },
    methods:{
      fetchDate(){
          var name=this.$route.meta.parentname;
          this.list.forEach((item)=>{
              if(name==item.name){
                  this.defaultOpeneds=[item.index]
                  item.children.forEach(item0=>{
                      if(this.$route.path.indexOf(item0.path) != -1){
                          this.defaultActive=item0.index;
                      }
                  })
              }
          })

      },
         withDraw(item){
             this.obj=item
            //先验证是否设置提现密码

            this.inputpassword="";
            axios.request(personCenter.checkSetPassword).then(res=>{
                if(res.data==1){
                    this.showinputPassword=true;
                }else{
                    //需要新增
                    this.$prompt('请设置交易密码', '', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        //校验密码
                        axios.request({...personCenter.savedrawPassword,data:{password:value}}).then(res=>{
                            console.log(res)
                            if(res){
                               this.$router.push({
                                    path: this.obj.path
                                });
                            }
                        })
                    }).catch(() => {

                    });
                }
            })
        },
        checkpassword(){
            axios.request({...personCenter.checkdrawPassword,data:{password:this.inputpassword}}).then(res=>{
                console.log(res)
                if(res){
                    this.showinputPassword=false;
                      this.$router.push({
                                    path: this.obj.path
                                });
                }

            })
        },
         ensure() {
            this.$router.push({
                path: '/OriginalFactoryEntry'
            });
        }
    }
}
</script>
