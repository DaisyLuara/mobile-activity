<template>
  <div class="card-wrap">
    <!-- 贺卡部分 -->
    <transition name="fade">
      <div
        class="greetings-card"
        v-show="showCard"
        ref="greetingsCard"
      >
        <img
          :src="imageHost + 'greeting_card.png'"
          class="card-img"
          :class="{ hide: !showCard }"
          @click="hideCard"
        >
      </div>
    </transition>

    <!-- 蛋糕塔部分 -->
    <transition name="fade">
      <CakeTower
        v-show="!showCard"
        :list="greetingsList"
        @emitLoadMore="loadMore"
        ref="cakeTower"
        :isAllLoaded="isAllLoaded"
        :pageSize="pageSize"
      />
    </transition>
    <!-- 左上角寿星信息 -->
    <div class="recipient">
      <img :src="defaultAvatar" class="recipient-avatar">
      <img :src="imageHost + 'avatar_frame.png'" class="avatar-frame">
      <div class="recipient-name">寿星XXX</div>
      <img class="recipient-gender" :src="imageHost + 'gender_male.png'">
    </div>
  </div>
</template>

<script>
import { fetchGreetingsList, $wechat, isInWechat } from "services"
import CakeTower from './components/CakeTower'
import { mapGetters } from "vuex"
import Hammer from 'hammerjs'

export default {
  name: "ActivityBirthDayCard",
  components: {
    CakeTower
  },
  data () {
    return {
      imageHost: 'https://cdn.exe666.com/m/activity/shop/birthday/',
      defaultAvatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/kPmo3eFGlBOPalDZHOpAicFPfQaicU7icJnypiaUxUcFEOE2kdddNsFXPkmiaeBo6LCRau0ibZK72fUtDpo9dSZccXTA/132',
      greetingsList: [],
      isAllLoaded: false,
      isFetching: false,
      currentPage: 1,
      pageSize: 5,
      showCard: true
    }
  },
  computed: {
    ...mapGetters(["weixinUrl"]),
    cakeNum () {
      return this.greetingsList.length
    }
  },
  mounted () {
    this.initWechatShare()
    this.initialHammer()
  },
  methods: {
    // 初始化微信分享
    initWechatShare () {
      let wechatShareInfo = {
        title: '你收到了XXX公司同事以及领导为你送上的生日祝福',
        desc: '点击查收你的生日贺卡',
        link: window.location.href.split("#")[0],
        imgUrl: ''
      }
      if (isInWechat() === true) {
        $wechat.share(this.weixinUrl)
          .then(res => {
            res.share(wechatShareInfo)
          })
          .catch(err => {
            console.warn(err.message)
          })
      }
    },
    // 初始化手势事件
    initialHammer () {
      // 为贺卡添加上滑事件监听器
      let cardManager = new Hammer.Manager(this.$refs.greetingsCard)
      let Swipe = new Hammer.Swipe({
        event: 'swipeup',
        threshold: 20,  // 最小滑动距离
        direction: Hammer.DIRECTION_UP
      })
      cardManager.add(Swipe)
      cardManager.on('swipeup', () => {
        this.hideCard()
      })
    },
    async fetchList () {
      if (this.isAllLoaded || this.isFetching) {
        return
      }
      this.isFetching = true
      let payload = {
        api: "json",
        cp: this.currentPage,
        size: this.pageSize,
        z: this.z,
        allt: "birthday",
        mkey: this.$route.params.mkey
      }
      try {
        let resp = (await fetchGreetingsList(payload)).data
        if (resp.data.state !== '1') {
          this.isAllLoaded = true
        }
        if (resp.data.pageIndex >= resp.data.totalPage) {
          this.isAllLoaded = true
        }
        let list = this.computedZIndex(resp.data.list, resp.data.totalPage)
        // if (firstFetch) {
        //   this.computedDelay(list)
        // }
        this.computedDelay(list)
        this.greetingsList = this.greetingsList.concat(list)
        this.currentPage++
      } catch (e) {
        console.log(e)
      } finally {
        this.$refs.cakeTower.finishLoadMore()
        this.isFetching = false
      }
    },
    // 计算蛋糕的z-index
    computedZIndex (list, totalPage) {
      // z-index从大到小排列
      const maxIndex = Number(totalPage) * this.pageSize
      const currentIndex = this.cakeNum
      list.forEach((item, index) => {
        item.zIndex = maxIndex - (currentIndex + index)
      })
      return list
    },
    // 蛋糕淡入动画延迟
    computedDelay (list) {
      list.forEach((item, index) => {
        item.animationDelay = 400 * index // 单位毫秒
      })
    },
    // 加载更多
    loadMore () {
      setTimeout(() => {
        this.fetchList()
      }, 500)
    },
    hideCard () {
      this.showCard = false
      this.fetchList()
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'https://cdn.exe666.com/m/activity/shop/birthday/';

.card-wrap {
  height: 100vh;
  .greetings-card {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    .card-img {
      display: block;
      // width: 3.25rem;
      // height: auto;
      height: 80%;
      width: auto;
      transform: translateY(0);
      transition: transform .8s;
      &.hide {
        transform: translateY(-100vh);
      }
    }
  }
}
.recipient {
  position: fixed;
  top: 0.14rem;
  left: 0.17rem;
  width: 1.7rem;
  height: 0.72rem;
  overflow: hidden;
  .recipient-avatar {
    display: block;
    width: 0.59rem;
    height: 0.59rem;
    margin: 0.06rem 0.02rem;
    border-radius: 50%;
  }
  .avatar-frame {
    position: absolute;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
  }
  .recipient-name {
    position: absolute;
    line-height: 0.325rem;
    left: 0.7rem;
    top: 0.22rem;
    font-size: 0.125rem;
    color: #FFF;
  }
  .recipient-gender {
    width: 0.17rem;
    height: 0.17rem;
    position: absolute;
    right: 0.09rem;
    top: 0.28rem;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>