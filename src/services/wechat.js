import wx from 'weixin-js-sdk'
import axios from 'axios'

const share = shareObject => {
  // utm_term 为分享统计标记
  let link =
    window.location.href.indexOf('?') > -1
      ? window.location.href + `&share_at=${Date.now()}&utm_term=wechat_share`
      : window.location.href + `?share_at=${Date.now()}&utm_term=wechat_share`
  shareObject.link = link

  // 显示所有功能接口
  // wx.showAllNonBaseMenuItem()

  wx.onMenuShareAppMessage(shareObject)
  wx.onMenuShareTimeline(shareObject)
  wx.onMenuShareQQ(shareObject)
  wx.onMenuShareWeibo(shareObject)
  wx.onMenuShareQZone(shareObject)
}

const forbidden = () => {
  // 禁止分享
  wx.hideOptionMenu()
  wx.hideMenuItems({
    menuList: [
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  })
}

const $_wechat = () => {
  return new Promise((resolve, reject) => {
    let requestUrl = process.env.WX_API + '/wx/officialAccount/sign'
    axios
      .get(requestUrl)
      .then(response => {
        // sign返回格式
        let r = response.data.data
        wx.config({
          debug: false,
          appId: r.appId,
          timestamp: r.timestamp,
          nonceStr: r.nonceStr,
          signature: r.signature,
          jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'hideOptionMenu'
          ]
        })
        wx.ready(() => {
          // 配置 wx.config 成功
          resolve({
            wx,
            share,
            forbidden
          })
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 书写示例

// 分享
// $_wechat()
//   .then(res => {
//     res.share({
//       // 配置分享
//       title: 'wechat-spa',
//       desc: 'Wechat SPA',
//       link: window.location.href,
//       imgUrl: 'https://www.baidu.com/img/bd_logo1.png',
//       不要忘记加入success回调统计分享成功
//       success: function() {
//         customTrack.shareWeChat()
//       }
//     })
//   })
//   .catch(_ => {
//     console.warn(_.message)
//   })

// 禁止分享
// $_wechat()
//   .then(res => {
//     res.forbidden()
//   })
//   .catch(_ => {
//     console.warn(_.message)
//   })

export { $_wechat }
