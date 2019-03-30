<template>
  <div 
    class="question">
    <div 
      class="question-self" 
      @click="handleABExpend">
      你们觉得吃葡萄需要吐葡萄皮吗？ 需要吗？需要吗？
    </div>
    <div 
      class="question-msg" 
      @click="handleGoComment">
      <img 
        class="msg" 
        src="http://cdn.xingstation.cn/fe/hidol/img/messenger.png" >
      <div class="count">999</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleGoComment() {
      this.$router.push({
        path: 'comment'
      })
    },
    handleABExpend() {
      this.$emit('onExpend')
    }
  }
}
</script>


<style lang="less" scoped>
.question {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 0.7rem;
  padding-left: 0.15rem;
  padding-right: 0.15rem;
  padding-bottom: 0.08rem;
  padding-top: 0.08rem;
  width: 100%;
  font-size: 0.14rem;
  .question-self {
    width: 70%;
  }
  .question-msg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .msg {
      flex: 1;
      height: 60%;
    }
    .count {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
