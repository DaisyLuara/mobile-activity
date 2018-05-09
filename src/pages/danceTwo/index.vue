<template>
  <div class="wrap"></div>
</template>
<script>
import marketService from 'services/marketing';
import WxShare from 'modules/wxShare';
import wxService from 'services/wx';
import parseService from 'modules/parseServer';
import { customTrack } from 'modules/customTrack';

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing';

export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
    };
  },
  beforeCreate() {
    document.title = "星视度";
  },
  mounted(){
    $('.wrap').css('min-height', $(window).height());
  },
  created() {
    var URL='https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg';
    var A='?id=1990392&utm_source=30&utm_campaign=gamegadance&face_id=0ZSvDyI0DaVyQWwr&from=groupmessage&isappinstalled=0'
    window.location.href=URL+A;
  }
};
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/war';
.wrap{
    width:100%;
    height:100%;
    text-align: center;
    overflow:hidden; 
}

</style>


