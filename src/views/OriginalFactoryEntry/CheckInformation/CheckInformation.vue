<template>
  <div>
    <!-- 入驻信息 -->
    <div class="CheckInformation allWidth">
      <div class="CheckInformation-con">
          <div class="tit">
              <div class="wrap">
                  <div class="text">商家入驻</div>
                  <div class="ShoppingCart-steps">
                      <el-steps :active="this.$store.state.OriginalFactoryEntry.active" align-center finish-status="success">
                          <el-step title="基本信息" description></el-step>
                          <el-step title="详细信息"></el-step>
                          <el-step title="等待审核"></el-step>
                          <el-step title="入驻成功"></el-step>
                      </el-steps>
                  </div>
              </div>
          </div>
        <div v-if="$route.query.residencetype != '3'">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="270px"
            class="demo-ruleForm"
          >
            <h3 class="tit-h3">企业基本信息  <strong style="font-size:12px;">(国内原厂或国外原厂指定国内运营代理商填写)</strong></h3>
            <el-form-item label="统一社会信用代码：">
              <div class="recode">
                <el-input
                  v-model="ruleForm.creditcode"
                  type="text"
                  @input="handleInput"
                  maxlength="18"
                  show-word-limit
                  placeholder="请输入18位统一社会信用代码，点击查询可获取企业相关信息"
                ></el-input>
                <el-button v-if="showRequireBtn" @click="getCompanyInfo" type="primary">获取企业信息</el-button>
              </div>
              <p class="small">请严格按照营业执照填写统一社会信用代码</p>
            </el-form-item>

            <el-form-item label="公司注册名称：" prop="companyname">
              <el-input v-model="ruleForm.companyname"></el-input>
              <p class="small">请按照营业执照上登记的完整名称填写</p>
            </el-form-item>
            <!-- <el-form-item label="工商营业执照注册号：" prop="businesslicensenum">
              <el-input v-model="ruleForm.businesslicensenum"></el-input>
            </el-form-item> -->
            <el-form-item label="法定代表人：" prop="legalagent">
              <el-input v-model="ruleForm.legalagent"></el-input>
              <p class="small">确保与营业执照一致</p>
            </el-form-item>
            <el-form-item label="公司成立日期：" prop="establishmenttime">
              <el-date-picker
                v-model="ruleForm.establishmenttime"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="注册资本：" prop="registeredcapital">
              <el-input v-model="ruleForm.registeredcapital"></el-input>
              <p class="small">若注册资本非人民币，请按照当前汇率换算人民币填写</p>
            </el-form-item>
            <el-form-item label="公司注册地址：" prop="companydetailaddress">
              <el-input v-model="ruleForm.companydetailaddress"></el-input>
              <p class="small">填写与营业执照一致的地址</p>
            </el-form-item>
             <el-form-item label="企业网站：" prop="website">
              <el-input v-model="ruleForm.website"></el-input>
          
            </el-form-item>
             <el-form-item label="经营产品：" prop="product">
              <el-input v-model="ruleForm.product" type="textarea"></el-input>
            </el-form-item>
            <h3 class="tit-h3">企业资质上传</h3>
            <div class="form2-item">
              <div class="title-up">
                <h3>
                  <span>*</span>
                  企业营业执照
                </h3>
                <p class="small">最新版营业执照,需加盖公司红章</p>
              </div>
              <div class="form-item-con">
                <el-form-item label="有效期：" prop="businesslicensestarttime">
                  <el-date-picker
                    v-model="ruleForm.businesslicensestarttime"
                    type="date"
                    placeholder="开始日期"
                    style="margin-right:10px"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                  <span>至</span>
                  <el-date-picker
                    v-model="ruleForm.businesslicenseendtime"
                    type="date"
                    style="margin-left:10px"
                    placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="营业执照图上传：" prop="qualificationmapimg" class="qualificationmapimg qualificationmapimgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload1"
                    :on-preview="handlePictureCardPreview"
                    :file-list="qualificationmapList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
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
                 请上传平台运营者身份证信息！
                </h3>
              </div>
              <div class="form-item-con">
                <el-form-item label="身份证号：" prop="enterpriseplatformidentity">
                  <el-input v-model="ruleForm.enterpriseplatformidentity" maxlength="18"
                  show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="上传身份证正面照片：" prop="identityposimg" class="qualificationmapimgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload2"
                    :on-preview="handlePictureCardPreview"
                    :file-list="identityposList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(zheng)">
                    <img :src="zheng" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
                <el-form-item label="上传身份证反面照片：" prop="identitynegimg" class="qualificationmapimgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload3"
                    :on-preview="handlePictureCardPreview"
                    :file-list="identitynegList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>

                  <span class="example-diagram" @click="PrvExampleDiagram(fan)">
                    <img :src="fan" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
                 <el-form-item label="上传手持身份证正面照片：" prop="handimage" class="qualificationmapimgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload5"
                    :on-preview="handlePictureCardPreview"
                    :file-list="handimageList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(identityExam)">
                    <img :src="identityExam" alt />
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
                <p class="small">1.一般纳税人证明</p>
                <p class="small">2.提供近三个月内开票方为公司开具的增值税发票一张</p>
                <p class="small">3.上述条件至少上传一项</p>
              </div>
              <div class="form-item-con">
                <el-form-item label="资质图上传：" prop="taxpayerimg" class="qualificationmapimgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload4"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemovetaxpayerimg"
                    :file-list="taxpayerimgList"
                    :limit="limitNum"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>

            <div class="form2-item" v-if="AgentListFlag">
              <h3 class="tit-h3">商标证书或授权资质上传</h3>
              <div class="title-up">
                <h3>
                  <span>*</span>
                  资质类型
                </h3>
                <p class="small">1.品牌商给贵司的授权代理证书、代理协议均可；</p>
                <p class="small">2.品牌商官方网站的截图，请务必将地址栏截图进去；</p>
                <p class="small">3.经营自有品牌请上传国内的商标注册证书；</p>
                <p class="small">以上两项提供任一文件即可！</p>
              </div>
              <div class="form-item-con Agent-con">
                <ul>
                  <li v-for="(item,index) in AgentList" :key="index">
                    <p class="brandName">
                      品牌：
                      <span>{{item.brandName}}</span>
                    </p>
                    <el-form-item label="有效期：" prop="businesslicensestarttime">
                      <el-date-picker
                        v-model="item.qualificationstarttime"
                        type="date"
                        placeholder="开始日期"
                        style="margin-right:100px"
                        value-format="yyyy/MM/dd"
                        format="yyyy/MM/dd"
                      ></el-date-picker>
                      <el-date-picker
                        v-model="item.qualificationendtime"
                        type="date"
                        placeholder="结束日期"
                        value-format="yyyy/MM/dd"
                        format="yyyy/MM/dd"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="资质图上传：" prop="qualification" class="qualificationmapimgwrap">
                    
                      <el-upload
                        class="upload-demo"
                        ref="upload"
                        :action="url"
                        :auto-upload="true"
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload"
                        :on-success="(res,file,fileList)=>{return successUploadAgency(res,file,fileList,index)}"
                        :on-preview="handlePictureCardPreview"
                        :file-list="item.qualificationimgList"
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
        </div>
        <div v-if="$route.query.residencetype == '3'">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="270px"
            class="demo-ruleForm"
          >
            <div class="form-item-con">
              <el-form-item label="身份证号：" prop="enterpriseplatformidentity">
                <el-input v-model="ruleForm.enterpriseplatformidentity"  maxlength="18"
                  show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="上传身份证正面照片：" prop="identityposimg" class="qualificationmapimgwrap">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="url"
                  :auto-upload="true"
                  list-type="picture-card"
                  :before-upload="beforeAvatarUpload"
                  :on-success="successUpload2"
                  :on-preview="handlePictureCardPreview"
                  :file-list="identityposList"
                  :limit="1"
                >
                  <i class="el-icon-plus"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                  >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                </el-upload>
                <span class="example-diagram" @click="PrvExampleDiagram(zheng)">
                  <img :src="zheng" alt />
                  <span>示例图</span>
                </span>
              </el-form-item>
              <el-form-item label="上传身份证反面照片：" prop="identitynegimg" class="qualificationmapimgwrap">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="url"
                  :auto-upload="true"
                  list-type="picture-card"
                  :before-upload="beforeAvatarUpload"
                  :on-success="successUpload3"
                  :on-preview="handlePictureCardPreview"
                  :file-list="identitynegList"
                  :limit="1"

                >
                  <i class="el-icon-plus"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                  >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                </el-upload>

                <span class="example-diagram" @click="PrvExampleDiagram(fan)">
                  <img :src="fan" alt />
                  <span>示例图</span>
                </span>
              </el-form-item>
                  <el-form-item label="上传手持身份证正面照片：" prop="handimage" class="qualificationmapimgwrap">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="url"
                  :auto-upload="true"
                  list-type="picture-card"
                  :before-upload="beforeAvatarUpload"
                  :on-success="successUpload5"
                  :on-preview="handlePictureCardPreview"
                  :file-list="handimageList"
                  :limit="1"

                >
                  <i class="el-icon-plus"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                  >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                </el-upload>

                <span class="example-diagram" @click="PrvExampleDiagram(identityExam)">
                  <img :src="identityExam" alt />
                  <span>示例图</span>
                </span>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span class="dialog-footer">
          <span class="sure bgColor" @click="submitForm('ruleForm')">
            <img src="@/assets/image/OriginalFactoryEntry/u44984.png" alt />
            确认提交
          </span>
          <span @click="back" class="back sure">
            <img src="@/assets/image/OriginalFactoryEntry/u197292.png" alt />
            返回上一步
          </span>
        </span>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less">
