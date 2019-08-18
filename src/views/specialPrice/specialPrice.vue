<template>
    <div class="specialPrice">
        <div class="cont allWidth">
            <div class="title">
                <div class="fr btn">
                    <i class="el-icon-refresh"></i>换一批
                </div>
                <ul class="clear">
                    <li>全部</li>
                    <li>集成电路</li>
                    <li>继电器</li>
                    <li>接插件</li>
                    <li>晶振</li>
                    <li>集成电路</li>
                </ul>
            </div>
            <div class="goodsList" >
                <ul class="list">
                    <li v-for="(item,k) in specialList" class="item" :class="(k+1)%3==0?'noMargin':''" :key="k">
                    <span class="mark" v-if="item.tag==1">
                        <img src="@/assets/image/home/tag.png" alt="">
                    </span>
                        <span class="goodsType" :class="item.goods_type?'goods_type':''">{{item.goods_type?'现货':'订货'}}</span>
                        <div class="wrapImg">
                            <ImgE :src="item.goodsImageUrl" :W="380" :H="200">
                            </ImgE>
                            <div class="desc" :title="item.goodsDesc">{{item.goodsDesc}}</div>
                        </div>
                        <div class="info">
                            <div class="time clear" v-if="!item.seller_always && item.expireTime">
                            <span class="fl">
                                <img src="@/assets/image/home/timer.png" alt="">
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
                                <router-link
                                    :to="{
                                path:'/BrandDetail',
                                query:{
                                  tag:'brand',
                                  name:item.brandName,
                                  documentid:item.brandId
                                }
                              }"
                                    tag="div"
                                    class="brand"
                                >
                                    {{item.brandName}}
                                </router-link>
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
    import {axios,home} from "../../api/apiObj";

    export default {
        data(){
            return {
                specialList:[]
            }
        },
        mounted(){
            this.getSpecialOfferList()
        },
        methods:{
            getSpecialOfferList(){
                let obj={
                    start:0,
                    length:6,
                    special_price:false,
                    status:1
                }
                axios.request({...home.SpecialOfferList,params:obj}).then(res=>{
                    this.specialList=res.data.data.map(item=>{
                        if(item.priceType){
                            //标识阶梯价
                            item.priceList=ladderPrice(item.priceLevel)
                        }
                        return item;
                    })
                })
            },
        }
    }
</script>
<style scoped lang="less">
    @import "./specialPrice.less";
</style>
