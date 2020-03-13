
<template>
  <!-- // 买家的发票中心 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--      <el-breadcrumb-item>买家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>发票管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="BuyerInvoiceManagement tit">
      <div class="tit">
      <div class="deliver_states">
           <p :class="{'color':currentStates== item.value}" v-for="item in states" :key="item.value">
                <label>
                  <input type="radio" :value="item.value" name="status" v-model="currentStates" />
                  {{item.label}}
                </label>
            </p>
        </div>
        <div style="flex:1">
<el-date-picker
      v-model="time"
      type="daterange"
      align="right"
       value-format="yyyy-MM-dd 00:00:00"
      unlink-panels
      range-separator="至"
      start-placeholder="订单开始日期"
      end-placeholder="订单结束日期"
      size="mini"
      :picker-options="pickerOptions">
    </el-date-picker>
        </div>
      <div class="input">
          <el-input
            placeholder="输入订单号"
            v-model="orderNo"
            size="mini"
            class="inputSearch"
            @keyup.enter.native="inputHandler"
            style="width:250px;margin-left:15px;"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="inputHandler" class="append"></el-button>
          </el-input>
        </div>
        </div>
      <div class="wrap">
        <ul class="bigTitle">
          <li class="desc">零件型号</li>
          <li class="item">货源地</li>
          <li class="item">发货日期</li>
          <li class="item">数量</li>
          <li class="item">实付金额(元)</li>
          <li class="item">商家</li>
          <li class="item">开票状态</li>
          <li class="item">开票日期</li>
          <li class="item">发票号</li>
        </ul>
        <ul class="list">
           <div v-if="total==0" class="gray" style="text-align:center;margin-top:30px;">
      暂无数据
    </div>
          <li v-for="(item,k) in list" :key="k">
            <div class="total">
              <div>创建时间：{{item.orderCreatTime | formatDate}}</div>
              <div>订单号：{{k}}</div>
              <div>订单类型：{{item.orderType?'月结订单':'普通订单'}}</div>
              <div>发票类型：{{item.billType}}</div>
            </div>
            <div class="itemone">
              <div v-for="item0 in item.list" :key="item0.id">
                <div class="desc">
<ImgE :src="item0.imageUrl" :W="40" :H="40"></ImgE>  
                  {{item0.goodsName}}
                </div>
                <div class="one">{{item0.priceUnit?'香港':'国内'}}</div>
                <div class="one">{{item0.diliverTime | formatDate1}}</div>
                <div class="one">{{item0.goodsCount}}</div>
                <div class="one">{{item0.priceUnit?'$':'￥'}}{{item0.orderAmount}}</div>
                <div class="one" @click="chipSeller(item0)">
                    <div style="border-radius:50%;height:40px;width:40px;overflow:hidden">
                      <ImgE :src="item0.userImgeUrl" :W="40" :H="40"></ImgE>
                    </div>
                  
                </div>
                <div class="one">{{item0.billStates==1?'已开票':'未开票'}}</div>
                <div class="one"><span v-if="item0.billTime">{{item0.billTime | formatDate1}}</span></div>
                <div  class="one"><a href="javascript:;" @click="showBigImg(item0.billPicture)">{{item0.billNo}}</a></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- <el-button class="bgColor AddVoice"> <router-link tag="span" to="/PersonalCenter/InvoiceInformationManagement" >管理开票信息</router-link></el-button> -->
        <Pagination
        v-if="total"
        :pageSize="pageSize"
        :total="total"
        :currentPage="currentPage"
        @current-change="currentChange"
      ></Pagination>
    </div>
   
    <el-dialog

  :visible.sync="showbigpic"
  width="600"
  top="6vh"
  >
 
 <ImgE :src="showbigpicurl" :W="500" :H="450"></ImgE>
</el-dialog>
  </div>
</template>
<script>
import { TimeForma } from "@/lib/utils";
import { axios, sellerOrderCenter } from "@/api/apiObj";

export default {
  name: "BuyerInvoiceManagement",
  data() {
    return {
      showbigpic:false,
      showbigpicurl:'',
      pageSize: 10,
      currentPage: 1,
      list: {},
      orderNo:'',
      time:'',
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      endTime:'',
      startTime:'',
      currentStates:-1,
      states:[
        {
        value:-1,
        label:'全部'
      },{
        value:1,
        label:'已开票'
      },
      {
        value:0,
        label:'未开票'
      }],
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "3",
          label: "最近三天"
        },
        {
          value: "7",
          label: "一周"
        },
        {
          value: "14",
          label: "两周"
        }
      ],
      total:0
    };
  },
  filters:{
    formatDate1(val){
      return TimeForma(val)
    }
  },
  mounted() {
    if(this.$route.query.orderNo){
      this.orderNo=this.$route.query.orderNo;
    }
    this.getInvoceList();
  },
  watch:{
     currentStates(val){
      this.currentPage=1
        this.getInvoceList();
    },
    time(val){
      this.startTime=val[0];
      this.endTime=val[1];
     this.currentPage=1;
      this.getInvoceList()
    }
  },
  methods: {
    chipSeller(item){
      console.log(item)
      if(item.tag==1){
        this.$router.push("/BrandDetail?tag=brand&documentid="+item.brandId+"&name="+item.brandName)
      }
      else{
        this.$router.push("/sellerShopDetail?sellerId="+item.sellerId)
      }
      
    },
    showBigImg(url){
      this.showbigpic=true;
      this.showbigpicurl=url;
    },
     currentChange(x) {
      this.currentPage = x;
      this.getInvoceList();
    },
     inputHandler() {
      this.currentPage=1;
      this.getInvoceList();
    },
    getInvoceList() {
        this.$loading(this.$store.state.loading);
      axios
        .request({
          ...sellerOrderCenter.billManager,
          params: {
                start:this.pageSize*(this.currentPage-1),
                length:this.pageSize,
            orderNo:this.orderNo,
            startTime:this.startTime,
            endTime:this.endTime,
            billStates:this.currentStates>-1?this.currentStates:''
          }
        })
        .then(res => {
            this.$loading(this.$store.state.loading).close();
          if (res.resultCode == "200") {
            let obj = {};
            res.data.data.map(item => {
              if (obj[item.orderNo]) {
                obj[item.orderNo].list.push(item);
              } else {
                obj[item.orderNo] = {
                  list: [item],
                  orderType: item.orderType,
                  orderCreatTime: item.orderCreatTime,
                  billType:item.billType
                };
              }
            });
            this.list = obj;
             this.total=res.data.total;
            
          }
        });
    },
    orderManageList(val) {
      this.getInvoceList();
    }
  }
};
</script>

<style lang="less" scoped>
@import "./BuyerInvoiceManagement.less";
</style>

