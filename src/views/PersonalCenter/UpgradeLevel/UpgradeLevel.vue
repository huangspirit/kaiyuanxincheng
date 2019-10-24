<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>买家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>提升月结</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 入驻信息 -->
    <div class="CheckInformation">
      <div class="CheckInformation-con">
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="270px"
            class="demo-ruleForm"
          >
            <h3 class="tit-h3">企业基本信息</h3>
            <el-form-item label="统一社会信用代码：">
              <div class="recode">
                <el-input
                  v-model="ruleForm.creditCode"
                  type="text"
                  @input="handleInput"
                  maxlength="18"
                  show-word-limit
                ></el-input>
                <el-button v-if="showRequireBtn" @click="getCompanyInfo" type="primary">获取企业信息</el-button>
              </div>
              <p class="small">请严格按照营业执照填写统一社会信用代码</p>
            </el-form-item>

            <el-form-item label="公司注册名称：" prop="companyname">
              <el-input v-model="ruleForm.companyName"></el-input>
              <p class="small">请按照营业执照上登记的完整名称填写</p>
            </el-form-item>
            <el-form-item label="工商注册号：" prop="no">
              <el-input v-model="ruleForm.no"></el-input>
              <p class="small">确保与营业执照一致</p>
            </el-form-item>
            <el-form-item label="法定代表人：" prop="operName">
              <el-input v-model="ruleForm.operName"></el-input>
              <p class="small">确保与营业执照一致</p>
            </el-form-item>
            <el-form-item label="公司成立日期：" prop="startDate">
              <el-date-picker
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                v-model="ruleForm.startDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="注册资本：" prop="registCapi">
              <el-input v-model="ruleForm.registCapi"></el-input>
              <p class="small">若注册资本非人民币，请按照当前汇率换算人民币填写</p>
            </el-form-item>
            <el-form-item label="营业期限：" prop="termsEnd">
              <el-date-picker
                v-model="ruleForm.tremsStart"
                type="date"
                placeholder="营业开始日期"
                style="margin-right:100px"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
              ></el-date-picker>
              <el-date-picker
                v-model="ruleForm.termsEnd"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                type="date"
                placeholder="营业结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="公司详细地址：" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
              <p class="small">填写与营业执照一致的地址</p>
            </el-form-item>
            <el-form-item label="联系人：" prop="conName">
              <el-input v-model="ruleForm.conName"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号：" prop="telephone">
              <el-input v-model="ruleForm.telephone"></el-input>
            </el-form-item>
            <h3 class="tit-h3">企业资质上传（所有资质需要加盖红章）</h3>
            <div class="form2-item">
              <div class="title-up">
                <h3>
                  <span>*</span>
                  企业营业执照
                </h3>
                <p class="small">最新版营业执照，需加盖公司红章</p>
              </div>
              <div class="form-item-con">
                <el-form-item label="营业执照上传：" prop="url">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :limit="1"
                    :action="requestUrl"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload1"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove1"
                    :file-list="businessList"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>
            <div class="form2-item">
              <div class="title-up">
                <h3>
                  <span>*</span>
                  企平台负责人身份证正反面
                </h3>
                <p class="small">需加盖公司红章</p>
              </div>
              <div class="form-item-con">
                <el-form-item label="身份证：" prop="peopleId">
                  <el-input
                    v-model="ruleForm.peopleId"
                    @input="handleInputNum"
                    maxlength="18"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item label="上传正面照片：" prop="idUrlA">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="requestUrl"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload2"
                    :on-preview="handlePictureCardPreview"
                    :file-list="idUrlAList"
                    :limit="1"
                    :on-remove="handleRemove2"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
                <el-form-item label="上传反面照片：" prop="idUrlB">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="requestUrl"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload3"
                    :on-preview="handlePictureCardPreview"
                    :file-list="idUrlBList"
                    :limit="1"
                    :on-remove="handleRemove3"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
                  </el-upload>

                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>
            <div class="form2-item">
              <div class="title-up">
                <h3>
                  <span>*</span>
                  一般纳税人资格证明
                </h3>
                <p class="small">1.一般纳税人证明（需加盖公司红章）</p>
                <p class="small">2.提供近三个月内开票方为公司开具的增值税发票一张</p>
                <p class="small">3.上述条件至少上传一项</p>
              </div>
              <div class="form-item-con">
                <el-form-item label="资质图上传：" prop="taxUrl">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="requestUrl"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload4"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove4"
                    :file-list="taxUrlList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <span class="dialog-footer">
          <span class="sure bgColor" @click="submitForm('ruleForm')">
            <img src="@/assets/image/OriginalFactoryEntry/u44984.png" alt />
            提交资料
          </span>
        </span>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./UpgradeLevel.less";
