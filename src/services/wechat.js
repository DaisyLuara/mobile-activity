import wx from 'weixin-js-sdk'
import axios from 'axios'

const share = shareObject => {
  let link =
    fullPath.indexOf('?') > -1
      ? window.location.href + `&share_at=${Date.now()}`
      : window.location.href + `?share_at=${Date.now()}`
  shareObject.link = link
  wx.showAllNonBaseMenuItem()
  wx.onMenuShareAppMessage(shareObject)
  wx.onMenuShareTimeline(shareObject)
  wx.onMenuShareQQ(shareObject)
  wx.onMenuShareWeibo(shareObject)
  wx.onMenuShareQZone(shareObject)
}

const $_wechat = () => {
  return new Promise((resolve, reject) => {
    let requestUrl = process.env.WX_API + '/wx/officialAccount/sign'
    axios
      .get(requestUrl)
      .then(r => {
        wx.config({
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
        })
        wx.ready(() => {
          // 配置 wx.config 成功
          resolve({
            wx,
            share
          })
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}

const wxShareForbidden = () => {}

// $_wechat()
//   .then(res => {
//     res.share({
//       // 配置分享
//       title: 'wechat-spa',
//       desc: 'Wechat SPA',
//       fullPath: '/home/index',
//       imgUrl: 'https://www.baidu.com/img/bd_logo1.png'
//     })
//   })
//   .catch(_ => {
//     console.warn(_.message)
//   })

export { $_wechat }
