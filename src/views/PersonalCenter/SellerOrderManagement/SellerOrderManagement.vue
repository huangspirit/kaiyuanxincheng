<template>
  <!-- 订单管理 -->
  <div style="position:relative">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
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
              :class="{bgColor:tabFirstFlag === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>
          <el-select v-model="orderDate" @change="orderManageList(orderDate)" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <SearchInput
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
          ></SearchInput>-->
        </div>
        <div class="tab-list-con">
          <p class="tab-list-con-tit">
            <span style="width:24%">商品信息</span>
            <span style="width:10%">单价</span>
            <span style="width:8%">总金额</span>
            <span style="width:8%">总数量</span>
            <span style="width:15%">交期</span>
            <span style="width:15%">收货仓库地址</span>
            <span style="width:10%">当前状态</span>
            <span style="width:10%">操作</span>
          </p>
          <div v-if="SellerOrderManagementList.length==0" class="nocont">暂无数据</div>
          <SellerOrderItem
            v-for="item in SellerOrderManagementList"
            :key="item.id"
            :item="item"
            @DeliverGoods="DeliverGoods(item)"
            @DeliverGoodsChangeDue="DeliverGoodsChangeDue"
            @DeliverGoodsInvoice="DeliverGoodsInvoice(item)"
            @reload="all"
            @DeliverCheck="DeliverCheck"
          >
            <el-button slot="detail" class=" bgColor" @click="storageItem(item)" size="mini">
              <router-link
                  tag="span"
                :to="{path:'/PersonalCenter/SellerOrderManagement/SellerOrderDetail',query:{id:item.goods_seller_id}}"
                style="width:60px;text-align:center;">订单明细</router-link>
            </el-button>
          </SellerOrderItem>
        </div>
      </div>
       <div class="fr"><el-button v-if="checklist0.length" @click="confirmDelivi(0)">国内合并发货</el-button>
       <!-- <el-button v-if="checklist1.length" @click="confirmDelivi(0)">香港合并发货</el-button> -->
       </div>
      <Pagination
        v-if="SellerOrderTotal"
        :page-size="pageSize"
        :currentPage.sync="currentPage"
        :total="SellerOrderTotal"
        @current-change="handleCurrentPage"
      ></Pagination>
      <!-- 打开发货的模态框 -->
      <SetTankuang
        :title="'填写物流信息'"
        v-if="centerDialogVisible"
        @closeDialogCallBack="centerDialogVisible = false"
        :width="55"
        :minWidth="800"
        class="tankuang"
      >
        <div class="dialog-body" slot="dialog-body">
          <el-form
            :model="deliveryInfo"
            :rules="rules"
            ref="deliveryInfoRuleForm"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item label="选择收货地点：">
              <el-select
                v-model="storehouse_order"
                placeholder="请选择"
                @change="handleChangestorehouse"
              >
                <template v-for="(item,k) in storehouseList">
                  <el-option :label="item.warehouse_name" :value="k" :key="item.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="收货详情">
              <div>
                <p>
                  <label>收货人：</label>
                  {{currentStorehouse.warehouse_recipient}}
                </p>
                <p>
                  <label>电话：</label>
                  {{currentStorehouse.warehouse_phone}}
                </p>
                <p>
                  <label>地址：</label>
                  {{currentStorehouse.warehouse_addr}}
                </p>
              </div>
            </el-form-item>
            <el-form-item label="选择物流公司：">
              <DeliveryCompany v-if="centerDialogVisible" @handleCallBack="getCode"></DeliveryCompany>
            </el-form-item>
            <el-form-item label="填写物流单号：" prop="trans_no">
              <el-input v-model="deliveryInfo.trans_no"></el-input>
            </el-form-item>
            <el-form-item label="温馨提示：">
              <p style="color:#ff6600">请您务必按照选择的收货点详细地址发货，确认发货之后再点击我已发货按钮</p>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer fr" style="display:flex;">
          <el-button class="cancle" @click="centerDialogVisible = false">取消</el-button>
          <el-button
            class="default"
            @click="submitForm('deliveryInfoRuleForm')"
            style="width:auto;margin-left:10px;"
          >发货</el-button>
        </div>
      </SetTankuang>
      <!--香港发货的模态框  -->
      <SetTankuang
        :title="'填写PI单信息'"
        v-if="centerDialogVisiblePI"
        @closeDialogCallBack="centerDialogVisiblePI = false"
        :width="55"
        :minWidth="800"
        class="tankuang"
      >
        <div class="dialog-body" slot="dialog-body">
          <el-form
            :model="ruleFormPI"
            :rules="rules"
            ref="ruleFormPI"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item label="上传PI单号">
              <el-upload
                class="avatar-uploader"
                :action="url"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrlPI" :src="imageUrlPI" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div
                  class="el-upload__tip"
                  slot="tip"
                >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="温馨提示：">
              <p style="color:#ff6600">请上传PI单信息，PI单为您最终交期的凭证；上传PI单后，将无法更改交期；PI单上传后需要系统审核</p>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer fr" style="display:flex;">
          <el-button class="cancle" @click="centerDialogVisiblePI = false">取消</el-button>
          <el-button
            class="default"
            @click="submitFormPI('ruleFormPI')"
            style="width:auto;margin-left:10px;"
          >确定</el-button>
        </div>
      </SetTankuang>

      <!-- 确认开票 -->
      <SetTankuang
        class="settankuang"
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
            <el-form-item label="电话:">
              <p class="text">{{sysBillDefault.registeredphone}}</p>
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
            @click="submitFormInvoice"
            style="width:auto;margin-left:10px;"
          >确认</el-button>
        </div>
      </SetTankuang>
      <!-- 更改交期 -->
      <SetTankuang
        :title="'更改交期'"
        v-if="centerDialogVisibleChangeDue"
        @closeDialogCallBack="centerDialogVisibleChangeDue = false"
      >
        <div class="dialog-body" slot="dialog-body">
          <el-form
            :model="ruleFormChangeDue"
            :rules="rulesChangeDue"
            ref="ruleFormChangeDue"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item label="当前交期:">
              <p class="text">{{currentItem.expireTime | formatDate}}</p>
            </el-form-item>
            <el-form-item label="交期变更为:" prop="nameChangeDue">
              <el-date-picker
                v-model="ruleFormChangeDue.nameChangeDue"
                type="datetime"
                placeholder="新交期时间"
                style="margin-right:100px"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="温馨提示:">
              <p style="color:#ff6600">更改交期超过7天，买家可在24小时之内撤销订单；每个商品订单交期只能更改一次；</p>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer fr" style="display:flex;">
          <el-button class="cancle" @click="centerDialogVisibleChangeDue = false">取消</el-button>
          <el-button
            class="default"
            @click="submitFormChangeDue('ruleFormChangeDue')"
            style="width:auto;margin-left:10px;"
          >确认更改</el-button>
        </div>
      </SetTankuang>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped>
