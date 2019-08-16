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
                                <p>预计交期：{{sellerGoodsInfo.deliverTime | formatDate}}</p>
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
                        <span><i class="el-icon-star-off"></i>关注</span>
                        <span><i class="el-icon-circle-plus-outline"></i>询价蓝</span>
                    </div>
                    <div class="btnwrap">
                        <span class=" btn bgColor">立即购买</span>
                        <span class="btn orange">申请特价</span>
                        <span class="btn gray">申请特价</span>
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
                        <span>产品手册</span>
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
                purchaseObj:{},
                // 技术参数
                parameterList:[],
                datasheet: "",
                // 下载技术参数的路径
                downDatasheet: "",
                // loading
                loading: true,
            }
        },
        created(){
           let obj=sessionStorage.getItem('sellerGoodsDetail')
            if(obj){
                this.sellerGoodsInfo=JSON.parse(obj)
            }

        },
        mounted(){
            this.getDetail()
            this.searchDatasheet(this.sellerGoodsInfo.goods_id)
        },
        methods:{
            getDetail(){
                let obj={
                    id:this.sellerGoodsInfo.goods_id,
                    tag:'goodsinfo',
                    name:this.sellerGoodsInfo.goods_name
                }
                axios.request({...BrandDetail.searchResult,params:obj}).then(result=>{
                    console.log(result)
                    this.parameterList=result.data.goodsinfo.list;
                    // this.purchaseObj={
                    //     goods_id: res.id,
                    //     goods_name: res.productno,
                    //     goodsDesc: res.productdesc,
                    //     goodsImage: res.imageUrl,
                    //     clude_bill: res.factorySellerInfo.clude_bill,
                    //     price_unit: res.factorySellerInfo.priceunit,
                    //     seckill_goods_id: res.factorySellerInfo.seller_goods_id,
                    //     goods_type:res.factorySellerInfo.goods_type,
                    //     diliver_place: res.factorySellerInfo.diliver_place,
                    //     moq:Number(res.factorySellerInfo.moq),
                    //     mpq:Number(res.factorySellerInfo.mpq),
                    //     stockcount:res.factorySellerInfo.stockcount,
                    //     price_type:res.factorySellerInfo.price_type,
                    //     priceList:res.factorySellerInfo.priceList,
                    //     seckil_price:res.factorySellerInfo.seckil_price,
                    //     sellerName: res.factorySellerInfo.seller_name,
                    //     sellerHeader: res.factorySellerInfo.seller_header,
                    //     seller_id: res.factorySellerInfo.seller_id,
                    //     tag: 1,
                    // }

                })
            },
            // addInquiry() {
            //     if(!this.loginState){
            //         this.$router.push('/Login')
            //         return;
            //     }
            //     var obj = {
            //         sellerGoodsId: this.sellerGoodsInfo.id,
            //         goodsId:this.sellerGoodsInfo.id,
            //         sellerId:this.sellerGoodsInfo.brandId,
            //         goodsSource: "2",
            //         goodsName: this.sellerGoodsInfo.productno,
            //     };
            //     axios
            //         .request({ ...shoppingCar.insertShoppingCar, params: obj })
            //         .then(res => {
            //             this.$message.success("添加成功");
            //         });
            // },
            // addFocus(){
            //     if(!this.loginState){
            //         this.$router.push('/Login')
            //         return;
            //     }
            //     let obj={
            //         goods_id:this.sellerGoodsInfo.id,
            //         catergory_id :this.sellerGoodsInfo.classificationId,
            //         favour_type: "1",
            //     };
            //     axios
            //         .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
            //         .then(res => {
            //             this.$set(this.sellerGoodsInfo,"focus",true)
            //             // this.$message.success("已关注");
            //         });
            //
            // },
            // addShopingCar(){
            //     if(!this.loginState){
            //         this.$router.push('/Login')
            //         return;
            //     };
            //     var obj = {
            //         sellerGoodsId: this.sellerGoodsInfo.factorySellerInfo.seller_goods_id,
            //         sellerId:this.sellerGoodsInfo.factorySellerInfo.seller_id,
            //         goodsSource: "1",
            //         goodsName:this.sellerGoodsInfo.productno
            //     };
            //     axios
            //         .request({ ...shoppingCar.insertShoppingCar, params: obj })
            //         .then(res => {
            //             this.$message.success("添加成功");
            //         });
            // },
            // purchase(){
            //     if(!this.loginState){
            //         this.$router.push('/Login')
            //         return;
            //     }
            //     this.showPurchase=true
            // },
            // specialPrice(){
            //     if(!this.loginState){
            //         this.$router.push('/Login')
            //         return;
            //     }
            //     let factorySellerInfo=this.sellerGoodsInfo.factorySellerInfo
            //     factorySellerInfo.priceType=factorySellerInfo.price_type
            //     factorySellerInfo.priceLevel=factorySellerInfo.price_level
            //     this.$store.dispatch("promation", {...this.sellerGoodsInfo,factorySellerInfo:factorySellerInfo});
            //     this.$router.push("/InquiryBasket/ApplySpecialPrice");
            // },
            // searchDatasheet(id) {
            //     let ret = baseURL + "api-g/gods-anon/queryGoodsDatesheet?id=" + id;
            //     this.downDatasheet = ret;
            //     let resp =
            //         baseURL2 + "static/pdf/web/viewer.html?file=" + encodeURIComponent(ret);
            //     this.datasheet = resp;
            //     const self = this;
            //     setTimeout(() => {
            //         this.loading = false;
            //     }, 5000);
            // },
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
