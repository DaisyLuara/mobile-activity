<template>
  <div 
    :class="{ 'no-bottom': this.$route.query.acid }" 
    class="cake"
  >
    <div v-if="!isNoList">
      <div class="header">
        <div class="back-word">
          CAKE
        </div>
        <div class="front-word">
          蛋糕搭配
        </div>
      </div>
      <!-- 蛋糕样式选择区域 -->
      <CakeSwiper ref="cakeSwiper" />
      <!-- 生日祝福输入区域 -->
      <div class="greetings-wrapper">
        <div class="bottom" />
        <div class="greetings-area">
          <div class="input-wrapper">
            <textarea
              v-model="greetings"
              :maxlength="wordLimit"
              placeholder="输入你对ta的生日祝福..."
              class="greetings-input"
              @blur="handleBlur"
            />
          </div>
          <div class="visible-control">
            <div class="left-cell">
              是否公开祝福内容
            </div>
            <md-switch
              v-model="isVisible"
            />
          </div>
          <div 
            class="submit-btn" 
            @click="handleSendGreetings"
          >
            <img :src="imageHost + 'submit-button.png'">
          </div>
        </div>
      </div>
    </div>
    <md-popup
      v-model="showPopup"
      :mask-closable="false"
      @touchmove.native="preventMove"
    >
      <div class="popup-wrapper">
        <div class="popup-banner">
          <div class="popup-title">
            发送成功
          </div>
          <div class="popup-desc">
            你可以在大屏查看你的祝福
          </div>
          <div 
            class="share-btn btn" 
            @click="showShareTip = true"
          >
            分享给好友一起送祝福
          </div>
          <div 
            class="back-btn btn" 
            @click="handleNavigate"
          >
            返回企业动态
          </div>
        </div>
        <div 
          class="cancel-btn btn" 
          @click="handleClickCancel"
        >
          关闭弹窗，再发一条
        </div>
      </div>
    </md-popup>
    <div
      v-show="showShareTip"
      class="share-tip"
      @touchmove="preventMove"
    >
      <img 
        :src="imageHost + 'arrow_tip.png'" 
        class="share-arrow"
      >
      <div class="share-words">
        快来让朋友一起为Ta祝福吧
      </div>
    </div>
    <NoListContentReminder 
      :show="isNoList" 
      words="当前没有可祝福的活动哦"
    />
  </div>
</template>

<script>
import CakeSwiper from "@/pages/m/components/Birthday/CakeSwiper"
import NoListContentReminder from "@/pages/m/components/Reminder/NoListContentReminder"
import { sendGreetings, fetchShopActivityList, $wechat, isInWechat } from "services"
import { mapGetters } from "vuex"
import { Toast } from "mint-ui"
import { Popup, Switch } from "mand-mobile"
import "./mand-reset.less"

