<template>
  <div class="BasicInforma">
    <!-- 平台入驻的基本信息 -->
    <div class="BasicInforma-con">
      <p class="title">
        <span>基本信息</span>
      </p>
      <div>
        <!-- 选择品牌 -->
        <div class="selectbrandWrap" v-if="selectBrandFlag">
          <SelectBrand
            @select="SureSelectBrand"
            :addBrandUrl="addBrandUrl"
            :EndselectBrandList="EndselectBrandList"
            @cancel="cancelBrandFlag"
            :maxBrandNum="maxBrandNum"
            :residencetype="ruleForm.residencetype"
          ></SelectBrand>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item label="入驻类型：">
            <el-select
              v-model="residencetype"
              placeholder="请选择入驻类型"
              @change="regisType(val)"
              prop="residencetype"
            >
              <el-option
                v-for="item in typeresidenceList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
              <!-- <el-option label="区域一" value="shanghai"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item v-if="residencetype!='3'" label="选择品牌：" prop="brandName">
            <el-select
              style="display:block"
              v-model="ruleForm.brandName"
              multiple
              placeholder="请选择"
              :multiple-limit="maxBrandNum"
              @focus="FindBrand"
            ></el-select>
          </el-form-item>
          <el-form-item label="联系人姓名：" prop="contactname">
            <el-input v-model="ruleForm.contactname"></el-input>
          </el-form-item>
          <el-form-item label="职位：" prop="position">
            <el-input v-model="ruleForm.position"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话：" prop="contactphone">
            <el-input v-model="ruleForm.contactphone"></el-input>
          </el-form-item>
        </el-form>
        <div class="BasicInforma-footer">
          <div @click="submitForm('ruleForm')" class="sure">
            确定，下一步
            <img src="@/assets/image/OriginalFactoryEntry/u197170.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import "@/assets/css/label-checkbox.less";
import { mapState, mapActions, mapMutations } from "vuex";
import SelectBrand from "_c/SelectBrand";
export default {
  name: "BasicInforma",
  data() {
    return {
      // 选择品牌的最大数量
      maxBrandNum: 3,
      //入住类型
      residencetype: "",
      // 基本信息
      ruleForm: {
        residencetype: "",
        brand: "",
        contactname: "",
        position: "",
        contactphone: "",
        brandName: []
      },
      // 添加新品牌需要跳转的路径
      addBrandUrl: "/OriginalFactoryEntry/NewBrand",
      // 模糊查询到的品牌列表
      FindBrandList: [],
      // 选择品牌展示的模态框
      selectBrandFlag: false,
      //最后选择的品牌列表
      EndselectBrandList: [],
      // 要搜索的品牌name
      searchBrandValue: "",
      // 重复添加的提示
      RepeatedAddFlag: false,
      brandList: [
        "#",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      selectBrandSearchTitle: "A",

      // 入驻类型的列表
      typeresidenceList: [],
      // 基本信息验证
      rules: {
        residencetype: [
          { required: true, message: "选择入驻类型", trigger: "blur" }
        ],
        contactname: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        brand: [{ required: true, message: "请选择品牌", trigger: "blur" }],
        position: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "职位名称长度在 1 到 15 个字符",
            trigger: "blur"
          }
        ],
        contactphone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" },
          { min: 11, max: 11, message: "联系人电话长度为11位", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("OriginalFactoryEntry", ["joinForm"]),
    access_token() {
      return localStorage.getItem("access_token");
    }
  },
  watch: {
    residencetype(newval, oldval) {
      this.ruleForm = { ...this.ruleForm, residencetype: newval };
      if (newval === 1) {
        this.maxBrandNum = 1;
        this.ruleForm.brandName = [];
        this.EndselectBrandList = [];
      } else {
        this.maxBrandNum = 3;
      }
    }
  },
  components: {
    SelectBrand
  },
  methods: {
    ...mapActions("OriginalFactoryEntry", [
      "GetQueryDictionarieList",
      "GetFindBrand"
    ]),
    ...mapMutations("OriginalFactoryEntry", ["setJoinForm"]),
    // 平台入驻的确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //将数据保存到store
          this.setJoinForm(this.ruleForm);
          this.$router.push({
            path: "/OriginalFactoryEntry/CheckInformation",
            query: {
              newBrand: this.$route.query.brand,
              residencetype: this.ruleForm.residencetype
            }
          });
        } else {
          return false;
        }
      });
    },
    FindBrand(x) {
      if (this.ruleForm.residencetype) {
        this.selectBrandFlag = true;
      } else {
        this.$message("请选择入驻类型");
      }
    },
    regisType(val) {
      this.ruleForm.brandName = [];
    },
    selectBrand(item) {
      this.ruleForm.name = item.brand;
      this.FindBrandList = [];
    },
    // 品牌搜索输入框
    brandInputChange(x) {
      this.selectBrandSearchTitle = this.searchBrandValue;
      this.GetFindBrand({
        start: 0,
        length: 10,
        name: this.searchBrandValue
      }).then(res => {
        this.FindBrandList = res;
      });
    },
    // 确定选择的品牌
    SureSelectBrand(EndselectBrandList) {
      this.selectBrandFlag = false;
      let arr = [];
      let arrName = [];
      EndselectBrandList.forEach(item => {
        arr.push(item.id);
        arrName.push(item.brand);
      });
      this.ruleForm.brandName = arrName;
      // console.log(arr)
      // arr.splice(arr.findIndex(item => item === this.$route.query.id),1)
      this.ruleForm.brand = arr.join("@");
      console.log(this.ruleForm);
    },
    // 取消选择品牌模态框
    cancelBrandFlag() {
      this.selectBrandFlag = false;
    },
    // 取消选择的品牌
    CancelSelectBrand() {
      this.selectBrandFlag = false;
      this.EndselectBrandList = [];
    }
  },
  mounted() {
    this.GetQueryDictionarieList({
      access_token: this.access_token,
      distinguish: "5",
      isable: "1"
    }).then(res => {
      this.typeresidenceList = res;
      this.$nextTick(() => {
        this.ruleForm.residencetype = res[0].id;
        this.residencetype = res[0].id;
      });
    });
    this.$store.state.OriginalFactoryEntry.active = 1;
    this.ruleForm = { ...this.joinForm, ...this.ruleForm };
    this.residencetype = this.ruleForm.residencetype;
    let addBrandName = this.$route.query;
    if (addBrandName.brand) {
      this.ruleForm.brandName.push(addBrandName.brand);
      this.EndselectBrandList.push(addBrandName);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./BasicInforma.less";
</style>

