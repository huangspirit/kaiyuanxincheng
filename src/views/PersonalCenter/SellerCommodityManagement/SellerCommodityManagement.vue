<template>
  <div class="SellerCommodityManagement">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>特价管理</el-breadcrumb-item>
      <p class="fr" style="margin-right:20px;"> 
          <router-link to="/PersonalCenter/SellerIssuesProduct">
          <el-button type="primary">发布特价</el-button>
        </router-link>
        </p>
    </el-breadcrumb>
    <div class="OrderManagement">
      <!-- 订单列表 -->
      <div class="tab-list">
        <!-- 一级切换 -->
        <div class="tab-list-t clear">
          <ul class="clear">
            <li
              v-for="item in tabFirstList"
              :key="item.id"
              :class="{bgColor:currentModlue.id === item.id}"
              @click="tabFirst(item)"
            >{{item.name}}</li>
          </ul>
          <ul class="clear">
            <li
              v-for="item in goodsTypelist"
              :key="item.id"
              :class="{bgColor:currentGoodsType.id === item.id}"
              @click="tabFirstGoodsType(item)"
            >{{item.name}}</li>
            
          </ul>
          <el-select v-model="orderDate" @change="orderManageList(orderDate)" placeholder="请选择"  style="width:150px;margin-right:20px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
           <!-- <el-select v-model="goodsType" placeholder="请选择" style="width:150px;" @change="goodsTypeChange">
              <el-option
              label="全部类型"
              value=""
            ></el-option>
            <el-option
              label="现货"
              value="true"
            ></el-option>
            <el-option
              label="订货"
              value="false"
            ></el-option>
          </el-select> -->
             <el-input
                        placeholder="输入型号"
                        v-model="SearchInputValue"
                        class="inputSearch fr"
                        @keyup.enter.native="SearchSubmit"
                         style="width:250px;"
                         clearable
                        >
                         <el-button slot="append" icon="el-icon-search" @click="SearchSubmit"></el-button>
                    </el-input>
        </div>
        <!-- 列表的内容 -->
        <div class="tab-list-con">
          <div class="list-item">
            <!-- <div class="list-item-tit">
              <span>批次号：</span>
              <span class="phon">{{item.product_no}}</span>
            </div>-->
            <table width="100%" border="1" cellpadding="0" cellspacing="0">
              <!-- style="table-layout:fixed" -->
              <thead>
                <tr>
                  <th v-if="currentModlue.id!=1">
                    <label>
                      <input type="checkbox" @change="allCheck" ref="allcheckmark" />
                      全选
                    </label>
                  </th>
                  <th>商品信息</th>
                  <th>售价</th>
                  <th>条件</th>
                  <th>交货条件</th>
                  <th>数量</th>
                  <th>售卖时限</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in PublishGoodsList" :key="item.id">
                  <td v-if="currentModlue.id!=1">
                    <label v-if="item.downButton">
                      <input
                        type="checkbox"
                        name="checking"
                        :value="item.id"
                        v-model="checklist"
                        ref="input"
                      />
                    </label>
                  </td>
                  <td class="goodsInfo" >
                    <div class="wrap">
                      <div>
                          <ImgE :src="item.oneimg" :W="60" :H="60" :isBig="true" :srcArr="item.imgArr" v-if="item.imgArr"></ImgE>
                          <ImgE :src="item.oneimg" :W="60" :H="60" :isBig="true" v-else></ImgE>
                          <p @click="updateImg(item)" class="blu" style="font-size:12px;text-align:center;cursor:pointer" v-if="item.isenable">{{item.sellerGoodsImageUrl?'更新图片':'新增实物图'}}</p>
                      </div>
                      <div>
                        <p>
                          <router-link
                            class="color"
                            :to="{
                          path:'/BrandDetail/GoodsDetails',
                          query:{
                            tag:'goodsinfo',
                            documentid:item.goods_id,
                            name:item.goods_name
                          }
                        }"
                          >{{item.goods_name}}</router-link>
                        </p>
                        <p>
                         品牌：<router-link
                            :to="{
                          path:'/BrandDetail',
                          query:{
                            tag:'brand',
                            documentid:item.brandId,
                            name:item.brandName
                          }
                        }"
                          >{{item.branda}}</router-link>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="price">
                    <p
                      v-if="!item.priceType"
                      class="color"
                    >{{item.priceUnit ? '$' : '￥'}}{{item.goodsPrice | toFixed(item.priceUnit?3:2)}}</p>
                    <ul class="list" v-if="item.priceLevel">
                      <li v-for="(val, k) in item.priceLevel" :key="k">
                        <span>{{val[0]}}</span>---
                        <span
                          class="color"
                        >{{item.priceUnit ? '$' : '￥'}}{{val[1] | toFixed(item.priceUnit?3:2)}}</span>
                      </li>
                    </ul>
                    <div class="blue">
                      <span>({{item.includBill? '含13%增值税' : '不含税' }})</span>
                    </div>
                  </td>

                  <td>
                    <span :class="item.goods_type ?'green':'color'">{{item.goods_type ? '现货' : '订货'}}</span>
                    <p
                      v-if="!item.goods_type && item.deliverTime"
                    >预计交期{{item.deliverTime | formatDate}}</p>
                    <p
                      v-if="item.goods_type && item.day_interval"
                    >下单后{{item.day_interval | filterHours}}小时内发货</p>
                    <p>{{item.diliverPlace}}交货</p>
                  </td>
                  <td>
                    <p>起订量：{{item.moq}}</p>
                    <p>增量：{{item.mpq}}</p>
                  </td>
                  <td>
                    <span>发布：{{item.goodsCount}}</span>
                    <br />
                    <span>售出：{{item.goodsCount-item.goodsStockCount}}</span>
                  </td>
                  <td>
                    <div v-if="item.seller_always">
                      <p>长期卖</p>
                    </div>
                    <div v-if="!item.seller_always" style="white-space:nowrap">
                      <p>限时跟单</p>
                      <p v-if="item.beginTime">起:{{item.beginTime | formatDate2}}</p>
                      <p v-if="item.expireTime">止:{{item.expireTime | formatDate2}}</p>
                      <!-- <CountTime
                        class="countTime"
                        v-on:end_callback="countDownE_cb(item)"
                        :currentTime="item.currentTime"
                        :startTime="item.currentTime"
                        :endTime="item.expireTime"
                        :tipText="'距离售卖开始:'"
                        :tipTextEnd="''"
                        :endText="'活动已结束'"
                        :dayTxt="'天'"
                        :hourTxt="'小时'"
                        :minutesTxt="'分钟'"
                        :secondsTxt="'秒'"
                      ></CountTime>-->
                      <!-- <el-button slot="reference">剩余售卖时间</el-button> -->
                    </div>
                  </td>
                  <td>
                    {{item.isenable?'在售中':'已下架'}}
                  </td>
                  <td>
                    <div class="wrapbtn">
                      <p v-if="item.isenable">
                        <a
                          href="javascript:;"
                          v-if="item.downButton"
                          @click="OffShelfMerchandise(item)"
                        >提前下架</a>
                        <br />
                        <a href="javascript:;" v-if="item.downButton" @click="addNum(item)">追加数量</a>
                      </p>
                      <p v-if="!item.isenable">
                        <a href="javascript:;" @click="repeatPublish(item)">重新发布</a>
                        <br />
                        <!-- <a href="javascript:;" v-if="item.upButton"  @click="ReLaunchingCommodities(item)" >上架</a> -->
                      </p>

                      <!-- <span v-if="item.downButton" @click="OffShelfMerchandise(item)" class="btn undone">下架</span> -->
                      <!-- <span v-if="item.upButton" class="btn bgColor" @click="ReLaunchingCommodities(item)" >重新上架</span> -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <el-button
            v-if="checklist.length && currentModlue.id!=1"
            size="mini"
            class="bgColor"
            @click="batchDown"
          >全选下架</el-button>
          <!-- <el-button v-if="checklist.length && !currentModlue.isenable" size="mini" class="" @click="batchUp">全选上架</el-button> -->
        </div>
      </div>
      <div>
        <div v-if="PublishGoodsList.length==0" class="nocont">暂无数据</div>
      </div>
      <!-- 分页 -->
      <Pagination
        v-if="total"
        :currentPage.sync="currentPage"
        :total="total"
        :page-size="pageSize"
        @current-change="handleChangePage"
      ></Pagination>
    </div>

    <el-dialog title="特价数量追加" :visible.sync="showAddnum" width="400px" class="showAddnum">
      <div>
        <div class="title">
          <p>已发布数量：{{addNumObj.goodsCount}}只</p>
          <p>目前已售出：{{addNumObj.goodsCount-addNumObj.goodsStockCount}}只</p>
        </div>
        <div class="cont">
          <div class="color" style="display:flex; align-items: center">
            <span>现追加总数量为：</span>
            <div>
              <el-input-number
                v-model="goods_count"
                size="mini"
                :min="0"
                :step="addNumObj.mpq"
                step-strictly
              ></el-input-number>
            </div>
          </div>
          <p>追加后总数量为：{{addNumObj.goodsCount+goods_count}}只，剩余：{{addNumObj.goodsStockCount+goods_count}}只</p>
          <p class="desc">提示：您的售卖期限将不会改变，请知悉！</p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="confirmAdd">确认追加</el-button>
        <el-button @click="showAddnum = false">我再想想</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重要提示：提前下架" :visible.sync="showdownitem" width="400px" class="showAddnum">
      <div style="text-indent:25px">若此零件已经有成交，已经成交的订单须继续执行完毕。此外，你的订单‘提前下架’后不能恢复，只能重新发布新的特价；</div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="confirmshowdownitem">确认下架</el-button>
        <el-button @click="showdownitem = false">我再想想</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更新图片" :visible.sync="showUpdateImg" width="690px">
      <div >
 <el-upload
            :action="url"
            :on-success="handleAvatarSuccess"
            class="upload-demo"
            ref="upload"
            :auto-upload="true"
            list-type="picture-card"
            :on-remove="handleRemoveimg"
            :on-preview="handlePictureCardPreview"
            :file-list="imglist"
            multiple
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="margin-top:15px;">
            <p style>图片尺寸请确保800px*800px以上，文件大小限制为2MB以内，支持png、jpg、gif格式</p>
          </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="submitUpdateImg">确认更新</el-button>
        <el-button @click="showUpdateImg = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
