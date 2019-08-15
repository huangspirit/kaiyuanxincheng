 <template>
  <span class="countTo-color">
    <slot name="left"></slot>
    <span :id="elId" ref="number"></span>
    <slot name="right"></slot>
  </span>
</template>
 <style scoped lang="less">
     .countTo-color{
         span{
             margin:0 10px ;
         }
     }
 </style>
<script>
import CountUp from "countup";
// import "./countTo.less";
// target = 目标元素的 ID；
// startVal = 开始值；
// endVal = 结束值；
// decimals = 小数位数，默认值是0；
// duration = 动画延迟秒数，默认值是2；
export default {
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    decimals: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1
    },
    useEasing: {
      type: Boolean,
      default: true
    },
    useGrouping: {
      type: Boolean,
      default: true
    },
    separator: {
      type: String,
      default: ","
    },
    decimal: {
      type: String,
      default: "."
    },
    deyVal: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      elId: `elId${this._uid}`,
      countTo: {}
    };
  },
  watch: {
    endVal(newVal, oldVal) {
      this.countTo.update(newVal);
      this.emitEndEvent();
    }
  },
  methods: {
    getCount() {
      return this.$refs.number;
    },
    emitEndEvent() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$emit("on-change-number", Number(this.getCount()));
        });
      }, this.duration * 1000 - 266);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.countTo = new CountUp(
        this.elId,
        this.startVal,
        this.endVal,
        this.decimals,
        this.duration,
        {
          useEasing: this.useEasing,
          useGrouping: this.useGrouping,
          separator: this.separator,
          decimal: this.decimal
        }
      );
      setTimeout(() => {
        this.countTo.start();
        this.emitEndEvent();
      }, this.deyVal);
    });
  }
};
</script>
