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
          <span style="width:15%" class="allcheckbox">
            <label class="checkBox">
              <input
                type="checkbox"
                :checked="ShoppingCartAllCheckbox"
                @change="ShoppingCartAllCheck"
              >全选
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
                            :checked="ShoppingCartAllCheckbox"
                            @change="ShoppingCartAllCheck"
                        >
                    </label>
                    <span>{{item.sellerName}} ({{item.sellerTag | tagFilter}})</span>
                </div>
                <template v-for="(item1,index) in item.list">
                    <ul class="listDetail">
                        <li class="imgWrap" style="width:15%;">
                            <label class="checkBox">
                                <input
                                    type="checkbox"
                                    :checked="ShoppingCartAllCheckbox"
                                    @change="ShoppingCartAllCheck"
                                >
                            </label>
                            <div>
                                <ImgE :src="item1.goodsImageUrl" :W="86" :H="86"></ImgE>
                            </div>
                        </li>
                        <li style="width:20%;" class="info">
                            <p class="name">
                                {{item1.goods_name}}
                            </p>
<!--                            <p class="intDesc">基本参数：DIP   盒子  1/8W </p>-->
                            <p class="desc">型号描述：{{item1.goodsDesc}}</p>
                        </li>
                        <li style="width:17%" class="place">
                            <p>{{item1.diliverPlace}}</p>
                            <template>
                                <p  v-if="item1.seller_always">{{item1.day_interval}}天内交货</p>
                                <p v-else>{{item1.expireTime | formatDate}}</p>
                            </template>
                            <template>
                                <p v-if="item1.goods_type">现货(长期卖)</p>
                                <p v-else>期货</p>
                            </template>

                        </li>
                        <template >
                            <li style="width:10%" class="price" v-if="item1.priceType">
                                <p><span class="num">1000+ </span>--- <strong>¥3.5</strong></p>
                                <p><span class="num">3000+ </span>--- <strong>¥3.0</strong></p>
                                <p><span class="num">5000+ </span>--- <strong>¥2.0</strong></p>
                                <p><span class="num">10000+ </span>--- <strong>¥1.5</strong></p>
                            </li>
                            <li style="width:10%" class="price" v-else>
                                <p><strong>{{item1.priceUnit?"$":"¥"}}{{item1.goodsPrice}}</strong></p>
                            </li>
                        </template>
                        <li style="width:15%" class="count">
                            <el-input-number  v-model="item1.count" size="mini" @change="handleChange($event)" :min="1" :step="item1.moq" step-strictly></el-input-number>
                            <p>Moq:{{item1.moq}}</p>
                            <p>Mpq:{{item1.mpq}}</p>
                        </li>
                        <li style="width:23%" class="all">
                            <div class="top">
                                <div class="count">
                                    <strong>{{item.priceunit?"$":"¥"}}{{item1.countMoney?item1.countMoney:0}}</strong>
                                </div>
                                <div>
                                    <p class="add" @click="add(k,index)">添加询价篮</p>
                                    <p class="del" @click="del(k,index)">删除该商品</p>
                                </div>
                            </div>
                            <div class="countTime">
                                <div>
                                    <CountTime
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
                                </div>
                            </div>
                        </li>
                    </ul>
                </template>
            </div>
          </template>
        </div>
          <IndexPagination
              v-if="total"
              class="page"
              @changecallback="handleCurrentChange"
              :pageIndex.sync="currentPage"
              :pageSize="pageSize"
              :total="total">
          </IndexPagination>
      </div>
    </div>
    <!-- 底部全选 -->
      <div class="footerFixed">
          <div class="fixed-all clear">
              <div class="fixed_right fr">
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
              <div class="fixed_left fl">
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
                   <span>|</span>
                  <span>添加至询价篮</span>
              </div>

          </div>
      </div>

  </div>
</template>
<style lang="less" scoped>
@import "./ShoppingCartSelect.less";
</style>

<script>

import {mapActions } from "vuex";
import shoppingCarProductItem from "_c/shoppingCarProductItem";
import {axios,shoppingCar} from "../../../api/apiObj";
import {TimeForma2} from "@/lib/utils"

export default {
  name: "ShoppingCartSelect",
  data() {
    return {
      ShoppingCartAllCheckbox: false,
      // ShoppingCartList: [
      //   {
      //     allcheckbox: false,
      //     productList: [
      //       {
      //         name: "产品一",
      //         checked: false
      //       },
      //       {
      //         name: "产品二",
      //         checked: false
      //       }
      //     ]
      //   },
      //   {
      //     allcheckbox: false,
      //     productList: [
      //       {
      //         name: "产品一",
      //         checked: false
      //       },
      //       {
      //         name: "产品二",
      //         checked: false
      //       }
      //     ]
      //   }
      // ],
        pageSize:10,
        currentPage:1,
        total:0,
        goodsList:[]
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
    },
      init(){
        let obj={
            source:1,
            start:this.start,
            length:this.pageSize
        };
          axios.request({...shoppingCar.inquiryList,params:obj}).then(res=>{
              console.log(res)
              this.goodsList=res.data.data;
              this.total=res.data.total;
          })
      },
      handleCurrentChange(x){
        this.currentPage=x;
        this.init()
      },
      //加入询价蓝
      add(k,index){
        let item = this.goodsList[k][index]
          let obj={
              sellerId:item.sellerId,
              sellerGoodsId:item.id,
              goodsSource:1
          }
        axios.request({...shoppingCar.insertShoppingCar,params:obj}).then(res=>{
            console.log("成功加入询价蓝")
            this.$message.success("已加入询价蓝")
        })
      },
      //从购物车删除商品
      del(k,index){
          let item = this.goodsList[k][index]
          let obj={
              sellerId:item.sellerId,
              sellerGoodsId:item.id,
              goodsSource:1
          };
          axios.request({...shoppingCar.deleteShoppingCarGoods,params:obj}).then(res=>{
              this.$message.success("成功移除")
              this.init()
          })
      },
      handleChange(){}
  },
    filters:{
        tagFilter(val){
            switch (Number(val)) {
                case 1:
                    return "原厂";
                case 2:
                    return "代理商";
                case 3:
                    return "普通商户"
            }
        },
        goodsTypeFilter(val){
            switch (val) {
                case true:
                    return "现货";
                case false:
                    return "期货";
            }
        },
        formatDate(val){
            return TimeForma2(val)
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
    start(){
        return (this.pageSize*(this.currentPage-1))
    }
  },
  mounted() {
    this.$store.state.shoppingCart.active = 1
    this.init();
  }
};
</script>
