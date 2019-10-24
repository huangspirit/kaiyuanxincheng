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
          <p v-if="allInquiryData.length<=0" class="nocontent">暂无数据</p>
          <div v-for="(item,index0) in allInquiryData" :key="index0">
            <div class="allQuiryTop">
             <span>询价日期：{{item.sheetCreatime | formatDate2}}</span>
             <span>项目名称：{{item.projectName}}</span>
             <span>产品阶段：{{item.projectProcess}}</span>
             <span>量产时间：{{item.projectBeginTime | formatDate3}}</span>
            </div>
            <ul class="inquiryList">
              <li class="title">
                <div class="info">器件信息</div>
                <div class="item">品牌</div>
                <div class="item">竞争型号</div>
                <div class="item">价格/年用量</div>
                <div class="item">状态</div>
                <div class="item">操作</div>
              </li>
              <li class="listContent" v-for="(listItem,index) in item.list" :key="index">
                  <div class="goodsinfo">
                    <ImgE :src="listItem.goodsImage " :W="40" :H="40"></ImgE>
                    <div class="info">
                      <router-link  :to="{
                            path:'/BrandDetail/GoodsDetails',
                            query:{
                              tag:'goodsinfo',
                              documentid:listItem.requestId,
                              name:listItem.goodsName
                            }
                          }">
                          <strong>{{listItem.goodsName}}</strong>
                      </router-link>
                        <p>
                          <span class="desc">{{listItem.goodsDesc}}</span>
                        </p>
                      </div>
                  </div>
                  <div class="item">
                      <router-link
                      :to="{
                        path:'/BrandDetail',
                        query:{
                          tag:'brand',
                          documentid:listItem.brandId,
                          name:listItem.brandName
                        }
                      }">
                        <ImgE :src="listItem.brandImage" :W="100" :H="40"></ImgE>
                      </router-link>               
                  </div>
                  <div class="item">
                      <p v-for="(item0,index) in listItem.insteadArr" :key="index">{{item0}}</p>
                  </div>
                  <div class="item">
                      <p class="">接受价：<strong>{{listItem.acceptUnit==true?'$':'￥'}}{{listItem.acceptPrice}}</strong></p>
                      <p>预计年用量：{{listItem.projectEau}}</p>
                      <!-- <p v-if="listItem.remark" ><span>{{listItem.remark}}(备注)</span></p> -->
                  </div>
                  <div class="item">
                      <p class="failure color" v-if="listItem.sheetEffective != true">已过期</p>
                      <p class="noApproved color" v-if="listItem.sheetEffective == true&&listItem.replayStates == false">未批复</p>
                      <div class="isApproved" v-if="listItem.sheetEffective == true&&listItem.replayStates == true">
                         <strong v-if="!listItem.priceType">
                          批复:
                          {{listItem.priceUnit?'$':'￥'}}{{listItem.seckilPrice | toFixed(listItem.priceUnit?3:2)}}（一口价）
                        </strong>
                        <div v-if="listItem.priceType" class="color pricelistCont">
                          <a class="color">批复:
                             {{listItem.priceUnit?'$':'￥'}}
                             {{listItem.priceList[listItem.priceList.length-1].price | toFixed(listItem.priceUnit?3:2)}}
                             <i class="el-icon-circle-plus-outline"></i>（起售价）
                             </a>
                             <div class="pricelist">
                               <p class="color" v-for="(item1,index1) in listItem.priceList" :key="index1">{{item1.num}}-- {{listItem.priceUnit?'$':'￥'}}{{item1.price | toFixed(listItem.priceUnit?3:2)}}</p>
                             </div>
                        </div>
                        <p>起订量:{{listItem.moq}}</p>
                        <P>有效期至：{{listItem.priceExpireTime | formatDate}}</P>
                      </div>
                  </div>
                  <div class="item">
                    <div class="applyStatus" v-if="listItem.sheetEffective == true&&listItem.replayStates == true">
                      <a href="javascript:;" @click="repeat(listItem)">价格复议</a><br>
                       <a href="javascript:;" @click="againSpecial(listItem,item)">再次申请</a><br>
                        <a href="javascript:;" @click="purchase(index0,index)">直接下单</a>
                       <!-- <el-button @click="againSpecial(listItem,item)" class="bgColor" size="mini">价格复议</el-button><br>
                          <el-button @click="againSpecial(listItem,item)" class="bgColor" size="mini">重新申请</el-button><br>
                          <el-button @click="purchase(listItem,item)" class="bgColor" size="mini">立即采购</el-button> -->
                    </div>
                    <purChase v-on:closeCallBack="purshase=false" :item="purshaseData" v-if="listItem.purshase && listItem.sheetEffective == true &&listItem.replayStates == true"></purChase>
                  </div>
              </li>
             
              <!-- <li class="listContent" v-for="(listItem,index) in item.list" :key="index">
                <el-row class="content">
                  <el-col class="goodsProdu">
                    <div class="top">
                          <ImgE :src="listItem.goodsImage " :W="100" :H="100"></ImgE>
                          <div class="info">
                            <router-link  :to="{
                                  path:'/BrandDetail/GoodsDetails',
                                  query:{
                                    tag:'goodsinfo',
                                    documentid:listItem.requestId,
                                    name:listItem.goodsName
                                  }
                                }">
                               <strong>{{listItem.goodsName}}</strong>
                            </router-link>
                              <p>
                              品牌：
                                <router-link
                                :to="{
                                  path:'/BrandDetail',
                                  query:{
                                    tag:'brand',
                                    documentid:listItem.brandId,
                                    name:listItem.brandName
                                  }
                                }">
                                  {{listItem.brandName}}
                                </router-link>
                               
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
                          </div>
                    </div>
                     
                     
                  </el-col>
                  <el-col class="googsDesc">
                    <div class="left">
                      <h3>
                        申请价格：
                        <strong>{{listItem.acceptUnit==true?'$':'￥'}}{{listItem.acceptPrice}}</strong>
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
                    </div>
                     
                  </el-col>
                <el-col class="goodsStatus" >
                  <div class="applyStatus">
                      <p class="failure" v-if="listItem.sheetEffective != true">已过期</p>
                      <p class="isApproved" v-if="listItem.sheetEffective == true&&listItem.replayStates == true">已批复</p>
                      <p class="noApproved" v-if="listItem.sheetEffective == true&&listItem.replayStates == false">未批复</p>
                  </div>
                </el-col>
                </el-row>
                <el-row
                  v-if="listItem.replayStates == true&&listItem.sheetEffective == true"
                  class="applyContent"
                >
                  <el-col class="goodsProdu">
                      <div class="merchant">
                         <img
                          :src="listItem.sellerInfoMap.headImgUrl"
                          alt
                        />
                        <span>
                          <span class="companyName">{{listItem.sellerInfoMap.nickname}}</span><br>
                          <span class="bgColor identify">{{listItem.sellerInfoMap.tag | tagFilter}}</span>
                        </span>
                        
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
                    <div class="left">
                      <h3 v-if="!listItem.priceType">
                        批复价格：
                        <strong>{{listItem.priceUnit?'$':'￥'}}{{listItem.seckilPrice | toFixed(listItem.priceUnit?3:2)}}</strong>
                      </h3>
                      <p>
                        起订量：
                        <span>{{listItem.moq}}</span>
                  
                      </p>
                      <p>
                        最小增量：
                          <span>{{listItem.mpq}}</span>
                      </p>
                      <p>
                        交付周期：
                        <span>{{listItem.diliverIntervalDay}}天</span>
                      </p>
                      <p>
                        有效期至：
                        <span>{{listItem.priceExpireTime | formatDate(listItem.priceExpireTime)}}</span>
                      </p>
                    </div>
                      <h3 class="priceLevelTitle" v-if="listItem.priceType">
                        批复价格
                        <div class="priceLevelStyle">
                          <div v-for="(item,index) in listItem.priceLevel.split('@')" :key="index">
                            <span>{{item.split('-')[0]}}+</span> --- &nbsp;&nbsp;
                            <span>{{listItem.priceUnit?'$':'￥'}}{{item.split('-')[1] | toFixed(listItem.priceUnit?3:2)}}</span>
                          </div>
                        </div>
                      </h3>
                      
                  </el-col>
                  <el-col class="goodsStatus">
                    <div class="applyStatus">
                      <el-button @click="againSpecial(listItem,item)" class="bgColor" size="mini">重新申请</el-button><br><br>
                          <el-button @click="purchase(listItem,item)" class="bgColor" size="mini">立即采购</el-button>
                    </div>
                          <purChase v-on:closeCallBack="purshase=false" :item="purshaseData" v-if="purshase"></purChase>

                  </el-col>
                </el-row>
              </li> -->
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
    <el-dialog
      :visible.sync="showRepeat"
      width="35%"
      class="repeat"
      >
      <div class="cont">
          <div class="top"><img src="@/assets/image/icon/repeatbg.jpg" alt=""></div>
            <div class="form">
              <el-form ref="form" :model="repeatform" label-width="110px">
                <el-form-item label="批复价格：" class="priceType">
                   <strong v-if="!repeatform.priceType">
                      {{repeatform.priceUnit?'$':'￥'}}{{repeatform.seckilPrice | toFixed(repeatform.priceUnit?3:2)}}（一口价）
                    </strong>
                    <div v-if="repeatform.priceType" class="color pricelistCont">
                      <a class="color">
                          {{repeatform.priceUnit?'$':'￥'}}
                          {{repeatform.priceList[repeatform.priceList.length-1].price | toFixed(repeatform.priceUnit?3:2)}}
                          <i class="el-icon-circle-plus-outline"></i>（起售价）
                          </a>
                          <div class="pricelist">
                            <p class="color" v-for="(item1,index1) in repeatform.priceList" :key="index1">{{item1.num}}-- {{repeatform.priceUnit?'$':'￥'}}{{item1.price | toFixed(repeatform.priceUnit?3:2)}}</p>
                          </div>
                    </div>
                </el-form-item>
                <el-form-item label="年用量：">
                  <el-input v-model="repeatform.projectEau"></el-input>
                </el-form-item>
                <el-form-item label="接受价：">
                  <el-input v-model="repeatform.acceptPrice">
                    <template slot="prepend">{{repeatform.acceptUnit==true?'$':'￥'}}</template>
                    <template slot="append">
                      <el-select v-model="repeatform.acceptUnit" slot="prepend" placeholder="" style="width:110px;" >
                          <el-option :label="'人民币'" :value="false"></el-option>
                    <el-option :label="'美元'" :value="true"></el-option>
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="预计下单时间：">
                  <el-date-picker
                    v-model="repeatform.preOrderTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            
            </div>
              <div class="foot">
              <span class="footerbtn" @click="repeatSubmit"></span>
              </div>
          </div>
        </el-dialog>
      </div>
