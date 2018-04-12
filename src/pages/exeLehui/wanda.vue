
<template>
  <div class="lehui-content" id="lehui">
      <img class="title" :src="imgUrl+'lehui/wd_tit.png'"/>
      <div class="frame">
          <img class="border" :src="imgUrl+'lianyang/frame.png'"/>
          <img :class="shake?'noshake':'hasshake'" id="mImg" :src="mImg"/>
          <img class="note" :src="imgUrl+'lianyang/note.png'" v-show="noteShow">
      </div>
      <img class="press" :src="imgUrl+'lianyang/press.png'" v-show="isshow"/>
      <img class="wd_logo" :src="imgUrl+'lehui/wd_logo.png'"/>
      <img class="wd_name" :src="imgUrl+'lehui/wd_name.png'"/>
      <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const BASE_URL = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  data() {
    return {
      imgUrl: BASE_URL + 'image/',
      mImg: null,
      isshow: false,
      noteShow: true,
      shake: true,
      //微信分享
      wxShareInfoValue: {
        title: '万达陪你“美”一天',
        desc: '唯万达 更懂你',
        imgUrl: BASE_URL + 'image/lehui/wanda.png'
      }
    }
  },
  beforeCreated() {
    document.title = '万达'
  },
  created() {
    this.wxShareInfo.link = window.location.origin + this.$route.path
  },
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let lehui = document.getElementById('lehui')
    lehui.style.minHeight = height + 'px'

    this.getInfoById()
    this.initShack()
  },
  computed: {
    //微信分享
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        link: this.wxShareInfoValue.link,
        success: function() {
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo
    }
  },
  methods: {
    initShack() {
      var last_update = '',
        x,
        y,
        z,
        last_x,
        last_y,
        last_z = 0,
        SHAKE_THRESHOLD = 3000,
        that = this
      if (window.DeviceMotionEvent) {
        // 移动浏览器支持运动传感事件
        window.addEventListener('devicemotion', deviceMotionHandler, false)
      } else {
        // 移动浏览器不支持运动传感事件
        alert('移动浏览器不支持运动传感事件')
      }
      function deviceMotionHandler(eventData) {
        // 获取含重力的加速度
        var acceleration = eventData.accelerationIncludingGravity
        // 获取当前时间
        var curTime = new Date().getTime()
        var diffTime = curTime - last_update
        // 固定时间段
        if (diffTime > 10) {
          last_update = curTime
          x = acceleration.x
          y = acceleration.y
          z = acceleration.z
          var speed =
            Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000
          if (speed > SHAKE_THRESHOLD) {
            //TODO:在此处可以实现摇一摇之后所要进行的数据逻辑操作
            that.noteShow = false
            that.shake = false
          }
          last_x = x
          last_y = y
          last_z = z
        }
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      let that = this
      marketService
        .getInfoById(this, id)
        .then(res => {
          that.mImg = res.image
          that.isshow = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image';
html,
body {
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.lehui-content {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  text-align: center;
  font-size: 0;
  position: relative;
  background: url('@{imgUrl}/lehui/lhbg.png?111') center top /100% 100% no-repeat;
  .title {
    width: 60%;
    padding-top: 10%;
    padding-bottom: 8%;
  }
  .frame {
    width: 80%;
    text-align: center;
    margin: 0 auto;
    position: relative;
    &:after {
      content: '';
      width: 90%;
      height: 92%;
      position: absolute;
      top: 5%;
      left: 5%;
      background-color: rgba(255, 255, 255, 0.7);
      z-index: 0;
    }
    .border {
      width: 100%;
      position: relative;
      z-index: 9;
    }
    #mImg {
      position: absolute;
      top: 5%;
      left: 7.6%;
      width: 85.8%;
      z-index: 999;
    }

    .hasshake {
      animation: twinkle 0.8s linear;
    }
    .noshake {
      animation: twinkle 10s linear;
    }
    .note {
      position: absolute;
      top: 50%;
      left: 20%;
      width: 60%;
      animation: shake 0.8s linear infinite alternate;
    }
  }
  .press {
    width: 62.5%;
    margin: 0 auto;
    animation: updown 0.8s linear infinite alternate;
    padding: 2% 0 5% 0;
    display: block;
  }
  .wd_logo {
    width: 28%;
    display: block;
    margin: 0 auto;
  }
  .wd_name {
    width: 35%;
    display: block;
    margin: 0 auto;
    margin-top: 3%;
    margin-bottom: 5%;
  }
}
//上下移动
@keyframes updown {
  0% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(5px);
  }
}
// 晃动
@keyframes shake {
  0% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
}
// 闪烁
@keyframes twinkle {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
//转动
@keyframes mycir {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

