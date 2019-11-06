<template>
    <div class="specialPrice">
        <!-- <div class="banner">
            <img src="@/assets/image/specialPrice/futures_cover.png" alt="">
        </div> -->
        <div class="cont allWidth">
            <div class="title">
                <!-- <div class="fr btn" v-if="showGetMore" @click="getMore">
                    <i class="el-icon-refresh"></i>换一批
                </div> -->
                <div class="fr ">
                    <el-input
                        placeholder="在结果中查找型号"
                        v-model="name"
                        size="mini"
                        class="inputSearch"
                         style="width:250px;"
                           @keyup.enter.native="inputHandler"
                           clearable
                      >
                         <el-button slot="append" icon="el-icon-search" @click="inputHandler"></el-button>
                    </el-input>
                </div>
                <ul class="clear">
                    <li @click="getSpecialList(-1)" :class="{'active':selectedK==-1}">全部</li>
                    <li v-for="(item ,k) in categoryList" :key="k"  @click="getSpecialList(k)"  :class="{'active':selectedK==k}">{{item.name}}</li>
                </ul>
            </div>
            <div class="goodsList" >
                <ul class="list">
                    <li v-for="(item,k) in specialList" class="item" :class="(k+1)%3==0?'noMargin':''" :key="k"   >
                    <span class="mark" v-if="item.tag==1">
                        <img src="@/assets/image/index/tag.png" alt="">
                    </span>
                     <span class="mark" v-if="item.tag==2">
                        <img src="@/assets/image/index/tag1.png" alt="">
                    </span>
                    <!-- <span class="goodsType" :class="item.goods_type?'goods_type':''">{{item.goods_type?'现货':'订货'}}</span> -->
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
                                <p class="sellerName">{{item.sellerName}}</p>
                                <div class="wrapInfo clear">
                                    <div class="clear">
                                        <div class="wrap">
                                            <img :src="item.userImgeUrl" alt="" >
                                            <p :title="item.sellerName">
                                                {{item.sellerName}}<br>
                                               <span class="tag bgColor" v-if="item.tag!=3">{{item.tag | tagFilter}}</span> 
                                            </p>
                                        </div>
                                    </div>
                                    <p>发布商品量：{{item.publisCount}}</p>
                                    <p>历史成交量：{{item.historyCount}} </p>
                                    <p>
                                        <el-button class="btn0 bgColor" size="mini" v-if="!item.focus" @click.stop="addFocus(k)">关注</el-button>
                                        <el-button class="bgLightGray btn0" size="mini" v-if="item.focus">已关注</el-button>
                                        </p>
                                </div>
                            </div>
                            <div  class="brand" >
                                <router-link :to="{
                                    path:'/BrandDetail',
                                    query:{
                                        tag:'brand',
                                        documentid:item.brandId,
                                        name:item.brandName
                                    }
                                }">
                                    {{item.brandName}}
                                </router-link>
                            </div>
                        <div class="count"><span>起订量：&nbsp;{{item.moq}}只</span>
                        <!-- <span>最小增量：&nbsp;{{item.mpq}}只</span> -->
                        </div>
                         <div class="place" style="margin-top:3px;">
                            <span v-if="item.deliverTime">预计于 {{item.deliverTime | formatDate}}</span>
                            <span v-if="item.goods_type">现货</span>
                            <!-- <span v-if="item.day_interval">{{item.day_interval | filterHours}}小时内</span> -->
                            &nbsp;<span>{{item.diliverPlace}}交货</span>
                        </div>
                        </div>
                        <div class="stockCount">
                            <span>剩余{{item.goodsStockCount}}</span>
                            <strong class="color fr" v-if="!item.priceType">一口价：{{item.priceUnit?'$':'￥'}}{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</strong>
                             <strong class="color fr" v-if="item.priceType">起售价：{{item.priceUnit?'$':'￥'}}{{item.priceList[item.priceList.length-1].price | toFixed(item.priceUnit?3:2)}}</strong>
                        </div>
                        <div @click="chipSellerGoodsDetal(item)" class="btn bgColor">立即跟单</div>
                    </div>
                    </li>
                </ul>
                <Pagination
                    v-if="total"
                    :pageSize="pageSize"
                    :total="total"
                    :currentPage="currentPage"
                    @current-change="currentChange"
                ></Pagination>
            </div>
        </div>

    </div>
</template>
<script>
    import {ladderPrice, TimeForma} from "../../lib/utils";
    import {axios,home} from "../../api/apiObj";
    export default {
        data(){
            return {
                specialList:[],
                categoryList:[],
                pageSize:9,
                currentPage:1,
                selectedK:-1,
                showGetMore:true,
                name:'',
                total:0
            }
        },
        computed:{
            start(){
                return (this.currentPage-1)*this.pageSize
            }
        },
        filters:{
            formatDate(val){
                return TimeForma(val)
            },
            filterHours(val){
                return parseFloat(val)*24
            }
        },
        mounted(){
            this.getCategroy();
            this.getSpecialList(-1)
        },
        methods:{
            currentChange(x){
                this.currentPage=x;
                let category;
                if(this.categoryList[this.selectedK]){
                    category=this.categoryList[this.selectedK].id
                }
                this.getSpecialOfferList(category);
            },
            inputHandler(){
                this.currentPage=1;
                  let category;
                if(this.categoryList[this.selectedK]){
                    category=this.categoryList[this.selectedK].id
                }
                this.getSpecialOfferList(category)
            },
            countDownE_cb(){
                 let category;
                if(this.categoryList[this.selectedK]){
                    category=this.categoryList[this.selectedK].id
                }
                this.getSpecialOfferList(category)
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
                        goods_type:"false",
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
                    goods_type:false,
                    status:1,
                    catergory_id:categoryId,
                }
                if(this.name){
                    obj.name=this.name
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
                    }else{
                        this.specialList=[];
                        this.$message({
                            message: "搜索结果为空",
                            type: 'warning'
                        });
                    }
                     this.total=res.data.total;
                    // if(res.data.data.length<this.pageSize){
                    //     this.currentPage=0;
                    // }
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
    @import "./futures.less";
</style>
