<template>
  <div class="content-wrapper">
    <div class="photo-content">
      <img 
        :src="imgUrl+'phone-bg.png?v=1'" 
        class="phone-bg"
      >

      <div class="img-outer">
        <img 
          :src="imgUrl+'outer-circle.png?v=1'" 
          class="img"
        >
      </div>
      <div class="img-inner">
        <img 
          :src="imgUrl+'inner-circle.png?v=1'" 
          class="img"
        >
      </div>

      <div class="phone-wrap">
        <div class="error">
          请输入正确的手机号
        </div>
        <div class="phone-num">
          <input 
            id="mobile" 
            class="num" 
            placeholder="请输入手机号码" 
            maxlength="11"
          >
          <a 
            class="go-btn" 
            href="javascript:void(0);" 
            @click="redirectToPhoto"
          >提取照片</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const BASE_URL = 'http://m.jingfree.com/'
export default {
  data() {
    return {
      imgUrl: BASE_URL + '/public/marketing/m/marval/images/',
      mobile: null
    }
  },
  beforeCreate() {
    document.title = '复古通用版'
  },
  created() {},
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    if (window.localStorage.getItem('hiphoptel')) {
      this.linkToPhoto(window.localStorage.getItem('hiphoptel'))
    }
  },
  methods: {
    redirectToPhoto() {
      let input = document.getElementById('mobile')
      let id = this.$route.query.id
      let reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!this.$route.query.id) {
        alert('没有照片信息，请重新扫描二维码!')
        return
      }
      if (!reg.test(input.value)) {
        alert('请输入11位有效的手机号码')
        return
      }
      if (window.localStorage) {
        window.localStorage.setItem('hiphoptel', input.value)
      }
      this.linkToPhoto(input.value)
    },
    linkToPhoto(mobile) {
      this.$router.push({
        path: 'hiphop/result?id=' + this.$route.query.id + '&mobile=' + mobile
      })
    }
  }
}
</script>
<style lang="less" scoped>
.photo-content,
.photo-content .img-inner,
.photo-content .img-outer,
.photo-content .phone-wrap {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
}
body,
html {
  overflow-x: hidden;
}
.photo-content {
  overflow: hidden;
  font-family: YouYuan, 'Helvetica Neue', Helvetica, STHeitiSC-Light, Arial,
    sans-serif;
}
.photo-content .phone-bg {
  width: 100%;
}
.photo-content .img-outer {
  top: 15.5%;
  z-index: 5;
}
.photo-content .img-outer .img {
  width: 100%;
  transform: rotate(-1deg) scale(1.2, 1.2);
  animation: zoomCircle 2s infinite alternate;
}
.photo-content .img-inner {
  top: 15.5%;
  z-index: 4;
}
.photo-content .img-inner .img {
  width: 100%;
  transform: rotate(0);
  animation: loopCircle 10s linear infinite;
}
.photo-content .phone-wrap {
  top: 71%;
  z-index: 6;
  text-align: center;
}
.photo-content .phone-wrap .error {
  color: #fe0100;
  font-size: 12px;
  font-weight: 700;
  opacity: 0;
}
.photo-content .phone-wrap .gift-img {
  width: 47px;
  display: inline-block;
  vertical-align: top;
  margin: -7px -4px 0 0;
}
.photo-content .phone-wrap .phone-num {
  display: inline-block;
  width: 60%;
  min-width: 205px;
  height: 35px;
  border-radius: 30px;
  border: 1px solid #757575;
  background-color: #e6e6e6;
  box-shadow: 0 0 16px #2279b8;
  position: relative;
  text-align: center;
  margin: 3px 0 5px;
}
.photo-content .phone-wrap .phone-num .num {
  display: inline-block;
  width: 100%;
  padding-left: 15%;
  border: none;
  border-radius: 30px;
  height: 33px;
  background-color: #e6e6e6;
  font-size: 14px;
  color: #7a7a7a;
}
.photo-content .phone-wrap .phone-num .go-btn {
  background-color: #0d6fb8;
  border: none;
  height: 35px;
  line-height: 35px;
  color: #fff;
  font-size: 12px;
  display: inline-block;
  border-radius: 30px;
  position: absolute;
  top: -1px;
  right: -1px;
  padding: 0 10px;
  letter-spacing: 1px;
}
.photo-content .phone-wrap .info {
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
}
.photo-content .phone-wrap.err .phone-num {
  border-color: #e60100;
  box-shadow: 0 0 16px #e60100;
}
.photo-content .phone-wrap.err .error {
  opacity: 1;
}
@keyframes zoomCircle {
  0% {
    transform: rotate(-1deg) scale(1.2, 1.2);
  }
  100% {
    transform: rotate(-1deg) scale(1.3, 1.3);
  }
}
@keyframes loopCircle {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


