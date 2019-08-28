<template>
  <div class="ShoppingCartSelect">
    <div class="ShoppingCart-con">
      <!-- 搜索 -->
      <div class="ShoppingCart-title">
        <span class="total">
          <span>购物车</span>
          <!--          <span class="num">()</span>-->
        </span>
        <!--        <div class="searchInput">-->
        <!--            <i class="el-icon-search"></i>-->
        <!--            <input type="text" placeholder="搜索商品">-->
        <!--        </div>-->
      </div>
      <!-- 列表 -->
      <div class="ShoppingCart-list">
        <div class="ShoppingCart-list-tit">
          <span style="width:15%" class="allcheckbox">
            <label class="checkBox">
              <input
                type="checkbox"
                :checked="ShoppingCartAllCheckbox"
                @change="ShoppingCartAllCheck"
              />全选
            </label>
          </span>
          <span style="width:20%">商品</span>
          <span style="width:17%">交期/交地</span>
          <span style="width:10%">单价/库存</span>
          <span style="width:15%">数量</span>
          <span style="width:10%">总计</span>
          <span style="width:13%">操作</span>
        </div>
        <div class="ShoppingCart-list-con">
          <p v-if="goodsList.length==0" class="nocontent">
            购物车空空如也,&nbsp;&nbsp;去
            <router-link to="/" tag="a">首页</router-link>添加商品
          </p>
          <template v-for="(item,k) in goodsList">
            <!--            <shoppingCarProductItem-->
            <!--              :key="`item.allcheckbox_${k}`"-->
            <!--              :ShoppingCartObject.sync="item"-->
            <!--              :ShoppingCartList.sync="ShoppingCartList"-->
            <!--              :ShoppingCartAllCheckbox.sync="ShoppingCartAllCheckbox"-->
            <!--            ></shoppingCarProductItem>-->
            <div class="item" :key="k">
              <div class="title">
                <label class="checkBox">
                  <input
                    type="checkbox"
                    :checked="item.checked"
                    @change="ShoppingCartCateCheck($event,k)"
                  />
                </label>
                <!--                    <span>{{item.sellerName}} <span style="font-size:12px">({{item.sellerTag | tagFilter}})</span></span>-->
                <div class="ImgE">
                  <img :src="item.sellerUrl" alt />
                  <div class="content">
                    <div class="top">
                      <img :src="item.sellerUrl" alt />
                      <div>
                        <p class="name">{{item.sellerName}}</p>
                        <p class="tag">{{item.sellerTag | tagFilter}}</p>
                      </div>
                    </div>
                    <div class="btn unactive" v-if="item.focus">已关注</div>
                    <div class="btn" @click="guanzhu(2,k)" v-else>关注</div>
                  </div>
                </div>
              </div>
              <template v-for="(item1,index) in item.list">
                <ul class="listDetail">
                  <li class="imgWrap" style="width:15%;">
                    <label class="checkBox" v-if="item1.isenable">
                      <input
                        type="checkbox"
                        :checked="item1.checked"
                        @change="ShoppingCartoneCheck($event,k,index)"
                      />
                    </label>
                    <label class="checkBox" v-if="!item1.isenable">
                      <input type="checkbox" readonly style="background:#e4e4e4" />
                    </label>
                    <div>
                      <ImgE :src="item1.goodsImageUrl" :W="86" :H="86"></ImgE>
                    </div>
                  </li>
                  <li style="width:20%;" class="info">
                    <p class="name">{{item1.goods_name}}</p>
                    <template>
                      <p v-if="item1.focus" class="guanzhu unguanzhu">
                        <span>已关注</span>
                      </p>
                      <p v-else @click="guanzhu(1,k,index)" class="guanzhu">
                        <span>关注</span>
                      </p>
                    </template>
                    <p class="desc">型号描述：{{item1.goodsDesc}}</p>
                  </li>
                  <li style="width:17%" class="place">
                    <p>{{item1.diliverPlace}}</p>
                    <template>
                      <p v-if="item1.seller_always">{{item1.day_interval}}天内交货</p>
                      <p v-else>{{item1.expireTime | formatDate}}</p>
                    </template>
                    <template>
                      <p v-if="item1.goods_type">
                        现货
                        <span
                          style="font-size:12px;color:#F22E2E;"
                          v-if="item1.seller_always"
                        >(长期卖)</span>
                        <span
                          style="font-size:12px;color:#F22E2E;"
                          v-if="!item1.seller_always"
                        >(限时卖)</span>
                      </p>
                      <p v-else>
                        期货
                        <span
                          style="font-size:12px;color:#F22E2E;"
                          v-if="item1.seller_always"
                        >(长期卖)</span>
                        <span
                          style="font-size:12px;color:#F22E2E;"
                          v-if="!item1.seller_always"
                        >(限时卖)</span>
                      </p>
                    </template>
                  </li>
                  <template>
                    <li style="width:10%" class="price" v-if="item1.priceType">
                      <p v-for="val in item1.priceList">
                        <span class="num">{{val.num}}+</span>---
                        <strong>{{item1.priceUnit?"$":"¥"}} {{val.price}}</strong>
                      </p>
                      <p class="goodsStockCount">
                        库存：
                        <strong>{{item1.goodsStockCount}}</strong>
                      </p>
                    </li>
                    <li style="width:10%;" class="price" v-else>
                      <p style="text-align: center;">
                        <strong>{{item1.priceUnit?"$":"¥"}}{{item1.goodsPrice}}</strong>
                      </p>
                      <p class="goodsStockCount">
                        库存：
                        <strong>{{item1.goodsStockCount}}</strong>
                      </p>
                    </li>
                  </template>
                  <li style="width:15%" class="count">
                    <el-input-number
                      v-model="item1.count"
                      size="mini"
                      @blur="handleBlur($event,k,index)"
                      @change="handleChange($event,k,index)"
                      :max="item1.goodsStockCount"
                      :min="item1.moq"
                      :step="item1.mpq"
                      step-strictly
                    ></el-input-number>
                    <p>Moq:{{item1.moq}}</p>
                    <p>Mpq:{{item1.mpq}}</p>
                  </li>
                  <li style="width:23%" class="all">
                    <div class="top" :class="item1.currentTime?' ':'act'">
                      <div class="count">
                        <strong>{{item1.priceUnit?"$":"¥"}}{{item1.money?item1.money:0 | toFixed(4)}}</strong>
                      </div>
                      <div class="count">
                        <!--                                    <p class="add" @click="add(k,index)">添加询价篮</p>-->
                        <span class="del">
                          <i class="el-icon-delete" size="medium" @click="del(k,index)"></i>
                        </span>
                      </div>
                    </div>
                    <div class="countTime">
                      <div>
                        <CountTime
                          v-if="!item1.seller_always && item1.expireTime"
                          class="countTime"
                          v-on:end_callback="countDownE_cb(item)"
                          :currentTime="item1.currentTime"
                          :startTime="item1.currentTime"
                          :endTime="item1.expireTime"
                          :tipText="'距离售卖开始:'"
                          :tipTextEnd="'特价剩余时间:'"
                          :endText="'活动已结束'"
                          :dayTxt="'天'"
                          :hourTxt="'时'"
                          :minutesTxt="'分'"
                          :secondsTxt="'秒'"
                        ></CountTime>
                        <p
                          style="text-align: center;"
                          v-if="!item1.seller_always && !item1.expireTime"
                        >活动已结束</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </template>
            </div>
          </template>
        </div>
        <Pagination
          v-if="total"
          class="page"
          @current-change="handleCurrentChange"
          :currentPage.sync="currentPage"
          :pageSize="pageSize"
          :total="total"
        ></Pagination>
      </div>
    </div>
    <!-- 底部全选 -->
    <div class="footerFixed" v-if="goodsList.length">
      <div class="fixed-all clear">
        <div class="fixed_right fr">
          <div>
            <p class="num">
              已选
              <span>{{count}}</span>
              件商品
            </p>
            <p class="price">
              总价：
              <span>￥{{unMoney | toFixed(4)}}</span>+
              <span>${{unitMoney | toFixed(4)}}</span>
            </p>
          </div>
          <span @click="submit">去结算</span>
          <!--                  <router-link to="/ShoppingCart/ShoppingSettlement" tag="span" @click="submit">去结算</router-link>-->
        </div>
        <div class="fixed_left fl">
          <span class="allcheckbox">
            <label class="checkBox">
              <input
                type="checkbox"
                :checked="ShoppingCartAllCheckbox"
                @change="ShoppingCartAllCheck"
              />全选
            </label>
          </span>
          <!--                  <span>删除已选商品</span>-->
          <!--                   <span>|</span>-->
          <!--                  <span>添加至询价篮</span>-->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./ShoppingCartSelect.less";
