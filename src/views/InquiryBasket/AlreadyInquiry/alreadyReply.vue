<template>
  <div class="allQuiryList">
    <p v-if="allInquiryData.length<=0">暂无数据</p>
    <div v-for="(item,index) in allInquiryData" :key="index">
      <div class="allQuiryTop">申请编号：{{item.inquirySheetNo}}</div>
      <div class="inquiryList">
        <li class="listContent" v-for="(listItem,index) in item.list" :key="index">
          <el-row class="content">
            <el-col class="goodsImg">
             <ImgE :src="listItem.goodsImage" :W="50" :H="50"></ImgE>
            </el-col>
            <el-col class="goodsProdu">
          
                <h3>{{listItem.goodsName}}</h3>
                <p>
                  品牌：
                  <span>{{listItem.brandName}}</span>
                </p>
                <p>
                  描述：
                  <span>{{listItem.goodsDesc}}</span>
                </p>
           
            </el-col>
            <el-col class="googsDesc">
             
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
                <p>
                  申请有效期至：
                  <span>{{listItem.effectEndTime | formatDate(listItem.effectEndTime)}}</span>
                </p>
              
            </el-col>
            <el-col  class="goodsStatus">
              <div class="applyStatus">
                <p class="isApproved">{{listItem.sheetEffective | effective(listItem.replayStates)}}</p>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="listItem.replayStates == true" class="applyContent">
            <el-col  class="goodsImg">
             <ImgE :src="listItem.sellerInfoMap.headImgUrl" :W="50" :H="50"></ImgE>
               
             
            </el-col>
            <el-col  class="goodsProdu">
             
                
                <div class="merchant">
                  <span class="companyName">{{listItem.sellerInfoMap.nickname}}</span><br>
                    <span class="bgColor identify" v-if="listItem.sellerInfoMap.tag==1">{{listItem.sellerInfoMap.tag | tagFilter}}</span>
                    <span class="bgColor identify" v-if="listItem.sellerInfoMap.tag==2 && listItem.sellerInfoMap.isAgent">{{listItem.sellerInfoMap.tag | tagFilter}}</span>
                </div>
                 <p>
                    回复日期：
                    <span>{{listItem.replyTime | formatDate(listItem.projectBeginTime)}}</span>
                </p>
             <p>
                  <countTime
                    v-on:end_callback="getAllReplyList()"
                    :startTime="listItem.currentTime"
                    dayTxt="天"
                    hourTxt="时"
                    minutesTxt="分"
                    secondsTxt="秒"
                    :endTime="listItem.priceExpireTime"
                    :currentTime="listItem.currentTime"
                  ></countTime>
                </p>
            </el-col>
            <el-col class="googsDesc">
          
                <h3 class="priceLevelTitle" v-if="listItem.priceType">
                  批复价格：
                  <div class="priceLevelStyle">
                    <div v-for="(item,index) in listItem.priceLevel.split('@')" :key="index">
                      <span>{{item.split('-')[0]}}+</span> --- &nbsp;&nbsp;
                      <span>{{listItem.priceUnit?'$':'￥'}}{{item.split('-')[1]}}</span>
                    </div>
                  </div>
                </h3>
                <h3 v-if="!listItem.priceType">
                  批复价格：
                  <span>{{listItem.priceUnit?'$':'￥'}}{{listItem.seckilPrice}}</span>
                </h3>
                <p>
                  回复日期：
                  <span>{{listItem.replyTime | formatDate(listItem.priceExpireTime)}}</span>
                </p>
                <p>
                   起订量：
                  <span>{{listItem.moq}}</span>
                   &nbsp;&nbsp; 增量：
                    <span>{{listItem.mpq}}</span>
                </p>
                <p>
                  交付周期：
                  <span>{{listItem.diliverIntervalDay}}天</span>
                </p>
                <p>
                  价格有效期至：
                  <span>{{listItem.priceExpireTime | formatDate(listItem.priceExpireTime)}}</span>
                </p>
                
          
            </el-col>
             <el-col class="goodsStatus">
              <div class="applyStatus">
                 <el-button @click="againSpecial(listItem,item)" class="bgColor" size="mini">重新申请</el-button><br><br>
                    <el-button @click="purchase(listItem,item)" class="bgColor" size="mini">立即采购</el-button>
              </div>
                    <purChase v-on:closeCallBack="purshase=false" :item="purshaseData" v-if="purshase"></purChase>

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
import { axios, siderInquiryList } from "@/api/apiObj";
import countTime from "@/components/countTime";
import { ladderPrice } from "@/lib/utils";
import purChase from "@/components/purchase";
import "@/lib/filters";
import "./AlreadyInquiry.less";
export default {
  data() {
    return {
      allInquiryData: [],
      start: 0,
      total: 0,
      purshase: false,
      purshaseData: {}
    };
  },
  mounted() {
    this.getAllReplyList();
    eventBus.$on("alreadyReply", val => {
      this.$refs.pagination.internalCurrentPage = 1;
      if (val != null) {
        this.allInquiryData = val.data;
        this.total = val.total;
      } else {
        this.allInquiryData = [];
      }
    });
  },
  filters: {
    insteadFilter(val) {
      console.log(val);
      return val.split("@");
    }
  },
  components: {
    countTime,
    purChase
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
    againSpecial(val, val1) {
      this.$confirm("是否确认重新申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .request({ ...siderInquiryList.replyAgain, params: { id: val.id } })
            .then(res => {
              console.log(res);
              if (res.resultCode == "200") {
                this.$store.dispatch("promation", res.data);
                this.$router.push("/InquiryBasket/ApplySpecialPrice");
              }
            });
        })
        .catch(() => {});
    },
    purchase(val, val1) {
      this.purshase = true;
      var levelPrice = ladderPrice(val.priceLevel);
      var obj = {
        goods_id: val.requestId,
        goods_name: val.goods_name,
        goodsDesc: val.goodsDesc,
        goodsImage: val.goodsImage,
        clude_bill: val.cludeBill,
        price_unit: val.priceUnit,
        seckill_goods_id: val.seller_goods_id,
        goods_type: val.goodsType,
        diliver_place: val.diliverPlace,
        moq: val.moq,
        mpq: val.mpq,
        stockcount: val.goodsCount,
        price_type: val.priceType,
        priceList: levelPrice,
        seckil_price: val.seckilPrice,
        sellerName: val.sellerInfoMap.nickname,
        sellerHeader: val.sellerInfoMap.headImgUrl,
        seller_id: val.sellerInfoMap.id,
        tag: val.sellerInfoMap.tag
      };
      this.purshaseData = obj;
  
    },
    currentPage(val) {
     
    },
    change(val) {
   
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
      margin-top:15px;
       border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        overflow: hidden;
      &:hover{
          box-shadow: 0 0 2px 2px #ddd;
        }
    .allQuiryTop {
      padding:10px;
        background:#ddd;
    }
    .inquiryList {
      width: 100%;
      .listContent {
          background:#f5f5f5;
          position: relative;
          overflow: hidden;
          /deep/.counttime {
            .timeStr{
              background: none;
              padding:0;
              color:#df3f2f;

            }
          }
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
          padding: 20px;
            display:flex;
            border-top:5px solid #fff;
            .goodsImg {
                width: 200px;
                > img {
                    width: 150px;
                  
                }
            }
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
            font-size: 18px;
          }
          > p {
            color: #000;
            width: 80%;
            > span {
              color: #4a5a6a;
            }
          }
          
          .merchant {
            .companyName {
              font-weight: 700;
              font-size: 18px;
              color:#333;
            }
            .identify{
              border-radius: 3px;
              font-size:12px;
              padding:2px 12px;
              margin-top:5px;
            }
          }
        }
        .googsDesc {
          position: relative;
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
          .priceLevelTitle {
            position: absolute;
            right: 0;
            min-width: 200px;
            color: #4a5a6a;
            text-align: right;
            > span {
              color: #cc0000;
            }
            > .priceLevelStyle {
              position: absolute;
              right: 0;
              top: 34px;
              > div {
                display: flex;
                justify-content: space-between;
                > span {
                  min-width: 38px;
                  text-align: left;
                  color: #cc0000;
                }
              }
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
          height: 170px;
          position: relative;
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
              margin-top: 15px;
              margin-left: 30%;
            }
          }
        }
      }
    }
  }
}
</style>

