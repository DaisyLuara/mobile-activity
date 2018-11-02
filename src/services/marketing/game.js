import axios from 'axios'
import { apiToken, Cookies } from 'services'
const GAME_URL = process.env.SAAS_API + '/user/'
const GAME_LIST_URL = process.env.SAAS_API + '/user/'
const REQ_HEADER = {
  headers: {
    withCredentials: true
  }
}

const createGame = (params, userId) => {
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
  params.game_attribute_payload = Cookies.get('game_attribute_payload')
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

export { createGame, getGame, userGame }
