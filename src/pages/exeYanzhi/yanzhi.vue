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
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
	</div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const BASE_URL = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  data() {
    return {
      imgUrl: BASE_URL + 'image/yanzhi/content/',
      mImg: null,
      press: false,
      //微信分享
      wxShareInfo: {
        title: '我的颜值太高了！居然被印上了钞票！',
        desc: '你也来和我PK颜值吧~',
        imgUrl: BASE_URL + 'image/yanzhi/index/share.jpg',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '颜值印钞机通用版'
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
  },
  methods: {
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
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/yanzhi/';
.yanzhi-result {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
  position: relative;
  background: url('@{imgUrl}index/back.jpg') center top/100% 100% no-repeat;

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
    z-index: 99999;
    width: 91%;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 25.6%;
    font-size: 20px;
  }
  .imgframe {
    margin: 20% auto;
    width: 98%;
    position: relative;
    z-index: 9999;
  }
  .press {
    width: 80%;
    margin: -12% auto 0;
    animation: updown 0.6s infinite linear alternate;
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


