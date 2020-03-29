<template>
  <div class="NewsBrand">
    <div class="NewsBrand-con">
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
        >
          <h3 class="tit-h3">基本信息</h3>
          <el-form-item label="品牌英文名称：" prop="branda">
            <el-input v-model="ruleForm.branda"></el-input>
          </el-form-item>
          <el-form-item label="品牌中文名称：" prop="brand">
            <el-input v-model="ruleForm.brand"></el-input>
          </el-form-item>
          <el-form-item label="上传品牌logo：" prop="imgurl">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="url"
              :auto-upload="true"
              list-type="picture-card"
              :before-upload="beforeAvatarUpload"
              :on-success="successUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handlePictureCardRemove"
              :limit="1"
            >
              <i class="el-icon-plus"></i>

              <div slot="tip" class="el-upload__tip">图片请确保800px*800px以上，文件大小在2MB以内，支持png、jpg、gif格式</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </el-form-item>
          <el-form-item label="品牌介绍：" prop="branddesc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="请输入内容"
              v-model="ruleForm.branddesc"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="brandtel">
            <el-input v-model="ruleForm.brandtel"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="brandemail">
            <el-input v-model="ruleForm.brandemail"></el-input>
          </el-form-item>
          <el-form-item label="官方网址：" prop="brandweb">
            <el-input v-model="ruleForm.brandweb"></el-input>
          </el-form-item>
          <div class="form2-item" v-if="AgentListFlag">
            <h3 class="tit-h3">代理商资质上传（所有资质需要加盖红章）</h3>
            <div class="title-up">
              <h3>
                <span>*</span>
                品牌授权书
              </h3>
              <p class="small">1.请下载模板填写并加盖公章及商标权人公司红章后，拍照或彩色扫描后上传</p>
              <p class="small">2.若商标授权人为自然人，须同时提交商标授权人亲笔签名的身份证复印件，并加盖开店公司红章</p>
              <p class="small">3.经营自有品牌，无需提交独占协议书，此处请上传商标注册证</p>
              <p class="download">下载模板</p>
            </div>
            <div class="form-item-con Agent-con">
              <ul>
                <li>
                  <el-form-item label="有效期：" prop="qualificationstarttime">
                    <el-date-picker
                      v-model="ruleForm.qualificationstarttime"
                      type="date"
                      placeholder="开始日期"
                      style="margin-right:100px"
                      value-format="yyyy/MM/dd"
                      format="yyyy/MM/dd"
                    ></el-date-picker>
                    <el-date-picker
                      v-model="ruleForm.qualificationendtime"
                      type="date"
                      placeholder="结束日期"
                      value-format="yyyy/MM/dd"
                      format="yyyy/MM/dd"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="资质图上传：" prop="qualification">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :action="url"
                      :auto-upload="true"
                      list-type="picture-card"
                      :before-upload="beforeAvatarUpload"
                      :on-success="successUploadAgency"
                      :on-preview="handlePictureCardPreview"
                      :limit="1"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </div>
        </el-form>

        <span class="dialog-footer">
          <span @click="back" class="back sure">
            <img src="@/assets/image/OriginalFactoryEntry/u197292.png" alt>
            取消，返回上一步
          </span>
          <span class="sure" @click="submitForm('ruleForm')">
            确认新建品牌
            <img src="@/assets/image/OriginalFactoryEntry/u44984.png" alt>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import "./NewsBrand.less";
import { baseURL } from "@/config";
import { mapState, mapActions } from "vuex";
import "@/assets/css/ele-form.less";
export default {
  name: "NewBrand",
  props: {
    sureUrl: {
      type: String
    },
    residencetype: Number
  },
  data() {
    return {
      // 代理资质的显示
      AgentListFlag: true,
      // 预览图片
      dialogVisible: false,
      // 图片路径
      dialogImageUrl: "",
      ruleForm: {
        // 中文名字
        brand: "",
        // 英文名字
        branda: "",
        // logo图片
        imgurl: "",
        // 品牌介绍
        branddesc: "",
        // 电话
        brandtel: "",
        // 官方网址
        brandweb: "",
        // 邮箱
        brandemail: "",
        // 代理资质有效期开始时间
        qualificationstarttime: "",
        // 代理资质有效期结束时间
        qualificationendtime: "",
        // 资质图上传
        qualification: "",
        // 有效期时间
        qualificationtime: ""
      },
      rules: {
        branda: [
          { required: true, message: "请填写品牌英文名称", trigger: "blur" },
          {
            min: 1,
            message: "品牌英文名称长度最少为1个字符",
            trigger: "blur"
          }
        ],
        brand: [
          { required: true, message: "请填写品牌中文名称", trigger: "blur" },
          {
            min: 1,
            message: "品牌中文名称最少为1个字符",
            trigger: "blur"
          }
        ],
        branddesc: [
          { required: true, message: "请填写品牌介绍", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "品牌介绍在 1 到200 个字符之间",
            trigger: "blur"
          }
        ],
        brandtel: [
          { required: true, message: "请填写品牌电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "品牌电话11字符",
            trigger: "blur"
          }
        ],
        brandweb: [
          { required: true, message: "请填写品牌官方网址", trigger: "blur" },
          {
            min: 11,
            message: "品牌官方网址长度在最少为11 个字符",
            trigger: "blur"
          }
        ],
        brandemail: [
          { required: true, message: "请填写品牌邮箱", trigger: "blur" },
          {
            min: 1,
            message: "品牌邮箱长度在最少为1 个字符",
            trigger: "blur"
          }
        ],
        imgurl: [{ required: true, message: "请上传图片", trigger: "blur" }],
        qualification: [
          { required: true, message: "请上传图片", trigger: "blur" }
        ],
        qualificationstarttime: [
          {
            type: "string",
            required: true,
            message: "请选择有效期日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    url() {
      return (
        baseURL +
        `api-g/files/uploadWithCloud?access_token=${
          this.access_token
        }&fileSource=QINIUYUN&type=1&id=1`
      );
    }
  },
  methods: {
    ...mapActions("OriginalFactoryEntry", [
      "GetInsertBrandInfoReview",
      "GetQueryDictionarieList"
    ]),
    // 上传之前图片的大小
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isLt2M;
    },
    // 上传成功后
    successUpload(response) {
      this.ruleForm.imgurl = response.name;

      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 资质图上传成功
    successUploadAgency(response) {
      this.ruleForm.qualification = response.name;
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
    // 确认新建品牌
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.qualificationtime = `${
            this.ruleForm.qualificationstarttime
          }/${this.ruleForm.qualificationendtime}`;
          this.ruleForm.access_token = this.access_token;

          this.GetInsertBrandInfoReview(this.ruleForm)
            .then(res => {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$router.push({
                path: this.sureUrl,
                query: {
                  id: res.data,
                  brand: this.ruleForm.branda
                }
              });
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          return false;
        }
      });
    },
    // 返回上一步
    back() {
      this.$router.go(-1);
    },
    // 删除列表后的回调
    handlePictureCardRemove(file, fileList, name) {
      // if (typeof fileList != "undefined") {
      //   if (fileList.length > 0) {
      //     this.$refs["ruleForm"].clearValidate();
      //   } else {
      //     this.$refs["ruleForm"].validate();
      //   }
      // }
    }
  },
  mounted() {
    console.log("sureUrl:",this.sureUrl)
    if (this.residencetype === 2) {
      this.AgentListFlag = true
    } else {
      this.AgentListFlag = false
    }
  }
};
</script>

<style>
</style>

