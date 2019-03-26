<template>
  <div
    id="content"
    :style="style.root"
    class="content"
  >
    <img
      :src="imgServerUrl + '/pages/capsule_toys/1.png'"
      alt=""
      class="egg-top"
    >
    <img
      :src="imgServerUrl + '/pages/capsule_toys/2.png'"
      alt=""
      class="egg-bot"
    >
    <img
      :src="imgServerUrl + '/pages/capsule_toys/light.png'"
      alt=""
      class="light"
    >
    <div
      :style="style"
      class="copon"
    >
      <img
        v-show="showCoupon.cp1"
        :src="imgServerUrl + '/pages/capsule_toys/zhy.png'"
        alt=""
        class="cp-1"
      >
      <img
        v-show="showCoupon.cp2"
        :src="imgServerUrl + '/pages/capsule_toys/hz.png'"
        alt=""
        class="cp-2"
      >
      <img
        v-show="showCoupon.cp3"
        :src="imgServerUrl + '/pages/capsule_toys/sc.png'"
        alt=""
        class="cp-3"
      >
      <img
        v-show="showCoupon.cp4"
        :src="imgServerUrl + '/pages/capsule_toys/yjk.png'"
        alt=""
        class="cp-4"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from "services";
import { parseService } from "services";
import { normalPages } from "@/mixins/normalPages";
const parseUrl = process.env.PARSE_SERVER;
const REQ_URL = `${parseUrl}/parse/classes/`;
const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";
export default {
  mixins: [normalPages],
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      type: null, //this.$route.query.type,
      params: {
        typeID: 65,
        typeName: "A",
        count: 1
      },
      style: {
        height: (Window.innerwidth * 0.8 * 737) / 380 + "px",
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      showCoupon: {
        cp1: false,
        cp2: false,
        cp3: false,
        cp4: false
      },
      //微信分享
      wxShareInfoValue: {
        title: "我中奖啦",
        desc: "星视度扭蛋机中大奖",
        imgUrl:
          "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/capsuleToys_share_icon.png"
      }
    };
  },
  watch: {
    parms() {
      this.type = this.parms.type;
      this.show();
      this.drawCanvas(res.image);
      this.press = true;
    }
  },
  beforeCreate() {
    document.title = "扭蛋机";
  },
  created() {
    // this.show()
    this.query();
  },
  methods: {
    show() {
      if (this.type === "A") {
        this.showCoupon.cp1 = true;
        this.params.typeName = this.type;
        this.params.typeID = 65;
      } else if (this.type === "B") {
        this.showCoupon.cp2 = true;
        this.params.typeName = this.type;
        this.params.typeID = 66;
      } else if (this.type === "C") {
        this.showCoupon.cp3 = true;
        this.params.typeName = this.type;
        this.params.typeID = 67;
      } else {
        this.showCoupon.cp4 = true;
        this.params.typeName = this.type;
        this.params.typeID = 68;
      }
    },
    query() {
      let query = {
        typeID: this.params.typeID
      };
      parseService
        .get(REQ_URL + "capsule_toys?where=" + JSON.stringify(query))
        .then(data => {
          if (data.results.length > 0) {
            this.update(data.results[0]);
          } else {
            this.save();
          }
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    update(data) {
      parseService
        .put(
          REQ_URL + "capsule_toys/" + data.objectId,
          JSON.stringify({ count: data.count + 1 })
        )
        .then(res => {})
        .catch(err => {});
    },
    save() {
      parseService
        .post(REQ_URL + "capsule_toys", this.params)
        .then(res => {})
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/capsule_toys/";
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
    animation: EggMove1 0.8s ease-out infinite alternate;
  }
  .egg-bot {
    width: 100%;
    height: 28%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    animation: EggMove2 0.8s ease-out infinite alternate;
  }
  .light {
    width: 100%;
    position: absolute;
    left: 0%;
    top: 20%;
    transform: translate(-50%, -53%);
    animation: mycir 2s linear infinite;
  }
  .copon {
    width: 60%;
    //height: 67%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -49.5%);
    z-index: 3;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
@keyframes mycir {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
@keyframes EggMove1 {
  0% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes EggMove2 {
  0% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