export default {
  name: "ActivityBirthDayCake",
  components: {
    CakeSwiper,
    NoListContentReminder,
    [Switch.name]: Switch,
    [Popup.name]: Popup
  },
  data () {
    return {
      imageHost: 'https://cdn.xingstation.cn/m/activity/shop/birthday/',
      greetings: "",
      isSending: false,
      acid: this.$route.query.acid,
      isNoList: false,
      showPopup: false,
      showShareTip: false,
      wordLimit: 14,
      isVisible: true
    }
  },
  computed: {
    ...mapGetters(["z", "weixinUrl"]),
    wordNum() {
      return this.greetings ? this.greetings.length : 0
    }
  },
  mounted () {
    this.initWechatShare()
    // 如果没有acid则拉取祝福列表，取列表第一个活动的acid
    if (!this.acid) {
      this.getAcid()
    }
  },
  methods: {
    // 初始化微信分享
    initWechatShare () {
      let wxShareInfoValue = {
        title: '为TA送上祝福吧~',
        desc: '我们最爱的同事等你来送祝福',
        link: window.location.href.split("#")[0],
        imgUrl: 'https://cdn.xingstation.cn/m/activity/shop/birthday/share_icon.png'
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
    async handleSendGreetings () {
      const cakeList = this.$refs.cakeSwiper.cakeList
      const cakeSwiper = this.$refs.cakeSwiper.swiperTop
      const cakeId = cakeList[cakeSwiper.activeIndex].id
      const acid = this.acid
      if (!cakeSwiper || !this.greetings || this.isSending || !acid) {
        return
      }
      const payload = {
        api: 'json',
        z: this.z,
        comment: this.greetings,
        id: cakeId,
        actid: acid
      }
      this.isSending = true
      try {
        let resp = await sendGreetings(payload)
        if (resp.data.state === "1") {
          Toast({
            message: '发送成功',
            position: 'bottom',
            duration: 1000
          })
          this.greetings = ''
          this.showPopup = true
        } else {
          Toast({
            message: String(resp.data.results),
            position: 'bottom',
            duration: 1000
          })
        }
      } catch (e) {
        console.log(e)
        Toast("网络错误")
      } finally {
        this.isSending = false
      }
    },
    async getAcid () {
      let payload = {
        api: "json",
        cp: 1,
        size: 5,
        z: this.z,
        allt: 'birthday',
        mkey: this.$route.params.mkey
      }
      fetchShopActivityList(this, payload)
        .then(r => {
          if (r.data.state !== "1") {
            this.isNoList = true
            return
          }
          const res = r.data.results.data
          if (res.length === 0) {
            this.isNoList = true
            return
          }
          this.acid = res[0].acid
        })
        .catch(e => {
          console.log(e)
          this.isNoList = true
        })
    },
    // 随机生成蛋糕偏移
    getRandOffset () {
      const range = [40, 60]
      return Math.round(Math.random() * (range[1] - range[0])) + range[0]
    },
    handleBlur () {
      // 修复ios隐藏软键盘后页面无法回弹的问题
      setTimeout(() => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 10)
    },
    // 屏蔽滑动事件
    preventMove (e) {
      e.preventDefault()
    },
    handleNavigate () {
      this.$router.push({
        name: 'ActivityBirthDayIndex'
      })
    },
    handleClickCancel () {
      this.showPopup = false
      this.showShareTip = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "./mixin.less";

.cake {
  .wrapper();
  overflow: hidden;
  padding-bottom: 48px;
  &.no-bottom {
    padding-bottom: 0;
  }
}

textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #B3B3B3;
  font-weight: lighter;
}
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #B3B3B3;
  font-weight: lighter;
}
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #B3B3B3;
  font-weight: lighter;
}
textarea::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #B3B3B3;
  font-weight: lighter;
}

.header {
  padding: 0.3rem 0 0 0.12rem;
  position: relative;
  margin-bottom: 0.18rem;
  .back-word {
    font-size: 0.48rem;
    color: #E7E7E7;
    line-height: 0.36rem;
    font-weight: lighter;
  }
  .front-word {
    font-size: 0.1rem;
    color: #747474;
    position: absolute;
    bottom: 0.09rem;
    left: 0.32rem;
    font-weight: lighter;
  }
}
.greetings-wrapper {
  position: relative;
  margin-top: 0.2rem;
  padding-bottom: 0.2rem;
  .bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 0.6rem;
    background: #35BBC4;
  }
  .greetings-area {
    width: 3.41rem;
    padding: 0.16rem 0 0.1rem;
    margin: 0 auto;
    transform: translate(0, 0);
    background: #FFF;
    border-radius: 0.2rem;
    box-shadow: 0px 0px 18px 0px rgba(223,223,223,0.59);
    .input-wrapper {
      position: relative;
      margin-bottom: 0.12rem;
      .greetings-input {
        display: block;
        width: 3.13rem;
        height: 0.59rem;
        background: #EEEEEE;
        line-height: 0.13rem;
        padding: 0.15rem 0.18rem;
        margin: 0 auto;
        border-radius: 0.07rem;
        border: 1px solid #EEEEEE;
        color: #000;
        font-size: 0.14rem;
        resize: none;
      }
    }
    .visible-control {
      width: 100%;
      height: 0.24rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.14rem 0 0.2rem;
      .left-cell {
        font-size: 0.14rem;
        color: #222222;
      }
    }
    .submit-btn {
      width: 0.65rem;
      height: 0.65rem;
      margin: 0 auto;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.md-popup {
  .btn {
    width: 2.08rem;
    height: 0.4rem;
    margin: 0 auto;
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.15rem;
    border-radius: 0.03rem;
    color: #FFF;
  }
  .popup-wrapper {
    width: 100%;
    height: 100%;
    .popup-banner {
      width: 2.81rem;
      height: 3.09rem;
      background: url(https://cdn.xingstation.cn/m/activity/shop/birthday/popup_bg.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #FFF;
      text-align: center;
      padding-top: 0.49rem;
      margin-bottom: 0.27rem;
      .popup-title {
        font-size: 0.36rem;
        margin-bottom: 0.17rem
      }
      .popup-desc {
        font-size: 0.14rem;
        margin-bottom: 0.66rem;
      }
      .share-btn {
        background: #35BBC4;
        margin-bottom: 0.16rem;
      }
      .back-btn {
        background: #2B2B2B;
      }
    }
    .cancel-btn {
      border: 0.01rem solid #FFF;
    }
  }
}

.share-tip {
  position: fixed;
  top: 0.11rem;
  right: 0.26rem;
  z-index: 9999;
  overflow: hidden;
  padding-top: 0.29rem;
  .share-arrow {
    position: absolute;
    width: 0.35rem;
    height: 0.29rem;
    top: 0;
    right: 0.05rem;
  }
  .share-words {
    font-size: 0.15rem;
    color: #FFF;
  }
}

</style>