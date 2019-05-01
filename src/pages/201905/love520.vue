<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/leaf1.png`"
      class="leaf-img-1"
    >
    <LoveSubmit
      v-if="isVerified && !loveInfo"
    />
    <LovePhoto
      v-if="isVerified && loveInfo"
      :image="loveInfo.image"
      :msg="loveInfo.msg"
      :name="loveInfo.name"
    />
    <div class="sponsor-area">
      <img
        :src="`${CDNURL}/dimond520/activity_sponsor.png`"
        class="sponsor-img"
      >
      <p class="activity-company">本活动最终解释权归星视度所有</p>
      <img
        :src="`${CDNURL}/dimond520/leaf2.png`"
        class="leaf-img-2"
      >
    </div>
  </div>
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import { mapGetters, mapMutations } from "vuex"
import { getLoveInfo, getInfoById } from 'services'
import LoveSubmit from './love520_submit'
import LovePhoto from './love520_result'
import { Toast } from 'mand-mobile'
import "../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  name: "Love520",
  components: {
    LoveSubmit,
    LovePhoto
  },
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      isVerified: false,
      loveInfo: null
    }
  },
  computed: {
    ...mapGetters(["z"])
  },
  async mounted() {
    Toast.loading('页面加载中')
    let { id, code, state } = this.$route.query
    try {
      // let { userinfo } = await getInfoById(id, code, state)
      // if (!userinfo) {
      //   Toast.failed('获取用户信息失败', 0, true)
      //   return
      // } else {
      //   this.setLoginState(userinfo)
      // }
      // let params = {
      //   z: this.z
      // }
      // 查询用户是否提交过信息
      // debug
      let params = {
        z: 'p5qd7da707e816e83aa9c9c3ca5fd4edf4cgpv'
      }
      let res = await getLoveInfo(params)
      if (res.data) {
        this.loveInfo = res.data
      }
      this.isVerified = true
      Toast.hide()
    } catch(e) {
      console.log(e)
      Toast.failed('获取用户信息失败', 0, true)
    }
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    })
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/cdnUrl.less";

.wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-image: url("@{cdnUrl}/dimond520/photo_back.png");
  background-size: 100% auto;
  background-repeat: repeat;
  overflow-x: hidden;
}
img {
  display: block;
}
.leaf-img-1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 1.14rem;
  height: 1.12rem;
}

.sponsor-area {
  position: relative;
  padding-top: 0.16rem;
  background-image: url("@{cdnUrl}/dimond520/sponsor_back.png");
  background-size: 100% 100%;
  .sponsor-img {
    width: 1.48rem;
    margin: 0 auto 0.04rem;
  }
  .activity-company {
    font-size: 0.09rem;
    line-height: 0.43rem;
    color: #000;
    text-align: center;
    margin: 0;
  }
  .leaf-img-2 {
    position: absolute;
    top: -0.2rem;
    left: -0.01rem;
    width: 0.77rem;
    height: 0.88rem;
  }
}
</style>