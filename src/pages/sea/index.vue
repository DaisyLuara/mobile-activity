<template>
  <div 
    :style="style.root" 
    class="content">
    <div class="forms">
      <input 
        ref="input" 
        class="tel" 
        type="text" 
        maxlength="11"
        placeholder="请输入手机号">
      <a 
        class="btn" 
        @click="toPhoto"><img :src="baseUrl + 'submit.png'"></a>
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, basicTrack } from 'services'
const IMGURL = process.env.CDN_URL + '/image/'
export default {
  data() {
    return {
      baseUrl: IMGURL + 'sea/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      //微信分享
      wxShareInfo: {
        title: '来自海洋的问候',
        desc: '更多海洋知识小课堂',
        imgUrl: 'http://cdn.exe666.com/image/sea/share.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    let mlocal = window.localStorage.getItem('seaworld')
    if (mlocal) {
      this.linkToResult(mlocal)
    }
    this.wechatShare()
  },
  methods: {
    wechatShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfo)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    linkToResult(mobile) {
      let id = this.$route.query.id
      basicTrack(id, mobile)
      this.$router.push({
        path: 'sea_result' + window.location.search + '&mobile=' + mobile
      })
    },
    toPhoto() {
      let input = this.$refs.input
      let id = this.$route.query.id
      let reg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!id) {
        alert('没有照片信息，请重新扫描二维码！')
        return
      }
      if (!reg.test(input.value)) {
        alert('请输入11位有效的手机号码')
        return
      }
      if (window.localStorage) {
        window.localStorage.setItem('seaworld', input.value)
      }
      this.linkToResult(input.value)
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://cdn.exe666.com/image/sea/';
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
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background-image: url('@{imgUrl}bg.jpg');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  .forms {
    width: 100%;
    margin-top: 56.5%;
    input {
      display: block;
      border: none;
      background-color: transparent;
      &::-webkit-input-placeholder {
        color: #cafafc;
      }
      &::placeholder {
        color: #cafafc;
      }
    }
    .tel {
      width: 70%;
      background-image: url('@{imgUrl}/phone.png');
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% auto;
      font-size: 1.2rem;
      font-weight: 600;
      color: #cafafc;
      height: 100px;
      line-height: 10px;
      margin: 0 auto;
    }
    .btn {
      width: 27%;
      display: block;
      margin: 0 auto;
      img {
        max-width: 100%;
      }
    }
  }
}
</style>


