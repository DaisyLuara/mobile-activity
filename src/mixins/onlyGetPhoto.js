import { getInfoById } from 'services'
export const onlyGetPhoto = {
  mounted() {
    this.getPhotoByRouteQueryId()
  },
  methods: {
    async getPhotoByRouteQueryId() {
      let id = this.$route.query.id
      let { image } = await getInfoById(id).catch(err => {
        console.warn(err.message)
      })
      this.photo = image
    }
  }
}
