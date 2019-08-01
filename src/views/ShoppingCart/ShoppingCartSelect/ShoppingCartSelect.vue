<template>
  <div class="ShoppingCartSelect">
    <div class="ShoppingCart-con">
      <!-- 搜索 -->
      <div class="ShoppingCart-title">
        <span class="total">
          <span>购物车</span>
          <span class="num">(32)</span>
        </span>
        <div class="searchInput">
            <i class="el-icon-search"></i>
            <input type="text" placeholder="搜索商品">
        </div>
      </div>
      <!-- 列表 -->
      <div class="ShoppingCart-list">
        <div class="ShoppingCart-list-tit">
          <span style="width:20%" class="allcheckbox">
            <label class="checkBox">
              <input
                type="checkbox"
                :checked="ShoppingCartAllCheckbox"
                @change="ShoppingCartAllCheck"
              >全选
            </label>
          </span>
          <span style="width:20%">商品</span>
          <span style="width:15%">交期/交地</span>
          <span style="width:10%">单价/库存</span>
          <span style="width:15%">数量</span>
          <span style="width:10%">总计</span>
          <span style="width:10%">操作</span>
        </div>
        <div class="ShoppingCart-list-con">
          <template v-for="(item,k) in ShoppingCartList">
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
                            :checked="ShoppingCartAllCheckbox"
                            @change="ShoppingCartAllCheck"
                        >
                    </label>
                    <span>罗彻斯特电子 (原厂)</span>
                </div>
                <ul class="listDetail">
                    <li class="imgWrap" style="width:20%;">
                        <label class="checkBox">
                            <input
                                type="checkbox"
                                :checked="ShoppingCartAllCheckbox"
                                @change="ShoppingCartAllCheck"
                            >
                        </label>
                        <div>
                            <img src="" alt="">
                        </div>

                    </li>
                    <li style="width:20%;" class="info">
                            <p class="name">
                                EDHDFJHKS-234J
                            </p>
                            <p class="intDesc">基本参数：DIP   盒子  1/8W </p>
                            <p class="desc">型号描述：The current in the input circuit isdetermined ...</p>
                    </li>
                    <li style="width:15%" class="place">
                        <p>内地</p>
                        <p>2019-6-30</p>
                        <p>期货</p>
                    </li>
                    <li style="width:10%" class="price">
                        <p><span class="num">1000+ </span>--- <strong>¥3.5</strong></p>
                        <p><span class="num">3000+ </span>--- <strong>¥3.0</strong></p>
                        <p><span class="num">5000+ </span>--- <strong>¥2.0</strong></p>
                        <p><span class="num">10000+ </span>--- <strong>¥1.5</strong></p>
                    </li>
                    <li style="width:15%" class="count">
                        <el-input-number v-model="num" size="mini" @change="handleChange" :min="1"></el-input-number>
                        <p>Moq:1000</p>
                        <p>Mpq:1000</p>
                    </li>
                    <li style="width:20%" class="all">
                        <div class="top">
                            <div class="count">
                                <strong>¥35000</strong>
                            </div>
                            <div>
                                <p class="add" @click="add">添加询价篮</p>
                                <p class="del" @click="del">删除该商品</p>
                            </div>
                        </div>
                        <div class="countTime">
                            <div>
<!--                                <CountTime-->
<!--                                    class="countTime"-->
<!--                                    v-on:end_callback="countDownE_cb(item)"-->
<!--                                    :currentTime="item.currentTime"-->
<!--                                    :startTime="item.currentTime"-->
<!--                                    :endTime="item.expireTime"-->
<!--                                    :tipText="'距离售卖开始:'"-->
<!--                                    :tipTextEnd="'特价剩余时间'"-->
<!--                                    :endText="'活动已结束'"-->
<!--                                    :dayTxt="'天'"-->
<!--                                    :hourTxt="'小时'"-->
<!--                                    :minutesTxt="'分钟'"-->
<!--                                    :secondsTxt="'秒'"-->
<!--                                ></CountTime>-->
                            </div>

                        </div>
                    </li>
                </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 底部全选 -->
    <div class="fixed-all">
      <div class="fixed-l">
        <span class="allcheckbox">
          <label class="checkBox">
            <input
              type="checkbox"
              :checked="ShoppingCartAllCheckbox"
              @change="ShoppingCartAllCheck"
            >全选
          </label>
        </span>
        <span>删除已选商品</span>
        <span>添加至询价篮</span>
      </div>
      <div class="fixed-r">
        <div>
          <p class="num">
            已选
            <span>5</span>
            件商品
          </p>
          <p class="price">
            总价：
            <span>￥50000</span>+
            <span>$60000</span>
          </p>
        </div>
        <router-link to="/ShoppingCart/ShoppingSettlement" tag="span">去结算</router-link>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./ShoppingCartSelect.less";
</style>

<script>

import { mapState, mapActions } from "vuex";
import shoppingCarProductItem from "_c/shoppingCarProductItem";
export default {
  name: "ShoppingCartSelect",
  data() {
    return {
      ShoppingCartAllCheckbox: false,
      ShoppingCartList: [
        {
          allcheckbox: false,
          productList: [
            {
              name: "产品一",
              checked: false
            },
            {
              name: "产品二",
              checked: false
            }
          ]
        },
        {
          allcheckbox: false,
          productList: [
            {
              name: "产品一",
              checked: false
            },
            {
              name: "产品二",
              checked: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapActions("shoppingCart", ["GetAllShoppingCartList"]),
    ShoppingCartAllCheck(e) {
      this.ShoppingCartAllCheckbox = e.target.checked;
      if (!this.ShoppingCartAllCheckbox) {
        this.ShoppingCartList.map(item => {
          item.allcheckbox = false;
        });
      } else {
        this.ShoppingCartList.map(item => {
          item.allcheckbox = true;
        });
      }
      this.ShoppingCartList.forEach(items => {
        if (!items.allcheckbox) {
          items.productList.map(item => {
            item.checked = false;
          });
          this.$emit("update:ShoppingCartAllCheckbox", false);
        } else {
          // 品牌选中，判断其他品牌是否选中
          items.productList.map(item => {
            item.checked = true;
          });
          let flag = this.ShoppingCartList.every(item => {
            return item.allcheckbox;
          });
          if (flag) {
            this.$emit("update:ShoppingCartAllCheckbox", true);
          } else {
            this.$emit("update:ShoppingCartAllCheckbox", false);
          }
        }
      });
    }
  },
  watch: {
    ShoppingCartList: {
      handler() {

      },
      deep: true
    }
  },
  components: {
    shoppingCarProductItem
  },
  computed: {
    accessToken() {
      return localStorage.getItem("access_token");
    }
  },
  mounted() {
    this.$store.state.shoppingCart.active = 1
    // this.GetAllShoppingCartList({
    //   goods_source:1,
    //   start:10,
    //   length:10,
    //   access_token:this.accessToken
    // })
  }
};
</script>
