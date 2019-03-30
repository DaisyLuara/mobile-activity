<template>
  <div class="card-wrap">
    <!-- 贺卡部分 -->
    <transition name="fade">
      <div
        v-show="showCard"
        class="greetings-card"
      >
        <img
          ref="greetingsCard"
          :src="imageHost + 'greeting_card.png'"
          :class="{ hide: !showCard }"
          class="card-img"
          @click="hideCard"
        >
      </div>
    </transition>

    <!-- 蛋糕塔部分 -->
    <transition name="fade">
      <CakeTower
        v-show="!showCard"
        ref="cakeTower"
        :list="greetingsList"
        :is-all-loaded="isAllLoaded"
        :page-size="pageSize"
        @emitLoadMore="loadMore"
      />
    </transition>
    <img 
      :src="imageHost + 'header_mask.png'" 
      class="header-mask">
    <!-- 左上角寿星信息 -->
    <div class="recipient">
      <img
        v-if="userInfo.idor"
        :src="userInfo.face"
        class="recipient-avatar"
      >
      <img 
        :src="imageHost + 'avatar_frame.png'" 
        class="avatar-frame">
      <div class="recipient-name">寿星{{ userInfo.username }}</div>
      <img
        v-if="userInfo.gender"
        :src="imageHost + 'gender_male.png'"
        class="recipient-gender"
      >
    </div>
  </div>
</template>

<script>
import { $wechat, isInWechat, fetchShopActivityDetail, fetchShopActivityProgress } from "services"
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
      imageHost: 'https://cdn.xingstation.com/m/activity/shop/birthday/',
      userInfo: {
        face: '',
        username: '',
        gender: '',
        idor: ''
      },
      awardkey: '',
      greetingsList: [],
      isAllLoaded: false,
      isFetching: false,
      currentPage: 1,
      pageSize: 5,
      showCard: true
    }
  },
  computed: {
    ...mapGetters(["weixinUrl", "z"]),
    cakeNum () {
      return this.greetingsList.length
    },
    genderImg () {
      const gender = this.userInfo.gender || '1'
      if (gender === '1') {
        return `${this.imageHost}gender_male.png`
      }
      return `${this.imageHost}gender_female.png`
    },
    xoAvatar () {
      const prefix = "https://cdn.xingstation.com/fe/hidol/img/xiaoou/"
      const idor = this.userInfo.idor || 'nanA'
      return `${prefix}${idor}1.png`
    }
  },
  async mounted () {
    await this.fetchUserInfo()
    this.initHammer()
  },
  methods: {
    async fetchUserInfo () {
      let payload = {
        api: 'json',
        z: this.z,
        actid: this.$route.query.acid
      }
      try {
        let resp = (await fetchShopActivityDetail(this, payload)).data
        if (resp.state === '1') {
          this.userInfo = resp.results.user
          this.awardkey = resp.results.awardkey
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 初始化微信分享
    initWechatShare () {
      let title = '你收到了公司同事以及领导为你送上的生日祝福'
      const firstCake = this.greetingsList[0]
      if (firstCake) {
        title = `同事${firstCake.nickname}对我生日祝福是：${firstCake.kid}`
      }
      let wxShareInfoValue = {
        title,
        desc: '点击查收你的生日贺卡',
        link: window.location.href.split("#")[0],
        imgUrl: 'https://cdn.xingstation.com/m/activity/shop/birthday/share_icon.png'
      }
      if (isInWechat() === true) {
        $wechat(this.weixinUrl)
          .then(res => {
            res.share(wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      }
    },
    // 初始化手势事件
    initHammer () {
      // 为贺卡添加上滑事件监听器
      let cardManager = new Hammer.Manager(this.$refs.greetingsCard)
      let Swipe = new Hammer.Swipe({
        event: 'swipe',
        threshold: 20,  // 最小滑动距离
        direction: Hammer.DIRECTION_UP
      })
      cardManager.add(Swipe)
      cardManager.on('swipe', () => {
        this.hideCard()
      })
    },
    async fetchList () {
      if (this.isAllLoaded || this.isFetching || !this.awardkey) {
        return
      }
      try {
        const resp = await this.httpGet()
        this.addList(resp)
      } catch (e) {
        console.log(e)
      } finally {
        this.$refs.cakeTower.finishLoadMore()
        this.isFetching = false
      }
    },
    // 首次拉取祝福列表
    async fetchListFirst () {
      if (this.isAllLoaded || this.isFetching || !this.awardkey) {
        return
      }
      try {
        const resp = await this.httpGet()
        // 首次拉取列表时计算祝福总数
        this.totalCake = Number(resp.results.totalPage) * this.pageSize
        this.addList(resp)
        // 首次拉取列表时初始化微信分享
        this.initWechatShare()
      } catch (e) {
        console.log(e)
      } finally {
        this.$refs.cakeTower.finishLoadMore()
        this.isFetching = false
      }
    },
    async httpGet () {
      this.isFetching = true
      let payload = {
        api: "json",
        cp: this.currentPage,
        size: this.pageSize,
        awardkey: this.awardkey,
        z: this.z
      }
      let resp = (await fetchShopActivityProgress(this, payload)).data
      if (resp.state !== '1') {
        throw new Error('request failed')
      }
      let totalPage = Number(resp.results.totalPage)
      let pageIndex = Number(resp.results.pageIndex)
      if (pageIndex >= totalPage) {
        this.isAllLoaded = true
      }
      return resp
    },
    // 处理并增加祝福列表
    addList (resp) {
      let list = this.computedZIndex(resp.results.data)
      this.computedOffset(list)
      this.computedDelay(list)
      this.greetingsList = this.greetingsList.concat(list)
      this.currentPage++
    },
    // 计算蛋糕的z-index
    computedZIndex (list) {
      // z-index从大到小排列
      const maxIndex = this.totalCake
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
    // 计算蛋糕在x轴的偏移值
    computedOffset (list) {
      list.forEach((item, index) => {
        const clientdate = Number(item.clientdate)
        const start = 40
        item.offset = Math.round(start + clientdate / 1000 % 6 * 4)
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
      this.fetchListFirst()
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'https://cdn.xingstation.com/m/activity/shop/birthday/';

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
  pointer-events: none;
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

.header-mask {
  position: fixed;
  top: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>