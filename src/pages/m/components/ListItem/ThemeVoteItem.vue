<template>
  <div class="vote-item">
    <div class="vote-photo">
      <img 
        :src="photoUrl" 
        class="inner-photo">
    </div>
    <div class="vote-title"/>
    <div class="vote-button">投票</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vtitle: "获得票数：20612",
      photoUrl: ""
    };
  }
};
</script>

<style lang="less" scoped>
.vote-item {
  position: relative;
  z-index: 10;
  .vote-photo {
    width: 3.42rem;
    height: 6.09rem;
    border-radius: 0.2rem;
    position: relative;
    .inner-photo {
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
    height: 0.5rem;
    width: 100%;
    text-align: center;
    font-size: 0.26rem;
  }
  .vote-button {
    width: 1.55rem;
    height: 0.64rem;
    background: rgba(109, 30, 255, 1);
    border: 2px solid rgba(109, 30, 255, 1);
    box-shadow: 0px 3px 6px rgba(172, 129, 252, 1);
    opacity: 1;
    border-radius: 0.47rem;
    text-align: center;
    font-size: 0.28rem;
    color: white;
    line-height: 0.64rem;
    margin: 0.1rem 0;
  }
}
</style>
