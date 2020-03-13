
.<template>
  <div class="contwrap signIn">
    <div class="cont">
      <div class="item">
        <div class="little">1、发货流程</div>
        <img src="@/assets/image/footerWrap/hdelivery/1.png" alt />
      </div>
      <div class="item">
        <div class="little">2、发货时间要求</div>
        <div class="lit">
          <p>国内交货：现货需在买家付款成功后24小时内进行发货或送货到指定地定；订货不得晚于商家约定的交货时间发出；</p>
        </div>
        <div class="lit">
          <p>香港交货：现货需在买家付款成功后48小时内送出，订货在收到水单后48小时内送出；</p>
        </div>
      </div>
      <div class="item">
        <div class="little">3、发货包装要求</div>
        <div class="lit">
          <p>国内交货：1、需按订单分别进行包装；如同一型号有3个订单数量分别为：100、200、500只；发货时需要分成3个包装，贴上标签；</p>
          <p>香港交货：需注明平台提供的入仓单号,否则仓库不知道是谁的货而拒收；</p>
          <p>发货标签：请尽量按平台后台提供的标签样式进行打印；</p>
        </div>
      </div>
      <div class="item">
        <div class="little">4、操作流程</div>
        <div class="lit">
            <p>情景1：多订单多料号一起发货</p>
            <p>第1步，进入卖家订单中心，点击可发货的商品 后面的“加入发货筐”后即已经加入发货筐；</p>
                 <img src="@/assets/image/footerWrap/hdelivery/2.png" alt />
            <p>第2步，点击右上角“发货筐”，进入发货筐页面；</p>
            <img src="@/assets/image/footerWrap/hdelivery/3.png" alt />
            <p>  第3步，分步进行国内发货和香港上传PI通知; 此外也可以对不想立即发货的型号进行移除；</p>
               <img src="@/assets/image/footerWrap/hdelivery/4.png" alt />
            <p>  第4步，快递的请选择快递公司，也可以选择商家送货至最近的收货点；</p>
       
            <img src="@/assets/image/footerWrap/hdelivery/5.png" alt />
              
                <p> 第5步，选择离您最近所货点，并点击确定；</p>
                  <p>  第6步，点击下载发货单；也可以直接关闭不下载；</p>
                    <img src="@/assets/image/footerWrap/hdelivery/6.png" alt />
                  <p>  第7步（可选）下载发货单，Excel表格的形式；</p>
         
        </div>
        <div class="lit">
          <p>情景2：同料号多个订单一起发货</p>
          <p>第1步 点击左侧的产品型号；</p>
           <img src="@/assets/image/footerWrap/hdelivery/7.png" alt />
          <p>第2步 若想将所有可发货订单全部发出，点击右上角的：一键加入发货筐；若想挑选订单发货，可直接点击右侧的加入发货筐；</p>
            <img src="@/assets/image/footerWrap/hdelivery/8.png" alt />
          <p>第3步，关闭挑选其他料，或点击右上角的：发货筐；</p>
          <p>第4步，重复上文中的第2-7步；</p>
        </div>
      </div>
       <div class="item">
        <div class="little">5、发货通知
所有发货均会在系统消息、手机短信、微信公众号及小程序中均有通知，请及时关注【大麦晶城】的各种通知；</div>
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
                &:first-of-type{
                    font-weight: bold;
                }
               
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