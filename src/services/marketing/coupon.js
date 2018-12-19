import axios from 'axios'
import { apiToken, Cookies } from 'services'

const COUPOU_URL = process.env.SAAS_API + '/marketing/coupons'
const V4_COUPOU_URL = process.env.SAAS_API + '/v4/common/coupon'
const V5_COUPOU_URL = process.env.SAAS_API + '/v5/common/coupon'
const COUPOUS_URL = process.env.AD_API + '/api/open/coupons/'
const OPEN_COUPON = process.env.AD_API + '/api/open/coupon/'
const OPEN_USER_COUPON = process.env.AD_API + '/api/open/user/coupon'
const MALLCOO_API = process.env.AD_API + '/api/mallcoo/user/oauth'

const OPEN_COUPON_PROJECT = process.env.AD_API + '/api/open/project'
const IMAGE_UPLOAD = process.env.AD_API + '/api/images'

const MINI_API = process.env.AD_API + '/api/mini'

const REQ_HEADER = {
  headers: {
    'api-token': apiToken,
    'Set-Cookie': 'sign=' + Cookies.get('sign')
  }
}
const handleParma = params => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
  params.sign = Cookies.get('sign')
}
const createCoupon = params => {
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(COUPOU_URL, params, REQ_HEADER)
      .then(response => {
        if (response.data.success) {
          resolve(response.data.data)
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getCoupon = couponIds => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        process.env.STORE_API +
        '/rest/coupon/batch?coupon_batch_ids=' +
        couponIds.join(',')
      )
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const createV4Coupon = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(V4_COUPOU_URL, params)
      .then(response => {
        if (response.data.success) {
          resolve(response.data.data)
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 优惠券绑定
const bindV4Coupon = params => {
  return new Promise((resolve, reject) => {
    axios
      .put(V4_COUPOU_URL, params)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
const sendV4CouponSms = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(V4_COUPOU_URL + '/sms', params)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getV4CouponCount = couponId => {
  return new Promise((resolve, reject) => {
    axios
      .get(V4_COUPOU_URL + '/capacity/' + couponId)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const createV5Coupon = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(V5_COUPOU_URL, params)
      .then(response => {
        if (response.data.success) {
          resolve(response.data.data)
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
//根据积分获取券
const getAdCoupon = (params, id) => {
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(COUPOUS_URL + id, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 确认优惠券是否已经领完
const checkCouponNumber = couponId => {
  let params = {}
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(OPEN_COUPON + 'batches/' + couponId, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//  发优惠券
const sendCoupon = (params, couponId) => {
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(COUPOUS_URL + couponId, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 概率获取优惠券ID（coupinId）
const getCouponId = policyId => {
  let params = {}
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(OPEN_COUPON + 'batches?policy_id=' + policyId, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//获取券的信息（包括判断是否用手机号领过券）
const checkGetCoupon = params => {
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(OPEN_USER_COUPON, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//获取节目抽奖信息
const getCouponProjectMessage = belong => {
  return new Promise((resolve, reject) => {
    axios
      .get(OPEN_COUPON_PROJECT + '/policy?belong=' + belong, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 上传照片接口
const getImage = params => {
  params.append('sign', Cookies.get('sign'))
  if (Cookies.get('game_attribute_payload')) {
    params.append(
      'game_attribute_payload',
      Cookies.get('game_attribute_payload')
    )
  }
  return new Promise((resolve, reject) => {
    axios
      .post(IMAGE_UPLOAD, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

//猫酷授权
const getMallcooOauth = params => {
  handleParma(params)
  return new Promise((resolve, reject) => {
    axios
      .post(MALLCOO_API, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const bindCouponMini = (couponId, z) => {
  return new Promise((resolve, reject) => {
    const requestUrl = MINI_API + '/user/coupon_batch/' + couponId
    const requestParams = {
      z: z
    }
    axios.post(requestUrl, requestParams, REQ_HEADER).then(response => {
      resolve(response)
    }).catch(e => {
      reject(e)
    })
  })
}

const getConponMini = (couponId, z) => {
  return new Promise((resolve, reject) => {
    const requestUrl = MINI_API + '/coupon/batches/' + couponId
    const requestParams = {
      params: {
        include: 'company'
      },
      ...REQ_HEADER
    }
    axios.get(requestUrl, requestParams).then(r => {
      resolve(r)
    }).catch(e => {
      reject(e)
    })
  })
}

const getMallListMini = (z, page, per_page, oid) => {
  return new Promise((resolve, reject) => {
    const requestUrl = MINI_API + '/coupon/batches'
    const requestParams = {
      params: {
        include: 'company',
        z: z,
        page: page,
        per_page: per_page,
        oid: oid
      },
      ...REQ_HEADER
    }
    axios
      .get(requestUrl, requestParams).then(r => {
        resolve(r)
      }).catch(e => {
        reject(e)
      })
  })
}

const getWalletListMini = (z) => {
  return new Promise((resolve, reject) => {
    const requestUrl = MINI_API + '/user/coupons'
    const requestParams = {
      params: {
        z: z,
        include: 'couponBatch'
      },
      ...REQ_HEADER
    }
    axios
      .get(requestUrl, requestParams).then(r => {
        resolve(r)
      }).catch(e => {
        reject(e)
      })
  })
}

const getCouponQRCodeMini = (code, z) => {
  return new Promise((resolve, reject) => {
    let requestUrl = MINI_API + '/user/coupons/' + code
    let requestParams = {
      params: {
        z: z,
        size: 200,
      },
      ...REQ_HEADER
    }
    axios
      .get(requestUrl, requestParams)
      .then(r => {
        resolve(r)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export {
  createCoupon,
  getCoupon,
  createV4Coupon,
  bindV4Coupon,
  sendV4CouponSms,
  getV4CouponCount,
  createV5Coupon,
  getAdCoupon,
  checkCouponNumber,
  getCouponId,
  checkGetCoupon,
  getCouponProjectMessage,
  sendCoupon,
  getImage,
  getMallcooOauth,
  bindCouponMini,
  getConponMini,
  getMallListMini,
  getWalletListMini,
  getCouponQRCodeMini
}
