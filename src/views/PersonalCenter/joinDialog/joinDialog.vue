<template>
  <div class="contWrap">
    <div class="top">
      <p>
        <span class="bgColor" @click="join">商家入驻</span>
      </p>
      <h3>他们都已成为了大麦晶城的卖家</h3>
    </div>
    <div class="wrap">
      <ul>
        <li>
          <p class="tit">我是ADI代理商</p>
          <img src="@/assets/logo1.png" alt />
          <div>以后不用求销售要业绩了，我的产品线我做主；天天只要跟原厂搞价格，业绩自然不用愁。要是搞定原厂，还可以原厂名义开直营店</div>
        </li>
        <li>
          <p class="tit">我是艾睿的PM</p>
          <img src="@/assets/logo1.png" alt />
          <div>我的很多特价终于有地方出货了；入驻大麦晶城最大的好处是商家可匿名，再也不用担心我原来卖高价的客户会发现我在这里卖特价……</div>
        </li>
        <li>
          <p class="tit">我是华强北商家</p>
          <img src="@/assets/logo1.png" alt />
          <div>没有差价，非常透明。加入开元不但可以扩大我的销路，销量上来可以增加我对上游供应商谈价能力；加速库存的周转；而且这里只接受原装正品，也能规范我们以后的经营......</div>
        </li>
        <li>
          <p class="tit">我是国内IC设计原厂</p>
          <img src="@/assets/logo1.png" alt />
          <div>入驻大麦晶城，不仅可以实现样品发放，在线完成特价申请和管理，而且可以实现新产品的精准营销和推送服务；</div>
        </li>
        <li>
          <p class="tit">我是公司采购</p>
          <img src="@/assets/logo1.png" alt />
          <div>发现平台上很多型号的价格都不如我买的低，以个人名义也可以入驻发布特价；收到订单我只需下单给渠道，其他事情报关、发货、发票的事情平台都帮我搞定,太省心了......</div>
        </li>
        <li>
          <p class="tit">我是公司的库管</p>
          <img src="@/assets/logo1.png" alt />
          <div>每当看到公司库房积压的死库存就闹心；年年要盘库还占地方；自从入驻了大麦晶城,把这些死库存发出来给有需要的人；能为公司收回一点成本很开心；</div>
        </li>
      </ul>
      <div class="btnwrap">
          <h4><label for="">我们只有一个要求，必须是原装正品！！！</label> </h4>
          <div style="margin:15px;"><el-button type="danger" class="bgColor"  @click="join">快来加入我们吧</el-button></div>
          <div>3分钟快速完成入驻，无门槛，公司个人均可</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.contWrap {
    background:#fff;
    // width:800px;
    margin:0 auto;
    padding:30px;
    color:#333;
    .top{
        text-align: center;
        span{
            padding:10px 70px;
            border-radius: 5px;
            margin-bottom:20px;
            cursor: pointer;
        }
    }
  .wrap {
      text-align: center;
    ul {
      display: flex;
      flex-wrap:wrap;
      margin:20px auto;
      li{
          width:32%;
          padding:10px 15px;
          box-sizing: border-box;
          text-align: center;
          margin-top:10px;
          border:1px solid #bbb;
          margin:0.5%;
          font-size:13px;
          line-height: 1.6;
          img{
              margin:10px;
          }
          div{
              text-align: left;
          }
      }
    }
  }
}
</style>
<script>
export default {
    methods:{
         join() {
      this.$router.push({
        path: "/OriginalFactoryEntry/BasicInforma"
      });
    }
    }
}
</script>