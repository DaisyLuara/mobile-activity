import { $_wechat, isInWechat } from 'services'
export const onlyWechatShare = {
  mounted() {
    this.handleWechatShare()
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
      } else {
        console.warn('you r not in wechat environment')
      }
    }
  }
}
