<template>
  <div class="HeaderSearch" @click="noSearch()" :class="mini?'mini':''">
    <div class="search">
      <div class="ipt" >
        <input type="text" placeholder="请输入你要查找的器件型号/类别/品牌关键字" @focus.stop="focus" v-model="searchValue">
        <div class="btn" @click="search" style="cursor:pointer;">
          <i class="el-icon-search"></i>
        </div>
      </div>
      <ul class="list" v-if="SearchData.length">
        <li
          v-for="(item, k) in SearchData"
          :key="`SearchData_item_${item.documentid}_${k}`"
          @click.stop="searchLink(item)"
          v-html="item.nick_name"
        ></li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
    @import "./HeaderSearch.less";
</style>
<script>
import { SearchData } from "@/api/home";
import { SearchJump } from "@/lib/utils";
export default {
  name: "HeaderSearch",
    props:
        {
            mini:{
                type:Boolean,
                default:false
            }
        }
    ,
  data() {
    return {
      // 搜索输入框的值
      searchValue: "",
      // 大搜索数组
      SearchData: [],
      SearchDataList: [],
      flag: true
    };
  },
  watch: {
    searchValue() {
      if (this.flag) {
        this.search();
      } else {
        this.flag = true;
      }
    }
  },
  methods: {
    // 大搜索
    search() {
      this.flag = true;
      let obj={
        name:this.searchValue,
        start:0,
        length:20
      }
      if (this.searchValue) {
        SearchData(obj)
          .then(res => {
            this.SearchData = res.data.data;
            this.SearchDataList = res.data.data;
          })
          .catch(err => {});
      } else {
        this.SearchDataList = [];
      }
    },
    // 取消搜索
    noSearch() {
      this.SearchData = [];
    },
    // 大搜索跳转
    searchLink(item) {
      delete item.nick_name;
      this.searchValue = item.name;
      this.SearchData = [];
      this.SearchDataList = [];
      this.flag = false;
      this.$router.push({
        path: SearchJump(item.tag),
        query: item
      });
    },
    focus() {
      this.SearchData = this.SearchDataList;
    }
  }
};
</script>
