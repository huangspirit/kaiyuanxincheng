<template >
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>账单中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="SellerBillCenter">
        <div class="top">
             <div  :class="{active:modules==0}" @click="modules=0" v-if="obj.total">
                <p class="title">可提现金额合计：</p>
                <P><STRONG>{{obj.total}}</STRONG></P>
            </div>
            <div  :class="{active:modules==2}" @click="modules=2" v-if="obj.currentPay">
                <p class='title'> 账单到期可提现金额：</p>
                <p ><strong>{{obj.currentPay}}</strong> 
                </p>
                <p class="desc">当前结算周期：{{obj.day}}天（以发货时间为准）</p>
            </div>
            <div  :class="{active:modules==1}"  @click="modules=1" v-if="obj.unCurrentPay">
                <p class="title">已发货未到期提现金额：</p>
                <P><STRONG>{{obj.unCurrentPay}}</STRONG>  </P>
             
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
          </div> -->
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
                size="mini">
            </el-date-picker>
            <div class="clear search btn fl" >
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
          <el-table
              :data="tableData"
              border
              width="100%"
             >
              <el-table-column
                  label="商品详情"
                  align="center"
                  width="300"
                  >
                  <template slot-scope="scope" >
                      <div class="infoWrap">
                          <div class="color goods_seller_no" >批次号：{{scope.row.goods_seller_no}}</div>
                          <div class="info">
                              <ImgE :src="scope.row.goods_image" :W="50" :H="50"></ImgE>
                              <div >
                                  <p class="color name">{{scope.row.goods_name}}</p>
                                  <p>描述：{{scope.row.goods_desc}}</p>
                                  <p>品牌：{{scope.row.goods_brand}}</p>
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
              <el-table-column
                  prop="totalPay"
                  label="金额/数量"
                  align="center"
              width="180">
                  <template slot-scope="scope">
                      <p><span  class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.totalPay}}</span> &nbsp;&nbsp; <span>/ &nbsp;&nbsp;{{scope.row.totalPayCount}}只</span></p>
                      <p class="color">{{scope.row.clude_bill?'含13%增值税':'不含税'}} ，{{scope.row.support_bill?'卖家开发票':'系统开发票'}}</p>
                  </template>
              </el-table-column>
              <!-- <el-table-column
                  prop="taxAmount"
                  label="发票税额"
                  align="center">
                  <template slot-scope="scope">
                      <span class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.taxAmount}}</span>
                  </template>
              </el-table-column> -->
              <el-table-column
                  label="违约金/违约天数"
                  align="center">
                  <template slot-scope="scope">
                      <span class="color" v-if="scope.row.violate_count">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.violate_monney | toFixed(scope.row.priceunit ? 3:2)}}</span><span v-if="scope.row.violate_count">/{{scope.row.violate_count}}</span>
                      <p v-if="scope.row.violate_count">违约开始日期{{scope.row.expireTime | formatDate}}</p>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="bonusServiceAmout"
                  label="服务费"
                  align="center">
                  <template slot-scope="scope">
                      <span class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.bonusServiceAmout | toFixed(scope.row.priceunit ? 3:2)}}</span>

                  </template>
              </el-table-column>
              <el-table-column
                  prop="billServiceAmout"
                  label="代开票服务费"
                  align="center">
                  <template slot-scope="scope">
                      <span class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.billServiceAmout | toFixed(scope.row.priceunit ? 3:2)}}</span>
                  </template>
              </el-table-column>
              <el-table-column
                  label="实际结算金额"
                  align="center">
                  <template slot-scope="scope">
                      <span class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.realPayTotal | toFixed(scope.row.priceunit ? 3:2)}}</span>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="status"
                  label="状态"
                  align="center">
                  <template slot-scope="scope">
                      <span>{{scope.row.status | statusFilter}}</span>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="is_checkout"
                  label="结算状态"
                  align="center">
                  <template slot-scope="scope">
                      <span>{{scope.row.is_checkout | checkoutFilter}}</span>
                  </template>
              </el-table-column>
              <el-table-column
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
              </el-table-column>
          </el-table>
          <Pagination
              v-if="total>pageSize"
              @current-change="handleCurrentChange"
              :pageIndex.sync="currentPage"
              :pageSize="pageSize"
              :total="total">
          </Pagination>
      </div>
    </div>
     <el-dialog
          :visible.sync="showinputwithdrawTotal"
          width="700px"
          class="withdrawApplyTotal"
      >
          <div class="withdrawApplyTotalCont">
              <el-input placeholder="请输入提现金额" v-model="withdrawApplyTotal" disabled="">
                    <template slot="prepend">{{withdrawApplyTotalType?'$':'￥'}}</template>
              </el-input>
              <div v-if="withdrawApplyTotal" class="clear">
                  <!-- <div class="withdrawCharge">
                      手续费：<span class="color">￥{{withdrawApplyTotalObj.withdrawCharge}}</span>
                      <div class="desc">
                          <i class="el-icon-question color" ></i>
                          <div class="cont">
                              <p><strong>手续费说明</strong></p>
                              <p>
                                  当单笔提现金额<1500元，y=2元+提现金额*0.55%
                              </p>
                              <p>
                                  当单笔提现金额≥1500元，y=提现金额*0.7%
                              </p>
                              <br>
                              <p>当天17:00点前申请提现的，提现金额当日到账；</p>
                              <p>当天17:00点后申请提现的，提现金额次日到账；</p>
                              <p>周末及节假日申请提现的，提现金额将在下个工作日到账；</p><br>
                              <p>温馨提示：单笔提现金额≥1500为最优提现方案</p>
                          </div>
                      </div>
                  </div>
                  <p>实际提现金额：<span class="color">￥{{withdrawApplyTotalObj.withdrawRealityTotal}}</span></p>
                  <p>申请提现金额：<span class="color">￥{{withdrawApplyTotalObj.withdrawApplyTotal}}</span></p> -->
                  <ul v-if="bankList.length">
                      <li class="title">
                          <span>提现方式</span>
                          <span>账号</span>
                          <span>账户名</span>
                      </li>
                      <li v-for="(item,k) in bankList" :class="selectedBank==k?'bgColor':''" :key="k" @click="selectedBank=k">
                          <span>{{item.bankCode | filterBankCode}}</span>
                          <span>{{item.bankNumber}}</span>
                          <span>{{item.cnname}}</span>
                      </li>
                  </ul>
                  <router-link v-if="bankList.length==0" to="/PersonalCenter/withdraw" class="band">没有提现账号，去绑定</router-link>
              </div>
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
    import {TimeForma2} from "../../../lib/utils";
    import {axios,sellerCenter,personCenter} from "../../../api/apiObj";
