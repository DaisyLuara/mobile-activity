import { getInfoById } from 'services'
const cdnUrl = process.env.CDN_URL
export const onlyGetPhoto = {
  data() {
    return {
      baseUrl: cdnUrl,
      photo: null
    }
  },
  mounted() {
    this.getPhotoByRouteQueryId()
  },
  methods: {
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
