<template>
  <div
    :style="style.root"
    class="content">
    <div 
      class="main">
      <img
        :src="base+'back.jpg'"
        class="background">
      <!-- 提示 -->
      <img
        :src="base + hint + '.png'"
        class="hint">
      <!-- 点亮的球 -->
      <div
        class="light-stars">
        <!-- 暗的星星 -->
        <a
          v-for="item in all"
          :key="item.key"
          :class="item"
          class="dark"
          @click="()=>{ hint = 'hint2' ; }"
        >
          <img
            :src="base + item + '0.png'">
        </a>
        <!-- 亮的星星 -->
        <a
          v-for="item in stars"
          :key="item.key"
          :class="item"
          @click="()=>{ mask = true ; cards[item] = true; }"
        >
          <img
            :src="base + item + '0.png'">
        </a>
      </div>
      <!--蒙版 与卡片  -->
      <div
        v-show="mask"
        class="mask">
        <div 
          v-for="(value,key) in cards"
          v-show="value"
          :key="key"
          :class="['star-card',key]">
          <a 
            class="close"
            @click="()=>{ cards[key] = false ; mask = false; hint = 'hint1'}">
            <img
              :src="base + 'close.png'">
          </a>
          <img
            :src="base + key +'3.png'"
            class="tit">
          <img
            :src="cards_img[key]"
            class="photo">
          <img
            :src="base + 'save.png'"
            class="save">
          <img
            :src="base + key + '1.png'"
            class="name">
          <img
            :src="base + key + '2.png'"
            class="people">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  isInWechat,
  wechatShareTrack,
  $wechat,
  Cookies,
  userGame,
  getSceneData
} from 'services'
import { normalPages } from '../../mixins/normalPages'
const CDNURL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: CDNURL + '/fe/image/star/',
      photo: null,
      hint: 'hint1',
      // 1，潘多拉，2，阿斯加德，3，克星，4，m78，5，娜美克，6，瓦肯(星星的顺序)
      all: ['pdl', 'asgd', 'kx', 'm78', 'nmk', 'wk'],
      scene: this.$route.query.scene,
      stars: [], //'pdl','asgd', 'kx', 'm78', 'nmk', 'wk'
      mask: false,
      userId: null,
      cards: {
        pdl: false,
        asgd: false,
        kx: false,
        m78: false,
        nmk: false,
        wk: false
      },
      cards_img: {
        pdl: null,
        asgd: null,
        kx: null,
        m78: null,
        nmk: null,
        wk: null
      },
      //微信分享
      wxShareInfoValue: {
        title: '来自星星的你',
        desc: '来自星星的你',
        link: 'http://papi.xingstation.com/api/s/G50' + window.location.search,
        imgUrl: CDNURL + 'icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    // let star = this.all[this.scene - 1]
    // this.mask = true
    // this.cards[star] = this.photo || true
    // this.stars.push(star)
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
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
        this.getPhoto()
      }
    },
    getPhoto() {
      let timer = requestAnimationFrame(this.getPhoto)
      if (this.photo) {
        cancelAnimationFrame(timer)
        let star = this.all[this.scene - 1]
        this.cards[star] = true
        this.cards_img[star] = this.photo
        this.mask = true
        this.stars.push(star)
        this.userGame()
      }
    },
    userGame() {
      let args = {
        belong: this.$route.query.utm_campaign,
        image_url: this.photo,
        qiniu_id: this.$route.query.id,
        scene: this.all[this.scene - 1],
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
      let url = '?belong=' + this.$route.query.utm_campaign + '&group_by=scene'
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
      console.log(list)
      // 调用接口，将获取的星星存入stars数组里
      data.map(r => {
        // 1，潘多拉
        if (r.scene === 'pdl') {
          that.stars.push('pdl')
          that.cards_img['pdl'] = r.image_url
        }
        // 2，阿斯加德
        if (r.scene === 'asgd') {
          that.stars.push('asgd')
          that.cards_img['asgd'] = r.image_url
        }
        // 3，克星
        if (r.scene === 'kx') {
          that.stars.push('kx')
          that.cards_img['kx'] = r.image_url
        }
        // 4，m78
        if (r.scene === 'm78') {
          that.stars.push('m78')
          that.cards_img['m78'] = r.image_url
        }
        // 5，娜美克
        if (r.scene === 'nmk') {
          that.stars.push('nmk')
          that.cards_img['nmk'] = r.image_url
        }
        //6，瓦肯
        if (r.scene === 'wk') {
          that.stars.push('wk')
          that.cards_img['wk'] = r.image_url
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@img: 'https://cdn.exe666.com/fe/image/star/';
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
  text-align: center;
}
a {
  display: inline-block;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  background-color: #23242f;
  position: relative;
  overflow: hidden;
  .main {
    position: relative;
    width: 100%;
    overflow: hidden;
    .background {
      position: relative;
      z-index: 0;
    }
    .hint {
      position: absolute;
      width: 67%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9;
    }
    .light-stars {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0%;
      left: 0%;
      z-index: 99;
      a {
        position: absolute;
        z-index: 99;
      }
      .pdl {
        width: 24%;
        top: 3%;
        left: 3%;
      }
      .nmk {
        width: 14%;
        top: 4%;
        left: 35%;
      }
      .wk {
        width: 14%;
        top: 7%;
        left: 60%;
      }
      .asgd {
        width: 22%;
        bottom: 6.8%;
        left: 54.5%;
      }
      .kx {
        width: 14%;
        bottom: 12%;
        left: 33%;
      }
      .m78 {
        width: 27%;
        bottom: 23%;
        left: 1%;
      }
      .dark {
        z-index: 0;
        img {
          opacity: 0;
        }
      }
    }

    .mask {
      position: absolute;
      top: 0%;
      bottom: 0%;
      left: 0%;
      right: 0%;
      z-index: 9999;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      .tit {
        width: 47%;
        position: absolute;
        top: 2%;
        left: 4%;
        z-index: 999;
      }
      .close {
        display: inline-block;
        width: 14%;
        position: absolute;
        top: 8.5%;
        left: 74%;
        z-index: 999;
      }
      .photo {
        width: 63%;
        position: absolute;
        top: 48.5%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: solid 7px #0173d4;
        border-radius: 5px;
        z-index: 99;
        pointer-events: auto;
        user-select: auto;
      }
      .save {
        width: 12%;
        position: absolute;
        top: 49%;
        transform: translateY(-50%);
        left: 80.5%;
        z-index: 9;
      }
      .people {
        width: 34%;
        position: absolute;
        bottom: 0%;
        left: 0%;
        z-index: 999;
      }
      .name {
        position: absolute;
        width: 50%;
        bottom: 8%;
        left: 30%;
      }
      .nmk {
        .tit {
          top: 4%;
          left: 35%;
        }
        .close {
          left: 12%;
          top: 10.5%;
        }
        .photo {
          top: 50.5%;
          border-color: #4ff73f;
        }
        .people {
          left: 2%;
        }
        .name {
          bottom: 6.5%;
        }
      }
      .wk {
        .tit {
          top: 7%;
          left: 60%;
        }
        .close {
          left: 12%;
          top: 10.6%;
        }
        .photo {
          top: 50.5%;
          border-color: #c53ff6;
        }
        .people {
          left: 2%;
        }
        .name {
          bottom: 6.5%;
        }
      }
      .m78 {
        .tit {
          left: 1%;
          top: 60%;
        }
        .close {
          left: 74%;
          top: 8.6%;
        }
        .photo {
          top: 48.5%;
          border-color: #f83f44;
        }
        .people {
          width: 23%;
          left: 11%;
        }
        .name {
          left: 28%;
          bottom: 8.5%;
        }
      }
      .kx {
        .tit {
          left: 33%;
          top: 79%;
        }
        .close {
          left: 74%;
          top: 8.6%;
        }
        .photo {
          top: 48.5%;
          border-color: #3ff7df;
        }
        .name {
          left: 23%;
          top: 5.5%;
        }
      }
      .asgd {
        .tit {
          top: 79.5%;
          left: 53.5%;
        }
        .close {
          left: 74%;
          top: 8.6%;
        }
        .photo {
          top: 48.5%;
          border-color: #f3f515;
        }
        .people {
          left: 18%;
        }
        .name {
          left: 22%;
          top: 5.8%;
        }
      }
    }
  }
}
</style>


