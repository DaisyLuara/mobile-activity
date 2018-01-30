<template>
  <div></div>
</template>
<script>
  import { is_weixin } from './util';
  const wx = require('weixin-js-sdk');
  export default {
    props: ['WxShareInfo'],
    created() {
      if(Object.keys(this.WxShareInfo).length > 1){
        this.init();
      }
    },
    methods: {
      init() {
        if (is_weixin() === true) {
          let request_url = process.env.WX_API + '/wx/officialAccount/sign';
          this.$http.get(request_url).then( response => {
            let resData = response.data.data;
            let wx_config = {
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
            };
            wx.config(wx_config);
            this.wxShare(this.WxShareInfo);

          })
        }
      },
      wxShare(shareInfo) {
        wx.ready(function() {
          wx.onMenuShareAppMessage(shareInfo);
          wx.onMenuShareTimeline(shareInfo);
          wx.onMenuShareQQ(shareInfo);
          wx.onMenuShareWeibo(shareInfo);
          wx.onMenuShareQZone(shareInfo);
        })
      }
    },
    watch: {
      'WxShareInfo.title': function() {
        this.init();
      },
      'WxShareInfo.desc': function(){
        this.init();
      },
      'WxShareInfo.imgUrl': function(){
        this.init();
      },
      'WxShareInfo.link': function(){
        this.init();
      },
      'WxShareInfo.success': function(){
        this.init();
      },
      'WxShareInfo.cancel': function(){
        this.init();
      }
    }

  }
</script>
