.<template>
  <div class="sellerOrderAll">
    <div class="goodslist">
      <div class="title">
        <p>卖家订单中心</p>
          <div class="input">
          <el-input
            placeholder="输入器件型号"
            v-model="goods_name"
            size="small"
            class="inputSearch"
            @keyup.enter.native="inputHandler"
            style="width:250px;"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="inputHandler" class="append"></el-button>
          </el-input>
        </div>
          <div style="padding-right:10px;">
          <el-button size="small" class="bgBlu" style="position:relative" @click="setshowDeliverCar(true)">发货框 <span style="position:absolute;border-radius:20px;padding:2px 3px;top:-5px" class="bgColor">{{deliveryCarCount}}</span> </el-button>
        </div>
      </div>
      <div class="tit">
        <div class="deliver_states">
           <p :class="{'color':currentStates== item.value}" v-for="item in states" :key="item.value">
                <label>
                  <input type="radio" :value="item.value" name="status" v-model="currentStates" />
                  {{item.label}}
                </label>
            </p>
        </div>
        <el-select
          v-model="day"
          @change="inputHandler"
          placeholder="请选择查询时间段"
          style="width:100px;margin-top:0px;"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      
       
        <div class="models">
              <span class="color">订单模式</span>
              <router-link to="SellerOrderManagement/sellerOrder" title="切换到管理模式"><img src="@/assets/image/public/change.png" alt="">管理模式</router-link>
          </div>
        
      </div>
      <div class="cont">
          <ul class="tit">
              <li class="goodsinfo">
                  
                  器件型号
                  </li>
              <li  class="oneitem">数量</li>
              <li  class="oneitem">单价</li>
              <li  class="oneitem">金额</li>
              <li  class="oneitem">支付状态</li>
              <li class="oneitem">发货状态</li>
              <li class="oneitem">操作</li>
          </ul>
          <div class="biglist" v-for="(item0,k) in biglist" :key="k">
            
            <div class="userinfo">
              <p v-if="item0.userInforma.add_button">
                            <label >
                            <input
                                  type="checkbox"
                                  name="checking"
                                  :value="k"
                                  v-model="checkedlist"
                                  ref="input"
                                  />
                              </label>
                        </p>
                      <p>订单号：{{item0.userInforma.order_no}}</p> 
                      <p>创建时间：{{item0.userInforma.create_time | formatDate0}}</p>
             <p> 买家：{{item0.userInforma.nickName}}</p>
              <p><img :src="item0.userInforma.imageUrl" alt=""></p>
              <div class="detail" v-if="UserInforma.userTagMap.tag==1">
                 <span>收货人：{{item0.userInforma.reName}} &nbsp;{{item0.userInforma.phone}}&nbsp;{{item0.userInforma.address}}&nbsp;{{item0.userInforma.deatilAdress}}</span>
              </div>
            
            </div>
            <ul class="list">
                <li v-for="(item,index) in item0.list" :key="index">
                    
                    <div class="onecont" :class="(item.order_status==0 || item.order_status==2 || item.order_status==3 || item.order_status==5)?'bgLightGray':'able'">
                        <div class="goodsinfo">
                              <ImgE :src="item.goods_image" :W="60" :H="60"></ImgE>
                              <div>
                                  <p class="color">
                                      <!-- <router-link class="color" :to="{
                                          path:'/BrandDetail/GoodsDetails',
                                          query:{
                                              documentid:item.goods_id,
                                              name:item.goods_name,
                                              tag:'goodsinfo'
                                          }

                                      }">{{item.goods_name}}</router-link> -->
                                      <a href="javascript:;" class="color" @click="setitem(item)">{{item.goods_name}}</a>
                                      </p>
                                  <p class="">品牌：
                                      <router-link  :to="{
                                                              path:'/BrandDetail',
                                                              query:{
                                                                  name:item.branda,
                                                                  documentid:item.brandId,
                                                                  tag:'brand'
                                                              }
                                                              }">
                                          {{item.branda}}
                                      </router-link>
                                  </p>
                                  <p class="gray desc" :title="item.goods_desc">描述：{{item.goods_desc}}</p>
                              </div>
                          </div>
                          <div class="oneitem">
                              <p>{{item.goods_count}}</p>
                              <p :class="item.goods_type?'green':'color'">{{item.goods_type?'现货':'订货'}}</p>
                          </div>
                          <div class="oneitem">
                              {{item.price_unit?'$':'￥'}}{{item.good_price | toFixed(item.price_unit?3:2)}}
                          </div>
                          <div class="oneitem">
                              {{item.price_unit?'$':'￥'}}{{item.total_price | toFixed(item.price_unit?3:2)}}
                          </div>
                          <div class="oneitem">
                              <p :class="item.order_status==1 || item.order_status==4 || item.order_status==6 || item.order_status==7?'':''">{{item.order_status | statusFilter}}</p> 
                              <p v-if="item.order_status==5" class="color">待付尾款</p>
                          </div>
                          <div class="oneitem" style="white-space:nowrap;">
                              <div v-if="item.order_status<6 && !(item.isconfirm==0 || item.isconfirm)">
                                  <p class="color">未发货</p>
                                  <CountTime
                                      class="countTime color"
                                      style="font-size:12px;"
                                      v-if="item.current_time && item.current_time < item.diliver_time"
                                      v-on:end_callback="init()"
                                      :currentTime="item.current_time"
                                      :startTime="item.current_time"
                                      :endTime="item.diliver_time"
                                      :tipText="''"
                                      :tipTextEnd="'发货剩余:'"
                                      :endText="'已逾期'"
                                      :dayTxt="'天'"
                                      :hourTxt="'时'"
                                      :minutesTxt="'分'"
                                      :secondsTxt="'秒'"
                                  ></CountTime>
                                  <span v-if="item.current_time && item.current_time > item.diliver_time" class="color" style="white-space:nowrap;display:flex;">
                                      <!-- (<addCountTime :startTime="item.current_time - item.diliver_time" :text="'已延误:'"></addCountTime>) -->
                                      （延误发货提箱）
                                  </span>
                              </div>
                              <div v-if="item.order_status==6">
                                <p>已发货</p>
                                <span  v-if="item.price_unit">展示图片</span>
                                <!-- <ImgE :src="item.biurl" :W="50" :H="50" :isBig="true"   v-if="item.biurl && item.price_unit"></ImgE> -->
                                <el-popover
                                  v-if="item.trans_no && !item.price_unit"
                                  placement="top-start"
                                  width="500"
                                  trigger="click"
                                  @show="recordDeilery(item.trans_no,item.trans_code)"
                                >
                                  <div class="orderpress" style="max-height:600px;overflow-y:auto;">
                                    <p style="margin-bottom:15px;font-size:20px">物流单号：{{item.trans_no}}</p> 
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
                                  <span slot="reference" style="color:#0d98ff; cursor: pointer;margin-left:15px;">{{item.trans_no}}</span>
                                </el-popover>
                              </div>
                              <div v-if="item.order_status>6">质检中心已签收</div>
                              <div v-if="(item.isconfirm==0 || item.isconfirm) && item.order_status<6">
                                <p>预计交期：{{item.diliver_old_time | formatDate}}</p>
                                <p v-if="item.diliver_old_time != item.diliver_time " class="color">变更后：{{item.diliver_time | formatDate}}</p>
                                <p v-if="item.diliver_old_time != item.diliver_time ">
                                  {{item.isconfirm | isConfirm}}
                                </p>
                              </div>
                          </div>
                          <div class="oneitem">
                              <div v-if="item.add_button">
                                  <el-button size="mini" class="borderColor" @click="singleAdd(item)" round>加入发货框</el-button>
                              </div>
                              <div v-if="item.order_status==0 || item.order_status==2 || item.order_status==3 || item.order_status==5">
                                  <el-button size="mini"  round type="info" disabled>发货</el-button>
                              </div>
                                <el-popover
                                  v-if="item.trans_no && !item.price_unit"
                                  placement="top-start"
                                  width="500"
                                  trigger="click"
                                  @show="recordDeilery(item.trans_no,item.trans_code)"
                                >
                                  <div class="orderpress" style="max-height:600px;overflow-y:auto;">
                                    <p style="margin-bottom:15px;font-size:20px">物流单号：{{item.trans_no}}</p> 
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
                          </div>
                    </div>
                    
                </li>
            </ul>
          </div>
          
      </div>
      <p style="line-height:40px;" v-if="total">
        <label>
        <input type="checkbox" @change="allCheck" ref="allcheckmark" />
        全选
        </label>
        <el-button size="mini" class="borderColor" v-if="checkedlist.length" @click="batchAdd" round>加入发货框</el-button>
      </p>
      
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

