<template>
  <div
    :style="style.root"
    class="root">
    <img 
      :src="imgUrl+'bg_1.png'+ this.$qiniuCompress()" 
      :style="style.root"
      class="bg"
    >
    <img 
      :src="imgUrl+'frame.png'+ this.$qiniuCompress()"
      class="frame"
    >
    <img 
      v-if="!compound"
      :style="style.compound"
      :src="resultImgUrl + this.$qiniuCompress()" 
      alt=""
      class="photo">
    <img 
      v-if="!compound"
      :style="style.compound"
      :src="imgUrl+'photo_frame.png' + this.$qiniuCompress()"
      alt=""
      class="photo-frame">
    <div
      v-if="!compound"
      :style="style.btn2"
      class="btn1"
      @click="showDialog = true"/>
    <a 
      v-if="compound" 
      :style="style.btn2" 
      href="http://papi.xingstation.com/api/s/jR" 
      class="btn3" />
    <img 
      :src="imgUrl+'img1.png'+ this.$qiniuCompress()"
      class="img1"
    >
    <img 
      :src="imgUrl+'img2.png'+ this.$qiniuCompress()"
      class="img2"
    >
    <img 
      :src="imgUrl+'img3.png'+ this.$qiniuCompress()"
      class="img3"
    >
    <img 
      :src="imgUrl+'img4.png'+ this.$qiniuCompress()"
      class="img4"
    >
    <div 
      v-if="!compound"
      :class="{'name': !iphoneX, 'x-name': iphoneX}" >{{ nickname }}</div>
    <!-- 合成照片 -->
    <img
      v-if="compound" 
      id="test" 
      :src="compoundUrl"
      alt="" 
      class="photo" >
    <canvas 
      id="canvas" 
      class="photo"
      style="display: none" />
    <!-- 弹出层 -->
    <div 
      v-if="showDialog"
      class="popups-wrapper" >
      <div 
        class="popups-content">
        <div 
          class="popups-close"
          @click="closeDialog">
          <img 
            :src="imgUrl+'close.png'+ this.$qiniuCompress()"
            alt="" >
        </div>
        <div 
          :style="style.popups"
          class="main-content" >
          <img 
            :src="imgUrl+'img5.png'+ this.$qiniuCompress()"
            class="popus-img5"
          >
          <div
            v-if="errorText" 
            :class="{'error': !iphoneX, 'x-error': iphoneX}">请输入姓名</div>
          <img 
            :src="imgUrl + 'input.png'+ this.$qiniuCompress()" 
            :class="{'input-bg': !iphoneX, 'x-input-bg': iphoneX}" >
          <input 
            v-model="text" 
            :style="style.input"
            :class="{'input-value': !iphoneX, 'x-input-value': iphoneX}" 
            maxlength="5" 
            placeholder="在此输入姓名"
            @click="errorText=false">
          <div 
            :style="style.btn2" 
            :class="{'btn2': !iphoneX, 'x-btn2': iphoneX}"
            @click="compoundHandle" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MC from 'mcanvas'
