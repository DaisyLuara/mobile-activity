<template>
<div class="content" id="warp">
    <div class="div_img">
        <img class="photo" :src="mImg">
    </div>
    <div class="div_text">
        <ul>
            <li class="name">规则：</li>
            <li v-for="item in textMsg[num]">{{item}}</li>
            <li class="name">优惠券规则：</li>
            <li>凭此照片兑换，仅限本人使用，每人只可用一次，全场先秒先得！</li>
        </ul>
    </div>
    <img class="save" :src="IMAGE_URL + 'save.png'"/>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
</div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
export default {
  data() {
    return {
      IMAGE_URL: IMAGE_SERVER + '/pages/goodboy/',
      num:
        this.$route.query.num - 10 > 0
          ? this.$route.query.num - 11
          : this.$route.query.num - 1,
      // mImg: IMAGE_SERVER + '/pages/goodboy/test.jpg',
      mImg: null,
      textMsg: [
        {
          a: 'A  可凭此券不限时秒杀HD1元特价产品',
          b: 'B  限量秒杀，秒完为止',
          c: 'C  可凭此券任意参与99元、129元档秒杀特权'
        },
        {
          a: 'A  可凭此券不限时秒杀HD99元特价产品 ',
          b: 'B  限量秒杀，秒完为止 ',
          c: 'C  可凭此券参与129元秒杀档特权'
        },
        {
          a: 'A  可凭此券不限时秒杀HD129元特价产品 ',
          b: 'B  限量秒杀，秒完为止'
        }
      ],
      //微信分享
      wxShareInfo: {
        title: 'Happy Dino 全民刷脸抢秒杀！颜值爆表1元抢抢抢抢抢！',
        desc: ' 全民疯抢！Happy Dino—好孩子 2018大型特卖会正在进行中',
        imgUrl: IMAGE_SERVER + '/pages/goodboy/share.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreated() {
    document.title = '好孩子第18届大型特卖会'
  },
  created() {
    this.getInfoById()
  },
  mounted() {
    var height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var warp = document.getElementById('warp')
    warp.style.minHeight = height + 'px'
    let w = document.documentElement
    let a = w.getBoundingClientRect().width
    if (a > 750) {
      a = 750
    }
    let rem = a / 7.5
    w.style.fontSize = rem + 'px'
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.mImg = res.image
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/goodboy/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background: url('@{imgUrl}bg.png') top left/100% auto repeat;
  text-align: center;
  margin: 0 auto;
  padding-top: 5%;
  .div_img {
    width: 100%;
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    position: relative;
    .photo {
      width: 83%;
      margin: 0 auto;
      border-radius: 15px;
    }
  }
  .div_text {
    width: 100%;
    margin-top: 4%;
    ul {
      list-style: none;
      display: inline-block;
      width: 75%;
      margin-left: 15%;
      margin-right: 10%;
      li {
        display: block;
        text-align: left;
        font-size: 0.2rem;
        color: #fff;
        line-height: 0.5rem;
        letter-spacing: 1px;
      }
    }
  }
  .save {
    width: 84%;
    margin: 0 auto;
    margin-top: 5.2%;
    margin-bottom: 5.7%;
  }
}
</style>

