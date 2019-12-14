<template>
  <div class="ShoppingCartSelect">
    <div class="ShoppingCart-con" style="margin-top:50px">
      <!-- 搜索 -->
      <div class="ShoppingCart-title">
        <p class="total">
          <span>购物车</span>
          <el-button  @click="delbatch" class="fr" type="primary" v-if="disabledNum">一键清除无效商品</el-button>
        </p>
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
              />全选
            </label>
          </span>
          <span style="width:20%">商品</span>
          <span style="width:17%">交货地/交期</span>
          <span style="width:10%">单价/库存</span>
          <span style="width:15%">数量</span>
          <span style="width:10%">总计</span>
          <span style="width:13%">操作</span>
        </div>
        <div class="ShoppingCart-list-con">
          <p v-if="goodsList.length==0" class="nocontent">
            购物车空空如也,&nbsp;&nbsp;去
            <router-link to="/" tag="a">首页</router-link>添加商品
          </p>
          <template v-for="(item,k) in goodsList">
         
            <div class="item" :key="k">
              <div class="title">
                <label class="checkBox">
                  <input
                    type="checkbox"
                    :checked="item.checked"
                    @change="ShoppingCartCateCheck($event,k)"
                  />
                </label>
                <!--                    <span>{{item.sellerName}} <span style="font-size:12px">({{item.sellerTag | tagFilter}})</span></span>-->
                <div class="ImgE">
                  <img :src="item.sellerUrl" alt  style="cursor:pointer;" @click="chipShop(item)"/>
                  <span style="margin-left:10px;font-size:14px;cursor:pointer;"  @click="chipShop(item)">{{item.sellerName}}</span>
                  <!-- <div class="content">
                    <div class="top">
                      <img :src="item.sellerUrl" alt style="cursor:pointer;" @click="chipShop(item)"/>
                      <div>
                        <p class="name"  style="cursor:pointer;" @click="chipShop(item)">{{item.sellerName}}</p>
                        <p class="tag" v-if="item.sellerTag!=3">{{item.sellerTag | tagFilter}}</p>
                      </div>
                    </div>
                    <div class="btn unactive" v-if="item.focus">已关注</div>
                    <div class="btn" @click="guanzhu(2,k)" v-else>关注</div>
                  </div> -->
                   <div class="wrapInfo clear content">
                    <div class="wrap" @click="chipShop(item)">
                      <img :src="item.sellerUrl" alt />
                      <div :title="item.sellerName" >
                        <p style="margin:10px 0;">{{item.sellerName}}</p>
                      
                        <span class="tag bgColor" v-if="item.sellerTag==1">{{item.sellerTag | tagFilter}}</span>
                        <span class="tag bgBlu" v-if="item.sellerTag==2">{{item.sellerTag | tagFilter}}</span>
                        <span class="tag bgOrange" v-if="item.sellerTag==18">{{item.sellerTag | tagFilter}}</span>
                         <span class="tag bgOrange">保</span>
                      </div>
                    </div>
                    <div class="score">
                        <div >入驻时间：{{item.settleTime | formatDate}}</div>
                        <div style="margin-bottom:20px;">企业资质：已认证</div>
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
                  <p style="center">
                    <span class="borderColor" style="padding:2px 5px;border-radius:4px;cursor:pointer;font-size:14px;"  @click="chipShop(item)">进入店铺</span>
                  </p>
                </div>
                </div>
              </div>
              <template v-for="(item1,index) in item.list">
                <ul class="listDetail" :key="index" :class="!item1.isenable?'unenable':''">
                  <li class="imgWrap" style="width:15%;">
                    <label class="checkBox" v-if="item1.isenable">
                      <input
                        type="checkbox"
                        :checked="item1.checked"
                        @change="ShoppingCartoneCheck($event,k,index)"
                      />
                    </label>
                    <label class="checkBox" v-if="!item1.isenable">
                      <input type="checkbox" readonly style="background:#e4e4e4" />
                    </label>
                    <div>
                      <ImgE :src="item1.goodsImageUrl" :W="86" :H="86"></ImgE>
                      
                    </div>
                  </li>
                  <li style="width:20%;" class="info">
                    <p class="name">
                      <router-link :to="{
                        path:'/BrandDetail/GoodsDetails',
                        query:{
                          tag:'goodsinfo',
                          documentid:item1.goods_id,
                          name:item1.goods_name
                        }
                      }"><strong>{{item1.goods_name}}</strong></router-link></p>
                    <template>
                       <p class="desc">品牌：
                      <router-link :to="{
                        path:'/BrandDetail',
                        query:{
                          tag:'brand',
                          documentid:item1.brandId,
                          name:item1.brandName
                        }
                      }">
                      {{item1.brandName}}</router-link>
                      </p>
                      <p v-if="item1.focus" class="guanzhu unguanzhu">
                        <span>已关注</span>
                      </p>
                      <p v-else @click="guanzhu(1,k,index)" class="guanzhu">
                        <span>关注</span>
                      </p>
                    </template>
                   
                  </li>
                  <li style="width:17%" class="place">
                      <p :class="item1.goods_type?'green':'color'" >{{item1.goods_type?'现货':'订货'}}</p>
                    <template>
                      <p v-if="item1.goods_type && item1.day_interval">{{item1.day_interval | filterhours}}小时内交货</p>
                      <p v-else>{{item1.expireTime | formatDate}}</p>
                    </template>
                      <p>{{item1.diliverPlace}}交货</p>
                  </li>
                  <template>
                    <li style="width:10%" class="price" v-if="item1.priceType">
                      <p v-for="val in item1.priceList" :key="val.price">
                        <span class="num">{{val.num}}+</span>---
                        <strong>{{item1.priceUnit?"$":"¥"}} {{val.price | toFixed(item1.priceUnit?3:2) }}</strong>
                      </p>
                      <p class="goodsStockCount">
                        剩余:
                        <strong>{{item1.goodsStockCount}}</strong>只
                      </p>
                    </li>
                    <li style="width:10%;" class="price" v-else>
                      <p style="text-align: center;">
                        <strong>{{item1.priceUnit?"$":"¥"}}{{item1.goodsPrice | toFixed(item1.priceUnit?3:2)}}</strong>
                      </p>
                      <p class="goodsStockCount">
                        剩余:
                        <strong>{{item1.goodsStockCount}}</strong>只
                      </p>
                    </li>
                  </template>
                  <li style="width:15%" class="count">
                    <el-input-number
                      v-model="item1.count"
                      size="mini"
                      @blur="handleBlur($event,k,index)"
                      @change="handleChange($event,k,index)"
                      :max="item1.goodsStockCount"
                      :min="item1.goodsStockCount>item1.moq?item1.moq:item1.goodsStockCount"
                      :step="item1.mpq"
                   
                    ></el-input-number>
                    <p>起订量:{{item1.moq}}只</p>
                    <p>最小增量:{{item1.mpq}}只</p>
                  </li>
                  <li style="width:23%" class="all">
                    <div class="top" :class="item1.currentTime?' ':'act'">
                      <div class="count">
                        <strong>{{item1.priceUnit?"$":"¥"}}{{item1.money?item1.money:0 | toFixed(item1.priceUnit?3:2)}}</strong>
                      </div>
                      <div class="count">
                        <!--                                    <p class="add" @click="add(k,index)">添加询价篮</p>-->
                        <span class="del">
                          <i class="el-icon-delete" size="medium" @click="del(k,index)"></i>
                        </span>
                      </div>
                    </div>
                    <div class="countTime">
                      <div>
                        <CountTime
                          v-if="!item1.seller_always && item1.expireTime"
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
                        <p
                          style="text-align: center;"
                          v-if="!item1.isenable"
                        >商品已下架</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </template>
            </div>
          </template>
        </div>
        <Pagination
          v-if="total"
          class="page"
          @current-change="handleCurrentChange"
          :currentPage.sync="currentPage"
          :pageSize="pageSize"
          :total="total"
        ></Pagination>
      </div>
    </div>
    <!-- 底部全选 -->
    <div class="footerFixed" v-if="goodsList.length">
      <div class="fixed-all clear">
        <div class="fixed_right fr">
          <div>
            <p class="num">
              已选
              <span>{{count}}</span>
              件商品
            </p>
            <p class="price">
              总价：
              <span>￥{{unMoney | toFixed(2)}}</span>+
              <span>${{unitMoney | toFixed(3)}}</span>
            </p>
          </div>
          <span @click="submit">去结算</span>
          <!--                  <router-link to="/ShoppingCart/ShoppingSettlement" tag="span" @click="submit">去结算</router-link>-->
        </div>
        <div class="fixed_left fl">
          <span class="allcheckbox">
            <label class="checkBox">
              <input
                type="checkbox"
                :checked="ShoppingCartAllCheckbox"
                @change="ShoppingCartAllCheck"
              />全选
            </label>
          </span>
          <!--                  <span>删除已选商品</span>-->
          <!--                   <span>|</span>-->
          <!--                  <span>添加至询价篮</span>-->
        </div>
      </div>
    </div>
      <el-dialog
          title="选择报关方式"
          :visible.sync="showDeclareType"
          width="30%"
          >
         <div>
             <h3>您总共有<strong>{{declareTypeCount}}</strong>种商品需要报关，请选择合适的报关方式</h3><br>
             <el-button  :class="declareType?'bgColor':'bgLightGray'" @click="declareType=true">合并报关</el-button>
             <el-button :class="declareType?'bgLightGray':'bgColor'" @click="declareType=false">分开报关</el-button>
         </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="showDeclareType = false">取 消</el-button>
    <el-button type="primary" @click="onsubmit">确 定</el-button>
  </span>
      </el-dialog>
  </div>