</template>
<script>
import countTime from "@/components/countTime";
import { axios, siderInquiryList } from "@/api/apiObj";
import purChase from "@/components/purchase";
import { ladderPrice } from "@/lib/utils";
import { TimeForma,TimeForma2 ,TimeForma3} from "@/lib/utils";
export default{
    data(){
        return {
          pickerOptions:{
             disabledDate(time) {
                return time.getTime() <Date.now();
              },
          },
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
                },
                 {
                value: "365",
                label: "近一年"
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
            allInquiryData:[],
            purshaseData:{},
            purshase: false,
            showRepeat:false,
            repeatform:{}
        }
    },
    mounted(){
      this.init();
    },
    components: {
    countTime,
    purChase
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
            if(this.orderDate){
              obj.day=this.orderDate
            }
            axios.request({...siderInquiryList.allReply,params:obj}).then(res=>{
              console.log(res)
              if(res.data){
                this.allInquiryData=res.data.data.map(item=>{
                  item.list.forEach(element => {
                    element.insteadArr=element.insteadNo.split("@");
                     if(element.priceType){
                        element.priceList=ladderPrice(element.priceLevel)
                    }
                  });
                 
                  return item;
                });
                console.log(this.allInquiryData)
                this.total=res.data.total;
              }else{
                  this.allInquiryData=[];
                  this.total=0;
              }
             
            })
        },
        tabFirst(item) {
            this.tabFirstobj=item;
            this.currentPage = 1;
            this.init();
            
        },
        getlist(val) {
            this.orderParams.day = val;
            this.init()
        },
        handleCurrentPageChange(x){
            this.currentPage=x;
            this.init()
        },
        repeat(val){
          this.showRepeat=true;
          this.repeatform={...val};
          console.log(val)
        },
        repeatSubmit(){
          
          let obj={
              id:this.repeatform.id,
              projectEau:this.repeatform.projectEau,
              acceptPrice:this.repeatform.acceptPrice,
              acceptUnit:this.repeatform.acceptUnit,
              preOrderTime:this.repeatform.preOrderTime
          }
          axios.request({...siderInquiryList.reApplyInquirySheetPrice,method:'post',data:obj}).then(res=>{
            this.init();
            this.showRepeat=false;
          })
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
          purchase(index0,index) {
            let val={};
           this.allInquiryData=this.allInquiryData.map((item,index_0)=>{
             if(index_0==index0){
               item.list.forEach((item_1,index_1)=>{
                 if(index_1==index){
                   item_1.purshase=true;
                   val=item_1;
                 }
               })
             }
             return item;
           })
           
            var levelPrice = ladderPrice(val.priceLevel);
            var obj = {
              goods_id: val.requestId,
              goods_name: val.goodsName,
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
       
         
          
    },
    computed:{
        start(){
              return this.pageSize*(this.currentPage-1)
        }
    },
    filters:{
      insteadFilter(val) {
        return val.split("@");
      },
      formatDate3(val){
        return TimeForma3(val)
      },
      formatDate2(val){
        return TimeForma2(val)
      },
       formatDate(val){
        return TimeForma(val)
      },
       
    }
}
</script>

<style lang="less" scoped>
@import "./myInquire.less";
</style>
