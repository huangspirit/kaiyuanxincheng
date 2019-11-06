<template>
    <!--发布商品  -->
    <div>
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
   <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
            <el-breadcrumb-item>发布特价</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="SellerIssuesProduct" @click="noSelect">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="180px"
                class="form-list"
            >
             <p class="title">温馨提示：以下填写的信息将会直接展示给买家，发布成功后将不能修改，请仔细填写！</p>
                <el-form-item label="器件型号：" prop="goods_name" class="selectProduct">
                    <el-input v-model="ruleForm.goods_name" placeholder="请输入商品详细型号" @input="SearchBrand"  @blur="SearchBrandBlur" style="width:50%;"></el-input>
                    <p class="desc" style="padding-top:5px;color:#b3b3b3">若您输入的型号晶城没有收录，请及时反馈给我们；&nbsp;<a href="/feedback">&nbsp;反馈&nbsp;>></a></p>
                    <ul class="selectProductList" v-if="selectProductList.length">
                        <li
                            v-for="item in selectProductList"
                            @click="selectProduct(item)"
                            :key="item.id"
                            v-html="item.nick_name"
                        ></li>
                    </ul>
                    <div class="select-product-list" v-if="selectProductObj && selectProductObj.productno">
                        <div class="product-t">
                            <div class="detail">
                                <ImgE :src="selectProductObj.imgurl" :W="80" :H="80"></ImgE>
                                <div style="margin-left:5px;">
                                    <p><span>型号：</span><strong>{{selectProductObj.productno}}</strong></p>
                                    <p><span>品牌：</span><router-link :to="{
                                        path:'/BrandDetail/GoodsDetails',
                                        query:{
                                            tag:'goodsinfo',
                                            documentid:selectProductObj.brand,
                                            name:selectProductObj.branda
                                        }
                                    }">{{selectProductObj.branda}}</router-link></p>
                                    <p v-if="selectProductObj.refer_price"><span>官方参考价：</span>${{selectProductObj.refer_price}}</p>
                                </div>
                            </div>
                            <p>
                                <span>描述：</span>
                                {{selectProductObj.productdesc}}
                            </p>
                        </div>
                        <div class="product-b">
                            <!-- <p>当前选择商品</p> -->
                            <p class="price-b-sp">
                                历史平台最低价：
                                <span class="num">{{selectProductObj.history_price}}</span>
                            </p>
                            <p class="price-b-sp">
                                当前平台最低价：
                                <span class="num" >{{selectProductObj.price}}</span>
                            </p>
                        </div>
                    </div>
                </el-form-item>
                 <el-form-item label="器件状态：">
                    <el-radio-group v-model="ruleForm.goods_type" class="defaultradioSquare">
                        <el-radio :label="true" :value="true">现货</el-radio>
                        <el-radio :label="false" :value="false">订货</el-radio>
                    </el-radio-group>
                    <!-- <p class="desc" v-if="ruleForm.goods_type">现货商品需在买家下单24小时内发货，若发货时间超过24小时需要选择订货哦</p> -->
                    <p class="desc" v-if="!ruleForm.goods_type">只能一口价，买家下单订货商品时距离交期超过7天，可用预付款方式付款</p>
                </el-form-item>
                 <el-form-item label="批号：" prop="base_no" v-if="ruleForm.goods_type">
                    <el-input v-model="ruleForm.base_no" style="width:35%"></el-input>
                </el-form-item>
                <el-form-item label="交货地点：">
                    <el-select v-model="diliver_place_flag" placeholder="请选择交货地" style="width:35%;">
                        <el-option :value="item.flag" v-for="item in diliverPlace" :key="item.flag" :label="item.name">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="开票形式:">
                    <el-radio-group v-model="ruleForm.support_bill" class="defaultradioSquare">
                        <el-radio :label="true" :value="true">自己开</el-radio>
                        <el-radio :label="false" :value="false" v-if="!ruleForm.clude_bill">系统开</el-radio>
                    </el-radio-group>
                    <p class="desc"  v-if="!ruleForm.clude_bill && !ruleForm.support_bill">是否系统提供发票,不提供发票增加2%手续费</p> -->
                    <!-- <span class="small-sp"  v-if="!ruleForm.clude_bill">是否系统提供发票,不提供发票增加2%手续费</span> -->
                <!-- </el-form-item> -->
               
                <el-form-item label="是否为呆料：" v-if="ruleForm.goods_type">
                    <el-radio-group v-model="ruleForm.is_old_product" class="defaultradioSquare">
                        <el-radio :label="true" :value="true">是</el-radio>
                        <el-radio :label="false" :value="false">否</el-radio>
                    </el-radio-group>
                    <!-- <p class="desc"  v-if="!ruleForm.clude_bill && !ruleForm.support_bill">是否系统提供发票,不提供发票增加2%手续费</p> -->
                        <p class="desc gray" v-if="ruleForm.is_old_product">器件发布后将会放到呆料区，有利于用户快速找到购买，批号大于2年的可认为是呆料</p>
                    <!-- <span class="small-sp"  v-if="!ruleForm.clude_bill">是否系统提供发票,不提供发票增加2%手续费</span> -->
                </el-form-item>
                <el-form-item label="是否含税价：" v-if="priceunitMark!='$'">
                    <el-radio-group v-model="ruleForm.clude_bill" class="defaultradioSquare">
                        <el-radio :label="true" :value="true">含13%增值税</el-radio>
                        <el-radio :label="false" :value="false">不含税价</el-radio>
                    </el-radio-group>
                    <p class="desc" v-if="ruleForm.clude_bill">提示：含13%增值税，需要您开具增值税专用发票</p>
                    <p class="desc" v-if="!ruleForm.clude_bill">重要提示：若为不含税价，则用户看到的商品价格会在您发布的价格上加价13%，另外平台将收取您4%的服务费</p>
                </el-form-item>
                <el-form-item label="出价方式：">
                    <el-radio-group v-model="ruleForm.price_type" class="defaultradioSquare">
                        <el-radio :label="true" :value="true" v-if="ruleForm.goods_type && !ruleForm.is_old_product">阶梯价</el-radio>
                        <el-radio :label="false" :value="false">一口价</el-radio>
                    </el-radio-group>
                    <p class="desc" v-if="ruleForm.goods_type && ruleForm.price_type">只适合现货，价格降序填写，数量升序填写</p>
                    <div class="form-item" v-if="ruleForm.price_type && ruleForm.price_type">
                        <div class="stepped-price" v-for="(item,k) in SteppedPriceListlength" :key="k">
                            <div class="steppedItem">
                                <label>数量：</label>
                                <el-input @input="changeNum(k)" :placeholder="SteppedPriceListobj['placeholdernum'+k]" :name="k" v-model="SteppedPriceListobj['num'+k]" type="number" :min="SteppedPriceListobj['minnum'+k]"  @blur="numblur($event)">
                                    <!--                        <template slot="append">K</template>-->
                                </el-input>
                            </div>
                            <div class="steppedItem">
                                <label>价格：</label>
                                <el-input @input="changePrice(k)" :placeholder="SteppedPriceListobj['placeholderprice'+k]" :name="k" v-model="SteppedPriceListobj['price'+k]"  :max="SteppedPriceListobj['maxprice'+k]" :min="0"  @blur="priceblur($event)">
                                    <template slot="prepend">{{priceunitMark}}</template>
                                </el-input>
                                <strong v-if="SteppedPriceListobj['price'+k] && !ruleForm.clude_bill && priceunitMark!='$'">含税价为{{SteppedPriceListobj['price'+k] | addPriceFilter(ruleForm.priceunit?3:2)}}</strong>
                            </div>
                           
                        </div>
                        <div class="add-stepped-price">
                            <p v-if="SteppedPriceListlength === 3" style="color:#ff6600" >最多添加三个阶梯价格</p>
                            <span @click="resetSteppedPrice" class="reset">重置阶梯价格</span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="价格：" prop="seckil_price" v-if="ruleForm.price_type === false || ruleForm.is_old_product">
                    <el-input v-model="ruleForm.seckil_price" @input="changeSeckil_price" min="0" style="width:35%">
                        <template slot="prepend">{{priceunitMark}}</template>
                    </el-input>
                    <strong v-if="ruleForm.seckil_price && !ruleForm.clude_bill && priceunitMark!='$'">含税价为{{ruleForm.seckil_price | addPriceFilter(ruleForm.priceunit?3:2)}}</strong>
                </el-form-item>
                 
               <el-form-item label="最小订购量MOQ：" prop="moq" >
                   <el-input v-model="ruleForm.moq" style="width:35%" @input="inputmoq" :min="minmoq" :disabled="ruleForm.price_type">
                       <template slot="append">只</template>
                   </el-input>
                   <span class="descRight gray">此数量为用户可买的最小数量</span>
                </el-form-item>
                <el-form-item label="最小增量MPQ：" prop="mpq">
                    <el-input v-model="ruleForm.mpq"  style="width:35%">
                       <template slot="append">只</template>
                   </el-input>
                     <span class="descRight gray">客户只能购买这个数量的整数倍+最小订购量</span>

                </el-form-item>
                <el-form-item label="售卖数量：" prop="stock_count">
                    <el-input v-model="ruleForm.stock_count" @input="changeStockCount"  style="width:35%" placeholder="大于最小订购量" @blur="blurStockCount">
                       <template slot="append">只</template>
                    </el-input>
                     <span class="descRight gray">请发布真实售卖数量</span>
                    <p class="small" style="color:#ff6600" v-if="SellerCredit.tag!=1 && (needCredit > SellerCredit.restcredit)">您的信誉额度剩余为￥{{SellerCredit.restcredit}}，设置库存需要￥{{needCredit}}</p>
                </el-form-item>
                <el-form-item label="售卖期限：">
                    <el-radio-group v-model="ruleForm.seller_always" class="defaultradioSquare">
                        <el-radio :label="true" :value="true"  v-if="ruleForm.goods_type">长期卖</el-radio>
                        <el-radio :label="false" :value="false" v-if="!ruleForm.is_old_product">限时卖</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="起止时间：" prop="end_date" v-if="!ruleForm.seller_always">
                    <el-date-picker
                        v-model="ruleForm.start_date"
                        type="datetime"
                        placeholder="开始时间"
                        value-format="yyyy/MM/dd HH:mm:ss"
                        format="yyyy/MM/dd HH:mm:ss"
                        :picker-options="pickerOptions"
                           @change="handleTimeChange0"
                           style="margin-right:30px;"
                    ></el-date-picker>
                    <span>至</span>
                    <el-date-picker
                        style="margin-left:30px;"
                        @change="handleTimeChange"
                        v-model="ruleForm.end_date"
                        value-format="yyyy/MM/dd HH:mm:ss"
                        format="yyyy/MM/dd HH:mm:ss"
                        type="datetime"
                        placeholder="结束时间"
                        :picker-options="pickerOptions1"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="预计交期：" prop="complete_date" v-if="!ruleForm.seller_always && !ruleForm.goods_type" class="clear">
                    <el-date-picker
                        v-model="ruleForm.complete_date"
                        type="date"
                        style="width:220px"
                        placeholder="请选择预计交期时间"
                        value-format="yyyy/MM/dd"
                        format="yyyy/MM/dd"
                        :picker-options="pickerOptions3"
                        class="fl"
                    ></el-date-picker>
                    <span class="descRight" style="margin-left:10px;">该预计交期为截止时间开始计算的第几周</span>
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
                        :on-remove="handleRemoveimg"
                        :on-preview="handlePictureCardPreview"
                        :file-list="imglist"
                        multiple
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                        <!-- <div slot="tip" class="el-upload__tip">实物照片</div> -->
                        <div slot="tip" class="symbol">
                            <img  src="@/assets/image/PersonalCenter/_u24718.png" alt/>
                            <span style="width:100px;text-align:center">样张</span>
                        </div>
                    </el-upload>
                    <div style="margin-top:15px;">
                        <p style="color:#ff6600;line-height:20px" v-if="needImg">必选项，有利于您的商品销售</p>
                        <p style>图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</p>
                    </div>

                </el-form-item>
                <div class="form-item form-item-footer">
                    <label for></label>
                    <div class="submit bgColor" @click="submitForm('ruleForm')" style="cursor:pointer;">
                        发布产品</div>
                </div>
            </el-form>


        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
    @import "./SellerIssuesProduct.less";
