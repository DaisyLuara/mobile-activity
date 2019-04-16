<template>
  <div
    :style="style.root" 
    class="root">
    <div class="top" >
      <img 
        :src="baseUrl + 'up.png'+ this.$qiniuCompress()"
      >
      <!-- 大屏photo  :src="photo + this.$qiniuCompress()" -->
      <div class="photo">
        <img 
          v-if="photo !== null" 
          :src="photo + this.$qiniuCompress()"
          class="photo-img">
      </div>
    </div>
    <div 
      :style="style.screenHei" 
      :class="{'x-center':iphoneX}"
      class="center" >
      <img 
        :src="baseUrl + 'ABC.png'+ this.$qiniuCompress()"
        class=" pass">
      <img 
        v-show="pass.firstPass"
        :src="baseUrl + 'A.png'+ this.$qiniuCompress()"
        class="firstPass">
      <img 
        v-show="pass.secondPass"
        :src="baseUrl + 'B.png'+ this.$qiniuCompress()"
        class=" secondPass">
      <img 
        v-show="pass.thirdPass"
        :src="baseUrl + 'C.png'+ this.$qiniuCompress()"
        class=" thirdPass">
      <img 
        :src="baseUrl + 'xia2.png?v=1111'+ this.$qiniuCompress()"
        class="clound"
      >
    </div>
    <div 
      class="bottom">
      <img 
        :src="baseUrl + 'bt.png?v=1111'+ this.$qiniuCompress()"
      >
    </div>
  </div>
</template>

<script>
import { $wechat, wechatShareTrack, isInWechat, Cookies } from 'services'
import { createGame, getGame } from 'services'
import { normalPages } from '@/mixins/normalPages'
import MC from 'mcanvas'

const cdnUrl = process.env.CDN_URL

export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/internationalTrade/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        screenHei: {
          height: window.innerWidth * 1220 / 750 + 'px'
        }
      },
      screenWidth: document.body.clientWidth,
      photo: null,
      pass: {
        firstPass: true,
        secondPass: true,
        thirdPass: true
      },
      iphoneX: false,
      compoundUrl: null,
      wxShareInfoValue: {
        title: 'Super toy cars',
        desc: '最强漂移就在国贸赛道',
        link: process.env.AD_API+'/api/s/KrR' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/internationalTrade/share.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function() {
          console.log(that.screenWidth)
          that.resize()
          that.timer = false
        }, 100)
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
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    resize() {
      let view = document.querySelector('.center')
      let height = window.innerWidth * 1220 / 750 + 'px'
      view.style.height = height
    },
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
        let utm_campaign = this.$route.query.utm_campaign
        let user_id = Cookies.get('user_id')
        this.createGame(utm_campaign, user_id)
      }
    },
    createGame(belong, userId) {
      let args = {
        belong: belong
      }
      createGame(args, userId)
        .then(res => {
          if (res.success) {
            this.getGame(userId)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame(userId) {
      let args = {
        withCredentials: true
      }
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.projectStatus(res, userId)
        })
        .catch(e => {
          console.log(e)
        })
    },
    projectStatus(list, userId) {
      let data = list
      data.map(r => {
        if (r.belong === 'ToyCarsRT') {
          this.pass.firstPass = false
        }
        if (r.belong === 'ToyCarsYAL') {
          this.pass.secondPass = false
        }
        if (r.belong === 'ToyCarsSJ') {
          this.pass.thirdPass = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/internationalTrade/';
img {
  pointer-events: none;
  user-select: none;
  -webkit-touch-callout: none;
}
.root {
  width: 100%;
  position: relative;
  text-align: center;
  background: #a2efec;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  .top {
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    pointer-events: none;
    user-select: none;
    -webkit-touch-callout: none;
    z-index: 5;
    margin-top: 3%;
    img {
      width: 100%;
      pointer-events: none;
      user-select: none;
    }
    .photo {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 50%;
      z-index: -1;
      transform: translate(-51%, -34%);
      .photo-img {
        border-radius: 50%;
        pointer-events: auto;
        user-select: auto;
      }
    }
  }
  .center {
    width: 100%;
    // height: 100%;
    position: relative;
    left: 0;
    top: 0;
    pointer-events: none;
    user-select: none;
    -webkit-touch-callout: none;
    .pass {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
    }
    .firstPass {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
    }
    .secondPass {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
    }
    .thirdPass {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
    }
    .clound {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -25%;
    }
  }
  .x-center {
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    pointer-events: none;
    user-select: none;
    -webkit-touch-callout: none;
    .pass {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 3%;
      z-index: 3;
    }
    .firstPass {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 3%;
    }
    .secondPass {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 3%;
    }
    .thirdPass {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 3%;
    }
    .clound {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -14%;
    }
  }
  .bottom {
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    pointer-events: none;
    user-select: none;
    -webkit-touch-callout: none;
    img {
      width: 100%;
    }
  }
}
</style>
