<template>
  <div class="SubstituModelList">
    <el-table
    :data="modelList"
    border
    style="width: 100%;"
    :height="clientHeight"
   >
    <el-table-column
      fixed
      prop="date"
      label="图片"
      width="150"
      align="center">
      <template slot-scope="scope">
            <ImgE0 :src="scope.row.imageUrl" :W="90" :H="90" :isBig="true"></ImgE0>
      </template>
    </el-table-column>
    <el-table-column
     fixed
      prop="name"
      label="零件描述"
      width="300"
      >
      <template slot-scope="scope">
            <router-link
                :to="{
                path:'/BrandDetail/GoodsDetails',
                query:{
                  tag:'goodsinfo',
                  name:scope.row.productno,
                  documentid:scope.row.id
                }
              }"
                class="name color"
                tag="p"
                style="cursor:pointer;font-size:15px;"
              >{{scope.row.productno}}</router-link>
                <p style="font-size:12px">
                    <!-- <span>制造商：</span> -->
                    <router-link
                :to="{
                path:'/BrandDetail',
                query:{
                  tag:'brand',
                  name:scope.row.brand,
                  documentid:scope.row.brandId
                }
              }"
                class=""
              > {{scope.row.branda}}</router-link>
                </p>
              <p style="font-size:12px">
                {{scope.row.productdesc}}
              </p>
              <!-- <p v-if="scope.row.map" style="font-size:12px">
                <span v-if="!scope.row.map.totalSeller">
                      <span class="nolist gray">该零件暂无特价，赶紧抢先发布吧</span>
                </span>
                <span v-else>
                  <span>共有</span>
                  <span class="color">{{scope.row.map.totalSeller}}</span>
                  <span>供应商报价</span>
                  <span
                    class="color"
                  >{{ scope.row.map.minPrice}} --- {{scope.row.map.maxPrice}}</span>
                </span>
              </p> -->
      </template>
    </el-table-column>
     <el-table-column
      fixed
      label="操作"
      width="150"
      align="center">
      <template slot-scope="scope">
        <div class="btnWrap">
            <p v-if="scope.row.factorySellerInfo && scope.row.factorySellerInfo.seller_goods_id"><el-button class="orange btn  bgColor" @click="addInquiry(scope.$index)" size="mini">询价篮</el-button></p>
            <p v-if="scope.row.factorySellerInfo && scope.row.factorySellerInfo.seller_goods_id"><el-button class="orange btn  bgColor"  @click="specialPrice(scope.$index)" size="mini" >申请特价</el-button></p>
            <p><el-button class="orange btn bgColor"  @click="pushlishspecialPrice(scope.$index)" size="mini" >我有特价</el-button></p>
            <el-button v-if="!scope.row.focus" class="orange btn" @click="focus(scope.$index)" size="mini">关注零件</el-button>
            <span v-if="scope.row.focus" class="bgLightGray btn">已关注</span>
        </div>
      </template>
    </el-table-column>
    <template v-for="(item,k) in titleList">
         <el-table-column
            prop="list"
            :label="item.name"
            width="150"
            :key="item.id"
            align="center"
            >
            <template slot-scope="scope">
          <span v-if="scope.row.list[k]">
            {{scope.row.list[k].value}}
          </span>
      </template>
    </el-table-column>
    </template>
    
   
  </el-table>
  </div>
</template>
<style lang="less" scoped>
    @import "./SubstituModelListTable.less";
</style>
<script>
import { setTimeout } from "timers";
import {ladderPrice} from "../../lib/utils";
import MerchantList from "_c/MerchantList";
import { axios, shoppingCar } from "@/api/apiObj";
import { mapState, mapActions, mapGetters,mapMutations } from "vuex";
export default {
  name: "SubstituModelList",
  data() {
    return {
      clientHeight:"",
      dialogTableVisible: false,
      dialogTableVisible2: false,
      loading: true,
      modelList:[],
      titleList:[],
    };
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
    watch:{
      list:{
          deep:true,
          handler(val){
              this.modelList=val
          }
      }
    },
    beforeMount(){
 // 获取浏览器可视区域高度
    this.clientHeight = String(window.innerHeight-130)
      //console.log(window)
      //document.body.clientWidth;
      //console.log(self.clientHeight);
      console.log(this.clientHeight)
    },
    mounted(){
      this.modelList=this.list
      this.titleList=this.list[0].list
       
    },
  methods: {
    ...mapActions("Login", ["GetUserInforma"]),
    ...mapMutations(["setshowlogin"]),
    viewDocument() {
      this.loading = true;
      this.dialogTableVisible2 = true;
      setTimeout(() => {
        this.loading = false;
      }, 4000);
    },
    addInquiry(k) {
        if(!this.loginState){
           // this.$router.push('/Login')
             this.setshowlogin(true)
            return;
        }
      let val=this.modelList[k]
      var obj = {
        sellerGoodsId: val.id,
        goodsId:val.id,
        sellerId: val.brandId,
        goodsSource: "2",
        goodsName:val.productno
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
    
          if(res.resultCode == "200"){
            this.$message.success("添加成功")
              var _this=this;
            setTimeout(()=>{
              _this.GetUserInforma();
            },2000)
            
          }
        });
    },
      focus(k){
          if(!this.loginState){
             // this.$router.push('/Login')
               this.setshowlogin(true)
              return;
          }
          let obj={
              goods_id:this.modelList[k].id,
              catergory_id: this.modelList[k].classificationId,
              favour_type: "1",
          };
          axios
              .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
              .then(res => {
                  this.$set(this.modelList[k],"focus",true)
                  this.$message.success("已关注");
                  var _this=this;
                    setTimeout(()=>{
                      _this.GetUserInforma();
                    },2000)
              });
      },
       pushlishspecialPrice(k){
            //发布特价
                if(!this.loginState){
                       // this.$router.push('/Login')
                         this.setshowlogin(true)
                        return;
                    } 
                if(this.UserInforma){
                    // this.UserInforma=JSON.parse(this.UserInforma)
                    if(this.UserInforma.userTagMap && this.UserInforma.userTagMap.seller){
                      let val=this.modelList[k]
                        this.$router.push("/PersonalCenter/SellerIssuesProduct?name="+val.productno);
                    }else{
                        this.$router.push("/OriginalFactoryEntry");
                    }
                }else{
                    this.UserInforma={
                        userTagMap:{}
                    }
                }
                
            },
      specialPrice(k){
        let item=this.modelList[k]
          let factorySellerInfo=item.factorySellerInfo
          factorySellerInfo.priceType=factorySellerInfo.price_type
          if(factorySellerInfo.price_level){
              factorySellerInfo.priceList=ladderPrice(factorySellerInfo.price_level)
          }else if(factorySellerInfo.priceLevel){
              factorySellerInfo.priceList=ladderPrice(factorySellerInfo.priceLevel)
          }
          if(factorySellerInfo.seckil_price){
              factorySellerInfo.seckilPrice=factorySellerInfo.seckil_price;
          }
          let obj=[{...item,factorySellerInfo:factorySellerInfo}]
          this.$store.dispatch("promation", obj);
          this.$router.push("/InquiryBasket/ApplySpecialPrice");

      }
  },
  components: {
      //pdf,
      MerchantList
  },
    computed: {
       ...mapState({
      UserInforma:state => state.Login.UserInforma,
      loginState: state => state.loginState,
    })
    },
};
</script>

