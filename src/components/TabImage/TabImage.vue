<template>
  <div class="TabImage" :style="{width:bigWidth}">
    <img :src="imgBigUrl" :style="{height:bigWidth}" :class="{shadow:shadow}" alt>
    <div class="list" :style="{height:listH}">
        <img
        v-for="(item,k) in imgSmallList"
        :key="`imgSmallList_${k}`"
        :src="item.url"
        :style="smallStyle"
        @mouseenter="change(k)"
        alt
        >

    </div>
  </div>
</template>

<script>
import './TabImage.less'
export default {
  name: 'TabImage',
  props: {
    width: {
      require: true,
      type: Number,
      default: 147
    },
    shadow: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: '#ddd'
    }
  },
  computed: {
    // 大图片宽度
    bigWidth () {
      return `${this.width}px`
    },
    // 小图片列表高度
    listH () {
      return `${this.width / 3 + 2}px`
    },
    // 小图片的样式
    smallStyle () {
      return {
        'width': `${this.width / 3.2 - 3}px`,
        'height': `${this.width / 3.2 - 3}px`,
        'border': `1px solid  ${this.borderColor}`
      }
    }
  },
  data () {
    return {
      imgBigUrl: require('../../assets/image/inquirybasket/_u11969_selected.png'),
      imgSmallList: [
        {
          url: require('../../assets/image/inquirybasket/_u11431.png')
        },
        {
          url: require('../../assets/image/inquirybasket/_u11431.png')
        },
        {
          url: require('../../assets/image/inquirybasket/_u11431.png')
        }
      ],
      imgBigUrlList: [
        {
          url: require('../../assets/image/inquirybasket/_u11948.png')
        },
        {
          url: require('../../assets/image/inquirybasket/_u11948.png')
        },
        {
          url: require('../../assets/image/inquirybasket/_u11948.png')
        }
      ]
    }
  },
  methods: {
    change (k) {
      this.imgBigUrl = this.imgBigUrlList[k].url
    }
  }
}
</script>
