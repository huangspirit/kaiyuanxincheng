<template>
    <div class="sellerGoodsDetail">
        <div class="BrandDetail-tit">
            <el-breadcrumb separator-class="el-icon-arrow-right " class="allWidth">
                <el-breadcrumb-item :to="{ path: '/' }">全部品牌</el-breadcrumb-item>
                <el-breadcrumb-item>{{sellerGoodsInfo.goods_name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sellerGoodsInfo allWidth">
            <div class="title">商品详情</div>
            <div class="cont clear ">
                <div class="fl left">
                    <ImgE :src="sellerGoodsInfo.goodsImageUrl" :W="200" :H="200"></ImgE>
                </div>
                <div class="fl right">
                    <p class="goodsName">{{sellerGoodsInfo.goods_name}}</p>

                    <span class="tag color">{{sellerGoodsInfo.tag | tagFilter}}</span>
                    <div class="price color" v-if="sellerGoodsInfo.priceType">
                        <p v-for="item in sellerGoodsInfo.priceList">{{item.num}}+ ~ {{sellerGoodsInfo.priceUnit?'$':'￥'}}{{item.price}}</p>
                    </div>
                    <p class="price color" v-if="!sellerGoodsInfo.priceType">
                        {{sellerGoodsInfo.priceUnit?'$':'￥'}}{{sellerGoodsInfo.goodsPrice}}
                    </p>
                    <div class="cont1">
                        <div class="mpq">
                            <div class="fl">
                                <p>MOQ：{{sellerGoodsInfo.moq}}</p>
                                <p>MPQ：{{sellerGoodsInfo.mpq}}</p>
                            </div>
                            <div ><p class="line"></p></div>
                            <div class="fl">
                                <p>币种：{{sellerGoodsInfo.priceUnit?'美元':'人民币'}}</p>
                                <p>库存：{{sellerGoodsInfo.goodsStockCount}}</p>
                            </div>
                            <div ><p class="line"></p></div>
                            <div class="fl">
                                <p v-if="sellerGoodsInfo.deliverTime ">预计交期：{{sellerGoodsInfo.deliverTime | formatDate}}</p>
                                <p v-if="sellerGoodsInfo.day_interval ">预计交期：{{sellerGoodsInfo.day_interval}}天后交货</p>
                                <p>交货地址：{{sellerGoodsInfo.diliverPlace}}</p>
                            </div>
                        </div>
                        <div>
                            <p class="brandName">
                                品牌：{{sellerGoodsInfo.brandName}}
                                <ImgE :src="sellerGoodsInfo.brandImageUrl" :W="500" :H="200"></ImgE>
                            </p>
                            <p class="brandDesc">功能描述：{{sellerGoodsInfo.goodsDesc}}</p>
                        </div>
                    </div>
                    <div class="icon">
                        <span @click="addFocus" v-if="!sellerGoodsInfo.focus"><i class="el-icon-star-off" ></i>关注</span>
                        <span @click="addInquiry"><i class="el-icon-circle-plus-outline" ></i>询价蓝</span>
                    </div>
                    <div class="btnwrap">
                        <span class=" btn bgColor" @click="purchase">立即购买</span>
                        <span class="btn orange" @click="specialPrice">申请特价</span>
                        <span class="btn gray" @click="addShopingCar">加入购物车</span>
                        <Purchase :item="purchaseObj" @closeCallBack="showPurchase=false" v-if="showPurchase" :mini="true"></Purchase>
                    </div>
                    <div class="mark">
                        * 标注现货字样的商品需要付全款购买，发货日期大于当前购买日期七天的按照用户信用额度进行百分比预付款，以订单支付日期为准
                    </div>
                </div>
            </div>
        </div>
        <div class="detail">
            <div class="allWidth">
                <div class="title">详细信息</div>
                <div class="detail-informan-con">
                    <p class="tit">
                        <span>技术参数</span>
                        <span>产品手册<i class="el-icon-circle-plus-outline" @click="openBig" title="放大查看"></i></span>
                    </p>
                    <ul class="parameter clear">
                        <li>
                            <el-table :data="parameterList" stripe border>
                                <el-table-column property="name" label="类型"></el-table-column>
                                <el-table-column property="value" label="参数"></el-table-column>
                            </el-table>
                        </li>
                        <li
                            class="datasheet"
                            style="height:700px"
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)">
                            <iframe
                                id="ifra"
                                :src="datasheet"
                                frameborder="0"
                                width="100%"
                                height="100%"
                                v-if="datasheet"
                            ></iframe>
                            <p v-else>暂无产品手册</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="70%"
        >
            <div
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <iframe
                    id="ifra1"
                    :src="datasheet"
                    frameborder="0"
                    width="100%"
                    height="600px"
                    v-if="datasheet"
                ></iframe>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { baseURL, baseURL2 } from "@/config";
    import { axios, shoppingCar,BrandDetail } from "@/api/apiObj";
    import {TimeForma2} from "../../lib/utils";
    export default {
        data(){
            return{
                sellerGoodsInfo:{},
                goodsinfo:{},
                purchaseObj:{},
                // 技术参数
                parameterList:[],
                datasheet: "",
                // 下载技术参数的路径
                downDatasheet: "",
                // loading
                loading: true,
                showPurchase:false,
                dialogVisible:false
            }
        },
        created(){
           let obj=sessionStorage.getItem('sellerGoodsDetail');
            if(obj){
                this.sellerGoodsInfo=JSON.parse(obj)
                this.purchaseObj={
                    goods_id: this.sellerGoodsInfo.goods_id,
                    goods_name: this.sellerGoodsInfo.goods_name,
                    goodsDesc: this.sellerGoodsInfo.goodsDesc,
                    goodsImage: this.sellerGoodsInfo.goodsImageUrl,
                    clude_bill: this.sellerGoodsInfo.includBill,
                    price_unit: this.sellerGoodsInfo.priceUnit,
                    seckill_goods_id:this.sellerGoodsInfo.id,
                    goods_type:this.sellerGoodsInfo.goods_type,
                    diliver_place: this.sellerGoodsInfo.diliverPlace,
                    moq:Number(this.sellerGoodsInfo.moq),
                    mpq:Number(this.sellerGoodsInfo.mpq),
                    stockcount:this.sellerGoodsInfo.goodsStockCount,
                    price_type:this.sellerGoodsInfo.priceType,
                    priceList:this.sellerGoodsInfo.priceList,
                    seckil_price:this.sellerGoodsInfo.goodsPrice,
                    sellerName: this.sellerGoodsInfo.sellerName,
                    sellerHeader:this.sellerGoodsInfo.userImgeUrl,
                    seller_id: this.sellerGoodsInfo.sellerId,
                    tag:this.sellerGoodsInfo.tag,
                }
            }

        },
        mounted(){
            this.getDetail()
            this.searchDatasheet(this.sellerGoodsInfo.goods_id)
        },
        methods:{
            openBig(){
                this.loading=true;
                this.dialogVisible=true;
                var _this=this;
                setTimeout(function(){
                    _this.loading=false
                },3000)
            },
            getDetail(){
                let obj={
                    id:this.sellerGoodsInfo.goods_id,
                    tag:'goodsinfo',
                    name:this.sellerGoodsInfo.goods_name
                }
                axios.request({...BrandDetail.searchResult,params:obj}).then(result=>{
                    this.parameterList=result.data.goodsinfo.list;
                    this.goodsinfo=result.data.goodsinfo
                    this.sellerGoodsInfo.focus=result.data.goodsinfo.focus
                })
            },
            addInquiry() {
                if(!this.loginState){
                    this.$router.push('/Login')
                    return;
                }
                var obj = {
                    sellerGoodsId: this.sellerGoodsInfo.id,
                    goodsId:this.sellerGoodsInfo.goods_id,
                    sellerId:this.sellerGoodsInfo.brandId,
                    goodsSource: "2",
                    goodsName: this.sellerGoodsInfo.goods_name,
                };
                axios
                    .request({ ...shoppingCar.insertShoppingCar, params: obj })
                    .then(res => {
                        this.$message.success("添加成功");
                    });
            },
            addFocus(){
                if(!this.loginState){
                    this.$router.push('/Login')
                    return;
                }
                let obj={
                    goods_id:this.sellerGoodsInfo.goods_id,
                    catergory_id :this.goodsinfo.classificationId,
                    favour_type: "1",
                };
                axios
                    .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
                    .then(res => {
                        this.$set(this.sellerGoodsInfo,"focus",true)
                        // this.$message.success("已关注");
                    });

            },
            addShopingCar(){
                if(!this.loginState){
                    this.$router.push('/Login')
                    return;
                };
                var obj = {
                    sellerGoodsId: this.sellerGoodsInfo.id,
                    sellerId:this.sellerGoodsInfo.sellerId,
                    goodsSource: "1",
                    goodsName:this.sellerGoodsInfo.goods_name
                };
                axios
                    .request({ ...shoppingCar.insertShoppingCar, params: obj })
                    .then(res => {
                        this.$message.success("添加成功");
                    });
            },
            purchase(){
                if(!this.loginState){
                    this.$router.push('/Login')
                    return;
                }
                this.showPurchase=true
            },
            specialPrice(){
                if(!this.loginState){
                    this.$router.push('/Login')
                    return;
                }
                let factorySellerInfo=this.goodsinfo.factorySellerInfo
                factorySellerInfo.priceType=factorySellerInfo.price_type
                factorySellerInfo.priceLevel=factorySellerInfo.price_level
                this.$store.dispatch("promation", {...this.goodsinfo,factorySellerInfo:factorySellerInfo});
                this.$router.push("/InquiryBasket/ApplySpecialPrice");
            },
            searchDatasheet(id) {
                let ret = baseURL + "api-g/gods-anon/queryGoodsDatesheet?id=" + id;
                this.downDatasheet = ret;
                let resp =
                    baseURL2 + "static/pdf/web/viewer.html?file=" + encodeURIComponent(ret);
                this.datasheet = resp;
                const self = this;
                setTimeout(() => {
                    this.loading = false;
                }, 5000);
            },
        },
        computed: {
            loginState(){
                return this.$store.state.loginState
            }
        },
        filters:{
            formatDate(val){
                return TimeForma2(val)
            },
            tagFilter(val){
                switch (val) {
                    case 1:
                        return "原厂直供";
                    case 2:
                        return "代理销售";
                    case 3:
                        return "商家售卖"
                }
            }
        }
    }
</script>
<style scoped lang="less">
    @import "./sellerGoodsDetail.less";
</style>
