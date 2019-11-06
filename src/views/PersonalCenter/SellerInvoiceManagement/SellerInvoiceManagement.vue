<template>
  <div class="SellerInvoiceManagement">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>发票管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="OrderManagement">
      <!-- 订单列表 -->
      <div class="tab-list">
        <!-- 一级切换 -->
        <div class="tab-list-t clear">
          <!-- <el-input
            class="fr"
            placeholder="请输入型号"
            v-model="SearchInputValue"
            prefix-icon="el-icon-search"
            @input="handleInput"
            clearable
          ></el-input> -->
          <ul>
            <li
              v-for="item in tabFirstList"
              :key="item.id"
              :class="{bgColor:currentModule.id === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>
          <el-select
            class="all-time fl"
            @change="setDay(orderDate)"
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
        <div class="tab-list-con" style="color:#333;">
          <p class="tab-list-con-tit">
            <span style="width:25%">开票信息</span>
            <span style="width:17%">状态</span>
            <span style="width:30%">器件型号</span>
            <span style="width:7%">购买数量</span>
            <span style="width:7%">单价</span>
            <span style="width:7%">金额</span>
            <span style="width:7%">是否需要开票</span>

            <!-- <span style="width:14%">交期</span>
            <span style="width:8%">交货地</span>
            <span style="width:8%">当前状态</span>
            <span style="width:20%">{{currentModule.val?'发票信息':'操作'}}</span>-->
          </p>
          <div v-if="list.length==0" class="nocontent">暂无内容</div>
          <div class="list-item" v-for="item0 in list" :key="item0.id">
            <div class="list-item-tit">
              <span class="phon">
                发货单号：
                <strong>{{item0.send_no}}</strong>
              </span>
              <span>发货日期：{{item0.create_time | formatDate1}}</span>
            </div>
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              style="table-layout:fixed"
            >
              <template v-for="(item,index) in item0.childRenList">
                <tr :key="index">
                  <td
                    style="width:25%;text-align:left;padding:8px;color:#333;"
                    :rowspan="item0.childRenList.length"
                    v-if="index==0"
                  >
                    <p>公司抬头：{{sysBillDefault.corporatename}}</p>
                    <p>
                      发票总额：
                      <strong>{{item0.priceunit?'$':'￥'}}{{item0.totalPay | toFixed(item0.priceunit?3:2)}}</strong>
                    </p>
                    <p>
                      汇率：
                      <strong>{{item0.exchange}}</strong>
                    </p>
                    <p>发票类型：增值税发票</p>
                  </td>
                  <td style="width:17%" :rowspan="item0.childRenList.length" v-if="index==0">
                    <p v-if="item0.bill_state==0">未开票</p>
                     
                    <p v-if="item0.bill_state==1">{{item0.auth_state | authState}}</p>
                    <el-button
                      v-if="item0.bill_state==0 || item0.auth_state==2"
                      class="bgColor"
                      @click="confirmOpenbill(item0)"
                    >{{item0.auth_state==2?'重新开票':'开票'}}</el-button>
                    <div v-if="item0.bill_state">
                      <p style="margin:5px 0;">日期：{{item0.update_time | formatDate1}}</p>
                      <p><el-button @click="getdetail(item0)" size="mini" >查看</el-button></p>
                    </div>
                  </td>
                  <td style="width:30%" class="goodsInfo">
                    <div>
                      <p>
                        <ImgE :src="item.goods_image" :W="70" :H="70"></ImgE>
                      </p>

                      <div>
                        <p>
                          <router-link
                            :to="{
                                path:'/BrandDetail/GoodsDetails',
                                query:{
                                    tag:'goodsinfo',
                                    documentid:item.goods_id,
                                    name:item.goods_name
                                }
                            }"
                          >
                            <strong>{{item.goods_name}}</strong>
                          </router-link>
                        </p>
                        <p>
                          <label>品牌：</label>
                          <router-link
                            :to="{
                                path:'/BrandDetail',
                                query:{
                                    tag:'brand',
                                    name:item.goods_brand,
                                    documentid:item.goods_brand_id
                                }
                            }"
                          >{{item.goods_branda}}</router-link>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style="width:7%">
                    <strong>{{item.total_pay_count}}</strong>
                  </td>
                  <td style="width:7%">
                    <strong
                      v-if="!item.price_type"
                    >{{item.priceunit?"$":"￥"}}{{item.seckil_price | toFixed(item.priceunit?3:2)}}</strong>
                    <div v-else>
                      <p v-for="item0 in item.priceList" :key="item0">{{item0}}}</p>
                    </div>
                  </td>
                  <td style="width:7%">
                    <strong>{{item.priceunit?"$":"¥"}}{{item.totalPay}}</strong>
                  </td>
                  <td style="width:7%">
                    <strong>{{item.needBill?"需要":"不需要"}}</strong>
                  </td>
                  <!-- <td style="width:10%;">
                    <strong>{{item.priceunit?"$":"¥"}}{{item.totalPay}}</strong>/ <strong>{{item.total_pay_count}}</strong>
                </td>
                <td style="width:14%">
                  <p v-if="item.expireTime">{{item.expireTime | formatDate}}</p>

                </td>
                <td style="width:8%">
                  <p>{{item.diliver_place}}</p>
                </td>
                <td style="width:8%">
                  <p> <span>{{item.status | payStatus}}</span></p>
                </td>
                <td style="width:20%" class="invoceInfo">
                    <div v-if="currentModule.val">
                        <p><strong>抬头：</strong>{{item.billTitle}}</p>
                        <p><strong>金额：</strong>{{item.totalPay}}元</p>
                        <p><strong>类型：</strong>增值税发票</p>
                    </div>
                    <el-button class="default" style="margin:0 auto;" v-if="item.billButton" @click="confirmOpenbill(item)">确认开票</el-button>
                  </td>-->
                </tr>
              </template>
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
    <!-- 确认开票 -->
    <SetTankuang
      class="settankuang"
      :title="'确认开具发票'"
      v-if="centerDialogVisibleInvoice"
      @closeDialogCallBack="centerDialogVisibleInvoice = false"
    >
      <div class="dialog-body" slot="dialog-body">
        <el-form ref="ruleFormChangeDue" label-width="150px" class="demo-ruleForm">
          <ul>
            <li>
              <el-form-item label="上传发票图：">
                <div v-for="(item,index) in billList" :key="index" style="display:flex;">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :on-remove="(file,fileList)=>{return onRemove(file,fileList,index)}"
                    :on-success="(res,file,fileList)=>{return successUpload(res,file,fileList,index)}"
                    :on-preview="handlePictureCardPreview"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <div>
                    <p>对应发票号：</p>
                    <el-input
                      v-model="item.billNo"
                      placeholder="请输入图片对应的发票号"
                      style="width:200px;"
                    ></el-input>
                  </div>
                  <i
                    class="el-icon-error color"
                    style="font-size:30px;margin-top:22px;margin-left:20px;cursor:pointer"
                    @click="removeitem(index)"
                  ></i>
                </div>
              </el-form-item>
            </li>
            <li>
              <el-form-item label>
                <el-button @click="billList.push({})">增加发票</el-button>
              </el-form-item>
            </li>
          </ul>
          <!-- <el-form-item label="发票类型:">
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
          <el-form-item label="电话:">
            <p class="text">{{sysBillDefault.registeredphone}}</p>
          </el-form-item>-->
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
          @click="submitFormInvoice"
          style="width:auto;margin-left:10px;"
        >确认</el-button>
      </div>
    </SetTankuang>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <el-dialog
  :title="`公司抬头：${currentItem.billTitle}`"
  :visible.sync="showDetail"
  width="1000px"
