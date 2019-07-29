<template>
  <div class="Pagination">
    <!-- 分页 -->
    <el-pagination layout="prev, pager, next, jumper" :page-size='pageSize' :total="total" background :current-page="currentPage" @current-change='change'></el-pagination>
  </div>
</template>

<script>
import "./Pagination.less";
export default {
  name: "Pagination",
  props:{
    currentPage:{
      type:Number,
      default:1
    },
    total:{
      type:Number
    },
      pageSize:{
        default:10,
        type:Number
      }
  },
  methods:{
    change(x){
      this.$emit('current-change',x)
      this.$emit('update:currentPage',x)
    }
  }
};
</script>

