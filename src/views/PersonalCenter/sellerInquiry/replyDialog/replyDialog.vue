<template>
  <el-dialog title="批复价格" :visible.sync="dialogVisible" width="50%" :before-close="cancel">
    <div class="SellerIssuesProduct">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="180px"
        class="form-list"
      >
      <el-form-item label="器件状态:">
          <el-radio-group v-model="ruleForm.goods_type" class="defaultradioSquare">
            <el-radio :label="true" :value="true">现货</el-radio>
            <el-radio :label="false" :value="false">订货</el-radio>
          </el-radio-group>
          <p class="desc" v-if="ruleForm.goods_type">现货商品需在买家下单两天内发货</p>
          <p class="desc" v-if="!ruleForm.goods_type">只能一口价，买家下单订货商品时距离交期超过7天，可用预付款方式付款</p>
        </el-form-item>
        <el-form-item label="交货地点：">
          <el-select v-model="ruleForm.diliver_place" placeholder="请选择交货地">
            <el-option
              :value="item.name"
              v-for="item in diliverPlace"
              :key="item.name"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item label="出价方式:">
          <el-radio-group v-model="ruleForm.price_type" class="defaultradioSquare">
            <el-radio :label="true" :value="true" v-if="ruleForm.goods_type">阶梯价</el-radio>
            <el-radio :label="false" :value="false">一口价</el-radio>
          </el-radio-group>
          <p class="desc" v-if="ruleForm.goods_type && ruleForm.price_type">只适合现货，价格降序填写，数量升序填写</p>
          <div class="form-item" v-if="ruleForm.price_type">
            <!-- v-for="(item, k) in SteppedPriceList" :key="k" -->
            <div class="stepped-price" v-for="(item,k) in SteppedPriceListlength" :key="k">
              <div class="steppedItem">
                <label for>数量：</label>
                <el-input
                  @input="changeNum(k)"
                  :placeholder="SteppedPriceListobj['placeholdernum'+k]"
                  :name="k"
                  v-model="SteppedPriceListobj['num'+k]"
                  type="number"
                  :min="SteppedPriceListobj['minnum'+k]"
                  @blur="numblur($event)"
                ></el-input>
              </div>
              <div class="steppedItem">
                <label for>价格：</label>
                <el-input
                  @input="changePrice(k)"
                  :placeholder="SteppedPriceListobj['placeholderprice'+k]"
                  :name="k"
                  v-model="SteppedPriceListobj['price'+k]"
                  :max="SteppedPriceListobj['maxprice'+k]"
                  :min="0"
                  @blur="priceblur($event)"
                >
                  <template slot="prepend">{{priceunitMark}}</template>
                </el-input>
                 <strong v-if="SteppedPriceListobj['price'+k] && !ruleForm.clude_bill && priceunitMark!='$'">含税价为{{SteppedPriceListobj['price'+k] | addPriceFilter}}</strong>
              </div>
            </div>
            <div class="add-stepped-price">
              <p v-if="SteppedPriceListlength === 3" class="color">最多添加三个阶梯价格</p>
              <span @click="resetSteppedPrice" class="reset">重置阶梯价格</span>
            </div>
          </div>
        </el-form-item>
 <el-form-item label="是否含税价:" v-if="priceunitMark!='$'">
          <el-radio-group v-model="ruleForm.clude_bill" class="defaultradioSquare">
            <el-radio :label="true" :value="true">含税</el-radio>
            <el-radio :label="false" :value="false">不含税</el-radio>
          </el-radio-group>
          <p class="desc" v-if="ruleForm.clude_bill">提示：含13%增值税，需要您开具增值税专用发票</p>
          <p class="desc" v-if="!ruleForm.clude_bill">重要提示：若为不含税价，则用户看到的商品价格会在您发布的价格上加价17%</p>
        </el-form-item>
        <el-form-item label="价格：" prop="seckil_price" v-if="ruleForm.price_type === false">
          <el-input v-model="ruleForm.seckil_price" @input="changeSeckil_price" :min="0" style="width:50%"></el-input>
          <strong v-if="ruleForm.seckil_price && !ruleForm.clude_bill && priceunitMark!='$'">含税价为{{ruleForm.seckil_price | addPriceFilter}}</strong>
        </el-form-item>
        
       <el-form-item label="最小订购量MOQ：" prop="moq">
            <el-input v-model="ruleForm.moq" placeholder="此数量为用户可买的最小数量" style="width:50%">
                <template slot="append">只</template>
            </el-input>
        </el-form-item>
        <el-form-item label="最小增量MPQ：" prop="mpq">
            <el-input v-model="ruleForm.mpq" placeholder="客户只能购买这个数量的整数倍+最小订购量" style="width:50%">
                <template slot="append">只</template>
            </el-input>
        </el-form-item>
        <el-form-item label="可卖数量：" prop="stock_count">
            <el-input v-model="ruleForm.stock_count" @input="changeStockCount" placeholder="请发布真实可卖数量" style="width:50%">
                <template slot="append">只</template>
            </el-input>
            <p class="small" style="color:#ff6600" v-if="SellerCredit.tag!=1 && (needCredit > SellerCredit.restcredit)">您的信誉额度剩余为￥{{SellerCredit.restcredit}}，设置库存需要￥{{needCredit}}</p>
        </el-form-item>
        <el-form-item label="价格有效期至" prop="stock_count">
          <el-select v-model="ruleForm.effectiveValue" placeholder="请选择">
            <el-option
              v-for="item in effectiveDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="预计交期：" prop="complete_date">
          <el-select v-if="ruleForm.goods_type" v-model="ruleForm.complete_date" placeholder="请选择">
            <el-option
              v-for="item in spotDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
           <el-select v-if="!ruleForm.goods_type" v-model="ruleForm.complete_date" placeholder="请选择">
            <el-option
              v-for="item in futuresDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel">取 消</el-button>
      <el-button size="small" type="primary" @click="applyOk('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { baseURL } from "@/config";
