
<template>
  <!-- // 买家的发票中心 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>买家中心</el-breadcrumb-item>
      <el-breadcrumb-item>发票管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="BuyerInvoiceManagement">
      <p class="addInvoice">
        <router-link tag="span" to="/PersonalCenter/InvoiceInformationManagement">管理开票信息</router-link>
      </p>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="orderTitle" align="center" width="400px"  label="商品">
          <template slot-scope="scope">
            <img :src="scope.row.goodsPicture" alt />
            <div>
              <p>
                <span>订单编号：</span>
                <span style="color:#E84F47;">{{scope.row.orderNo}}</span> 
              </p>
              <p>{{scope.row.orderTitle}}</p>
              <p>{{scope.row.orderCreateTime | formatDate}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" align="center"></el-table-column>
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
import "./BuyerInvoiceManagement.less";
export default {
  name: "BuyerInvoiceManagement",
  data() {
    return {
      tableData: []
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
          params: { start: 0, length: 10 }
        })
        .then(res => {
          console.log(res);
          if (res.resultCode == "200") {
            this.tableData = res.data.data;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>

