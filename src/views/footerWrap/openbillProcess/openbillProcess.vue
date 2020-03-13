
.<template>
  <div class="contwrap signIn">
    <div class="title">
      <!-- <p>注册/登陆</p> -->
      <p>
        目前，所有商家的发票均开给大麦晶城平台，商家在发货后或发货同时可以将发票统一寄送给平台；
      </p>
    </div>
    <div class="cont">
      <div class="item">
        <div class="little">1、单独寄送收票地址</div>
        <div>收票人：大麦晶城财务部</div>
        <div>地址：北京市海淀区上地金泰富地大厦312室</div>
        <div>电话：15701149917</div>
      </div>
      <div class="item">
        <div class="little">2､ 入口位置</div>
        <div class="lit">
          <p>1）订单管理</p>
        </div>
        <div class="lit">
          <p>2）账单中心</p>
        </div>
        <div class="lit">
          <p>3）开票管理</p>
        </div>
      </div>
      <div class="item">
        <div class="little">3、开票流程</div>
        <div class="lit">
            <p>1)所有订单在后台发货后便可进行开发票操作；</p>
            <p>2)以开票管理入口为例：点击卖家中心—>开票管理->未开票</p>
            <img src="@/assets/image/footerWrap/month/8.jpg" alt />
            <p>3)点击 开发票 按钮，找开弹窗</p>
            <img src="@/assets/image/footerWrap/month/9.jpg" alt />
            <p>4)开票完成，可查看开票的日期和寄送状态；也可以点击发票详情查看图片；</p>
             <img src="@/assets/image/footerWrap/month/10.jpg" alt />
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