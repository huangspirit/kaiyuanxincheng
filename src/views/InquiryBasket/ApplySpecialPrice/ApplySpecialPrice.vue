<template>
  <!-- 申请特价 -->
  <div class="ApplySpecialPrice allWidth">
    <div class="wrapper">
      <h3 class="tit">填写商品采购信息</h3>
      <div
        class="color"
        style="margin-bottom:20px;text-align:center;font-size:13px;"
      >此信息将会直接发接到原厂相关负责人，为了您能顺利的获得心仪的价格，请认真填写</div>
      <el-table :data="productData" stripe style="width: 100%" class="product">
        <el-table-column width="350px" label="型号">
          <template slot-scope="item">
            <div style="display:flex;">
              <ImgE :src="item.row.imageUrl " :W="50" :H="50" :isBig="true"></ImgE>
              <div class="goodsDetail">
                <div class="googsDesc">
                  <h3 class="color">{{item.row.productno}}</h3>
                  <p class="gray">描述：{{item.row.productdesc}}</p>
                  <!-- <p>
                    <span>
                      共有
                      <strong>{{item.row.map.totalSeller}}</strong>个供应商报价
                    </span>
                    <span
                      class="color"
                      v-if="item.row.map.totalSeller != 0 && item.row.map.minPrice!=item.row.map.maxPrice"
                    >{{item.row.map.minPrice}} ------ {{item.row.map.maxPrice}}
                    </span>
                    <span
                      class="color"
                      v-if="item.row.map.totalSeller != 0 && item.row.map.minPrice==item.row.map.maxPrice"
                    >{{item.row.map.minPrice}}
                    </span>
                  </p> -->
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="品牌">
          <template slot-scope="item">
            <!-- <ImgE :src="item.row.brandImageUrl " :W="100" :H="60" :isBig="true"></ImgE> -->
            <router-link
              :to="{
                    path:'/BrandDetail',
                    query:{
                      tag:'brand',
                      documentid:item.row.brandId,
                      name:item.row.brand
                    }
                  }"
              style="display:block;"
            > <ImgE :src="item.row.brandImageUrl " :W="100" :H="60" :isBig="true"></ImgE></router-link>
          </template>
        </el-table-column>
        <el-table-column label="原厂参考价">
          <template slot-scope="item">
            <div v-if="item.row.factorySellerInfo.seller_goods_id">
             <template v-for="(subitem,index) in item.row.priceList">
                    <div
                      v-if="item.row.factorySellerInfo.priceType || item.row.factorySellerInfo.price_type"
                      :key="index"
                      class="gray"
                    >
                      <span>{{subitem.num}}+</span> -------
                      <span>
                        <span v-if="item.row.factorySellerInfo.priceUnit|| item.row.factorySellerInfo.priceunit">$</span>
                        <span v-else>￥</span>
                        <span>{{subitem.price | toFixed((item.row.factorySellerInfo.priceUnit|| item.row.factorySellerInfo.priceunit)?3:2)}}</span>
                      </span>
                    </div>
                  </template>
                  <div
                    v-if="!(item.row.factorySellerInfo.priceType || item.row.factorySellerInfo.price_type)"
              
                    class="gray"
                  >
                    <span
                      v-if="item.row.factorySellerInfo.priceUnit || item.row.factorySellerInfo.priceunit"
                    >$</span>
                    <span v-else>￥</span>
                    <!-- <span v-if="listItem.factorySellerInfo.seckilPrice">{{listItem.factorySellerInfo.seckilPrice | toFixed((listItem.factorySellerInfo.priceUnit || listItem.factorySellerInfo.priceunit)?3:2)}}</span> -->
                    <span
                      v-if="item.row.factorySellerInfo.seckil_price"
                    >{{item.row.factorySellerInfo.seckil_price | toFixed((item.row.factorySellerInfo.priceUnit || item.row.factorySellerInfo.priceunit)?3:2)}}</span>
                  </div>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="年用量">
          <template slot-scope="item">
                      <el-input
                        placeholder="请输入采购量"
                        @input="listChange"
                        v-model="item.row.projectEau"
                        class="input-with-select unit"
                        size="mini"
                     
                      ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="接受价T/P">
         <template slot-scope="item">
                      <el-input
                        @input="listChange"
                        placeholder="请输入价格"
                        v-model="item.row.acceptPrice"
                        class="input-with-select"
                        size="mini"
                      >
                        <span slot="prepend" v-if="item.row.factorySellerInfo.priceUnit|| item.row.factorySellerInfo.priceunit">$</span>
                        <span slot="prepend" v-else>￥</span> 
                        <!-- <el-select
                          v-model="item.row.priceType"
                          slot="append"
                          placeholder="请选择"
                          @change="listChange(item.$index)"
                        >
                          <el-option :label="'人民币'" value="false"></el-option>
                          <el-option :label="'美元'" value="true"></el-option>
                        </el-select> -->
                      </el-input>
         </template>
      </el-table-column>
        <el-table-column label="竞争型号+品牌"  width="240px">
          <template slot-scope="item">
                      <div style="display:flex;align-items:center">
                        <div style="width:210px;"> <el-input
                        v-for="(item0,k) in item.row.insteadData"
                        :key="k"
                        placeholder="请输入竞争型号+品牌"
                        v-model="item.row.insteadData[k]"
                        size="mini"
                        
                      >
                        <el-button
                          slot="append"
                          @click="deleteInsteadNo(k,true,item.row)"
                          icon="el-icon-delete"
                        ></el-button>
                      </el-input>
                      <el-input
                        placeholder="请输入竞争型号+品牌"
                        v-model="item.row.insteadNo"
                        @input="listChange"
                         size="mini"
                      >
                        <el-button
                          slot="append"
                          @click.native.stop="addInsteadNo(item.row,true)"
                          icon="el-icon-circle-plus"
                        ></el-button>
                      </el-input>
                      </div>
                        <p class="el-icon-delete" @click="deleteOne(item.$index)" style="margin-left:12px;cursor:Pointer;font-size:20px"></p>
                      </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="special-price" v-if="topShow">
        <div class="product-msg">
          <div class="product-msg-img">
            <ImgE :src="oneData.imageUrl" :W="100" :H="100"></ImgE>
          </div>
          <div class="product-msg-text">
            <router-link
              tag="p"
              class="name"
              :to="{
              path:'/BrandDetail/GoodsDetails',
              query:{
                tag:'goodsinfo',
                documentid:oneData.id,
                name:oneData.productno
              }
            }"
            >{{oneData.productno}}</router-link>
            <P>
              <label>品牌：</label>
              <router-link
                :to="{
                path:'/BrandDetail',
                query:{
                  tag:'brand',
                  documentid:oneData.brandId,
                  name:oneData.brand
                }
              }"
              >{{oneData.brand}}</router-link>
            </P>
            <p class="gray">
              <label>描述：</label>
              {{oneData.productdesc}}
            </p>

            <p>
              共有
              <span class="color">{{oneData.map.totalSeller}}</span>
              个供应商报价
              <span
                v-if="oneData.map.totalSeller != 0 && oneData.map.minPrice!=oneData.map.maxPrice"
                class="color"
              >{{oneData.map.minPrice}}——{{oneData.map.maxPrice}}</span>
              <span
                v-if="oneData.map.totalSeller != 0 && oneData.map.minPrice==oneData.map.maxPrice"
                class="color"
              >{{oneData.map.minPrice}}</span>
            </p>
          </div>
          <div
            class="LadderPrice"
            v-if="oneData.factorySellerInfo && oneData.factorySellerInfo.seller_goods_id"
          >
            <p class="tit">原厂报价</p>
            <div
              class="LadderPrice-list"
              v-if="oneData.factorySellerInfo.priceType || oneData.factorySellerInfo.price_type"
            >
              <div v-for="(item, k) in oneData.factorySellerInfo.priceList" :key="k">
                <span>{{item.num}}+ -----</span>
                <span
                  class="color"
                >{{oneData.factorySellerInfo.priceunit?'$':'￥'}}{{item.price | toFixed(oneData.factorySellerInfo.priceunit?3:2)}}</span>
              </div>
            </div>
            <div v-else class="color">
              <span>{{oneData.factorySellerInfo.priceunit?'$':'￥'}}</span>
              <!-- <span v-if="oneData.factorySellerInfo.seckilPrice">{{oneData.factorySellerInfo.seckilPrice}}</span>  -->
              <span
                v-if="oneData.factorySellerInfo.seckil_price"
              >{{oneData.factorySellerInfo.seckil_price | toFixed(oneData.factorySellerInfo.priceunit?3:2)}}</span>
            </div>
          </div>
          <div v-if="oneData.factorySellerInfo && !oneData.factorySellerInfo.seller_goods_id">暂无原厂报价</div>
        </div>
        <router-link
          class="brans-msg"
          tag="div"
          :to="{
          path:'/BrandDetail',
          query:{
            tag:'brand',
            documentid:oneData.brandId,
            name:oneData.brand
          }

        }"
        >
          <ImgE :src="oneData.brandImageUrl" :W="100" :H="50"></ImgE>
          <p>{{oneData.brand}}</p>
        </router-link>
      </div>
      <!-- 申请信息 -->
      <div class="apply-inform">
        <h3 class="tit">填写申请单位的信息</h3>
        <el-form :model="formAlign" :rules="rules" ref="formAlign" label-width="110px">
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model="formAlign.companyName"></el-input>
          </el-form-item>
          <el-form-item label="公司网址" prop="website">
            <el-input v-model="formAlign.website"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="formAlign.projectName"></el-input>
          </el-form-item>
          <el-form-item label="产品阶段" prop="projectProcess">
            <el-select v-model="formAlign.projectProcess" placeholder="请选择" size="mini">
              <el-option
                :label="item"
                :value="item"
                v-for="item in projectProcess"
                :key="item"
              >{{item}}</el-option>
            </el-select>
            <!-- <el-input v-model="formAlign.projectProcess"></el-input> -->
          </el-form-item>
          <el-form-item label="预计量产时间" prop="projectBeginTime">
            <div class="product-time">
              <el-date-picker
                v-model="formAlign.projectBeginTime"
                type="month"
                placeholder="选择年月"
                size="mini"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item v-if="topShow" class="acceptPrice" label="接受价格" prop="acceptPrice">
            <el-input
              placeholder="请输入价格"
              v-model="formAlign.acceptPrice"
              class="input-with-select"
              size="mini"
            >
              <span slot="prepend" v-if="formAlign.priceType">$</span>
              <span slot="prepend" v-else>￥</span>
              <el-select
                v-model="formAlign.priceType"
                slot="append"
                placeholder="请选择"
                @change="selectChange"
              >
                <el-option :label="'人民币'" :value="false"></el-option>
                <el-option :label="'美元'" :value="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item v-if="topShow" label="竞争型号+品牌" class="purchaseAmount" prop="insteadNo">
            <el-input
              v-for="(item,k) in formAlign.insteadData"
              :key="k"
              placeholder="请输入竞争型号+品牌"
              v-model="formAlign.insteadData[k]"
            >
              <el-button slot="append" @click="deleteInsteadNo(k,false)" icon="el-icon-delete"></el-button>
            </el-input>
            <el-input placeholder="请输入竞争型号+品牌" v-model="formAlign.insteadNo">
              <el-button
                slot="append"
                @click.native="addInsteadNo(formAlign.insteadNo,false)"
                icon="el-icon-circle-plus"
              ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="topShow" label="年采购量" class="purchaseAmount" prop="projectEau">
            <el-input
              placeholder="请输入采购量"
              v-model="formAlign.projectEau"
              class="input-with-select unit"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人" class="contact" prop="contactName">
            <el-input v-model="formAlign.contactName" placeholder="姓名"></el-input>
            <span slot="append">K</span>
          </el-form-item>
          <el-form-item label="手机号" class="contact" prop="telphone">
            <el-input
              v-model="formAlign.telphone"
              placeholder="请输入手机号"
              type="text"
              maxlength="11"
              show-word-limit
            ></el-input>
            <span slot="append">K</span>
          </el-form-item>
          <el-form-item label="职位" class="contact" prop="position">
            <el-input v-model="formAlign.position" placeholder="职位"></el-input>
            <span slot="append">K</span>
          </el-form-item>
          <el-form-item label="备注说明" class="contact" prop="remark">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formAlign.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="topShow" class="moreInquiry">
        <p>填写商品采购信息</p>
        <div class="inquiryList">
          <ul class="listCheck">
            <li class="listContent" v-for="(listItem,index) in productData" :key="index">
              <div class="goodsImg">
                <div>
                  <ImgE :src="listItem.imageUrl " :W="50" :H="50"></ImgE>
                </div>
              </div>
              <div class="goodsDetail">
                <div class="googsDesc">
                  <h3>{{listItem.productno}}</h3>
                  <p>
                    品牌：
                    <router-link
                      :to="{
                    path:'/BrandDetail',
                    query:{
                      tag:'brand',
                      documentid:listItem.brandId,
                      name:listItem.brand
                    }
                  }"
                    >{{listItem.brand}}</router-link>
                  </p>
                  <!-- <p>基本参数：DIP 盒子 1/8W 100-15</p> -->
                  <p class="gray">描述：{{listItem.productdesc}}</p>
                  <p>
                    <span>
                      共有
                      <strong>{{listItem.map.totalSeller}}</strong>个供应商报价
                    </span>
                    <span
                      class="color"
                      v-if="listItem.map.totalSeller != 0 && listItem.map.minPrice!=listItem.map.maxPrice"
                    >{{listItem.map.minPrice}} ------ {{listItem.map.maxPrice}}</span>
                    <span
                      class="color"
                      v-if="listItem.map.totalSeller != 0  && listItem.map.minPrice==listItem.map.maxPrice"
                    >{{listItem.map.minPrice}}</span>
                  </p>
                </div>
                <div class="goodPrice">
                  <h3>原厂报价</h3>
                  <div v-if="!listItem.factorySellerInfo.seller_goods_id">
                    <p>暂无原厂报价</p>
                  </div>
                  <template v-for="(subitem,index) in listItem.priceList">
                    <div
                      v-if="listItem.factorySellerInfo.seller_goods_id && (listItem.factorySellerInfo.priceType || listItem.factorySellerInfo.price_type)"
                      :key="index"
                      class="color"
                    >
                      <span>{{subitem.num}}+</span> -------
                      <span>
                        <span v-if="listItem.priceUnit|| listItem.priceunit">$</span>
                        <span v-else>￥</span>
                        <span>{{subitem.price | toFixed((listItem.priceUnit|| listItem.priceunit)?3:2)}}</span>
                      </span>
                    </div>
                  </template>
                  <div
                    v-if="listItem.factorySellerInfo.seller_goods_id && !(listItem.factorySellerInfo.priceType || listItem.factorySellerInfo.price_type)"
                    :key="index"
                    class="color"
                  >
                    <span
                      v-if="listItem.factorySellerInfo.priceUnit || listItem.factorySellerInfo.priceunit"
                    >$</span>
                    <span v-else>￥</span>
                    <!-- <span v-if="listItem.factorySellerInfo.seckilPrice">{{listItem.factorySellerInfo.seckilPrice | toFixed((listItem.factorySellerInfo.priceUnit || listItem.factorySellerInfo.priceunit)?3:2)}}</span> -->
                    <span
                      v-if="listItem.factorySellerInfo.seckil_price"
                    >{{listItem.factorySellerInfo.seckil_price | toFixed((listItem.factorySellerInfo.priceUnit || listItem.factorySellerInfo.priceunit)?3:2)}}</span>
                  </div>
                </div>
                <div class="edit" style="width:350px;">
                  <el-form
                    :model="listItem"
                    :rules="editPriceRules"
                    ref="editPrice"
                    label-width="80px"
                  >
                    <el-form-item class="acceptPrice" label="接受价格" prop="acceptPrice">
                      <el-input
                        @input="listChange"
                        placeholder="请输入价格"
                        v-model="listItem.acceptPrice"
                        class="input-with-select"
                        size="mini"
                      >
                        <span slot="prepend" v-if="listItem.priceType=='false'">￥</span>
                        <span slot="prepend" v-else>$</span>
                        <el-select
                          v-model="listItem.priceType"
                          slot="append"
                          placeholder="请选择"
                          @change="listChange(index)"
                        >
                          <el-option :label="'人民币'" value="false"></el-option>
                          <el-option :label="'美元'" value="true"></el-option>
                        </el-select>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="年采购量" class="purchaseAmount" prop="projectEau">
                      <el-input
                        placeholder="请输入采购量"
                        @input="listChange"
                        v-model="listItem.projectEau"
                        class="input-with-select unit"
                        size="mini"
                        type="number"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="竞争型号" class="contact" prop="insteadNo">
                      <el-input
                        v-for="(item,k) in listItem.insteadData"
                        :key="k"
                        placeholder="请输入竞争型号"
                        v-model="listItem.insteadData[k]"
                        size="mini"
                      >
                        <el-button
                          slot="append"
                          @click="deleteInsteadNo(k,true,listItem)"
                          icon="el-icon-delete"
                        ></el-button>
                      </el-input>
                      <el-input
                        placeholder="请输入竞争型号"
                        v-model="listItem.insteadNo"
                        @input="listChange"
                      >
                        <el-button
                          slot="append"
                          @click.native.stop="addInsteadNo(listItem,true)"
                          icon="el-icon-circle-plus"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="keep">
        <el-checkbox v-model="checked">下次自动填充本次填写的信息</el-checkbox>
      </div>

      <div class="submit" style="text-align:center;">
        <el-button class="submitBtn bgColor" @click="commitSprice" style="width:400px;">提交特价申请信息</el-button>
        <!-- <p style="margin-bottom:20px">特价申请有效期将为6个月，您可以在询价篮产看状态</p> -->
      </div>
    </div>
  </div>
