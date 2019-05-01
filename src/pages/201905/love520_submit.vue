<template>
  <div>
    <div>
      <div class="diamond">
        <img
          :src="`${CDNURL}/dimond520/diamond_big.png`"
          class="diamond-img"
        >
      </div>
      <div class="gaobaiArea">
        <img
          :src="`${CDNURL}/dimond520/back_ribbon03.png`"
          class="back-shape-1"
        >
        <img
          :src="`${CDNURL}/dimond520/love_bg.png`"
          class="love-back"
        >
        <img
          :src="`${CDNURL}/dimond520/back_ribbon01.png`"
          class="back-shape-2"
        >
        <img
          :src="`${CDNURL}/dimond520/back_ribbon02.png`"
          class="back-shape-3"
        >
        <img
          :src="`${CDNURL}/dimond520/love_title.png`"
          class="love-title"
        >
        <div class="love-submit-group">
          <img
            v-show="submitBtnClickable"
            :src="`${CDNURL}/dimond520/love_submit.png`"
            @click="submitBtnClickable && handleSubmit()"
          >
          <img
            v-show="!submitBtnClickable"
            :src="`${CDNURL}/dimond520/love_submit_disable.png`"
          >
        </div>
        <!-- 照片上传 -->
        <div class="love-upload-area">
          <input
            type="file"
            accept="image/*"
            class="img-upload"
            @change="handleUpload"
          >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="uploaded-img"
          >
        </div>
        <div class="love-input-wrap">
          <div class="input-group">
            <input
              v-model="loveName"
              type="text"
              maxlength="4"
              class="love-input"
            >
            <div class="text-counter">{{ loveName.length }}/4</div>
          </div>
          <div class="input-group">
            <input
              type="text"
              maxlength="11"
              class="love-input"
              @input="handleInput"
            >
          </div>
          <div class="input-group">
            <textarea
              v-model="loveMsg"
              maxlength="15"
              class="love-input message"
            />
            <div class="text-counter">{{ loveMsg.length }}/15</div>
          </div>
        </div>
      </div>
      <img
        :src="`${CDNURL}/dimond520/love_rule.png`"
        class="love-rule"
      >
    </div>
  </div>
</template>

<script>
import {
  filterNumber,
  validatePhone,
  qiniuToken,
  uploadImgToQiniu,
  postActivityMedia
} from 'services'
import { mapGetters } from "vuex"
import { Toast } from 'mand-mobile'
import "../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  data () {
    return {
      CDNURL: CDNURL,
      token: '',
      loveName: '',
      lovePhone: '',
      loveMsg: '',
      imageUrl: '',
    }
  },
  computed: {
    ...mapGetters(["z"]),
    submitBtnClickable() {
      return this.loveName && this.lovePhone && this.loveMsg && this.imageUrl
    }
  },
  mounted() {
    this.getQiniuToken()
  },
  methods: {
    async getQiniuToken() {
      try {
        let res = await qiniuToken()
        if (res) {
          this.token = res
        }
      } catch(e) {
        console.log(e)
      }
    },
    async handleUpload(event) {
      const file = event.target.files[0]
      const size = file.size
      if (size / 1024 / 1024 > 4) {
        Toast.info('图片大小不能超过4MB!')
        return
      }
      let name = file.name
      let time = new Date().getTime()
      let random = parseInt(String(Math.random() * 10 + 1), 10)
      let suffix = time + '_' + random + '_' + name
      let key = encodeURI(`${suffix}`)
      let args = new FormData()
      args.append('file', file)
      args.append('token', this.token)
      args.append('key', key)
      // 上传
      Toast.loading('上传中')
      try {
        let { key } = await uploadImgToQiniu(args)
        let callbackArgs = {
          name,
          key,
          size,
          activity_id: 1 // 活动标识
        }
        let { url } = await postActivityMedia(callbackArgs)
        this.imageUrl = url
        Toast.hide()
      } catch(e) {
        Toast.info('上传失败')
        console.log(e)
      }
    },
    handleInput() {
      const number = filterNumber(event.target.value)
      this.lovePhone = number
      event.target.value = number
    },
    // 手机号是否正确
    isValidPhone() {
      const valid = validatePhone(this.lovePhone)
      !valid && Toast.info('手机号输入错误，请重新输入')
      return valid
    },
    handleSubmit() {
      if (!this.isValidPhone()) {
        return
      }
    }
  }
}
</script>

<style lang="less" scoped>
img {
  display: block;
}
.diamond {
  width: 2.86rem;
  height: 1.75rem;
  margin: 0 auto 0.11rem;
  padding-top: 0.21rem;
  position: relative;
  .diamond-img {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
.gaobaiArea {
  position: relative;
  width: 3.62rem;
  height: 5.21rem;
  margin: 0 auto 0.18rem;
  .back-shape-1 {
    position: absolute;
    bottom: -1.23rem;
    right: -0.07rem;
    width: 2.5rem;
    height: 1.88rem;
  }
  .love-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .back-shape-2 {
    position: absolute;
    top: -0.11rem;
    left: -0.25rem;
    width: 2.37rem;
    height: 1.32rem;
  }
  .back-shape-3 {
    position: absolute;
    bottom: -0.66rem;
    right: 0.03rem;
    width: 2.42rem;
    height: 2.35rem;
  }
  .love-title {
    position: absolute;
    top: -0.44rem;
    left: 0.3rem;
    width: 2.96rem;
    height: 2.06rem;
  }
  .love-submit-group {
    position: absolute;
    bottom: 0.53rem;
    left: 50%;
    width: 1.58rem;
    height: 0.6rem;
    margin-left: -0.79rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .love-upload-area {
    position: absolute;
    width: 1.11rem;
    height: 2rem;
    top: 1.7rem;
    left: 0.39rem;
    .img-upload {
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .uploaded-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #FFF;
    }
  }
  .love-input-wrap {
    position: absolute;
    width: 1.57rem;
    top: 1.8rem;
    right: 0.27rem;
    .input-group {
      position: relative;
      margin-bottom: 0.4rem;
      .love-input {
        display: block;
        width: 100%;
        height: 0.32rem;
        line-height: 0.32rem;
        padding-left: 0.09rem;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #F37EA6;
        border-radius: 10px;
        font-size: 0.15rem;
        &.message {
          height: 0.63rem;
          line-height: 0.18rem;
          padding-right: 0.09rem;
          resize: none;
        }
      }
      .text-counter {
        font-size: 0.1rem;
        color: #D12D48;
        position: absolute;
        right: 0;
        bottom: -0.15rem;
      }
    } 
  }
}
.love-rule {
  position: relative;
  width: 3.31rem;
  height: 3.61rem;
  margin: 0 auto 0.12rem;
}
</style>