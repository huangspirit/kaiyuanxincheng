<template>
  <div>
    <el-menu
      class="sidemenu"
      id="sidemenu"
      :collapse="false"
      :unique-opened="true"
      text-color="#fff"
      background-color="#3f3f3f"
      :router="true"
      :default-openeds="defaultOpeneds"
      :default-active="defaultActive"
    >
      <template>
        <div v-for="item0 in list" :key="item0.index">
          <router-link :to="item0.path" tag="div" v-if="item0.isMessage" class="message undo">
            <img :src="item0.icon" alt />
            {{item0.title}}
            <span
              class="count bgColor"
              v-if="item0.messageCount"
            >{{item0.messageCount}}</span>
          </router-link>
          <div v-if="!item0.isShow && item0.name=='SellerCenter'" @click="chip" class="undo">
            <img :src="item0.icon" alt />
            {{item0.title}}
          </div>
          <el-submenu :index="item0.index" class="onemenu" v-if="item0.isShow && !item0.isMessage">
            <router-link :to="item0.path" slot="title" tag="div" class="onetitle">
              <img :src="item0.icon" alt />
              {{item0.title}}
            </router-link>
            <template v-for="item1 in item0.children">
              <el-submenu
                :index="item1.index"
                :key="item1.index"
                class="twomenu"
                v-if="item1.show!='hidden' && !item1.isPassWord"
              >
                <div
                  class="twotitle"
                  v-if="item1.name=='UpgradeLevelverify'"
                  slot="title"
                  @click="UpgradeLevelverify"
                  :class="item1.class"
                >
                  <img :src="item1.icon" alt />
                  <span slot="title">{{item1.title}}</span>
                </div>
                <!-- <div class="twotitle" v-else-if="item1.name=='UpgradeLevelverify'" slot="title" :class="item1.class">
                  <img :src="item1.icon" alt />
                  <span slot="title">{{item1.title}}</span>
                </div> -->
                <router-link v-else :to="item1.path" slot="title" tag="div" class="twotitle">
                  <img :src="item1.icon" alt />
                  <span>{{item1.title}}</span>
                </router-link>
              </el-submenu>
              <el-submenu
                :index="item1.index"
                :key="item1.index"
                class="twomenu"
                v-if="item1.show!='hidden' && item1.isPassWord"
                @click.native="withDraw(item1)"
              >
                <template slot="title" class="twotitle">
                  <div class="twotitle" :class="item1.class">
                    <img :src="item1.icon" alt />
                    <span slot="title">{{item1.title}}</span>
                  </div>
                </template>
              </el-submenu>
            </template>
          </el-submenu>
        </div>
      </template>
    </el-menu>
    <el-dialog
      center
      :visible.sync="dialogVisible"
      width="500px"
      class="confirma-delivery-dialog"
      top="20vh"
      lock-scroll
    >
      <p slot="title" class="title">提示</p>
      <div class="con">
        <p>
          您还不是商家身份
          是否进行商家入驻？
        </p>
        <p></p>
      </div>
      <span slot="footer" class="dialog-footer ruzhu">
        <!-- <span @click="dialogVisible = false" class="close">取消</span>
        <span @click="ensure" class="ensure">立刻进行商家入驻</span>-->
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="ensure" type="primary">立即入驻</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showinputPassword" width="500px">
      <p slot="title" class="title">输入交易密码</p>
      <div>
        <el-input placeholder="请输入交易密码" v-model="inputpassword" show-password></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showinputPassword = false">取 消</el-button>
        <el-button type="primary" @click="checkpassword">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showverufy" class="showverufy" width="850px">
      <div class="wrap">
        <h2 class="color">您的月结申请已经提交成功！</h2>
        <p class="title">
          <a @click="chipDetail">前往用户中心 》 申请进度查询 中查看您的申请进度</a>
        </p>
        <p class="desc">我们的审核时间为3个工作日，请您耐心等待！申请结果将会以短信、微信和站内信息的方式通知您！请耐心等待！</p>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less">
