<template>
  <div class="SellerCommodityManagement">
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>特价管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="OrderManagement">
      <!-- 订单列表 -->
      <div class="tab-list">
        <!-- 一级切换 -->
        <div class="tab-list-t clear">
          <ul class="clear">
            <li
              v-for="item in tabFirstList"
              :key="item.id"
              :class="{bgColor:currentModlue.id === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>
          <el-dropdown class="all-time" placement="bottom">
            <span class="el-dropdown-link">
              全部订单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
              <el-dropdown-item>特价拼团</el-dropdown-item>
              <el-dropdown-item>普通销售</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
<!--          <SearchInput-->
<!--           class="clear"-->
<!--            @submit="SearchSubmit"-->
<!--            :value="SearchInputValue"-->
<!--            :width="350"-->
<!--            :height="40"-->
<!--            :placeholder="'输入商品名称'"-->
<!--            :fontSize="14"-->
<!--            :btnImgWidth="20"-->
<!--            :btnWidth="40"-->
<!--            :borderColor="'#e3e3e3'"-->
<!--          ></SearchInput>-->
        </div>
        <!-- 列表的内容 -->
        <div class="tab-list-con">
          <!-- <p class="tab-list-con-tit">
            <span style="width:20%">商品信息</span>
            <span style="width:10%">售价</span>
            <span style="width:6%">起订量</span>
            <span style="width:6%">最小增量</span>
            <span style="width:16%">交货条件</span>
            <span style="width:16%">数量</span>
         
            <span style="width:15%">售卖时限</span>
            <span style="width:10%">操作</span>
          </p> -->
          <div class="list-item">
            <!-- <div class="list-item-tit">
              <span>批次号：</span>
              <span class="phon">{{item.product_no}}</span>
            </div> -->
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
            
            >
              <!-- style="table-layout:fixed" -->
            <thead>
              <tr>
                <th> <label>
                            <input type="checkbox" @change="allCheck" ref="allcheckmark">
                            全选
                        </label>
                        </th>
                <th>商品信息</th>
                <th>售价</th>
                <th>起订量</th>
                <th>最小增量</th>
                <th>交货条件</th>
                <th>数量</th>
                <th>售卖时限</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
            
              <tr  v-for="item in PublishGoodsList" :key="item.id">
                <td>
                   <label  v-if="item.downButton || item.upButton">
                                        <input type="checkbox" name="checking" :value="item.id" v-model="checklist" ref="input">
                                    </label>
                </td>
                <td  class="goodsInfo">
                  <div class="wrap">
                    <img :src="item.goodsImageUrl" alt />
                    <div>
                      <p>
                        <router-link class="color" :to="{
                          path:'/BrandDetail/GoodsDetails',
                          query:{
                            tag:'goodsinfo',
                            documentid:item.goods_id,
                            name:item.goods_name
                          }
                        }">
                           {{item.goods_name}}
                        </router-link>
                       </p>
                      <p >
                        <router-link :to="{
                          path:'/BrandDetail',
                          query:{
                            tag:'brand',
                            documentid:item.brandId,
                            name:item.brandName
                          }
                        }">
                            {{item.brandName}}
                        </router-link>
                        </p>
                    </div>
                  </div>

                </td>
                <td  class="price">
                  <p
                    v-if="!item.priceType"
                    class="color"
                  >{{item.priceUnit ? '$' : '￥'}}{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</p>
                  <ul class="list" v-if="item.priceLevel">
                    <li v-for="(val, k) in item.priceLevel" :key="k">
                      <span>{{val[0]}}</span>---
                      <span class="color">{{item.priceUnit ? '$' : '￥'}}{{val[1] | toFixed(item.priceUnit?3:2)}}</span>
                    </li>
                  </ul>
                  <div class="blue">
                      <span>({{item.includBill? '含13%增值税' : '不含税' }})</span>
                  </div>
                </td>
                <td>
                  <p>{{item.moq}}</p>
                </td>
                <td >
                  <p>{{item.mpq}}</p>
                </td>
                   <td >
                    <span>{{item.goods_type ? '现货' : '期货'}}</span>
                    <p v-if="!item.goods_type">预计交期{{item.deliverTime | formatDate}}</p>
                    <p v-if="item.goods_type">下单后{{item.day_interval | filterHours}}小时内发货</p>
                     <p>{{item.diliverPlace}}交货</p>
                  </td>
                <td >
                  <span>数量：{{item.goodsCount}}</span><br>
                   <span>剩余：{{item.goodsStockCount}}</span>
                </td>
                <td >
                  <div v-if="item.seller_always">
                    <p>长期卖</p>
                  </div>
                  <div v-if="!item.seller_always" style="white-space:nowrap">
                    <p>限时跟单</p>
                    <p>起:{{item.beginTime | formatDate2}}</p>
                    <p>止:{{item.expireTime | formatDate2}}</p>
                      <!-- <CountTime
                        class="countTime"
                        v-on:end_callback="countDownE_cb(item)"
                        :currentTime="item.currentTime"
                        :startTime="item.currentTime"
                        :endTime="item.expireTime"
                        :tipText="'距离售卖开始:'"
                        :tipTextEnd="''"
                        :endText="'活动已结束'"
                        :dayTxt="'天'"
                        :hourTxt="'小时'"
                        :minutesTxt="'分钟'"
                        :secondsTxt="'秒'"
                      ></CountTime> -->
                      <!-- <el-button slot="reference">剩余售卖时间</el-button> -->
                  </div>
                </td>
            
                <td>
                  <div class="wrapbtn">
                    <a href="javascript:;" v-if="item.downButton" @click="OffShelfMerchandise(item)">下架</a>
                     <a href="javascript:;" v-if="item.upButton"  @click="ReLaunchingCommodities(item)" >上架</a>
                      <!-- <span v-if="item.downButton" @click="OffShelfMerchandise(item)" class="btn undone">下架</span> -->
                      <!-- <span v-if="item.upButton" class="btn bgColor" @click="ReLaunchingCommodities(item)" >重新上架</span> -->
                  </div>
                </td>
              </tr>
            </tbody>
            </table>
          </div>
           <el-button v-if="checklist.length && currentModlue.isenable" size="mini" class="" @click="batchDown">全选下架</el-button>
           <el-button v-if="checklist.length && !currentModlue.isenable" size="mini" class="" @click="batchUp">全选上架</el-button>
        </div>
      </div>
      <div>
          <div  v-if="PublishGoodsList.length==0" class="nocont">暂无数据</div>
      </div>
      <!-- 分页 -->
      <Pagination v-if="total" :currentPage.sync="currentPage" :total="total" :page-size="pageSize" @current-change="handleChangePage"></Pagination>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./SellerCommodityManagement.less";
</style>
<script>
// import "@/assets/css/ele-form.less";
import Countdown from "_c/Countdown";
import { mapState, mapActions, mapMutations } from "vuex";
import { TimeForma,TimeForma2 } from "@/lib/utils";
import {axois,sellerCenter} from "@/api/apiObj";
import { axios } from '../../../api/apiObj';
export default {
  name: "SellerCommodityManagement",
  data() {
    return {
      SearchInputValue:"",
      // 一级分类列表
      currentModlue:{
          id: 0,
          name: "在售中",
          isenable: true
      },
      tabFirstList: [
        {
          id: 0,
          name: "在售中",
          isenable: true
        },
        {
          id: 1,
          name: "已下架",
          isenable: false
        }
      ],
      currentPage: 1,
      PublishGoodsList: [],
      total: 0,
      pageSize:10,
      checklist:[],
      is_checkout:false,
      changeAll:false
    };
  },
  watch:{
     checklist(val){
                if(!this.$refs.input || this.checklist.length<this.$refs.input.length || this.$refs.input.length==0){
                 this.$refs.allcheckmark.checked=false
                }else{
                  this.$refs.allcheckmark.checked=true;
                }
        }
  },
  methods: {
    ...mapActions("SellerCommodityManagement", [
      "GetPublishGoodsListByUser",
      "GetUpdatePublishGoodsSatus"
    ]),
    batchDown(){
      let sendData={
        flag:false
      }
      let uidArr=[]
      this.checklist.forEach(item=>{
        let obj=this.PublishGoodsList.find(item0=>{
          return item0.id==item
        })
        uidArr.push(obj.uid)
      })
      if(this.checklist.length>1){
        sendData.ids=this.checklist.join("@");
        sendData.uids=uidArr.join("@")
      }else if(this.checklist.length==1){
        sendData.ids=this.checklist[0];
        sendData.uids=uidArr[0]
      }
      axios.request({...sellerCenter.updateBatchPublishGoodsSatus,params:sendData}).then(res=>{
      
        this.all()
      })
    },
    batchUp(){
      let sendData={
        flag:true
      }
      let uidArr=[]
      this.checklist.forEach(item=>{
        let obj=this.PublishGoodsList.find(item0=>{
          return item0.id==item
        })
        uidArr.push(obj.uid)
      })
      if(this.checklist.length>1){
        sendData.ids=this.checklist.join("@");
        sendData.uids=uidArr.join("@")
      }else if(this.checklist.length==1){
        sendData.ids=this.checklist[0];
        sendData.uids=uidArr[0]
      }
      axios.request({...sellerCenter.updateBatchPublishGoodsSatus,params:sendData}).then(res=>{
      
        this.all()
      })
    },
     allCheck(val){
            this.checklist=[];
            Array.from(this.$refs.input).forEach(el => {
                if(val.target.checked){
                    this.checklist.push(el.value)
                }
                    el.checked=val.target.checked
            });
        },
        AllcheckSubmit(flag){
                if(flag){
                    this.sendData={
                        payRealTotal:this.obj.currentPay,
                        flag:flag
                    }
                }else{
                    this.sendData={
                        payRealTotal:this.obj.unCurrentPay,
                        flag:flag
                    }
                }
               this.showDialog=true;
            // alert("待开发")

        },
        handleChangeAll(){
            this.is_checkout=null;
             this.isOpenBill=null;
             this.changeAll=true;
        },
    //搜索商品
    SearchSubmit(){
      console.log(this.SearchInputValue)
    },

    // 下架商品
    OffShelfMerchandise(item) {
      this.$confirm('是否要下架该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
this.GetUpdatePublishGoodsSatus({
        id: item.id,
        uid: item.uid,
        isenable: !item.isenable
      })
        .then(res => {
          this.all();
          this.$forceUpdate();
          this.$message({
            type: "success",
            message: "下架成功!"
          });
        })
        .catch(err => {
          this.$message(err);
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

    },
    // 重新上架商品
    ReLaunchingCommodities(item) {
      this.GetUpdatePublishGoodsSatus({
        id: item.id,
        uid: item.uid,
        isenable: !item.isenable
      })
        .then(res => {
          this.$nextTick(() => {
            this.all();
            this.$forceUpdate();
          });

          this.$message({
            type: "success",
            message: "重新上架成功!"
          });
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    tabFirst(item) {
      this.currentModlue=item;
      this.currentPage=1;
      this.all();
    },
    handleChangePage(x){
      
        this.currentPage=x;
        this.all()
    },
    countDownS_cb() {},
    countDownE_cb() {},
    all() {
      this.GetPublishGoodsListByUser({
        start: this.start,
        length: this.pageSize,
        isenable: this.currentModlue.isenable,
        searchType:true
      })
        .then(res => {
          let arr = res.data;
          arr.forEach((item, idx) => {
            if (item.priceType) {
              let ret = item.priceLevel.split("@");
              ret.forEach((items, index) => {
                let ar2 = items.split("-");
                ret[index] = ar2;
              });
              arr[idx].priceLevel = ret;
            }
          });
          this.PublishGoodsList = arr;
          this.total = res.total;
          this.checklist=[];
    
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  components: {
    Countdown
  },
 
  filters: {
    formatDate(x) {
      return TimeForma(x);
    },
     formatDate2(x) {
      return TimeForma2(x);
    },
    filterHours(val){
      return Number(val)*24
    }
  },
  computed: {
    access_token() {
      return localStorage.getItem("access_token");
    },
    //
    start() {
      return (this.currentPage - 1) * this.pageSize;
    }
  },
  created(){
    if(this.$route.query.status){
        this.currentModlue=this.tabFirstList[this.$route.query.status=='0'?1:0]
        this.$router.push(this.$route.path)
    }
  },
  mounted() {
    this.all();
  }
};
</script>
