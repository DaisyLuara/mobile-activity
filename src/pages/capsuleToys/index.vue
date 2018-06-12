<template>
    <div class="content" id="content">
        <img  class="egg-top" :src="imgServerUrl + '/pages/capsule_toys/1.png'" alt="" >
        <img  class="egg-bot" :src="imgServerUrl + '/pages/capsule_toys/2.png'" alt="" >
        <img  class="light" :src="imgServerUrl + '/pages/capsule_toys/light.png'" alt="" >
        <div class="copon">
          <img  class="cp-1"  v-show="showCoupon.cp1" :src="imgServerUrl + '/pages/capsule_toys/zhy.png'" alt="" >
          <img  class="cp-2"  v-show="showCoupon.cp2" :src="imgServerUrl + '/pages/capsule_toys/hz.png'" alt="" >
          <img  class="cp-3"  v-show="showCoupon.cp3" :src="imgServerUrl + '/pages/capsule_toys/sc.png'" alt="" >
          <img  class="cp-4"  v-show="showCoupon.cp4" :src="imgServerUrl + '/pages/capsule_toys/yjk.png'" alt="" >
        </div>
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
import parseService from 'modules/parseServer'
const REQ_URL = 'http://120.27.144.62:1337/parse/classes/'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      type: this.$route.query.type,
      params: {
        typeID: 65,
        typeName: 'A',
        count: 1
      },
      showCoupon: {
        cp1: false,
        cp2: false,
        cp3: false,
        cp4: false
      },
      //微信分享
      wxShareInfo: {
        title: '我中奖啦',
        desc: '星视度扭蛋机中大奖',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/capsuleToys_share_icon.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '扭蛋机'
  },
  created() {
    this.show()
    this.query()
  },
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.minHeight = height + 'px'
    this.getInfoById()
  },
  methods: {
    show() {
      if (this.type === 'A') {
        this.showCoupon.cp1 = true
        this.params.typeName = this.type
        this.params.typeID = 65
      } else if (this.type === 'B') {
        this.showCoupon.cp2 = true
        this.params.typeName = this.type
        this.params.typeID = 66
      } else if (this.type === 'C') {
        this.showCoupon.cp3 = true
        this.params.typeName = this.type
        this.params.typeID = 67
      } else {
        this.showCoupon.cp4 = true
        this.params.typeName = this.type
        this.params.typeID = 68
      }
    },
    query() {
      let query = {
        typeID: this.params.typeID
      }
      parseService
        .get(this, REQ_URL + 'capsule_toys?where=' + JSON.stringify(query))
        .then(data => {
          if (data.results.length > 0) {
            this.update(data.results[0])
          } else {
            this.save()
          }
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    update(data) {
      parseService
        .put(
          this,
          REQ_URL + 'capsule_toys/' + data.objectId,
          JSON.stringify({ count: data.count + 1 })
        )
        .then(res => {})
        .catch(err => {})
    },
    save() {
      parseService
        .post(this, REQ_URL + 'capsule_toys', this.params)
        .then(res => {})
        .catch(err => {})
    },
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.drawCanvas(res.image)
          this.press = true
        })
        .catch(err => {})
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/capsule_toys/';
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
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 0;
  background: #11101b;
  position: relative;
  .egg-top {
    width: 100%;
    height: 28%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .egg-bot {
    width: 100%;
    height: 28%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
  .light {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -53%);
  }
  .copon {
    width: 67%;
    height: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
