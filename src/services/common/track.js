import axios from 'axios'

const handleTrack = (id, phoneNumber) => {
  let url =
    'http://exelook.com/client/goodsxsd/?id=' +
    String(id) +
    '&mobile=' +
    String(phoneNumber) +
    '&api=json'
  axios.get(url).then(r => {
    console.log('ok')
  })
}

export { handleTrack }
