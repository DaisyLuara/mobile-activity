<template>
  <div
    :style="style.root"
    class="warp"
  >
    <!-- loading -->
    <div
      v-show="page1"
      class="page1"
    >
      <img
        :src="base + 'bg1.png'"
        class="loading"
      >
    </div>
    <!-- 选择 -->
    <div
      v-show="page2"
      class="page2"
    >
      <div class="red-bg">
        <div
          v-for="item in container"
          :key="item.id"
          class="red"
          @click="getTotalPhoto(item)"
        >
          <img
            :src="item.url"
            class="bg"
          >
          <div class="number">
            <img
              :src="base + 'NumberBox.png'"
              class="bg"
            >
            <span class="item-num">{{item.total}}</span>
          </div>
        </div>
      </div>
      <a
        :href="alink"
        class="alink"
      >
        <img :src="base + 'button.png'">
      </a>
    </div>
    <!-- 图片展示 -->
    <a
      v-show="page3"
      class="gohome"
      @click="backHome"
    >
      <img :src="base + 'home.png'">
    </a>
    <div
      v-show="page3"
      class="page3"
    >
      <div class="pictures">
        <img
          v-show="Boolean(photoList)"
          :src="base + 'button2.png'"
          class="save"
        >
        <swiper
          v-if="photoList!=null&&photoList!=''"
          ref="Swiper"
          :options="sOption"
          class="swiper"
        >
          <swiper-slide
            v-for="item in photoList"
            :key="item.id"
            class="slider"
          >
            <img
              :src="base + 'frame.png'"
              class="bg"
            >
            <img
              :src="item.image_url"
              class="photo"
            >
          </swiper-slide>
        </swiper>
      </div>
      <a
        :href="alink"
        class="alink"
      >
        <img :src="base + 'button.png'">
      </a>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies, userGame, getProjectData, getWxUserInfo } from 'services'
