
.<template>
  <div class="contwrap signIn">
      <div class="title">对账单主要是给使用月结白条客户的对账工具。只有申请并通过审批的用户才有此功能。</div>
    <div class="cont">
      <div class="item">
        <div class="little">一、适用范围</div>
        <p>必须同时满足以下两个条件才会在对账单在显示；</p>
        <p>1)月结用户</p>
        <p>2)使用“<a href="/#/footerWrap/monthWhitestrip?index=4">月结白条</a>”下单并用“月结白条”支付成功的订单；</p>
      </div>
      <div class="item">
        <div class="little">二、 交易密码</div>
        <div class="lit">
          <p>系统为对账单做了加密功能，第一次使用对账单的用户会提示设置一个新密码；</p>
           <img src="@/assets/image/footerWrap/month/11.jpg" alt />
        </div>
      </div>
      <div class="item">
        <div class="little">三、查看对账单</div>
        <div class="lit">
            <img src="@/assets/image/footerWrap/month/12.jpg" alt />
        </div>
      </div>
      <div class="item">
        <div class="little">四、若您对账单有疑议，请点击右上角的：问题反馈；请在对账日的往后5个工作日内完成对账；没有问题，点击确认对账；5个工作日后系统默认账单无误并开具增值税发票给买家；</div>
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