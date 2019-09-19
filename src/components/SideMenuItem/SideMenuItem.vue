<template>
  <div class="SideMenuItem">
    <el-submenu
      v-if="item.children"
      :index="item.index"
      :disabled="item.diabled"
    >
      <template slot="title">
        <div @click="send(item)">
         <img :src="item.icon" alt>
          <span>{{item.title}}</span>
        </div>
      </template>
      <template v-for="(v,index) in item.children">
        <SideMenuItem v-if="v.children" :item="v" :key="index"></SideMenuItem>
        <router-link :to="v.path" v-else-if="!item.isPassWord" :key="index" tag="div" v-show="v.show!='hidden'">
          <el-menu-item :index="v.index">
           <img :src="v.icon" alt>
            <span slot="title">{{v.title}}</span>
          </el-menu-item>
        </router-link>
         <div v-if="item.isPassWord" :key="v.index" @click="withDraw">
              <el-menu-item :index="item.index">
              <img :src="item.icon" alt>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </div>
      </template>
    </el-submenu>
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
<script>
import "./SideMenuItem.less";
import '@/assets/css/dialog-delect.less'
export default {
  name: "SideMenuItem",
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
          showSetPassword:false,
          showinputPassword:false,
          inputpassword:''
    };
  },
  methods: {
       withDraw(){
            //先验证是否设置提现密码
          console.log("weeweew")
            this.inputpassword="";
            axios.request(personCenter.checkSetPassword).then(res=>{
                if(res.data==1){
                    this.showinputPassword=true;
                }else{
                    //需要新增
                    this.$prompt('请设置提现密码', '', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        //校验密码
                        axios.request({...personCenter.savedrawPassword,data:{password:value}}).then(res=>{
                            console.log(res)
                            if(res){
                                
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
                }

            })
        },
    send(item) {
      if (item.diabled) {
        // if (item.title == "卖家中心") {
        //   this.dialogVisible = true;
        // }
      } else {
        this.$router.push({
          path: item.path
        });
      }
    },

  }
};
</script>

<style lang='less'>
</style>