export default {
  name: "SellerBillCenter",
    data(){
      return{
          pageSize:10,
          currentPage:1,
          total:0,
          modules:0,
          tableData:[],
          obj:{},
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
          value2: '',
          startTime:"",
          endTime:"",
          changeAll:true,
          is_checkout:null,
       
          withdrawApplyTotalType:false,
            showinputwithdrawTotal:false,
            withdrawApplyTotal:"",
            withdrawApplyTotalObj:{},
            bankList:[],
            selectedBank:0,
      }
    },
    mounted(){
      this.init();
         axios.request({...personCenter.getBankList,params:{
                                            start:0,
                                            length:100,
                                        }}).then(res=>{
                                        this.bankList=res.data.data;
                                    })
    },
    watch:{
      value2(val){
          this.startTime=TimeForma2(val[0]);
          this.endTime=TimeForma2(val[1])
          this.init()
      },
        is_checkout(val){
            this.currentPage=1
            this.init();
        },

    },
    methods:{
      init(){
          let obj={
                start:this.start,
                length:this.pageSize,
                beginTime:this.startTime,
                endTime:this.endTime,
                is_checkout:this.is_checkout
          };
          axios.request({...sellerCenter.queryAccountDetail,params:obj}).then(res=>{
              if(res){
                  this.obj=res.data
                  if(res.data.list){
                    this.tableData=res.data.list.data;
                    this.total=res.data.list.total;
                  }
              }
          })
        
      },
        handleChangeAll(){
            this.is_checkout=null;
          
             this.changeAll=true;
        },
        changeCheckout(val){

          if(this.is_checkout==val){
                this.is_checkout=null
          }else{
              this.is_checkout=val
              this.changeAll=false
          }
      },
        handleCurrentChange(x){
          this.currentPage=x;
          this.init()
        },
        despost(index){
            this.showinputwithdrawTotal=true;
            this.withdrawApplyTotal=this.tableData[index].realPayTotal;
            this.withdrawApplyTotalType=this.tableData[index].priceunit;
            // axios.request({...personCenter.count,params:{withdrawApplyTotal:this.withdrawApplyTotal}}).then(res=>{
            //             this.withdrawApplyTotalObj=res.data;
            //         })
        },
         //提现的相关操作
            withDraw(){
                //先验证是否设置提现密码
                this.inputpassword="";
                axios.request(personCenter.checkSetPassword).then(res=>{
                    if(res.data==1){
                        this.showinputPassword=true;
                    }else{
                        //需要新增
                        this.$prompt('请设置提现密码', '', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({ value }) => {
                            //校验密码
                            axios.request({...personCenter.savedrawPassword,data:{password:value}}).then(res=>{
                                console.log(res)
                                if(res){
                                    this.showinputPassword=false;
                                    this.showinputwithdrawTotal=true;
                                    axios.request({...personCenter.getBankList,params:{
                                            start:0,
                                            length:100,
                                        }}).then(res=>{
                                        console.log(res)
                                        this.bankList=res.data.data;
                                    })
                                }
                            })
                        }).catch(() => {

                        });
                    }
                })
            },
            checkpassword(){
                axios.request({...personCenter.checkdrawPassword,data:{password:this.inputpassword}}).then(res=>{
                    console.log(res)
                    if(res){
                        this.showinputPassword=false;
                        this.showinputwithdrawTotal=true;
                        axios.request({...personCenter.getBankList,params:{
                                start:0,
                                length:100,
                            }}).then(res=>{
                            console.log(res)
                            this.bankList=res.data.data;
                        })
                    }

                })
            },
            saveDraw(){
                let obj={
                    withdrawBankId:this.bankList[this.selectedBank].id,
                    ...this.withdrawApplyTotalObj
                }
                axios.request({...personCenter.saveDraw,data:obj}).then(res=>{
                    if(res){
                        this.showinputwithdrawTotal=false;
                        this.init();
                       // this.all();
                    }
                })
            },
    },
    computed:{
      start(){
          return this.pageSize*(this.currentPage-1)
      }
    },
    filters:{
        checkoutFilter(val){
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
                    return '待审核'
            }
        },
        statusFilter(val){
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
                    return '已逾期'
            }
        },
        formatDate(val){
            return TimeForma2(val)
        },
        filterBankCode(val){
                switch (val) {
                    case "ICBC":
                        return '工商银行';
                    case "ABC":
                        return '农业银行';
                    case "CCB":
                        return '建设银行';
                    case "CMB":
                        return '招商银行';
                    case "COMM":
                        return '交通银行';
                    case 'alipay':
                        return "支付宝"
                }
            }
    }
};
</script>
