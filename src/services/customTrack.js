const customTrack = {
  ad_id: '',
  mobileRecords: process.env.SAAS_API + '/open/track/mobileRecords',
  play_result_id: ''
};
/**
 *   customTrack send function
 *     push event to piwik
 *   @param  {[string]}  [类别]
 *   @param  {[string]}  [值]
 */
console.log(process.env.SAAS_API)
  //获得url中的参数
function GetRequest() {
  var url = window.location.href.split('?')[1]; //获取url中"?"符后的字串  
  var theRequest = new Object();
  if (url.indexOf("?") == -1) {
    var str = url;
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
var req = GetRequest();
customTrack.ad_id = req['ad_id'];
customTrack.play_result_id = req['recordId'];
// mobile保存的方法
function mobileRecords(mobileValue) {
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
  if (customTrack.ad_id && customTrack.play_result_id) {
    mobileRecords(mobileValue);
    if (_paq) {
      _paq.push(['trackEvent', customTrack.ad_id, customTrack.ad_id, 'submit_mobile_200'])
    }
  }
}

customTrack.shareWeChat = function() {
  if (customTrack.ad_id) {
    if (_paq) {
      _paq.push(['trackEvent', customTrack.ad_id, customTrack.ad_id, 'share_page_wechat_300'])
    }
  }
}
export { customTrack };