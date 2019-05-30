<template>
  <div class="my">
    <NoListContentReminder
      :show="false"
      words="你还没有解锁嗨玩屏"
    />
    <img
      :src="bgUrl"
      class="bg"
    >
    <div class="reminder">
      <div
        v-if="currentName.length <=7"
        class="text"
      >
        <img
          :src="currentIcon"
          class="icon"
        >
        当前互动“
        <span style="color: #6d1eff;">{{ currentName }}</span>”
      </div>
      <div
        v-if="currentName.length >7"
        style="color: #6d1eff;"
        class="text"
      >
        <img
          :src="currentIcon"
          class="icon"
        >
        {{ currentName }}
      </div>
    </div>
    <div class="board">
      <div class="title">
        今日互动指数
      </div>
      <div class="sub">
        <span class="label">人气指数</span>
        <transition-group
          name="fade"
          class="trg"
        >
          <img
            v-for="(item, index) in inviteNum"
            :key="index"
            :src="star"
            class="star"
          >
        </transition-group>
        <transition name="fade">
          <img
            v-if="inviteNumExtra"
            :src="halfstar"
            class="star"
          >
        </transition>
      </div>
      <div class="sub">
        <span class="label">幸运指数</span>
        <transition-group
          name="fade"
          class="trg"
        >
          <img
            v-for="(item, index) in luckNum"
            :key="index"
            :src="star"
            class="star"
          >
        </transition-group>
        <transition name="fade">
          <img
            v-if="luckNumExtra"
            :src="halfstar"
            class="star"
          >
        </transition>
      </div>
      <div class="sub">
        <span class="label">推荐指数</span>
        <transition-group
          name="fade"
          class="trg"
        >
          <img
            v-for="(item, index) in topNum"
            :key="index"
            :src="star"
            class="star"
          >
        </transition-group>
        <transition name="fade">
          <img
            v-if="topNumExtra"
            :src="halfstar"
            class="star"
          >
        </transition>
      </div>
    </div>
    <div class="avatar">
      <img :src="loginState.face">
    </div>
    <div class="nickname">
      {{ loginState.username }}
    </div>
    <div
      class="barrage"
      @click="navinagteToBarrage"
    >
      <img
        :src="hot"
        class="hot"
      >
      <div class="barrage-icon" />
      <div>发弹幕</div>
    </div>
    <div
      class="achivement"
      @click="navinagteToAchivement"
    >
      <div class="achivement-icon" />
      <div>成就勋章</div>
    </div>
    <div
      class="mygame"
      @click="navinagteToGamePlayed"
    >
      <div class="mygame-icon" />
      <div>参与过的互动</div>
    </div>

    <div class="my-holder" />
  </div>
</template>

