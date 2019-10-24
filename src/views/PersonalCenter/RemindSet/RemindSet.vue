<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>提醒设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="RemindSet">
      <div class="remindset-item" v-if="BuyerTypeList.length">
        <span>
          <img src="@/assets/image/PersonalCenter/u81478.png" alt>
          买家通知
        </span>
        <div class="remindset-con">
          <ul>
            <li
              v-for="item in BuyerTypeList"
              :key="`${item.type}_${item.id}`"
              @click="changeSelect(item)"
            >
              <span class="sel">
                <img v-if="item.select" src="@/assets/image/PersonalCenter/_u11390.png" alt>
              </span>
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="remindset-item" v-if="SellerTypeList.length">
        <span>
          <img src="@/assets/image/PersonalCenter/u81478.png" alt>
          卖家通知
        </span>
        <div class="remindset-con">
          <ul>
            <li
              v-for="item in SellerTypeList"
              :key="`${item.type}_${item.id}`"
              @click="changeSelect(item)"
            >
              <span class="sel">
                <img v-if="item.select" src="@/assets/image/PersonalCenter/_u11390.png" alt>
              </span>
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="remindset-item" v-if="ManufactorTypeList.length">
        <span>
          <img src="@/assets/image/PersonalCenter/u190465.png" alt>
          厂家通知
        </span>
        <div class="remindset-con">
          <ul>
            <li
              v-for="item in ManufactorTypeList"
              :key="`${item.type}_${item.id}`"
              @click="changeSelect(item)"
            >
              <span class="sel">
                <img v-if="item.select" src="@/assets/image/PersonalCenter/_u11390.png" alt>
              </span>
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="remindset-item" v-if="NotificationModeList.length">
        <span>
          <img src="@/assets/image/PersonalCenter/u149306.png" alt>
          通知方式
        </span>
        <div class="remindset-con">
          <ul class="text-messaging">
            <li
              v-for="item in NotificationModeList"
              :key="`${item.type}_${item.id}`"
              @click="changeSelect(item)"
            >
              <span class="sel">
                <img v-if="item.select" src="@/assets/image/PersonalCenter/_u11390.png" alt>
              </span>
              <span class="name">{{item.name}}</span>
              <span v-if="item.name === '短信通知'" class="text">短信提醒未开通</span>
            </li>
            <span style="color:#0068db;  cursor: pointer;">现在开通?</span>
          </ul>
        </div>
      </div>
      <div class="submit">
        <span @click="submitSet">保存设置</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import "./RemindSet.less";
</style>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "RemindSet",
  data() {
    return {
      // 1买家通知type
      BuyerTypeList: [],
      // 买家通知selet
      BuyerSeletList: [],
      // 2卖家中心
      SellerTypeList: [],
      //卖家通知selet
      SellerSeletList: [],
      // 3厂家通知
      ManufactorTypeList: [],
      //厂家通知selet
      ManufactorSeletList: [],
      //  4通知方式
      NotificationModeList: [],
      //  通知方式selet
      NotificationModeSelet: [],
      selectList: []
    };
  },
  computed: {
    accessToken() {
      return localStorage.getItem("access_token");
    }
  },
  methods: {
    ...mapActions("RemindSet", [
      "GetReminderSet",
      "GetReminderUserSet",
      "GetReminderUserSetSubmit"
    ]),
    changeSelect(item) {
      if (item.name !== "系统通知") {
        item.select = !item.select;
        this.$forceUpdate();
       
      }
    },
    // 保存设置
    submitSet() {
      let arr = [];
      this.selectList.forEach(item => {
        if (item.select === true) {
          arr.push(item.id);
        }
      });
      this.GetReminderUserSetSubmit({
        arr: arr,
        accessToken: this.accessToken
      })
        .then(res => {
          this.$message({
            message: res,
            type: "success"
          });
        })
        .catch(err => {
          this.$message.error(res);
        });
    }
  },
  mounted() {
    this.GetReminderSet({
      types: "1,2,4",
      access_token: this.accessToken
    })
      .then(res => {
        this.selectList = res.data;
        this.selectList.forEach(item => {
          item.select = false;
          switch (item.type) {
            case 1:
              this.BuyerTypeList.push(item);
              break;
            case 2:
              this.SellerTypeList.push(item);
              break;
            case 3:
              this.ManufactorTypeList.push(item);
              break;
            case 4:
              this.NotificationModeList.push(item);
              break;
          }
        });
      })
      .catch(err => {
        this.$message.error("请求错误！");
      });
    this.GetReminderUserSet({
      access_token: this.accessToken
    }).then(res => {
      this.selectList.forEach((item, index) => {
        let ret = res.data.find(item2 => {
          return item2.reminderid == item.id;
        });
        if (ret) {
          item.select = true;
        }
      });
      this.$forceUpdate();
    });
  }
};
</script>

<style>
</style>
