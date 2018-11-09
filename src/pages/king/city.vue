<template>
  <div
    :style="style.root"
    class="root">
      <img 
          :src="baseUrl + 'b.png'+ this.$qiniuCompress()"
          class="dot">
      <img 
          :src="baseUrl + 'kuang.png'+ this.$qiniuCompress()"
          class="frame">
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo">
      <img 
          :src="baseUrl + 'fc.png'+ this.$qiniuCompress()"
          @click="getAword()"
          class="myaward-btn">
      <img 
          :src="baseUrl + 'c.png'+ this.$qiniuCompress()"
          class="line">
      <img 
          :src="baseUrl + 'c.png'+ this.$qiniuCompress()"
          class="line2">
      <img 
          :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
          class="save">
      <img 
          :src="baseUrl + 'a.png'+ this.$qiniuCompress()"
          class="jiantou">
    <div 
    v-show="show.drawShow||show.awardShow"
    class="shade"></div>
    <!-- 抽奖层 -->
      <div 
      v-show="show.drawShow"
      class="letter">
         <img 
          :src="baseUrl + 'xf.png'+ this.$qiniuCompress()"
          class="xf">
         <img 
          :src="baseUrl + 'btn.png'+ this.$qiniuCompress()"
          @click.self="draw()"
          class="draw-btn">
      </div>
    <!-- 奖品层 -->
      <div 
        v-show="show.awardShow"
        class="letter2">
         <img 
          :src="baseUrl + 'xf1.png'+ this.$qiniuCompress()"
          class="xf1">
         <img 
          :src="baseUrl + '5.png'+ this.$qiniuCompress()"
          class="quan">
        <img 
          :src="baseUrl + 'cancel.png'+ this.$qiniuCompress()"
          @click.self="cancle()"
          class="close-btn">
          <!-- 二维码 -->
        <img 
          :src="baseUrl + 'er.jpeg'+ this.$qiniuCompress()"
          class="ewm">
      
    </div>
  </div>
</template>
<script>
import { normalPages } from '../../mixins/normalPages'
import {
  sendCoupon,
  checkGetCoupon,
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies
} from 'services'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/orchid_city/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      coupon_batch_id: this.$route.query.coupon_batch_id,
      couponImg: null,
      qrcodeImg: null,
      show: {
        drawShow: true,
        awardShow: false
      },
      params: {
        user_id: null
      },
      wxShareInfoValue: {
        title: '刷脸享优惠，畅快看大片！',
        desc: '太禾影城等你来嗨玩！',
        link: 'http://papi.xingstation.com/api/s/zK8' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/orchid_city/icon.png'
      }
    }
  },
  created() {},
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
        this.params.user_id = this.userId
      }
    },
    //取消
    cancle() {
      this.show.awardShow = false
    },
    //抽奖
    draw() {
      this.show.awardShow = true
      this.show.drawShow = false
    },
    //我的奖品
    getAword() {
      this.show.awardShow = true
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/orchid_city/';
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
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #ff5172;
  .dot {
    width: 35%;
    position: absolute;
    left: -4%;
    top: 3%;
    animation: arrow2 2s linear infinite alternate;
  }
  .frame {
    width: 84%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -54%);
  }
  .photo {
    width: 75%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -54%);
    user-select: auto;
    pointer-events: auto;
  }
  .myaward-btn {
    width: 20%;
    position: absolute;
    right: -2%;
    top: 12%;
    user-select: auto;
    pointer-events: auto;
    animation: Tada 2s linear infinite alternate;
  }
  .line2 {
    width: 25%;
    position: absolute;
    left: 0;
    bottom: 5%;
    animation: arrow1 1.5s linear infinite alternate;
  }
  .line {
    width: 25%;
    position: absolute;
    left: 0;
    bottom: 2%;
    animation: arrow1 1.5s linear infinite alternate;
  }
  .save {
    width: 48%;
    position: absolute;
    left: 50%;
    bottom: 3.5%;
    transform: translate(-50%, 0);
  }
  .jiantou {
    width: 12%;
    position: absolute;
    right: 10%;
    bottom: 4%;
    animation: arrow3 1.5s linear infinite alternate;
  }
  .shade {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #000;
    opacity: 0.8;
  }
  .letter {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 98;
    .xf {
      width: 85%;
    }
    .draw-btn {
      width: 40%;
      position: absolute;
      left: 30%;
      top: 18%;
      z-index: 999;
      animation: scale 2s linear infinite alternate;
      user-select: auto;
      pointer-events: auto;
    }
  }
  .letter2 {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, 0%);
    z-index: 98;
    .xf1 {
      width: 100%;
    }
    .quan {
      width: 75%;
      position: absolute;
      left: 13%;
      top: 28%;
      z-index: 98;
    }
    .close-btn {
      width: 12%;
      position: absolute;
      right: 6.8%;
      top: 14.5%;
      z-index: 999;
      user-select: auto;
      pointer-events: auto;
    }
    .ewm {
      width: 28%;
      position: absolute;
      right: 18%;
      top: 30%;
      z-index: 98;
    }
  }
}
@keyframes scale {
  from {
    transform: scale(0.8, 0.8);
  }
  50% {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0.8, 0.8);
  }
}
@keyframes arrow1 {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5px);
  }
}
@keyframes arrow2 {
  0% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(10px);
  }
}
@keyframes arrow3 {
  0% {
    transform: translateX(8px);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-8px);
  }
}
@keyframes Tada {
  0% {
    transform: scale(1);
    transform: scale(1);
  }

  10%,
  20% {
    transform: scale(0.9) rotate(-3deg);
    transform: scale(0.9) rotate(-3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(3deg);
    transform: scale(1.1) rotate(3deg);
  }

  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(-3deg);
    transform: scale(1.1) rotate(-3deg);
  }

  100% {
    transform: scale(1) rotate(0);
    transform: scale(1) rotate(0);
  }
}
</style>
