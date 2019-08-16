<template>
  <div class="table">
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="applyType" label="申报类型" width="150" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.applyType | applyStatus}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="applyTime" label="申报时间" width="300" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.applyTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contactName" label="联系人" width="300" align="center"></el-table-column>
      <el-table-column prop="contactPhone" label="联系人手机号" width="270" align="center"></el-table-column>
      <el-table-column prop="checkStatus" label="申报状态" width="100" align="center">
        <template slot-scope="scope">
          <span
            :class="'status'+scope.row.checkStatus"
          >{{scope.row.checkStatus | checkStatusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mark" label="审核备注" width="300" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
          <el-button
            v-if="scope.row.applyType=='4'&& scope.row.updateBuuton"
            type="text"
            size="small"
            @click="headleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="scope.row.applyType!='4'&& scope.row.updateBuuton"
            type="text"
            size="small"
            @click="headleEdit(scope.row)"
          >重新上传</el-button>
        </template>
      </el-table-column>
    </el-table>
    <SetTankuang :title="'申请详情'" v-if="dialogVisible" @closeDialogCallBack="dialogVisible=false">
      <div class="dialog-body" slot="dialog-body">
        <ul v-if="detailList.applyType!='4'" class="applyDetail">
          <li>
            <span>公司注册名称：</span>
            <span>{{detailList.companyname}}</span>
          </li>
          <li>
            <span>工商营业执照注册号：</span>
            <span>{{detailList.businesslicensenum}}</span>
          </li>
          <li>
            <span>法定代表人：</span>
            <span>{{detailList.legalagent}}</span>
          </li>
          <li>
            <span>职位：</span>
            <span>{{detailList.position}}</span>
          </li>
          <li>
            <span>公司成立日期：</span>
            <span>{{detailList.establishmenttime}}</span>
          </li>
          <li>
            <span>企业负责人：</span>
            <span>{{detailList.contactname}}</span>
          </li>
          <li>
            <span>企业负责人手机：</span>
            <span>{{detailList.contactphone}}</span>
          </li>
          <li>
            <span>公司详细地址：</span>
            <span>{{detailList.companydetailaddress}}</span>
          </li>
          <li>
            <span>营业执照有效期：</span>
            <span>{{detailList.businesslicensestarttime}} 至 {{detailList.businesslicenseendtime}}</span>
          </li>
          <li>
            <span>营业执照：</span>
            <span>
              <img
                style="margin: 10px 0;"
                :src="'http://auth.113ic.com/'+ detailList.qualificationmapimg+'?imageView2/2/w/180/h/100'"
              />
            </span>
          </li>
          <li>
            <span>身份证号：</span>
            <span>{{detailList.enterpriseplatformidentity}}</span>
          </li>
          <li>
            <span>身份证正面：</span>
            <span>
              <img
                style="margin: 10px 0;"
                :src="'http://auth.113ic.com/'+ detailList.identityposimg+'?imageView2/2/w/180/h/100'"
              />
            </span>
          </li>
          <li>
            <span>身份证反面：</span>
            <span>
              <img
                style="margin: 10px 0;"
                :src="'http://auth.113ic.com/'+ detailList.identitynegimg+'?imageView2/2/w/180/h/100'"
              />
            </span>
          </li>
          <li>
            <span>纳税人资格证</span>
            <span>
              <img
                style="margin: 10px 0;"
                :src="'http://auth.113ic.com/'+ detailList.taxpayerimg+'?imageView2/2/w/180/h/100'"
              />
            </span>
          </li>
          <li v-for="(item,index) in brandList" :key="index">
            <span>品牌：</span>
            <span>{{brand[0]}}</span>
            <span>品牌LOGO：</span>
            <span>
              <img
                style="margin: 10px 0;"
                :src="'http://auth.113ic.com/'+ brandList[index]+'?imageView2/2/w/180/h/100'"
              />
            </span>
            <span>品牌有效期：</span>
            <span>
              <span>{{brandTime[index]}}</span>
            </span>
          </li>
        </ul>

        <ul v-if="detailList.applyType=='4'" class="applyDetail">
          <li>
            <span>公司注册名称：</span>
            <span>{{detailList.companyName}}</span>
          </li>
          <li>
            <span>工商营业执照注册号：</span>
            <span>{{detailList.no}}</span>
          </li>
          <li>
            <span>注册资本：</span>
            <span>{{detailList.registCapi}}</span>
          </li>
          <li>
            <span>法定代表人：</span>
            <span>{{detailList.operName}}</span>
          </li>
          <li>
            <span>公司成立日期：</span>
            <span>{{detailList.createTime| formatDate}}</span>
          </li>
          <li>
            <span>企业负责人：</span>
            <span>{{detailList.conName}}</span>
          </li>
          <li>
            <span>企业负责人手机：</span>
            <span>{{detailList.telephone}}</span>
          </li>
          <li>
            <span>公司详细地址：</span>
            <span>{{detailList.address}}</span>
          </li>
          <li>
            <span>营业执照有效期：</span>
            <span>{{detailList.tremsStart}} - {{detailList.termsEnd}}</span>
          </li>
          <li>
            <span>营业执照：</span>
            <span>
              <img
                style="margin: 10px 0;"
                :src="'http://auth.113ic.com/'+ detailList.url+'?imageView2/2/w/180/h/100'"
              />
            </span>
          </li>
          <li>
            <span>身份证号：</span>
            <span>{{detailList.peopleId}}</span>
          </li>
          <li>
            <span>身份证正面：</span>
            <span>
              <img
                style="margin: 10px 0;"
                :src="'http://auth.113ic.com/'+ detailList.idUrlA+'?imageView2/2/w/180/h/100'"
              />
            </span>
          </li>
          <li>
            <span>身份证反面：</span>
            <span>
              <img
                style="margin: 10px 0;"
                :src="'http://auth.113ic.com/'+ detailList.idUrlB+'?imageView2/2/w/180/h/100'"
              />
            </span>
          </li>
          <li>
            <span>纳税人资格证</span>
            <span>
              <img
                style="margin: 10px 0;"
                :src="'http://auth.113ic.com/'+ detailList.taxUrl+'?imageView2/2/w/180/h/100'"
              />
            </span>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer fr"></div>
    </SetTankuang>
  </div>
</template>
<script>
import { axios, FactoryEntry } from "@/api/apiObj";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      editObj: {},
      list: [],
      detailList: {},
      editApply: {},
      brandList: [],
      brand: [],
      brandTime: []
    };
  },
  methods: {
    init() {
      axios.request(FactoryEntry.getApplyList).then(res => {
        console.log(res);
        this.list = res.data;
      });
    },
    //获取详情
    handleDetail(obj) {
      console.log(obj);
      this.editObj = obj;

      axios
        .request({
          ...FactoryEntry.getApplyDetail,
          params: {
            id: obj.id,
            type: obj.applyType
          }
        })
        .then(res => {
          if (obj.applyType != "4") {
            this.detailList["applyType"] = obj.applyType;
            this.detailList = res.data.baseInfo;
            this.brandList = this.detailList.qualification.split("@");
            this.brand = this.detailList.brand.split("@");
            this.brandTime = this.detailList.qualificationtime.split("@");
            console.log(this.brandList);
          } else if (obj.applyType == "4") {
            this.detailList = res.data;
            this.detailList["applyType"] = obj.applyType;
          }
          console.log(this.detailList);
        });

      this.dialogVisible = true;
    },
    headleEdit(obj) {
      console.log(obj);
      axios
        .request({
          ...FactoryEntry.getApplyDetail,
          params: {
            id: obj.id,
            type: obj.applyType
          }
        })
        .then(res => {
          console.log(res);
          if (res.resultCode == "200") {
            if (res.data) {
              if (obj.applyType != "4") {
                this.editApply = res.data.baseInfo;
                this.$store.state.OriginalFactoryEntry.applyDetailEdit = this.editApply;
                this.$router.push({
                  path: "/OriginalFactoryEntry"
                });
              } else if (obj.applyType == "4") {
                this.editApply = res.data;
                this.$store.dispatch("applyEdit", this.editApply);
                this.$router.push({
                  path: "/PersonalCenter/UpgradeLevel"
                });
              }
            }
          }
        });
    }
  },
  mounted() {
    this.init();
  },
  filters: {
    checkStatusFilter(val) {
      switch (val) {
        case 0:
          return "待审核";
        case 1:
          return "已通过";
        case 2:
          return "已驳回";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.table {
  /deep/.el-table {
    .cell {
      .status0 {
        color: orange;
        font-weight: bold;
      }
      .status1 {
        color: green;
        font-weight: bold;
      }
      .status2 {
        color: #f22e2e;
        font-weight: bold;
      }
    }
  }
}
.applyDetail {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  > li {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > span {
      line-height: 40px;
      &:nth-of-type(odd) {
        width: 30%;
        text-align: right;
        box-sizing: border-box;
        padding: 0 10px;
      }
      &:nth-of-type(even) {
        width: 70%;
      }
    }
  }
}
</style>
