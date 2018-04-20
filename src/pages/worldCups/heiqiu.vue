<template>
  <div
    :style="style.root"
    class="hj-root">
    <!-- wx-share -->
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    
    <!-- top img -->
    <img 
      class="root-topimg"
      :src="this.baseUrl + 'bg1.png'" />
    <!-- mid photo -->
    <div
      :style="style.photoOuter" 
      class="root-photo">
      <img 
        :style="style.logo"
        :src="this.baseUrl + 'logo.png'" />
      <img
        :style="style.remind"
        :src="this.baseUrl + 'remind.png'" />
        <div class="inner-photo">
          <img
          :style="style.innerPhoto"
          :src="this.bindImage" />
        </div>
    </div>
    <!-- power -->
    <div
      :style="style.power" 
      class="root-power">
      <div
        :style="style.powerItem" 
        class="power-item">
        
      </div>
      <div
        :style="style.powerItem" 
        class="power-item">

      </div>

    </div>

    <!-- real photo -->
    <img 
      :src="bindImage"
      class="top-img"/>
    <GameMenu />
  </div>
</template>

<script>
const wiw = window.innerWidth
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
import { Toast } from 'mint-ui'
import GameMenu from './components/gameMenu'
export default {
  components: {
    WxShare,
    GameMenu
  },
  computed: {
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: function() {
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo
    }
  },
  data() {
    return {
      wxShareInfoValue: {
        title: '万达陪你“美”一天',
        desc: '唯万达 更懂你',
        imgUrl: ''
      },
      style: {
        root: {
          width: wiw + 'px',
          height: window.innerHeight + 'px',
          backgroundSize: wiw + 'px ' + '100px'
        },
        power: {
          width: wiw + 'px',
          height: 0.36 * wiw + 'px'
        },
        powerItem: {
          width: 0.36 * wiw + 'px',
          height: 0.36 * wiw + 'px'
        },
        photoOuter: {
          width: 55 / 75 * wiw + 'px',
          height: 970 / 566 * 55 / 75 * wiw + 'px',
          position: 'relative'
        },
        logo: {
          position: 'absolute',
          width: 0.506 * wiw + 'px',
          top: -(0.506 * wiw * 220 / 410 / 2) + 'px',
          left: (55 / 75 * wiw - 0.506 * wiw) / 2 + 'px'
        },
        remind: {
          position: 'absolute',
          width: 126 / 750 * wiw + 'px',
          left: (55 / 75 * wiw - 126 / 750 * wiw) / 2 + 'px',
          bottom: -(126 / 750 * wiw * 169 / 133 / 2) + 'px'
        },
        innerPhoto: {
          width: '100%'
        }
      },
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/heijiu/',
      control: {
        l: 0,
        r: 0
      },
      bindImage: ''
    }
  },
  mounted() {
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      if (this.$route.query.hasOwnProperty('id')) {
        let id = this.$route.query.id
        let that = this
        marketService
          .getInfoById(this, id)
          .then(res => {
            that.bindImage = res.image
          })
          .catch(err => {
            Toast('网络错误，请重试')
          })
      } else {
        Toast('没有照片id')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/heijiu/';
.hj-root {
  background-image: url('@{imgServerUrl}bg2.png');
  background-repeat: repeat-y;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  .root-topimg {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
  }
  .root-photo {
    z-index: 3;
    border: solid 3px #325f32;
    background-color: white;
    .inner-photo {
      @diff : 10px;
      width: calc(~'100% - @{diff}');
      margin: 5px;
      border: 1px solid black;
      height: calc(~'100% - @{diff}');
      overflow: hidden;
    }
  }
  .root-power {
    z-index: 4;
    position: absolute;
    bottom: 2%;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .top-img {
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
