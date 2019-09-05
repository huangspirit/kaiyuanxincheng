<template>
  <div id="inquiry">
    <div class="inquiryContent">
      <div class="topTab">
        <ul class="clear">
          <router-link
            tag="li"
            v-for="(item,index) in tabData"
            :key="index"
            active-class="active"
            :to="item.path"
            @click.native="tabShow(item.name)"
            class="btn"
          >{{item.name}}</router-link>
            <li class="fl" style="padding-bottom:0;">
                <el-select  size="small" v-model="reppyValue" @change="getInquiryList(reppyValue)" placeholder="请选择" >
                    <el-option
                        v-for="item in reppyData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </li>
        </ul>

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import "./sellerInquiry.less";
import { axios, siderInquiryList } from "@/api/apiObj";
export default {
  data() {
    return {
      tabData: [
        {
          id: "1",
          name: "全部",
          path: "/allApply"
        },
        {
          id: "2",
          name: "未批复",
          path: "/userNotice"
        },
        {
          id: "3",
          name: "已批复",
          path: "/alreadyReply"
        },
        {
          id: "4",
          name: "已过期",
          path: "/alreadyOverdue"
        }
      ],
      reppyValue: "",
      reppyData: [
        {
          value: "7",
          label: "近一周"
        },
        {
          value: "30",
          label: "近一月"
        },
        {
          value: "90",
          label: "近三月"
        },
        {
          value: "180",
          label: "近半年"
        }
      ],
      paramsInfo: {},
      routeAlign: ""
    };
  },
  watch: {
    $route(to, from) {
      this.routeAlign = to
    }
  },
  mounted() {
    this.routeAlign = this.$route;
  },
  methods: {
    tabShow(val) {
    },
    getInquiryList(val) {

      if (this.routeAlign.name == "allApply") {
        this.paramsInfo = {
          start: 0,
          length: 2,
          type: true,
          day: val
        };
      } else if (this.routeAlign.name == "userNotice") {
        this.paramsInfo = {
          start: 0,
          length: 2,
          type: true,
          reply_status: false,
          day: val
        };
      } else if (this.routeAlign.name == "alreadyReply") {
        this.paramsInfo = {
          start: 0,
          length: 2,
          reply_status: true,
          type: true,
          day: val
        };
      } else if (this.routeAlign.name == "alreadyOverdue") {
        this.paramsInfo = {
          start: 0,
          length: 2,
          type: true,
          sheet_effective: false,
          day: val
        };
      }
      axios
        .request({ ...siderInquiryList.allReply, params: this.paramsInfo })
        .then(res => {
          console.log(res);
          if (res.resultCode == "200") {
            if (res.data != null) {
              this.allInquiryData = res.data;
            } else {
              this.allInquiryData = [];
            }
            if (this.routeAlign.name == "allApply") {
              eventBus.$emit("allApply", this.allInquiryData);
            } else if (this.routeAlign.name == "userNotice") {
              eventBus.$emit("userNotice", this.allInquiryData);
            } else if (this.routeAlign.name == "alreadyReply") {
              eventBus.$emit("alreadyReply", this.allInquiryData);
            } else if (this.routeAlign.name == "alreadyOverdue") {
              eventBus.$emit("alreadyOverdue", this.allInquiryData);
            }
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
#inquiry {
  /*.topStep {*/
  /*  width: 100%;*/
  /*  height: 81px;*/
  /*  background: inherit;*/
  /*  background-color: rgba(255, 255, 255, 1);*/
  /*  line-height: 81px;*/
  /*  font-size: 28px;*/
  /*  color: #333333;*/
  /*  padding: 0 20px;*/
  /*  > span {*/
  /*    font-size: 28px;*/
  /*    color: #0d98ff;*/
  /*  }*/
  /*}*/
  .inquiryContent {
    padding: 20px;
    min-height:500px;
    background: #fff;
    .topTab {
      > ul {
        width: 100%;
          border-bottom:2px solid #ddd;
        > li {
          float: left;
          padding: 20px;
          border-bottom:2px solid transparent;
            margin-bottom:-2px;
            cursor: pointer;
            &.active{
                border-color:#df3f2f;
            }
            &.btn:hover{
                border-color: #df3f2f;
                color:#df3f2f;
            }
        }
      }
    }
  }
}
</style>
