<template>
  <div class="TraderCheckInformation">
    <div class="CheckInformation-con">
      <p class="title">
        <span>平台入驻</span>
        <span>入驻信息</span>
      </p>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="207px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司全称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
            <p class="small">请按照营业执照上登记的完整名称填写</p>
          </el-form-item>
          <div class="form-item upload-img">
            <label for>身份证明：</label>
            <div>
              <p>能证明在此公司工作的相关证件的照片或扫描件</p>
              <el-upload
                :limit="1"
                class="avatar-uploader"
                :action="url"
                :show-file-list="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-preview="handlePictureCardPreview"
                list-type="picture-card"
              >
                <!-- <div class="avatar" >
                  <img :src="imageUrl" >
                  <!-- <i class="el-icon-zoom-in" @click="dialogVisible = true"></i> -->
                <!-- </div> -->
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >图片迟训请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
              </el-upload>
            </div>
          </div>
          <div class="form-item">
            <label for>证件类型：</label>
            <div>
              <select name id>
                <option value="身份证">身份证</option>
                <option value="护照">护照</option>
              </select>
            </div>
          </div>
          <el-form-item label="证件号码：" prop="position">
            <el-input v-model="ruleForm.position"></el-input>
          </el-form-item>
          <div class="form-item upload-img upload-img-id">
            <label for>上传证件照：</label>
            <div>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"
                :auto-upload="true"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :on-change="handleChange"
                :limit="1"
                :on-success="successUpload"

              >
                <i class="el-icon-plus"></i>
                <img :src="dialogImageUrl" alt>
                <div slot="tip" class="el-upload__tip">证件正面照</div>
              </el-upload>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"
                :auto-upload="true"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :on-change="handleChange"
                :limit="1"
                :on-success="successUpload"
              >
                <i class="el-icon-plus"></i>
                <img :src="dialogImageUrl" alt>
                <div slot="tip" class="el-upload__tip">证件正面照</div>
              </el-upload>

              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"
                :auto-upload="true"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :on-change="handleChange"
                :limit="1"
                :on-success="successUpload"
              >
                <i class="el-icon-plus"></i>
                <img :src="dialogImageUrl" alt>
                <div slot="tip" class="el-upload__tip">证件正面照</div>
              </el-upload>

              <p class="small">图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</p>
            </div>
          </div>
        </el-form>
      </div>
      <span class="dialog-footer">
        <span @click="back" class="back sure">
          <img src="@/assets/image/OriginalFactoryEntry/u197292.png" alt>
          返回上一步
        </span>
        <span class="sure" @click="submitForm('ruleForm')">
          提交申请
          <img src="@/assets/image/OriginalFactoryEntry/u44984.png" alt>
        </span>
      </span>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>

import { baseURL } from "@/config";
import VDistpicker from "v-distpicker";
export default {
  name: "TraderCheckInformation",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "",
      province: "",
      city: "",
      area: "",
      value1: "",
      // 基本信息
      ruleForm: {
        name: "",
        position: "",
        tel: ""
      },
      // 基本信息验证
      rules: {
        name: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        position: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "职位名称长度在 3 到 15 个字符",
            trigger: "blur"
          }
        ],
        tel: [
          { required: true, message: "请输入联系人电话", trigger: "blur" },
          { min: 11, max: 11, message: "联系人电话长度为11位", trigger: "blur" }
        ]
      }
    };
  },
  components: { VDistpicker },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    url() {
      return (
        baseURL +
        `api-f/files/uploadWithCloud?access_token=${
          this.access_token
        }&fileSource=QINIUYUN&type=5&id=1`
      );
    }
  },
  methods: {
    // 平台入驻的确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.$router.push({
            path: "/OriginalFactoryEntry/CheckInformation"
          });
        } else {
          this.$message.error('请完善信息!')
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    successUpload(response) {
      // this.headImgUrl = response.name;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    distpicker() {},
    back() {
      this.$router.go(-1);
    },
    handleChange() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.$store.state.OriginalFactoryEntry.active = 2;
  }
};
</script>
<style lang="less" scoped>
@import "./TraderCheckInformation.less";
</style>

