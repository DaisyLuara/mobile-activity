const WX_API = process.env.WX_API;


export default {
  getWxUserInfo(context) {
    let url = WX_API + '/account/wechat/getWxUserInfo';
    return new Promise((resolve, reject) => {
      context.$http.get(url).then(res => {
        let wdata = res.data;
        resolve(wdata)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getWxUserInfoByOpenId(context, openId) {
    let url = WX_API + '/wx/officialAccount/users/' + openId;
    return new Promise((resolve, reject) => {
      context.$http.get(url).then(res => {
        let wdata = res.data;
        resolve(wdata)
      }).catch(err => {
        reject(err)
      })
    })

  }
}