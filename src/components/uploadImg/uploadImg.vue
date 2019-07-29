<template>
  <div class="uploadImg">
    <el-upload
      class="avatar-uploader"
      ref="upload"
      :action="url"
      :auto-upload="true"

      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-change="handleChange"
      :limit="limit"
      :on-success="successUpload"
    >


      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip">{{tip}}</div>
    </el-upload>
  </div>
</template>

<script>
import "./uploadImg.less";
import { baseURL } from "@/config";
export default {
  name: "uploadImg",
  props: {
    limit: {
      type: Number,
      default: 1
    },
    tip: {
      type: String,
      default: "选择本地图片"
    },
    imageUrl:{
      type:String,
      default:''
    }
  },
  data() {
    return {

    };
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    url() {
      return (
        baseURL +
        `api-f/files/uploadWithCloud?access_token=${
          this.access_token
        }&fileSource=QINIUYUN&type=7&id=1`
      );
    }
  },
  methods: {
    // 上传成功
    successUpload(response, file, fileList) {
      this.$emit("successUpload", file);
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 上传之前的处理
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isLt2M;
    },
    // 上传发生改变时的处理
    handleChange(file) {
      this.$emit("change", URL.createObjectURL(file.raw));
      this.imageUrl = URL.createObjectURL(file.raw);
    }
  }
};
</script>

<style>
</style>
