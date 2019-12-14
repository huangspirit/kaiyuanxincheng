.<template>
  <div>
    <div class="goodslist">
      <div class="title">
       
        <p>卖家订单中心</p>
         <div style="padding-right:10px;">
            <el-button size="small" class="bgBlu" style="position:relative"  @click="setshowDeliverCar(true)">发货框 <span style="position:absolute;border-radius:20px;padding:2px 3px;top:-5px" class="bgColor">{{deliveryCarCount}}</span> </el-button>
        </div>
      
      </div>
      <div class="tit">
        <ul>
          <li :class="goods_type===''?'color':''" @click="goods_type=''">全部</li>
          <li :class="goods_type===true?'color':''" @click="goods_type=true">现货</li>
          <li :class="goods_type===false?'color':''" @click="goods_type=false">订货</li>
        </ul>
        <el-select
          v-model="day"
          @change="inputHandler"
          placeholder="请选择查询时间段"
          style="width:100px;"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        
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
        <div class="models">
              <span class="color">管理模式</span>
              <router-link to="/PersonalCenter/SellerOrderManagement" title="切换到管理模式"><img src="@/assets/image/public/change.png" alt="">订单模式</router-link>
          </div>
        
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" @change="allCheck" ref="allcheckmark" />
                全选
              </label>
            </th>
            <th>发布日期</th>
            <th>器件型号</th>
            <th>类型</th>
            <th>发布数量</th>
            <th>已售数量</th>
            <th>已发数量</th>
            <th>可发数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in goodslist" :key="index">
            <td style="text-align:center;">
              <label v-if="item.deliver_button">
                <input
                  type="checkbox"
                  name="checking"
                  :value="index"
                  v-model="checkedlist"
                  ref="input"
                />
              </label>
            </td>
            <td>{{item.publish_date | formatDate}}</td>
            <td class="goodsinfo">
              <p >
                <router-link class="color" :to="{
                  path:'/BrandDetail/GoodsDetails',
                  query:{
                    name:item.goods_name,
                    documentid:item.goods_id,
                    tag:'goodsinfo'
                  }
                }">
                    {{item.goods_name}}
                </router-link>
                
                </p>
              <P >
                品牌：<router-link :to="{
                  path:'/BrandDetail',
                  query:{
                    name:item.branda,
                    documentid:item.brandId,
                    tag:'brand'
                  }
                }">
                  {{item.branda}}
                  </router-link></P>
            </td>
            <td>
              <span :class="item.goods_type?'green':'color'">{{item.goods_type?'现货':'订货'}}</span>
              <p>{{item.diliver_place}}发货</p>
            </td>
            <td>
              <p>{{item.goods_count | toFixed(0)}}</p>
            </td>
            <td>
              <p>{{item.seller_count | toFixed(0)}}</p>
            </td>
            <td>
              <p>{{item.deliver_count_past | toFixed(0)}}</p>
            </td>
            <td>
              <p class="blu">{{item.should_deliver_count | toFixed(0)}}</p>
              <p v-if="item.deliver_button">
                <a href="javascript:;" class="blu" @click="deliverysignle(item)">加入发货框</a>
              </p>
              <div v-if="item.old_deliver_date && !item.goods_type">
                <p>预计交期:{{item.old_deliver_date | formatDate0}}</p>
                <p class="color">变更后交期:{{item.complete_date | formatDate0}}</p>
              </div>
              <div v-if="!item.old_deliver_date  && !item.goods_type">
                <p>预计交期:{{item.complete_date | formatDate0}}</p>
              </div>
            </td>
            <td>
              <!-- <p>
                <a href>管理</a>
              </p> -->
              <p>
                <a href="javascript:;" @click="setitem(item)">查看订单</a>
                <p v-if="item.change_button">
                <a href="javascript:;" class="blu" @click="DeliverGoodsChangeDue(item)" v-if="item.change_button">更改交期</a>
                <!-- <p v-if="item.priceunit"><a href="javascript:;" @click="upPI(item)">上传PI</a></p> -->
                <p v-if="item.change_button">
                <!-- <router-link :to="{
                  path:'SellerOrderManagement/SellerOrderDetail',
                }"  @click.native="setitem(item)">查看订单</router-link> -->
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <el-button size="mini" class="bgBlu" v-if="checkedlist.length" @click="batchaddDelivery">加入发货框</el-button>
      <!-- <el-button size="mini" class="bgBlu" v-if="checkedlist.length" @click="batchDelivery">合并发货</el-button> -->
      <Pagination
        v-if="total"
        :pageSize="pageSize"
        :total="total"
        :currentPage="currentPage"
        @current-change="currentChange"
      ></Pagination>
       <!-- 更改交期 -->
      <SetTankuang
        :title="'更改交期'"
        v-if="centerDialogVisibleChangeDue"
        @closeDialogCallBack="centerDialogVisibleChangeDue = false"
      >
        <div class="dialog-body" slot="dialog-body">
          <el-form
            :model="ruleFormChangeDue"
            :rules="rulesChangeDue"
            ref="ruleFormChangeDue"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item label="当前交期:">
              <p class="text">{{currentItem.complete_date | formatDate}}</p>
            </el-form-item>
            <el-form-item label="交期变更为:" prop="nameChangeDue">
              <el-date-picker
                v-model="ruleFormChangeDue.nameChangeDue"
                type="datetime"
                placeholder="新交期时间"
                style="margin-right:100px"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="温馨提示:">
              <p style="color:#ff6600">更改交期超过7天，买家可在24小时之内撤销订单；每个商品订单交期只能更改一次；</p>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer fr" style="display:flex;">
          <el-button class="cancle" @click="centerDialogVisibleChangeDue = false">取消</el-button>
          <el-button
            class="default"
            @click="submitFormChangeDue('ruleFormChangeDue')"
            style="width:auto;margin-left:10px;"
          >确认更改</el-button>
        </div>
      </SetTankuang>
      <el-dialog 
      title="香港到货通知" 
      :visible.sync="showUppi" width="600px" :center="true" class="uppi">
        <div class="upcont">
          <div class="title">
            <span>1、选择物流公司</span>
            <span>2、上传PI</span>
            <span>3、平台审核后付款</span>
            <span>4、卖家送货或送货收款</span>
          </div>
          <div class="cont">
              <p>第一步：选择物流公司</p>
              <div class="deliverCompany">
                <div>
                  <label>物流报关公司：</label>
                  <el-select v-model="storehouse_index" placeholder="请选择报关公司" size="mini">
                  <template v-for="(item,k) in hongkongStorehouseList">
                    <el-option
                      :label="item.warehouse_name"
                      :value="k"
                      :key="item.id"
                    >{{item.warehouse_name}}</el-option>
                  </template>
                </el-select>
                </div>
                <template v-if="currentStorehouse.warehouse_addr">
                  <div>
                    <label>收货地址：</label>
                    {{currentStorehouse.warehouse_addr}}
                  </div>
                  <div>
                    <label>联系人电话：</label>
                    {{currentStorehouse.warehouse_recipient}}  {{currentStorehouse.warehouse_phone}}
                  </div>
                </template>
                </div>
            
              <p>第二步：上传PI 和 收款银行信息  <a href="">下载PI模板</a></p>
              <div class="pilist">
                    <el-upload
                      class="avatar-uploader"
                      :action="`${url}${currentItem.seller_goods_id}`"
                      :auto-upload="true"
                      list-type="picture-card"
                      :on-preview="onpreview"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple
                    >
                      <i class="el-icon-plus"></i>
                       <div slot="tip" class="tip">
                         <p style>可上传多张图片，支持png、jpg、gif格式</p>
                      </div>
                    </el-upload>
                     <div class="symbol">
                       <img src="@/assets/image/PersonalCenter/_u24718.png" alt />
                        <span style="width:100px;text-align:center">样张</span>
                       
                      </div>
                  </div>
                  <div class="color desc">
                    <p>1、请务必保持PI与你选择的物流报关公司保持一致，否则将不能通过审核;</p>
                    <p>2、我们暂不支持一个货料的分批交货，请确认你这批货已全部交齐;</p>
                  </div>
            </div>
        </div>
      <span slot="footer" class="dialog-footer" >
        <el-button  @click="submitPI" class="bgColor" round>确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog  :visible.sync="showbigimg" width="600px">
        <div style="line-height:350px;text-align:center;">
            <img :src="bigmigurl" alt="" style="max-width:500px;max-height:350px;">
        </div>
    </el-dialog>
    </div>
  </div>
