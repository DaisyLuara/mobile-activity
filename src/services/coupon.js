const COUPOU_URL = process.env.SAAS_API + '/marketing/coupons';

export default {
  createCoupon(context, params) {
    return new Promise((resolve, reject) => {
      context.$http.post(COUPOU_URL, params).then(response => {
        if(response.data.success){
          resolve(response.data.data)
        }else{
          reject(response)
        }
      }).catch(err => {
        reject(err);
      })
    })
  }
}
