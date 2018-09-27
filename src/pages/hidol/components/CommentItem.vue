<template>
  <div class="commentitem">
    <div class="avatar">
      <img 
        class="inner" 
        src="https://dn-coding-net-production-static.qbox.me/655a4d54-31fa-45e2-bd4b-98be23865664.jpg?imageMogr2/auto-orient/format/jpeg/crop/!400x400a0a0" >
    </div>
    <div class="context">
      <div class="name">
        我是杰瑞
      </div>
      <div class="time">
        2018.09.02
      </div>
      <div class="text">
        你们有见过这么整齐的十五 个字吗 这么整齐的十五个字人家最喜欢了 他们都说打出十五字才是最标准的 我也没办法因为我要打十五个字啊...
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.commentitem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.13rem;
  .avatar {
    height: 0.45rem;
    width: 0.45rem;
    border-radius: 50%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
    }
  }
  .context {
    @diff : 0.6rem;
    width: calc(~'100% - @{diff}');
    border-radius: 10px;
    background: white;
    padding: 0.08rem;
    .name {
      width: 100%;
      font-size: 0.12rem;
      color: rgba(102, 102, 102, 1);
      margin: 0.05rem 0;
    }
    .time {
      width: 100%;
      font-size: 0.1rem;
      color: rgba(153, 153, 153, 1);
      margin: 0.08rem 0;
    }
    .text {
      color: rgba(51, 51, 51, 1);
      font-size: 0.14rem;
      margin: 0.05rem 0;
      line-height: 0.2rem;
    }
  }
}
</style>
