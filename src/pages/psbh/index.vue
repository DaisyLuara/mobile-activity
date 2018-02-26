<template>
  <div class="psbh-phone-wrap">
    <phone-template :marketingOptions="marketingOptions"></phone-template>
  </div>
</template>
<script>
import phoneTemplate from 'templates/christmas/index';

const marketingImageServer = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing';
export default {
  components: {
    phoneTemplate,
  },
  beforeCreate() {
    document.title = '浦商百货';
  },
  created() {

  },
  data() {
    return {
      marketingOptions: {
        name: 'psbh',
        wxShareInfo: {
          title: '圣诞节到了，我把自己包成礼物送给你',
          desc: '苏州中心商场有你，圣诞节惊喜有礼',
          imgUrl: marketingImageServer + '/wx_share_icon/psbh_share_icon.jpg',
        },
        bg: {
          backgroundImage:  'url(' + marketingImageServer + '/templates/christmas/bg.jpg)',
        },
        topLogo: {
          imgUrl: marketingImageServer + '/templates/christmas/top_logo.png',
          style: {
            top: '13%',
            width: '63%',
          },
        },
        mobile: {
          style: {
            top: '58%',
          },
          errorTips: {
            style: {
              color: '#fff',
            },
          },
        },
        bottomLogo: {
          imgUrl: marketingImageServer + '/pages/psbh/bottom_logo.png',
          style: {
            top: '87%',
            width: '29%',
          },
        },
      },
    };
  },
};
</script>
<style lang="less" scoped>

</style>
