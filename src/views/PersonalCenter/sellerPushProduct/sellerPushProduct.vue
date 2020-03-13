<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>
        产品库管理
        </el-breadcrumb-item>
        <p class="fr" style="margin-right:20px;"> 
          <router-link to="/PersonalCenter/publish">
          <el-button type="primary">发布产品</el-button>
        </router-link>
        </p>
    </el-breadcrumb>
    <div class="wrap">
      <div class="cateGory">
        <p>产品类别：</p>
        <ul>
          <li
            v-for="item in twoClassList"
            :key="item.catergoryId"
            :class="item.catergoryId==currentClass.catergoryId?'bgColor':''"
            @click="setCLass(item)"
          >{{item.catergoryName}} ({{item.summaryTotal | toFixed(0)}})</li>
        </ul>
      </div>
      <div class="title">
        <!-- <router-link to="/PersonalCenter/publish">
          <el-button class="fr" type="primary">发布产品</el-button>
        </router-link> -->
        <el-input
          placeholder="在结果中查找型号"
          v-model="name"
          class="inputSearch"
          @keyup.enter.native="inputHandler"
          style="width:350px;"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="inputHandler"
            class="append bgColor"
          ></el-button>
        </el-input>
      </div>
      <el-table :data="goodsList" stripe style="width: 100%">
        <el-table-column prop="name" label="型号与描述" align="center" width="350">
          <template slot-scope="scoped">
            <div class="goodsinfo">

              <ImgE :src="scoped.row.imageUrl" :H="60" :W="60"></ImgE>
              <div>
                <p>
                  <router-link
                    class="color"
                    :to="{
                  path:'/BrandDetail/GoodsDetails',
                  query:{
                    tag:'goodsinfo',
                    documentid:scoped.row.id,
                    name:scoped.row.productno
                  }
                }"
                  >{{scoped.row.productno}}</router-link>
                </p>
                <p class="gray">描述：{{scoped.row.productdesc}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="类别" align="center">
          <template slot-scope="scoped">
            <p>{{scoped.row.firstName}}--></p>
            <p class="blu">{{scoped.row.classification}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="数据手册" align="center">
          <template slot-scope="scoped">
            <img
              @click="openBig(scoped.row.id)"
              src="@/assets/image/brandDetail/pdf.png"
              alt
              style="cursor:pointer;"
            />
          </template>
        </el-table-column>
         <el-table-column prop="address" label="零件状态" align="center">
          <template slot-scope="scoped">
            <p>{{scoped.row.qijian}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="官方参考价" align="center">
          <template slot-scope="scoped">
            <p>${{scoped.row.price}}</p>
            <a class="color" @click="publish(scoped.row)">去发布特价</a>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="单位" align="center">
             <template slot-scope="scoped">
            <p>{{scoped.row.unit}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="MPQ" align="center">
             <template slot-scope="scoped">
            <p>{{scoped.row.mpq}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="authState" label="审核状态" align="center">
             <template slot-scope="scoped">
            <p v-if="scoped.row.authState">已审核</p>
            <p v-if="!scoped.row.authState">待审核</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
            <a class="blu" @click="reset(scope.row)">修改</a>
          </template>
        </el-table-column>
      </el-table>
         <Pagination :currentPage.sync="currentPage" :total="total" @current-change="handleChangePage" v-if="total"></Pagination>
    </div>
    <el-dialog title :visible.sync="showPdf" width="70%">
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <iframe
          id="ifra1"
          :src="datasheet"
          frameborder="0"
          width="100%"
          height="600px"
          v-if="datasheet"
        ></iframe>
      </div>
    </el-dialog>
  </div>
</template>
.<script>
import { baseURL3,baseURL, baseURL2 } from "@/config";
import { axios, sellerCenter } from "@/api/apiObj";
import { mapState } from "vuex";
export default {
  data() {
    return {
      showPdf: false,
      loading: false,
      twoClassList: [
        {
          catergoryId: 17,
          catergoryUrl: "http://catergory.113ic.com/jy_17_压控振荡器VCXO.png",
          catergoryName: "压控振荡器VCXO",
          summaryTotal: 195728,
          parentId: 15
        },
        {
          catergoryId: 223,
          catergoryUrl:
            "http://catergory.113ic.com/jy_223_温补振荡器TCXO27WQK53.png",
          catergoryName: "温补振荡器TCXO",
          summaryTotal: 141140,
          parentId: 15
        },
        {
          catergoryId: 221,
          catergoryUrl:
            "http://catergory.113ic.com/jy_221_宽温振荡器SPVYE21.png",
          catergoryName: "宽温振荡器",
          summaryTotal: 93000,
          parentId: 15
        },
        {
          catergoryId: 16,
          catergoryUrl: "http://catergory.113ic.com/jy_16_低功耗振荡器.png",
          catergoryName: "低功耗振荡器",
          summaryTotal: 90770,
          parentId: 15
        },
        {
          catergoryId: 225,
          catergoryUrl:
            "http://catergory.113ic.com/jy_225_扩频振荡器8DUGX10.png",
          catergoryName: "扩频振荡器",
          summaryTotal: 71720,
          parentId: 15
        },
        {
          catergoryId: 23,
          catergoryUrl:
            "http://catergory.113ic.com/jy_23_差分振荡器MHQWS38.png",
          catergoryName: "差分振荡器",
          summaryTotal: 34545,
          parentId: 15
        },
        {
          catergoryId: 22,
          catergoryUrl:
            "http://catergory.113ic.com/jy_22_低抖动振荡器CVAXL90.png",
          catergoryName: "低抖动振荡器",
          summaryTotal: 23552,
          parentId: 15
        },
        {
          catergoryId: 24,
          catergoryUrl:
            "http://catergory.113ic.com/jy_24_普通振荡器ZVRPG47.png",
          catergoryName: "普通振荡器",
          summaryTotal: 19320,
          parentId: 15
        },
        {
          catergoryId: 222,
          catergoryUrl:
            "http://catergory.113ic.com/jy_222_汽车级振荡器QHLZP40.png",
          catergoryName: "汽车级振荡器",
          summaryTotal: 18840,
          parentId: 15
        },
        {
          catergoryId: 220,
          catergoryUrl:
            "http://catergory.113ic.com/jy_220_32.768KHz振荡器QDF2475.png",
          catergoryName: "32.768KHz振荡器",
          summaryTotal: 116,
          parentId: 15
        }
      ],
      selectedTwoClass: "",
      goodsList:[],
      currentClass: {},
      pageSize: 10,
      currentPage: 1,
      total:0,
      name: "",
      datasheet: ""
    };
  },
  computed: {
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    ...mapState({
      UserInforma: state => state.Login.UserInforma
    })
  },
  mounted() {
    this.getTwoClass();
  },
  methods: {
    publish(item){
      this.$router.push(
            "/PersonalCenter/SellerIssuesProduct?name=" +
              item.productno
          );
    },
    handleChangePage(x){
      this.currentPage=x;
      this.getGoodsList()
    },
    setCLass(item) {
      if (this.currentClass.catergoryId == item.catergoryId) {
        this.currentClass = {};
      } else {
        this.currentClass = item;
      }
      this.currentPage = 1;
      this.getGoodsList();
    },
    getTwoClass() {
      axios
        .request({
          ...sellerCenter.querySllerCatergory,
          params: { brandId: this.UserInforma.userTagMap.brand }
        })
        .then(res => {
           this.twoClassList = res.data;
           this.currentClass=res.data[0];
           if(res.data.length){
            this.getGoodsList()
           }
           
        });
    },
    getGoodsList() {
      this.$loading(this.$store.state.loading);
      let obj = {
        brandId: this.UserInforma.userTagMap.brand,
        start: this.start,
        length: this.pageSize,
        name: this.name
      };
      if (this.currentClass.catergoryId) {
        obj.type = 3;
        obj.parent_id = this.currentClass.catergoryId;
      } else {
        obj.type = 1;
      }
      axios
        .request({ ...sellerCenter.querySllerStockGoodsList, params: obj })
        .then(res => {
          this.$loading(this.$store.state.loading).close();
          this.goodsList = res.data.data;
          this.total = res.data.total;
        });
    },
    inputHandler() {
      this.getGoodsList();
    },
    openBig(id) {
      this.loading = true;
      this.showPdf = true;
      var _this = this;
      _this.searchDatasheet(id);
    },
    // 查看产品手册
    searchDatasheet(id) {
      let ret = baseURL + "api-g/gods-anon/queryGoodsDatesheet?id=" + id;
      //this.downDatasheet = ret;
      let resp =
        baseURL2 + "static/pdf/web/viewer.html?file=" + encodeURIComponent(ret);
      this.datasheet = resp;
      const self = this;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
    reset(item){
      this.$router.push({
        path:"/PersonalCenter/publish?id="+item.id
      })
    }
  }
};
</script>
.<style lang="less" scoped>
.wrap {
  background: #fff;
  padding: 20px;
  color: #333;
  .cateGory {
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
    padding: 10px 0;
    display: flex;
    ul {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      li {
        line-height: 30px;
        padding: 0 12px;
        cursor: pointer;
        margin-right: 15px;
        &:hover {
          color: #df3f2f;
          font-weight: bolder;
        }
      }
    }
  }
  .title {
    color: #333;

    background: #fff;
    padding: 15px 10px;
    /deep/.el-input-group__append{
      background:#df3f2f;
    }
    ul {
      display: flex;
      li {
        text-align: center;
        line-height: 40px;
        background: #e3e3e3;
        margin-right: 1px;
        cursor: pointer;
      }
    }
  }
  .el-table {
    .goodsinfo {
      display: flex;
      text-align: left;
      div {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between
        
      }
    }
  }
}
</style>