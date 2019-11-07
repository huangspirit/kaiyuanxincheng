<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>特价管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <router-link to="/PersonalCenter/sellerPushProduct/publish">
        <el-button size="mini" class="fr" type="primary">发布产品</el-button>
      </router-link>
      <ul>
        <li class="bgColor">上架</li>
        <li>下架</li>
      </ul>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>
.<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
.<style lang="less" scoped>
.title{
    color:#333;
  
    background:#fff;
    padding:15px 10px;
    ul{
        display: flex;
        li{
            width:100px;
            text-align: center;
            line-height: 40px;
            background:#e3e3e3;
            margin-right:1px;
            cursor: pointer;
            &:hover{
                color:#df3f2f;
            }
        }
    }
}
</style>