.sideMenu {
  .undo {
    line-height: 50px;
    color: #fff;
    cursor: pointer;
    &:hover {
      background: rgb(50, 50, 50);
    }
    .count {
      height: 20px;
      border-radius: 20px;
      min-width: 20px;
      padding: 0 3px;
      box-sizing: border-box;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
    }
  }
  .router-link-exact-active {
    color: #fff !important;
    background: #000;
  }
  img {
    width: 16px;
    margin-right: 15px;
    margin-left: 20px;
  }
  .el-menu {
    border: none;
  }
  .onemenu {
    > .el-submenu__title {
      padding: 0 !important;
      .onetitle {
        // padding-left:20px;
      }
      & > .router-link-exact-active {
        background: #000 !important;
      }
    }
    &.is-opened {
      > .el-submenu__title {
        background: #000 !important;
        & > .router-link-exact-active {
          background: #000 !important;
        }
      }
      .twomenu {
        .el-submenu__icon-arrow {
          display: none !important;
        }
        > .el-submenu__title {
          padding: 0 !important;
          .twotitle {
            padding-left: 40px;
            padding-right: 20px;
            &.router-link-exact-active {
              background: #df3f2f !important;
            }
          }
        }
        &.is-opened {
          .twotitle.active {
            background: #df3f2f !important;
          }
        }
      }
    }
  }
  .showverufy {
    /deep/.el-dialog {
      background: #fce9e5;
      border: 1px solid #e3e3e3e3;
      .wrap {
        padding: 0 50px 50px;
        white-space: nowrap;
        text-align: center;
        h2 {
          margin-bottom: 20px;
        }
        .title {
          margin-bottom: 20px;
        }
        a{
            text-decoration: underline;
        }
      }
    }
  }
}
</style>
<script>
import { axios, personCenter } from "@/api/apiObj";
export default {
  name: "sideMenu",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showverufy: false,
      defaultOpeneds: [],
      defaultActive: "",
      dialogVisible: false,
      showSetPassword: false,
      showinputPassword: false,
      inputpassword: "",
      obj: {}
    };
  },
  created() {
    this.fetchDate();
  },
  methods: {
    UpgradeLevelverify() {
      this.showverufy = true;
    },
    chip() {
      this.$router.push("/PersonalCenter/joinDialog")
    //  this.dialogVisible = true;
    },
    chipDetail(){
        this.showverufy=false;
        this.$router.push("/PersonalCenter/GetVipApplyDetail")
    },
    fetchDate() {
      var name = this.$route.meta.parentname;
      this.list.forEach(item => {
        if (name == item.name) {
          this.defaultOpeneds = [item.index];
          item.children.forEach(item0 => {
            if (this.$route.path.indexOf(item0.path) != -1) {
              this.defaultActive = item0.index;
            }
          });
        }
      });
    },
    withDraw(item) {
      this.obj = item;
      //先验证是否设置提现密码
      this.inputpassword = "";
      axios.request(personCenter.checkSetPassword).then(res => {
        if (res.data == 1) {
          this.showinputPassword = true;
        } else {
          //需要新增
          this.$prompt("请设置交易密码", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(({ value }) => {
              //校验密码
              axios
                .request({
                  ...personCenter.savedrawPassword,
                  data: { password: value }
                })
                .then(res => {
                  console.log(res);
                  if (res) {
                    this.$router.push({
                      path: this.obj.path
                    });
                  }
                });
            })
            .catch(() => {});
        }
      });
    },
    checkpassword() {
      axios
        .request({
          ...personCenter.checkdrawPassword,
          data: { password: this.inputpassword }
        })
        .then(res => {
         
          if (res) {
            this.showinputPassword = false;
            this.$router.push({
              path: this.obj.path
            });
          }
        });
    },
    ensure() {
      this.$router.push({
        path: "/OriginalFactoryEntry"
      });
    }
  }
};
</script>
