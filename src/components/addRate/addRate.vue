<template>
  <div class="content">
        <el-dialog
        :visible.sync="show"
        width="700px"
        title="商家评价"
        center
        class="dialog-ruleForm-code"
        top="5vh"
        >
     <div class="goodsinfo">
      <ImgE :src="item.goods_image" :H="60" :W="100"></ImgE>
      <div class="wrap">
        <p class="color">
          型号：
          <router-link
            class="color"
            :to="{
                                                   path:'/BrandDetail/GoodsDetails',
                                                    query:{
                                                        tag:'goodsinfo',
                                                        name:item.goods_name,
                                                        documentid:item.goods_id
                                                    }
                                                    }"
          >{{item.goods_name}}</router-link>
        </p>
        <p>
          品牌：
          <router-link
            :to="{
                                                    path:'/BrandDetail',
                                                    query:{
                                                        name:item.goods_brand,
                                                        documentid:item.goods_brand_id,
                                                        tag:'brand'
                                                    }
                                                    }"
          >{{item.goods_brand}}</router-link>
        </p>
        <p class="gray">描述：{{item.goods_desc}}</p>
      </div>
    </div>
    <div class="userinfo">
      <img :src="item.headImgUrl" alt />
      <span>{{item.username}}</span>
      <span class="tag bgColor" v-if="item.tag==1">{{item.tag | tagFilter}}</span>
      <span class="tag bgBlu" v-if="item.tag==2">{{item.tag | tagFilter}}</span>
      <!-- <span class="tag bgOrange" v-if="item.tag==18">{{item.tag | tagFilter}}</span> -->
    </div>
    <div class="rateCont">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="本次采购的零件满足您的需求吗？说说您的心得，分享给其他想买的人吧"
        v-model="content"
      ></el-input>
    </div>
    <div style="display:flex;">
      <div>上传图片：</div>
    <div>
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
        :limit="7"
        :on-change="change"
        multiple
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
          
      </el-upload>
      <p>图片尺寸请确保800px*800px以上，文件大小限制为2M，支持png、jpg、gif格式</p>
    </div>
      
    
    </div>
    <div class="score peruBg">
      <div>
        产品质量：
        <p>
          <template v-for="item in 5">
            <img
              src="@/assets/image/icon/star.png"
              alt
              :key="item"
              v-if="profileScore==0 || item>profileScore "
              @click="add(item,'profileScore')"
            />
            <img
              src="@/assets/image/icon/starActive.png"
              alt
              :key="item"
              v-if="item<=profileScore "
              @click="cancle(item,'profileScore')"
            />
          </template>
          <span class="descration gray">{{profileScore | desc}}</span>
        </p>
      </div>
      <div>
        交货速度：
        <p>
          <template v-for="item in 5">
            <img
              src="@/assets/image/icon/star.png"
              alt
              :key="item"
              v-if="deliverScore==0 || item>deliverScore "
              @click="add(item,'deliverScore')"
            />
            <img
              src="@/assets/image/icon/starActive.png"
              alt
              :key="item"
              v-if="item<=deliverScore "
              @click="cancle(item,'deliverScore')"
            />
          </template>
          <span class="descration gray">{{deliverScore | desc}}</span>
        </p>
      </div>
      <div>
        服务支持：
        <p>
          <template v-for="item in 5">
            <img
              src="@/assets/image/icon/star.png"
              alt
              :key="item"
              v-if="serviceScore==0 || item>serviceScore "
              @click="add(item,'serviceScore')"
            />
            <img
              src="@/assets/image/icon/starActive.png"
              alt
              :key="item"
              v-if="item<=serviceScore "
              @click="cancle(item,'serviceScore')"
            />
          </template>
          <span class="descration gray">{{serviceScore | desc}}</span>
        </p>
      </div>
     
    </div>
     <div style="text-align:center;margin-top:10px;"><el-button @click="commit" size="small" type="primary" >提交评论</el-button></div>
        </el-dialog>
    
    <el-dialog :visible.sync="showBigImg" width="700px">
      <div style="text-align:center;line-height:500px;height:500px">
        <img
          :src="bigImgUrl"
          alt
          style="max-height:100%;max-width:100%;"
        />
      </div>
    </el-dialog>
  </div>
</template>
.<script>
import { baseURL } from "@/config";
import { axios, buyerOrderCenter } from "@/api/apiObj";
export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    showAddRate:{
        type:Boolean,
        default:false
    }
  },
  data() {
    return {
        show:false,
      content: "",
      goodsPicture: "",
      deliverScore: 0, //发货评分
      profileScore: 0, //产品质量
      serviceScore: 0, //服务支持
      showBigImg: false,
      fileList:[],
      bigImgUrl:""
    };
  },
  watch:{
      show(newval){
          console.log(newval)
          if(newval==false){
              this.$emit("submitRateSuc")
          }
      }
  },
  filters: {
    desc(val) {
      switch (val) {
        case 1:
          return "非常差";
        case 2:
          return "差";
        case 3:
          return "一般";
        case 4:
          return "好";
        case 5:
          return "非常好";
      }
    }
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    imgUrl() {
      return (
        baseURL +
        `api-order/order/uploadOrderComment?access_token=${this.access_token}`
      );
    }
  },
  mounted() {
     this.show=this.showAddRate
  },
  methods: {
    add(item, name) {
      this[name] = item;
    },
    cancle(item, name) {
      this[name] = item;
    },
    change(file,fileList){
        this.fileList=fileList
    },
    handleAvatarSuccess(res) {
     
    },
    beforeAvatarUpload(file) {
      const isIMG = file.type == "image/jpeg" || file.type == "image/png";
      if (!isIMG) {
        this.$message.error("只能上传jpg或者png格式的图片!");
      }
      return isIMG;
    },
    handleRemoveimg(file, fileList) {
        this.fileList=fileList
    },
    handlePictureCardPreview(file) {
      this.showBigImg = true;
      this.bigImgUrl=file.response.data.neturl
    },
    commit(){
        let strArr=this.fileList.map(item=>{
                return item.response.data.url
        })
        let obj={
            sellerGoodsId:this.item.seckill_goods_id,
            sellerId:this.item.seller_id,
            orderId:this.item.id,
            brandId:this.item.goods_brand_id,
            deliverScore:this.deliverScore,
            profileScore:this.profileScore,
            serviceScore:this.serviceScore,
            content:this.content,
            goodsPicture:strArr.join("@"),
        }
        axios.request({...buyerOrderCenter.insertOrderComment,method:"post",data:obj}).then(res=>{
            this.$emit("submitRateSuc")
        })
    }
  }
};
</script>
.<style lang="less" scoped>
.content {
  color: #333;
  .goodsinfo {
    background: #e3e3e3;
    padding: 15px 24px;
    display: flex;
    .wrap {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .userinfo {
    padding: 15px;
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    span {
      padding: 2px 10px;
      border-radius: 3px;
    }
  }
  .rateCont {
    margin-bottom: 15px;
  }
  .upload-demo {
      margin-bottom:10px;
    /deep/.el-upload {
      height: 100px;
      width: 100px;
      line-height: 100px;
      
    }
    /deep/.el-upload-list {
        .el-upload-list__item {
          height: 100px;
          line-height: 100px;
          width: 100px;
        }
      }
  }
  .score{
      margin-top:15px;

        padding:15px;
      &>div{
          display:flex;
          margin-bottom:10px;
          p{
              img{
                  width:20px;
                  height:20px;
                  margin-right:5px;
                  cursor: pointer;
              }
              .descration{
                  margin-left:25px;
                  
              }
          }
      }
  }
}
</style>