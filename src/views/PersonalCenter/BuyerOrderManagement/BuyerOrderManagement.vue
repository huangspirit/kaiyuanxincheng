<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>买家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item class="itemActive">我的订单</el-breadcrumb-item>
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
              :class="{bgColor:tabFirstFlag === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>
          <el-select
            class="all-time fl"
            @change="getOrderList(orderDate)"
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
        <!-- 二级切换 -->
        <div class="tab-list-b">
          <ul>
            <li v-if="tabFirstFlag === 0">
              <span
                v-for="(item,index) in subWaitPay"
                :key="index"
                :class="item.show==true?'color':''"
                @click="getsubWait(item,index)"
              >{{item.name}}</span>
            </li>
            <li v-if="tabFirstFlag === 1">
              <span
                v-for="(item,index) in subConfirm"
                :key="index"
                :class="item.show==true?'color':''"
                @click="getSubConfirm(item,index)"
              >{{item.name}}</span>
            </li>
            <li v-if="tabFirstFlag === 4">
              <span
                v-for="(item,index) in abnormalData"
                :class="item.show==true?'color':''"
                :key="index"
                @click="subAbnormal(item,index)"
              >超期未交货</span>
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
            v-for="item in BuyerOrderList"
            :item="item"
            :key="item.id"
            @successFlagHandel="all()"
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
          params: "",
          name: "全部"
        },
        {
          id: 0,
          params: "2",
          name: "待付款"
        },
        {
          id: 1,
          params: "3",
          name: "待确认"
        },
        {
          id: 2,
          params: "4",
          name: "待收货"
        },
        {
          id: 3,
          params: "5",
          name: "已完成"
        },
        {
          id: 4,
          params: "6",
          name: "违规/异常"
        }
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
      subWaitPay: [
        {
          name: "新订单",
          params: "2.1",
          show: false
        },
        {
          name: "待付尾款",
          params: "2.2",
          show: false
        },
        {
          name: "到期未付",
          params: "2.3",
          show: false
        },
        {
          name: "月结",
          params: "2.4",
          show: false
        }
      ],
      subConfirm: [
        {
          name: "交期变更确认",
          params: "3.1",
          show: false
        },
        {
          name: "合同被驳回",
          params: "3.2",
          show: false
        },
        {
          name: "待上传合同",
          params: "3.3",
          show: false
        },
        {
          name: "合同待确认",
          params: "3.4",
          show: false
        },
        {
          name: "汇款单待确认",
          params: "3.5",
          show: false
        },
        {
          name: "汇款单待驳回",
          params: "3.6",
          show: false
        }
      ],
      abnormalData: [
        {
          name: "超期未交货",
          params: "6.1",
          show: false
        },
        {
          name: "失效订单",
          params: "6.2",
          show: false
        }
      ],
      orderDate: "",
      tabFirstFlag: "",
      orderParams: {},
      currentPage: 1,
      pageSize: 10,
      SearchInputValue: ""
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
    handleCurrentPageChange(x) {
      console.log("currentpage:", x);
      this.currentPage = x;
      this.all();
    },
    tabFirst(item) {
      this.tabFirstFlag = item.id;
      this.currentPage = 1;
      if (this.orderDate) {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: item.params,
          day: this.orderDate
        };
      } else {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: item.params
        };
      }
      this.all();
    },
    getsubWait(val, index) {
      for (var i = 0; i < this.subWaitPay.length; i++) {
        this.subWaitPay[i].show = false;
      }
      this.subWaitPay[index].show = true;
      if (this.orderDate) {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params,
          day: this.orderDate
        };
      } else {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params
        };
      }

      this.all();
    },
    getSubConfirm(val, index) {
      for (var i = 0; i < this.subConfirm.length; i++) {
        this.subConfirm[i].show = false;
      }
      this.subConfirm[index].show = true;

      if (this.orderDate) {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params,
          day: this.orderDate
        };
      } else {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params
        };
      }
      this.all();
    },
    subAbnormal(val, index) {
      for (var i = 0; i < this.abnormalData.length; i++) {
        this.abnormalData[i].show = false;
      }
      this.abnormalData[index].show = true;

      if (this.orderDate) {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params,
          day: this.orderDate
        };
      } else {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          type: val.params
        };
      }
      this.all();
    },
    getOrderList(val) {
      this.orderParams["day"] = val;
      this.all();
      console.log(this.orderParams);
    },
    all() {
      this.GetBuyerOrderManagement(this.orderParams);
    }
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
    if (this.$route.query.code == "success") {
      let path = this.$route.path;
      this.$message.success("订单支付成功");
      this.$router.push({
        path: path
      });
    }
    this.orderParams = {
      start: this.start,
      length: this.pageSize
    };
    this.all();
  }
};
</script>
<style lang="less" scoped>
@import "./BuyerOrderManagement.less";
</style>

