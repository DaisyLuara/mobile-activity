<template>
  <div 
    :style="style.root"
    class="content"
  >
    <div
      :style="style.root"
      class="main">
      <img 
        :src="photo" 
        class="photo top"
      >
    </div>
  </div>

</template>
<script>
import { $wechat, getInfoById, wechatShareTrack } from "services";
import { onlyWechatShare } from "../../mixins/onlyWechatShare";
const IMG_SERVER = process.env.CDN_URL;
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      base_url: IMG_SERVER + "/image/rainer/",
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      photo: null,
      //分享
      wxShareInfoValue: {
        title: "秘密花园 尽显美颜",
        desc: "快来寻找秘密花园，施展你的小小控雨魔法",
        link: process.env.AD_API + "/api/s/n5R" + window.location.search,
        imgUrl: "http://cdn.exe666.com/image/rainer/icon.jpg",
        success: function() {
          wechatShareTrack();
        }
      },
      imgList: []
    };
  },
  mounted() {
    let base = "http://cdn.xingstation.cn/image/rainer/";
    for (let i = 0; i < 12; i++) {
      i = i < 10 ? "0" + i : i;
      let texture = base + "frame/frame_000" + i + ".png";
      this.imgList.push(texture);
    }
    this.entry(this.imgList, r => {
      console.dir(r);
      this.getInfoById();
      // do next
    });
  },
  methods: {
    loadImgs(imgList) {
      let preList = [];
      for (let i = 0; i < this.imgList.length; i++) {
        let pre = new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = function() {
            resolve(img);
          };
          img.src = this.imgList[i];
        });
        preList.push(pre);
      }
      return Promise.all(preList).then(r => {
        return Promise.resolve(r);
      });
    },
    async entry(imgList, cb) {
      try {
        let rs = await this.loadImgs(imgList);
        cb(rs);
      } catch (err) {
        console.log(err);
        cb([]);
      }
    },
    getInfoById() {
      let id = this.$route.query.id;
      getInfoById(id)
        .then(res => {
          this.photo = res.image;
          this.doFrame(this.photo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    doFrame(image) {
      import("pixi.js").then(PIXI => {
        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported()) {
          type = "canvas";
        }
        PIXI.utils.sayHello(type);
        let that = this;
        let app_height =
          window.innerHeight > 667
            ? window.innerHeight
            : window.innerHeight + 30;
        let app = new PIXI.Application({
          width: window.innerWidth,
          height: app_height,
          transparent: true
        });
        document.querySelector(".main").appendChild(app.view);
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, app_height);
        app.view.style.position = "relative";
        app.view.style.zIndex = "9999";

        let base = "http://cdn.xingstation.cn/image/rainer/";
        let width = app.screen.width;
        let height = app.screen.height;
        let bottom = PIXI.Sprite.fromImage(base + "bottom.png");
        bottom.anchor.set(0.5, 0);
        bottom.width = width * 0.81;
        bottom.height = ((width * 0.81) / 630) * 1016;
        bottom.position.set(width / 2, height * 0.05);
        app.stage.addChild(bottom);

        let photo = PIXI.Sprite.fromImage(image, true);
        photo.anchor.set(0.5, 0);
        photo.width = width * 0.675;
        photo.height = ((width * 0.675) / 1080) * 1920;
        app.stage.addChild(photo);

        let textureArray = [];
        for (let i = 0; i < 12; i++) {
          i = i < 10 ? "0" + i : i;
          let texture = PIXI.Texture.fromImage(
            base + "frame/frame_000" + i + ".png"
          );
          textureArray.push(texture);
        }
        let end = PIXI.Texture.fromImage(base + "/frame/frame_00011.png");
        for (let i = 0; i < 4; i++) {
          textureArray.push(end);
        }
        let animatedSprite = new PIXI.extras.AnimatedSprite(textureArray);
        animatedSprite.anchor.set(0.5, 0);
        animatedSprite.position.set(width / 2, 10);
        animatedSprite.width = width * 0.91;
        animatedSprite.height = ((width * 0.91) / 685) * 1096;
        animatedSprite.animationSpeed = 0.1;
        animatedSprite.gotoAndPlay(0);
        app.stage.addChild(animatedSprite);
        app.start();
        photo.position.set(
          width / 2,
          animatedSprite.y + animatedSprite.height * 0.13
        );
        let save = PIXI.Sprite.fromImage(base + "save.png");
        save.anchor.set(0.5, 0);
        save.width = width * 0.56;
        save.height = ((width * 0.56) / 412) * 82;
        save.position.set(
          width / 2,
          animatedSprite.height + animatedSprite.y + 5
        );
        app.stage.addChild(save);
      });
    }
  }
};
</script>
<style lang="less" scoped>
@baseUrl: "http://cdn.xingstation.cn/image/rainer/";

html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background-image: url("@{baseUrl}/bg.jpg");
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #2b1c17;
  .main {
    width: 100%;
    position: relative;
    .photo {
      position: absolute;
      width: 67.5%;
      top: 13.8%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
    .bottom {
      width: 81%;
      position: absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
    }
    .top {
      z-index: 999999;
      pointer-events: auto;
      user-select: auto;
      opacity: 0;
    }
  }
  .save {
    width: 56%;
    margin: 0 auto;
    margin-bottom: 4%;
    margin-top: -10%;
    position: relative;
    z-index: 999;
  }
}
</style>


