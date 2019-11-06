<template>
  <div>
    <p class="noData" v-if="waitInquiryList.length<=0">暂无数据</p>
    <div class="checkAll" v-if="waitInquiryList.length>0">
      <div class="allBtn">
        <span @click="allCheck">
          <img
            v-if="waitInquiryList.allCheck == true"
            src="@/assets/image/inquirybasket/checked.png"
            alt
          />
        </span>
        <span>全选</span>
      </div>
      <div class="allNum">
        <span>
          已选<strong> {{brandNum}} </strong>个厂商
          共计<strong> {{allNum}} </strong>个型号
        </span>
        <el-button class="batchBtn bgColor" @click="batchApplication" size="mini" v-show="allNum">批量申请</el-button>
        <!-- <img src="@/assets/image/inquirybasket/delete.png" alt /> -->
      </div>
    </div>
    <div class="inquiryList">
      <ul class="listCheck" v-for="(item,k) in waitInquiryList" :key="k">
        <div class="checkSub bgLightGray">
          <div class="allBtn">
            <span @click="subCheck(k,item)" class="check">
              <img v-if="item.subCheck == true" src="@/assets/image/inquirybasket/checked.png" alt />
            </span>
            <span>{{item.sellerName}}</span>
            <ImgE  :src="item.sellerUrl" :W="80" :H="20"></ImgE>
          </div>
          <div class="allNum">
            <span>
              已选
              <strong>{{item.subNum}}</strong> 个型号
            </span>
            <el-button class="batchBtn bgColor" @click="subSpecial" size="mini" v-show="item.subNum">申请特价</el-button>
            <!-- <img src="@/assets/image/inquirybasket/delete.png" alt /> -->
          </div>
        </div>

        <li class="listContent" v-for="(listItem,index) in item.baseList" :key="index">
          <div @click="listItemCheck($event,k,index,listItem)" class="itemCheck">
            <div class="wrap">
                <img
                v-if="listItem.itemCheck == true"
                src="@/assets/image/inquirybasket/checked.png"
                alt
              />
            </div>
              
            </div>
          <div class="goodsImg">
              <ImgE :src="listItem.imageUrl " :W="200" :H="200"></ImgE>
          </div>
          <div class="goodsDetail">
            <div class="googsDesc">
              <h3 class="color">
                <router-link :to="{
                  path:'/BrandDetail/GoodsDetails',
                  query:{
                    tag:'goodsinfo',
                    documentid:listItem.id,
                    name:listItem.productno
                  }
                }">
                  <strong>{{listItem.productno}}</strong>
                  </router-link>
              </h3>
              <h4>品牌：
                <router-link
                :to="{
                  path:'/BrandDetail',
                  query:{
                    tag:'brand',
                    documentid:listItem.brandId,
                    name:listItem.brand
                  }
                }"
                >{{listItem.branda}}</router-link>
                
                </h4>
             
              <!-- <p>基本参数：DIP 盒子 1/8W 100-15</p> -->
              <p>描述：{{listItem.productdesc}}</p>
              <p>
                <span>共有{{listItem.map.totalSeller}}个供应商报价</span>
                <span
                  v-if="listItem.map.totalSeller != 0" class="color"
                >{{listItem.map.minPrice}} ------ {{listItem.map.maxPrice}}</span>
              </p>
            </div>
            <div class="goodPrice">
              <div v-if="listItem.factorySellerInfo && listItem.factorySellerInfo.seller_goods_id">
                <h3>原厂报价</h3>
                  <div
                    v-if="listItem.factorySellerInfo && listItem.factorySellerInfo.price_level"
                  >
                    <div v-for="(subitem,index) in listItem.priceList"  :key="index">
                        <strong>{{subitem.num}}+</strong> -------
                        <strong>{{listItem.factorySellerInfo.priceunit?'$':'￥'}}{{subitem.price | toFixed(listItem.factorySellerInfo.priceunit?3:2)}}</strong>
                    </div>
                  </div>
                  <div v-else>
                    <strong>{{listItem.factorySellerInfo.priceunit?'$':'￥'}}{{listItem.factorySellerInfo.seckil_price | toFixed(listItem.factorySellerInfo.priceunit?3:2)}}</strong>
                    </div>
              </div>
               <div style="height:100%" v-else>
                <p style="text-align: center;height:100%;line-height:200px;color:#d5d5d5;">暂无原厂报价</p>
              </div>
            </div>
            <div class="goodEdit">
              <el-button class="bgColor" @click="applySpecial(listItem)" size="mini">申请特价</el-button><br>
             
               <el-button
                class="bgColor"
                @click="focusOn(listItem)"
                v-if="listItem.focus == false"
                size="mini"
              >+&nbsp; 关注</el-button>
              <el-button
                class="bgLightGray"
                :disabled="disabled"
                v-if="listItem.focus == true"
                size="mini"
              > 已关注</el-button>
              <br>
               <el-button class="bgLightGray"  @click="inquiryDelete(listItem)" size="mini">删除</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="Pagination">
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next, jumper"
        :page-size="1"
        :total="total"
        v-if="total"
        background
        @current-page="currentPage"
        @current-change="change"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import "./WaitInquiry.less";
