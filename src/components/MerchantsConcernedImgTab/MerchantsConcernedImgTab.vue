<template>
  <div class="MerchantsConcernedImgTab">
    <!-- 关注商家产品列表 -->
    <div class="product-list">
      <transition name="el-zoom-in-bottom">
        <div v-show="show2" class="transition-box purchase" @mouseleave="show2=false">
          <span class="close fr" @click="show2=false">&times;</span>
          <div>
            <div class="info">
              <p class="goodsName">{{currentItem.goods_name}}</p>
              <p>剩余:{{currentItem.goodsStockCount}}只</p>
            </div>
            <div>
              跟单量：
              <el-input-number
                v-model="currentItem.count"
                size="mini"
                @blur="handleBlur($event)"
                @change="handleChange($event)"
                :min="currentItem.moq>currentItem.goodsStockCount?currentItem.goodsStockCount:currentItem.moq"
                :max="currentItem.goodsStockCount"
                :step="currentItem.mpq"
              ></el-input-number>
            </div>
            <div>
              单价:
              <strong>{{currentItem.priceUnit?"$":"￥"}}{{currentItem.price | toFixed(currentItem.priceUnit?3:2)}}</strong>
            </div>
            <div>
              金额:
              <strong>{{currentItem.priceUnit?"$":"￥"}}{{currentItem.money | toFixed(currentItem.priceUnit?3:2)}}</strong>
            </div>
            <div class="btnWrap">
              <span class="btn bgColor" @click.stop="submitPurchase">提交结算</span>
            </div>
          </div>
        </div>
      </transition>
      <ul class="product-list-con">
        <li v-if="goodsList.length==0" style="margin-top:90px;margin-left:50px;">该商家未发布产品</li>
        <li v-for="(item, k) in goodsList" :key="k" class="item">
          <div class="wrap" @click="open(item)">
            <ImgE :src="item.goodsImageUrl" class="prod-img" :W="100" :H="100"></ImgE>
            <p class="price" v-if="!item.priceType">
              <strong>一口价：{{item.priceUnit?'$':'￥'}}{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</strong>
            </p>
            <div class="price stepPrice" v-if="item.priceType">
              <strong>
                起售价：{{item.priceUnit?'$':'￥'}}{{item.priceList[0].price | toFixed(item.priceUnit?3:2)}}
                <i
                  class="el-icon-circle-plus-outline"
                ></i>
              </strong>
              <ul>
                <li v-for="item_0 in item.priceList" :key="item_0.price">
                  <p>
                    <strong>{{item_0.num}}---{{item.priceUnit?'$':'￥'}}{{item_0.price | toFixed(item.priceUnit?3:2)}}</strong>
                  </p>
                </li>
              </ul>
            </div>
            <p class="goodsName color">{{item.goods_name}}</p>
            <p class="goodsDesc">{{item.goodsDesc}}</p>
            <p>
              <span class="btn bgColor" @click.stop="purchase(k)">立即采购</span>
            </p>
          </div>
        </li>
        <li class="Pagination" v-if="goodsList.length">
          <el-button type="info" size="mini" disabled v-if="currentPage==1">上一页</el-button>
          <el-button
            type="info"
            size="mini"
            v-if="currentPage!=1"
            @click="CurrentChange(currentPage-1)"
          >上一页</el-button>
          <br />
          <el-button type="info" size="mini" v-if="currentPage==pageCount" disabled>下一页</el-button>
          <el-button
            type="info"
            size="mini"
            v-if="currentPage!=pageCount"
            @click="CurrentChange(currentPage+1)"
          >下一页</el-button>
          <br />
          <span>第 {{currentPage}} 页 共（{{pageCount}}）页</span>
        </li>
      </ul>
      <!-- <div class="Pagination">
            
            <el-pagination
                v-if="total"
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page.sync="currentPage"
                @current-change="currentChange"
                >
            </el-pagination>
      </div>-->
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./MerchantsConcernedImgTab.less";
</style>
<script>
import { mapMutations } from "vuex";
import { axios, buyerOrderCenter } from "../../api/apiObj";
import { ladderPrice } from "../../lib/utils";
export default {
  name: "MerchantsConcernedImgTab",
  props: {
    list: {
      type: Object,
      default: {}
    },
    item0: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      goodsList: [],
      pageSize: 3,
      currentPage: 1,
      total: 0,
      show2: false,
      currentItem: {}
    };
  },
  mounted() {
    this.total = this.list.total;
    this.goodsList = this.list.data.map(item => {
      if (item.priceType) {
        item.priceList = ladderPrice(item.priceLevel);
      }
      return item;
    });
  },
  updated() {
    console.log(this.list);
  },
  computed: {
    start() {
      return this.pageSize * (this.currentPage - 1);
    },
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    }
  },
  methods: {
    ...mapMutations("MerchantList", ["setBuyOneGoodsDetail"]),
    open(item) {
      //跳转商品详情
      sessionStorage.setItem(
        "sellerGoodsDetail",
        JSON.stringify({ ...this.item0, ...item })
      );
      this.$router.push("/sellerGoodsDetail");
    },
    currentChange(x) {
      this.currentPage = x;
      this.getGoodsList();
    },
    CurrentChange(x) {
      this.currentPage = x;
      this.getGoodsList();
    },
    getGoodsList() {
      let obj = {
        start: this.start,
        length: this.pageSize,
        isenable: true,
        searchType: false,
        seller_id: this.item0.seller_id
      };
      axios
        .request({
          ...buyerOrderCenter.queryPublishGoodsListByUser,
          params: obj
        })
        .then(res => {
          if (res.data.data) {
            this.goodsList = res.data.data.map(item => {
              if (item.priceType) {
                item.priceList = ladderPrice(item.priceLevel);
              }
              return item;
            });
          }
        });
    },
    purchase(k) {
      this.show2 = true;
      let obj = this.goodsList[k];
      obj.count = obj.moq;
      let currentPrice = 0;
      if (obj.priceType) {
        obj.priceList = ladderPrice(obj.priceLevel);
        currentPrice = parseFloat(obj.priceList[0].price);
        console.log(currentPrice);
      } else {
        currentPrice = obj.goodsPrice;
      }
      obj.price = currentPrice;
      obj.money = obj.count * currentPrice;
      this.currentItem = obj;
      console.log(this.currentItem);
    },
    handleBlur(event) {
      let e = event.target.value;
      if (
        this.currentItem.goodsStockCount >
        this.currentItem.mpq + this.currentItem.moq
      ) {
        this.currentItem.count =
          this.currentItem.moq +
          Math.round((e - this.currentItem.moq) / this.currentItem.mpq) *
            this.currentItem.mpq;
      } else {
        this.currentItem.count = e;
      }
      this.handleChange(e);
    },
    handleChange(e) {
      let obj = this.currentItem;
      let currentPrice = 0;
      if (obj.priceList) {
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
        }
      } else {
        currentPrice = obj.goodsPrice;
      }
      this.currentItem = {
        ...obj,
        price: currentPrice,
        money: e * currentPrice
      };
    },
    submitPurchase() {
      console.log(this.currentItem);
      let item = this.currentItem;
      let orderJson = [];
      let obj = {
        seckill_goods_id: item.id,
        goods_id: item.goods_id,
        goods_name: item.goods_name,
        goods_count: item.count,
        goods_price: item.price,
        order_channe: 1,
        clude_bill: item.includBill,
        pay_channe: 1,
        price_unit: item.priceUnit,
        goods_type: item.goods_type,
        sellerName: this.item0.sellerName,
        sellerHeader: this.item0.headUrl,
        seller_id: this.item0.seller_id,
        tag: this.item0.tag,
        goodsDesc: item.goodsDesc,
        goodsImage: item.goodsImageUrl,
        diliver_place: item.diliverPlace
      };
      if (!item.goods_type) {
        //标识期货
        obj = {
          ...obj,
          complete_date: item.deliverTime,
          diliver_date: item.deliverTime,
          end_date: item.endTime
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
      axios
        .request({
          ...buyerOrderCenter.orderCheck2,
          data: obj2,
          method: "post"
        })
        .then(res => {
          if (res.data) {
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
          } else {
            this.$confirm(res.message, "提示", {
              confirmButtonText: "继续提交新订单",
              cancelButtonText: "去订单中心支付",
              distinguishCancelAndClose: true,
              type: "warning"
            })
              .then(() => {
                this.$store
                  .dispatch("MerchantList/GetOrder", obj2)
                  .then(res => {
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
              })
              .catch(action => {
                if (action === "cancel") {
                  this.$router.push("/PersonalCenter/BuyerOrderManagement");
                }
              });
          }
        });
    }
  }
};
</script>

<style>
</style>
