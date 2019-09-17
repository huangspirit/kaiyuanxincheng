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
        <router-link :to="v.path" v-else :key="index" tag="div" v-show="v.show!='hidden'">
          <el-menu-item :index="v.index">
           <img :src="v.icon" alt>
            <span slot="title">{{v.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
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

    };
  },
  methods: {
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
