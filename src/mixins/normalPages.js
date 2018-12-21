import {
  $wechat,
  getInfoById,
  isInWechat,
  splitParms
} from 'services'
const cdnUrl = process.env.CDN_URL
export const normalPages = {
  data() {
    return {
      baseUrl: cdnUrl,
      belong: null,
      photo: null,
      oid: null,
      parms: null,
      gender: null,
      score: null,
      coupon_batch_id: null,
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '',
        imgUrl: ''
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
        let { belong, image, oid, parms } = await getInfoById(id)
        this.belong = belong
        this.photo = image
        this.oid = oid
        this.parms = splitParms(parms)
        if (this.parms.gender) {
          this.gender = this.parms.gender
        }
        if (this.parms.score) {
          this.score = this.parms.score
        }
        if (this.parms.coupon_batch_id) {
          this.coupon_batch_id = this.parms.coupon_batch_id
        }
      } catch (e) {
        console.warn(e.message)
      }
    }
  }
}
