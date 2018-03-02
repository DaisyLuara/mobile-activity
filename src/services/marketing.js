const MARKETING_API = process.env.SAAS_API;
const PLAY_RESULT_API = '/open/play/playResults/';
const IMAGE_API= 'http://exelook.com:8010/goodsxsd/?api=json&id=';

export default {
  getPlayResultById(context, id) {
    return new Promise((resolve, reject) => {
      context.$http.get(MARKETING_API + PLAY_RESULT_API + id).then((res) => {
        if (res.data.success) {
          resolve(res.data.data);
        } else {
          reject(res.data.message);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getImageById(context, id) {
    let promise = new Promise((resolve, reject) => {
      context.$http.get(IMAGE_API + id).then((response) => {
        if (response.status === 200) {
          if (response.data.state === '1') {
            console.log(response);
            resolve(response.data.results.image);
          } else {
            resolve('');
          }
        }
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  },
};
