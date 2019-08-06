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
              <div>
                申请有效期至：
                <span>{{listItem.effectEndTime | formatDate(listItem.effectEndTime)}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="item.replayStates == true" class="applyContent">
            <el-col :span="4">
              <div class="goodsImg">
                <img :src="listItem.sellerInfoMap.headImgUrl" alt />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="goodsProdu">
                <span class="companyName">{{listItem.sellerInfoMap.nickname}}</span>
                <div class="merchant">
                  <span v-if="listItem.sellerInfoMap.tag == 1">原厂商户</span>
                  <span v-if="listItem.sellerInfoMap.tag != 1">认证商户</span>
                </div>

                <p>{{listItem.position}}</p>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="googsDesc">
                <h3>
                  批复价格：
                  <span>{{listItem.acceptPrice}}</span>
                </h3>
                <p>
                  商户名称：
                  <span>{{listItem.brandName}}</span>
                </p>
                <p>
                  回复日期：
                  <span>{{listItem.replyTime}}</span>
                </p>
                <p>
                  MOQ：
                  <span>{{listItem.moq}}</span>
                </p>
                <p>
                  MPQ：
                  <span>{{listItem.mpq}}</span>
                </p>
                <p>
                  交付周期：
                  <span>{{listItem.priceIntervalDay}}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="5" class="goodPrice">
              <div>
                价格有效期至：
                <span>{{listItem.effectEndTime}}</span>
                <p>立即采购</p>
                <p>二次议价</p>
                <p>重新申请</p>
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
        type: true
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
          overflow: hidden;
          position: relative;
          > h3 {
            color: #cc0000;
            margin-top: 30px;
            font-size: 28px;
          }
          > p {
            color: #000;
            width: 80%;
            line-height: 35px;
            > span {
              color: #4a5a6a;
            }
          }
          .companyName {
            color: #cc0000;
            font-weight: 700;
            margin-top: 20px;
            font-size: 28px;
            display: inline-block;
          }
          .merchant {
            position: absolute;
            top: 26px;
            right: 55px;
            span {
              &:nth-of-type(1) {
                font-size: 12px;
                font-weight: normal;
                background-color: rgba(255, 102, 0, 1);
                padding: 5px 10px;
                border-radius: 5px;
                margin-left: 20px;
                color: #fff;
                display: inline-block;
              }
              &:nth-of-type(2) {
                font-size: 12px;
                font-weight: normal;
                background-color: rgba(13, 152, 255, 1);
                padding: 5px 10px;
                border-radius: 5px;
                margin-left: 20px;
                color: #fff;
                display: inline-block;
              }
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
          > div {
            color: #4a5a6a;
            > span {
              color: #000;
            }
            p {
              width: 155px;
              background-color: rgba(74, 90, 106, 1);
              font-size: 20px;
              padding: 5px 0;
              color: #fff;
              text-align: center;
              margin-top: 5px;
              margin-left: 7%;
            }
          }
        }
      }
    }
  }
}
</style>