</style>
<script>
// import "@/assets/css/ele-form.less";
// import "@/assets/css/label-checkbox.less";
import { baseURL } from "@/config";
import { mapState, mapActions } from "vuex";
import { formatDateTime } from "@/lib/utils";
import VDistpicker from "v-distpicker";
import { axios, FactoryEntry } from "../../../api/apiObj";
export default {
  name: "UpgradeLevel",
  data() {
    return {
      count: 0,
      showRequireBtn: false,
      showSetForm: false,
      reCompanyInfo: {},
      checkboxChangeValue: false,
      checkboxChangeValue2: false,
      dialogImageUrl: "",
      // 示例图
      exampleDiagram: require("@/assets/image/OriginalFactoryEntry/u85165.jpg"),
      // 预览图片
      dialogVisible: false,
      province: "",
      city: "",
      area: "",
      taxUrlList: [],
      idUrlBList: [],
      idUrlAList: [],
      businessList: [],
      // 基本信息
      ruleForm: {
        // // 公司注册名称
        // companyName: "",
        // // 工商营业执照注册号
        // no: "",
        // // 法定代表人
        // operName: "",
        // // 公司成立时间
        // startDate: "",
        // // 注册资本
        // registCapi: "",
        // // 营业开始时间
        // tremsStart: "",
        // // 营业结束时间
        // termsEnd: "",
        // // 企业负责人
        // conName: "",
        // // 企业负责人手机号
        // telephone: "",
        // // 公司所在地
        // companyaddress: "",
        // // 公司详细地址
        // address: "",
        // // 营业执照有效期开始时间
        // businesslicensestarttime: "",
        // //  企业营业执照结束时间
        // businesslicenseendtime: "",
        // // 营业执照是否长期
        // businesshours: "",
        // // 资质图上传
        // qualificationmapimg: [],
        // // 身份证
        // peopleId: "",
        // // 身份证正面
        // idUrlA: "",
        // // 身份证反面
        // idUrlB: "",
        // // 一般纳税人资格上传
        // taxUrl: [],
        // 入驻类型
        residencetype: "4"
      },

      // 基本信息验证
      rules: {
        address: [
          { required: true, message: "请输入公司注册地址", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          {
            min: 3,
            message: "公司名称名称最小为3个字符",
            trigger: "blur"
          }
        ],
        no: [
          { required: true, message: "请输入社会统一信用代码", trigger: "blur" }
        ],
        operName: [
          { required: true, message: "请输入法定代表人", trigger: "blur" }
        ],
        conName: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        startDate: [
          {
            type: "string",
            required: true,
            message: "请选择成立日期",
            trigger: "change"
          }
        ],
        registCapi: [
          { required: true, message: "请输入注册资本", trigger: "blur" }
        ],
        tremsStart: [
          {
            type: "string",
            required: true,
            message: "请选择营业开始时间",
            trigger: "change"
          }
        ],
        termsEnd: [
          {
            type: "string",
            required: true,
            message: "请选择营业结束时间",
            trigger: "change"
          }
        ],
        conName: [
          { required: true, message: "请输入企业负责人", trigger: "blur" }
        ],
        telephone: [
          {
            required: true,
            message: "请输入企业负责人手机号",
            trigger: "blur"
          },
          { min: 11, message: "手机号最小为11个字符", trigger: "blur" }
        ],

        // businesslicenseaddr: [
        //   { required: true, message: "请输入营业照所在地", trigger: "blur" },
        //   { min: 2, message: "营业照所在地最小为2个字符", trigger: "blur" }
        // ],
        // businesscope: [
        //   { required: true, message: "请输入营业范围", trigger: "blur" },
        //   { min: 2, message: "营业范围最小为2个字符", trigger: "blur" }
        // // ],
        // companyaddress: [
        //   { required: true, message: "请输入公司所在地", trigger: "blur" },
        //   { min: 2, message: "公司所在地最小为2个字符", trigger: "blur" }
        // ],
        address: [
          { required: true, message: "请输入公司详细地址", trigger: "blur" }
        ],
        // businesslicensestarttime: [
        //   {
        //     type: "string",
        //     required: true,
        //     message: "请输入有效期开始时间",
        //     trigger: "blur"
        //   }
        // ],
        // businesslicenseendtime: [
        //   {
        //     type: "string",
        //     required: true,
        //     message: "请输入有效期结束时间",
        //     trigger: "blur"
        //   }
        // ],
        url: [
          {
            required: true,
            message: "请上传营业执照图",
            trigger: "blur"
          }
        ],
        peopleId: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          }
        ],
        idUrlA: [
          {
            required: true,
            message: "请上传身份证正面",
            trigger: "blur"
          }
        ],
        idUrlB: [
          {
            required: true,
            message: "请上传身份证反面",
            trigger: "blur"
          }
        ],
        taxUrl: [
          {
            required: true,
            message: "请上传一般纳税人资格图",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: { VDistpicker },
  mounted() {
    if (this.applyDetailEdit.id) {
      console.log(this.applyDetailEdit, "编辑申请");
      this.ruleForm = this.applyDetailEdit;
      this.taxUrlList.push({
        url: baseURL + this.applyDetailEdit.url
      });
      this.idUrlBList.push({
        url: baseURL + this.applyDetailEdit.idUrlB
      });
      this.idUrlAList.push({
        url: baseURL + this.applyDetailEdit.idUrlA
      });
      this.businessList.push({
        url: baseURL + this.applyDetailEdit.url
      });
      console.log(this.taxUrlList);
    }
    this.ruleForm["residencetype"] = "4";
    this.ruleForm = Object.assign({}, this.ruleForm);
  },
  computed: {
    ...mapState(["applyDetailEdit"]),
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    requestUrl() {
      return (
        baseURL +
        `api-b/vipApply/uploadPicture?access_token=${this.access_token}&fileSource=QINIUYUN&type=5&id=1`
      );
    }
  },

  methods: {
    ...mapActions("OriginalFactoryEntry", ["GetInsertBrandReview"]),
    handleInput() {
      let obj = this.ruleForm.creditCode;
      obj = obj.replace(/[\W]/g, "").toUpperCase();
      this.$set(this.ruleForm, "creditCode", obj);
      if (obj.length == 18) {
        if (this.count < 1) {
          console.log("shixian");
          this.showRequireBtn = true;
        } else {
          this.showSetForm = true;
        }
      }
    },
    handleInputNum() {
      let obj = this.ruleForm.peopleId;
      obj = obj.replace(/[\W]/g, "");
      this.$set(this.ruleForm, "peopleId", obj);
    },
    getCompanyInfo() {
      let creditCode = this.ruleForm.creditCode;
      axios
        .request({
          ...FactoryEntry.queryCompnayInfo,
          params: {
            creditNo: this.ruleForm.creditCode
          }
        })
        .then(res => {
          console.log(res);
          if (res.data) {
            this.ruleForm = {
              ...this.ruleForm,
              ...res.data,
              creditCode: creditCode
            };
          }
          this.count++;
          this.showRequireBtn = false;
        });
    },
    // 平台入驻的确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .request({
              ...FactoryEntry.vipApply,
              method: "post",
              data: this.ruleForm
            })
            .then(res => {
              console.log(res);
              this.$message.success("提交成功");
              this.$router.push("/PersonalCenter/GetVipApplyDetail");
            });
        } else {
          this.$message.error("请完善信息！");
          return false;
        }
      });
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
    successUpload1(res) {
      console.log(res);
      console.log(this.ruleForm);
      this.ruleForm.url = res.data;
      // let ret = this.ruleForm.qualificationmapimg instanceof Array;
      // if (ret) {
      //   this.ruleForm.qualificationmapimg.push(response.name);
      // } else {
      //   this.ruleForm.qualificationmapimg = this.ruleForm.qualificationmapimg.split(
      //     "@"
      //   );
      //   this.ruleForm.qualificationmapimg.push(response.name);
      // }

      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },

    // 身份证正面
    successUpload2(response) {
      this.ruleForm.idUrlA = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 身份证反面
    successUpload3(response) {
      this.ruleForm.idUrlB = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 纳税资格人上传
    successUpload4(res) {
      console.log(res);
      this.ruleForm.taxUrl = res.data;
      //   return;
      // let ret = this.ruleForm.taxUrl instanceof Array;
      // if (ret) {
      //   this.ruleForm.taxUrl.push(response.name);
      // } else {
      //   this.ruleForm.taxUrl = this.ruleForm.taxUrl.split("@");
      //   this.ruleForm.taxUrl.push(response.name);
      // }
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    handleRemove1() {
      this.ruleForm.url = "";
    },
    handleRemove2() {
      this.ruleForm.idUrlA = "";
    },
    handleRemove3() {
      this.ruleForm.idUrlB = "";
    },
    handleRemove4(file) {
      //将要删除的文件
      console.log(file);
      this.ruleForm.taxUrl = "";
    },
    distpicker(x) {
      this.ruleForm.companyaddress = `${x.province.value}/${x.city.value}/${x.area.value}`;
    },
    dateChange(x) {},
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 展开示例图图片
    PrvExampleDiagram(x) {
      this.dialogImageUrl = x;
      this.dialogVisible = true;
    }
  }
};
</script>

