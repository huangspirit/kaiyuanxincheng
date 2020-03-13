<template >
  <div>
    <feed-back v-if="showModalfeed" :showfeedback="showModalfeed" @submitSuc="showModalfeed=false"></feed-back>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>账单中心</el-breadcrumb-item>
      <p style="text-align:right;padding:0 40px;">
        <el-button size type="primary" @click="showModalfeed=true">问题反馈</el-button>
      </p>
    </el-breadcrumb>
    <div class="SellerBillCenter">
      <div class="top color">
        <div :class="{active:modules==2}" @click="modules=2">
          <p class="title">到期账单金额：</p>
          <p>
            <strong>{{obj.currentPay?obj.currentPay:0}}</strong>&nbsp;&nbsp;
            <a href="javascript:;" @click="despost" v-if="obj.flag">申请结算</a>
          </p>
        </div>
        <div :class="{active:modules==1}" @click="modules=1">
          <p class="title">已发货未到期金额：</p>
          <P>
            <STRONG class="blu">{{obj.unCurrentPay?obj.unCurrentPay:0}}</STRONG>
          </P>
          <p class="desc blu">当前结算周期：{{obj.day}}天（以发货时间为准）</p>
        </div>
        <div :class="{active:modules==0}" @click="modules=0">
          <p class="title">应收合计金额：</p>
          <P>
            <STRONG class="green">{{obj.total?obj.total:0}}</STRONG>
          </P>
        </div>
      </div>
      <div class="SellerBillCenter-detail">
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
              <span :class="{bgColor:is_checkout==2}" @click="changeCheckout(2)">待审核</span>&nbsp;
              <!-- <span :class="{bgColor:is_checkout==2}" @click="changeCheckout(2)">结算被驳回</span> -->
            </p>
          </div>
        </div>
        <div class="cont">
          <ul class="titl">
            <li class="left">应收金额</li>
            <li class="goodsinfo">型号</li>
            <li class="oneitem">数量</li>
            <li class style="width:125px;text-align:center;">单价</li>
            <li class="oneitem">交易金额</li>
            <li class="oneitem">平台服务费</li>
            <li class="oneitem">开票服务费</li>
            <li class="oneitem">实际应收金额</li>
            <li class="oneitem">结算状态</li>
            <li class="oneitem">操作</li>
          </ul>
          <div class="biglist" v-for="(item0,k) in tableData" :key="k">
            <div class="userinfo color">
              <p v-if="item0.create_time">创建时间：{{item0.create_time | formatDate0}}</p>
              <p>发货批次号：{{k}}</p>
              <p v-if="item0.clude_bill">{{item0.billButton?'未开票':'已开票'}}</p>
            </div>
            <div class="listwrap">
              <div class="left">
                <div style="color:#333;">
                  <p>{{item0.priceunit?'美元':'人民币'}}</p>
                  <p>{{item0.priceunit?'$':'￥'}}{{item0.realPayTotal | toFixed(item0.priceunit?3:2)}}</p>
                </div>
                <label v-if="item0.billButton && item0.clude_bill">
                  <input type="checkbox" name="checking" :value="k" v-model="checklist" ref="input" />
                </label>
                <a
                  href="javascript:;"
                  @click="getonedetailbill(item0,k)"
                  style="padding-right:10px;"
                  v-if="item0.billButton && item0.clude_bill"
                >开发票</a>
                <a :href="`${downUrl}${k}`" :download="k+'发货单'">下载发货单</a>
              </div>
              <ul class="list">
                <li v-for="(item,index) in item0.list" :key="index">
                  <div class="onecont">
                    <div class="goodsinfo">
                      <p class="name">
                        {{index+1}}、
                        <router-link
                          style="color:#333;"
                          :to="{
                                  path:'/BrandDetail/GoodsDetails',
                                  query:{
                                    tag:'goodsinfo',
                                    documentid:item.goods_id,
                                    name:item.goods_name
                                  }
                                }"
                        >{{item.goods_name}}</router-link>
                      </p>
                    </div>
                    <div class="oneitem">{{item.totalPayCount}}</div>
                    <div class style="width:125px;text-align:center;">
                      <el-popover
                        placement="left"
                        trigger="manual"
                        width="450px"
                        v-model="item.visible"
                      >
                        <div>
                          <el-table
                            v-if="item.sellprice"
                            :data="item.sellprice"
                            border
                            style="width: 100%"
                          >
                            <el-table-column prop="orderNo" label="订单号" width="180" align="center"></el-table-column>
                            <el-table-column prop="goodsCount" label="数量" align="center"></el-table-column>
                            <el-table-column prop="address" align="center" label="成交单价">
                              <template
                                slot-scope="scoped"
                              >{{scoped.row.priceUnit?'$':'￥'}}{{scoped.row.basePrice | toFixed(scoped.row.priceUnit?3:2)}}</template>
                            </el-table-column>
                          </el-table>
                        </div>
                        <a slot="reference" @click="getpriceDetail(k,index)">详细</a>
                      </el-popover>
                      <!-- <div
                        class="color"
                        v-if="!item.price_type"
                      >
                      {{item.priceunit ? '$':'￥'}}{{Number(item.seckil_price) | toFixed(item.priceunit ?3:2)}}
                      </div>
                      <div  class="color" v-if="item.price_type">{{item.priceunit ? '$':'￥'}}{{(item.totalPay/item.totalPayCount) | toFixed(item.priceunit ?3:2)}}</div>
                      <span class="blu">({{item.clude_bill?'含13%增值税':'不含税'}})</span>-->
                    </div>
                    <div
                      class="oneitem color"
                    >{{item.priceunit ? '$':'￥'}}{{item.totalPay | toFixed(item.priceunit ? 3:2)}}</div>
                    <div class="oneitem">
                      <span
                        class="color"
                      >{{item.priceunit ? '$':'￥'}}{{item.bonusServiceAmout | toFixed(item.priceunit ? 3:2)}}</span>
                    </div>
                    <div class="oneitem">
                      <span
                        class="color"
                      >{{item.priceunit ? '$':'￥'}}{{item.billServiceAmout | toFixed(item.priceunit ? 3:2)}}</span>
                    </div>
                    <div class="oneitem">
                      <span
                        class="color"
                      >{{item.priceunit ? '$':'￥'}}{{item.realPayTotal | toFixed(item.priceunit ? 3:2)}}</span>
                    </div>
                    <div class="oneitem" style="white-space:nowrap;">
                      <span v-if="item.auth_status != 2 ">{{item.is_checkout | checkoutFilter}}</span>
                      <span v-if="item.auth_status == 2 ">
                        已退货
                        <br />
                        ({{item.mark}})
                      </span>
                    </div>
                    <div class="oneitem">
                      <span
                        v-if="item.trans_code && item.trans_code=='sjsh' && item.auth_status != 2"
                      >商家送货</span>
                      <el-popover
                        v-if="item.trans_code && item.trans_code!='sjsh' && item.auth_status != 2"
                        placement="top-start"
                        width="500"
                        trigger="click"
                        @show="recordDeilery(item.deliverNo)"
                      >
                        <div class="orderpress" style="max-height:600px;overflow-y:auto;">
                          <p style="margin-bottom:15px;font-size:20px">当前物流状态</p>
                          <el-timeline>
                            <el-timeline-item
                              :timestamp="val.datetime"
                              placement="top"
                              v-for="(val, k) in expressList"
                              :key="k"
                              type="success"
                              :class="k === val.length - 1 ? 'lastfood' : '' "
                            >
                              <el-card>
                                <h4>{{val.remark}}</h4>
                              </el-card>
                            </el-timeline-item>
                          </el-timeline>
                        </div>
                        <span
                          slot="reference"
                          style="color:#0d98ff; cursor: pointer;margin-left:15px;"
                        >查询物流</span>
                      </el-popover>
                      <span v-if="item.depositUrl">
                        汇款凭证:
                        <ImgE :src="item.depositUrl" :W="40" :H="40" :isBig="true"></ImgE>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <label>
            <input type="checkbox" @change="allCheck" ref="allcheckmark" />
            全选
          </label>
          <el-button
            v-if="checklist.length"
            size="mini"
            class="bgColor"
            @click="beforebatchOpenBill"
          >批量开票</el-button>
        </div>
        <Pagination
          v-if="total"
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
    <SetTankuang
      class="settankuang openbill"
      :title="'确认开具发票'"
      v-if="centerDialogVisibleInvoice"
      @closeDialogCallBack="centerDialogVisibleInvoice = false"
    >
      <div class="dialog-body" slot="dialog-body">
        <el-form ref="ruleFormChangeDue" label-width="150px" class="demo-ruleForm">
          <el-form-item label="发票类型:">
            <p class="text">增值税发票</p>
          </el-form-item>
          <el-form-item label="发票抬头:">
            <p class="text">{{sysBillDefault.corporatename}}</p>
          </el-form-item>
          <el-form-item label="开户银行:">
            <p class="text">{{sysBillDefault.openingbank}}</p>
          </el-form-item>

          <el-form-item label="发票代码:">
            <p class="text">{{sysBillDefault.billno}}</p>
          </el-form-item>
          <el-form-item label="地  址:">
            <p class="text">{{sysBillDefault.registeredaddress}}</p>
          </el-form-item>
          <el-form-item label="电  话:">
            <p class="text">{{sysBillDefault.registeredphone}}</p>
          </el-form-item>
          <el-form-item label="图  片:">
            <el-upload
              class="avatar-uploader"
              :action="upbillImage"
              :auto-upload="true"
              list-type="picture-card"
              :on-preview="(file)=>{return onpreview(file)}"
              :on-success="(response, file, fileList)=>{return handleAvatarSuccess(response, file, fileList)}"
              :before-upload="beforeAvatarUpload"
              multiple
            >
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">支持png、jpg、gif格式</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="发票邮寄:">
            <el-radio-group v-model="bill_tran_type" class="defaultradioSquare">
              <el-radio :label="0" :value="0">随货物发出</el-radio>
              <el-radio :label="1" :value="1">单独邮寄</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer fr" style="display:flex;">
        <el-button class="cancle" @click="centerDialogVisibleInvoice = false">取消</el-button>
        <el-button class="default" @click="batchOpenBill" style="width:auto;margin-left:10px;">确认</el-button>
      </div>
    </SetTankuang>
    <el-dialog :visible.sync="showbigimg" width="600px">
      <div style="line-height:400px;text-align:center;">
        <img :src="bigmigurl" alt style="max-height:500px;max-height:400px;" />
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
@import "./SellerBillCenter.less";
</style>

