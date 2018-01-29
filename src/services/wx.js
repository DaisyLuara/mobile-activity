const WX_API = process.env.WX_API;


export default {
  getWxUserInfo(context) {
    let url = WX_API + '/account/wechat/getWxUserInfo';
    return new Promise((resolve, reject) => {
      this.$http.get(url).then(res => {
        let wdata = res.data;
        resolve(wdata)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
