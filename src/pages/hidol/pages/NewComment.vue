<template>
  <div class="newcomment">
    <div
      v-show="comment === ''" 
      class="remind">请发表你的观点</div>
    <textarea 
      v-model="comment"
      rows="6"
      class="text-area" />
    <PublishButton 
      class="publish" 
      @onHandlePublish="handlePublish"/>
  </div>
</template>

<script>
import PublishButton from '../components/PublishButton'
import { reCalculateRem } from '../mixins/reCalculateRem'
export default {
  components: {
    PublishButton
  },
  mixins: [reCalculateRem],
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    handlePublish() {}
  }
}
</script>

<style lang="less" scoped>
.newcomment {
  background: rgba(244, 244, 244, 1);
  min-height: 100vh;
  position: relative;
  .remind {
    position: absolute;
    top: 0.12rem;
    left: 0.1rem;
    color: rgba(153, 153, 153, 1);
    font-size: 16px;
  }
  .text-area {
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: transparent;
    color: black;
    border: none;
    padding: 0.12rem 0.1rem;
  }
  .publish {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>