</template>
<script>
//import { mapGetters } from "vuex";
import { axios, shoppingCar } from "@/api/apiObj";
import { formatAllDate } from "@/lib/utils";
import { ladderPrice } from '../../../lib/utils';
//import { type } from "os";
export default {
  name: "ApplySpecialPrice",
  data() {
    return {
      formAlign: {
        companyName: "",
        website: "",
        projectName: "",
        projectProcess: "",
        contactName: "",
        telphone: "",
        acceptPrice: "",
        priceType: false,
        remark: "",
        projectBeginTime: "",
        projectEau: "",
        position: "",
        insteadNo: "",
        insteadData: []
      },
      projectProcess: ["样品试制", "小批量", "大批量", "老产品替换"],
      rules: {
        companyName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" }
        ],
        website: [{ required: true, message: "网址不能为空", trigger: "blur" }],
        projectName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        projectProcess: [
          { required: true, message: "产品不能为空", trigger: "blur" }
        ],
        contactName: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        telphone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }
        ],
        acceptPrice: [
          { required: true, message: "接受价格不能为空", trigger: "blur" }
        ],
        projectBeginTime: [
          { required: true, message: "预计量产时间不能为空", trigger: "blur" }
        ],
        projectEau: [
          { required: true, message: "年采购量不能为空", trigger: "blur" }
        ],
        position: [
          { required: true, message: "职位不能不能为空", trigger: "blur" }
        ]
      },
      editPriceRules: {},
      topShow: false,
      checked: true,
      productData: [],
      oneData: {
        map: {}
      },
      proInformation: ""
    };
  },
  computed: {
    // ...mapGetters(["proInformation"])
  },
  created() {},
  destroyed() {
    // localStorage.removeItem("proInformation");
    // localStorage.removeItem("applyDetailEdit")
  },
  mounted() {
 
   let formAlign = localStorage.getItem("formAlign")?JSON.parse(localStorage.getItem("formAlign")):'';
      if(formAlign){
        this.formAlign={
        companyName: formAlign.companyName,
        website: formAlign.website,
        projectName: formAlign.projectName,
        projectProcess: formAlign.projectProcess,
        contactName:formAlign.contactName,
        telphone: formAlign.telphone,
        acceptPrice:formAlign.telphone,
        priceType: formAlign.priceType,
        remark: formAlign.remark,
        projectBeginTime: formAlign.projectBeginTime,
        projectEau: formAlign.projectEau,
        position: formAlign.position,
        insteadNo: formAlign.insteadNo,
        insteadData:formAlign.insteadNo.split("@")
        }
      }
    this.proInformation = JSON.parse(localStorage.getItem("proInformation"));
    console.log("proInformation:",this.proInformation)
    if (!this.proInformation) {
      return;
    }
    if (this.proInformation instanceof Array && this.proInformation.length) {
      this.topShow = false;
     
       this.proInformation=this.proInformation.map(item=>{
         let obj={
          acceptPrice: "",
          projectEau: "",
          insteadNo: "",
          insteadData: [],
          ...item
         }
        
         if(item.factorySellerInfo.priceunit==true || item.factorySellerInfo.priceunit==false){
           obj.priceType=item.factorySellerInfo.priceunit
         }
         if(item.factorySellerInfo.priceUnit==true || item.factorySellerInfo.priceUnit==false){
          
           obj.priceType=item.factorySellerInfo.priceUnit
         }
         if(item.factorySellerInfo.priceLevel){
           obj.priceList=ladderPrice(item.factorySellerInfo.priceLevel)
         }
         if(item.factorySellerInfo.price_level){
           obj.priceList=ladderPrice(item.factorySellerInfo.price_level)
         }
       console.log(obj)
         return obj;
       })
      this.productData = this.proInformation;
      
    } else {
      
      if (this.proInformation.goodsbaseIno) {
        this.oneData = this.proInformation.goodsbaseIno;
        this.formAlign = { ...this.formAlign, ...this.proInformation };
        if (this.proInformation.insteadNo) {
          let arr = this.proInformation.insteadNo.split("@");
          arr.forEach((item, index) => {
            if (index == arr.length - 1) {
              this.$set(this.formAlign, "insteadNo", item);
            } else {
              this.formAlign.insteadData.push(item);
            }
          });
        } else {
          this.formAlign.insteadData = [];
        }
      } else {
        this.oneData = this.proInformation;
        console.log("oneData:", this.oneData);
      }
      this.topShow = true;
    }
  },
  methods: {
    deleteOne(index){
      if(this.productData.length<2){
          this.$message({
            message:'最后一条不可删除',
            type:'warning'
          })
      }else{
        this.productData.splice(index,1)
      }
    },
    commitSprice() {
      var insteadNumber = "";
      for (var i = 0; i < this.formAlign.insteadData.length; i++) {
        insteadNumber += this.formAlign.insteadData[i] + "@";
      }
      insteadNumber += this.formAlign.insteadNo;

      this.$refs.formAlign.validate(valid => {
        if (valid) {
          if (this.topShow) {
            var projectBeginTime = formatAllDate(
              this.formAlign.projectBeginTime,
              "/"
            )[1];
            var obj = {
              projectName: this.formAlign.projectName,
              projectProcess: this.formAlign.projectProcess,
              projectBeginTime: projectBeginTime,
              projectEau: this.formAlign.projectEau,
              acceptPrice: this.formAlign.acceptPrice,
              companyName: this.formAlign.companyName,
              website: this.formAlign.website,
              contactName: this.formAlign.contactName,
              position: this.formAlign.position,
              telphone: this.formAlign.telphone,
              remark: this.formAlign.remark,
              defaultConfig: this.checked,
              brandId: this.oneData.brandId,
              goodsName: this.oneData.productno,
              requestId: this.oneData.id,
              bucketId: this.oneData.bucketId,
              acceptUnit: this.formAlign.priceType,
              insteadNo: insteadNumber
            };
            axios
              .request({ ...shoppingCar.saveInquiry, params: obj })
              .then(res => {
                if (res.resultCode == "200") {
                  this.$message.success("提交成功");
                  this.$router.push("/InquiryBasket/Inquiry/waitInquiry");
                }
              });
          } else {
             var projectBeginTime = formatAllDate(
              this.formAlign.projectBeginTime,
              "-"
            )[1];
           
            var infoData = [];
            for(var index =0; index<this.proInformation.length;index++){
              let element = this.proInformation[index];
              console.log("element:",element)
              if(!element.projectEau){
                this.$message.info("第"+(index+1)+"个产品的年用量未填写")
                return;
              }
              
              if(!element.acceptPrice){
                this.$message.info("第"+(index+1)+"个产品的接受价未填写")
                return;
              }
               if(!element.insteadNo){
                this.$message.info("第"+(index+1)+"个产品的竞争型号和品牌未填写")
                return;
              }
              if (element.insteadData.push(element.insteadNo))
                infoData.push({
                  requestId: element.id,
                  acceptPrice: element.acceptPrice,
                  projectEau: element.projectEau,
                  insteadNo: element.insteadData.join("@"),
                  goodsName: element.productno,
                  brandId: element.brandId,
                  bucketId: element.bucketId,
                  acceptUnit: element.priceType,
                  seller_goods_id:element.factorySellerInfo.seller_goods_id
                });
            }
            var orderData = JSON.stringify(infoData);
            var obj = {
              projectName: this.formAlign.projectName,
              projectProcess: this.formAlign.projectProcess,
              projectBeginTime: projectBeginTime,
              companyName: this.formAlign.companyName,
              website: this.formAlign.website,
              contactName: this.formAlign.contactName,
              position: this.formAlign.position,
              telphone: this.formAlign.telphone,
              remark: this.formAlign.remark,
              defaultConfig: this.checked,
              order: orderData
            };
            axios
              .request({ ...shoppingCar.saveBatchInquiry, data: obj })
              .then(res => {
                if (res.resultCode == "200") {
                  this.$message.success("提交成功");
                  localStorage.removeItem("formAlign")
                  this.$router.push("/InquiryBasket/Inquiry/waitInquiry");
                }
              });
          }
        }
      });
    },
    addInsteadNo(val, type) {
        for (var i = 0; i < this.productData.length; i++) {
          if (this.productData[i].id == val.id) {
            if (val.insteadData.length >= 2) {
                this.$message({
                  message: "最多添加三个竞争型号",
                  type: "warning"
                });
              } else {
                this.productData[i].insteadData.push("");
              }
            return;
            if (!val.insteadNo) {
              this.$message({
                message: "请填写竞争型号",
                type: "warning"
              });
            } else {
              if (val.insteadData.length >= 2) {
                this.$message({
                  message: "最多添加三个竞争型号",
                  type: "warning"
                });
              } else {
                this.productData[i].insteadData.push(val.insteadNo);
              }
            }
            return;
          }
        }
      // }
    },
    deleteInsteadNo(index, type, val) {
      if (type) {
        for (var i = 0; i < this.productData.length; i++) {
          if (this.productData[i].id == val.id) {
            this.productData[i].insteadData.splice(index, 1);
          }
        }
        this.productData = Object.assign([], this.productData);
      } else {
        this.formAlign.insteadData.splice(index, 1);
      }
    },
    selectChange(e) {
      console.log(e);
      this.formAlign = Object.assign({}, this.formAlign);
    },
    listChange(index) {
      this.productData = Object.assign([], this.productData);
    },
    showChange() {
      console.log("11");
      this.proInformation = Object.assign([], this.proInformation);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./ApplySpecialPrice.less";
</style>

<style lang="less" scoped >
.moreInquiry {
  & > p {
    line-height: 60px;
    text-align: center;
    font-size: 22px;
    color: #999;
    margin-bottom: 20px;
    font-weight: bold;
    background-color: rgba(222, 227, 233, 1);
  }
}
/deep/.el-form-item {
  .el-form-item__label {
    line-height: 30px;
  }
  .el-form-item__content {
    line-height: 30px;
    input {
      height: 30px;
      line-height: 30px;
    }
    .el-input-group__prepend {
      padding: 0 10px;
    }
  }
}
.acceptPrice {
  /deep/.el-input-group__append {
    font-size: 12px;
    width: 50px;
    input {
      font-size: 12px !important;
    }
  }
}
.purchaseAmount {
  position: relative;
  overflow: initial !important;
}
.purchaseAmount .desc {
  position: absolute;
  font-size: 14px;
  left: 180px;
  bottom: -18px;
  color: #ff9900;
}

// 记住操作
.keep {
  width: 100%;
  margin-top: 15px;
  float: left;
  text-align: center;
  .el-checkbox {
    width: 100%;
    text-align: center;
    .el-checkbox__input {
      .el-checkbox__inner {
        width: 23px;
        height: 23px;
        border-color: #999;
        &:after {
          height: 13px;
          left: 8px;
          top: 0;
          border-width: 3px;
        }
      }
      &.is-checked {
        .el-checkbox__inner {
          border-color: #dcdfe6;
        }
      }
    }

    .el-checkbox__label {
      font-size: 20px;
    }
  }
}
.inquiryList {
  .listCheck {
    width: 100%;
    height: auto;
    .listContent {
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      background: #f5f5f5;
      margin-bottom: 15px;
      border-bottom: 1px solid #ddd;
      &:hover {
        box-shadow: 0 0 5px 2px #ddd;
      }
      .goodsImg {
        width: 150px;
        margin-right: 34px;
        display: flex;
        align-items: center;
        background: #fff;
        > div {
          &:nth-of-type(1) {
            width: 100%;

            text-align: center;
            > img {
              width: 90%;
            }
          }
          &:nth-of-type(2) {
            width: 166px;
            height: 38px;
            margin: 6px 0 6px 68px;
            display: flex;
            justify-content: space-between;
            > li {
              width: 38px;
              height: 38px;
              border: 1px solid rgba(224, 224, 224, 1);
            }
          }
        }
      }
      .goodsDetail {
        display: flex;
        flex: 1;
        .googsDesc {
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          > h3 {
            font-size: 20px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(244, 86, 24, 1);
          }
          > h4 {
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
          }
          > p {
            &:nth-of-type(1) {
              font-size: 16px;
              color: rgba(153, 153, 153, 1);
            }
            &:nth-of-type(2) {
              > span {
                &:nth-of-type(1) {
                  font-size: 16px;
                  color: rgba(102, 102, 102, 1);
                  margin-right: 38px;
                }
                &:nth-of-type(2) {
                  font-size: 18px;
                  color: rgba(242, 46, 46, 1);
                }
              }
            }
          }
        }
        .goodPrice {
          box-sizing: border-box;
          width: 26%;
          text-align: center;
          white-space: nowrap;
          padding: 0 20px;
          > h3 {
            width: 100%;
            text-align: center;
            font-size: 20px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(77, 154, 243, 1);
            margin-bottom: 33px;
          }
          > li {
            margin-bottom: 20px;
            color: rgba(232, 232, 232, 1);
            span {
              &:nth-of-type(1) {
                font-size: 18px;
                color: rgba(102, 102, 102, 1);
                margin-right: 24px;
              }
              &:nth-of-type(2) {
                font-size: 18px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(242, 46, 46, 1);
                margin-left: 24px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

