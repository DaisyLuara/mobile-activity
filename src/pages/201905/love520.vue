<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/leaf1.png`"
      class="leaf-img-1"
    >
    <div class="content-wrap">
      <LoveSubmit
        v-if="isVerified && !loveInfo"
        @submitLoveMsg="handleSubmit"
      />
      <LovePhoto
        v-if="isVerified && loveInfo"
        :image="loveInfo.url + this.$qiniuCompress()"
        :msg="loveInfo.message"
        :name="loveInfo.name"
      />
    </div>
    <div class="sponsor-area">
      <img
        :src="`${CDNURL}/dimond520/activity_sponsor.png`"
        class="sponsor-img"
      >
      <p class="activity-company">
        本活动最终解释权归星视度所有
      </p>
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
import { postLoveInfo, getLoveInfo, getInfoById, Cookies } from 'services'
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
      loveInfo: null,
      sign: ''
    }
  },
  computed: {

  },
  async mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.sign = 'eyJpdiI6InZIUnlFc2xVZ05DVm9KXC90eXhLV0R3PT0iLCJ2YWx1ZSI6IkU1eTR5K2JZQ3ErNW9oZ2pzYTVuR2c9PSIsIm1hYyI6ImE1NDg1OGU3YTMxMDU0ZTllNjIzYTM5NGY0NjUyNDJlNDZhMTgwNDBhNWFkM2ZjZDUxYjAzZDc2ZjY2ZTdiNzQifQ=='
    } else {
      this.handleWechatAuth()
    }
    if (this.sign) {
      this.init()
    }
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
    async init() {
      Toast.loading('页面加载中')
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
        let params = {
          sign: this.sign
        }
        let res = await getLoveInfo(params)
        if (res.code === 0) {
          this.loveInfo = res.data
        }
        this.isVerified = true
        Toast.hide()
      } catch(e) {
        console.log(e)
        Toast.failed('获取用户信息失败', 0, true)
      }
    },
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.sign = Cookies.get('sign')
      }
    },
    async handleSubmit(data) {
      let params = {
        sign: this.sign,
        ...data
      }
      Toast.loading('上传中')
      try {
        let res = await postLoveInfo(params)
        if (res.code === 0) {
          Toast.succeed('上传成功', 0, true)
          window.location.reload()
        } else {
          Toast.failed('上传失败', 2000)
        }
      } catch(e) {
        console.log(e)
        Toast.failed('上传失败', 2000)
      }
    }
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
.content-wrap {
  min-height: 83vh;
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