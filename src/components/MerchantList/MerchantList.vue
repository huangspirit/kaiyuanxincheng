<template>
  <!-- 商家列表 -->
  <div class="MerchantList" ref="searchBar" v-if="total">
    <table v-show="flag">
      <thead>
        <th style="width:260px">商家</th>
        <th style="width:120px">MOQ</th>
        <th style="width:120px">MPQ</th>
        <th style="width:120px">库存</th>
        <th style="width:190px">状态</th>
        <th style="width:190px">预计交期</th>
        <th style="width:330px">价格</th>
        <th style="width:190px">操作</th>
      </thead>
      <tbody>
        <MerchantItem v-for="item in MerchantList" :item="item" :key="item.id"></MerchantItem>
      </tbody>
    </table>
    <div class="arrow-bar">
      <p v-if="!flag">
        <span>共有{{total}}个供应商有特价，点击我查看特价</span>
      </p>

      <p>
        <img :src="imgUrl" @click="change" alt>
      </p>
    </div>
  </div>
</template>

<script>
import "./MerchantList.less";
import { mapGetters, mapActions, mapState } from "vuex";

import MerchantItem from "@/components/MerchantItem";
import { constants } from "crypto";
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
      total: 0
    };
  },
  components: {
    MerchantItem
  },

  computed: {
    ...mapState({
      MerchantList: state => state.MerchantList.MerchantList
    }),
    access_token() {
      return localStorage.getItem("access_token");
    },
    imgUrl() {
      return this.flag
        ? require("@/assets/image/brandDetail/u4650.png")
        : require("@/assets/image/brandDetail/u4530.png");
    }
  },
  methods: {
    ...mapActions("MerchantList", ["GetMerchantList"]),
    // 改变列表的显示隐藏
    change() {
      this.flag = !this.flag;
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
    }
  },
  mounted() {
    this.GetMerchantList({
      access_token: this.access_token,
      goods_id: this.id,
      start: 0,
      length: 10,
      status: "1"
    }).then(res => {
      console.log(res)
      this.total = res.total;
      res.data.forEach(item => {

        if (item.priceLevel) {
          let arr = item.priceLevel.split("@");
          item.priceLevelList = arr.map(item2 => {
            return item2.split("-");
          });
        }
      });
      res.data.forEach(item => {
        if (item.priceLevel) {
          let arr3 = [];
          item.priceLevelList.forEach((val, index) => {
            let obj = {};
            if (index === 0) {
              obj.num = [0, `${item.priceLevelList[index][0]}`];
              obj.price = item.priceLevelList[index][1];
            } else {
              obj.num = [
                `${item.priceLevelList[index - 1][0]}`,
                `${item.priceLevelList[index][0]}`
              ];
              obj.price = item.priceLevelList[index][1];
            }
            arr3.push(obj);
          });
          item.priceLevelList = arr3;
        }
      });
    });
    // window.addEventListener("scroll", this.handleScroll);
  }
};
</script>