</style>
<script>
import { mapMutations } from "vuex";
import shoppingCarProductItem from "_c/shoppingCarProductItem";
import { axios, shoppingCar } from "../../../api/apiObj";
import { TimeForma2, ladderPrice } from "@/lib/utils";

export default {
  name: "ShoppingCartSelect",
  data() {
    return {
      ShoppingCartAllCheckbox: false,
      pageSize: 2,
      currentPage: 1,
      total: 0,
      goodsList: []
    };
  },
  methods: {
    ...mapMutations("MerchantList", ["setBuyOneGoodsDetail"]),
    // ...mapActions("shoppingCart", ["GetAllShoppingCartList"]),
    ShoppingCartAllCheck(e) {
      this.ShoppingCartAllCheckbox = e.target.checked;
      this.goodsList = this.goodsList.map(item => {
        item.checked = e.target.checked;
        item.list = item.list.map(item0 => {
          if (item0.isenable) {
            item0.checked = e.target.checked;
          } else {
            item0.checked = false;
          }

          return item0;
        });
        return item;
      });
    },
    ShoppingCartCateCheck(e, k) {
      this.goodsList[k]["checked"] = e.target.checked;
      this.goodsList[k].list = this.goodsList[k].list.map(item0 => {
        0;
        if (item0.isenable) {
          item0.checked = e.target.checked;
        } else {
          item0.checked = false;
        }
        return item0;
      });
    },
    ShoppingCartoneCheck(e, k, index) {
      this.goodsList[k].list = this.goodsList[k].list.map((item0, index0) => {
        if (index0 == index) {
          if (item0.isenable) {
            item0.checked = e.target.checked;
          } else {
            item0.checked = false;
          }
        }
        return item0;
      });
    },
    init() {
      let obj = {
        source: 1,
        start: this.start,
        length: this.pageSize
      };
      axios.request({ ...shoppingCar.inquiryList, params: obj }).then(res => {
        this.goodsList = res.data.data.map(item => {
          item.list.map(item0 => {
            item0.count = item0.moq;
            if (item0.priceLevel) {
              item0.priceList = ladderPrice(item0.priceLevel);
              item0.money = item0.moq * item0.priceList[0].price;
            } else {
              item0.money = item0.moq * item0.goodsPrice;
            }
            return item0;
          });
          return item;
        });
        this.total = res.data.total;
      });
    },
    handleCurrentChange(x) {
      this.currentPage = x;
      this.ShoppingCartAllCheckbox = false;
      this.init();
    },
    //关注
    guanzhu(favour_type, k, index) {
      console.log(this.goodsList[k]);
      let obj = {
        favour_type: favour_type
      };
      if (favour_type == 1) {
        obj = {
          ...obj,
          goods_id: this.goodsList[k].list[index].goods_id,
          catergory_id: this.goodsList[k].list[index].catergoryId
        };
      } else if (favour_type == 2) {
        obj = {
          ...obj,
          user_tag: this.goodsList[k].sellerTag,
          seller_id: this.goodsList[k].sellerId
        };
      }
      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          this.$message.success(res.message);
          if (favour_type == 1) {
            this.$set(this.goodsList[k].list[index], "focus", true);
          } else if (favour_type == 2) {
            this.$set(this.goodsList[k], "focus", true);
          }

          //  this.goodsList[k].foucs=true
        });
    },
    //加入询价蓝
    add(k, index) {
      let item = this.goodsList[k].list[index];
      let obj = {
        sellerId: item.sellerId,
        sellerGoodsId: item.id,
        goodsSource: '2',
        goodsId:item.id
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          this.$message.success("已加入询价蓝");
        });
    },
    //从购物车删除商品
    del(k, index) {
      let item = this.goodsList[k].list[index];
      let obj = {
        id: item.id
      };
      axios
        .request({ ...shoppingCar.deleteSigletonShoppingCar, params: obj })
        .then(res => {
          this.$message.success("成功移除");
          this.init();
        });
    },
    handleBlur(event, k, index) {
      let e = event.target.value;
      this.handleChange(e, k, index);
    },
    handleChange(e, k, index) {
      let obj = this.goodsList[k].list[index];
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
      this.goodsList[k].list = this.goodsList[k].list.map((item, index0) => {
        if (index0 == index) {
          item.money = e * currentPrice;
          item.currentPrice = currentPrice;
        }
        return item;
      });
    },
    submit() {
      //去结算
      let orderJson = [];
      this.goodsList.forEach(item0 => {
        item0.list.forEach(item => {
          if (item.checked && item.isenable) {
            let obj = {
              seckill_goods_id: item.seller_goods_id,
              goods_id: item.goods_id,
              goods_name: item.goods_name,
              goods_count: item.count,
              goods_price: item.currentPrice,
              order_channe: 1,
              clude_bill: item.includBill,
              pay_channe: 1,
              price_unit: item.priceUnit,
              goods_type: item.goods_type,
              sellerName: item0.sellerName,
              sellerHeader: item0.sellerUrl,
              seller_id: item0.sellerId,
              tag: item0.sellerTag,
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
          }
        });
      });
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
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  filters: {
    toFixed(val, length) {
      return val.toFixed(length);
    },
    tagFilter(val) {
      switch (Number(val)) {
        case 1:
          return "原厂";
        case 2:
          return "代理商";
        case 3:
          return "普通商户";
      }
    },
    formatDate(val) {
      return TimeForma2(val);
    }
  },
  watch: {
    ShoppingCartList: {
      handler() {},
      deep: true
    }
  },
  components: {
    shoppingCarProductItem
  },
  computed: {
    start() {
      return this.pageSize * (this.currentPage - 1);
    },
    unitMoney() {
      let money = 0;
      this.goodsList.forEach(item0 => {
        item0.list.forEach(item1 => {
          if (item1.checked && item1.priceUnit) {
            //表示美元
            money += item1.money;
          }
        });
      });

      return money;
    },
    unMoney() {
      let money = 0;
      this.goodsList.forEach(item0 => {
        item0.list.forEach(item1 => {
          if (item1.checked && !item1.priceUnit) {
            //表示美元
            money += item1.money;
          }
        });
      });

      return money;
    },
    count() {
      let count = 0;
      this.goodsList.forEach(item0 => {
        item0.list.forEach(item1 => {
          if (item1.checked) {
            count++;
          }
        });
      });
      return count;
    }
  },
  mounted() {
    this.$store.state.shoppingCart.active = 0;
    this.init();
  }
};
</script>
