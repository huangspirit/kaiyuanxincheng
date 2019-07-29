<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
      <el-breadcrumb-item>代理资质</el-breadcrumb-item>
      <el-breadcrumb-item>新增资质</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="AdditionalQualifications">
      <!-- 选择品牌 -->
      <SelectBrand
        v-if="selectBrandFlag"
        @select="SelectBrand"
        :addBrandUrl="addBrandUrl"
        @cancel="CancelBrand"
        :EndselectBrandList="EndselectBrandList"
      ></SelectBrand>
      <div v-else class="Additional-con">
        <h3 class="h-sp">确认品牌</h3>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="选择品牌：" prop="brand">
            <el-select
              v-model="ruleForm.brandName"
              multiple
              placeholder="请选择"
              :multiple-limit="3"
              @focus="FindBrand"
            ></el-select>
          </el-form-item>
        </el-form>
        <div class="form-sp-item">
          <h3 class="h-sp">代理商资质上传（所有资质需要加盖红章）</h3>
          <div class="brand-authorization">
            <h4 class="h-sp">
              <span class="red-sp">*</span>
              品牌授权书
            </h4>
            <p class="small">1.请下载模板填写并加盖公章及商标权人公司红章后，拍照或彩色扫描后上传</p>
            <p class="small">2.若商标授权人为自然人，须同时提交商标授权人亲笔签名的身份证复印件，并加盖开店公司红章</p>
            <p class="small">3.经营自有品牌，无需提交独占协议书，此处请上传商标注册证</p>
            <p class="download-template">
              <a>下载模板</a>
            </p>
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="200px"
            class="demo-ruleForm"
          >
            <el-form-item label="有效期：" prop="timeStart">
              <el-date-picker
                v-model="ruleForm.timeStart"
                type="date"
                placeholder="开始日期"
                style="margin-right:100px"
              ></el-date-picker>
              <el-date-picker v-model="ruleForm.timeEnd" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="资质图上传：" class="uploadImg">
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"
                :auto-upload="true"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :on-success="successUpload"
                :on-preview="handlePictureCardPreview"
              >
                <i class="el-icon-plus"></i>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >图片迟训请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
              </el-upload>
              <div class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                <img :src="exampleDiagram" alt>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div class="Add-footer">
          <p @click="submitForm('ruleForm')" class="ensure">保存并提交</p>
          <p @click="cancelBack" class="cancle">取消，返回上一步</p>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";


import SelectBrand from "_c/SelectBrand";

import { baseURL } from "@/config";
export default {
  name: "AdditionalQualifications",
  data() {
    return {
      // 现在选中的列表
      EndselectBrandList: [],
      addBrandUrl: "/PersonalCenter/NewsBrandQualifica",
      selectBrandFlag: false,
      dialogImageUrl: "",
      checkboxChangeValue: false,
      // 示例图
      exampleDiagram: require("@/assets/image/OriginalFactoryEntry/u85165.jpg"),
      // 预览图片
      dialogVisible: false,
      ruleForm: {
        // 选择品牌的名字
        brandName: [],
        // 选择品牌名字的id
        brand: "",
        // 有效期开始时间
        timeStart: "",
        // 有效期结束时间
        timeEnd: "",
        // 资质图上传
        qualificationMap: ""
      },
      rules: {
        brand: [{ required: true, message: "请选择品牌", trigger: "blur" }],
        termValidity: [
          { required: true, message: "请选择有效期", trigger: "blur" }
        ],
        qualificationMap: [
          { required: true, message: "请上传资质图", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    SelectBrand
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    url() {
      return (
        baseURL +
        `api-f/files/uploadWithCloud?access_token=${
          this.access_token
        }&fileSource=QINIUYUN&type=6&id=1`
      );
    }
  },
  methods: {
    FindBrand(x) {
      this.selectBrandFlag = true;
    },
    // 确定选择的品牌
    SelectBrand(EndselectBrandList) {
      this.selectBrandFlag = false;
      let arr = [];
      let arrName = [];
      EndselectBrandList.forEach(item => {
        arr.push(item.id);
        arrName.push(item.brand);
      });
      this.ruleForm.brandName = arrName;
      this.ruleForm.brand = arr.join(",");
    },
    // 取消选择的品牌
    CancelBrand() {
      this.selectBrandFlag = false;
    },
    // 上传之前图片的大小
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isLt2M;
    },
    // 资质上传图
    successUpload(response) {
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 展开示例图图片
    PrvExampleDiagram(x) {
      this.dialogImageUrl = x;
      this.dialogVisible = true;
    },
    // 保存并提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          this.$router.push({
            path: "/PersonalCenter/SuccessfulAddiQualifica"
          });
        } else {
          this.$message.error('请完善信息!')
          return false;
        }
      });
    },
    // 取消返回上一步
    cancelBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    let addBrandName = this.$route.query;
    if (addBrandName) {
      this.ruleForm.brandName.push(addBrandName.brand);
      this.EndselectBrandList.push(addBrandName);
    }
  }
};
</script>

<style lang="less" scoped>
  @import "./AdditionalQualifications.less";
  @import "../../../assets/css/ele-form.less";
</style>

