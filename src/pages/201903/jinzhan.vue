<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="base + 'title.png'"
        class="title"
      >
      <img
        :src="base + 'float_1.png'"
        class="cover1"
      >
      <img
        :src="base + 'float_2.png'"
        class="cover2"
      >
      <div class="name">{{name}}</div>
      <div class="coupon">
        <img :src="coupon_img">
      </div>
      <div class="erweima">
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
      <div class="code">{{code}}</div>
    </div>
    <img
      :src="base + 'bottom.png'"
      class="bottom"
    >
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, getWxUserInfo, batchV2CouponLimit, sendV2Projects, checkV2Coupon } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/jinzhan/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      coupon_img: null,//'https://cdn.exe666.com/fe/image/jinzhan/test.png',
      qrcodeImg: null,//'https://cdn.exe666.com/fe/image/couponrain/5c22f3d46c008.png',
      used: false,//false
      name: null,//'大小珠宝全场88折优惠券'
      code: null,
      nick_name: null,
      head_img_url: null,
      z: null,
      //微信分享
      wxShareInfoValue: {
        title: "金展",
        desc: "金展",
        imgUrl: "https://cdn.exe666.com/fe/image/jinzhan/icon.jpg"
      }
    }
  },
  watch: {
    sertime() {
      this.getWxUserInfo()
      if (localStorage.getItem('z')) {
        this.z = localStorage.getItem('z')
        this.checkV2Coupon()
      } else if (this.userinfo) {
        this.z = this.userinfo.z
        localStorage.setItem('z', this.userinfo.z)
        this.checkV2Coupon()
      }
    }
  },
  mounted() {
    this.handleForbiddenShare()
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
        qiniu_id: this.id,
        belong: this.belong,
        include: 'couponBatch',
      }
      checkV2Coupon(args).then(res => {
        if (res) {
          this.handleData(res)
        } else {
          this.getCouponBatch()
        }
      }).catch(err => {
        alert(err.response.data.message)
      })
    },
    getCouponBatch() {
      let args = {
        qiniu_id: this.id,
        z: this.z,
        belong: this.belong,
      }
      batchV2CouponLimit(args).then(res => {
        let coupon_batch_id = res.id
        this.sendV2Coupon()
      }).catch(err => {
        alert(err.response.data.message)
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
      sendV2Projects(args)
        .then(res => {
          this.handleData(res)
          if (res.couponBatch.type == 2) {
            this.handlePost()
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    //处理返回数据
    handleData(res) {
      this.name = res.name || res.couponBatch.name
      this.qrcodeImg = res.qrcode_url
      this.coupon_img = res.couponBatch.image_url
      this.code = res.code
      if (parseInt(res.status) === 1) {
        this.used = true
      }
    },
    //获取微信数据
    getWxUserInfo() {
      getWxUserInfo().then(res => {
        let data = res.data
        this.nick_name = data.nickname
        this.head_img_url = data.headimgurl
        console.log(res)
      }).catch(err => {
        let pageUrl = encodeURIComponent(window.location.href)
        let wx_auth_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          pageUrl +
          '&scope=snsapi_userinfo'
        window.location.href = wx_auth_url
        return
      })
    },
    //推送数据
    handlePost() {
      let url = 'http://exelook.com:8010/pushdiv/?oid=' + this.oid + '&belong=' + this.belong + '&name=&img=' + this.head_img_url + ',' + this.nick_name + ',' + this.name + '&id=' + this.id + '&api=json'
      // let url =
      //   'http://exelook.com:8010/pushdiv/?name=' + this.nick_name + '&img=' + this.head_img_url + '&id=' + this.id + '&api=json'
      this.$http
        .get(url)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/jinzhan/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.warp {
  position: relative;
  overflow-x: hidden;
  background-image: url("@{img}bg_1.jpg");
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 19%;
  .main {
    position: relative;
    width: 100%;
    z-index: 9;
    background-image: url("@{img}bg_2.png");
    background-position: center top;
    background-size: 90% auto;
    background-repeat: no-repeat;
    margin-bottom: 16%;
    padding-bottom: 11%;
    & > div {
      position: relative;
      z-index: 9;
    }
    .title {
      position: relative;
      width: 65%;
      z-index: 99;
      margin-top: -19%;
      margin-left: -21%;
      margin-bottom: -4%;
    }
    .cover1 {
      width: 100%;
      position: absolute;
      top: 7%;
      left: 0%;
      z-index: 999;
    }
    .cover2 {
      width: 97%;
      position: absolute;
      top: 60%;
      left: 0.1%;
      z-index: 999;
    }
    .name {
      width: 61vw;
      height: 13vw;
      overflow: hidden;
      line-height: 13vw;
      font-size: 4.2vw;
      font-weight: 600;
      letter-spacing: 2px;
      color: #fff;
      background-image: url("@{img}name.png");
      background-position: center top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding: 0% 1%;
    }
    .coupon {
      width: 56%;
      position: relative;
      z-index: 0;
      margin-top: 4%;
      margin-bottom: 6%;
      padding: 0.6%;
      background-image: url("@{img}youhuiquan.png");
      background-position: center top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .erweima {
      width: 36vw;
      height: 36vw;
      padding: 1%;
      margin-bottom: 1%;
      background-image: url("@{img}qr.png");
      background-position: center top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      .clip {
        width: 34vw;
        height: 34vw;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        text-align: center;
        border-radius: 20px;
      }
      .qrcode {
        width: 45vw;
        max-width: 48vw;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .used {
        width: 42vw;
        max-width: 45vw;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
      }
    }
    .code {
      width: 100%;
      font-size: 4.5vw;
      font-weight: 600;
      letter-spacing: 1px;
      text-align: center;
    }
  }
  .bottom {
    position: absolute;
    bottom: 0%;
    left: 0%;
    z-index: 0;
  }
}
</style>


