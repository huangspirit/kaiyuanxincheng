<template>
  <div v-if="UserInforma">
    <div class="cont0" v-if="UserInforma.userTagMap.vipStatus==2">
      <div class="wrap">
        <h2 class="color">您的月结申请已被拒绝！</h2>
        <p class="title">
          <a @click="chipDetail">请前往用户中心 --> 申请进度查询 中查看审核结果详情</a>&nbsp;或者&nbsp;
          <a @click="getDetail">重新编辑</a>
        </p>
        <p class="desc">
          您可以在审核结果中查看原因并编辑重新提交既可！
          <br />若您已再次提交申请，请您耐心等待！我们的审核时间为3个工作日，申请结果将会以短信、微信和站内信息的方式通知您！
        </p>
      </div>
    </div>
    <div v-if="UserInforma.userTagMap.vipStatus==1" class="cont">
      <div class="title">
        <h2>月结额度管理</h2>
        <p>尊贵的水木晶城月结VIP用户：</p>
      </div>
      <div class="tit">
        <p>
          <span>企业名称：</span>
          <span>{{detail.corp}}</span>
        </p>
        <p>
          <span>统一信用代码：</span>
          <span>{{detail.creditCode}}</span>
        </p>
        <div>
          <span>信用等级：</span>
          <span>{{detail.creditLevel}}</span>
          <div class="level">
            <img
              src="@/assets/image/icon/detail.png"
              alt
              style="margin-left:70px;width:20px;vertical-align:middle;cursor:pointer;"
            />
            <div class="levelCont">
              <p>
                <span>信用等级</span>
                <span>预付款比列</span>
              </p>
              <p
                v-for="item in levelList"
                :class="item.level==detail.creditLevel ? 'color':''"
                :key="item.val"
              >
                <span>{{item.level}}</span>
                <span>{{item.val}}</span>
              </p>
              <div class="color">提示：系统会根据您购买商品的能力进行等级的调整</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tit peruBg">
        <p>
          <span>当前月结额度：</span>
          <span>RMB ￥{{detail.creditBase | toFixed(0)}}</span>
        </p>
        <p>
          <span>剩余月结额度：</span>
          <span>RMB ￥{{detail.creditRest | toFixed(2)}}</span>
        </p>
        <p>
          <span>月结周期：</span>
          <span>{{detail.limitDay}}天</span>
        </p>
        <p>
          <span>企业账单日：</span>
          <span>每月25日</span>
        </p>
      </div>
      <div class="btn">
        当前可申请的最高额度：10000000
        <el-button class="bgColor" size="mini" @click="showUplevel=true">立即提升</el-button>
      </div>
      <div class="peruBg desc">
        <p>
          <i class="el-icon-alarm-clock"></i>
          月结额度使用与调整计划：
        </p>
        <p>
          <span>1、</span>月结额度仅用于用户在平台购买产品时使用，不具有取现，担保等其它功能; 平台的基本原则是信用越好，额度越高；
        </p>
        <p>
          <span>2、</span>该额度会根据您在平台的消费行为和信用进行调整，调整规则如下：
          <br />&nbsp;&nbsp;i、&nbsp;取消订单：若您订货中途取消订单，平台将会按您采购金额的10倍进行额度扣除；
          <br />&nbsp;&nbsp;ii、&nbsp;延期付款：平台将按您的帐单日发送帐单，请在最后期限前支付货款；每延期一天，将按延期金额的2倍扣除；
        </p>
        <p>
          <span>3、</span>
          <span>每一个公司对应一个额度，若您的额度被用完，余下部分只能通过在线付款或付款的方式进行现金支付；待您结算完毕后，额度会自动恢复；</span>
        </p>
        <p>
          <span>4、</span>
          <span>每一订单交易完成后，您的交易金额将会自动增加到您的“可申请的最高额度”中，你可根据需要点击提升；</span>
        </p>
        <p>
          <span>5、</span>
          <span>您企业的月结额度一旦被扣完将不能重新申请, 额度会根据您后续的购买金额逐步恢复；因此，请珍视您的企业信用！</span>
        </p>
      </div>
    </div>
    <el-dialog title="提升额度" :visible.sync="showUplevel" width="600px">
      <div>
        <el-form
          ref="upLevelform"
          :model="upLevelform"
          label-width="150px"
          :rules="rulesUpLevelform"
          v-if="upLevelform"
        >
          <el-form-item label="申请额度：" prop="creditTotal">
            <el-input v-model="upLevelform.creditTotal" type="number">
              <span slot="prefix">￥</span>
            </el-input>
          </el-form-item>
          <el-form-item label="申请人姓名：" prop="contactname">
            <el-input v-model="upLevelform.contactname"></el-input>
          </el-form-item>
          <el-form-item label="申请人电话" prop="contactphone">
            <el-input v-model="upLevelform.contactphone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUplevel = false">取 消</el-button>
        <el-button type="primary" @click="submitUplevel('upLevelform')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { axios, buyerOrderCenter, common, FactoryEntry } from "@/api/apiObj";
