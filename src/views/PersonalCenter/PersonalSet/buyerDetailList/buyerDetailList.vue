<template>
    <div class="detailList">
        <el-breadcrumb separator-class="el-icon-arrow-right">
<!--            <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">个人中心</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item :to="{ path: '/PersonalCenter/PersonalSet' }">个人资料</el-breadcrumb-item>-->
            <el-breadcrumb-item>钱包明细</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="cont">
            <div class="search clear">
                <!--                <el-input-->
                <!--                    class=" searvhInput fr"-->
                <!--                    placeholder="请输入内容"-->
                <!--                    v-model="input"-->
                <!--                    prefix-icon="el-icon-search"-->
                <!--                    clearable>-->
                <!--                </el-input>-->
                <!--                <div class="fl">-->
                <!--                    <span class="item" @click="changeItem(1)" :class="selected==1?'bgColor':''">在售</span>-->
                <!--                    <span class="item" @click="changeItem(0)" :class="selected==0?'bgColor':''">售完</span>-->
                <!--                </div>-->
                <div class="fl">
                    <span :class="selectedbtn==1?'bgColor':''" class="btn" @click="selectedbtn=1">消费明细</span>
                    <span :class="selectedbtn==2?'bgColor':''" class="btn" @click="selectedbtn=2">提现明细</span>
                </div>
                <el-date-picker
                    v-show="selectedbtn==1"
                    class="fl time"
                    v-model="value2"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="handleChangeTime"
                    format="yyyy-MM-dd HH:mm:ss"
                    align="left">
                </el-date-picker>
            </div>
            <div  v-show="selectedbtn==1">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                >
                    <el-table-column
                        prop="orderNo"
                        label="单号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="金额"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="payDesc"
                        label="描述"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="时间"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime | formatDate}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination
                    v-if="total"
                    :currentPage.sync="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="handleCurrentPageChange"
                ></Pagination>
            </div>
            <div  v-show="selectedbtn==2">
                <el-table
                    :data="tableData2"
                    style="width: 100%"
                    border
                >
                    <el-table-column
                        prop="withdrawOrder"
                        label="单号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span :class="'status'+scope.row.status">{{scope.row.status | statusFliter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="withdrawApplyTotal"
                        label="申请提现金额"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="withdrawRealityTotal"
                        label="实际提现金额"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="withdrawCharge"
                        label="提现手续费"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="时间"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime | formatDate}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination
                    v-if="total2"
                    :currentPage.sync="currentPage2"
                    :page-size="pageSize2"
                    :total="total2"
                    @current-change="handleCurrentPageChange2"
                ></Pagination>
            </div>
        </div>

    </div>
</template>
<script>
    import {axios,personCenter} from "../../../../api/apiObj";
    import {TimeForma2} from "../../../../lib/utils";
    export default {
        data(){
            return{
                selectedbtn:1,
                selected:1,
                tableData:[],
                total:0,
                currentPage:1,
                pageSize:10,
                total2:0,
                currentPage2:1,
                pageSize2:10,
                tableData2:[],
                input:'',
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
        filters:{
            formatDate(val){
                return TimeForma2(val)
            },
            statusFliter(val){
                switch (val) {
                    case 1:
                        return "待审核";
                    case 2:
                        return "审批通过";
                    case 3:
                        return "交易完成";
                    case -1:
                        return "审批不通过"
                }
            }
        },
        methods:{
            handleCurrentPageChange2(x){
                this.currentPage2=x;
                this.getwithdrawList()
            },
            handleCurrentPageChange(x){
                this.currentPage=x;
                this.init();
            },
            handleChangeTime(){
                this.startTime=TimeForma2(this.value2[0].getTime())+"";
                this.endTime=TimeForma2(this.value2[1].getTime())+""
                this.init()
            },
            getwithdrawList(){
                axios.request({...personCenter.getDrawList,params:{
                        length:this.pageSize2,
                        start:this.start2,
                    }}).then(res=>{
                        if(res && res.data){
                            this.tableData2=res.data.data
                            this.total2=res.data.total
                        }else{
                            this.tableData2=[]
                            this.total2=0
                        }
                })
            },
            init(){
                    //标识消费明细
                    axios.request({...personCenter.queryUserConsumeDetailList,params:{
                            type:3,
                            length:this.pageSize,
                            start:this.start,
                            startTime:this.startTime,
                            endTime:this.endTime
                        }}).then(res=>{
                            if(res && res.data){
                                this.tableData=res.data.data
                                this.total=res.data.total
                            }

                    })

            },
            changeItem(k){
                this.selected=k
            }
        },
        watched:{

        },
        mounted(){
            this.init()
            this.getwithdrawList()
        },
        computed:{
            start(){
                return this.pageSize*(this.currentPage-1)
            },
            start2(){
                return this.pageSize*(this.currentPage2-1)
            }
        }
    }
</script>
<style lang="less" scoped>
    .detailList{
        .cont{
            padding:10px;
            background:#fff;
            .search{
                border-bottom:1px solid #ddd;
                padding-bottom:10px;
                &>div{
                    height:50px;
                    line-height: 50px;
                    margin-right:10px;
                    &>span{
                        &.btn{
                            padding:0 10px;
                            cursor: pointer;
                            background:#ddd;
                            &:hover{
                                font-weight: bold;
                            }
                        }

                    }
                }
                .searvhInput{
                    width:300px;
                }
                .item{
                    padding:0px 10px;
                    line-height:40px;
                    background:#ddd;
                    width:60px;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .status1{
                color:#0d94fb;
            }
            .status2{
                color:#70DB55;
            }
            .status3{
                color:#a6a9ad;
            }
            .status-1{
                color:#df3f2f;
            }
        }

    }

</style>
