<template>
  <div class="cont allWidth">
    <div>
      <div class="tit">
        <h2>问题反馈</h2>
        <p>非常感谢您对{{title}}的关注与大力支持，您所提出的每一个问题都将对我们的成长都至关重要</p>
      </div>

      <el-form :model="form" class="el-form">
         <el-form-item label="问题分类：" :label-width="formLabelWidth">
          <el-select v-model="form.title" placeholder="请选择问题分类" v-if="options.length">
            <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细描述：">
          <el-input type="textarea" v-model="form.content" :rows="4" placeholder="请尽可能的描述清楚您的疑问"></el-input>
        </el-form-item>
       
        <el-form-item label="附件上传：" :label-width="formLabelWidth">
          <el-upload
            :action="requestUrl"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="upload-demo"
            ref="upload"
            :auto-upload="true"
            list-type="picture-card"
            :on-remove="handleRemoveimg"
            :on-preview="handlePictureCardPreview"
            :limit="3"
            :on-change="change"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>可以上传图片、PDF、Word、Excel文件；最多3个文件</p>
        </el-form-item>
        <el-form-item label="紧急程度：">
          <el-radio-group v-model="form.level">
            <el-radio :value="0" :label="0">一般</el-radio>
            <el-radio :value="1" :label="1">很紧急</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" style="text-align:center;">
         <el-button class="bgColor" @click="onSubmit">提交反馈</el-button>
        </el-form-item>
      </el-form>
   <el-dialog
  title="提示"
  :visible.sync="showBigImg"
  width="700px"
  >
 <div style="text-align:center;line-height:500px">
   <img :src="bigImgUrl" alt="" style="max-width:600px;max-height:500px;">
 </div>
</el-dialog>
      
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import { baseURL } from "@/config";
import { axios, common } from "@/api/apiObj";
export default {
  data() {
    return {
    
      form: {
        level:0
      },
      formLabelWidth: "120",
      options: [{}],
      value: "",
      fileList: [],
      showBigImg:false,
      bigImgUrl:''
    };
  },
  mounted() {
    this.getqueryItem();
  },
computed:{
   ...mapState({
                title: state => state.title,
               
            }),
  access_token() {
      return sessionStorage.getItem("access_token");
    },
requestUrl(){
  return  baseURL +
        `api-b/feed/upload?access_token=${this.access_token}`
}
},
  methods: {
    onSubmit(){
      this.fileList.forEach((item,index)=>{
          if(index==0){
             this.form.url=item.response.data.url
          }else{
            this.form.url=this.form.url+'@'+item.response.data.url
          }
      })
      console.log(this.form)
      axios.request({...common.save,data:this.form,method:'post'}).then(res=>{
        console.log(res)
        this.$router.go(-1)
      })
    },
    getqueryItem() {
      axios.request({ ...common.queryItem}).then(res => {
        this.options = res.data;
      });
    },
    change(file, fileList) {
      console.log(fileList)
      this.fileList = fileList;
    },
    handleAvatarSuccess(res) {},
    beforeAvatarUpload(file) {
      
    },
    handleRemoveimg(file, fileList) {
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      // this.showBigImg = true;
      // this.bigImgUrl = file.response.data.neturl;
    
      if(file.raw.type.indexOf('image')!=-1){
        this.showBigImg = true;
        this.bigImgUrl = file.response.data.url;
      }else{
        window.open(file.response.data.url,"blank")
      }
     
    }
  }
};
</script>
<style lang="less" scoped>
.cont {
  height: 100%;
  min-height: 650px;
  padding: 20px;
  background: #fff;
  color: #333;
  & > div {
    width: 800px;
    margin: 0 auto;
    .tit {
      text-align: center;
      p {
        text-align: left;
        margin: 20px auto;
      }
    }
  }
  .el-form {
    /deep/.el-form-item {
      display: flex;
      .el-form-item__content {
        flex: 1;
      }
    }
  }
}
</style>
