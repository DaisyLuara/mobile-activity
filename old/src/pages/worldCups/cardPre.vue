<template>
  <!-- eslint-disable -->
  <!-- Abandoned -->
  <div
    :style="style.root"
    class="cp-root"
  >
    <div class="root-header" />

    <div
      :style="style.mid"
      class="root-mid"
    >
      <img
        class="mid-title"
        :src="baseUrl + 'title.png'"
      />
      <div class="mid-input">
        <input
          @focus="handleFocus(1)"
          @blur="handleFocus(0)"
          type="telephone"
          maxlength="11"
          v-model.number="bindData.phone"
          class="input-real"
        />
        <img
          class="input-img"
          :src="control.focous === 0 ? baseUrl + 'input.png' : baseUrl + 'btn-clicked.png'"
        />
      </div>
      <div
        class="mid-button"
        @touchstart="handleTouch('start')"
        @touchend="handleTouch('end')"
      >
        <img :src="control.buttonState === 'end'? baseUrl + 'btn-ok-1.png' : baseUrl + 'btn-ok-2.png'" />
      </div>
    </div>

    <div class="root-bottom" />
  </div>
</template>

<script>
/* eslint-disable */
const wiw = window.innerWidth;
const wih = window.innerHeight;
import { Toast } from "mint-ui";
import { normalPages } from "@/mixins/normalPages";
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          width: "100%",
          height: wih + "px"
        },
        mid: {}
      },
      bindData: {
        phone: null
      },
      control: {
        buttonState: "end",
        focous: 0
      },
      game_id: null,
      baseUrl:
        "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/card_pr/"
    };
  },
  created() {
    this.style.mid.height = (window.innerWidth * 1124) / 690 + "px";
  },
  wacth: {
    parms() {
      this.game_id = this.parms.game_id;
    }
  },
  methods: {
    handleTouch(state) {
      if (state === "start") {
        this.control.buttonState = "start";
      } else if (state === "end") {
        this.control.buttonState = "end";
        this.checkPhone();
      }
    },
    checkPhone() {
      if (!/^1[345678]\d{9}$/.test(this.bindData.phone)) {
        Toast("输入的手机号有误");
        return;
      } else {
        this.goNext();
      }
    },
    handleFocus(state) {
      this.control.focous = state;
    },
    goNext() {
      const baseUrl = process.env.EXE_API;

      let request_url =
        `${baseUrl}/goodsxsd/?id=` +
        String(this.$route.query.id) +
        "&mobile=" +
        String(this.bindData.phone) +
        "&api=json";
      this.$http
        .get(request_url)
        .then(r => {
          let newurl =
            window.location.origin +
            "/marketing/wc_card?id=" +
            this.$route.query.id +
            "&game_id=" +
            this.game_id;

          // console.log('url: ', newurl)
          window.location.href = newurl;

          // this.$router.push({
          //   name: 'WorldCupCard',
          //   query: {
          //     id: this.$route.query.id
          //   }
          // })
        })
        .catch(err => {
          Toast(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@imgServerUrl: "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup";

.cp-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  position: relative;
  .root-header {
    flex-grow: 1;
    flex-shrink: 1;
    background-image: url("@{imgServerUrl}/bg_top.png");
    background-size: cover;
    width: 100%;
    position: relative;
  }
  .root-bottom {
    flex-grow: 1;
    flex-shrink: 1;
    background-image: url("@{imgServerUrl}/bg_bottom.png");
    background-size: cover;
    width: 100%;
  }
  .root-mid {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    background-image: url("@{imgServerUrl}/card_pr/bg_02.png");
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: #131314;
    overflow: hidden;
    .mid-title {
      width: 65%;
      margin-top: 20%;
    }
    .mid-input {
      width: 65%;
      position: relative;
      z-index: 10;
      .input-real {
        position: absolute;
        border: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 11;
        background-color: transparent;
        color: white;
        padding: 5% 20%;
      }
      .input-img {
        width: 100%;
        height: 100%;
        z-index: 12;
      }
    }
    .mid-button {
      width: 65%;
      margin-bottom: 40%;
    }
  }
}
</style>


