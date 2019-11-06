<template >
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>账单中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="SellerBillCenter">
      <div class="top">
        <div :class="{active:modules==0}" @click="modules=0">
          <p class="title">可提现金额合计：</p>
          <P>
            <STRONG>{{obj.total?obj.total:0}}</STRONG>
          </P>
        </div>
        <div :class="{active:modules==2}" @click="modules=2">
          <p class="title">账单到期可提现金额：</p>
          <p>
            <strong>{{obj.currentPay?obj.currentPay:0}}</strong>&nbsp;&nbsp;
            <a href="javascript:;" @click="despost" v-if="obj.flag">结账</a>
          </p>
          <p class="desc">当前结算周期：{{obj.day}}天（以发货时间为准）</p>
        </div>
        <div :class="{active:modules==1}" @click="modules=1">
          <p class="title">已发货未到期提现金额：</p>
          <P>
            <STRONG>{{obj.unCurrentPay?obj.unCurrentPay:0}}</STRONG>
          </P>
        </div>
      </div>
      <div class="SellerBillCenter-detail">
        <!-- <div class="search">
              <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
              </el-date-picker>
        </div>-->
        <div class="tit clear">
          <el-date-picker
            class="fl"
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="left"
            size="mini"
          ></el-date-picker>
          <div class="clear search btn fl">
            <span class="fl" @click="handleChangeAll" :class="{bgColor:changeAll==true}">全部</span>
            <p class="fl">
              状态|
              <span :class="{bgColor:is_checkout==0}" @click="changeCheckout(0)">未结账</span>&nbsp;
              <span :class="{bgColor:is_checkout==1}" @click="changeCheckout(1)">已结账</span>&nbsp;
              <span :class="{bgColor:is_checkout==2}" @click="changeCheckout(2)">待审核</span>
              &nbsp;
              <!-- <span :class="{bgColor:is_checkout==2}" @click="changeCheckout(2)">结算被驳回</span> -->
            </p>
          </div>
        </div>
        <el-table :data="tableData" border width="100%">
          <el-table-column label="商品详情" align="center" width="400">
            <template slot-scope="scope">
              <div class="infoWrap">
                <div class="color goods_seller_no">批次号：{{scope.row.goods_seller_no}}</div>
                <div class="info">
                  <ImgE :src="scope.row.goods_image" :W="50" :H="50" style="width:50px;"></ImgE>
                  <div class="cont">
                    <p class="color name">
                      <router-link
                        class="color"
                        :to="{
                          path:'/BrandDetail/GoodsDetails',
                          query:{
                            tag:'goodsinfo',
                            documentid:scope.row.goods_id,
                            name:scope.row.goods_name
                          }
                        }"
                      >{{scope.row.goods_name}}</router-link>
                    </p>
                    <p>
                      <router-link
                        :to="{
                          path:'/BrandDetail',
                          query:{
                            tag:'brand',
                            documentid:scope.row.goods_brand_id,
                            name:scope.row.goods_brand
                          }
                        }"
                      >{{scope.row.goods_branda}}</router-link>
                    </p>
                    <p class="gray">{{scope.row.goods_desc}}</p>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <!--              <el-table-column-->
          <!--                  prop="support_bill"-->
          <!--                  label="支持开票"-->
          <!--                  align="center"-->
          <!--              >-->
          <!--                  <template slot-scope="scope">-->
          <!--                      <span>{{scope.row.support_bill?'支持':'不支持'}}</span>-->
          <!--                  </template>-->
          <!--              </el-table-column>-->
          <el-table-column prop="totalPay" label="金额/数量" align="center" width="180">
            <template slot-scope="scope">
              <p>
                <span class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.totalPay}}</span> &nbsp;&nbsp;
                <span>/ &nbsp;&nbsp;{{scope.row.totalPayCount}}只</span>
              </p>
              <p
                class="color"
              >{{scope.row.clude_bill?'含13%增值税':'不含税'}} ，{{scope.row.support_bill?'卖家开发票':'系统开发票'}}</p>
            </template>
          </el-table-column>
          <!-- <el-table-column
                  prop="taxAmount"
                  label="发票税额"
                  align="center">
                  <template slot-scope="scope">
                      <span class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.taxAmount}}</span>
                  </template>
          </el-table-column>-->
          <el-table-column label="违约金/违约天数" align="center">
            <template slot-scope="scope">
              <span
                class="color"
                v-if="scope.row.violate_count"
              >{{scope.row.priceunit ? '$':'￥'}}{{scope.row.violate_monney | toFixed(scope.row.priceunit ? 3:2)}}</span>
              <span v-if="scope.row.violate_count">/{{scope.row.violate_count}}</span>
              <p v-if="scope.row.violate_count">违约开始日期{{scope.row.expireTime | formatDate}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="bonusServiceAmout" label="平台服务费" align="center">
            <template slot-scope="scope">
              <span
                class="color"
              >{{scope.row.priceunit ? '$':'￥'}}{{scope.row.bonusServiceAmout | toFixed(scope.row.priceunit ? 3:2)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="billServiceAmout" label="增值服务费" align="center">
            <template slot-scope="scope">
              <span
                class="color"
              >{{scope.row.priceunit ? '$':'￥'}}{{scope.row.billServiceAmout | toFixed(scope.row.priceunit ? 3:2)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="实际结算金额" align="center">
            <template slot-scope="scope">
              <span
                class="color"
              >{{scope.row.priceunit ? '$':'￥'}}{{scope.row.realPayTotal | toFixed(scope.row.priceunit ? 3:2)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.status | statusFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="is_checkout" label="结算状态" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.is_checkout | checkoutFilter}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
                  label="操作"
              align="center">
                  <template slot-scope="scope" v-if="!scope.row.is_checkout">
                      <el-button
                          @click.native.prevent="despost(scope.$index)"
                          type="text"
                          size="small"
                      class="bgColor"
                      v-if="!scope.row.is_checkout">
                          提现
                      </el-button>
                  </template>
          </el-table-column>-->
        </el-table>
        <Pagination
          v-if="total>pageSize"
          @current-change="handleCurrentChange"
          :pageIndex.sync="currentPage"
          :pageSize="pageSize"
          :total="total"
        ></Pagination>
      </div>
    </div>
    <el-dialog :visible.sync="showinputwithdrawTotal" width="700px" class="withdrawApplyTotal">
      <div class="withdrawApplyTotalCont">
        <ul v-if="bankList.length">
          <li class="title">
            <span>提现方式</span>
            <span>账号</span>
            <span>账户名</span>
          </li>
          <li
            v-for="(item,k) in bankList"
            :class="selectedBank==k?'bgColor':''"
            :key="k"
            @click="selectedBank=k"
          >
            <span>{{item.bankCode | filterBankCode}}</span>
            <span>{{item.bankNumber}}</span>
            <span>{{item.cnname}}</span>
          </li>
        </ul>
        <router-link v-if="bankList.length==0" to="/PersonalCenter/withdraw" class="band">没有提现账号，去绑定</router-link>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showinputwithdrawTotal = false">取 消</el-button>
        <el-button type="primary" @click="saveDraw">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
@import "./SellerBillCenter.less";
</style>

<script>
import { TimeForma2 } from "../../../lib/utils";
import { axios, sellerCenter, personCenter } from "../../../api/apiObj";
export default {
  name: "SellerBillCenter",
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      modules: 0,
      tableData: [],
      obj: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      startTime: "",
      endTime: "",
      changeAll: true,
      is_checkout: null,
      showinputwithdrawTotal: false,
      bankList: [],
      selectedBank: 0
    };
  },
  mounted() {
    this.init();
    axios
      .request({
        ...personCenter.getBankList,
        params: {
          start: 0,
          length: 100
        }
      })
      .then(res => {
        this.bankList = res.data.data;
      });
  },
  watch: {
    value2(val) {
      this.startTime = TimeForma2(val[0]);
      this.endTime = TimeForma2(val[1]);
      this.init();
    },
    is_checkout(val) {
      this.currentPage = 1;
      this.init();
    }
  },
  methods: {
    init() {
      let obj = {
        start: this.start,
        length: this.pageSize,
        beginTime: this.startTime,
        endTime: this.endTime,
        is_checkout: this.is_checkout
      };
      axios
        .request({ ...sellerCenter.queryAccountDetail, params: obj })
        .then(res => {
          if (res) {
            this.obj = res.data;
            if (res.data.list) {
              this.tableData = res.data.list.data;
              this.total = res.data.list.total;
            } else {
              this.tableData = [];
              this.total = 0;
            }
          }
        });
    },
    jiezhang() {
      this.$confirm("确定结账?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios.request(sellerCenter.saveSellerCheckApply).then(res => {
            if (res) {
              this.init();
              this.$message.success("结账申请已提交");
            }
          });
        })
        .catch(() => {});
    },
    handleChangeAll() {
      this.is_checkout = null;

      this.changeAll = true;
    },
    changeCheckout(val) {
      if (this.is_checkout == val) {
        this.is_checkout = null;
      } else {
        this.is_checkout = val;
        this.changeAll = false;
      }
    },
    handleCurrentChange(x) {
      this.currentPage = x;
      this.init();
    },
    despost() {
      this.showinputwithdrawTotal = true;
    },
    //提现的相关操作
    withDraw() {
      //先验证是否设置提现密码
      this.inputpassword = "";
      axios.request(personCenter.checkSetPassword).then(res => {
        if (res.data == 1) {
          this.showinputPassword = true;
        } else {
          //需要新增
          this.$prompt("请设置提现密码", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(({ value }) => {
              //校验密码
              axios
                .request({
                  ...personCenter.savedrawPassword,
                  data: { password: value }
                })
                .then(res => {
                  if (res) {
                    this.showinputPassword = false;
                    this.showinputwithdrawTotal = true;
                    axios
                      .request({
                        ...personCenter.getBankList,
                        params: {
                          start: 0,
                          length: 100
                        }
                      })
                      .then(res => {
                        this.bankList = res.data.data;
                      });
                  }
                });
            })
            .catch(() => {});
        }
      });
    },
    checkpassword() {
      axios
        .request({
          ...personCenter.checkdrawPassword,
          data: { password: this.inputpassword }
        })
        .then(res => {
          if (res) {
            this.showinputPassword = false;
            this.showinputwithdrawTotal = true;
            axios
              .request({
                ...personCenter.getBankList,
                params: {
                  start: 0,
                  length: 100
                }
              })
              .then(res => {
                console.log(res);
                this.bankList = res.data.data;
              });
          }
        });
    },
    saveDraw() {
      let obj = {
        account_id: this.bankList[this.selectedBank].id
      };
      axios
        .request({ ...sellerCenter.saveSellerCheckApply, params: obj })
        .then(res => {
          if (res) {
            this.init();
            this.$message.success("结账申请已提交");
            this.showinputwithdrawTotal = false;
          }
        });
    }
  },
  computed: {
    start() {
      return this.pageSize * (this.currentPage - 1);
    }
  },
  filters: {
    checkoutFilter(val) {
      switch (Number(val)) {
        case 0:
          return "未结账";
        case 1:
          return "已结账";
        // case 2:
        //     return '仓库核实不通过';
        // case 3:
        //     return '仓库核实通过'
        case 2:
          return "待审核";
      }
    },
    statusFilter(val) {
      switch (val) {
        case 0:
          return "未发货";
        case 1:
          return "已发货";
        // case 2:
        //     return '仓库核实不通过';
        // case 3:
        //     return '仓库核实通过'
        case 3:
          return "已逾期";
      }
    },
    formatDate(val) {
      return TimeForma2(val);
    },
    filterBankCode(val) {
      switch (val) {
        case "ICBC":
          return "工商银行";
        case "ABC":
          return "农业银行";
        case "CCB":
          return "建设银行";
        case "CMB":
          return "招商银行";
        case "COMM":
          return "交通银行";
        case "alipay":
          return "支付宝";
      }
    }
  }
};
</script>
