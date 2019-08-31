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
            <el-input
                class="fr"
                placeholder="请输入内容"
                v-model="SearchInputValue"
                prefix-icon="el-icon-search"
                @input="handleInput"
                clearable>
            </el-input>
          <ul>
            <li
              v-for="item in tabFirstList"
              :key="item.id"
              :class="{bgColor:currentModule.id === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>

<!--          <SearchInput-->
<!--              class="clear"-->
<!--              @submit="SearchSubmit"-->
<!--              :value="SearchInputValue"-->
<!--              :width="350"-->
<!--              :height="40"-->
<!--              :placeholder="'按商品名称搜索'"-->
<!--              :fontSize="14"-->
<!--              :btnImgWidth="20"-->
<!--              :btnWidth="40"-->
<!--              :borderColor="'#e3e3e3'"-->
<!--          ></SearchInput>-->
        </div>
        <div class="tab-list-con">
          <p class="tab-list-con-tit">
            <span style="width:30%">商品信息</span>
            <span style="width:10%">单价</span>
            <span style="width:10%">总金额/总数量</span>
            <span style="width:14%">交期</span>
            <span style="width:8%">交货地</span>
            <span style="width:8%">当前状态</span>
            <span style="width:20%">{{currentModule.val?'发票信息':'操作'}}</span>
        </p>
            <div v-if="list.length==0" class="nocontent">
                暂无内容
            </div>
          <div class="list-item" v-for="item in list" :key="item.id" >
            <div class="list-item-tit">
              <span class="phon">批次号：<strong>{{item.goods_seller_no}}</strong></span>
            </div>
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              style="table-layout:fixed"
            >
              <tr>
                <td style="width:30%" class="goodsInfo">
                    <div>
                        <p>
                            <img :src="item.goods_image" alt>
                        </p>

                        <div>
                            <p ><strong>{{item.goods_name}}</strong></p>
                            <p><label>品牌：</label>{{item.goods_brand}}</p>
                            <p><label>参数：</label>{{item.goods_desc}}</p>
                        </div>
                    </div>
                </td>
                <td style="width:10%">
                    <strong v-if="!item.price_type">{{item.priceunit?"$":"￥"}}{{item.seckil_price}}</strong>
                    <div v-else>
                        <p v-for="item0 in item.priceList">{{item0}}}</p>
                    </div>
                </td>
                <td style="width:10%;">
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
                </td>
              </tr>
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
      <SetTankuang class="settankuang" :title="'确认开具发票'" v-if="centerDialogVisibleInvoice" @closeDialogCallBack="centerDialogVisibleInvoice = false">
          <div class="dialog-body" slot="dialog-body">
              <el-form
                  ref="ruleFormChangeDue"
                  label-width="150px"
                  class="demo-ruleForm"
              >
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
              <el-button class="default" @click="submitFormInvoice" style="width:auto;margin-left:10px;">确认</el-button>
          </div>
      </SetTankuang>
  </div>
</template>
<style lang="less" scoped>
  /*@import "../SellerOrderManagement/SellerOrderManagement.less";*/
  @import "./SellerInvoiceManagement.less";
</style>
<script>
import {mapState,mapActions} from "vuex"
import {axios,sellerOrderCenter} from "@/api/apiObj";
import { TimeForma, TimeForma2 } from "@/lib/utils";

export default {
  name: "SellerInvoiceManagement",
  data() {
    return {
        SearchInputValue:"",
      // 一级分类列表

      tabFirstList: [
        {
          id: 0,
          name: "已开票",
          val:true
        },
        {
          id: 1,
          name: "待开票",
          val:false
        }
      ],
      currentModule:{
          id: 0,
          val:true
      },
      currentPage:1,
      pageSize:10,
      total:0,
        list:[],
        //开发票
        centerDialogVisibleInvoice:false,
        sysBillDefault:{},
        currentItem:{},
        bill_tran_type:0
    };
  },
    computed:{
      start(){
          return (this.currentPage-1)*this.pageSize
      }
    },
    mounted(){
        this.init()
        this.DeliverGoodsInvoice()
    },
    filters:{
        formatDate(value) {
            return TimeForma(value);
        },
        payStatus(val){
            switch (val){
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
    },
  methods: {
      ...mapActions("GetAllPersonalInvoice",[
          "GetAllPersonalInvoice"
      ]),
      init(){
          let obj={
              length:this.pageSize,
              start:this.start,
              goods_name:this.SearchInputValue
          }
          if( this.currentModule.val){
              obj.make_out_bill=this.currentModule.val
          }
        axios.request({...sellerOrderCenter.queryBillListBySeller,params:obj}).then(res=>{
            console.log(res)
            if(res && res.data){
                this.total=res.data.total;
                this.list=res.data.data;
            }else{
               this.$message.info("没有数据了")
            }

        })
      },
      handleInput(){
          this.init()
      },
      SearchSubmit(){
          this.currentPage=1;console.log()
        this.init();
      },
      tabFirst(item) {
          this.currentPage=1;
          this.currentModule=item;
          this.init()
      },
      handleCurrentPageChange(x){
      console.log(x)
          this.currentPage=x
          this.init()
      },
      //开票
      submitFormInvoice(){
          let obj={
              bill_tran_type:this.bill_tran_type,
              bill_id:this.sysBillDefault.id,
              goods_seller_no:this.currentItem.goods_seller_no
          }
          axios.request({...sellerOrderCenter.openBill,params:obj}).then(res=>{
              this.centerDialogVisibleInvoice=false;
              this.init()
          })
      },
      confirmOpenbill(item){
          this.currentItem=item;
          this.centerDialogVisibleInvoice = true;
      },
      DeliverGoodsInvoice() {
          axios.request(sellerOrderCenter.querySysBill).then(res=>{
              this.sysBillDefault=res.data
          })
      },
  }
};
</script>
