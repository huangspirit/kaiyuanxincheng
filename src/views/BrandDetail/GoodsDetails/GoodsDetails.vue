<template>
  <!-- 商品详情页 -->
  <div class="GoodsDetails">
    <!-- 商品详情 -->
    <div class="goods-detail">
      <div class="tit-h">
        <div class="wrapper">
          <img src="@/assets/image/brandDetail/u9664.png" alt />
          <span>商品详情</span>
        </div>
      </div>
      <div class="goods-detail-con">
        <div class="wrapper">
          <!-- 商品文字信息 -->
          <div class="goods-detail-text">
            <!-- 图片切换 -->
            <div class="TabImages">
              <ImgE :src="goodsinfo.imageUrl" :W="210" :H="210"></ImgE>
            </div>
            <div class="text-cont">
              <p class="name">{{goodsinfo.productno}}</p>
              <ul>
                <li>金属电阻</li>
                <li>高性能</li>
                <li>高性价比</li>
              </ul>

              <div class="text">
                <p>
                  <span>品牌：</span>
                  {{goodsinfo.brand}}
                  <ImgE :src="goodsinfo.brandImageUrl" :W="82" :H="32"></ImgE>
                </p>
                <P>
                  <span>功能描述：</span>
                  {{goodsinfo.productdesc}}
                </P>
              </div>
            </div>

            <div class="add-car">
              <span>
                <img src="@/assets/image/brandDetail/_u4510.png" alt />
                +关注
              </span>
              <span>
                <img @click="addInquiry(goodsinfo)" src="@/assets/image/brandDetail/_u4518.png" alt />
                +询价篮
              </span>
              <span>
                <img src="@/assets/image/brandDetail/u12296.png" alt />
                分享
              </span>
              <span>
                <img src="@/assets/image/brandDetail/u10698.png" alt />
                +购物车
              </span>
            </div>
            <div class="Purchase">
              <ButtonIcon>
                <img src="@/assets/image/brandDetail/u6221.png" alt />
                立即采购
              </ButtonIcon>
              <ButtonIcon>
                <img src="@/assets/image/brandDetail/u4504.png" alt />
                申请特价
              </ButtonIcon>
            </div>
          </div>

          <!-- 商品价格 -->
          <div
            class="goods-detail-price"
            v-if="goodsinfo.factorySellerInfo && goodsinfo.factorySellerInfo.length"
          >
            <div class="goods-detail-price-msg">
              <ButtonIcon>原厂直供</ButtonIcon>
              <ul>
                <li>
                  <span>MOQ：</span>
                  <span>{{goodsinfo.mbq}}</span>
                </li>
                <li>
                  <span>MPQ：</span>
                  <span>{{goodsinfo.mpq}}</span>
                </li>

                <li>
                  <span>预计交期：</span>
                  <span>三周</span>
                </li>
                <li>
                  <span>交货地址：</span>
                  <span>大陆内地</span>
                </li>
                <li>
                  <span>币种：</span>
                  <span>{{goodsinfo.priceunit == 'USD' ? '美元' : '人民币'}}</span>
                </li>
              </ul>
            </div>
            <LadderPrice>阶梯价格</LadderPrice>
          </div>
          <div v-else class="goods-detail-price no-factorySellerInfo">
            <div>
              <router-link to="/OriginalFactoryEntry" class="factorySeller" tag="p">原厂入驻</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 特价共享区 -->
    <div class="special-offer">
      <div class="tit-h">
        <div class="wrapper">
          <img src="@/assets/image/brandDetail/u9664.png" alt />
          <span>特价共享区</span>
          <span class="more-special">申请更低价</span>
        </div>
      </div>
      <p class="StatementStatus">* 标注现货货字样的需要付全款购买，发货日期大于当前购买日期七天的按照用户信用额度进行百分比预付款，以订单支付日期为准</p>
      <!-- 商家信息列表 -->
      <MerchantList :id="goodsinfo.id" v-if="goodsinfo.id"></MerchantList>
    </div>
    <!-- 详细信息 -->
    <div class="detail-informan">
      <div class="tit-h">
        <div class="wrapper">
          <img src="@/assets/image/brandDetail/u10011.png" alt />
          <span>详细信息（RMC1/16-102JTP）</span>
        </div>
      </div>
      <div class="detail-informan-con">
        <div class="wrapper">
          <p class="tit">
            <span>技术参数</span>
            <span>产品手册</span>
          </p>
          <ul class="parameter">
            <li>
              <!-- <p v-for="item in goodsinfo.list" :key="`list_${item.id}`">
                 <span>{{item.name}}</span>
              </p>-->
              <el-table :data="goodsinfo.list" stripe border>
                <el-table-column property="name" label="类型"></el-table-column>
                <el-table-column property="value" label="参数"></el-table-column>
              </el-table>
            </li>
            <li v-loading="loading" class="datasheet">
              <span @click="searchDatasheet(goodsinfo.id)" class="s-psc">查看产品手册</span>
              <a :href="downDatasheet" download class="s-psc">下载产品手册</a>
            </li>
          </ul>
          <!-- 产品手册模态框 -->
          <el-dialog
            title="产品手册"
            center
            class="dialog-datasheet"
            :visible.sync="dialogVisible"
            width="80%"
          >
            <div
              style="height:700px"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
            >
              <iframe
                id="ifra"
                :src="datasheet"
                frameborder="0"
                width="100%"
                height="100%"
                v-if="datasheet"
              ></iframe>
              <p v-else>暂无产品手册</p>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- 代换型号 -->
    <!-- <div class="substitu-model">
      <div class="tit-h">
        <div class="wrapper">
          <img src="@/assets/image/brandDetail/u9693.png" alt>
          <span>可代换型号</span>
        </div>
      </div>
    <div class="wrapper">-->
    <!-- <SubstituModelList></SubstituModelList> -->
    <!-- </div>
    </div>-->
    <!-- 相关应用方案与文档 -->
    <div class="related-documents">
      <div class="tit-h">
        <div class="wrapper">
          <img src="@/assets/image/brandDetail/u12076.png" alt />
          <span>相关应用方案与文档</span>
        </div>
      </div>
      <div class="related-documents-con">
        <p>
          <span>欧时电子打造全球数字化供应链</span>
          <span>2019年3月21日</span>
        </p>
        <p>
          <span>选择电子元器件配套的好处有哪些</span>
          <span>2019年3月21日</span>
        </p>
        <p>
          <span>欧时电子打造全球数字化供应链</span>
          <span>2019年3月21日</span>
        </p>
        <p>
          <span>选择电子元器件配套的好处有哪些</span>
          <span>2019年3月21日</span>
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./GoodsDetails.less";
</style>

