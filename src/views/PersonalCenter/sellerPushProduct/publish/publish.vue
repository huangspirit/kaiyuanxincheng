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
            <div>Analog Devidle segrgrr</div>
          </el-form-item>
          <el-form-item label="一级类目：" prop="region">
            <el-select
              v-model="value"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入一级类目关键词"
              :remote-method="getOneClass"
              :loading="loading"
            
            >
              <el-option
                v-for="item in oneClassList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级类目：" prop="region">
            <el-select
              v-model="value"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入一级类目关键词"
              :remote-method="getTwoClass"
              :loading="loading"
            >
              <el-option
                v-for="item in twoClassList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="titleDesc">
            <span>基本参数</span>
          </div>
          <el-form-item label="产品型号：" prop="name">
            <el-input v-model="ruleForm.name" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="产品描述：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" style="width:400px;"></el-input>
          </el-form-item>
          <el-form-item label="基本单位：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="官方参考价格：" prop="name">
            <el-input v-model="ruleForm.name">
              <template slot="prepend">{{priceunit?'$':'￥'}}</template>
              <el-select v-model="priceunit" slot="append" placeholder="请选择">
                <el-option label="人民币" :value="false"></el-option>
                <el-option label="美元" :value="true"></el-option>
              </el-select>
            </el-input>
            <p class="desc">该价格仅做用户参考，不影响实际成交；</p>
          </el-form-item>
          <el-form-item label="标准包装量MPQ：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="封装：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="数据手册：" prop="name">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传 PDF 文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="产品图片：" prop="delivery">
            <el-upload
              :action="url"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="upload-demo"
              ref="upload"
              :auto-upload="true"
              list-type="picture-card"
              :on-remove="handleRemoveimg"
              :on-preview="handlePictureCardPreview"
              :file-list="imglist"
              multiple
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</p>
          </el-form-item>
          <el-form-item label="零件状态：" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="在售Active"></el-radio>
              <el-radio label="样品期"></el-radio>
              <el-radio label="不推荐用于新的设计"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="器件链接：" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="为了器件尽快通过审核，请提供厂商网址链接"
              style="width:400px;"
            ></el-input>
          </el-form-item>
          <div class="titleDesc">
            <span>扩展属性</span>
          </div>
          <el-form-item :label="`${item}：`" prop="name" v-for="item in attributeList" :key="item">
            <div class="flexitem">
              <el-input v-model="ruleForm.name" size="mini"></el-input>
              <i class="color el-icon-error"></i>
            </div>
          </el-form-item>
          <el-form-item label prop="name">
            <i class="el-icon-circle-plus-outline addbtn blu" @click="addAttr">添加属性</i>
            <div v-for="(item,index) in addAttrList" :key="index">
              <el-input v-model="ruleForm.name" placeholder="属性名" size="mini"></el-input>&nbsp;
              <el-input v-model="ruleForm.name" placeholder="参数值" size="mini"></el-input>
              <i class="color el-icon-error" @click="removeAddAttr(index)"></i>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          </el-form-item>
          <div class="desc blu">平台将在1~3个工作日完成审核</div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {},
      oneClassList:[],
      twoClassList:[],
      priceunit: true,
      attributeList: ["系列", "封装", "包装形式"],
      addAttrList: [{}, {}],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getOneClass(query){
        console.log("getoneClass")
         if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
    },
    getTwoClass(query){
          console.log("getTwoClass")
           if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
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
        .el-input-group__append {
          width: 50px;
        }
      }
    }
  }
}
</style>