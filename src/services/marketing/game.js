import axios from 'axios'

const GAME_URL = process.env.SAAS_API + '/user/game'
const GAME_LIST_URL = process.env.SAAS_API + '/user/games'

const createGame = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(GAME_URL, params)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getGame = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(GAME_LIST_URL)
      .then(response => {
        resolve(response.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export { createGame, getGame }
