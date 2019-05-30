import axios from 'axios'
const baseUrl = process.env.EXE_API

const fetchTopics = payload => {
  const url = `${baseUrl}/h5/avoptions`
  const params = {
    params: {
      ...payload
    }
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(r => {
        resolve(r)
      })
      .catch(e => reject(e))
  })
}

const optionsVote = payload => {
  const url = `${baseUrl}/h5/avoptionstate/`
  const params = {
    params: {
      ...payload
    }
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(r => {
        resolve(r)
      })
      .catch(e => reject(e))
  })
}

export { fetchTopics, optionsVote }
