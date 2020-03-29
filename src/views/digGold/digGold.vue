<template>
  <div class="specialPrice">
    <div class="banner" :class="showmimg?'':'hiddenimg'">
      <img src="@/assets/image/specialPrice/digGold.jpg" alt />
    </div>
    <div class="cont allWidth">
      <div class="tit">
        <div class="title" style="margin-bottom:15px;">条件筛选</div>
        <div class="title" style="border-bottom:1px dashed #ddd;">
          <div class="one">品牌</div>
          <ul class="clear brand" :class="!showmoreActive?'showmoreActive':''">
            <li
              v-for="(item ,k) in brandlist"
              :key="k"
              @click="getSpecialList(k,'brand')"
              :class="{'active':brand_k===k}"
            >
              <ImgE :src="item.imgurl" :w="90" :H="30"></ImgE>
              <a
                class="el-icon-circle-close color close"
                @click.stop="deleBrand(k)"
                v-if="brand_k===k"
              ></a>
            </li>
          </ul>
          <a class="showmore el-icon-circle-plus-outline" @click="showmore"></a>
        </div>
        <div class="title" style="margin-top:15px;">
          <div class="one">类别</div>
          <ul class="clear" :class="!showmoreActive1?'showmoreActive1':''">
            <li @click="getSpecialList(-1,'cate')" :class="{'color':cate_k==-1}">全部({{sumCount}})</li>
            <li
              v-for="(item ,k) in categoryList"
              :key="k"
              @click="getSpecialList(k,'cate')"
              :class="{'color':cate_k==k}"
            >{{item.name}}({{item.sum}})</li>
          </ul>
          <a class="showmore el-icon-circle-plus-outline" @click="showmore1"></a>
        </div>
      </div>

      <div class="search clear">
        <div class="fr">
          <el-input
            placeholder="在结果中查找型号"
            v-model="name"
            size="small "
            @keyup.enter.native="inputHandler"
            class="inputSearch"
            style="width:250px;"
            clearable
          >
            <el-button slot="append" @click="inputHandler">搜索</el-button>
          </el-input>
        </div>
      </div>
      <table class="goodsList">
        <thead>
          <tr class="title">
            <th>实物图片</th>
            <th class="name">零件信息</th>
            <th class="info">供应商</th>
            <!-- <th>品牌</th> -->
            <th>批号</th>
            <th>货期</th>
            <th>库存</th>
            <th>清仓价</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody class="list">
          <tr
            v-for="(item,k) in specialList"
            class="item clear"
            :class="(k+1)%2==0?'noMargin':''"
            :key="k"
          >
            <td>
              <div class="goodsImage">
                <span
                  class="cover el-icon-zoom-in"
                  @click.stop="bigImg(item.sellerGoodsImageUrl?item.sellerGoodsImageUrl:item.goodsImageUrl)"
                ></span>
                <ImgE
                  :src="baseURL3+'/'+item.sellerGoodsImageUrl.split('@')[0]"
                  :W="66"
                  :H="56"
                  v-if="item.sellerGoodsImageUrl"
                ></ImgE>
                <ImgE :src="item.goodsImageUrl" :W="66" :H="56" v-if="!item.sellerGoodsImageUrl"></ImgE>
              </div>
            </td>
            <td class="textLeft">
              <div >
                <p
                  @click.stop="chipSellerGoodsDetal(item)"
                  class="blu name desc"
                  :title="item.goods_name"
                >
                  <i
                    v-if="item.isSelf"
                    style="font-style:normal;font-size:10px;border-radius:2px;padding:1px 5px;"
                    class="bgColor"
                  >自营</i>
                  <i>{{item.goods_name}}</i>
                </p>
                <p class="brandName" @click.stop="gotoShop(item)">{{item.brandName}}</p>
                <p class="gray desc" :title="item.goodsDesc">{{item.goodsDesc}}</p>
              </div>
            </td>
            <td class="info">
              <div class="infoWrap textLeft">
                <div class="clear">
                  <span class="fl leftImg">
                    <img
                      :src="item.userImgeUrl"
                      alt
                      @click.stop="chipShop(item)"
                    />
                  </span>
                  <div class="fl">
                    <p @click.stop="chipShop(item)" class="sellerName name">{{item.sellerName}}</p>
                    <p>
                      <span
                        :class="item.tag==1?'deepgreen':'blu'"
                        v-if="item.tag==1"
                        style="margin-right:10px;"
                      >{{item.tag | tagFilter}}</span>
                      <span
                        :class="item.tag==1?'deepgreen':'blu'"
                        v-if="item.tag==2 && item.isAgent"
                        style="margin-right:10px;"
                      >{{item.tag | tagFilter}}</span>
                      <span
                        class="color"
                        v-if="!item.focus"
                        @click.stop="addFocus(k)"
                        style="cursor:pointer;"
                      >关注商家</span>
                    </p>
                  </div>
                </div>
              </div>
            </td>
            <td @click="chipSellerGoodsDetal(item)">
              <span class="blu">{{item.base_no?item.base_no:'暂无'}}</span>
            </td>
            <td @click="chipSellerGoodsDetal(item)">
              <p class="goodsType">{{item.goods_type?'现货':'期货'}}</p>
              <p class="desc">{{item.diliverPlace}}交货</p>
            </td>
            <td @click="chipSellerGoodsDetal(item)">
              {{item.goodsStockCount}}只
              <p class="desc orange">起订量：{{item.moq}}</p>
              <p class="desc gray">增量：{{item.mpq}}</p>
            </td>
            <td @click="chipSellerGoodsDetal(item)">
              <div class="stepPrice">
                <ul class="priceList" v-if="item.priceType">
                  <li v-for="(item0,index0) in item.priceList" :key="index0">
                    <div class="color">
                      <p>{{item0.num}}+</p>
                      <p>{{item.priceUnit?'$':'￥'}}{{item0.price | toFixed(item.priceUnit?3:2)}}</p>
                    </div>
                  </li>
                </ul>
                <strong v-if="!item.priceType">
                  {{item.priceUnit?'$':'￥'}}{{
                  item.goodsPrice | toFixed(item.priceUnit?3:2)
                  }}
                </strong>
              </div>
              <p class="blu">（{{item.priceUnit?'不含税':'含13%增值税'}}）</p>
            </td>
            <td>
              <el-input-number
                v-model="item.count"
                size="mini"
                @click.stop="changenum"
                @blur="handleBlur($event,k)"
                @change="handleChange($event,k)"
                :max="item.goodsStockCount"
                :min="item.goodsStockCount>item.moq?item.moq:item.goodsStockCount"
                :step="item.mpq"
                style="width:105px"
              ></el-input-number>
            </td>
            <td class="oper">
              <a class="yellowBg btn" @click="chipSellerGoodsDetal(item)">立即下单</a>
              <!-- <a class="yellowBg btn" @click.stop="gotoPurchase(item)">立即下单</a> -->
              <br />
              <a class="btn yellowBorder" @click.stop="addShopingCar(item)">加入购物车</a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        v-if="total"
        :color="'lightYellow'"
        @current-change="handleCurrentChange"
        :pageIndex.sync="currentPage"
        :pageSize="pageSize"
        :total="total"
      ></Pagination>
      <el-dialog title :visible.sync="showbigImg">
        <div>
          <el-carousel height="500px" indicator-position="outside">
            <el-carousel-item
              v-for="item in bigimg.split('@')"
              :key="item"
              style="line-height:420px;text-align:center;"
            >
              <img
                :src="baseURL3+'/'+item"
                alt
                style="max-height:400px;"
                v-if="item.indexOf('http')==-1"
              />
              <img :src="item" alt style="max-height:400px;" v-if="item.indexOf('http')!=-1" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { baseURL3 } from "@/config";
