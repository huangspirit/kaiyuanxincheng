<template>
  <div class="allQuiryList">
    <div v-for="(item,index) in allInquiryData" :key="index">
      <div class="allQuiryTop">
        <span>申请编号：2038474</span>
        <span>用户与 2019—2—2 12：33：44 提醒批复</span>
      </div>
      <div class="allQuiryDetail">
        <li>
          <p>
            项目名称：
            <span>{{item.projectName}}</span>
          </p>
          <p>
            产品阶段:
            <span>{{item.projectProcess}}</span>
          </p>
          <p>
            量产时间：
            <span>{{item.projectBeginTime | formatDate(item.projectBeginTime)}}</span>
          </p>
        </li>
        <li>
          <p>
            公司名称：
            <span>{{item.companyName}}</span>
          </p>
          <p>
            公司网址：
            <span>{{item.website}}</span>
          </p>
          <p>
            联系人：
            <span>{{item.contactName}}</span>
          </p>
          <p>
            职位：
            <span>{{item.position}}</span>
          </p>
          <p>
            联系电话:
            <span>{{item.telphone}}</span>
          </p>
        </li>
        <li>
          <p>
            提交日期
            <span>{{item.website}}</span>
          </p>
          <p>
            有效期至：
            <span>{{item.website}}</span>
          </p>
          <p>
            备注说明：
            <span>{{item.remark}}</span>
          </p>
        </li>
      </div>
      <table class="allQuiryTable" border="1" width="100%">
        <tr>
          <th width="30%">询价商品</th>
          <th>竞争型号</th>
          <th>竞争型号</th>
          <th>接受价格T/p</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>January</td>
          <td>$100</td>
          <td>$100</td>
          <td>$100</td>
          <td>$100</td>
        </tr>
      </table>
    </div>
    <div class="Pagination">
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
  </div>
</template>

<script>
import { axios, siderInquiryList } from "@/api/apiObj";
import "@/lib/filters";
export default {
  data() {
    return {
      allInquiryData: [],
      start: 0,
      total: 0
    };
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
        type: false
      };
      axios.request({ ...siderInquiryList.allReply, params: obj }).then(res => {
        console.log(res);
        if (res.resultCode == "200") {
          this.allInquiryData = res.data.data;
          this.total = res.data.total;
        }
      });
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
  > div {
    margin: 20px 0;
    .allQuiryTop {
      width: 100%;
      padding: 0 20px;
      height: 45px;
      line-height: 45px;
      background-color: rgb(74, 90, 106);
      color: #fff;
      > span {
        margin-right: 20px;
      }
    }
    .allQuiryDetail {
      > li {
        display: flex;
        flex-wrap: wrap;
        &:nth-child(even) {
          background: #eee;
        }
        > p {
          min-width: 200px;
          margin-right: 10px;
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .allQuiryTable {
      > tr {
        height: 45px;
        &:nth-child(old) {
          background: #eee;
        }
        > th {
          border: 1px solid rgba(74, 90, 106, 0.8);
          background: #eeeeee;
        }
        > td {
          text-align: center;
          border: 1px solid rgba(74, 90, 106, 0.8);
        }
      }
    }
  }
}
</style>
