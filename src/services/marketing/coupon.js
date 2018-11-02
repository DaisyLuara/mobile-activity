import axios from 'axios'
import { apiToken, Cookies } from 'services'

const COUPOU_URL = process.env.SAAS_API + '/marketing/coupons'
const V4_COUPOU_URL = process.env.SAAS_API + '/v4/common/coupon'
const V5_COUPOU_URL = process.env.SAAS_API + '/v5/common/coupon'
const COUPOUS_URL = process.env.AD_API + '/api/open/coupons/'
const OPEN_COUPON = process.env.AD_API + '/api/open/coupon/'
const OPEN_USER_COUPON = process.env.AD_API + '/api/open/user/coupon'

const OPEN_COUPON_PROJECT = process.env.AD_API + '/api/open/project'

const REQ_HEADER = {
  headers: {
    'api-token': apiToken,
    'Set-Cookie': 'sign=' + Cookies.get('sign')
  }
}
const createCoupon = params => {
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
  params.sign = Cookies.get('sign')
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
//根据积分获取券,修改 , 作废接口
const getIntegralCoupon = (params, couponId, userId) => {
  return new Promise((resolve, reject) => {
    if (userId) {
      axios
        .post(COUPOUS_URL + couponId + '/' + userId, params, REQ_HEADER)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    } else {
      axios
        .post(COUPOUS_URL + couponId, params, REQ_HEADER)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}
// 确认优惠券是否已经领完    发优惠券
const checkCouponNumber = couponId => {
  let params = {
    sign: Cookies.get('sign')
  }
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
const sendCoupon = couponId => {
  let params = {
    sign: Cookies.get('sign')
  }
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

// 概率获取优惠券ID（coupinId）  抽奖
const getCouponId = policyId => {
  let params = {
    sign: Cookies.get('sign')
  }
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
//判断是否用手机号领过券
const checkGetCoupon = params => {
  params.sign = Cookies.get('sign')
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
  getIntegralCoupon,
  checkGetCoupon,
  getCouponProjectMessage,
  sendCoupon
}
