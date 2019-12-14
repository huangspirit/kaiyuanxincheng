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
         <table class="table">
          <thead>
            <tr>
              <th>开票信息</th>
              <th>器件型号</th>
              <th>金额</th>
              <th>是否需要开票</th>
              <th>收货地址</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item0,k) in list">
            <tr v-for="(item,index) in item0.list" :key="item.id" >
              <td v-if="index==0" :rowspan="item0.list.length">
                <div class="color goods_seller_no">
                 批次号：{{item.send_no}}
                  </div>
                  <div v-if="item0 && item0.billTitle" style="line-height:30px">
                    发票抬头：{{item0.billTitle}} 
                    <a href="javascript:;" @click="getbilldetail(item0)" style="padding-left:10px;"> 发票详情</a>
                  </div>
                  <div style="line-height:30px;">
                    <label v-if="!item0.makeOutBill">
                      <input
                        type="checkbox"
                        name="checking"
                        :value="k"
                        v-model="checklist"
                        ref="input"
                      />
                    </label> <a href="javascript:;" @click="getonedetailbill(item)" style="padding-right:10px;" v-if="!item0.makeOutBill"> 开发票</a>
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
                 <span
                class="color"
              >{{item.priceunit ? '$':'￥'}}{{item.rmbTotal | toFixed(item.priceunit ? 3:2)}}</span>
              </td>
              <td>
                 <span>{{item.needBill?'需要':'不需要'}}</span>
              </td>
              
              <td>
                      <p>仓库地址：{{item.warehouseAddr}}</p>
                      <p>收货人：{{item.warehouseRecipient}} {{item.warehousePhone}}</p>
                       <el-popover
                        placement="top-start"
                        width="500"
                        trigger="click"
                        @show="recordDeilery(item.trans_no,item.trans_code)"
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
        <!-- <div class="tab-list-con" style="color:#333;">
          <p class="tab-list-con-tit">
            <span style="width:25%">开票信息</span>
            <span style="width:17%">状态</span>
            <span style="width:30%">器件型号</span>
            <span style="width:7%">购买数量</span>
            <span style="width:7%">单价</span>
            <span style="width:7%">金额</span>
            <span style="width:7%">是否需要开票</span>
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
                 
                </tr>
              </template>
            </table>
          </div>
        </div> -->
      <div> <label><input type="checkbox" @change="allCheck" ref="allcheckmark" />
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
          :currentPage.sync="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentPageChange"
        ></Pagination>
      </div>
    </div>
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
            <img :src="dialogImageUrl" alt="" style="max-height:500px;max-height:400px;">
        </div>
    </el-dialog>
    <el-dialog
  :title="`公司抬头：${currentBilldetail.billTitle}`"
  :visible.sync="showDetail"
  width="700px"
>
  <div class="billdetail" >
     <el-carousel height="400px" v-if="currentBilldetail.billImage">
       <template  v-for="(item,index) in currentBilldetail.billImage.split('@')" >
         <el-carousel-item :key="item" v-if="index>0">
        <img :src="currentBilldetail.billImage.split('@')[0]+'/'+currentBilldetail.billImage.split('@')[index]" alt="" >
      </el-carousel-item>
       </template>
      
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
      billImage:"",
      checklist:[],
      SearchInputValue: "",
      expressList:[],
      // 一级分类列表
      tabFirstList: [
        {
          id: -1,
          name: "全部",
          val: ""
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
        val: ""
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      list: [],
      //开发票
      centerDialogVisibleInvoice: false,
      sysBillDefault: {},
      currentItem: {},
      currentBilldetail:{},
      bill_tran_type: 0,
      orderDate: "",
      dialogImageUrl: "",
      showbigimg: false,
      showDetail:false,
    };
  },
  computed: {
    upbillImage(){
      let access_token = sessionStorage.getItem("access_token");
      return (
        baseURL+
        `api-order/sellerCenter/uploadSellerBillImage?access_token=${access_token}`
      )
    },
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    // url() {
    //   return (
    //     baseURL +
    //     "api-order/sellerCenter/uploadSellerBillImage?access_token=" +
    //     this.access_token
    //   );
    // }
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
    }
  },
  methods: {
    ...mapActions("GetAllPersonalInvoice", ["GetAllPersonalInvoice"]),
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
    getbilldetail(item){
      
      this.currentBilldetail=item;
      this.showDetail=true;
    },
    recordDeilery(trans_no,trans_code){
          axios
            .request({
              ...sellerOrderCenter.queryExpreForOrder,
              params: {
                trans_no: trans_no,
                trans_code:trans_code
                }
            })
            .then(res => {
              if(res){
                this.expressList = res.data;
              }else{
                this.expressList=[]
              }
              
            });
        },
    onpreview(file) {
      this.dialogImageUrl = file.url;
      this.showbigimg = true;
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
    init() {
      let obj = {
        length: this.pageSize,
        start: this.start,
      };
      
      if (this.currentModule.val===true || this.currentModule.val===false) {
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
            let obj={};
              res.data.data.forEach((el,index) => {
                if(obj[el.send_no]){
                  obj[el.send_no].list.push(el)
                  if(el.makeOutBill){
                      obj[el.send_no].makeOutBill=el.makeOutBill
                  }
                  if(el.billTitle){
                     obj[el.send_no].billTitle=el.billTitle
                  }
                  if(el.billImage){
                     obj[el.send_no].billImage=el.billImage
                  }
                }else{
                  obj[el.send_no]={
                    makeOutBill:el.makeOutBill,
                    billTitle:el.billTitle,
                    billImage:el.billImage,
                    list:[el]
                  }
                }
              });
              this.list=obj
            //this.list = res.data.data;
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
    // submitFormInvoice() {
    //   let obj = {
    //     sendNo: this.currentItem.send_no,
    //     billId: this.sysBillDefault.id,
    //     id: this.currentItem.id,
    //     uid: this.currentItem.uid
    //   };
    //   let count = 0;
    //   let length = this.billList.length;
    //   this.billList.forEach((item, index) => {
    //     if (item.billNo && item.imageUrl) {
    //       count++;
    //       if (index == 0) {
    //         obj.billImage = item.imageUrl;
    //         obj.billNo = item.billNo;
    //       } else {
    //         obj.billImage = obj.billImage + "@" + item.imageUrl;
    //         obj.billNo = obj.billNo + "@" + item.billNo;
    //       }
    //     } else if (!item.billNo && !item.imageUrl) {
    //       length--;
    //     }
    //   });
    //   if (count < length) {
    //     this.$message({
    //       message: "发票图片和发票号填写不完善",
    //       type: "warning"
    //     });
    //     return;
    //   }
    //   axios
    //     .request({ ...sellerOrderCenter.openBill, params: obj })
    //     .then(res => {
    //       this.centerDialogVisibleInvoice = false;
    //       this.init();
    //     });
    // },
    confirmOpenbill(item) {
      this.currentItem = item;
      this.centerDialogVisibleInvoice = true;
    },
    DeliverGoodsInvoice() {
      axios.request(sellerOrderCenter.querySysBill).then(res => {
        this.sysBillDefault = res.data;
      });
    },
     getonedetailbill(item) {
      this.currentItem = item;
      this.checklist=[item.send_no]
      this.centerDialogVisibleInvoice = true;
    },
    submitFormInvoice() {
      let obj = {
        transType: this.bill_tran_type,
        billId: this.sysBillDefault.id,
        sendNo: this.currentItem.send_no,
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
  }
};
</script>
