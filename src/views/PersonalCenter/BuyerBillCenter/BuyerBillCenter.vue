<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>买家中心</el-breadcrumb-item>
      <el-breadcrumb-item>账单中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="BuyerBillCenter">
      <!-- 支出收入 -->
      <div class="SellerBillCenter-total">
        <div class="SellerBillCenter-total-l">
          <p>
            <span>当月应付款</span>
            <span>￥300000+$10000</span>
          </p>
          <p>
            <span>
              <span>当月支出：</span>
              <span>￥320000+$15000</span>
            </span>
            <span>
              <span>当月收入：</span>
              <span>￥1000000+$5000000</span>
            </span>
            <span>
              <span>累计欠账：</span>
              <span>￥1000000+$5000000</span>
            </span>
          </p>
        </div>
        <div class="SellerBillCenter-total-r">
          <p>
            <span class="sp">导出账单</span>
            <span>状态：未还款</span>
            <span>最终还款日：2019-05-22</span>
          </p>
          <p>
            <span>我的账期：月结60天</span>
            <el-popover placement="bottom" trigger="hover" popper-class="Statement-accounts">
              <div>
                <h4>账单说明</h4>
                <p>1.系统每月3日更新上月账单</p>
                <p>2.平台在账单更新后,3日内打款</p>
                <p>3.如果卖家未设定收款账号,则当月款项自动转到下一个月结算;</p>
              </div>
              <el-button slot="reference" type="text" style="font-size:20px;">账单说明</el-button>
            </el-popover>
            <span class="sp">立即付款</span>
          </p>
        </div>
      </div>
      <!-- 账单明细 -->
      <div class="SellerBillCenter-detail">
        <p class="detail-tit">
          <span>当月支出详情</span>
          <span>（账期：2019-05-01—2019-05-30）</span>
        </p>
        <table width="100%" border="1" cellpadding="0" cellspacing="0" style="table-layout:fixed">
          <thead>
            <th style="width:250px;">订单</th>
            <th>订单金额</th>
            <th>应付金额</th>
            <th>已付金额</th>
            <th>到期应付</th>
            <th>利息</th>
            <th>本期欠款</th>
          </thead>
          <tbody>
            <tr v-for="item in 7" :key="item">
              <td>
                <img src="@/assets/image/PersonalCenter/_u24718.png" alt>

                <div>
                  <el-popover placement="right" trigger="hover" popper-class="Order-details">
                    <div>
                      <p>订单编号：86627573023</p>
                      <p>
                        订单金额：
                        <span class="num">￥3000</span>
                      </p>
                      <ul>
                        <li v-for="item in 3">
                          <img src="@/assets/image/PersonalCenter/_u24718.png" alt>
                          <div>
                            <p class="num">EDHDFJHKS-234J</p>
                            <p>
                              <span>品牌：</span>
                              罗彻斯特电子
                            </p>
                            <p>
                              <span>功能描述：</span>
                              DIP
                            </p>
                          </div>
                          <p>
                            <span>单价：￥3.5</span>
                            <span>数量：10000</span>
                            <span>
                              <span>总价：</span>
                              <span class="num">￥300000</span>
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <p slot="reference" class="num" style="font-size:20px;">86627573023</p>
                  </el-popover>
                  <p>EDHDFJHKS-234J 等2个商品</p>
                </div>
              </td>
              <td>
                <p>￥300000</p>
                <span>2019-05-10 12:45:32</span>
              </td>
              <td>
                <p>￥3000</p>
                <span>(预付款)</span>
              </td>
              <td>
                <p>
                  ￥3000
                  <span>(月结)</span>
                </p>
                <span>2019-05-10 12:45:32</span>
              </td>
              <td>
                <p>￥3000</p>
                <span>(手续费)</span>
              </td>
              <td>
                <p>￥3000</p>
              </td>
              <td>
                <p class="num">￥1950</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="total-num">
          <span>
            总订单：
            <span class="num">25</span>
          </span>
          <span>
            订单应付：
            <span class="num2">￥300000+$10000</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "BuyerBillCenter"
};
</script>

<style lang="less" scoped>
  @import "./BuyerBillCenter.less";
</style>

