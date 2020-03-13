<template>
  <el-dialog :visible.sync="dialogVisible" width="750px" :before-close="cancel" top="6vh">
    <div slot="title">
      <div style="color:#333;">
        <img src="http://brand.113ic.com/8904e4fe85564325847710fe9d3f3277.jpg" alt style="width:50px;" /> 大麦晶城
      </div>
      <div style="text-align:center;color:#333;">特价申请_询价批复</div>
    </div>
    <div class="SellerIssuesProduct">
      <div class="wrap">
        <div>
          <span class="left">型号：</span>
          <span>{{allListData.goodsName}}</span>
        </div>
        <div>
          <span class="left">年用量：</span>
          <span>{{allListData.projectEau}}</span>
        </div>
        <div>
          <span class="left">目标价：</span>
          <span>{{allListData.acceptUnit?'$':'￥'}}{{allListData.acceptPrice}}</span>
        </div>
        <div>
          <span class="left">竞争型号：</span>
          <span
            v-for="(item,k) in allListData.insteadNo.split('@')"
            :key="k"
            style="margin-right:10px;"
          >{{k+1}}、{{item}}</span>
        </div>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="180px" class="form-list">
        <el-form-item label="零件状态：">
          <el-radio-group v-model="form.goods_type" class="defaultradioSquare">
            <el-radio :label="true" :value="true">现货</el-radio>
            <el-radio :label="false" :value="false">订货</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="币种：">
          <el-radio-group v-model="form.priceUnit" class="defaultradioSquare">
            <el-radio :label="true" :value="true" v-if="form.priceUnit">美元</el-radio>
            <el-radio :label="false" :value="false" v-if="!form.priceUnit">人民币（含税）</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="批复价格：">
          <el-radio-group v-model="form.priceType" class="defaultradioSquare">
            <el-radio :label="false" :value="false">一口价</el-radio>
            <el-radio :label="true" :value="true" v-if="form.goods_type">阶梯价</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label v-if="form.priceType">
          <div class="form-item0">
              <div class="form-item1" v-if="ruleForm.price_type && ruleForm.price_type">
         
              <div class="stepped-price" v-for="(item,k) in SteppedPriceListlength" :key="k">
                <div class="steppedItem">
                  <label>数量：</label>
                  <el-input
                    @input="changeNum(k)"
                    :placeholder="SteppedPriceListobj['placeholdernum'+k]"
                    :name="k"
                    v-model="SteppedPriceListobj['num'+k]"
                    type="number"
                    :min="SteppedPriceListobj['minnum'+k]"
                    @blur="numblur($event)"
                     size="mini"
                  >
                    <!--                        <template slot="append">K</template>-->
                  </el-input>
                </div>
                <div class="steppedItem">
                  <label>价格：</label>
                  <el-input
                    @input="changePrice(k)"
                    :placeholder="SteppedPriceListobj['placeholderprice'+k]"
                    :name="k"
                    v-model="SteppedPriceListobj['price'+k]"
                    :max="SteppedPriceListobj['maxprice'+k]"
                    :min="0"
                    size="mini"
                    @blur="priceblur($event)"
                   
                  >
                    <template slot="prepend">{{priceunitMark}}</template>
                  </el-input>
                  <!-- <strong
                    v-if="SteppedPriceListobj['price'+k] && !ruleForm.clude_bill && priceunitMark!='$'"
                  >含税价为{{SteppedPriceListobj['price'+k] | addPriceFilter(ruleForm.priceunit?3:2)}}</strong> -->
                </div>
              </div>
            <div class="add-stepped-price">
              <div>
                    <el-button size="mini" icon="el-icon-plus"  @click="addoneprice" v-if="SteppedPriceListlength < 3" type="primary">增加</el-button>
                    <el-button  @click="resetSteppedPrice" size='mini' type="primary" icon="el-icon-setting">重置</el-button>
              </div>
              <!-- <p v-if="SteppedPriceListlength === 3" style="color:#ff6600" >最多添加三个阶梯价格</p> -->
              <!-- <span @click="resetSteppedPrice" class="reset">重置阶梯价格</span> -->
            </div>
          </div>
          </div>
        </el-form-item>
        <el-form-item label="价格：" prop="seckilPrice" v-if="form.priceType === false">
          <el-input
            v-model="form.seckilPrice"
            @input="changeSeckil_price"
            :min="0"
            style="width:50%"
             size="mini"
          >
            <template slot="prepend">{{priceunitMark}}</template>
          </el-input>
        </el-form-item>

        <el-form-item label="MOQ：" prop="moq">
          <el-input v-model="form.moq" placeholder style="width:45%"  size="mini">
            <!-- <template slot="append">只</template> -->
          </el-input>
        </el-form-item>
         <el-form-item label="售卖数量：" prop="goodsCount">
          <el-input v-model="form.goodsCount" placeholder style="width:45%"  size="mini">
            <!-- <template slot="append">只</template> -->
          </el-input>
        </el-form-item>
        <el-form-item label="价格有效期至：" prop="effectiveValue">
          <el-select v-model="form.priceIntervalDay" placeholder="请选择" style="width:45%"  size="mini">
            <el-option
              v-for="item in effectiveDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="预计交期："
          prop="diliverIntervalDay"
          v-if="!form.goods_type"
        >
          <!-- <el-select v-if="form.goods_type" v-model="form.complete_date" placeholder="请选择">
            <el-option
              v-for="item in spotDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
          <el-select v-if="!form.goods_type" v-model="form.diliverIntervalDay" placeholder="请选择"  size="mini">
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

    <span slot="footer" class style="text-align:center;width:100%">
      <!-- <el-button size="small" @click="cancel">取 消</el-button> -->
      <el-button @click="applyOk('ruleForm')" class="bgColor" round>确 定</el-button>
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
      form: {},
      originForm: {},
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
      spotDate: [
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
      futuresDate: [
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
      SellerCredit: {},
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
      diliver_place_flag: 1,
      // 是不是一口价
      ruleForm: {
        // 交货地
        diliver_place: "",
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
        seckilPrice: "",
        moq: "",
        mpq: "",
        // 库存
        stock_count: "",
        // 数量
        goods_count: "",
        // 阶梯价
        priceLevel: "",
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
        seckilPrice: [
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
    addPriceFilter(val) {
      return (Number(val) * 1.13).toFixed(3);
    }
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
    // // 发货地发生变化
    // diliver_place_flag: {
    //   handler() {
    //     this.diliverPlace.map(item => {
    //       if (item.flag == this.diliver_place_flag) {
    //         this.ruleForm.diliver_place = item.name;
    //         return;
    //       }
    //     });
    //     if (this.diliver_place_flag == 1) {
    //       //标识香港,不含税，系统开发票
    //       this.exchange = this.SellerCredit.exchange;
    //       this.ruleForm.clude_bill = false;
    //       this.ruleForm.support_bill = false;
    //       this.priceunit = "$美元";
    //       this.priceunitMark = "$";
    //       this.ruleForm.priceunit = true;
    //     } else {
    //       //标志内地，如果不含税，则系统开发票
    //       //如果含税，则自己开增值税发票
    //       this.exchange = 1;
    //       this.priceunitMark = "￥";
    //       this.priceunit = "￥人民币";
    //       this.ruleForm.priceunit = false;
    //     }
    //   }
    // },
    "form.priceUnit": {
      handler(val) {
        if (val) {
          this.priceunitMark = "$";
          this.form.cludeBill = false;
          this.form.diliver_place="香港"
          this.form.supportBill = false;
        } else {
          this.priceunitMark = "￥";
          this.form.cludeBill = true;
          this.form.diliver_place="国内";
          this.form.supportBill = true;
        }
      }
    },
    // 价格类型，是不是一口价
    "form.goods_type": {
      handler(val) {
        if (!val) {
          this.form.priceType = false;
        }
      }
    }
    // 价格类型，是不是一口价
    // "ruleForm.price_type": {
    //   handler() {
    //     if (this.ruleForm.price_type) {
    //       this.$set(this.ruleForm, "moq", this.SteppedPriceListobj.num0);
    //     } else {
    //       this.$set(this.ruleForm, "moq", "");
    //     }
    //   }
    // },
    // 是不是含税
    // "ruleForm.clude_bill": {
    //   handler() {
    //     if (this.ruleForm.clude_bill) {
    //       this.ruleForm.support_bill = true;
    //     } else {
    //       this.ruleForm.support_bill = false;
    //     }
    //   }
    // }
  },
  mounted() {
  
    this.querySellerInfo();
    // this.querySellerCredit().then(res => {
    //   this.SellerCredit = res;
    // });
    this.GetSearchDataSelect({
      access_token: this.access_token,
      distinguish: "3",
      isable: 1
    })
      .then(res => {
        this.diliverPlace = res;
        this.ruleForm.diliver_place = res[0].name;
        this.diliver_place_flag = res[0].flag;
      })
      .catch(err => {
        this.$message.error("数据请求错误！");
      });
  },
  methods: {
    ...mapActions("SellerIssuesProduct", [
      "GetSearchDataSelect",
      "querySellerCredit"
    ]),

    cancel() {
      this.dialogVisible = false;
      this.$emit("dialogVisibleClose", false);
    },
    //监控一口价
    changeSeckil_price() {
      //  let count=Number(this.ruleForm.stock_count);
      let obj = this.form.seckilPrice + "";
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
      this.form.seckilPrice = obj;
      this.selectedPrice = Number(this.form.seckilPrice);
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

      if (k == 0) {
        this.selectedPrice = Number(this.SteppedPriceListobj.price0);
      }
    },
    //输入库存
    changeStockCount() {
      let obj = this.ruleForm.stock_count + "";
      obj = obj.replace(/\D/g, "");
      this.ruleForm.stock_count = obj;
      // let count=Number(this.ruleForm.stock_count);
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
      if (k == 0) {
        this.selectedPrice = Number(this.SteppedPriceListobj.price0);
      }
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
        // if (
        //   this.SteppedPriceListobj["num" + order] &&
        //   this.SteppedPriceListobj["price" + order] &&
        //   this.SteppedPriceListlength < 3
        // ) {
        //   this.SteppedPriceListlength++;
        // }
      } else {
        event.target.value = "";
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
      if (k == 0) {
        this.minmoq = this.SteppedPriceListobj.num0;
        this.$set(this.form, "moq", this.SteppedPriceListobj.num0);
        // if (this.form.stock_count < this.SteppedPriceListobj.num0) {
        //   this.$set(
        //     this.form,
        //     "stock_count",
        //     this.SteppedPriceListobj.num0
        //   );
        // }
      }
    },
    numblur() {
      let order = Number(event.target.name);
      let value = Number(event.target.value);
      let min = Number(event.target.min);
      if (value >= min) {
        this.SteppedPriceListobj["minnum" + (order + 1)] = value;
        this.SteppedPriceListobj["placeholdernum" + (order + 1)] =
          "大于" + value;
        // if (
        //   this.SteppedPriceListobj["num" + order] &&
        //   this.SteppedPriceListobj["price" + order] &&
        //   this.SteppedPriceListlength < 3
        // ) {
        //   this.SteppedPriceListlength++;
        // }
      } else {
        event.target.value = "";
      }
    },
    addoneprice(){
        let length=this.SteppedPriceListlength-1
        if (
          this.SteppedPriceListobj["num" + length] &&
          this.SteppedPriceListobj["price" + length] &&
          this.SteppedPriceListlength < 3
        ) {
          this.SteppedPriceListlength++;
        }else{
            this.$message({
                message:"请按提示填写数量和对应的价格",
                type:'error'
            })
        }
    },
    querySellerInfo() {
      axios
        .request({
          ...siderInquiryList.querySellerInfo,
          params: { id: this.allListData.seller_goods_id }
        })
        .then(res => {
          this.originForm = res;
          let obj = {
            mpq: res.mpq,
            priceUnit: res.priceunit,
            goodsCount: res.goods_count,
            brandId: this.allListData.brandId,
            uid: this.allListData.uid,
            id: this.allListData.id,
            supportBill: res.priceunit?false:true,
            priceType: res.price_type,
            goods_type: res.goods_type,
            seller_always: res.seller_always,
            diliverPlace:res.diliver_place
          };
          if (res.base_no) {
            obj.base_no = res.base_no;
          }
          this.form = obj;
        });
    },
    // 发布商品
    applyOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = [];
          this.form.stock_count=this.form.goodsCount;
          if (this.form.priceType) {
            for (let index = 0; index < this.SteppedPriceListlength; index++) {
              if (
                this.SteppedPriceListobj["num" + index] &&
                this.SteppedPriceListobj["price" + index]
              ) {
                if (
                  Number(this.SteppedPriceListobj["num" + index]) <=
                    Number(this.SteppedPriceListobj["num" + (index - 1)]) ||
                 parseFloat(this.SteppedPriceListobj["price" + index])>=
                  parseFloat(this.SteppedPriceListobj["price" + (index - 1)])
                ) {
                  this.$message.error("阶梯价格请按照要求填写!");
                  return;
                }
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
            if (!this.form.seckilPrice) {
              this.form.seckilPrice = this.SteppedPriceListobj.price0;
            }
          }
          this.form.priceLevel = arr.join("@");
          this.form.access_token = this.access_token;
          if (this.UserInforma.userTagMap.tag == 1) {
            this.form.brand = this.UserInforma.userTagMap.brand;
             this.form.brandId = this.UserInforma.userTagMap.brand;
          }
          if (!this.form.goods_type) {
            //订货有交期，没批号
            delete this.form.base_no;
           // delete this.form.diliverIntervalDay;
          } else {
            //现货有批号，
            delete this.form.complete_date;
            this.form.diliverIntervalDay = this.form.priceUnit ? 2 : 1;
          }
          // if (this.ruleForm.seller_always) {
          //   //长期卖
          //   delete this.ruleForm.start_date;
          //   delete this.ruleForm.end_date;
          // }
          // if (this.ruleForm.priceunit) {
          //   this.ruleForm.clude_bill = false;
          // }
          // var obj = {
          //   priceIntervalDay: this.ruleForm.effectiveValue,
          //   moq: this.ruleForm.moq,
          //   mpq: this.ruleForm.mpq,
          //   diliverPlace: this.ruleForm.diliver_place,
          //   priceType: this.ruleForm.price_type,
          //   seckilPrice: this.ruleForm.seckil_price,
          //   priceLevel: this.ruleForm.price_level,
          //   priceUnit: this.ruleForm.priceunit,
          //   goodsCount: this.ruleForm.goods_count,
          //   cludeBill: this.ruleForm.clude_bill,
          //   diliverIntervalDay: this.ruleForm.complete_date
          //     ? this.ruleForm.complete_date
          //     : this.ruleForm.day_interval,
          //   brandId: this.allListData.brandId,
          //   uid: this.allListData.uid,
          //   id: this.allListData.id,
          //   supportBill: this.ruleForm.clude_bill
          // };
          // if (this.ruleForm.base_no) {
          //   obj.base_no = this.ruleForm.base_no;
          // }
          console.log(this.form);
    
          axios
            .request({
              ...siderInquiryList.replyRequest,
              params: this.form
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

