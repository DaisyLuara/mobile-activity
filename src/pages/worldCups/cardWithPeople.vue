<template>
  <div
    :style="style.root"
    class="root"
  >
    <div
      v-if="isLoading || isDrawing"
      :style="style.root" 
      class="loading"
    />
    <div
      v-if="!isDrawing"
      :style="style.root" 
      class="card"
    >
      <img
        :src="base64Data" 
        class="result" 
      >
    </div>
  </div>
</template>

<script>
import MC from 'mcanvas'
import {
  $wechat,
  isInWechat,
  Cookies,
  wechatShareTrack,
  basicTrack,
  getWxUserInfo,
  randomIntNum
} from 'services'
const imgUrl = process.env.CDN_URL
export default {
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      cardBg: ['messi.png', 'neymar.png', 'debruyne.png', 'cronaldo.png'],
      bgcolor: ['#0ca2c5', '#40b324', '#ba3621', '#38aa1d'],
      base64Data: null,
      picOrder: 0,
      // headImgUrl: null,
      headImgUrl:
        'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJNrlPjqkUjXibZm64k9NRNQGZdtziap3BGyuNKefPfEgWfn5EU4ib3bjHC9icJAwuVa8pOqspoLYWopg/132',
      isLoading: true,
      isDrawing: true,
      imgUrl: imgUrl + '/fe/marketing/img/wc/',
      wxShareInfo: {
        title: '梅西 C罗回家了，教练喊你上场！',
        desc: '本届最佳球星就是你',
        imgUrl: imgUrl + '/fe/marketing/img/wc/share-icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    basicTrack(this.$route.query.id)
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'test'
      ) {
        this.handleWechatAuth()
      } else {
        this.isLoading = false
        this.drawing()
      }
      $wechat()
        .then(res => {
          res.share(this.wxShareInfo)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    } else {
      this.isLoading = false
      this.drawing()
    }
  },
  methods: {
    drawing() {
      let width = this.$innerWidth()
      let height = this.$innerHeight()
      let backgroundColor = 'black'
      if (localStorage.getItem('cwporder') !== null) {
        this.picOrder = JSON.parse(localStorage.getItem('cwporder')).order
      } else {
        this.picOrder = randomIntNum(0, 3)
      }
      this.style.root.backgroundColor = this.bgcolor[this.picOrder]
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let that = this
      mc
        .background(this.imgUrl + this.cardBg[this.picOrder], {
          left: 0,
          top: 0,
          color: '#000000',
          type: 'origin',
          width: this.$innerWidth()
        })
        .add(this.headImgUrl, {
          width: '20%',
          pos: {
            x: '40%',
            y: '23%'
          }
        })
        .add(this.imgUrl + this.cardBg[this.picOrder], {
          width: '100%',
          pos: {
            x: 0,
            y: 0
          }
        })
        .add(this.imgUrl + 'cwp-qr.png', {
          width: '18%',
          pos: {
            x: '41%',
            y: '83%'
          }
        })
        .draw({
          // 导出图片格式： png/jpg/jpeg/webp;
          // default : png;
          type: 'jpg',
          //  图片质量，对 png 格式无效； 0~1；
          // default: .9;
          quality: 1,
          // 成功回调；
          success(b64) {
            console.log(b64)
            that.base64Data = b64
            that.isDrawing = false
            if (localStorage.getItem('cwporder') === null) {
              localStorage.setItem(
                'cwporder',
                JSON.stringify({
                  order: that.picOrder
                })
              )
            }
          },
          // 错误回调；
          error(err) {
            console.log(err)
          }
        })
    },
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_userinfo'
        window.location.href = redirct_url
      } else {
        getWxUserInfo().then(r => {
          this.headImgUrl = r.data.headimgurl
          this.isLoading = false
          this.drawing()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  .card {
    width: 100%;
    .result {
      width: 100%;
    }
  }
}
</style>
