import axios from 'axios'

const COUPOU_URL = process.env.SAAS_API + '/marketing/coupons'
const V4_COUPOU_URL = process.env.SAAS_API + '/v4/common/coupon'
const V5_COUPOU_URL = process.env.SAAS_API + '/v5/common/coupon'

const createCoupon = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(COUPOU_URL, params)
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

export {
  createCoupon,
  createV4Coupon,
  bindV4Coupon,
  sendV4CouponSms,
  getV4CouponCount,
  createV5Coupon
}
