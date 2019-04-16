<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="main">
      <img
        :src="base + 'machine.png'"
        class="cover"
      >
      <div class="yuebing">
        <img
          :src="base + 'copybg.png'"
          class="copybg"
        >
        <div class="idol user">
          <img :src="bing.headImgUrl">
        </div>
        <div class="idol people">
          <img :src="origin + 'people/people' + bing.people + '.png'">
        </div>
        <p>{{ bing.name }}</p>
        <div class="bingbing">
          <img :src="base + bing.left[bing.cake_type_a]">
          <img :src="base + bing.right[bing.cake_type_b]">
        </div>
      </div>
      <div class="picture">
        <img
          :src="photo"
          class="photo"
        >
        <swiper
          ref="Swiper1"
          :options="swiperOption"
          class="cardSwiper"
        >
          <swiper-slide
            v-for="item in 5"
            :key="item.id"
            class="slider"
          >
            <img
              :src="base + 'card_' + item + '.png'"
              class="card"
            >
          </swiper-slide>
        </swiper>
      </div>
      <img
        :src="base + 'prompt.png'"
        class="prompt"
      >
    </div>
    <div class="task-group">
      <img
        :src="origin + 'proj/' + task.left + '.png?1212'"
        class="left"
      >
      <img
        :src="origin + 'proj/' + task.right + '.png?1212'"
        class="right"
      >
    </div>
  </div>
</template>
<script>
import {
  isInWechat,
  Cookies,
  $wechat,
  wechatShareTrack,
  getWxUserInfo,
  createGame,
  userGame,
  getGame,
  setParameter
} from 'services'
import { normalPages } from '@/mixins/normalPages'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const IMG_SERVER = process.env.CDN_URL
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      origin: IMG_SERVER + '/image/zhongqiu/',
      base: IMG_SERVER + '/image/zhongqiu/1/',
      deUrl:
        'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/0',
      userId: null,
      bing: {
        left: [
          'bingpi_left.png',
          'danhuang_left.png',
          'lianhau_left.png',
          'mocha_left.png',
          'wuren_left.png'
        ],
        right: [
          'bingpi_right.png',
          'danhuang_right.png',
          'lianhau_right.png',
          'mocha_right.png',
          'wuren_right.png'
        ],
        name: null,
        headImgUrl: null,
        // 'http://cdn.exe666.com/image/zhongqiu/1/share.png', //null,
        people: null,
        cake_type_a: null,
        cake_type_b: null,
      },
      task: {
        left: '22',
        right: '33'
      },
      swiperOption: {
        initialSlide: 1,
        slidesPerView: 3,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10
      },
      //微信分享
      wxShareInfoValue: {
        title: '中秋快乐',
        desc: '我亲手做的月饼,你敢吃么？',
        link: process.env.AD_API+'/api/s/YEK' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/image/zhongqiu/1/share.png',
      }
    }
  },
  watch: {
    parms() {
      this.bing.name = this.parms.cake_name
      this.bing.people = this.parms.people_type
      this.bing.cake_type_a = this.parms.cake_type_a
      this.bing.cake_type_b = this.parms.cake_type_b
      this.handlePost()
      this.createGame(this.belong, this.userId)
      this.userGame()
    }
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
  },
  methods: {
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
        this.createGame(this.belong, this.userId)
        this.userGame()
        //获取微信头像
        if (this.$route.query.utm_term) {
          this.bing.headImgUrl = this.$route.query.headImgUrl
        } else {
          getWxUserInfo()
            .then(r => {
              this.bing.headImgUrl = r.data.headimgurl
              this.wxShareInfoValue.link = setParameter(
                'headImgUrl',
                encodeURIComponent(r.data.headimgurl)
              )
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    },
    createGame(belong, userId) {
      let args = {
        belong: belong
      }
      createGame(args, userId)
        .then(res => {
          this.getGame(userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    userGame() {
      let args = {
        belong: this.belong,
        image_url: this.deUrl,
        qiniu_id: this.$route.query.id,
        score: 100
      }
      userGame(args, this.userId)
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame(userId) {
      let that = this
      let args = {
        withCredentials: true
      }
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.projectStatus(res, userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    projectStatus(list, userId) {
      let data = list
      console.log(list)
      data.map(r => {
        if (r.belong === 'GroceryShop') {
          this.task.left = '2'
        }
        if (r.belong === 'WhoTakeMoonCake') {
          this.task.right = '3'
        }
      })
    },
    handlePost() {
      let id = this.$route.query.id
      let url =
        'http://exelook.com:8010/pushdiv/?oid=562,212,386,230,426,219,534,474,434,386&belong=GroceryShop&id=' +
        id +
        "&url={'cakeID':0,'cake_type_a':" +
        this.bing.cake_type_a +
        ",'cake_type_b':" +
        this.bing.cake_type_b +
        ",'people_type':" +
        this.bing.people +
        '}&name&image&api=json'
      console.log(url)
      this.$http
        .get(url)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@base: "http://cdn.exe666.com/image/zhongqiu/1/";
/*声明 WebFont*/
@font-face {
  font-family: "hanyi";
  src: url("http://cdn.exe666.com/image/zhongqiu/font/hanyi.ttf");
  src: url("http://cdn.exe666.com/image/zhongqiu/font/hanyi.eot"),
    url("http://cdn.exe666.com/image/zhongqiu/font/hanyi.woff"),
    url("http://cdn.exe666.com/image/zhongqiu/font/hanyi.ttf"),
    url("http://cdn.exe666.com/image/zhongqiu/font/hanyi.svg");
  font-weight: normal;
  font-style: normal;
}

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
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #281765;
  background-image: url("@{base}lantern.png"), url("@{base}spot.png");
  background-position: center top, center bottom;
  background-repeat: no-repeat, no-repeat;
  background-size: 100% auto, 100% auto;
  position: relative;
  .main {
    width: 100%;
    overflow-x: hidden;
    position: relative;
    .cover {
      position: relative;
      z-index: 999;
      width: 100%;
    }
    .yuebing {
      position: absolute;
      top: 17%;
      left: 0;
      width: 100%;
      z-index: 0;
      .copybg {
        position: relative;
        width: 81%;
        z-index: 0;
        width: 80%;
      }
      .idol {
        position: absolute;
        width: 17.5%;
        border-radius: 50%;
        overflow: hidden;
      }
      .user {
        top: 16%;
        left: 11%;
      }
      .people {
        top: 16.2%;
        right: 10.6%;
      }
      p {
        width: 100%;
        font-family: "hanyi";
        font-size: 12vw;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 0;
      }
      .bingbing {
        width: 22%;
        position: absolute;
        top: 83%;
        left: 50%;
        transform: translateX(-50%);
        img {
          width: 50%;
        }
      }
    }
    .picture {
      width: 100%;
      position: absolute;
      top: 45%;
      left: 0;
      z-index: 0;
      .photo {
        width: 44.5%;
        position: absolute;
        top: 3%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
        pointer-events: auto;
        user-select: auto;
      }
      .cardSwiper {
        position: relative;
        z-index: 99;
        .slider {
          width: 50% !important;
        }
      }
    }
    .prompt {
      width: 61%;
      position: absolute;
      bottom: 13%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .task-group {
    width: 100%;
    overflow: hidden;
    margin-top: 10%;
    margin-bottom: 20%;
    img {
      width: 46%;
    }
    .left {
      float: left;
      margin-left: 3%;
    }
    .right {
      float: right;
      margin-right: 3%;
    }
  }
}
</style>


