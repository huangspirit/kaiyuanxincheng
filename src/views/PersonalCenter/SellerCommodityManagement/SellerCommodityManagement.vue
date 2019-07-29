<template>
  <div class="SellerCommodityManagement">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="OrderManagement">
      <!-- 订单列表 -->
      <div class="tab-list">
        <!-- 一级切换 -->
        <div class="tab-list-t">
          <ul class="clear">
            <li
              v-for="item in tabFirstList"
              :key="item.id"
              :class="{active:currentModlue.id === item.id}"
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
            <span style="width:7%">售价</span>
            <span style="width:5%">MOQ</span>
            <span style="width:5%">MPQ</span>
            <span style="width:10%">交货信息</span>
            <span style="width:10%">总库存</span>
            <span style="width:10%">剩余</span>
            <span style="width:15%">类型详情</span>
            <span style="width:8%">货源</span>
            <span style="width:10%">操作</span>
          </p>
          <div class="list-item" v-for="item in PublishGoodsList" :key="item.id">
            <div class="list-item-tit">
              <span>批次号：</span>
              <span class="phon">{{item.product_no}}</span>
            </div>
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              style="table-layout:fixed"
            >
              <tr>
                <td style="width:20%;" class="goodsInfo">
                  <div class="wrap">
                    <img :src="item.goodsImageUrl" alt />
                    <div>
                      <p class="num">
                        <label for="">名称：</label>{{item.goods_name}}</p>
                      <p><label for="">品牌：</label>
                        {{item.brandName}}</p>
                    </div>
                  </div>

                </td>
                <td style="width:7%;" class="price">
                  <div class="desc">
                      <span>{{item.priceType ? '阶梯价' : '一口价'}}</span>
                      <span>({{item.includBill ? '含税价' : '含税' }})</span>
                  </div>
                  <p
                    v-if="!item.priceType"
                    class="num"
                  >{{item.priceUnit ? '$' : '￥'}}{{item.goodsPrice}}</p>
                  <ul class="list" v-if="item.priceLevel">
                    <li v-for="(val, k) in item.priceLevel" :key="k">
                      <span>{{val[0]}}</span>
                      <span class="num">{{item.priceUnit ? '$' : '￥'}}{{val[1]}}</span>
                    </li>
                  </ul>
                </td>
                <td style="width:5%;">
                  <p>{{item.moq}}</p>
                </td>
                <td style="width:5%;">
                  <p>{{item.mpq}}</p>
                </td>
                <td style="width:10%;">
                  <p>{{item.diliverPlace}}</p>
                  <p v-if="item.deliverTime">预计交期{{item.deliverTime | deliverTime}}</p>
                </td>
                <td style="width:10%;">
                  <span>{{item.goodsCount}}</span>
                </td>
                <td style="width:10%;">
                  <span>{{item.goodsStockCount}}</span>
                </td>
                <td style="width:15%;">
                  <div v-if="item.seller_always">
                    <p>长期卖</p>
                    <p>购买{{item.day_interval}}后发货</p>
                  </div>
                  <div v-else>
                    <p>限时卖</p>
                      <CountTime
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
                      ></CountTime>
                      <!-- <el-button slot="reference">剩余售卖时间</el-button> -->
                  </div>
                </td>
                <td style="width:8%;">
                  <span>{{item.goods_type ? '现货' : '期货'}}</span>
                </td>
                <td style="width:10%;">
                  <div class="wrapbtn">
                      <span v-if="item.downButton" @click="OffShelfMerchandise(item)" class="btn undone">下架该商品</span>
                      <span v-if="item.upButton" class="btn" @click="ReLaunchingCommodities(item)" >重新上架</span>
                  </div>

                </td>
              </tr>
            </table>
          </div>
        </div>
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
import { TimeForma } from "@/lib/utils";
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
      tabFirstFlag: 0,
      currentPage: 1,
      PublishGoodsList: [],
      total: 0,
        pageSize:10,
    };
  },
  methods: {
    ...mapActions("SellerCommodityManagement", [
      "GetPublishGoodsListByUser",
      "GetUpdatePublishGoodsSatus"
    ]),
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
        console.log("pageIndex:",x)
        this.currentPage=x;
        this.all()
    },
    countDownS_cb() {},
    countDownE_cb() {},
    // all2(isenable) {
    //   this.GetPublishGoodsListByUser({
    //     start: this.start,
    //     length: 10,
    //     isenable: isenable
    //   })
    //     .then(res => {
    //       let arr = res.data;
    //       arr.forEach((item, idx) => {
    //         if (item.priceType) {
    //           let ret = item.priceLevel.split("@");
    //           ret.forEach((items, index) => {
    //             let ar2 = items.split("-");
    //             ret[index] = ar2;
    //           });
    //           arr[idx].priceLevel = ret;
    //         }
    //       });
    //       this.PublishGoodsList = arr;
    //       console.log(this.PublishGoodsList);
    //       this.total = res.total;
    //     })
    //     .catch(err => {
    //       this.$message.error(err);
    //     });
    // },
    all() {
      this.GetPublishGoodsListByUser({
        start: this.start,
        length: this.pageSize,
        isenable: this.currentModlue.isenable
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
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  components: {
    Countdown
  },
  watch: {
    currentPage() {
      //this.all();
    }
  },
  filters: {
    deliverTime(x) {
      return TimeForma(x);
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
  mounted() {
    this.all();
  }
};
</script>
