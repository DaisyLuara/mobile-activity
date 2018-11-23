<template>
  <div
    :style="style.root"
    class="root">
  <!-- 遮罩 -->
    <div 
      v-show="showImg"
      @click="go"
      class="shade">
       <img 
        :src="baseUrl + 'hua.png'+ this.$qiniuCompress()"
        class="hua"> 
      <img 
        :src="baseUrl + 'tip.png'+ this.$qiniuCompress()"
        class="tip"> 
    </div>
    <!-- 内容 -->
    <div 
      v-show="contentShow"
      class="content">
      <img 
        :src="baseUrl + 'huaban.png'+ this.$qiniuCompress()"
        class="huaban"> 
      <div id="main"></div>
      <img
      id="test" 
      :src="base64Data"
      :class="{'x-photoImg':iphoneX,'photoImg':!iphoneX}" 
      alt=""
      class="photoImg" >
    <canvas 
      id="canvas" 
      class="photoImg"
      style="display: none" />
    <img  
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save"> 
    </div>
     
  </div>
</template>
<script>
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
import { getInfoById } from 'services'
const cdnUrl = process.env.CDN_URL
import MC from 'mcanvas'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/dreamland/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      showImg: true,
      contentShow: false,
      peopleID: this.$route.query.peopleID,
      iphoneX: false,
      photo: null,
      base64Data: null,
      paths: [
        {
          scope: 6,
          paths: [
            'woman_1.png',
            'woman_2.png',
            'woman_3.png',
            'woman_4.png',
            'woman_5.png'
          ]
        },
        {
          scope: 12,
          paths: [
            'man_1.png',
            'man_2.png',
            'man_3.png',
            'man_4.png',
            'man_5.png'
          ]
        }
      ],
      wxShareInfoValue: {
        title: '幻境奇缘',
        desc: '揭开你的身世之谜！',
        link: 'http://papi.xingstation.com/api/s/PZn' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/dreamland/icon.png'
      }
    }
  },
  created() {},
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    this.getInfoById()
    //this.drawing()
    console.log(this.base64Data)
  },
  methods: {
    go() {
      this.showImg = false
      this.contentShow = true
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          console.log(res)
          this.photo = res.image
          this.drawing()
          console.log(this.photo)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取随机数图片
    randomImg(peopleID) {
      let that = this
      let path = ''
      for (let i = 0; i < that.paths.length; i++) {
        if (peopleID <= that.paths[i].scope) {
          path =
            that.paths[i].paths[
              Math.floor(Math.random() * that.paths[i].paths.length)
            ]
          break
        }
      }
      return path
    },
    //合成图片
    drawing() {
      let width = this.$innerWidth()
      let height = this.$innerHeight()
      let that = this
      let backgroundColor = 'white'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let url = that.photo + that.$qiniuCompress()
      //let url = that.baseUrl + 'pic.jpg'
      let imgUrl = null
      imgUrl = that.baseUrl + that.randomImg(that.peopleID)
      console.log(imgUrl)
      mc.background(that.baseUrl + 'bg.png', {
        left: 0,
        top: 0,
        type: 'crop',
        width: that.$innerWidth() * 0.8,
        pos: {
          x: '0%',
          y: '0%'
        }
      })
        .add(url, {
          width: '70%',
          pos: {
            x: '15%',
            y: '18%'
          }
        })
        .add(imgUrl, {
          width: '100%',
          color: '#000000',
          pos: {
            x: '0%',
            y: '0%'
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
            let url = canvas.toDataURL('image/png')
            let img = document.getElementById('test')
            img.src = url
          },
          // 错误回调；
          error(err) {
            console.log(err)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/dreamland/';
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
  max-width: 100%;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  .shade {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-image: url('@{imageHost}bg2.png');
    background-size: 100% 100%;
    background-position: center top;
    background-repeat: no-repeat;
    .hua {
      width: 100%;
      animation: scale 1.5s linear infinite alternate;
    }
    .tip {
      width: 50%;
      position: absolute;
      left: 20%;
      top: 0%;
      animation: scale 1.5s linear infinite alternate;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .huaban {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0%;
      top: 0;
      z-index: 88;
    }
    .photoImg {
      width: 100%;
      position: absolute;
      left: 0%;
      top: 0%;
      -webkit-user-select: auto;
      pointer-events: auto;
    }
  }
  .save {
    width: 40%;
    position: absolute;
    left: 30%;
    bottom: 0%;
    animation: arrow 0.8s linear infinite alternate;
  }
}
@keyframes scale {
  from {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.05, 1.05);
  }
  to {
    transform: scale(1, 1);
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
