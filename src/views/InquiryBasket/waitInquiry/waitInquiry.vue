<template>
  <div>
    <div class="checkAll">
      <div class="allBtn">
        <span></span>
        全选
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
      <ul class="listCheck">
        <div class="checkAll">
          <div class="allBtn">
            <span></span>
            罗期斯特电子（RE）
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

        <li class="listContent" v-for="(item,index) in 6" :key="index">
          <div class="itemCheck">
             
          </div>
          <div class="goodsImg">
            <div></div>
            <div>
              <li></li>
              <li></li>
              <li></li>
            </div>
          </div>
          <div class="goodsDetail">
            <div class="googsDesc">
              <h3>CDHDFJHKS-234J</h3>
              <h4>品牌：罗琦斯特电子</h4>
              <p>基本参数：DIP 盒子 1/8W 100-15</p>
              <p>
                型号描述：The 77219-7PPSG is an Iusdjying should
                washer made of 40% glass filled podjskdjene sulfid
                e（PPS）body. Its recommended。
              </p>
              <p>
                <span>共有3个供应商报价</span>
                <span>￥25 ------ ￥25</span>
              </p>
            </div>
            <div class="goodPrice">
              <h3>原厂报价</h3>
              <li>
                <span>1000+</span> -------
                <span>￥3.5</span>
              </li>
              <li>
                <span>1000+</span> -------
                <span>￥3.5</span>
              </li>
              <li>
                <span>1000+</span> -------
                <span>￥3.5</span>
              </li>
              <li>
                <span>1000+</span> -------
                <span>￥3.5</span>
              </li>
            </div>
            <div class="goodEdit">
              <el-button class="attention">+ 关注</el-button>
              <el-button class="special">申请特价</el-button>
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
export default {
  data() {
    return {};
  },
  mounted() {
    this.getInquiry();
  },
  methods: {
    getInquiry() {
      var obj = {
        start: 0,
        length: 10,
        source: "2"
      };
      axios.request({ ...shoppingCar.inquiryList, params: obj }).then(res => {
        console.log(res);
        if (res.resultCode == "200") {
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.checkAll {
  width: 100%;
  margin-bottom: 48px;
  display: flex;
  justify-content: space-between;
  .allBtn {
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
    > span {
      width: 18px;
      height: 18px;
      border: 1px solid rgba(102, 102, 102, 1);
      vertical-align: middle;
      margin-right: 12px;
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
      .itemCheck {
        width: 18px;
        height: 18px;
        border: 1px solid rgba(201, 201, 201, 1);
      }
      .goodsImg {
        min-width: 166px;
        margin-right: 34px;
        > div {
          &:nth-of-type(1) {
            width: 166px;
            height: 152px;
            background: rgba(232, 232, 232, 1);
          }
          &:nth-of-type(2) {
            width: 166px;
            height: 38px;
            margin: 6px 0;
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
        .googsDesc {
          width: 40%;
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
              color: rgba(102, 102, 102, 1);
            }
            &:nth-of-type(2) {
              font-size: 16px;
              color: rgba(153, 153, 153, 1);
              margin: 16px 0;
            }
            &:nth-of-type(3) {
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
          margin: 0 76px 0 50px;
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
