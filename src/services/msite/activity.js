const fetchActivityDetail = (_this, payload) => {
  const url = 'http://exelook.com/client/all/actinfo/'
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

const fetchShopActivityList = (_this, payload) => {
  const url = 'http://exelook.com/client/h5/useractivity/'
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

// 0157.活动详情
const fetchShopActivityDetail = (_this, payload) => {
  const url = 'http://exelook.com/client/all/actinfo/'
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

export { fetchShopActivityList, fetchActivityDetail, fetchShopActivityDetail }