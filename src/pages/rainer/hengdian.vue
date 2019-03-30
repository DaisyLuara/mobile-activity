<template>
  <div
    :style="style.root"
    :class="{content:true,iphoneX:iphoneX}">
    <div
      class="picture">
      <img 
        :src="base + 'dgm/kuang.png' + this.$qiniuCompress()"
        class="frame">
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo">
      <a 
        href="http://papi.xingstation.com/api/s/yrW"
        class="alink">
        <!-- @click="myToBuy"
        <img
          :src="base + btn + this.$qiniuCompress()"> -->
      </a>
    </div>
    <img
      :src="base + 'dgm/save.png' + this.$qiniuCompress()"
      class="note">
    <img
      :src="base + 'dgm/di.png' + this.$qiniuCompress()"
      :class="{light:!absolute,absolute:absolute}">
  </div>
</template>
<script>
const cdnUrl = process.env.CDN_URL
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/',
      photo: null,
      iphoneX: false,
      absolute: false,
      btn: 'hengdian/btn1.png',
      count: 0,
      timer: null,
      //微信分享
      wxShareInfoValue: {
        title: '横店APP',
        desc: '19.9会员购票',
        link: 'http://papi.xingstation.com/api/s/rR6' + window.location.search,
        imgUrl: 'http://cdn.xingstation.com/fe/image/hengdian/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    let height = this.$innerHeight()
    let width = this.$innerWidth()
    if (height > 630) {
      this.absolute = true
    } else {
      this.absolute = false
    }
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    // this.btnOnLoad()
  },
  methods: {
    btnOnLoad() {
      let btn1 = new Image()
      btn1.src = this.base + 'hengdian/btn1.png'
      let btn2 = new Image()
      btn2.src = this.base + 'hengdian/btn2.png'
      let that = this
      btn1.onload = function() {
        btn2.onload = function() {
          that.setAnim()
        }
      }
    },
    setAnim() {
      if (this.count % 10 == 0) {
        this.btn =
          this.btn == 'hengdian/btn1.png'
            ? 'hengdian/btn2.png'
            : 'hengdian/btn1.png'
      }
      this.count++
      this.timer = requestAnimationFrame(this.setAnim)
      if (this.count > 600) {
        this.count = 0
        return
      }
    },
    myToBuy() {
      // cancelAnimationFrame(this.timer)
      // this.btn = 'hengdian/press.png'
      window.location.href = 'http://papi.xingstation.com/api/s/yrW'
    }
  }
}
</script>
<style lang="less" scoped>
@base: 'http://cdn.xingstation.com/fe/image/hengdian/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #210707;
  max-width: 750px;
  .picture {
    position: relative;
    z-index: 0;
    margin-top: -1.5%;
    .frame {
      width: 88.5%;
      position: relative;
      z-index: 0;
      margin-left: -3.5%;
    }
    .photo {
      position: absolute;
      width: 76.5%;
      top: 6%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
      z-index: 999;
    }
    .alink {
      width: 45vw;
      height: 45vw;
      position: absolute;
      bottom: -9%;
      right: -4%;
      z-index: 9999;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% auto;
      animation: myShake 2s linear infinite;
      &:active {
        background-image: url('@{base}press.png');
        animation: none;
      }
    }
  }
  .note {
    width: 34%;
    position: relative;
    z-index: 999;
    margin-top: 4%;
  }
  .light {
    width: 120%;
    position: relative;
    margin: 0 auto;
    z-index: 99;
    margin-top: -36%;
  }
}
.absolute {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  z-index: 99;
}
.iphoneX {
  .picture {
    margin-top: 12%;
  }
}
@keyframes myShake {
  0% {
    background-image: url('@{base}btn1.png');
  }
  50% {
    background-image: url('@{base}btn2.png');
  }
  100% {
    background-image: url('@{base}btn1.png');
  }
}
</style>


