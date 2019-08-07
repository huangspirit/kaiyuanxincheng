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
                case "sys":
                    return "系统通知";
                case "inquiry":
                    return "询价通知";
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
                //this.MenuTabList=this.MenuTabList.map({...this.MenuTabList[k],num:0}
                this.$set(this.MenuTabList[k],'num',0)
            })
        }
    }
};
</script>
<style lang="less" scoped>
  @import "./News.less";
</style>


