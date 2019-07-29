<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>买家中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="BuyerOrderManagement">
      <!-- 订单列表 -->
      <div class="tab-list">
        <!-- 一级切换 -->
        <div class="tab-list-t">
          <ul>
            <li
              v-for="item in tabFirstList"
              :key="item.id"
              :class="{active:tabFirstFlag === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>
          <el-dropdown class="all-time" placement="bottom">
            <span class="el-dropdown-link">
              全部时间
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
              <el-dropdown-item>近一周</el-dropdown-item>
              <el-dropdown-item>近一月</el-dropdown-item>
              <el-dropdown-item>近三月</el-dropdown-item>
              <el-dropdown-item>近半年</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <SearchInput
            class="clear"
            @input="change"
            @submit="SearchSubmit"
            :value="SearchInputValue"
            :width="350"
            :height="40"
            :placeholder="'搜索订单'"
            :fontSize="14"
            :btnImgWidth="20"
            :btnWidth="40"
            :borderColor="'#e3e3e3'"
          ></SearchInput>
        </div>
        <!-- 二级切换 -->
        <div class="tab-list-b">
          <ul>
            <li v-if="tabFirstFlag === 0">
              <span>可发货</span>
              <span>
                <el-badge :value="12">备货中</el-badge>
              </span>
              <span>待付尾款</span>
              <el-dropdown class="all-time" @command="command">
                <span class="el-dropdown-link">
                  {{commandValue}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
                  <el-dropdown-item command="可变更交期">可变更交期</el-dropdown-item>
                  <el-dropdown-item command="临近交期">临近交期</el-dropdown-item>
                  <el-dropdown-item command="超出交期">超出交期</el-dropdown-item>
                  <el-dropdown-item command="已违约">已违约</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li v-if="tabFirstFlag === 2">
              <span>付款待确认</span>
              <span>到货单待确认</span>
            </li>
          </ul>
        </div>
        <!-- 列表的内容 -->
        <div class="tab-list-con">
          <p class="tab-list-con-tit">
            <span style="width:20%">收货地址</span>
            <span style="width:15%">邮费</span>
            <span style="width:15%">订单状态</span>
            <span style="width:15%">当前应付款</span>
            <span style="width:15%">金额明细</span>
            <span style="width:20%">操作</span>
          </p>
          <BuyerOrderItem

            :item="item"
            v-for="item in BuyerOrderList"
            :key="item.id"
            @successFlagHandel='all()'
          ></BuyerOrderItem>
        </div>
      </div>
      <Pagination
        v-if="BuyerOrderManagementTotal"
        :currentPage.sync="currentPage"
        :page-size="pageSize"
        :total="BuyerOrderManagementTotal"
        @current-change="handleCurrentPageChange"
      ></Pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

import BuyerOrderItem from "_c/BuyerOrderItem";

export default {
  name: "BuyerOrderManagement",
  data() {
    return {
      // 一级分类列表
      tabFirstList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 0,
          name: "待付款"
        },
        {
          id: 1,
          name: "待确认"
        },
        {
          id: 2,
          name: "待收货"
        },
        {
          id: 3,
          name: "已完成"
        },
        {
          id: 4,
          name: "违规/异常"
        }
      ],
      tabFirstFlag: "",
      commandValue: "全部状态",
      currentPage: 1,
      pageSize:10,
      SearchInputValue: "",

    };
  },
  components: {
    BuyerOrderItem
  },

  watch: {
    currentPage() {
     // this.all();
    }
  },
  methods: {
    ...mapActions("BuyerOrderManagement", ["GetBuyerOrderManagement"]),
  handleCurrentPageChange(x){
    console.log("currentpage:",x)
      this.currentPage=x
      this.all()
  },
    tabFirst(item) {
        this.tabFirstFlag = item.id;
        this.currentPage=1
        this.all()
    },
    command(x) {
      this.commandValue = x;
    },
    all() {
      this.GetBuyerOrderManagement({
        start: this.start,
        length: this.pageSize

      });
    },
    change(x) {
      this.SearchInputValue = x;
    },
    SearchSubmit() {}
  },
  computed: {
    ...mapState({
      BuyerOrderList: state =>
        state.BuyerOrderManagement.BuyerOrderManagementList,
      BuyerOrderManagementTotal: state =>
        state.BuyerOrderManagement.BuyerOrderManagementTotal
    }),
    start() {
      return (this.currentPage - 1) * this.pageSize;
    }
  },
  mounted() {
    this.all();
  }
};
</script>
<style lang="less" scoped>
@import "./BuyerOrderManagement.less";
</style>

