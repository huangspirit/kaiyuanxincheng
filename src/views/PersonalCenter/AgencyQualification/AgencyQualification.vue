<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
      <el-breadcrumb-item>代理资质</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="AgencyQualification">
        <el-button class="fr" style="margin-bottom:5px;"><router-link to="/PersonalCenter/AdditionalQualifications" tag="span">新增资质</router-link></el-button>
      <table width="100%" border="1" cellpadding="0" cellspacing="0" style="table-layout:fixed">
        <thead>
          <th>代理品牌</th>
          <th>有效期</th>
          <th>资质证明</th>
          <th>资质状态</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="item in 4" :key="item">
            <td>
              <div>
                <img src="@/assets/image/PersonalCenter/_u118147.png" alt>
                <span>罗彻斯特电子（RE）</span>
              </div>
            </td>
            <td>
              <div>
               2019-06-01
               至
                2019-06-01
              </div>
            </td>
            <td>
              <div @click="ViewMap(ViewMapUrl)" class="ViewMap">
                <img :src='ViewMapUrl' alt>
              </div>
            </td>
            <td>
              <div>
                <p>正常</p>
              </div>
            </td>
            <td>
              <div class="operation">
                  <el-button class="default"  @click="EditQualifica">编辑资质</el-button>
                  <el-button class="cancle" @click="dialogVisible = true">撤销资质</el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 撤销资质模态框 -->
      <SetTankuang :title="'撤销资质提示'" v-if="dialogVisible" @closeDialogCallBack="dialogVisible=false">
          <div class="dialog-body" slot="dialog-body">
              撤销后您将不再具有该品牌代理商资质 <br>
                发布该商品时不再显示代理商标签
          </div>
          <div slot="footer" class="dialog-footer fr">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="DeliveryCancel">确认撤销</el-button>
              <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>  -->
          </div>
      </SetTankuang>
    <el-dialog :visible.sync="dialogVisible2">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "AgencyQualification",
  data() {
    return {
      dialogVisible: false,
      // 放大资质图片
      dialogVisible2: false,
      ViewMapUrl:require("@/assets/image/PersonalCenter/u118165.png"),
      dialogImageUrl:''
    };
  },
  methods: {
    DeliveryCancel() {
      this.dialogVisible = false;
    },
    EditQualifica() {
      this.$router.push({
        path: "/PersonalCenter/AdditionalQualifications"
      });
    },
    // 查看资质图
    ViewMap(item){

      this.dialogVisible2 = true
      this.dialogImageUrl = item
    }
  }
};
</script>
<style lang="less" scoped>
@import "./AgencyQualification.less";
</style>
