<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
      <el-breadcrumb-item>代理资质</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="AgencyQualification">
      <el-button class="fr" style="margin-bottom:5px;">
        <router-link to="/PersonalCenter/AdditionalQualifications" tag="span">新增资质</router-link>
      </el-button>
      <table width="100%" border="1" cellpadding="0" cellspacing="0" style="table-layout:fixed">
        <thead>
          <th>代理品牌</th>
          <th>有效期</th>
          <th>资质证明</th>
          <th>资质状态</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(item,index) in qualificationList" :key="index">
            <td>
              <div>
                <!-- <img src="@/assets/image/PersonalCenter/_u118147.png" alt /> -->
                <span>{{item.brandName}}</span>
              </div>
            </td>
            <td>
              <div>
                {{item.startTime}}
                至
                {{item.endTime}}
              </div>
            </td>
            <td>
              <div @click="ViewMap(ViewMapUrl)" class="ViewMap">
                <img :src="item.qualificationImg" alt />
              </div>
            </td>
            <td>
              <div>
                <p v-if="item.isEnable == true">已审核</p>
                <p v-if="item.isEnable == false">未审核</p>
              </div>
            </td>
            <td>
              <div class="operation">
                <el-button class="default" @click="EditQualifica(item)">编辑资质</el-button>
                <el-button class="cancle" @click="deleteFication(item.id)">撤销资质</el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 撤销资质模态框 -->
    <SetTankuang :title="'撤销资质提示'" v-if="dialogVisible" @closeDialogCallBack="dialogVisible=false">
      <div class="dialog-body" slot="dialog-body">
        撤销后您将不再具有该品牌代理商资质
        <br />发布该商品时不再显示代理商标签
      </div>
      <div slot="footer" class="dialog-footer fr">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="DeliveryCancel">确认撤销</el-button>
        <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>  -->
      </div>
    </SetTankuang>
    <el-dialog :visible.sync="dialogVisible2">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { axios, agentFication } from "@/api/apiObj";
export default {
  name: "AgencyQualification",
  data() {
    return {
      dialogVisible: false,
      // 放大资质图片
      dialogVisible2: false,
      ViewMapUrl: require("@/assets/image/PersonalCenter/u118165.png"),
      dialogImageUrl: "",
      qualificationList: [],
      deleteFicationId: ""
    };
  },
  mounted() {
    this.getQualificationList();
  },
  methods: {
    getQualificationList() {
      axios
        .request({
          ...agentFication.getQualificationList,
          params: { start: 0, length: 10 }
        })
        .then(res => {
          console.log(res);
          if (res.resultCode == "200") {
            this.qualificationList = res.data.data;
          }
        });
    },
    deleteFication(val) {
      this.dialogVisible = true;
      this.deleteFicationId = val;
    },
    DeliveryCancel() {
      axios
        .request({
          ...agentFication.delQualificationList,
          params: { id: this.deleteFicationId }
        })
        .then(res => {
          console.log(res);
          if (res.resultCode == "200") {
            this.dialogVisible = false;
          }
        });
    },
    EditQualifica(item) {
      console.log(item, "编辑");
      this.$store.dispatch('applyEdit',item)
      this.$router.push({
        path: "/PersonalCenter/AdditionalQualifications"
      });
    },
    // 查看资质图
    ViewMap(item) {
      this.dialogVisible2 = true;
      this.dialogImageUrl = item;
    }
  },
  destroyed() {
    eventBus.$off("agentQualification");
  }
};
</script>
<style lang="less" scoped>
@import "./AgencyQualification.less";
</style>
