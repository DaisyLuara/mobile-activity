<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/photo_back_top.png`"
      class="back-top"
    >
    <div class="content-wrap">
      <DiamondLottery />
      <div class="button-group">
        <img
          :src="`${CDNURL}/dimond520/friend_help_btn.png`"
          class="button"
          @click="handleShowMask"
        >
        <img
          :src="`${CDNURL}/dimond520/navi_top_btn.png`"
          class="button"
          @click="handleNaviTop"
        >
      </div>
      <img
        :src="`${CDNURL}/dimond520/lottery_c_rule.png`"
        class="rule"
      >
      <img
        :src="`${CDNURL}/dimond520/activity_sponsor.png`"
        class="activity-sponsor"
      >
      <p class="activity-company">
        本活动最终解释权归星视度所有
      </p>
    </div>
    <div
      v-show="showMask"
      class="share-mask"
      @click="handleHideMask"
    >
      <img
        :src="`${CDNURL}/dimond520/share_tip.png`"
        class="share-tip"
      >
    </div>
  </div>
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import DiamondLottery from '@/modules/diamondLottery'
import { $wechat, isInWechat, isiOS, getUserBoardId } from 'services'
import { mapGetters } from "vuex"
import { Toast } from 'mand-mobile';
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520LotteryCouple",
  components: {
    DiamondLottery
  },
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      showMask: false,
      boardId: null
    }
  },
  computed: {
    ...mapGetters(["z", "weixinUrl"])
  },
  async mounted() {
    if (isiOS && !this.$route.query.iosRand) {
      const iosRand = 'iosRand=' + new Date().getTime()
      const url = location.href
      if (url.indexOf('?') > 0) {
        url = url + '&' + iosRand
      } else {
        url = url + '?' + iosRand
      }
      location.replace(url)
      return
    }
    window.scrollTo(0, 0)
    await this.getBoardId()
    this.handleWechatShare()
  },
  methods: {
    async getBoardId() {
      let params = {
        z: this.z,
        campaign: '520Diamonds'
      }
      try {
        let res = await getUserBoardId(params)
        if (res.code === 0) {
          this.boardId = res.data.id
        }
      } catch(e) {
        console.log(e)
      }
    },
    handleWechatShare() {
      if (isInWechat() === true) {
        let wxShareInfoValue = {
          title: '钻石人气榜，等你来挑战',
          desc: '为好友助力打call，赢取挚爱真钻',
          link: location.origin + '/marketing/Diamond520/diamond520_vote/' + this.boardId,
          imgUrl: 'https://cdn.xingstation.cn/dimond520/share_icon.png'
        }
        $wechat(this.weixinUrl)
          .then(res => {
            if (this.boardId === null) {
              res.forbidden()
            } else {
              res.forbiddenCopy()
              res.share(wxShareInfoValue)
            }
          })
          .catch(e => {
            console.warn(e)
          })
      }
    },
    handleNaviTop() {
      this.$router.push({
        name: 'diamond520Top'
      })
    },
    handleShowMask() {
      this.showMask = true
    },
    handleHideMask() {
      this.showMask = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/cdnUrl.less";
@import "../../../assets/less/diamond.less";

.back-top {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.content-wrap {
  position: relative;
  .button-group {
    display: flex;
    margin-top: 0.05rem;
    padding: 0 0.52rem;
    justify-content: space-between;
    .button {
      width: 1.35rem;
      height: 0.6rem;
    }
  }
  .rule {
    width: 3.31rem;
    height: 3.77rem;
    margin: 0 auto 0.14rem;
  }
  .activity-sponsor {
    margin: 0 auto;
    width: 1.48rem;
  }
  .activity-company {
    line-height: 0.41rem;
    text-align: center;
    font-size: 12px;
    color: #060606;
  }
}
.share-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("@{cdnUrl}/dimond520/share_mask.png");
  background-size: 100% 100%;
  .share-tip {
    position: absolute;
    top: 0.13rem;
    right: 0.23rem;
    width: 1.54rem;
    height: 1.3rem;
  }
}

</style>