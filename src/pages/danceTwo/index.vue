<template>
  <div class="wrap">
    <img  :src="resultImgUrl" alt=""/>
  </div>
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
      resultImgUrl:'',
      utm_term:this.$route.query.utm_term,
      utm_campaign:this.$route.query.utm_campaign,
      face_id:this.$route.query.utm_campaign,
    };
  },
  beforeCreate() {
    document.title = "星视度";
  },
  mounted(){
    $('.wrap').css('min-height', $(window).height());
  },
  created() {
    this.getImageById();
    var URL='https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg';
    var A='?id=1990392&utm_source=30&utm_campaign=gamegadance&face_id=0ZSvDyI0DaVyQWwr&from=groupmessage&isappinstalled=0'
    window.location.href=URL+A;
  },
  methods:{
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(result => {
          this.resultImgUrl = result.image
        })
        .catch(err => {
          console.log(err)
        })
    },
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


