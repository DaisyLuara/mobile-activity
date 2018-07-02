<template>
  <div
    class="root"
    :style="style.root">

    <div
      v-if="isLoading || isDrawing"
      :style="style.root" 
      class="loading">
        loading...
    </div>

    <div
      v-if="!isDrawing"
      :style="style.root" 
      class="card">
      <img
        class="result" 
        :src="base64Data" />
    </div>

  </div>
</template>

<script>
import MC from 'mcanvas'
import { isInWechat, Cookies, getWxUserInfo } from 'services'
const imgUrl = process.env.CDN_URL
// import { }
export default {
  data() {
    return {
      style: {
        root: {
          height: this.innerHeight() + 'px'
        }
      },
      base64Data: null,
      // headImgUrl: null,
      headImgUrl:
        'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJNrlPjqkUjXibZm64k9NRNQGZdtziap3BGyuNKefPfEgWfn5EU4ib3bjHC9icJAwuVa8pOqspoLYWopg/132',
      isLoading: true,
      isDrawing: true,
      imgUrl: imgUrl + '/fe/marketing/img/wc/'
    }
  },
  created() {
    if (isInWechat() === true) {
      this.handleWechatAuth()
      // this.drawing()
    } else {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
      this.drawing()
    }
  },
  methods: {
    drawing() {
      let width = this.innerWidth()
      let height = this.innerHeight()
      let backgroundColor = 'black'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      mc
        .background(this.imgUrl + '/messi.png', {
          left: 0,
          top: 0,
          color: '#000000',
          type: 'origin',
          width: this.innerWidth()
        })
        .add(this.headImgUrl, {
          width: '20%',
          pos: {
            x: '40%',
            y: '23%'
          }
        })
        .add(this.imgUrl + '/messi.png', {
          width: '100%',
          pos: {
            x: 0,
            y: 0
          }
        })
        .draw(b64 => {
          this.base64Data = b64
          this.isDrawing = false
        })
    },
    handleWechatAuth() {
      if (Cookies.get('user_id') === null) {
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
  .loading {
  }
  .card {
    width: 100%;
    .result {
      width: 100%;
    }
  }
}
</style>
