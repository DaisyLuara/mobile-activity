<template>
  <div 
    :style="style.root"
    class="content"
    @click="toClick">
    <img 
      v-show = "wShow"
      :src="base_url+'/word.png'"
      class="word">
    <div 
      class="main">
      <img 
        :src="base_url+'/light.png'"
        class="light">
      <img 
        :src="base_url+'/circle.png'"
        class="circle">
      <img 
        :src="photo"
        :class="{photo:true,selected:selected}">
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const IMG_SERVER = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      base_url: IMG_SERVER + 'image/loveqixi',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      wShow: true,
      selected: false,
      photo: null,
      toshow: false,
      hasloaded: false,
      main: document.querySelector('.main'),
      img_list: [
        'http://p22vy0aug.bkt.clouddn.com/image/loveqixi/bg.png',
        'http://p22vy0aug.bkt.clouddn.com/image/loveqixi/word.png',
        'http://p22vy0aug.bkt.clouddn.com/image/loveqixi/light.png',
        'http://p22vy0aug.bkt.clouddn.com/image/loveqixi/circle.png',
        'http://p22vy0aug.bkt.clouddn.com/image/loveqixi/save.png'
      ],
      //分享
      wxShareInfoValue: {
        title: '才子佳人 爱在七夕',
        desc: '牛郎织女测出你的CP属性',
        link: 'http://papi.xingstation.com/api/s/yP7' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/loveqixi/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          this.loadImage(this.img_list)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadImage(arr) {
      let that = this,
        count = 0
      arr.push(that.photo)
      for (let i = 0; i < arr.length; i++) {
        let img = new Image()
        img.src = arr[i]
        img.onload = function() {
          count++
          if (count == arr.length) {
            that.hasloaded = true
          }
        }
      }
    },
    toClick() {
      let main = document.querySelector('.main')
      let top = main.offsetTop
      let that = this
      if (!that.hasloaded) {
        return
      }
      that.wShow = false

      let toTop = function() {
        if (top < -280) {
          window.cancelAnimationFrame(raf)
          let content = document.querySelector('.content')
          content.style.overflow = 'auto'
          content.style.overflowX = 'hidden'
          that.style.root.height = that.$innerHeight() + 30 + 'px'
          that.selected = true
          return
        }
        top -= 1.5
        main.style.top = top + 'px'
        console.log(top)
        let raf = window.requestAnimationFrame(toTop)
      }
      toTop()
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/loveqixi';
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
  font-size: 0;
  text-align: center;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
}
.content {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-image: url('@{imgUrl}/bg.png');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 100% auto;
  .word {
    width: 63%;
    margin-top: 21%;
  }
  .main {
    width: 100%;
    position: absolute;
    top: 41.6%;
    left: 0;

    .light {
      position: relative;
      width: 88%;
      z-index: 0;
    }
    .circle {
      width: 40%;
      position: absolute;
      top: 2%;
      left: 50%;
      //transform: translate(-50%, 0);
      z-index: 99;
      animation: tocircle 1s ease-in-out infinite alternate;
    }
    .photo {
      position: relative;

      width: 88.5%;
      margin-top: -7%;
      z-index: 999;
    }
    .selected {
      pointer-events: auto;
      user-select: auto;
    }
  }
}
@keyframes tocircle {
  0% {
    transform: translate(-50%, 0) scale(1);
  }
  50% {
    transform: translate(-50%, 0) scale(0.3);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
  }
}
</style>