.recode {
  .el-input__suffix {
    .el-input__count-inner {
      background: none;
    }
  }
}
</style>
<style lang="less" scoped>
@import "./CheckInformation.less";
</style>

<script>
// import "@/assets/css/ele-form.less";
// import "@/assets/css/label-checkbox.less";
import { baseURL,baseURL4 } from "@/config";
import { mapState, mapActions, mapMutations } from "vuex";
import { formatDateTime } from "@/lib/utils";
import VDistpicker from "v-distpicker";
import { axios, FactoryEntry } from "../../../api/apiObj";
export default {
  name: "UpgradeLevel",
  data() {
    return {
      count: 0,
      showRequireBtn: false,
      AgentListFlag: false,
      // 资质图的数量
      limitNum: 1,
      checkboxChangeValue: false,
      checkboxChangeValue2: false,
      dialogImageUrl: "",
      // 示例图
      exampleDiagram: require("@/assets/image/OriginalFactoryEntry/u85165.jpg"),
      identityExam: require("@/assets/image/OriginalFactoryEntry/timg.jpg"),
      zheng: require("@/assets/image/OriginalFactoryEntry/zheng.jpg"),
      fan: require("@/assets/image/OriginalFactoryEntry/fan.jpg"),
      // 预览图片
      dialogVisible: false,
      // 代理商的上传图片
      AgentList: [],
      //营业执照图片回显
      qualificationmapList: [],
      identityposList: [],
      identitynegList: [],
      taxpayerList: [],
      handimageList:[],
      taxpayerimgList:[],
      // 基本信息
      ruleForm: {
        // 信用代码
        creditcode: "",
        // 公司注册名称
        companyname: "",
        // 工商营业执照注册号
       // businesslicensenum: "",
        // 法定代表人
        legalagent: "",
        // 公司成立时间
        establishmenttime: "",
        // 注册资本
        registeredcapital: "",
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
        // 营业执照上传
        qualificationmapimg:"",
        // 身份证
        enterpriseplatformidentity: "",
        // 身份证正面
        identityposimg: "",
        // 身份证反面
        identitynegimg: "",
        // 一般纳税人资格上传
        taxpayerimg: "",
        // 代理资质图的数组
        qualification: [],
        // 代理资质时间
        qualificationtime: []
      },

      // 基本信息验证
      rules: {
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
        companydetailaddress: [
          { required: true, message: "请选择公司注册地址", trigger: "blur" }
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
            required: true,
            message: "请输入有效期开始时间",
            trigger: "blur"
          }
        ],
        businesslicenseendtime: [
          {
            required: true,
            message: "请输入有效期结束时间",
            trigger: "blur"
          }
        ],
        qualificationmapimg: [
          {
            required: true,
            message: "请上传营业执照",
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
            message: "请上传手持身份证正面",
            trigger: "blur"
          }
        ],
        identitynegimg: [
          {
            required: true,
            message: "请上传手持身份证反面",
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
        `api-b/vipApply/uploadPicture?access_token=${this.access_token}&fileSource=QINIUYUN&type=5&id=1`
      );
    },
    ...mapState("OriginalFactoryEntry", ["joinForm", "applyDetailEdit"])
  },
   created() {
    if (!this.joinForm.residencetype) {
      this.$router.push({ path: "/OriginalFactoryEntry" })
    }
  },
  mounted() {
    if (this.joinForm.residencetype == 3 || this.joinForm.residencetype == 18) {
      this.AgentListFlag = false;
    } else {
      this.AgentListFlag = true;
    }
    if(this.joinForm.id){
        this.qualificationmapList.push({url:baseURL4+this.joinForm.qualificationmapimg})
        this.identityposList.push({url:baseURL4+this.joinForm.identityposimg})
        this.identitynegList.push({url:baseURL4+this.joinForm.identitynegimg})
        this.handimageList.push({url:baseURL4+this.joinForm.handimage})
        if(this.joinForm.taxpayerimg){
          let arr=this.joinForm.taxpayerimg.split('@');
          this.taxpayerimgList=arr.map(item=>{
            return {url:baseURL4+item}
          })
        }
        // if(this.joinForm.brandIds){
        //   let brandTime=this.joinForm.qualificationtime.split("@")
        //   this.joinForm.brandName.forEach((item, index) => {
        //     let obj = {}
        //     if(this.joinForm. brand){
        //       obj={
        //         brandName: item,
        //         brand:this.joinForm.brandIds.split("@")[index],
        //         qualificationendtime: brandTime[index].split("-")[1],
        //         qualificationstarttime: brandTime[index].split("-")[0],
        //         qualificationimgList:[{url:baseURL4+this.joinForm.qualification.split('@')[index]}],
        //         imageUrl:this.joinForm.qualification.split("@")[index]
        //       };
        //     }else{
        //       obj = {
        //       brandName: item,
        //       brand:this.joinForm.brandIds.split("@")[index],
        //     };
        //     }
        //     this.AgentList.push(obj);
        //   });
        // }
        
    }
    
    this.ruleForm = { ...this.ruleForm, ...this.joinForm };
    this.AgentList=this.ruleForm.EndselectBrandList.map((item)=>{
      if(item.brandTime){
        return {
                brandName: item.brand,
                brand:item.id,
                qualificationendtime: item.brandTime.split("-")[1],
                qualificationstarttime: item.brandTime.split("-")[0],
                qualificationimgList:[{url:baseURL4+item.brandImg}],
                imageUrl:item.brandImg
        }
      }else{
        return {
                brandName: item.brand,
                brand:item.id,
        }
      }
    })
    this.limitNum = this.ruleForm.brandName.length;
   
    //过滤掉新增的品牌
    // var index = this.AgentList.findIndex(
    //   item => item.brand === this.$route.query.newBrand
    // );
    // var index0 = this.AgentList.findIndex(
    //   item => item.brand === this.$route.query.newBrand
    // );
    // var newArr = [];
    // this.AgentList.forEach((item, index) => {
    //   if (index0 == index) {
    //     //过滤掉新增的品牌的id
    //     var oldbrand = this.joinForm.brand.split("@");
    //     oldbrand.splice(index, 1);
    //     this.joinForm.brand = oldbrand.join("@");
    //   } else {
    //     newArr.push(item);
    //   }
    // });
    // this.AgentList = newArr;
    // this.AgentList.map(item => {
    //   item["brandmapList"] = [];
    // });
    // this.ruleForm.brandName = this.AgentList.map(item => item.brand);
  },
  methods: {
    ...mapActions("OriginalFactoryEntry", ["GetInsertBrandReview"]),
    ...mapMutations("OriginalFactoryEntry", ["setJoinForm"]),
    handleInput() {
      let obj = this.ruleForm.creditcode;
      obj = obj.replace(/[\W]/g, "").toUpperCase();
      this.$set(this.ruleForm, "creditcode", obj);
      if (obj.length >= 18) {
        if (this.count < 1) {
          this.showRequireBtn = true;
        } else {
          this.showSetForm = true;
        }
      }
    },
    getCompanyInfo() {
      let creditcode = this.ruleForm.creditcode;
      axios
        .request({
          ...FactoryEntry.queryCompnayInfo,
          params: {
            creditNo: this.ruleForm.creditcode
          }
        })
        .then(res => {
          if (res.data) {
            this.ruleForm.creditcode = creditcode;
            this.ruleForm.companyname = res.data.companyName;
            this.ruleForm.businesslicensenum = res.data.no;
            this.ruleForm.legalagent = res.data.operName;
            this.ruleForm.establishmenttime = res.data.startDate;
            this.ruleForm.registeredcapital = res.data.registCapi;
            this.ruleForm.companydetailaddress = res.data.address;
            this.ruleForm.businesslicensestarttime = res.data.tremsStart;
            this.ruleForm.businesslicenseendtime = res.data.termsEnd;
          }
          this.count++;
          this.showRequireBtn = false;
        });
    },
    // 平台入驻的确定
    submitForm(formName) {
      console.log(this.taxpayerimgList)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.access_token=this.access_token;
          this.ruleForm.isbusinesslicenseend = this.checkboxChangeValue;
          this.ruleForm.businesshours = this.checkboxChangeValue2;
          this.ruleForm.review = "0";
          //品牌的处理
          if(this.AgentList && this.AgentList.length){
            let brand={}
            this.AgentList.forEach((item, index) => {
            if(index==0){
              brand.qualification=item.imageUrl
              brand.brand=item.brand;
              brand.qualificationtime=item.qualificationstarttime + "-" + item.qualificationendtime;
              }else if(index>0){
                brand.qualification=brand.qualification+"@"+item.imageUrl
                brand.brand=brand.brand+"@"+item.brand
                brand.qualificationtime= brand.qualificationtime+"@"+item.qualificationstarttime + "-" + item.qualificationendtime;
              }
            });
            this.ruleForm={...this.ruleForm,...brand}
          }
          
        
          // 对上传多张图片的处理
          // let ret = this.ruleForm.qualificationmapimg instanceof Array;
          // if (ret) {
          //   this.ruleForm.qualificationmapimg = this.ruleForm.qualificationmapimg.join(
          //     "@"
          //   );
          // }
          // let ret2 = this.ruleForm.taxpayerimg instanceof Array;
          // if (ret2) {
          //   this.ruleForm.taxpayerimg = this.ruleForm.taxpayerimg.join("@");
          // }
          
          // let ret3 = this.ruleForm.qualification instanceof Array;
          // if (ret3) {
          //   this.ruleForm.qualification = this.ruleForm.qualification.join("@");
          // }
          // let brandImageUrlList=this.AgentList.map(item=>{
          //   return item.imageUrl
          // })
          // if(brandImageUrlList.length>0){
          //   this.ruleForm.qualification = brandImageUrlList.join("@");
          // }
          // let ret4 = this.ruleForm.qualificationtime instanceof Array;
          // if (ret4) {
          //   this.ruleForm.qualificationtime = this.ruleForm.qualificationtime.join(
          //     "@"
          //   );
          // }
          // if (this.applyDetailEdit.id) {
          //   this.ruleForm["id"] = this.applyDetailEdit.id;
          // }
        
          if(!this.AgentListFlag && this.ruleForm.residencetype==3){
            delete this.ruleForm.brand;
          }
          if(this.ruleForm.residencetype==3 || this.ruleForm.residencetype==18){
            delete this.ruleForm.qualificationtime;
            delete this.ruleForm.qualification;
          }
          delete this.ruleForm.brandIds;
          delete this.ruleForm.brandName;
          delete this.ruleForm.EndselectBrandList;
          delete this.ruleForm.businesslicensenum;
          console.log(this.ruleForm)
          this.GetInsertBrandReview(this.ruleForm)
            .then(res => {
              this.setJoinForm({});
              localStorage.removeItem("joinForm");
              this.$router.push({
                path: "/OriginalFactoryEntry/WaitingAudit"
              });
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          this.$message.error("请完善信息!");
          return false;
        }
      });
    },

    // 上传之前图片的大小
    beforeAvatarUpload(file) {
      // const isLt2M = file.size / 1024 / 1024 < 1;
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 1MB!");
      // }
      // return isLt2M;
    },
    // 资质上传图
    successUpload1(response, file, fileList) {
      // let ret = this.ruleForm.qualificationmapimg instanceof Array;
      // if (ret) {
      //   this.ruleForm.qualificationmapimg.push(response.data);
      // } else {
      //   this.ruleForm.qualificationmapimg = this.ruleForm.qualificationmapimg.split(
      //     "@"
      //   );
      //   this.ruleForm.qualificationmapimg.push(response.data);
      // }
      this.ruleForm.qualificationmapimg=response.data
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    onChangeAgency(res,){
     console.log(res)
    },
    changeFile(r,e,s){
      console.log(r,e,s)
    },
    // 代理商资质图上传成功
    successUploadAgency(response, file, fileList,index) {
      console.log(this.AgentList)
      this.AgentList[index].imageUrl=response.data;
      // let ret = this.ruleForm.qualification instanceof Array;
      // if (ret) {
      //   this.ruleForm.qualification.push(response.data);
      // } else {
      //   this.ruleForm.qualification = this.ruleForm.qualification.split("@");
      //   this.ruleForm.qualification.push(response.data);
      // }
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 身份证正面
    successUpload2(response) {
      this.ruleForm.identityposimg = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 身份证反面
    successUpload3(response) {
      this.ruleForm.identitynegimg = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    successUpload5(response) {
      this.ruleForm.handimage = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    handleRemovetaxpayerimg(file,fileList){
      let arr = this.ruleForm.taxpayerimg.split("@")
      arr.splice(arr.findIndex(item => baseURL4+item==file.url), 1)
      this.ruleForm.taxpayerimg=arr.join("@")
    },
    // 纳税资格人上传
    successUpload4(response,file, fileList) {
      if(this.ruleForm.taxpayerimg){
        this.ruleForm.taxpayerimg=this.ruleForm.taxpayerimg+"@"+response.data
      }else{
        this.ruleForm.taxpayerimg=response.data
      }
      // let ret = this.ruleForm.taxpayerimg instanceof Array;
      // if (ret) {
      //   this.ruleForm.taxpayerimg.push(response.data);
      // } else {
      //   this.ruleForm.taxpayerimg = this.ruleForm.taxpayerimg.split("@");
      //   this.ruleForm.taxpayerimg.push(response.data);
      // }
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    distpicker(x) {
      console.log("x:", x);
      this.ruleForm.companyaddress = `${x.province.value}/${x.city.value}/${x.area.value}`;
    },
    back() {
      this.$router.go(-1);
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
    }
  },
 
};
</script>

