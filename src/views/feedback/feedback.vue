<template>
    <div class="cont allWidth">
        <div>
<el-form :model="form">
                 <el-form-item label="反馈内容:">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                <el-form-item label="回访人姓名：" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="回访电话：" :label-width="formLabelWidth">
                  <el-input v-model="form.tel" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" >提交反馈</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
                form:{},
                formLabelWidth:'120',

        }
    }
}
</script>
<style lang="less" scoped>
    .cont{
        height:100%;
        min-height:650px;
         padding:20px;
         background:#fff;
        &>div{
        width:500px;
        margin:50px auto;
        
       
        }
        
    }
</style>
