<template>
  <div class="vote-item">
    <div class="vote-photo">
      <div class="vote-title">
        <img
          :src="face"
          class="avatar"
        >
        <span class="title">{{ nickname }}</span>
      </div>
      <img
        :src="photoUrl + '?imageView2/1/w/200/h/320/format/jpg/q/75|imageslim'"
        class="inner-photo"
        @click="handlePhotoPrivew"
      >
    </div>
    <div class="vote-title">
      {{ computedView }} 票
    </div>
    <div
      class="vote-button"
      @click="handleVote"
    >
      投票
    </div>
  </div>
</template>

<script>
import { handleH5SaasVote } from "services";
import { mapGetters } from "vuex";
import { Toast } from "mint-ui";
export default {
  props: {
    // 投票id
    auid: {
      type: String,
      default: "",
      required: true
    },
    photoUrl: {
      type: String,
      default: "",
      required: true
    },
    face: {
      type: String,
      default: "",
      required: true
    },
    nickname: {
      type: String,
      default: "",
      required: true
    },
    views: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {
      voteSuccess: false
    };
  },
  computed: {
    ...mapGetters(["z"]),
    computedView() {
      if (this.voteSuccess) {
        return Number(this.views) + 1;
      } else {
        return this.views;
      }
    }
  },
  methods: {
    handlePhotoPrivew() {
      this.$emit("onShowViewer");
    },
    handleVote() {
      let payload = {
        api: "json",
        auid: this.auid,
        z: this.z,
        mkey: this.$route.params.mkey
      };
      handleH5SaasVote(this, payload)
        .then(r => {
          console.dir(r);
          if (r.data.state === "1") {
            this.voteSuccess = true;
            Toast("投票成功");
            return;
          } else if (r.data.state !== "0") {
            Toast(r.data.results);
          }
          console.dir(r);
        })
        .catch(e => {
          console.dir(e);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.vote-item {
  position: relative;
  z-index: 10;
  background: rgba(0, 0, 0, 0);
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 3.6rem;
  width: 100%;
  .vote-photo {
    width: 1.71rem;
    height: 3.045rem;
    border-radius: 0.2rem;
    position: relative;
    overflow: hidden;
    .vote-title {
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba(57, 48, 104, 0.9);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: 0.41rem;
      width: 100%;
      padding: 0 10px;
      overflow: hidden;
      .avatar {
        width: 0.31rem;
        height: 0.31rem;
        border-radius: 50%;
      }
      .title {
        margin-left: 0.1rem;
        font-size: 0.1rem;
        color: rgba(204, 204, 204, 1);
      }
    }
    .inner-photo {
      height: 100%;
    }
    .photo-cover {
      width: 100%;
      height: 0.82rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  .vote-title {
    height: 0.3rem;
    width: 100%;
    text-align: center;
    font-size: 0.13rem;
    line-height: 0.3rem;
  }
  .vote-button {
    width: 0.775rem;
    height: 0.32rem;
    background: rgba(109, 30, 255, 1);
    box-shadow: 0px 3px 6px rgba(172, 129, 252, 1);
    opacity: 1;
    border-radius: 47px;
    font-size: 0.14rem;
    line-height: 0.32rem;
    color: white;
    text-align: center;
  }
}
</style>
