<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'BG.png' + this.$qiniuCompress()"
      class="bg"
      alt="background"
    >

    <img
      :src="baseUrl + 'title.png' + this.$qiniuCompress()"
      class="title"
    >

    <img
      :src="baseUrl + 'Words.png' + this.$qiniuCompress()"
      class="remind"
    >

    <input
      v-model="bindPhone"
      class="inputplace"
      maxlength="11"
    >

    <img
      :src="baseUrl + 'buttom.png' + this.$qiniuCompress()"
      class="button"
      @click="handleButtonClick"
    >

    <img
      :src="baseUrl + '4.png' + this.$qiniuCompress()"
      class="d-top"
    >

    <img
      :style="style.dright"
      :src="baseUrl + '2.png' + this.$qiniuCompress()"
      class="d-right"
    >

    <img
      :style="style.dleft"
      :src="baseUrl + '3.png' + this.$qiniuCompress()"
      class="d-left"
    >

    <img
      :src="baseUrl + '1.png' + this.$qiniuCompress()"
      class="bottom"
    >
  </div>
</template>

<script>
const cdnUrl = process.env.CDN_URL
import { onlyWechatShare } from '@/mixins/onlyWechatShare'
import {
  wechatShareTrack,
  isInWechat,
  Cookies,
  createGame,
  validatePhone
} from 'services'
import { Toast } from 'mint-ui'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        dleft: {
          bottom: (this.$innerWidth() * 392) / 750 + 'px'
        },
        dright: {
          bottom: (this.$innerWidth() * 392) / 750 + 'px'
        }
      },
      bindPhone: '',
      baseUrl: cdnUrl + '/fe/marketing/img/damai/wanglian/',
      wxShareInfo: {
        title: '我要去看世界杯啦',
        desc: '大融城邀您一起观看精彩世界杯',
        imgUrl: '',
        success: () => {
          wechatShareTrack()
        }
      },
      params: {
        userId: null,
        belong: this.$route.query.utm_campaign,
        id: this.$route.query.id
      }
    }
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
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
        this.params.userId = Cookies.get('user_id')
        this.params.belong = this.$route.query.utm_campaign
        // this.userGame()
      }
    },
    userGame() {
      let args = {
        belong: 'damaiGetCoupon',
        mobile: this.bindPhone
      }
      createGame(args, this.params.userId)
        .then(res => {
          Toast(
            '恭喜你，成功参与抽奖！我们将以短信形式告知获奖用户，请注意查收！'
          )
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleButtonClick() {
      if (validatePhone(this.bindPhone)) {
        this.userGame()
      } else {
        Toast('您输入的手机号有误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .bg {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .title {
    z-index: 40;
    width: 80%;
    margin-top: 17%;
  }
  .remind {
    margin-top: 8%;
    width: 70%;
    z-index: 20;
  }
  .inputplace {
    margin-top: 5%;
    width: 80%;
    height: 46px;
    background: white;
    color: black;
    font-size: 24px;
    line-height: 46px;
    z-index: 20;
    border-radius: 10px;
    border: 2px solid #d5c8d4;
    padding: 0 20px;
    text-align: center;
  }
  .button {
    margin-top: 3%;
    width: 80%;
    z-index: 20;
  }
  .bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 20;
  }
  .d-top {
    position: absolute;
    top: 0;
    right: 0;
    width: 17%;
    z-index: 20;
  }
  .d-left {
    position: absolute;
    left: 0;
    width: 20%;
    z-index: 20;
  }
  .d-right {
    position: absolute;
    width: 20%;
    right: 0;
    z-index: 20;
  }
}
</style>
