<template>
  <router-link to="/OriginalFactoryEntry/BasicInforma" class="originFactoryEntry" tag="div">
    <el-carousel :interval="5000" height="60vh" :loop="true">
      <el-carousel-item>
        <img src="http://brand.113ic.com/73e0b038097a4560bb85d2d2b65478bc.jpg" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="http://brand.113ic.com/1e476ef5ed1246e281deae5b2c0a6ed8.jpg" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="ruzhu">
      <span class="btn">免费入驻</span>
      <div>他们都是大卖晶城的卖家</div>
    </div>
    <div class="desclist allWidth">
      <div v-for="item in descList" :key="item.name">
        <img :src="item.url" alt />
        <div class="name">{{item.name}}</div>
        <div class="desc">{{item.desc}}</div>
      </div>
    </div>
    <div class="allWidth descList">
      <p style="font-size:44px;margin-bottom:20px">入驻条件</p>
      <div>我们只有一个要求，只卖原装正品！！！</div>
      <div class="joinlist">
        <div v-for="item in joinlist" :key="item.name">
          <p class="name">{{item.name}}</p>
          <div class="desc">
            <p>{{item.desc}}</p>
            <p v-if="item.desc1">{{item.desc1}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="allWidth" style="text-align:center">
      <p style="font-size:44px;margin-bottom:20px">入驻流程</p>
      <div>2分钟完成注册与资料上传，1天内完成审批</div>
      <div >
        <img src="http://brand.113ic.com/77d6b59c242046cf9ad8a6fafded8a6e.jpg" alt style="margin:60px auto;width:500px" />
      </div>
    </div>
    <div class="allWidth footer" >
        <p >要大卖，就来大卖晶城，一个有温度的平台</p>
    </div>
    
  </router-link>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      contHeight: 1000,
      joinlist: [
        {
          name: "原厂商",
          desc: "国内外原厂商、IC设计公司、品牌商独占品牌的授权代理商"
        },
        {
          name: "代理商",
          desc: "获得原厂商正规授权的代理商"
        },
        {
          name: "贸易商",
          desc: "无任何限制，公司个人均可",
          desc1: "底线：原装正品"
        },
        {
          name: "终端用户",
          desc: "只要你有特价，就可以分享 ",
          desc1: "垫资、物流、发票我们全搞定"
        }
      ],
      descList: [
        {
          url: "http://brand.113ic.com/d861691e1b70445b9cfa28eb670b19d2.jpg",
          name: "我是ADI代理商",
          desc:
            "以后不用求销售要业绩了，我的产品线我做主;天天只要跟原厂搞价格，业绩自然不用愁。要是搞定原厂，还可以原厂名义开直营店"
        },
        {
          name: "我是艾睿的PM",
          desc:
            "我的很多特价终于有地方出货了；入驻大麦晶城最大的好处是商家可匿名，再也不用担心我原来卖高价的客户会发现我在这里卖特价",
          url: "http://brand.113ic.com/1bc677adb66c4ed683af0236d2dd16eb.jpg"
        },
        {
          url: "http://brand.113ic.com/a0f7e4de63fb447e9fd7ef247e29bb09.jpg",
          name: "我是华强北商家",
          desc:
            "没有差价，非常透明。加入大麦晶城不但可以扩大我的销路，销量上来可以增加我对上游供应商谈价能力；加速库存的周转；而且这里只接受原装..."
        },
        {
          url: "http://brand.113ic.com/ffc63ea5559142d1a713662594ecee43.jpg",
          name: "我是国内IC设计原厂",
          desc:
            "入驻大麦晶城，不仅可以实现样品发放，在线完成特价申请和管理，而且可以实现新产品的精准营销和推送服务"
        },
        {
          url: "http://brand.113ic.com/71ef6951ea0244aa83e533dfa5233d12.jpg",
          name: "我是公司采购",
          desc:
            "发现平台上很多型号的价格都不如我买的低，以个人名义也可以入驻发布特价；收到订单我只需下单给渠道，其他事情报关、发货、发票的事情等..."
        },
        {
          url: "http://brand.113ic.com/cc4f66ab328d4b32b854475bf76450be.jpg",
          name: "我是公司的库管",
          desc:
            "每当看到公司库房积压的死库存就闹心；年年要盘库还占地方；自从入驻了大麦晶城，把这些死库存发出来给有需要的人；能为公司收回..."
        }
      ]
    };
  },
  created() {
    console.log(window.screen.height);
    this.contHeight = window.screen.height - 180;
  },
  methods: {
    ...mapMutations("OriginalFactoryEntry", ["setJoinForm"])
  },
  mounted() {
    this.setJoinForm({});
  }
};
</script>
<style scoped lang="less">
.originFactoryEntry {
  color: #333;
  .ruzhu {
    text-align: center;
    font-size: 44px;
    margin: 60px 0;
    .btn {
      padding: 0 98px;
      height: 65px;
      line-height: 65px;
      font-size: 36px;
      border-radius: 65px;
      cursor: pointer;
      background: linear-gradient(
        90deg,
        rgba(255, 208, 0, 1) 0%,
        rgba(255, 189, 0, 1) 100%
      );
      margin-bottom: 30px;
      color: #fff;
    }
  }
  .desclist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > div {
      width: 32%;
      margin-bottom: 30px;
      background: #fff;
      .name {
        text-align: center;
        margin: 25px 0;
        font-weight: 400;
      }
      .desc {
        font-size: 14px;
        padding: 20px;
      }
      img {
        width: 100%;
      }
    }
  }
  .descList {
    text-align: center;
    .joinlist {
        display:flex;
        flex-wrap:wrap;
        justify-content: space-between;
        margin-top: 60px;
        &>div{
            width:49%;
            text-align: left;
            padding:40px 30px;
            box-sizing: border-box;
            color:#fff;
            margin-bottom:20px;
            &:first-of-type{
                background: #1890FF;
            }
            &:nth-of-type(2){
                background: #00C99C;
            }
            &:nth-of-type(3){
                background: #B4B4B4;
            }
            &:nth-of-type(4){
                background: #F5A623;
            }
            .name{
                font-size:20px;
                margin-bottom:10px;
            }
            .desc{
                font-size:14px;
            }
        }
    }
  }
  .footer{
      background: url(http://brand.113ic.com/8120edb6279b4aada9903f9d35f33435.jpg) no-repeat center center;
      background-size: 100% auto;
      height: 95px;
      line-height: 95px;
      text-align: center;
      font-size:34px;
      margin-bottom:60px;
  }
}
</style>