import {
  $wechat,
  isInWechat,
  Cookies,
  getInfoById,
  wechatShareTrack,
  setParameter,
  getWxUserInfo
} from 'services'
const imgUrl = process.env.CDN_URL
export default {
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        input: {
          height: Math.floor(this.$innerWidth() * 0.6 / 447 * 109) + 'px'
        },
        btn2: {
          height: Math.floor(this.$innerWidth() * 0.6 / 447 * 109) + 'px'
        },
        compound: {
          'user-select': 'none',
          'pointer-events': 'none'
        },
        popups: {
          height: this.$innerHeight() + 'px'
        }
      },
      errorText: false,
      compound: false,
      text: '',
      base64Data: null,
      compoundUrl: null,
      showDialog: false,
      iphoneX: false,
      inputHeight: 0,
      nickname: '杨洋',
      // resultImgUrl:
      //   'http://o9xrbl1oc.bkt.clouddn.com/1007/image/1492786765568.jpg',
      resultImgUrl: '',
      imgUrl: imgUrl + '/fe/marketing/img/sndy/',
      wxShareInfo: {
        title: '全村希望C位出道为苏宁代言！',
        desc: '一起来围观苏宁最新神秘代言人吧～',
        imgUrl: imgUrl + '/fe/marketing/img/sndy/share_icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    document.body.addEventListener('touchstart', function() {})
    this.iphoneX = this.$innerHeight() > 672 ? true : false
    this.inputHeight = Math.floor(this.$innerWidth() * 0.6 / 447 * 109)
    this.getInfoById()
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'test'
      ) {
        if (!this.$route.query.hasOwnProperty('nickname')) {
          this.handleWechatAuth()
        }
      }
      $wechat()
        .then(res => {
          res.share(this.wxShareInfo)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    }
  },
  methods: {
    compoundHandle() {
      let link = ''
      if (this.text) {
        this.showDialog = false
        this.compound = true
        link = setParameter('nickname', encodeURIComponent(this.text))
        this.drawing()
      } else {
        this.errorText = true
      }
      this.wxShareInfo.link = link
    },
    closeDialog() {
      this.showDialog = false
      this.errorText = false
      this.text = ''
    },
    drawing() {
      let width = this.$innerWidth()
      let height = this.$innerHeight()
      let mc = new MC({
        width,
        height
      })
      let url = this.resultImgUrl + this.$qiniuCompress()
      let that = this
      mc
        .background(url, {
          left: 0,
          top: 0,
          type: 'origin',
          width: this.$innerWidth()
        })
        .add(this.imgUrl + 'photo_frame.png', {
          width: '100%',
          pos: {
            x: '0',
            y: '0'
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
            that.base64Data = b64
            that.drawingText()
          },
          // 错误回调；
          error(err) {
            console.log(err)
          }
        })
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.resultImgUrl = res.image
          if (this.$route.query.hasOwnProperty('nickname')) {
            this.compound = true
            this.text = this.$route.query.nickname
            this.drawing()
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    drawingText() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let image = new Image()
      let height = this.$innerHeight()
      let width = this.$innerWidth()
      let text = this.text
      image.src = this.base64Data
      image.onload = function() {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let x = image.width * 0.688 * 0.81
        let y = image.height * 0.84
        ctx.font = '400 96px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#fff'
        ctx.fillText('', x, y)
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(345 * Math.PI / 180)
        ctx.fillText(text, 0, 0)
        ctx.restore()
        let url = canvas.toDataURL('image/png')
        let img = document.getElementById('test')
        img.src = url
      }
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
          this.nickname = r.data.nickname
          let link = setParameter('nickname', encodeURIComponent(this.nickname))
          this.wxShareInfo.link = link
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: 'http://cdn.exe666.com//fe/marketing/img/sndy';
.root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;

  .bg {
    width: 100%;
    height: 100%;
    z-index: -10;
    user-select: none;
    pointer-events: none;
  }
  canvas {
    letter-spacing: 5px;
  }
  .frame {
    position: absolute;
    top: 3%;
    width: 81%;
    z-index: 5;
    left: 9.5%;
    user-select: none;
    pointer-events: none;
    height: 83%;
  }
  .photo-frame {
    width: 68.8%;
    position: absolute;
    left: 16.2%;
    top: 5%;
    height: 78%;
    z-index: 15;
  }
  .photo {
    width: 68.8%;
    position: absolute;
    left: 16.2%;
    top: 5%;
    height: 78%;
    z-index: 10;
  }
  .img1 {
    position: absolute;
    top: 15%;
    width: 18%;
    z-index: 15;
    left: 1%;
    user-select: none;
    pointer-events: none;
    animation: upDown 1.2s linear infinite alternate;
  }
  .img2 {
    position: absolute;
    top: 2%;
    width: 13%;
    z-index: 15;
    right: 3%;
    user-select: none;
    pointer-events: none;
    animation: upDown 1.2s linear infinite alternate;
  }
  .img3 {
    position: absolute;
    top: 50%;
    width: 10%;
    z-index: 15;
    right: 5%;
    user-select: none;
    pointer-events: none;
    animation: upDown 1.2s linear infinite alternate;
  }
  .img4 {
    position: absolute;
    bottom: 11%;
    width: 20%;
    z-index: 15;
    right: 0;
    user-select: none;
    pointer-events: none;
    animation: upDown 1.2s linear infinite alternate;
  }
  .text {
    position: absolute;
    bottom: 18%;
    width: 66%;
    z-index: 15;
    left: 19%;
  }
  .name {
    position: absolute;
    bottom: 28.9%;
    z-index: 300;
    color: #fff;
    font-size: 18px;
    letter-spacing: 3px;
    font-weight: 400;
    left: 38%;
    width: 33.43%;
    text-align: center;
    transform: rotateZ(-16deg);
  }
  .x-name {
    position: absolute;
    bottom: 28.9%;
    z-index: 300;
    color: #fff;
    font-size: 18px;
    letter-spacing: 3px;
    font-weight: 400;
    left: 38%;
    width: 33.43%;
    text-align: center;
    transform: rotateZ(-16deg);
  }
  .btn1 {
    position: absolute;
    bottom: 3%;
    width: 72%;
    left: 14%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('@{imgServerUrl}/buttom1_1.png?v=1?imageView2/0/q/30');
    &:active {
      height: 50px;
      background-image: url('@{imgServerUrl}/buttom1_2.png?v=1?imageView2/0/q/30');
    }
  }
  .btn3 {
    position: absolute;
    bottom: 3%;
    width: 50%;
    left: 25%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('@{imgServerUrl}/buttom3_1.png?imageView2/0/q/30');
    &:active {
      height: 50px;
      background-image: url('@{imgServerUrl}/buttom3_2.png?imageView2/0/q/30');
    }
  }
  .popups-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 400;
    opacity: 0.94;
    .popups-content {
      width: 100%;
      height: 100%;
    }
    .main-content {
      position: relative;
      .popus-img5 {
        width: 95%;
        top: 20%;
        left: 2.5%;
        position: absolute;
        user-select: none;
        pointer-events: none;
      }
      .input-bg {
        position: absolute;
        top: 40%;
        width: 60%;
        left: 20%;
        user-select: none;
        pointer-events: none;
      }
      .x-input-bg {
        position: absolute;
        top: 36%;
        width: 60%;
        left: 20%;
        user-select: none;
        pointer-events: none;
      }
      .error {
        position: absolute;
        top: 51%;
        width: 60%;
        left: 20%;
        user-select: none;
        pointer-events: none;
        color: #e60909;
        font-size: 14px;
        text-align: center;
      }
      .x-error {
        position: absolute;
        top: 46%;
        width: 60%;
        left: 20%;
        user-select: none;
        pointer-events: none;
        color: #e60909;
        font-size: 14px;
        text-align: center;
      }
      .x-input-value {
        background-color: transparent;
        z-index: 14;
        width: 60%;
        font-size: 14px;
        position: absolute;
        top: 36%;
        left: 20%;
        padding: 0 14%;
        letter-spacing: 4px;
        color: #000;
        text-align: center;
      }
      .input-value {
        background-color: transparent;
        z-index: 14;
        width: 60%;
        font-size: 14px;
        position: absolute;
        top: 40%;
        left: 20%;
        padding: 0 14%;
        letter-spacing: 4px;
        text-align: center;
        color: #000;
      }
      .btn2 {
        position: absolute;
        top: 57%;
        width: 60%;
        left: 20%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('@{imgServerUrl}//buttom2_1.png?imageView2/0/q/30');
        &:active {
          background-image: url('@{imgServerUrl}/buttom2_2.png?imageView2/0/q/30');
        }
      }
      .x-btn2 {
        position: absolute;
        top: 50%;
        width: 60%;
        left: 20%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('@{imgServerUrl}//buttom2_1.png?imageView2/0/q/30');
        &:active {
          background-image: url('@{imgServerUrl}/buttom2_2.png?imageView2/0/q/30');
        }
      }
    }
    .popups-close {
      position: absolute;
      right: 0;
      top: 3%;
      z-index: 40;
      img {
        width: 60%;
      }
    }
  }
}
@keyframes upDown {
  0% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}
</style>
