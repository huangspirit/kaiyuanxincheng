<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>个人发票</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="PersonalInvoice">
      <p class="tit">
        <span>个人发票</span>
        <span class="add" @click="add">新增个人发票</span>
      </p>
      <div class="invoice-con">
        <el-table :data="AllPersonalInvoice" border style="width: 100%">
          <el-table-column width="150px" prop="username" label="用户名"></el-table-column>
          <el-table-column width="200px" prop="billtiltle" label="发票抬头"></el-table-column>
          <el-table-column width="200px" prop="billno" label="纳税人识别号"></el-table-column>
          <el-table-column width="200px" prop="corporatename" label="公司名称"></el-table-column>
          <el-table-column width="200px" prop="openingbank" label="开户银行"></el-table-column>
          <el-table-column width="200px" prop="registeredaddress" label="公司注册地址"></el-table-column>
          <el-table-column width="200px" prop="registeredphone" label="公司注册电话"></el-table-column>
          <el-table-column width="200px" prop="bankaccount" label="开户行账号"></el-table-column>
          <el-table-column width="150px" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="delInvoice(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 删除提示 -->
      <el-dialog
        :visible.sync="DelectDialog"
        lock-scroll
        center
        width="20%"
        class="DelectDialog"
        top="24vh"
      >
        <p slot="title" class="DelectDialog-title">提示</p>
        <div class="DelectDialog-con">
          <p>确认删除该收货地址?</p>
          <span @click="SureDelect" class="sure">确认删除</span>
          <span @click="DelectDialog = false">取消</span>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="centerDialogVisible" center class="add-dialog">
        <span slot="title" class="form-title">
          {{DialogText ? "新增个人发票" : "编辑个人发票"}}
          <img
            src="@/assets/image/PersonalCenter/u172.png"
            alt
            @click="centerDialogVisible = false"
          >
        </span>
        <div class="form-cont">
          <div>
            <label for>
              <span>*</span>
              发票抬头:
            </label>
            <div>
              <input type="text" v-model="params.billtiltle">
            </div>
          </div>
          <div>
            <label for>
              <span>*</span>
              纳税人识别号:
            </label>
            <div>
              <input type="text" v-model="params.billno">
            </div>
          </div>
          <div>
            <label for>
              <span>*</span>公司名称:
            </label>
            <div>
              <input type="text" v-model="params.corporatename">
            </div>
          </div>
          <div>
            <label for>
              <span>*</span>公司开户银行:
            </label>
            <div>
              <input type="text" v-model="params.openingbank">
            </div>
          </div>
          <div>
            <label for>
              <span>*</span>公司注册地址:
            </label>
            <div>
              <input type="text" v-model="params.registeredaddress">
            </div>
          </div>
          <div>
            <label for>
              <span>*</span>公司注册电话:
            </label>
            <div>
              <input type="number" v-model="params.registeredphone">
            </div>
          </div>
          <div>
            <label for>
              <span>*</span>公司开户行账号:
            </label>
            <div>
              <input type="text" v-model="params.bankaccount">
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="send()">保存发票</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./PersonalInvoice.less";
</style>

<script>
import "@/assets/css/dialog.less";
import { mapState, mapActions, Mutations } from "vuex";
export default {
  name: "PersonalInvoice",
  data() {
    return {
      DialogText: true,
      centerDialogVisible: false,
      DelectDialog: false,
      params: {
        billtiltle: "",
        billno: "",
        billcontent: 1,
        billtype: 1,
        corporatename: "",
        openingbank: "",
        registeredaddress: "",
        registeredphone: "",
        bankaccount: "",
        access_token: ""
      },
      DelectItem: ""
    };
  },
  computed: {
    ...mapState({
      AllPersonalInvoice: state => state.PersonalInvoice.AllPersonalInvoice
    }),
    accessToken() {
      return localStorage.getItem("access_token");
    }
  },
  watch: {},
  methods: {
    ...mapActions("PersonalInvoice", [
      "GetAllPersonalInvoice",
      "GetAddPersonalInvoice",
      "GetDelPersonalInvoice",
      "GetChangePersonalInvoice"
    ]),
    // 编辑个人发票
    handleClick(row) {
      this.centerDialogVisible = true;
      this.DialogText = false;
      this.params = row;
    },
    // 删除
    delInvoice(item) {
      this.DelectDialog = true;
      this.DelectItem = item;
    },
    // 确认删除
    SureDelect() {
      this.GetDelPersonalInvoice({
        id: this.DelectItem.id.toString(),
        access_token: this.accessToken
      })
        .then(res => {
          this.$message({
            type: "success",
            message: res
          });
          this.DelectDialog = false;
          this.DelectItem = "";
          this.all();
        })
        .catch(err => {
          this.$message.error(res);
        });
    },
    // 新增个人发票
    add() {
      this.centerDialogVisible = true;
    },
    // 保存发票
    send() {
      this.params.access_token = this.accessToken;
      if (this.DialogText) {
        this.GetAddPersonalInvoice(this.params)
          .then(res => {
            this.centerDialogVisible = false;
            this.$message({
              message: res,
              type: "success"
            });
            for (var key in this.params) {
              this.params[key] = "";
            }
            this.all();
          })
          .catch(err => {
            this.centerDialogVisible = false;
            this.$message.error("保存失败!");
          });
      } else {
        this.GetChangePersonalInvoice(this.params)
          .then(res => {
            this.centerDialogVisible = false;
            this.$message({
              message: res,
              type: "success"
            });
            for (var key in this.params) {
              this.params[key] = "";
            }
            this.all();
            this.DialogText = true;
          })
          .catch(err => {
            this.centerDialogVisible = false;
            this.$message.error("保存失败!");
          });
      }
    },
    all() {
      this.GetAllPersonalInvoice({
        access_token: this.accessToken
      })
        .then()
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  mounted() {
    this.all();
  }
};
</script>

<style>
</style>
