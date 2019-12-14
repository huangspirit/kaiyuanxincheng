<template>
  <div class="timer">
    <div ref="startTimer">
        <span>{{text}}</span>
        <span v-if="day>0">
            {{day}}天
        </span>
        <span v-if="day>0">
            {{hour}}时
        </span>
        <span v-if="hour>0">
            {{minutes}}分
        </span>
        <span>
            {{seconds}}秒
        </span>
    </div>
  </div>
</template>
    <script>
export default {
  name: "Timer",
  props:{
      startTime:{
          default:0,
          type:Number
      },
      text:{
          default:'',
          type:String
      }
  },
    data() {
    return {
      timer: "",
      content: "",
      day:0,
      hour: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  created() {
    this.day = parseInt(this.startTime/(24*60*60*1000));
    this.hour = parseInt((this.startTime -this.day*24*3600*1000)/(60*60*1000));
    this.minutes = parseInt((this.startTime -this.day*24*3600*1000-this.hour*3600*1000)/(60*1000));
    this.seconds = parseInt((this.startTime -this.day*24*3600*1000-this.hour*3600*1000-this.minutes*60*1000)/1000)
     console.log("day:",this.day)
     console.log("hour:",this.hour)
     console.log("minutes:",this.minutes)
     console.log("seconds:",this.seconds)
    this.timer = setInterval(this.startTimer, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    startTimer() {
      this.seconds += 1;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes = this.minutes + 1;
      }

      if (this.minute >= 60) {
        this.minutes = 0;
        this.hour = this.hour + 1;
      }
      if (this.hour >= 24) {
        this.hour = 0;
        this.day = this.day + 1;
      }
      //this.$refs.startTimer.innerHTML =(this.minutes < 10 ? "0" + this.minutes : this.minutes) +":" + (this.seconds < 10 ? "0" + this.seconds : this.seconds);
    }
  }
};
</script>