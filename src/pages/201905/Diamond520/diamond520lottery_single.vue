<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/leaf1.png`"
      class="leaf-img-1"
    >
    <div class="content-wrap">
      <LoveSubmit
        v-if="isVerified && !loveInfo"
        :photo="photo"
        @submitLoveMsg="handleSubmit"
      />
      <LovePhoto
        v-if="isVerified && loveInfo"
        :image="loveInfo.url + this.$qiniuCompress(60)"
        :msg="loveInfo.message"
        :name="loveInfo.name"
      />
    </div>
    <div class="sponsor-area">
      <img
        :src="`${CDNURL}/dimond520/sponsor_single.png`"
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
import { mapGetters } from "vuex"
import { postLoveInfo, getLoveInfo, $wechat, isInWechat } from 'services'
import LoveSubmit from './single_submit'
import LovePhoto from './single_result'
import { Toast } from 'mand-mobile'
import '../../../assets/less/reset-mand.less'
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520LotterySingle",
  components: {
    LoveSubmit,
    LovePhoto
  },
  mixins: [reCalculateRem],
  props: {
    photo: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      CDNURL: CDNURL,
      isVerified: false,
      loveInfo: null
    }
  },
  computed: {
    ...mapGetters(["z", "weixinUrl"]),
  },
  async mounted() {
    if (this.z) {
      this.init()
    } else {
      Toast.failed('用户数据为空', 0, true)
    }
    if (isInWechat() === true) {
      this.handleWechatShare()
    }
  },
  methods: {
    async init() {
      Toast.loading('页面加载中')
      try {
        let params = {
          z: this.z
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
    async handleSubmit(data) {
      let params = {
        z: this.z,
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
    },
    handleWechatShare() {
      let wxShareInfoValue = {
        title: '打造惊喜神秘告白',
        desc: '点击开启定制专属告白',
        link: location.origin + '/marketing/love520',
        imgUrl: 'https://cdn.xingstation.cn/dimond520/share_icon.png'
      }
      $wechat(this.weixinUrl)
        .then(res => {
          res.forbiddenCopy()
          res.share(wxShareInfoValue)
        })
        .catch(e => {
          console.warn(e)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/cdnUrl.less";

.wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-image: url("@{cdnUrl}/dimond520/photo_back_new.png");
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