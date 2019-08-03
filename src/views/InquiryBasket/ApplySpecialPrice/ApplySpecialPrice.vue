<template>
  <!-- 申请特价 -->
  <div class="ApplySpecialPrice">
    <div class="wrapper">
      <p class="tit">申请特价</p>
      <!-- 商品价格信息 -->
      <div class="special-price" v-if="topShow">
        <div class="product-msg">
          <div class="product-msg-img">
            <img src="@/assets/image/inquirybasket/_u11948.png" alt />
            <span class="attention">-已关注</span>
          </div>
          <div class="product-msg-text">
            <p class="name">{{proInformation.productno}}</p>
            <P>
              <label>品牌：</label>
              {{proInformation.brand}}
            </P>
            <p>
              <label>型号描述：</label>
              {{proInformation.productdesc}}
            </p>

            <p>
              共有
              <span class="num">{{proInformation.map.totalSeller}}</span>
              个供应商报价
              <span
                v-if="proInformation.map.totalSeller != 0"
                class="num"
              >￥2.5——￥4.0</span>
            </p>
          </div>
          <div class="LadderPrice" v-if="proInformation.factorySellerInfo.price_level != undefined">
            <p class="tit">原厂报价</p>
            <div class="LadderPrice-list">
              <div v-for="(item, k) in proInformation.ladderPrice" :key="k">
                <span>{{item.num}}+</span>
                <span>￥{{item.price}}</span>
              </div>
            </div>
          </div>
          <div v-if="proInformation.factorySellerInfo.price_level == undefined" class="LadderPrice">
            <p class="tit" style="text-align: center">原厂报价</p>
            <div class="LadderPrice-list">
              <p style="text-align: center">暂无原厂报价</p>
            </div>
          </div>
        </div>
        <div class="brans-msg">
          <img :src="proInformation.brandImageUrl" class="bd-img" alt />
          <p>{{proInformation.brand}}</p>
          <p>
            <!-- <span>
              <img src="@/assets/image/inquirybasket/u4858.png" alt />
              已入驻芯手网
            </span>-->
          </p>
        </div>
      </div>
      <!-- 申请信息 -->
      <div class="apply-inform">
        <p class="tit">填写特价申请信息</p>
        <el-form :model="formAlign" :rules="rules" ref="formAlign" label-width="110px">
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model="formAlign.companyName"></el-input>
          </el-form-item>
          <el-form-item label="公司网址" prop="companyHttp">
            <el-input v-model="formAlign.companyHttp"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="formAlign.projectName"></el-input>
          </el-form-item>
          <el-form-item label="产品阶段" prop="productPhase">
            <el-input v-model="formAlign.productPhase"></el-input>
          </el-form-item>
          <el-form-item label="预计量产时间" prop="projectBeginTime">
            <div class="product-time">
              <el-date-picker v-model="formAlign.projectBeginTime" type="month" placeholder="选择年月"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item v-if="topShow" class="acceptPrice" label="接受价格" prop="price">
            <el-input placeholder="请输入价格" v-model="formAlign.price" class="input-with-select">
              <span slot="prepend" v-if="formAlign.priceType==1">￥</span>
              <span slot="prepend" v-else>$</span>
              <el-select
                v-model="formAlign.priceType"
                slot="append"
                placeholder="请选择"
                @change="selectChange"
              >
                <el-option :label="'人民币'" :value="1"></el-option>
                <el-option :label="'美元'" :value="2"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item v-if="topShow" label="年采购量" class="purchaseAmount" prop="amountPurchased">
            <el-input
              placeholder="请输入采购量"
              v-model="formAlign.amountPurchased"
              class="input-with-select unit"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人" class="contact" prop="user">
            <el-input v-model="formAlign.user" placeholder="姓名"></el-input>
            <span slot="append">K</span>
          </el-form-item>
          <el-form-item label="职位" class="contact" prop="position">
            <el-input v-model="formAlign.position" placeholder="姓名"></el-input>
            <span slot="append">K</span>
          </el-form-item>
          <el-form-item label="电话" class="contact" prop="telephone">
            <el-input v-model="formAlign.telephone" placeholder="请输入内容" type="number"></el-input>
            <span slot="append">K</span>
          </el-form-item>
          <el-form-item label="备注说明" class="contact" prop="remark">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formAlign.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="!topShow" class="moreInquiry">
        <p>填写商品采购信息</p>
        <div class="inquiryList">
          <ul class="listCheck">
            <li class="listContent" v-for="(listItem,index) in productData" :key="index">
              <div class="goodsImg">
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
                <div class="edit">
                  <el-form
                    :model="listItem"
                    :rules="editPriceRules"
                    ref="editPrice"
                    label-width="80px"
                  >
                    <el-form-item class="acceptPrice" label="接受价格" prop="price">
                      <el-input
                        placeholder="请输入价格"
                        v-model="listItem.price"
                        class="input-with-select"
                      >
                        <span slot="prepend" v-if="listItem.priceType==1">￥</span>
                        <span slot="prepend" v-else>$</span>
                        <el-select
                          v-model="listItem.priceType"
                          slot="append"
                          placeholder="请选择"
                          @change="listChange(index)"
                        >
                          <el-option :label="'人民币'" :value="1"></el-option>
                          <el-option :label="'美元'" :value="2"></el-option>
                        </el-select>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="年采购量" class="purchaseAmount" prop="amountPurchased">
                      <el-input
                        placeholder="请输入采购量"
                        @input="listChange"
                        v-model="listItem.amountPurchased"
                        class="input-with-select unit"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="竞争型号" class="contact" prop="insteadNo">
                      <el-input
                        @input="listChange"
                        placeholder="请输入内容"
                        v-model="listItem.insteadNo"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="keep">
        <el-checkbox v-model="checked">下次自动填充本次填写的信息</el-checkbox>
      </div>

      <div class="submit">
        <el-button class="submitBtn" type="primary" @click="commitSprice">提交特价申请信息</el-button>
        <p style="margin-bottom:20px">特价申请有效期将为6个月，您可以在询价篮产看状态</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { axios, shoppingCar } from "@/api/apiObj";
