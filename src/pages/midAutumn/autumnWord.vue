<template>
  <div
    class="root"
    :style="style.root"
    >
    <img 
        :src="baseUrl + 'bg.jpeg'+ this.$qiniuCompress()"
        class="bg">
    <div class="t-1">
       <img 
        :src="baseUrl + 'title.png'+ this.$qiniuCompress()"
        class="t1">
    </div>
    <div class="t-2">
        <img 
        :src="baseUrl + 'section_1.png'+ this.$qiniuCompress()"
        class="t2-1">
        <img 
        :src="baseUrl + 'leaf.png'+ this.$qiniuCompress()"
        class="leaf-1">
        <img 
        :src="baseUrl + 'leaf2.png'+ this.$qiniuCompress()"
        class="leaf-2">
        <!-- 录音 -->
        <div class="button-1" v-show="button.buttonOne" @touchstart="startRecord" @touchend="stopRecord">
          <img 
            :src="baseUrl + 'prompt_1.png'+ this.$qiniuCompress()"
            class="p-1">
          <img 
            :src="baseUrl + 'button_1.png'+ this.$qiniuCompress()"
            class="b-1">
        </div>
        <!-- 正在录音 -->
        <div class="button-2" v-show="button.buttonTwo">
          <img 
            :src="baseUrl + 'prompt_1.png'+ this.$qiniuCompress()"
            class="p-1">
          <img 
            :src="baseUrl + 'wifi.gif'+ this.$qiniuCompress()"
            class="wifi">
          <img 
            :src="baseUrl + 'button_2.png'+ this.$qiniuCompress()"
            class="b-1">
        </div>
        <!-- 播放录音 -->
        <div class="button-3"  id="mbtn" v-show="button.buttonThree" @click="playRecord()">
          <img 
            :src="baseUrl + 'prompt_2.png'+ this.$qiniuCompress()"
            class="p-1">
          <img 
            :src="baseUrl + 'button_3.png'+ this.$qiniuCompress()"
            class="b-1">
            <!-- v-if="isPlay" -->
            <audio   id="voice" autobuffer >
              <source :src="audioUrl">
            </audio>
        </div>
    </div>
    <div class="t-3">
       <img 
        :src="baseUrl + 'section_2.png'+ this.$qiniuCompress()"
        class="t3-1">
       <img 
        :src="baseUrl + '777.png'+ this.$qiniuCompress()"
        class="photo">
        <img 
        :src="baseUrl + 'leaf3.png'+ this.$qiniuCompress()"
        class="leaf-3">
        <img 
        :src="baseUrl + 'leaf4.png'+ this.$qiniuCompress()"
        class="leaf-4">
        <img 
        :src="baseUrl + 'leaf5.png'+ this.$qiniuCompress()"
        class="leaf-5">
        <img 
        :src="baseUrl + 'leaf6.png'+ this.$qiniuCompress()"
        class="leaf-6">
        <div class="jiantou">
        <img 
        :src="baseUrl + 'arrow.png'+ this.$qiniuCompress()"
        class="arrow">
         <img 
        :src="baseUrl + 'prompt_3.png'+ this.$qiniuCompress()"
        class="prompt">
       </div>
    </div>
       
  </div>
</template>

