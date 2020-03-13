<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>代理资质</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="AgencyQualification">
      <el-button class="bgColor" style="margin-bottom:5px;">
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
                {{item.startTime | formatDate(item.startTime)}}
                至
                {{item.endTime | formatDate(item.endTime)}}
              </div>
            </td>
            <td>
              <div @click="ViewMap(item.qualificationImg)" class="ViewMap">
                <img :src="item.qualificationImg" alt />
              </div>
            </td>
            <td>
              <div>
                <p>{{item.isEnable | filterIsenabled}}</p>
                <!-- <p v-if="item.isEnable == true">已审核</p>
                <p v-if="item.isEnable == false">未审核</p> -->
                <p v-if="item.reason && item.isEnable==2" class="color">原因：{{item.reason}}</p>
              </div>
            </td>
            <td>
              <div class="operation">
                <el-button class="default" @click="EditQualifica(item)" v-if="item.isEnable!=1">编辑资质</el-button>
                <el-button class="cancle" @click="deleteFication(item.id)">撤销资质</el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p style="text-align:center;line-height:45px;" v-if="qualificationList.length<=0">暂无数据</p>
      <div class="Pagination" v-if="qualificationList.length>0">
        <!-- 分页 -->
        <el-pagination
          layout="prev, pager, next, jumper"
          :page-size="pageSize"
          :total="total"
          background
          @current-change="change"
        ></el-pagination>
      </div>
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
    <el-dialog class="imgDialog" :visible.sync="dialogVisible2">
      <img :src="dialogImageUrl" alt />
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
      dialogImageUrl: "",
      qualificationList: [],
      deleteFicationId: "",
      total: 0,
      pageSize: 10,
      currentPage: 0,
      start: 0
    };
  },
  mounted() {
    this.getQualificationList();
  },
  filters: {
    filterIsenabled(val){
      switch(val){
        case 0:
          return "待审核";
        case 1:
          return "已通过";
        case 2:
          return "已拒绝";
      }
    }
  },
  methods: {
    resetQualifica(item){

    },
    getQualificationList() {
      axios
        .request({
          ...agentFication.getQualificationList,
          params: { start: this.start, length: this.pageSize }
        })
        .then(res => {
          console.log(res);
          if (res.resultCode == "200") {
            this.qualificationList = [];
            if (res.data != null) {
              this.qualificationList = res.data.data;
              this.total = res.data.total;
            }
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
            this.$message.success("撤销成功");
            this.getQualificationList();
          }
        });
    },
    EditQualifica(item) {
      console.log(item, "编辑");
      this.$store.dispatch("applyEdit", item);
      this.$router.push({
        path: "/PersonalCenter/AdditionalQualifications"
      });
    },
    // 查看资质图
    ViewMap(item) {
      console.log(item);
      this.dialogVisible2 = true;
      this.dialogImageUrl = item;
    },
    change(val) {
      console.log(val);
      this.start = (val - 1) * this.pageSize;
      this.getQualificationList();
    }
  },
  destroyed() {
    eventBus.$off("agentQualification");
  }
};
</script>
<style lang="less">
.imgDialog {
  .el-dialog__body {
    > img {
      max-height: 600px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
<style lang="less" scoped>
@import "./AgencyQualification.less";
</style>
