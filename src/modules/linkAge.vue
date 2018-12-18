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
import { createGame, getGame } from 'services'
export default {
  props: {
    proData: {
      type: Object,
      require: true
    },
  },
  data() {
    return {

    }
  },
  created() { },
  mounted() { },
  methods: {
    createGame(belong, userId) {
      let args = {
        belong: belong
      }
      createGame(args, userId)
        .then(res => {
          if (res.success) {
            this.getGame(userId)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame(userId) {
      let args = {
        withCredentials: true
      }
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.projectStatus(res, userId)
        })
        .catch(e => {
          console.log(e)
        })
    },
    projectStatus(list, userId) {
      let data = list
      console.log(this.proData.projects)
      data.map(r => {
        this.proData.projects[r.belong].state = this.proData.projects[r.belong] ? true : false;
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

