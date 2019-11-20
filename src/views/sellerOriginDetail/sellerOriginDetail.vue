.<template>
  <div class="allWidth content">
    <div class="title bgBlu">
      <img :src="brandInfo.imageUrl" alt />
      <span>{{brandInfo.name}}</span>
      <span class="bgColor hasSeller" v-if="brandInfo.hasSeller">已入驻</span>
      <span class="bgColor hasSeller" v-if="!brandInfo.hasSeller" style="cursor:pointer;">去入驻</span>
    </div>
    <div class="baseInfo">
      <div class="left">
        <img :src="brandInfo.imageUrl" alt />
      </div>
      <div class="right">
        <p class="desc">{{brandInfo.brandDesc}}</p>
        <P class="link">
          <a
            :href="brandInfo.brandWeb"
            target="_blank"
          >官方网址：{{brandInfo.brandWeb?brandInfo.brandWeb:'暂无'}}</a>
        </P>
      </div>
    </div>
    <div class="goodsListWrap" v-if="goodsList.length">
      <div class="tit">
        <h3>热卖型号</h3>
        <el-pagination
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePageChange"
          background
          hide-on-single-page
          small
        ></el-pagination>
      </div>
      <div>
        <ul class="goodslist">
          <li
            v-if="goodsList.length==0"
            style="width:100%;line-height:200px;text-align:center;"
            class="gray"
          >暂无发布的商品</li>
          <li
            v-for="(item,index) in goodsList"
            :key="index"
            @click="chipSellerGoodsDetal(item)"
            class="itemone"
          >
            <span
              :class="item.goods_type?'greenColor':'bgColor'"
              class="mark" 
              :title="item.goods_type?'现货':'订货'"
            >{{item.goods_type?'现':'订'}}</span>
            <div>
              <div style="text-align:center;">
                <ImgE :src="item.goodsImageUrl" :W="150" :H="100"></ImgE>
              </div>

              <p class="gray">{{item.catergoryName}}</p>
              <P>{{item.goods_name}}</P>
              <p>
                <Strong>{{item.priceUnit?'$':'￥'}}{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</Strong>&nbsp;
                <span style="font-size:12px;" v-if="item.priceType">起</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cateGory">
      <div class="tit">
        <span class="name color">全部分类</span>
        <span class="square"></span>
        <span class="line"></span>
      </div>
      <ul>
        <li v-for="(item,index) in brandInfo.childrenList" :key="index" class="itemone">
            <router-link tag="div" style="cursor:pointer;" :to="{
                path:'/BrandDetail/Undirect',
                query:{
                   
                   catergoryId:item.catergoryId,
                      name:item.catergoryName,
                      brandId:brandInfo.id,
                      brandName:brandInfo.name
                }
            }">
{{item.catergoryName}}
            </router-link>
         
          <ol>
            <!-- <router-link
              tag="li"
              v-for="(item0,index0) in item.childernList"
              :key="index0"
              :to="{
                  path:'/BrandDetail/Direct',
                  query:{
                      tag:'direct',
                      documentid:item0.catergoryId,
                      name:item0.catergoryName,
                      brandId:brandInfo.id,
                      brandName:brandInfo.name,
                      parentName:item.catergoryName,
                      parentId:item.catergoryId
                  }
              }"
            >{{item0.catergoryName}}({{item0.summaryTotal | toFixed(0)}})</router-link> -->
            <li  v-for="(item0,index0) in item.childernList"
              :key="index0" @click="send(item,item0)">{{item0.catergoryName}}({{item0.summaryTotal | toFixed(0)}})</li>
          </ol>
        </li>
      </ul>
    </div>
    <div class="bottom" ref="comment" id="comment">
      <div class="tit">
        <h3>用户评价</h3>
        <div>
          <el-pagination
            :page-size="commentPageSize"
            small
            layout="prev, pager, next"
            :total="commentTotal"
            @current-change="handleCommentPageChange"
            background
            hide-on-single-page
            :current-page.sync="CommentCurrentPage"
          ></el-pagination>
        </div>
      </div>
      <div class="comment">
        <ul class="list">
          <li
            v-if="commentTotal==0"
            style="color:#999;line-height:100px;
          text-align:center;"
          >暂无评论</li>
          <li class="itemone peruBg" v-for="(item0,index0) in commentList" :key="index0">
            <div class="left">
              <p>{{item0.createTime | formatDate}}</p>
              <img :src="item0.userHead" alt />
              <p>{{item0.userName}}</p>
            </div>
            <div class="right">
              <div class="tit">
                <span>
                  采购型号：
                  <router-link
                    :to="{
                          path:'/BrandDetail/GoodsDetails',
                          query:{
                              tag:'goodsinfo',
                              documentid:item0.goodsId,
                              name:item0.goodsName
                          }
                      }"
                  >{{item0.goodsName}}</router-link>
                </span>
                <span style="margin-left:10px;">
                  品牌：
                  <router-link
                    :to="{path:'/BrandDetail',query:{
                          tag:'brand',
                          documentid:item0.brandId,
                          name:item0.branda
                      }}"
                  >{{item0.branda}}</router-link>
                </span>
              </div>
              <div class="content">{{item0.content}}</div>
              <div class="scorewrap">
                <div class="img" v-if="item0.commentPicture && item0.commentPicture.split('@')[1]">
                  <template v-for="(item1,index1) in item0.commentPicture.split('@')">
                    <ImgE
                      :src="item0.commentPicture.split('@')[0]+item1"
                      alt
                      :key="item1"
                      v-if="index1!=0"
                      :W="60"
                      :H="60"
                      :isBig="true"
                    ></ImgE>
                  </template>
                </div>
                <div class="score">
                  <div>
                    产品质量：
                    <p>
                      <template v-for="item in 5">
                        <img
                          src="@/assets/image/icon/star.png"
                          alt
                          :key="item"
                          v-if="item0.profileScore==0 || item>item0.profileScore "
                        />
                        <img
                          src="@/assets/image/icon/starActive.png"
                          alt
                          :key="item"
                          v-if="item<=item0.profileScore "
                        />
                      </template>
                      <span class="descration">{{item0.profileScore | desc}}</span>
                    </p>
                  </div>
                  <div>
                    交货速度：
                    <p>
                      <template v-for="item in 5">
                        <img
                          src="@/assets/image/icon/star.png"
                          alt
                          :key="item"
                          v-if="item0.deliverScore==0 || item>item0.deliverScore "
                        />
                        <img
                          src="@/assets/image/icon/starActive.png"
                          alt
                          :key="item"
                          v-if="item<=item0.deliverScore "
                        />
                      </template>
                      <span class="descration">{{item0.deliverScore | desc}}</span>
                    </p>
                  </div>
                  <div>
                    服务支持：
                    <p>
                      <template v-for="item in 5">
                        <img
                          src="@/assets/image/icon/star.png"
                          alt
                          :key="item"
                          v-if="item0.serviceScore==0 || item>item0.serviceScore "
                        />
                        <img
                          src="@/assets/image/icon/starActive.png"
                          alt
                          :key="item"
                          v-if="item<=item0.serviceScore "
                        />
                      </template>
                      <span class="descration">{{item0.serviceScore | desc}}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="reply">
                <p>商家回复：</p>
                <p style="padding-left:15px;">{{item0.replyContent}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
.<script>
import { mapState,mapMutations } from "vuex";
import { TimeForma } from "@/lib/utils";
import { axios, BrandDetail, sellerShop, home } from "@/api/apiObj";
import { ladderPrice } from '../../lib/utils';
export default {
  data() {
    return {
      originTag: {},
      brandInfo: {},
      goodsList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      TimeForma: TimeForma,
      CommentCurrentPage: 1,
      commentPageSize: 5,
      commentTotal: 0,
      commentList: []
    };
  },
  filters: {
    desc(val) {
      switch (val) {
        case 1:
          return "非常差";
        case 2:
          return "差";
        case 3:
          return "一般";
        case 4:
          return "好";
        case 5:
          return "非常好";
      }
    }
  },
  mounted() {
    if (this.$route.query.documentid) {
      //从制造商跳转
      this.originTag = {
        id: this.$route.query.documentid,
        tag: this.$route.query.tag,
        name: this.$route.query.name
      };
      this.brandId = this.$route.query.documentid;
      this.init();
    }
    if (this.$route.query.seller_id) {
      //从卖家头像跳转
      this.getbrandInfo(this.$route.query.seller_id);
    }
  },
  methods: {
    ...mapMutations("Direct", ["savedirectJOSN"]),
    send(item,item0) {
      this.parent_id = item.catergoryId;
      this.listFlag = item.catergoryId;
      let query = {
        parentId: item0.catergoryId,
        parentName: item.catergoryName,
        name: item0.catergoryName,
        brandId: this.brandInfo.id,
        brandName: this.brandInfo.name,
        firstCatergoryId:item.catergoryId,
        documentid: item0.catergoryId,
        tag: "direct"
      };
      this.savedirectJOSN(query);
      this.$router.push({
        path: "/BrandDetail/Direct"
      });
    },
    handlePageChange(x) {
      this.currentPage = x;
      this.getGoodsList();
    },
    chipSellerGoodsDetal(item) {
      //跳转商品详情
      if(item.priceLevel){
        item.priceList=ladderPrice(item.priceLevel)
      }
      sessionStorage.setItem("sellerGoodsDetail", JSON.stringify(item));
      this.$router.push("/sellerGoodsDetail");
    },
    getbrandInfo(seller_id) {
      axios
        .request({
          ...sellerShop.queryUserInfo,
          params: { userId: seller_id }
        })
        .then(res => {
          this.originTag = {
            id: res.brand,
            tag: "brand",
            name: res.branda
          };
          this.init();
        });
    },
    init() {
      this.$loading(this.$store.state.loading);

      axios
        .request({ ...BrandDetail.searchResult, params: this.originTag })
        .then(res => {
          this.$loading(this.$store.state.loading).close();
          this.brandInfo = res.data.brand;
          this.getGoodsList(res.data.brand.hasSeller);
          if (res.data.brand.hasSeller) {
            this.getComment();
          }
        });
    },
    getGoodsList(hasSeller) {
      this.getGoodsListItem = {
        start: (this.currentPage - 1) * this.pageSize,
        length: this.pageSize
      };
      if (hasSeller) {
        this.getGoodsListItem.seller_id = this.brandInfo.sellerId;
      } else {
        this.getGoodsListItem.brand_id = this.brandInfo.id;
      }
      axios
        .request({ ...home.SpecialOfferList, params: this.getGoodsListItem })
        .then(res => {
          if (res.data) {
            this.goodsList = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    handleCommentPageChange(x) {
      this.CommentCurrentPage = x;
      this.getComment();
    },
    getComment() {
      let obj = {
        start: (this.CommentCurrentPage - 1) * this.commentPageSize,
        length: this.commentPageSize,
        seller_id: this.brandInfo.sellerId
      };
      axios
        .request({ ...sellerShop.orderCommentList, params: obj })
        .then(res => {
          this.commentTotal = res.data.total;
          this.commentList = res.data.data;
        });
    }
  }
};
</script>
.<style lang="less" scoped>
@import url("./sellerOriginDetail.less");
</style>