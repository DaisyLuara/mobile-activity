const WX_API = process.env.WX_API
import { Cookies } from 'modules/util.js'

export default {
  // getWxUserInfo(context) {
  //   let url = WX_API + '/account/wechat/getWxUserInfo';
  //   return new Promise((resolve, reject) => {
  //     context.$http.get(url).then(res => {
  //       let wdata = res.data;
  //       resolve(wdata)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },
  getWxUserInfo(context) {
    let url = WX_API + '/wx/officialAccount/user?v=' + new Date().getTime()
    return new Promise((resolve, reject) => {
      let userId = Cookies.get('user_id')
      let params = {
        params: {
          user_id: userId
        },
        withCredentials: true
      }
      context.$http
        .get(url, params)
        .then(res => {
          let wdata = res.data
          resolve(wdata)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
