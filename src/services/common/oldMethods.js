// 旧的方法
// mobile保存的方法
function mobileRecords(mobileValue) {
  console.log(mobileValue)
  $.ajax({
    url: customTrack.mobileRecords,
    data: {
      play_result_id: customTrack.play_result_id,
      mobile: mobileValue
    },
    type: 'POST',
    dataType: 'json',
    success: data => {
      console.log(data)
      console.log('保存手机号成功')
    },
    error: err => {
      console.log(err)
      console.log('保存手机号失败')
    }
  })
}

customTrack.sendMobile = mobileValue => {
  // mobileRecords(mobileValue);
  if (_paq) {
    _paq.push([
      'trackEvent',
      customTrack.adId,
      customTrack.laId,
      'submit_mobile_200_' + mobileValue
    ])
  }
}
