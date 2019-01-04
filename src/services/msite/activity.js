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

// 0158.活动最近一期参与列表
const fetchShopActivityProgress = (_this, payload) => {
  const url = 'http://exelook.com/client/all/actresult/'
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

// 0161.H5 Saas参与投票
const handleH5SaasVote = (_this, payload) => {
  const url = 'http://exelook.com/client/h5/awardview/'
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

// 0162.H5 Saas活动报名
const inShopActivityAward = (_this, payload) => {
  const url = 'http://exelook.com/client/h5/actpi/'
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

export { fetchShopActivityList, fetchActivityDetail, fetchShopActivityDetail, fetchShopActivityProgress, handleH5SaasVote, inShopActivityAward }