import { axios, shoppingCar } from "@/api/apiObj";
import { ladderPrice } from "@/lib/utils";
import { debuglog } from "util";
import { constants } from "crypto";
export default {
  props: ["waitMoney"],
  data() {
    return {
      waitInquiryList: [],
      factorySale: [],
      baseListData: [],
      allNum: 0,
      brandNum:0,
      disabled: true,
      total: 0,
      start: 0
    };
  },
  inject: ["reload"],
  mounted() {
    this.getInquiry();
    eventBus.$on("waitMoney", val => {
      
    });
  },
  beforeDestroy() {
    eventBus.$off("proInformation");
  },
  methods: {
    getInquiry() {
      var obj = {
        start: this.start,
        length: 1,
        source: "2"
      };
      axios.request({ ...shoppingCar.inquiryList, params: obj }).then(res => {
        if (res.resultCode == "200") {
          this.waitInquiryList = res.data.data;
          this.total = res.data.total;
          this.factorySale = [];
          this.waitInquiryList["allCheck"] = false;
          for (var i = 0; i < this.waitInquiryList.length; i++) {
            this.waitInquiryList[i]["subCheck"] = false;
            this.waitInquiryList[i]["subNum"] = 0;
            for (var j = 0; j < this.waitInquiryList[i].baseList.length; j++) {
              this.waitInquiryList[i].baseList[j]["itemCheck"] = false;
              if (
                this.waitInquiryList[i].baseList[j].factorySellerInfo
                  .price_level != undefined
              ) {
                this.factorySale = ladderPrice(
                  this.waitInquiryList[i].baseList[j].factorySellerInfo
                    .price_level
                );
                this.waitInquiryList[i].baseList[j][
                  "priceList"
                ] = this.factorySale;
              }
            }
          }
        }
      });
    },
    listItemCheck(e, k, index) {
      this.waitInquiryList[k].baseList[index].itemCheck = !this.waitInquiryList[k].baseList[index].itemCheck;
      if (this.waitInquiryList[k].baseList[index].itemCheck == true) {
        this.allNum++;
        this.waitInquiryList[k].subNum++;
        this.waitInquiryList[k].hasSub=true
        this.baseListData.push(this.waitInquiryList[k].baseList[index]);
      } else {
        this.allNum--;
        this.waitInquiryList[k].subNum--;
        this.baseListData.splice(k, 1);
      }
      this.waitInquiryList = Object.assign([], this.waitInquiryList);
      let brandNum=0
      this.waitInquiryList.forEach(item=>{
          let count=0;
          item.baseList.forEach(item0=>{
              if(item0.itemCheck){
                count++;
              }
          })
          if(count){
            brandNum++
          }
      })
      this.brandNum=brandNum;
      this.allShow();
    },
    subCheck(k, val) {
      if (this.waitInquiryList[k].subCheck == true) {
        this.waitInquiryList[k].subNum = 0;
        this.brandNum--;
        for (var j = 0; j < this.waitInquiryList[k].baseList.length; j++) {
          this.waitInquiryList[k].baseList[j].itemCheck = false;
          this.allNum--;
          this.baseListData.splice(k, 1);
        }
      } else {
        this.waitInquiryList[k].subNum = 0;
        this.brandNum++;
        console.log(this.brandNum)
        for (var j = 0; j < this.waitInquiryList[k].baseList.length; j++) {
          this.waitInquiryList[k].baseList[j].itemCheck = true;
          this.waitInquiryList[k].subNum++;
          this.allNum++;
          this.baseListData.push(this.waitInquiryList[k].baseList[j]);
        }
      }
      this.waitInquiryList[k].subCheck = !this.waitInquiryList[k].subCheck;
      this.waitInquiryList = Object.assign([], this.waitInquiryList);
      this.allShow();
    },
    allCheck() {
      this.allNum = 0;
      this.baseListData = [];
      if (this.waitInquiryList.allCheck == true) {
        this.allNum = 0;
        this.brandNum = 0;
        for (var i = 0; i < this.waitInquiryList.length; i++) {
          this.waitInquiryList[i].subCheck = false;
          this.waitInquiryList[i].subNum = 0;
          for (var j = 0; j < this.waitInquiryList[i].baseList.length; j++) {
            this.waitInquiryList[i].baseList[j].itemCheck = false;
          }
        }
      } else {
        this.baseListData = [];
        this.brandNum = this.waitInquiryList.length;
        for (var i = 0; i < this.waitInquiryList.length; i++) {
          this.waitInquiryList[i].subCheck = true;
          this.waitInquiryList[i].subNum = 0;
          for (var j = 0; j < this.waitInquiryList[i].baseList.length; j++) {
            this.waitInquiryList[i].subNum++;
            this.waitInquiryList[i].baseList[j].itemCheck = true;
            this.allNum++;
            this.baseListData.push(this.waitInquiryList[i].baseList[j]);
          }
        }
      }
      this.waitInquiryList.allCheck = !this.waitInquiryList.allCheck;
      this.waitInquiryList = Object.assign([], this.waitInquiryList);
    },
    allShow() {
      let checkedShow = true;
      let subCheckShow = true;
      let k = 0;
      for (var i = 0; i < this.waitInquiryList.length; i++) {
        for (var j = 0; j < this.waitInquiryList[i].baseList.length; j++) {
          if (this.waitInquiryList[i].subCheck == false) {
            checkedShow = true;
            subCheckShow = true;
            k = i;
          }
          if (this.waitInquiryList[i].baseList[j].itemCheck == false) {
            checkedShow = false;
            subCheckShow = false;
            k = i;
          }
        }
      }
      this.waitInquiryList[k].subCheck = subCheckShow;
      this.waitInquiryList.allCheck = checkedShow;
      this.waitInquiryList = Object.assign([], this.waitInquiryList);
    },
    focusOn(val) {
      var obj = {
        favour_type: "1",
        goods_id: val.id,
        catergory_id: val.classificationId
      };
      axios
        .request({ ...shoppingCar.insertGoodsFavourite, params: obj })
        .then(res => {
          console.log(res);
          if (res.resultCode == 200) {
            this.$message.success("关注成功");
            this.getInquiry();
          }
        });
    },
    inquiryDelete(val) {
      var obj = {
        id: val.bucketId
      };
      axios
        .request({ ...shoppingCar.deleteSigletonShoppingCar, params: obj })
        .then(res => {
          console.log(res);
          if (res.resultCode == 200) {
            this.$message.success("删除成功");
            this.getInquiry();
          }
        });
    },
    currentPage(val) {
      console.log(val);
    },
    change(val) {
      console.log(val);
      this.start = val - 1;
      this.getInquiry();
    },
    applySpecial(val) {
      if(val.priceList){
          val.factorySellerInfo.priceList= val.priceList
      }
      this.$store.dispatch("promation", val);
      this.$router.push("/InquiryBasket/ApplySpecialPrice");
    },
    subSpecial() {
     
      this.$store.dispatch("promation", this.baseListData);
      this.$router.push("/InquiryBasket/ApplySpecialPrice");
    },
    batchApplication() {
      this.$store.dispatch("promation", this.baseListData);
      this.$router.push("/InquiryBasket/ApplySpecialPrice");
    }
  }
};
</script>

