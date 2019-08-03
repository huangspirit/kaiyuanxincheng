<template>
  <div>

  </div>
</template>

<script>
import { axios, siderInquiryList } from "@/api/apiObj";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getAllReplyList();
  },
  methods: {
    getAllReplyList() {
        var obj={
            start:0,
            length:20,
            type:false
        }
      axios.request({ ...siderInquiryList.allReply, params: obj }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style>
</style>
