<template>
  <div class="ShoppingCartSelect">
    <div class="ShoppingCart-con">
      <!-- 搜索 -->
      <div class="ShoppingCart-title">
        <span class="total">
          <img src="@/assets/image/ShoppingCart/u25552.png" alt>
          <span>购物车</span>
          <span class="num">（32）</span>
        </span>
        <SearchInput :width="530" :height="56" :placeholder="'搜索购物车'"></SearchInput>
      </div>
      <!-- 列表 -->
      <div class="ShoppingCart-list">
        <div class="ShoppingCart-list-tit">
          <span style="width:200px" class="allcheckbox">
            <label class="checkBox">
              <input
                type="checkbox"
                :checked="ShoppingCartAllCheckbox"
                @change="ShoppingCartAllCheck"
              >全选
            </label>
          </span>
          <span style="width:300px">商品</span>
          <span style="width:200px">交期/交地</span>
          <span style="width:200px">单价/库存</span>
          <span style="width:200px">数量</span>
          <span style="width:150px">总计</span>
          <span style="width:130px">操作</span>
        </div>
        <div class="ShoppingCart-list-con">
          <template v-for="(item,k) in ShoppingCartList">
            <shoppingCarProductItem
              :key="`item.allcheckbox_${k}`"
              :ShoppingCartObject.sync="item"
              :ShoppingCartList.sync="ShoppingCartList"
              :ShoppingCartAllCheckbox.sync="ShoppingCartAllCheckbox"
            ></shoppingCarProductItem>
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
