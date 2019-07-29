<template>
  <!--发布商品  -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
      <el-breadcrumb-item>发布产品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="SellerIssuesProduct" @click="noSelect">
      <!-- <p class="title">填写发布器件信息</p> -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="180px"
        class="form-list"
      >
        <el-form-item label="选择商品：" prop="goods_name" class="selectProduct">
          <el-input v-model="ruleForm.goods_name" placeholder="请输入商品详细型号" @input="SearchBrand"  style="width:50%;"></el-input>
          <ul v-if="selectProductList.length">
            <li
              @click.stop="selectProduct(item)"
              v-for="item in selectProductList"
              :key="item.id"
              v-html="item.nick_name"
            ></li>
          </ul>
          <div class="select-product-list" v-if="selectProductObj.productno">
            <div class="product-t">
              <div class="detail">
                <ImgE :src="selectProductObj.imgurl" :W="100" :H="100"></ImgE>
                <div >
                  <p ><span>名称：</span><span class="num">{{selectProductObj.productno}}</span></p>
                  <p><span>品牌：</span>{{selectProductObj.branda}}</p>
                </div>
              </div>
              <p>
                <span>功能描述：</span>
                {{selectProductObj.productdesc}}
              </p>
            </div>
            <div class="product-b">
              <!-- <p>当前选择商品</p> -->
              <p class="price-b-sp" v-if="selectProductObj.history_price">
                历史平台最低价：
                <span class="num" v-if="selectProductObj.history_price === '-'">暂无</span>
                <span
                  v-else
                >:{{selectProductObj.history_price | toFixed(3)}}</span>
              </p>
              <p class="price-b-sp" v-if="selectProductObj.price">
                当前平台最低价：
                <span class="num" v-if="selectProductObj.price === '-'">暂无</span>
                <span
                  v-else
                >:{{selectProductObj.price | toFixed(3)}}</span>

              </p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="交货地：">
          <el-select v-model="ruleForm.diliver_place" placeholder="请选择交货地">
            <el-option :value="item.name" v-for="item in diliverPlace" :key="item.name">{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格是否含税:">
          <el-radio-group v-model="ruleForm.clude_bill" class="defaultradioSquare">
            <el-radio :label="true" :value="true">含税</el-radio>
            <el-radio :label="false" :value="false">不含税</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开票形式:">
          <el-radio-group v-model="ruleForm.support_bill" class="defaultradioSquare">
            <el-radio :label="true" :value="true">自己开</el-radio>
            <el-radio :label="false" :value="false" v-if="!ruleForm.clude_bill">系统开</el-radio>
          </el-radio-group>
          <p class="desc"  v-if="!ruleForm.clude_bill && !ruleForm.support_bill">是否系统提供发票,不提供发票增加2%手续费</p>
          <!-- <span class="small-sp"  v-if="!ruleForm.clude_bill">是否系统提供发票,不提供发票增加2%手续费</span> -->
        </el-form-item>
        <el-form-item label="货物类型:">
          <el-radio-group v-model="ruleForm.goods_type" class="defaultradioSquare">
            <el-radio :label="true" :value="true">现货</el-radio>
            <el-radio :label="false" :value="false">期货</el-radio>
          </el-radio-group>
          <p class="desc" v-if="ruleForm.goods_type">现货商品需在买家下单两天内发货</p>
          <p class="desc" v-if="!ruleForm.goods_type">只能一口价，买家下单订货商品时距离交期超过7天，可用预付款方式付款</p>
          <!-- <span class="small-sp">是否系统提供发票,不提供发票增加2%手续费</span>
           <span class="small-sp">只能一口价，买家下单订货商品时距离交期超过7天，可用预付款方式付款</span> -->
        </el-form-item>

        <el-form-item label="出价方式:">
          <el-radio-group v-model="ruleForm.price_type" class="defaultradioSquare">
            <el-radio :label="true" :value="true" v-if="ruleForm.goods_type">阶梯价</el-radio>
            <el-radio :label="false" :value="false">一口价</el-radio>
          </el-radio-group>
           <p class="desc" v-if="ruleForm.goods_type && ruleForm.price_type">只适合现货，价格降序填写，数量升序填写</p>
           <div class="form-item" v-if="ruleForm.price_type">
 <!-- v-for="(item, k) in SteppedPriceList" :key="k" -->
                <div class="stepped-price" v-for="(item,k) in SteppedPriceListlength" :key="k">

                  <div class="steppedItem">
                      <label for="">价格：</label>
                      <el-input @input="changePrice(k)" :placeholder="SteppedPriceListobj['placeholderprice'+k]" :name="k" v-model="SteppedPriceListobj['price'+k]" :max="SteppedPriceListobj['maxprice'+k]" :min="1"  @blur="priceblur($event)">
                        <template slot="prepend">{{priceunit ? '$' : '￥'}}</template>
                      </el-input>
                    </div>
                    <div class="steppedItem">
                      <label>数量：</label>
                      <el-input  @input="changeNum(k)" :placeholder="SteppedPriceListobj['placeholdernum'+k]" :name="k" v-model="SteppedPriceListobj['num'+k]" :min="SteppedPriceListobj['minnum'+k]"  @blur="numblur($event)" type="number">
                        <!-- <template slot="append">K</template> -->
                      </el-input>
                    </div>
                </div>
                <div class="add-stepped-price">
                  <p v-if="SteppedPriceListlength === 3" style="color:#ff6600" >最多添加三个阶梯价格</p>
                  <!-- <span @click="addSteppedPrice" class="add">+添加阶梯价格</span> -->
                  <span @click="resetSteppedPrice" class="reset">重置阶梯价格</span>

                </div>
              </div>
            </el-form-item>
        <el-form-item label="价格：" prop="seckil_price" v-if="ruleForm.price_type === false">
          <el-input v-model="ruleForm.seckil_price" @input="seckilPrice"></el-input>
        </el-form-item>
        <el-form-item label="币种：">
          <el-input v-model="priceunit" disabled>{{priceunit ? '$美元' : '￥人民币'}}</el-input>
        </el-form-item>
        <div class="setitem">
          <label class="fl label">
            <span class="requireMark">*</span>
              MOQ：
              <p class="desc">(最小装货量)</p>
          </label>
          <el-form-item  prop="moq">
            <el-input v-model="ruleForm.moq" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="setitem">
            <label class="fl label">
              <span class="requireMark">*</span>
            MPQ：
            <p class="desc">(最小订购量)</p>
            </label>
            <el-form-item  prop="mpq">
              <el-input v-model="ruleForm.mpq" placeholder=""></el-input>
            </el-form-item>
        </div>
        <el-form-item label="数量（库存）：" prop="stock_count">
          <el-input v-model="ruleForm.stock_count" @input="changeStockcount" :placeholder="StockCountPlaceholderStr" :max="StockCountMax"></el-input>
          <p class="small" style="color:#ff6600" v-if="SellerCredit.tag!=1">信誉额度剩余￥{{SellerCredit.restcredit}}
<!--              ，库存最多可设置{{count}}K-->
          </p>
        </el-form-item>
         <el-form-item label="售卖时长:">
          <el-radio-group v-model="ruleForm.seller_always" class="defaultradioSquare">
            <el-radio :label="true" :value="true"  v-if="ruleForm.goods_type">长期卖</el-radio>
            <el-radio :label="false" :value="false">限时卖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="多长时间后交货：" prop="day_interval" v-if="ruleForm.seller_always">
          <el-input v-model="ruleForm.day_interval">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="售卖起止时间：" prop="end_date" v-if="!ruleForm.seller_always">
            <el-date-picker
                :picker-options="pickerOptions"
                v-model="value1"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
                <!--          <el-date-picker-->
<!--            v-model="ruleForm.start_date"-->
<!--            type="datetime"-->
<!--            placeholder="开始时间"-->
<!--            style="margin-right:100px"-->
<!--            value-format="yyyy/MM/dd HH:mm:ss"-->
<!--            format="yyyy/MM/dd HH:mm:ss"-->
<!--          ></el-date-picker>-->
<!--          <el-date-picker-->
<!--            v-model="ruleForm.end_date"-->
<!--            value-format="yyyy/MM/dd HH:mm:ss"-->
<!--            format="yyyy/MM/dd HH:mm:ss"-->
<!--            type="datetime"-->
<!--            placeholder="结束时间"-->
<!--          ></el-date-picker>-->
        </el-form-item>
        <el-form-item label="预计交期：" prop="complete_date" v-if="!ruleForm.seller_always">
          <el-date-picker
              :picker-options="pickerOptions"
            v-model="ruleForm.complete_date"
            type="date"
            style="width:220px"
            placeholder="请选择预计交期时间"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上传实物照片：">
          <el-upload
            :action="url"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="upload-demo"
            ref="upload"
            :auto-upload="true"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :limit="2"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <!-- <div slot="tip" class="el-upload__tip">实物照片</div> -->
            <div slot="tip" class="symbol">
              <img  src="@/assets/image/PersonalCenter/_u24718.png" alt/>
              <span style="width:100px;text-align:center">样张</span>
            </div>
          </el-upload>
          <div style="margin-top:15px;">
            <p style="color:#ff6600;line-height:20px">非必选项，但是有利于您的商品销售</p>
            <p style>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</p>
          </div>
        </el-form-item>
        <!-- <el-form-item label="源头公司名称:" prop="SourceCompany">
          <el-input v-model="ruleForm.SourceCompany"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="上次购买时间：" prop="LastPurchaseTime">
          <el-date-picker
            style="width:560px"
            v-model="ruleForm.LastPurchaseTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="商品源头证明：" prop="SourceImg">
          <el-upload
            :action="url"
            :before-upload="beforeAvatarUpload"
            class="upload-demo"
            ref="upload"
            :auto-upload="true"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :limit="1"
            :on-success="handleAvatarSuccess2"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">实物照片</div>
          </el-upload>
          <span style="width:100px;">
            <img
              src="@/assets/image/PersonalCenter/_u24718.png"
              alt
              style="width:100px;height:100px;float:left"
            >
            <span style="width:100px;float:left;text-align:center">样张</span>
          </span>
          <div style="width:100%;margin-top:40px">
            <p style="color:#ff6600">来源合同、PI、发票三者其中一种或多种</p>
            <p style>图片尺寸请确保800px*800px以上，文件大小在1MB以内，支持png、jpg、gif格式</p>
          </div>
        </el-form-item>-->
        <div class="form-item form-item-footer">
          <label for></label>
          <div class="submit" @click="submitForm('ruleForm')">
          发布产品</div>
        </div>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>

// import "@/assets/css/ele-form.less";
// import "@/assets/css/label-checkbox.less";
import { baseURL } from "@/config";
import { mapActions,mapState } from "vuex";
import { type } from "os";
export default {
  name: "SellerIssuesProduct",
  data() {
    return {
      value1:[],
        pickerOptions: {
            disabledDate: (time) => {
                let nowData = new Date()
                nowData = new Date(nowData.setDate(nowData.getDate() - 1))
                return time < nowData;
            }
        },
      StockCountMax:0,
      StockCountPlaceholderStr:"",
      //可设置库存
      count:0,
      //个人信誉
      SellerCredit:{},
      // 币种
      priceunit: "￥人民币",
      // 现在选择 的产品的详情
      selectProductObj: {},
      // 预览图片
      dialogImageUrl: "",
      dialogVisible: false,
      // 交货地的列表
      diliverPlace: [],
      imageUrl: "",
      selectProductList: [],
      // 价格阶梯列表
      SteppedPriceListlength:1,
      // SteppedPriceList: [
      //   {
      //     num: "",
      //     price: ""
      //   }
      // ],
      SteppedPriceListobj:{
        placeholderprice0:"大于0",
        placeholdernum0:"大于0"
      },
      // 含不含税
      clude_billFlag: true,
      // 是不是自己开发票
      support_billFlag: true,
      // 是不是一口价
      ruleForm: {
        // 选择商品的名字
        goods_name: "",
        // 选择商品的id
        goods_id: "",
        catergory_id: "",
        // 交货地
        diliver_place: "内地",
        // 货物类型
        goods_type: true,
        // 预计交期
        complete_date: "",
        // 币种
        priceunit: false,
        // 是否含税
        clude_bill: false,
        // 价格方式
        price_type: true,
        // 售卖的方式，是不是长期卖
        seller_always: false,
        // 价格
        seckil_price: "",
        moq: "",
        mpq: "",
        // 库存
        stock_count: "",
        // 数量
        goods_count: "",
        // 秒杀开始时间
        start_date: "",
        // 秒杀结束时间
        end_date: "",
        // 上传实物照片
        image_urls: "",
        // 支不支持系统开发票
        support_bill: true,
        // 阶梯价
        price_level: "",
        // 多长时间后交货
        day_interval: ""
        // // 源头公司名称
        // SourceCompany: "",
        // // 上次购买时间
        // LastPurchaseTime: "",
        // // 商品源头证明
        // SourceImg: ""
      },
      rules: {
        goods_name: [
          {
            required: true,
            message: "请输入商品详细型号",
            trigger: "blur"
          }
        ],
        day_interval: [
          {
            required: true,
            message: "请输入多长时间后交货",
            trigger: "blur",
            type: "string"
          },
          { min: 1, message: "天数最低为1", trigger: "blur" }
        ],
        seckil_price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur",
            type: "string"
          },
          { min: 1, message: "价格最低为1", trigger: "blur" }
        ],
        moq: [
          {
            required: true,
            message: "请输入moq",
            trigger: "blur",
            type: "string"
          },
          { min: 1, message: "moq最低为1", trigger: "blur" }
        ],
        mpq: [
          {
            required: true,
            message: "请输入mpq",
            trigger: "blur",
            type: "string"
          },
          { min: 1, message: "mpq最低为1", trigger: "blur" }
        ],
        stock_count: [
          {
            required: true,
            message: "请输入库存（数量）",
            trigger: "blur",
            type: "string"
          },
          { min: 1, message: "请输入库存（数量）最低1", trigger: "blur" }
        ],
        start_date: [
          {
            type: "string",
            required: true,
            message: "请输入开始日期",
            trigger: "change"
          }
        ],
        end_date: [
          {
            type: "string",
            required: true,
            message: "请输入结束日期",
            trigger: "change"
          }
        ],
        complete_date: [
          {
            type: "string",
            required: true,
            message: "请选择预计交期时间",
            trigger: "change"
          }
        ]
        //  LastPurchaseTime: [
        //   {
        //     type: "string",
        //     required: true,
        //     message: "请选择上次购买时间",
        //     trigger: "change"
        //   }
        // ],
        // SourceCompany: [
        //   { required: true, message: "请输入源头公司名称", trigger: "blur" },
        //   { min: 2, message: "源头公司名称最低为2个字符", trigger: "blur" }
        // ],
        // SourceImg: [
        //   { required: true, message: "请上传商品源头证明", trigger: "blur" }
        // ]
      }
    };
  },
  computed: {
    ...mapState({
      UserInforma:state=>state.Login.UserInforma
    }),
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    url() {
      return (
        baseURL +
        `api-f/files/uploadWithCloud?access_token=${this.access_token}&fileSource=QINIUYUN&type=1&id=1`
      );
    }
  },
  watch: {
      //售卖起止时间
      value1(val){
          this.ruleForm.start_date=val[0]
          this.ruleForm.end_date=val[1]
      },
    // 发货地发生变化
    "ruleForm.diliver_place": {
      handler() {
        console.log("// 发货地发生变化")
        if (this.ruleForm.diliver_place === "香港") {
          this.ruleForm.clude_bill = false;
          this.clude_billFlag = false;
          this.ruleForm.support_bill = true;
          this.support_billFlag = false;
          this.priceunit = "$美元";
        } else if (this.ruleForm.diliver_place === "内地") {
          this.clude_billFlag = true;
          if (this.ruleForm.clude_bill) {
            this.ruleForm.support_bill = true;
            this.support_billFlag = false;
          } else {
            this.ruleForm.support_bill = true;
            this.support_billFlag = true;
          }
          this.priceunit = "￥人民币";
        }
      }
    },
    // 是不是含税
    "ruleForm.clude_bill": {
      handler() {
        if (this.ruleForm.clude_bill) {
          this.ruleForm.support_bill = true;
          this.support_billFlag = false;
        } else {
          this.ruleForm.support_bill = true;
          this.support_billFlag = true;
        }
      }
    },
    // 价格类型，是不是一口价
    "ruleForm.goods_type": {
      handler() {
        if (!this.ruleForm.goods_type) {
          this.ruleForm.price_type = false;
        } else {
          this.ruleForm.price_type = true;
        }
      }
    },
 //价格类型影响设置库存
      "ruleForm.price_type":{
        handler(){
            this.StockCountMax=0;
            this.StockCountPlaceholderStr="";
            this.resetSteppedPrice();
            this.ruleForm.seckil_price=""
        }
      },
    // 是不是长期售卖
    "ruleForm.seller_always": {
      handler() {
        if (this.ruleForm.seller_always) {
          this.ruleForm.start_date = "2019/06/06";
          this.ruleForm.end_date = "2019/06/06";
          this.ruleForm.complete_date = "2019/06/06";
        } else {
          this.ruleForm.start_date = "";
          this.ruleForm.end_date = "";
          this.ruleForm.complete_date = "";
        }
      }
    }

  },
  methods: {
    ...mapActions("SellerIssuesProduct", [
      "GetSearchDataSelect",
      "GetSerarchGoods",
      "GetPublishGoods",
      "querySellerCredit"
    ]),
    seckilPrice(){
      console.log(this.ruleForm);
      let exchange=this.ruleForm.diliver_place=="香港"?this.SellerCredit.change:1;
          //阶梯价
          this.StockCountMax=parseInt(this.SellerCredit.restcredit/(exchange*this.ruleForm.seckil_price))
          this.StockCountPlaceholderStr="不能大于"+this.StockCountMax;
    },
    changeStockcount(){
      console.log("input");
      console.log(this.SellerCredit)
      console.log(this.ruleForm)
    if(Number(this.ruleForm.stock_count)>this.StockCountMax){
      this.ruleForm.stock_count = this.StockCountMax
    }

    },
    //正则价格的表达
    changePrice(k){
      console.log("changePrice")
      if(!this.SteppedPriceListobj['price'+k]){
        return;
      }
      let obj =this.SteppedPriceListobj['price'+k]+"";
      obj = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
      obj = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
      obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
      obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数

      if(obj.indexOf(".")< 0 && obj !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      obj= parseFloat(obj);
      }
      this.SteppedPriceListobj['price'+k]=obj;
      console.log(this.ruleForm);
      let exchange=this.ruleForm.diliver_place=="香港"?this.SellerCredit.change:1;
          //阶梯价
          if(this.SteppedPriceListobj.price0 ){
            this.StockCountMax=parseInt(this.SellerCredit.restcredit/(exchange*this.SteppedPriceListobj.price0))
            this.StockCountPlaceholderStr="不能大于"+this.StockCountMax;
          }else if(this.SteppedPriceListobj.price1){
              this.StockCountMax=parseInt(this.SellerCredit.restcredit/(exchange*this.SteppedPriceListobj.price1))
              this.StockCountPlaceholderStr="不能大于"+this.StockCountMax;
          }else if(this.SteppedPriceListobj.price2){
              this.StockCountMax=parseInt(this.SellerCredit.restcredit/(exchange*this.SteppedPriceListobj.price2))
              this.StockCountPlaceholderStr="不能大于"+this.StockCountMax;
          }


    },
    changeNum(k){
       if(this.SteppedPriceListobj['num'+k]!=0 && !this.SteppedPriceListobj['num'+k]){
        return;
      }
      let obj =this.SteppedPriceListobj['num'+k]+"";
      obj = obj.replace(/\D/g,'');
      console.log(typeof(obj))
      this.SteppedPriceListobj['num'+k]=obj
    },
    //监控阶梯价的变化
    priceblur(event){
      let order = Number(event.target.name)
      let value=Number(event.target.value)
      let max=Number(event.target.max)
      let min=Number(event.target.min)
      if(value>=min){
        if(order>0 && value>max){
          event.target.value=""
          return;
        }
       this.SteppedPriceListobj['maxprice'+(order+1)]=value;
       this.SteppedPriceListobj['placeholderprice'+(order+1)]='大于0并且小于'+value;
       if(this.SteppedPriceListobj['num'+order] && this.SteppedPriceListobj['price'+order] && this.SteppedPriceListlength<3){
         this.SteppedPriceListlength++
       }
      }else{
        event.target.value=""
      }
     console.log(this.SteppedPriceListobj)

    },
    numblur(){
      let order = Number(event.target.name)
      let value=Number(event.target.value)
      let min=Number(event.target.min)
      if(value>=min){
       this.SteppedPriceListobj['minnum'+(order+1)]=value;
       this.SteppedPriceListobj['placeholdernum'+(order+1)]='大于'+value;
       if(this.SteppedPriceListobj['num'+order] && this.SteppedPriceListobj['price'+order] && this.SteppedPriceListlength<3){
         this.SteppedPriceListlength++
       }
      }else{
        event.target.value=""
      }
     console.log(this.SteppedPriceListobj)
    },
    // 发布商品
    submitForm(formName) {
      // let flag = true;
      // if (this.ruleForm.price_type) {
      //   console.log(this.SteppedPriceList)
      //   this.SteppedPriceList.forEach((item, index) => {
      //     if (!item.num || !item.price) {
      //       this.$message.error("阶梯价格不能为空!");
      //       flag = false;
      //     } else {
      //       if (index > 0) {
      //         if (item.price > this.SteppedPriceList[index - 1].price) {
      //           this.$message.error("阶梯价格请按照从大到小顺序进行填写!");
      //           flag = false;
      //         }
      //       }
      //     }
      //   });
      // }
      // if (flag) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let flag2 = true;
            let retTimeFlag = this.ruleForm.start_date < this.ruleForm.end_date;
            if (!this.ruleForm.seller_always) {
              if (!retTimeFlag) {
                this.$message.error("售卖起止时间必须大于开始时间");
                flag2 = false;
              } else if (this.ruleForm.complete_date < this.ruleForm.end_date) {
                this.$message.error("交货周期时间必须大于售卖起止时间时间");
                flag2 = false;
              } else {
                flag2 = true;
              }
            }
            let arr = [];
            if(this.ruleForm.price_type){

              for(let index=0;index<this.SteppedPriceListlength;index++){
                  if(this.SteppedPriceListobj['num'+index] && this.SteppedPriceListobj['price'+index]){
                        arr.push(`${this.SteppedPriceListobj['num'+index]}-${this.SteppedPriceListobj['price'+index]}`);
                    }
              }
              if(arr.length<2){
                 this.$message.error("阶梯价格至少有两组!");
                 return;
              }
              if (!this.ruleForm.seckil_price) {
              this.ruleForm.seckil_price = this.SteppedPriceListobj.price0;
            }
            }

            this.ruleForm.price_level = arr.join("@");
            this.ruleForm.goods_count = this.ruleForm.stock_count;
            if (this.priceunit == "$美元") {
              this.ruleForm.priceunit = true;
            } else {
              this.priceunit = false;
            }
            this.ruleForm.access_token = this.access_token;
            if(this.UserInforma.userTagMap.tag==1){
               this.ruleForm.brand = this.UserInforma.userTagMap.brand;
            }
            if (flag2) {
              this.GetPublishGoods(this.ruleForm)
                .then(res => {
                  this.$message({
                    type: "success",
                    message: res
                  });
                  this.$router.push({
                    path: "/PersonalCenter/SuccessfulCommodityRelease"
                  });
                })
                .catch(err => {
                  this.$message.error(err);
                });
            }
          } else {
            this.$message.error("请完善信息!");
            return false;
          }
        });
      // }
    },
    // 选择搜索出来的产品
    selectProduct(item) {
      this.ruleForm.goods_name = item.productno;
      this.ruleForm.goods_id = item.id;
      this.selectProductList = [];
      this.selectProductObj = item;
      this.ruleForm.catergory_id = item.parent_id;
    },
    // 搜素品牌
    SearchBrand(x) {
      console.log(this.UserInforma)
      let obj={
        start: 0,
        length: 10,
        name: x,
      }
      if(this.UserInforma.userTagMap.tag==1){
        obj={...obj,brand:this.UserInforma.userTagMap.brand}
      }
      this.GetSerarchGoods(obj).then(res => {
        this.selectProductList = res.data;
      });
    },
    noSelect() {
      this.selectProductList = [];
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file, fileList) {
      console.log(res)

      // let arr = [];
      // fileList.forEach(item => {
      //   arr.push(item.name);
      // });
      if(this.ruleForm.image_urls){
        this.ruleForm.image_urls= this.ruleForm.image_urls+"@"+res.name
      }else{
        this.ruleForm.image_urls=res.name
      }
     // this.ruleForm.image_urls = arr.join("@");
    },
    handleAvatarSuccess2(response) {
      this.ruleForm.SourceImg = response.name;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 添加到阶梯价格
    addSteppedPrice() {
      if (this.SteppedPriceList.length < 3) {
        this.SteppedPriceList.push({
          num: "",
          price: ""
        });
      }
    },
    // 重置阶梯价
    resetSteppedPrice() {
      this.SteppedPriceListobj={
        placeholderprice0:"大于0",
         placeholdernum0:"大于0",
      }
      this.SteppedPriceList = [
        {
          num: "",
          price: ""
        }
      ];
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {

    this.querySellerCredit().then(res=>{
      console.log(res)
      this.SellerCredit=res
    });
    this.GetSearchDataSelect({
      access_token: this.access_token,
      distinguish: "3",
      isable: 1
    })
      .then(res => {
        this.diliverPlace = res;
        this.ruleForm.diliver_place = res[0].name;
      })
      .catch(err => {
        this.$message.error("数据请求错误！");
      });
  }
};
</script>
<style lang="less" scoped>
    @import "./SellerIssuesProduct.less";
</style>
<style scoped>
    .defaultradioSquare>>>.el-radio__label{
        font-size:18px;
    }
    .defaultradioSquare>>>.el-radio__inner{
        border-radius: 0;
        width:20px;
        height:20px;
    }
    .defaultradioSquare>>>.el-radio__inner::after{
        border:3px solid #fff;
        width:13px;
        height:4px;
        border-top-color:transparent;
        border-right-color: transparent;
        transform:rotate(-45deg)!important;
        left:0;
        top:0px;
        border-radius: 0;
        background:transparent;
    }
    .setitem>>>.el-form-item__content{
        margin-left:0!important;
    }
    .upload-demo{
        display:flex;
    }
    .upload-demo>>>.el-upload-list{
        display:flex;
    }
    .stepped-price>>>.el-input__inner{
        width:150px;
        padding-right:0;
    }
    .stepped-price>>>.el-input-group__prepend{
        padding:0 8px;
    }
    .stepped-price>>>.el-input-group__append{
        padding:0 8px;
    }
</style>

