<template>
    <div class="specialPrice">
        <div class="banner" >
            <img src="@/assets/image/specialPrice/cover.png" alt="">
        </div>
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
                      @keyup.enter.native="inputHandler"
                         class="inputSearch"
                             style="width:250px;"
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
            <table class="goodsList" >
                <thead>
                    <tr class="title">
                      
                        <th>图片</th>
                        <th class="name" >型号</th>
                          <th class="info">供应商</th>
                        <th>品牌</th>
                        <th>批号/交货</th>
                        <th>数量</th>
                        <th>清仓价</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody class="list">
                    <tr  v-for="(item,k) in specialList" class="item clear" :class="(k+1)%2==0?'noMargin':''" :key="k"  >
                        
                        <td>
                            <!-- <template v-for="(item0,index0) in item.sellerGoodsImageUrl.split('@')">
                            <div :key="item0" v-if="index0==0">
                                <span class="cover"></span>
                                <ImgE :src="baseURL3+'/'+item0" :W="50" :H="50"></ImgE>
                            </div>
                            </template>
                             -->
                            <div class="goodsImage">
                                <span class="cover el-icon-zoom-in" @click="bigImg(item.sellerGoodsImageUrl?item.sellerGoodsImageUrl:item.goodsImageUrl)"></span>
                                <ImgE :src="baseURL3+'/'+item.sellerGoodsImageUrl.split('@')[0]" :W="50" :H="50" v-if="item.sellerGoodsImageUrl"></ImgE>
                                <ImgE :src="item.goodsImageUrl" :W="50" :H="50" v-if="!item.sellerGoodsImageUrl">
                                </ImgE>
                            </div>
                        </td>
                        <td class="name" @click.stop="chipSellerGoodsDetal(item)">{{item.goods_name}}</td>
                        <td class="info">
                            <div class="infoWrap">
                                <div  class="clear" style="text-align:left;">
                                    <img :src="item.userImgeUrl" alt="" class="fl" @click="chipShop(item)"  style="cursor:pointer;">
                                    <div class="fl">
                                        <p @click="chipShop(item)" style="cursor:pointer;">{{item.sellerName}}</p>
                                        <p>
                                            <span class="tag bgColor" v-if="item.tag==1">{{item.tag | tagFilter}}</span>
                                             <span class="tag bgBlu" v-if="item.tag==2">{{item.tag | tagFilter}}</span>
                                              <span class="tag bgOrange" v-if="item.tag==18">{{item.tag | tagFilter}}</span>
                                            <span class="tag bgLightGray"  v-if="!item.focus" @click.stop="addFocus(k)" style="cursor:pointer;">关注</span>
                                            <span class="bgd5 tag" v-if="item.focus">已关注</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <router-link :to="{
                                path:'/BrandDetail',
                                query:{
                                    tag:'brand',
                                    documentid:item.brandId,
                                    name:item.goods_name
                                }
                            }" 
                            class="brandName"
                            >
                                {{item.brandName}}
                            </router-link>
                         </td>
                        <td>
                            <span class="green">{{item.base_no}}</span> 
                            <p class="desc">{{item.diliverPlace}}交货</p>
                        </td>
                        <td >
                              {{item.goodsCount}}只
                            <p class="desc">起订量：{{item.moq}}</p>
                        </td>
                        <td >
                            <div class="stepPrice">
                                <strong v-if="item.priceType" style="font-size:16px;">
                                   {{item.priceUnit?'$':'￥'}}{{item.priceList[item.priceList.length-1].price}}&nbsp;<i class="el-icon-circle-plus-outline" style="font-size:12px;"></i>
                                    <ul class="priceList">
                                        <li v-for="(item0,index0) in item.priceList" :key="index0">
                                            {{item0.num}}+---{{item.priceUnit?'$':'￥'}}{{item0.price | toFixed(item.priceUnit?3:2)}}({{!item.priceUnit?'含税':'不含税'}})
                                        </li>
                                    </ul>
                                </strong>
                                <strong v-if="!item.priceType" style="font-size:16px;">
                                    {{item.priceUnit?'$':'￥'}}{{
                                        item.goodsPrice | toFixed(item.priceUnit?3:2)
                                    }}
                                </strong>
                            </div>
                            <p class="desc">（{{item.priceUnit?'不含税':'含13%增值税'}}）</p>
                        </td>
                        <td @click.stop="chipSellerGoodsDetal(item)">
                             <a class="color">立即购买</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        <Pagination
            v-if="total"
            @current-change="handleCurrentChange"
            :pageIndex.sync="currentPage"
            :pageSize="pageSize"
            :total="total">
        </Pagination>
        <el-dialog
            title=""
            :visible.sync="showbigImg"
           >
           <div>
                <el-carousel height="500px" indicator-position="outside">
                    <el-carousel-item v-for="item in bigimg.split('@')" :key="item" style="line-height:420px;">
                        <img :src="baseURL3+'/'+item" alt="" style="max-height:400px;" v-if="item.indexOf('http')==-1">
                        <img :src="item" alt="" style="max-height:400px;" v-if="item.indexOf('http')!=-1">
                    </el-carousel-item>
                    </el-carousel>
           </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {baseURL3} from "@/config";
  import {mapState,mapActions,mapMutations} from 'vuex';
    import {ladderPrice} from "../../lib/utils";
    import {axios,home,shoppingCar} from "../../api/apiObj";
    export default {
        data(){
            return {
                specialList:[],
                categoryList:[],
                pageSize:15,
                currentPage:1,
                selectedK:-1,
                total:0,
                showGetMore:true,
                name:'',
                categoryId:'',
                baseURL3:baseURL3,
                showbigImg:false,
                bigimg:''
            }
        },
       
        computed:{
             ...mapState({
                headerFxed: state => state.headerFxed,
                loginState:state=>state.loginState,
            }),
            start(){
                return (this.currentPage-1)*this.pageSize
            }
        },
        mounted(){
            this.getCategroy();
            this.getSpecialList(-1)
        },
        methods:{
            ...mapActions("Login", ["GetUserInforma"]),
              ...mapMutations(['setloginState','setshowlogin']),
              bigImg(url){
                  this.showbigImg=true;
                  this.bigimg=url
              },
            addFocus(index){
                 if(!this.loginState){
                   // this.$router.push('/Login')
                     this.setshowlogin(true)
                    return;
                }
                let obj={
                    user_tag:this.specialList[index].tag,
                    seller_id :this.specialList[index].sellerId,
                    favour_type:2,//标识关注卖家
                };
                var _this=this;
                axios
                    .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
                    .then(res => {
                        _this.$set(_this.specialList[index],"focus",true)
                        _this.$message.success("已关注");
                    });
            },
            chipShop(item){
               
                if(item.tag==1){
                    this.$router.push({
                        path:"/BrandDetail",
                        query:{
                            tag:'brand',
                            documentid:item.brandId,
                            name:item.brandName
                        }
                    })
                }else{
                    this.$router.push({
                        path:"/sellerShopDetail",
                        query:{
                           
                            sellerId:item.sellerId
                        }
                    })
                }
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
                    this.categoryId=this.categoryList[k].id
                }else{
                     this.categoryId=""
                }
                this.getSpecialOfferList()
            },
            getCategroy(){
                axios.request({...home.queryDirectC,params:{
                        is_old_product:"true",
                        start:0,
                        length:10,
                      
                    }}).then(res=>{
                    this.categoryList=res.data.list;
                })
            },
            inputHandler(){
                 this.currentPage=1;
                this.getSpecialOfferList()
            },
             handleCurrentChange(x){
                 this.currentPage=x;
                 this.getSpecialOfferList()
             },
            getSpecialOfferList(){
                let obj={
                    start:this.start,
                    length:this.pageSize,
                    is_old_product:true,
                    status:1,
                    catergory_id:this.categoryId,
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
                            message: '搜索结果为空',
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
                    this.categoryId=this.categoryList[this.selectedK].id
                }
                this.getSpecialOfferList()
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
                    if(res){
                         this.$message.success("已加入购物车")
                         var _this=this;
                        setTimeout(()=>{
                            _this.GetUserInforma();
                        },2000)
                    }
                   
                })
            },
        }
    }
</script>
<style scoped lang="less">
    @import "./oldGoods.less";
</style>
