<template>
  <div></div>
</template>
<script>
  import { isWeixin } from './util';

  const wx = require('weixin-js-sdk');

  export default {
    props: ['WxShareInfo'],
    created() {
      if (Object.keys(this.WxShareInfo).length > 1) {
        this.init();
      }
    },
    methods: {
      init() {
        if (isWeixin() === true) {
          let requestUrl = process.env.WX_API + '/wx/officialAccount/sign';
          this.$http.get(requestUrl).then((response) => {
            let resData = response.data.data;
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
              ],
            };
            wx.config(wxConfig);
            this.wxShare(this.WxShareInfo);
          });
        }
      },
      wxShare(shareInfo) {
        wx.ready(() => {
          wx.onMenuShareAppMessage(shareInfo);
          wx.onMenuShareTimeline(shareInfo);
          wx.onMenuShareQQ(shareInfo);
          wx.onMenuShareWeibo(shareInfo);
          wx.onMenuShareQZone(shareInfo);
        });
      },
    },
    watch: {
      'WxShareInfo.title': () => {
        this.init();
      },
      'WxShareInfo.desc': () => {
        this.init();
      },
      'WxShareInfo.imgUrl': () => {
        this.init();
      },
      'WxShareInfo.link': () => {
        this.init();
      },
      'WxShareInfo.success': () => {
        this.init();
      },
      'WxShareInfo.cancel': () => {
        this.init();
      },
    },
  };
</script>
