const WX_API = process.env.WX_API;


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
    let url = WX_API + '/wx/officialAccount/user?v=' + new Date().getTime();
    return new Promise((resolve, reject) => {
      context.$http.get(url, { withCredentials: true }).then((res) => {
        let wdata = res.data;
        resolve(wdata);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};
