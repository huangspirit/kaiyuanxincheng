<template>
    <div class="wrapPage">
        <div>
            <el-pagination
                class="el-pagination"
                layout="prev, pager, next"
                :total="total"
                :current-page.sync="pageIndex"
                :page-size="pageSize"
                @current-change='change'
            >
            </el-pagination>
            <div class="add">
                <span class="el-icon-search"></span>
                <input placeholder="输入页数" min="1" v-model="jumpNum" type="number" :max="maxPage" @keyup.enter="onSubmit">
                <span class="jump" @click="jump">跳转</span>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name:"",
        props:{
            total:{
                type:Number,
                default:0
            },
            pageSize:{
                type:Number,
                default: 15
            },
            pageIndex:{
                type:Number,
                default:1
            }
        },
        data(){
            return{
                jumpNum:""
            }
        },
        computed:{
            maxPage(){
                return parseInt(this.total/this.pageSize)
            }
        },

        methods:{
            onSubmit(){
                this.jump()
            },
            jump(){
                console.log(Number(this.jumpNum))
                if(Number(this.jumpNum)>0){
                    this.$emit("changecallback",Number(this.jumpNum))
                }
            },
            change(x){
                this.$emit("changecallback",x)
            }
        }
    }
</script>
<style lang="less" scoped>
.wrapPage{
    width:100%;
    position: relative;
    height:35px;
    &>div{
        position: absolute;
        left:50%;
        transform: translateX(-50%);
        display: flex;
        margin:0 auto;
        .add{
            border:1px solid #d8d8d8;
            position: relative;
            line-height: 30px;
            box-sizing: border-box;
            overflow: hidden;
            .jump{
                position: absolute;
                right:0;
                height: 100%;
                background: #83ABD8;
                color:#fff;
                font-size: 12px;
                padding:0 12px;
                top:0;
                border:1px solid #83ABD8;
                cursor: pointer;

            }
            .el-icon-search{
                position: absolute;
                left:0;
                height: 100%;
                line-height: 30px;
                font-size:12px;
                padding:0 12px;
                top:0;
            }
            input{
                border:none;
                height: 100%;
                outline: none;
                width:80px;
                padding:0 35px 0 30px;
                font-size:12px;
                display: block;

            }
        }
        .el-pagination{
            /deep/.btn-prev{
                border:1px solid #d8d8d8;
                padding:0 8px;
                min-width:10px;
                margin-right:18px;
            }
            /deep/.el-pager{
                .number{
                    margin-right:18px;
                    border:1px solid #d8d8d8;
                    padding:0 8px;
                    &.active{
                        background:#a6a6a6;
                        color:#fff;
                        border-color:#a6a6a6;
                    }
                }
            }
            /deep/.btn-next{
                border:1px solid #d8d8d8;
                padding:0 8px;
                min-width:10px;
                margin-right:18px;
            }
        }
    }

}
</style>