<script>
import NoListContentReminder from "@/pages/m/components/Reminder/NoListContentReminder";
import { mapGetters } from "vuex";
import { fetchRunPro } from "services";
export default {
  components: {
    NoListContentReminder
  },
  data() {
    return {
      hasFetched: false,
      hasResults: true,
      dbg: "https://cdn.xingstation.cn/fe/image/m/my-text-bg.png",
      star: "https://cdn.xingstation.cn/fe/image/m/my-star.svg",
      halfstar: "https://cdn.xingstation.cn/fe/image/m/my-star-half.svg",
      hot: "https://cdn.xingstation.cn/fe/image/m/my-hot.svg",
      resData: [],
      itv: null,
      count: 0
    };
  },
  computed: {
    ...mapGetters(["loginState", "z"]),
    bgUrl() {
      if (this.loginState.gender === "1") {
        return "https://cdn.xingstation.cn/fe/image/m/my-bg-girl.jpg";
      } else {
        return "https://cdn.xingstation.cn/fe/image/m/my-bg-boy.jpg";
      }
    },
    currentP() {
      if (this.resData.length === 0) {
        return null;
      }
      return this.count % this.resData.length;
    },
    currentName() {
      if (this.currentP === null) {
        return "";
      }
      return this.resData[this.currentP].name;
    },
    inviteNum() {
      if (this.currentP === null) {
        return 0;
      }
      return parseInt(Number(this.resData[this.currentP].invite_num));
    },
    inviteNumExtra() {
      if (this.currentP === null) {
        return false;
      }
      let n = Number(this.resData[this.currentP].invite_num);
      return n - Math.floor(n) > 0 ? true : false;
    },
    luckNum() {
      if (this.currentP === null) {
        return 0;
      }
      return parseInt(Number(this.resData[this.currentP].luck_num));
    },
    luckNumExtra() {
      if (this.currentP === null) {
        return false;
      }
      let n = Number(this.resData[this.currentP].luck_num);
      return n - Math.floor(n) > 0 ? true : false;
    },
    topNum() {
      if (this.currentP === null) {
        return 0;
      }
      return parseInt(Number(this.resData[this.currentP].top_num));
    },
    topNumExtra() {
      if (this.currentP === null) {
        return false;
      }
      let n = Number(this.resData[this.currentP].top_num);
      return n - Math.floor(n) > 0 ? true : false;
    },
    currentIcon() {
      if (this.currentP === null) {
        return "";
      }
      let n = this.resData[this.currentP].icon;
      return n;
    }
  },
  created() {
    this.fetchMyData();
  },
  beforeDestroy() {
    clearInterval(this.itv);
  },
  methods: {
    async fetchMyData() {
      try {
        let payload = {
          z: this.z,
          mkey: this.$route.params.mkey,
          api: "json"
        };
        let r = await fetchRunPro(payload);
        const dataStatus = r.data && r.data.state;
        if (!dataStatus || r.data.state !== "1") {
          this.$router.push({
            name: "mSite404"
          });
          return;
        }
        this.resData = r.data.results.data;
        this.itv = setInterval(() => {
          this.count++;
        }, 5000);
      } catch (e) {
        console.log(e);
      }
    },
    navinagteToGamePlayed() {
      this.$router.push({
        name: "MyGamePlayed",
        params: this.$route.params
      });
    },
    navinagteToAchivement() {
      this.$router.push({
        name: "MyAchivement",
        params: this.$route.params
      });
    },
    navinagteToBarrage() {
      this.$router.push({
        name: "BarrageIndex",
        params: this.$route.params
      });
    }
  }
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.my {
  position: relative;
  min-height: 100vh;
  z-index: 10;
  margin-top: -0.64rem;
  .bg {
    z-index: 20;
    width: 100%;
  }
  .board {
    width: 1.77rem;
    height: 1.14rem;
    position: absolute;
    top: 2.05rem;
    left: 0.14rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.09rem 0.1rem;
    .title {
      line-height: 0.2rem;
      color: rgba(230, 151, 151, 1);
      height: 0.2rem;
      font-size: 0.14rem;
      font-weight: 400;
      text-align: center;
    }
    .sub {
      height: 0.19rem;
      width: 100%;
      font-size: 0.13rem;
      font-weight: 400;
      line-height: 0.19rem;
      color: rgba(255, 255, 255, 1);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .label {
        margin-right: 0.09rem;
      }
      .star {
        height: 0.14rem;
        margin: 0 0.025rem;
      }
      .trg {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
  }
  .avatar {
    width: 0.775rem;
    height: 0.775rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    position: absolute;
    top: 3.535rem;
    left: 0.18rem;
    z-index: 50;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .nickname {
    position: absolute;
    top: 3.77rem;
    z-index: 50;
    left: 1.1rem;
    font-size: 0.14rem;
    font-weight: 400;
    color: rgba(34, 34, 34, 1);
  }
  .reminder {
    z-index: 30;
    position: absolute;
    left: 1rem;
    top: 1rem;
    width: 2.34rem;
    height: 0.475rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .rbg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 40;
      width: 100%;
      height: 100%;
    }
    .text {
      width: 100%;
      overflow: hidden;
      font-size: 0.14rem;
      height: 0.475rem;
      line-height: 0.475rem;
      color: black;
      z-index: 60;
      padding-left: 0.2rem;
      background-image: url("https://cdn.xingstation.cn/fe/image/m/my-text-bg.png");
      background-size: 100% 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 0.08rem;
        margin-left: 0.02rem;
        margin-right: 0.04rem;
      }
    }
  }
  .barrage {
    position: absolute;
    top: 4.565rem;
    left: 0.15rem;
    width: 1.675rem;
    height: 135px;
    background: linear-gradient(
      135deg,
      rgba(78, 139, 245, 1) 0%,
      rgba(148, 78, 245, 1) 100%
    );
    box-shadow: 0px 3px 6px rgba(139, 85, 245, 0.51);
    border-radius: 15px;
    font-size: 13px;
    color: white;
    z-index: 20;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .barrage-icon {
      width: 0.64rem;
      height: 0.64rem;
      background-image: url("https://cdn.xingstation.cn/fe/image/m/my-barrage.svg");
      background-size: 100% 100%;
      margin-bottom: 0.12rem;
    }
    .hot {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.51rem;
      height: 0.52rem;
    }
  }
  .achivement {
    position: absolute;
    top: 4.565rem;
    left: 1.925rem;
    width: 1.675rem;
    height: 62.5px;
    background: linear-gradient(
      135deg,
      rgba(185, 188, 255, 1) 0%,
      rgba(33, 207, 172, 1) 100%
    );
    box-shadow: 0px 3px 6px rgba(162, 191, 242, 0.74);
    border-radius: 15px;
    font-size: 13px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .achivement-icon {
      width: 0.41rem;
      height: 0.41rem;
      background-size: 100% 100%;
      background-image: url("https://cdn.xingstation.cn/fe/image/m/my-medal.svg");
      margin: 0 0.08rem;
    }
  }
  .mygame {
    position: absolute;
    width: 1.675rem;
    height: 62.5px;
    top: calc(~"4.565rem + 62.5px + 0.1rem");
    left: 1.925rem;
    background: linear-gradient(
      135deg,
      rgba(44, 205, 178, 1) 0%,
      rgba(243, 233, 181, 1) 100%
    );
    box-shadow: 0px 3px 6px rgba(72, 209, 179, 0.49);
    border-radius: 15px;
    font-size: 13px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .mygame-icon {
      width: 0.41rem;
      height: 0.41rem;
      background-size: 100% 100%;
      background-image: url("https://cdn.xingstation.cn/fe/image/m/my-achive.svg");
      margin: 0 0.08rem;
    }
  }
  .my-holder {
    position: relative;
    width: 100%;
    height: 48px;
    background: transparent;
  }
}
</style>
