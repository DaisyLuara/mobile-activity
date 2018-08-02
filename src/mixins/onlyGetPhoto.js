import { getInfoById } from 'services'
export const onlyGetPhoto = {
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
