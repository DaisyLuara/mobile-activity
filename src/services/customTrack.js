const customTrack = {
  // ad_id: this.$query.ad_id
};

/**
 *   customTrack send function
 *     push event to piwik
 *   @param  {[string]}  [类别]
 *   @param  {[string]}  [值]
 */

customTrack.sendMobile = function(categoryId, mobileValue) {
  if (_paq) {
    _paq.push(['trackEvent', categoryId, categoryId, 'submit_mobile_200'])
  }
}

customTrack.shareWeChat = function(categoryId) {
  if (_paq) {
    _paq.push(['trackEvent', categoryId, categoryId, 'share_page_wechat_300'])
  }
}
export { customTrack };