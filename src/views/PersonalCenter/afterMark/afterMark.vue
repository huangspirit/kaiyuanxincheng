<template>
  <div class="sellerFeed">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>售后管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="feed">
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="title" label="售后类型" align="center"></el-table-column>
        <el-table-column prop="content" label="提交内容"  align="center"></el-table-column>
        <el-table-column prop label="附件内容"  align="center">
             <template slot-scope="scoped" v-if="scoped.row.imageUrls">
                <span v-for="item in scoped.row.imageUrls.split('@')" :key='item'>
                     <ImgE :src="item" :W="70" :H="70" :isBig="true" v-if="item.indexOf('png') != -1 || item.indexOf('jpg') != -1 || item.indexOf('jpeg') != -1"></ImgE>
                     <a :href="item" target="_blank" v-else class="tag borderBlu" title="点击查看">非图片文件</a>
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="replyContent" label="回复内容"  align="center">
            <template slot-scope="scoped">
                <span v-if="scoped.row.replyContent">{{scoped.row.replyContent}}</span>
                <span class="color" v-if="!scoped.row.replyContent">暂未回复</span>
            </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-if="total"
        :currentPage.sync="currentPage"
        :total="total"
        :page-size="pageSize"
        @current-change="handleChangePage"
      ></Pagination>
    </div>
  </div>
</template>
.<script>
import { axios, common } from "@/api/apiObj";
export default {
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: [],
    };
  },
  mounted() {
    this.init();
  },
  filters: {
    levelFilter(val) {
      switch (val) {
        case 0:
          return "一般";
        case 1:
          return "很紧急";
      }
    }
  },
  methods: {
    handleChangePage(x) {
      this.currentPage = x;
      this.init();
    },
    init() {
      let obj = {
        start: this.pageSize * (this.currentPage - 1),
        length: this.pageSize
      };
      axios.request({ ...common.queryAfterSalesList, params: obj }).then(res => {
        console.log(res);
        this.list = res.data;
        this.total = res.total;
      });
    }
  }
};
</script>
.<style scoped lang="less">
.feed {
  background: #fff;
  padding: 15px;
  .tag{
      padding:2px 6px;
     border-radius: 3px;
  }
}
</style>