<template>
    <div class="yanzhi-photo-content" id="content">
		<img class="title" :src="imgUrl+'index/title.png'" data-v-index/>
		<h4 class="h4" data-v-index>输入手机号<br/>领取我的颜民币</h4>
		<div class="form">
			<input type="tel" id="tel" name="" maxlength="11" placeholder="请输入手机号" />
			<input type="button" id="button" value="确认" @click="redirectToPhoto"/>
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
      imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/yanzhi/',
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
  beforeCreated() {
    document.title = '颜值印钞机通用版手机号页'
  },
  created() {},
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.minHeight = height + 'px'
    if (window.localStorage.getItem('yztel')) {
      this.linkToPhoto()
    }
  },
  methods: {
    redirectToPhoto() {
      let input = document.getElementById('tel')
      let id = this.$route.query.id
      let reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!this.$route.query.id) {
        alert('没有照片信息，请重新扫描二维码!')
        return
      }
      if (!reg.test(input.value)) {
        alert('请输入11位有效的手机号码')
        return
      }
      if (window.localStorage) {
        window.localStorage.setItem('yztel', input.value)
      }
      this.linkToPhoto()
    },
    linkToPhoto() {
      this.$router.push({
        path: 'yanzhi/result',
        query: this.$route.query
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
.yanzhi-photo-content {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  position: relative;
  min-height: 100%;
  font-size: 0;
  background: url('@{imgUrl}index/back.jpg') center top/100% 100% no-repeat;
  .title[data-v-index] {
    width: 97%;
    margin-top: 5%;
    text-align: center;
  }
  .h4[data-v-index] {
    color: #776141;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 2px;
    text-align: center;
    margin-top: 7%;
  }
  .form {
    margin: 12% auto 0;
    width: 80%;
  }
  #tel {
    width: 100%;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    color: #9b8355;
    border: solid 1px #9b8355;
    padding-left: 10px;
    background-color: #fff;
    outline: none;
  }
  #button {
    width: 100%;
    color: #fff;
    font-size: 17px;
    height: 40px;
    line-height: 40px;
    margin-top: 25px;
    letter-spacing: 4px;
    background: #4d330a;
    border: none;
  }
}
</style>


