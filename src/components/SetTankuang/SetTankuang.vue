<template>
    <el-dialog :title="title"  :visible.sync="dialogFormVisible" class="wrap" :width="`${width}%`" >

        <slot name="dialog-body" ></slot>
        <slot name="footer" ></slot>

        </el-dialog>
</template>
<script>
export default {
    name:"dialog1",
    data(){
        return{
            dialogFormVisible:true
        }
    },
    props:{
        title:{
            type:String,
            default:""
        },
        showDialog:{
            tyep:Boolean,
            default:false
        },
        width: {
            type: Number,
            default: 40
        }
    },
    mounted(){
        //this.dialogFormVisible=this.showDialog
    },
    watch:{
        dialogFormVisible(newval){
            if(!newval){
                //关闭弹框，触发事件
                this.$emit("closeDialogCallBack")
            }
        }
    }
}
</script>
<style scoped>
/*.wrap>>>.el-dialog{*/
/*     max-width:600px;*/
/* }*/
.wrap>>>.el-dialog__header{
        /* font-weight:bolder; */
        text-align:center;
    }
.wrap>>>.el-dialog__header .el-dialog__title{
        font-size:22px;
    }
.wrap>>>.el-dialog__body:after{
    display: block;
    content:"";
    clear: both;
}
</style>