import { mapState, mapActions, mapMutations } from "vuex";
import { ladderPrice } from "../../lib/utils";
import { axios, home, shoppingCar } from "../../api/apiObj";
export default {
  data() {
    return {
      specialList: [],
      categoryList: [],
      pageSize: 20,
      currentPage: 1,
      total: 0,
      showGetMore: true,
      name: "",
      categoryId: "",
      baseURL3: baseURL3,
      showbigImg: false,
      bigimg: "",
      brand_k: "",
      cate_k: "",
      brandId: "",
      sumCount: 0,
      brandlist: [],
      showmoreActive: false,
      showmoreActive1: false,
      showmimg: true
    };
  },
  computed: {
    ...mapState({
      headerFxed: state => state.headerFxed,
      loginState: state => state.loginState,
      UserInforma: state => state.Login.UserInforma
    }),
    start() {
      return (this.currentPage - 1) * this.pageSize;
    }
  },
  mounted() {
    var _this = this;
    // setTimeout(function(){
    //   _this.showmimg=false
    // },5000)
    this.getCategroy();
    this.getSpecialList(-1);
  },
  methods: {
    ...mapMutations("MerchantList", ["setBuyOneGoodsDetail"]),
    ...mapActions("Login", ["GetUserInforma"]),
    ...mapMutations(["setloginState", "setshowlogin"]),
    showmore1() {
      this.showmoreActive1 = !this.showmoreActive1;
    },
    showmore() {
      this.showmoreActive = !this.showmoreActive;
    },
    deleBrand(k) {
      this.brand_k = "";
      this.brandId = "";
      this.currentPage = 1;
      this.getCategroy();
      this.getSpecialOfferList();
    },
    addShopingCar(obj) {
      if (!this.loginState) {
        this.setshowlogin(true);
        return;
      }
      if (obj.sellerId == this.UserInforma.id) {
        this.$message.error("不能对自己发布的商品加购物车进行购买");
        return;
      }
      var obj = {
        sellerGoodsId: obj.id,
        sellerId: obj.sellerId,
        goodsSource: "1",
        goodsName: obj.goods_name,
        goodsId: obj.goods_id,
        goodsCount: obj.count
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          if (res) {
            this.$message.success("添加成功");
            var _this = this;
            setTimeout(() => {
              _this.GetUserInforma();
            }, 2000);
          }
        });
    },
    handleBlur(event, k) {
      let e = event.target.value;
      let obj = this.specialList[k];
      if (obj.goodsStockCount > obj.mpq + obj.moq) {
        obj.count = obj.moq + Math.round((e - obj.moq) / obj.mpq) * obj.mpq;
      } else {
        obj.count = e;
      }
      this.specialList[k] = obj;
      this.handleChange(obj.count, k);
    },
    handleChange(e, k) {
      let obj = this.specialList[k];

      console.log(obj);
      //   axios
      //     .request({
      //       ...shoppingCar.updatShoppingCar,
      //       data: { uid: obj.uid, goodsCount: obj.count },
      //       method: "post"
      //     })
      //     .then(res => {
      //       if (res) {
      //       }
      //     });
      //   let currentPrice = 0;
      //   if (obj.priceList) {
      //     if (obj.priceList.length == 1) {
      //       currentPrice = parseFloat(obj.priceList[0].price);
      //     } else if (obj.priceList.length == 2) {
      //       if (e < Number(obj.priceList[1].num)) {
      //         currentPrice = parseFloat(obj.priceList[0].price);
      //       } else {
      //         currentPrice = parseFloat(obj.priceList[1].price);
      //       }
      //     } else if (obj.priceList.length == 3) {
      //       if (e < Number(obj.priceList[1].num)) {
      //         currentPrice = parseFloat(obj.priceList[0].price);
      //       } else if (e < Number(obj.priceList[2].num)) {
      //         currentPrice = parseFloat(obj.priceList[1].price);
      //       } else {
      //         currentPrice = parseFloat(obj.priceList[2].price);
      //       }
      //     }
      //   } else {
      //     currentPrice = obj.goodsPrice;
      //   }
      //   this.specialList = this.specialList.map((item, index0) => {
      //     if (index0 == index) {
      //       item.money = e * currentPrice;
      //       item.currentPrice = currentPrice;
      //     }
      //     return item;
      //   });
    },
    bigImg(url) {
      this.showbigImg = true;
      this.bigimg = url;
    },
    addFocus(index) {
      if (!this.loginState) {
        this.setshowlogin(true);
        return;
      }
      let obj = {
        user_tag: this.specialList[index].tag,
        seller_id: this.specialList[index].sellerId,
        favour_type: 2 //标识关注卖家
      };
      var _this = this;
      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          _this.$set(_this.specialList[index], "focus", true);
          _this.$message.success("已关注");
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
    gotoPurchase(item) {
      if (!this.loginState) {
        this.setshowlogin(true);
        return;
      }
      if (item.seller_id == this.UserInforma.id) {
        this.$message.error("不能对自己发布的商品进行购买");
        return;
      }
      let orderJson = [];
      let obj = {
        goods_id: item.goods_id,
        goodsDesc: item.goodsDesc,
        goodsImage: item.sellerGoodsImageUrl
          ? item.sellerGoodsImageUrl
          : item.goodsImageUrl,
        goods_name: item.goods_name,
        diliver_place: item.diliverPlace,
        seckill_goods_id: item.id,
        clude_bill: item.includBill,
        price_unit: item.priceUnit,
        goods_type: item.goods_type,
        sellerName: item.sellerName,
        sellerHeader: item.userImgeUrl,
        seller_id: item.sellerId,
        tag: item.tag,
        goods_count: item.count,
        goods_price: item.goodsPrice,
        order_channe: 1,
        pay_channe: 1
      };
      orderJson.push(obj);
      let billObj = {
        billtype: "1",
        content_id: "1"
      };
      // 生成bill对象
      let obj2 = {
        bill: JSON.stringify(billObj),
        dilivertype: "1",
        order: JSON.stringify(orderJson),
        add_id: 1,
        type: 0,
        orderSource: 1
      };
      axios
        .request({
          ...buyerOrderCenter.orderCheck2,
          data: obj2,
          method: "post"
        })
        .then(res => {
          if (res.data) {
            this.$store.dispatch("MerchantList/GetOrder", obj2).then(res => {
              localStorage.setItem(
                "buyOneGoodsDetail",
                JSON.stringify({
                  data: JSON.stringify(res),
                  obj2: JSON.stringify(obj2)
                })
              );
              this.setBuyOneGoodsDetail(
                JSON.stringify({
                  data: JSON.stringify(res),
                  obj2: JSON.stringify(obj2)
                })
              );

              this.$router.push({
                path: "/ShoppingCart/ShoppingSettlement"
              });
            });
          } else {
            this.$confirm(res.message, "提示", {
              confirmButtonText: "继续提交新订单",
              cancelButtonText: "去订单中心支付",
              distinguishCancelAndClose: true,
              type: "warning"
            })
              .then(() => {
                this.$store
                  .dispatch("MerchantList/GetOrder", obj2)
                  .then(res => {
                    localStorage.setItem(
                      "buyOneGoodsDetail",
                      JSON.stringify({
                        data: JSON.stringify(res),
                        obj2: JSON.stringify(obj2)
                      })
                    );
                    this.setBuyOneGoodsDetail(
                      JSON.stringify({
                        data: JSON.stringify(res),
                        obj2: JSON.stringify(obj2)
                      })
                    );
                    this.$router.push({
                      path: "/ShoppingCart/ShoppingSettlement"
                    });
                  });
              })
              .catch(action => {
                if (action === "cancel") {
                  this.$router.push("/PersonalCenter/BuyerOrderManagement");
                }
              });
          }
        });
    },
    gotoShop(item) {
      this.$router.push({
        path: "/BrandDetail",
        query: {
          tag: "brand",
          documentid: item.brandId,
          name: item.goods_name
        }
      });
    },
    chipSellerGoodsDetal(item) {
      //跳转商品详情
      sessionStorage.setItem("sellerGoodsDetail", JSON.stringify(item));
      this.$router.push("/sellerGoodsDetail");
    },
    getSpecialList(k, key) {
      if (key == "brand") {
        this.brand_k = k;
        if (this.brandlist[k]) {
          this.brandId = this.brandlist[k].id;
        } else {
          this.brandId = "";
        }
        this.getCategroy();
      } else {
        this.cate_k = k;
        if (this.categoryList[k]) {
          this.categoryId = this.categoryList[k].id;
        } else {
          this.categoryId = "";
        }
      }
      //根据分类获取商品列表
      this.currentPage = 1;
      this.getSpecialOfferList();
    },
    getCategroy() {
      axios
        .request({
          ...home.queryDirectC,
          params: {
            is_old_product: "true",
            start: 0,
            length: 10,
            brand_id: this.brandId
          }
        })
        .then(res => {
          //let count = 0;
          this.categoryList = res.data.list;
          // .map(item => {
          //   count += Number(item.sum);

          //   return item;
          // });
          this.sumCount = res.data.total;
          this.brandlist = res.data.brand;
        });
    },
    inputHandler() {
      this.currentPage = 1;
      this.getSpecialOfferList();
    },
    handleCurrentChange(x) {
      this.currentPage = x;
      this.getSpecialOfferList();
    },
    getSpecialOfferList() {
      this.$loading(this.$store.state.loading);
      let obj = {
        start: this.start,
        length: this.pageSize,
        is_old_product: true,
        status: 1,
        catergory_id: this.categoryId,
        brand_id: this.brandId
      };
      if (this.name) {
        obj.name = this.name;
      }
      axios.request({ ...home.SpecialOfferList, params: obj }).then(res => {
        if (res.data.data.length) {
          this.specialList = res.data.data.map(item => {
            item.count =
              item.goodsStockCount > item.moq ? item.moq : item.goodsStockCount;
            if (item.priceType) {
              //标识阶梯价
              item.priceList = ladderPrice(item.priceLevel);
            }
            return item;
          });
        } else {
          this.specialList = [];
          this.$message({
            message: "搜索结果为空",
            type: "warning"
          });
        }
        this.total = res.data.total;
        this.$loading(this.$store.state.loading).close();
        // if(res.data.data.length<this.pageSize){
        //     this.currentPage=0;
        // }
      });
    },
    // getMore() {
    //   this.currentPage++;
    //   let category;
    //   if (this.categoryList[this.cate_k]) {
    //     this.categoryId = this.categoryList[this.cate_k].id;
    //   }
    //   this.getSpecialOfferList();
    // },
    //加入购物车
    addCar(item) {
      let obj = {
        sellerId: item.sellerId,
        sellerGoodsId: item.id,
        goodsSource: 1,
        goodsName: item.goods_name,
        goodsId: item.goods_id
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          if (res) {
            this.$message.success("已加入购物车");
            var _this = this;
            setTimeout(() => {
              _this.GetUserInforma();
            }, 2000);
          }
        });
    }
  }
};
</script>
<style scoped lang="less">
@import "./digGold.less";
</style>
