<template>
  <div class="content allWidth">
    <div class="top">
      <div class="left">
        <div class="sellerinfo">
          <img :src="sellerinfo.headImgUrl" alt />
          <p>{{sellerinfo.nickname}}</p>
          <p>
            <span class="greenColor" v-if="sellerinfo.tag==1">原</span>
            <span class="greenColor" v-if="sellerinfo.tag==2">代</span>
            <span class="greenColor" v-if="sellerinfo.tag==18">分</span>
            <span class="bgOrange">保</span>
            <!-- <span class="bgColor">VIP</span> -->
          </p>
          <P style="text-align:left;">
            企业资质：
            <span
              class="greenColor"
              style="font-size:12px;cursor:pointer;padding:0px 6px;border-radius:2px;"
              @click="showqualification=true"
            >查看</span>
          </P>
          <p style="text-align:left;">入驻时间：{{TimeForma(sellerinfo.qualification.create_time)}}</p>
        </div>
        <div class="score">
          <div>
            <span>产品质量：</span>
            <span class="color" v-if="sellerinfo.comment.profileA>sellerinfo.comment.profileB">
              <span>{{sellerinfo.comment.profileA | toFixed(1)}}</span>
              <span class="el-icon-top"></span>
              <span>高于平均值{{sellerinfo.comment.profileB | toFixed(1)}}</span>
            </span>
            <span class="green" v-if="sellerinfo.comment.profileA<sellerinfo.comment.profileB">
              <span>{{sellerinfo.comment.profileA | toFixed(1)}}</span>

              <span class="el-icon-bottom"></span>
              <span>低于平均值{{sellerinfo.comment.profileB | toFixed(1)}}</span>
            </span>
            <span v-if="sellerinfo.comment.profileA==sellerinfo.comment.profileB">
              <span>{{sellerinfo.comment.profileA | toFixed(1)}}</span>

              <span>~</span>
              <span>等于平均值{{sellerinfo.comment.profileB | toFixed(1)}}</span>
            </span>
          </div>
          <div>
            <span>发货速度：</span>
            <span class="color" v-if="sellerinfo.comment.deliverA>sellerinfo.comment.deliverB">
              <span>{{sellerinfo.comment.deliverA | toFixed(1)}}</span>
              <span class="el-icon-top"></span>
              <span>高于平均值{{sellerinfo.comment.deliverB | toFixed(1)}}</span>
            </span>
            <span class="green" v-if="sellerinfo.comment.deliverA<sellerinfo.comment.deliverB">
              <span>{{sellerinfo.comment.deliverA | toFixed(1)}}</span>

              <span class="el-icon-bottom"></span>
              <span>低于平均值{{sellerinfo.comment.deliverB | toFixed(1)}}</span>
            </span>
            <span v-if="sellerinfo.comment.deliverA==sellerinfo.comment.deliverB">
              <span>{{sellerinfo.comment.deliverA | toFixed(1)}}</span>
              <span>~</span>
              <span>等于平均值{{sellerinfo.comment.deliverB | toFixed(1)}}</span>
            </span>
          </div>
          <div>
            <span>服务支持：</span>
            <span class="color" v-if="sellerinfo.comment.serviceA>sellerinfo.comment.serviceB">
              <span>{{sellerinfo.comment.serviceA | toFixed(1)}}</span>
              <span class="el-icon-top"></span>
              <span>高于平均值{{sellerinfo.comment.serviceB | toFixed(1)}}</span>
            </span>
            <span class="green" v-if="sellerinfo.comment.serviceA<sellerinfo.comment.serviceB">
              <span>{{sellerinfo.comment.serviceA | toFixed(1)}}</span>

              <span class="el-icon-bottom"></span>
              <span>低于平均值{{sellerinfo.comment.serviceB | toFixed(1)}}</span>
            </span>
            <span v-if="sellerinfo.comment.serviceA==sellerinfo.comment.serviceB">
              <span>{{sellerinfo.comment.serviceA | toFixed(1)}}</span>
              <span>~</span>
              <span>等于平均值{{sellerinfo.comment.serviceB | toFixed(1)}}</span>
            </span>
          </div>
          <div style="text-align:center;">
            <el-button size="mini" class="greenColor" @click="scrollComment">看评价</el-button>
            <el-button size="mini" class="bgOrange" v-if="!sellerinfo.focus" @click="addFocus">关注</el-button>
            <span v-if="sellerinfo.focus" class="gray" style="margin-left:10px;">已关注</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <div class="tit" v-if="sellerinfo.tag==2">代理品牌</div>
          <div class="tit" v-if="sellerinfo.tag==18">主营品牌</div>
          <ul class="brandagent">
            <router-link
              v-for="(item,index) in sellerinfo.brandagent"
              :key="index"
              tag="li"
              :to="{
              path:'/BrandDetail',
              query:{
                tag:'brand',
                documentid:item.id,
                name:item.brand
              }
            }"
            >
              <ImgE :src="item.imgurl" :W="200" :H="100"></ImgE>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="left">
        <div>
          <p>按交货</p>
          <ul>
            <li
              :class="getGoodsListItem.goods_type==true?'color':''"
              v-if="sellerinfo.goodsType.true"
              @click="getGoodsListByItem(true,'goodsType')"
            >现货（{{sellerinfo.goodsType.true}}）</li>
            <li
              :class="getGoodsListItem.goods_type==false?'color':''"
              v-if="sellerinfo.goodsType.false"
              @click="getGoodsListByItem(false,'goodsType')"
            >订货（{{sellerinfo.goodsType.false}}）</li>
          </ul>
        </div>
        <div>
          <p>按品牌</p>
          <ul>
            <li
              :class="getGoodsListItem.brand_id==item1.brandId?'color':''"
              v-for="(item1 ,index) in sellerinfo.brandseller"
              :key="index"
              @click="getGoodsListByItem(item1,'brandseller')"
            >{{item1.brand}} &nbsp;({{item1.brandCount}})</li>
          </ul>
        </div>
        <div>
          <p>按器件类别</p>
          <ul>
            <li
              :class="getGoodsListItem.catergory_id==item1.cid?'color':''"
              v-for="(item1,index) in sellerinfo.catergory"
              :key="index"
              @click="getGoodsListByItem(item1,'catergory')"
            >{{item1.cname}}&nbsp;({{item1.cCount}})</li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="tit">
          <h3>特价热卖</h3>
          <el-input
            placeholder="输入型号关键字"
            v-model="getGoodsListItem.name"
            size="mini"
            class="inputSearch"
            @keyup.enter.native="inputHandler"
            style="width:250px;"
            clearable
          >
            <el-button slot="append" @click="inputHandler" class="append">搜本店</el-button>
          </el-input>
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
          <!-- <Pagination
            :currentPage.sync="CommentCurrentPage"
            :page-size="commentPageSize"
            :total="commentTotal"
            @current-change="handleCommentPageChange"
            v-if="commentTotal"
          ></Pagination> -->
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
    <el-dialog title :visible.sync="showqualification" width="700px" class="showqualification" top="10vh">
      <el-carousel height="500px" indicator-position="outside">
        <el-carousel-item v-for="item in sellerinfo.qualification.list" :key="item.id">
          <div class="wrap">
            <ImgE :src="sellerinfo.qualification.url+item.qualificationImg" :W="600" :H="400"></ImgE>
            <h3>代理品牌：{{item.brandName}}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>
