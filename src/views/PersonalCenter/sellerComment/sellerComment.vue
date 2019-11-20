.<template>
  <div class="sellerComment">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="comment">
      <div class="tit">
        <el-input
          placeholder="评论内容"
          v-model="content"
          
          class="inputSearch fr"
          @keyup.enter.native="inputHandler"
          style="width:300px;margin:15px;"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="inputHandler" class="append"></el-button>
        </el-input>
      </div>
      <table width="100%" border="1" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>商品信息</th>
            <th>评价人</th>
            <th>图片</th>
            <th>评分</th>
            <th>评价/回复时间</th>
            <th>评论内容</th>
            <th>回复内容</th>
            <!-- <th>操作</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in commentlist" :key="item.id">
            <td class="goodsinfo">
              <div style="display:flex;align-items:center;">
                <ImgE :src="item.goodsPicture" :W="70" :H="70" :isBig="true"></ImgE>
                <div>
                  <p style="margin-bottom:10px;">
                    <router-link
                      class="color"
                      :to="{
                          path:'/BrandDetail/GoodsDetails',
                          query:{
                            tag:'goodsinfo',
                            documentid:item.goodsId,
                            name:item.goodsName
                          }
                        }"
                    >{{item.goodsName}}</router-link>
                  </p>
                  <p>
                    <router-link
                      :to="{
                          path:'/BrandDetail',
                          query:{
                            tag:'brand',
                            documentid:item.brandId,
                            name:item.branda
                          }
                        }"
                    >{{item.branda}}</router-link>
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div class="userinfo">
                <img :src="item.userHead" alt />
                <div>
                  <p>{{item.userName}}</p>
                </div>
              </div>
            </td>

            <td class="infoimg">
              <template v-for="(item0 ,index0) in item.commentPicture.split('@')">
                <div :key="item0" v-if="index0<4 && index0>0">
                  <span class="cover" @click="bigimg(item.commentPicture,index0)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <ImgE :src="item.commentPicture.split('@')[0]+item0" :W="50" :H="50"></ImgE>
                </div>
              </template>
            </td>
            <td>
              <p>服务支持：{{item.serviceScore}}分</p>
              <p>交货速度：{{item.deliverScore}}分</p>
              <p>产品质量：{{item.profileScore}}分</p>
            </td>
            <td>
              <p class="color" title="评价时间">{{item.createTime | formatDate}}</p>
              <p class="color" v-if="item.replyTime" title="回复时间">{{item.replyTime | formatDate}}</p>
            </td>
            <td>{{item.content}}</td>
            <td style="max-width:300px">
              {{item.replyContent}}
              <el-button size="mini" @click="replay(item)" v-if="!item.replyContent">回复</el-button>
            </td>

            <!-- <td>
              <el-button size="mini" @click="replay(item)">回复</el-button>
            </td>-->
          </tr>
        </tbody>
      </table>
      <Pagination
        v-if="total"
        :currentPage.sync="currentPage"
        :total="total"
        :page-size="pageSize"
        @current-change="handleChangePage"
      ></Pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <el-carousel
        indicator-position="outside"
        :autoplay="false"
        :loop="true"
        :initial-index="initialIndex"
      >
        <template v-for="(item0,index0) in dialogImageUrl.split('@')">
          <el-carousel-item :key="item0" style="text-align:center;" v-if="index0>0">
            <img :src="dialogImageUrl.split('@')[0]+item0" alt style="height:100%;max-width:100%;" />
          </el-carousel-item>
        </template>
      </el-carousel>
    </el-dialog>
    <el-dialog title="回复评论" :visible.sync="showReplay" width="700px">
      <div>
        <div class="tit" style="line-height:30px;">
          <strong>{{replayItem.userName}}</strong>&nbsp;评价&nbsp;
          <strong>{{replayItem.goodsName}}</strong>&nbsp;:
          <p>{{replayItem.content}}</p>
        </div>

        <div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入回复内容"
            v-model="replayContent"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReplay = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
.<script>
import { mapState } from "vuex";
import { axios, sellerShop } from "@/api/apiObj";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 15,
      commentlist: [],
      dialogVisible: false,
      dialogImageUrl: "",
      initialIndex: 0,
      showReplay: false,
      replayItem: {},
      replayContent: "",
      content:''
    };
  },
  computed: {
    ...mapState({
      UserInforma: state => state.Login.UserInforma
    })
  },
  mounted() {
    this.getComment();
  },
  methods: {
    inputHandler(){
       this.getComment();
    },
    bigimg(url, index) {
      this.dialogVisible = true;
      this.dialogImageUrl = url;
      this.initialIndex = index;
    },
    replay(item) {
      this.replayItem = item;
      this.showReplay = true;
    },
    confirm() {
      let obj = {
        id: this.replayItem.id,
        replyContent: this.replayContent,
        uid: this.replayItem.uid
      };
      axios
        .request({ ...sellerShop.replyOrderComment, data: obj, method: "post" })
        .then(res => {
          console.log(res);
          this.showReplay = false;
          this.getComment();
        });
    },
    handleChangePage(x) {
      this.currentPage = x;
      this.getComment();
    },
    getComment() {
      let obj = {
        start: (this.currentPage - 1) * this.pageSize,
        length: this.pageSize,
        seller_id: this.UserInforma.id,
        content:this.content
      };
      axios
        .request({ ...sellerShop.orderCommentList, params: obj })
        .then(res => {
          console.log(res);
          this.commentlist = res.data.data;
          this.total = res.data.total;
        });
    }
  }
};
</script>
.<style lang="less" scoped>
.comment{
  background:#fff;
}
table {
  text-align: center;
  background: #fff;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  color: #333;

  th {
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    background: #f7f7f7;
  }
  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    font-size: 13px;
  }
  .goodsinfo {
    text-align: left;
  }
  .userinfo {
    display: flex;

    img {
      width: 40px;
      height: 40px;
    }
    div {
      text-align: left;
      margin-left: 10px;
    }
  }
  .infoimg {
    line-height: 50px;
    height: 100%;
    text-align: center;
    & > div {
      display: inline-block;
      position: relative;
      .ImgE {
        height: 100%;
        border: 2px solid transparent;
        /deep/img {
          width: 50px;
          height: 50px;
        }
      }
      &:hover {
        .cover {
          display: block;
        }
      }
    }
    .cover {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0%;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      color: #fff;
      font-size: 20px;
      z-index: 1;
    }
  }
}
</style>