<template>
  <div>
    <div class="checkAll">
      <div class="allBtn">
        <span>
          <img src="@/assets/image/inquirybasket/checked.png" alt />
        </span>
        <span>全选</span>
      </div>
      <div class="allNum">
        <span>
          总计已选
          <strong>0</strong> 件商品
        </span>
        <span class="batchBtn">批量申请</span>
        <img src="@/assets/image/inquirybasket/delete.png" alt />
      </div>
    </div>
    <div class="inquiryList">
      <ul class="listCheck" v-for="(item,index) in waitInquiryList" :key="index">
        <div class="checkAll">
          <div class="allBtn">
            <span @click="allCheck(item)">
              <img v-if="item.allCheck == true" src="@/assets/image/inquirybasket/checked.png" alt />
            </span>
            <span>{{item.sellerName}}</span>
            <span>
              <img :src="item.sellerUrl + '?imageView2/2/w/80/h/80'" alt />
            </span>
          </div>
          <div class="allNum">
            <span>
              已选该商品
              <strong>0</strong> 件商品
            </span>
            <span class="batchBtn">申请特价</span>
            <img src="@/assets/image/inquirybasket/delete.png" alt />
          </div>
        </div>

        <li class="listContent" v-for="(listItem,index) in item.baseList" :key="index">
          <div class="goodsImg">
            <div @click="listItemCheck(listItem)" class="itemCheck">
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
              <!-- <p>基本参数：DIP 盒子 1/8W 100-15</p> -->
              <p>型号描述：{{listItem.productdesc}}</p>
              <p>
                <span>共有{{listItem.map.totalSeller}}个供应商报价</span>
                <span
                  v-if="listItem.map.totalSeller != 0"
                >￥{{listItem.map.minPrice | pointTwo(listItem.map.minPrice)}} ------ ￥{{listItem.map.maxPrice | pointTwo(listItem.map.maxPrice)}}</span>
              </p>
            </div>
            <div class="goodPrice">
              <h3>原厂报价</h3>
              <li
                v-if="listItem.factorySellerInfo.price_level != undefined"
                v-for="(subitem,index) in listItem.ladderPrice"
                :key="index"
              >
                <span>{{subitem.num}}+</span> -------
                <span>￥{{subitem.price}}</span>
              </li>
              <li v-if="listItem.factorySellerInfo.price_level == undefined">
                <p style="text-align: center">暂无原厂报价</p>
              </li>
            </div>
            <div class="goodEdit">
              <el-button class="attention">+ 关注</el-button>
              <el-button class="special" @click="applySpecial(listItem)">申请特价</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <IndexPagination />
  </div>
</template>

<script>
import "./waitInquiry.less";
import { axios, shoppingCar } from "@/api/apiObj";
import { ladderPrice } from "@/lib/utils";
export default {
  data() {
    return {
      waitInquiryList: [],
      factorySale: [],
      baseListData: []
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
        start: 0,
        length: 10,
        source: "2"
      };
      axios.request({ ...shoppingCar.inquiryList, params: obj }).then(res => {
        if (res.resultCode == "200") {
          this.waitInquiryList = res.data.data;
          this.factorySale = [];
          for (var i = 0; i < this.waitInquiryList.length; i++) {
            this.waitInquiryList[i]["allCheck"] = false;
            this.waitInquiryList[i]["subCheck"] = false;
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
    listItemCheck(val) {
      this.$nextTick(() => {
        val.itemCheck = !val.itemCheck;
      });
      console.log(val);
    },
    allCheck(val) {
      console.log(val);
      val.subCheck = !val.subCheck;
    },
    applySpecial(val) {
      console.log(val);
     this.$store.dispatch('promation',val)
      this.$router.push("/InquiryBasket/ApplySpecialPrice");
    }
  }
};
</script>

<style lang="less" scoped>
.checkAll {
  width: 100%;
  margin-bottom: 48px;
  margin-top: 60px;
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
  .listCheck {
    width: 100%;
    height: auto;
    .listContent {
      display: flex;
      .goodsImg {
        width: 240px;
        margin-right: 34px;
        .itemCheck {
          width: 18px;
          height: 18px;
          margin-right: 48px;
          margin-top: 80px;
          border: 1px solid rgba(201, 201, 201, 1);
        }
        > div {
          float: left;
          &:nth-of-type(2) {
            width: 166px;
            height: 152px;
            background: rgba(232, 232, 232, 1);
            > img {
              width: 100%;
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
        margin-bottom: 52px;
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
        .goodEdit {
        }
      }
    }
  }
}
</style>