<script>
import { baseURL } from "@/config";
import { TimeForma2 } from "../../../lib/utils";
import {
  axios,
  sellerCenter,
  personCenter,
  sellerOrderCenter
} from "../../../api/apiObj";
import feedBack from "_c/feedback";
export default {
  name: "SellerBillCenter",
  data() {
    return {
      showModalfeed: false,
      checklist: [],
      centerDialogVisibleInvoice: false,
      showbigimg: false,
      bigmigurl: "",
      bill_tran_type: 0,
      sysBillDefault: {},
      billImage: "",
      currentItem: {},
      expressList: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      modules: 2,
      tableData: {},
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
    this.DeliverGoodsInvoice();
    axios
      .request({
        ...personCenter.getBankList,
        params: {
          start: 0,
          length: 100
        }
      })
      .then(res => {
        if (res && res.data) {
          this.bankList = res.data.data;
        }
      });
  },
  watch: {
    checklist(val) {
      if (
        !this.$refs.input ||
        this.checklist.length < this.$refs.input.length ||
        this.$refs.input.length == 0
      ) {
        if (this.$refs.allcheckmark) {
          this.$refs.allcheckmark.checked = false;
        }
      } else {
        this.$refs.allcheckmark.checked = true;
      }
    },
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
    getpriceDetail(k,index){
      let item=this.tableData[k].list[index];
      if(item.visible){
        this.tableData[k].list[index].visible=false;
        return;
      }
      axios.request({...sellerOrderCenter.queryDeliverDetailForSeller,params:{
        start:0,
        length:100,
        seller_goods_id:item.seller_goods_id,
        deliver_no:item.deliverNo
      }}).then(res=>{
         let obj={}
        Object.keys(this.tableData).forEach(key=>{
          let one = this.tableData[key];
          if(key==k){
            one.list  = one.list.map((item0,k0)=>{
              if(k0==index){
                 item0.visible=true;
                 item0.sellprice=res.data.data
              }else{
                 item0.visible=false;
              }
              return item0
            })
          }else{
            one.list  = one.list.map((item0,k0)=>{
              item0.visible=false;
              return item0
            })
          }
          obj[key]=one;

      })
      this.tableData=obj;
      })
    },
    init() {
      this.checklist = [];
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
              let obj = {};
              res.data.list.data.forEach((el, index) => {
                if (el.price_type) {
                  el.pricelist = el.price_level.split("@").map(item => {
                    return {
                      num: item.split("-")[0],
                      price: item.split("-")[1]
                    };
                  });
                }
                if (obj[el.deliverNo]) {
                  obj[el.deliverNo].list.push(el);
                  obj[el.deliverNo].realPayTotal += el.realPayTotal;
                  if (el.billButton) {
                    obj[el.deliverNo].billButton = el.billButton;
                  }
                  if (el.clude_bill) {
                    obj[el.deliverNo].clude_bill = el.clude_bill;
                  }
                } else {
                  obj[el.deliverNo] = {
                    billButton: el.billButton,
                    clude_bill: el.clude_bill,
                    list: [el],
                    realPayTotal: el.realPayTotal,
                    priceunit: el.priceunit
                  };
                }
              });
              this.tableData = obj;
              this.total = res.data.list.total;
            } else {
              this.tableData = {};
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
    },
    recordDeilery(seller_no) {
      axios
        .request({
          ...sellerOrderCenter.queryExpress,
          params: { seller_no: seller_no }
        })
        .then(res => {
          if (res) {
            this.expressList = res.data;
          } else {
            this.expressList = [];
          }
        });
    },
    getonedetailbill(item, k) {
      this.currentItem = item;
      this.centerDialogVisibleInvoice = true;
      this.checklist = [k];
    },
    DeliverGoodsInvoice(item) {
      axios.request(sellerOrderCenter.querySysBill).then(res => {
        this.sysBillDefault = res.data;
      });
    },
    submitFormInvoice() {
      let obj = {
        transType: this.bill_tran_type,
        billId: this.sysBillDefault.id,
        sendNo: this.currentItem.deliverNo,
        billImage: this.billImage
      };
      axios
        .request({ ...sellerOrderCenter.openBill, params: obj })
        .then(res => {
          if (res.resultCode == 200) {
            this.centerDialogVisibleInvoice = false;
            this.init();
            this.$message({
              message: "提交成功",
              type: "success"
            });
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
    },
    allCheck(val) {
      this.checklist = [];
      Array.from(this.$refs.input).forEach(el => {
        if (val.target.checked) {
          this.checklist.push(el.value);
        }
        el.checked = val.target.checked;
      });
    },
    beforebatchOpenBill() {
      this.centerDialogVisibleInvoice = true;
    },
    batchOpenBill() {
      console.log(this.checklist);
      let arr = this.checklist.map(item => {
        return {
          transType: this.bill_tran_type,
          billId: this.sysBillDefault.id,
          sendNo: item,
          billImage: this.billImage
        };
      });
      console.log(arr);
      axios
        .request({
          ...sellerOrderCenter.openBatchBill,
          data: arr,
          method: "post"
        })
        .then(res => {
          if (res.resultCode == 200) {
            this.centerDialogVisibleInvoice = false;
            this.init();
            this.$message({
              message: "提交成功",
              type: "success"
            });
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess(response, file, fileList) {
      let str = "";
      fileList.forEach((el, index) => {
        if (index == 0) {
          str = el.response.data.name;
        } else {
          str = str + "@" + el.response.data.name;
        }
      });
      this.billImage = str;
    },
    onpreview(file) {
      this.showbigimg = true;
      this.bigmigurl = file.url;
    }
  },
  components: {
    feedBack
  },
  computed: {
    start() {
      return this.pageSize * (this.currentPage - 1);
    },
    downUrl() {
      let access_token = sessionStorage.getItem("access_token");
      return (
        baseURL +
        `api-order/sellerCenter/queryDeliverySheet?access_token=${access_token}&deliveryNo=`
      );
    },
    upbillImage() {
      let access_token = sessionStorage.getItem("access_token");
      return (
        baseURL +
        `api-order/sellerCenter/uploadSellerBillImage?access_token=${access_token}`
      );
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