</style>
<script>
    import {baseURL,baseURL4,baseURL3} from "@/config";
    import {mapActions,mapState } from "vuex";
    import {axios,sellerCenter} from "@/api/apiObj"
    export default {
        name: "SellerIssuesProduct",
        data() {
            return {
                pickerOptions: {
                    disabledDate: (time) => {
                        return time < new Date();
                    }
                },
                pickerOptions1: {
                    disabledDate: (time) => {
                         return time < new Date();
                    }
                },
                 pickerOptions3: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    },
                    },
                //可设置库存
                selectedPrice:0,
                exchange:1,
                //个人信誉
                SellerCredit:{},
                // 币种
                priceunit: "￥人民币",
                priceunitMark:"￥",
                // 现在选择 的产品的详情
                selectProductObj: {},
                // 预览图片
                dialogImageUrl: "",
                dialogVisible: false,
                // 交货地的列表
                diliverPlace: [],
                diliver_place_flag:1,
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
                //阶梯价时最小的moq
                    minmoq:0,
                // 含不含税
               // clude_billFlag: true,
                // 是不是自己开发票
                //support_billFlag: false,
                // 是不是一口价
                //图片回显
                imglist:[],
                ruleForm: {
                    //是否为呆料
                    is_old_product:false,
                    // 选择商品的名字
                    goods_name: "",
                    // 选择商品的id
                    goods_id: "",
                    catergory_id: "",
                    // 交货地
                    diliver_place: "",
                  
                    // 货物类型
                    goods_type: true,
                    // 预计交期
                    complete_date: "",
                    // 币种
                    priceunit: false,
                    // 是否含税
                    clude_bill: false,
                    // 价格方式
                    price_type: false,
                    // 售卖的方式，是不是长期卖
                    seller_always: true,
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
                    support_bill: false,
                    // 阶梯价
                    price_level: "",
                    // 多长时间后交货
                    day_interval: "",
                },
                rules: {
                    base_no:[
                         {
                            required: true,
                            message: "请输入批号",
                            trigger: "blur"
                        }
                    ],
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
                        }
                    ],
                    moq: [
                        {
                            required: true,
                            message: "请输入moq",
                            trigger: "blur",
                        },
                    ],
                    mpq: [
                        {
                            required: true,
                            message: "请输入mpq",
                            trigger: "blur",
                        },
                    ],
                    stock_count: [
                        {
                            required: true,
                            message: "请输入真实可卖数量",
                            trigger: "blur",
                        },
                    ],
                    start_date: [
                        {
                          
                            required: true,
                            message: "请输入开始日期",
                            trigger: "change"
                        }
                    ],
                    end_date: [
                        {
                            required: true,
                            message: "请输入结束日期",
                            trigger: "change"
                        }
                    ],
                    complete_date: [
                        {
                          
                            required: true,
                            message: "请选择预计交期时间",
                            trigger: "change"
                        }
                    ]
                }
            };
        },
       
        filters:{
            addPriceFilter(val,length){
                return (Number(val)*1.13).toFixed(length)
            },
        },
        computed: {
            needCredit(){
                return this.exchange*Number(this.ruleForm.stock_count)*this.selectedPrice
            },
            needImg(){
                return this.ruleForm.goods_type
            },
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
            // 发货地发生变化
            "diliver_place_flag": {
                handler() {
                    this.diliverPlace.map(item=>{
                        if(item.flag==this.diliver_place_flag){
                            this.ruleForm.diliver_place=item.name;
                            return;
                        }
                    })
                    if(this.diliver_place_flag==1){
                        //标识香港,不含税，系统开发票
                        this.exchange=this.SellerCredit.exchange
                       this.ruleForm.clude_bill = false;
                       this.ruleForm.support_bill = false;
                        this.priceunit = "$美元";
                        this.priceunitMark="$"
                        this.ruleForm.priceunit=true
                    }else{
                        //标志内地，如果不含税，则系统开发票
                        //如果含税，则自己开增值税发票
                        this.exchange=1;
                        this.priceunitMark="￥"
                        this.priceunit = "￥人民币";
                        this.ruleForm.priceunit=false
                    }
                }
            },
            // 是不是含税
            "ruleForm.clude_bill": {
                handler() {
                    this.ruleForm.support_bill=this.ruleForm.clude_bill
                }
            },
            "ruleForm.is_old_product":{
                handler(){
                    if(this.ruleForm.is_old_product){
                         this.$set(this.ruleForm,'price_type',false)
                         this.$set(this.ruleForm,'seller_always',true)
                    }
                }
            },
            // 价格类型，是不是一口价
            "ruleForm.price_type": {
                handler() {
                    if (this.ruleForm.price_type) {
                        this.$set(this.ruleForm,'moq',this.SteppedPriceListobj.num0)
                    } else {
                         this.$set(this.ruleForm,"moq","")
                    }
                    if(this.ruleForm.moq>this.ruleForm.stock_count){
                        this.$set(this.ruleForm,'stock_count',this.ruleForm.moq)
                    }
                }
            },
            //期货或者一口价
            "ruleForm.goods_type": {
                handler() {
                    if (!this.ruleForm.goods_type) {
                        this.ruleForm.is_old_product=false;
                        this.ruleForm.price_type = false;
                       this.ruleForm.seller_always=false;
                    } else {
                        this.ruleForm.price_type = true;
                        
                    }
                }
            },
        },
        methods: {
            ...mapActions("SellerIssuesProduct", [
                "GetSearchDataSelect",
                "GetSerarchGoods",
                "GetPublishGoods",
                "querySellerCredit"
            ]),
            //监控时间
             handleTimeChange0(date){
                var _this=this;
                this.$set(this.ruleForm,"end_date","")
                 this.$set(this.ruleForm,"complete_date","")
                this.$set(this.pickerOptions1,"disabledDate",function(time){
                     let nowData0 = new Date(date)
                    return time.getTime()<nowData0;
                })
            },
            handleTimeChange(date){
                var _this=this;
                this.$set(this.ruleForm,"complete_date","")
                this.$set(this.pickerOptions3,"disabledDate",function(time){
                     let nowData = new Date(date)
                    return time.getTime() < nowData;
                })
                let arr=[
                     {
                        text: '1周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    },
                     {
                        text: '2周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7*2);
                            picker.$emit('pick', date);
                        }
                    },
                     {
                        text: '3周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7*3);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '4周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7*4);
                            picker.$emit('pick', date);
                        }
                    },
                     {
                        text: '5周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 *5);
                            picker.$emit('pick', date);
                        }
                    }
                    ,
                     {
                        text: '6周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 6);
                            picker.$emit('pick', date);
                        }
                    },
                     {
                        text: '7周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 7);
                            picker.$emit('pick', date);
                        }
                    },
                     {
                        text: '8周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 8);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '9周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 9);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '10周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 10);
                            picker.$emit('pick', date);
                        }
                    },
                     {
                        text: '11周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 11);
                            picker.$emit('pick', date);
                        }
                    },
                     {
                        text: '12周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 12);
                            picker.$emit('pick', date);
                        }
                    },
                     {
                        text: '13周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 13);
                            picker.$emit('pick', date);
                        }
                    },
                     {
                        text: '14周',
                        onClick(picker) {
                            const date = new Date(_this.ruleForm.end_date);
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 14);
                            picker.$emit('pick', date);
                        }
                    },
                    

                ]
                this.$set(this.pickerOptions3,"shortcuts",arr)
            },
            //监控一口价
            changeSeckil_price(){
                //  let count=Number(this.ruleForm.stock_count);
                let obj =this.ruleForm.seckil_price+"";
                obj = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                obj = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
                obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');//只能输入4个小数
                if(obj.indexOf(".")< 0 && obj !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    obj= parseFloat(obj);
                }
                this.ruleForm.seckil_price=obj;
                this.selectedPrice=Number(this.ruleForm.seckil_price)
            },
            //监控阶梯价
            changePrice(k){
                if(!this.SteppedPriceListobj['price'+k]){
                    return;
                }
                let obj =this.SteppedPriceListobj['price'+k]+"";
                obj = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                obj = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
                obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');//只能输入两个小数
                if(obj.indexOf(".")< 0 && obj !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    obj= parseFloat(obj);
                }
                this.SteppedPriceListobj['price'+k]=obj;
                if(k==0){
                    this.selectedPrice=Number(this.SteppedPriceListobj.price0)
                }
            },
            changeNum(k){
                if(this.SteppedPriceListobj['num'+k]!=0 && !this.SteppedPriceListobj['num'+k]){
                    return;
                }
                let obj =this.SteppedPriceListobj['num'+k]+"";
                obj = obj.replace(/\D/g,'');
                this.SteppedPriceListobj['num'+k]=obj;
                console.log("改变")
                if(k==0){
                     this.minmoq=this.SteppedPriceListobj.num0;
                    this.$set(this.ruleForm,"moq",this.SteppedPriceListobj.num0)
                    if(this.ruleForm.stock_count<this.SteppedPriceListobj.num0){
                         this.$set(this.ruleForm,"stock_count",this.SteppedPriceListobj.num0)
                    }
                }
            },
            //输入库存
            changeStockCount(){
                let obj =this.ruleForm.stock_count+"";
                obj = obj.replace(/\D/g,'');
                this.ruleForm.stock_count=obj;
            },
            //输入售卖结束
              blurStockCount(){
                let obj =this.ruleForm.stock_count+"";
                obj = obj.replace(/\D/g,'');
                if(Number(obj)<this.ruleForm.moq){
                    this.$set(this.ruleForm,"stock_count",this.ruleForm.moq)
                }
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
            },
            //限制最小订购量的填写
            inputmoq(){
                if(this.ruleForm.price_type){
                        let value=Number(event.target.value)
                        let min=Number(event.target.min)
                    if(value<min){
                          this.$set(this.ruleForm,"moq",min)
                    }
                }
                
            },
            // 发布商品
            submitForm(formName) {
                console.log(this.ruleForm)
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let flag2 = true;
                        let retTimeFlag = this.ruleForm.start_date < this.ruleForm.end_date;
                        if (!this.ruleForm.seller_always) {
                            if (!retTimeFlag) {
                                this.$message.error("售卖起止时间必须大于开始时间");
                                flag2 = false;
                            }
                            //  else if (this.ruleForm.complete_date < this.ruleForm.end_date) {
                            //     this.$message.error("交期时间必须大于售卖起止时间时间");
                            //     flag2 = false;
                            // } else {
                            //     flag2 = true;
                            // }
                        }
                        let arr = [];
                        if(this.ruleForm.price_type){
                            for(let index=0;index<this.SteppedPriceListlength;index++){
                                if(this.SteppedPriceListobj['num'+index] && this.SteppedPriceListobj['price'+index]){
                                    if(this.SteppedPriceListobj['num'+index]<=this.SteppedPriceListobj['num'+(index-1)] ||  this.SteppedPriceListobj['price'+index]>= this.SteppedPriceListobj['price'+(index-1)]){
                                        this.$message.error("阶梯价格请按照要求填写!");
                                            return ;
                                    }
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
                        this.ruleForm.access_token = this.access_token;
                        if(this.UserInforma.userTagMap.tag==1){
                            this.ruleForm.brand = this.UserInforma.userTagMap.brand;
                        }
                        this.ruleForm.brand_id=this.selectProductObj.brand;
                        if(this.needImg){
                            if(!this.ruleForm.image_urls){
                                this.$message.error("现货必须上传实物图片");
                                return;
                            }
                        }
                        if(!this.ruleForm.goods_type){
                            //订货有交期，没批号
                            delete this.ruleForm.base_no;
                            delete this.ruleForm.day_interval;
                         
                        }else{
                             //现货有批号，并且默认一天发货
                             delete this.ruleForm.complete_date;
                            this.ruleForm.day_interval="1"
                        }
                        if(this.ruleForm.seller_always){
                            //长期卖
                            delete this.ruleForm.start_date;
                            delete this.ruleForm.end_date;
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
                this.selectProductObj = item;
                this.ruleForm.catergory_id = item.parent_id;
                this.selectProductList = [];
            },
            // 搜素品牌
            SearchBrand(x) {
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
            SearchBrandBlur(){
                let item=this.selectProductList[0]
                if(!item){
                    return;
                }
                this.ruleForm.goods_name = item.productno;
                this.ruleForm.goods_id = item.id;
                this.selectProductObj = item;
                this.ruleForm.catergory_id = item.parent_id;
                // this.selectProductList = [];
            },
            noSelect() {
                this.selectProductList = [];
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file, fileList) {
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
                // const isLt2M = file.size / 1024 / 1024 < 2;

                // if (!isLt2M) {
                //     this.$message.error("上传头像图片大小不能超过 2MB!");
                // }
                // return isLt2M;
            },
            // 添加到阶梯价格
            addSteppedPrice() {
                if (this.SteppedPriceList && this.SteppedPriceList.length < 3) {
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
            },
             handleRemoveimg(file,fileList){
                let arr = this.ruleForm.image_urls.split("@")
                arr.splice(arr.findIndex(item => baseURL3+item==file.url), 1)
                this.ruleForm.image_urls=arr.join("@")
             },
            //回显数据
            repeat(obj){
                if(obj.complete_date){
                    obj.complete_date=this.TimeForma2(obj.complete_date,'date')
                }
                if(obj.start_date){
                    obj.start_date=this.TimeForma2(obj.start_date);
                    obj.end_date=this.TimeForma2(obj.end_date);
                }
                if(obj.priceunit){
                    this.diliver_place_flag=1
                }else{
                     this.diliver_place_flag=2
                }
                if(obj.image_urls){
                    this.imglist=obj.image_urls.split("@").map(item=>{
                        return {url:baseURL3+"/"+item}
                    })
                }
                if(obj.price_type){
                    this.SteppedPriceListlength=obj.price_level.split("@").length;
                    let priceobj={}
                    obj.price_level.split("@").forEach((item ,index)=> {
                        priceobj['num'+index]=Number(item.split("-")[0])
                        priceobj['price'+index]=Number(item.split("-")[1])
                        if(index==0){
                            priceobj['placeholdernum'+index]='大于0';
                            priceobj['placeholderprice'+index]='大于0';
                        }else{
                             priceobj['placeholdernum'+index]='大于'+ priceobj['num'+(index-1)];
                            priceobj['placeholderprice'+index]='大于'+priceobj['price'+(index-1)];
                        }
                        
                    });
                    this.SteppedPriceListobj=priceobj;
                }
                delete obj.uid;
                delete obj.id;
                delete obj.publish_date;
                delete obj.is_special_price;
                delete obj.publish_date;
                delete obj.publish_exchange
                delete obj.real_seckil_price;
                delete obj.product_no;
                delete obj.isable;
                this.ruleForm=obj;
                        //商品名称
                     let sendobj={
                            start: 0,
                            length: 10,
                            name: obj.goods_name,
                        }
                    if(this.UserInforma.userTagMap.tag==1){
                        obj={...obj,brand:this.UserInforma.userTagMap.brand}
                    }
                    this.GetSerarchGoods(sendobj).then(res => {
                       if(res.data.length){
                            this.selectProductObj = res.data[0];
                       }
                    });
            },
            TimeForma2(value,type){
                let date = new Date(value)
                let y = date.getFullYear()
                let MM = date.getMonth() + 1
                MM = MM < 10 ? '0' + MM : MM
                let d = date.getDate()
                d = d < 10 ? '0' + d : d
               
                if(type=="date"){
                    return y + '/' + MM + '/' + d
                }else{
                     let h = date.getHours()
                    h = h < 10 ? '0' + h : h
                    let m = date.getMinutes()
                    m = m < 10 ? '0' + m : m
                    let s = date.getSeconds()
                    s = s < 10 ? '0' + s : s;
                    return y + '/' + MM + '/' + d + ' ' + h + ':' + m + ':' + s
                }
                
            }
        },
        mounted() {
            this.querySellerCredit().then(res=>{
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
                    this.diliver_place_flag=res[0].flag
                })
                .catch(err => {
                    this.$message.error("数据请求错误！");
                });
                //
                if(this.$route.query.name){
                    //根据商品名称发布
                     let obj={
                            start: 0,
                            length: 10,
                            name: this.$route.query.name,
                        }
                    if(this.UserInforma.userTagMap.tag==1){
                        obj={...obj,brand:this.UserInforma.userTagMap.brand}
                    }
                    this.GetSerarchGoods(obj).then(res => {
                       if(res.data.length){
                           this.ruleForm.goods_name = res.data[0].productno;
                            this.ruleForm.goods_id = res.data[0].id;
                            this.selectProductObj = res.data[0];
                            this.ruleForm.catergory_id = res.data[0].parent_id;
                       }
                        
                    });
                    };
                    //重新发布
                    if(this.$route.query.seller_id){
                        axios.request({...sellerCenter.querySellerGoodsDetail,params:{seller_id:this.$route.query.seller_id}}).then(res=>{
                            this.repeat(res.data)
                        })
                        
                }
                    
        },
        detroryed(){
            sessionStorage.removeItem("publishItem")
        }
    };
</script>
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

