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
      userinfo: null,
      avrinfo: null
    }
  },
  mounted() {
    this.getPhotoByRouteQueryId()
  },
  methods: {
    async getPhotoByRouteQueryId() {
      try {
        let { id, code, state } = this.$route.query
        let {
          belong,
          image,
          oid,
          parms,
          awardinfo,
          actinfo,
          avrinfo,
          userinfo
        } = await getInfoById(id, code, state)
        this.userinfo = userinfo
        this.belong = belong
        this.photo = image
        this.oid = oid
        if (parms !== null && parms !== undefined) {
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
        }
        this.awardinfo = awardinfo
        this.actinfo = actinfo
        this.avrinfo = avrinfo
      } catch (e) {
        console.warn(e.message)
      }
    }
  }
}
