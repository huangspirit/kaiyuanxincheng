
.<template>
  <div class="contwrap signIn">
    <div class="title">
      <!-- <p>注册/登陆</p> -->
      <p>
        当您注册成功后，请一定记得绑定公众号，以便于您能快速及时的接收来自平台的各种通知信息，包括订单通知、发货通知，支付通知，特价通知等等；
      </p>
    </div>
    <div class="cont">
      <div class="item">
        <img src="@/assets/image/footerWrap/bindwechat/1.jpg" alt />
      </div>
      <div class="item">
        <div class="lit">
          <p>第1步，进入个人用户中心</p>
          <img src="@/assets/image/footerWrap/bindwechat/2.jpg" alt />
        </div>
        <div class="lit">
          <p>第2步、点击绑定微信公号</p>
          <p>第3步、扫码，关注公众号</p>
          <p>第4步，绑定完成</p>
          <img src="@/assets/image/footerWrap/bindwechat/3.jpg" alt />
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