<style lang="less" scoped>
.noData {
  width: 100%;
  height: 500px;
  text-align: center;
  line-height: 500px;
}
.checkAll {
  width: 100%;
  box-sizing: border-box;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #eee;
  .allBtn {
    > span {
      width: 18px;
      height: 18px;
      border: 1px solid rgba(102, 102, 102, 1);
      margin-right: 12px;
      > img {
        vertical-align: top;
      }
      &:nth-of-type(2) {
        width: auto;
        border: none;
        font-size: 14px;
        line-height: 25px;
        height: 25px;
        color: rgba(51, 51, 51, 1);
        margin-left: 12px;
      }
      &:nth-of-type(3) {
        vertical-align: top;
        width: auto;
        border: none;
        height: 25px;
        margin-left: 12px;
      }
    }
    
  }
  .allNum {
    span {
      font-size: 14px;
      color: #333333;
    }
    
    .batchBtn{
      margin-left:30px;
    }
  }
}
.inquiryList {
  background: #eee;
  .listCheck {
    width: 100%;
    background-color: #fff;
    min-height: 100%;
    margin-bottom: 20px;
    .checkSub {
      width: 100%;
      padding: 0 20px;
      line-height: 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      font-size:14px;
      color:#333!important;
      .allBtn {
        > span {
          &.check{
            width: 12px;
            height: 12px;
            border: 1px solid rgba(102, 102, 102, 1);
            margin-right: 12px;
            > img {
              vertical-align: top;
              width:13px;
            }
          }
        }
      }
      .allNum {
        .batchBtn {
          margin-left:30px;
        }
      }
    }
    .listContent {
      display: flex;
      padding: 20px;
      border-bottom:1px solid #ddd;
      align-items: center;
      background:#fff;
      margin-bottom:5px;
      &:hover {
        box-shadow: 0 0 10px 5px #ddd;
      }
      .itemCheck {
        .wrap{
          width: 12px;
          height: 12px;
          border: 1px solid rgba(201, 201, 201, 1);
          > img {
            width:13px;
            vertical-align: top;
          }
        }
        }
      .goodsImg {
        width: 190;
        margin-right: 34px;
        text-align: center;
        margin-left:15px;
        /deep/.ImgE{
          width:100%;
          height:100%;
          position: relative;
          &:after{
            display:block;
            content:"";
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.05);
            position: absolute;
            z-index:1;
            top:0;
            left:0;
          }
          img{
            width:90%;
            height:90%;
          }
        }
      }
      .goodsDetail {
        display: flex;
        flex:1;
        text-align: center;
        align-items: center;
        .googsDesc {
          width: 50%;
          text-align:left;
          > h3 {
            font-size: 20px;
            font-family: PingFangSC-Semibold;
            font-weight: bolder;
            margin-bottom:10px;
          }
          > h4 {
            font-size: 18px;
            color:#333;
            margin-bottom:10px;
          }
          > p {
            &:nth-of-type(1) {
              font-size: 16px;
              color: rgba(153, 153, 153, 1);
              margin-bottom:15px;
            }
            &:nth-of-type(2) {
              > span {
                &:nth-of-type(1) {
                  font-size: 16px;
                  color: rgba(102, 102, 102, 1);
                  margin-right: 10px;
                }
                &:nth-of-type(2) {
                  font-size: 18px;
                  color: rgba(242, 46, 46, 1);
                }
              }
            }
          }
        }
        .goodPrice {
          width:25%;
          h3 {
            width: 100%;
            text-align: center;
            font-size: 20px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            margin-bottom: 15px;
          }
          > li {
            margin-bottom: 20px;
            color: rgba(232, 232, 232, 1);
            span {
              &:nth-of-type(1) {
                font-size: 18px;
                color: rgba(102, 102, 102, 1);
                margin-right: 24px;
              }
              &:nth-of-type(2) {
                font-size: 18px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(242, 46, 46, 1);
                margin-left: 24px;
              }
            }
          }
        }
        .goodEdit{
          width:25%;
          text-align: right;
          button{
            width:70px;
            margin-bottom:10px;
          }
        }
      }
    }
  }
}
</style>
