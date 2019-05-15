<template>
  <div>
    <div class="content-wrap">
      <div class="gaobaiArea">
        <img
          :src="`${CDNURL}/dimond520/back_ribbon03.png`"
          class="back-shape-1"
        >
        <img
          :src="`${CDNURL}/dimond520/love_bg_single.png`"
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
            :src="`${CDNURL}/dimond520/single_merge.png`"
            @click="submitBtnClickable && handleSubmit()"
          >
          <img
            v-show="!submitBtnClickable"
            :src="`${CDNURL}/dimond520/single_merge_disable.png`"
          >
        </div>
        <!-- 照片 -->
        <div class="love-upload-area">
          <img
            v-if="photo"
            :src="photo"
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
            <div class="text-counter">
              {{ loveName.length }}/4
            </div>
          </div>
          <div class="input-group">
            <textarea
              v-model="loveMsg"
              maxlength="15"
              class="love-input message"
            />
            <div class="text-counter">
              {{ loveMsg.length }}/15
            </div>
          </div>
        </div>
      </div>
      <img
        :src="`${CDNURL}/dimond520/lottery_single_rule.png`"
        class="love-rule"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { Toast } from 'mand-mobile'
import "../../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  props: {
    photo: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      CDNURL: CDNURL,
      loveName: '',
      loveMsg: ''
    }
  },
  computed: {
    ...mapGetters(["z"]),
    submitBtnClickable() {
      return this.loveName && this.loveMsg
    }
  },
  mounted() {

  },
  methods: {
    handleSubmit() {
      let data = {
        name: this.loveName,
        message: this.loveMsg,
        qiniu_id: this.$route.query.id
      }
      this.$emit('submitLoveMsg', data)
    }
  }
}
</script>

<style lang="less" scoped>
img {
  display: block;
}
.content-wrap {
  padding-top: 0.46rem;
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
    width: 1.13rem;
    height: 2rem;
    top: 1.79rem;
    left: 0.38rem;
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
    top: 2.12rem;
    right: 0.28rem;
    .input-group {
      position: relative;
      margin-bottom: 0.56rem;
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
  height: auto;
  margin: 0 auto 0.12rem;
}
</style>