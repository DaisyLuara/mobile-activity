const MARKETING_API = process.env.SAAS_API;
const PLAY_RESULT_API = '/open/play/playResults/';

export default {
  getPlayResultById(context, id){
    return new Promise((resolve, reject) => {
      context.$http.get(MARKETING_API + PLAY_RESULT_API + id).then(res =>{
        if(res.data.success){
          resolve(res.data.data)
        }else{
          reject(res.data.message)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
