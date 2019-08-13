<template>
  <div id="inquiry">
    <p class="topStep">
      卖家中心 > 询价单列表 >
      <span>{{title}}</span>
    </p>
    <div class="inquiryContent">
      <div class="topTab">
        <ul>
          <router-link
            tag="li"
            v-for="(item,index) in tabData"
            :key="index"
            active-class="active"
            :to="item.path"
            @click.native="tabShow(item.name)"
          >{{item.name}}</router-link>
          <el-select v-model="reppyValue" @change="getInquiryList(reppyValue)" placeholder="请选择">
            <el-option
              v-for="item in reppyData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </ul>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { axios, siderInquiryList } from "@/api/apiObj";
import "./sellerInquiry.less";
export default {
  data() {
    return {
      title: "",
      tabData: [
        {
          id: "1",
          name: "全部待批复",
          path: "/personalallApply"
        },
        {
          id: "2",
          name: "未批复",
          path: "/personaluserNotice"
        },
        {
          id: "3",
          name: "已批复",
          path: "/personalalreadyReply"
        },
        {
          id: "4",
          name: "已过期",
          path: "/personalalreadyOverdue"
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
      routeAlign: ""
    };
  },
  watch: {
    $route(to, from) {
      this.routeAlign = to;
    }
  },
  mounted() {
    this.routeAlign = this.$route;
    console.log(this.routeAlign)
    if (this.routeAlign.name == "personalallApply") {
      this.title = "全部待批复";
    } else if (this.routeAlign.name == "personaluserNotice") {
      this.title = "用户提醒";
    } else if (this.routeAlign.name == "personalalreadyReply") {
      this.title = "已批复";
    } else if (this.routeAlign.name == "personalalreadyOverdue") {
      this.title = "已过期";
    }
  },
  methods: {
    tabShow(val) {
      this.title = val;
    },
    getInquiryList(val) {
      console.log(val);
      if (this.routeAlign.name == "personalallApply") {
        this.paramsInfo = {
          start: 0,
          length: 2,
          type: true,
          day: val
        };
      } else if (this.routeAlign.name == "personaluserNotice") {
        this.paramsInfo = {
          start: 0,
          length: 2,
          type: true,
          reply_status: false,
          day: val
        };
      } else if (this.routeAlign.name == "personalalreadyReply") {
        this.paramsInfo = {
          start: 0,
          length: 2,
          reply_status: true,
          type: true,
          day: val
        };
      } else if (this.routeAlign.name == "personalalreadyOverdue") {
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
            if (this.routeAlign.name == "personalallApply") {
              eventBus.$emit("personalallApply", this.allInquiryData);
            } else if (this.routeAlign.name == "personaluserNotice") {
              eventBus.$emit("personaluserNotice", this.allInquiryData);
            } else if (this.routeAlign.name == "personalalreadyReply") {
              eventBus.$emit("personalalreadyReply", this.allInquiryData);
            } else if (this.routeAlign.name == "personalalreadyOverdue") {
              eventBus.$emit("personalalreadyOverdue", this.allInquiryData);
            }
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
#inquiry {
  min-height: 100%;
  .topStep {
    width: 100%;
    height: 81px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    line-height: 81px;
    font-size: 28px;
    color: #333333;
    padding: 0 20px;
    > span {
      font-size: 28px;
      color: #0d98ff;
    }
  }
  .inquiryContent {
    padding: 20px;
    min-height: 100%;
    background: #fff;
    margin-top: 20px;
    .topTab {
      > ul {
        width: 100%;
        height: 46px;

        > li {
          float: left;
          height: 100%;
          line-height: 46px;
          margin-right: 50px;

          padding: 0 10px;
        }
        .active {
          color: #fff;
          background: #0068b7;
        }
      }
    }
  }
}
</style>
