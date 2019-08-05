<template>
  <div class="MerchantsConcernedImgTab">
    <!-- 关注商家产品列表 -->
    <div class="product-list">
        <transition name="el-zoom-in-bottom">
            <div v-show="show2" class="transition-box purchase" @mouseleave="show2=false" >
                <span class="close fr" @click="show2=false">&times;</span>
                <div>
                    <div class="info">
                        <p class="goodsName">{{currentItem.goods_name}}</p>
                        <p>库存:{{currentItem.goodsStockCount}}</p>
                    </div>
                    <div>
                        购买量：<el-input-number  v-model="currentItem.count" size="mini" @blur="handleBlur($event)" @change="handleChange($event)" :min="currentItem.moq"  :max="currentItem.goodsStockCount"  :step="currentItem.mpq"  step-strictly></el-input-number>
                    </div>
                    <div>单价: <strong>{{currentItem.priceUnit?"$":"￥"}}{{currentItem.price}}</strong></div>
                    <div>总计: <strong>{{currentItem.priceUnit?"$":"￥"}}{{currentItem.money | toFixed(4)}}</strong></div>
                    <div class="btnWrap"><span class="btn" @click="submitPurchase">提交结算</span></div>
                </div>
            </div>
        </transition>
      <ul class="product-list-con">
        <li
          v-for='(item, k) in goodsList'
          :key='k'
        >
            <div class="wrap">
                <p class="price">{{item.currentPrice}}</p>
                <ImgE :src="item.goodsImageUrl" class="prod-img" :W="150" :H="150"></ImgE>
                <p class="goodsName">{{item.goods_name}}</p>
                <p class="goodsDesc">{{item.goodsDesc}}</p>
                <span class="btn" @click="purchase(k)">
                    <img src="@/assets/image/PersonalCenter/u6221.png" alt>
                    立即采购
                </span>
            </div>
        </li>
      </ul>
        <div class="Pagination">
            <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page.sync="currentPage"
                @current-change="currentChange"
                >
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
    @import './MerchantsConcernedImgTab.less';
</style>
<script>
    import {mapMutations } from "vuex";
