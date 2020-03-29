<template>
  <div class="specialPrice">
    <div class="banner" :class="showmimg?'':'hiddenimg'">
      <img src="@/assets/image/specialPrice/special.jpg" alt />
    </div>
    <div class="cont allWidth" style="padding:0;">
      <div class="tit">
        <div class="title" style="margin-bottom:15px;">条件筛选</div>
        <div class="title" style="border-bottom:1px dashed #ddd;">
          <div class="one">品牌</div>
          <ul class="clear brand " :class="!showmoreActive?'showmoreActive':''">
            <li
              v-for="(item ,k) in brandlist"
              :key="k"
              @click="getSpecialList(k,'brand')"
              :class="{'active':brand_k===k}"
            >
              <ImgE :src="item.imgurl" :w="90" :H="30"></ImgE>
            <a class="el-icon-circle-close color close" @click.stop="deleBrand(k)" v-if="brand_k===k"></a>
            </li>
          </ul>
          <a class="showmore el-icon-circle-plus-outline" @click="showmore"></a>
        </div>
        <div class="title" style="margin-top:15px;">
          <div class="one">类别</div>
          <ul class="clear" :class="!showmoreActive1?'showmoreActive1':''">
            <li @click="getSpecialList(-1,'cate')" :class="{'color':cate_k==-1}">全部({{sumCount}})</li>
            <li
              v-for="(item ,k) in categoryList"
              :key="k"
              @click="getSpecialList(k,'cate')"
              :class="{'color':cate_k==k}"
            >{{item.name}}({{item.sum}})</li>
          </ul>
           <a class="showmore el-icon-circle-plus-outline" @click="showmore1"></a>
        </div>
      </div>
      <div class="search clear">
        <div class="fr">
          <el-input
            placeholder="在结果中查找型号"
            v-model="name"
            size="small "
            @keyup.enter.native="inputHandler"
            class="inputSearch"
            style="width:250px;"
            clearable
          >
            <el-button slot="append" @click="inputHandler">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="goodsList">
        <ul class="list clear" v-if="specialList.length">
          <li
            v-for="(item,k) in specialList"
            class="item fl"
            :class="(k+1)%3==0?'noMargin':''"
            :key="k"
          >
            <one-goodsDetail :item="item" @countDownE_cb="countDownE_cb"></one-goodsDetail>
          </li>
        </ul>
        <Pagination
          v-if="total"
            :color="'lightYellow'"
          :pageSize="pageSize"
          :total="total"
          :currentPage="currentPage"
          @current-change="currentChange"
        ></Pagination>
      </div>
    </div>
  </div>
