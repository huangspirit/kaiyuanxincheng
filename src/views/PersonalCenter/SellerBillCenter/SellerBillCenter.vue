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
        <table class="table">
          <thead>
            <tr>
              <th>批次号</th>
              <th>商品详情</th>
              <th>金额/数量</th>
              <th>平台服务费</th>
              <th>增值服务费</th>
              <th>实际结算金额</th>
              <th>结算状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item0,k) in tableData">
            <tr v-for="(item,index) in item0.list" :key="item.id" v-if="item0.list">
              <td v-if="index==0" :rowspan="item0.list.length">
                <div class="color goods_seller_no">
                 {{item.goods_seller_no}}
                  </div>
                  <div style="line-height:30px;">
                    <label v-if="item0.billButton">
                      <input
                        type="checkbox"
                        name="checking"
                        :value="k"
                        v-model="checklist"
                        ref="input"
                      />
                    </label> <a href="javascript:;" @click="getonedetailbill(item)" style="padding-right:10px;" v-if="item0.billButton"> 开发票</a>
                  <a :href="`${downUrl}${item.goods_seller_no}`" :download="item.goods_seller_no+'发货单'" >下载发货单</a>
                  </div>
              </td>
              <td>
                 <div class="infoWrap">
                <div class="info">
                  <ImgE :src="item.goods_image" :W="50" :H="50" style="width:50px;"></ImgE>
                  <div class="cont">
                    <p class="color name">
                      <router-link
                        class="color"
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
                    <p>
                      <router-link
                        :to="{
                          path:'/BrandDetail',
                          query:{
                            tag:'brand',
                            documentid:item.goods_brand_id,
                            name:item.goods_brand
                          }
                        }"
                      >{{item.goods_branda}}</router-link>
                    </p>
                    <p class="gray">{{item.goods_desc}}</p>
                  </div>
                </div>
              </div>
              </td>
              <td>
                <p>
                <span class="color">{{item.priceunit ? '$':'￥'}}{{item.totalPay}}</span> &nbsp;&nbsp;
                <span>/ &nbsp;&nbsp;{{item.totalPayCount}}只</span>
              </p>
              <p
                class="color"
              >{{item.clude_bill?'含13%增值税':'不含税'}} ，{{item.support_bill?'卖家开发票':'系统开发票'}}</p>
              </td>
              <td>
                 <span
                class="color"
              >{{item.priceunit ? '$':'￥'}}{{item.bonusServiceAmout | toFixed(item.priceunit ? 3:2)}}</span>
              </td>
              <td>
                <span
                class="color"
              >{{item.priceunit ? '$':'￥'}}{{item.billServiceAmout | toFixed(item.priceunit ? 3:2)}}</span>
              </td>
              <td>
                 <span
                class="color"
              >{{item.priceunit ? '$':'￥'}}{{item.realPayTotal | toFixed(item.priceunit ? 3:2)}}</span>
              </td>
              <td>
                 <span>{{item.is_checkout | checkoutFilter}}</span>
              </td>
              
              <td>
                 <ImgE :src="item.biurl" :isBig="true" v-if="item.biurl" :W="50" :H="50"></ImgE>
                       <el-popover
                       v-if="!item.biurl"
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
                        <span slot="reference" style="color:#0d98ff; cursor: pointer;margin-left:15px;">查询物流</span>
                      </el-popover>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      <div>
       <label><input type="checkbox" @change="allCheck" ref="allcheckmark" />
                      全选</label> 
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
                      <i
                        class="el-icon-plus"
                      ></i>
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
          <el-button
            class="default"
            @click="batchOpenBill"
            style="width:auto;margin-left:10px;"
          >确认</el-button>
        </div>
      </SetTankuang>
         <el-dialog  :visible.sync="showbigimg" width="600px">
            <div style="line-height:400px;text-align:center;">
                <img :src="bigmigurl" alt="" style="max-height:500px;max-height:400px;">
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
import { axios, sellerCenter, personCenter,sellerOrderCenter  } from "../../../api/apiObj";
export default {
  name: "SellerBillCenter",
  data() {
    return {
      checklist:[],
      centerDialogVisibleInvoice:false,
      showbigimg:false,
      bigmigurl:'',
      bill_tran_type:0,
      sysBillDefault:{},
      billImage:'',
      currentItem:{},
      expressList:[],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      modules: 0,
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
        this.bankList = res.data.data;
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
    init() {
      this.checklist=[]
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
           
              let obj={}
              res.data.list.data.forEach((el,index) => {
                if(obj[el.goods_seller_no]){
                  obj[el.goods_seller_no].list.push(el)
                  if(el.billButton){
                      obj[el.goods_seller_no].billButton=el.billButton
                  }
                }else{
                  obj[el.goods_seller_no]={
                    billButton:el.billButton,
                    list:[el]
                  }
                }
              });
              this.tableData =obj
             
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
    recordDeilery(seller_no){
      axios
        .request({
          ...sellerOrderCenter.queryExpress,
          params: { seller_no: seller_no }
        })
        .then(res => {
          if(res){
            this.expressList = res.data;
          }else{
            this.expressList=[]
          }
          
        });
    },
    getonedetailbill(item){
      this.currentItem = item;
      this.centerDialogVisibleInvoice = true;
      this.checklist=[item.goods_seller_no]
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
        sendNo: this.currentItem.goods_seller_no,
        billImage:this.billImage,
      };
      axios
        .request({ ...sellerOrderCenter.openBill, params: obj })
        .then(res => {
          if(res.resultCode==200){
            this.centerDialogVisibleInvoice = false;
            this.init();
            this.$message({
              message:'提交成功',
              type:"success"
            })
          }else{
            this.$message({
              message:res.message,
              type:"warning"
            })
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
    beforebatchOpenBill(){
      this.centerDialogVisibleInvoice=true;
    },
    batchOpenBill(){
      let arr=this.checklist.map(item=>{
        return {
          transType: this.bill_tran_type,
          billId: this.sysBillDefault.id,
          sendNo: item,
          billImage:this.billImage,
        }
      })
      axios
        .request({...sellerOrderCenter.openBatchBill, data: arr,method:'post' })
        .then(res => {
          if(res.resultCode==200){
            this.centerDialogVisibleInvoice = false;
            this.init();
            this.$message({
              message:'提交成功',
              type:"success"
            })
          }else{
            this.$message({
              message:res.message,
              type:"warning"
            })
          }
          
          
        });

    },
    beforeAvatarUpload(){

    },
    handleAvatarSuccess(response, file, fileList){
      let str="";
      fileList.forEach((el,index) => {
        if(index==0){
          str=el.response.data.name
        }else{
          str=str+'@'+el.response.data.name;
        }
      });
      this.billImage=str;
    },
    onpreview(file){
        this.showbigimg=true;
        this.bigmigurl=file.url;
    }
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
    upbillImage(){
      let access_token = sessionStorage.getItem("access_token");
      return (
        baseURL+
        `api-order/sellerCenter/uploadSellerBillImage?access_token=${access_token}`
      )
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
