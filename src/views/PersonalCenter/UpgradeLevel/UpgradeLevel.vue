<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>买家中心</el-breadcrumb-item>
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
            <el-form-item label="公司注册名称：" prop="companyname">
              <el-input v-model="ruleForm.companyname"></el-input>
              <p class="small">请按照营业执照上登记的完整名称填写</p>
            </el-form-item>
            <el-form-item label="工商营业执照注册号：" prop="businesslicensenum">
              <el-input v-model="ruleForm.businesslicensenum"></el-input>
            </el-form-item>
            <el-form-item label="法定代表人：" prop="legalagent">
              <el-input v-model="ruleForm.legalagent"></el-input>
              <p class="small">确保与营业执照一致</p>
            </el-form-item>
            <el-form-item label="公司成立日期：" prop="establishmenttime">
              <el-date-picker
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                v-model="ruleForm.establishmenttime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="注册资本：" prop="registeredcapital">
              <el-input v-model="ruleForm.registeredcapital"></el-input>
              <p class="small">若注册资本非人民币，请按照当前汇率换算人民币填写</p>
            </el-form-item>
            <el-form-item label="营业期限：" prop="businesshoursend">
              <el-date-picker
                v-model="ruleForm.businesshoursstart"
                type="date"
                placeholder="营业开始日期"
                style="margin-right:100px"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
              ></el-date-picker>
              <el-date-picker
                v-model="ruleForm.businesshoursend"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                type="date"
                placeholder="营业结束日期"
              ></el-date-picker>
              <!-- <span class="long-time">
                <label class="label">
                  <input type="checkbox" v-model="checkboxChangeValue2">
                  <span>
                    <img
                      src="@/assets/image/OriginalFactoryEntry/_u11446.png"
                      alt
                      v-if="checkboxChangeValue2"
                    >
                  </span>
                </label>
                <span>长期</span>
              </span> -->
            </el-form-item>
            <el-form-item label="企业负责人：" prop="headenterprise">
              <el-input v-model="ruleForm.headenterprise"></el-input>
            </el-form-item>
            <el-form-item label="企业负责人手机号：" prop="enterprisephone">
              <el-input v-model="ruleForm.enterprisephone"></el-input>
            </el-form-item>
              <el-form-item label="公司注册地址：" prop="address">
                  <v-distpicker :province="province" :city="city" :area="area" @selected="distpicker"></v-distpicker>
              </el-form-item>
