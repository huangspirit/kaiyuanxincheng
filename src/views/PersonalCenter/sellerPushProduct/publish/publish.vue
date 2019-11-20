<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/PersonalCenter/sellerPushProduct">产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布产品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="publishWrap">
      <div class="publish">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="制造商：">
            <div>{{UserInforma.userTagMap.factoryName}}</div>
          </el-form-item>
          <el-form-item label="一级类目：" prop="first_id">
            <el-select
              v-model="selectedOneClass"
              filterable
              remote
              placeholder="请输入一级类目关键词"
              :remote-method="getOneClass"
              :loading="loading"
              :disabled="ruleForm.id?true:false"
            >
              <el-option
                v-for="(item,index) in oneClassList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级类目：" prop="parent_id">
            <el-select
              v-model="selectedTwoClass"
              filterable
              remote
              placeholder="请输入二级类目关键词"
              :remote-method="getTwoClass"
              :loading="loading"
                :disabled="ruleForm.id?true:false"
            >
              <el-option
                v-for="(item,index0) in twoClassList"
                :key="index0"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="titleDesc">
            <span>基本参数</span>
          </div>
          <el-form-item label="产品型号：" prop="productno">
            <el-input
              placeholder="输入型号并校验"
              v-model="ruleForm.productno"
              class="inputSearch"
              @keyup.enter.native="inputHandler"
              style="width:300px;"
              clearable
              @blur="inputHandler"
            >
              <el-button slot="append" @click="inputHandler" class="append">校验</el-button>
            </el-input>
            <i
              class="el-icon-check green mark"
              v-if="ruleForm.productno && isChecked==1"
              title="已校验"
            ></i>
            <i
              class="el-icon-close color mark"
              v-if="ruleForm.productno && isChecked==2"
              title="重复发布"
            ></i>
            <!-- <el-input v-model="ruleForm.productno" style="width:300px;"></el-input> -->
          </el-form-item>
          <el-form-item label="产品描述：" prop="productdesc">
            <el-input type="textarea" v-model="ruleForm.productdesc" style="width:400px;"></el-input>
          </el-form-item>
          <el-form-item label="基本单位：" prop="unit">
            <el-input v-model="ruleForm.unit"></el-input>
          </el-form-item>
          <el-form-item label="官方参考价格：" prop="price">
            <div class="flexitem">
              <el-input v-model="ruleForm.price" type="number">
                <template slot="prepend">{{priceunit?'$':'￥'}}</template>
                <!-- <el-select v-model="priceunit" slot="append" placeholder="请选择">
                <el-option label="人民币" :value="false"></el-option>
                <el-option label="美元" :value="true"></el-option>
                </el-select>-->
              </el-input>
              <p class="desc gray">&nbsp;该价格仅做用户参考，不影响实际成交；</p>
            </div>
          </el-form-item>
          <el-form-item label="标准包装量MPQ：" prop="mpq">
            <el-input v-model="ruleForm.mpq"></el-input>
          </el-form-item>
          <el-form-item label="数据手册：" prop="name">
            <el-upload
              class="upload-demo"
              :action="pdfUrl"
              :before-upload="beforeAvatarUploadpdf"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccesspdf"
              multiple
              :limit="1"
              :auto-upload="true"
              style="width:300px;"
            >
              <el-button size="small" type="primary">点击上传 PDF 文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="产品图片：" prop="delivery">
            <el-upload
              :action="imgUrl"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="upload-demo"
              ref="upload"
              :auto-upload="true"
              list-type="picture-card"
              :on-remove="handleRemoveimg"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :file-list="imglist"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</p>
          </el-form-item>
          <!-- <el-form-item label="零件状态：" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="在售Active"></el-radio>
              <el-radio label="样品期"></el-radio>
              <el-radio label="不推荐用于新的设计"></el-radio>
            </el-radio-group>
          </el-form-item>-->
          <el-form-item label="器件链接：" prop="link_url">
            <el-input
              v-model="ruleForm.link_url"
              placeholder="为了器件尽快通过审核，请提供厂商网址链接"
              style="width:400px;"
            ></el-input>
          </el-form-item>
          <div class="titleDesc" v-if="attributeList.length">
            <span>扩展属性</span>
          </div>
          <el-form-item :label="`${item.name}：`" v-for="item in attributeList" :key="item.id">
            <div class="flexitem">
              <el-input v-model="item.property_value" size="mini"></el-input>
              <!-- <i class="color el-icon-error"></i> -->
            </div>
          </el-form-item>
          <!-- <el-form-item label prop="name">
            <i class="el-icon-circle-plus-outline addbtn blu" @click="addAttr">添加属性</i>
            <div v-for="(item,index) in addAttrList" :key="index">
              <el-input v-model="ruleForm.name" placeholder="属性名" size="mini"></el-input>&nbsp;
              <el-input v-model="ruleForm.name" placeholder="参数值" size="mini"></el-input>
              <i class="color el-icon-error" @click="removeAddAttr(index)"></i>
            </div>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          </el-form-item>
          <el-form-item>
            <div class="desc blu">平台将在1~3个工作日完成审核</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :visible.sync="showBigImg" width="700px">
      <div style="text-align:center;line-height:500px;height:500px">
        <img
          :src="`${goodspictureURL}/${ruleForm.jy_image}`"
          alt
          style="max-height:100%;max-width:100%;"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { axios, sellerCenter } from "@/api/apiObj";
