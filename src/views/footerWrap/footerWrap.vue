.<template>
  <div class="allWidth footerWrap">
    <div class="title color">
      <h1>大麦晶城</h1>
      <span>平台规则</span>
    </div>
    <div class="wrap">
      <div class="footerside">
        <el-menu
          :default-active="active"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :default-openeds="defaultOpeneds"
        >
          <el-submenu :index="item.index" v-for="(item,k0) in routers" :key="item.index">
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="item0.index" v-for="(item0,k) in item.child" :key="item0.index">
                 <router-link :to="{
                     path:item0.path,
                     query:{
                         index:item0.query
                     },
                     }">{{item0.name}}</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="footerDetail" style="width:100%">
        <div class="tit">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>平台规则</el-breadcrumb-item>
            <el-breadcrumb-item>
              <span>{{name0}}</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <a>{{name}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
            <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
.<script>
export default {
  data() {
    return {
      active: "",
      defaultOpeneds: [""],
      routers:[
          {
              index:"1",
              name:'新手上路', 
              child:[
                {
                      index:"1-3",
                      name:'用户注册',
                      path:'signIn',
                       query:"1"
                  },
                  {
                      index:"1-4",
                      name:'公众号绑定',
                      path:'bindWeChat',
                       query:"1"
                  },
                  {
                      index:"1-1",
                      name:'搜索特价',
                      path:'searchSpecial',
                      query:"1"
                  },
                  {
                      index:"1-2",
                      name:'如何下单',
                      path:'createOrder',
                       query:"1"
                  },
                  

              ]
          },
          {
              index:'2',
              name:'交易说明',
              child:[
                  {
                      index:'2-1',
                      name:'交货周期',
                      path:"interDeliver",
                      query:"2"
                  },
                  {
                      index:'2-2',
                      name:'交货地点',
                      path:"hkDeliver",
                      query:"2"
                  },
                  {
                    index:'3',
                      name:'支付方式',
                      path:"payType",
                      query:"2"
                  }
              ]
          },
          {
              index:'3',
              name:'商家支持',
              child:[
                {
                      index:'3-0',
                      name:'发布特价',
                      path:"publishSpe",
                      query:"3"
                  },
                  // {
                  //     index:'3-1',
                  //     name:'发布产品',
                  //     path:"pulishPro",
                  //     query:"3"
                  // },
                  {
                      index:'3-2',
                      name:'如何发货',
                      path:"hdeliver",
                      query:"3"
                  },
                  {
                      index:'3-3',
                      name:'售卖额度',
                      path:"sellMoney",
                      query:"3"
                  },
                  {
                      index:'3-4',
                      name:'开票流程',
                      path:"openbillProcess",
                      query:"3"
                  }
              ]
          },
          {
              index:'4',
              name:'会员中心',
              child:[
                  {
                      index:'4-1',
                      name:'会员等级',
                      path:"viplevel",
                      query:"4"
                  },
                  {
                      index:'4-2',
                      name:'晶豆',
                      path:"jingDou",
                       query:"4"
                  },
                  {
                      index:'4-3',
                      name:'月结白条',
                      path:"monthWhitestrip",
                      query:"4"
                  },
                  {
                      index:'4-4',
                      name:'月结额度',
                      path:"monthquota",
                       query:"4"
                  },
                  {
                      index:'4-5',
                      name:'账单中心',
                      path:"billcenter",
                       query:"4"
                  }
                  
              ]
          },
          {
              index:'5',
              name:'政策协议',
              child:[
                  {
                      index:'5-1',
                      name:'用户注册协议',
                      path:"Registration",
                      query:"5"
                  },
                  {
                      index:'5-2',
                      name:'商家入驻协议',
                      path:"Settlement",
                      query:"5"
                  },
                  {
                      index:'5-3',
                      name:'购销框架协议',
                      path:"Buyandsell",
                      query:"5"
                  },
                  {
                      index:'5-4',
                      name:'隐私保护政策',
                      path:"Privacyprotection",
                      query:"5"
                  }
              ]
          }
      ],
      name0:"",
      name:"",
    };
  },
  
  mounted() {
    this.defaultOpeneds = [this.$route.query.index];
    this.name0= this.routers[Number(this.$route.query.index)-1].name
    let arr = this.routers[Number(this.$route.query.index)-1].child;
    this.name = arr.find(item=>{
        return item.path==this.$route.name
    }).name;
    
  },
  watch:{
      $route(newval){
        this.name0= this.routers[Number(this.$route.query.index)-1].name
        let arr = this.routers[Number(this.$route.query.index)-1].child;
        this.name = arr.find(item=>{
            return item.path==this.$route.name
        }).name;
      }
  },
};
</script>
<style lang="less" scoped>
.footerWrap {
  background: #fff;
  padding: 10px;
  .title {
    padding: 15px;

    margin-bottom: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    h1 {
      margin-right: 15px;
    }
    span {
      padding: 0 15px;
      border-left: 1px solid #ddd;
    }
  }
  .wrap {
    display: flex;
    .footerside {
      width: 200px;
      /deep/.router-link-active {
        color: #df3f2f;
      }
    }
    .footerDetail{
        .tit{
            padding: 15px;
        }
    }
  }
}
</style>