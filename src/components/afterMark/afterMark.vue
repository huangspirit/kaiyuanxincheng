
.<template>
  <div>
    <el-dialog :visible.sync="show" width="700px" :append-to-body="true" :center="true" top="5vh">
      <h2 slot="title" class="dialog-title">申请售后</h2>
      <div class="cont">
        <div class="tit">
          <p>非常感谢您对{{title}}的关注与大力支持，您所提出的每一个售后问题都将对我们的成长都至关重要</p>
        </div>
        <el-form :model="form" class="el-form" >
          <el-form-item label="售后分类：" :label-width="formLabelWidth">
            <el-select v-model="form.title" placeholder="请选择售后分类" v-if="options.length">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.title"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细描述：">
            <el-input type="textarea" v-model="form.content" :rows="3" placeholder="请尽可能的描述清楚您的售后问题"  style="width:auto;min-width:400px"></el-input>
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
          <el-form-item label style="text-align:center;">
            <el-button class="bgColor" @click="onSubmit" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog title="" :visible.sync="showBigImg" width="700px" :append-to-body="true">
      <div style="text-align:center;line-height:500px">
        <img :src="bigImgUrl" alt style="max-width:600px;max-height:500px;" />
      </div>
    </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { mapState,mapActions } from "vuex";
import { baseURL } from "@/config";
export default {
  props: {
    showfeedback: {
      type: Boolean,
      default: false
    },
    orderIds:{
        type:Number,
        default:0,
    }
  },
  data() {
    return {
      form: {
          orderId:this.orderIds
      },
      show:this.showfeedback,
      formLabelWidth: "120",
      options: [{}],
      value: "",
      fileList: [],
      showBigImg: false,
      bigImgUrl: ""
    };
  },
  watch:{
      show(newval){
          console.log(newval)
          if(newval==false){
              this.$emit("submitSuc")
          }
      }
  },
  mounted() {
    this.getqueryItem();
  },
  computed: {
    ...mapState({
      title: state => state.title
    }),
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    requestUrl() {
      return baseURL + `api-b/feed/upload?access_token=${this.access_token}`;
    }
  },
  methods: {
    ...mapActions("Common", ["GetQueryItem","saveAftermark"]),
    onSubmit() {
      this.fileList.forEach((item, index) => {
        if (index == 0) {
          this.form.imageUrls = item.response.data.url;
        } else {
          this.form.imageUrls = this.form.imageUrls + "@" + item.response.data.url;
        }
      });

      this.saveAftermark(JSON.stringify(this.form)).then(res=>{
        if(res.resultCode==200){
            this.$message({
                message:"已提交，售后结果会在买家中心展示，请注意查看",
                type:'success'
            })
            this.$emit("submitSuc")
        }
           
      })
    },
    getqueryItem() {
        this.GetQueryItem({type:2}).then(res=>{
            this.options = res.data;
        })
    },
    change(file, fileList) {
      this.fileList = fileList;
    },
    handleAvatarSuccess(res) {},
    beforeAvatarUpload(file) {},
    handleRemoveimg(file, fileList) {
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      // this.showBigImg = true;
      // this.bigImgUrl = file.response.data.neturl;

      if (file.raw.type.indexOf("image") != -1) {
        this.showBigImg = true;
        this.bigImgUrl = file.response.data.url;
      } else {
        window.open(file.response.data.url, "blank");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.cont {
  height: 100%;
  color: #333;
  .tit {
    text-align: center;
    p {
      text-align: left;
      margin-bottom: 20px ;
    }
  }
  .el-form {
    /deep/.el-form-item {
      display: flex;
      margin-bottom:10px;
      .el-form-item__content {
        flex: 1;
      }
    }
  }
}
</style>
