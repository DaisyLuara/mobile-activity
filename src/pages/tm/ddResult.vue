<template>
    <div class="content" :style="style.root">
      <div class="main" v-show="pshow">
        <img class="bg" :src="IMGURL + 'page1_bg.jpg'"/>
        <div class="forms">
          <h1>输入您的姓名,参加本次诊疗</h1>
          <input class="name" ref="input" type="text" placeholder="输入姓名" maxlength="5" required/>
          <a class="start" @click="getStart">获得诊断</a>
           <img class="paget" :src="IMGURL + 'page1_t.png'"/>
        </div>
        <img class="ices" :src="IMGURL + 'ices.png'"/>
      </div>
      <div class="photo" v-show="!pshow">
        <canvas id="canvas"></canvas>
        <img class="result" src=""/>
      </div>
    </div>
</template>
<script>
import { $_wechat, getInfoById, wechatShareTrack } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      style: {
        root: {
          'min-height': this.innerHeight() + 'px'
        }
      },
      IMGURL: IMAGE_SERVER + '/pages/tmdd/',
      mImg: null,
      name: null,
      pshow: true,
      //微信分享
      wxShareInfo: {
        title: '',
        desc: '',
        imgUrl:
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/tmdd/share.jpg',
        link: 'http://papi.xingstation.com/api/s/VDyO'
      }
    }
  },
  mounted() {
    this.getInfoById()
    this.wechatShare()
  },
  methods: {
    wechatShare() {
      $_wechat()
        .then(res => {
          res.share({
            title: this.wxShareInfo.title,
            desc: this.wxShareInfo.desc,
            imgUrl: this.wxShareInfo.imgUrl,
            link: this.wxShareInfo.link,
            success: function() {
              weChatShareTrack()
            }
          })
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
          console.log(this.mImg)
        })
        .catch(e => {
          console.log(e)
        })
    },
    getStart() {
      let input = this.$refs.input
      let value = input.value
      this.name = value
      this.drawCanvas(this.name)
      this.pshow = !this.pshow
      console.log('start')
    },
    drawCanvas(name) {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let result = document.querySelector('.result')
      let bg = new Image()
      let er = new Image()
      bg.setAttribute('crossOrigin', 'Anonymous')
      bg.onload = function() {
        canvas.width = bg.width
        canvas.height = bg.height
        ctx.drawImage(bg, 0, 0)
        ctx.font = '600 28px NSimSun '
        ctx.fontStyle = '#000'
        ctx.rotate(0.04 * Math.PI)
        ctx.fillText(name, bg.width * 0.5, bg.height * 0.255)
        er.onload = function() {
          console.log(er.width)
          console.log(er.height)
          ctx.drawImage(
            er,
            0,
            0,
            er.width,
            er.height,
            bg.width * 0.35,
            bg.height * 0.55,
            bg.width * 0.2,
            bg.width * 0.2
          )
          let url = canvas.toDataURL('image/png')
          result.src = url
        }
        er.src = '/static/tmdd/er.png'
      }
      bg.src = this.mImg
      // bg.src = '/static/tmdd/nan01.jpg'
    }
  }
}
</script>
<style lang="less" scoped>
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
  overflow-x: hidden;
  position: relative;
  .main {
    position: relative;
    z-index: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    .bg {
      position: relative;
      width: 100%;
      z-index: 0;
    }

    .ices {
      position: relative;
      margin-top: -30%;
      width: 100%;
      z-index: 999;
    }
    .forms {
      width: 100%;
      position: absolute;
      z-index: 99;
      top: 28%;
      left: 0;
      font-family: '微软雅黑';
      h1 {
        font-size: 1.5rem;
        color: #0050b3;
        font-weight: 800;
        font-family: '微软雅黑';
        letter-spacing: 3px;
        line-height: 2rem;
        width: 56%;
        margin: 0 auto;
      }
      input {
        font-family: '微软雅黑';
        font-size: 1.1rem;
        font-weight: 600;
        color: #1961cd;
        letter-spacing: 2px;
        width: 52%;
        height: 50px;
        line-height: 45px;
        border: solid 3px #0063d3;
        border-radius: 25px;
        box-shadow: 0px 6px 0px 0 rgba(0, 100, 211, 0.9);
        display: block;
        margin: 0 auto;
        margin-top: 10%;
        margin-bottom: 10%;
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
        width: 52%;
        border: solid 3px #9e0000;
        font-family: '微软雅黑';
        font-size: 1.1rem;
        font-weight: 600;
        color: #fff;
        letter-spacing: 2px;
        height: 50px;
        line-height: 45px;
        border-radius: 25px;
        box-shadow: 0px 6px 0px 0 rgba(223, 56, 82, 0.9);
        margin: 0 auto;
        background-color: #df3852;
        text-align: center;
      }
      .paget {
        width: 100%;
        margin-top: 34%;
      }
    }
  }
  .photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
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
    }
  }
}
</style>


