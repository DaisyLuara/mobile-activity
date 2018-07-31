import { $_wechat, getInfoById, isInWechat } from 'services'
export const normalPages = {
  mounted() {
    this.handleWechatShare()
    this.getPhotoByRouteQueryId()
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $_wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      }
    },
    getPhotoByRouteQueryId() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.code
        })
        .catch(err => {
          console.warn(err.message)
        })
    }
  }
}
