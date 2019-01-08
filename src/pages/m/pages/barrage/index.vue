<template>
  <div class="barrage">
    <div class="holder">
      <img class="avatar" :src="loginState.face">
      <textarea class="inputarea" v-model="inputvalue" placeholder="请输入" maxlength="40"></textarea>
      <div class="count">{{currentWords}}/40</div>
    </div>
    <div
      :class="{'button gray': inputvalue.length === 0, 'button': inputvalue !== 0}"
      @click="handleSendBarrage"
    >发送</div>
  </div>
</template>

<script>
import { sendBarrage } from "services";
import { Toast } from "mint-ui";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      inputvalue: ""
    };
  },
  computed: {
    currentWords() {
      return this.inputvalue.length;
    },
    ...mapGetters(["z", "loginState", "lastBarrageTime"])
  },
  methods: {
    ...mapMutations({
      setLastBarrageTime: "SET_LAST_BARRAGE_TIME"
    }),
    handleSendBarrage() {
      if (this.inputvalue.length === 0) {
        return;
      }
      if (this.lastBarrageTime === null) {
        this.setLastBarrageTime(Date.now());
      } else if (Date.now() - this.lastBarrageTime < 10000) {
        Toast("请不要发得太快哦");
        return;
      }
      let payload = {
        mkey: this.$route.params.mkey,
        z: this.z,
        comment: this.inputvalue,
        api: "json"
      };
      sendBarrage(payload)
        .then(r => {
          console.dir(r);
          if (r.data.state === "1") {
            Toast("发送成功");
            this.inputvalue = "";
          } else {
            Toast(String(r.data.results));
          }
        })
        .catch(e => {
          Toast("网络错误");
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
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
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
}
</style>