</template>
<script>
import oneGoodsDetail from "_c/oneGoodsDetail";
import { ladderPrice, TimeForma } from "../../lib/utils";
import { axios, home, shoppingCar } from "../../api/apiObj";
import { mapState, mapActions, mapMutations } from "vuex";
import { baseURL3 } from "@/config";
export default {
  data() {
    return {
      baseURL3: baseURL3,
      specialList: [],
      categoryList: [],
      pageSize: 9,
      currentPage: 1,
      selectedK: -1,
      showGetMore: true,
      total: 0,
      name: "",
      brand_k: "",
      cate_k: "",
      brandId: "",
      sumCount: 0,
      brandlist: [],
      showmoreActive:false,
      showmoreActive1:false,
      showmimg:true
    };
  },
  components: {
    oneGoodsDetail
  },
  computed: {
    ...mapState({
      loginState: state => state.loginState
    }),
    start() {
      return (this.currentPage - 1) * this.pageSize;
    }
  },
  filters: {
    filterHours(val) {
      return parseFloat(val) * 24;
    },
    formatDate(val) {
      return TimeForma(val);
    }
  },
  mounted() {
    var _this=this;
    // setTimeout(function(){
    //   _this.showmimg=false
    // },6000)
    this.getCategroy();
    this.getSpecialList(-1);
  },
  methods: {
    ...mapMutations(["setloginState", "setshowlogin"]),
    showmore1(){
      this.showmoreActive1=!this.showmoreActive1
    },
    showmore(){
       this.showmoreActive=!this.showmoreActive
    },
    deleBrand(k){
      this.brand_k="";
      this.brandId=""
      this.currentPage = 1;
      this.getCategroy();
      this.getSpecialOfferList();
    },
    currentChange(x) {
      this.currentPage = x;
      this.getSpecialOfferList();
    },
    inputHandler() {
      this.currentPage = 1;
      this.getSpecialOfferList();
    },
    countDownE_cb() {
      this.getSpecialOfferList();
    },
    addFocus(index) {
      if (!this.loginState) {
        this.setshowlogin(true);
        return;
      }
      let obj = {
        user_tag: this.specialList[index].tag,
        seller_id: this.specialList[index].sellerId,
        favour_type: 2
        //标识关注卖家
      };
      var _this = this;
      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          _this.$set(_this.specialList[index], "focus", true);
          _this.$message.success("已关注");
        });
    },
    chipShop(item) {
      if (item.tag == 1) {
        this.$router.push({
          path: "/BrandDetail",
          query: {
            tag: "brand",
            documentid: item.brandId,
            name: item.brandName
          }
        });
      } else {
        this.$router.push({
          path: "/sellerShopDetail",
          query: {
            sellerId: item.sellerId
          }
        });
      }
    },
    chipSellerGoodsDetal(item) {
      //跳转商品详情
     // sessionStorage.setItem("sellerGoodsDetail", JSON.stringify(item));
      this.$router.push("/sellerGoodsDetail?seller_goods_id="+item.id);
    },
    getSpecialList(k, key) {
      if (key == "brand") {
        this.brand_k = k;
        if (this.brandlist[k]) {
          this.brandId = this.brandlist[k].id;
        } else {
          this.brandId = "";
        }
        this.getCategroy();
      } else {
        this.cate_k = k;
        if (this.categoryList[k]) {
          this.categoryId = this.categoryList[k].id;
        } else {
          this.categoryId = "";
        }
      }
      //根据分类获取商品列表
      this.currentPage = 1;
      this.getSpecialOfferList();
    },
    getCategroy() {
      axios
        .request({
          ...home.queryDirectC,
          params: {
            //"special_price":"false",
            is_old_product: false,
            goods_type:true,
            start: 0,
            length: 100,
            brand_id:this.brandId
          }
        })
        .then(res => {
          // let count = 0;
          // this.categoryList = res.data.list.map(item => {
          //   count += Number(item.sum);
          //   return item;
          // });
         this.categoryList = res.data.list
          this.sumCount = res.data.total;
          this.brandlist = res.data.brand;
        });
    },
    getSpecialOfferList() {
      var time0=(new Date()).valueOf()
        console.log("请求开始时间：", time0)
      this.$loading(this.$store.state.loading);
      let obj = {
        start: this.start,
        length: this.pageSize,
        is_old_product: false,
          "goods_type":true,
        status: 1,
        catergory_id: this.categoryId,
        brand_id: this.brandId
      };
      if (this.name) {
        obj.name = this.name;
      }
      axios.request({ ...home.SpecialOfferList, params: obj }).then(res => {
        var time2=(new Date()).valueOf()
          console.log("请求结束时间：",time2)
          console.log("请求用时(毫秒)：",time2-time0)
          var time3 =(new Date()).valueOf()
            console.log("数据处理开始时间：",time3)
        this.$loading(this.$store.state.loading).close();
        if (res.data.data.length) {
          //this.sumCount = res.data.total;
          this.specialList = res.data.data.map(item => {
            if (item.priceType) {
              //标识阶梯价
              item.priceList = ladderPrice(item.priceLevel);
            }
            return item;
          });
        } else {
          this.specialList = [];
          this.$message({
            message: "搜索结果为空",
            type: "warning"
          });
        }
        var time4=(new Date()).valueOf()
          console.log("数据处理时间：",time4)
          console.log("处理数据用时(毫秒)：",time4-time3)
        this.total = res.data.total;
      });
    }
  }
};
</script>
<style scoped lang="less">
@import "./specialGoods.less";
</style>
