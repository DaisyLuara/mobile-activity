<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/photo_back_top.png`"
      class="back-top"
    >
    <div class="content-wrap">
      <div class="photo-wrap">
        <img
          :src="detail.image"
          class="photo"
        >
        <div class="photo-rank-detail">
          <p class="photo-rank">
            {{ detail.rank }}
          </p>
          <p class="photo-votes">
            {{ detail.votes }}
          </p>
        </div>
        <div class="vote-area">
          <img
            :src="`${CDNURL}/dimond520/heart_vote_btn.png`"
            class="heart-vote-btn"
            @click="clickable && handleVote()"
          >
          <img
            :src="`${CDNURL}/dimond520/plus_one.png`"
            :class="['plus-one', { 'animate': playAnimation }]"
          >
        </div>
      </div>
      <div class="button-group">
        <img
          :src="`${CDNURL}/dimond520/help_btn.png`"
          class="button"
        >
        <img
          :src="`${CDNURL}/dimond520/navi_top_btn.png`"
          class="button"
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
import { getVoteDetail } from 'services'
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520Vote",
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
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
    this.fetchDetail()
  },
  methods: {
    async fetchDetail() {
      try {
        let res = await getVoteDetail()
        this.detail = res.data.data
      } catch(e) {
        console.log(e)
      }
    },
    async handleVote() {
      this.clickable = false
      await this.voteAnimation()
      this.clickable = true
    },
    voteAnimation() {
      this.playAnimation = true
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.playAnimation = false
          resolve()
        }, 500) //动画时长
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/cdnUrl.less";
@import "../../assets/less/diamond.less";

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
      }
      .plus-one {
        position: absolute;
        width: 0.275rem;
        height: auto;
        top: -0.05rem;
        right: -0.05rem;
        opacity: 0;
        &.animate {
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