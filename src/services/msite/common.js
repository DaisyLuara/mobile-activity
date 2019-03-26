const fetchMSiteBanners = (_this, payload) => {
  const url = 'http://xingstation.cn/client/h5/banner/'
  const params = {
    params: {
      ...payload
    }
  }
  return new Promise((resolve, reject) => {
    _this.$http.get(url, params).then(r => {
      resolve(r)
    }).catch(e => {
      reject(e)
    })
  })
}



export { fetchMSiteBanners } 