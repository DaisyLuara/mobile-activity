<template>
  <div class="content">
    <div class="one">
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
import "animate.css";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + "/fe/image/couponrain/",
      //微信分享
      wxShareInfoValue: {
        title: "",
        desc: "",
        link: "" + window.location.search,
        imgUrl: CDNURL + "/fe/image/couponrain/share.png",
      }
    };
  },
  mounted() {
    this.doAnimate()
  },
  methods: {
    doAnimate() {
      import('pixi.js').then(PIXI => {
        let app = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerHeight
        });
        let content = document.querySelector('.content')
        content.appendChild(app.view);

        // holder to store the aliens
        let url = CDNURL + '/fe/image/couponrain/'
        let aliens = [];

        let totalDudes = 20;

        for (let i = 0; i < totalDudes; i++) {
          let dude = PIXI.Sprite.fromImage(url + 'th.jpg');

          dude.anchor.set(0.5);

          dude.scale.set(0.2 + Math.random() * 0.3);
          dude.x = Math.random() * app.screen.width;
          dude.y = Math.random() * app.screen.height;

          // dude.tint = Math.random() * 0xFFFFFF;
          dude.direction = Math.random() * Math.PI * 2;

          dude.turningSpeed = Math.random() - 0.8;
          dude.speed = 2 + Math.random() * 2;
          aliens.push(dude);

          app.stage.addChild(dude);
        }

        let dudeBoundsPadding = 100;
        let dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
          -dudeBoundsPadding,
          app.screen.width + dudeBoundsPadding * 2,
          app.screen.height + dudeBoundsPadding * 2);

        app.ticker.add(function () {
          for (let i = 0; i < aliens.length; i++) {

            let dude = aliens[i];
            dude.direction += dude.turningSpeed * 0.01;
            dude.x += Math.sin(dude.direction) * dude.speed;
            dude.y += Math.cos(dude.direction) * dude.speed;
            dude.rotation = -dude.direction - Math.PI / 2;

            if (dude.x < dudeBounds.x) {
              dude.x += dudeBounds.width;
            }
            else if (dude.x > dudeBounds.x + dudeBounds.width) {
              dude.x -= dudeBounds.width;
            }

            if (dude.y < dudeBounds.y) {
              dude.y += dudeBounds.height;
            }
            else if (dude.y > dudeBounds.y + dudeBounds.height) {
              dude.y -= dudeBounds.height;
            }
          }
        });

      })
    }
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.exe666.com/fe/image/couponrain/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
}
</style>


