
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
      <table width="100%" border="1" cellpadding="0" cellspacing="0" style="table-layout:fixed">
        <thead>
          <th style="width:300px">订单</th>
          <th style="width:153px">订单金额</th>
          <th style="width:146px">发票类型</th>
          <th style="width:323px">发票信息</th>
          <th style="width:247px">操作</th>
        </thead>
        <tbody>
          <tr v-for="item in 5" :key="item">
            <td>
              <div>
                <img src="@/assets/image/PersonalCenter/_u24718.png" alt>
                <div>
                  <p class="sp_q">
                    订单编号：
                    <span class="num">86627573023</span>
                  </p>
                  <p>EDHDFJHKS-234J 等2个商品</p>
                  <p>2019-06-04 00:07:26</p>
                </div>
              </div>
            </td>
            <td>
              <div>
                <p>￥50000</p>
              </div>
            </td>
            <td>
              <div>
                <p>普通发票</p>
              </div>
            </td>
            <td>
              <div>
                <p>
                  <span>抬头：</span>北京芯手网科技有限公司
                </p>
                <p>金额：35000元</p>
              </div>
            </td>
            <td>
              <div>
                <span @click="seeImg">查看</span>
                <span>下载</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: "BuyerInvoiceManagement",
  data() {
    return {
      dialogVisible:false,
      dialogImageUrl:''
    };
  },
  methods:{
    seeImg(){
      this.dialogVisible = true
    }
  }
};
</script>

<style lang="less" scoped>
@import "./BuyerInvoiceManagement.less";
</style>

