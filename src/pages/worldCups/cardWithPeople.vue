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
  mounted() {
    if (isInWechat() === true) {
      this.handleWechatAuth()
    } else {
      this.isLoading = false
      this.drawing()
    }
  },
  methods: {
    drawing() {
      console.log('startDrawing')
      let width = this.innerWidth()
      let height = this.innerHeight()
      let backgroundColor = 'black'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let that = this
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
          },
          // 错误回调；
          error(err) {
            console.log(err)
          }
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
          console.dir(r)
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
