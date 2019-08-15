<template>
    <div class="index">
        <div class="banner">
            <!-- <p class="tit">用芯链接世界</p> -->
            <el-carousel>
                <el-carousel-item v-for="(item,k) in bannerList" :key="k">
                    <img :src="item.url" alt="">
                </el-carousel-item>
            </el-carousel>
            <div class="wrapSearch">
                <p class="tit">
                    <countTo :endVal="brandTotal" :duration="4"></countTo>个厂商
                    <countTo :endVal="catergoryTotal" :duration="4"></countTo>种产品
                    <countTo :endVal="productTotal" :duration="4"></countTo>个产品
                </p>
                <p class="desc">数百家厂商的选择，芯手网值得您信赖</p>
                 <HeaderSearch ref="HeaderSearch" class="headerSeach"></HeaderSearch>
                <ul class="hot-search">
                    <li
                        @click="searchLink(item)"
                        v-for="(item, k) in HotSearchList"
                        :key="`list_${k}_${item.name}`"
                    >{{item.name}}</li>
                </ul>
            </div>
        </div>
        <div class="specialGoods allWidth">
            <div class="title">特价直通车</div>
            <div class="desc color">跟着特价买，越来越便宜</div>
            <ul class="list">
                <li v-for="(item,k) in specialList" class="item" :class="(k+1)%3==0?'noMargin':''">
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
                        <div class="time clear" v-if="item.expireTime">
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
                            <router-link
                                :to="{
                                    path:'/BrandDetail/GoodsDetails',
                                    query:{
                                      tag:'goodsinfo',
                                      name:item.goods_name,
                                      documentid:item.goods_id
                                    }
                                  }"
                                tag="div"
                                class="goodsName"
                            >{{item.goods_name}}</router-link>
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
                        <router-link
                            :to="{
                                    path:'/BrandDetail/GoodsDetails',
                                    query:{
                                      tag:'goodsinfo',
                                      name:item.goods_name,
                                      documentid:item.goods_id
                                    }
                                  }"
                            tag="div"
                            class="btn bgColor"
                        >立即跟单</router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="origin specialGoods">
            <div class="title">原厂直供</div>
            <div class="desc color">原厂直购、正品保障</div>
            <div class="cont clear allWidth">
                    <div class="fl left">
                        <div class="prodclass-r bgColor">
                            <p><i class="el-icon-s-operation"></i>热门厂商</p>
                            <div class="slideWrap" @mouseenter="handleEnter" @mouseleave="handleLeave">
                                <ul :class="{anim:animate==true}">
                                    <li v-for="(item,k) in catergoryBrandList" :key="item.id" @click="chipBrand(k)">
                                        <ImgE :src="item.imgurl" :W="190" :H="80"></ImgE>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                        <ul class="originGoodsList fl">
                            <li v-for="item in originGoodsList">
                                <ImgE :src="item.goodsImageUrl" :W="250" :H="150">
                                </ImgE>
                                <div class="goodsInfo">
                                    <router-link
                                        :to="{
                                    path:'/BrandDetail/GoodsDetails',
                                    query:{
                                      tag:'goodsinfo',
                                      name:item.goods_name,
                                      documentid:item.goods_id
                                    }
                                  }"
                                        tag="div"
                                        class="goodsName"
                                    >{{item.goods_name}}</router-link>
                                    <div class="desc">{{item.goodsDesc}}</div>
                                    <div class="count"><span>MOQ:&nbsp;{{item.moq}}</span><span>MPQ:&nbsp;{{item.mpq}}</span></div>
                                    <div class="marking">
                                        <span>原厂</span>
                                        <span>{{item.diliverPlace}}</span>
                                        <span>{{item.goods_type?'现货':'订货'}}</span>
                                    </div>
                                </div>
                                <div class="price">
                                    <div>
                                        <ol v-if="item.priceType">
                                            <li v-for="item0 in item.priceList" class="color">
                                                {{item0.num}}+---{{item.priceUnit?'$':'￥'}}{{item0.price}}({{item.includBill?'含税':'不含税'}})
                                            </li>
                                        </ol>
                                        <p class="color" v-if="!item.priceType">
                                            {{item.priceUnit?'$':'￥'}}{{item.goodsPrice}}({{item.includBill?'含税':'不含税'}})
                                        </p>
                                        <p class="bgColor btn" @click="addCar(item)">加入购物车</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                </div>
            </div>
        <div class="specialGoods origin oldProduct">
            <div class="title">呆料掘金</div>
            <div class="desc color">呆料里也有宝贝，库里的呆料本身已没有价值，卖了换钱吧......</div>
            <div class="allWidth clear">
                <span class="fr dailiao">我有呆料</span>
            </div>
            <div class="cont clear allWidth">
                <div class="fl left">
                    <img src="@/assets/image/banner/4.jpg" alt="">
                </div>
                <div class="goodsList fl">
                    <ul class="titleList bgColor">
                        <li class="goodsName">名称</li>
                        <li class="item">品牌</li>
                        <li class="item">数量</li>
                        <li class="item">交货地点</li>
                        <li class="item">清仓价</li>
                        <li class="item">购买</li>
                    </ul>
                    <ol>
                        <li v-for="item in oldProductList">
                            <p :title="item.goods_name" class="goodsName">{{item.goods_name}}</p>
                            <div>{{item.brandName}}</div>
                            <div>{{item.goodsStockCount}}</div>
                            <div>{{item.diliverPlace}}</div>
                            <div class="color">
                                <span v-if="item.priceType">
                                    {{item.priceUnit?'$':'￥'}}{{item.priceList[item.priceList.length-1]['price']}}
                                </span>
                                <span v-if="!item.priceType">
                                     {{item.priceUnit?'$':'￥'}}{{item.goodsPrice}}
                                </span>
                            </div>
                            <router-link
                                :to="{
                                    path:'/BrandDetail/GoodsDetails',
                                    query:{
                                      tag:'goodsinfo',
                                      name:item.goods_name,
                                      documentid:item.goods_id
                                    }
                                  }"
                                tag="div"
                                class="color"
                            >购买</router-link>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- 已入驻原厂 -->
        <div class="settledIn">
            <div class="title allWidth clear">
                <div class="fr ruzhu">
                    <span class="bgColor">立即入驻</span>
                </div>
                <div class="fl left clear">
                    <div class="count color fl"><countTo :endVal="1000" :duration="4"></countTo><span class="jia">+</span></div>
                    <div class="fl right">
                        <p class="tit">已入驻原厂</p>
                        <p class="small">数百家厂商的选择，芯手网值得您信赖</p>
                    </div>
                </div>
            </div>
            <ul class="clear allWidth">
                <template  v-for="(item,index) in originFactoryList">
                    <router-link
                        :to="{
                                    path:'/BrandDetail/GoodsDetails',
                                    query:{
                                      tag:'goodsinfo',
                                      name:item.goods_name,
                                      documentid:item.goods_id
                                    }
                                  }"
                        tag="li"
                        :key="`BrandList_${item.id}`"
                        @click="sendLink(item)"
                        :class="(index+1)%5==0?'rightCoverFlag':'leftCoverFlag'"
                        @mouseleave="item.show=false"
                        @mouseenter="item.show=true"
                    >
                        <div class="wrap">
                            <ImgE :src="item.imgurl" :W="300" :H="150"></ImgE>
                            <transition name="el-zoom-in-left">
                                <div class="coverFlag clear bgColor" v-show="item.show">
                                    <p class="brandName">{{item.branda}}</p>
                                    <p class="brandDesc"><i class="el-icon-circle-plus-outline"></i></p>
                                </div>
                            </transition>
                        </div>
                    </router-link>
                </template>
            </ul>

        </div>
        <!-- 产品分类 -->
        <div class="prodclass">
            <div class="prodclass-con clear allWidth">
                <div class="prodclass-l bgColor">
                    <p>
                        <img src="@/assets/image/home/u1491.png" alt>
                        产品分类
                    </p>
                    <ul>
                        <li v-for="(item,k) in CatergoryList" :class="selected==k?'color active':''" @click="selected=k">
