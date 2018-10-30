import { $wechat, getInfoById, isInWechat, wechatShareTrack } from 'services'
const cdnUrl = process.env.CDN_URL
export const normalPages = {
  data() {
    return {
      baseUrl: cdnUrl,
      photo: null,
      wxShareInfoValue: {
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
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
