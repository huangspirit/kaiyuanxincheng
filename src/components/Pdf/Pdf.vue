<template>
  <div>
    <pdf :src="src"></pdf>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  components: { pdf },
  props: {
    src: String
  },
　created(){
　　　
　　this.src = pdf.createLoadingTask(this.src)
　}
};
</script>

<style>
</style>
