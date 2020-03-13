
.<template>
  <div class="contwrap">
    <div class="title">
      <!-- <p>注册/登陆</p> -->
      <p>
      大麦晶城目前支持在线支付、对公转账和月结白条三类支付方式； 具体使用流程如下：
      </p>
     
    </div>
    <div class="cont">
      <div class="item">
        <div class="little">1､在线支付  包括：支付宝和微信支付；</div>
        <div class="lit">
          <p>第1步，结算页面选择“在线支付”</p>
          <img src="@/assets/image/footerWrap/paytype/1.jpg" alt />
        </div>
        <div class="lit">
          <p>  第2步，选择支付宝或微信支付</p>
           <img src="@/assets/image/footerWrap/paytype/2.jpg" alt />
        </div>
        <div class="lit">
          <p> 第3步，扫码并完成支付；</p>
          <p> 若在第2步选择了返回订单中心，则可以在订单列表中点击“全额付款”</p>
           <img src="@/assets/image/footerWrap/paytype/3.jpg" alt />
            <p> 同时，您也可以更变支付方式，若选择对公支付，请参见下一段；</p>
           <img src="@/assets/image/footerWrap/paytype/4.jpg" alt />
        </div>
      </div>
      <div class="item">
        <div class="little">2､对公转账</div>
        <div class="lit">
               <p> 第1步，结算页面选择公对公转账，并记录汇款的账户信息；</p>
           <img src="@/assets/image/footerWrap/paytype/5.jpg" alt />
          
        </div>
        <div class="lit">
               <p> 第2步，提交订单，线下安排汇款；请注意付款时限为24小时；</p>
         
          
        </div>
        <div class="lit">
               <p> 第3步，上传付款凭证或底单；</p>
           <img src="@/assets/image/footerWrap/paytype/6.jpg" alt />
            <p> 第4步，等待平台审核确认收款并完成支付；若被退回，请及时处理；</p>
        </div>
      </div>
      <div class="item">
        <div class="little">3､月结白条</div>
        <p>首先，月结白条是需要先申请，审批通过后按额度使用；</p>
        <div class="lit">
            <p>  第1步，用户中心>>申请月结，填写资料并获得审批通过，具体请查看“月结白条”流程；</p>
            <img src="@/assets/image/footerWrap/paytype/7.jpg" alt /> 
        </div>
        <div class="lit">
          <p> 第2步，选择商品、加购物车、并进入结算页面，支付方式选择“月结白条”；</p>
          <img src="@/assets/image/footerWrap/paytype/8.jpg" alt />
        </div>
        <div class="lit">
               <p>  第3步，提交订单，并返回订单中心；</p>
           <img src="@/assets/image/footerWrap/paytype/9.png" alt />
           
        </div>
        <div class="lit">
               <p>  第4步，下载系统的合同，盖章并签字后重新上传；等待合同审批</p>
           <img src="@/assets/image/footerWrap/paytype/10.jpg" alt />
           
        </div>
        <div class="lit">
               <p>   第5步，审批通过，<strong>需手动</strong>在订单列表中进行“白条支付”完成后，订单方才进行流转；未通过，请查看原因并及时处理；</p>
           <img src="@/assets/image/footerWrap/paytype/11.jpg" alt />
             <p>   若此时您不想使用白条付款，想换成其他支付方式，请点击“转普通订单”；</p>
           <img src="@/assets/image/footerWrap/paytype/12.jpg" alt />
           
        </div>
        <div class="lit">
               <p>     第6步，查看账单中心，按批复的月结周期按时付款；</p>
           <img src="@/assets/image/footerWrap/paytype/13.jpg" alt />
           
        </div>
      </div>
    </div>
  </div>
</template>
.<style lang="less" scoped>
.contwrap{
    color:#333;
    width:90%;
    margin:20px auto;
    .title{
        margin:20px auto;
        
    }
    .cont{
        .item{
            .little{
                margin-top:12px;
                
            }
            .lit{
                margin-top:12px;
                p{
                    margin-top:12px;
                }
            }
            img{
                margin-top:12px;
                width:100%;

            }
        }
    }
}
</style>