<template>
  <!-- 申请特价 -->
  <div class="ApplySpecialPrice">
    <div class="wrapper">
      <p class="tit">申请特价</p>
      <!-- 商品价格信息 -->
      <div class="special-price">
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
            <P>
              <label>型号描述：</label>
             {{proInformation.productdesc}}
            </p>
            <p>
              共有
              <span class="num">{{proInformation.map.totalSeller}}</span>
              个供应商报价
              <span v-if="proInformation.map.totalSeller != 0" class="num">￥2.5——￥4.0</span>
            </p>
          </div>
           <div class="LadderPrice" v-if="proInformation.factorySellerInfo.price_level != undefined">
              <p class="tit">
                原厂报价
              </p>
              <div   class="LadderPrice-list">
                <div v-for="(item, k) in proInformation.ladderPrice" :key="k">
                  <span>{{item.num}}+</span>
                  <span>￥{{item.price}}</span>
                </div>
              </div>
            </div>
             <div v-if="proInformation.factorySellerInfo.price_level == undefined"   class="LadderPrice">
              <p class="tit" style="text-align: center">
                原厂报价
              </p>
              <div class="LadderPrice-list">
              <p style="text-align: center">暂无原厂报价</p>
              </div>
            </div>
        </div>
        <div class="brans-msg">
          <img src="@/assets/image/inquirybasket/u11383.png" class="bd-img" alt />
          <p>罗彻斯特电子(电子)</p>
          <p class="tag">
            <span>
              <img src="@/assets/image/inquirybasket/u4858.png" alt />
              已入驻芯手网
            </span>
          </p>
        </div>
      </div>
      <!-- 申请信息 -->
      <div class="apply-inform">
        <p class="tit">填写特价申请信息</p>
        <div class="form">
          <div>
            <label for>公司名称</label>
            <el-input v-model="form.companyName"></el-input>
          </div>
          <div>
            <label for>公司网址</label>
            <el-input v-model="form.companyName"></el-input>
          </div>
          <div>
            <label for>项目名称</label>
            <div>
              <el-input v-model="form.companyName"></el-input>
            </div>
          </div>
          <div>
            <label for>产品阶段</label>
            <div>
              <el-input v-model="form.companyName"></el-input>
            </div>
          </div>
          <div>
            <label for>预计量产时间</label>
            <div class="product-time">
              <el-date-picker v-model="month" type="month" placeholder="选择年月"></el-date-picker>
            </div>
          </div>
          <div class="acceptPrice">
            <label for>接受价格</label>
            <el-input placeholder="请输入价格" v-model="form.price" class="input-with-select">
              <span slot="prepend" v-if="form.priceType==1">￥</span>
              <span slot="prepend" v-else>$</span>
              <el-select
                v-model="form.priceType"
                slot="append"
                placeholder="请选择"
                @change="selectChange"
              >
                <el-option :label="'人民币'" :value="1"></el-option>
                <el-option :label="'美元'" :value="2"></el-option>
              </el-select>
            </el-input>
          </div>
          <div class="purchaseAmount">
            <label for>年采购量</label>
            <el-input placeholder="请输入采购量" v-model="form.price" class="input-with-select unit">
              <span slot="append">K</span>
            </el-input>
            <p class="desc">最小采购量为年用量的十分之一</p>
          </div>
          <div>
            <label for>联系人</label>
            <div class="contact">
              <el-input v-model="form.name" placeholder="姓名"></el-input>
            </div>
            <label for>电话</label>
            <div class="contact">
              <el-input v-model="form.telephone" placeholder="请输入内容" type="number"></el-input>
            </div>
          </div>
          <div>
            <label for>备注说明</label>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="remark"></el-input>
          </div>
          <div class="keep">
            <el-checkbox v-model="checked">下次自动填充本次填写的信息</el-checkbox>
          </div>
        </div>

        <div class="submit">
          <div class="submitBtn">提交特价申请信息</div>
          <p>特价申请有效期将为6个月，您可以在询价篮产看状态</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ApplySpecialPrice",
  data() {
    return {
      form: {
        priceType: 1
      },
      remark: "",
      year: "",
      month: "",
      checked: true,
      priceData: {}
    };
  },
  computed: {
    ...mapGetters(["proInformation"])
  },
  mounted() {
  console.log(this.proInformation)
  },
  methods: {
    selectChange(e) {
      console.log(this.priceType);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./ApplySpecialPrice.less";
</style>

<style lang="less" >
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
    margin-left: 180px;
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
</style>

