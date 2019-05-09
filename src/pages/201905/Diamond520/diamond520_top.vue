<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/photo_back_top.png`"
      class="back-top"
    >
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      class="content-scroll"
      @endReached="getVoteList"
    >
      <div class="content-wrap">
        <img
          :src="`${CDNURL}/dimond520/diamond_top_title.png`"
          class="top-title"
        >
        <div class="couple-list">
          <div
            v-for="(item, index) in list"
            :key="item.id"
            class="couple-item"
            @click="handleNavToVote(item.id)"
          >
            <img
              :src="item.image"
              class="couple-photo"
            >
            <img
              v-if="index < 3"
              :src="`${CDNURL}/dimond520/photo_top${index + 1}.png`"
              class="rank-tip"
            >
            <div class="rank-status">
              <p>排名：{{ index | formatRank }}</p>
              <p>人气：{{ item.votes }}</p>
            </div>
          </div>
        </div>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import { getVoteList } from 'services'
import { ScrollView, ScrollViewMore } from "mand-mobile"
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520Top",
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore
  },
  filters: {
    formatRank(index) {
      let rank = String(index + 1)
      return (new Array(5 - rank.length + 1).join('0') + rank)
    }
  },
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      list: []
    }
  },
  mounted() {
    this.getVoteList()
  },
  methods: {
    async getVoteList() {
      try {
        let res = await getVoteList()
        this.list = this.list.concat(res.data.data)
      } catch(e) {
        console.log(e)
      } finally {
        this.$refs.scrollView.finishLoadMore()
      }
    },
    handleNavToVote(id) {
      this.$router.push({
        name: 'diamond520Vote',
        query: {
          pid: id
        }
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
.content-scroll {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
}
.content-wrap {
  position: relative;
  padding: 0.14rem 0.155rem;
  .top-title {
    width: 3.21rem;
    margin: 0 auto 0.2rem;
  }
  .couple-list {
    display: flex;
    flex-wrap: wrap;
    .couple-item {
      position: relative;
      width: 1.72rem;
      height: 2.76rem;
      margin-bottom: 0.44rem;
      background-image: url("@{cdnUrl}/dimond520/photo_vote_frame.png");
      background-size: 100% auto;
      background-repeat: repeat;
      .couple-photo {
        position: absolute;
        top: 0.12rem;
        left: 0.19rem;
        width: 1.34rem;
        height: 2.39rem;
      }
      .rank-tip {
        position: absolute;
        top: -0.09rem;
        left: 0;
        width: 1rem;
        height: 0.74rem;
      }
      .rank-status {
        position: absolute;
        top: 2.59rem;
        left: 0.11rem;
        right: 0.11rem;
        padding-left: 0.13rem;
        background-color: rgba(255, 255, 255, 0.7);
        & > p {
          line-height: 0.19rem;
          color: #B81C56;
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>