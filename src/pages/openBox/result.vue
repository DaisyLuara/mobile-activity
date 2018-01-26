<template>
  <div class="report-wrap">
    <div class="coupon-wrap">
      <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/report_bg_1.png" class="report_bg_1"/>
      <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/arrow_icon.png" class="arrow"/>
    </div>
    <div class="photo-wrap">
      <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/report_bg_2.png" class="report_bg_2"/>
      <div class="photo-content">
        <!-- <img alt="" src="http://ovy9ksh5d.bkt.clouddn.com/FlpUaUUsO6R1UzrsQS_XGx4JyYIn" class="photo"/> -->
        <img alt="" :src="resultImgUrl" class="photo"/>
       <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/save.png" class="save"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data (){
    return {
      resultImgUrl: ''
    }
  },
  beforeCreate(){
    document.title = '开箱子'
  },
  created(){
    // alert(22)
    this.getPeopleImage()
  },
  methods:{
    getPeopleImage() {
      let recordId = decodeURI(this.$route.query.recordId);
      this.$http.get(process.env.SAAS_API + "/open/play/playResults/" + recordId).then(result => {
        let data = result.data.data;
        console.log(data)
        // let imageUrl = data.result_img_url;
        // let headImgUrl = data.head_img_url;
        this.resultImgUrl = data.result_img_url;
       
      }).catch(err => {
      console.log(err)
      })
    }
  },
  mounted(){
    $(".report-wrap").css('min-height', $(window).height());
    console.log()
    // $(".coupon-wrap").css('height', $(window).height());
    // $(".photo-wrap").css('height', $(window).height());
  }
}
</script>
<style lang="less" scoped>
  @imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box';
.report-wrap{
  position: relative;
  .coupon-wrap{
    // background-repeat: no-repeat;
    // background-image: url("@{imageHost}/report_bg_1.png");
    // background-size: 100% 100%;
    .report_bg_1{
      width:100%;
    }
    position: relative;
    .arrow{
      position: absolute;
      bottom: 20%;
      width: 15%;
      left: 42.5%;
    }
  }
  .photo-wrap{
    // background-repeat: no-repeat;
    // background-image: url("@{imageHost}/report_bg_2.png");
    // background-size: 100% 100%;
    .report_bg_2{
      width:100%;
    }
    position: relative;
    .photo-content{
      position: absolute;
      width: 48%;
      top: 28.11%;
      left: 26%;
      border: 4px solid #f9db96;
      border-radius: 26px;
      .photo{
        border-radius: 26px;
        width: 100%;
      }
    }
    .save{
      position: absolute;
      width: 40%;
      bottom: -11%;
      left: 30%;
    }
  }
}
</style>


