
.<template>
  <div class="oneGoodsDetail" @click="chipSellerGoodsDetal">
    <div class="top">
      <ImgE
        v-if="item.sellerGoodsImageUrl"
        :src="baseURL3+'/'+item.sellerGoodsImageUrl.split('@')[0]"
        :W="375"
        :H="268"
      ></ImgE>
      <ImgE :src="item.goodsImageUrl" :W="375" :H="268" v-if="!item.sellerGoodsImageUrl"></ImgE>
    </div>
    <div class="detail">
      <div class="tit clear">
        <p class="timer fr">
          <template v-if="item.expireTime && !item.seller_always">
            <i class="iconfont icon-jishiqi fl"></i>
            <CountTime
              v-on:end_callback="countDownE_cb()"
              class="fl"
              :currentTime="item.currentTime"
              :startTime="item.currentTime"
              :endTime="item.expireTime"
              :tipText="'距离活动开始'"
              :tipTextEnd="'剩余:'"
              :endText="'活动已失效'"
              :dayTxt="'天'"
              :hourTxt="'时'"
              :minutesTxt="'分'"
              :secondsTxt="'秒'"
            ></CountTime>
          </template>
          <span v-if="item.day_interval && item.seller_always">
            <i class="iconfont icon-daifahuo"></i>
            下单后{{item.day_interval | filterHours}}小时内可发货
          </span>
        </p>
        <p class="price">
          <strong class="mark color">{{item.priceUnit?'$':'￥'}}</strong>
          <strong
            class="fig"
            v-if="!item.priceType"
          >{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</strong>
          <strong
            class="fig"
            v-if="item.priceType"
          >{{item.priceList[item.priceList.length-1].price | toFixed(item.priceUnit?3:2)}} +</strong>
        </p>
      </div>
      <div class="tit clear">
        <p class="fr">
          品牌：
          <a  class="deepgreen" @click.stop="chiporiginShop">{{item.brandName}}</a>
        </p>
        <p
          @click="chipSellerGoodsDetal"
          class="goodsName"
          :title="item.goods_name"
        >{{item.goods_name}} 
        <i  v-if="item.isSelf" style="font-style:normal;font-size:10px;margin-left:5px;border-radius:2px;padding:1px 5px;" class="bgColor">自营</i>
        </p>
        
      </div>
      <div class="gray desc" :title="item.goodsDesc">{{item.goodsDesc}}</div>
      <div class="markwrap tit">
        <div class="sellerInfo">
          <p class="img">
            <img :src="item.userImgeUrl" alt @click.stop="chipShop(item)" />
          </p>
          <div class="wrapInfo clear">
            <div class="wrap" @click="chipShop(item)">
              <img :src="item.userImgeUrl" alt />
              <div :title="item.sellerName">
                <p style="margin:10px 0;">{{item.sellerName}}</p>
                <span class="tag deepgreen bgLightGray" v-if="item.tag==1">{{item.tag | tagFilter}}</span>
                <span class="tag blu bgLightGray" v-if="item.tag==2 && item.isAgent">{{item.tag | tagFilter}}</span>
                <span class="tag bgOrange" v-if="item.deposite" :title="`保证金：￥${item.deposite}`">保</span>
              </div>
            </div>
            <div class="score">
              <!-- <div>入驻时间：{{item.settleTime.split(" ")[0]}}</div> -->
              <div class="renzheng" v-if="item.tag!=3">企业资质：已认证</div>
              <div class="scoreitem">
                <span>产品质量：</span>
                <span class="color" v-if="item.mapComment.profileA>item.mapComment.profileB">
                  <span>{{item.mapComment.profileA | toFixed(1)}}</span>
                  <span>高于平均值{{item.mapComment.profileB | toFixed(1)}}</span>
                  <span class="el-icon-top"></span>
                </span>
                <span class="green" v-if="item.mapComment.profileA<item.mapComment.profileB">
                  <span>{{item.mapComment.profileA | toFixed(1)}}</span>
                  <span>低于平均值{{item.mapComment.profileB | toFixed(1)}}</span>
                  <span class="el-icon-bottom"></span>
                </span>
                <span v-if="item.mapComment.profileA==item.mapComment.profileB">
                  <span>{{item.mapComment.profileA | toFixed(1)}}</span>
                  <span>等于平均值{{item.mapComment.profileB | toFixed(1)}}</span>
                </span>
              </div>
              <div class="scoreitem">
                <span>发货速度：</span>
                <span class="color" v-if="item.mapComment.deliverA>item.mapComment.deliverB">
                  <span>{{item.mapComment.deliverA | toFixed(1)}}</span>

                  <span>高于平均值{{item.mapComment.deliverB | toFixed(1)}}</span>
                  <span class="el-icon-top"></span>
                </span>
                <span class="green" v-if="item.mapComment.deliverA<item.mapComment.deliverB">
                  <span>{{item.mapComment.deliverA | toFixed(1)}}</span>
                  <span>低于平均值{{item.mapComment.deliverB | toFixed(1)}}</span>
                  <span class="el-icon-bottom"></span>
                </span>
                <span v-if="item.mapComment.deliverA==item.mapComment.deliverB">
                  <span>{{item.mapComment.deliverA | toFixed(1)}}</span>
                  <span>等于平均值{{item.mapComment.deliverB | toFixed(1)}}</span>
                </span>
              </div>
              <div class="scoreitem">
                <span>服务支持：</span>
                <span class="color" v-if="item.mapComment.serviceA>item.mapComment.serviceB">
                  <span>{{item.mapComment.serviceA | toFixed(1)}}</span>

                  <span>高于平均值{{item.mapComment.serviceB | toFixed(1)}}</span>
                  <span class="el-icon-top"></span>
                </span>
                <span class="green" v-if="item.mapComment.serviceA<item.mapComment.serviceB">
                  <span>{{item.mapComment.serviceA | toFixed(1)}}</span>

                  <span>低于平均值{{item.mapComment.serviceB | toFixed(1)}}</span>
                  <span class="el-icon-bottom"></span>
                </span>
                <span v-if="item.mapComment.serviceA==item.mapComment.serviceB">
                  <span>{{item.mapComment.serviceA | toFixed(1)}}</span>
                  <span>等于平均值{{item.mapComment.serviceB | toFixed(1)}}</span>
                </span>
              </div>
            </div>
            <p class="btn">
              <span
                class="bgColor"
                @click.stop="chipShop(item)"
              >进入店铺</span>
            </p>
          </div> 
        </div>
        <div class="mark">
            <span :class="item.goods_type?'lightBgBlu':'bgColor'">{{item.goods_type?'现货':'订货'}}</span>
              <span :class="item.priceUnit?'greenColor':'bgpurple'" >{{item.diliverPlace}}交货</span>
              <span :class="item.seller_always?'bgOrange':'deepgreenBg'">{{item.seller_always?'长期特价':'限时抢购'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL3 } from "@/config";
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      baseURL3: baseURL3
    };
  },
  methods: {
    countDownE_cb() {
      this.$emit("countDownE_cb");
    },
     chipSellerGoodsDetal() {
      //跳转商品详情
    
      this.$router.push("/sellerGoodsDetail?seller_goods_id="+this.item.id);
    },
    chiporiginShop(){
         this.$router.push({
          path: "/BrandDetail",
          query: {
            tag: "brand",
            documentid: this.item.brandId,
            name: this.item.brandName
          }
        });
    },
     chipShop(item) {
      if (item.tag == 1) {
        this.$router.push({
          path: "/BrandDetail",
          query: {
            tag: "brand",
            documentid: item.brandId,
            name: item.brandName
          }
        });
      } else {
        this.$router.push({
          path: "/sellerShopDetail",
          query: {
            sellerId: item.sellerId
          }
        });
      }
    },
  },
  filters: {
    filterHours(val) {
      return parseFloat(val) * 24;
    },
    formatDate(val) {
      return TimeForma(val);
    }
  }
};
</script>
.<style lang="less" scoped>
@import "./oneGoodsDetail.less";
</style>