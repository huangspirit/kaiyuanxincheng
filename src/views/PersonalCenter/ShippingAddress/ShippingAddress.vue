<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>用户中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>收货地址</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 收货地址 -->
    <div class="ShippingAddress">
      <p class="tit">
<!--        <span>收货地址</span>-->
        <el-button class="bgColor add" @click="add" style="width:auto;">新增收货地址</el-button>
      </p>
      <ul class="list-addess">
        <li v-for="item in AddressList" :key="`AddressList_${item.id}`" :class="item.isdefault?'bgColor':''">
          <span v-if="item.isdefault" class="defaultAddress">默</span>
          <span class="name">{{item.receivingName}}</span>
          <span class="phone">{{item.phone}}</span>
          <span class="address">{{item.address}}{{item.detailedAddress}}</span>
          <div class="fr btnWrap" style="display:flex;height: 100%;">
              <span @click="updateAddress(item)" v-if="!item.isdefault" class="btn" >设为默认</span>
              <span  v-if="!item.isdefault">|</span>
              <span @click="editAddress(item)" class="btn">编辑</span>
              <span>|</span>
              <span @click="delect(item)" class="btn">删除</span>
<!--            <el-button class="default" @click="updateAddress(item)" v-if="!item.isdefault">设为默认</el-button>-->
<!--            <el-button class="default" @click="editAddress(item)" style="margin-left: 15px;">编辑该地址</el-button>-->
<!--            <el-button class="default" @click="delect(item)" style="margin-left: 15px;">删除</el-button>-->
          </div>
          <!--          <span class="edit" @click="editAddress(item)">编辑该地址</span>-->
          <!--          <span class="del" @click="delect(item)">删除</span>-->
        </li>
      </ul>
      <el-dialog
        :visible.sync="centerDialogVisible"
        center
        width="1000px"
        class="dialog-ruleForm-address2"
        @close="closeDialogAddress('ruleForm')"
      >
        <span slot="title" class="title">{{DialogText ? "新增收货人地址" : "编辑收货人地址"}}</span>
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="200px"
            class="demo-ruleForm-address"
          >
            <!--            <div class="form-item">-->
            <!--              <label for>-->
            <!--                <span>*</span>-->
            <!--                所在地区:-->
            <!--              </label>-->
            <!--              <div class="address-distpicker">-->
            <!--                <v-distpicker :province="province" :city="city" :area="area" @selected="distpicker"></v-distpicker>-->
            <!--              </div>-->
            <!--            </div>-->
            <el-form-item label="所在地区:" prop="address">
              <el-input v-model="ruleForm.address" style="display:none;"></el-input>
              <div class="address-distpicker">
                <v-distpicker :province="province" :city="city" :area="area" @selected="distpicker"></v-distpicker>
              </div>
            </el-form-item>
            <el-form-item label="收货人:" prop="receivingName">
              <el-input v-model="ruleForm.receivingName"></el-input>
            </el-form-item>
            <el-form-item label="详细地址:" prop="detailedAddress">
              <el-input v-model="ruleForm.detailedAddress"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="固定电话:">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码:">
              <el-input v-model="ruleForm.postalCode"></el-input>
            </el-form-item>
            <el-form-item label="设置默认地址">
              <el-switch v-model="ruleForm.isdefault"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancle" @click="addressCancel('ruleForm')">取消</el-button>
          <el-button class="default" @click="submitForm('ruleForm')">保存</el-button>
          <!--          <span @click="addressCancel('ruleForm')" >取消</span>-->
          <!--           <span @click="submitForm('ruleForm')">保存</span>-->
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./ShippingAddress.less";
</style>

