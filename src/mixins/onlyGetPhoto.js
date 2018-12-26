import { getInfoById, splitParms } from 'services'
const cdnUrl = process.env.CDN_URL
export const onlyGetPhoto = {
  data() {
    return {
      baseUrl: cdnUrl,
      photo: null,
      belong: null,
      photo: null,
      oid: null,
      parms: null,
      gender: null,
      score: null,
      coupon_batch_id: null,
      awardinfo: null,
      actinfo: null,
      userinfo: null
    }
  },
  mounted() {
    this.getPhotoByRouteQueryId()
  },
  methods: {
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
        this.parms = splitParms(parms)
        this.awardinfo = awardinfo
        this.userinfo = userinfo
        this.actinfo = actinfo
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
