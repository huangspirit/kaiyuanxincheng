<template>
  <div class="allQuiryList">
    <p v-if="allInquiryData.length<=0">暂无数据</p>
    <div v-for="(item,index) in allInquiryData" :key="index">
      <div class="allQuiryTop">申请编号：{{item.inquirySheetNo}}</div>
      <div class="inquiryList">
        <li class="listContent" v-for="(listItem,index) in item.list" :key="index">
           
          <el-row class="content">
            <el-col class="goodsImg">
                <img v-if="listItem.goodsImage!='-'" :src="listItem.goodsImage " alt />
                <img v-else src="http://brand.113ic.com/6cb875d1fc454665a3e78b5ac675e391.jpg" alt />
            </el-col>
            <el-col class="goodsProdu">

                <h3>{{listItem.goodsName}}</h3>
                <p>
                  品牌：
                  <span>{{listItem.brandName}}</span>
                </p>
                <p>
                  公司描述：
                  <span>{{listItem.goodsDesc}}</span>
                </p>
                <p v-if="listItem.sheetEffective == true&&listItem.replayStates == false">
                    <countTime
                        v-on:end_callback="getAllReplyList()"
                        class="color"
                        :startTime="listItem.currentTime"
                        dayTxt="天"
                        hourTxt="时"
                        minutesTxt="分"
                        secondsTxt="秒"
                        :endTime="listItem.effectEndTime"
                        :currentTime="listItem.currentTime"
                    ></countTime>
                </p>
            </el-col>
            <el-col  class="googsDesc">
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
                <p v-if="listItem.insteadNo && listItem.insteadNo!='@'">
                  竞争型号：
                  <span>{{listItem.insteadNo | insteadFilter}}</span>
                </p>
                <p v-if="listItem.remark">
                  备注说明：
                  <span>{{listItem.remark}}</span>
                </p>
                <p v-if="listItem.sheetEffective == true&&listItem.replayStates == false">
                  申请有效期至：
                  <span>{{listItem.effectEndTime | formatDate(listItem.effectEndTime)}}</span>
                </p>

            </el-col>
             <el-col class="goodsStatus">
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
      this.start = val * 2 - 2;
      this.getAllReplyList();
    }
  }
};
</script>

<style lang="less" scoped>
    @import "./AlreadyInquiry.less";
.allQuiryList {
  > p {
    width: 100%;
    min-height: 600px;
    line-height: 200px;
    text-align: center;
  }
  > div {
      margin-top:15px;
       border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        overflow: hidden;
      &:hover{
          box-shadow: 0 0 2px 2px #ddd;
        }
    .allQuiryTop {
        padding:10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background:#ddd;
    }
    .inquiryList {
      width: 100%;
      .listContent {
          background:#f5f5f5;
          position: relative;
          overflow: hidden;
        > .content {
            display: flex!important;
            padding:20px;
            &>div{
                &.goodsProdu{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            }
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
            background:#fff;
            display: flex;align-items: center;
            margin-right:15px;
            > img {
                width: 150px;
            }
        }

        .goodsProdu {
            overflow: hidden;
            position: relative;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            font-size:16px;
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
            font-size:14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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

