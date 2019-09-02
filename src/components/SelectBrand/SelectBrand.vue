<template>
  <!-- 选择品牌 -->
  <div class="SelectBrand">
    <div class="selectBrand-tit">
      <div class="selectBrand-tit-l clear">
        <div class="fr searchInput">
          <el-input
            @input="brandInputChange(searchBrandValue)"
            v-model="searchBrandValue"
            placeholder="请输入搜索品牌名称"
          ></el-input>
          <div class="sure bgColor" @click="SureSelectBrand">确定</div>
          <div class="cancel bgLightGray" @click="CancelSelectBrand">取消</div>
        </div>
        <span class="text" v-if="maxBrandNum==1">请选择您是哪个品牌的原厂</span>
      </div>
      <div class="selectBrand-tit-r">
        <span class="text">当前选择：</span>
        <span class="no-select" v-if="!EndselectBrandList.length">未选择</span>
        <span
          v-if="EndselectBrandList.length === maxBrandNum"
          style="color:#cc0000"
        >{{maxBrandNum === 3 ? '一个代理商' : '原厂'}}最多选择{{maxBrandNum}}个品牌</span>
        <span v-if="RepeatedAddFlag" style="color:#cc0000">请勿重复添加</span>
      </div>
    </div>
    <!-- 当前已经选择的 -->
    <p v-if="EndselectBrandList.length">
      <template v-for="(item , k ) in EndselectBrandList">
        <span class="select" :key="k" v-if="item.brand">
          {{item.brand}}
          <span @click="delBrandSelect(item)" class="close">&times;</span>
        </span>
      </template>
    </p>
    <div class="selectBrand-list">
      <ul>
        <li
          v-for="item in brandList"
          :key="item"
          @click="selectBrandTitle(item)"
          :class="{bgColor: item === selectBrandSearchTitle}"
        >{{item}}</li>
      </ul>
    </div>
    <!-- 搜索出来的品牌 -->
    <div class="selectBrand-search">
      <p class="title">{{selectBrandSearchTitle}}</p>
      <ul v-if="FindBrandList.length">
        <li
          @click="currentSelect(item)"
          v-for="item in FindBrandList"
          :key="item.brnad"
          v-html="item.nick_name"
        ></li>
      </ul>
      <p v-else class="zw">
        <span>暂无数据</span>
        <!-- <span class="add-brand" @click="addNewBrand">添加新品牌</span> -->
      </p>
    </div>
  </div>
</template>

<script>
import "./SelectBrand.less";
import { mapState, mapActions } from "vuex";
import "@/assets/css/label-checkbox.less";
export default {
  name: "SelectBrand",
  // 添加新品牌时需要跳转的路径
  props: {
    addBrandUrl: String,
    // 选择的品牌列表
    EndselectBrandList: {
      type: Array,
      default: []
    },
    // 品牌的最大选择数量
    maxBrandNum: {
      type: Number,
      default: 3
    },
    // 入驻的类型
    residencetype: Number
  },
  data() {
    return {
      // 模糊查询到的品牌列表
      FindBrandList: [],
      //最后选择的品牌列表
      // 要搜索的品牌name
      searchBrandValue: "",
      // 重复添加的提示
      RepeatedAddFlag: false,
      brandList: [
        "#",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      selectBrandSearchTitle: ""
    };
  },
  methods: {
    ...mapActions("OriginalFactoryEntry", [
      "GetQueryDictionarieList",
      "GetFindBrand"
    ]),

    selectBrand(item) {
      this.ruleForm.name = item.brand;
      this.FindBrandList = [];
    },
    // 点击要选择的品牌
    selectBrandTitle(item) {
      this.selectBrandSearchTitle = item;
      console.log(item);
      this.GetFindBrand({
        start: 0,
        length: 1000,
        type: "1",
        name: item
      }).then(res => {
        this.FindBrandList;
        this.FindBrandList = res;
      });
    },
    // 点击当前要选择的品牌
    currentSelect(val) {
      this.RepeatedAddFlag = false;
      if (this.EndselectBrandList.length === this.maxBrandNum) {
      } else {
        let ret = this.EndselectBrandList.find(item => item.id === val.id);
        if (ret) {
          this.RepeatedAddFlag = true;
        } else {
          this.EndselectBrandList.push(val);
        }
      }
    },
    // 删除选中的品牌
    delBrandSelect(item) {
      this.EndselectBrandList.splice(
        this.EndselectBrandList.findIndex(val => val.id === item.id),
        1
      );

      if (!this.EndselectBrandList.length) {
        this.RepeatedAddFlag = false;
      }
    },
    // 品牌搜索输入框
    brandInputChange(val) {
      this.selectBrandSearchTitle = this.searchBrandValue;
      this.GetFindBrand({
        start: 0,
        length: 10,
        name: val
      }).then(res => {
        this.FindBrandList = res;
      });
    },
    // 确定选择的品牌
    SureSelectBrand() {
      console.log("EndselectBrandList:", this.EndselectBrandList);
      this.$emit("select", this.EndselectBrandList);
    },
    // 取消选择的品牌
    CancelSelectBrand() {
      this.$emit("cancel");
    },
    // 添加新品牌
    addNewBrand() {
      if (this.EndselectBrandList.length <= this.maxBrandNum) {
        this.$router.push({
          path: this.addBrandUrl,
          query: {
            residencetype: this.residencetype
          }
        });
      }
    }
  },

  computed: {
    ...mapState({
      findBrandList: state => state.home.findBrandList
    }),
    access_token() {
      return sessionStorage.getItem("access_token");
    }
  },
  watch: {
    findBrandList(newval, oldval) {
      this.FindBrandList = newval;
    }
  },
  mounted() {}
};
</script>

<style>
</style>
