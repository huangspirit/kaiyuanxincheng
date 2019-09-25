<template>
<div class="myInquireCont">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="itemActive">我的询价</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="myInquire">
      <!-- 订单列表 -->
      <div class="tab-list">
        <!-- 一级切换 -->
        <div class="tab-list-t clear">
          <ul class="fl">
            <li
              v-for="item in tabFirstList"
              :key="item.id"
              :class="{bgColor:tabFirstobj.id === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>
          <el-select
            class="all-time fl"
            @change="getlist(orderDate)"
            v-model="orderDate"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
        <div class="allQuiryList">
          <p v-if="allInquiryData.length<=0">暂无数据</p>
          <div v-for="(item,index) in allInquiryData" :key="index">
            <div class="allQuiryTop">申请编号：{{item.inquirySheetNo}}</div>
            <ul class="inquiryList">
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
                        描述：
                        <span>{{listItem.goodsDesc}}</span>
                      </p>
                      <p v-if="listItem.sheetEffective == true&&listItem.replayStates == false">
                          <countTime
                              class="color"
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
                      <p v-if="listItem.sheetEffective != false">
                        申请有效期至：
                        <span>{{listItem.effectEndTime | formatDate(listItem.effectEndTime)}}</span>
                      </p>
                  </el-col>
                <el-col class="goodsStatus" >
                  <div class="applyStatus">
                      <p class="failure" v-if="listItem.sheetEffective != true">已失效</p>
                      <p class="isApproved" v-if="listItem.sheetEffective == true&&listItem.replayStates == true">已批复</p>
                      <p class="noApproved" v-if="listItem.sheetEffective == true&&listItem.replayStates == false">未批复</p>
                  </div>
                </el-col>
                </el-row>
                <el-row
                  v-if="listItem.replayStates == true&&listItem.sheetEffective == true"
                  class="applyContent"
                >
                  <el-col class="goodsImg">
                      <img
                        v-if="listItem.sellerInfoMap.headImgUrl!='-'"
                        :src="listItem.sellerInfoMap.headImgUrl"
                        alt
                      />
                      <img v-else src="http://brand.113ic.com/6cb875d1fc454665a3e78b5ac675e391.jpg" alt />
                  </el-col>
                  <el-col class="goodsProdu">
                      <div class="merchant">
                        <span class="companyName">{{listItem.sellerInfoMap.nickname}}</span><br>
                          <span class="bgColor identify">{{listItem.sellerInfoMap.tag | filterTag}}</span>
                      </div>
                      <p>
                          回复日期：
                          <span>{{listItem.replyTime | formatDate(listItem.projectBeginTime)}}</span>
                      </p>
                      <p>
                        <countTime
                          v-on:end_callback="getAllReplyList()"
                          class="color"
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
                        起订量：
                        <span>{{listItem.moq}}</span>
                        &nbsp;&nbsp; 最小增量：
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
            </ul>
          </div>
        </div>
      <Pagination
        v-if="total"
        :currentPage.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentPageChange"
      ></Pagination>
    </div>
  </div>
</template>
<script>
import {axios,siderInquiryList} from "@/api/apiObj"
export default{
    data(){
        return{
             tabFirstList: [
                {
                id: "-1",
                params: "",
                name: "全部"
                },
                {
                id: 0,
                params: "2",
                name: "未批复",
                key:'reply_status',
                reply_status:false
                },
                {
                id: 1,
                params: "3",
                name: "已批复",
                 key:'reply_status',
                reply_status:true
                },
                {
                id: 2,
                params: "4",
                name: "已过期",
                key:'sheet_effective',
                sheet_effective:false
                },
              
            ],
            options: [
                {
                value: "",
                label: "全部"
                },
                {
                value: "7",
                label: "近一周"
                },
                {
                value: "30",
                label: "近一月"
                },
                {
                value: "90",
                label: "近三月"
                },
                {
                value: "180",
                label: "近半年"
                }
            ],
            total:0,
            pageSize:5,
            currentPage:1,
            tabFirstobj: {
                id: "-1",
                params: "",
                name: "全部"
                },
            orderDate:'',
            orderParams:{},
            allInquiryData:[]
        }
    },
    methods:{
        init(){
            let obj={
                start:this.start,
                length:this.pageSize,
                type:true,
            }
            if(this.tabFirstobj.key){
              obj[this.tabFirstobj.key]=this.tabFirstobj[this.tabFirstobj.key]
            }
            axios.request({...siderInquiryList.allReply,params:obj}).then(res=>{
                this.allInquiryData=res.data.data;
                this.total=res.data.total;
            })
        },
        tabFirst(item) {
            this.tabFirstobj=item;
            this.currentPage = 1;
            this.init();
             console.log(item )
        },
        getlist(val) {
            this.orderParams.day = val;
            this.init()
        },
        handleCurrentPageChange(x){
            this.currentPage=x;
            this.init()
        }
    
    },
    computed:{
        start(){
              return this.pageSize*(this.currentPage-1)
        }
    }
}
</script>

<style lang="less" scoped>
@import "./myInquire.less";
</style>
