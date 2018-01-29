<template>
  <div class="report-wrap">
    <div class="photo-wrap">
      <!-- <img :src = "resultImgUrl" /> -->
      <img src = "http://ozwvqiu0u.bkt.clouddn.com/FvJDho0lyvIEhFNSMnFFz9P8hFg8" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      resultImgUrl: ''
    }
  },
  beforeCreate() {
    document.title = "狗年汪情缘"
  },
  mounted(){
    $(".report-wrap").css('height', $(window).height());
  },
  created() {
    this.getPeopleImage()
  },
  methods:{
    getPeopleImage() {
      let recordId = decodeURI(this.$route.query.recordId);
      this.$http.get(process.env.SAAS_API + "/open/play/playResults/" + recordId).then(result => {
        let data = result.data.data;
        console.log(data)
        this.resultImgUrl = data.result_img_url;
      }).catch(err => {
      console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/dog';
.report-wrap{
  height: 100%;
  background-repeat: no-repeat;
  background-image: url("@{imageHost}/bg.png");
  background-size: 100% 100%;
  position: relative;
  .photo-wrap{
    position: absolute;
    top: 18%;
    width: 65%;
    left: 17.5%;
    img{
      width: 100%;
    }
  }
}
</style>


