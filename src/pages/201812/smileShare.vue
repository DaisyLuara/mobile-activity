<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      v-show="atm1"
      :src="baseUrl + '1.png'+ this.$qiniuCompress()"
      :class="{'x-start':iphoneX,'start':!iphoneX}"
      class="start"
    >
    <!-- 上传 -->
    <div class="upload-picture">
      <input
        type="file"
        accept="image/*"
        class="camera"
        @change="toUpLoad"
      >
      <!-- 上传按钮 -->
      <img
        :src="baseUrl + 'button.png'+ this.$qiniuCompress()"
        class="button"
      >
    </div>
    <!-- 正在生成结果 -->
    <!-- <div class="generate-resultse">

    </div> -->
  </div>
</template>
<script>
import { normalPages } from "../../mixins/normalPages";
import { getImage } from 'services'
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/simle_atm/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      photo: null,
      iphoneX: false,
      atm1: true,
      atm2: false,
      wxShareInfoValue: {
        title: "穿越仙境 爱意暖冬",
        desc: "点击领取专属照片",
        link: "http://papi.xingstation.com/api/s/3QQ" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/simle_atm/icon.png",
        success: () => {
          wechatShareTrack();
        }
      }
    };
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
    }
  },
  methods: {
    toUpLoad(event) {
      let formData = new FormData()
      formData.append('image', event.target.files[0])
      formData.append('type', 'avatar')
      getImage(formData)
        .then(res => {
          console.log(res)
          alert('头像上传成功')
        })
        .catch(err => {
          alert('头像上传失败！请重新上传，只支持jpg,png格式')
          console.log(err)
        })
    },
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/simle_atm/";
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
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}background.png");
  background-size: 100% auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  .start {
    width: 85%;
    position: absolute;
    left: 8%;
    bottom: 0;
  }
  .x-start {
    width: 94%;
    position: absolute;
    left: 3%;
    bottom: 0;
  }
  .upload-picture {
    width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    .button {
      width: 40%;
      position: absolute;
      left: 30%;
      top: 65%;
      z-index: 9;
    }
    .camera {
      width: 40%;
      height: 5%;
      position: absolute;
      left: 30%;
      top: 65%;
      z-index: 9;
    }
  }
}
</style>
