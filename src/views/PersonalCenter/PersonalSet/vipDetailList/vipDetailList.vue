<template>
    <div class="detailList">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">个人中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/PersonalCenter/PersonalSet' }">个人资料</el-breadcrumb-item>
            <el-breadcrumb-item>月结明细</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="cont">
            <div class="search clear">
                <el-input
                    class=" searvhInput fr"
                    placeholder="请输入内容"
                    v-model="input"
                    prefix-icon="el-icon-search"
                    clearable>
                </el-input>
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
                    align="left">
                </el-date-picker>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="商品批次"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop=""
                    label="商品名称"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="售卖数量">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="价格">
                </el-table-column>

                <el-table-column
                    prop="address"
                    label="寄售库存">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="剩余库存">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="总计">
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
                value2: ''
            }
        },
        methods:{
            handleCurrentPageChange(){

            },
            init(){

            },
            changeItem(k){
                this.selected=k
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
