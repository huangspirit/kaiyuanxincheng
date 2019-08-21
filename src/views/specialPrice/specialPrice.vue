<template>
    <div class="specialPrice">
        <div class="banner">
            <img src="@/assets/image/specialPrice/specailPrice.png" alt="">
        </div>
        <div class="cont allWidth">
            <div class="title">
                <div class="fr btn" v-if="showGetMore" @click="getMore">
                    <i class="el-icon-refresh"></i>换一批
                </div>
                <ul class="clear">
                    <li @click="getSpecialList(-1)" :class="{'active':selectedK==-1}">全部</li>
                    <li v-for="(item ,k) in categoryList" :key="k"  @click="getSpecialList(k)"  :class="{'active':selectedK==k}">{{item.name}}</li>
                </ul>
            </div>
            <div class="goodsList" >
                <ul class="list">
                    <li v-for="(item,k) in specialList" class="item" :class="(k+1)%3==0?'noMargin':''" :key="k"  @click="chipSellerGoodsDetal(item)" >
                    <span class="mark" v-if="item.tag==1">
                        <img src="@/assets/image/index/tag.png" alt="">
                    </span>
<!--                        <span class="goodsType" :class="item.goods_type?'goods_type':''">{{item.goods_type?'现货':'订货'}}</span>-->
                        <div class="wrapImg" @click="chipSellerGoodsDetal(item)" >
                            <ImgE :src="item.goodsImageUrl" :W="380" :H="200">
                            </ImgE>
                            <div class="desc" :title="item.goodsDesc">{{item.goodsDesc}}</div>
                        </div>
                        <div class="info">
                            <div class="time clear" v-if="!item.seller_always && item.expireTime">
                            <span class="fl">
                                <img src="@/assets/image/index/timer.png" alt="">
                                距离特价结束：
                            </span>
                                <CountTime
                                    class="fl"
                                    v-on:end_callback="countDownE_cb()"
                                    :currentTime="item.currentTime"
                                    :startTime="item.currentTime"
                                    :endTime="item.expireTime"
                                    :tipText="'距离活动开始'"
                                    :tipTextEnd="''"
                                    :endText="'活动已失效'"
                                    :dayTxt="'天'"
                                    :hourTxt="'小时'"
                                    :minutesTxt="'分'"
                                    :secondsTxt="'秒'"></CountTime>
                            </div>
                            <div v-if="item.seller_always" class="time">长期售卖</div>
                            <div  @click="chipSellerGoodsDetal(item)" class="goodsName">{{item.goods_name}}</div>
                            <div>
                                <div class="sellerInfo fr">
                                    <p class="img"><img :src="item.userImgeUrl" alt=""></p>
                                    <p>{{item.sellerName}}</p>
                                </div>
                                <div class="brand" @click.stop="chipBrand(k)">{{item.brandName}}</div>
                                <div class="count"><span>MOQ:&nbsp;{{item.moq}}</span><span>MPQ:&nbsp;{{item.mpq}}</span></div>
                                <div class="place">
                                    <span v-if="item.deliverTime">预计于{{item.deliverTime | formatDate}}</span>
                                    <span v-if="item.day_interval">{{item.day_interval}}天后</span>
                                    &nbsp;{{item.diliverPlace}}交货
                                </div>
                            </div>
                            <div class="stockCount">
                                <span>当前剩余{{item.goodsStockCount}}</span>
                                <strong class="color fr">一口价：{{item.priceUnit?'$':'￥'}}{{item.goodsPrice}}</strong>
                            </div>
                            <div @click="chipSellerGoodsDetal(item)" class="btn bgColor">立即跟单</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
    import {ladderPrice} from "../../lib/utils";
    import {axios,home} from "../../api/apiObj";
    export default {
        data(){
            return {
                specialList:[],
                categoryList:[],
                pageSize:9,
                currentPage:1,
                selectedK:-1,
                showGetMore:true
            }
        },
        computed:{
            start(){
                return (this.currentPage-1)*this.pageSize
            }
        },
        mounted(){
            this.getCategroy();
            this.getSpecialList(-1)
        },
        methods:{
            chipBrand(k){
                let obj=this.specialList[k]
                //BrandDetail?tag=brand&documentid=70&name=Xilinx%20Inc.
                this.$router.push({
                    path:"/BrandDetail",
                    query:{
                        tag:'brand',
                        documentid:obj.brandId,
                        name:obj.brandName
                    }
                })
            },
            chipSellerGoodsDetal(item){
                //跳转商品详情
                sessionStorage.setItem('sellerGoodsDetail',JSON.stringify(item))
                this.$router.push("/sellerGoodsDetail")
            },
            getSpecialList(k){
                this.selectedK=k;
                //根据分类获取商品列表
                this.currentPage=1;
                let category;
                if(this.categoryList[k]){
                    category=this.categoryList[k].id
                }
                this.getSpecialOfferList(category)
            },
            getCategroy(){
                axios.request({...home.queryDirectC,params:{
                        "special_price":"false",
                        "goods_type":"true",
                        start:0,
                        length:10
                    }}).then(res=>{
                        this.categoryList=res.data.list;
                })
            },
            getSpecialOfferList(categoryId){
                let obj={
                    start:this.start,
                    length:this.pageSize,
                    special_price:false,
                    goods_type:true,
                    status:1,
                    catergory_id:categoryId
                }
                axios.request({...home.SpecialOfferList,params:obj}).then(res=>{
                    if(res.data.data.length){
                        this.specialList=res.data.data.map(item=>{
                            if(item.priceType){
                                //标识阶梯价
                                item.priceList=ladderPrice(item.priceLevel)
                            }
                            return item;
                        })
                    }
                    if(res.data.data.length<this.pageSize){
                        this.currentPage=0;
                    }
                })
            },
            getMore(){
                this.currentPage++;
                let category;
                if(this.categoryList[this.selectedK]){
                    category=this.categoryList[this.selectedK].id
                }
                this.getSpecialOfferList(category)
            }
        }
    }
</script>
<style scoped lang="less">
    @import "./specialPrice.less";
</style>
