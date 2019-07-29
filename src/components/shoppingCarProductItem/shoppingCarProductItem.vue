<template>
  <div class="shoppingCarProductItem">
    <div class="brnad-item">
      <!-- // 品牌信息 -->
      <div class="brand-infrom">
        <span>
          <label class="checkBox">
            <input
              type="checkbox"
              @change="brandCheckbox"
              :checked="this.ShoppingCartObject.allcheckbox"
            >
          </label>
        </span>
        <div class="brand-img">
          <img src="@/assets/image/ShoppingCart/u25416.png" alt>
          <span>罗彻斯特电子（原厂</span>
        </div>
      </div>
      <!-- 产品列表 -->
      <ul class="product-list">
        <li v-for="val in this.ShoppingCartObject.productList" :key="val.name">
          <span>
            <label class="checkBox">
              <input type="checkbox" :checked="val.checked" @change="productCheckbox($event,val)">
            </label>
          </span>
          <img src="@/assets/image/ShoppingCart/_u25696_selected.png" class="product-img" alt>
          <div class="product-infrom">
            <p class="num">EDHDFJHKS-234J{{val.name}}</p>
            <p class="follow">
              <span>已关注</span>
            </p>
            <p>
              <span>基本参数：</span> DIP
            </p>
            <p>
              <span>型号描述：</span>
              The current in the input circuit isdetermined ...
            </p>
          </div>
          <div class="product-delivery-time">
            <span>大陆内地</span>
            <span>2019-06-30</span>
            <span>期货</span>
          </div>
          <div class="product-price">
            <p class="num">￥3.5</p>
            <div>
              <p>
                <span>1000+</span>
                <span class="price">￥3.5</span>
              </p>
              <p>
                <span>1000+</span>
                <span class="price">￥3.5</span>
              </p>
              <p>
                <span>1000+</span>
                <span class="price">￥3.5</span>
              </p>
            </div>
            <p>库存：90000</p>
          </div>
          <div class="product-number">
            <el-input-number v-model="num" :min="1" :step="1000" label="描述文字"></el-input-number>
            <p>Moq:1000</p>
            <p>Mpq:1000</p>
          </div>
          <div class="product-total">
            <span class="num">￥3500</span>
          </div>
          <div class="product-operation">
            <span>删除该商品</span>
            <span>添加询价篮</span>
          </div>
          <div class="product-Remain-time">
            <Countdown
              v-on:start_callback="countDownS_cb()"
              v-on:end_callback="countDownE_cb()"
              :startTime="2312312000"
              :endTime="2312312312"
              :tipText="'特价剩余时间'"
              :tipTextEnd="'距离活动结束还有'"
              :endText="'活动已结束'"
              :dayTxt="'天'"
              :hourTxt="'小时'"
              :minutesTxt="'分钟'"
              :secondsTxt="'秒'"
            ></Countdown>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "./shoppingCarProductItem.less";
import Countdown from "_c/Countdown";
export default {
  name: "shoppingCarProductItem",
  props: {
    ShoppingCartObject: {
      type: Object,
      default: () => ({})
    },
    ShoppingCartList: {
      type: Array,
      default: () => []
    },
    ShoppingCartAllCheckbox: {
      type: Boolean
    }
  },
  data() {
    return {
      num: 1000
    };
  },
  components: {
    Countdown
  },
  methods: {
    // 改变品牌
    brandCheckbox(e) {
      this.ShoppingCartObject.allcheckbox = e.target.checked;
      // 品牌不选中，让所有的都不选中
      if (!this.ShoppingCartObject.allcheckbox) {
        this.ShoppingCartObject.productList.map(item => {
          item.checked = false;
        });
        this.$emit("update:ShoppingCartAllCheckbox", false);
      } else {
        this.allcheckboxTrue();
      }
    },
    allcheckboxTrue() {
      // 品牌选中，判断其他品牌是否选中
      this.ShoppingCartObject.productList.map(item => {
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
    },
    // 改变产品
    productCheckbox(e, item) {
      item.checked = e.target.checked;
      if (e.target.checked) {
        this.ShoppingCartObject.allcheckbox = this.ShoppingCartObject.productList.every(
          item => {
            return item.checked;
          }
        );
      } else {
        this.ShoppingCartObject.allcheckbox = false;
      }
      if (!this.ShoppingCartObject.allcheckbox) {
        this.$emit("update:ShoppingCartAllCheckbox", false);
      } else {
        this.allcheckboxTrue();
      }
    },
    countDownS_cb(x) {},
    countDownE_cb(x) {}
  }
};
</script>

<style>
</style>