.<script>
import { mapState , mapMutations} from "vuex";
import { TimeForma } from "@/lib/utils";
import { axios, sellerShop, home, shoppingCar } from "@/api/apiObj";
import { ladderPrice } from '../../lib/utils';
export default {
  data() {
    return {
      TimeForma: TimeForma,
      CommentCurrentPage: 1,
      commentPageSize: 5,
      commentTotal: 20,
      commentList: [],
      eller_id: 0,
      sellerinfo: {
        goodsType: {},
        brandagent: [],
        brandseller: [],
        catergory: [],
        comment: {},
        qualification: []
      },
      goodsList: [],
      showqualification: false,
      getGoodsListItem: {
        name: ""
      }
    };
  },
  computed: {
    ...mapState({
      loginState: state => state.loginState
    })
  },
  mounted() {
    this.seller_id = this.$route.query.sellerId;
    this.init();
    this.getComment();
    this.getGoodsList();
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
  methods: {
    ...mapMutations(['setshowlogin']),
    scrollComment() {
      //滚动到查看品论

      document.documentElement.scrollTop =
        this.$refs.comment.getBoundingClientRect().top - 85;
    },
    getGoodsListByItem(item, type) {
      if (type == "goodsType") {
        if (this.getGoodsListItem.goods_type == item) {
          delete this.getGoodsListItem.goods_type;
        } else {
          this.getGoodsListItem.goods_type = item;
        }
      } else if (type == "catergory") {
        if (this.getGoodsListItem.catergory_id == item.cid) {
          delete this.getGoodsListItem.catergory_id;
        } else {
          this.getGoodsListItem.catergory_id = item.cid;
        }
      } else if (type == "brandseller") {
        if (this.getGoodsListItem.brand_id == item.brandId) {
          delete this.getGoodsListItem.brand_id;
        } else {
          this.getGoodsListItem.brand_id = item.brandId;
        }
      }
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
    handleCommentPageChange(x) {
      this.CommentCurrentPage = x;
      this.getComment();
    },
    getComment() {
      let obj = {
        start: (this.CommentCurrentPage - 1) * this.commentPageSize,
        length: this.commentPageSize,
        seller_id: this.$route.query.sellerId
      };
      axios
        .request({ ...sellerShop.orderCommentList, params: obj })
        .then(res => {
          this.commentTotal = res.data.total;
          this.commentList = res.data.data;
        });
    },
    inputHandler() {
      this.getGoodsList();
    },
    init() {
      axios
        .request({
          ...sellerShop.querySellerShop,
          params: { seller_id: this.$route.query.sellerId }
        })
        .then(res => {
          this.sellerinfo = res.data;
        });
    },
    getGoodsList() {
      this.getGoodsListItem = {
        ...this.getGoodsListItem,
        seller_id: this.$route.query.sellerId,
        start: 0,
        length: 50
      };
      axios
        .request({ ...home.SpecialOfferList, params: this.getGoodsListItem })
        .then(res => {
          if (res.data) {
            this.goodsList = res.data.data;
          }
        });
    },
    addFocus() {
      if (!this.loginState) {
        //this.$router.push("/Login");
        this.setshowlogin(true)
        return;
      }
      let obj = {
        user_tag: this.sellerinfo.tag,
        seller_id: this.seller_id,
        favour_type: 2 //标识关注卖家
      };

      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          this.$message.success("已关注");
          this.init();
        });
    }
  }
};
</script>
.<style lang="less" scoped>
@import url("./sellerShopDetail.less");
</style>