<template>
    <transition name="el-zoom-in-bottom">
        <div class="transition-box purchase" @mouseleave="callback">
            <span class="close fr" @click="callback">&times;</span>
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
</template>
<script>
    export default {
        data(){
            return{
                currentItem:{}
            }
        },
        props:{
            item:{
                type:Object,
                default:{}
            }
        },
        mounted(){
            this.currentItem=this.item;
        },
        filters:{
            toFixed(val,length){
                return parseFloat(val).toFixed(length)
            }
        },
        methods:{
            callback(){
                this.$emit("closeCallBack")
            },
            handleBlur(event){
                let e=event.target.value
                this.handleChange(e);
            },
            handleChange(e){
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
    }
</script>
<style scoped lang="less">
    .purchase{
        position: absolute;
        bottom:0;
        left:0;
        width:100%;
        background: #f4f4f4;
        border-top:1px solid #999;
        padding:15px;
        box-sizing:border-box;
        .close{
            font-size:20px;
            width:20px;
            text-align: center;
            line-height: 18px;
            -webkit-border-radius: 100%;
            -moz-border-radius: 100%;
            border-radius: 100%;
            border:1px solid #999;
            color:#999;
            cursor: pointer;
        }
        &>div{
            display: flex;
            justify-items: center;
            justify-content: space-around;
            &>div{
                flex:1;
                margin-top:10px;
                strong{
                    color:#F22E2E;
                }
            }
            .info{
                margin-top:0;
                text-align: center;
                font-size:12px;
                .goodsName{
                    color:#F22E2E;
                    font-weight: bolder;
                    font-size: 16px;
                    margin-bottom:10px;
                }
            }
            .btnWrap{
                margin-top:0;
                .btn{
                    background:#F22E2E;
                    color:#fff;
                    line-height:45px;
                    padding:0 22px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
