<template>
    <div class="sellerOrderDetail">
        <div class="top">
            <el-button title="返回订单管理" class="fr"  icon="el-icon-back" @click="goback"></el-button>
            <p class="topdesc">
                <ImgE :src="currentObj.goods_image" :W="50" :H="50"></ImgE>
                <span class="goods_name">{{currentObj.goods_name}}</span>
                <span><label>批次号：</label>{{currentObj.goods_seller_no}}</span>
            </p>
        </div>
        <div class="statusList">
            <p :class="{'active':state==1}">
                <label>
                    <input type="radio" value="1" name="status" v-model="state">
                    已支付
                </label>
            </p>
            <p :class="{'active':state==0}">
                <label>
                    <input type="radio" value="0" name="status" v-model="state">
                    未支付
                </label>
            </p>
            <p :class="{'active':state==3}">
                <label>
                    <input type="radio" value="2" name="status" v-model="state">
                    已取消
                </label>
            </p>
        </div>
        <el-table
            :data="tableData"
            align="center"
            border
            style="width: 100%">
            <el-table-column
                prop="order_no"
                label="订单编号"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="goods_count"
                label="商品数量"
                align="center"
               >
            </el-table-column>
            <el-table-column
                prop="total_price"
                label="商品总价"
                align="center">
                <template slot-scope="scope">
                    <span style="color:#f40;">{{scope.row.price_unit?"$":"¥"}}{{scope.row.total_price}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="下单时间"
                align="center">
                <template slot-scope="scope">
                {{scope.row.create_time | formatDate}}
                </template>
            </el-table-column>
            <el-table-column
                prop="expire_order_time"
                label="交货时间"
                align="center">
                <template slot-scope="scope">
                    {{scope.row.expire_order_time | formatDate}}
                </template>
            </el-table-column>
            <el-table-column
                prop="states"
                label="订单状态"
                align="center">
                <template slot-scope="scope">
                    <span class="order_status">{{scope.row.order_status | orderStatusFilter}}</span>
                    <p v-if="scope.row.reason">{{scope.row.reason}}}</p>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            v-if="tableData.length"
            :currentPage.sync="pageIndex"
            :total="total"
            :pageSize="pageSize"
            @current-change="handleCurrentChange"
        ></Pagination>
    </div>
</template>
<style lang="less" scoped>
    @import './sellerOrderDetail.less';
</style>
<script>
    import { TimeForma } from "@/lib/utils";
    import {mapActions} from 'vuex'
    export default {
        name:'sellerOrderDetail',
        data(){
            return{
                goods_seller_id:0,
                //默认支付状态
                state:1,
                currentObj:{},
                tableData: [],
                total:0,
                pageSize:2,
                pageIndex:1,
                startNum:0
            }
        },
        watch:{
            state(val){
                this.pageIndex=1;
                this.init()
            }
        },
        filters:{
            formatDate(value) {
                return TimeForma(value);
            },
            orderStatusFilter(val){
                switch (val){
                    case 0:
                        return "未支付";
                    case 1:
                        return "已支付";
                    case 2:
                        return "取消中";
                    case 3:
                        return "已取消";
                    case 7:
                        return "已逾期";
                }
            }
        },
        created(){
            this.goods_seller_id=this.$route.query.id
            this.currentObj=JSON.parse(sessionStorage.getItem('sellerOrderDetailList'))
        },
        mounted(){
            this.init()
        },
        methods:{
            ...mapActions("SellerOrderManagement",[
                "GetSellerOrderDetailList"
            ]),
            handleCurrentChange(page){
                // 跳转页数
                console.log("page")
                this.pageIndex=page
                this.startNum=this.pageSize*(page-1)
                this.init()

            },
            goback(){
                this.$router.go(-1)
            },
            init(){
                this.GetSellerOrderDetailList({
                    goods_seller_id:this.goods_seller_id,
                    states:this.state,
                    start:this.startNum,
                    length:this.pageSize
                }).then(res=>{
                    this.tableData=res.data
                    this.total=res.total
                })
            }
        }
    }
</script>