import { mapActions, mapState } from "vuex";
import { type } from "os";
import { axios, siderInquiryList } from "@/api/apiObj";
export default {
  props: ["replyDialogVisible", "allListData"],
  data() {
    return {
      dialogVisible: this.replyDialogVisible,
      pickerOptions: {
        disabledDate: time => {
          let nowData = new Date();
          nowData = new Date(nowData.setDate(nowData.getDate() - 1));
          return time < nowData;
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          let nowData = new Date(this.ruleForm.end_date);
          nowData = new Date(nowData.setDate(nowData.getDate() - 1));
          return time < nowData;
        }
      },
      effectiveDate: [
        {
          value: "30",
          label: "一个月"
        },
        {
          value: "90",
          label: "三个月"
        },
        {
          value: "180",
          label: "半年"
        },
        {
          value: "365",
          label: "一年"
        }
      ],
      spotDate:[
        {
          value: "1",
          label: "一天"
        },
        {
          value: "2",
          label: "两天"
        },
        {
          value: "3",
          label: "三天"
        },
        {
          value: "4",
          label: "四天"
        },
        {
          value: "5",
          label: "五天"
        },
        {
          value: "6",
          label: "六天"
        },
        {
          value: "7",
          label: "七天"
        }
      ],
      futuresDate:[
        {
          value: "7",
          label: "一周"
        },
        {
          value: "14",
          label: "两周"
        },
        {
          value: "21",
          label: "三周"
        },
        {
          value: "28",
          label: "四周"
        },
        {
          value: "35",
          label: "五周"
        },
        {
          value: "42",
          label: "六周"
        },
        {
          value: "49",
          label: "七周"
        }
      ],
      //个人信誉
      SellerCredit:{},
      //可设置库存
      selectedPrice: 0,
      // 币种
      priceunit: "￥人民币",
      priceunitMark: "￥",
      // 现在选择 的产品的详情
      selectProductObj: {},
      // 交货地的列表
      diliverPlace: [],
      // 价格阶梯列表
      SteppedPriceListlength: 1,
      SteppedPriceListobj: {
        placeholderprice0: "大于0",
        placeholdernum0: "大于0"
      },
      // 是不是一口价
      ruleForm: {
        // 交货地
        diliver_place: "内地",
        // 货物类型
        goods_type: true,
        // 预计交期
        complete_date: "",
        // 币种
        priceunit: false,
        // 是否含税
        clude_bill: false,
        // 价格方式
        price_type: true,
        // 价格
        seckil_price: "",
        moq: "",
        mpq: "",
        // 库存
        stock_count: "",
        // 数量
        goods_count: "",
        // 阶梯价
        price_level: "",
        // 有效期
        effectiveValue: "",
        // 多长时间后交货
        day_interval: ""
      },
      rules: {
        day_interval: [
          {
            required: true,
            message: "请输入多长时间后交货",
            trigger: "blur",
            type: "string"
          },
          { min: 1, message: "天数最低为1", trigger: "blur" }
        ],
        seckil_price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur"
          }
        ],
        moq: [
          {
            required: true,
            message: "请输入moq",
            trigger: "blur",
            type: "string"
          },
          { min: 1, message: "moq最低为1", trigger: "blur" }
        ],
        mpq: [
          {
            required: true,
            message: "请输入mpq",
            trigger: "blur",
            type: "string"
          },
          { min: 1, message: "mpq最低为1", trigger: "blur" }
        ],
        stock_count: [
          {
            required: true,
            message: "请输入库存（数量）",
            trigger: "blur",
            type: "string"
          },
          { min: 1, message: "请输入库存（数量）最低1", trigger: "blur" }
        ],

        complete_date: [
          {
            type: "string",
            required: true,
            message: "请选择预计交期时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  filters: {
    toFixed(val, length) {
      return Number(val).toFixed(length);
    }, 
    addPriceFilter(val){
                return (Number(val)*1.13).toFixed(2)
            },
  },
  computed: {
    needCredit() {
      return (
        this.exchange * Number(this.ruleForm.stock_count) * this.selectedPrice
      );
    },
    ...mapState({
      UserInforma: state => state.Login.UserInforma
    }),
    access_token() {
      return sessionStorage.getItem("access_token");
    }
  },
  watch: {
    // 发货地发生变化
    "ruleForm.diliver_place": {
      handler() {
        if (this.ruleForm.diliver_place === "香港") {
          this.exchange=this.SellerCredit.exchange
          this.ruleForm.clude_bill = false;
          this.priceunit = "$美元";
          this.priceunitMark = "$";
        } else if (this.ruleForm.diliver_place === "内地") {
          this.ruleForm.clude_bill = true;
          this.priceunitMark = "￥";
          this.priceunit = "￥人民币";
        }
      }
    },
    // 价格类型，是不是一口价
    "ruleForm.goods_type": {
      handler() {
        if (!this.ruleForm.goods_type) {
          this.ruleForm.price_type = false;
        } else {
          this.ruleForm.price_type = true;
        }
      }
    }
  },
  mounted() {
    this.querySellerCredit().then(res=>{
                this.SellerCredit=res
            });
    this.GetSearchDataSelect({
      access_token: this.access_token,
      distinguish: "3",
      isable: 1
    })
      .then(res => {
        this.diliverPlace = res;
        this.ruleForm.diliver_place = res[0].name;
      })
      .catch(err => {
        this.$message.error("数据请求错误！");
      });
  },
  methods: {
    ...mapActions("SellerIssuesProduct", [
      "GetSearchDataSelect",
      "querySellerCredit"]
      ),
    cancel() {
      this.dialogVisible = false;
      this.$emit("dialogVisibleClose", false);
    },
    //监控一口价
    changeSeckil_price() {
      //  let count=Number(this.ruleForm.stock_count);
      let obj = this.ruleForm.seckil_price + "";
      obj = obj.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      obj = obj.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      obj = obj
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, "$1$2.$3"); //只能输入4个小数
      if (obj.indexOf(".") < 0 && obj != "") {
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj = parseFloat(obj);
      }
      this.ruleForm.seckil_price = obj;
      this.selectedPrice = Number(this.ruleForm.seckil_price);
    },

    //监控阶梯价
    changePrice(k) {
      if (!this.SteppedPriceListobj["price" + k]) {
        return;
      }
      let obj = this.SteppedPriceListobj["price" + k] + "";
      obj = obj.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      obj = obj.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      obj = obj
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      if (obj.indexOf(".") < 0 && obj != "") {
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj = parseFloat(obj);
      }
      this.SteppedPriceListobj["price" + k] = obj;
      console.log(this.SteppedPriceListobj);
      if (k == 0) {
        this.selectedPrice = Number(this.SteppedPriceListobj.price0);
      }
    },
    changeNum(k) {
      if (
        this.SteppedPriceListobj["num" + k] != 0 &&
        !this.SteppedPriceListobj["num" + k]
      ) {
        return;
      }
      let obj = this.SteppedPriceListobj["num" + k] + "";
      obj = obj.replace(/\D/g, "");
      this.SteppedPriceListobj["num" + k] = obj;
    },
    //输入库存
    changeStockCount() {
      let obj = this.ruleForm.stock_count + "";
      obj = obj.replace(/\D/g, "");
      this.ruleForm.stock_count = obj;
      // let count=Number(this.ruleForm.stock_count);
    },
    //监控阶梯价的变化
    priceblur(event) {
      let order = Number(event.target.name);
      let value = Number(event.target.value);
      let max = Number(event.target.max);
      let min = Number(event.target.min);
      if (value >= min) {
        if (order > 0 && value > max) {
          event.target.value = "";
          return;
        }
        this.SteppedPriceListobj["maxprice" + (order + 1)] = value;
        this.SteppedPriceListobj["placeholderprice" + (order + 1)] =
          "大于0并且小于" + value;
        if (
          this.SteppedPriceListobj["num" + order] &&
          this.SteppedPriceListobj["price" + order] &&
          this.SteppedPriceListlength < 3
        ) {
          this.SteppedPriceListlength++;
        }
      } else {
        event.target.value = "";
      }
      console.log(this.SteppedPriceListobj);
    },
    numblur() {
      let order = Number(event.target.name);
      let value = Number(event.target.value);
      let min = Number(event.target.min);
      if (value >= min) {
        this.SteppedPriceListobj["minnum" + (order + 1)] = value;
        this.SteppedPriceListobj["placeholdernum" + (order + 1)] =
          "大于" + value;
        if (
          this.SteppedPriceListobj["num" + order] &&
          this.SteppedPriceListobj["price" + order] &&
          this.SteppedPriceListlength < 3
        ) {
          this.SteppedPriceListlength++;
        }
      } else {
        event.target.value = "";
      }
      console.log(this.SteppedPriceListobj);
    },
    // 发布商品
    applyOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = [];
          if (this.ruleForm.price_type) {
            for (let index = 0; index < this.SteppedPriceListlength; index++) {
              if (
                this.SteppedPriceListobj["num" + index] &&
                this.SteppedPriceListobj["price" + index]
              ) {
                arr.push(
                  `${this.SteppedPriceListobj["num" + index]}-${
                    this.SteppedPriceListobj["price" + index]
                  }`
                );
              }
            }
            if (arr.length < 2) {
              this.$message.error("阶梯价格至少有两组!");
              return;
            }
            if (!this.ruleForm.seckil_price) {
              this.ruleForm.seckil_price = this.SteppedPriceListobj.price0;
            }
          }

          this.ruleForm.price_level = arr.join("@");
          this.ruleForm.goods_count = this.ruleForm.stock_count;
          if (this.priceunit == "$美元") {
            this.ruleForm.priceunit = true;
          } else {
            this.ruleForm.priceunit = false;
            this.priceunit = "￥人民币";
          }
          this.ruleForm.access_token = this.access_token;
          if (this.UserInforma.userTagMap.tag == 1) {
            this.ruleForm.brand = this.UserInforma.userTagMap.brand;
          }
          var obj = {
            priceIntervalDay: this.ruleForm.effectiveValue,
            moq: this.ruleForm.moq,
            mpq: this.ruleForm.mpq,
            diliverPlace: this.ruleForm.diliver_place,
            priceType: this.ruleForm.price_type,
            seckilPrice: this.ruleForm.seckil_price,
            priceLevel: this.ruleForm.price_level,
            priceUnit: this.ruleForm.priceunit,
            goodsCount: this.ruleForm.goods_count,
            cludeBill: this.ruleForm.clude_bill,
            diliverIntervalDay: this.ruleForm.complete_date,
            brandId: this.allListData.brandId,
            uid: this.allListData.uid,
            id: this.allListData.id
          };
          axios
            .request({
              ...siderInquiryList.replyRequest,
              params: obj
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "批复成功"
              });
              this.$parent.getAllReplyList();
              this.dialogVisible = false;
              this.$emit("dialogVisibleClose", false);
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          this.$message.error("请完善信息!");
          return false;
        }
      });
    },
    // 添加到阶梯价格
    addSteppedPrice() {
      if (this.SteppedPriceList.length < 3) {
        this.SteppedPriceList.push({
          num: "",
          price: ""
        });
      }
    },
    // 重置阶梯价
    resetSteppedPrice() {
      this.SteppedPriceListobj = {
        placeholderprice0: "大于0",
        placeholdernum0: "大于0"
      };
      this.SteppedPriceList = [
        {
          num: "",
          price: ""
        }
      ];
    }
  }
};
</script>
 <style lang="less" scoped>
@import "./replyDialog.less";
</style>
<style scoped>
.defaultradioSquare >>> .el-radio__label {
  font-size: 18px;
}
.defaultradioSquare >>> .el-radio__inner {
  border-radius: 0;
  width: 20px;
  height: 20px;
}
.defaultradioSquare >>> .el-radio__inner::after {
  border: 3px solid #fff;
  width: 13px;
  height: 4px;
  border-top-color: transparent;
  border-right-color: transparent;
  transform: rotate(-45deg) !important;
  left: 0;
  top: 0px;
  border-radius: 0;
  background: transparent;
}
.setitem >>> .el-form-item__content {
  margin-left: 0 !important;
}
.upload-demo {
  display: flex;
}
.upload-demo >>> .el-upload-list {
  display: flex;
}
.stepped-price >>> .el-input__inner {
  width: 150px;
  padding-right: 0;
}
.stepped-price >>> .el-input-group__prepend {
  padding: 0 8px;
}
.stepped-price >>> .el-input-group__append {
  padding: 0 8px;
}
</style>