<script>
import {
  isInWechat,
  Cookies,
  userGame,
  $wechat,
  getInfoById,
  getWxUserInfo,
  wechatShareTrack
} from 'services'
import { parseService } from 'services'
const wx = require('weixin-js-sdk')
const cdnUrl = process.env.CDN_URL
const REQ_URL = 'http://120.27.144.62:1337/parse/classes/'
export default {
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/autumnWord/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      audioUrl: 'http://122.112.236.76/mp3/motion.mp3',
      button: {
        buttonOne: true,
        buttonTwo: false,
        buttonThree: false
      },
      photo: '',
      // isRecording: false,
      // currentLocalId: null,
      belong: this.$route.query.utm_campaign,
      startTime: 0,
      recordTimer: null,
      isPlay: false,
      localId: null,
      userId: null,
      params: {
        ID: this.$route.query.id + '',
        serverId: null
      },
      mp3URL: '',
      filter_url: process.env.SAAS_API + '/user/',
      wxShareInfoValue: {
        title: '月满中秋 心愿祈福',
        desc: '家人有爱口难开？让星视度帮你把祝福送给你爱的人吧',
        link: 'http://papi.xingstation.com/api/s/J62' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/autumnWord/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {
    this.getInfoById()
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWxReady()
        this.handleWechatAuth()
      }
    }
    //调用此方法区分当前链接是否已被使用过录音功能
  },
  methods: {
    //微信静默授权
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
        this.isShare()
        this.query()
        this.userId = Cookies.get('user_id')
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          this.drawing()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleWxReady() {
      let reference = this
      if (isInWechat() === true) {
        if (
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'testing'
        ) {
          let requestUrl = process.env.WX_API + '/wx/officialAccount/sign'
          this.$http.get(requestUrl).then(response => {
            let resData = response.data.data
            let wxConfig = {
              debug: false,
              appId: resData.appId,
              timestamp: resData.timestamp,
              nonceStr: resData.nonceStr,
              signature: resData.signature,
              jsApiList: [
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'onVoicePlayEnd',
                'uploadVoice',
                'downloadVoice'
              ]
            }
            wx.config(wxConfig)
          })
          wx.ready(() => {
            wx.onMenuShareAppMessage(reference.wxShareInfoValue)
            wx.onMenuShareTimeline(reference.wxShareInfoValue)
            wx.onMenuShareQQ(reference.wxShareInfoValue)
            wx.onMenuShareWeibo(reference.wxShareInfoValue)
            wx.onMenuShareQZone(reference.wxShareInfoValue)
          })
        }
      }
    },
    //开始录音
    startRecord(event) {
      let reference = this
      reference.button.buttonOne = false
      reference.button.buttonTwo = true
      event.preventDefault()
      reference.startTime = Math.round(new Date())
      // 延时后录音，避免误操作
      reference.recordTimer = setTimeout(function() {
        wx.startRecord({
          success: function() {
            console.log('录音成功')
          },
          cancel: function() {
            reference.button.buttonOne = true
            reference.button.buttonTwo = false
            console.log('用户拒绝授权录音')
          }
        })
      }, 300)
    },
    //结束录音
    stopRecord(event) {
      let reference = this
      event.preventDefault()
      // 间隔太短 小于一秒
      if (Math.round(new Date()) - reference.startTime < 1000) {
        alert('录音时间过短')
        reference.startTime = 0
        // 不录音
        clearTimeout(reference.recordTimer)
        reference.button.buttonOne = true
        reference.button.buttonTwo = false
      } else {
        // 松手结束录音
        wx.stopRecord({
          success: function(res) {
            reference.localId = res.localId
            console.log('localId:', reference.localId)
            console.log('停止录音成功')
            // 上传到服务器
            reference.uploadRecord()
          },
          fail: function(res) {
            reference.button.buttonOne = true
            reference.button.buttonTwo = false
            console.log('==========')
            console.log(JSON.stringify(res))
          }
        })
      }
    },
    // 上传录音
    uploadRecord() {
      let reference = this
      wx.uploadVoice({
        localId: reference.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
          let serverId = res.serverId // 返回音频的服务器端ID
          console.log('微信上传录音成功')
          console.log('serverId:', serverId)
          reference.downVoice(serverId)
          reference.getMp3URL(serverId)
          reference.save()
        },
        fail: function(res) {
          reference.button.buttonOne = true
          reference.button.buttonTwo = false
          console.log('上传到微信服务器异常', res)
        }
      })
    },
    //下载语音
    downVoice(serverId) {
      let reference = this
      wx.downloadVoice({
        serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          console.log('xiazaichenggong')
          console.log(res)
          console.log('============')
        }
      })
    },
    // 获取mp3文件路径
    getMp3URL(serverId) {
      let reference = this
      let query = '?belong=WorldCup2018&media_id=' + serverId
      this.$http
        .get(this.filter_url + this.userId + '/games' + query)
        .then(res => {
          console.log(res)
          if (window.location.search.indexOf('type=') < 0) {
            reference.wxShareInfoValue.link =
              reference.wxShareInfoValue.link +
              '&type=WeChat&serverId=' +
              serverId
            //重新加载微信分享
            reference.handleWxReady()
          }
          console.log('获取文件成功')
          reference.button.buttonTwo = false
          reference.button.buttonThree = true
          console.log(reference.button)
          console.log('============')
        })
        .catch(err => {
          console.log('获取文件失败')
          console.log(err)
        })
    },
    // 保存到parseService
    save() {
      let reference = this
      parseService
        .post(REQ_URL + 'zq', this.params)
        .then(res => {
          reference.button.buttonTwo = false
          reference.button.buttonThree = true
          alert('保存录音成功')
        })
        .catch(err => {
          reference.button.buttonOne = true
          reference.button.buttonTwo = false
          console.log('保存录音失败')
        })
    },
    // 查询parseService
    query() {
      let query = {
        ID: this.params.ID + ''
      }
      parseService
        .get(REQ_URL + 'zq?where=' + JSON.stringify(query))
        .then(data => {
          if (data.results.length > 0) {
            //获取服务器mp3路径
            this.getMp3URL(data.results[0].serverId)
          }
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    playRecord() {
      console.log('播放音乐')
      this.playAudio()
    },
    playAudio() {
      let mbtn = document.getElementById('mbtn')
      let voice = document.getElementById('voice')
      if (!voice) {
        return
      }
      //调用 <audio> 元素提供的方法 play()
      voice.play()
      //判斷 WeixinJSBridge 是否存在
      if (
        typeof WeixinJSBridge == 'object' &&
        typeof WeixinJSBridge.invoke == 'function'
      ) {
        voice.play()
      } else {
        //監聽客户端抛出事件"WeixinJSBridgeReady"
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            function() {
              voice.play()
            },
            false
          )
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', function() {
            voice.play()
          })
          document.attachEvent('onWeixinJSBridgeReady', function() {
            voice.play()
          })
        }
      }
      //voiceStatu用來記録狀態,使 touchstart 事件只能觸發一次有效,避免與 click 事件衝突
      var voiceStatu = true
      //监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
      document.addEventListener(
        'touchstart',
        function(e) {
          if (voiceStatu) {
            voice.play()
            voiceStatu = false
          }
        },
        false
      )
    },
    // 是否微信分享
    isShare() {
      if (
        this.$route.query.type != null &&
        this.$route.query.type != undefined &&
        this.$route.query.serverId != null &&
        this.$route.query.serverId != undefined
      ) {
        this.button.buttonOne = false
        this.button.buttonThree = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/autumnWord/';
.root {
  width: 100%;
  position: relative;
  text-align: center;
  overflow-x: hidden;
  img {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .mplay {
    animation: mycir 2s linear infinite;
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .t-1 {
    width: 100%;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .t1 {
      width: 100%;
    }
  }
  .t-2 {
    width: 100%;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .t2-1 {
      width: 90%;
      margin-left: -8%;
    }
    .leaf-1 {
      width: 12%;
      position: absolute;
      right: 0;
      top: 24%;
      animation: leaf 2s ease-out infinite forwards;
    }
    .leaf-2 {
      width: 9%;
      position: absolute;
      left: 7%;
      top: 0;
      animation: leaf 2s ease-out infinite forwards;
    }
    .button-1,
    .button-2,
    .button-3 {
      width: 100%;
      margin: 0 auto;
      position: absolute;
      left: 0;
      top: 0;
      padding: 5% 0;
      -webkit-user-select: auto;
      pointer-events: auto;
      .p-1 {
        width: 48%;
      }
      .b-1 {
        width: 60%;
        margin-top: 3%;
      }
      .wifi {
        width: 7%;
        position: absolute;
        left: 27%;
        top: 47%;
      }
    }
  }
  .t-3 {
    width: 100%;
    margin: 5% 0;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .t3-1 {
      width: 85%;
    }
    .leaf-3 {
      width: 10%;
      position: absolute;
      right: 3%;
      top: -1%;
      animation: leaf 2s ease-out infinite forwards;
    }
    .leaf-4 {
      width: 7%;
      position: absolute;
      left: 5%;
      top: -7%;
      animation: leaf 2s ease-out infinite forwards;
    }
    .leaf-5 {
      width: 12%;
      position: absolute;
      left: 4%;
      top: 24%;
      animation: leaf 2s ease-out infinite forwards;
    }
    .leaf-6 {
      width: 8%;
      position: absolute;
      right: 6%;
      top: 50%;
      animation: leaf 2s ease-out infinite forwards;
    }

    .photo {
      width: 68%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 4%);
      border-radius: 5%;
      user-select: auto;
      pointer-events: auto;
    }
    .jiantou {
      width: 100%;
      margin: 0 auto;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 2;
      animation: arrow 1.2s linear infinite alternate;
      .arrow {
        width: 7%;
        display: block;
        position: absolute;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 27%);
      }
      .prompt {
        width: 60%;
        display: block;
        position: absolute;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 154%);
      }
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}
@keyframes leaf {
  from {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.3, 1.3);
  }
  to {
    transform: scale(1.1, 1.1);
  }
}
</style>
