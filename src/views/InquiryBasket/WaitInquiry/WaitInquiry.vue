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
          总计已选
          <strong>{{allNum}}</strong> 件商品
        </span>
        <span class="batchBtn" @click="batchApplication">批量申请</span>
        <!-- <img src="@/assets/image/inquirybasket/delete.png" alt /> -->
      </div>
    </div>
    <div class="inquiryList">
      <ul class="listCheck" v-for="(item,k) in waitInquiryList" :key="k">
        <div class="checkSub">
          <div class="allBtn">
            <span @click="subCheck(k,item)">
              <img v-if="item.subCheck == true" src="@/assets/image/inquirybasket/checked.png" alt />
            </span>
            <span>{{item.sellerName}}</span>
            <span>
              <img :src="item.sellerUrl + '?imageView2/2/w/80/h/80'" alt />
            </span>
          </div>
          <div class="allNum">
            <span>
              已选该商品
              <strong>{{item.subNum}}</strong> 件商品
            </span>
            <span class="batchBtn" @click="subSpecial">申请特价</span>
            <!-- <img src="@/assets/image/inquirybasket/delete.png" alt /> -->
          </div>
        </div>

        <li class="listContent" v-for="(listItem,index) in item.baseList" :key="index">
          <div class="goodsImg">
            <div @click="listItemCheck($event,k,index,listItem)" class="itemCheck">
              <img
                v-if="listItem.itemCheck == true"
                src="@/assets/image/inquirybasket/checked.png"
                alt
              />
            </div>
            <div>
              <img :src="listItem.imageUrl " alt />
            </div>
          </div>
          <div class="goodsDetail">
            <div class="googsDesc">
              <h3>{{listItem.productno}}</h3>
              <h4>品牌：{{listItem.brand}}</h4>
              <el-button
                class="attention"
                @click="focusOn(listItem)"
                v-if="listItem.focus == false"
              >+ 关注</el-button>
              <el-button
                class="alredyAtten"
                :disabled="disabled"
                v-if="listItem.focus == true"
              >+ 已关注</el-button>
              <!-- <p>基本参数：DIP 盒子 1/8W 100-15</p> -->
              <p>型号描述：{{listItem.productdesc}}</p>
              <p>
                <span>共有{{listItem.map.totalSeller}}个供应商报价</span>
                <span
                  v-if="listItem.map.totalSeller != 0"
                >￥{{listItem.map.minPrice}} ------ ￥{{listItem.map.maxPrice}}</span>
              </p>
            </div>
            <div class="goodPrice">
              <h3 v-if="listItem.factorySellerInfo.price_level != undefined">原厂报价</h3>
              <li
                v-if="listItem.factorySellerInfo.price_level != undefined"
                v-for="(subitem,index) in listItem.ladderPrice"
                :key="index"
              >
                <span>{{subitem.num}}+</span> -------
                <span>￥{{subitem.price}}</span>
              </li>
              <li style="height:100%" v-if="listItem.factorySellerInfo.price_level == undefined">
                <p style="text-align: center;height:100%;line-height:200px;color:#d5d5d5;">暂无原厂报价</p>
              </li>
            </div>
            <div class="goodEdit">
              <img
                @click="inquiryDelete(listItem)"
                style="float:right;cursor: pointer;"
                src="@/assets/image/inquirybasket/delete.png"
                alt
              />
              <el-button class="special" @click="applySpecial(listItem)">申请特价</el-button>
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
  data() {
    return {
      waitInquiryList: [],
      factorySale: [],
      baseListData: [],
      allNum: 0,
      disabled: true,
      total:0,
      start:0
    };
  },
  inject: ["reload"],
  mounted() {
    this.getInquiry();
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
          this.total = res.data.total
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
                  "ladderPrice"
                ] = this.factorySale;
              }
            }
          }
        }
      });
    },
    listItemCheck(e, k, index) {
      this.waitInquiryList[k].baseList[index].itemCheck = !this.waitInquiryList[
        k
      ].baseList[index].itemCheck;
      if (this.waitInquiryList[k].baseList[index].itemCheck == true) {
        this.allNum++;
        this.waitInquiryList[k].subNum++;
        this.baseListData.push(this.waitInquiryList[k].baseList[index]);
      } else {
        this.allNum--;
        this.waitInquiryList[k].subNum--;
        this.baseListData.splice(k, 1);
      }
      console.log(this.baseListData);
      this.waitInquiryList = Object.assign([], this.waitInquiryList);
      this.allShow();
    },
    subCheck(k, val) {
      if (this.waitInquiryList[k].subCheck == true) {
        this.waitInquiryList[k].subNum = 0;
        for (var j = 0; j < this.waitInquiryList[k].baseList.length; j++) {
          this.waitInquiryList[k].baseList[j].itemCheck = false;
          this.allNum--;
          this.baseListData.splice(k, 1);
        }
      } else {
        this.waitInquiryList[k].subNum = 0;
        for (var j = 0; j < this.waitInquiryList[k].baseList.length; j++) {
          this.waitInquiryList[k].baseList[j].itemCheck = true;
          this.waitInquiryList[k].subNum++;
          this.allNum++;
          this.baseListData.push(this.waitInquiryList[k].baseList[j]);
        }
      }
      console.log(this.baseListData);
      this.waitInquiryList[k].subCheck = !this.waitInquiryList[k].subCheck;
      this.waitInquiryList = Object.assign([], this.waitInquiryList);
      this.allShow();
    },
    allCheck() {
      this.allNum = 0;
      this.baseListData = [];
      if (this.waitInquiryList.allCheck == true) {
        this.allNum = 0;
        for (var i = 0; i < this.waitInquiryList.length; i++) {
          this.waitInquiryList[i].subCheck = false;
          this.waitInquiryList[i].subNum = 0;
          for (var j = 0; j < this.waitInquiryList[i].baseList.length; j++) {
            this.waitInquiryList[i].baseList[j].itemCheck = false;
          }
        }
      } else {
        this.baseListData = [];
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
      console.log(this.baseListData);
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
      console.log(val);
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
      deleteSigletonShoppingCar;
    },
    currentPage(val) {
      console.log(val);
    },
    change(val) {
      console.log(val);
      this.start = val -1
      this.getInquiry()
    },
    applySpecial(val) {
      console.log(val);
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
  padding: 20px 42px;
  box-sizing: border-box;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
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
        font-size: 20px;
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
      font-size: 18px;
      color: #333333;
      > strong {
        font-size: 24px;
        color: #f22e2e;
      }
    }
    .batchBtn {
      margin: 0 42px 0 86px;
      font-size: 18px;
      color: rgba(102, 102, 102, 1);
      cursor: pointer;
      &:hover {
        color: rgba(77, 154, 243, 1);
      }
    }
  }
}
.inquiryList {
  background: #eee;
  .listCheck {
    width: 100%;
    background-color: #eee;
    min-height: 100%;
    padding-bottom: 50px;
    margin-bottom: 20px;
    overflow: hidden;
    .checkSub {
      width: 100%;
      padding: 30px 42px;
      box-sizing: border-box;
      display: flex;
      background-color: #fff;
      margin-top: 20px;
      justify-content: space-between;
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
            font-size: 20px;
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
          font-size: 18px;
          color: #333333;
          > strong {
            font-size: 24px;
            color: #f22e2e;
          }
        }
        .batchBtn {
          margin: 0 42px 0 86px;
          font-size: 18px;
          color: rgba(102, 102, 102, 1);
          cursor: pointer;
          &:hover {
            color: rgba(77, 154, 243, 1);
          }
        }
      }
    }
    .listContent {
      display: flex;
      padding: 20px 42px;
      width: 95%;
      margin: 0 auto 20px;
      box-sizing: border-box;
      background-color: #fff;
      &:hover {
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);
      }
      .goodsImg {
        width: 265px;
        margin-right: 34px;
        line-height: 158px;
        .itemCheck {
          width: 18px;
          height: 18px;
          margin-right: 25px;
          margin-top: 125px;
          border: 1px solid rgba(201, 201, 201, 1);
          > img {
            vertical-align: middle;
          }
        }
        > div {
          float: left;
          height: 100%;

          &:nth-of-type(2) {
            width: 166px;
            height: 100%;
            padding: 50px 0;
            box-sizing: border-box;
            > img {
              width: 100%;
              vertical-align: middle;
            }
          }
          &:nth-of-type(3) {
            width: 166px;
            height: 38px;
            margin: 6px 0 6px 68px;
            display: flex;
            justify-content: space-between;
            > li {
              width: 38px;
              height: 38px;
              border: 1px solid rgba(224, 224, 224, 1);
            }
          }
        }
      }
      .goodsDetail {
        display: flex;
        border-bottom: 1px solid rgba(232, 232, 232, 1);
        margin-bottom: 10px;
        min-height: 210px;
        .googsDesc {
          width: 50%;
          > h3 {
            font-size: 20px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(244, 86, 24, 1);
          }
          > h4 {
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
            margin: 18px 0;
          }
          > p {
            &:nth-of-type(1) {
              font-size: 16px;
              color: rgba(153, 153, 153, 1);
              margin: 16px 0;
            }
            &:nth-of-type(2) {
              > span {
                &:nth-of-type(1) {
                  font-size: 16px;
                  color: rgba(102, 102, 102, 1);
                  margin-right: 38px;
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
          padding: 0 76px 0 50px;
          box-sizing: border-box;
          width: 26%;
          min-width: 333px;
          > h3 {
            width: 100%;
            text-align: center;
            font-size: 20px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(77, 154, 243, 1);
            margin-bottom: 33px;
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
      }
    }
  }
}
</style>
