import axios from 'axios'
import { apiToken, Cookies } from 'services'
const GAME_URL = process.env.SAAS_API + '/user/'
const GAME_LIST_URL = process.env.SAAS_API + '/user/'
const REGISTER_URL = process.env.SAAS_API + '/temp/customer'
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

export { createGame, getGame, userGame, getSceneData, userData }
