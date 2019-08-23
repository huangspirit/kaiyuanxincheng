<template>
  <div class="allQuiryList">
    <p v-if="allInquiryData.length<=0">暂无数据</p>
    <div v-for="(item,index) in allInquiryData" :key="index">
      <div class="allQuiryTop">申请编号：{{item.inquirySheetNo}}</div>
      <div class="companyDetail">
        <li>
          项目名称：
          <span>{{item.projectName}}</span>
        </li>
        <li>
          产品阶段：
          <span>{{item.projectProcess}}</span>
        </li>
        <li>
          量产时间：
          <span>{{item.projectBeginTime | formatDate}}</span>
        </li>
        <li>
          公司名称：
          <span>{{item.companyName}}</span>
        </li>
        <li>
          公司网址：
          <span>{{item.website}}</span>
        </li>
        <li>
          联系人：
          <span>{{item.contactName}}</span>
        </li>
        <li>
          职位：
          <span>{{item.position}}</span>
        </li>
        <li>
          联系电话：
          <span>{{item.telphone}}</span>
        </li>
        <li>
          提交日期：
          <span>{{item.sheetCreatime | formatDate}}</span>
        </li>
        <li>
          有效期至：
          <span>{{item.effectEndTime | formatDate}}</span>
        </li>
        <li>
          备注说明：
          <span>{{item.remark}}</span>
        </li>
      </div>
      <div class="inquiryList">
        <el-table :data="item.list" border stripe style="width: 100%">
          <el-table-column prop="goodsImage" label="图片" width="180">
            <template slot-scope="scope">
              <img v-if="scope.row.goodsImage!='-'" :src="scope.row.goodsImage" width="120" alt />
              <img v-else src="http://brand.113ic.com/6cb875d1fc454665a3e78b5ac675e391.jpg" alt />
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="名称"></el-table-column>
          <el-table-column prop="goodsDesc" label="功能描述"></el-table-column>
          <el-table-column prop label="竞争型号">
            <template slot-scope="scope">
              <span>{{scope.row.insteadNo.split('@')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="projectEau" label="年常用量EAU"></el-table-column>
          <el-table-column prop="acceptPrice" label="接受价格T/P">
            <template slot-scope="scope">
              <span v-if="scope.row.acceptUnit">$</span>
              <span v-else>￥</span>
              <span>{{scope.row.acceptPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column prop label="批复价格" width="300px">
            <template slot-scope="scope">
              <div>
                <p>
                  <span>批复价格：</span>
                  <span v-if="scope.row.priceType == false">{{scope.row.seckilPrice}}</span>
                  <span v-if="scope.row.priceType == true">{{scope.row.priceLevel}}</span>
                </p>
                <p>
                  <span>预计交期：</span>
                  <span>{{scope.row.currentTime | formatDate(scope.row.currentTime)}}</span>
                </p>
                <p>
                  <span>交货地：</span>
                  <span>{{scope.row.diliverPlace}}</span>
                </p>
                <p>
                  <span>价格有效期：</span>
                  <span>{{scope.row.priceExpireTime | formatDate(scope.row.priceExpireTime)}}</span>
                </p>
                <p>
                  <span>批复时间：</span>
                  <span>{{scope.row.replyTime | formatDate(scope.row.replyTime)}}</span>
                </p>
              </div>
              <p
                class="isApproved"
                v-if="scope.row.sheetEffective == true&&scope.row.replayStates == true"
              >已批复</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="Pagination" v-if="allInquiryData.length>0">
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next, jumper"
        :page-size="2"
        :total="total"
        background
        @current-page="currentPage"
        @current-change="change"
        ref="pagination"
      ></el-pagination>
    </div>
    <allReplyDialog
      v-if="replyDialogVisible"
      :replyDialogVisible="replyDialogVisible"
      :allListData="allListData"
      v-on:dialogVisibleClose="replyVisibleClose"
    ></allReplyDialog>
  </div>
</template>

<script>
import { axios, siderInquiryList } from "@/api/apiObj";
import "@/lib/filters";
import allReplyDialog from "./replyDialog/replyDialog";
import "./AlreadyInquiry.less";
export default {
  data() {
    return {
      allInquiryData: [],
      allListData: [],
      replyDialogVisible: false,
      start: 0,
      total: 0
    };
  },
  components: {
    allReplyDialog
  },
  mounted() {
    this.getAllReplyList();
    eventBus.$on("personalalreadyReply", val => {
      this.$refs.pagination.internalCurrentPage = 1;
      if (val != null) {
        this.allInquiryData = val.data;
        this.total = val.total;
      } else {
        this.allInquiryData = [];
      }
    });
  },
  computed: {},
  methods: {
    getAllReplyList() {
      var obj = {
        start: this.start,
        length: 2,
        reply_status: true,
        type: false
      };
      axios.request({ ...siderInquiryList.allReply, params: obj }).then(res => {
        if (res.resultCode == "200") {
          if (res.data != null) {
            this.allInquiryData = res.data.data;
            this.total = res.data.total;
          } else {
            this.allInquiryData = [];
          }
        }
      });
    },
    replyRequest(val) {
      console.log(val);
      this.replyDialogVisible = true;
      this.allListData = val.row;
    },
    replyVisibleClose(val) {
      console.log(val, "5555555");
      this.replyDialogVisible = val;
    },
    currentPage(val) {
      console.log("11", val);
    },
    change(val) {
      console.log(val);
      this.start = val;
      this.getAllReplyList();
    }
  }
};
</script>

<style lang="less" scoped>
.allQuiryList {
  width: 100%;
  > p {
    width: 100%;
    min-height: 600px;
    line-height: 200px;
    text-align: center;
  }
  > div {
    margin: 20px 0;
    .allQuiryTop {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      height: 60px;
      line-height: 60px;
      background-color: rgb(74, 90, 106);
      color: #fff;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      > span {
        background: #cc0000;
        transform: rotate(45deg);
        width: 100px;
        height: 50px;
        line-height: 74px;
        text-align: center;
        position: absolute;
        right: -37px;
        bottom: 20px;
      }
    }
    .companyDetail {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
      border: 1px solid #dee3e9;
      > li {
        min-width: 320px;
        line-height: 45px;
        padding-left: 40px;
        font-size: 20px;
        border-left: 1px solid #dee3e9;
        color: #8194a7;
        font-weight: 500;
        &:nth-child(1) {
          color: #4a5a6a;
        }
        > span {
          color: #4a5a6a;
        }
      }
    }
    .inquiryList {
      width: 100%;
    }
  }
}
</style>
