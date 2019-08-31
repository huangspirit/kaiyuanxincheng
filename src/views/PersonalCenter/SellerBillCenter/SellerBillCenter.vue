<template >
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>账单中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="SellerBillCenter">
      <!-- 支出收入 -->
      <!-- 账单明细 -->
      <div class="SellerBillCenter-detail">
<!--        <p class="detail-tit">-->
<!--          <span>当月收入详情</span>-->
<!--          <span>（账期：2019-05-01—2019-05-30）</span>-->
<!--        </p>-->
          <div class="search">
              <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
              </el-date-picker>
          </div>

          <el-table
              :data="tableData"
              style="width: 100%"
              border
             >
              <el-table-column
                  label="商品详情"
                  align="center"
                  width="350"
                  >
                  <template slot-scope="scope" >
                      <div class="infoWrap">
                          <div class="color goods_seller_no" >批次号：{{scope.row.goods_seller_no}}</div>
                          <div class="info">
                              <ImgE :src="scope.row.goods_image" :W="50" :H="50"></ImgE>
                              <div >
                                  <p class="color name">{{scope.row.goods_name}}</p>
                                  <p>{{scope.row.goods_desc}}</p>
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
                  label="数量/金额"
                  align="center">
                  <template slot-scope="scope">
                      <p >{{scope.row.totalPayCount}}只</p>
                      <p class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.totalPay}}({{scope.row.clude_bill?'含税':'不含税'}})</p>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="bonusServiceAmout"
                  label="服务费"
                  align="center">
                  <template slot-scope="scope">
                      <span class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.bonusServiceAmout}}</span>

                  </template>
              </el-table-column>
              <el-table-column
                  prop="billServiceAmout"
                  label="代开票服务费"
                  align="center">
                  <template slot-scope="scope">
                      <span class="color">{{scope.row.priceunit ? '$':'￥'}}{{scope.row.billServiceAmout}}</span>

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
                  label="是否结算"
                  align="center">
                  <template slot-scope="scope">
                      <span>{{scope.row.is_checkout?'已结算':'待结算'}}</span>
                  </template>
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
              align="center">
                  <template slot-scope="scope" v-if="!scope.row.is_checkout">
                      <el-button
                          @click.native.prevent="deleteRow(scope.$index, tableData)"
                          type="text"
                          size="small"
                      class="bgColor">
                          操作
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
  </div>
</template>
<style lang="less" scoped>
@import "./SellerBillCenter.less";
</style>

<script>
    import {TimeForma2} from "../../../lib/utils";
    import {axios,sellerCenter} from "../../../api/apiObj";
export default {
  name: "SellerBillCenter",
    data(){
      return{
          pageSize:10,
          currentPage:1,
          total:0,
          tableData:[],
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
          endTime:""
      }
    },
    mounted(){
      this.init()
    },
    watch:{
      value2(val){
          this.startTime=TimeForma2(val[0]);
          this.endTime=TimeForma2(val[1])
          this.init()
      }
    },
    methods:{
      init(){
          let obj={
                start:this.start,
                length:this.pageSize,
                startTime:this.startTime,
                endTime:this.endTime
          };
          axios.request({...sellerCenter.queryAccountDetail,params:obj}).then(res=>{
              if(res){
                  this.tableData=res.data.data;
                  this.total=res.data.total;
              }
          })
      },
        handleCurrentChange(x){
          this.currentPage=x;
          this.init()
        }
    },
    computed:{
      start(){
          return this.pageSize*(this.currentPage-1)
      }
    },
    filters:{
        statusFilter(val){
            switch (val) {
                case 0:
                    return "未发货";
                case 1:
                    return "已发货";
                case 2:
                    return '仓库核实不通过';
                case 3:
                    return '仓库核实通过'
            }
        }
    }
};
</script>
