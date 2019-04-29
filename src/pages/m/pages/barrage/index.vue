<template>
  <div 
    :style="bindStyle" 
    class="barrage"
  >
    <div class="holder">
      <img 
        :src="loginState.face" 
        class="avatar"
      >
      <textarea 
        v-model="inputvalue" 
        class="inputarea" 
        placeholder="请输入" 
        maxlength="40"
      />
      <div class="count">
        {{ currentWords }}/40
      </div>
    </div>
    <div
      :class="{'button gray': inputvalue.length === 0, 'button': inputvalue !== 0}"
      @click="handleSendBarrage"
    >
      发送
    </div>
    <div 
      class="xo-combine" 
      @click="getBarrage"
    >
      <img 
        v-if="loginState.gender === '1'" 
        :src="xoGirl" 
        class="xo-img"
      >
      <img 
        v-else 
        :src="xoBoy" 
        class="xo-img"
      >
      <div class="text-holder">
        <div class="text">
          <span style="color: #6d1eff;">{{ computedText }}</span>
          <span>点我试试！生成最潮弹幕~</span>
        </div>
        <img 
          :src="textHolder" 
          class="text-bg"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { sendBarrage, getAcgn } from "services";
import { Toast } from "mint-ui";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      inputvalue: "",
      xoBoy: "https://cdn.xingstation.cn/fe/image/m/barrage-xo-boy.png",
      xoGirl: "https://cdn.xingstation.cn/fe/image/m/barrage-xo-girl.png",
      textHolder: "https://cdn.xingstation.cn/fe/image/m/barrage-text-holder.svg",
      sendingLock: false,
      bindStyle: {
        minHeight: this.$innerHeight() + "px"
      }
    };
  },
  computed: {
    currentWords() {
      return this.inputvalue.length;
    },
    ...mapGetters(["z", "loginState", "lastBarrageTime"]),
    computedText() {
      if (this.loginState.gender === "1") {
        return "小哥哥,";
      } else if (this.loginState.gender === "2") {
        return "小姐姐,";
      }
      return "";
    }
  },
  methods: {
    ...mapMutations({
      setLastBarrageTime: "SET_LAST_BARRAGE_TIME"
    }),
    handleSendBarrage() {
      if (this.sendingLock) {
        return;
      }
      if (this.inputvalue.length === 0) {
        return;
      }
      if (this.lastBarrageTime === null) {
        this.setLastBarrageTime(new Date().getTime());
      } else if (new Date().getTime() - this.lastBarrageTime < 2000) {
        Toast("请不要发得太快哦");
        return;
      }
      let payload = {
        mkey: this.$route.params.mkey,
        z: this.z,
        comment: this.inputvalue,
        api: "json"
      };
      this.sendingLock = true;
      sendBarrage(payload)
        .then(r => {
          console.dir(r);
          if (r.data.state === "1") {
            this.setLastBarrageTime(Date.now());
            Toast("发送成功");
            this.inputvalue = "";
          } else {
            Toast(String(r.data.results));
          }
          this.sendingLock = false;
        })
        .catch(e => {
          Toast("网络错误");
          this.sendingLock = false;
        })
        .finally(() => {
          this.sendingLock = false;
        });
    },
    getBarrage() {
      let payload = {
        z: this.z,
        mkey: this.$route.params.mkey,
        api: "json"
      };
      getAcgn(payload)
        .then(r => {
          console.dir(r);
          if (r.data.state === "1") {
            this.inputvalue = String(r.data.results.parms);
          }
        })
        .catch(e => {
          this.inputvalue = "";
          Toast(e.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@base: "77.5px";
.barrage {
  background: white;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: relative;
  .holder {
    width: 3.65rem;
    height: 90px;
    background: rgba(245, 245, 245, 1);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    margin-top: 35px;
    overflow: hidden;
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .avatar {
      width: 77.5px;
      height: 77.5px;
      border-radius: 50%;
      margin-left: 5px;
    }
    .count {
      position: absolute;
      top: 0.9rem;
      right: 0.08rem;
      width: 0.4rem;
      height: 0.25rem;
      display: flex;
      line-height: 0.25rem;
      text-align: center;
      font-size: 12px;
      color: rgba(157, 157, 157, 1);
      text-align: center;
    }
    .inputarea {
      margin-left: 5px;
      width: calc(~"3.75rem - 87.5px");
      height: 90px;
      background: rgba(245, 245, 245, 1);
      padding: 0.11rem;
      font-size: 0.14rem;
      color: rgba(148, 78, 245, 1);
      line-height: 0.2rem;
      font-weight: 500;
      font-size: 0.14rem;
      border: none;
    }
  }
  .button {
    margin-top: 37px;
    width: 3.55rem;
    height: 35px;
    background: rgba(109, 30, 255, 1);
    opacity: 1;
    border-radius: 11px;
    font-size: 13px;
    text-align: center;
    font-weight: 400;
    line-height: 35px;
    color: white;
    &.gray {
      background: gray;
    }
  }
  .xo-combine {
    height: 3.2rem;
    width: 3.75rem;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 20;
    .xo-img {
      width: 3.03rem;
      position: absolute;
      z-index: 30;
      left: -0.4rem;
      bottom: 48px;
    }
    .text-holder {
      width: 1.5rem;
      height: 0.63rem;
      position: absolute;
      bottom: 1.35rem;
      right: 0.23rem;
      z-index: 60;
      font-size: 0.12rem;
      .text-bg {
        width: 100%;
        height: 100%;
        z-index: 50;
        position: absolute;
        left: 0;
        top: 0;
      }
      .text {
        padding: 0.14rem 0.2rem;
        width: 100%;
        height: 100%;
        z-index: 60;
        position: absolute;
        left: 0;
        top: 0;
        color: rgba(57, 57, 61, 1);
        line-height: 0.17rem;
        font-weight: bold;
      }
    }
  }
}
</style>
