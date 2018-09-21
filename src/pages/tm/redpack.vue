<template>
  <div
    :style="style.root" 
    class="rp-root">
    <div class="xk">
      <img
        class="frame" 
        src="http://cdn.exe666.com/fe/image/tmall/redpack/frame.png" >
      <img 
        :src="imgUrl + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <div class="rp">
      <img 
        :src="'http://cdn.exe666.com/fe/image/tmall/redpack/' + String(redpackType) + '.png'" 
        class="inner" >
    </div>
    <img 
      class="bottom" 
      src="http://cdn.exe666.com/fe/image/tmall/redpack/bottom.png">

  </div>
</template>

<script>
import { getInfoById } from 'services'
export default {
  data() {
    return {
      imgUrl: '',
      style: {
        root: {
          minHeight: window.innerHeight + 'px'
        }
      },
      redpackType: 10
    }
  },
  mounted() {
    if (this.$route.query.coupon_type === '0') {
      this.redpackType = 10
    } else if (this.$route.query.coupon_type === '1') {
      this.redpackType = 30
    } else if (this.$route.query.coupon_type === '2') {
      this.redpackType = 50
    }
    this.getPhoto()
  },
  methods: {
    getPhoto() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.imgUrl = res.image
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.rp-root {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  background-color: #210102;
  .xk {
    z-index: 20;
    width: 90%;
    position: relative;
    .frame {
      width: 100%;
      z-index: 30;
    }
    .photo {
      width: 73%;
      z-index: 25;
      position: absolute;
      top: 4%;
      left: 5%;
    }
  }
  .rp {
    z-index: 20;
    width: 70%;
    .inner {
      z-index: 30;
      width: 100%;
    }
  }
  .bottom {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
}
</style>
