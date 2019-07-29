<template >
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>卖家中心</el-breadcrumb-item>
      <el-breadcrumb-item>账单中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="SellerBillCenter">
      <!-- 支出收入 -->
      <div class="SellerBillCenter-total">
        <div class="SellerBillCenter-total-l">
          <p>
            <span>档期应收款</span>
            <span>￥300000+$10000</span>
          </p>
          <p>
            <span>本月已收款：￥320000+$15000</span>
            <span>历史共收款：￥1000000+$5000000</span>
          </p>
        </div>
        <div class="SellerBillCenter-total-r">
          <p>
            <span>管理收款账户</span>
            <span>状态：平台已打款(2/2)</span>
          </p>
          <div>
            <span>去看支出明细</span>
            <el-popover placement="bottom" trigger="hover" popper-class="Details-payment">
              <ul>
                <li>
                  <div>
                    <p>
                      <span>汇款金额：</span>
                      <span class="num">￥300000</span>
                    </p>
                    <p>
                      <span>流水单号：</span>
                      <span>00000000000000</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>汇款账号：</span>
                      <span>620000000000000000</span>
                    </p>
                    <p>
                      <span>汇款银行：</span>
                      <span>招商银行</span>
                    </p>
                    <p>
                      <span>汇款户名：</span>
                      <span>北京芯手网科技有限公司</span>
                    </p>
                    <p>
                      <span>汇款日期：</span>
                      <span>2019-05-15 12:00:00</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>收款账号：</span>
                      <span>620000000000000000</span>
                    </p>
                    <p>
                      <span>收款银行：</span>
                      <span>招商银行</span>
                    </p>
                    <p>
                      <span>收款户名：</span>
                      <span>王三</span>
                    </p>
                  </div>
                </li>
              </ul>
              <el-button slot="reference" type="text" style="font-size:20px;">打款详情</el-button>
            </el-popover>
            <el-popover placement="bottom" trigger="hover" popper-class="Statement-accounts">
              <div>
                <h4>账单说明</h4>
                <p>1.系统每月3日更新上月账单</p>
                <p>2.平台在账单更新后,3日内打款</p>
                <p>3.如果卖家未设定收款账号,则当月款项自动转到下一个月结算;</p>
              </div>
              <el-button slot="reference" type="text" style="font-size:20px;">账单说明</el-button>
            </el-popover>
          </div>
        </div>
      </div>
      <!-- 账单明细 -->
      <div class="SellerBillCenter-detail">
        <p class="detail-tit">
          <span>当月收入详情</span>
          <span>（账期：2019-05-01—2019-05-30）</span>
        </p>
        <table width="100%" border="1" cellpadding="0" cellspacing="0" style="table-layout:fixed">
          <thead>
            <th style="width:250px;">订单</th>
            <th>订单金额</th>
            <th>已付金额</th>
            <th>代收金额</th>
            <th>服务费</th>
            <th>异常扣除</th>
            <th>实际应收款</th>
          </thead>
          <tbody>
            <tr v-for="item in 7" :key="item">
              <td>
                <img src="@/assets/image/PersonalCenter/_u24718.png" alt>

                <div>
                  <el-popover placement="bottom-right" trigger="hover" popper-class="Order-details">
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
              </td>
              <td>
                <p>￥3000</p>
                <span>(预付款)</span>
                <span>2019-05-10 12:45:32</span>
              </td>
              <td>
                <p>￥3000</p>
              </td>
              <td>
                <p>￥3000</p>
                <span>(手续费)</span>
              </td>
              <td>
                <p>￥3000</p>
                <span>(违约金)</span>
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
            总金额：
            <span class="num">￥320000+$15000</span>
          </span>
          <span>
            扣除：
            <span class="num2">￥20000+$5000</span>
          </span>
          <span>
            总计应收：
            <span class="num">￥300000+$10000</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./SellerBillCenter.less";
</style>

<script>

export default {
  name: "SellerBillCenter"
};
</script>
