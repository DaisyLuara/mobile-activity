<template>
  <div 
    id="warp" 
    class="content">
    <div class="div_img">
      <img 
        :src="mImg" 
        class="photo">
    </div>
    <img 
      :src="IMAGE_URL + 'save.png'" 
      class="save">
    <div class="div_text">
      <ul>
        <li class="name">规则：</li>
        <li 
          v-for="(item, index) in textMsg[num]"
          :key="index">{{ item }}
        </li>
        <li class="name">优惠券规则：</li>
        <li>凭此照片兑换，仅限本人使用，每人只可用一次，全场先秒先得！</li>
      </ul>
    </div>
    <div class="map">
      <img
        v-for="(item, index) in imgMsg" 
        :key="index" 
        :src="item">
    </div>
  </div>
</template>
<script>
import { $_wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import couponService from 'services/coupon'
import Mydata from './data.js'
export default {
  data() {
    return {
      IMAGE_URL: IMAGE_SERVER + '/pages/goodboy/',
      num: this.$route.query.num,
      coupon_id: {
        '1': 35,
        '19': 36,
        '99': 37,
        '129': 38
      },
      mImg: null,
      textMsg: null,
      imgMsg: null,
      //微信分享
      wxShareInfo: {
        title: 'Happy Dino 全民刷脸抢秒杀！颜值爆表1元抢抢抢抢抢！',
        desc: ' 全民疯抢！Happy Dino—好孩子 2018大型特卖会正在进行中',
        imgUrl: IMAGE_SERVER + '/pages/goodboy/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  created() {
    this.getInfoById()
    this.textMsg = Mydata[0].textMsg
    this.imgMsg = Mydata[0].imgUrl
    this.couponCount()
  },
  mounted() {
    this.handleWechatShare()
    var height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var warp = document.getElementById('warp')
    warp.style.minHeight = height + 'px'
    let w = document.documentElement
    let a = w.getBoundingClientRect().width
    if (a > 750) {
      a = 750
    }
    let rem = a / 7.5
    w.style.fontSize = rem + 'px'
    console.log(w.style.fontSize)
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $_wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      } else {
        console.warn('you r not in wechat environment')
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.mImg = res.image
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    couponCount() {
      let parms = {
        face_id: this.$route.query.id,
        coupon_batch_id: this.coupon_id[this.num]
      }
      couponService
        .createV5Coupon(this, parms)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/goodboy/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background: url('@{imgUrl}bg.png') top left/100% auto repeat;
  text-align: center;
  margin: 0 auto;
  padding-top: 5%;
  .div_img {
    width: 100%;
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    position: relative;
    .photo {
      width: 83%;
      margin: 0 auto;
    }
  }
  .div_text {
    width: 100%;
    margin-top: 4%;
    margin-bottom: 5.7%;
    text-align: center;
    ul {
      list-style: none;
      display: inline-block;
      width: 80%;
      margin: 0 auto;
      li {
        display: block;
        text-align: left;
        font-size: 0.28rem;
        color: #fff;
        line-height: 0.5rem;
        letter-spacing: 0.5px;
      }
    }
  }
  .save {
    width: 84%;
    margin: 0 auto;
    margin-top: 5.2%;
  }
  .map {
    width: 83%;
    margin: 0 auto;
    img {
      max-width: 100%;
      margin-bottom: 10%;
    }
  }
}
</style>

