<template>
  <div class="hidol-root">
    <p @click="handleNewPostControl">import lazy async components </p>
    <new-post v-if="control.newpost"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      control: {
        newpost: false
      }
    }
  },
  components: {
    NewPost: () => import('./components/newPost.vue')
  },
  methods: {
    handleNewPostControl() {
      this.control.newpost = !this.control.newpost
    }
  }
}
</script>

<style lang="less" scoped>
.hidol-root {
  display: flex;
}
</style>
