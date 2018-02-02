const COUPOU_URL = process.env.SAAS_API + '/marketing/coupons';
const V4_COUPOU_URL = process.env.SAAS_API + '/v4/common/coupon';
export default {
  createCoupon(context, params) {
    return new Promise((resolve, reject) => {
      context.$http.post(COUPOU_URL, params).then(response => {
        if (response.data.success) {
          resolve(response.data.data)
        } else {
          reject(response)
        }
      }).catch(err => {
        reject(err);
      })
    })
  },
  createV4Coupon(context, params) {
    return new Promise((resolve, reject) => {
      context.$http.post(V4_COUPOU_URL, params).then(response => {
        if (response.data.success) {
          resolve(response.data.data)
        } else {
          reject(response)
        }
      }).catch(err => {
        reject(err);
      })
    })
  },
  //优惠券绑定
  bindV4Coupon(context, params) {
    return new Promise((resolve, reject) => {
      context.$http.put(V4_COUPOU_URL, params).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err);
      })
    })
  },
  sendV4CouponSms(context, params) {
    return new Promise((resolve, reject) => {
      context.$http.post(V4_COUPOU_URL + '/sms', params).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err);
      })
    })
  },
  getV4CouponCount(context, coupon_id) {
    return new Promise((resolve, reject) => {
      context.$http.get(V4_COUPOU_URL + '/capacity/' + coupon_id).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err);
      })
    })
  }
}