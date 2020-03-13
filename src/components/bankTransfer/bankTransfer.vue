<template>
  <div>
    <el-dialog
      title="对公付款凭证上传"
      :visible.sync="centerDialogVisible"
      width="750px"
      center
      class="dialog"
      top="5vh"
    >
      <div class="wrap">
        <!-- <p class="color tit">感谢您选择公对公转账付款</p> -->
        <div class="kuang">
          当前应付金额为：
            <strong style="font-size:20px">￥{{bankTransferObj.money | toFixed(2)}}</strong>
        </div>
        <div>您的专属收款账号如下：</div>
        <div class="kuang">
          <p>公司名称：北京晶圆电子有限公司</p>
          <p>银行账号：110 906 335 410 201</p>
          <p>开户银行：招商银行北京上地支行</p>
        </div>
        <div
          class="desc color"
          v-if="bankTransferObj.time"
        >重点提示：请务必于{{bankTransferObj.time | formatDate}}前完成汇款，否则将视为自动放弃当前订单！</div>
        <el-form label-width="120px" :rules="rules" ref="ruleForm" :model="ruleForm">
          <el-form-item label="转账凭证:">
            <!-- <el-input v-model="bankPayNumber" placeholder="请仔细填写银行汇款编号" type="text"></el-input> -->
            <el-upload
              class="upload-demo"
              ref="upload0"
              :data="ruleForm"
              :limit="1"
              :action="bankTransferObj.url"
              :auto-upload="false"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handlechange"
            >
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">图片尺寸请确保800px*800px以上，文件大小限制为2MB以内，支持png、jpg、gif格式</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="付款公司：" prop="payCompany">
            <el-input v-model="ruleForm.payCompany"></el-input>
          </el-form-item>
           <div style="display:flex;">
          <el-form-item label="开户行：" prop="customerBank">
            <el-select
              v-model="ruleForm.customerBank"
              filterable
              allow-create
              default-first-option
              placeholder="请选择银行"
            >
              <el-option
                v-for="item in bandlist"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
         
          </el-form-item>
         
 <!-- <el-form-item label="转账金额：" prop="transMoney">
            <el-input v-model="ruleForm.transMoney"></el-input>
            <div
              class="desc color"
              v-if="ruleForm.transMoney && ruleForm.transMoney!=bankTransferObj.money"
              style="text-align:left;"
            >您输入的转账金额和应付金额不相等</div>
          </el-form-item> -->
          </div>
         
        </el-form>
        <div class="desc">1、上传完成后，请点击’确定‘即可！</div>
        <div class="desc">2、平台将进行到账审核，审核结果将以平台内消息、短信和微信通知您，请及时查看！</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitBank('upload0')" :disabled="!hasSelectImg">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    bankTransferObj: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isdisable:true,
      centerDialogVisible: true,
      dialogVisible: false,
      dialogImageUrl: "",
      disabled: false,
      ruleForm: {
        payCompany:this.bankTransferObj.danweiName
      },
      bandlist:["中国工商银行","中国农业银行","中国银行","中国建设银行","招商银行","中国民生银行","交通银行","中国光大银行"],
      rules: {
        payCompany: [
          { required: true, message: "请输入付款公司名称", trigger: "blur" }
        ],
        customerBank: [
          { required: true, message: "请输入转账银行", trigger: "blur" }
        ],
        // transMoney: [
        //   { required: true, message: "请输入付款金额", trigger: "blur" }
        // ]
      },
      hasSelectImg: false
    };
  },
  mounted() {
    this.centerDialogVisible = true;
  },
  watch: {
    centerDialogVisible(val) {
      if (!val) {
        this.close();
      }
    }
  },
  methods: {
    close() {
      this.$emit("closeBankTransfer");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file) {
      this.hasSelectImg = false;
    },
    handlechange(file, filelist) {
      this.hasSelectImg = true;
    },
    handleAvatarSuccess(res, file) {
      if (res.resultCode == "200") {
        this.$message({
          type: "success",
          message: "上传成功"
        });
        this.isdisable=false;
        this.$emit("bankSuccess");
        this.ruleForm = {};
        this.close();
        this.$loading(this.$store.state.loading).close();
      }
    },
    submitBank(name) {
      if (!this.hasSelectImg) {
        this.$message({
          message: "请上传转账凭证图片",
          type: "warning"
        });
        return;
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$loading(this.$store.state.loading);
          this.$refs[name].submit();
        } else {
          this.$message({
            message: "请填写转账信息",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.dialog {
  /deep/.el-dialog__header {
    height: 30px;
    background: url(../../../public/logo.png) 20px 10px no-repeat;
    background-size: auto 50px;
  }
  /deep/.el-dialog__body{
    padding-top:0;
    padding-bottom:0;
  }
}
.wrap {
  border: 1px solid #999;
  background: #f7f7f7;
  padding: 10px;
  padding-top:0;
  /deep/.el-upload--picture-card {
    height: 100px;
    width: 100px;
    line-height: 100px;
  }
  /deep/.el-upload-list--picture-card {
    .el-upload-list__item {
      height: 100px;
      width: 100px;
      line-height: 100px;
    }
  }
  /deep/.el-upload__tip {
    line-height: 1;
  }
  .tit {
    text-align: center;
    margin: 15px 0;
    font-size: 16px;
  }
  .kuang {
    background: #e3e3e3;
    width: 85%;
    margin: 10px auto;
    padding: 5px;
    border: 1px solid #999;
  }
  .desc {
    font-size: 12px;
    text-align: left;
    line-height: 1.7;
    &.color {
      text-align: center;
    }
  }
  .el-form {
    margin-top: 10px;
    padding: 10px 20px;
    border-top: 1px solid #999;
  }
}
</style>