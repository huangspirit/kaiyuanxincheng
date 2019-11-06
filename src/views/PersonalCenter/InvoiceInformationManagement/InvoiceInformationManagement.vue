<template>
  <div>
    <el-breadcrumb  separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>买家中心</el-breadcrumb-item>-->
      <!-- <el-breadcrumb-item to="/PersonalCenter/BuyerInvoiceManagement">发票管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>开票信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="InvoiceInformationManagement">
      <el-button class="bgColor">
        <span @click="addInvoiceInforma">新增开票信息</span>
      </el-button>
      <ul class="InvoiceInforma-list">
        <li v-for="item in list" :key="item.id">
          <span v-if="item.isdefault">默认</span>
          <div class="item-l">
            <div class="item-l-name">
              <p>
                公司名称：
                <span>{{item.corporatename}}</span>
              </p>
              <p>开户银行：{{item.openingbank}}</p>
              <p>开票电话：{{item.registeredphone}}</p>
              <!-- <p>
                <label class="label">
                  <input disabled type="checkbox" v-model="item.isdefault" />
                  <span>
                    <img
                      src="@/assets/image/OriginalFactoryEntry/_u11446.png"
                      alt
                      v-if="item.isdefault"
                    />
                  </span>
                </label>
                <span>设为默认的开票信息</span>
              </p> -->
            </div>
          </div>
          <div class="item-r">
            <div class="item-r-t">
              <p>税号/统一信用代码证号：{{item.billno}}</p>
              <p>银行账户：{{item.bankaccount}}</p>
              <p>开票地址：{{item.registeredaddress}}</p>
            </div>
          </div>
           <p class="item-r-t">
              <el-button class="edit bgColor" @click="editInvoiceInforma(item)" size="mini">编辑</el-button>
              <el-button class="del" @click="delInvoiceInforma(item)" size="mini">删除</el-button>
            </p>
        </li>
      </ul>
    </div>
    <!-- 添加发票的模态框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="45%"
      :lock-scroll="false"
      class="Add-Invoice"
      top="10vh"
      @close="handleClose('ruleForm')"
    >
      <p slot="title" class="title">{{dialogTitle ? "新增开票信息" : '编辑开票信息'}}</p>
      <div class="dialo-body">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司名称：" prop="corporatename">
            <el-input v-model="ruleForm.corporatename"></el-input>
          </el-form-item>
          <el-form-item label="税号/统一信用代码证号：" prop="billno">
            <el-input v-model="ruleForm.billno"></el-input>
          </el-form-item>
          <el-form-item label="开户银行：" prop="openingbank">
            <el-input v-model="ruleForm.openingbank"></el-input>
          </el-form-item>
          <el-form-item label="银行账号：" prop="bankaccount">
            <el-input v-model="ruleForm.bankaccount"></el-input>
          </el-form-item>
          <el-form-item label="开票电话：" prop="registeredphone">
            <el-input v-model="ruleForm.registeredphone"></el-input>
          </el-form-item>
          <el-form-item label="开票地址：" prop="registeredaddress">
            <el-input v-model="ruleForm.registeredaddress"></el-input>
          </el-form-item>
          <el-form-item label="设为默认：" prop="invoCheck">
            <el-switch v-model="ruleForm.isdefault" active-color="#13ce66" inactive-color="#d5d5d5"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialo-footer">
        <span @click="submitForm('ruleForm')">确认发票信息</span>
        <span @click="dialogVisible = false" class="cancel">取消</span>
      </span>
    </el-dialog>
    <!-- 提示 -->
    <el-dialog
      center
      :visible.sync="dialogVisible2"
      width="500px"
      class="confirma-delivery-dialog"
      top="20vh"
      lock-scroll
    >
      <p slot="title" class="title">提示</p>
      <div class="con">
        <p>确认删除该发票信息？</p>
        <p></p>
      </div>
      <span slot="footer" class="dialog-footer">
        <span @click="cancelDel">确认删除</span>
        <span @click="dialogVisible2 = false" class="close">取消</span>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/css/label-checkbox.less";
