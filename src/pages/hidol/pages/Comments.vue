<template>
  <div class="comment">
    <div class="tab">
      <div 
        :class="{selected: control.current === 'A'}" 
        class="tab-item">
        A(999)
      </div>
      <div 
        :class="{selected: control.current === 'all'}" 
        class="tab-item">
        全部(999)
      </div>
      <div 
        :class="{selected: control.current === 'B'}" 
        class="tab-item">
        B(999)
      </div>

    </div>
    <div class="list"/>
    <CommentItem />
  </div>
</template>

<script>
import { reCalculateRem } from '../mixins/reCalculateRem'
import CommentItem from '../components/CommentItem'
export default {
  components: {
    CommentItem
  },
  mixins: [reCalculateRem],
  data() {
    return {
      screenWidth: document.body.clientWidth,
      control: {
        current: 'all'
      }
    }
  },
  mounted() {
    this.handleInit()
    document.documentElement.scrollTop = 0
  },
  methods: {
    handleInit() {
      this.calculateRem()
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    calculateRem() {
      let html = document.getElementsByTagName('html')[0]
      let fontSize = this.screenWidth / 375 * 100
      html.setAttribute('style', 'font-size: ' + fontSize + 'px')
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  position: relative;
  background: rgba(244, 244, 244, 1);
  .tab {
    position: fixed;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .tab-item {
      flex: 1;
      text-align: center;
      font-size: 0.12rem;
      font-weight: 300;
      &.selected {
        font-size: 0.14rem;
        font-weight: 500;
      }
    }
  }
  .list {
    margin-top: 30px;
  }
}
</style>