@import "./SellerCommodityManagement.less";
</style>
<script>
// import "@/assets/css/ele-form.less";
import Countdown from "_c/Countdown";
import { mapState, mapActions, mapMutations } from "vuex";
import { TimeForma, TimeForma2 } from "@/lib/utils";
import { axios,sellerCenter } from "@/api/apiObj";
import { baseURL,baseURL3 } from "@/config";
export default {
  name: "SellerCommodityManagement",
  data() {
    return {
      dialogVisible:false,
      dialogImageUrl:"",
      imglist:[],
      image_urls:'',
      updateItem:{},
      showUpdateImg:false,
      SearchInputValue: "",
      goodsType:"",
      // 一级分类列表
      currentModlue: {
        id: -1,
        name: "全部",
     
      },
      tabFirstList: [
        {
          id: -1,
          name: "全部",
          
        },
        {
          id: 0,
          name: "在售中",
          isenable: true
        },
        {
          id: 1,
          name: "已下架",
          isenable: false
        }
      ],
      currentGoodsType:{},
      goodsTypelist:[
        {
          id: 0,
          name: "现货",
          goodsType: true
        },
        {
          id: 1,
          name: "订货",
          goodsType: false
        }
      ],
      options: [
        {
          value: "",
          label: "不限时间"
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
      orderDate: "",
      currentPage: 1,
      PublishGoodsList: [],
      total: 0,
      pageSize: 10,
      checklist: [],
      is_checkout: false,
      changeAll: false,
      showAddnum: false,
      goods_count: 0, //追加的数量
      addNumObj: {},
      downItem: {},
      showdownitem: false
    };
  },
  watch: {
    checklist(val) {
      if (
        !this.$refs.input ||
        this.checklist.length < this.$refs.input.length ||
        this.$refs.input.length == 0
      ) {
        if (this.$refs.allcheckmark) {
          this.$refs.allcheckmark.checked = false;
        }
      } else {
        this.$refs.allcheckmark.checked = true;
      }
    }
  },
  methods: {
    ...mapActions("SellerCommodityManagement", [
      "GetPublishGoodsListByUser",
      "GetUpdatePublishGoodsSatus"
    ]),
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemoveimg(file, fileList) {
      let arr = this.image_urls.split("@");
      arr.splice(arr.findIndex(item => baseURL3 + item == file.url), 1);
      this.image_urls = arr.join("@");
    },
    handleAvatarSuccess(res, file, fileList) {
      if (this.image_urls) {
        this.image_urls = this.image_urls + "@" + res.name;
      } else {
        this.image_urls = res.name;
      }
    },
    submitUpdateImg(){
      axios.request({...sellerCenter.updateSellerGoods,method:'post',data:{
        id:this.updateItem.id,
        uid:this.updateItem.uid,
        image_urls:this.image_urls,
        access_token:this.access_token,
        token:this.access_token
      }}).then(res=>{
        if(res){
          this.$message.success("已更新");
          this.showUpdateImg=false;
          this.all();
        }
        
      })
    },
    updateImg(item){
      this.updateItem=item;
      this.showUpdateImg=true;
    },
    batchDown() {
      this.$confirm("确定下架吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let sendData = {
            flag: false
          };
          let uidArr = [];
          this.checklist.forEach(item => {
            let obj = this.PublishGoodsList.find(item0 => {
              return item0.id == item;
            });
            uidArr.push(obj.uid);
          });
          if (this.checklist.length > 1) {
            sendData.ids = this.checklist.join("@");
            sendData.uids = uidArr.join("@");
          } else if (this.checklist.length == 1) {
            sendData.ids = this.checklist[0];
            sendData.uids = uidArr[0];
          }
          axios
            .request({
              ...sellerCenter.updateBatchPublishGoodsSatus,
              params: sendData
            })
            .then(res => {
              this.all();
            });
        })
        .catch(() => {});
    },
    batchUp() {
      let sendData = {
        flag: true
      };
      let uidArr = [];
      this.checklist.forEach(item => {
        let obj = this.PublishGoodsList.find(item0 => {
          return item0.id == item;
        });
        uidArr.push(obj.uid);
      });
      if (this.checklist.length > 1) {
        sendData.ids = this.checklist.join("@");
        sendData.uids = uidArr.join("@");
      } else if (this.checklist.length == 1) {
        sendData.ids = this.checklist[0];
        sendData.uids = uidArr[0];
      }
      axios
        .request({
          ...sellerCenter.updateBatchPublishGoodsSatus,
          params: sendData
        })
        .then(res => {
          this.all();
        });
    },
    allCheck(val) {
      this.checklist = [];
      Array.from(this.$refs.input).forEach(el => {
        if (val.target.checked) {
          this.checklist.push(el.value);
        }
        el.checked = val.target.checked;
      });
    },
    AllcheckSubmit(flag) {
      if (flag) {
        this.sendData = {
          payRealTotal: this.obj.currentPay,
          flag: flag
        };
      } else {
        this.sendData = {
          payRealTotal: this.obj.unCurrentPay,
          flag: flag
        };
      }
      this.showDialog = true;
      // alert("待开发")
    },
    handleChangeAll() {
      this.is_checkout = null;
      this.isOpenBill = null;
      this.changeAll = true;
    },
    //搜索商品
    SearchSubmit() {
      this.currentPage=1;
      this.all()
    },
    confirmshowdownitem() {
      let item = this.downItem;
      this.GetUpdatePublishGoodsSatus({
        id: item.id,
        uid: item.uid,
        isenable: !item.isenable
      }).then(res => {
        this.all();
        this.showdownitem = false;
        this.$forceUpdate();
        this.$message({
          type: "success",
          message: "下架成功!"
        });
      });
    },
    // 下架商品
    OffShelfMerchandise(item) {
      this.showdownitem = true;
      this.downItem = item;
      return;
      this.$confirm(
        "若此零件已经有成交，已经成交的订单须继续执行完毕。此外，你的订单‘提前下架’后不能恢复，只能重新发布新的特价；",
        "重要提示：提前下架",
        {
          confirmButtonText: "确认下架",
          cancelButtonText: "我再想想",
          type: "warning"
        }
      )
        .then(() => {
          this.GetUpdatePublishGoodsSatus({
            id: item.id,
            uid: item.uid,
            isenable: !item.isenable
          })
            .then(res => {
              this.all();
              this.$forceUpdate();
              this.$message({
                type: "success",
                message: "下架成功!"
              });
            })
            .catch(err => {
              this.$message(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    addNum(item) {
     
      this.addNumObj = item;
      this.showAddnum = true;
    },
    confirmAdd() {
      //追加库存
      axios
        .request({
          ...sellerCenter.updateStockCount,
          params: { id: this.addNumObj.id, goods_count: this.goods_count }
        })
        .then(res => {
          this.all();
          this.goods_count = 0;
          this.showAddnum = false;
        });
    },
    repeatPublish(item) {
      this.$router.push(
        "/PersonalCenter/SellerIssuesProduct?seller_id=" + item.id
      );
    },
    // 重新上架商品
    ReLaunchingCommodities(item) {
      this.GetUpdatePublishGoodsSatus({
        id: item.id,
        uid: item.uid,
        isenable: !item.isenable
      })
        .then(res => {
          this.$nextTick(() => {
            this.all();
            this.$forceUpdate();
          });

          this.$message({
            type: "success",
            message: "重新上架成功!"
          });
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    tabFirst(item) {
      this.currentModlue = item;
      this.currentPage = 1;
      this.all();
    },
    tabFirstGoodsType(item){
      this.currentGoodsType = item;
      this.currentPage = 1;
      this.all();
    },
    orderManageList(val) {
      this.currentPage = 1;
      this.all();
    },
    goodsTypeChange(){
      this.currentPage=1;
      this.all()
    },
    handleChangePage(x) {
      this.currentPage = x;
      this.all();
    },
    all() {
      let obj={
        start: this.start,
        length: this.pageSize,
        searchType: true,
      }
      if(this.currentModlue.id!=-1){
        obj.isenable=this.currentModlue.isenable
      }
      if(this.orderDate){
          obj.day=this.orderDate
      }
      if(this.currentGoodsType.goodsType===true || this.currentGoodsType.goodsType===false){
        obj.goodsType=this.currentGoodsType.goodsType;
      }
      if(this.SearchInputValue){
        obj.product_no=this.SearchInputValue.replace(/\s/g,"")
      }
      this.GetPublishGoodsListByUser(obj)
        .then(res => {
          let arr = res.data;
          arr.forEach((item, idx) => {
            if(item.sellerGoodsImageUrl){
              arr[idx].oneimg=baseURL3+'/'+item.sellerGoodsImageUrl.split("@")[0];
              if(item.sellerGoodsImageUrl.split("@").length>1){
                arr[idx].imgArr=item.sellerGoodsImageUrl.split("@").map(item0=>{
                  return baseURL3+'/'+item0
                })
              }
            }else{
              arr[idx].oneimg=item.goodsImageUrl
            }
         
            if (item.priceType) {
              let ret = item.priceLevel.split("@");
              ret.forEach((items, index) => {
                let ar2 = items.split("-");
                ret[index] = ar2;
              });
              arr[idx].priceLevel = ret;
            }
          });
          this.PublishGoodsList = arr;
          this.total = res.total;
          this.checklist = [];
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  components: {
    Countdown
  },

  filters: {
    formatDate(x) {
      return TimeForma(x);
    },
    formatDate2(x) {
      return TimeForma2(x);
    },
    filterHours(val) {
      return Number(val) * 24;
    }
  },
  computed: {
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    url() {
      return (
        baseURL +
        `api-f/files/uploadWithCloud?access_token=${this.access_token}&fileSource=QINIUYUN&type=1&id=1`
      );
    },
    //
    start() {
      return (this.currentPage - 1) * this.pageSize;
    }
  },
  created() {
    if (this.$route.query.status) {
      this.currentModlue = this.tabFirstList[
        this.$route.query.status == "0" ? 1 : 0
      ];
      this.$router.push(this.$route.path);
    }
  },
  mounted() {
    this.all();
  }
};
</script>
