<template>
  <div class="topic-item">
    <!-- <TopicSwiper :imgUrls="imgUrls" /> -->
    <img class="swipers" :src="imgUrls + cp"> 
    <div class="author">
      <img class="avatar" :src="avatar">
      <div class="user">
        <div class="name">
          {{userName}}
        </div>
        <div class="time">
          {{postTime}}
        </div>
      </div>
      <div class="title">
        {{title}}
      </div>
    </div>
    <div class="chooses">
      <div 
        @click="handleChooseClick('A')"
        :class="{'choose-item A':choose === '', 'choose-item A show':choose === 'A', 'choose-item A hide':choose === 'B'}" >
        <div class="label">A</div>
        <div class="text">
          {{othertype1}}
        </div>
      </div>
      <div 
        @click="handleChooseClick('B')"
        :class="{'choose-item B':choose === '', 'choose-item B show':choose === 'B', 'choose-item B hide':choose === 'A'}" >
        <div class="label">B</div>
        <div class="text">
          {{othertype2}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { optionsVote } from "services";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cp: "?imageView2/1/w/343/h/343/format/jpg/q/100|imageslim",
      ownChoosen: null
    };
  },
  props: {
    avrid: {
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
  computed: {
    ...mapGetters(["z"]),
    choose() {
      if (this.other1 === "1" || this.ownChoosen === "A") {
        return "A";
      } else if (this.other2 === "1" || this.ownChoosen === "B") {
        return "B";
      }
      return "";
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
      justify-content: space-around;
      align-items: flex-start;
      .name {
        font-size: 0.11rem;
        color: rgba(102, 102, 102, 1);
      }
      .time {
        color: rgba(153, 153, 153, 1);
        font-size: 0.08rem;
      }
    }
    .title {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 0.15rem;
      height: 0.4rem;
      font-size: 0.11rem;
      font-weight: 400;
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
        height: 0.3rem;
        font-size: 0.11rem;
        color: rgba(255, 255, 255, 1);
        font-weight: 400;
      }
      &.A {
        background: rgba(243, 56, 83, 1);
        &.show {
          width: 100%;
        }
        &.hide {
          width: 0;
          overflow: hidden;
        }
      }
      &.B {
        background: rgba(66, 151, 247, 1);
        &.show {
          width: 100%;
        }
        &.hide {
          width: 0;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
