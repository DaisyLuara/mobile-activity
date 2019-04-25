<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'p2/text.png'"
      class="title"
    >
    <img
      :src="base + 'p2/arrow.png'"
      class="arrow"
    >
    <div class="main">
      <div class="list-item">
        <img
          :src="base + 'p2/photo.png'"
          class="bg"
        >
        <img
          :src="photo"
          class="photo"
          @click="getHeart"
        >
      </div>
      <div
        v-for="(item ,index) in list"
        :key="index"
        class="list-item"
      >
        <img
          :src="base + 'p2/photo.png'"
          class="bg"
        >
        <!-- :src="item.link" -->
        <img
          :src="item.link"
          class="photo"
          @click="getHeart"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, getGameList, Cookies } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/beauty/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      cookies_z: null,
      list: [],
      auid: null,
      //微信分享
      wxShareInfoValue: {
        title: '最美瞬间',
        desc: '最美凯德，醉美上海',
        imgUrl: CDN_URL + '/fe/image/beauty/icon.png'
      }
    }
  },
  watch: {
    actinfo() {
      this.cookies_z = Cookies.get('z')
      let z = this.cookies_z || this.userinfo.z
      this.getList(this.actinfo.awardkey, z)
    }
  },
  mounted() {
    this.cookies_z = Cookies.get('z')
  },
  methods: {
    getList(awardkey, z) {
      getGameList(awardkey, z).then(res => {
        console.log(res)
        this.list = res.results.data
      }).catch(err => {
        console.log(err)
      })
    },
    getHeart(e) {
      let [target, x, y] = [e.target, e.offsetX, e.offsetY]
      let heart = document.createElement("img")
      heart.src = this.base + 'p2/heart.png'
      heart.style.width = '18.5vw'
      heart.style.position = 'absolute'
      heart.style.left = '50%'
      heart.style.top = '50%'
      // heart.style.left = x + 'px'
      // heart.style.top = y + 'px'
      heart.style.zIndex = '9999'
      heart.style.transform = 'translate(-50%,-50%)'
      // heart.style.transform = 'translate(-30%,-30%)'
      target.parentNode.appendChild(heart)
      let timer = setTimeout(function () {
        clearTimeout(timer)
        target.parentNode.removeChild(heart)
      }, 500)
    }

  }
}
</script>
<style lang="less" scoped>
@url: "https://cdn.xingstation.cn/fe/image/beauty/";
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
  margin: 0 auto;
  font-size: 0;
  text-align: center;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.warp {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-image: url("@{url}p2/back2.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  .title {
    width: 35%;
    position: relative;
    z-index: 0;
    margin-top: 5%;
  }
  .arrow {
    width: 7.5%;
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    animation: myarrow linear 0.8s infinite alternate;
  }
  .main {
    position: relative;
    width: 83%;
    z-index: 0;
    display: flex;
    margin-top: 3%;
    margin-bottom: 5%;
    flex-flow: row wrap;
    justify-content: space-between;
    overflow-x: hidden;
    .list-item {
      position: relative;
      margin: 0;
      width: 48%;
      margin-top: 5%;
      .bg {
        position: relative;
        z-index: 0;
      }
      .photo {
        width: 94%;
        position: absolute;
        top: 0.2%;
        left: 3.2%;
        z-index: 99;
        pointer-events: auto;
        user-select: auto;
      }
    }
  }
}
@keyframes myarrow {
  0% {
    bottom: 5%;
  }
  100% {
    bottom: 2%;
  }
}
</style>

