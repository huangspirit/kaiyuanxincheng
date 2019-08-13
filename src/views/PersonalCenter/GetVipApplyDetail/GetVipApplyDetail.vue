<template>
    <div class="table">
        <el-table
            :data="list"
            border
            style="width: 100%">
            <el-table-column
                fixed
                prop="applyType"
                label="申报类型"
                width="150"
            align="center">
            </el-table-column>
            <el-table-column
                prop="checkStatus"
                label="申报状态"
                width="120"
                align="center">
                <template slot-scope="scope">
                    <span :class="'status'+scope.row.checkStatus">{{scope.row.checkStatus | checkStatusFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="applyTime"
                label="申报时间"
                width="300"
                align="center">
            </el-table-column>
            <el-table-column
                prop="contactName"
                label="联系人"
                width="300"
                align="center">
            </el-table-column>
            <el-table-column
                prop="contactPhone"
                label="联系人手机号"
                width="300"
                align="center">
            </el-table-column>
            <el-table-column
                prop="mark"
                label="审核备注"
                width="300"
                align="center">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
                    <el-button type="text" size="small" @click="headleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <SetTankuang :title="'申请详情'" v-if="dialogVisible" @closeDialogCallBack="dialogVisible=false">
            <div class="dialog-body" slot="dialog-body">
               详情内容
            </div>
            <div slot="footer" class="dialog-footer fr">
                <el-button type="primary" @click="edit">编辑</el-button>
                <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>  -->
            </div>
        </SetTankuang>
    </div>
</template>
<script>
    import {axios,FactoryEntry} from "../../../api/apiObj";
    export default {
        name:"",
        data() {
            return {
                dialogVisible:false,
                editObj:{},
                list:[]
            }
        },
         methods:{
                init(){
                    axios.request(FactoryEntry.getApplyList).then(res=>{
                        console.log(res)
                        this.list=res.data
                    })
                },
             //获取详情
             handleDetail(obj){
                console.log(obj)
                 this.editObj=obj;
                 this.dialogVisible=true
             },
             headleEdit(obj){
                 console.log(obj)
                if(obj.applyType=="原厂入驻"){
                    this.$router.push({
                        path:"/OriginalFactoryEntry",
                        query:{
                            edit:1
                        }
                    })

                }else if(obj.applyType=="月结申请"){
                    this.$router.push({
                        path:"/PersonalCenter/UpgradeLevel",
                        query:{
                            edit:1
                        }
                    })
                }
             },
             edit(){

             }
            },
        mounted() {
            this.init();
        },
        filters:{
            checkStatusFilter(val){
                switch (val) {
                    case 0:
                        return "待审核";
                    case 1:
                        return "已通过";
                    case 2:
                        return "已驳回";

                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .table{
        /deep/.el-table{
            .cell{
                .status0{
                    color:orange;
                    font-weight: bold;
                }
                .status1{
                    color:green;
                    font-weight: bold;
                }
                .status2{
                    color:#f22e2e;
                    font-weight: bold;
                }
            }
        }
    }
</style>
