<template>
    <div class="content" :style="style.root">
        <div class="forms">
            <input class="tel" type="text" ref="input" placeholder=""/>
            <input class="btn" type="button" value="" @click.prevent="start"/>
        </div>
    </div>
</template>
<script>
import { $_wechat, wechatShareTrack } from 'services'
const IMGURL = 'http://p22vy0aug.bkt.clouddn.com/image/'
export default {
  data() {
    return {
      baseUrl: IMGURL + 'sea/page1/',
      style: {
        root: {
          'min-height': this.minHeight() + 'px'
        }
      },
      //微信分享
      wxShareInfo: {
        title: '海底世界',
        desc: '海底世界',
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/sea/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    let mlocal = window.localStorage.getItem('seaworld')
    if (mlocal) {
      this.linkToResult(mlocal)
    }
  },
  methods: {
    wechatShare() {
      $_wechat()
        .then(res => {
          res.share(this.wxShareInfo)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    linkToResult(mobile) {
      this.$router.push({
        path: 'sea_result?id=' + this.$router.query.id + '&mobile=' + mobile
      })
    },
    toPhoto() {
      let input = this.$refs.input
      let id = this.$route.query.id
      let reg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!id) {
        alter('没有照片信息，请重新扫描二维码！')
        return
      }
      if (!reg.test(input.value)) {
        alter('请输入11位有效的手机号码')
        return
      }
      if (window.localStorage) {
        window.localStorage.setItem('seaworld', input.value)
      }
      this.linkToResult(input.value)
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/sea/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background-image: url('@{imgUrl}page1/bg.png');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  .forms {
    width: 100%;
    input[type='text'] {
    }
    input[type='button'] {
    }
  }
}
</style>


