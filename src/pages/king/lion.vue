<template>
  <div
    :style="style.root"
    class="root">
      <img 
        :src="baseUrl + 'bg.png'+ this.$qiniuCompress()"
        class="bg"> 
    <div class="top">
      <img 
        :src="baseUrl + 'topImg.png'+ this.$qiniuCompress()"
        class="topImg"> 
      <img 
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"> 
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo"> 
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo-real"> 
    </div>
    <div class="bt">
      <img 
        :src="baseUrl + 'coupon_01.png'+ this.$qiniuCompress()"
        class="coupon"> 
      <img 
        :src="baseUrl + 'er.jpeg'+ this.$qiniuCompress()"
        class="erweima"> 
      <span class="quanMa">123456</span>
    </div>
  </div>
</template>
<script>
import { normalPages } from '../../mixins/normalPages'
import { checkCouponNumber } from 'services'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/lion/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      showImg: false,
      iphoneX: false,
      coupon: 0,
      coupon_arr: [3, 4, 5, 6],
      wxShareInfoValue: {
        title: '萌狮表情大作战',
        desc: '天降福利，身骑白马闯三关',
        link: 'http://papi.xingstation.com/api/s/oQK' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/lion/icon.png'
      }
    }
  },
  created() {},
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {
    //确认优惠券
    getCheck() {
      let id = this.coupon_arr[this.coupon]
      checkCouponNumber(id)
        .then(res => {
          console.log(res)
          this.mask = true
          this.telform = true
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/lion/';
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
  overflow-x: hidden;
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .top {
    width: 100%;
    position: relative;
    .topImg {
      width: 100%;
      position: absolute;
      left: 0;
      top: 20%;
      z-index: 9;
    }
    .frame {
      width: 72%;
      margin-top: 3%;
    }
    .photo {
      width: 56.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49.8%, -56%);
      user-select: auto;
      pointer-events: auto;
    }
    .photo-real {
      width: 56.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49.8%, -56%);
      user-select: auto;
      pointer-events: auto;
      z-index: 99;
      opacity: 0;
    }
  }
  .bt {
    width: 100%;
    position: relative;
    text-align: center;
    margin: 0 auto;
    .erweima {
      width: 17%;
      position: absolute;
      left: 10.5%;
      top: 59%;
    }
    .quanMa {
      display: block;
      position: absolute;
      left: 37%;
      top: 62.5%;
      color: #d84a4d;
      font-size: 4vw;
      text-align: center;
    }
    .coupon {
      width: 96%;
    }
  }
}
</style>