export default {
  data() {
    return {
      levelList: [
        { level: "AAA", val: "10%" },
        { level: "AA", val: "20%" },
        { level: "A", val: "30%" },
        { level: "BBB", val: "40%" },
        { level: "BB", val: "50%" },
        { level: "B", val: "60%" },
        { level: "CCC", val: "70%" },
        { level: "CC", val: "80%" },
        { level: "C", val: "90%" },
        { level: "D", val: "100%" }
      ],
      detail: {},
      showUplevel: false,
      upLevelform: {},
      rulesUpLevelform: {
        creditTotal: [
          { required: true, message: "请输入申请的额度", trigger: "blur" }
        ],
        contactname: [
          { required: true, message: "请输入申请人姓名", trigger: "blur" }
        ],
        contactphone: [
          { required: true, message: "请输入申请人联系电话", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      UserInforma: state => state.Login.UserInforma
    })
  },
  methods: {
    init() {
      if (this.UserInforma.userTagMap.vipStatus == 1) {
        // 1已经是月结2审核被拒绝3还未申请。0月结待审核
        axios.request(common.findVipDetail).then(res => {
          console.log(res);
          this.detail = res.data;
        });
      }
    },
    getDetail() {
      axios
        .request({
          ...FactoryEntry.getApplyDetail,
          params: {
            id: this.UserInforma.userTagMap.vipids,
            type: 4
          }
        })
        .then(res => {
          this.editApply = res.data;
          this.$store.dispatch("applyEdit", this.editApply);
          this.$router.push({
            path: "/PersonalCenter/UpgradeLevel"
          });
        });
    },
    chipDetail() {
      this.$router.push("/PersonalCenter/GetVipApplyDetail");
    },
    submitUplevel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .request({
              ...buyerOrderCenter.increaseCredit,
              data: this.upLevelform
            })
            .then(res => {
              if (res) {
                // this.handleChangeGoodsBillSetOff();
                this.showUplevel = false;
                this.$message("申请已提交");
              }
            });
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.cont0 {
  margin-top: 80px;
  .wrap {
    padding: 50px;
    white-space: nowrap;
    text-align: center;
    h2 {
      margin-bottom: 20px;
    }
    .title {
      margin-bottom: 20px;
      color: #333;
    }
    a {
      text-decoration: underline;
    }
    .desc {
      line-height: 2;
      color: #333;
    }
  }
}
.cont {
  width: 80%;
  background: #fff;
  padding: 20px;
  margin: 0 auto 50px;
  color: #333;
  line-height: 2;
  .title {
    border-bottom: 1px solid #333;
    display: flex;
    align-items: baseline;
    padding-bottom: 5px;
    margin-bottom: 20px;
    margin-top: 20px;
    h2 {
      font-weight: normal;
      margin-right: 40px;
      line-height: 1;
    }
  }
  .tit {
    padding: 10px 50px;
    line-height: 2;
    .level {
      position: relative;
      display: inline-block;
      vertical-align: top;
      &:hover{
        .levelCont{
          display:block;
        }
      }
      .levelCont {
        position: absolute;
        display: none;
        left: 100%;
        top: 25px;
        background: #fff;
        padding: 20px;
        width: 400px;
        box-shadow: 0 0 2px 2px #ddd;
        color: #333;
        p {
          display: inline-flex;
          width: 100%;
          border-bottom: 1px solid #ddd;
          margin-bottom: 3px;
          padding-bottom: 3px;
          line-height: 1.4;
          span {
            width: 50%;
            text-align: center;
            white-space: nowrap;
            font-size:14px;
          }
        }
      }
    }
    &.peruBg {
      border: 1px solid #ddd;
    }
    span {
      &:first-of-type {
        width: 120px;
        text-align: right;
        margin-right: 10px;
      }
    }
  }
  .btn {
    margin: 25px;
  }
  .desc {
    padding: 30px;
    .el-icon-alarm-clock {
      font-size: 25px;
    }
    p {
      display: flex;
    }
  }
}
</style>