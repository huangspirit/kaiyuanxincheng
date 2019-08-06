<template>
  <div class="allQuiryList">
    <p v-if="allInquiryData.length<=0">暂无数据</p>
    <div v-for="(item,index) in allInquiryData" :key="index">
      <div class="allQuiryTop">
        申请编号：{{item.inquirySheetNo}}
        <span>{{item.effectiveStates | effective(item.effectiveStates,item.replayStates)}}</span>
      </div>
      <div class="inquiryList">
        <li class="listContent" v-for="(listItem,index) in item.list" :key="index">
          <el-row class="content">
            <el-col :span="4">
              <div class="goodsImg">
                <img :src="listItem.goodsImage " alt />
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
                  <span>{{listItem.projectBeginTime | formatDate(listItem.projectBeginTime)}}</span>
                </p>
                <p>
                  年采购量：
                  <span>{{listItem.projectEau}}</span>
                </p>
                <p>
                  竞争型号：
                  <span>{{listItem.insteadNo}}</span>
                </p>
                <p>
                  备注说明：
                  <span>{{listItem.remark}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="5" class="goodPrice">
              <p>
                申请有效期至：
                <span>{{listItem.effectEndTime | formatDate(listItem.effectEndTime)}}</span>
              </p>
            </el-col>
          </el-row>
          <el-row v-if="item.replayStates == 'true'" class="applyContent">
            <el-col :span="4">
              <div class="goodsImg">
                <img :src="listItem.imageUrl " alt />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="goodsProdu">
                <h3>{{listItem.goodsName}}</h3>
                <p>
                  <span>品牌：</span>
                  {{listItem.brandName}}
                </p>
                <p>
                  <span>公司描述：</span>
                  {{listItem.goodsDesc}}
                </p>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="googsDesc">
                <h3>
                  申请价格：
                  <span>{{listItem.acceptPrice}}</span>
                </h3>
                <p>
                  公司名称：
                  <span>{{listItem.companyName}}</span>
                </p>
                <p>
                  提交日期：
                  <span>{{listItem.projectBeginTime}}</span>
                </p>
                <p>
                  年采购量：
                  <span>{{listItem.projectEau}}</span>
                </p>
                <p>
                  竞争型号：
                  <span>{{listItem.insteadNo}}</span>
                </p>
                <p>
                  备注说明：
                  <span>{{listItem.remark}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="5" class="goodPrice">
              <p>
                申请有效期至：
                <span>{{listItem.effectEndTime}}</span>
              </p>
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
  methods: {
    getAllReplyList() {
      var obj = {
        start: this.start,
        length: 2,
        reply_status: true,
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
      height: 60px;
      line-height: 60px;
      background-color: rgb(74, 90, 106);
      color: #fff;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      box-sizing: border-box;
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
    .inquiryList {
      width: 100%;
      .listContent {
        border: 1px solid #dee3e9;
        padding: 0 10px;
        > .content {
          border-bottom: 1px solid #dee3e9;
          padding: 10px 0;
          min-height: 150px;
          &:hover {
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);
          }
        }
        > .applyContent {
          padding: 10px 0;
          &:hover {
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);
          }
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
          > p {
            color: #4a5a6a;
            > span {
              color: #000;
            }
          }
        }
      }
    }
  }
}
</style>

