<template>
    <div v-html="html" class="con allWidth"></div>
</template>
<script>
import {axios,footer} from "@/api/apiObj"
export default {
    data(){
        return {
            html:''
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            const id=this.$route.query.id;
            axios.request({...footer.queryConfigDetail,params:{id:id}}).then(res=>{
                console.log(res)
                this.html=res.data.webDesc
            })
        }
    }
}
</script>
<style lang="less" scoped>
.con{
    padding:30px 0;
   /deep/p{
       color:#333;
       line-height: 1.6;
   }
   /deep/div{
       color:#333;
       line-height: 1.6;
   }
   /deep/img{
       max-width:100%;
   }

}
</style>