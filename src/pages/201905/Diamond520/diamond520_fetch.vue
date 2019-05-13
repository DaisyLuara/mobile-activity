<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/leaf1.png`"
      class="leaf-img-1"
    >
    <div class="content-wrap">
      <img
        :src="`${CDNURL}/dimond520/diamond_big.png`"
        class="diamond-img"
      >
      <div class="input-wrap">
        <input
          :value="phone"
          type="text"
          placeholder="请输入你的手机号"
          class="phone-input"
          maxlength="11"
          @input="handleInputPhone"
        >
      </div>
      <img
        :src="`${CDNURL}/dimond520/fetch_btn.png`"
        class="fetch-button"
        @click="handleFetch"
      >
    </div>
    <div class="sponsor-area">
      <img
        :src="`${CDNURL}/dimond520/sponsor.png`"
        class="sponsor-img"
      >
      <img
        :src="`${CDNURL}/dimond520/leaf2.png`"
        class="leaf-img-2"
      >
    </div>
  </div>
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import {
  $wechat,
  isInWechat,
  filterNumber,
  validatePhone,
  fetchPhotoByPhone,
  pushPhoto
} from 'services'
import { Toast } from 'mand-mobile'
import "../../../assets/less/reset-mand.less"
import { mapGetters } from "vuex"
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520Fetch",
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      phone: ''
    }
  },
  computed: {
    ...mapGetters(["weixinUrl"])
  },
  mounted() {
    this.handleForbiddenShare()
  },
  methods: {
    //禁止微信分享
    handleForbiddenShare() {
      if (isInWechat() === true) {
        $wechat(this.weixinUrl).then(res => {
          res.forbidden()
        })
      }
    },
    handleInputPhone(event) {
      const number = filterNumber(event.target.value)
      this.phone = number
      event.target.value = number
    },
    isValidPhone() {
      const valid = validatePhone(this.phone)
      !valid && Toast.info('手机号输入错误，请重新输入')
      return valid
    },
    async handleFetch() {
      if (!this.isValidPhone()) {
        return
      }
      let params = {
        phone: this.phone
      }
      Toast.loading('提取中')
      try {
        let res = await fetchPhotoByPhone(params)
        console.log(res)
        if (res.code === 404) {
          Toast.failed('无照片信息', 2000, true)
          return
        } else if (res.code === 0) {
          let photo = res.data
          if (photo.status === 1) {
            let params = {
              value: this.$route.query.value,
              img: photo.url
            }
            await pushPhoto(params)
            Toast.succeed('提取成功')
          } else if (photo.status === 0) {
            Toast.failed('照片审核未通过', 2000, true)
          } else if (photo.status === 2) {
            Toast.failed('照片待审核', 2000, true)
          }
        }
      } catch(e) {
        console.log(e)
        Toast.failed('提取失败', 2000, true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/cdnUrl.less";
@import "../../../assets/less/diamond.less";


::-webkit-input-placeholder {
  color: #B7B7B7;
  font-size: 0.15rem;
}
:-moz-placeholder {
  color: #B7B7B7;
  opacity: 1;
  font-size: 0.15rem;
}
::-moz-placeholder {
  color: #B7B7B7;
  opacity: 1;
  font-size: 0.15rem;
}

.leaf-img-1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 1.14rem;
  height: 1.12rem;
}
.content-wrap {
  padding-top: 0.67rem;
  position: relative;
  .diamond-img {
    width: 2.86rem;
    height: 1.75rem;
    margin: 0 auto 0.32rem;
  }
  .input-wrap {
    width: 2.48rem;
    margin: 0 auto 0.18rem;
    .phone-input {
      display: block;
      width: 100%;
      height: 0.4rem;
      line-height: 0.4rem;
      outline: none;
      border: 1px solid #FF0405;
      border-radius: 0.04rem;
      font-size: 0.15rem;
      padding-left: 0.14rem;
    }
  }
  .fetch-button {
    width: 2.07rem;
    height: 0.6rem;
    margin: 0 auto;
  }
}
.sponsor-area {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 0.89rem;
  padding-top: 0.3rem;
  background-image: url("@{cdnUrl}/dimond520/sponsor_back_2.png");
  background-size: 100% 100%;
  .sponsor-img {
    width: 1.57rem;
    height: 0.44rem;
    margin: 0 auto;
  }
  .leaf-img-2 {
    position: absolute;
    top: -0.34rem;
    left: -0.01rem;
    width: 0.77rem;
    height: 0.88rem;
  }
}
</style>