import { mapState, mapActions ,mapMutations} from "vuex";
import { TimeForma, TimeForma2 } from "@/lib/utils";
import { baseURL } from "@/config";
import DeliveryCompany from "_c/DeliveryCompany";
import { axios, sellerOrderCenter,common } from "@/api/apiObj";
export default {
  data() {
    return {
      deliveryCarCount:0,
      currentStates:0,
      states:[
        {
        value:0,
        label:'全部'
      },{
        value:1,
        label:'等待发货'
      },
      {
        value:2,
        label:'等待买家付款'
      },
      {
        value:3,
        label:'已发货'
      },
      {
        value:4,
        label:'取消的订单'
      },
      {
        value:5,
        label:'交期延误订单'
      }
      ,{
        value:6,
        label:'待买家确认'
      }
     ],
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "3",
          label: "最近三天"
        },
        {
          value: "7",
          label: "一周"
        },
        {
          value: "14",
          label: "两周"
        }
      ],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchItem:{},
      biglist:{},
   
      multipleSelection:[],
      //old
      day: "",
      goods_name:"",
      checkedlist: [],
      expressList:[]
    };
  },
   filters:{
     formatDate(val){
       return TimeForma(val);
     },
     formatDate0(val){
       return TimeForma2(val)
     },
        statusFilter(val){
            switch (val){
                case 0:
                    return '未支付';
                case 1:
                    return '已支付';
                case 2:
                return '订单取消';
                case 3:
                return '订单取消';
                case 4:
                return '已支付';
                case 5:
                return '预付款';
                case 6:
                return '已支付';
                case 7:
                return '已支付';
            }
        },
        isConfirm(val){
          switch(val){
            case 0:
            return "买家待确认";
            case 1:
              return '买家已确认';
            case 2:
              return "买家已拒绝"
          }
        }
    },
   computed: {
       ...mapState({
        UserInforma:state => state.Login.UserInforma,
        }),
  },
   components: {
    DeliveryCompany
  },
  watch: {
    currentStates(val){

      switch (val) {
        case 0:
          this.searchItem={};
          break;
        case 1:
          this.searchItem={deliver_states:0};
          break;
        case 2:
          this.searchItem={type:2};
          break;
        case 3:
          this.searchItem={deliver_states:1};
          break;
        case 4:
          this.searchItem={type:3};
          break;
        case 5:
          this.searchItem={deliver_over:true};
          break;
        case 6:
          this.searchItem={isconfirm:0};
          break;
      };
      this.currentPage=1;
      this.init();
    },
    checkedlist(val){
                if((this.$refs.input && (this.checkedlist.length<this.$refs.input.length )) || !this.$refs.input){
                  if(this.$refs.allcheckmark){
                      this.$refs.allcheckmark.checked=false
                  }
                 
                }else{
                   if(this.$refs.allcheckmark){
                       this.$refs.allcheckmark.checked=true;
                  }
                 
                }
        }
  },
  mounted() {
    this.init();
    this.getdeliveryCarCount();
  },
  methods: {
        ...mapMutations(["setshowDeliverCar"]),
        setitem(item){
          sessionStorage.setItem("ordergoodsdetail",JSON.stringify(item))
          this.$router.push({
            path:"/PersonalCenter/SellerOrderManagement/SellerOrderDetail"
          })
        },
        getdeliveryCarCount(){
          axios.request(sellerOrderCenter.queryDeliverCarNumber).then(res=>{
            this.deliveryCarCount=res.data
          })
        },
         singleAdd(item){
            let arr=[];
            arr= [{
                    goodsName:item.goods_name,
                    goosId:item.goods_id,
                    goodsSellerId:item.seckill_goods_id,
                    goodsBrand:item.branda,
                    goodsBrandId:item.brandId,
                    orderId:item.id,
                    orderNo:item.order_no,
                    goodsCount:item.goods_count,
                    goodsPrice:item.good_price,
                    totalPrice:item.total_price,
                    priceunit:item.price_unit,
                    uid:item.uid}
                    ]
            axios.request({...sellerOrderCenter.addSingleDeliverCar,data: JSON.stringify(arr),method:'post'}).then(res=>{
                if(res){
                  this.$message({
                    message:"已加入发货框",
                    type:"success"
                  })
                    this.init();
                    let _this = this;
                    setTimeout(()=>{
                      _this.getdeliveryCarCount();
                    },2000)
                    
                   
                }
            })
        },
        batchAdd(){
            let arr=[];
            this.checkedlist.forEach(item0=>{
                let list=this.biglist[item0].list;
                list.forEach(item=>{
                  if(item.add_button){
                      arr.push({
                            goodsName:item.goods_name,
                            goosId:item.goods_id,
                            goodsSellerId:item.seckill_goods_id,
                            goodsBrand:item.branda,
                            goodsBrandId:item.brandId,
                            orderId:item.id,
                            orderNo:item.order_no,
                            goodsCount:item.goods_count,
                            goodsPrice:item.good_price,
                            totalPrice:item.total_price,
                            priceunit:item.price_unit,
                            uid:item.uid
                        })
                  }
                })
            })
            axios.request({...sellerOrderCenter.addSingleDeliverCar,data:arr,method:'post'}).then(res=>{
                if(res){
                  this.$message({
                    message:"已加入发货框",
                    type:"success"
                  })
                    this.init();
                    let _this = this;
                    setTimeout(()=>{
                      _this.getdeliveryCarCount();
                    },2000)
                }
            })
        },
        recordDeilery(trans_no,trans_code){
            axios
              .request({
                ...sellerOrderCenter.queryExpreForOrder,
                params: {
                  trans_no: trans_no,
                  trans_code:trans_code
                  }
              })
              .then(res => {
                if(res){
                  this.expressList = res.data;
                }else{
                  this.expressList=[]
                }
                
              });
          },
      init(){
        
          if( this.$refs.allcheckmark){
              this.$refs.allcheckmark.checked=false;
          }
           this.checkedlist=[]
            let obj={
                start:this.pageSize*(this.currentPage-1),
                length:this.pageSize,
                seller_id:this.UserInforma.id,
                ...this.searchItem,
                day:this.day,
            }
            if(this.goods_name){
              obj.goods_name=this.goods_name
            }
            
            axios.request({...sellerOrderCenter.queryOrderInfoListForSeller,params:obj}).then(res=>{
               
              let biglist={};
              res.data.data.forEach(item=>{
                if(biglist[item.order_no]){
                    biglist[item.order_no].list.push(item)
                    if(!biglist[item.order_no].userInforma.add_button){
                      biglist[item.order_no].userInforma={
                        ...biglist[item.order_no].userInforma,
                        add_button:item.add_button,
                      }
                    }
                }else{
                  biglist[item.order_no]={
                    list:[item],
                    userInforma:{
                      imageUrl:item.imageUrl,
                      address:item.address,
                      deatilAdress:item.deatilAdress,
                      nickName:item.nickName,
                      phone:item.phone,
                      reName:item.reName,
                      order_no:item.order_no,
                      add_button:item.add_button,
                      create_time:item.create_time
                    }
                  }
                }
              })
              //  this.orderlist=res.data.data;
                this.biglist=biglist
                this.total=res.data.total;
                 
            })
        },
    inputHandler() {
      this.currentPage = 1;
      this.init();
    },
    currentChange(x) {
      this.currentPage = x;
      this.init();
    },
    allCheck(val) {
      this.checkedlist = [];
      Array.from(this.$refs.input).forEach(el => {
        if (val.target.checked) {
          this.checkedlist.push(el.value);
        }
        el.checked = val.target.checked;
      });
    },
  }
};
</script>
<style scoped lang="less">
@import "./sellerOrderAll.less";
</style>
