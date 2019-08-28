<template>
    <div class="detailList">
        <el-breadcrumb separator-class="el-icon-arrow-right">
<!--            <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">个人中心</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item :to="{ path: '/PersonalCenter/PersonalSet' }">个人资料</el-breadcrumb-item>-->
            <el-breadcrumb-item>押金充值明细</el-breadcrumb-item>
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
                <el-date-picker
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

    </div>
</template>
<script>
    import {axios,personCenter} from "../../../../api/apiObj";
    import {TimeForma2} from "../../../../lib/utils";
    export default {
        data(){
            return{
                selected:1,
                tableData:[],
                total:0,
                currentPage:1,
                pageSize:10,
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
            }
        },
        methods:{
            handleCurrentPageChange(x){
                this.currentPage=x;
                this.init();
            },
            handleChangeTime(){
                this.startTime=TimeForma2(this.value2[0].getTime())+"";
                this.endTime=TimeForma2(this.value2[1].getTime())+""
                this.init()
            },
            init(){
                axios.request({...personCenter.queryUserConsumeDetailList,params:{
                        type:88,
                        length:this.pageSize,
                        start:this.start,
                        startTime:this.startTime,
                        endTime:this.endTime
                    }}).then(res=>{
                    if(res && res.data){
                        this.tableData=res.data.data
                        this.total=res.data.total
                    }else{
                        this.tableData=[]
                        this.total=0
                    }
                })
            },
            changeItem(k){
                this.selected=k
            }
        },
        mounted(){
            this.init()
        },
        computed:{
            start(){
                return this.pageSize*(this.currentPage-1)
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
        }

    }

</style>
