<template>
  <div
    :style="style.root"
    class="root"
  >
    <div
      v-show="shade"
      class="shade"
      @click="cancle"
    />
    <div
      v-show="shade"
      class="ct"
      @click="cancle"
    >
      <img
        :src="baseUrl + 'shade.png'+ this.$qiniuCompress()"
        class="shade-bg"
      >
      <p
        v-show="font1"
        class="font"
      >发送成功</p>
    </div>
    <!-- 合成图片 -->
    <img
      id="test"
      :src="compoundUrl"
      alt=""
      class="photo photo-real"
    >
    <canvas
      id="canvas"
      class="photo"
      style="display: none"
    />

    <div class="bottom">
      <img
        :src="baseUrl + '1.png'+ this.$qiniuCompress()"
        class="bt"
      >
      <img
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
        class="letter"
      >
      <!-- 输入框 -->
      <input
        v-if="wechat"
        v-model="text2"
        maxlength="10"
        placeholder="写下你的心愿(请在10分钟内发送祝福)"
        class="text"
        style="font-size:12px;"
      >
      <!-- 保存 -->
      <img
        v-if="wechat"
        :src="baseUrl + 'button.png'+ this.$qiniuCompress()"
        class="save"
        @click="send()"
      >
    </div>
  </div>
</template>

<script>
import {
  isInWechat,
  Cookies,
  userGame,
  $wechat,
  getInfoById,
  getWxUserInfo,
  wechatShareTrack
} from 'services'
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

      wechat: true,
      photo: null,
      oid: this.$route.query.utm_source,
      belong: this.$route.query.utm_campaign,
      text: '祝家人健健康康',
      text2: '',
      base64Data: null,
      compoundUrl: null,
      shade: false,
      font1: true,
      filter_url: process.env.AD_API + '/api/word_filter',
      wxShareInfoValue: {
        title: '月满中秋 心愿祈福',
        desc: '家人有爱口难开？让星视度帮你把祝福送给你爱的人吧',
        link:
          'http://papi.xingstation.com/api/s/J62' +
          window.location.search +
          '&type=WeChat&name=' +
          '祝家人健健康康',
        imgUrl: cdnUrl + '/fe/marketing/img/midAutumn/icon.png',
        success: () => {
          wechatShareTrack()
        }
      },
      imgList: ['1.png', '2.png', 'bg.png', 'button.png', 'white.png']
    }
  },
  created() { },
  mounted() {
    if (this.$route.query.type != null && this.$route.query.type != undefined) {
      this.wechat = false
      this.text = this.$route.query.name
    }
    this.entry(this.imgList, r => {
      console.dir(r)
      this.getInfoById()
      // do next
    })
    this.drawing()
  },
  methods: {
    loadImgs(imgList) {
      let preList = []
      let thisRef = this
      for (let i = 0; i < this.imgList.length; i++) {
        let pre = new Promise((resolve, reject) => {
          let img = new Image()
          img.onload = function () {
            resolve(img)
          }
          img.src = thisRef.baseUrl + this.imgList[i]
        })
        preList.push(pre)
      }
      return Promise.all(preList).then(r => {
        return Promise.resolve(r)
      })
    },
    async entry(imgList, cb) {
      try {
        let rs = await this.loadImgs(imgList)
        cb(rs)
      } catch (err) {
        console.log(err)
        cb([])
      }
    },
    cancle() {
      this.shade = false
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          this.drawing()
        })
        .catch(err => {
          console.log(err)
        })
    },
    send() {
      this.text2 = this.text2 === '' ? '祝家人健健康康' : this.text2
      this.filterVocabulary()
    },
    //过滤词汇
    filterVocabulary() {
      let query = '?str=' + this.text2
      this.$http
        .get(this.filter_url + query)
        .then(res => {
          console.log(res.data)
          if (!res.data.sensitive_word) {
            this.handle()
          } else {
            alert('该词不符合规范')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //处理接口问题
    handle() {
      const baseUrl = process.env.EXE_API;
      let url = 'oid=' + this.oid + '&belong=' + this.belong + '&url=&img=' + this.text2 + '&image=&api=json'
      handleDataPost(url).then(res => {
        this.shade = true
        console.log(res)
        let link = this.wxShareInfoValue.link
        this.wxShareInfoValue.link = link.replace(
          link.substring(link.indexOf('name='), link.length),
          'name=' + this.text2
        )
        console.log(this.wxShareInfoValue)
        //重新加载微信分享
        this.handleWechatShare()
        this.text = this.text2
        this.drawing()
        this.text2 = ''
      }).catch(err => {
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
      let url = this.photo + this.$qiniuCompress()
      let that = this
      mc
        .background(this.baseUrl + 'white.png', {
          left: 0,
          top: 0,
          type: 'origin',
          width: this.$innerWidth(),
          pos: {
            x: '10%',
            y: '15%'
          }
        })
        //this.baseUrl + '666.png'
        .add(url, {
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
      image.onload = function () {
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
@imageHost: "http://cdn.exe666.com/fe/marketing/img/midAutumn/";
.root {
  width: 100%;
  position: relative;
  text-align: center;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: hidden;
  .shade {
    background: #000;
    opacity: 0.8;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .ct {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    .font {
      position: absolute;
      color: #f00;
      left: 50%;
      font-size: 8vw;
      top: 20%;
      transform: translate(-50%);
      z-index: 1001;
    }
  }
  .photo {
    width: 85%;
    position: absolute;
    left: 50%;
    top: 96%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 9;
    animation: upAppear 2s ease-in-out alternate;
    animation-fill-mode: forwards;
    .photo-real {
      width: 100%;
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
    height: 42%;
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
@keyframes upAppear {
  0% {
    top: 96%;
  }
  100% {
    top: 50%;
  }
}
</style>
