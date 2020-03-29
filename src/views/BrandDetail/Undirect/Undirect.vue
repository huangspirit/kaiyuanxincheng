<template>
  <div class="Undirect">
    <div class="BrandDetail-tit">
      <div class="wrapper allWidth">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/brand' }">全部品牌</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{
            path:'/BrandDetail',
            query:{
              tag:'brand',
              documentid:query.brandId,
              name:query.name
            }
          }"
            v-if="query.brandId"
          >{{query.brandName}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{query.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="all-brand allWidth">
      <!-- 经营品类 -->
      <div class="management-class brand-msg">
        <!-- <div class="tit">
          <div class="wrapper">
            <img src="@/assets/image/brandDetail/u4675.png" alt>
            <span>经营品类</span>
            <span>|</span>
            <span>查看全部</span>
          </div>
        </div>-->
        <div class="tit bgGray">
          <!-- <img src="@/assets/image/brandDetail/u4675.png" alt> -->
          <span>分类筛选</span>
        </div>
        <ul class="list">
          <li @click="AllSend" :class="{avtive:listFlag = -1}">
        
            <p>全部品类({{titleObj.productTotal | toFixed(0)}})</p>
            <!-- <p class="num">({{titleObj.productTotal | toFixed(0)}})</p> -->
          </li>
          <li
            v-for="(item, k)  in titleObj.list"
            :key="`parentList_${item.catergoryId}`"
            @click="send(item)"
            :class="{avtive:listFlag == item.catergoryId}"
          >
            <!-- <ImgE :src="item.catergoryUrl" :W="60" :H="60"></ImgE> -->
            <p>{{item.catergoryName}}({{item.summaryTotal | toFixed(0)}})</p>
            <!-- <p class="num">({{item.summaryTotal | toFixed(0)}})</p> -->
          </li>
        </ul>
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
        <div class="nocontent" v-if="ProductnformaList.length==0">暂无此类产品</div>
        <SubstituModelList :list="ProductnformaList" v-if="ProductnformaList.length"></SubstituModelList>
        <Pagination
          :currentPage.sync="currentPage"
          :total="total"
          @current-change="handleChangePage"
          v-if="total"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { axios, BrandDetail } from "../../../api/apiObj";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import SubstituModelList from "_c/SubstituModelList";
export default {
  name: "Undirect",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      listFlag: -1,
      parent_id: "",
      //sort_type: 0,
      valueName: "",
      titleObj: {},
      ProductnformaList: [],
      total: 0
    };
  },
  watch: {
    $route: {
      // val是改变之后的路由，oldVal是改变之前的val
      handler: function(val, oldVal) {
        console.log(val);
        this.init();
      },
      // 深度观察监听
      deep: true
    }
  },
  computed: {
  
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    // brandId() {
    //   return this.$route.query.brandId;
    // },
    query() {
      return this.$route.query;
    }
  },

  components: {
    SubstituModelList
  },
  methods: {
    ...mapMutations("Direct", ["savedirectJOSN"]),
    init() {
      this.$loading(this.$store.state.loading);
      if (this.query.brandId) {
        let obj = {
          brandId: this.query.brandId,
          firstCatergoryId: this.query.catergoryId
        };
        axios
          .request({ ...BrandDetail.queryCatergoryByParentId, params: obj })
          .then(res => {
            this.titleObj = res;
            this.AllSend();
          });
     
      } else {
        let obj = {
          tag: this.query.tag,
          id: this.query.documentid,
          name: this.query.name
        };
        axios
          .request({ ...BrandDetail.searchResult, params: obj })
          .then(res => {
            this.titleObj = res.data.undirect;
            this.AllSend();
          });
      }
    },
    AllSend() {
      this.$loading(this.$store.state.loading);
      this.ProductnformaList = [];
      let obj = {
        type: 2,
        name: this.valueName,
        first_id: this.$route.query.catergoryId,
        start: this.start,
        length: this.pageSize
      };
      if (this.$route.query.brandId) {
        obj.brandId = this.$route.query.brandId;
      } else {
        obj.first_id = this.$route.query.documentid;
      }
      axios
        .request({ ...BrandDetail.findGoodsBaseInfoAndExInfo, params: obj })
        .then(res => {
          this.total = res.data.total;
          this.ProductnformaList = res.data.data;
          this.$loading(this.$store.state.loading).close();
        });
    
    },
    // 获取热搜的值
    hotSearchValue(val) {
      // this.valueName = val;
      this.AllSend();
    },
    // 点击搜索按钮
    hotSearchsubmit() {
      this.AllSend();
    },
    handleChangePage(x) {
      this.currentPage = x;
      this.AllSend();
    },
    send(item) {
      this.parent_id = item.catergoryId;
      this.listFlag = item.catergoryId;
      let query = {
        parentId: item.catergoryId,
        parentName: this.query.name,
        name: item.catergoryName,
        brandId: this.query.brandId,
        brandName: this.query.brandName,
        firstCatergoryId: this.query.brandId
          ? this.query.catergoryId
          : this.query.brandId,
        documentid: item.catergoryId,
        tag: this.query.tag ? "direct" : ""
      };
      this.savedirectJOSN(query);
      this.$router.push({
        path: "/BrandDetail/Direct"
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.BrandDetail-tit {
  margin: 15px 0;
  background: #fff;
  padding: 15px 30px;
  box-shadow: 0 0 2px 2px #dddd;

  /deep/ .el-breadcrumb {
    font-size: 14px;
  }
}
.brand-msg {
  .top {
    color: #fff;
    .title {
      font-size: 30px;
      margin-bottom: 55px;
    }
    a {
      color: #fff;
    }
  }
  & > .tit {
    .inputSearch {
      margin-top: 13px;
      /deep/.el-input-group__append {
        padding: 0 10px;
      }
    }
    &.bg {
      color: #333;
      background: #f5f5f5;
      border: 1px solid #d5d5d5;
    }
    font-weight: bolder;
    color: #fff;
    padding: 0 30px;
    font-size: 18px;
    line-height: 55px;
    img {
      width: 20px;
      vertical-align: middle;
      margin-right: 15px;
    }
  }
  .brand-msg-con {
    margin-top: 80px;
    margin-bottom: 20px;
    padding: 20px 30px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    box-shadow: 0 0 2px 2px #ddd;
    // 图片信息
    .brand-msg-con-l {
      display: inline-block;
      vertical-align: middle;
      padding-right: 20px;
      box-sizing: border-box;
      min-width: 250px;
      .ImgE {
        position: relative;
        text-align: center;
        width: 100%;
        /deep/img {
          max-width: 100%;
          max-height: 100%;
        }
        &:after {
          top: 0;
          left: 0;
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.05);
          z-index: 1;
        }
      }
      & > ul {
        margin-top: 10px;
        li {
          font-size: 16px;
          color: #6b6b6b;
          margin-top: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    // 文字信息
    .brand-msg-con-r {
      display: inline-block;
      vertical-align: middle;
      & > .tit {
        font-size: 22px;
        margin-bottom: 10px;
        font-weight: bold;
        line-height: 1;
        .btn {
          padding: 3px 12px;
          border-radius: 3px;
          font-size: 14px;
          margin-left: 10px;
          vertical-align: top;
        }
      }
      p {
        font-size: 20px;
        color: #333;
        line-height: 30px;
        margin-bottom: 30px;
        &:last-child {
          font-size: 16px;
        }
      }
    }
  }
}
// 经营品类
.management-class {
  .nocontent {
    color: #d5d5d5;
    padding: 80px;
    text-align: center;
    background: #fff;
  }
  & > .list {
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 20%;
      font-size: 16px;
      cursor: pointer;
      text-align: center;
      p {
        margin-right: 10px;
        border: 1px solid #d5d5d5;
        background: rgb(242, 244, 247);
        padding: 10px 0;
        margin-bottom: 10px;
      }
      img {
        width: 80px;
        height: 80px;
        margin: 15px;
      }
      /deep/.ImgE {
        img {
          width: 80px;
          height: 80px;
          margin: 15px;
        }
      }
      &:hover {
        p{
 box-shadow: 0 0 2px 2px #d5d5d5;
        }
       
      }
      &.avtive {
        border-color: #df3f2f;
        color: #df3f2f;
        background: #fff;
      }
    }
  }
}
</style>


