<template>
  <!-- 发布拼团 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
      <el-breadcrumb-item>发布拼团</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="SellerIssuesSyndication">
      <p class="title">填写拼团信息</p>
      <div class="form-list">
        <div>
          <label for>币种</label>
          <select name id>
            <option value>$美元</option>
            <option value>￥人民币</option>
          </select>
        </div>
        <div>
          <label for>价格</label>
          <input type="text">
        </div>
        <div>
          <label for>MOQ</label>
          <input type="text">
        </div>
        <div>
          <label for>MPQ</label>
          <input type="text">
        </div>
        <div>
          <label for>库存</label>
          <input type="text">
        </div>
        <div>
          <label for>成团量</label>
          <input type="text">
          <p class="small">即拼团最小总量，到结束时间未达成成团量，拼团失败。</p>
        </div>
        <div class="end-time">
          <label for>结束时间</label>
          <div>
            <select name id>
              <option value>2019年</option>
              <option value>2020年</option>
            </select>
            <select name id>
              <option value>1月</option>
              <option value>2月</option>
            </select>
            <select name id>
              <option value>1日</option>
              <option value>2日</option>
            </select>
            <select name id>
              <option value>10时</option>
              <option value>11时</option>
            </select>
            <span>:</span>
            <select name id>
              <option value>00分</option>
              <option value>01分</option>
            </select>
          </div>
        </div>
        <div>
          <label for>交货地</label>
          <select name id>
            <option value>中国大陆</option>
            <option value>香港</option>
          </select>
        </div>
        <div class="date">
          <label for>预计交期</label>
          <div>
            <select name id>
              <option value>2019年</option>
              <option value>2020年</option>
            </select>
            <select name id>
              <option value>6月</option>
              <option value>7月</option>
            </select>
            <select name id>
              <option value>1日</option>
              <option value>2日</option>
            </select>
          </div>
        </div>
        <div class="release">
          <span>发布该商品</span>
        </div>
        <div class="preview">
          <span>
            <img src="@/assets/image/PersonalCenter/u65597.png" alt> 预览
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./SellerIssuesSyndication.less";
</style>

<script>

export default {
  name: "SellerIssuesSyndication"
};
</script>
