const baseUrl = process.env.EXE_API
const fetchMSiteBanners = (_this, payload) => {

  const url = `${baseUrl}/h5/banner/`
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