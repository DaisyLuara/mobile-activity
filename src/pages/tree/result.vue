<template>
  <div class="greenlife-content">
    <!-- 用户信息显示 -->
    <div class="user">
      <img
        :src="imgServerUrl + '/people.png'"
        class="cover"
      >
      <img
        id="userImg"
        :src="head_img_url"
      >
      <p class="userName">
        {{ nick_name }}
      </p>
    </div>
    <img
      :src="imgServerUrl + '/title.png'"
      class="title"
    >
    <!-- 礼物区 -->
    <div class="gift">
      <img
        :src="imgServerUrl + '/notetit.png'"
        class="gtit"
      >
      <a
        :href="giftUrl"
        @click="sendcount"
      >
        <img
          :src="imgServerUrl + '/gift.png'"
          class="giftImg"
        >
      </a>
      <img
        :src="imgServerUrl + '/noteclick.png'"
        class="tag"
      >
    </div>
    <!-- 树动画显示 -->
    <!-- <div class="showtree"> </div> -->
    <div
      id="treeDiv"
      ref="element"
      class="trees"
    />
  </div>
</template>
<script>
import {
  $wechat,
  getInfoById,
  wechatShareTrack,
  getWxUserInfo,
  getParamsMap,
  getParameter,
  setParameter
} from 'services'
const CDN_URL = process.env.CDN_URL
export default {
  data() {
    return {
      imgServerUrl: CDN_URL + '/fe/image/greenlife/',
      giftUrl: 'javascript:void(0)',
      nick_name: '',
      head_img_url: '',
      wx_openid: '',
      placeUrl: {
        '27':
          'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D', //虹口龙之梦
        '235':
          'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D', //虹口龙之梦
        '234':
          'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D', //虹口龙之梦
        '233':
          'https://mall.capitaland.com.cn/qibao/lottery/egg?id=F95FA6A17E920423', //七宝
        '232':
          'https://mall.capitaland.com.cn/qibao/lottery/egg?id=F95FA6A17E920423', //七宝
        '231':
          'https://mall.capitaland.com.cn/LZMmh/lottery/egg?id=AE93BAC25DC90BBD', //闵行龙之梦
        '230':
          'https://mall.capitaland.com.cn/LZMmh/lottery/egg?id=AE93BAC25DC90BBD', //闵行龙之梦
        '229':
          'https://mall.capitaland.com.cn/LZMmh/lottery/egg?id=AE93BAC25DC90BBD', //闵行龙之梦
        '228':
          'https://mall.capitaland.com.cn/sh_rafflescity/lottery/egg?id=70910977F879C80E', //上海来福士
        '21':
          'https://mall.capitaland.com.cn/RCC/lottery/egg?id=A2BB2EE7E59B25A6', //长宁来福士
        '20':
          'https://mall.capitaland.com.cn/RCC/lottery/egg?id=A2BB2EE7E59B25A6', //长宁来福士
        '30':
          'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D', //测试链接
        '31':
          'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D' //开发链接
      },

      width: '',
      height: '',
      winWidth: '',
      animation: null,
      num: null,
      pos: null,
      phoneError: false,
      treeData: null,
      //微信分享信息
      wxShareInfoValue: {
        title: '凯德绿享新生活~',
        desc: '争当森林小卫士',
        imgUrl:
          CDN_URL + '/fe/image/greenlift/icon.jpg',
        link: '',
        success: () => {
          wechatShareTrack()
        }
      },
      renderer: null,
      stage: null
    }
  },
  watch: {
    parms() {

    }
  },
  beforeCreate() {
    document.title = '凯德绿享新生活'
  },
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    document.querySelector('.greenlife-content').style.minHeight = height + 'px'
    document.querySelector('.trees').style.height = height / 2 + 'px'

    this.width = this.$refs.element.offsetWidth
    this.height = this.$refs.element.offsetHeight
    this.winWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    this.getInfoById()
  },
  created() {
    if (this.$route.query.nick_name || this.$route.query.head_img_url) {
      this.nick_name = this.$route.query.nick_name
      this.head_img_url = this.$route.query.head_img_url
    } else {
      this.getUserInfo()
    }
  },
  methods: {
    getUserInfo() {
      getWxUserInfo()
        .then(result => {
          let data = result.data
          this.nick_name = data.nickname
          this.head_img_url = data.headimgurl
          this.wx_openid = data.openid
          let link = setParameter(
            'nick_name',
            encodeURIComponent(this.nick_name)
          )
          link = setParameter(
            'head_img_url',
            encodeURIComponent(this.head_img_url),
            link
          )
          this.wxShareInfoValue.link = link
        })
        .catch(err => {
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
    sendcount() {
      if (_paq) {
        _paq.push(['trackEvent', 300, 300, 'click_gift_page'])
      }
    },
    getValueByName(parms, strings) {
      let string = strings.split('&')
      for (var i = 0; i < string.length; i++) {
        var equal = string[i].split('=')
        if (parms == equal[0]) {
          return equal[1]
        }
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.pos = this.getValueByName('pos', res.parms)
          this.init(this.pos)
          console.log(res.parms)
        })
        .catch(err => {
          console.log(err)
          return
        })
    },
    init(pos) {
      import('pixi.js').then(PIXI => {
        import('pixi-spine').then(Spine => {
          this.renderer = new PIXI.CanvasRenderer(this.width, this.height, {
            transparent: true
          })
          document.getElementById('treeDiv').appendChild(this.renderer.view)
          this.renderer.view.transparent = true
          this.stage = new PIXI.Container()
          let that = this
          PIXI.loader
            .add(
              'spineCharacter',
              CDN_URL + '/fe/image/greenlife/spine/treeH5.json'
            )
            .load(function (loader, resources) {
              that.animation = new PIXI.spine.Spine(
                resources.spineCharacter.spineData
              )
              that.stage.addChild(that.animation)
              that.animation.state.addAnimationByName(0, '3', true, 0)
              that.animation.x = that.width / 2 + 5
              that.animation.y = that.height * 5 / 6
              that.animation.scale.x = that.winWidth * 0.9 / 750
              that.animation.scale.y = that.winWidth * 0.9 / 750
              that.animate()
            })

          this.giftUrl = this.placeUrl[pos]
        })
      })
    },
    animate() {
      requestAnimationFrame(this.animate)
      import('pixi.js').then(PIXI => {
        import('pixi-spine').then(Spine => {
          this.renderer.render(this.stage)
        })
      })
    },
    pushHistory() {
      let pageUrl = window.location.href
      let state = {
        title: 'title',
        url: pageUrl
      }
      window.history.pushState(state, 'title', pageUrl)
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/image/greenlife";
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.claerfix {
  overflow: hidden;
  clear: both;
}
@media screen and (min-width: 320px) {
  html {
    font-size: 14px;
  }
}
@media screen and (min-width: 360px) {
  html {
    font-size: 16px;
  }
}
@media screen and (min-width: 400px) {
  html {
    font-size: 18px;
  }
}
@media screen and (min-width: 440px) {
  html {
    font-size: 20px;
  }
}
@media screen and (min-width: 480px) {
  html {
    font-size: 22px;
  }
}
@media screen and (min-width: 640px) {
  html {
    font-size: 28px;
  }
}
.greenlife-content {
  width: 100%;
  overflow-x: hidden;
  transform: translate3d(0, 0, 0);
  -webkit-overflow-scrolling: auto;
  text-align: center;
  background-image: url("@{imageHost}/leaf2.png"), url("@{imageHost}/leaf1.png"),
    url("@{imageHost}/grass.png");
  background-size: 100% auto, 100% auto, 100% auto;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: center bottom, center top, center bottom;
  background-color: #030d01;
  .title {
    width: 66%;
    position: relative;
    margin-top: 3%;
  }
  .user {
    position: absolute;
    right: 0;
    top: 23.5%;
    width: 26vw;
    z-index: 9999;
    .cover {
      width: 100%;
      position: relative;
      z-index: 999;
    }
    #userImg {
      position: absolute;
      border-radius: 50%;
      width: 16vw;
      left: 26%;
      top: 26%;
      z-index: 9;
    }
    .userName {
      position: absolute;
      bottom: 17%;
      right: 6%;
      z-index: 9999;
      //width:19vw;
      width: 100%;
      height: 1.3rem;
      font-size: 0.7rem;
      line-height: 1.3rem;
      color: #f3f1ef;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 32%;
      padding-right: 5%;
    }
  }
  .gift {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-top: -10%;
    position: relative;
    z-index: 99;
    .gtit {
      margin: 0 auto;
      width: 62%;
    }
    .giftImg {
      width: 56%;
      animation: shake 1s linear infinite alternate;
      margin-top: -10%;
    }
    .tag {
      width: 30.5%;
      position: absolute;
      left: 4%;
      bottom: -4%;
    }
  }
  .trees {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    z-index: 9;
    background-image: url("@{imageHost}/word.png"),
      url("@{imageHost}/glitz.png"), url("@{imageHost}/barrierleft.png"),
      url("@{imageHost}/barrier.png"), url("@{imageHost}/logo.png");
    background-size: 35% auto, 100% auto, 22% auto, 22% auto, 22% auto;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
    background-position: center 91%, center center, left bottom, right bottom,
      7% 82%;
  }
}
@keyframes shake {
  0% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
}
</style>