import "@/assets/css/ele-form.less";
import "@/assets/css/dialog-delect.less";
import { mapState, mapActions } from "vuex";
export default {
  name: "InvoiceInformationManagement",
  data() {
    return {
      checkboxChangeValue: false,
      dialogTitle: true,
      // 开票信息的模态框
      dialogVisible: false,
      // 删除提示
      dialogVisible2: false,
      // 当前的队列
      currentItem: "",
      ruleForm: {
        billtiltle: "",
        billno: "",
        billcontent: 1,
        billtype: 1,
        corporatename: "",
        openingbank: "",
        registeredaddress: "",
        registeredphone: "",
        bankaccount: "",
        access_token: "",
        isdefault: true
      },
      rules: {
        corporatename: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        openingbank: [
          { required: true, message: "请输入开户银行", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        bankaccount: [
          { required: true, message: "请输入银行账号", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        registeredaddress: [
          { required: true, message: "请输入开票地址", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        registeredphone: [
          { required: true, message: "请输入开票电话", trigger: "blur" }
          // { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        billno: [
          {
            required: true,
            message: "请输入税号/统一信用代码证号",
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    ...mapState({
      list: state => state.InvoiceInformationManagement.AllPersonalInvoice
    }),
    access_token() {
      return localStorage.getItem("access_token");
    }
  },
  mounted() {
    this.all();
  },
  methods: {
    ...mapActions("InvoiceInformationManagement", [
      "GetAllPersonalInvoice",
      "GetAddPersonalInvoice",
      "GetDelPersonalInvoice",
      "GetChangePersonalInvoice",
      "GetQueryUserBillById"
    ]),
    // 默认框改变时
    // checkboxChange(item) {
    //   if (item.isdefault) {
    //     this.list.map(item => {
    //       item.isdefault = false;
    //     });
    //     item.isdefault = true;
    //   }
    // },
    all() {
      this.GetAllPersonalInvoice({
        start: 0,
        length: 10,
        access_token: this.access_token
      });
    },
    // 提交表单
    submitForm(formName) {
      this.ruleForm.access_token = this.access_token;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogTitle) {
            this.GetAddPersonalInvoice(this.ruleForm)
              .then(res => {
                this.$message({
                  type: "success",
                  message: res
                });
                this.dialogVisible = false;
                this.all();
              })
              .catch(err => {
                this.$message.error(err);
              });
          } else {
            this.GetChangePersonalInvoice(this.ruleForm)
              .then(res => {
                this.$message({
                  type: "success",
                  message: res
                });
                this.dialogVisible = false;
                this.all();
              })
              .catch(err => {
                this.$message.error(err);
              });
          }
        } else {
          this.$message.error("请完善信息!");
          return false;
        }
      });
    },
    // 新增开票信息
    addInvoiceInforma() {
      this.dialogVisible = true;
      this.dialogTitle = true;
    },
    // 确认删除
    cancelDel() {
      this.GetDelPersonalInvoice({
        id: this.currentItem.id,
        access_token: this.access_token
      })
        .then(res => {
          this.$message({
            type: "success",
            message: res
          });
          this.dialogVisible2 = false;
          this.all();
        })
        .then(err => {
          this.$message.error(err);
        });
    },
    // 删除信息
    delInvoiceInforma(item) {
     // this.dialogVisible2 = true;
        var _this=this;
      this.currentItem = item;
        this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            _this.cancelDel()
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消'
            });
        });

    },
    // 编辑信息
    editInvoiceInforma(item) {
      this.dialogVisible = true;
      this.dialogTitle = false;
      this.GetQueryUserBillById({
        id: item.id,
        access_token: this.access_token
      }).then(res => {
        this.ruleForm = res;
      });
    },
    // 关闭信息的模态框
    handleClose(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
@import "./InvoiceInformationManagement.less";
</style>

