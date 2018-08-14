<template>
  <div
    :style="style.root" 
    class="root">
    <div class="top" >
      <img 
        :src="baseUrl + 'up.png'+ this.$qiniuCompress()"
      >
      <!-- 大屏photo -->
      <div class="photo">
           <img 
            v-if="photo !== null" 
            :src="photo + this.$qiniuCompress()"
            class="photo-img">
        </div>
    </div>
    <div 
      :class="{'x-center':iphoneX}"
      class="center" >
      <img 
        :src="baseUrl + '0.png'+ this.$qiniuCompress()"
        class=" pass">
      <img 
        v-show="pass.firstPass"
        :src="baseUrl + '1.png'+ this.$qiniuCompress()"
        class="firstPass">
      <img 
        v-show="pass.secondPass"
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
        class=" secondPass">
      <img 
        v-show="pass.thirdPass"
        :src="baseUrl + '3.png'+ this.$qiniuCompress()"
        class=" thirdPass">
    </div>
    <div 
      :class="{'x-bottom':iphoneX}" 
      class="bottom">
      <img 
        :src="baseUrl + 'xia.png'+ this.$qiniuCompress()"
      >
    </div>
  </div>
</template>

<script>
import { $wechat, wechatShareTrack, isInWechat, Cookies } from 'services'
import { createGame, getGame } from 'services'
import { normalPages } from '../../mixins/normalPages'
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
        }
      },
      photo: '',
      pass: {
        firstPass: true,
        secondPass: true,
        thirdPass: true
      },
      iphoneX: false,
      compoundUrl: null,
      wxShareInfoValue: {
        title: '冰力十足 酷爽一夏',
        desc: '看！卖萌的企鹅',
        link: 'http://papi.xingstation.com/api/s/KrR' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/internationalTrade/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
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
        if (r.belong === 'ToyCarsSJ') {
          this.pass.secondPass = false
        }
        if (r.belong === 'ToyCarsYAL') {
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
  .top {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    user-select: none;
    -webkit-touch-callout: none;
    img {
      width: 100%;
      pointer-events: none;
      user-select: none;
    }
    .photo {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 47%;
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
    height: 100%;
    position: absolute;
    left: 0;
    top: 84%;
    pointer-events: none;
    user-select: none;
    -webkit-touch-callout: none;
    .pass {
      width: 100%;
    }
    .firstPass {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .secondPass {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .thirdPass {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .x-center {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 71%;
    pointer-events: none;
    user-select: none;
    -webkit-touch-callout: none;
    .pass {
      width: 100%;
    }
    .firstPass {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .secondPass {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .thirdPass {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .bottom {
    width: 100%;
    position: absolute;
    left: 0;
    top: 146%;
    pointer-events: none;
    user-select: none;
    -webkit-touch-callout: none;
    img {
      width: 100%;
    }
  }
  .x-bottom {
    width: 100%;
    position: absolute;
    left: 0;
    top: 123%;
    pointer-events: none;
    user-select: none;
    -webkit-touch-callout: none;
    img {
      width: 100%;
    }
  }
}
@keyframes upAppear {
  0% {
    top: 96%;
  }
  100% {
    top: 50%;
  }
}
</style>
