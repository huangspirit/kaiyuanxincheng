<template>
<div>
    <el-dialog
    :title="`${bankTransferObj.title}公对公转账`"
    :visible.sync="centerDialogVisible"
    width="700px"
    center 
    class="dialog">
    <div class="wrap">
        <p class="color tit">感谢您选择公对公转账付款</p>
        <div class="kuang">当前应付金额为：<strong>￥{{bankTransferObj.money | toFixed(2)}}</strong></div>
        <div>您的专属收款账号如下：</div>
        <div class="kuang">
            <p>公司名称：北京晶圆电子有限公司</p>
            <p>银行账号：110 906 335 410 201</p>
            <p>开户银行：招商银行北京上地支行</p>
        </div>
        <div class="desc color" v-if="bankTransferObj.time">重点提示：请务必于{{bankTransferObj.time | formatDate}}前完成汇款，否则将视为自动放弃当前订单！</div>
         <el-form  label-width="80px">
                      <el-form-item label="转账凭证:">
                          <!-- <el-input v-model="bankPayNumber" placeholder="请仔细填写银行汇款编号" type="text"></el-input> -->
                          <el-upload
                              class="upload-demo"
                              ref="upload0"
                              :limit="1"
                              :action="bankTransferObj.url" 
                              :auto-upload="false"
                              list-type="picture-card"
                              :on-success="handleAvatarSuccess"
                              :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                          >
                              <i class="el-icon-plus"></i>
                              <div
                                  slot="tip"
                                  class="el-upload__tip"
                              >图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</div>
                          </el-upload>
                      </el-form-item>
                  </el-form>
                  <div class="desc">1、上传完成后，请点击’确定‘即可！</div>
                  <div class="desc">2、平台将进行到账审核，审核结果将以平台内消息、短信和微信通知您，请及时查看！</div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click=" submitBank('upload0')">确 定</el-button>
        <el-button @click="close">取 消</el-button>
       
    </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
</div>
</template>
<script>
  export default {
      props:{
          bankTransferObj:{
            type: Object,
            default: () => ({

            })
          }
      },
    data() {
      return {
        centerDialogVisible:true,
        dialogVisible:false,
        dialogImageUrl:"",
        disabled: false
      };
    },
    mounted(){
      
       this.centerDialogVisible=true;
    },
    watch:{
        centerDialogVisible(val){
           
            if(!val){
                this.close();
            }
        }
    },
    methods:{
        close(){
            this.$emit("closeBankTransfer")
        },
         handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file) {
        },
        handleAvatarSuccess(res, file) {
          if(res.resultCode =='200'){
              this.$message({
                  type:'success',
                  message:'上传成功'
              })
              this.$emit("bankSuccess")
              this.close();
          }
      },
      submitBank(name){
            this.$refs[name].submit();
        },
    }
  };
</script>
<style lang="less" scoped>
.wrap{
    border:1px solid #999;
    background:#f7f7f7;
    padding:10px;
    .tit{
        text-align: center;
        margin:15px 0;
    }
    .kuang{
        background:#e3e3e3;
        width:85%;
        margin:10px auto;
        padding:5px;
        border:1px solid #999;
    }
    .desc{
        font-size:12px;
        text-align: left;
        line-height:1.7;
        &.color{
            text-align: center;
        }
    }
    .el-form{
        margin-top:20px;
        padding:20px;
        border-top:1px solid #999;
    
    }
}
</style>