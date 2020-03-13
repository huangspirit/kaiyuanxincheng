
.<template>
  <div class="contwrap signIn">
    <div class="title">
      <!-- <p>注册/登陆</p> -->
      <p>大麦晶城是一个特价共享的撮合交易平台，为买家和卖家提供一个公平透明的交易环境；因此，平台只提供产品的基础数据，价格由商家自行发布，若您搜索的型号没有人商家价格信息，说明该型号还没有人共享价格；</p>
    </div>
    <div class="cont">
      <div class="item">
        <div class="little">一、搜索框的位置</div>
        <div class="lit">
          <p>1、首页首屏</p>
          <img src="@/assets/image/footerWrap/searchSpecial/1.png" alt />
        </div>
        <div class="lit">
          <p>2、其它所有屏的顶部</p>
          <img src="@/assets/image/footerWrap/searchSpecial/2.jpg" alt />
        </div>
        <div class="lit">
          <p>3､用户可以通过在搜索框中输入您想搜索的零件型号、品牌、类别的关键字，在搜索结果下拉列表中选择您想要的型号；</p>
        </div>
      </div>
      <div class="item">
        <div class="little">二、搜索场景</div>
        <div class="lit">
          <p class="color">场景1：我知道完整的零件型号或部分型号；</p>
          <p>举例：ADUM1201ARZ-RL7 ADI</p>
          <p>第1步：逐步输入型号的任何连续部分（如：1201ar），系统会自动筛选符合要求的型号，不分大小写；显示的内容为：完整型号+（品牌）</p>
          <img src="@/assets/image/footerWrap/searchSpecial/3.jpg" alt />
          <p>第2步：点击您需要的型号，进入产品详情页；</p>
          <img src="@/assets/image/footerWrap/searchSpecial/4.jpg" alt />
          <p>第3步，查看所有商家发布的信息；选择心仪的价格和交货条件下单；</p>
          <p>第4步（可选），比价</p>
        </div>
        <div class="lit">
          <p class="color">场景2：我不太清楚完整的型号和品牌，但我知道我想要的参数；</p>
          <p>举例：我想找一款双通道的隔离器 速度：1M 隔离电压：2500V；</p>
          <p>第1步，进入首页，将页面拉至底部；</p>
          <img src="@/assets/image/footerWrap/searchSpecial/5.jpg" alt />
          <p>第2步,选择您需要的零件类别：隔离器->数字隔离器，进入零件的参数筛选页面; 按照自己所掌握的参数进行筛选；从目前这个要求看还有很多符合条件。</p>
          <img src="@/assets/image/footerWrap/searchSpecial/6.jpg" alt />
          <p>第3步，继续筛选参数，直到满足条件为止；</p>
          <img src="@/assets/image/footerWrap/searchSpecial/7.png" alt />
          <p>第4步，点击型号，进入详情页查看详细的价格</p>
          <img src="@/assets/image/footerWrap/searchSpecial/8.jpg" alt />
          <p>第5步，（可选）比价，多于3个商家发布的可以勾选比价；</p>
        </div>
      </div>
    </div>
  </div>
</template>
.<style lang="less" scoped>
.contwrap {
  color: #333;
  width: 90%;
  margin: 20px auto;
  .title {
    margin: 20px auto;
    
  }
  .cont {
    .item {
      .little {
        margin-top: 12px;
        
      }
      .lit {
        margin-top: 12px;
        p {
          margin-top: 12px;
        }
      }
      img {
        margin-top: 12px;
        width: 100%;
      }
    }
  }
}
</style>