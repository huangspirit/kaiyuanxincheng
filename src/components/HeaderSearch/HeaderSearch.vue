<template>
  <div class="HeaderSearch" @click="noSearch()">
    <div class="search">
      <div class="ipt" @click.stop>
        <input type="text" placeholder="请输入你要搜索的商品" @focus.stop="focus" v-model="searchValue">
        <div class="btn">
          <img src="@/assets/image/home/u26.png" alt>
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

<script>
import "./HeaderSearch.less";
import { SearchData } from "@/api/home";
import { SearchJump } from "@/lib/utils";
export default {
  name: "HeaderSearch",
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
      if (this.searchValue) {
        SearchData(this.searchValue)
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
