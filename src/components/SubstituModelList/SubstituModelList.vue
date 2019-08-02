<template>
  <div class="SubstituModelList">
    <ul class="substitu-model-list">
      <li v-for="item in list" :key="`list_${item.id}`">
        <div class="product">
          <div class="model-list-t">
            <div class="TabImage">
              <ImgE :src="item.imageUrl" :W="190" :H="190"></ImgE>
            </div>
            <div class="text">
              <router-link
                :to="{
                path:'/BrandDetail/GoodsDetails',
                query:{
                  tag:'goodsinfo',
                  name:item.productno,
                  documentid:item.id
                }
              }"
                class="name"
                tag="p"
              >{{item.productno}}</router-link>
              <router-link
                :to="{
                path:'/BrandDetail',
                query:{
                  tag:'brand',
                  name:item.brand,
                  documentid:item.brandId
                }
             }"
                class="brand"
                tag="p"
              >
                <span>品牌：</span>
                {{item.brand}}
              </router-link>
              <!-- <p class="query">
                <span>基本参数：</span>
                <span class="view-document" @click="dialogTableVisible = true">查看参数</span>
                <el-dialog title="基本参数" :visible.sync="dialogTableVisible" :center="true" border>
                  <el-table :data="item.list" border>
                    <el-table-column property="name" label="类型"></el-table-column>
                    <el-table-column property="value" label="参数"></el-table-column>
                  </el-table>
                </el-dialog>
              </p>-->
              <!-- <p class="query">
                <span>技术文档：</span>
                <span class="view-document" @click="viewDocument">查看文档</span>
                <el-dialog title="基本参数" :visible.sync="dialogTableVisible2" :center="true" border>
                  <div v-loading="loading">
                    <pdf ref="pdf" :src="item.datasheet"></pdf>
                  </div>
                </el-dialog>
              </p>-->
              <P>
                <span>型号描述：</span>
                {{item.productdesc}}
              </P>

              <p v-if="item.map">
                <span v-if="!item.map.totalSeller">
                  <span class="num">暂无供应商报价</span>
                </span>
                <span v-else>
                  <span>共有</span>
                  <span class="num">{{item.map.totalSeller}}</span>
                  <span>供应商报价</span>
                  <span
                    class="num"
                  >￥{{ item.map.minPrice | toFixed }}——￥{{item.map.maxPrice | toFixed}}</span>
                </span>
                <!-- <router-link
                  v-if="item.map.totalSeller"
                  to="/BrandDetail/GoodsDetails"
                  class="detail"
                  tag="span"
                >详情>></router-link>-->
              </p>
            </div>
            <!-- <div class="quote">
              <span>{{item.priceunit == 'USD'? '$' : '￥'}}{{item.price}}</span>
              <span>原厂报价</span>
            </div>-->
          </div>
          <div class="model-list-b">
            <ButtonIcon :width="145" :height="50">
              <img src="@/assets/image/brandDetail/u4504.png" alt />
              申请特价
            </ButtonIcon>
            <ButtonIcon :width="145" :height="50">
              <img src="@/assets/image/brandDetail/u4504.png" alt />
              我有特价
            </ButtonIcon>

            <!-- <ButtonIcon :width="145" :height="50">
              <img src="@/assets/image/brandDetail/u4504.png" alt>
              去采购
            </ButtonIcon>-->
            <!-- <span>
              <img src="@/assets/image/brandDetail/u10698.png" alt>
            </span>-->
            <span @click="addInquiry(item)">
              <img src="@/assets/image/brandDetail/_u4518.png" alt />
            </span>
            <span>
              <img src="@/assets/image/brandDetail/_u4510.png" alt />
            </span>
          </div>
        </div>
        <MerchantList :id="item.id" v-if="item.map.totalSeller"></MerchantList>
      </li>
    </ul>
  </div>
</template>

<script>
import "./SubstituModelList.less";
import Pdf from "_c/Pdf";
import { setTimeout } from "timers";
import pdf from "vue-pdf";
import MerchantList from "_c/MerchantList";
import { axios, shoppingCar } from "@/api/apiObj";
export default {
  name: "SubstituModelList",
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisible2: false,
      loading: true
    };
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    viewDocument() {
      this.loading = true;
      this.dialogTableVisible2 = true;
      setTimeout(() => {
        this.loading = false;
      }, 4000);
    },
    addInquiry(val) {
      console.log(val);
      var obj = {
        sellerGoodsId: val.id,
        sellerId: val.brandId,
        goodsSource: "2",
        goodsName:val.productno
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          console.log(res);
          if(res.resultCode == "200"){
            this.$message.success("添加成功")
          }
        });
    }
  },
  components: { pdf, MerchantList },
  filters: {
    toFixed(value) {
      return Number(value).toFixed(3);
    }
  }
};
</script>

