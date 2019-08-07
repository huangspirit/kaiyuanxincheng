<template>
  <!-- 商家列表 -->
  <div class="MerchantList" ref="searchBar" v-if="total">
    <table v-show="closeTable" border="1">
      <thead>
        <th>商家</th>
        <th>MOQ</th>
        <th>MPQ</th>
        <th>库存</th>
        <th>状态</th>
        <th>预计交期</th>
        <th>价格</th>
        <th>操作</th>
      </thead>
      <tbody>
        <template v-for="(item,index) in MerchantList">
            <tr class="MerchantItem"  :key="item.id">
                <td class="info">
                    <div>
                        <img :src="item.userImgeUrl"></img>
                        <div>
                            <p>{{item.sellerName}}</p>
                            <p><span class="tag">{{item.tag | tagFilter}}</span></p>
                        </div>
                    </div>
                </td>
                <td><p>{{item.moq}}</p></td>
                <td><p>{{item.mpq}}</p></td>
                <td><p>{{item.goodsStockCount}}</p></td>
                <td><p><span>{{item.goods_type ? '现货' : '期货'}}</span></p></td>
                <td>
                    <p>{{item.diliverPlace}}</p>
                    <p>
                        交期:
                        <span v-if="item.seller_always">
                            {{item.day_interval}}天后交货
                        </span>
                        <span v-else>
                            {{item.deliverTime | formatDate}}
                        </span>
                    </p>
                </td>
                <td class="price">
                        <div class="stepped-price" v-if="item.priceType">
                            <ul>
                                <li v-for="(val, k) in item.priceList" :key="k">
                                        <span>{{val.num}}+ ---</span>
                                        <strong >{{item.priceUnit ? '$' : '￥'}}{{val.price}}{{item.includBill ? '(含税)' : '(不含税)'}}</strong>
                                </li>
                            </ul>
                        </div>
                        <div v-else>
                            <strong class="price-num">{{item.priceUnit ? '$' : '￥'}}{{item.goodsPrice}}</strong>
                        </div>
                        <div v-if="!item.seller_always">
                            <CountTime
                                v-on:end_callback="countDownE_cb()"
                                :currentTime="item.currentTime"
                                :startTime="item.currentTime"
                                :endTime="item.expireTime"
                                :tipText="''"
                                :tipTextEnd="'距特价结束:'"
                                :endText="'活动已结束'"
                                :dayTxt="'天'"
                                :hourTxt="'小时'"
                                :minutesTxt="'分钟'"
                                :secondsTxt="'秒'"
                            ></CountTime>
                        </div>
                </td>
                <td class="operation">
                    <p @click="purchase(index)">购买</p>
                    <p @click="addCar(index)">加入购物车</p>
                    <Purchase :item="item.purchaseObj" v-if="item.showPurchase" @closeCallBack="item.showPurchase=false"></Purchase>
                </td>
            </tr>
        </template>
      </tbody>
    </table>
    <div class="arrow-bar">
        <p v-if="!closeTable">共有{{total}}个供应商发布特价产品，点击查看</p>
        <img src="@/assets/image/brandDetail/u4650.png" alt="" class="closeTable" v-show="closeTable" title="关闭" @click="closeEvent">
        <img src="@/assets/image/brandDetail/u4530.png" alt="" class="getMore" v-show="getMore" title="获取更多供应商特价" @click="getMoreList">
    </div>
  </div>
</template>
<style scoped lang="less">
    @import "./MerchantList.less";
</style>
<script>
import {TimeForma2,ladderPrice} from "../../lib/utils";
import {axios,home,shoppingCar} from "../../api/apiObj";
//import { mapState} from "vuex";
// import { constants } from "crypto";
export default {
  name: "MerchantList",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
        flag: false,
        // 阶梯价
        priceLevelList: [],
        // 总数量
        total: 0,
        MerchantList:[],
        pageSize:10,
        getMore:false,
        // purchaseObj:{},
        // showPurchase:false
    };
  },
  computed: {
      closeTable(){
        if(this.MerchantList.length){
            return true;
        }else{
            return false;
        }
      },
      loginState(){
          return this.$store.state.loginState
      }
  },

  methods: {
    GetMerchantList(){
        let obj={
            goods_id: this.id,
            start: 0,
            length: this.pageSize,
            status: "1"
        };
        axios.request({...home.SpecialOfferList,params:obj}).then(res=>{
            this.flag=true;
            this.total = res.data.total;
            this.MerchantList=res.data.data.map(item0 =>{
                if(item0.priceType){
                    item0.priceList=ladderPrice(item0.priceLevel)
                }
                return item0;
            })
            if(this.total>this.pageSize){
                //未完全请求，需展示请求更多的按钮
                this.getMore=true;
            }else{
                //不再请求更多数据
                this.getMore=false;
            }
        })
    },
    getMoreList(){
        this.pageSize+=10;
        this.GetMerchantList()
    },
  closeEvent(){
    this.MerchantList=[];
    this.getMore=true;
  },
    handleScroll() {
      if (this.flag) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        let offsetTop = this.$refs.searchBar.offsetTop;
        scrollTop - 300 < offsetTop ? (this.flag = true) : (this.flag = false);
      }
    },
      countDownE_cb(){
        this.init();
      },
      purchase(k){
          if(!this.loginState){
              this.$router.push('/Login')
              return;
          };
          let res=this.MerchantList[k]
          console.log(res)
         let purchaseObj={
              goods_id: res.goods_id,
              goods_name: res.goods_name,
              goodsDesc: res.goodsDesc,
              goodsImage: res.goodsImageUrl,
              clude_bill: res.includBill,
              price_unit: res.priceUnit,
              seckill_goods_id: res.id,
              goods_type:res.goods_type,
              diliver_place: res.diliverPlace,
              moq:res.moq,
              mpq:res.mpq,
              stockcount:res.goodsStockCount,
              price_type:res.priceType,
              priceList:res.priceList,
              seckil_price:res.goodsPrice,
              sellerName: res.sellerName,
              sellerHeader: res.userImgeUrl,
              seller_id: res.sellerId,
              tag: res.tag,
             complete_date: res.deliverTime,
             diliver_date: res.deliverTime,
             end_date: res.expireTime
          };
          this.MerchantList[k].purchaseObj=purchaseObj
          this.$set(this.MerchantList[k],"showPurchase",true)
       // this.showPurchase=true;
      },
      addCar(k){
          if(!this.loginState){
              this.$router.push('/Login')
              return;
          }
          console.log(this.MerchantList[k])
          var obj = {
              sellerGoodsId: this.MerchantList[k].id,
              sellerId:this.MerchantList[k].sellerId,
              goodsSource: "1",
              goodsName:this.MerchantList[k].goods_name
          };
          axios.request({ ...shoppingCar.insertShoppingCar, params: obj })
              .then(res => {
                  this.$message.success("添加成功");
              });
      },
  },
  mounted() {
    this.GetMerchantList()
  },
    filters:{
        tagFilter(val){
            switch (val) {
                case 1:
                    return "原厂商户";
                case 2:
                    return "代理商户";
                case 3:
                    return "普通商户";
            }
        },
        formatDate(val){
            return TimeForma2(val)
        }
    }
};
</script>
