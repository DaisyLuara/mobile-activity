const WX_API = process.env.WX_API
import { Cookies } from 'services'
import axios from 'axios'

const getWxUserInfo = () => {
  let url = WX_API + '/wx/officialAccount/user?v=' + new Date().getTime()
  return new Promise((resolve, reject) => {
    let userId = Cookies.get('user_id')
    let params = {
      params: {
        user_id: userId
      },
      withCredentials: true
    }
    axios
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

export { getWxUserInfo }
