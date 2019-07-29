<template>
  <div class="SearchPage">
    <div class="hot-search">
      <div class="tit-h">
        <div class="wrapper">
          <span>搜索</span>
        </div>
      </div>
      <!-- 热搜 -->
      <HotSearch></HotSearch>
    </div>
    <div class="screen">
      <div class="tit-h">
        <div class="wrapper">
          <img src="@/assets/image/brandDetail/u8717.png" alt="">
          <span>筛选</span>
        </div>
      </div>
      <!-- 筛选条件列表 -->
      <table class="screen-list">
        <tr>
          <td class="screen-class-tit">一级分类</td>
          <td class="screen-class-list">
            <el-radio-group v-model="radio1" @change="selectChange">
              <el-radio-button  label="PCB原型"></el-radio-button>
              <el-radio-button label="半导体"></el-radio-button>
              <el-radio-button label="电池"></el-radio-button>
              <el-radio-button label="电线电缆"></el-radio-button>
              <el-radio-button label="开关"></el-radio-button>
              <el-radio-button label="无源无件"></el-radio-button>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="screen-class-tit">二级分类</td>
          <td class="screen-class-list">
            <el-radio-group v-model="radio1" @change="selectChange">
              <el-radio-button  label="PCB原型"></el-radio-button>
              <el-radio-button label="半导体"></el-radio-button>
              <el-radio-button label="电池"></el-radio-button>
              <el-radio-button label="电线电缆"></el-radio-button>
              <el-radio-button label="开关"></el-radio-button>
              <el-radio-button label="无源无件"></el-radio-button>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="screen-class-tit">三级分类</td>
          <td class="screen-class-list">
             <el-radio-group v-model="radio1" @change="selectChange">
              <el-radio-button  label="PCB原型"></el-radio-button>
              <el-radio-button label="半导体"></el-radio-button>
              <el-radio-button label="电池"></el-radio-button>
              <el-radio-button label="电线电缆"></el-radio-button>
              <el-radio-button label="开关"></el-radio-button>
              <el-radio-button label="无源无件"></el-radio-button>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="screen-class-tit">分装规格</td>
          <td class="screen-class-list">
             <el-radio-group v-model="radio1" @change="selectChange">
              <el-radio-button  label="PCB原型"></el-radio-button>
              <el-radio-button label="半导体"></el-radio-button>
              <el-radio-button label="电池"></el-radio-button>
              <el-radio-button label="电线电缆"></el-radio-button>
              <el-radio-button label="开关"></el-radio-button>
              <el-radio-button label="无源无件"></el-radio-button>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="screen-class-tit">包装方式</td>
          <td class="screen-class-list">
             <el-radio-group v-model="radio1" @change="selectChange">
              <el-radio-button  label="PCB原型"></el-radio-button>
              <el-radio-button label="半导体"></el-radio-button>
              <el-radio-button label="电池"></el-radio-button>
              <el-radio-button label="电线电缆"></el-radio-button>
              <el-radio-button label="开关"></el-radio-button>
              <el-radio-button label="无源无件"></el-radio-button>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="screen-class-tit">功率</td>
          <td class="screen-class-list">
             <el-radio-group v-model="radio1" @change="selectChange">
              <el-radio-button  label="PCB原型"></el-radio-button>
              <el-radio-button label="半导体"></el-radio-button>
              <el-radio-button label="电池"></el-radio-button>
              <el-radio-button label="电线电缆"></el-radio-button>
              <el-radio-button label="开关"></el-radio-button>
              <el-radio-button label="无源无件"></el-radio-button>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="screen-class-tit">精度</td>
          <td class="screen-class-list">
             <el-radio-group v-model="radio1" @change="selectChange">
              <el-radio-button  label="PCB原型"></el-radio-button>
              <el-radio-button label="半导体"></el-radio-button>
              <el-radio-button label="电池"></el-radio-button>
              <el-radio-button label="电线电缆"></el-radio-button>
              <el-radio-button label="开关"></el-radio-button>
              <el-radio-button label="无源无件"></el-radio-button>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="screen-class-tit">阻值</td>
          <td class="screen-class-list">
            <el-radio-group v-model="radio1" @change="selectChange">
              <el-radio-button  label="PCB原型"></el-radio-button>
              <el-radio-button label="半导体"></el-radio-button>
              <el-radio-button label="电池"></el-radio-button>
              <el-radio-button label="电线电缆"></el-radio-button>
              <el-radio-button label="开关"></el-radio-button>
              <el-radio-button label="无源无件"></el-radio-button>
            </el-radio-group>
          </td>
        </tr>
      </table>
      <!-- 筛选数量 -->
      <div class="screen-number">
        <span class="number">
          共筛选出
          <span>116</span>个结果
        </span>
        <div class="reset">重置条件</div>
      </div>
      <!-- 筛选结果商品列表 -->
      <div class="screen-result">
        <div class="result-tit">
          <div class="wrapper">
            <ul class="tabList">
              <li class="active">综合排序</li>
              <li>按综合销量</li>
              <li>按原厂价格</li>
              <li>按经销商价格</li>
            </ul>
            <SearchInput></SearchInput>
          </div>
        </div>
        <!-- <ProductnformaList></ProductnformaList> -->
        <!-- <SubstituModelList></SubstituModelList> -->
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./SearchPage.less";
</style>

<script>

import HotSearch from "_c/HotSearch";
import ProductnformaList from "_c/ProductnformaList";
import SubstituModelList from "_c/SubstituModelList";
export default {
  name: "SearchPage",
  data(){
    return {
      radio1:''
    }
  },
  components: {
    HotSearch,
    ProductnformaList,
    SubstituModelList
  },
  methods:{
    selectChange(x){
     
    }
  }
};
</script>

<style>
</style>
