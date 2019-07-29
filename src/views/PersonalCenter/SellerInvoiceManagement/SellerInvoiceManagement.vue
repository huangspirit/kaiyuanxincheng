<template>
  <div class="SellerInvoiceManagement">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    <div class="OrderManagement">
      <!-- 订单列表 -->
      <div class="tab-list">
        <!-- 一级切换 -->
        <div class="tab-list-t">
          <ul>
            <li
              v-for="item in tabFirstList"
              :key="item.id"
              :class="{active:currentModule.id === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>
          <SearchInput
              class="clear"
              @submit="SearchSubmit"
              :value="SearchInputValue"
              :width="350"
              :height="40"
              :placeholder="'输入商品名称'"
              :fontSize="14"
              :btnImgWidth="20"
              :btnWidth="40"
              :borderColor="'#e3e3e3'"
          ></SearchInput>
        </div>
        <!-- 列表的内容 -->
        <div class="tab-list-con">
          <p class="tab-list-con-tit">
            <span style="width:20%">商品信息</span>
            <span style="width:10%">单价/数量</span>
            <span style="width:14%">交期</span>
            <span style="width:8%">交货地</span>
            <span style="width:8%">当前状态</span>
            <span style="width:25%">发票信息</span>
            <span style="width:15%">操作</span>
          </p>
          <div class="list-item" v-for="item in 6" :key="item">
            <div class="list-item-tit">
              <span class="time">2019-04-21 09:13:04</span>
              <span class="phon">批次号：<strong>86627573023</strong></span>
              <span class="inform fr">
                深圳强哥
                <img src="@/assets/image/PersonalCenter/u23123.png" alt>
              </span>
            </div>
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              style="table-layout:fixed"
            >
              <tr>
                <td style="width:20%" class="goodsInfo">
                    <div>
                        <img src="@/assets/image/PersonalCenter/_u24718.png" alt>
                        <div>
                            <p ><strong>名称：</strong><span class="num">EDHDJHKS-234J</span></p>
                            <p><strong>品牌：</strong>博世电子</p>
                        </div>
                    </div>
                </td>
                <td style="width:10%">
                  <p class="num">￥3.5x1000</p>
                  <span>(拼团价)</span>
                </td>
                <td style="width:14%">
                  <p>2019-06-30</p>
                  <span>已发货</span>
                </td>
                <td style="width:8%">
                  <p>大陆内地</p>
                </td>
                <td style="width:8%">
                  <p>等待平台收货</p>
                </td>
                <td style="width:25%" class="invoceInfo">
                  <p><strong>抬头：</strong>北京芯手网科技有限公司</p>
                  <p><strong>金额：</strong>35000元</p>
                  <p><strong>类型：</strong>专用发票发票</p>
                </td>
                <td style="width:15%">

                        <el-button class="default" style="margin:0 auto;">确认开票</el-button>


                </td>
              </tr>
            </table>
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
  </div>
</template>
<style lang="less" scoped>
  /*@import "../SellerOrderManagement/SellerOrderManagement.less";*/
  @import "./SellerInvoiceManagement.less";
</style>
<script>
// import "@/assets/css/ele-form.less";
import {mapState,mapActions} from "vuex"
export default {
  name: "SellerInvoiceManagement",
  data() {
    return {
      // 一级分类列表
      tabFirstList: [
        {
          id: 0,
          name: "已开票"
        },
        {
          id: 1,
          name: "待开票"
        }
      ],
      currentModule:{
          id: 0,
      },
        currentPage:1,
        pageSize:1,
        total:6,
    };
  },
  methods: {
      ...mapActions("GetAllPersonalInvoice",[
          "GetAllPersonalInvoice"
      ]),
      SearchSubmit(){

      },
    tabFirst(item) {
      this.currentModule=item;
    },
      handleCurrentPageChange(x){
      console.log(x)
      }
  }
};
</script>
