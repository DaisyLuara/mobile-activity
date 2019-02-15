<template>
  <div class="cake">
    <div class="header">
      <div class="back-word">CAKE</div>
      <div class="front-word">蛋糕搭配</div>
    </div>
  </div>
</template>

<script>
import { fetchAllGoodsList } from "services"
import { mapGetters } from "vuex"

export default {
  name: "ActivityBirthDayCake",
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    // 拉取蛋糕列表
    async fetchList () {
      const payload = {
        api: 'json',
        z: this.z,
        gid: 0,
        type: 'cake',
        cp: 1,
        size: 5
      }
      try {
        let resp = await fetchAllGoodsList(payload)
        console.log(resp)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./mixin.less";

.cake {
  .wrapper();
  .header {
    padding: 0.3rem 0 0 0.12rem;
    position: relative;
    .back-word {
      font-size: 0.48rem;
      color: #E7E7E7;
      height: 0.36rem;
      line-height: 0.36rem;
      font-weight: lighter;
    }
    .front-word {
      font-size: 0.1rem;
      color: #747474;
      position: absolute;
      bottom: 0.09rem;
      left: 0.32rem;
      font-weight: lighter;
    }
  }
}
</style>