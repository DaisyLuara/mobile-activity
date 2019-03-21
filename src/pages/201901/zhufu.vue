<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="coupon_img"
        class="coupon"
      >
      <div class="erweima">
        <img
          :src="base + 'scan.png'"
          class="erbg"
        >
        <div class="clip">
          <img
            :src="qrcodeImg"
            class="qrcode"
          >
        </div>
        <img
          v-show="used"
          :src="base + 'used.png'"
          class="used"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies, sendV2Coupon, checkV2Coupon } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/zhufu/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      userId: null,
      coupon_img: null,//'https://cdn.exe666.com/fe/image/zhufu/test.png',
      qrcodeImg: null,//'https://cdn.exe666.com/fe/image/couponrain/5c22f3d46c008.png',
      used: false,
      z: null,
      //微信分享
      wxShareInfoValue: {
        title: "希尔顿新年红包雨，新春福利抢不停！",
        desc: "拼手速，抢希尔顿新春红包",
        link: "http://papi.xingstation.com/api/s/Yy0?id=" + this.$route.query.id + '&oid=' + this.oid,
        imgUrl: "https://cdn.exe666.com/fe/image/zhufu/icon.jpg"
      }
    }
  },
  watch: {
    sertime() {
      this.wxShareInfoValue.link = "http://papi.xingstation.com/api/s/Yy0?id=" + this.$route.query.id + '&oid=' + this.oid
      if (localStorage.getItem('z')) {
        this.z = localStorage.getItem('z')
      } else {
        this.z = this.userinfo.z
        localStorage.setItem('z', this.userinfo.z)
      }
      this.checkV2Coupon()
    }
  },
  mounted() {
  },
  methods: {
    //禁止微信分享
    handleForbiddenShare() {
      $wechat()
        .then(res => {
          res.forbidden()
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    //判断是否领过优惠券
    checkV2Coupon() {
      let args = {
        z: this.z,
        coupon_batch_id: this.coupon_batch_id,
        include: 'couponBatch',
      }
      checkV2Coupon(args).then(res => {
        if (res) {
          this.handleData(res)
        } else {
          let timer = setTimeout(() => {
            this.sendV2Coupon()
            clearTimeout(timer)
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //发优惠券
    sendV2Coupon() {
      let args = {
        qiniu_id: this.id,
        z: this.z,
        belong: this.belong,
        oid: this.oid
      }
      sendV2Coupon(args, this.coupon_batch_id)
        .then(res => {
          this.handleData(res)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    //处理返回数据
    handleData(res) {
      this.qrcodeImg = res.qrcode_url
      this.coupon_img = res.couponBatch.image_url
      if (parseInt(res.status) === 1) {
        this.used = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/zhufu/";
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
  margin: 0 auto;

  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.warp {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  background-image: url("@{img}bg.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding-top: 36%;
  text-align: center;
  .main {
    width: 78%;
    position: relative;
    z-index: 0;
    margin-left: 4%;
    margin-bottom: 5%;
    .coupon {
      position: relative;
      z-index: 0;
    }
    .erweima {
      position: absolute;
      top: 55%;
      left: 61%;
      transform: translateX(-50%);
      width: 40vw;
      .erbg {
        position: relative;
        z-index: 0;
      }
      .clip {
        width: 20vw;
        height: 20vw;
        overflow: hidden;
        position: absolute;
        top: 15.5%;
        left: 50%;
        z-index: 9;
        transform: translateX(-50%);
        text-align: center;
      }
      .qrcode {
        width: 25vw;
        max-width: 30vw;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // height: 25vw;
      }
      .used {
        width: 27vw;
        position: absolute;
        top: 18%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
      }
    }
  }
  .btb {
    margin-bottom: 0;
    justify-content: space-around;
    .bitem {
      width: 33%;
    }
  }
}
</style>