import { normalPages } from '@/mixins/normalPages'
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
const CDN_URL = process.env.CDN_URL
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/chun_nuan/',
      page1: true,
      page2: false,
      page3: false,
      totalList: null,
      alink: 'http://papi.xingstation.com/api/s/wrm',
      head_img_url: null,
      nick_name: null,
      num_total: null,
      container: [//春暖花开
        {
          url: CDN_URL + '/fe/image/chun_nuan/1.png',
          total: 0,
          imgList: '',
        },
        {
          url: CDN_URL + '/fe/image/chun_nuan/2.png',
          total: 0,
          imgList: '',
        },
        {
          url: CDN_URL + '/fe/image/chun_nuan/3.png',
          total: 0,
          imgList: '',
        },
        {
          url: CDN_URL + '/fe/image/chun_nuan/4.png',
          total: 0,
          imgList: '',
        }
      ],
      photoList: null,
      style: {
        root: {
          'height': this.$innerHeight() + 'px'
        }
      },
      userId: null,
      id: this.$route.query.id,
      sOption: {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 18,
      },
      //微信分享
      wxShareInfoValue: {
        title: "您的『花花美照』已生成，速来认领！",
        desc: "更有惊喜优惠等你开奖~",
        link: 'http://papi.xingstation.com/api/s/mYA' + window.location.search,
        imgUrl: "https://cdn.exe666.com/fe/image/chun_nuan/icon.png"
      }
    }
  },
  watch: {
    sertime() {
      this.getWxUserInfo()
      this.userId ? this.userGame() : null
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
    this.doLoading()
  },
  methods: {
    doLoading() {
      let timer = setTimeout(() => {
        this.page1 = false
        this.page2 = true
        clearTimeout(timer)
      }, 3000)
    },
    backHome() {
      this.page3 = false
      this.photoList = null
      this.page2 = true
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
        this.sertime ? this.userGame() : null
      }
    },
    userGame() {
      let args = {
        belong: this.belong,
        image_url: this.photo,
        qiniu_id: this.id,
        score: 100
      }
      userGame(args, this.userId)
        .then(res => {
          this.getProjectData()
        })
        .catch(e => {
          console.log(e)
        })
    },
    getProjectData() {
      let url = '?belong=SZCenterSpring,SZCenterWarm,SZCenterHua,SZCenterKai&group_by=belong'
      getProjectData(this.userId, url)
        .then(res => {
          this.projectStatus(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    projectStatus(list) {
      let data = list
      let that = this
      if (data.SZCenterSpring) {
        this.container[0].imgList = data.SZCenterSpring
        this.container[0].total = data['SZCenterSpring'].length
      }
      if (data.SZCenterWarm) {
        this.container[1].imgList = data.SZCenterWarm
        this.container[1].total = data['SZCenterWarm'].length
      }
      if (data.SZCenterHua) {
        this.container[2].imgList = data.SZCenterHua
        this.container[2].total = data['SZCenterHua'].length
      }
      if (data.SZCenterKai) {
        this.container[3].imgList = data.SZCenterKai
        this.container[3].total = data['SZCenterKai'].length
      }
    },
    getTotalPhoto(item) {
      if (item.total == 0) {
        return
      } else {
        this.photoList = item.imgList
        this.page2 = false
        this.page3 = true
      }
    },
    //获取微信数据
    getWxUserInfo() {
      getWxUserInfo().then(res => {
        let data = res.data
        this.nick_name = data.nickname
        this.head_img_url = data.headimgurl
        this.handlePost()
      }).catch(err => {
        let pageUrl = encodeURIComponent(window.location.href)
        let wx_auth_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          pageUrl +
          '&scope=snsapi_userinfo'
        window.location.href = wx_auth_url
        return
      })
    },
    //推送数据
    handlePost() {
      let url = 'http://exelook.com:8010/pushdiv/?oid=7,' + this.oid + '&belong=' + this.belong + '&name=&img=' + this.head_img_url + ',' + this.nick_name + ',' + this.num_total + '&id=' + this.id + '&api=json'
      this.$http
        .get(url)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/chun_nuan/";
/*声明 WebFont*/
@font-face {
  font-family: "cu";
  src: url("@{img}cu.ttf");
  src: url("@{img}cu.eot"), url("@{img}cu.woff"), url("@{img}cu.ttf"),
    url("@{img}cu.svg");
  font-weight: normal;
  font-style: normal;
}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    position: relative;
    width: 100%;
    overflow: hidden;
    z-index: 0;
  }
  .gohome {
    position: absolute;
    z-index: 999;
    top: 2%;
    left: 3%;
    width: 13%;
  }
  .alink {
    display: inline-block;
    width: 52%;
    position: relative;
    z-index: 0;
    margin-top: 15%;
  }
  .bg {
    position: relative;
    z-index: 0;
  }
  .page1 {
    .loading {
      width: 36.5%;
    }
  }
  .page2 {
    margin-top: -10%;
    .red-bg {
      width: 85%;
      position: relative;
      display: flex;
      flex-flow: row wrap;
      .red {
        width: 45%;
        margin-left: 2%;
        margin-right: 3%;
        position: relative;
        cursor: pointer;
        .number {
          width: 10vw;
          position: absolute;
          bottom: 2%;
          right: 5%;
          z-index: 99;
          .item-num {
            font-size: 5vw;
            color: #f2d35c;
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 99;
            font-family: "cu";
          }
        }
      }
    }
  }
  .page3 {
    margin-top: -10%;
    .save {
      width: 16vw;
      position: absolute;
      top: 50%;
      left: -15.5%;
      transform: translateY(-50%);
      z-index: 99;
    }
    .alink {
      margin-top: 5%;
    }
    .pictures {
      // width: 78%;
      width: 116%;
      margin-left: 22%;
      position: relative;
      .slider {
        .bg {
          position: relative;
          z-index: 99;
        }
        .photo {
          width: 93.5%; //54.5vw;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: auto;
          user-select: auto;
        }
      }
    }
  }
}
</style>

