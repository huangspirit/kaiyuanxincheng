<template>
    <div class="originFactoryEntry" :style="`height:${this.contHeight}px`">
        <router-link to="/OriginalFactoryEntry/BasicInforma">
            <img src="@/assets/image/OriginalFactoryEntry/bg.jpg" alt=""  >
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return {
            contHeight:1000
        }
    },
    created() {
        console.log(window.screen.height)
        this.contHeight=window.screen.height-180
    }
}
</script>
<style scoped lang="less">
.originFactoryEntry{
    img{
        width:100%;
        height:100%;
    }
}
</style>
