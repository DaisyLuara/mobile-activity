<template>
  <div class="p-content" id="pcontent">
    <a :href="giftUrl"><img class="redbg" :src="giftImg"></a>
		<div class="glink">
			<a class="againlink" :href="dingdang"><img :src="imgUrl+'link3.png'"/></a> 
		</div>
		<div class="glink">
			<a class="againlink" :href="bankLink"><img :src="imgUrl+'link2.png'"/></a>
		</div>
		<div class="glink">
			<a class="againlink" :href="jietiap360"><img :src="imgUrl+'link1.png'"/></a>
		</div>
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
      imgUrl: BASE_URL + 'image/maliao/',
      bankLink:
        'https://xyk.cebbank.com/cebmms/apply/ps/card-list.htm?level=124&pro_code=FHTG067633SJ43ZZXX',
      dingdang:
        'http://m.ddky.com/huodong/yygcms2/index.html?activityId=587&channel=1m_lyj_liqu',
      jietiap360:
        'https://mkt.360jie.com.cn/activity/ch/zrzakerh5/xinxiliu2?utm_content=sucai1&utm_term=datu1',
      giftUrl:
        'http://engine.liulianqc.com/index/activity?appKey=2XDEZp6HaEr8y7hzRwkWcW4hZrCc&adslotId=7704',
      giftImg: BASE_URL + 'image/springnew/red.gif',
      //微信分享
      wxShareInfo: {
        title: '星视度送你大福利啦~',
        desc: '百万份好礼免费领！',
        imgUrl: BASE_URL + 'maliao/icon.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '星视度送福利'
  },
  created() {},
  mounted() {
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var pcontent = document.getElementById('pcontent')
    // pcontent.style.minHeight = h
  },
  methods: {},
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/maliao/';
html,
body {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  text-align: center;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.p-content {
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding-top: 7%;
  min-height: 640px;
  background: url('@{imgUrl}bg666.jpg') center top/100% 100% no-repeat;
  text-align: center;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  overflow: hidden;
  display: block;
}
.mask .msgbg {
  width: 92%;
  position: absolute;
  top: 31%;
  left: 4%;
}
.mychance {
  width: 7.5%;
  position: absolute;
  top: 29.5%;
  left: 46.7%;
}
.redbg {
  position: fixed;
  right: 6px;
  bottom: 2.5%;
  width: 20%;
}
.glink {
  width: 100%;
  text-align: center;
}
.glink > a {
  display: inline-block;
  width: 90%;
  text-align: center;
}
.glink > a > img {
  width: 100%;
  margin-left: -2.2%;
}
@keyframes mydis {
  0% {
    display: block;
  }
  100% {
    display: none;
  }
}
</style>


