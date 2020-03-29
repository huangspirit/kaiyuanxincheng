.<template>
  <div class="sellerOrderoneDetail">
    <div class="fr" style="height:60px;line-height:60px;padding-right:20px;">
      <div style="padding-right:10px;">
        <el-button
          size="small"
          class="bgBlu"
          style="position:relative"
          @click="setshowDeliverCar(true)"
        >
          发货筐
          <span
            style="position:absolute;border-radius:20px;padding:2px 3px;top:-5px"
            class="bgColor"
          >{{deliveryCarCount}}</span>
        </el-button>
      </div>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right ">
      <el-breadcrumb-item to="/PersonalCenter/SellerOrderManagement">卖家订单中心</el-breadcrumb-item>
      <el-breadcrumb-item>订单明细</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="cont">
      <div class="tit">
        <div>
          <span>型号：{{ordergoodsdetail.goods_name}}</span>
        </div>
        <div>
          <span>品牌：{{ordergoodsdetail.branda}}</span>
        </div>
        <div>
          <span
            :class="ordergoodsdetail.goods_type?'green':'color'"
          >{{ordergoodsdetail.goods_type?'现货':'订货'}}</span>
          <span
            class="blu"
            style="margin-left:15px;"
          >{{ordergoodsdetail.clude_bill?'含13%增值税':'不含税'}}</span>
        </div>
      </div>
      <div class="searchItem">
        <div>
          <p :class="{'color':deliver_states== -1}">
            <label>
              <input type="radio" value="-1" name="status" v-model="deliver_states" />
              全部
            </label>
          </p>
          <p :class="{'color':deliver_states== 0}">
            <label>
              <input type="radio" value="0" name="status" v-model="deliver_states" />
              未发货
            </label>
          </p>
          <p :class="{'color':deliver_states==1}">
            <label>
              <input type="radio" value="1" name="status" v-model="deliver_states" />
              已发货
            </label>
          </p>
        </div>
        <div>
          <span>状态：</span>
          <p :class="{'color':type==1}">
            <label>
              <input type="radio" value="1" name="status" v-model="type" />
              已支付
            </label>
          </p>
          <p :class="{'color':type==2}">
            <label>
              <input type="radio" value="2" name="status" v-model="type" />
              未支付
            </label>
          </p>
          <p :class="{'color':type==3}">
            <label>
              <input type="radio" value="3" name="status" v-model="type" />
              已取消
            </label>
          </p>
        </div>
        <div>
          <span>今日可发数量：</span>
          <span class="color">{{should_deliver_count | toFixed(0)}}</span>
          <span v-if="should_deliver_count">
            <el-button
              size="mini"
              class="borderColor"
              round
              style="line-height:0.7;margin-left:20px;"
              @click="addgoods"
            >一键加入发货筐</el-button>
          </span>
        </div>
      </div>
      <el-table
        class="tablelist"
        :data="list"
        stripe
        style="width: 100%;"
        :cell-style="set_cell_style"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="下单日期" width="180">
          <template slot-scope="scoped">
            <p>{{scoped.row.order_no}}</p>
            <p class="color">{{scoped.row.create_time | formatDate2}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="买家" align="center">
          <template slot-scope="scoped">
            <img :src="scoped.row.imageUrl" alt style="width:30px;height:30px;border-radius:30px;" />
            <!-- <span :title="scoped.row.nickName" style="max-width:90px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">{{scoped.row.nickName}}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="name" label="单价" align="center">
          <template
            slot-scope="scoped"
          >
         <p>{{scoped.row.price_unit?'$':'￥'}}{{scoped.row.seller_publis_price | toFixed(scoped.row.price_unit?3:2)}}</p> 
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="数量">
          <template slot-scope="scoped">{{scoped.row.goods_count | toFixed(0)}}</template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="金额">
          <template
            slot-scope="scoped"
          >{{scoped.row.price_unit?'$':'￥'}}{{scoped.row.total_price | toFixed(scoped.row.price_unit?3:2)}}</template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="支付状态">
          <template slot-scope="scoped">
            <p
              :class="scoped.row.order_status==1 || scoped.row.order_status==4 || scoped.row.order_status==6 || scoped.row.order_status==7?'green':''"
            >{{scoped.row.order_status | statusFilter}}</p>
            <p v-if="scoped.row.pay_channel">{{scoped.row.pay_channel | channelFilter}}</p>
            <p v-if="scoped.row.order_status==5" class="color">待付尾款</p>
            <p v-if="scoped.row.last_pay_channel">尾款{{scoped.row.last_pay_channel | channelFilter}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="物流信息" align="center" width="200">
          <template slot-scope="scoped">
              <div class="deliver" style="white-space:nowrap;">
                  <div v-if="scoped.row.order_status<6">
                    <p class="color" v-if="scoped.row.order_status!=1">{{scoped.row.order_status | deliverStatesFilter}}</p>
                    <p class="color" v-if="scoped.row.order_status==1">
                      <template v-if="scoped.row.real_dilivertime">平台已退货，可再发</template>
                      <template v-else>未发货</template>
                    </p>
                    <template v-if="!(scoped.row.isconfirm==0 || scoped.row.isconfirm)">
                      <CountTime
                        class="countTime color"
                        style="font-size:12px;"
                        v-if="scoped.row.current_time && scoped.row.current_time < scoped.row.diliver_time && scoped.row.order_status==1 && !scoped.row.real_dilivertime"
                        v-on:end_callback="init()"
                        :currentTime="scoped.row.current_time"
                        :startTime="scoped.row.current_time"
                        :endTime="scoped.row.diliver_time"
                        :tipText="''"
                        :tipTextEnd="'发货剩余:'"
                        :endText="'已逾期'"
                        :dayTxt="'天'"
                        :hourTxt="'时'"
                        :minutesTxt="'分'"
                        :secondsTxt="'秒'"
                      ></CountTime>
                      <span v-if="scoped.row.order_status==3" style="font-size:12px">
                        （{{scoped.row.mark?scoped.row.mark:'订单已取消'}}）</span>
                      <p
                        v-if="scoped.row.delivery_over"
                        style="font-size:12px"
                      >应发货时间：{{scoped.row.diliver_time | formatDate2}}</p>
                      <span
                        v-if="scoped.row.delivery_over"
                        style="font-size:12px"
                      >（已逾期{{scoped.row.violate_count}}天，请尽快发货）</span>
                    </template>
                    <template v-if="(scoped.row.isconfirm==0 || scoped.row.isconfirm)">
                        <p>预计交期：{{scoped.row.diliver_old_time | formatDate}}</p>
                        <p
                          v-if="scoped.row.diliver_old_time != scoped.row.diliver_time "
                          class="color"
                        >变更后：{{scoped.row.diliver_time | formatDate}}</p>
                        <p
                          v-if="scoped.row.diliver_old_time != scoped.row.diliver_time "
                        >{{scoped.row.isconfirm | isConfirm}}</p>
                    </template>
                  </div>
                  <div v-if="scoped.row.order_status==6">
                    <p>{{scoped.row.order_status | deliverStatesFilter}}</p>
                    <!-- <span  v-if="item.price_unit">展示图片</span> -->
                    <!-- <ImgE :src="item.biurl" :W="50" :H="50" :isBig="true"   v-if="item.biurl && item.price_unit"></ImgE> -->
                    <el-popover
                      v-if="scoped.row.trans_no && !scoped.row.price_unit"
                      placement="top-start"
                      width="500"
                      trigger="click"
                      @show="recordDeilery(scoped.row.trans_no,scoped.row.trans_code)"
                    >
                      <div class="orderpress" style="max-height:600px;overflow-y:auto;">
                        <p style="margin-bottom:15px;font-size:20px">物流单号：{{scoped.row.trans_no}}</p>
                        <p style="margin-bottom:15px;font-size:20px">当前物流状态</p>
                        <el-timeline>
                          <el-timeline-item
                            :timestamp="val.datetime"
                            placement="top"
                            v-for="(val, k) in expressList"
                            :key="k"
                            type="success"
                            :class="k === val.length - 1 ? 'lastfood' : '' "
                          >
                            <el-card>
                              <h4>{{val.remark}}</h4>
                            </el-card>
                          </el-timeline-item>
                        </el-timeline>
                      </div>
                      <span
                        slot="reference"
                        style="color:#0d98ff; cursor: pointer;margin-left:15px;"
                      >{{scoped.row.trans_no}}</span>
                    </el-popover>
                  </div>
                  <div v-if="scoped.row.order_status>6">
                    <p>{{scoped.row.order_status | deliverStatesFilter}}</p>
                  </div>
              </div>
            <!-- <div
              v-if="scoped.row.order_status<6 && !(scoped.row.isconfirm==0 || scoped.row.isconfirm)"
            >
              <p class="color">未发货</p>
              <CountTime
                class="countTime color"
                style="font-size:12px;"
                v-if="scoped.row.current_time && scoped.row.current_time<scoped.row.diliver_time && scoped.row.order_status==1 && !scoped.row.real_dilivertime"
                v-on:end_callback="init()"
                :currentTime="scoped.row.current_time"
                :startTime="scoped.row.current_time"
                :endTime="scoped.row.diliver_time"
                :tipText="''"
                :tipTextEnd="'发货剩余:'"
                :endText="'已逾期'"
                :dayTxt="'天'"
                :hourTxt="'时'"
                :minutesTxt="'分'"
                :secondsTxt="'秒'"
              ></CountTime>
              <span
                v-if="scoped.row.order_status==3"
                style="font-size:12px"
              >（{{scoped.row.mark?scoped.row.mark:'订单已取消'}}）</span>
              <p
                v-if="scoped.row.delivery_over"
                style="font-size:12px"
              >发货时间：{{scoped.row.diliver_time | formatDate2}}</p>
              <span
                v-if="scoped.row.delivery_over"
                style="font-size:12px"
              >（已逾期{{scoped.row.violate_count}}天，请尽快发货）</span>
            </div>
            <div v-if="scoped.row.order_status==6">
              <p>已发货</p>
              <el-popover
                v-if="scoped.row.trans_no && !scoped.row.price_unit "
                placement="top-start"
                width="500"
                trigger="click"
                @show="recordDeilery(scoped.row.trans_no,scoped.row.trans_code)"
              >
                <div class="orderpress" style="max-height:600px;overflow-y:auto;">
                  <p style="margin-bottom:15px;font-size:20px">物流单号：{{scoped.row.trans_no}}</p>
                  <p style="margin-bottom:15px;font-size:20px">当前物流状态</p>
                  <el-timeline>
                    <el-timeline-item
                      :timestamp="val.datetime"
                      placement="top"
                      v-for="(val, k) in expressList"
                      :key="k"
                      type="success"
                      :class="k === val.length - 1 ? 'lastfood' : '' "
                    >
                      <el-card>
                        <h4>{{val.remark}}</h4>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
                <span
                  slot="reference"
                  style="color:#0d98ff; cursor: pointer;margin-left:15px;"
                >{{scoped.row.trans_no}}</span>
              </el-popover>
            </div>
            <div v-if="scoped.row.order_status==7">质检中心已签收</div>
            <div
              v-if="(scoped.row.isconfirm==0 || scoped.row.isconfirm) && scoped.row.order_status<6"
            >
              <p>预计交期：{{scoped.row.diliver_old_time | formatDate}}</p>
              <p
                v-if="scoped.row.diliver_old_time != scoped.row.diliver_time "
                class="color"
              >变更后：{{scoped.row.diliver_time | formatDate}}</p>
              <p
                v-if="scoped.row.diliver_old_time != scoped.row.diliver_time "
              >{{scoped.row.isconfirm | isConfirm}}</p>
            </div> -->
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="操作">
          <template slot-scope="scoped">
            <p v-if="scoped.row.order_mark">
              <el-popover
                placement="left"
                title="买家备注："
                width="200"
                trigger="hover"
                :content="scoped.row.order_mark"
              >
                <a slot="reference">查看备注</a>
              </el-popover>
            </p>
            <p v-if="scoped.row.pi_url">
              <a :href="scoped.row.pi_url" target="_blank">查看PI</a>
            </p>
            <div style="margin-bottom:5px;">
              <el-popover
                v-if="scoped.row.changeButton"
                placement="left"
                width="250"
                trigger="hover"
                title="修改成交单价"
              >
                <div>
                    <!-- <h3 style="margin-bottom:10px;">当前成交单价：
                           <strong>{{scoped.row.price_unit?'$':'￥'}}{{scoped.row.good_price | toFixed(scoped.row.price_unit?3:2)}}</strong>
                          </h3> -->
                  <el-input
                    v-model="scoped.row.changePrice"
                    placeholder="输入新成交单价"
                    size="small"
                    @input="changepriceInput(scoped.row,scoped.$index)"
                  >
                    <template slot="prepend">{{scoped.row.price_unit?'$':'￥'}}</template>
                    <el-button slot="append" @click="changeprice(scoped.row)">提交</el-button>
                  </el-input>
                </div>
                <el-button slot="reference" size="mini" class="borderColor" round>改单价</el-button>
              </el-popover>
            </div>

            <el-button size="mini" round type="info" v-if="scoped.row.deleteButton">删除订单</el-button>
            <el-button
              size="mini"
              round
              type="info"
              disabled
              v-if="scoped.row.order_status==0 || scoped.row.order_status==2 || scoped.row.order_status==5"
            >发货</el-button>
            <el-button
              size="mini"
              class="borderColor"
              v-if="scoped.row.add_button"
              @click="singleAdd(scoped.row)"
              round
            >加入发货筐</el-button>
            <el-popover
              v-if="scoped.row.trans_no && !scoped.row.price_unit "
              placement="top-start"
              width="500"
              trigger="click"
              @show="recordDeilery(scoped.row.trans_no,scoped.row.trans_code)"
            >
              <div class="orderpress" style="max-height:600px;overflow-y:auto;">
                <p style="margin-bottom:15px;font-size:20px">物流单号：{{scoped.row.trans_no}}</p>
                <p style="margin-bottom:15px;font-size:20px">当前物流状态</p>
                <el-timeline>
                  <el-timeline-item
                    :timestamp="val.datetime"
                    placement="top"
                    v-for="(val, k) in expressList"
                    :key="k"
                    type="success"
                    :class="k === val.length - 1 ? 'lastfood' : '' "
                  >
                    <el-card>
                      <h4>{{val.remark}}</h4>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <el-button slot="reference" class="borderColor" round size="mini">查看物流</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        size="mini"
        class="borderColor fl"
        v-if="multipleSelection.length"
        @click="batchAdd"
        style="margin-top:15px;"
        round
      >加入发货筐</el-button>
      <Pagination
        v-if="total"
        :pageSize="pageSize"
        :total="total"
        :currentPage="currentPage"
        @current-change="currentChange"
      ></Pagination>
    </div>
  </div>
</template>
.<script>
import { mapMutations, mapState } from "vuex";
import { axios, sellerOrderCenter } from "@/api/apiObj";
import { TimeForma, TimeForma2 } from "@/lib/utils";
export default {
  data() {
    return {
      multipleSelection: [],
      type: "",
      deliver_states: -1,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      list: [],
      ordergoodsdetail: {},
      expressList: [],
      deliveryCarCount: 10,
      should_deliver_count: 0
    };
  },
  computed: {
    ...mapState({
      showDeliverCar: state => state.showDeliverCar
    })
  },
  watch: {
    showDeliverCar(val) {
      console.log("showDeliverCar:", val);
      if (!val) {
        this.init();
        this.getdeliveryCarCount();
      }
    },
    deliver_states() {
      this.currentPage = 1;
      this.init();
    },
    type() {
      this.currentPage = 1;
      this.init();
    }
  },
  filters: {
    formatDate(val) {
      return TimeForma(val);
    },
    formatDate2(val) {
      return TimeForma2(val);
    },
    isConfirm(val) {
      switch (val) {
        case 0:
          return "买家待确认";
        case 1:
          return "买家已确认";
        case 2:
          return "买家已拒绝";
      }
    },
    deliverStatesFilter(val) {
      switch (val) {
        case 0:
          return "未发货";
        case 1:
          return "未发货";
        case 2:
          return "未发货";
        case 3:
          return "未发货";
        case 4:
          return "已发货";
        case 5:
          return "未发货";
        case 6:
          return "已发货";
        case 7:
          return "已发货";
      }
    },
    statusFilter(val) {
      switch (val) {
        case 0:
          return "未支付";
        case 1:
          return "已支付";
        case 2:
          return "订单取消";
        case 3:
          return "订单取消";
        case 4:
          return "已支付";
        case 5:
          return "预付款";
        case 6:
          return "已支付";
        case 7:
          return "已支付";
      }
    }
  },
  created() {
    this.ordergoodsdetail = JSON.parse(
      sessionStorage.getItem("ordergoodsdetail")
    );
  },
  mounted() {
    this.init();
    this.getdeliveryCarCount();
  },
  methods: {
    ...mapMutations(["setshowDeliverCar"]),
    getdeliveryCarCount() {
      axios.request(sellerOrderCenter.queryDeliverCarNumber).then(res => {
        this.deliveryCarCount = res.data;
      });
    },
    changeprice(item){
      axios.request({...sellerOrderCenter.updateOrder,params:{
        orderNo:item.order_no,
        orderId:item.id,
        price:item.changePrice
      }}).then(res=>{
        this.init();
      })
    },
    changepriceInput(item,k){
        console.log(k)
      let price0=this.list[k].changePrice;
      if(price0){
        let price=item.price_unit?price0.replace(/^\D*(\d*(?:\.\d{0,3})?).*$/g, '$1'):price0.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1');
        if(price>item.seller_publis_price){
          price=item.seller_publis_price
        }
        this.list[k].changePrice=price;
      }
    },
    recordDeilery(trans_no, trans_code) {
      axios
        .request({
          ...sellerOrderCenter.queryExpreForOrder,
          params: {
            trans_no: trans_no,
            trans_code: trans_code
          }
        })
        .then(res => {
          if (res) {
            this.expressList = res.data;
          } else {
            this.expressList = [];
          }
        });
    },
    set_cell_style({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && !row.add_button) {
        return "opacity: 0;";
      }
    },

    addgoods() {
      //一键加入
      let item = this.ordergoodsdetail;
      let arr = [];
      arr.push({
        goodsBrand: item.branda,
        goodsBrandId: item.brandId,
        goodsSellerId: item.seckill_goods_id
      });
      let obj = {
        goods: JSON.stringify(arr)
      };
      axios
        .request({
          ...sellerOrderCenter.addDeliverCar,
          data: obj,
          method: "post"
        })
        .then(res => {
          if (res) {
            this.init();
            let _this = this;
            setTimeout(() => {
              _this.getdeliveryCarCount();
            }, 2000);
          }
        });
    },
    singleAdd(item) {
      let arr = [];
      arr = [
        {
          goodsName: item.goods_name,
          goosId: item.goods_id,
          goodsSellerId: item.seckill_goods_id,
          goodsBrand: this.ordergoodsdetail.branda,
          goodsBrandId: this.ordergoodsdetail.brandId,
          orderId: item.id,
          orderNo: item.order_no,
          goodsCount: item.goods_count,
          goodsPrice: item.seller_publis_price,
          totalPrice: item.total_price,
          priceunit: item.price_unit,
          uid: item.uid,
          userId: item.user_id
        }
      ];
      axios
        .request({
          ...sellerOrderCenter.addSingleDeliverCar,
          data: JSON.stringify(arr),
          method: "post"
        })
        .then(res => {
          if (res) {
            this.init();
            let _this = this;
            setTimeout(() => {
              _this.getdeliveryCarCount();
            }, 2000);
          }
        });
    },
    batchAdd() {
      let arr = [];
      arr = this.multipleSelection.map(item => {
        return {
          goodsName: item.goods_name,
          goosId: item.goods_id,
          goodsSellerId: item.seckill_goods_id,
          goodsBrand: this.ordergoodsdetail.branda,
          goodsBrandId: this.ordergoodsdetail.brandId,
          orderId: item.id,
          orderNo: item.order_no,
          goodsCount: item.goods_count,
          goodsPrice: item.seller_publis_price,
          totalPrice: item.total_price,
          priceunit: item.price_unit,
          uid: item.uid,
          userId: item.user_id
        };
      });
      axios
        .request({
          ...sellerOrderCenter.addSingleDeliverCar,
          data: arr,
          method: "post"
        })
        .then(res => {
          if (res) {
            this.init();
            let _this = this;
            setTimeout(() => {
              _this.getdeliveryCarCount();
            }, 2000);
          }
        });
    },
    init() {
      this.$loading(this.$store.state.loading);
      let obj = {
        start: this.pageSize * (this.currentPage - 1),
        length: this.pageSize,
        goods_seller_id: this.ordergoodsdetail.seller_goods_id
          ? this.ordergoodsdetail.seller_goods_id
          : this.ordergoodsdetail.seckill_goods_id
      };
      if (this.deliver_states != -1) {
        obj.deliver_states = this.deliver_states;
      }
      if (this.type) {
        obj.type = this.type;
      }
      axios
        .request({
          ...sellerOrderCenter.queryOrderInfoListForSeller,
          params: obj
        })
        .then(res => {
          this.should_deliver_count = 0;
          this.list = res.data.data.map(item => {
            if (item.add_button) {
              this.should_deliver_count += item.goods_count;
            }
            return item;
          });
          this.total = res.data.total;
          this.$loading(this.$store.state.loading).close();
        });
    },
    currentChange(x) {
      this.currentPage = x;
      this.init();
    },
    handleSelectionChange(val) {
      let arr = [];
      val.forEach(item => {
        if (item.add_button) {
          arr.push(item);
        }
      });
      this.multipleSelection = arr;
    }
  }
};
</script>
.<style lang="less" scoped>
@import "./sellerOrderoneDetail.less";
</style>