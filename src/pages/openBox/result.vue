<template>
  <div class="report-wrap">
    <div class="coupon-wrap">
      <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/arrow_icon.png" class="arrow"/>
    </div>
    <div class="photo-wrap">
      <div class="photo-content">
        <img alt="" src="http://ovy9ksh5d.bkt.clouddn.com/FlpUaUUsO6R1UzrsQS_XGx4JyYIn"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data (){
    return {}
  },
  beforeCreate(){
    document.title = '开箱子'
  },
  created(){
    // alert(22)
  },
  mounted(){
    $(".report-wrap").css('min-height', $(window).height());
    $(".coupon-wrap").css('height', $(window).height());
    $(".photo-wrap").css('height', $(window).height());
  }
}
</script>
<style lang="less" scoped>
  @imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box';
.report-wrap{
  position: relative;
  .coupon-wrap{
    background-repeat: no-repeat;
    background-image: url("@{imageHost}/report_bg_1.png");
    background-size: 100% 100%;
    position: relative;
    .arrow{
      position: absolute;
      bottom: 20%;
      width: 15%;
      left: 42.5%;
    }
  }
  .photo-wrap{
    background-repeat: no-repeat;
    background-image: url("@{imageHost}/report_bg_2.png");
    background-size: 100% 100%;
    position: relative;
    .photo-content{
      position: absolute;
      width: 48%;
      top: 28.11%;
      left: 26%;
      border: 4px solid #f9db96;
      border-radius: 26px;
      img{
        border-radius: 26px;
        width: 100%;
      }
    }
  }
}
</style>


