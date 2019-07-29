<template>
  <div class="Undirect">
    <div class="BrandDetail-tit">
      <div class="wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">全部品牌</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{
            path:'/BrandDetail',
            query:{
              tag:'brand',
              documentid:this.query.brnadId,
              name:this.query.name
            }
          }"
          v-if="this.query.brnadId">{{brandName}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.query.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="all-brand">
      <!-- 经营品类 -->
      <div class="management-class">
        <!-- <div class="tit">
          <div class="wrapper">
            <img src="@/assets/image/brandDetail/u4675.png" alt>
            <span>经营品类</span>
            <span>|</span>
            <span>查看全部</span>
          </div>
        </div>-->
        <ul class="list">
          <li @click="AllSend('')" :class="{avtive:listFlag = ''}">
            <img src="@/assets/image/brandDetail/u1086.png" alt>
            <p>全部品类</p>
            <p class="num">({{productTotal}})</p>
          </li>
          <li
            v-for="(item, k)  in parentList"
            :key="`parentList_${item.catergoryId}`"
            @click="send(item)"
            :class="{avtive:listFlag == item.catergoryId}"
          >
            <ImgE :src="item.catergoryUrl" :W="60" :H="60"></ImgE>
            <p>{{item.catergoryName}}</p>
            <p class="num">({{item.summaryTotal}})</p>
          </li>
        </ul>
        <SubstituModelList :list="ProductnformaList"></SubstituModelList>
        <Pagination :currentPage.sync="currentPage" :total="total"></Pagination>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../AllBrand/AllBrand.less";
</style>

<script>

import { mapGetters, mapActions, mapState } from "vuex";
import SubstituModelList from "_c/SubstituModelList";
export default {
  name: "Undirect",
  data() {
    return {
      currentPage: 1,
      listFlag: -1,
      parent_id: "",
      sort_type: 0
    };
  },
  computed: {
    ...mapGetters("Undirect", ["ProductnformaList", "total"]),
    ...mapState({
      parentName: state => state.Undirect.parentName,
      parentId: state => state.Undirect.parentId,
      productTotal: state => state.Undirect.productTotal,
      parentList: state => state.Undirect.parentList
    }),
    brandName() {
      return this.$route.query.brandName;
    },
    start() {
      return (this.currentPage - 1) * 10;
    },
    brandId() {
      return this.$route.query.documentid;
    },
    query(){
      return this.$route.query
    }
  },
  watch: {
    currentPage() {
      this.AllSend();
    }
  },
  components: {
    SubstituModelList
  },
  methods: {
    AllSend(k) {
      this.$loading(this.$store.state.loading);
      this.listFlag = k;
      this.$store
        .dispatch("Undirect/GetDirectList", {
          brandId: this.$route.query.brnadId,
          name: "",
          sort_filds: 0,
          first_id: this.$route.query.catergoryId,
          start: this.start,
          sort_type: this.sort_type,

        })
        .then(() => {
          this.$loading(this.$store.state.loading).close();
        });
    },
    send(item) {
      this.parent_id = item.catergoryId;
      this.listFlag = item.catergoryId;
      let query = {
        parent_id: this.parent_id,
        name: item.catergoryName,
        brandId: this.query.brnadId,
        start: this.start,
        firstCatergoryId:this.query.brnadId ? this.query.catergoryId : this.query.documentid,
        preName: this.query.name,
        brandName: this.query.brandName,
        documentid:item.catergoryId,
        tag:this.query.tag ? 'direct' : ''
      };
      this.$router.push({
        path: "/BrandDetail/Direct",
        query: query
      });
    }
  },
  mounted() {
    this.$loading(this.$store.state.loading);
    if (this.query.brnadId) {
      this.$store
        .dispatch("Undirect/GetUndirect", {
          firstCatergoryId: this.query.catergoryId,
          brandId: this.query.brnadId
        })
        .then(res => {
          this.AllSend();
        });
    } else {

      this.$store
        .dispatch("Undirect/GetSearchDirect", {
          tag: this.query.tag,
          documentid: this.query.documentid,
          name: this.query.name,
          start: this.start
        })
        .then(res => {
          this.listFlag = this.query.documentid;
          this.AllSend();
        });
    }
  }
};
</script>


