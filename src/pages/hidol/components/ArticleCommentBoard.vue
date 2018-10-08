<template>
  <div 
    v-show="expend"
    :class="choose"
    class="comment"
    @click="handleInputClick">
    <div class="comment-inner">
      <div class="title">我说</div>
      <div class="input">我的观点我的观点我的观点我的观点我的观...</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    choose: {
      default: '',
      type: String,
      required: true
    },
    expend: {
      default: false,
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleInputClick() {
      this.$router.push({
        path: 'newcomment'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  height: 0.4rem;
  line-height: 0.3rem;
  border-bottom-left-radius: 0.15rem;
  border-bottom-right-radius: 0.15rem;
  .comment-inner {
    padding: 0.05rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .title {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      background: #ececec;
      font-size: 0.14rem;
      text-align: center;
      color: #666666;
      width: 0.6rem;
      font-weight: 300;
    }
    .input {
      @diff : 0.6rem;
      width: calc(~'100% - @{diff}');
      background: #f4f4f4;
      border-top-right-radius: 0.15rem;
      border-bottom-right-radius: 0.15rem;
      color: #666666;
      font-size: 0.12rem;
      padding-left: 0.1rem;
      overflow: hidden;
    }
  }
  &.A {
    background: #f14e6e;
  }
  &.B {
    background: #4ea5f1;
  }
}
</style>
