<template>
    <div>获取月结用户申请信息</div>
</template>
<script>
    import {axios,FactoryEntry} from "../../../api/apiObj";

    export default {
        name:"",
        data() {
            return {}
        },
         methods:{
                init(){
                    axios.request(FactoryEntry.queryDetail).then(res=>{
                        console.log(res)
                    })
                }
            },
        mounted() {
            this.init();
        }
    }
</script>