@import "./SellerOrderManagement.less";
</style>
<script>
import DeliveryCompany from "_c/DeliveryCompany";
import SellerOrderItem from "_c/SellerOrderItem";
import { mapState, mapActions } from "vuex";
import { TimeForma, TimeForma2 } from "@/lib/utils";
import { axios, common, sellerOrderCenter } from "@/api/apiObj";
import { baseURL } from "@/config";

export default {
  name: "OrderManagement",
  data() {
    return {
      checklist0:[],
      checklist1:[],
      //中央收货地址
      storehouseList: [],
      currentStorehouse: {},
      storehouse_order: 0,
      currentOrder_item: {},
      //订单列表
      SellerOrderManagementList: [],
      pageSize: 10,
      currentPage: 1,
      SellerOrderTotal: 0,
      //搜索框
      SearchInputValue: "",
      currentItem: "",
      //发货详情
      deliveryInfo: {},
      // 确认开票
      centerDialogVisibleInvoice: false,
      //邮寄发票的形式，默认不是单独邮寄，是随货物发出
      bill_tran_type: 0,
      // 更改交期的模态框
      centerDialogVisibleChangeDue: false,
      // PI模态框
      centerDialogVisiblePI: false,
      // PI单的图片
      imageUrlPI: "",
      // 一级分类列表
      tabFirstList: [
        {
          id: "",
          name: "全部订单"
        },
        {
          id: 0,
          name: "未发货"
        },
        {
          id: 1,
          name: "已发货"
        },
        {
          id: 3,
          name: "已逾期"
        }
      ],
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "7",
          label: "近七天"
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
      orderDate: "",
      tabFirstFlag: "",
      commandValue: "全部状态",
      centerDialogVisible: false,
      // PI单发货
      ruleFormPI: {
      //  bi_no: "",
        bi_url: "",
        id: ""
      },
      rulesPI: {},
      // 更改交期
      ruleFormChangeDue: {
        nameChangeDue: ""
      },
      rulesChangeDue: {
        nameChangeDue: [
          {
            type: "string",
            required: true,
            message: "请输入结束日期",
            trigger: "change"
          }
        ]
      },
      // 发货的规则
      rules: {
        trans_no: [
          { required: true, message: "请输入物流单号", trigger: "blur" },
          {
            min: 10,
            max: 30,
            message: "物流单号长度在 10 到 30 个字符",
            trigger: "blur"
          }
        ]
      },
      //开发票
      sysBillDefault: {},
      orderParams: {},
      diliveryType:2,//0:合并国内发货，1：合并香港发货，2：单个发货
    };
  },
  methods: {
    ...mapActions("SellerOrderManagement", [
      "GetSellerOrderManagement",
      "GetUpdateSellerGoodsDiliverTime"
    ]),
    ...mapActions("Common", ["GetCenterChangeAddress"]),

    //开票
    submitFormInvoice() {
      let obj = {
        bill_tran_type: this.bill_tran_type,
        bill_id: this.sysBillDefault.id,
        goods_seller_no: this.currentItem.goods_seller_no
      };
      axios
        .request({ ...sellerOrderCenter.openBill, params: obj })
        .then(res => {
          this.centerDialogVisibleInvoice = false;
          this.all();
        });
    },
    GetCenterChangeAddress() {
      axios
        .request({
          ...common.GetCenterChangeAddress,
          params: { start: 0, length: 50 }
        })
        .then(res => {
          console.log(res);
          this.storehouseList = res.data;
          this.currentStorehouse = this.storehouseList[0];
          this.deliveryInfo.storehouse_id = this.currentStorehouse.id;
        });
    },
    handleChangestorehouse(val) {
      this.currentStorehouse = this.storehouseList[val];
      this.deliveryInfo.storehouse_id = this.currentStorehouse.id;
    },
    getCode(val) {
      this.deliveryInfo.trans_code = val.code;
      this.deliveryInfo.transName = val.name;
    },
    handleCurrentPage(x) {
      this.currentPage = x;
      console.log(this.currentPage)
      this.all();
    },
    //查看发订单明细出发事件
    storageItem(item) {
      sessionStorage.setItem(
        "sellerOrderDetailList",
        JSON.stringify({
          goods_image: item.goods_image,
          goods_name: item.goods_name,
          goods_seller_no: item.goods_seller_no
        })
      );
    },
    //搜索框事件
    SearchSubmit() {},
    DeliverGoods(item) {
      this.diliveryType=2  //0:合并国内发货，1：合并香港发货，2：单个发货
      this.currentOrder_item = item;
      this.currentItem = item;
      if (item.priceunit) {
        this.centerDialogVisiblePI = true;
      } else {
        this.centerDialogVisible = true;
        this.GetCenterChangeAddress();
      }
    },
    DeliverGoodsChangeDue(item) {
      this.centerDialogVisibleChangeDue = true;
    
      this.currentItem = item;
    },
    DeliverGoodsInvoice(item) {
      this.currentItem = item;
      this.centerDialogVisibleInvoice = true;
      axios.request(sellerOrderCenter.querySysBill).then(res => {
        this.sysBillDefault = res.data;
      });
    },
    DeliverCheck(val){
     //flag==0 国内发货，flag==1 香港发货
       if(val.selected){
           this['checklist'+val.flag].push({
             id:val.itemid,
             uid:val.uid,
             need_seller_bill:val.support_bill,
             goods_seller_id:val.goods_seller_id,
             goods_seller_no:val.goods_seller_no
           })
         }else{
           let arr=[]
           this['checklist'+val.flag].forEach(item=>{
              if(item.id!=val.itemid){
                  arr.push(item)
              }
            })
            this['checklist'+val.flag]=arr
         }
    },
    confirmDelivi(type){
       //0:合并国内发货，1：合并香港发货，2：单个发货
       this.diliveryType=type;
       if (type==1) {
        this.centerDialogVisiblePI = true;
      } else {
        this.centerDialogVisible = true;
        this.GetCenterChangeAddress();
      }
    },
    // 上传PI单成功的回调
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.ruleFormPI.bi_url = res.data;
      this.imageUrlPI = URL.createObjectURL(file.raw);
    },
    //上传之前的回调
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    orderManageList(val) {
      this.orderParams["day"] = val;

      this.all();
      console.log(val);
    },
    tabFirst(item) {
      this.tabFirstFlag = item.id;
      this.currentPage = 1;
      if (this.orderDate) {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          status: this.tabFirstFlag,
          day: this.orderDate
        };
      } else {
        this.orderParams = {
          start: this.start,
          length: this.pageSize,
          status: this.tabFirstFlag
        };
      }

      this.all();
    },
    command(x) {
      this.commandValue = x;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           if(this.diliveryType==2){
              this.deliveryInfo.goodsName = this.currentOrder_item.goods_name;
              this.deliveryInfo.id = this.currentOrder_item.id;
             axios
            .request({
              ...sellerOrderCenter.diliverGoods,
              params: this.deliveryInfo
            })
            .then(res => {
              this.centerDialogVisible = false;
              this.all();
            });
           }else{
              let sendobj={
                order:JSON.stringify(this.checklist0),
                trans:JSON.stringify(this.deliveryInfo)
              }
              axios.request({
                ...sellerOrderCenter.diliverBatchGoods,
                method:'post',
                data:sendobj
              }).then(res=>{
                 this.centerDialogVisible = false;
                this.all();
                this.checklist0=[]
              })
           }
          
        } else {
          this.$message.error("请完善信息!");
          return false;
        }
      });
    },
    // 确认上传PI单
    submitFormPI(formName) {
      this.ruleFormPI.id = this.currentItem.id;
      this.ruleFormPI.goodsName = this.currentItem.goods_name;
    
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .request({
              ...sellerOrderCenter.diliverHKGoods,
              params: this.ruleFormPI
            })
            .then(res => {
           
              this.centerDialogVisiblePI = false;
              this.all();
            });
        } else {
          this.$message.error("请完善信息!");
          return false;
        }
      });
    },
    // 确认更改交期
    submitFormChangeDue(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.GetUpdateSellerGoodsDiliverTime({
            goods_seller_id: this.currentItem.goods_seller_id,
            older_complete_date: TimeForma2(this.currentItem.expireTime),
            new_complete_date: this.ruleFormChangeDue.nameChangeDue,
            id: this.currentItem.id,
            uid: this.currentItem.uid,
            goods_name: this.currentItem.goods_name,
            goods_seller_no: this.currentItem.goods_seller_no
          }).then(res => {
           
            this.centerDialogVisibleChangeDue = false;
            this.all();
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          });
        } else {
          this.$message.error("请完善信息!");
          return false;
        }
      });
    },
    all() {
      this.GetSellerOrderManagement(this.orderParams).then(res => {
        this.SellerOrderTotal = res.data.total;
        this.SellerOrderManagementList = res.data.data;
      });
    }
  },
  components: {
    SellerOrderItem,
    DeliveryCompany
  },
  watch: {},
  filters: {
    formatDate(value) {
      return TimeForma(value);
    }
  },
  computed: {
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    url() {
      let access_token = sessionStorage.getItem("access_token");
      return (
        baseURL +
        `api-order/sellerCenter/uploadOrderBi?access_token=${access_token}&seller_no=${this.currentItem.goods_seller_no}`
      );
    },
    ...mapState({
      CenterChangeAddress: state => state.Common.CenterChangeAddress
    })
  },
  created(){
    if(this.$route.query.status=='0'){
        this.tabFirstFlag=0;
        this.$router.push(this.$route.path)
    }
  },
  mounted() {
    this.orderParams = {
      start: this.start,
      length: this.pageSize,
        status: this.tabFirstFlag

    };
    this.all();
  }
};
</script>


