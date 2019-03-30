<template>
  <div class="article-more">
    <img 
      class="more-img" 
      src="http://cdn.xingstation.cn/fe/hidol/img/like-heart@3x.png" >
    <img 
      class="more-img" 
      src="http://cdn.xingstation.cn/fe/hidol/img/link-2@3x.png" >
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.article-more {
  width: 1rem;
  height: 0.3rem;
  border-radius: 0.15rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 0.05rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .more-img {
    width: 0.2rem;
  }
}
</style>