<!--            <div class="form-item address">-->
<!--              <label for>公司注册地址：</label>-->
<!--              <div>-->
<!--                <v-distpicker :province="province" :city="city" :area="area" @selected="distpicker"></v-distpicker>-->
<!--              </div>-->
<!--            </div>-->
            <el-form-item label="公司详细地址：" prop="companydetailaddress">
              <el-input v-model="ruleForm.companydetailaddress"></el-input>
              <p class="small">填写与营业执照一致的地址</p>
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
                <el-form-item label="有效期：" prop="businesslicensestarttime">
                  <el-date-picker
                    v-model="ruleForm.businesslicensestarttime"
                    type="date"
                    placeholder="开始日期"
                    style="margin-right:100px"
                    value-format="yyyy/MM/dd"
                    format="yyyy/MM/dd"
                  ></el-date-picker>
                  <el-date-picker
                    v-model="ruleForm.businesslicenseendtime"
                    type="date"
                    placeholder="结束日期"
                    value-format="yyyy/MM/dd"
                    format="yyyy/MM/dd"
                  ></el-date-picker>
                  <!-- <span class="long-time">
                    <label class="label">
                      <input type="checkbox" v-model="checkboxChangeValue">
                      <span>
                        <img
                          src="@/assets/image/OriginalFactoryEntry/_u11446.png"
                          alt
                          v-if="checkboxChangeValue"
                        >
                      </span>
                    </label>
                    <span>长期</span>
                  </span> -->
                </el-form-item>
                <el-form-item label="资质图上传：" prop="qualificationmapimg">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload1"
                    :on-preview="handlePictureCardPreview"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt>
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
                <el-form-item label="身份证：" prop="enterpriseplatformidentity">
                  <el-input v-model="ruleForm.enterpriseplatformidentity"></el-input>
                </el-form-item>
                <el-form-item label="上传正面照片：" prop="identityposimg">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload2"
                    :on-preview="handlePictureCardPreview"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt>
                    <span>示例图</span>
                  </span>
                </el-form-item>
                <el-form-item label="上传反面照片：" prop="identitynegimg">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload3"
                    :on-preview="handlePictureCardPreview"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
                  </el-upload>

                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt>
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
                <el-form-item label="资质图上传：" prop="taxpayerimg">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload4"
                    :on-preview="handlePictureCardPreview"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt>
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <span class="dialog-footer">
          <span class="sure" @click="submitForm('ruleForm')">
            <img src="@/assets/image/OriginalFactoryEntry/u44984.png" alt>
            提交资料
          </span>
        </span>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
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
export default {
  name: "UpgradeLevel",
  data() {
    return {
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
      // 基本信息
      ruleForm: {
        // 公司注册名称
        companyname: "",
        // 工商营业执照注册号
        businesslicensenum: "",
        // 法定代表人
        legalagent: "",
        // 公司成立时间
        establishmenttime: "",
        // 注册资本
        registeredcapital: "",
        // 营业开始时间
        businesshoursstart: "",
        // 营业结束时间
        businesshoursend: "",
        // 企业负责人
        headenterprise: "",
        // 企业负责人手机号
        enterprisephone: "",
        // 公司所在地
        companyaddress: "",
        // 公司详细地址
        companydetailaddress: "",
        // 营业执照有效期开始时间
        businesslicensestarttime: "",
        //  企业营业执照结束时间
        businesslicenseendtime: "",
        // 营业执照是否长期
        businesshours: "",
        // 资质图上传
        qualificationmapimg: [],
        // 身份证
        enterpriseplatformidentity: "",
        // 身份证正面
        identityposimg: "",
        // 身份证反面
        identitynegimg: "",
        // 一般纳税人资格上传
        taxpayerimg: [],
        // 入驻类型
        residencetype: "4"
      },

      // 基本信息验证
      rules: {
         address:[{required: true, message: "请输入公司注册地址", trigger: "blur" }],
        companyname: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          {
            min: 3,
            message: "公司名称名称最小为3个字符",
            trigger: "blur"
          }
        ],
        businesslicensenum: [
          { required: true, message: "请输入营业注册号", trigger: "blur" },
          { min: 5, message: "营业注册号最小为5个字符", trigger: "blur" }
        ],
        legalagent: [
          { required: true, message: "请输入法定代表人", trigger: "blur" },
          {
            min: 3,
            message: "法定代表人最小为3个字符",
            trigger: "blur"
          }
        ],
        establishmenttime: [
          {
            type: "string",
            required: true,
            message: "请选择成立日期",
            trigger: "change"
          }
        ],
        registeredcapital: [
          { required: true, message: "请输入注册资本", trigger: "blur" },
          { min: 1, message: "注册资本最小为1个字符", trigger: "blur" }
        ],
        businesshoursstart: [
          {
            type: "string",
            required: true,
            message: "请选择营业开始时间",
            trigger: "change"
          }
        ],
        businesshoursend: [
          {
            type: "string",
            required: true,
            message: "请选择营业结束时间",
            trigger: "change"
          }
        ],
        headenterprise: [
          { required: true, message: "请输入企业负责人", trigger: "blur" }
        ],
        enterprisephone: [
          {
            required: true,
            message: "请输入企业负责人手机号",
            trigger: "blur"
          },
          { min: 11, message: "手机号最小为11个字符", trigger: "blur" }
        ],

        businesslicenseaddr: [
          { required: true, message: "请输入营业照所在地", trigger: "blur" },
          { min: 2, message: "营业照所在地最小为2个字符", trigger: "blur" }
        ],
        businesscope: [
          { required: true, message: "请输入营业范围", trigger: "blur" },
          { min: 2, message: "营业范围最小为2个字符", trigger: "blur" }
        ],
        companyaddress: [
          { required: true, message: "请输入公司所在地", trigger: "blur" },
          { min: 2, message: "公司所在地最小为2个字符", trigger: "blur" }
        ],
        companydetailaddress: [
          { required: true, message: "请输入公司详细地址", trigger: "blur" },
          { min: 2, message: "公司详细地址最小为2个字符", trigger: "blur" }
        ],
        businesslicensestarttime: [
          {
            type: "string",
            required: true,
            message: "请输入有效期开始时间",
            trigger: "blur"
          }
        ],
        businesslicenseendtime: [
          {
            type: "string",
            required: true,
            message: "请输入有效期结束时间",
            trigger: "blur"
          }
        ],
        qualificationmapimg: [
          {
            required: true,
            message: "请上传资质图",
            trigger: "blur"
          }
        ],
        enterpriseplatformidentity: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          }
        ],
        identityposimg: [
          {
            required: true,
            message: "请上传身份证正面",
            trigger: "blur"
          }
        ],
        identitynegimg: [
          {
            required: true,
            message: "请上传身份证反面",
            trigger: "blur"
          }
        ],
        taxpayerimg: [
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
    ...mapActions("OriginalFactoryEntry", ["GetInsertBrandReview"]),
    // 平台入驻的确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.access_token = this.access_token;
          this.ruleForm.isbusinesslicenseend = this.checkboxChangeValue;
          this.ruleForm.businesshours = this.checkboxChangeValue2;
          this.ruleForm.review = "0";
          // // 对上传多张图片的处理
          let ret = this.ruleForm.qualificationmapimg instanceof Array;
          if (ret) {
            this.ruleForm.qualificationmapimg = this.ruleForm.qualificationmapimg.join(
              "@"
            );
          }
          let ret2 = this.ruleForm.taxpayerimg instanceof Array;
          if (ret2) {
            this.ruleForm.taxpayerimg = this.ruleForm.taxpayerimg.join("@");
          }

          this.GetInsertBrandReview(this.ruleForm)
            .then(res => {
              this.$message({
                type: "success",
                message: res
              });
              this.$router.push({
                path: "/OriginalFactoryEntry/WaitingAudit"
              });
            })
            .catch(err => {

              this.$message.error(err);
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
    successUpload1(response, file, fileList) {
      let ret = this.ruleForm.qualificationmapimg instanceof Array;
      if (ret) {
        this.ruleForm.qualificationmapimg.push(response.name);
      } else {
        this.ruleForm.qualificationmapimg = this.ruleForm.qualificationmapimg.split(
          "@"
        );
        this.ruleForm.qualificationmapimg.push(response.name);
      }

      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },

    // 身份证正面
    successUpload2(response) {
      this.ruleForm.identityposimg = response.name;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 身份证反面
    successUpload3(response) {
      this.ruleForm.identitynegimg = response.name;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 纳税资格人上传
    successUpload4(response) {
      let ret = this.ruleForm.taxpayerimg instanceof Array;
      if (ret) {
        this.ruleForm.taxpayerimg.push(response.name);
      } else {
        this.ruleForm.taxpayerimg = this.ruleForm.taxpayerimg.split("@");
        this.ruleForm.taxpayerimg.push(response.name);
      }
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    distpicker(x) {
      this.ruleForm.companyaddress = `${x.province.value}/${x.city.value}/${
        x.area.value
      }`;
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
  },
  mounted() {}
};
</script>

