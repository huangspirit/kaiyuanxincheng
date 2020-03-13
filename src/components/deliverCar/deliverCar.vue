<template>
  <div class="sellerDeliveryCar">

    <div class="cont" style="display:flex;flex-direction: column">
      <div class="step peruBg">
        <ul>
          <li class="item " >
            <img src="@/assets/image/ShoppingCart/icon/2.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/2a.png" class="img active" alt="">
            <span>选择订单</span>
            <span class="linewrap">
              <p class="blu" style="font-size:12px;">加入</p>
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
           <li class="item " >
            <img src="@/assets/image/ShoppingCart/icon/ukuang.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/kuang.png" class="img active" alt="">
            <span>发货筐</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
           <li class="item active" >
            <img src="@/assets/image/ShoppingCart/icon/4.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/4a.png" class="img active" alt="">
            <span>国内发货<br>香港发货</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
               <p class="blu" style="font-size:12px;">上传PI</p>
            </span>
          </li>
           <li class="item active" >
            <img src="@/assets/image/ShoppingCart/icon/uku.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/ku.png" class="img active" alt="">
            <span>选择仓库</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li> 
          <li class="item active" >
            <img src="@/assets/image/ShoppingCart/icon/7.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/7a.png" class="img active" alt="">
            <span>发货</span>
            <span class="linewrap">
              <span class="line"></span>
              <i class="el-icon-caret-right"></i>
            </span>
          </li>
           <li  >
            <img src="@/assets/image/ShoppingCart/icon/upiao.png" class="img" alt="">
            <img src="@/assets/image/ShoppingCart/icon/piao.png" class="img active" alt="">
            <span>开发票</span>
          </li> 
        </ul>
      </div>
      <div class="tit">
          <p>
              <span class="bgBlu imgwrap">
                    <img src="@/assets/image/PersonalCenter/deliverCar.png" alt="">
              </span>
              
          </p>
        <div :class="priceunit===''?'borderColor color':''" @click="priceunit=''">
          <span>全部</span>
          <span class="count bgColor">{{priceunitCount+unpriceunitCount | toFixed(0)}}</span>
        </div>
        <div :class="priceunit=== false?'borderColor color':''" @click="priceunit=false">
          <span>国内交货</span>
          <span class="count bgColor">{{unpriceunitCount | toFixed(0)}}</span>
        </div>
        <div :class="priceunit=== true?'borderColor color':''" @click="priceunit=true">
          <span>香港交货</span>
          <span class="count bgColor">{{priceunitCount | toFixed(0)}}</span>
        </div>
        <p class="close">
            <i class="el-icon-circle-close" @click="setshowDeliverCar(false)"></i>
        </p>
      </div>
      <div style="display:flex; flex-direction: column;flex:1;">
      <div class="wrapTable">
          <table>
            <thead>
              <tr>
                <th>零件信息</th>
                <th>订单编号</th>
                <th>数量</th>
                <th>单价</th>
                <th>金额</th>
                <!-- <th>批号</th> -->
                <th>移除</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item) in list">
                <template v-for="(item1,index1) in item.list">
                  <tr v-if="index1==0" :key="item1.id">
                    <td :rowspan="item.list.length" class="borderRight">
                      <div style="display:flex; align-items: center;min-width:350px;padding:0 10px;">
                      <i
                            class="el-icon-delete"
                            title="从发货筐移除此零件"
                            @click="deleteGoods(1,item.goodsSellerId)"
                          ></i>
                      <div class="goodsinfo">
                        <p class="goodsname" style="white-space:nowrap">
                          <router-link
                            class="color"
                            :to="{
                                                            path:'/BrandDetail/GoodsDetails',
                                                            query:{
                                                                name:item.goodsName,
                                                                documentid:item.goosId,
                                                                tag:'goodsinfo'
                                                            }
                                                            }"
                          >{{item.goodsName}}</router-link>
                          
                        </p>
                        <p class="blu">
                          品牌：
                          <router-link
                            :to="{
                                                            path:'/BrandDetail',
                                                            query:{
                                                                name:item.goodsBrand,
                                                                documentid:item.goodsBrandId,
                                                                tag:'brand'
                                                            }
                                                            }"
                          >{{item.goodsBrand}}</router-link>
                        </p>
                        <p class="color">数量：{{item.totalCount}}</p>
                      </div>
                      </div>
                    </td>
                    <td>{{item1.orderNo}}</td>
                    <td>x{{item1.goodsCount}}</td>
                    <td>{{item1.priceunit?'$':'￥'}}{{item1.goodsPrice | toFixed(item1.priceunit?3:2)}}</td>
                    <td>{{item1.priceunit?'$':'￥'}}{{item1.totalPrice | toFixed(item1.priceunit?3:2)}}</td>
                    <td>
                      <i class="el-icon-delete" @click="deleteGoods(0,item1.orderId)"></i>
                    </td>
                  </tr>
                  <tr :key="item1.id" v-if="index1!=0">
                    <td>{{item1.orderNo}}</td>
                    <td>x{{item1.goodsCount}}</td>
                    <td>{{item1.priceunit?'$':'￥'}}{{item1.goodsPrice | toFixed(item1.priceunit?3:2)}}</td>
                    <td>{{item1.priceunit?'$':'￥'}}{{item1.totalPrice | toFixed(item1.priceunit?3:2)}}</td>
                    <td>
                      <i class="el-icon-delete" @click="deleteGoods(0,item1.orderId)"></i>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
          
    </div>
      <div class="btnwrap" v-if="list.length" style="max-height:85px;">
        <!-- <el-button size="small">打印标签</el-button> -->
        <!-- <el-button size="small" type="primary" @click="printBox">下载发货单</el-button> -->
        <el-button size="small" @click="batchDelivery(false)" type="primary" v-if="priceunit!==true && unpriceunitCount">国内发货</el-button>
          <el-button size="small" @click="batchDelivery(true)" type="primary" v-if="priceunit!==false && priceunitCount">香港到货通知</el-button>
          <div style="font-size:12px;line-height:1.2;text-align:left;width:450px;margin:0 auto;" v-if="priceunit===false">
            <p>1、同一型号多个订单请按订单分别包装，贴上产品标签；<a href="javscript:;"> 标签样式</a></p>
            <p>2、一个订单若包含多个型号，请将一个订单的型号整体放置在一起；</p>
            <p>3、请务必放置发货清单，无发货清单者将被拒收；点击发货后可下载打印；</p>
          </div>
      </div>
       </div>
    </div>
    <el-dialog title="批量发货" :visible.sync="showBatchDelivery" width="1000px" align="center" :append-to-body="true">
      <div class="delivery">
        <div v-if="deliveryObj.hongkong.length" class="item">
          <div class="title">
            <span>香港发货</span>
          </div>
          <div class="list">
            <ul v-if="deliveryObj.hongkong.length">
              <li v-for="(item,index) in deliveryObj.hongkong" :key="index">
                <div class="wuliuwrap">
                  <span class="goodsname"  style="line-height:1;">{{item.goodsName}}</span>
                  <div class="wuliu">
                    <el-upload
                      v-if="item"
                      class="avatar-uploader"
                      :action="url"
                      :auto-upload="true"
                      list-type="picture-card"
                      :on-preview="(file)=>{return onpreview(file,index)}"
                      :on-success="(response, file, fileList)=>{return handleAvatarSuccess(response, file, fileList,index)}"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                    >
                      <i
                        class="el-icon-plus"
                        style="font-size:12px;margin-top:25px;display:block;line-height:1.6"
                      ></i>
                      <span style="font-size:12px;line-height:1;display:block;">上传PI单号</span>
                       <div slot="tip" class="el-upload__tip">可以上传图片、PDF、Word、Excel文件，文件大小限制为2MB以内；</div>
                    </el-upload>
                  </div>
                </div>
                <div class="cangku" v-if="!deliveryObj.hongkongActive">
                  <el-select
                    v-model="item.storehouse_order_index"
                    placeholder="请选择收货仓库"
                    size="mini"
                    @change="(val)=>{return changeStorehouseInternal(val,index,1)}"
                  >
                    <template v-for="(item,k) in hongkongStorehouseList">
                      <el-option
                        :label="item.warehouse_name"
                        :value="k"
                        :key="item.id"
                      >{{item.warehouse_name}}</el-option>
                    </template>
                  </el-select>
                  <div>
                    <p>
                      <label>收货人：</label>
                      {{item.warehouse_recipient}}
                    </p>
                    <p>
                      <label>电话：</label>
                      {{item.warehouse_phone}}
                    </p>
                    <p>
                      <label>地址：</label>
                      {{item.warehouse_addr}}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="deliveryObj.hongkongActive" class="selectDelivery">
              <div class="cangku">
                <el-select v-model="storehouse_order_together_hongkong" placeholder="请选择收货仓库" size="mini">
                  <template v-for="(item,k) in hongkongStorehouseList">
                    <el-option
                      :label="item.warehouse_name"
                      :value="k"
                      :key="item.id"
                    >{{item.warehouse_name}}</el-option>
                  </template>
                </el-select>
                <div v-if="currentStorehouse_hongkong_together">
                  <p>
                    <label>收货人：</label>
                    {{currentStorehouse_hongkong_together.warehouse_recipient}}
                  </p>
                  <p>
                    <label>电话：</label>
                    {{currentStorehouse_hongkong_together.warehouse_phone}}
                  </p>
                  <p>
                    <label>地址：</label>
                    {{currentStorehouse_hongkong_together.warehouse_addr}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="deliveryObj.internal.length" class="item">
          <div class="title">
            <span>国内发货</span>
            <!-- <el-switch
              v-if="deliveryObj.internal.length>1"
              v-model="deliveryObj.internalActive"
              active-text="统一仓库"
              inactive-text="单选仓库"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch> -->
          </div>
          <div class="list">
            <ul>
              <li v-for="(item,index) in deliveryObj.internal" :key="index">
                <div  class="wuliuwrap">
                  <span class="goodsname" :title="item.goodsName">{{item.goodsName}}</span>
                  <div class="wuliu" v-if="!deliveryObj.internalActive">
                    <el-button @click="selectDeliveryCompany(index)" size="mini">选择物流</el-button>
                    <div>
                      <p v-if="item.transName">
                        <label>物流名称：</label>
                        {{item.transName}}
                      </p>
                      <p>
                        <label v-if="item.trans_no">物流单号：</label>
                        {{item.trans_no}}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="cangku" v-if="!deliveryObj.internalActive" >
                  <el-select
                    v-model="item.storehouse_order_index"
                    placeholder="请选择收货仓库"
                    size="mini"
                    @change="(val)=>{return changeStorehouseInternal(val,index,0)}"
                  >
                    <template v-for="(item,k) in internalStorehouseList">
                      <el-option
                        :label="item.warehouse_name"
                        :value="k"
                        :key="item.goosId"
                      >{{item.warehouse_name}}</el-option>
                    </template>
                  </el-select>
                  <div>
                    <p>
                      <label>收货人：</label>
                      {{item.warehouse_recipient}}
                    </p>
                    <p>
                      <label>电话：</label>
                      {{item.warehouse_phone}}
                    </p>
                    <p>
                      <label>地址：</label>
                      {{item.warehouse_addr}}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <div class="wuliu"  v-if="deliveryObj.internalActive" >
                <el-button @click="selectDeliveryCompany" size="mini">选择物流</el-button>
                <p v-if="deliveryObj.internalDeliver.transName">
                <label>物流名称：</label>
                {{deliveryObj.internalDeliver.transName}}
                </p>
                <p>
                <label v-if="deliveryObj.internalDeliver.trans_no">物流单号：</label>
                {{deliveryObj.internalDeliver.trans_no}}
                </p>
            </div>
            <div v-if="deliveryObj.internalActive" class="selectDelivery">
              <div class="cangku">
                <el-select v-model="storehouse_order_together" placeholder="请选择收货仓库" size="mini">
                  <template v-for="(item,k) in internalStorehouseList">
                    <el-option
                      :label="item.warehouse_name"
                      :value="k"
                      :key="item.id"
                    >{{item.warehouse_name}}</el-option>
                  </template>
                </el-select>
                <div v-if="currentStorehouse_internal_together">
                  <p>
                    <label>收货人：</label>
                    {{currentStorehouse_internal_together.warehouse_recipient}}
                  </p>
                  <p>
                    <label>电话：</label>
                    {{currentStorehouse_internal_together.warehouse_phone}}
                  </p>
                  <p>
                    <label>地址：</label>
                    {{currentStorehouse_internal_together.warehouse_addr}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <p class="color">请您务必按照选择的收货点详细地址发货，确认发货之后再点击我已发货按钮</p> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showBatchDelivery = false">取 消</el-button>
        <el-button type="primary" @click="submitDelivery">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择物流公司" :visible.sync="showDeliveryCompany" width="700px" :append-to-body="true">
      <DeliveryCompany v-if="showDeliveryCompany" @handleCallBack="getCode" :addSelf="true"></DeliveryCompany>
      <el-input v-model="trans_no" placeholder="填写物流单号" style="padding-top:20px;" :disabled="currentDeliver.id==0"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ensureDeliveryCompany">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog  :visible.sync="showbigimg" width="600px" :append-to-body="true">
        <div style="line-height:400px;text-align:center;">
            <img :src="bigmigurl" alt="" style="max-height:500px;max-height:400px;">
        </div>
    </el-dialog>
     <el-dialog
      width="30%"
      title="下载发货单"
      :visible.sync="downloadExcel"
      :append-to-body="true"
     >
      <div style="text-align:center;">
        <el-button>
          <a :href="`${downUrl}${downUrldeliveryNo}`" :download="downUrldeliveryNo+'发货单'">立即下载发货单</a>
          </el-button>
          <div style="width:200px;margin:10px auto;text-align:left;">
            <p class="color">1、发货单下载后自行打印</p>
            <p class="color">2、发货单也可在账单中心下载</p>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadExcel=false" size="small"><a :href="`${downUrl}${downUrldeliveryNo}`" :download="downUrldeliveryNo+'发货单'" style="color:#fff">立即下载</a></el-button>
      </span>
    </el-dialog>
  </div>
</template>
.<script>

import { baseURL } from "@/config";
import DeliveryCompany from "_c/DeliveryCompany";
import { axios, sellerOrderCenter, common } from "@/api/apiObj";
import { mapState, mapActions ,mapMutations} from "vuex";
export default {
  data() {
    return {
        uptype:1,
        currentDeliver:{},
        showbigimg:false,
        bigmigurl:'',
        downloadExcel:false,
        downUrldeliveryNo:'',
        priceunit: "",
        priceunitCount:0,
        unpriceunitCount:0,
        list: [],
        showBatchDelivery: false,
        deliveryObj: {
            hongkong: [],
            internal: [],
            internalActive: true,
            hongkongActive: true,
            index: "",
            internalDeliver: {}
        },
        trans_no: "",
        storehouse_order_together: "",
        internalStorehouseList: [],
        currentStorehouse_internal_together: {},
        storehouse_order_together_hongkong: "",
        hongkongStorehouseList: [],
        currentStorehouse_hongkong_together: {},
        showDeliveryCompany: false
    };
  },
  watch: {
      priceunit(){
          this.init()
      },
    storehouse_order_together(newval) {
      this.currentStorehouse_internal_together = this.internalStorehouseList[
        newval
      ];
    },
    storehouse_order_together_hongkong(newval) {
      this.currentStorehouse_hongkong_together = this.hongkongStorehouseList[
        newval
      ];
    },
    showDeliveryCompany(newval) {
      if (!newval) {
        if (this.deliveryObj.internalActive) {
          this.deliveryObj.internalDeliver.trans_no = this.trans_no;
        } else {
          this.deliveryObj.internal[
            this.deliveryObj.index
          ].trans_no = this.trans_no;
        }
        this.trans_no = "";
      }
    }
  },
  computed: {
    url() {
      let access_token = sessionStorage.getItem("access_token");
      return (
        baseURL +
        `api-order/sellerCenter/uploadOrderBi?access_token=${access_token}`
      );
    },
    downUrl() {
      let access_token = sessionStorage.getItem("access_token");
      return (
        baseURL +
        `api-order/sellerCenter/queryDeliverySheet?access_token=${access_token}&deliveryNo=`
      );
    },
  },
  mounted() {
    this.init();
  },
  components: {
    DeliveryCompany
  },
  methods: {
    ...mapMutations(["setshowDeliverCar"]),
    ensureDeliveryCompany(){
      if(!this.trans_no){
        this.$message.error("请填写物流单号")
        return;
      }
      this.showDeliveryCompany=false;

    },
    printBox(){
      this.$message({
        message:"功能待完善"
      })
      return;
     print(this.$refs.print,{'no-print':'.noprint'})
    },
    init() {
      let obj = {};
      if (this.priceunit === false || this.priceunit === true) {
        obj.priceunit = this.priceunit;
      }
      axios
        .request({ ...sellerOrderCenter.queryDeliverCar, params: obj })
        .then(res => {
          if(res){
            if(this.priceunit === false ){
                this.list = res.data;
                this.unpriceunitCount=res.data.length;
            }else if(this.priceunit === true){
                this.list = res.data;
                this.priceunitCount=res.data.length;
            }else{
              this.priceunitCount=0;
              this.unpriceunitCount=0
              this.list = res.data.map(item=>{
                  if(item.priceunit){
                      this.priceunitCount++
                  }else{
                        this.unpriceunitCount++
                  }
                  return item;
                })
            }
              
                };
          
        });
    },
    deleteGoods(type, id) {
      this.$confirm("确定要从发货筐移除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .request({
              ...sellerOrderCenter.deleteDeliverCar,
              params: { type: type, id: id }
            })
            .then(res => {
              if (res) {
                this.init();
              }
            });
        })
        .catch(() => {});
    },
    batchDelivery(priceunit) {
      if (this.internalStorehouseList.length == 0) {
        this.GetCenterChangeAddress(1);
        this.GetCenterChangeAddress(2);
      }
      let obj = {
        hongkong: [],
        internal: []
      };
      this.list.forEach(item => {
        if (item.priceunit && priceunit) {
          obj.hongkong.push({ ...item, deliveryInfo: {} });
        } else if(!item.priceunit && !priceunit){
          obj.internal.push({ ...item, deliveryInfo: {} });
        }
      });
      this.deliveryObj = { ...this.deliveryObj, ...obj };
      this.showBatchDelivery = true;
    },
    GetCenterChangeAddress(type) {
      axios
        .request({
          ...common.GetCenterChangeAddress,
          params: { start: 0, length: 50,type:type }
        })
        .then(res => {
            if(type==1){
                this.internalStorehouseList = res.data;
                this.currentStorehouse_internal_together = this.internalStorehouseList[0];
                this.storehouse_order_together = 0;
                this.deliveryObj.internal = this.deliveryObj.internal.map(item => {
                    return {
                    ...item,
                    storehouse_order: res.data[0].id,
                    storehouse_order_index: 0,
                    warehouse_recipient: res.data[0].warehouse_recipient,
                    warehouse_phone: res.data[0].warehouse_phone,
                    warehouse_addr: res.data[0].warehouse_addr
                    };
                });
                this.deliveryObj.hongkong = this.deliveryObj.hongkong.map(item => {
                    return {
                    ...item,
                    storehouse_order: res.data[0].id,
                    storehouse_order_index: 0,
                    warehouse_recipient: res.data[0].warehouse_recipient,
                    warehouse_phone: res.data[0].warehouse_phone,
                    warehouse_addr: res.data[0].warehouse_addr
                    };
                });
            }else if(type==2){
                this.hongkongStorehouseList = res.data;
                this.currentStorehouse_hongkong_together = this.hongkongStorehouseList[0];
                this.storehouse_order_together_hongkong = 0;
                this.deliveryObj.hongkong = this.deliveryObj.hongkong.map(item => {
                    return {
                    ...item,
                    storehouse_order: res.data[0].id,
                    storehouse_order_index: 0,
                    warehouse_recipient: res.data[0].warehouse_recipient,
                    warehouse_phone: res.data[0].warehouse_phone,
                    warehouse_addr: res.data[0].warehouse_addr
                    };
                });
            }
        });
    },
    changeStorehouseInternal(val, index, type) {
      if (type == 0) {
        this.deliveryObj.internal[index] = {
          ...this.deliveryObj.internal[index],
          storehouse_order: this.internalStorehouseList[val].id,
          storehouse_order_index: val,
          warehouse_recipient: this.internalStorehouseList[val]
            .warehouse_recipient,
          warehouse_phone: this.internalStorehouseList[val].warehouse_phone,
          warehouse_addr: this.internalStorehouseList[val].warehouse_addr
        };
      } else if (type == 1) {
        this.deliveryObj.hongkong[index] = {
          ...this.deliveryObj.hongkong[index],
          storehouse_order: this.internalStorehouseList[val].id,
          storehouse_order_index: val,
          warehouse_recipient: this.internalStorehouseList[val]
            .warehouse_recipient,
          warehouse_phone: this.internalStorehouseList[val].warehouse_phone,
          warehouse_addr: this.internalStorehouseList[val].warehouse_addr
        };
      }
    },
    selectDeliveryCompany(index) {
      if (!this.deliveryObj.internalActive) {
        this.deliveryObj.index = index;
      }
      this.showDeliveryCompany = true;
    },
    getCode(val) {
      this.currentDeliver=val
      if(this.currentDeliver.id==0){
        this.trans_no="暂无单号"
      }else{
         this.trans_no=""
      }
      //香港不需要物流
      //国内物流
      if (this.deliveryObj.internalActive) {
        //标识统一发货
        this.deliveryObj.internalDeliver = {
          ...this.deliveryObj.internalDeliver,
          trans_code: val.code,
          transName: val.name
        };
      } else {
        this.deliveryObj.internal[this.deliveryObj.index].trans_code = val.code;
        this.deliveryObj.internal[this.deliveryObj.index].transName = val.name;
      }
    },
    submitDelivery() {
        let obj={}
        // let hasTrans_no=true;
        if(this.deliveryObj.hongkong.length){
            let hongkongArr=[];
           if (this.deliveryObj.hongkongActive) {
            //标识香港统一发货
                hongkongArr=this.deliveryObj.hongkong.map(item=>{
                    let obj={
                        goodsSellerId:item.goodsSellerId,
                        goodsId:item.goosId,
                        goodsName:item.goodsName,
                        goodsCount:item.totalCount,
                        storehouseId:this.hongkongStorehouseList[this.storehouse_order_together_hongkong].id,
                        piUrl:item.BIurl,
                        priceunit:item.priceunit,
                    }
                    return obj;
                })
            }else{
                //标识香港单独发货
                hongkongArr=this.deliveryObj.hongkong.map(item=>{
                    let obj={
                        goodsSellerId:item.goodsSellerId,
                        goodsId:item.goosId,
                        goodsName:item.goodsName,
                        goodsCount:item.totalCount,
                        storehouseId:this.hongkongStorehouseList[item.storehouse_order_index].id,
                        piUrl:item.BIurl,
                        priceunit:item.priceunit,
                    }
                    return obj;
                })
            }
            obj.hk=JSON.stringify(hongkongArr)
        }
        
      if (this.deliveryObj.internal.length ) {
          let internalArr=[]
          
        if (this.deliveryObj.internalActive) {
          //标识国内统一发货
            internalArr=this.deliveryObj.internal.map(item=>{
              // if(!this.deliveryObj.internalDeliver.trans_no){
              //   hasTrans_no=false;
              // }
                    let obj={
                        goodsSellerId:item.goodsSellerId,
                        goodsId:item.goosId,
                        goodsName:item.goodsName,
                        goodsCount:item.totalCount,
                        storehouseId:this.internalStorehouseList[this.storehouse_order_together].id,
                        transNo:this.deliveryObj.internalDeliver.trans_no,
                        transCode:this.deliveryObj.internalDeliver.trans_code,
                        transName:this.deliveryObj.internalDeliver.transName,
                        priceunit:item.priceunit,
                    }
                    return obj;
                })
        }else{
            internalArr=this.deliveryObj.internal.map(item=>{
              // if(!item.trans_no){
              //   hasTrans_no=false;
              // }
                    let obj={
                        goodsSellerId:item.goodsSellerId,
                        goodsId:item.goosId,
                        goodsName:item.goodsName,
                        goodsCount:item.totalCount,
                        storehouseId:item.storehouse_order,
                        transNo:item.trans_no,
                        transCode:item.trans_code,
                        transName:item.transName,
                        priceunit:item.priceunit,
                    }
                    return obj;
                })
        }
        obj.cn=JSON.stringify(internalArr)
      }
      // if(!hasTrans_no){
      //   this.$message.error("请填写物流单号");
      //   return;
      // }
      this.$loading(this.$store.state.loading);
      axios.request({...sellerOrderCenter.diliverGoods,data:obj,method:'post'}).then(res=>{
         this.$loading(this.$store.state.loading).close();
          if(res && res.resultCode==200){
              this.showBatchDelivery=false;
              this.init();
              this.downUrldeliveryNo=res.data
              this.downloadExcel=true;
          }
      })
    },
    beforeAvatarUpload(file) {
      //   const isLt2M = file.size / 1024 / 1024 < 2;
      //   if (!isLt2M) {
      //     this.$message.error("上传头像图片大小不能超过 2MB!");
      //   }
      //   return isLt2M;
    },
    handleAvatarSuccess(res, file, fileList, index) {
        this.deliveryObj.hongkong[index].BIurl=res.data
    },
    onpreview(file,index){
        this.showbigimg=true;
        this.bigmigurl=file.url;
    }
  }
};
</script>
.<style scoped lang="less">
@import "./deliverCar.less";
</style>