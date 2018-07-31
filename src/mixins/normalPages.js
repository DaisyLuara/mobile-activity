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
    async getPhotoByRouteQueryId() {
      let id = this.$route.query.id
      let { image } = await getInfoById(id).catch(err => {
        console.warn(err.message)
      })
      this.photo = image
    }
  }
}
