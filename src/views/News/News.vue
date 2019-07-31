<template>
  <div class="News">
    <!-- 侧边栏 -->
    <div class="sideMenu">
      <ul class="menu-tab">
          <router-link v-for="(item, k) in MenuTabList" :key="`MenuTabList_${k}`" tag="li" :to="item.path" @click.native="updateUserMessageByTag(k)">
              <img :src="item.imgUrl" alt>
              <span>{{item.id | textFilter}}</span>
              <span class="news-num" v-if="item.num>0">{{item.num}}</span>
          </router-link>
      </ul>
    </div>
    <!-- 消息内容 -->
    <div class="news-con">
        <div>
            <router-view @changeNum="updateUserMessageByTag"></router-view>
        </div>

<!--      <ul>-->
<!--        <li class="active item0 item">-->
<!--          <div class="news-con-l">-->
<!--            <img src="@/assets/image/News/u181.png" alt="">-->
<!--            <div>-->
<!--              <p>Nicky WU</p>-->
<!--              <p>罗彻斯特电子(RE)</p>-->
<!--              <p>销售经理</p>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="news-con-m">-->
<!--            <span class="news-num">4</span>-->
<!--            <p><span>您好，您咨询的特价产品有货。但是库存不多了，请尽快下单吧</span></p>-->
<!--          </div>-->
<!--        </li>-->
<!--&lt;!&ndash;          <li class="item1 item"></li>&ndash;&gt;-->
<!--&lt;!&ndash;          <li class="item2 item"></li>&ndash;&gt;-->
<!--      </ul>-->
    </div>
  </div>
</template>
<script>
import {axios,message} from "@/api/apiObj";
export default {
  name: "News",
  data() {
    return {
      MenuTabList: [
        // {
        //   imgUrl: require("@/assets/image/message/auth.png"),
        //   num: 3,
        //   text: "原厂沟通",
        //   id:"dg"
        // },
        //
        // {
        //   imgUrl: require("@/assets/image/message/dd.png"),
        //   num: 3,
        //   text: "新订单"
        // },
        //   {
        //       imgUrl: require("@/assets/image/message/sys.png"),
        //       num: 3,
        //       text: "系统消息"
        //   },
        //   {
        //       imgUrl: require("@/assets/image/message/inquiry.png"),
        //       num: 3,
        //       text: "询价通知"
        //   },
        //  {
        //   imgUrl: require("@/assets/image/message/zfs.png"),
        //   num: 3,
        //   text: "支付状态"
        // },
        // {
        //   imgUrl: require("@/assets/image/message/dg.png"),
        //   num: 3,
        //   text: "发货通知"
        // }
      ],
        currentPage:1,
        pageSize:10

    };
  },
    mounted(){
      this.init();

    },
    computed:{
      start(){
          return (this.currentPage-1)*this.pageSize
      }
    },
    filters:{
        textFilter(val){
            switch (val) {
                case 'dg':
                    return "发货通知";
                case 'zfs':
                    return "支付通知";
                case "auth":
                    return "审核通知";
            }
        }
    },
    methods:{
        init(){
            axios.request(message.queryMessageCatergory).then(res=>{
                let list=[]
                for(var p in res.data){
                    console.log(`/News/${p}`)
                    list.push({
                        id:p,
                        num:res.data[p],
                        imgUrl:"../static/img/message/"+p+".png",
                        path:`/News/${p}`
                    })
                }
                this.MenuTabList=list;
                console.log(this.$route)
                // if(this.$route.name='dg'){
                //     this.updateUserMessageByTag(0)
                // }
            })
        },
        updateUserMessageByTag(k){
            if(this.MenuTabList[k].num==0){
                return;
            }
            axios.request({...message.updateUserMessageByTag,params:{tag:this.MenuTabList[k].id}}).then(res=>{
                console.log(res)
                this.MenuTabList[k]={...this.MenuTabList[k],num:0}
            })
        }
    }
};
</script>
<style lang="less" scoped>
  @import "./News.less";
</style>