import {axios,buyerOrderCenter} from "../../api/apiObj";
import {ladderPrice} from "../../lib/utils";
export default {
  name: 'MerchantsConcernedImgTab',
    props:{
      list:{
          type:Object,
          default:{}
      },
        item0:{
          type:Object,
            default:{}
        }
    },
  data() {
    return {
        goodsList:[],
        pageSize:3,
        currentPage:1,
        total:0,
        show2:false,
        currentItem:{}
    };
  },
    filters:{
      toFixed(val,length){
          return parseFloat(val).toFixed(length)
      }
    },
    mounted(){
        this.total=this.list.total;
        this.goodsList=this.list.data.map(item=>{
            let moneyType=item.priceUnit?"$":"¥"
            if(item.priceType){
                let arr=ladderPrice(item.priceLevel)
                item.currentPrice=`${moneyType}${arr[arr.length-1].price}-${moneyType}${arr[0].price}`
            }else{
                item.currentPrice=`${moneyType}${item.goodsPrice}`
            }
            return item;
        })
    },
    computed:{
      start(){
          return this.pageSize*(this.currentPage-1)
      }
    },
  methods: {
      ...mapMutations("MerchantList",["setBuyOneGoodsDetail"]),
      currentChange(x){
          this.currentPage=x;
          this.getGoodsList();
      },
      getGoodsList(){
          let obj={
              start:this.start,
              length:this.pageSize,
              isenable:true,
              searchType:false,
              seller_id:this.item0.seller_id
          };
          axios.request({...buyerOrderCenter.queryPublishGoodsListByUser,params:obj}).then(res=>{
              console.log(res)
              this.goodsList=res.data.data.map(item=>{
                  let moneyType=item.priceUnit?"$":"¥"
                  if(item.priceType){
                      let arr=ladderPrice(item.priceLevel)
                      item.currentPrice=`${moneyType}${arr[arr.length-1].price}-${moneyType}${arr[0].price}`
                  }else{
                      item.currentPrice=`${moneyType}${item.goodsPrice}`
                  }
                  return item;
              })
          })
      },
      purchase(k){
          this.show2=true;
          let obj = this.goodsList[k];
          obj.count=obj.moq;
          let currentPrice=0
          if(obj.priceType){
              obj.priceList=ladderPrice(obj.priceLevel)
              currentPrice=parseFloat(obj.priceList[0].price);
              console.log(currentPrice)
          }else{
              currentPrice=obj.goodsPrice
          }
          obj.price=currentPrice
          obj.money=obj.count*currentPrice
          this.currentItem=obj
          console.log(this.currentItem)

      },
      handleBlur(event){
          let e=event.target.value
          this.handleChange(e);
      },
      handleChange(e){
          console.log("e:",e)
          let obj = this.currentItem;
          let currentPrice=0;
          if(obj.priceList){
              if(obj.priceList.length==1){
                  currentPrice=parseFloat(obj.priceList[0].price);
              }else if(obj.priceList.length==2){
                  if(e<=Number(obj.priceList[1].num)){
                      currentPrice=parseFloat(obj.priceList[0].price);

                  }else{
                      currentPrice=parseFloat(obj.priceList[1].price);

                  }

              }else if(obj.priceList.length==3){
                  if(e<=Number(obj.priceList[1].num)){
                      currentPrice=parseFloat(obj.priceList[0].price);

                  }else if(e<=Number(obj.priceList[2].num)){
                      currentPrice=parseFloat(obj.priceList[1].price);

                  }else{
                      currentPrice=parseFloat(obj.priceList[2].price);

                  }
              }
          }else{
              currentPrice=obj.goodsPrice
          }
          this.currentItem={...obj,price:currentPrice,money:e*currentPrice,count:e}
      },
      submitPurchase(){
            console.log(this.currentItem);
            let item=this.currentItem
          let orderJson=[]
          let obj={
              seckill_goods_id: item.id,
              goods_id: item.goods_id,
              goods_name: item.goods_name,
              goods_count: item.count,
              goods_price: item.price,
              order_channe: 1,
              clude_bill: item.includBill,
              pay_channe: 1,
              price_unit: item.priceUnit,
              goods_type:item.goods_type,
              sellerName: this.item0.sellerName,
              sellerHeader: this.item0.headUrl,
              seller_id: this.item0.seller_id,
              tag: this.item0.tag,
              goodsDesc: item.goodsDesc,
              goodsImage: item.goodsImageUrl,
              diliver_place: item.diliverPlace,
          }
          if(!item.goods_type){
              //标识期货
              obj={...obj,
                  complete_date: item.deliverTime,
                  diliver_date: item.deliverTime,
                  end_date: item.endTime
              }
          }
          orderJson.push(obj)
          let billObj = {
              billtype: "1",
              content_id: "1"
          };
          // 生成bill对象
          let obj2 = {
              bill: JSON.stringify(billObj),
              dilivertype: "1",
              order: JSON.stringify(orderJson),
              add_id: 1,
              type: 0,
              orderSource: 1
          };
          console.log(obj2)
          this.$store
              .dispatch("MerchantList/GetOrder", obj2).then(res=>{
              localStorage.setItem("buyOneGoodsDetail",JSON.stringify({
                  data: JSON.stringify(res),
                  obj2: JSON.stringify(obj2)
              }))
              this.setBuyOneGoodsDetail(JSON.stringify({
                  data: JSON.stringify(res),
                  obj2: JSON.stringify(obj2)
              }));
              this.$router.push({
                  path: "/ShoppingCart/ShoppingSettlement",
              });
          })
      }
  }
};
</script>

<style>
</style>
