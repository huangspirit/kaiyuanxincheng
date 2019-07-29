<template>
  <div class="ScreenItem">
    <td class="screen-class-list">
      <span class="shrink" @click="shrink">
        <span class="text">{{shrinkFlag ? '收起': '更多'}}</span>
        <span class="icon">
          <i class="el-icon-arrow-down" v-if="!shrinkFlag"></i>
          <i class="el-icon-arrow-up" v-if="shrinkFlag"></i>
        </span>
      </span>
      <ul :style="{'height':shrinkFlag ? 'auto' : '60px'}">
        <li
          v-for="val in item.childList"
          :key="`screenTypeList_${item.propertyId}_${val}`"
          @click="changeType(item,val)"
          :class="{active:flag === val}"
        >
          {{val}}
          <span v-if="flag === val">
            <img @click.stop="close(item)" src="@/assets/image/brandDetail/u172.png" alt>
          </span>
        </li>
      </ul>
    </td>
  </div>
</template>
<script>
import "./ScreenItem.less";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "ScreenItem",
  data() {
    return {
      shrinkFlag: false,
      flag: ""
    };
  },
  props: {
    flags: {
      type: Boolean
    },
    childList: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      default: () => ({})
    },
    screenListOne: {
      type: Object,
      default: () => ({})
    },
    currentPage: {
      default: 1,
      type: Number
    },
    query: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    flags() {
      this.GetScreenTotal({
        map: this.screenListOne,
        brand_id: this.query.brandId ? this.query.brandId : "",
        parent_id: this.query.brandId
          ? this.query.parent_id
          : this.query.documentid
      });
      this.all();
      this.flag = "";
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions("Direct", ["GetScreenProductList", "GetScreenTotal"]),
    all() {
      let arr = Object.keys(this.screenListOne);
      
      if (arr.length === 4) {
        this.GetScreenProductList({
          map: this.screenListOne,
          brand_id: this.query.brandId ? this.query.brandId : "",
          parent_id: this.query.brandId
            ? this.query.parent_id
            : this.query.documentid
        }).then(res => {
          this.$emit("update:currentPage", 1);
        });
      }
    },
    close(val) {
      this.flag = "";
      let key = val.propertyId;
      delete this.screenListOne[key];
      this.GetScreenTotal({
        map: this.screenListOne,
        brand_id: this.query.brandId ? this.query.brandId : "",
        parent_id: this.query.brandId
          ? this.query.parent_id
          : this.query.documentid
      });
      this.all();
    },
    changeType(item, val) {
      this.flag = val;
      let key = item.propertyId;
      this.screenListOne[key] = val;
      this.GetScreenTotal({
        map: this.screenListOne,
        brand_id: this.query.brandId ? this.query.brandId : "",
        parent_id: this.query.brandId
          ? this.query.parent_id
          : this.query.documentid
      });
    },
    shrink() {
      this.shrinkFlag = !this.shrinkFlag;
    }
  }
};
</script>
