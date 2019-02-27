<template>
  <div class="cake" :class="{ 'no-bottom': this.$route.query.acid }">
    <div v-if="!isNoList">
      <div class="header">
        <div class="back-word">CAKE</div>
        <div class="front-word">蛋糕搭配</div>
      </div>
      <!-- 蛋糕样式选择区域 -->
      <CakeSwiper ref="cakeSwiper"/>
      <!-- 生日祝福输入区域 -->
      <div class="greetings-wrapper">
        <div class="bottom"/>
        <div class="greetings-area">
          <textarea
            v-model="greetings"
            maxlength="14"
            placeholder="输入你对ta的生日祝福..."
            class="greetings-input"
            @blur="handleBlur"
          />
          <div
            class="submit-btn"
            @click="handleSendGreetings"
          >
            <img src="https://cdn.exe666.com/m/activity/shop/birthday/submit-button.png">
          </div>
        </div>
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
import { sendGreetings, fetchShopActivityList } from "services"
import { mapGetters } from "vuex"
import { Toast } from "mint-ui"

export default {
  name: "ActivityBirthDayCake",
  components: {
    CakeSwiper,
    NoListContentReminder
  },
  data () {
    return {
      greetings: "",
      isSending: false,
      acid: this.$route.query.acid,
      isNoList: false
    }
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted () {
    // 如果没有acid则拉取祝福列表，取列表第一个活动的acid
    if (!this.acid) {
      this.getAcid()
    }
  },
  methods: {
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
          Toast("发送成功")
          this.greetings = ''
        } else {
          Toast(String(r.data.results))
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
        mkey: this.$route.params.mkey,
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
    handleBlur () {
      // 修复ios隐藏软键盘后页面无法回弹的问题
      setTimeout(() => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 10)
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
    padding: 0.2rem 0 0.1rem;
    margin: 0 auto;
    transform: translate(0, 0);
    background: #FFF;
    border-radius: 0.2rem;
    box-shadow: 0px 0px 18px 0px rgba(223,223,223,0.59);
    .greetings-input {
      display: block;
      width: 3.13rem;
      height: 0.79rem;
      line-height: 0.13rem;
      padding: 0.15rem 0.18rem;
      margin: 0 auto 0.12rem auto;
      border-radius: 0.07rem;
      border: 1px solid #EEEEEE;
      color: #000;
      font-size: 0.14rem;
      resize: none;
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

</style>