<script>
import MerchantList from "_c/MerchantList";
import SubstituModelList from "_c/SubstituModelList";
import { mapGetters, mapActions } from "vuex";
import { baseURL, baseURL2 } from "@/config";
import { setTimeout } from "timers";
import { axios, shoppingCar } from "@/api/apiObj";
export default {
  name: "GoodsDetails",
  data() {
    return {
      loading: false,
      goodsinfo: {},
      // 技术参数
      datasheet: "",
      // 下载技术参数的路径
      downDatasheet: "",
      // 产品手册模态框
      dialogVisible: false,
      // loading
      loading: false
    };
  },
  components: {
    MerchantList,
    SubstituModelList
  },
  methods: {
    ...mapActions("GoodsDetails", ["GetQueryGoodsDatesheet"]),
    // 查看产品手册
    searchDatasheet(id) {
      this.dialogVisible = true;
      let ret = baseURL + "api-g/gods-anon/queryGoodsDatesheet?id=" + id;
      console.log(ret);
      this.downDatasheet = ret;
      let resp =
        baseURL2 + "static/pdf/web/viewer.html?file=" + encodeURIComponent(ret);
      console.log(resp);
      this.datasheet = resp;
      const self = this;
      // setTimeout(() => {
      //   this.loading = false;
      // }, 3000);
    },
    addInquiry(val) {
      var obj = {
        sellerGoodsId: val.id,
        sellerId: val.brandId,
        goodsSource: "2",
        goodsName: val.productno,
        bucketId:val.bucketId
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          console.log(res);
          if (res.resultCode == "200") {
            this.$message.success("添加成功");
          }
        });
    }
  },
  mounted() {
    this.$store
      .dispatch("GoodsDetails/GetGoodsDetailData", this.$route.query)
      .then(res => {
        this.goodsinfo = res;
      });
  },
  computed: {}
};
</script>

