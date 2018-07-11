<template>
  <div class="test-coupon-content" :style="style.root">
      <img  class="bg" :src="imgServerUrl + '/pages/drc_ty/bg.png'" alt="" :style="style.bg"/>
      <div class="gender">
        <span>{{gender}}</span>
        <span>{{age}} 岁</span>
      </div>
      <img  class="photo" :src="couponUrl" alt=""/>
      <!-- <div class="age">10岁</div> -->
      <!-- <img  class="photo" src="/static/tmall/no_win.png" alt=""/> -->
  </div>
</template>
<script>
import { $_wechat, getInfoById, wechatShareTrack } from 'services'

export default {
  data() {
    return {
      style: {
        root: {
          width: '100%',
          'min-height': this.innerHeight() + 'px'
        },
        bg: {
          height: this.innerHeight() + 'px'
        }
      },
      couponUrl: '',
      gender: '',
      age: '',
      //微信分享信息
      wxShareInfo: {
        title: '测试',
        desc: '测试',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/tmall_share_icon.jpg'
      }
    }
  },
  mounted() {
    this.gender = this.$route.query.gender
    this.age = this.$route.query.age
    this.wechatShare()
    this.getCoupon()
  },
  methods: {
    wechatShare() {
      $_wechat()
        .then(res => {
          res.share({
            // 配置分享
            title: this.wxShareInfo.title,
            desc: this.wxShareInfo.desc,
            imgUrl: this.wxShareInfo.imgUrl,
            success: function() {
              wechatShareTrack()
            }
          })
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getCoupon() {
      let rq = process.env.WX_API + '/v6/common/coupon'
      let policy_id = this.$route.query.policy_id
      let rd = {
        tenant_id: policy_id
      }
      this.$http.post(rq, rd).then(r => {
        this.desc = r.data.data.coupon_batch.name
        if (this.desc === '恭喜中奖') {
          this.couponUrl = '/static/tmall/win.png'
        } else {
          this.couponUrl = '/static/tmall/no_win.png'
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/tmall';
html,
body {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.test-coupon-content {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  user-select: none;
  // overflow-y: scroll;
  z-index: 10;
  .bg {
    width: 100%;
    z-index: -10;
  }
  .photo {
    width: 73.6%;
    position: absolute;
    left: 13%;
    top: 36.4%;
    z-index: 20;
  }
  .age {
    width: 100%;
    position: absolute;
    left: 0;
    text-align: center;
    top: 10%;
    font-size: 24px;
    color: #fdc1dd;
  }
  .gender {
    width: 100%;
    position: absolute;
    left: 0;
    text-align: center;
    top: 20%;
    font-size: 24px;
    color: #fdc1dd;
  }
}
</style>


