<template>
  <div class="barrage">
    <div class="title">
      <div
        :class="{'button gray': inputvalue.length === 0, 'button': inputvalue !== 0}"
        @click="handleSendBarrage"
      >发送</div>
    </div>
    <textarea class="inputarea" v-model="inputvalue" placeholder="请输入" maxlength="40"></textarea>
    <div class="count">{{currentWords}}/40</div>
  </div>
</template>

<script>
import { sendBarrage } from "services";
import { Toast } from "mint-ui";
import { mapGetters } from "vuex";
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
    ...mapGetters(["z"])
  },
  methods: {
    handleSendBarrage() {
      if (this.inputvalue.length === 0) {
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
.barrage {
  background: white;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  .title {
    height: 32px;
    width: 100%;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
    .button {
      width: 50px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      background: rgba(148, 78, 245, 1);
      border-radius: 12px;
      font-size: 13px;
      font-weight: 400;
      &.gray {
        background: gray;
      }
    }
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
    width: 3.75rem;
    height: 1.18rem;
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
</style>
