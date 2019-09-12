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
                        placeholder="在呆料池中搜索"
                        suffix-icon="el-icon-search"
                        v-model="name"
                        size="mini"
                        @input="inputHandler">
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
                        <th class="info">供应商</th>
                        <th class="name">型号</th>
                        <th>品牌</th>
                        <th>批号/交货地点</th>
                        <th>数量</th>
                        <th>清仓价</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody class="list">
                    <tr  v-for="(item,k) in specialList" class="item clear" :class="(k+1)%2==0?'noMargin':''" :key="k"  >
                        <td class="info">
                            <div class="infoWrap">
                                <div  class="clear">
                                    <img :src="item.userImgeUrl" alt="" class="fl">
                                    <div class="fl">
                                        <p>{{item.sellerName}}</p>
                                        <p>
                                            <span class="tag" :class="{'bgColor':item.tag==1}">{{item.tag | filterTag}}</span>
                                            <span class="tag bgLightGray"  v-if="!item.focus" @click.stop="addFocus(k)" style="cursor:pointer;">关注</span>
                                            <span class="orange tag" v-if="item.focus">已关注</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="name" @click.stop="chipSellerGoodsDetal(item)">{{item.goods_name}}</td>
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
                            tag="span"
                            >
                                {{item.brandName}}
                            </router-link>
                         </td>
                        <td> {{item.base_no}}
                            <p class="desc">{{item.diliverPlace}}交货</p>
                        </td>
                        <td >
                              {{item.goodsCount}}只
                            <p class="desc">起订量：{{item.moq}}</p>
                        </td>
                        <td >
                            <div class="stepPrice">
                                <strong v-if="item.priceType">
                                   {{item.priceUnit?'$':'￥'}}{{item.priceList[item.priceList.length-1].price}}&nbsp;<i class="el-icon-circle-plus-outline" style="font-size:12px;"></i>
                                    <ul class="priceList">
                                        <li v-for="(item0,index0) in item.priceList" :key="index0">
                                            {{item0.num}}+---{{item.priceUnit?'$':'￥'}}{{item0.price}}({{!item.priceUnit?'含税':'不含税'}})
                                        </li>
                                    </ul>
                                </strong>
                                <strong v-if="!item.priceType">
                                    {{item.priceUnit?'$':'￥'}}{{
                                        item.goodsPrice
                                    }}
                                </strong>
                            </div>
                            <p class="desc">{{item.priceUnit?'不含税':'含13%增值税'}}</p>
                        </td>
                        <td @click.stop="chipSellerGoodsDetal(item)">
                             <a class="color">购买</a>
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
        </div>
    </div>
</template>
<script>
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
                categoryId:''
            }
        },
        filters:{
            filterTag(val){
                switch(val){
                    case 1:
                        return '原厂商户';
                    case 2:
                        return '代理商';
                    case 3:
                        return '普通商户';
                }
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
              ...mapMutations(['setloginState']),
            addFocus(index){
                 if(!this.loginState){
                    this.$router.push('/Login')
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
                      name:this.name
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
                    this.$message.success("已加入购物车")
                })
            },
        }
    }
</script>
<style scoped lang="less">
    @import "./oldGoods.less";
</style>
