
<template>
  <div class="allQuiryList">
    <p v-if="allInquiryData.length<=0">暂无数据</p>
    <div v-for="(item,index) in allInquiryData" :key="index">
      <div class="allQuiryTop">
        申请编号：{{item.inquirySheetNo}}
      </div>
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
          <span>{{item.projectBeginTime}}</span>
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
          <span>{{item.sheetCreatime}}</span>
        </li>
        <li>
          有效期至：
          <span>{{item.effectEndTime}}</span>
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
              <img :src="scope.row.goodsImage" width="120" alt />
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="名称"></el-table-column>
          <el-table-column prop="goodsDesc" label="功能描述"></el-table-column>
          <el-table-column prop="inquirySheetNo" label="竞争型号"></el-table-column>
          <el-table-column prop="projectEau" label="年常用量EAU"></el-table-column>
          <el-table-column prop="acceptPrice" label="接受价格T/P"></el-table-column>
          <el-table-column prop label="批复价格" width="300px">
            <template slot-scope="scope">
              <div v-if="scope.row.sheetEffective==false&&scope.row.replayStates==true">
                <p>
                  <span>批复价格：</span>
                  <span v-if="scope.row.priceType == false">{{scope.row.seckilPrice}}</span>
                  <span v-if="scope.row.priceType == true">{{scope.row.priceLevel}}</span>
                </p>
                <p>
                  <span>预计交期：</span>
                  <span>{{scope.row.priceIntervalDay}} 天</span>
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
              <p v-if="scope.row.sheetEffective==false&&scope.row.replayStates==false">-------</p>
              <p class="failure" v-if="scope.row.sheetEffective == false">已失效</p>
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
import './AlreadyInquiry.less'
import allReplyDialog from "./replyDialog/replyDialog";
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
  },
  computed: {},
  methods: {
    getAllReplyList() {
      var obj = {
        start: this.start,
        length: 2,
        sheet_effective: false,
        type: false
      };
      axios.request({ ...siderInquiryList.allReply, params: obj }).then(res => {
        if (res.resultCode == "200") {
          this.allInquiryData = res.data.data;
          this.total = res.data.total;
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
        margin: 10px 20px;
        font-size: 20px;
        border-right: 1px solid #dee3e9;
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
