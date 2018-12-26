import axios from 'axios'
import { apiToken, Cookies } from 'services'
const GAME_URL = process.env.SAAS_API + '/user/'
const GAME_LIST_URL = process.env.SAAS_API + '/user/'
const REGISTER_URL = process.env.AD_API + '/api/temp/customer'
const NEW_LIST_NOCHECK = 'http://exelook.com/client/h5/awardlist/?api=json'
const NEW_LIST_NEEDCHECK = 'http://exelook.com/client/all/awardpass/?api=json'
const REQ_HEADER = {
  headers: {
    'api-token': apiToken,
    'Set-Cookie': 'sign=' + Cookies.get('sign')
  }
}

const createGame = (params, userId) => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL + userId + '/game', params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const userGame = (params, userId) => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL + userId + '/game_attribute', params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getGame = (params, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GAME_LIST_URL + userId + '/games', params, REQ_HEADER)
      .then(response => {
        resolve(response.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//同一游戏不同场景
const getSceneData = (userId, url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GAME_LIST_URL + userId + '/games' + url, params, REQ_HEADER)
      .then(response => {
        resolve(response.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//保存临时用户信息
const userData = params => {
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .post(REGISTER_URL, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//排行榜新接口 akey  http://exelook.com/client/h5/awardlist/?akey=2043162232&cp=1&size=100&api=json  不需要用户确定，自动排行
const newGameList = akey => {
  return new Promise((resolve, reject) => {
    axios
      .get(NEW_LIST_NOCHECK + '&akey=' + akey)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//排行榜新接口 awardinfo结构体中，pass==0或者valuetmp!=value的时候，则代表需要参与者点击确认 http://exelook.com/client/all/awardpass/?auid=442&z=4fk2d91686b0fcef93b6e594689846cb4631n5&api=json
const gameListNeedCheck = (auid, z) => {
  return new Promise((resolve, reject) => {
    axios
      .get(NEW_LIST_NEEDCHECK + '&auid=' + auid + '$z=' + z)
      .then(response => {
        console.log(NEW_LIST_NEEDCHECK + '&auid=' + auid + '$z=' + z)
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export {
  createGame,
  getGame,
  userGame,
  getSceneData,
  userData,
  newGameList,
  gameListNeedCheck
}
