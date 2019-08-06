<template>
  <div id="inquiry">
    <!-- <p class="topStep">
      卖家中心 > 询价单列表 >
      <span>{{title}}</span>
    </p>-->
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
          <el-select v-model="reppyValue" placeholder="请选择">
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
import "./sellerInquiry.less";
export default {
  data() {
    return {
      title: "",
      tabData: [
        {
          id: "1",
          name: "全部待批复",
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
      ]
    };
  },
  mounted() {
    var routeAlign = this.$route;
    if (routeAlign.name == "allApply") {
      this.title = "全部待批复";
    } else if (routeAlign.name == "userNotice") {
      this.title = "用户提醒";
    } else if (routeAlign.name == "alreadyReply") {
      this.title = "已批复";
    } else if (routeAlign.name == "alreadyOverdue") {
      this.title = "已过期";
    }
  },
  methods: {
    tabShow(val) {
      this.title = val;
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
