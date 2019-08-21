<template>
    <div class="specialPrice">
        <div class="banner" >
            <img src="@/assets/image/specialPrice/cover.png" alt="">
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
                <ul class="list clear">
                    <li v-for="(item,k) in specialList" class="item clear" :class="(k+1)%2==0?'noMargin':''" :key="k">
                        <div class="wrapImg fl" @click="chipSellerGoodsDetal(item)">
                            <ImgE :src="item.goodsImageUrl" :W="300" :H="300">
                            </ImgE>
                        </div>
                        <div class="info fl" @click="chipSellerGoodsDetal(item)">
                            <div  class="goodsName">{{item.goods_name}}</div>
                            <div class="desc" :title="item.goodsDesc">{{item.goodsDesc}}</div>
                            <div>
                                <div class="count">
                                    <span>MOQ :&nbsp;{{item.moq}}</span>
                                    <span>MPQ :&nbsp;{{item.mpq}}</span>
                                    <span>剩 : {{item.goodsStockCount}}</span>
                                </div>
                            </div>
                            <div class="mark">
                                <span class="mark" v-if="item.tag==1">原厂</span>
                                <span>{{item.diliverPlace}}交货</span>
                                <span class="goodsType" :class="item.goods_type?'goods_type':''">{{item.goods_type?'现货':'订货'}}</span>
                            </div>
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
<!--                            <div @click.stop="addCar(item)" class="btn bgColor">加入购物车</div>-->
                            <div class="btn bgColor">立即跟单</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
    import {ladderPrice} from "../../lib/utils";
    import {axios,home,shoppingCar} from "../../api/apiObj";
    export default {
        data(){
            return {
                specialList:[],
                categoryList:[],
                pageSize:6,
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
                        is_old_product:"true",
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
                    is_old_product:true,
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
            },
            //加入购物车
            addCar(item){
                let obj={
                    sellerId:item.sellerId,
                    sellerGoodsId:item.id,
                    goodsSource:1,
                    goodsName:item.goods_name,
                    goodsId:item.goods_id
                }
                axios.request({...shoppingCar.insertShoppingCar,params:obj}).then(res=>{
                    this.$message.success("已加入购物车")
                })
            },
        }
    }
</script>
<style scoped lang="less">
    @import "./oldGoods.less";
</style>
