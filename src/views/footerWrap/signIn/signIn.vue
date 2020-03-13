
.<template>
  <div class="contwrap signIn">
    <div class="title">
      <!-- <p>注册/登陆</p> -->
      <p>
        欢迎使用大麦晶城（以下简称：晶城）
        <a href="https://www.icmap.cn/#/">www.icmap.cn</a>
      </p>
    </div>
    <div class="cont">
      <div class="item">
        <div class="little">一、首页点击右上角“登陆/注册”</div>
        <img src="@/assets/image/footerWrap/signin/1.png" alt />
      </div>
      <div class="item">
        <div class="little">二、登陆：系统默认为“微信”注册/登陆方式；也可点击切换成QQ或手机验证码登陆；</div>
        <div class="lit">
          <p>1、微信登陆</p>
          <img src="@/assets/image/footerWrap/signin/2.png" alt />
        </div>
        <div class="lit">
          <p>2、QQ登陆</p>
          <img src="@/assets/image/footerWrap/signin/3.png" alt />
        </div>
        <div class="lit">
          <p>3､手机号短信验证登陆</p>
          <img src="@/assets/image/footerWrap/signin/4.png" alt />
        </div>
      </div>
      <div class="item">
        <div class="little">三、注册流程(一分钟极速注册)</div>
        <div class="lit">
          <p>1、选择注册方式：微信、QQ、手机号；但平面的所有注册方式均需要绑定手机号和公众号，手机号将作为你在晶城的唯一身份识别；</p>
          <img src="@/assets/image/footerWrap/signin/5.png" alt />
        </div>
        <div class="lit">
          <p>2、微信和QQ注册</p>
          <p>第一步，扫码</p>
          <p>第二步：填写手机号，获取验证码；仔细阅读《大麦晶城用户协议》和《隐私政策》，并勾选同意后点击绑定；</p>
          <img src="@/assets/image/footerWrap/signin/6.png" alt />
          <p>第三步：注册成功，还有最后一步；</p>
          <img src="@/assets/image/footerWrap/signin/7.png" alt />
          <p>第四步：绑定公众号：点击上一步中的去个人中心；点击用户中心首页的绑定微信公众号按钮；扫码后关注公众号即可完成绑定；（<strong>注意：若您原来已经注册本公众号，请先取消关注后再次扫码</strong> ）</p>
         <img src="@/assets/image/footerWrap/signin/8.jpg" alt />
        </div>
        <div class="lit">
          <p>3、手机号注册</p>
          <p>第一步：在注册登陆页选择手机号</p>
          <img src="@/assets/image/footerWrap/signin/9.png" alt />
          <p>第二步：输入手机号，获取验证码</p>
          <img src="@/assets/image/footerWrap/signin/10.png" alt />
          <p>第三、四步与微信注册一致，请参考上文</p>
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