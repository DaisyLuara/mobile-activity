<template>
  <div 
    :style="style.root" 
    class="content"
  >
    <div 
      v-show="pshow" 
      :style="style.root" 
      class="main"
    >
      <!-- <img class="bg" :src="IMGURL + 'page1_bg.jpg'"/> -->
      <div class="forms">
        <!-- <h1>输入您的姓名,参加本次诊疗</h1> -->
        <img 
          :src="IMGURL + 'result_tit.png'" 
          class="title"
        >
        <input 
          ref="input" 
          class="name" 
          type="text" 
          placeholder="输入姓名" 
          maxlength="5" 
          required
        >
        <a 
          class="start" 
          @click="getStart"
        >获得诊断</a>
        <img 
          :src="IMGURL + 'page1_t.png?677677'" 
          class="paget"
        >
      </div>
      <img 
        :src="IMGURL + 'icebg.png?33'" 
        class="ices"
      >
    </div>
    <div 
      v-show="!pshow" 
      class="photo"
    >
      <canvas id="canvas" />
      <img 
        class="result" 
        src=""
      >
      <!-- 显示剪切后的图像 -->
      <canvas 
        id="canvas2" 
        style="display:none"
      />
      <img 
        id="Img" 
        src="base64Data" 
        alt="病假单"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack, setParameter } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      IMGURL: IMAGE_SERVER + '/pages/tmdd/',
      mImg: null,
      name: null,
      pshow: true,
      //微信分享
      wxShareInfo: {
        title: '您有一张新的【病假单】还未领取，请点击查收！',
        desc: '冻住亚健康冻住美，让忙碌的身体“放个假”',
        link: process.env.AD_API+'/api/s/k5' + window.location.search, //window.location.origin + '/marketing/dd_test',
        imgUrl:
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/tmdd/share.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.getInfoById()
    this.wechatShare()
    let ice = document.querySelector('.ices')
    if (this.$innerHeight() > 700) {
      ice.style.bottom = '16.5%'
    }
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
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.mImg = res.image
        })
        .catch(e => {
          console.log(e)
        })
    },
    getStart() {
      let input = this.$refs.input
      let value = input.value
      this.name = value
      if (!value) {
        alert('请输入姓名！')
        return
      }
      this.drawCanvas(this.name)
      this.pshow = !this.pshow
    },
    drawing(image) {
      let canvas = document.getElementById('canvas2')
      let ctx2 = canvas.getContext('2d')
      let mImg = new Image()
      mImg.setAttribute('crossOrigin', 'Anonymous')
      mImg.src = image
      mImg.onload = function() {
        canvas.width = mImg.width
        canvas.height = mImg.height * 0.7
        // img, sx, sy, swidth, sheight, x, y, width, height
        ctx2.drawImage(
          mImg,
          0,
          0,
          mImg.width,
          mImg.height * 0.7,
          0,
          0,
          mImg.width,
          mImg.height * 0.7
        )
        let url = canvas.toDataURL('image/png')
        let img = document.querySelector('#Img')
        img.src = url
      }
    },
    drawCanvas(name) {
      let that = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let result = document.querySelector('.result')
      let bg = new Image()
      let er = new Image()
      let word = new Image()
      bg.setAttribute('crossOrigin', 'Anonymous')
      er.setAttribute('crossOrigin', 'Anonymous')
      word.setAttribute('crossOrigin', 'Anonymous')
      bg.onload = function() {
        canvas.width = bg.width
        canvas.height = bg.height
        ctx.drawImage(bg, 0, 0)
        ctx.font = '600 28px NSimSun '
        ctx.fontStyle = '#000'
        ctx.rotate(0.04 * Math.PI)
        ctx.fillText(name, bg.width * 0.48, bg.height * 0.175)
        er.onload = function() {
          ctx.drawImage(
            er,
            0,
            0,
            er.width,
            er.height,
            bg.width * 0.35,
            bg.height * 0.475,
            bg.width * 0.2,
            bg.width * 0.2
          )
          word.onload = function() {
            ctx.rotate(-Math.PI * 0.035)
            ctx.drawImage(
              word,
              0,
              0,
              word.width,
              word.height,
              bg.width * 0.06,
              bg.height * 0.675,
              word.width * 0.99,
              word.height * 0.99
            )
            let url = canvas.toDataURL('image/png')
            result.src = url
            //合成图片成功之后调用
            that.drawing(result.src)
          }
          word.src = 'http://p22vy0aug.bkt.clouddn.com/image/tmdd/text.png?444'
        }
        er.src = 'http://p22vy0aug.bkt.clouddn.com/image/tmdd/er.png?78999'
      }
      bg.src = this.mImg
      // bg.src = '/static/tmdd/nan01.jpg'
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/tmdd/';
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
a {
  display: inline-block;
}
.content {
  width: 100%;
  overflow: hidden;
  position: relative;

  .main {
    position: relative;
    z-index: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    background: url('@{imgUrl}page1.jpg') center top / 100% auto no-repeat;
    .bg {
      position: relative;
      width: 100%;
      z-index: 0;
    }
    .ices {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 999;
    }
    .forms {
      width: 100%;
      z-index: 99;
      margin-top: 60%;
      font-family: '微软雅黑';
      h1 {
        font-size: 1.7rem;
        color: #0050b3;
        font-weight: 800;
        font-family: '微软雅黑';
        letter-spacing: 3px;
        line-height: 2.2rem;
        width: 60%;
        margin: 0 auto;
      }
      .title {
        width: 50%;
        margin: 0 auto;
      }
      input {
        font-family: '微软雅黑';
        font-size: 1.1rem;
        font-weight: 600;
        color: #1961cd;
        letter-spacing: 2px;
        width: 40%;
        height: 40px;
        line-height: 35px;
        border: solid 2px #0063d3;
        border-radius: 20px;
        box-shadow: 0px 4px 0px 0 rgba(0, 100, 211, 0.9);
        display: block;
        margin: 0 auto;
        margin-top: 6%;
        margin-bottom: 6%;
        background-color: #fff;
        text-align: center;
        color: #1961cd;
        &::-webkit-input-placeholder {
          color: #1961cd;
        }
        &::placeholder {
          color: #1961cd;
        }
      }
      a {
        width: 40%;
        border: solid 2px #9e0000;
        font-family: '微软雅黑';
        font-size: 1.1rem;
        font-weight: 600;
        color: #fff;
        letter-spacing: 2px;
        height: 40px;
        line-height: 35px;
        border-radius: 20px;
        box-shadow: 0px 4px 0px 0 rgba(223, 56, 82, 0.9);
        margin: 0 auto;
        background-color: #df3852;
        text-align: center;
      }
      .paget {
        width: 100%;
        margin-top: 6%;
      }
    }
  }
  .photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    #canvas {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: none;
    }
    .result {
      position: relative;
      width: 100%;
      pointer-events: auto;
      user-select: auto;
    }
    #Img {
      width: 100%;
      // height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9900;
      opacity: 0;
      pointer-events: auto;
      user-select: auto;
    }
  }
}
</style>


