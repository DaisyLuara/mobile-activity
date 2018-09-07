<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      class="main">
      <img
        :src="base + 'machine.png'"
        class="cover">
      <div 
        class="yuebing">
        <img
          :src="base + 'copybg.png'"
          class="copybg">
        <div 
          class="idol user">
          <img
            :src="bing.headImgUrl">
        </div>
        <div 
          class="idol people">
          <img
            :src="origin + 'people/people' + bing.people + '.png'">
        </div>
        <p>{{ bing.name }}</p>
        <div 
          class="bingbing">
          <img
            :src="base + bing.left[bing.cake_type_a]">
          <img
            :src="base + bing.right[bing.cake_type_b]">
        </div>
      </div>
      <div 
        class="picture">
        <img 
          :src="photo"
          class="photo">
        <swiper 
          ref="Swiper1" 
          :options="swiperOption" 
          class="cardSwiper">
          <swiper-slide 
            v-for="item in 5" 
            :key="item.id" 
            class="slider">
            <img
              :src="base + 'card_' + item + '.png'"
              class="card">
          </swiper-slide>
        </swiper>
      </div>
      <img 
        :src="base + 'prompt.png'"
        class="prompt">
    </div>
    <div 
      class="task-group">
      <img 
        :src="origin + 'proj/' + task.left + '.png'"
        class="left">
      <img 
        :src="origin + 'proj/' + task.right + '.png'"
        class="right">
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
  getGame
} from 'services'
import { normalPages } from '../../mixins/normalPages'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const IMG_SERVER = 'http://p22vy0aug.bkt.clouddn.com'
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
      userId: null,
      belong: this.$route.query.utm_campaign,
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
        name: this.$route.query.cake_name,
        headImgUrl: null,
        // 'http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/1/share.png', //null,
        people: this.$route.query.people_type,
        cake_type_a: this.$route.query.cake_type_a,
        cake_type_b: this.$route.query.cake_type_b
      },
      task: {
        left: '22',
        right: '33'
      },
      photo: null,
      swiperOption: {
        // initialSlide: 1,
        slidesPerView: 3,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10
      },
      //微信分享
      wxShareInfoValue: {
        title: '中秋快乐',
        desc: '我亲手做的月饼，你敢吃么？',
        link: '' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/1/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
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
      if (Cookies.get('user_id') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        //获取微信头像
        getWxUserInfo().then(r => {
          console.log(r.data)
          this.bing.headImgUrl = r.data.headimgurl
        })
        this.userId = Cookies.get('user_id')
        this.createGame(this.belong, this.userId)
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
    let oid = this.$route.query.utm_source
    let belong = this.belong
    let id = this.$route.query.id
    let url = {
      cakeID: 0,
      cake_type_a: this.bing.cake_type_a,
      cake_type_b: this.bing.cake_type_b,
      people_type: this.bing.people
    }
    this.$http
      .post(
        'http://exelook.com:8010/pushdiv/?oid=' +
          oid +
          '&belong=GroceryShop' +
          '&id=' +
          id +
          '&url=' +
          Json.stringify(url) +
          '&name=&image=&api=json'
      )
      .then(res => {})
      .catch(err => {})
  }
}
</script>
<style lang="less" scoped>
@base: 'http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/1/';
/*声明 WebFont*/
@font-face {
  font-family: 'hanyi';
  src: url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/hanyi.ttf');
  src: url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/hanyi.eot'),
    url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/hanyi.woff'),
    url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/hanyi.ttf'),
    url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/hanyi.svg');
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
  background-image: url('@{base}lantern.png'), url('@{base}spot.png');
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
        font-family: 'hanyi';
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


