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
          <!-- <el-select
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
          </el-select> -->
          <el-date-picker
            v-model="twotime"
            type="daterange"
            align="right"
            unlink-panels
            @change="timeChange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-mm-dd 00:00:00"
            :picker-options="pickerOptions"
            clearable>
          </el-date-picker>
        </div>
         <table class="table">
          <thead>
            <tr>
              <th>开票信息</th>
              <th>零件型号</th>
              <th>数量</th>
              <th>单价</th>
              <th>金额</th>
              <th>开票状态</th>
              <th>开票时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <div v-if="!list" class="gray">暂无数据</div>
            <template v-for="(item0,k) in list">
            <tr v-for="(item,index) in item0.list" :key="item.id" >
              <td v-if="index==0" :rowspan="item0.list.length" style="text-align:left;">
                <div class="color goods_seller_no">
                  批次号：{{item.send_no}}
                </div>
                  <div v-if="item0 && item0.billTitle" style="line-height:30px">
                    发票抬头：{{item0.billTitle}} 
                    <a href="javascript:;" @click="getbilldetail(item0)" style="padding-left:10px;"> 发票详情</a>
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
                  {{item.goods_count}}
              </td>
              <td>
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
                      
                      style="width: 100%">
                      <el-table-column
                        prop="orderNo"
                        label="订单号"
                        width="180"
                        align="center"
                       >
                      </el-table-column>
                      <el-table-column
                        prop="goodsCount"
                        label="数量"
                        align="center"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        align="center"
                        label="成交单价">
                        <template slot-scope="scoped">
                            {{scoped.row.priceUnit?'$':'￥'}}{{scoped.row.basePrice | toFixed(scoped.row.priceUnit?3:2)}}
                        </template>
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
                      <template v-for="k in item.pricelist">
                          <p  :key="k.num" v-if="item.pricelist" class="color">
                            {{k.num}}+ --- {{item.priceunit ? '$':'￥'}}{{k.price | toFixed(item.priceunit ?3:2)}}
                          </p>
                      </template>
                      <span class="blu">({{item.clude_bill?'含13%增值税':'不含税'}})</span> -->
              </td>
              <td>
                 <span
                class="color"
              >{{item.priceunit ? '$':'￥'}}{{item.rmbTotal | toFixed(item.priceunit ? 3:2)}}</span>
              </td>
              <td>
                <template v-if="item.auth_state!=2">
                  <span v-if="item.needBill && !item.makeOutBill">未开票</span>
                 <span v-if="item.needBill && item.makeOutBill">{{item.trans_type?'单独邮寄':'随货寄出'}}</span>
                 <!-- <span v-if="!item.needBill">不开票</span> -->
                </template>
                <span v-if="item.auth_state==2">
                  已退货，发票失效<br>{{item.reason}}
                </span>
              </td>
              <td >
                <div v-if="item.openBillTime">{{item.openBillTime | formatDate}}</div>
              </td>
              <td>
                <div style="line-height:30px;" v-if="!item0.makeOutBill && item0.needBill && item.auth_state!=2">
                    <label v-if="!item0.makeOutBill">
                      <input
                        type="checkbox"
                        name="checking"
                        :value="k"
                        v-model="checklist"
                        ref="input"
                      />
                    </label> <a href="javascript:;" @click="getonedetailbill(item)" style="padding-right:10px;" > 开发票</a>
                  </div>
                   <el-popover
                      placement="left"
                      trigger="hover"
                    >
                      <p>仓库地址：{{item.warehouseAddr}}</p>
                      <p>收货人：{{item.warehouseRecipient}} {{item.warehousePhone}}</p>
                      <p><a slot="reference">收货地址</a></p>
                    </el-popover>
                      
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
                        <span slot="reference" style="color:#0d98ff; cursor: pointer;">查询物流</span>
                      </el-popover>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      <div class="fr" v-if="list.length"> <label><input type="checkbox" @change="allCheck" ref="allcheckmark" />
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
                      :on-success="handleAvatarSuccess"
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
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        twotime:[],
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
    // formatDate(value) {
    //   return TimeForma(value);
    // },
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
    getpriceDetail(k,index){
      let item=this.list[k].list[index];
      if(item.visible){
        this.list[k].list[index].visible=false;
        return;
      }
      axios.request({...sellerOrderCenter.queryDeliverDetailForSeller,params:{
        start:0,
        length:100,
        seller_goods_id:item.seller_goods_id,
        deliver_no:item.send_no
      }}).then(res=>{
         let obj={}
        Object.keys(this.list).forEach(key=>{
          let one = this.list[key];
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
      this.list=obj;})
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
      
     if(!this.billImage){
       this.$message.error("等待上传发票图片")
       return;
     }
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
        if(el.response){
          if(index==0){
            str=el.response.data.name
          }else{
            str=str+'@'+el.response.data.name
          }
        }
      });
      this.billImage=str;
    },
    timeChange(val){
      console.log(val)
      this.init()
    },
    init() {
      let obj = {
        length: this.pageSize,
        start: this.start,
      };
      
      if (this.currentModule.val===true || this.currentModule.val===false) {
        obj.make_out_bill = this.currentModule.val;
      }
      // if (this.orderDate) {
      //   obj.day = this.orderDate;
      // }
      if(this.twotime && this.twotime.length){
          obj.start_date=this.twotime[0]
          obj.end_date=this.twotime[1]
      }
      axios
        .request({ ...sellerOrderCenter.queryBillListBySeller, params: obj })
        .then(res => {
          if (res && res.data) {
            this.total = res.data.total;
            let obj={};
              res.data.data.forEach((el,index) => {
                if(el.price_type){
                  el.pricelist=el.price_level.split("@").map(item=>{
                    return {num:item.split("-")[0],price:item.split("-")[1]}
                  })
                }
                if(obj[el.send_no]){
                  obj[el.send_no].list.push(el)
                  if(el.makeOutBill){
                      obj[el.send_no].makeOutBill=el.makeOutBill
                  }
                  if(!el.needBill){
                      obj[el.send_no].needBill=el.needBill
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
                    needBill:el.needBill,
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
