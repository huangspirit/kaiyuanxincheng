
<template>
  <!-- // 买家的发票中心 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>买家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>发票管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="BuyerInvoiceManagement">
       <el-select v-model="orderDate" @change="orderManageList(orderDate)" placeholder="请选择查询时间段">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        <!-- <el-button class="bgColor AddVoice"> <router-link tag="span" to="/PersonalCenter/InvoiceInformationManagement" >管理开票信息</router-link></el-button> -->
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="orderTitle" align="center" width="400px"  label="商品" >
          <template slot-scope="scope">
            <div class="goodsinfo">
            <ImgE :src="scope.row.goodsPicture" :W="60" :H="60"></ImgE>
            <div>
              <p>
                <span>订单编号：</span>
                <span class="color">{{scope.row.orderNo}}</span>
              </p>
              <p>{{scope.row.orderTitle}}</p>
              <p>{{scope.row.orderCreateTime | formatDate}}</p>
            </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" align="center">
          <template  slot-scope="scoped">
            ￥{{scoped.row.orderAmount | toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="billType" align="center" label="发票类型"></el-table-column>
        <el-table-column prop="billTitle" align="center" label="发票信息">
          <template slot-scope="scope">
            <p>
              <span>抬头：</span>
              {{scope.row.billTitle}}
            </p>
          </template>
        </el-table-column>

        <el-table-column prop="billCheck" align="center" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.billCheck == true">已开票</span>
            <span v-if="scope.row.billCheck == false">未开票</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/lib/utils";
import { axios, sellerOrderCenter } from "@/api/apiObj";

export default {
  name: "BuyerInvoiceManagement",
  data() {
    return {
      tableData: [],
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
      orderDate:"",
    };
  },
  mounted() {
    this.getInvoceList();
  },
  methods: {
    getInvoceList() {
      axios
        .request({
          ...sellerOrderCenter.billManager,
          params: { 
            start: 0,
            length: 10 ,
            day:this.orderDate
             }
        })
        .then(res => {
          if (res.resultCode == "200") {
            this.tableData = res.data.data;
          }
        });
    },
    orderManageList(val){
      this.getInvoceList();
    }
  }
};
</script>

<style lang="less" scoped>
@import "./BuyerInvoiceManagement.less";
</style>

