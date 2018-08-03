import { $wechat, getInfoById, isInWechat } from 'services'
export const normalPages = {
  mounted() {
    this.handleWechatShare()
    this.getPhotoByRouteQueryId()
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      } else {
        console.warn('you r not in wechat environment')
      }
    },
    async getPhotoByRouteQueryId() {
      try {
        let id = this.$route.query.id
        let { image } = await getInfoById(id)
        this.photo = image
      } catch (e) {
        console.warn(e.message)
      }
    }
  }
}
