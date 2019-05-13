<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/photo_back_top.png`"
      class="back-top"
    >
    <div class="content-wrap">
      <div class="photo-wrap">
        <img
          :src="detail.image_url"
          class="photo"
        >
        <div class="photo-rank-detail">
          <p class="photo-rank">
            {{ detail.rank }}
          </p>
          <p class="photo-votes">
            {{ detail.count }}
          </p>
        </div>
        <div class="vote-area">
          <img
            :src="`${CDNURL}/dimond520/heart_vote_btn.png`"
            :class="['heart-vote-btn', { 'animated bounceIn': playAnimation }]"
          >
          <img
            :src="`${CDNURL}/dimond520/plus_one.png`"
            :class="['plus-one', { 'my-animate': playAnimation }]"
          >
        </div>
      </div>
      <div class="button-group">
        <img
          :src="`${CDNURL}/dimond520/help_btn.png`"
          class="button"
          @click="clickable && handleVote()"
        >
        <img
          :src="`${CDNURL}/dimond520/navi_top_btn.png`"
          class="button"
          @click="handleNaviTop"
        >
      </div>
      <img
        :src="`${CDNURL}/dimond520/sponsor.png`"
        class="sponsor"
      >
    </div>
  </div>
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import { Cookies, getVoteDetail, vote, $wechat, isInWechat } from 'services'
import { Toast } from 'mand-mobile'
import "../../../assets/less/reset-mand.less"
import "animate.css"
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520Vote",
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      sign: '',
      detail: {
        image: null,
        votes: '',
        rank: ''
      },
      clickable: true,
      playAnimation: false
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.sign = 'eyJpdiI6IkRtNUNjVEV2RkdTOStUZ2dOUktGRnc9PSIsInZhbHVlIjoiY0F2S0cwVmtramRLQXlUSHBBVWZOZz09IiwibWFjIjoiOGEwN2U4NjIzOWYzZDJiZmEzMzc4NDQ5MzRkY2NmMmIxNTA1MWY0N2E5NTkxOTExNDNmMWFkNzEwNjkyYzZmMyJ9'
    } else {
      this.handleWechatAuth()
    }
    if (this.sign) {
      this.fetchDetail()
    }
    this.handleWechatShare()
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        let wxShareInfoValue = {
          title: '钻石人气榜，等你来挑战',
          desc: '为好友助力打call，赢取挚爱真钻',
          link: location.href,
          imgUrl: 'https://cdn.xingstation.cn/dimond520/share_icon.png'
        }
        $wechat()
          .then(res => {
            res.share(wxShareInfoValue)
          })
          .catch(e => {
            console.warn(e)
          })
      }
    },
    async fetchDetail() {
      Toast.loading('加载中')
      const id = this.$route.params.pid
      try {
        let res = await getVoteDetail(id)
        this.detail = res.data
        Toast.hide()
      } catch(e) {
        console.log(e)
        Toast.failed(e.response.data.message)
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
    async handleVote() {
      this.clickable = false
      Toast.loading('投票中')
      let params = {
        sign: this.sign,
        board_id: this.$route.params.pid,
        campaign: '520Diamonds'
      }
      try {
        let res = await vote(params)
        if (res.code === 0) {
          Toast.succeed('投票成功')
          await this.voteAnimation()
          window.location.reload()
        } else {
          Toast.failed('投票失败', 2000, true)
          this.clickable = true
        }
      } catch(e) {
        console.log(e)
        Toast.failed(e.response.data.message, 2000, true)
        this.clickable = true
      }
    },
    handleNaviTop() {
      this.$router.push({
        name: 'diamond520Top'
      })
    },
    voteAnimation() {
      this.playAnimation = true
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 500) //动画时长
      })
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
  padding-top: 0.25rem;
  .photo-wrap {
    position: relative;
    width: 2.78rem;
    height: 4.66rem;
    margin: 0 auto;
    background-image: url("@{cdnUrl}/dimond520/photo_vote_frame_big.png");
    background-size: 100% auto;
    background-repeat: repeat;
    margin-bottom: 0.01rem;
    .photo {
      position: absolute;
      top: 0.14rem;
      left: 0.18rem;
      width: 2.42rem;
      height: 4.3rem;
    }
    .photo-rank-detail {
      position: absolute;
      top: -0.26rem;
      right: -0.49rem;
      width: 1.24rem;
      height: 1.48rem;
      background-image: url("@{cdnUrl}/dimond520/photo_rank_detail.png");
      background-size: 100% auto;
      background-repeat: repeat;
      color: #FFF;
      .photo-rank {
        position: absolute;
        top: 0.55rem;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 0.15rem;
      }
      .photo-votes {
        position: absolute;
        top: 0.78rem;
        left: 0.68rem;
        font-size: 0.12rem;
      }
    }
    .vote-area {
      position: absolute;
      width: 0.86rem;
      top: 4.05rem;
      left: 0.9rem;
      .heart-vote-btn {
        width: 100%;
        height: auto;
        opacity: 0;
      }
      .plus-one {
        position: absolute;
        width: 0.275rem;
        height: auto;
        top: -0.05rem;
        right: -0.05rem;
        opacity: 0;
        &.my-animate {
          animation: fadeOut 0.5s;
        }
      }
    }
  }
  .button-group {
    display: flex;
    justify-content: space-between;
    padding: 0 0.52rem;
    margin-bottom: 0.03rem;
    .button {
      width: 1.35rem;
      height: 0.6rem;
    }
  }
  .sponsor {
    width: 1.57rem;
    height: 0.44rem;
    margin: 0 auto;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translate(0, 0)
  }
  100% {
    opacity: 0;
    transform: translate(0.1rem, -0.1rem)
  }
}

</style>