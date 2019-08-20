<template>
  <div class="SideMenu">
    <el-menu
      default-active="1"
      @open="handleOpen"
      @close="handleClose"
      background-color="#4f4f4f"
      text-color="#fff"
      active-text-color="#3da8f5"
      :unique-opened='true'
      :default-openeds="['3']"
    >
      <template v-for="item in list">
        <SideMenuItem v-if="item.children && item.isShow" :item="item" :key="`list_${item.index}`"></SideMenuItem>
        <router-link :to="item.path" v-else-if="!item.children && item.isShow" :key="`list_${item.index}`" tag="div">
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
import SideMenu from "./SideMenu";
import SideMenuItem from "../SideMenuItem/SideMenuItem";
// import '@/assets/css/dialog-delect.less'
export default {
  name: "SideMenu",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  mounted(){
    console.log("this.$store.state:",this.$store.state)
  },
  data() {
    return {
       dialogVisible: false,
    };
  },
  components: {
    SideMenuItem
  },
  methods: {
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

    },
     ensure() {
      this.$router.push({
        path: '/OriginalFactoryEntry'
      });
    }
  }
};
</script>

<style lang='less' scoped>
.SideMenu {
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
    margin-bottom:20px;
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
<style scoped>

</style>

