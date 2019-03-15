<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div
      v-show="loading"
      :style="style.root"
      class="page1"
    >
      <img
        :src="base + 'loading.png'"
        class="loading"
        @click="closeLoading"
      >
    </div>
    <div
      id="anim1"
      class="anim1"
    />
    <div
      id="anim2"
      class="anim2"
    />
    <img
      src=""
      class="animate1"
    />
    <img
      src=""
      class="animate2"
    />
    <div
      v-show="!loading"
      :style="style.root"
      class="page2"
    >
      <div
        v-show="!haslocked"
        class="photos"
      >
        <img
          :src="base + 'border.png'"
          class="border"
        >
        <img
          :src="photo"
          class="photo"
        >
        <img
          v-show="Boolean(photo)"
          :src="base + 'tip.png'"
          class="save"
        >
      </div>
      <img
        v-show="haslocked"
        :src="base + 'unlock.png'"
        class="lockp"
      >

      <div class="group">
        <div
          v-for="item in 3"
          :key="item"
        >
          <img
            v-show="all[item-1]"
            :src="base + 'b' + item + '.png'"
            class="unlock"
            @click="getNowPhoto(item)"
          >
          <img
            :src="base + 'b' + item + '_lock.png'"
            class="bg"
            @click="getLockedPicture"
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies, userGame, getSceneData } from 'services'
import { normalPages } from '@/mixins/normalPages'
import lottie from "lottie-web";
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/gaobai/',
      style: {
        root: {
          'width': this.$innerWidth() + 'px',
          'height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      loading: true,
      haslocked: false,
      userId: null,
      scene: null,
      pimg: null,
      all: [false, false, false],
      imgs: [null, null, null],
      unlocks: [],
      //微信分享
      wxShareInfoValue: {
        title: "爱的表白@——相册集",
        desc: "@生活中美好的小场景，记录下美好瞬间",
        link: 'http://papi.xingstation.com/api/s/rmw' + window.location.search,
        imgUrl: "https://cdn.exe666.com/fe/image/gaobai/icon.jpg"
      }
    }
  },
  watch: {
    parms() {
      this.scene = this.parms.scene
      this.pimg = this.photo
      this.save = true
      this.userId ? this.userGame() : null
    }
  },
  created() {
    let url1 = this.base + '1/butterfly1_000'
    let url2 = this.base + '2/butterfly2_000'
    this.getLoadAnim(url1, 0, 24, '.png', '.animate1')
    this.getLoadAnim(url2, 0, 24, '.png', '.animate2')
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
    let anim1 = this.doAnim('anim1', this.base + 'up/images/', this.base + 'up/data1.json', true, true)
    let anim2 = this.doAnim('anim2', this.base + 'down/images/', this.base + 'down/data.json', true, true)
    let once = setTimeout(() => {
      this.loading = false
      clearTimeout(once)
    }, 3000)
  },
  methods: {
    closeLoading() {
      this.loading = false
    },
    doAnim(id, imageUrl, jsonUrl, autoplay, loop) {
      let el = document.getElementById(id)
      let that = this
      let anim = lottie.loadAnimation({
        name: 'anim',
        container: el,
        renderer: 'svg',
        loop: loop,
        autoplay: autoplay,
        assetsPath: imageUrl,
        path: jsonUrl
      })
      return anim
    },
    getNowPhoto(item) {
      this.photo = this.imgs[item - 1]; this.haslocked = false;
    },
    getLockedPicture() {
      this.haslocked = true;
    },
    getLoadAnim(prename, start, length, type, name) {
      let count = 0
      let arr = []
      for (let i = start; i < start + length; i++) {
        let img = new Image()
        i = i < 10 ? '0' + i : i
        arr.push(prename + i + type)
        img.src = prename + i + type
        img.onload = () => {
          count++
          if (count >= length) {
            this.playAnimate(arr, name)
          }
        }
      }
    },
    playAnimate(arr, name) {
      let count = 0
      let el = document.querySelector(name)
      setInterval(() => {
        if (count >= arr.length) {
          count = 0
        }
        el.src = arr[count]
        count++
      }, 100)
    },
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
        this.scene ? this.userGame() : null
      }
    },
    noFind(obj) {
      obj.target.style.display = 'none'
      obj.target.style.border = 'none'
    },
    userGame() {
      let args = {
        belong: this.belong,
        image_url: this.photo,
        qiniu_id: this.id,
        scene: this.scene,
        score: 100
      }
      userGame(args, this.userId)
        .then(res => {
          console.log(res)
          this.getSceneData()
        })
        .catch(e => {
          console.log(e)
        })
    },
    getSceneData() {
      let url = '?belong=' + this.belong + '&group_by=scene'
      let args = {
        withCredentials: true
      }
      getSceneData(this.userId, url, args)
        .then(res => {
          console.log(res)
          this.projectStatus(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    projectStatus(list) {
      let data = list
      let that = this
      data.map(r => {
        if (r.scene != null && r.scene != undefined) {
          if (r.scene == 'blue') {
            that.all[0] = true
            that.imgs[0] = r.image_url
          }
          if (r.scene == 'red') {
            that.all[1] = true
            that.imgs[1] = r.image_url
          }
          if (r.scene == 'yellow') {
            that.all[2] = true
            that.imgs[2] = r.image_url
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/gaobai/";
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.warp {
  width: 100%;
  overflow: hidden;
  position: relative;
  background-image: url("@{img}bg.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .animate1 {
    width: 32%;
    position: absolute;
    top: 38%;
    left: 0%;
    z-index: 0;
  }
  .animate2 {
    width: 14%;
    position: absolute;
    top: 52%;
    right: 7%;
    z-index: 0;
  }
  .page1 {
    width: 100%;
    overflow: hidden;
    position: relative;
    z-index: 999;
    .loading {
      width: 61%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: bigger 0.7s linear infinite alternate;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .page2 {
    width: 100%;
    overflow: hidden;
    position: relative;
    z-index: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .photos {
      width: 50.6%;
      position: relative;
      margin-top: 15%;
      z-index: 0;
      .border {
        position: relative;
        z-index: 0;
      }
      .photo {
        width: 48vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        pointer-events: auto;
        user-select: auto;
      }
      .save {
        position: absolute;
        width: 9.5vw;
        top: 50%;
        right: -23.5%;
        transform: translateY(-50%);
        z-index: 9;
      }
    }
    .lockp {
      width: 50.6%;
      position: relative;
      margin-top: 15%;
      z-index: 0;
    }

    .group {
      position: relative;
      width: 65%;
      z-index: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 3%;
      img {
        pointer-events: auto;
        user-select: auto;
      }
      & > div {
        display: inline-block;
        position: relative;
        flex: 1;
        width: 30%;
        margin: 1%;
        .bg {
          position: relative;
          z-index: 0;
        }
        .unlock {
          position: absolute;
          top: 0%;
          left: 0%;
          z-index: 9;
        }
      }
    }
  }
  .anim1 {
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    pointer-events: none;
    user-select: none;
  }
  .anim2 {
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 99;
    pointer-events: none;
    user-select: none;
  }
}
@keyframes bigger {
  0% {
    transform: translate(-50%, -50%) scale(0.7);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>


