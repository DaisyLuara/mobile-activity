<template>
  <div class="ttb">
    <div class="profile">
      <div class="avatar">
        <img :src="loginState.face">
      </div>
      <div class="location">
        <div class="place">{{ title }}</div>
        <div class="time">{{ time }}</div>
      </div>
    </div>
    <div 
      class="button" 
      @click="handleNaviToMoreTrends">更多足迹</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    title: {
      type: String,
      default: "",
      required: true
    },
    time: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {
      avatarImgUrl: ""
    };
  },
  computed: {
    ...mapGetters(["loginState"])
  },

  methods: {
    handleNaviToMoreTrends() {
      this.$router.push({
        name: "TrendsIndex",
        params: {
          mid: this.$route.params.mid
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ttb {
  background: rgba(243, 243, 243, 1);
  position: relative;
  width: 100%;
  height: 0.68rem;
  display: flex;
  flex-direction: row;
  padding: 0 0.1rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px rgba(194, 194, 194, 1) solid;
  .profile {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar {
      height: 0.45rem;
      width: 0.45rem;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .location {
      margin-left: 0.12rem;
      height: 100%;
      width: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .place {
        font-size: 0.13rem;
        color: rgba(13, 13, 13, 1);
        font-weight: 400;
      }
      .time {
        color: rgba(204, 204, 204, 1);
        font-size: 0.1rem;
        font-weight: 400;
      }
    }
  }
  .button {
    width: 0.775rem;
    height: 0.32rem;
    background: rgba(109, 30, 255, 1);
    font-size: 0.14rem;
    color: rgba(255, 255, 255, 1);
    line-height: 0.32rem;
    border-radius: 0.235rem;
    text-align: center;
  }
}
</style>
