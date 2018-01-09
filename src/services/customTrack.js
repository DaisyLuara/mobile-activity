const customTrack = {};
/**
 *   customTrack send function
 *     push event to piwik
 *   @param  {[string]}  [类别]
 *   @param  {[string]}  [值]
 */
customTrack.sendMobile = function(categoryId, mobileValue) {
  if (_paq) {
    _paq.push(['trackEvent', categoryId + '_mobile', categoryId + '_action', categoryId + '_手机号码', mobileValue])
  }
}

customTrack.shareWeChat = function(categoryId, actionName) {
  if (_paq) {
    _paq.push(['trackEvent', categoryId + '_share', categoryId + '_share_action', categoryId + '_微信分享', actionName])
  }
}
export { customTrack };