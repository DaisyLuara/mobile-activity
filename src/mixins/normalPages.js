import {
  $wechat,
  getInfoById,
  isInWechat,
  wechatShareTrack,
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
      awardinfo: null,
      userinfo: null,
      actinfo: null,
      coupon_batch_id: null,
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
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
        let code = this.$route.query.code
        let state = this.$route.query.state
        let {
          belong,
          image,
          oid,
          parms,
          awardinfo,
          actinfo,
          userinfo
        } = await getInfoById(id, code, state)
        this.belong = belong
        this.photo = image
        this.oid = oid
        this.awardinfo = awardinfo
        this.actinfo = actinfo
        this.userinfo = userinfo
        if (parms) {
          this.parms = splitParms(parms)
        }
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