</template>
.<script>
import { mapState, mapActions,mapMutations } from "vuex";
import { TimeForma, TimeForma2 } from "@/lib/utils";
import { baseURL } from "@/config";
import DeliveryCompany from "_c/DeliveryCompany";
import { axios, sellerOrderCenter,common } from "@/api/apiObj";
export default {
  data() {
    return {
      deliveryCarCount:0,
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
      goods_type: "",
      day: "",
      goodslist: [],
      goods_name: "",
      checkedlist: [],
       // 更改交期的模态框
       // 更改交期
      ruleFormChangeDue: {
        nameChangeDue: ""
      },
      rulesChangeDue: {
        nameChangeDue: [
          {
            type: "string",
            required: true,
            message: "请输入结束日期",
            trigger: "change"
          }
        ]
      },
      centerDialogVisibleChangeDue: false,
      currentItem:{},
      showUppi:false,
      hongkongStorehouseList: [],
      currentStorehouse: {},
      storehouse_index:0,
      showbigimg:false,
      bigmigurl:""
    };
  },
  filters:{
    formatDate0(val){
      return TimeForma(val)
    }
  },
   computed: {
    url() {
      let access_token = sessionStorage.getItem("access_token");
      return (
        baseURL +
        `api-g/goods-b/uploadPI?access_token=${access_token}&seller_goods_id=`
      );
    },
  },
   components: {
    DeliveryCompany
  },
  watch: {
    goods_type(newval, oldval) {
      this.currentPage=1;
      this.init();
    },
    storehouse_index(newval){
        this.currentStorehouse = this.internalStorehouseList[newval];
    }
  },
  mounted() {
    this.init();
    this.getdeliveryCarCount();
  },
  methods: {
    ...mapMutations(['setshowDeliverCar']),
     GetCenterChangeAddress(type) {
      axios
        .request({
          ...common.GetCenterChangeAddress,
          params: { start: 0, length: 50,type:type }
        })
        .then(res => {
                this.hongkongStorehouseList = res.data;
                this.currentStorehouse=res.data[0]
        });
    },
    upPI(item){
        this.currentItem=item;
        this.showUppi=true;
         if (this.hongkongStorehouseList.length == 0) {
          this.GetCenterChangeAddress(2);
        }
    },
    submitPI(){
        this.$message({
          message:'功能待完善'
        })
    },
    getdeliveryCarCount(){
      axios.request(sellerOrderCenter.queryDeliverCarNumber).then(res=>{
        this.deliveryCarCount=res.data
      })
    },
    init() {
      this.$refs.allcheckmark.checked=false;
      let obj = {
        start: (this.currentPage - 1) * this.pageSize,
        length: this.pageSize,
        goods_name:this.goods_name
      };

      if (this.goods_type === true || this.goods_type === false) {
        obj.goods_type = this.goods_type;
      }
      if (this.day) {
        obj.day = this.day;
      }
      axios
        .request({ ...sellerOrderCenter.queryPublishGoodsList, params: obj })
        .then(res => {
          if (res && res.data) {
            this.goodslist = res.data.data;
            this.total = res.data.total;
             
          }
        });
    },
    //更改交期
     DeliverGoodsChangeDue(item) {
      this.centerDialogVisibleChangeDue = true;
    
      this.currentItem = item;
    },
    submitFormChangeDue(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.request({...sellerOrderCenter.updateSellerGoodsDiliverTime,params:{
            goods_seller_id: this.currentItem.seller_goods_id,
            old_complete_date: TimeForma2(this.currentItem.complete_date),
            new_complete_date: this.ruleFormChangeDue.nameChangeDue+' 00:00:00',
          }}).then(res=>{
            if(res){
              this.centerDialogVisibleChangeDue = false;
              this.init();
              this.$message({
                type: "success",
                message: res.message
              });
            }
             
          })
        } else {
          this.$message.error("请完善信息!");
          return false;
        }
      });
    },
    setitem(item){
      sessionStorage.setItem("ordergoodsdetail",JSON.stringify(item))
      this.$router.push({
        path:"/PersonalCenter/SellerOrderManagement/SellerOrderDetail"
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
    
    batchaddDelivery(){
      let arr=[];
      this.checkedlist.forEach(item => {
        arr.push({
          goodsBrand:this.goodslist[item].branda,
          goodsBrandId:this.goodslist[item].brandId,
          goodsSellerId:this.goodslist[item].seller_goods_id
        })
      });
      let obj={
          goods:JSON.stringify(arr)
      }
      axios.request({...sellerOrderCenter.addDeliverCar,data:obj,method:"post"}).then(res=>{
        if(res){
          this.$message({
            message:'加入发货框成功',
            type:'success'
          })
          this.init();
          this.checkedlist=[];
          let _this = this;
          setTimeout(()=>{
            _this.getdeliveryCarCount();
          },2000)
        }
      })
    },
    deliverysignle(item){
       let arr=[];
        arr.push({
          goodsBrand:item.branda,
          goodsBrandId:item.brandId,
          goodsSellerId:item.seller_goods_id
      });
      let obj={
          goods:JSON.stringify(arr)
      }
      axios.request({...sellerOrderCenter.addDeliverCar,data:obj,method:"post"}).then(res=>{
        if(res){
          this.init();
          let _this = this;
          setTimeout(()=>{
            _this.getdeliveryCarCount();
          },2000)
        }
      })
    },
  
     beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif');
        if (!isJPG) {
          this.$message.error('只能上传图片格式!');
        }
        return isJPG;
    },
   
     handleAvatarSuccess(res, file, fileList, index) {
       // this.deliveryObj.hongkong[index].BIurl=res.data
    },
    onpreview(file,index){
        this.showbigimg=true;
        this.bigmigurl=file.url;
    }
  }
};
</script>
<style scoped lang="less">
@import "./sellerOrder.less";
</style>
