import axios from 'axios'

const fetchTopics = payload => {
  const url = 'http://xingstation.cn/client/h5/avoptions'
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
  const url = 'http://xingstation.cn/client/h5/avoptionstate/'
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
