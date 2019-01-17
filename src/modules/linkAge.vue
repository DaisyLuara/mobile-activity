<template>
  <!--多级联动通用版-->
  <div class="programs">
    <ul
      :style="proData.style.ul"
      class="ul-list"
    >
      <li
        v-for="(item,index) in proData.projects"
        :key="index"
        :style="proData.style.li"
        class="list-li"
      >
        <img
          :src="item.notget"
          class="notget"
        >
        <img
          v-show="item.state"
          :src="item.geted"
          class="geted"
        >
      </li>
    </ul>
  </div>
</template>
<script>
const imgUrl = process.env.CDN_URL
import { getGameHonour } from 'services'
export default {
  props: {
    proData: {
      type: Object,
      require: true,
      default: ''
    },
  },
  methods: {
    getGameHonour(bid, z) {
      getGameHonour(bid, z).then(res => {
        console.log(res)
        this.projectStatus(res.results.data)
      }).catch(err => {
        console.log(err)
      })
    },
    projectStatus(data) {
      data.map(r => {
        if (this.proData.projects[r.xid]) {
          this.proData.projects[r.xid].state = true
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
ul {
  display: inline-block;
  li {
    display: inline-block;
    position: relative;
    &:first-child {
      margin-left: 0%;
    }
    &:last-child {
      margin-left: 0%;
    }
    img {
      max-width: 100%;
    }
    .notget {
      position: relative;
      z-index: 0;
    }
    .geted {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
    }
  }
}
</style>

