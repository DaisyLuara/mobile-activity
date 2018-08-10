<template>
  <div
    :style="style.root" 
    class="root">
    <!-- 合成图片 -->
     <img
      id="test" 
      :src="compoundUrl"
      alt="" 
      class="photo" >
    <canvas 
      id="canvas" 
      class="photo"
      style="display: none" />

    <div class="bottom">
      <img 
        :src="baseUrl + '1.png'+ this.$qiniuCompress()"
        class="bt" >
       <img 
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
        class="letter" >
        <!-- 输入框 -->
         <input 
            v-model="text2" 
            maxlength="10" 
            placeholder="写下你的心愿"
            class="text">
           <!-- 保存 -->
        <img 
        :src="baseUrl + 'button.png'+ this.$qiniuCompress()"
        class="save" 
        @click="send()">   
    </div>
  </div>
</template>

<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
import MC from 'mcanvas'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/midAutumn/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: '',
      text: '祝家人健健康康',
      text2: '',
      resultImgUrl:
        'http://cdn.exe666.com/fe/marketing/img/midAutumn/white.png',
      touchNumber: 0,
      iphoneX: false,
      base64Data: null,
      compoundUrl: null,
      wxShareInfoValue: {
        title: '冰力十足 酷爽一夏',
        desc: '看！卖萌的企鹅',
        link: 'http://papi.xingstation.com/api/s/o2j' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/midAutumn/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {
    this.getInfoById()
    this.drawing()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          //this.drawing()
        })
        .catch(err => {
          console.log(err)
        })
    },

    send() {
      //发送给大屏
      this.handle()
    },
    //处理接口问题
    handle() {
      let URL = 'http://exelook.com/client/pushdiv/'
      let args = {
        oid: 476,
        belong: 'kiki',
        url: '',
        name: this.text2,
        image: '',
        api: 'json'
      }
      this.$http
        .post(URL, args)
        .then(res => {
          console.log(res)
          this.text = this.text2
          this.drawing()
          this.text2 = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    drawing() {
      let width = this.$innerWidth()
      let height = this.$innerHeight()
      let backgroundColor = 'white'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let url = this.resultImgUrl + this.$qiniuCompress()
      let that = this
      mc
        .background(url, {
          left: 0,
          top: 0,
          type: 'origin',
          width: this.$innerWidth(),
          pos: {
            x: '10%',
            y: '15%'
          }
        })
        .add(this.baseUrl + '666.png', {
          width: '96%',
          color: '#000000',
          pos: {
            x: '2%',
            y: '1.5%'
          }
        })
        .add(this.baseUrl + 'text.png', {
          width: '80%',
          color: '#000000',
          pos: {
            x: '10%',
            y: '65%'
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
    //文字的合成
    drawingText() {
      var thisRef = this
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
        let x = image.width * 1.2 * 0.4
        let y = image.height * 0.69
        ctx.font = '400 30px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#fff'
        ctx.fillText('', x, y)
        ctx.save()
        ctx.translate(x, y)
        ctx.fillText(text, 0, 0)
        ctx.restore()
        let url = canvas.toDataURL('image/png')
        let img = document.getElementById('test')
        img.src = url
        thisRef.compoundUrl = url
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/midAutumn/';
.root {
  width: 100%;
  position: relative;
  text-align: center;
  background-image: url('@{imageHost}bg.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: hidden;
  .photo {
    width: 85%;
    height: 85%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 9;
    .photo-real {
      width: 96%;
      height: 100%;
      margin-top: 2%;
    }
    .greeting {
      width: 72%;
      position: absolute;
      left: 50%;
      top: 65%;
      transform: translate(-50%, 0);
    }
  }
  .bottom {
    width: 100%;
    height: 48%;
    position: absolute;
    bottom: 0;
    .bt {
      width: 90%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 8;
    }
    .letter {
      width: 90%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -40%);
      z-index: 99;
    }
    .text {
      background: #fff;
      width: 65%;
      height: 14%;
      border-radius: 32px;
      position: absolute;
      left: 18%;
      top: 58%;
      padding: 0 5%;
      z-index: 100;
    }
    .save {
      width: 65%;
      height: 14%;
      position: absolute;
      left: 18%;
      top: 78%;
      z-index: 100;
    }
  }
}
@keyframes fingerScale {
  from {
    transform: scale(1.05, 1.05);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  to {
    transform: scale(1.05, 1.05);
  }
}
</style>
