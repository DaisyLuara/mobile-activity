<template>
  <div 
    v-show="expend" 
    class="choose">
    <div 
      v-if="choose === 'A' || choose === ''" 
      class="A" 
      @click="handleChoose('A')">
      <div class="title">A</div>
      <div class="content">吃葡萄可以不吐葡萄皮</div>
    </div>
    <div 
      v-if="choose === 'A'" 
      class="A-more">
      <div class="data">共666人支持</div>
      <div class="percent">[66%]</div>
    </div>
    <div 
      v-if="choose === 'B'" 
      class="B-more">
      <div class="data">共666人支持</div>
      <div class="percent">[66%]</div>
    </div>
    <div 
      v-if="choose === 'B' || choose === ''" 
      class="B" 
      @click="handleChoose('B')">
      <div class="title">B</div>
      <div class="content">吃葡萄一定 要吐葡萄皮</div>
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
    handleChoose(payload) {
      this.$emit('onChoose', payload)
    }
  }
}
</script>

<style lang="less" scoped>
.choose {
  height: 0.6rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  .A {
    flex: 1;
    background: #f14e6e;
    padding: 0.1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #ffffff;
    align-items: center;
    .title {
      font-size: 0.43rem;
      line-height: 60px;
    }
    .content {
      font-size: 0.14rem;
      padding: 5% 5%;
    }
  }
  .A-more {
    padding: 0.1rem;
    flex: 1;
    background: #f14e6e;
    display: flex;
    flex-direction: column;
    color: white;
    align-items: flex-end;
    justify-content: space-between;
    .data {
      font-size: 0.12rem;
    }
    .percent {
      font-size: 0.25rem;
    }
  }
  .B-more {
    padding: 0.1rem;
    flex: 1;
    background: #4ea5f1;
    display: flex;
    flex-direction: column;
    color: white;
    align-items: flex-start;
    justify-content: space-between;
    .data {
      font-size: 0.12rem;
    }
    .percent {
      font-size: 0.25rem;
    }
  }
  .B {
    flex: 1;
    background: #4ea5f1;
    padding: 0.1rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    color: #ffffff;
    align-items: center;
    .title {
      font-size: 0.43rem;
      line-height: 60px;
    }
    .content {
      font-size: 0.14rem;
      padding: 5% 5%;
    }
  }
}
</style>
