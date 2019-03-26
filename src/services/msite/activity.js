import axios from 'axios'

const fetchActivityDetail = (_this, payload) => {
  const url = 'http://xingstation.cn/client/all/actinfo/'
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
  const url = 'http://xingstation.cn/client/h5/useractivity/'
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
  const url = 'http://xingstation.cn/client/all/actinfo/'
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
  const url = 'http://xingstation.cn/client/all/actresult/'
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
  const url = 'http://xingstation.cn/client/h5/awardview/'
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
  const url = 'http://xingstation.cn/client/h5/actpi/'
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

// 0175.物件列表
const fetchAllGoodsList = (payload) => {
  const url = 'http://xingstation.cn/client/all/goods/'
  const params = {
    params: {
      ...payload
    }
  }
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(r => {
      resolve(r)
    }).catch(e => {
      reject(e)
    })
  })
}

// 0176.H5 发表祝福
const sendGreetings = (payload) => {
  const url = 'http://xingstation.cn/client/h5/birthday/'
  const params = {
    params: {
      ...payload
    }
  }
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(r => {
      resolve(r)
    }).catch(e => {
      reject(e)
    })
  })
}

export { fetchShopActivityList, fetchActivityDetail, fetchShopActivityDetail, fetchShopActivityProgress, handleH5SaasVote, inShopActivityAward, fetchAllGoodsList, sendGreetings }