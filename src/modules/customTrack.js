const customTrack = {
  adId: 100,
  mobileRecords: process.env.SAAS_API + '/open/track/mobileRecords',
  play_result_id: 0,
  laId: 100
};
/**
 *   customTrack send function
 *     push event to piwik
 *   @param  {[string]}  [类别]
 *   @param  {[string]}  [值]
 */
//获得url中的参数
function GetRequest() {
  var url = window.location.href.split('?')[1]; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url) {
    if (url.indexOf("?") == -1) {
      var str = url;
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
  }
  return theRequest;
}

var req = GetRequest();

customTrack.adId = req['adId'] | undefined ? req['adId'] : 100;
customTrack.laId = req['laId'] | undefined ? req['laId'] : 100;
customTrack.play_result_id = req['recordId'] ? req['recordId'] : 0;
console.log(customTrack)

// mobile保存的方法
function mobileRecords(mobileValue) {
  console.log(mobileValue)
  $.ajax({
    url: customTrack.mobileRecords,
    data: {
      "play_result_id": customTrack.play_result_id,
      "mobile": mobileValue
    },
    type: 'POST',
    dataType: 'json',
    success: function(data) {
      console.log(data)
      console.log('保存手机号成功');
    },
    error: function(err) {
      console.log(err);
      console.log('保存手机号失败');
    }
  })
}


customTrack.sendMobile = function(mobileValue) {
  mobileRecords(mobileValue);
  console.log(customTrack)
  if (_paq) {
    _paq.push(['trackEvent', customTrack.adId, customTrack.laId, 'submit_mobile_200'])
  }
}

customTrack.shareWeChat = function() {
  if (_paq) {
    _paq.push(['trackEvent', customTrack.adId, customTrack.laId, 'share_page_wechat_300'])
  }
}
export { customTrack };