<script>
//import "@/assets/css/dialog.less";
//import "@/assets/css/ele-form.less";
import { axios, presonalAdress } from "@/api/apiObj";
import { mapGetters, mapActions, mapState } from "vuex";
import VDistpicker from "v-distpicker";
import { stat } from "fs";
export default {
  name: "ShippingAddress",
  data() {
    return {
      centerDialogVisible: false,
      area: "",
      city: "",
      province: "",
      DialogText: true,
      AddressList: [],
      ruleForm: {
        address: "",
        receivingName: "",
        phone: "",
        phoneAreaCode: "中国+0086",
        tel: "",
        telAreaCode: "010",
        postalCode: "",
        detailedAddress: "",
        isEnable: 1
      },
      rules: {
        address: [
          { required: true, message: "请选择收货地址", trigger: "blur" }
        ],
        receivingName: [
          { required: true, message: "请输入收货人", trigger: "blur" },
          { min: 1, message: "收货人长度最低为2个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, message: "手机号码最低为11位数", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入固定电话", trigger: "blur" },
          { min: 8, message: "固定电话最低为8位数", trigger: "blur" }
        ],
        detailedAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 3, message: "详细地址最低为3个字符数", trigger: "blur" }
        ],
        postalCode: [
          { required: true, message: "请输入邮政编码", trigger: "blur" },
          { min: 3, message: "邮政编码最低为3个字符数", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions("ShippingAddress", [
      "GetAddAddress",
      "GetDeleteAddress",
      "GetFindAddress",
      "GetUpdateAddress"
    ]),
    distpicker(x) {
      this.province = x.province.value;
      this.city = x.city.value;
      this.area = x.area.value;
      this.ruleForm.address = this.province + "/" + this.city + "/" + this.area;
    },
    //设置为默认地址
    updateAddress(item) {
      let obj = {
        id: item.id,
        isdefault: true
      };
      this.GetUpdateAddress(obj).then(res => {
        this.all();
      });
    },
    // 添加地址

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.DialogText) {
            this.GetAddAddress(this.ruleForm)
              .then(res => {
                this.$message({
                  message: res,
                  type: "success"
                });
                this.all();
                this.centerDialogVisible = false;
              })
              .catch(err => {
                this.$message.error(err);
              });
          } else {
            this.GetUpdateAddress(this.ruleForm)
              .then(res => {
                this.$message({
                  message: res.message,
                  type: "success"
                });

                this.all();
                this.DialogText = true;
              })
              .catch(err => {
                this.$message({
                  message: err.message,
                  type: "error"
                });
              });
            this.centerDialogVisible = false;
          }
        }
      });
    },
    add() {
      this.DialogText = true;
      this.centerDialogVisible = true;
      this.ruleForm = {
        address: "",
        receivingName: "",
        phone: "",
        phoneAreaCode: "中国+0086",
        tel: "",
        telAreaCode: "010",
        postalCode: "",
        detailedAddress: "",
        isEnable: 1
      };
      this.area = "";
      this.city = "";
      this.province = "";
    },
    // 编辑地址
    editAddress(item) {
      this.GetFindAddress({
        id: item.id
        // access_token: this.access_token
      }).then(res => {
        let arr = res.address.split("/");
        this.province = arr[0];
        this.city = arr[1];
        this.area = arr[2];
        this.DialogText = false;
        this.centerDialogVisible = true;
        this.ruleForm = res;
      });
    },
    delect(item) {
      this.$confirm("确定要删除该地址吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.GetDeleteAddress({
            id: item.id
            // access_token: this.access_token
          }).then(res => {
            this.$message({
              message: res,
              type: "success"
            });
            this.all();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 关闭时的回调
    closeDialogAddress(formName) {
      this.$refs[formName].resetFields();
    },
    all() {
      axios
        .request({
          ...presonalAdress.getAllAdress,
          params: { start: 0, length: 10 }
        })
        .then(res => {
          if (res.resultCode == "200") {
            this.AddressList = res.data.data;
          }
        });
    },
    // 收货地址模态框取消
    addressCancel(formName) {
      this.centerDialogVisible = false;
      this.$refs[formName].resetFields();
    }
  },
  computed: {},
  components: { VDistpicker },
  mounted() {
    this.all();
  }
};
</script>
<!--<style lang="less">-->
<!--.el-breadcrumb {-->
<!--  height: 80px;-->
<!--  line-height: 40px;-->
<!--  padding: 20px;-->
<!--  background: #fff;-->
<!--  box-sizing: border-box;-->
<!--  margin-bottom: 20px;-->
<!--  font-size: 28px;-->

<!--  .el-breadcrumb__item:nth-child(2) {-->
<!--    > .el-breadcrumb__inner {-->
<!--      color: #0d98ff;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->

<style lang="less" scoped>
@import "./ShippingAddress.less";
</style>
