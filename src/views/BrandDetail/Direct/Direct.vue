<template>
  <div class="Direct">
    <div class="BrandDetail-tit">
      <el-breadcrumb separator-class="el-icon-arrow-right" class>
        <el-breadcrumb-item :to="{ path: '/brand' }">全部品牌</el-breadcrumb-item>
        <el-breadcrumb-item
          v-if="query.brandName"
          :to="{
            path:'/BrandDetail',
            query:{
              tag:'brand',
              documentid:query.brandId,
              name:query.name
            }
          }"
        >{{query.brandName}}</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{
            path:'/BrandDetail/Undirect',
            query:{
              tag:'undirect',
              documentid:query.parentId,
              name:query.parentName,
              brandId:query.brandId,
              brandName:query.brandName,
              catergoryId:query.firstCatergoryId
            }
          }"
        >
          <span>{{query.parentName}}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{query.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="cont">
      <div class="screen management-class clear">
        <div class="ScreenList clear">
          <div class="item">
            <div class="title">品牌</div>
            <ul class="listwrap">
              <li
                v-for="(item0,index0) in brandList"
                @click.stop="getTypeByBrandId(index0)"
                :class="selectedScreen.brand_id==item0.id?'active':''"
                :key="index0"
              >{{item0.branda}}</li>
            </ul>
          </div>
          <div v-for="(item,k) in screenTypeList" :key="k" class="item">
            <div class="title">{{item.propertyName}}</div>
            <div class="search" v-if="item.isSearch">
              <el-input
                placeholder="输入"
                v-model="item.search"
                @input="handleInput(k)"
                prefix-icon="el-icon-search"
                clearable
              ></el-input>
            </div>
            <ul class="listwrap" :class="item.isSearch?'hasSearch':''">
              <template v-for="(item0,index0) in item.childList">
                <li
                  @click="selected(k,index0)"
                  :class="selectedScreen[item.propertyId]==item0?'active':''"
                  :key="index0"
                >{{item0}}</li>
              </template>
            </ul>
          </div>
        </div>

        <div>
          <div class="clear result">
            <div class="selected clear fl">
              <ul class="fl">
                <li>
                  <el-radio-group
                    v-model="selectedGoods.goods_type"
                    class="defaultradioSquare label editAddress"
                  >
                    <el-radio
                      :label="true"
                      :value="true"
                      name="goods_type"
                      @click.native.prevent="cancleChecked1(true)"
                    >现货</el-radio>
                    <!-- <br><el-radio :label="false" :value="false" name="goods_type"  @click.native.prevent="cancleChecked1(false)">订货</el-radio> -->
                  </el-radio-group>
                </li>
              </ul>
              <ul class="fl">
                <li>
                  <el-radio-group
                    v-model="selectedGoods.create_tag"
                    class="defaultradioSquare label editAddress"
                  >
                    <el-radio
                      :label="true"
                      :value="true"
                      name="create_tag"
                      @click.native.prevent="cancleChecked(true)"
                    >原厂直供</el-radio>
                    <br />
                    <!-- <el-radio :label="false" :value="false" name="create_tag"  @click.native.prevent="cancleChecked(false)">代理商</el-radio> -->
                  </el-radio-group>
                </li>
              </ul>
              <ul class="fl">
                <li>
                  <el-checkbox
                    class="defaultradioSquare label editAddress"
                    @change="changeSpecialPrice($event)"
                    v-model="SpecialPrice"
                  >特价商品</el-checkbox>
                  <!-- <br>
                  <el-checkbox class="defaultradioSquare label editAddress" v-if="selectedGoods.goods_type!=false" @change="changeIsOldProduct($event)" v-model="isOLdProduct">呆料清仓</el-checkbox>-->
                </li>
              </ul>
            </div>
            <div class="res fl">
              <span
                style="font-size:20px;color:#333;width:auto;white-space:nowrap;font-weight:bolder;margin-right:20px;border:none"
              >
                符合条件的结果：
                {{ScreenProductTotal}}
              </span>
              <div class="showSelectedScreen">
                <template v-for="(item,k) in selectedScreen">
                  <span :key="k" v-if="k!='brand_id'">
                    {{item}}
                    <i @click="delselectedScreenItem(k)" class="el-icon-circle-close"></i>
                  </span>
                </template>
              </div>
            </div>
          </div>
          <div class="btnWrap">
            <span
              @click="changeType"
              v-if="propertyCount>0 || ScreenProductTotal"
              class="btn bgColor"
            >应用已选参数</span>
            <span v-if="!(propertyCount>0 && ScreenProductTotal)" class="gray">应用已选参数</span>
            <span @click="resetScreen" class="gray btn">清除已选参数</span>
          </div>
        </div>
      </div>
    </div>

    <div class="cont">
      <!-- 经营品类 -->
      <div class="brand-hot brand-msg">
        <div class="tit bgGray">
          <el-input
            placeholder="在结果中查找型号"
            class="fr inputSearch"
            v-model="valueName"
            size="mini"
            style="width:250px;"
            @keyup.enter.native="hotSearchValue"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="hotSearchValue"></el-button>
          </el-input>
          <span>产品列表</span>
        </div>
      </div>
      <div class="management-class">
        <SubstituModelListTable :list="ProductnformaList" v-if="ProductnformaList.length"></SubstituModelListTable>
        <div class="nocontent" v-if="total==0">暂无此类产品</div>
        <Pagination
          v-if="total"
          :currentPage.sync="currentPage"
          :total="total"
          @current-change="handleCurrentPageChange"
        ></Pagination>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./Direct.less";
</style>

<script>
import { axios, BrandDetail } from "../../../api/apiObj";
import { mapGetters, mapActions, mapState } from "vuex";
import SubstituModelListTable from "_c/SubstituModelListTable";
import ScreenItem from "_c/ScreenItem";
export default {
  name: "Direct",
  data() {
    return {
      SpecialPrice: "",
      isOLdProduct: "",
      brandList: [],
      currentPage: 1,
      pageSize: 10,
      ProductnformaList: [],
      total: 0,
      query: {},
      screenTypeList: [],
      propertyCount: 0,
      //
      limitNum: 12,
      showScreenList: true,
      selectedScreen: {},
      selectedGoods: {},
      ScreenProductTotal: 0,
      //搜索类型1：标识按照筛查条件搜索0：是按照热搜搜索
      searchType: 0,
      valueName: "",
      hasHotResearch: false
    };
  },
  watch: {
    propertyCount(val) {
      console.log(val);
    },
    "selectedGoods.goods_type": {
      handler: function(val, oldVal) {
        delete this.selectedGoods.is_old_product;
      }
    },
    $route: {
      // val是改变之后的路由，oldVal是改变之前的val
      handler: function(val, oldVal) {
        console.log("luyoubianhu");
        if (this.$route.query.tag) {
          this.query = this.$route.query;
        } else {
          this.query = this.directJOSN;
        }
        this.selectedScreen={}
        this.selectedGoods={}
        this.ScreenProductTotal=0;
        this.brandList=[]
        this.propertyCount=0;
        this.init();
        this.getPropertyByParentId();
      },
      // 深度观察监听
      deep: true
    },
    selectedScreen: {
      deep: true,
      handler: function(val, oldVal) {
        this.queryMatchCount();
      }
    },
    selectedGoods: {
      deep: true,
      handler: function(val, oldVal) {
        this.queryMatchCount();
      }
    }
  },
  components: {
    SubstituModelListTable,
    ScreenItem
  },
  computed: {
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    ...mapState({
      directJOSN: state => state.Direct.directJOSN
    })
  },
  methods: {
    //   handleScroll() {
    //             var scrollTop =
    //                 window.pageYOffset ||
    //                 document.documentElement.scrollTop ||
    //                 document.body.scrollTop;
    //             if (scrollTop > 200) {
    //                 this.showFloatResult = true;
    //             } else {
    //                  this.showFloatResult = false;
    //             }
    //             console.log(this.showFloatResult)
    //         },
    handleInput(k) {
      //搜索属性
      let obj = {
        property_id: this.screenTypeList[k].propertyId,
        value: this.screenTypeList[k].search,
        brandId: this.selectedScreen.brand_id
      };
      axios
        .request({ url: "api-g/goods-center/queryThirdProperty", params: obj })
        .then(res => {
          this.screenTypeList[k].childList = res.data;
        });
    },
    changeIsOldProduct(e) {
      if (e) {
        this.propertyCount++;
        this.$set(this.selectedGoods, "is_old_product", true);
      } else {
        this.propertyCount--;
        delete this.selectedGoods.is_old_product;
        this.queryMatchCount();
      }
    },
    changeSpecialPrice(e) {
      if (e) {
        this.propertyCount++;
        this.$set(this.selectedGoods, "special_price", false);
      } else {
        this.propertyCount--;
        delete this.selectedGoods.special_price;
        this.queryMatchCount();
      }
    },
    cancleChecked(e) {
      if (e === this.selectedGoods.create_tag) {
        this.$set(this.selectedGoods, "create_tag", undefined);
        this.propertyCount--;
        //delete this.selectedGoods.create_tag
      } else {
        if (this.selectedGoods.create_tag === undefined) {
          this.propertyCount++;
        }
        this.$set(this.selectedGoods, "create_tag", e);
      }
    },
    cancleChecked1(e) {
      if (e === this.selectedGoods.goods_type) {
        this.$set(this.selectedGoods, "goods_type", undefined);
        this.propertyCount--;
      } else {
        if (this.selectedGoods.goods_type === undefined) {
          this.propertyCount++;
        }
        this.$set(this.selectedGoods, "goods_type", e);
      }
    },
    // 获取热搜的值
    hotSearchValue(val) {
      // this.valueName = val;
      this.currentPage = 1;
      this.hasHotResearch = true;
      this.searchType = 0;
      this.getSearchByBrandId();
    },
    // 点击搜索按钮
    hotSearchsubmit() {
      this.hasHotResearch = true;
      this.searchType = 0;
      this.currentPage = 1;
      this.getSearchByBrandId();
    },
    //改变筛选条件
    selected(k, index0) {
      this.$set(this.screenTypeList[k], "selected", index0);
      if (!this.selectedScreen[this.screenTypeList[k].propertyId]) {
        this.propertyCount++;
      }
      this.$set(
        this.selectedScreen,
        this.screenTypeList[k].propertyId,
        this.screenTypeList[k].childList[index0]
      );
    },
    //筛选总数
    queryMatchCount() {
      this.$loading(this.$store.state.loading);
      let obj = {
        parent_id: this.query.documentid
          ? this.query.documentid
          : this.query.parentId,
        start: this.start,
        length: this.pageSize,
        ...this.selectedScreen,
        ...this.selectedGoods
      };
      if (this.query.brandId) {
        obj.brand_id = this.query.brandId;
      }
      axios.request({ ...BrandDetail.queryMatchCount, data: obj }).then(res => {
        this.$loading(this.$store.state.loading).close();
        this.ScreenProductTotal = res.data;
      });
    },
    // 筛选搜索查询全部
    changeType() {
      //改变全局的搜索类型
      this.searchType = 1;
      this.$loading(this.$store.state.loading);
      this.currentPage = 1;
      this.getChangeTypeGoodsList();
    },
    getChangeTypeGoodsList() {
      this.$loading(this.$store.state.loading);
      let obj = {
        parent_id: this.query.documentid
          ? this.query.documentid
          : this.query.parentId,
        start: this.start,
        length: this.pageSize,
        ...this.selectedScreen,
        ...this.selectedGoods
      };
      if (this.query.brandId) {
        obj.brand_id = this.query.brandId;
      }
      axios.request({ ...BrandDetail.queryByProperty, data: obj }).then(res => {
        this.$loading(this.$store.state.loading).close();
        if (res.data.data) {
          this.ProductnformaList = res.data.data;
        } else {
          this.ProductnformaList = [];
        }
        this.total = res.data.total;
      });
    },
    // 返回上一级
    // AllSend() {
    //   this.$router.go(-1);
    //   this.screenListOne = {};
    //   this.flag = !this.flag;
    // },
    //根据brandId获取产品参数
    getTypeByBrandId(index0) {
      if (!this.selectedScreen.brand_id) {
        this.propertyCount++;
      }
      this.selectedScreen = {};
      this.$set(this.selectedScreen, "brand_id", this.brandList[index0].id);
      this.getPropertyByParentId();
    },
    //获取筛选条件列表
    getPropertyByParentId() {
      let data = {
        catergoryId: this.query.documentid
          ? this.query.documentid
          : this.query.parentId,
        brandId: this.query.brandId
          ? this.query.brandId
          : this.selectedScreen.brand_id
      };
      if (this.query.brandId) {
        this.selectedScreen.brand_id = this.query.brandId;
      }
      //筛查类型
      axios
        .request({ ...BrandDetail.queryPropertyByParentId, params: data })
        .then(res => {
          if (!this.brandList.length) {
            this.brandList = res.data.factory;
            if(!this.selectedScreen.brand_id){
              this.selectedScreen.brand_id=res.data.factory[0].id;
            }
          }
          this.screenTypeList = res.data.propertyList.map(item => {
            return item;
          });
        });
    },
    // 重置筛选
    resetScreen() {
      this.screenTypeList = this.screenTypeList.map(item => {
        item.selected = -1;
        return item;
      });
      this.selectedScreen = {};
      this.selectedGoods = {};
      this.SpecialPrice = false;
      this.isOLdProduct = false;
      this.propertyCount = 0;
    },
    delselectedScreenItem(k) {
      let obj = this.selectedScreen;
      delete obj[k];
      this.propertyCount--;
      this.selectedScreen = { ...obj };
      this.screenTypeList = this.screenTypeList.map(item => {
        if (item.propertyId == k) {
          item.selected = -1;
        }
        return item;
      });
    },
    //按照brandId 搜索
    getSearchByBrandId() {
      this.$loading(this.$store.state.loading);
      let obj = {
        type: 3,
        parent_id: this.query.documentid
          ? this.query.documentid
          : this.query.parentId,
        brandId: this.query.brandId,
        start: this.start,
        length: this.pageSize,
        name: this.valueName
      };
      axios
        .request({ ...BrandDetail.findGoodsBaseInfoAndExInfo, params: obj })
        .then(res => {
          this.$loading(this.$store.state.loading).close();
          this.ProductnformaList = res.data.data;
          this.total = res.data.total;
        });
    },
    init() {
      this.$loading(this.$store.state.loading);
      //改变全局的搜索类型
      this.searchType = 0;
      if (this.query.brandId) {
        console.log("0");
        this.getSearchByBrandId();
      } else {
        console.log("1");
        let obj = {
          tag: this.query.tag,
          id: this.query.documentid,
          name: this.query.name,
          start: this.start,
          length: this.pageSize
        };
        axios
          .request({ ...BrandDetail.searchResult, params: obj })
          .then(res => {
            this.$loading(this.$store.state.loading).close();
            this.ProductnformaList = res.data.direct.data;
            this.total = res.data.direct.total;
            console.log(res.data);
            this.query = {
              ...this.query,
              parentName: res.data.parentName,
              parentId: res.data.parentId
            };
          });
      }
    },
    handleCurrentPageChange(x) {
      this.currentPage = x;
      if (this.searchType == 0) {
        //判断是否是热搜过
        if (this.hasHotResearch) {
          this.getSearchByBrandId();
        } else {
          this.init();
        }
      } else if (this.searchType == 1) {
        //标识筛选
        this.getChangeTypeGoodsList();
      }
    }
  },
  mounted() {
    if (this.$route.query.tag) {
      //搜索跳转
      console.log("搜索跳转");
      this.query = this.$route.query;
    } else {
      //从父级跳转
      console.log("从父级跳转");
      console.log("this.directJOSN", this.directJOSN);
      this.query = this.directJOSN;
    }
    this.init();
    this.getPropertyByParentId();
    // window.addEventListener("scroll", this.handleScroll);
  }
  //   destroyed() {
  //             window.removeEventListener("scroll", this.handleScroll);
  //         }
};
</script>