import { formatAllDate } from "@/lib/utils";
import { type } from "os";
export default {
  name: "ApplySpecialPrice",
  data() {
    return {
      formAlign: {
        companyName: "",
        companyHttp: "",
        projectName: "",
        productPhase: "",
        user: "",
        telephone: "",
        price: "",
        priceType: 1,
        remark: "",
        projectBeginTime: "",
        amountPurchased: "",
        position: ""
      },
      rules: {
        companyName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" }
        ],
        companyHttp: [
          { required: true, message: "网址不能为空", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        productPhase: [
          { required: true, message: "产品不能为空", trigger: "blur" }
        ],
        user: [{ required: true, message: "联系人不能为空", trigger: "blur" }],
        telephone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,

            message: "格式不正确",

            trigger: "blur"
          }
        ],
        price: [
          { required: true, message: "接受价格不能为空", trigger: "blur" }
        ],
        projectBeginTime: [
          { required: true, message: "预计量产时间不能为空", trigger: "blur" }
        ],
        amountPurchased: [
          { required: true, message: "年采购量不能为空", trigger: "blur" }
        ],
        position: [
          { required: true, message: "职位不能不能为空", trigger: "blur" }
        ]
      },
      editPriceRules: {},
      topShow: false,
      checked: true,
      productData: []
    };
  },
  computed: {
    ...mapGetters(["proInformation"])
  },
  mounted() {
    if (this.proInformation.length) {
      this.topShow = false;
      for (var i = 0; i < this.proInformation.length; i++) {
        this.proInformation[i]["priceType"] = 1;
        this.proInformation[i]["price"] = "";
        this.proInformation[i]["amountPurchased"] = "";
        this.proInformation[i]["insteadNo"] = "";
      }
      this.productData = this.proInformation;
    } else {
      console.log("2");
      this.topShow = true;
    }
  },
  methods: {
    commitSprice() {
      this.$refs.formAlign.validate(valid => {
        if (valid) {
          console.log(projectBeginTime);
          if (this.topShow) {
            var projectBeginTime = formatAllDate(
              this.formAlign.projectBeginTime,
              "/"
            )[1];
            var obj = {
              projectName: this.formAlign.projectName,
              projectProcess: this.formAlign.productPhase,
              projectBeginTime: projectBeginTime,
              projectEau: this.formAlign.amountPurchased,
              acceptPrice: this.formAlign.price,
              companyName: this.formAlign.companyName,
              website: this.formAlign.companyHttp,
              contactName: this.formAlign.user,
              position: this.formAlign.position,
              telphone: this.formAlign.telephone,
              remark: this.formAlign.remark,
              defaultConfig: this.checked,
              brandId: this.proInformation.brandId,
              goodsName: this.proInformation.productno,
              requestId: this.proInformation.id
            };
            axios
              .request({ ...shoppingCar.saveInquiry, params: obj })
              .then(res => {
                console.log(res);
                if (res.resultCode == "200") {
                  this.$message.success("提交成功");
                  this.$roter.push("/InquiryBasket/Inquiry");
                }
              });
          } else {
            var projectBeginTime = formatAllDate(
              this.formAlign.projectBeginTime,
              "-"
            )[1];
            console.log(this.proInformation);
            var infoData = [];
            this.proInformation.forEach(element => {
              console.log(element);
              infoData.push({
                requestId: element.id,
                acceptPrice: element.price,
                projectEau: element.amountPurchased,
                insteadNo: element.insteadNo,
                goodsName: element.productno,
                brandId: element.brandId
              });
            });
            var orderData = JSON.stringify(infoData);
            var obj = {
              projectName: this.formAlign.projectName,
              projectProcess: this.formAlign.productPhase,
              projectBeginTime: projectBeginTime,
              companyName: this.formAlign.companyName,
              website: this.formAlign.companyHttp,
              contactName: this.formAlign.user,
              position: this.formAlign.position,
              telphone: this.formAlign.telephone,
              remark: this.formAlign.remark,
              defaultConfig: this.checked,
              order: orderData
            };
            axios
              .request({ ...shoppingCar.saveBatchInquiry, data: obj })
              .then(res => {
                console.log(res);
                if (res.resultCode == "200") {
                  this.$message.success("提交成功");
                  this.$roter.push("/InquiryBasket/Inquiry");
                }
              });
          }
        }
      });
    },
    selectChange(e) {
      console.log(this.priceType);
    },
    listChange(index) {
      this.productData = Object.assign([], this.productData);
    },
    showChange() {
      console.log("11");
      this.proInformation = Object.assign([], this.proInformation);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./ApplySpecialPrice.less";
</style>

<style lang="less" scoped >
.moreInquiry {
  float: left;
  width: 100%;
  > p {
    width: 100%;
    line-height: 80px;
    text-align: center;
    font-size: 28px;
    color: #999;
    margin-bottom: 20px;
    font-weight: bold;
    background-color: rgba(222, 227, 233, 1);
  }
}
.el-input-group__append {
  width: 50px;
  color: #999;
}
.unit .el-input-group__append {
  width: 10px;
  color: #999;
}
.purchaseAmount {
  position: relative;
  overflow: initial !important;
  margin-bottom: 30px !important;
}
.purchaseAmount .desc {
  position: absolute;
  font-size: 14px;
  left: 180px;
  bottom: -18px;
  color: #ff9900;
}
.el-input__inner,
.el-textarea__inner,
.el-input-group__append,
.el-input-group__prepend {
  border-color: #999;
  color: #999;
}
// 记住操作
.keep {
  .el-checkbox {
    width: 100%;
    text-align: center;
    .el-checkbox__input {
      .el-checkbox__inner {
        width: 23px;
        height: 23px;
        border-color: #999;
        &:after {
          height: 13px;
          left: 8px;
          top: 0;
          border-width: 3px;
        }
      }
      &.is-checked {
        .el-checkbox__inner {
          border-color: #dcdfe6;
        }
      }
    }

    .el-checkbox__label {
      font-size: 20px;
    }
  }
}
.inquiryList {
  .listCheck {
    width: 100%;
    height: auto;
    .listContent {
      display: flex;
      padding: 0 30px;
      box-sizing: border-box;
      .goodsImg {
        width: 240px;
        margin-right: 34px;
        > div {
          &:nth-of-type(1) {
            width: 166px;
            height: 152px;
            background: rgba(232, 232, 232, 1);
            > img {
              width: 100%;
            }
          }
          &:nth-of-type(2) {
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
          min-width: 350px;
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

