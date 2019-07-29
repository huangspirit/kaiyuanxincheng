<template>
  <div class="AllBrand">
    <div class="BrandDetail-tit">
      <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">全部品牌</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/BrandDetail' }">{{brandInfo.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- // 全部品牌 -->
    <div class="all-brand">
      <!-- 品牌信息 -->
      <div class="brand-msg">
        <div class="tit">
          <div class="wrapper">
            <img src="@/assets/image/brandDetail/u5426.png" alt> 品牌信息
          </div>
        </div>
        <div class="brand-msg-con">
          <!--  -->
          <div class="wrapper">
            <!-- 图片信息 -->
            <div class="brand-msg-con-l">
              <ImgE :src="brandInfo.imageUrl" :W="438" :H="178"></ImgE>
              <ul>
                <li>网址：{{brandInfo.brandWeb}}</li>
                <li>电话：{{brandInfo.tel}}</li>
                <li>邮件：{{brandInfo.email}}</li>
              </ul>
            </div>
            <!-- 文字信息 -->
            <div class="brand-msg-con-r">
              <div class="tit">
                <span>{{brandInfo.name}}</span>
                <span class="tag">
                  <img src="@/assets/image/brandDetail/u4858.png" alt>
                  已入驻芯手网
                </span>
              </div>
              <p>
                公司简介
                <br>
                {{brandInfo.brandDesc}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 在线咨询 -->
      <!-- <ul class="online-consul">
        <li>
          <img src="@/assets/image/brandDetail/u4870.png" alt>
          <div>
            <p class="name">Williams</p>
            <p>总经理</p>
            <p class="online">在线咨询</p>
          </div>
        </li>
        <li>
          <img src="@/assets/image/brandDetail/u4870.png" alt>
          <div>
            <p class="name">Williams</p>
            <p>总经理</p>
            <p class="online">在线咨询</p>
          </div>
        </li>
        <li>
          <img src="@/assets/image/brandDetail/u4870.png" alt>
          <div>
            <p class="name">Williams</p>
            <p>总经理</p>
            <p class="online">在线咨询</p>
          </div>
        </li>
      </ul>-->
      <!-- 经营品类 -->
      <div class="management-class">
        <div class="tit">
          <div class="wrapper">
            <img src="@/assets/image/brandDetail/u4675.png" alt>
            <span>经营品类</span>
          </div>
        </div>
        <ul class="list">
          <li @click="AllSend(-1)" :class="{avtive:listFlag = -1}">
            <img src="@/assets/image/brandDetail/u1086.png" alt>
            <p>全部品类</p>
            <p class="num">({{totalCount}})</p>
          </li>
          <li
            v-for="(item, k)  in childrenList"
            :key="`childrenList_${item.catergoryId}`"
            @click="send(k,item)"
            :class="{avtive:listFlag === k}"
          >
            <ImgE :src="item.catergoryUrl" :W="60" :H="60"></ImgE>
            <p>{{item.catergoryName}}</p>
            <p class="num">({{item.summaryTotal}})</p>
          </li>
        </ul>
      </div>
      <!-- 搜索热卖 -->
      <!-- <HotSearch @input="hotSearchValue"></HotSearch> -->
      <SearchInput
        class="search"
        :placeholder="'搜索罗彻斯特电子(RE)产品'"
        :width="770"
        :height="80"
        :btnWidth="120"
        @input="hotSearchValue"
        @submit="hotSearchsubmit"
      ></SearchInput>
      <!-- 品牌热卖 -->
      <div class="brand-hot">
        <div class="tit">
          <div class="wrapper">
            <img src="@/assets/image/brandDetail/u4832.png" alt>
            <span>品牌热卖</span>
            <span>|</span>
            <span>查看全部</span>
          </div>
        </div>
        <!--  排序-->
        <ul class="sort-type">
          <li
            :class="{active:sortFlag == k }"
            v-for="(item, k) in sortTypeList"
            :key="`sortTypeList_${item.val}`"
            @click="sortTab(k,item)"
          >
            {{item.name}}
            <img
              :src="item.sortImgFlag ? require('@/assets/image/home/arrow_b.png') :  require('@/assets/image/home/arrow_t.png')"
              alt
            >
          </li>
        </ul>
        <SubstituModelList :list="ProductnformaList"></SubstituModelList>
        <Pagination :currentPage.sync="currentPage" :total="total"></Pagination>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./AllBrand.less";
</style>

<script>

import { BrandDetailData } from "@/api/BrandDetail";
import MerchantList from "_c/MerchantList";
import SubstituModelList from "_c/SubstituModelList";
import HotSearch from "_c/HotSearch";
import { mapGetters, mapActions } from "vuex";
import { stat } from "fs";
export default {
  name: "AllBrand",
  data() {
    return {
      currentPage: 1,
      valueName: "",
      sortFlag: "",
      // 当前类的id
      parent_id: "",
      listFlag: -1,
      sort_filds: "",
      // 排序列表
      sortTypeList: [
        {
          val: "",
          name: "综合排序",
          sortImgFlag: true
        },
        {
          val: 0,
          name: "销售总量",
          sortImgFlag: true
        },
        {
          val: 1,
          name: "原厂价格",
          sortImgFlag: true
        }
      ],
      sort_type: 0,
    };
  },
  computed: {
    ...mapGetters([
      "brandInfo",
      "managementList",
      "totalCount",
      "ProductnformaList",
      "total",
      "childrenList"
    ]),
    brandId() {
      return this.$route.query.documentid;
    },
    start() {
      return (this.currentPage - 1) * 10;
    },
    // 参数
    params() {
      return {
        brandId: this.brandId,
        name: this.valueName,
        sort_filds: this.sort_filds,
        start: this.start,
        sort_type: this.sort_type ? 0 : 1
      };
    }
  },
  watch: {
    params: {
      handler() {
        this.AllSend()
      },
      deep: true
    }
  },
  components: {
    MerchantList,
    HotSearch,
    SubstituModelList
  },
  methods: {
    AllSend(k) {
      this.$loading(this.$store.state.loading)
      this.listFlag = k;
      this.$store.dispatch("GetAllCategory", this.params).then(() => {
        this.$loading(this.$store.state.loading).close()
      })
    },
    // 获取热搜的值
    hotSearchValue(val) {
      this.valueName = val;
    },
    // 点击搜索按钮
    hotSearchsubmit() {
      this.AllSend;
    },
    send(k, item) {
      
      this.listFlag = k;
      this.parent_id = item.catergoryId;
      this.$router.push({
        path: "/BrandDetail/Undirect",
        query: {
          catergoryId: item.catergoryId,
          name: item.catergoryName,
          brandName: this.brandInfo.name,
          brnadId: this.$route.query.documentid
        }
      });
    },
    // 排序
    sortTab(k, item) {
      this.sortFlag = k;
      this.sort_filds = item.val;
      item.sortImgFlag = !item.sortImgFlag;
      this.sort_type = item.sortImgFlag;
    }
  },
  mounted() {
    this.$loading(this.$store.state.loading)
    this.$store
      .dispatch("GetBrandDetailData", {
        tag: this.$route.query.tag,
        documentid: this.$route.query.documentid,
        name: this.$route.query.name,
        start: this.start
      })
      .then(res => {
        this.AllSend();
      });

    this.$store.commit("SetBrandId", this.$route.query);
  }
};
</script>