<!--                            <span class="fr el-icon-arrow-right"></span>-->
<!--                            <ImgE :src="item.imgUrl" :W="30" :H="30" class="fl"></ImgE>-->
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="prodclass-m">
                    <div class="fl wrap">
                        <a v-for="(item,k ) in secondCategory" @click="chipUndirect(k)">{{item.name}}</a>
                    </div>
                </div>
                <div class="prodclass-r bgColor">
                    <p>入驻厂商</p>
                    <div class="slideWrap" @mouseenter="handleEnter" @mouseleave="handleLeave">
                        <ul :class="{anim:animate==true}">
                            <li v-for="(item,k) in catergoryBrandList" :key="item.id" @click="chipBrand(k)">
                                <ImgE :src="item.imgurl" :W="190" :H="80"></ImgE>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {axios,home,shoppingCar} from "../../api/apiObj";
    import HeaderSearch from "_c/HeaderSearch";
    import { SearchJump } from "@/lib/utils";
    import countTo from "_c/countTo";
    import {TimeForma2} from "../../lib/utils";
    import {ladderPrice} from "../../lib/utils";

    export default {
        data(){
            return {
                bannerList:[
                    {
                        url:require("@/assets/image/banner/1.jpg")
                    },
                    {
                        url:require("@/assets/image/banner/2.jpg")
                    },
                    {
                        url:require("@/assets/image/banner/3.jpg")
                    }
                ],
                HotSearchList:[],
                searchValue:"",
                specialList:[],
                originGoodsList:[],
                oldProductList:[],
                originFactoryList:[],
                //
                interval:null,
                animate:false,
                //分类
                CatergoryList:[],
                catergoryBrandList:[],
                selected:0,
                secondCategory:[],
            }
        },
        watch: {
            selected(k){
                this.catergoryBrandList=this.CatergoryList[k].list
                this.querySecondCatergory(k)
            }
        },
        filters:{
            formatDate(val){
                return TimeForma2(val)
            }
        },
        methods:{
            init(){
                this.getHotSearchList();
                this.getSpecialOfferList();
                this.getOriginGoodsList();
                this.getoldProductList();
                this.getOriginFactoryList();
                //获取分类
                this.queryCatergoryHomePage(0)
            },
            getHotSearchList(){
                axios.request(home.GetHotSearch).then(res=>{
                    this.HotSearchList=res.list;
                    this.brandTotal=res.brandTotal;
                    this.catergoryTotal=res.catergoryTotal;
                    this.productTotal=res.productTotal;
                })
            },
            getSpecialOfferList(){
                let obj={
                    start:0,
                    length:6,
                    special_price:false
                }
                axios.request({...home.SpecialOfferList,params:obj}).then(res=>{
                    console.log(res)
                    this.specialList=res.data.data.map(item=>{
                        if(item.priceType){
                            //标识阶梯价
                            item.priceList=ladderPrice(item.priceLevel)
                        }
                        return item;
                    })
                })
            },
            searchLink(item){
                this.searchValue = item.name;
                this.$router.push({
                    path: SearchJump(item.tag),
                    query: item
                });
            },
            getOriginGoodsList(){
                let obj={
                    start:0,
                    length:3,
                    create_tag:true
                }
                axios.request({...home.SpecialOfferList,params:obj}).then(res=>{
                    this.originGoodsList=res.data.data.map(item=>{
                        if(item.priceType){
                            //标识阶梯价
                            item.priceList=ladderPrice(item.priceLevel)
                        }
                        return item;
                    })
                })
            },
            getoldProductList(){
                let obj={
                    start:0,
                    length:3,
                    is_old_product:true
                }
                axios.request({...home.SpecialOfferList,params:obj}).then(res=>{
                    this.oldProductList=res.data.data.map(item=>{
                        if(item.priceType){
                            //标识阶梯价
                            item.priceList=ladderPrice(item.priceLevel)
                        }
                        return item;
                    })
                })
            },
            getOriginFactoryList(){
                axios.request({
                    ...home.findBrandList,
                    params:{start:0,
                        length:20,
                        type:'',
                        name:''}
                }).then(res=>{
                    this.originFactoryList=res.data.data.map(item=>{
                        item.show=false;
                        return item;
                    });
                })
            },
            //获取分类
            queryCatergoryHomePage(catergory_id){
                let obj={
                    catergory_id:catergory_id,
                    flag:true
                }
                axios.request({...home.queryCatergoryHomePage,params:obj}).then(res=>{
                    console.log(res)
                    this.CatergoryList=res.data;
                    this.catergoryBrandList=res.data[0].list;
                    this.interval=setInterval(this.scroll,5000)
                    this.querySecondCatergory(0)
                })
            },
            querySecondCatergory(k){
                let obj={
                    catergory_id:this.CatergoryList[k].id,
                    flag:false
                }
                axios.request({...home.queryCatergoryHomePage,params:obj}).then(res=>{
                    console.log(res)
                    this.secondCategory=res.data;
                })
            },
            //二级分类跳转
            chipUndirect(k){
                let obj = this.secondCategory[k];
                //  /BrandDetail/Direct?tag=direct&documentid=7&name=FPGA
                this.$router.push({
                    path:"/BrandDetail/Direct",
                    query:{
                        tag:'direct',
                        documentid: obj.id,
                        name:obj.name
                    }
                })
            },
            //厂商跳转
            chipBrand(k){
                let obj=this.catergoryBrandList[k]
                console.log(obj)
                //BrandDetail?tag=brand&documentid=70&name=Xilinx%20Inc.
                this.$router.push({
                    path:"/BrandDetail",
                    query:{
                        tag:'brand',
                        documentid:obj.id,
                        name:obj.brand}
                })
            },
            handleScroll() {
                var scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                if (scrollTop > 200) {
                    this.$store.state.headerFxed = true;
                } else {
                    this.$store.state.headerFxed = false;
                }
            },
            handleEnter(){
                clearInterval(this.interval)
            },
            handleLeave(){
                this.interval=setInterval(this.scroll,5000)
            },
            scroll(){
                console.log("gundong")
                this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
                setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                    this.catergoryBrandList.push(this.catergoryBrandList[0]);  // 将数组的第一个元素添加到数组的
                    this.catergoryBrandList.shift();               //删除数组的第一个元素
                    this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                },500)
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
            countDownE_cb(){
                console.log('刷新倒计时')
            }

        },
        mounted(){
            this.$store.state.headerFxed = false;
            // 滚动监听
            window.addEventListener("scroll", this.handleScroll);
            this.init()
        },
        components:{
            countTo,
            HeaderSearch
        },
        destroyed() {
            this.$store.state.headerFxed = true;
            window.removeEventListener("scroll", this.handleScroll);
            clearInterval(this.interval)
        }
    }
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
