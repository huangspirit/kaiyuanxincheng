<template>
  <div class="HotSearch">
    <div class="search-hot">
      <div class="wrapper">
        <SearchInput
          class="search"
          :placeholder="'搜索罗彻斯特电子(RE)产品'"
          :width="770"
          :height="80"
          :btnWidth="120"
          @input='change'
        ></SearchInput>
        <p>热搜</p>
        <ul>
          <router-link
            v-for="(item ,k) in list"
            :key="`list_${k}`"
            to="BrandDetail/SearchPage"
            tag="li"
          >{{item.name}}</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "./HotSearch.less";
export default {
  name: "HotSearch",
  data() {
    return {
      list: [
        {
          name: "固态电阻"
        },
        {
          name: "接插件"
        },
        {
          name: "TMR1302S"
        },
        {
          name: "固态电阻"
        },
        {
          name: "接插件"
        },
        {
          name: "TMR1302S"
        },
        {
          name: "固态电阻"
        },
        {
          name: "接插件"
        },
        {
          name: "TMR1302S"
        }
      ]
    };
  },
  methods:{
    change(x){

      this.$emit('input',x)
    }
  }
};
</script>