</template>
<style lang="less" scoped>
@import "./ShoppingCartSelect.less";
</style>
<script>
import { mapMutations,mapActions } from "vuex";

import { axios, shoppingCar } from "../../../api/apiObj";
import { TimeForma2, ladderPrice,TimeForma} from "@/lib/utils";

export default {
  name: "ShoppingCartSelect",
  data() {
    return {
      disabledNum:0,
      ShoppingCartAllCheckbox: false,
      pageSize: 20,
      currentPage: 1,
      total: 0,
      goodsList: [],
        showDeclareType:false,
        declareType:true,//togetherPay  true 一起报关。false分开
        sendData:{},//提交结算的对象
        declareTypeCount:0
    };
  },
  methods: {
    ...mapMutations("MerchantList", ["setBuyOneGoodsDetail"]),
    // ...mapActions("shoppingCart", ["GetAllShoppingCartList"]),
     ...mapActions("Login", ["GetUserInforma"]),
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
    delbatch(){
      //批量删除无效的商品
     
      let arr=[]
      this.goodsList.forEach(item => {
          item.list.map(item0 => {
            if(!item0.isenable){
              arr.push(item0.id)
            }
          });
        });
        let obj={
          ids:arr.join('@')
        }
        axios
        .request({ ...shoppingCar.deleteBatchShoppingCar, params: obj })
        .then(res => {
          this.$message.success("成功移除");
          this.init();
        });
    },
     chipShop(item){
                if(item.sellerTag==1){
                    this.$router.push({
                        path:"/BrandDetail",
                        query:{
                            seller_id:item.sellerId
                        }
                    })
                }else{
                    this.$router.push({
                        path:"/sellerShopDetail",
                        query:{
                           
                            sellerId:item.sellerId
                        }
                    })
                }
            },
    ShoppingCartAllCheck(e) {
      this.ShoppingCartAllCheckbox = e.target.checked;
      this.goodsList = this.goodsList.map(item => {
        item.checked = e.target.checked;
        item.list = item.list.map(item0 => {
          if (item0.isenable) {
            item0.checked = e.target.checked;
          } else {
            item0.checked = false;
          }
          return item0;
        });
        return item;
      });
    },
    ShoppingCartCateCheck(e, k) {
      this.goodsList[k]["checked"] = e.target.checked;
      this.goodsList[k].list = this.goodsList[k].list.map(item0 => {
        0;
        if (item0.isenable) {
          item0.checked = e.target.checked;
        } else {
          item0.checked = false;
        }
        return item0;
      });
    },
    ShoppingCartoneCheck(e, k, index) {
      this.goodsList[k].list = this.goodsList[k].list.map((item0, index0) => {
        if (index0 == index) {
          if (item0.isenable) {
            item0.checked = e.target.checked;
          } else {
            item0.checked = false;
          }
        }
        return item0;
      });
    },
    init() {
      let obj = {
        source: 1,
        start: this.start,
        length: this.pageSize
      };
      axios.request({ ...shoppingCar.inquiryList, params: obj }).then(res => {
        this.goodsList = res.data.data.map(item => {
          item.list.map(item0 => {
            item0.count = item0.moq;
            if (item0.priceLevel) {
              item0.priceList = ladderPrice(item0.priceLevel);
              item0.money = item0.moq * item0.priceList[0].price;
            } else {
              item0.money = item0.moq * item0.goodsPrice;
            }
            if(!item0.isenable){
            this.disabledNum++;
          }
            return item0;
          });
          
          return item;
        });
        this.total = res.data.total;
      });
    },
    handleCurrentChange(x) {
      this.currentPage = x;
      this.ShoppingCartAllCheckbox = false;
      this.init();
    },
    //关注
    guanzhu(favour_type, k, index) {
      let obj = {
        favour_type: favour_type
      };
      if (favour_type == 1) {
        obj = {
          ...obj,
          goods_id: this.goodsList[k].list[index].goods_id,
          catergory_id: this.goodsList[k].list[index].catergoryId
        };
      } else if (favour_type == 2) {
        obj = {
          ...obj,
          user_tag: this.goodsList[k].sellerTag,
          seller_id: this.goodsList[k].sellerId
        };
      }
      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          this.$message.success(res.message);
          if (favour_type == 1) {
            this.$set(this.goodsList[k].list[index], "focus", true);
          } else if (favour_type == 2) {
            this.$set(this.goodsList[k], "focus", true);
          }

          //  this.goodsList[k].foucs=true
        });
    },
    //加入询价蓝
    add(k, index) {
      let item = this.goodsList[k].list[index];
      let obj = {
        sellerId: item.sellerId,
        sellerGoodsId: item.id,
        goodsSource: '2',
        goodsId:item.id
      };
      axios
        .request({ ...shoppingCar.insertShoppingCar, params: obj })
        .then(res => {
          if(res){
            this.$message.success("已加入询价蓝");
            var _this=this;
            setTimeout(()=>{
              _this.GetUserInforma();
            },2000)
          }
          
        });
    },
    //从购物车删除商品
    del(k, index) {
      let item = this.goodsList[k].list[index];
      let obj = {
        id: item.id
      };
      axios
        .request({ ...shoppingCar.deleteSigletonShoppingCar, params: obj })
        .then(res => {
          this.$message.success("成功移除");
          this.init();
        });
    },
    handleBlur(event, k, index) {
      let e = event.target.value;
      let obj = this.goodsList[k].list[index];
       if (
        obj.goodsStockCount >
        obj.mpq + obj.moq
      ) {
        obj.count = obj.moq + Math.round((e - obj.moq) / obj.mpq) * obj.mpq;
      } else {
       obj.count = e;
      }
      this.goodsList[k].list[index]=obj;
      this.handleChange(e, k, index);
    },
    handleChange(e, k, index) {
      let obj = this.goodsList[k].list[index];
      let currentPrice = 0;
      if (obj.priceList) {
        if (obj.priceList.length == 1) {
          currentPrice = parseFloat(obj.priceList[0].price);
        } else if (obj.priceList.length == 2) {
          if (e <= Number(obj.priceList[1].num)) {
            currentPrice = parseFloat(obj.priceList[0].price);
          } else {
            currentPrice = parseFloat(obj.priceList[1].price);
          }
        } else if (obj.priceList.length == 3) {
          if (e <= Number(obj.priceList[1].num)) {
            currentPrice = parseFloat(obj.priceList[0].price);
          } else if (e <= Number(obj.priceList[2].num)) {
            currentPrice = parseFloat(obj.priceList[1].price);
          } else {
            currentPrice = parseFloat(obj.priceList[2].price);
          }
        }
      } else {
        currentPrice = obj.goodsPrice;
      }
      this.goodsList[k].list = this.goodsList[k].list.map((item, index0) => {
        if (index0 == index) {
          item.money = e * currentPrice;
          item.currentPrice = currentPrice;
        }
        return item;
      });
    },
    submit() {
      //去结算
      let orderJson = [];
      //计算有多少个美元产品
      let count=0
      this.goodsList.forEach(item0 => {
        item0.list.forEach(item => {
          if (item.checked && item.isenable) {
              if(item.priceUnit){
                  count++;
              }
            let obj = {
              seckill_goods_id: item.seller_goods_id,
              goods_id: item.goods_id,
              goods_name: item.goods_name,
              goods_count: item.count,
              goods_price: item.currentPrice,
              order_channe: 1,
              clude_bill: item.includBill,
              pay_channe: 1,
              price_unit: item.priceUnit,
              goods_type: item.goods_type,
              sellerName: item0.sellerName,
              sellerHeader: item0.sellerUrl,
              seller_id: item0.sellerId,
              tag: item0.sellerTag,
              goodsDesc: item.goodsDesc,
              goodsImage: item.goodsImageUrl,
              diliver_place: item.diliverPlace
            };
            if (!item.goods_type) {
              //标识期货
              obj = {
                ...obj,
                complete_date: item.deliverTime,
                diliver_date: item.deliverTime,
                end_date: item.endTime
              };
            }
            orderJson.push(obj);
          }
        });
      });
      let billObj = {
        billtype: "1",
        content_id: "1"
      };
      // 生成bill对象
        this.sendData = {
        bill: JSON.stringify(billObj),
        dilivertype: "1",
        order: JSON.stringify(orderJson),
        add_id: 1,
        type: 0,
        orderSource: 1,
        fromCar:1
      };
      if(count>1){
          //用户确认报关方式
          this.declareTypeCount=count;
            this.showDeclareType=true;
            this.declareType=true;
      }else{
          this.sendData.togetherPay=false
          this.$store
              .dispatch("MerchantList/GetOrder", this.sendData)
              .then(res => {
                  localStorage.setItem(
                      "buyOneGoodsDetail",
                      JSON.stringify({
                          data: JSON.stringify(res),
                          obj2: JSON.stringify(this.sendData)
                      })
                  );
                  this.setBuyOneGoodsDetail(
                      JSON.stringify({
                          data: JSON.stringify(res),
                          obj2: JSON.stringify(this.sendData)
                      })
                  );
                  this.$router.push({
                      path: "/ShoppingCart/ShoppingSettlement"
                  });
              })
              .catch(err => {
                  this.$message.error(err);
              });
      }

    },
      onsubmit(){
          this.sendData.togetherPay=this.declareType
          this.$store
              .dispatch("MerchantList/GetOrder", this.sendData)
              .then(res => {
                  localStorage.setItem(
                      "buyOneGoodsDetail",
                      JSON.stringify({
                          data: JSON.stringify(res),
                          obj2: JSON.stringify(this.sendData)
                      })
                  );
                  this.setBuyOneGoodsDetail(
                      JSON.stringify({
                          data: JSON.stringify(res),
                          obj2: JSON.stringify(this.sendData)
                      })
                  );
                  this.$router.push({
                      path: "/ShoppingCart/ShoppingSettlement"
                  });
              })
              .catch(err => {
                  this.$message.error(err);
              });
      }
  },
  filters: {
    filterhours(val){
      if(val){
        return Number(val)*24
      }
      
    },
    formatDate(val) {
      return TimeForma(val);
    }
  },
  watch: {
    ShoppingCartList: {
      handler() {},
      deep: true
    }
  },
 
  computed: {
    start() {
      return this.pageSize * (this.currentPage - 1);
    },
    unitMoney() {
      let money = 0;
      this.goodsList.forEach(item0 => {
        item0.list.forEach(item1 => {
          if (item1.checked && item1.priceUnit) {
            //表示美元
            money += item1.money;
          }
        });
      });

      return money;
    },
    unMoney() {
      let money = 0;
      this.goodsList.forEach(item0 => {
        item0.list.forEach(item1 => {
          if (item1.checked && !item1.priceUnit) {
            //表示美元
            money += item1.money;
          }
        });
      });

      return money;
    },
    count() {
      let count = 0;
      this.goodsList.forEach(item0 => {
        item0.list.forEach(item1 => {
          if (item1.checked) {
            count++;
          }
        });
      });
      return count;
    }
  },
  mounted() {
    this.$store.state.shoppingCart.active = 0;
    this.init();
  }
};
</script>
