<template>
  <div class="cake">
    <div class="header">
      <div class="back-word">CAKE</div>
      <div class="front-word">蛋糕搭配</div>
    </div>
    <!-- 蛋糕样式选择区域 -->
    <CakeSwiper ref="cakeSwiper"/>
    <div class="bottom"></div>
    <!-- 生日祝福输入区域 -->
    <div class="greetings-area">
      <textarea
        maxlength="14"
        placeholder="输入你对ta的生日祝福..."
        v-model="greetings"
        class="greetings-input"
      ></textarea>
      <div class="submit-btn" @click="handleSendGreetings">
        <img src="https://cdn.exe666.com/m/activity/shop/birthday/submit-button.png">
      </div>
    </div>
  </div>
</template>

<script>
import CakeSwiper from "@/pages/m/components/Birthday/CakeSwiper"
import { sendGreetings } from "services"
import { mapGetters } from "vuex"
import { Toast } from "mint-ui"

export default {
  name: "ActivityBirthDayCake",
  components: {
    CakeSwiper
  },
  data () {
    return {
      greetings: "",
      isSending: false
    }
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted () {

  },
  methods: {
    async handleSendGreetings () {
      const cakeList = this.$refs.cakeSwiper.cakeList
      const cakeSwiper = this.$refs.cakeSwiper.swiperTop
      if (!cakeSwiper || !this.greetings || this.isSending) {
        return
      }
      const cakeId = cakeList[cakeSwiper.activeIndex].id
      let { acid } = this.$route.query
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
    }
  }
}
</script>

<style lang="less" scoped>
@import "./mixin.less";

.cake {
  .wrapper();
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
  transform: translateY(0.2rem);
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

</style>