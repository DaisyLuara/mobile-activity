<template>
  <!-- eslint-disable -->
  <div
    class="root"
    :style="style.root"
    >
      <div class="button" @click="handleButtonClick">
        <span v-if="!isRecording">开始录音</span>
        <span v-else>正在录音</span>
      </div>
  </div>
</template>

<script>
import { isInWechat } from 'services'
const wih = window.innerHeight
const wx = require('weixin-js-sdk')

export default {
  data() {
    return {
      style: {
        root: {
          height: wih + 'px'
        }
      },
      isRecording: false,
      currentLocalId: null
    }
  },
  created() {
    this.handleWxReady()
  },
  methods: {
    handleWxReady() {
      if (isInWechat() === true) {
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
              'uploadVoice',
              'translateVoice'
            ]
          }
          wx.config(wxConfig)
        })
        wx.ready(() => {
          let that = this
          wx.onMenuShareAppMessage(this.WxShareInfo)
          wx.onMenuShareTimeline(this.WxShareInfo)
          wx.onMenuShareQQ(this.WxShareInfo)
          wx.onMenuShareWeibo(this.WxShareInfo)
          wx.onMenuShareQZone(this.WxShareInfo)
          wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function(res) {
              that.currentLocalId = res.localId
              that.handleVoiceTranslate()
            }
          })
        })
      }
    },
    handleButtonClick() {
      let that = this
      if (this.isRecording) {
        this.isRecording = !this.isRecording
        wx.stopRecord({
          success: function(res) {
            that.currentLocalId = res.localId
            that.handleVoiceTranslate()
          }
        })
      } else {
        this.isRecording = !this.isRecording
        this.handleStartRecord()
      }
    },
    handleVoiceTranslate() {
      let that = this
      wx.translateVoice({
        localId: that.currentLocalId, // 需要识别的音频的本地Id，由录音相关接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          alert(res.translateResult) // 语音识别的结果
        }
      })
    },
    handleStartRecord() {
      wx.startRecord()
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .button {
    height: 200px;
    width: 200px;
    border: 1px solid black;
    line-height: 200px;
    text-align: center;
  }
}
</style>
