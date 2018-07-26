<template>
    <div class="yanzhi-result" id="warp">
		<img class="title" :src="imgUrl+'title.png'" data-v-content/>
		<div class="content">
			<div class="circles"> 
				<img class="gear1" :src="imgUrl+'gear1.png'">
				<img class="gear2" :src="imgUrl+'gear2.png'">
				<img class="gear3" :src="imgUrl+'gear3.png'">
				<img class="gear4" :src="imgUrl+'gear4.png'">
				<img class="gear5" :src="imgUrl+'gear5.png'">
				<img class="gear6" :src="imgUrl+'gear6.png'">
				<img class="gear7" :src="imgUrl+'gear7.png'">
				<img class="gear8" :src="imgUrl+'gear8.png'">
				<img class="gear9" :src="imgUrl+'gear9.png'">
			</div>
			<img class="money" id="mImg" :src="mImg"/>
			<img class="imgframe" :src="imgUrl+'frame.png'">
		</div>
		<img class="press" :src="imgUrl+'press.png'" v-show="press"/>
        <img :src="imgUrl + posNum + name + '.png'" class="coupon" v-show="press"/>
        <img :src="imgUrl+'logo.png'" class="logo"/>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    <!-- 弹出层 -->
    <GameShow :styleData="style" ref="gameShow"/>
	</div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import GameShow from 'modules/gameShow'
import { customTrack } from 'modules/customTrack'
import { isInWechat, Cookies } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      style: {
        show: false,
        top: {
          top:
            this.$innerHeight() * 0.12 +
            this.$innerWidth() * 0.7 / 503 * 34 -
            38 +
            'px',
          right: this.$innerWidth() * 0.15 - 45 + 'px'
        },
        popupsContent: {
          minHeight: this.$innerHeight() + 'px'
        },
        popups: {
          minHeight: this.$innerHeight() + 'px'
        }
      },
      imgUrl: IMAGE_SERVER + '/pages/yanzhi/hilton/',
      mImg: null,
      posNum: this.$route.query.posNum || '',
      press: false,
      name: this.$route.query.coupon,
      //微信分享
      wxShareInfo: {
        title: '靠颜值就能中大奖？',
        desc: '快来看看我的颜“值”多少吧',
        imgUrl: IMAGE_SERVER + '/pages/yanzhi/hilton/share.jpg',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = ''
  },
  created() {},
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let warp = document.getElementById('warp')
    warp.style.minHeight = height + 'px'
    this.getInfoById()
    // if (isInWechat() === true) {
    //   if (
    //     process.env.NODE_ENV === 'production' ||
    //     process.env.NODE_ENV === 'test'
    //   ) {
    //     this.handleWechatAuth()
    //   }
    //   // this.handleWechatAuth()
    // }
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
        this.$refs.gameShow.createGame(utm_campaign, user_id)
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.mImg = res.image
          this.press = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    WxShare,
    GameShow
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/yanzhi/hilton/';
html,
body {
  padding: 0;
  margin: 0;
  text-align: center;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
img {
  pointer-events: none;
  user-select: none;
}
.yanzhi-result {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-size: 0;
  position: relative;
  background: url('@{imgUrl}bg.jpg') center top/100% 100% no-repeat;

  .title[data-v-content] {
    width: 97%;
    margin-top: 15px;
  }
  .content {
    position: relative;
    width: 100%;
    margin-top: -10px;
  }
  .circles {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
  }
  .circles > img {
    position: absolute;
  }
  .gear1 {
    width: 35.6%;
    left: -13px;
    margin-top: 23px;
    z-index: 0;
    animation: mycircle 12s infinite linear;
  }
  .gear2 {
    width: 22%;
    left: 16%;
    margin-top: 10.5%;
    z-index: 9;
    animation: myback 10s infinite linear;
  }
  .gear3 {
    width: 22%;
    margin-top: 55.6%;
    left: 47%;
    z-index: 0;
    animation: mycircle 8s infinite linear;
  }
  .gear4 {
    width: 32.9%;
    left: 61%;
    margin-top: 51%;
    animation: myback 10s infinite linear;
  }
  .gear5 {
    width: 17%;
    left: -2.3%;
    margin-top: 46.2%;
    animation: mycircle 5s infinite linear;
  }
  .gear6 {
    width: 11.2%;
    left: 87%;
    margin-top: 15%;
    z-index: 0;
    animation: myback 10s infinite linear alternate;
  }
  .gear7 {
    width: 17%;
    left: 80%;
    margin-top: 55.4%;
    animation: mycircle 6s infinite linear;
  }
  .gear8 {
    width: 10.9%;
    left: 36%;
    margin-top: 10.8%;
    z-index: 999;
    animation: mycircle 6s infinite linear;
  }
  .gear9 {
    width: 16%;
    left: 78%;
    margin-top: 12.4%;
    z-index: 0;
    animation: mycircle 10s infinite linear alternate;
  }
  .money {
    z-index: 400;
    width: 89%;
    margin: auto;
    position: absolute;
    left: -1%;
    right: 0;
    top: 26.5%;
    font-size: 20px;
    pointer-events: auto;
    user-select: auto;
  }
  .imgframe {
    margin: 20% auto;
    width: 98%;
    position: relative;
    z-index: 300;
  }
  .press {
    width: 80%;
    margin: -12% auto 0;
    animation: updown 0.6s infinite linear alternate;
  }
  .coupon {
    display: block;
    width: 85.6%;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 1%;
    pointer-events: auto;
    user-select: auto;
  }
  .logo {
    width: 24%;
    display: block;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 8%;
  }
}
@keyframes mycircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes myback {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes updown {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(15px);
  }
}
</style>


