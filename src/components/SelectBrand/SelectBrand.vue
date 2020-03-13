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
        <span class="text">品牌选择</span>
      </div>
      <div class="selectBrand-tit-r">
        <span class="text">当前选择：</span>
        <span class="no-select" v-if="!EndselectBrandList.length">未选择</span>
        <span
          v-if="EndselectBrandList.length === maxBrandNum && maxBrandNum!=1"
          style="color:#cc0000"
        >最多选择{{maxBrandNum}}个品牌</span>
        <span v-if="RepeatedAddFlag" style="color:#cc0000">请勿重复添加</span>
      </div>
    </div>
    <!-- 当前已经选择的 -->
    <p>
      <template v-for="(item ) in EndselectBrandList">
        <span class="select" :key="item.id">
          {{item.brand}}
          <span @click="delBrandSelect(item)" class="close color borderColor">&times;</span>
        </span>
      </template>
    </p>
    <div class="selectBrand-list">
      <ul>
        <li
          v-for="item in alphbet"
          :key="item"
          @click="selectBrandTitle(item)"
          :class="{bgColor: item === selectBrandSearchTitle}"
        >{{item}}</li>
      </ul>
    </div>
    <!-- 搜索出来的品牌 -->
    <div class="selectBrand-search">
      <p class="title">{{selectBrandSearchTitle}}</p>
      <ul v-if="FindBrandList.length" style="max-height:300px;overflow-y:auto">
        <li
          @click="currentSelect(item)"
          v-for="item in FindBrandList"
          :key="item.id"
          :title="item.hasFactorySeller?'原厂已入驻':''"
          class="blu"
        ><span>{{item.branda}} </span><span class="color" style="font-size:12px" >{{item.hasFactorySeller?'(已入驻)':''}}</span></li>
      </ul>
      
    </div>
    <div v-if="FindBrandList.length==0" class="zw">
        <!-- <span>暂无数据</span> -->
        <p class="add-brand" style="margin:20px auto;text-align:center;">没有品牌？<a href="javascript:;" @click="showModalfeed=true">去反馈>></a></p>
      </div>
    <feed-back v-if="showModalfeed" :showfeedback="showModalfeed" @submitSuc="showModalfeed=false"></feed-back>
  </div>
</template>

<script>
import feedBack from "_c/feedback";
import "./SelectBrand.less";
import { mapState, mapActions } from "vuex";
import "@/assets/css/label-checkbox.less";
import { axios, home } from '../../api/apiObj';
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
      showModalfeed:false,
      // 模糊查询到的品牌列表
      FindBrandList: [],
      //最后选择的品牌列表
      // 要搜索的品牌name
      searchBrandValue: "",
      // 重复添加的提示
      RepeatedAddFlag: false,
      alphbet:[],
      brandList: {},
      chinalist:[],
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
      if(item=="中国芯"){
         this.FindBrandList=this.chinalist
      }else{
        this.FindBrandList = this.brandList[item];
      }
       this.selectBrandSearchTitle = item;
    },
    // 点击当前要选择的品牌
    currentSelect(val) {
      this.RepeatedAddFlag = false;
      if(this.residencetype==1 && val.hasFactorySeller){
        this.$message({
          message:"原厂已入驻的品牌不可再入驻"
        })
        return;
      }
      if (this.EndselectBrandList.length === this.maxBrandNum) {
        if(this.maxBrandNum==1){
          this.EndselectBrandList=[val]
        }
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
    },
    getbrandlist(){
      axios.request(home.queryBrandHomePage).then(res=>{
        let chinaArr=Object.values(res.data.china.result1).map(item=>{
          return item[0]
        })
        let alphbet = Object.keys(res.data.base.result1);
        alphbet.unshift('中国芯')
        this.alphbet=alphbet;
        this.brandList=res.data.base.result1
        this.chinalist=chinaArr;
         this.selectBrandSearchTitle = '中国芯';
         this.FindBrandList=chinaArr
      })
    }
  },
components:{
  feedBack
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
  mounted() {
    this.getbrandlist()
  }
};
</script>

<style>
</style>
