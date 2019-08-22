<template>
  <div class="allQuiryList">
    <p v-if="allInquiryData.length<=0">暂无数据</p>
    <div v-for="(item,index) in allInquiryData" :key="index">
      <div class="allQuiryTop">申请编号：{{item.inquirySheetNo}}</div>
      <div class="inquiryList">
        <li class="listContent" v-for="(listItem,index) in item.list" :key="index">
          <el-row class="content">
            <el-col :span="4">
              <div class="goodsImg">
                <img v-if="listItem.goodsImage!='-'" :src="listItem.goodsImage " alt />
                <img v-else src="http://brand.113ic.com/6cb875d1fc454665a3e78b5ac675e391.jpg" alt />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="goodsProdu">
                <h3>{{listItem.goodsName}}</h3>
                <p>
                  品牌：
                  <span>{{listItem.brandName}}</span>
                </p>
                <p>
                  公司描述：
                  <span>{{listItem.goodsDesc}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="googsDesc">
                <h3>
                  申请价格：
                  <span>{{listItem.acceptUnit==true?'$':'￥'}}{{listItem.acceptPrice}}</span>
                </h3>
                <p>
                  公司名称：
                  <span>{{listItem.companyName}}</span>
                </p>
                <p>
                  提交日期：
                  <span>{{listItem.sheetCreatime | formatDate(listItem.sheetCreatime)}}</span>
                </p>
                <p>
                  年采购量：
                  <span>{{listItem.projectEau}}</span>
                </p>
                <p>
                  竞争型号：
                  <span>{{listItem.insteadNo | insteadFilter}}</span>
                </p>
                <p>
                  备注说明：
                  <span>{{listItem.remark}}</span>
                </p>
                <p v-if="listItem.sheetEffective == true&&listItem.replayStates == false">
                  申请有效期至：
                  <span>{{listItem.effectEndTime | formatDate(listItem.effectEndTime)}}</span>
                </p>
                <p v-if="listItem.sheetEffective == true&&listItem.replayStates == false">
                  <countTime
                    v-on:end_callback="getAllReplyList()"
                    :startTime="listItem.currentTime"
                    dayTxt="天"
                    hourTxt="时"
                    minutesTxt="分"
                    secondsTxt="秒"
                    :endTime="listItem.effectEndTime"
                    :currentTime="listItem.currentTime"
                  ></countTime>
                </p>
              </div>
            </el-col>
            <el-col :span="5" class="goodsStatus">
              <div class="applyStatus">
                <p
                  class="noApproved"
                  v-if="listItem.sheetEffective == true&&listItem.replayStates == false"
                >未批复</p>
              </div>
            </el-col>
          </el-row>
        </li>
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
  </div>
</template>

<script>
import countTime from "@/components/countTime";
import { axios, siderInquiryList } from "@/api/apiObj";
import "./AlreadyInquiry.less";
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
    eventBus.$on("userNotice", val => {
      this.$refs.pagination.internalCurrentPage = 1;
      if (val != null) {
        this.allInquiryData = val.data;
        this.total = val.total;
      } else {
        this.allInquiryData = [];
      }
    });
  },
  components: {
    countTime
  },
  filters: {
    insteadFilter(val) {
      console.log(val);
      return val.split("@");
    }
  },
  methods: {
    getAllReplyList() {
      var obj = {
        start: this.start,
        length: 2,
        reply_status: false,
        type: true
      };
      axios.request({ ...siderInquiryList.allReply, params: obj }).then(res => {
        console.log(res);
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
    currentPage(val) {
      console.log("11", val);
    },
    change(val) {
      console.log(val);
      this.start = val * 2 - 2;
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
      height: 60px;
      line-height: 60px;
      background-color: rgb(74, 90, 106);
      color: #fff;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
    }
    .inquiryList {
      width: 100%;
      .listContent {
        border: 1px solid #dee3e9;
        padding: 10px;
        margin-bottom: 15px;
        > .content {
          border-bottom: 1px solid #dee3e9;
          padding: 10px 0;
          min-height: 150px;
          // &:hover {
          //   box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);
          // }
        }
        > .applyContent {
          padding: 10px 0;
          // &:hover {
          //   box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);
          // }
        }
        .goodsImg {
          width: 200px;
          text-align: center;
          > img {
            width: 150px;
          }
        }

        .goodsProdu {
          > h3 {
            color: #cc0000;
          }
          > p {
            color: #000;
            width: 80%;
            line-height: 30px;
            > span {
              color: #4a5a6a;
            }
          }
        }
        .googsDesc {
          h3 {
            color: #4a5a6a;
            > span {
              color: #cc0000;
            }
          }
          p {
            color: #4a5a6a;
            > span {
              color: #000;
            }
          }
        }
        .goodPrice {
        }
      }
    }
  }
}
</style>

