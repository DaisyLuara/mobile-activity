<template>
  <div
    class="root"
    :style="style.root"
  >
    <!-- bg -->
    <img 
      class="bg"
      :src="serverUrl + 'background_1.png'" />

    <!-- 提取照片相框 -->
    <img 
      class="kuang"
      :src="serverUrl + 'bottom_1.png'" />

    <!-- 相框底下照片 -->
    <img
      class="get-photo"
      :src="serverUrl + ''" />

    <!-- 实际照片 -->
    <img
      class="real-photo"
      :src="serverUrl + ''" />

    <!-- game -->
    <div
      :style="style.game" 
      class="game-div">
      <img
        class="game-bg"
        :src="serverUrl + 'bottom_2.png'" />
      <div 
        class="bg-contianer">
        <div class="logo">
          <img :src="serverUrl + 'logo.png'">
        </div>
        <img 
          class="prompt-1"
          :src="serverUrl + 'prompt_1.png'" />
        <div class="timer">
          <div class="text">
            <span>Time</span>
            <span>0s</span>
          </div>
          <div class="line">
            <img
              class="line-1" 
              :src="serverUrl + 'schedule_1.png'" />
          </div>
        </div>
        <img 
          class="recorder"
          :src="serverUrl + 'recorder.png'" />
        <img 
          class="prompt-2"
          :src="serverUrl + 'prompt_2.png'" />
        <div class="recoder-button">
          <img
            :src="serverUrl + 'button.png'" />
        </div>
        <img
          class="copywriting" 
          :src="serverUrl + 'copywriting_1.png'">
      </div>
    </div>
    
    <!-- concert -->
    <img
      class="concert"
      :src="serverUrl + 'concert.png'" />
  </div>
</template>

<script>
const serverUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/weixun/gameindex/'
const wiw = window.innerWidth
const wih = window.innerHeight
export default {
  data() {
    return {
      style: {
        root: {},
        game: {
          height: wiw * 1275 / 716 * 620 / 667 + 'px',
          width: '100%',
          top: wih * 1.0419 + 'px'
        }
      },
      serverUrl: serverUrl
    }
  },
  methods: {
    handleButtonTouchStart() {},
    handleButtonTouchEnd() {},
    getPhotoById() {},
    valiPhotoNumber() {}
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  .bg {
    width: 100%;
    z-index: 10;
    position: relative;
  }
  .kuang {
    position: absolute;
    top: 3.3%;
    left: 0;
    z-index: 11;
    width: 96.6%;
  }
  .get-photo {
    position: absolute;
  }
  .real-photo {
    position: absolute;
  }
  .game-div {
    position: absolute;
    left: 0;
    border: 1px solid whit;
    z-index: 10;
    display: flex;
    justify-content: center;
    .game-bg {
      width: 94%;
      z-index: 11;
    }
    .bg-contianer {
      position: absolute;
      width: 94%;
      height: 100%;
      z-index: 12;
      top: 0;
      left: 3%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .logo {
        width: 50%;
        img {
          width: 100%;
        }
      }
      .prompt-1 {
        width: 79%;
      }
      .timer {
        width: 60%;
        .text {
          width: 100%;
        }
        .line {
          width: 100%;
          .line-1 {
            width: 100%;
          }
          .line-2 {
            width: 100%;
          }
        }
      }
      .recorder {
        width: 45%;
      }
      .prompt-2 {
        width: 60%;
      }
      .recoder-button {
        width: 60%;
        img {
          width: 100%;
        }
      }
      .copywriting {
        width: 90%;
      }
    }
  }
  .concert {
    width: 96%;
    position: absolute;
    bottom: 2.7%;
    left: 2%;
    z-index: 11;
  }
}
</style>