>
  <div v-if="currentItem.billNo" class="billdetail">
     <el-carousel height="400px">
      <el-carousel-item v-for="(item,index) in currentItem.billNo.split('@')" :key="item">
        <img :src="currentItem.billImage.split('@')[0]+'/'+currentItem.billImage.split('@')[index+1]" alt="">
        <h3 class="small">发票号：{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</el-dialog>
  </div>
</template>
<style lang="less" scoped>
/*@import "../SellerOrderManagement/SellerOrderManagement.less";*/
@import "./SellerInvoiceManagement.less";
</style>
<script>
import { baseURL, baseURL4 } from "@/config";
import { mapState, mapActions } from "vuex";
import { axios, sellerOrderCenter } from "@/api/apiObj";
import { TimeForma, TimeForma2 } from "@/lib/utils";

export default {
  name: "SellerInvoiceManagement",
  data() {
    return {
      SearchInputValue: "",
      // 一级分类列表
      tabFirstList: [
        {
          id: -1,
          name: "全部",
          val: false
        },
        {
          id: 1,
          name: "未开票",
          val: false
        },
        {
          id: 0,
          name: "已开票",
          val: true
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
      currentModule: {
        id: -1,
        val: false
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      list: [],
      //开发票
      centerDialogVisibleInvoice: false,
      sysBillDefault: {},
      currentItem: {},
      bill_tran_type: 0,
      orderDate: "",
      billList: [{}],
      dialogImageUrl: "",
      dialogVisible: false,
      showDetail:false,
    };
  },
  computed: {
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    url() {
      return (
        baseURL +
        "api-order/sellerCenter/uploadSellerBillImage?access_token=" +
        this.access_token
      );
    }
  },
  mounted() {
    this.init();
    this.DeliverGoodsInvoice();
  },
  filters: {
    formatDate(value) {
      return TimeForma(value);
    },
    formatDate1(value) {
      return TimeForma2(value);
    },
    payStatus(val) {
      switch (val) {
        case 0:
          return "未发货";
        case 1:
          return "已发货";
        case 2:
          return "取消中";
        case 3:
          return "已取消";
        case 4:
          return "已完成";
        // case 5:
        //   return "预付款已付款";
        case 5:
          return "待付尾款";
        case 13:
          return "已逾期";
      }
    },
    authState(val) {
      switch (val) {
        case 0:
          return "待审核";
        case 1:
          return "审核通过";
        case 2:
          return "审核拒绝";
        
      }
    }
  },
  methods: {
    ...mapActions("GetAllPersonalInvoice", ["GetAllPersonalInvoice"]),
    getdetail(item){
      this.currentItem=item;
      this.showDetail=true;
    },
    successUpload(res, file, fileList, index) {
      this.billList[index].imageUrl = res.data;
    },
    onRemove(file, fileList, index) {
      this.billList[index].imageUrl = "";
    },
    removeitem(index) {
      this.billList.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    init() {
      let obj = {
        length: this.pageSize,
        start: this.start,
       // goods_name: this.SearchInputValue
      };
      if (this.currentModule.val) {
        obj.make_out_bill = this.currentModule.val;
      }
      if (this.orderDate) {
        obj.day = this.orderDate;
      }
      axios
        .request({ ...sellerOrderCenter.queryBillListBySeller, params: obj })
        .then(res => {
          if (res && res.data) {
            this.total = res.data.total;
            this.list = res.data.data;
          } else {
            this.$message.info("没有数据了");
          }
        });
    },
    setDay(val) {
      this.currentPage = 1;
      this.init();
    },
    handleInput() {
      this.init();
    },
    SearchSubmit() {
      this.currentPage = 1;
      this.init();
    },
    tabFirst(item) {
      this.currentPage = 1;
      this.currentModule = item;
      this.init();
    },
    handleCurrentPageChange(x) {
      console.log(x);
      this.currentPage = x;
      this.init();
    },
    //开票
    submitFormInvoice() {
      let obj = {
        sendNo: this.currentItem.send_no,
        billId: this.sysBillDefault.id,
        id: this.currentItem.id,
        uid: this.currentItem.uid
      };
      let count = 0;
      let length = this.billList.length;
      this.billList.forEach((item, index) => {
        if (item.billNo && item.imageUrl) {
          count++;
          if (index == 0) {
            obj.billImage = item.imageUrl;
            obj.billNo = item.billNo;
          } else {
            obj.billImage = obj.billImage + "@" + item.imageUrl;
            obj.billNo = obj.billNo + "@" + item.billNo;
          }
        } else if (!item.billNo && !item.imageUrl) {
          length--;
        }
      });
      if (count < length) {
        this.$message({
          message: "发票图片和发票号填写不完善",
          type: "warning"
        });
        return;
      }
      console.log(obj);
      axios
        .request({ ...sellerOrderCenter.openBill, params: obj })
        .then(res => {
          this.centerDialogVisibleInvoice = false;
          this.init();
        });
    },
    confirmOpenbill(item) {
      this.currentItem = item;
      this.centerDialogVisibleInvoice = true;
    },
    DeliverGoodsInvoice() {
      axios.request(sellerOrderCenter.querySysBill).then(res => {
        this.sysBillDefault = res.data;
      });
    }
  }
};
</script>
