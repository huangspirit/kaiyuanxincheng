
<template>
  <div class="allQuiryList">
    <p v-if="allInquiryData.length<=0">暂无数据</p>
    <div v-for="(item,index) in allInquiryData" :key="index" class="itemlistone">
      <div class="allQuiryTop">申请编号：{{item.inquirySheetNo}}</div>
      <div class="companyDetail">
        <ul class="company">
           <li>
              公司名称：
              <a :href="item.website" target="_blank">{{item.companyName}}</a>
            </li>
            <li>
              项目名称：
              <span>{{item.projectName}}</span>
            </li>
            <li>
                  备注说明：
                  <span>{{item.remark}}</span>
            </li>
           
            <li>
                  有效期至：
                  <span>{{item.effectEndTime |formatDate}}</span>
                </li>
        </ul>
        <ul>
                <li>
              联系人：
              <span>{{item.contactName}}</span>
                <span><i class="el-icon-user-solid color" style="margin:0 3px 0 12px;"></i>{{item.position}}</span>
                  <span><i class="el-icon-phone color" style="margin:0 3px 0 12px;"></i>{{item.telphone}}</span>
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
                  提交日期：
                  <span>{{item.sheetCreatime | formatDate}}</span>
                </li>
                
                
        </ul>
      </div>
      <div class="inquiryList">
         <table border="1" style="width:100%;">
            <thead>
              <tr>
                <th>器件</th>
                <th>竞争型号</th>
                <th>年常用量EAU</th>
                <th>接受价格T/P</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(item0,index) in item.list" :key="index">
                  <td>
                    <div class="goodsDesc">
                      <ImgE :src="item0.goodsImage" :W="50" :H="50"></ImgE>
                      <div>
                        <p class="color">{{item0.goodsName}}</p>
                         <p>品牌：<router-link :to="{
                          path:'/BrandDetail',
                          query:{
                            tag:'brand',
                            documentid:item0.brandId,
                            name:item0.brandName
                          }
                        }">{{item0.brandName}}</router-link></p>
                        <p class="gray">描述：{{item0.goodsDesc}}</p>
                      </div>
                  </div>
                  </td>
                  <td>
                      <span v-if="item0.insteadNo && item0.insteadNo!='@'">{{item0.insteadNo.split('@')}}</span>
                  </td>
                  <td>
                    {{item0.projectEau}}
                  </td>
                  <td>{{item0.acceptUnit?'$':'￥'}}{{item0.acceptPrice}}</td>
                  <td class="status">
                    <el-button
                        v-if="item0.sheetEffective==true&&item0.replayStates==false"
                        @click.native.prevent="replyRequest(item0)"
                        class="bgColor"
                        size="small"
                      >批复请求</el-button>
                      <div v-if="item0.sheetEffective==true&&item0.replayStates==true">
                        <p>
                          <span>交货地：</span>
                          <span>{{item0.diliverPlace}}</span>
                        </p>
                        <p>
                          <span>批复价格：</span>
                          <span v-if="item0.priceType == true" v-html="filterprice(item0.priceLevel ,item0.priceUnit)">
                            </span>
                              <span v-else>{{item0.priceUnit?'$':'￥'}}{{item0.seckilPrice}}</span>
                        </p>
                         
                        <p>
                          <span>预计交期：</span>
                          <span>{{item0.currentTime | formatDate(item0.currentTime)}}</span>
                        </p>
                       
                        <p>
                          <span>价格有效期：</span>
                          <span>{{item0.priceExpireTime | formatDate(item0.priceExpireTime)}}</span>
                        </p>
                        <p>
                          <span>批复时间：</span>
                          <span>{{item0.replyTime | formatDate(item0.replyTime)}}</span>
                        </p>
                      </div>
                      <div v-if="item0.sheetEffective==false&&item0.replayStates==true">
                        <p>
                          <span>交货地：</span>
                          <span>{{item0.diliverPlace}}</span>
                        </p>
                        <p>
                          <span>批复价格：</span>
                          <span v-if="item0.priceType == true" v-html="filterprice(item0.priceLevel ,item0.priceUnit)">
                            </span>
                              <span v-else>{{item0.priceUnit?'$':'￥'}}{{item0.seckilPrice}}</span>
                        </p>
                        <p>
                          <span>预计交期：</span>
                          <span>{{item0.priceIntervalDay}} 天</span>
                        </p>
                        
                        <p>
                          <span>价格有效期：</span>
                          <span>{{item0.priceExpireTime | formatDate(item0.priceExpireTime)}}</span>
                        </p>
                        <p>
                          <span>批复时间：</span>
                          <span>{{item0.replyTime | formatDate(item0.replyTime)}}</span>
                        </p>
                      </div>
                      <p v-if="item0.sheetEffective==false&&item0.replayStates==false">-------</p>
                      <p class="failure" v-if="item0.sheetEffective != true">已失效</p>
                      <p
                        class="isApproved"
                        v-if="item0.sheetEffective == true&&item0.replayStates == true"
                      >已批复</p>
                      <p
                        class="noApproved"
                        v-if="item0.sheetEffective == true&&item0.replayStates == false"
                      >未批复</p>
                  </td>
                </tr>
            </tbody>
        </table>
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
import {ladderPrice} from "@/lib/utils"
import { axios, siderInquiryList } from "@/api/apiObj";
import "@/lib/filters";
import "./AlreadyInquiry.less";
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
    eventBus.$on("personalalreadyOverdue", val => {
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
     filterprice(val,priceUnit){ 
      let mark=priceUnit?'$':'￥'
      let pricelist=ladderPrice(val)
      let str = "";
      pricelist.forEach(el=> {
        str+=el.num+'---'+mark+el.price+'<br>'
      });
      return str;
    },
    getAllReplyList() {
      var obj = {
        start: this.start,
        length: 2,
        sheet_effective: false,
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
      this.replyDialogVisible = true;
      this.allListData = val.row;
    },
    replyVisibleClose(val) {
   
      this.replyDialogVisible = val;
    },
    currentPage(val) {
     
    },
    change(val) {
     
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
  .itemlistone {
    margin: 20px 0;
    &:hover{
      box-shadow: 0  0 10px 5px #ddd;
      transform: scaleY(1.05)
    }
    .allQuiryTop {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      line-height: 35px;
      color:#333!important;
    }
     .companyDetail {
      display: flex;
      &>ul{
       &.company{
          flex: 1;
        }
        border:1px solid #ddd;
        width:50%;
        li{
          font-size:12px;
          padding:5px 10px;
          color:#333;
          // width:33.33%;
          border:1px solid #ddd;
          box-sizing: border-box;
          margin-right:0px;
          word-break: break-all;
        
        }
      }
    }
    .inquiryList {
      width: 100%;
      table{
        border:1px solid #ddd;
        tr{
          border-bottom:1px solid #ddd;
          th{
            border-right:1px solid #ddd;
            background:#d5d5d5;
            color:#fff;
            line-height:35px;
            color:#333;
            font-weight: normal;
          }
          td{
            border-right:1px solid #ddd;
            text-align: center;
            padding:8px;
             color:#333;
             font-size:14px;
          }
        }
      }
    }
    .goodsDesc{
      display:flex;
      text-align: left;
      width:80%;
      margin:0 auto;
    }
     .status {
            position: relative;
            overflow: hidden;
            
           &>div{
             text-align: left;
             float: left;
            margin-left:15%;
           }
                >p {
                    position: absolute;
                    right: -40px;
                    top: -9px;
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                    color: #fff;
                    width: 100px;
                    height: 40px;
                    text-align: center;
                    line-height: 60px;
                    font-size:12px;
                }

                .failure {
                    background-color: #bcbcbc;
                }

                .isApproved {
                    background-color: #cc0000;
                }

                .noApproved {
                    background-color: #ff9900;
                }

        }    
  }
}
</style>
