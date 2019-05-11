<template>
  <div>
    <Diamond520Single
      v-if="peopleNum === 1"
      :photo="photo"
    />
    <Diamond520Couple
      v-if="peopleNum > 1"
      :photo="photo"
    />
  </div>
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import { mapGetters, mapMutations } from "vuex"
import { getInfoById, splitParms } from 'services'
import Diamond520Single from './diamond520lottery_single'
import Diamond520Couple from './diamond520_couple'
import { Toast } from 'mand-mobile'
import "../../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520Land",
  components: {
    Diamond520Single,
    Diamond520Couple
  },
  mixins: [reCalculateRem],
  data () {
    return {
      peopleNum: 0,
      CDNURL: CDNURL,
      photo: null
    }
  },
  computed: {
    ...mapGetters(["z", "loginState"])
  },
  mounted() {
    // // debug
    // if (process.env.NODE_ENV !== 'development') {
    //   this.initState()
    // }
    this.initState()
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
    // 根据id获取用户z值,照片等信息
    async initState() {
      Toast.loading('页面加载中')
      let { id, code, state } = this.$route.query
      try {
        let { userinfo, image, parms } = await getInfoById(id, code, state)
        if (parms) {
          let params = splitParms(parms)
          this.peopleNum = params.peopleNum ? Number(params.peopleNum) : 0
        }
        if (userinfo) {
          this.setLoginState(userinfo)
        } else {
          userinfo = this.loginState
        }
        if (!userinfo.z) {
          Toast.failed('获取用户信息失败', 0, true)
        } else {
          this.photo = image
          Toast.hide()
        }
      } catch(e) {
        console.log(e)
        Toast.failed('获取用户信息失败', 0, true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>