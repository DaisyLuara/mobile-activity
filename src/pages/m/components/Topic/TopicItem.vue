<template>
  <div class="topic-item">
    <!-- <TopicSwiper :imgUrls="imgUrls" /> -->
    <img 
      v-if="shoudTagShow" 
      :src="tagUrl" 
      class="tag">
    <img 
      :src="imgUrls + cp" 
      class="swipers"> 
    <div class="author">
      <img 
        :src="avatar" 
        class="avatar">
      <div class="user">
        <div class="name">
          {{ userName }}
        </div>
        <div class="time">
          {{ computedDate }}
        </div>
      </div>
      <div class="title">
        {{ title }}
      </div>
    </div>
    <div class="chooses">
      <div 
        v-if="choose !== 'B'"
        :class="{'choose-item A':choose === '', 'choose-item A show':choose === 'A', 'choose-item A hide':choose === 'B'}"
        @click="handleChooseClick('A')" >
        <div class="label">A</div>
        <div class="text">
          {{ othertype1 }}
        </div>
      </div>
      <div 
        v-if="choose === 'A'" 
        class="choose-item result A">
        <div class="count">
          共{{ otherid1 }}人支持
        </div>
        <div class="percent">
          [{{ computedPercentA }}]
        </div>
      </div>
      <div 
        v-if="choose === 'B'" 
        class="choose-item result B">
        <div class="count">
          共{{ otherid2 }}人支持
        </div>
        <div class="percent">
          [{{ computedPercentB }}]
        </div>
      </div>

      <div 
        v-if="choose !== 'A'"
        :class="{'choose-item B':choose === '', 'choose-item B show':choose === 'B', 'choose-item B hide':choose === 'A'}"
        @click="handleChooseClick('B')" >
        <div class="text B">
          {{ othertype2 }}
        </div>
        <div class="label">B</div>
      </div>
    </div>

  </div>
</template>

<script>
import { optionsVote } from "services";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  props: {
    avrid: {
      type: String,
      required: true,
      default: ""
    },
    acid: {
      type: String,
      required: true,
      default: ""
    },
    imgUrls: {
      type: String,
      required: true,
      default: ""
    },
    avatar: {
      type: String,
      required: true,
      default: ""
    },
    userName: {
      type: String,
      required: true,
      dafault: ""
    },
    postTime: {
      type: String,
      required: true,
      default: ""
    },
    title: {
      type: String,
      required: true,
      default: ""
    },
    othertype1: {
      type: String,
      required: true,
      default: ""
    },
    othertype2: {
      type: String,
      required: true,
      default: ""
    },
    otherid1: {
      type: String,
      required: true,
      default: "0"
    },
    otherid2: {
      type: String,
      required: true,
      default: "0"
    },
    other1: {
      type: String,
      required: true,
      default: "0"
    },
    other2: {
      type: String,
      required: true,
      default: "0"
    }
  },
  data() {
    return {
      cp: "?imageView2/1/w/343/h/343/format/jpg/q/100|imageslim",
      tagUrl: "https://cdn.xingstation.cn/fe/image/m/options.svg",
      ownChoosen: null
    };
  },
  computed: {
    ...mapGetters(["z"]),
    choose() {
      if (this.other1 === "1" || this.ownChoosen === "A") {
        return "A";
      } else if (this.other2 === "1" || this.ownChoosen === "B") {
        return "B";
      }
      return "";
    },
    shoudTagShow() {
      let { acid } = this.$route.query;
      if (acid) {
        return false;
      }
      if (!this.acid) {
        return false;
      } else {
        if (Number(this.acid) <= 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    computedDate() {
      let now = moment(new Date().getTime());
      let cld = moment(Number(this.postTime));
      // console.log(cld);
      let diffyear = cld.diff(now, "years");
      let diffday = now.diff(cld, "days");
      if (diffyear >= 1) {
        return cld.format("YYYY-MM-DD HH:mm:ss");
      } else if (moment(now).isSame(cld, "day")) {
        return cld.format("HH:mm:ss");
      } else {
        return cld.format("MM-DD HH:mm:ss");
      }
      return "";
    },
    computedPercentA() {
      const A = Number(this.otherid1);
      const B = Number(this.otherid2);
      return ((A / (A + B)) * 100).toFixed(2) + "%";
    },
    computedPercentB() {
      const A = Number(this.otherid1);
      const B = Number(this.otherid2);
      return ((B / (A + B)) * 100).toFixed(2) + "%";
    }
  },
  methods: {
    async handleChooseClick(choose) {
      if (this.choose !== "") {
        return;
      }
      let option = "";
      if (choose === "A") {
        option = "1";
      } else if (choose === "B") {
        option = "2";
      }
      const payload = {
        mkey: this.$route.params.mkey,
        z: this.z,
        avrid: this.avrid,
        api: "json",
        option: option
      };
      let optionResults = await optionsVote(payload);
      if (optionResults.data.state && optionResults.data.state === "1") {
        this.ownChoosen = choose;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.topic-item {
  position: relative;
  width: 3.43rem;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  .tag {
    position: absolute;
    z-index: 60;
    top: 0;
    right: 0;
    width: 0.44rem;
    height: 0.44rem;
  }

  .swipers {
    width: 3.43rem;
    height: 3.43rem;
  }

  .author {
    width: 3.43rem;
    height: 1rem;
    position: relative;
    .avatar {
      position: absolute;
      width: 0.51rem;
      height: 0.51rem;
      border: 1px solid rgba(255, 255, 255, 1);
      border-radius: 50%;
      left: 0.15rem;
      top: -0.15rem;
    }
    .user {
      position: absolute;
      top: 0;
      left: 0.72rem;
      width: 1.5rem;
      height: 0.4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .name {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
      }
      .time {
        color: rgba(153, 153, 153, 1);
        font-size: 12px;
      }
    }
    .title {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 0.15rem;
      height: 0.4rem;
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 0.1rem;
    }
  }

  .chooses {
    height: 0.61rem;
    width: 3.43rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    align-items: center;
    .choose-item {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      .label {
        width: 0.26rem;
        height: 0.54rem;
        font-size: 0.39rem;
        color: white;
        line-height: 0.54rem;
      }
      .text {
        width: 1rem;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        font-weight: 400;
        &.B {
          text-align: right;
        }
      }
      &.A {
        background: rgba(243, 56, 83, 1);
        &.show {
          width: 50%;
        }
        &.hide {
          width: 0;
        }
      }
      &.B {
        background: rgba(66, 151, 247, 1);
        &.show {
          width: 50%;
        }
        &.hide {
          width: 0;
        }
      }
      &.result {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        justify-content: center;
        .count {
          font-size: 12px;
        }
        .percent {
          font-size: 25px;
        }
        &.A {
          background: rgba(243, 56, 83, 1);
        }
        &.B {
          background: rgba(66, 151, 247, 1);
        }
      }
    }
  }
}
</style>
