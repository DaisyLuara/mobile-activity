<template>
  <div class="tbb">
    <div class="function">
      <div class="fitem" @click="handleFuncClick('delete')">
        <img :src="deleteUrl" class="delete">
      </div>
      <div class="fitem" @click="handleFuncClick('save')">
        <img :src="saveUrl" class="save">
      </div>
      <div class="fitem" @click="handleFuncClick('share')">
        <img :src="shareUrl" class="share">
      </div>
    </div>
    <div class="button" v-if="acid >0">
      <div class="title" @click="naviToShopActivityDetail">{{ buttonTitle }}</div>
      <!-- <div class="time">{{subTitle}}</div> -->
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  props: {
    acid: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      deleteUrl: "https://cdn.exe666.com/fe/image/m/m-menu-delete.svg",
      saveUrl: "https://cdn.exe666.com/fe/image/m/m-menu-download.svg",
      shareUrl: "https://cdn.exe666.com/fe/image/m/m-menu-share.svg",
      subTitle: "活动倒计时:12:14:33"
    };
  },
  computed: {
    buttonTitle() {
      if (Number(this.acid) > 0) {
        return "查看活动详情";
      } else {
        return "";
      }
    }
  },
  methods: {
    naviToShopActivity() {
      this.$router.push({
        name: "ActivityShop"
      });
    },
    naviToShopActivityDetail() {
      this.$router.push({
        name: "ActivityShopDetail",
        params: this.$route.params,
        query: {
          acid: this.acid
        }
      });
    },
    handleFuncClick(mode) {
      if (mode === "delete") {
        this.$emit("onTrendDelete");
      }
      if (mode === "save") {
        // this.$emit("onTrendSave");
        Toast("请长按保存图片");
      }
      if (mode === "share") {
        this.$emit("onTrendShare");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tbb {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  height: 0.47rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .function {
    z-index: 10010;
    flex: 1;
    flex-grow: 20;
    height: 100%;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .fitem {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .delete {
        width: 0.17rem;
        height: 0.19rem;
        z-index: 10011;
      }
      .save {
        width: 0.17rem;
        height: 0.19rem;
        z-index: 10011;
      }
      .share {
        width: 0.165rem;
        height: 0.195rem;
        z-index: 10011;
      }
    }
  }
  .button {
    width: 1.41rem;
    height: 100%;
    background: rgba(109, 30, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .title {
      font-size: 0.16rem;
      font-weight: 400;
      color: white;
    }
    .time {
      font-size: 0.1rem;
      font-weight: 400;
      color: white;
    }
  }
}
</style>
