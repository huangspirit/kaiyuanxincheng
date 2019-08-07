<template>
  <transition name="el-zoom-in-bottom">
    <div class="transition-box purchase" @mouseleave="callback">
      <span class="close fr" @click="callback">&times;</span>
      <div>
        <div class="info">
          <p class="goodsName">{{item.goods_name}}</p>
          <p>库存:{{item.stockcount}}</p>
        </div>
        <div>
          购买量：
          <el-input-number
            v-model="count"
            size="mini"
            @blur="handleBlur($event)"
            @change="handleChange($event)"
            :min="item.moq"
            :max="item.stockcount"
            :step="item.mpq"
            step-strictly
          ></el-input-number>
        </div>
        <div>
          单价:
          <strong>{{item.priceUnit?"$":"￥"}}{{price}}</strong>
        </div>
        <div>
          总计:
          <strong>{{item.priceUnit?"$":"￥"}}{{money | toFixed(4)}}</strong>
        </div>
        <div class="btnWrap">
          <span class="btn" @click="submitPurchase">提交结算</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
<<<<<<< HEAD
    import {mapMutations} from "vuex"
    export default {
        data(){
            return{
                //购买量
                count:0,
                //对应的购买价格
                price:0,
                //对应的总价
                money:0
            }
        },
        props:{
            item:{
                type:Object,
                default:{
                    //该组件需要的参数
                    // goods_id: res.id,
                    // goods_name: res.productno,
                    // goodsDesc: res.productdesc,
                    // goodsImage: res.imageUrl,
                    // clude_bill: res.factorySellerInfo.clude_bill,
                    // price_unit: res.factorySellerInfo.priceunit,
                    // seckill_goods_id: res.factorySellerInfo.seller_goods_id,
                    // goods_type:res.factorySellerInfo.goods_type,
                    // diliver_place: res.factorySellerInfo.diliverPlace,
                    // moq:0,
                    // mpq:0,
                    // stockcount:res.factorySellerInfo.stockcount,
                    // price_type:res.factorySellerInfo.price_type,
                    // priceList:[],
                    // seckil_price:res.factorySellerInfo.seckil_price,
                    // sellerName: this.item0.sellerName,       商家信息
                    // sellerHeader: this.item0.headUrl,        商家信息
                    // seller_id: this.item0.seller_id,         商家信息
                    // tag: this.item0.tag,                     商家信息
                    // complete_date: item.complete_date,
                    // diliver_date: item.diliver_date,
                    // end_date: item.end_date
                }
            }
        },
        mounted(){
            console.log(this.item);
            this.count=this.item.moq;
            if(this.item.price_type){
                this.price=parseFloat(this.item.priceList[0].price);
            }else{
                this.price=this.item.seckil_price;

            }
            this.money=this.count*this.price
        },
        filters:{
            toFixed(val,length){
                return parseFloat(val).toFixed(length)
            }
        },
        methods:{
            ...mapMutations("MerchantList",["setBuyOneGoodsDetail"]),
            callback(){
                this.$emit("closeCallBack")
            },
            handleBlur(event){
                let e=event.target.value
                this.handleChange(e);
            },
            handleChange(e){
                let obj = this.item;
                let currentPrice=0;
                if(obj.price_type){
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
                    currentPrice=obj.seckil_price
                }
                this.price=currentPrice;
                this.count=e;
                this.money=e*currentPrice
            },
            submitPurchase(){
                let item=this.item
                let orderJson=[];
                let obj={
                    goods_id: item.goods_id,
                    goodsDesc: item.goodsDesc,
                    goodsImage: item.goodsImage,
                    goods_name: item.goods_name,
                    diliver_place: item.diliver_place,
                    seckill_goods_id: item.seckill_goods_id,
                    clude_bill: item.clude_bill,
                    price_unit: item.price_unit,
                    goods_type:item.goods_type,
                    sellerName: item.sellerName,
                    sellerHeader: item.sellerHeader,
                    seller_id: item.seller_id,
                    tag: item.tag,
                    goods_count: this.count,
                    goods_price: this.price,
                    order_channe: 1,
                    pay_channe: 1,
                }
                if(!item.goods_type){
                    //标识期货
                    obj={...obj,
                        complete_date: item.complete_date,
                        diliver_date: item.diliver_date,
                        end_date: item.end_date
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
=======
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      //购买量
      count: 0,
      //对应的购买价格
      price: 0,
      //对应的总价
      money: 0
    };
  },
  props: {
    item: {
      type: Object,
      default: {
        //该组件需要的参数
        // goods_id: res.id,
        // goods_name: res.productno,
        // goodsDesc: res.productdesc,
        // goodsImage: res.imageUrl,
        // clude_bill: res.factorySellerInfo.clude_bill,
        // price_unit: res.factorySellerInfo.priceunit,
        // seckill_goods_id: res.factorySellerInfo.seller_goods_id,
        // goods_type:res.factorySellerInfo.goods_type,
        // diliver_place: res.factorySellerInfo.diliverPlace,
        // moq:0,
        // mpq:0,
        // stockcount:res.factorySellerInfo.stockcount,
        // price_type:res.factorySellerInfo.price_type,
        // priceList:[],
        // seckil_price:res.factorySellerInfo.seckil_price,
        // sellerName: this.item0.sellerName,       商家信息
        // sellerHeader: this.item0.headUrl,        商家信息
        // seller_id: this.item0.seller_id,         商家信息
        // tag: this.item0.tag,                     商家信息
        // complete_date: item.complete_date,
        // diliver_date: item.diliver_date,
        // end_date: item.end_date
      }
    }
  },
  mounted() {
    console.log(this.item);
    this.count = this.item.moq;
    if (this.item.priceList) {
      this.price = parseFloat(this.item.priceList[0].price);
    } else {
      this.price = this.item.seckil_price;
    }
    this.money = this.count * this.price;
  },
  filters: {
    toFixed(val, length) {
      return parseFloat(val).toFixed(length);
    }
  },
  methods: {
    ...mapMutations("MerchantList", ["setBuyOneGoodsDetail"]),
    callback() {
      this.$emit("closeCallBack");
    },
    handleBlur(event) {
      let e = event.target.value;
      this.handleChange(e);
    },
    handleChange(e) {
      let obj = this.item;
      let currentPrice = 0;
      if (obj.price_type) {
        if (obj.priceList.length == 1) {
          currentPrice = parseFloat(obj.priceList[0].price);
        } else if (obj.priceList.length == 2) {
          if (e <= Number(obj.priceList[1].num)) {
            currentPrice = parseFloat(obj.priceList[0].price);
          } else {
            currentPrice = parseFloat(obj.priceList[1].price);
          }
        } else if (obj.priceList.length == 3) {
          if (e <= Number(obj.priceList[1].num)) {
            currentPrice = parseFloat(obj.priceList[0].price);
          } else if (e <= Number(obj.priceList[2].num)) {
            currentPrice = parseFloat(obj.priceList[1].price);
          } else {
            currentPrice = parseFloat(obj.priceList[2].price);
          }
>>>>>>> eeabec5ab98697fd31d9624dc3ddd42591feaecf
        }
      } else {
        currentPrice = obj.seckil_price;
      }
      this.price = currentPrice;
      this.count = e;
      this.money = e * currentPrice;
    },
    submitPurchase() {
      let item = this.item;
      let orderJson = [];
      let obj = {
        goods_id: item.goods_id,
        goodsDesc: item.goodsDesc,
        goodsImage: item.goodsImage,
        goods_name: item.goods_name,
        diliver_place: item.diliver_place,
        seckill_goods_id: item.seckill_goods_id,
        clude_bill: item.clude_bill,
        price_unit: item.price_unit,
        goods_type: item.goods_type,
        sellerName: item.sellerName,
        sellerHeader: item.sellerHeader,
        seller_id: item.seller_id,
        tag: item.tag,
        goods_count: this.count,
        goods_price: this.price,
        order_channe: 1,
        pay_channe: 1
      };
      if (!item.goods_type) {
        //标识期货
        obj = {
          ...obj,
          complete_date: item.complete_date,
          diliver_date: item.diliver_date,
          end_date: item.end_date
        };
      }
      orderJson.push(obj);
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
      console.log(obj2);
      this.$store.dispatch("MerchantList/GetOrder", obj2).then(res => {
        localStorage.setItem(
          "buyOneGoodsDetail",
          JSON.stringify({
            data: JSON.stringify(res),
            obj2: JSON.stringify(obj2)
          })
        );
        this.setBuyOneGoodsDetail(
          JSON.stringify({
            data: JSON.stringify(res),
            obj2: JSON.stringify(obj2)
          })
        );

        this.$router.push({
          path: "/ShoppingCart/ShoppingSettlement"
        });
      });
    }
  }
};
</script>
<style scoped lang="less">
.purchase {
  position: absolute;
  bottom: 0;
  width: 100%;
  min-width: 1200px;
  right: 0;
  background: #f4f4f4;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0 0 5px 1px #999;
  .close {
    font-size: 20px;
    width: 20px;
    text-align: center;
    line-height: 18px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 1px solid #999;
    color: #999;
    cursor: pointer;
  }
  & > div {
    display: flex;
    justify-items: center;
    justify-content: space-around;
    & > div {
      flex: 1;
      margin-top: 10px;
      strong {
        color: #f22e2e;
      }
    }
    .info {
      margin-top: 0;
      text-align: center;
      font-size: 12px;
      .goodsName {
        color: #f22e2e;
        font-weight: bolder;
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
    .btnWrap {
      margin-top: 0;
      .btn {
        background: #f22e2e;
        color: #fff;
        line-height: 45px;
        padding: 0 22px;
        cursor: pointer;
      }
    }
  }
}
</style>
