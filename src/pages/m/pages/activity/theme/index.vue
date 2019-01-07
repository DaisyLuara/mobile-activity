<template>
  <div class="theme">
    <img 
      :src="themeImageUrl" 
      class="main-img">
    <div class="time-count">
      <div class="inner-remind">{{ timeCount }}</div>
    </div>
    <div 
      v-for="(item, index) in themeActItems" 
      :key="index" 
      class="theme-item-wrapper">
      <ThemeVoteItem/>
    </div>
    <div class="activity">
      <div class="title"/>
      <div class="desc"/>
    </div>
  </div>
</template>

<script>
import ThemeVoteItem from "@/pages/m/components/ListItem/ThemeVoteItem";
export default {
  components: {
    ThemeVoteItem
  },
  data() {
    return {
      themeActItems: [],
      themeImageUrl: "",
      themeTitle: "这里是活动文字说明标题",
      themeContext:
        "这里是活动文字说明内容这里是活动文字说明内容这里是活动文字说明内容这里是活动文字说明内容这里是活动文字说明内容这里是活动文字说明内容这里是活动文字说明内容这里是活动文字说明内容"
    };
  },
  computed: {
    timeCount() {
      return "活动倒计时:12:14:33";
    }
  },
};
</script>

<style lang="less" scoped>
.theme {
  position: relative;
  .main-img {
    width: 7.5rem;
    height: 3.53rem;
  }
  .time-count {
    height: 0.94rem;
    width: 100%;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    .inner-remind {
      width: 4.56rem;
      height: 0.56rem;
      background: rgba(34, 34, 34, 1);
      opacity: 1;
      border-radius: 0.28rem;
      font-size: 0.36rem;
      font-weight: 400;
      color: white;
      text-align: center;
    }
  }
  .theme-item-wrapper {
    height: 7.4rem;
    width: 3.42rem;
  }
  .activity {
    width: 6.72rem;
    .title {
      width: 100%;
      height: 1.15rem;
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 0.36rem;
      color: rgba(13, 13, 13, 1);
    }
    .desc {
      font-size: 0.28rem;
      line-height: 0.4rem;
    }
  }
}
</style>
