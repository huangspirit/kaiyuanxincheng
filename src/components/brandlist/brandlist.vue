<template>
  <!-- 选择品牌 -->
  <div class="wrap">
  <div class="SelectBrand">
    <div class="selectBrand-tit clear">
      <div class="selectBrand-tit-l clear fr">
        <div class="fr searchInput">
          <el-input
            @input="brandInputChange(searchBrandValue)"
            v-model="searchBrandValue"
            placeholder="请输入搜索品牌名称"
          ></el-input>
          <div class="sure bgColor" @click="SureSelectBrand">确定</div>
          <div class="cancel bgLightGray" @click="CancelSelectBrand">关闭</div>
        </div>
      </div>
      <div class="selectBrand-tit-r fl" >
        <span class="text">当前选择：</span>
        <span class="no-select" v-if="!EndselectBrandList.length">未选择</span>
        <p v-if="EndselectBrandList.length">
            <template v-for="(item , k ) in EndselectBrandList"  >
            <span class="select" :key="k" v-if="item.brand">
            <span>{{item.branda}}</span>
            <span @click="delBrandSelect(item)" class="close">&times;</span>
            </span>
        </template>
        </p>
      </div>
    </div>
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
      <ul v-if="FindBrandList.length">
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
  </div>
</template>
<script>
import feedBack from "_c/feedback";
import { mapState, mapActions } from "vuex";
import { axios, home } from '../../api/apiObj';
export default {
  name: "SelectBrand",
  // 添加新品牌时需要跳转的路径
  props: {
    addBrandUrl: String,
    // 选择的品牌列表
    // 品牌的最大选择数量
    maxBrandNum: {
      type: Number,
      default: 1
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
      selectBrandSearchTitle: "",
      EndselectBrandList:[]
    };
  },
  methods: {
    ...mapActions("OriginalFactoryEntry", [
      "GetQueryDictionarieList",
      "GetFindBrand"
    ]),
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
    },
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
      if (this.EndselectBrandList.length === this.maxBrandNum) {
          this.EndselectBrandList=[val]
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
.<style lang="less" scoped>
    @import "./brandlist.less";
</style>
