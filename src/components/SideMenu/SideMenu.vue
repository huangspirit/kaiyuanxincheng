<template>
  <div class="SideMenu">
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      background-color="#3f3f3f"
      text-color="#fff"
      active-text-color="#3da8f5"
      :unique-opened='true'
      :default-openeds="defaultOpeneds"
        :default-active="defaultActive"
    >
      <template v-for="item in list">
        <SideMenuItem v-if="item.children && item.isShow" :item="item" :key="`list_${item.index}`"></SideMenuItem>
        <router-link :to="item.path" v-else-if="!item.children && item.isShow && !item.isPassWord" :key="`list_${item.index}`" tag="div">
          <el-menu-item :index="item.index">
           <img :src="item.icon" alt>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </router-link>
        <div v-else-if="!item.isShow" :key="`list_${item.index}`" @click="dialogVisible = true">
          <el-menu-item :index="item.index">
           <img :src="item.icon" alt>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
        <div v-else-if="item.isPassWord" :key="`list_${item.index}`" @click="withDraw">
          <el-menu-item :index="item.index">
           <img :src="item.icon" alt>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </template>
    </el-menu>
    <!-- 提示 -->
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
   
  </div>
</template>

<script>
//import SideMenu from "./SideMenu";
import SideMenuItem from "../SideMenuItem/SideMenuItem";
import {axios,personCenter}  from "@/api/apiObj";
// import '@/assets/css/dialog-delect.less'
export default {
  name: "SideMenu",
    data(){
      return {
          defaultOpeneds:[],
          defaultActive:"",
          dialogVisible: false,
         
      }
    },
  props: {
    list: {
      type: Array,
      default: () => []
    },
  },
    created(){
      this.fetchDate()
    },
  mounted(){

  },
  components: {
    SideMenuItem
  },
  methods: {
  
      fetchDate(){
          console.log(this.$route)
          var name=this.$route.meta.parentname;
          this.list.forEach((item)=>{
              if(name==item.name){
                  this.defaultOpeneds=[item.index]
                  item.children.forEach(item0=>{
                      if(this.$route.path==item0.path){
                          this.defaultActive=item0.index;
                      }
                  })
              }
          })
          if(!this.defaultActive){
              this.defaultActive=this.defaultOpeneds[0]+"_0"
          }

      },
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

    },
     ensure() {
      this.$router.push({
        path: '/OriginalFactoryEntry'
      });
    }
  },

    watch:{
        "$route":"fetchDate"
    }
};
</script>

<style lang='less' scoped>
.SideMenu {
    /deep/.el-menu{
        border:none;
    }
    /deep/.el-submenu{
        .el-submenu__title{
            font-size:20px;
            font-weight: bold;
        }
        &.is-active{
            .el-submenu__title{
                background:#262626!important;
            }
        }
        .el-menu{
            .el-menu-item{
                &.is-active{
                    background:#df3f2f!important;
                    color:#fff!important;
                }
            }
        }
    }
  width: auto;
  img {
    width: 30px;
    height: 30px;
    margin-right: 30px;
  }
}
.con{
  font-weight: bolder;
  font-size:16px;
  text-align: center;
}
.ruzhu{
  color:#fff;
  font-size:16px;
  .ensure{
    background: #4a5a6a;
    padding: 6px 15px;
    /*margin-bottom:20px;*/
    margin-left:15px;
    border-radius: 3px;
    cursor: pointer;
    &:hover{
      color:peru;
      font-weight:bolder;
      transition:all 0.2s;

    }
  }
  .close{
    border-radius: 3px;
    background:#e3e3e3;
    padding: 6px 15px;
    color:#999;
    cursor: pointer;
  }
}
</style>


