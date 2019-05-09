import axios from 'axios'
import { apiToken, Cookies } from 'services'
const GAME_URL = process.env.SAAS_API + '/user/game'
const Accept = 'application/vnd.saas.v2+json'

const REQ_HEADER = {
  headers: {
    'api-token': apiToken,
    'Set-Cookie': 'sign=' + Cookies.get('sign')
  }
}
const V2_HEADER = {
  headers: {
    Accept: Accept
  }
}
const initUserGame = (params) => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
	}
	if (Cookies.get('sign')) {
    params.sign = Cookies.get('sign')
  }
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL + '/init', params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const userGameConfig = (params) => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
	if (Cookies.get('sign')) {
    params.sign = Cookies.get('sign')
  }
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL + '/config', params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const postUserGame = (params) => {
	if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
	if (Cookies.get('sign')) {
    params.sign = Cookies.get('sign')
  }
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL, params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const userGameRank = (params) => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
	if (Cookies.get('sign')) {
    params.sign = Cookies.get('sign')
  }
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL + '/rank', params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const userGameShare = (params) => {
  if (Cookies.get('game_attribute_payload')) {
    params.game_attribute_payload = Cookies.get('game_attribute_payload')
  }
  if (Cookies.get('sign')) {
    params.sign = Cookies.get('sign')
  }
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL + '/share', params, REQ_HEADER)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export {
  initUserGame,
  userGameConfig,
	postUserGame,
	userGameRank,
	userGameShare
}
