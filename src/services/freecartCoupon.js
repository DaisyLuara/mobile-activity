const COUPOU_URL = process.env.STORE_API + '/rest/appointment/tracking';

export default {
  createCoupon(context, params) {
    return new Promise((resolve, reject) => {
      context.$http.post(COUPOU_URL, params).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      })
    })
  },
  getCoupon(context, coupon_ids) {
    return new Promise((resolve, reject) => {
      context.$http.get( process.env.STORE_API + '/rest/coupon/batch?coupon_batch_ids=' + coupon_ids.join(',')).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      })
    })
  }
}