import { baseURL, goodspictureURL } from "@/config";
import { mapState } from "vuex";
export default {
  data() {
    return {
      pdflist: [],
      imglist: [],
      goodspictureURL: goodspictureURL,
      showBigImg: false,
      loading: false,
      isChecked: 0,
      ruleForm: {
        unit: "只"
      },
      getResetDetail: {},
      oneClassList: [],
      selectedOneClass: "",
      twoClassList: [],
      selectedTwoClass: "",
      priceunit: true,
      attributeList: [],
      addAttrList: [{}, {}],
      rules: {
        first_id: [
          {
            required: true,
            message: "请输入一级类目",
            trigger: "blur"
          }
        ],
        parent_id: [
          {
            required: true,
            message: "请输入二级类目",
            trigger: "blur"
          }
        ],
        productdesc: [
          { required: true, message: "请填写产品描述", trigger: "blur" }
        ],
        productno: [
          { required: true, message: "请填写产品型号", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    selectedOneClass(newval, old) {
      this.selectedTwoClass = "";
      this.ruleForm.first_id = newval;
      this.ruleForm.parent_id = "";
      if (newval) {
        this.getTwoClass();
      }
    },
    selectedTwoClass(newval, old) {
      this.ruleForm.parent_id = newval;
      this.attributeList = [];
      if (newval) {
        this.getAttr();
      }
    },
    "ruleForm.productno"() {
      this.isChecked = 0;
    }
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    pdfUrl() {
      return (
        baseURL +
        `api-g/gods-anon/uploadGoodsImageOrDatesheet?access_token=${this.access_token}&type=2`
      );
    },
    imgUrl() {
      return (
        baseURL +
        `api-g/gods-anon/uploadGoodsImageOrDatesheet?access_token=${this.access_token}&type=1`
      );
    },
    ...mapState({
      UserInforma: state => state.Login.UserInforma
    })
  },
  mounted() {
    this.ruleForm.brand = this.UserInforma.userTagMap.brand;
    this.ruleForm.branda = this.UserInforma.userTagMap.brand;
    if (this.$route.query.id) {
      this.getDetail(this.$route.query.id);
     
    }
    this.getOneClass();
    //  this.ruleForm.productno = this.UserInforma.userTagMap.branda;
  },
  methods: {
    getDetail(id) {
      axios
        .request({ ...sellerCenter.findGoodsBaseInfoById, params: { id: id } })
        .then(res => {
          this.getResetDetail = res.data;
          this.ruleForm = {
            productno: res.data.productno,
            productdesc: res.data.productdesc,
            unit: res.data.unit,
            price: res.data.referPrice,
            mpq: res.data.mpq,
            link_url: res.data.linkUrl?res.data.linkUrl:'',
            id: res.data.id,
            first_id:res.data.firstId,
            parent_id:res.data.classificationId,
            uid:res.data.uid
          };
          this.selectedOneClass=Number(res.data.firstId);
          this.selectedTwoClass=res.data.classificationId;
          this.imglist = [{ url: res.data.imageUrl }]
          this.getTwoClass();
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.id) {
            //更新
          
            if (this.ruleForm.productno != this.getResetDetail.productno && !this.isChecked) {
              this.$message({
                message: "您发布的产品未校验或者校验不通过",
                type: "warning"
              });
              return;
            }
            let obj=this.ruleForm;
            delete obj.first_id;
            delete obj.parent_id
           
            let arr =this.attributeList.map(item=>{
              return {
                uid:item.uid,
                property_value:item.property_value,
                id:item.id
              }
            })
               console.log(obj)
            console.log(arr)
            axios.request({...sellerCenter.updateGoodsBaseInfo,data:obj,method:"post",emulateJSON:true}).then(res=>{
              if(res.resultCode==200){
                axios.request({...sellerCenter.updateGoodsExinfo,data:arr,method:"post",emulateJSON:true}).then(res=>{
                  if(res.resultCode==200){
                    this.$router.go(-1)
                  }
                })
              }
            })

          } else {
            //新增
            if (!this.isChecked) {
              this.$message({
                message: "您发布的产品未校验或者校验不通过",
                type: "warning"
              });
              return;
            }
            axios
              .request({
                ...sellerCenter.saveGoodsBaseInfo,
                data: this.ruleForm,
                method: "post"
              })
              .then(res => {
                this.saveAttr(res.data);
              });
          }
        } else {
          return false;
        }
      });
    },
    inputHandler() {
      if (!this.ruleForm.parent_id) {
        this.$message({
          message: "请选择类目",
          type: "warning"
        });
        return;
      }
      if (this.ruleForm.productno) {
        let obj = {
          goodsName: this.ruleForm.productno,
          catergory_id: this.ruleForm.parent_id, //二级类的id
          brandId: this.ruleForm.brand
        };

        axios
          .request({ ...sellerCenter.searchDisrictGoods, params: obj })
          .then(res => {
            if (res.resultCode == 200) {
              this.isChecked = 1;
            } else {
              this.isChecked = 2;
              this.$message({
                message: "当前类目下产品型号已被发布",
                type: "warning"
              });
            }
          });
      }
    },
    getOneClass(query) {
      this.loading = true;
      let obj = {
        start: 0,
        length: 10,
        parent_id: 0
      };
      if (query) {
        obj.name = query;
      }
      axios
        .request({ ...sellerCenter.queryCatergory, params: obj })
        .then(res => {
          this.loading = false;
          this.oneClassList = res.data.data;
        });
    },
    getTwoClass(query) {
      if (!this.selectedOneClass) {
        this.$message({
          message: "请先选择一级类目",
          type: "warning"
        });
        return;
      }
      let obj = {
        start: 0,
        length: 10,
        parent_id: this.selectedOneClass
      };
      if (query) {
        obj.name = query;
      }
      this.loading = true;
      axios
        .request({ ...sellerCenter.queryCatergory, params: obj })
        .then(res => {
          this.loading = false;
          this.twoClassList = res.data.data;
          this.selectedTwoClass = this.getResetDetail.classificationId;
        });
    },
    getAttr() {
      let obj = {
        start: 0,
        length: 30,
        catergory_id: this.selectedTwoClass
      };
      axios
        .request({ ...sellerCenter.queryExproperty, params: obj })
        .then(res => {
          if (this.$route.query.id) {
            this.attributeList = this.getResetDetail.list.map(item => {
              return {
                name: item.name,
                property_value: item.value,
                uid:item.uid,
                id:item.id
              };
            });
          } else {
            this.attributeList = res.data.map(item => {
              return {
                name: item.name,
                property_id: item.id,
                property_value: "",
                parent_id: this.selectedTwoClass,
                brand_id: this.ruleForm.brand
              };
            });
          }
        });
    },
    saveAttr(goodsId) {
      let arr = [];
      arr = this.attributeList.map(item => {
        delete item.name;
        return { ...item, goods_id: goodsId };
      });
      axios
        .request({
          ...sellerCenter.saveBatchGoodsExinfo,
          data: arr,
          method: "post"
        })
        .then(res => {
          console.log(res);
          this.$router.push({
            path: "/PersonalCenter/sellerPushProduct"
          });
        });
      console.log(arr);
    },
    beforeAvatarUploadpdf(file) {
      const isPdf = file.type == "application/pdf";
      if (!isPdf) {
        this.$message.error("只能上传pdf格式的文档!");
      }
      return isPdf;
    },
    handleRemove() {
      this.ruleForm.jy_sheet = "";
    },
    handleAvatarSuccesspdf(res) {
      this.ruleForm.jy_sheet = res.data;
    },
    handleAvatarSuccess(res) {
      this.ruleForm.jy_image = res.data;
    },
    beforeAvatarUpload(file) {
      const isIMG = file.type == "image/jpeg" || file.type == "image/png";
      if (!isIMG) {
        this.$message.error("只能上传jpg或者png格式的图片!");
      }
      return isIMG;
    },
    handleRemoveimg() {
      this.ruleForm.jy_image = "";
    },
    handlePictureCardPreview() {
      this.showBigImg = true;
    },
    addAttr() {
      this.addAttrList.push({});
    },
    removeAddAttr(index) {
      this.addAttrList.splice(index, 1);
    }
  }
};
</script>
<style lang="less" scoped>
.publishWrap {
  .publish {
    padding: 70px;
    width: 1000px;
    margin: 0px auto;
    border: 1px solid #e3e3e3;
    background: #fff;
    color: #333;
    .el-form {
      .mark {
        margin-left: 15px;
        font-size: 30px;
        font-weight: bold;
      }
      .flexitem {
        display: flex;
        align-items: center;
      }
      .titleDesc {
        border-bottom: 2px solid #666;
        margin-bottom: 20px;
        padding-bottom: 10px;
        span {
          margin-right: 50px;
          font-size: 18px;
        }
      }
      .el-icon-error {
        font-size: 20px;
        margin-left: 10px;
        cursor: pointer;
      }
      .addbtn {
        cursor: pointer;
      }
      /deep/.el-form-item {
        margin-left: 70px;
        .el-input {
          width: auto;
        }
        // .el-input__inner {
        //   width: auto;
        // }
        // .el-input-group__append {
        //   width: 50px;
        // }
      }
    }
  }
}
</style>