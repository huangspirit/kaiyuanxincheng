<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
<!--            0-->
            <el-breadcrumb-item>银行卡管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="cont">
        <div class="title">
            <el-button @click="addBank" class="bgColor">新增提现方式</el-button>
            <el-button @click="setPassword" class="bgColor">更改提现密码</el-button>
        </div>

            <el-table
                :data="tableData"
                style="width: 100%"
                border
               >
                <el-table-column
                    prop="bankCode"
                    label="账户类型"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.bankCode | filterBankCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cnname"
                    label="账户开户人名称"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="bankNumber"
                    label="银行卡号或支付宝账号"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="bankName"
                    label="开户行地址"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button class="bgColor" plain size="mini" @click="deleBank(scope.row)">解绑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                v-if="total>=pageSize"
                :currentPage.sync="currentPage"
                :page-size="pageSize"
                :total="total"
                @current-change="handleCurrentPageChange"
            ></Pagination>
        <el-dialog
            title="新增提现方式"
            :visible.sync="showAddBank"
            width="30%"
            >
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="开户银行" prop="bankCode">
                    <el-select v-model="form.bankCode" placeholder="请选择" >
                        <el-option label="工商银行" value="ICBC"></el-option>
                        <el-option label="农业银行" value="ABC"></el-option>
                        <el-option label="建设银行" value="CCB"></el-option>
                        <el-option label="招商银行" value="CMB"></el-option>
                        <el-option label="交通银行" value="COMM"></el-option>
                        <el-option label="支付宝" value="alipay"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="持卡人" prop="cnname">
                    <el-input v-model="form.cnname" :placeholder="form.bankCode=='alipay'?'支付宝名称':'持卡人姓名'"></el-input>
                </el-form-item>
                <el-form-item label="开户行地址" v-if="form.bankCode!='alipay'" prop="bankName">
                    <el-input v-model="form.bankName"></el-input>
                </el-form-item>
                <el-form-item label="卡号" prop="bankNumber">
                    <el-input v-model="form.bankNumber" :placeholder="form.bankCode=='alipay'?'请输入支付宝账户/手机号':'请输入银行卡号'"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                    <el-button @click="showAddBank=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="更新交易密码" :visible.sync="showsetpassword"  width="30%">
            <el-form :model="setform" label-width="100px">
                <el-form-item label="旧密码">
                    <el-input v-model="setform.password"  show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" >
                    <el-input v-model="setform.newpassword " show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" >
                    <el-input v-model="setform.renewpassword "  show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showsetpassword = false">取 消</el-button>
                <el-button type="primary" @click="submitSetpassword">确 定</el-button>
            </div>
        </el-dialog>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .cont{
        background:#fff;
        padding:10px;
        .title{
            margin-bottom:10px;
        }
    }
</style>
<script>
    import {axios,personCenter} from "../../../../api/apiObj";
    export  default {
        data(){
            return{
                setform:{},
                showsetpassword:false,
                showAddBank:false,
                form:{},
                rules: {
                    bankNumber: [
                        { required: true, message: "请输入支付宝账户/手机号或者银行卡号", trigger: 'blur' },
                    ],
                    bankName: [
                        { required: true, message: '请输入支付宝名称或者银行账户名', trigger: 'blur' },
                    ],
                    bankCode: [
                        { required: true, message: '请选择提现账户类型', trigger: 'change' }
                    ],
                    cnname: [
                        { required: true, message: '请填写提现账户名', trigger: 'blur' }
                    ]
                },
                tableData: [],
                total:0,
                pageSize:20,
                currentPage:1
            }
        },
        mounted(){
            this.init()
        },
        computed:{
            start(){
                return this.pageSize*(this.currentPage-1)
            }
        },
        filters:{
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
        },
        methods:{
            handleCurrentPageChange(x){
                this.currentPage=x;
                this.init()
            },
            init(){
                axios.request({...personCenter.getBankList,params:{
                    start:this.start,
                    length:this.pageSize,
                }}).then(res=>{
                    if(res && res.data){
                        this.tableData=res.data.data;
                        this.total=res.data.total;
                    }else{
                        this.total=0;
                        this.tableData=[];
                    }

                })
            },
            addBank(){
                this.form={};
                this.showAddBank=true;
            },
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       // alert('submit!');
                        axios.request({...personCenter.saveBank,data:this.form}).then(res=>{
                            console.log(res)
                            this.showAddBank=false;
                            this.currentPage=1;
                            this.init()
                        })
                    } else {
                        return false;
                    }
                });
            },
            deleBank(item){
                console.log(item)
                axios.request({...personCenter.deleBank,params:{id:item.id}}).then(res=>{
                    this.init()
                })
            },
            setPassword(){
                this.showsetpassword=true
                this.setform={}
            },
            submitSetpassword(){
                if(this.setform.password && this.setform.newpassword && this.setform.renewpassword){
                    if(this.setform.newpassword == this.setform.renewpassword) {
                        axios.request({...personCenter.updatedrawPassword,data:this.setform}).then(res=>{
                           if(res){
                               this.showsetpassword=false
                           }
                        })
                    }else{
                        this.$message.error("两次密码输入不一致")
                    }
                }else{
                    this.$message.error("信息填写不完整")
                }
            }
        }
    }
</script>
