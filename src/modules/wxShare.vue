<template>
  <div></div>
</template>
<script>
import { isWeixin } from './util'

const wx = require('weixin-js-sdk')

export default {
  props: ['WxShareInfo'],
  created() {
    if (Object.keys(this.WxShareInfo).length > 1) {
      this.init()
    }
  },
  methods: {
    init() {
      if (isWeixin() === true) {
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
              'onMenuShareQZone'
            ]
          }
          wx.config(wxConfig)
          // this.wxShare(this.WxShareInfo);
          if (this.WxShareInfo.link) {
            this.WxShareInfo.link += '&utm_term=wechat_share'
          } else {
            this.WxShareInfo.link =
              window.location.href + '&utm_term=wechat_share'
          }
          wx.ready(() => {
            wx.onMenuShareAppMessage(this.WxShareInfo)
            wx.onMenuShareTimeline(this.WxShareInfo)
            wx.onMenuShareQQ(this.WxShareInfo)
            wx.onMenuShareWeibo(this.WxShareInfo)
            wx.onMenuShareQZone(this.WxShareInfo)
          })
        })
      }
    },
    wxShare() {
      wx.onMenuShareAppMessage(this.WxShareInfo)
      wx.onMenuShareTimeline(this.WxShareInfo)
      wx.onMenuShareQQ(this.WxShareInfo)
      wx.onMenuShareWeibo(this.WxShareInfo)
      wx.onMenuShareQZone(this.WxShareInfo)
    }
  },
  watch: {
    'WxShareInfo.title': function() {
      this.wxShare()
    },
    'WxShareInfo.desc': function() {
      this.wxShare()
    },
    'WxShareInfo.imgUrl': function() {
      this.wxShare()
    },
    'WxShareInfo.link': function() {
      this.wxShare()
    },
    'WxShareInfo.success': function() {
      this.wxShare()
    },
    'WxShareInfo.cancel': function() {
      this.wxShare()
    }
  }
}
</script>
