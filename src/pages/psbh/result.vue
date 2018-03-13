<template>
  <div class="sz-photo-wrap">
    <photo-template :marketingOptions="marketingOptions"></photo-template>
  </div>
</template>
<script>
import photoTemplate from 'templates/christmas/result';

const marketingImageServer = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing';
export default {
  components: {
    photoTemplate,
  },
  beforeCreate() {
    document.title = '浦商百货';
  },
  data() {
    return {
      marketingOptions: {
        name: '浦商百货',
        wxShareInfo: {
          title: '旺狗开春 情缘满分',
          desc: '宏伊国际广场借旺狗报新春 送祝福 合家欢 情侣睦 诞生的汪早脱单',
          imgUrl: marketingImageServer + '/wx_share_icon/psbh_travel_share_icon.jpeg',
        },
        bg: {
          backgroundImage: 'url(' + marketingImageServer + '/templates/christmas/photo_bg.png)',
        },
        topDecorate: {
          imgUrl: marketingImageServer + '/templates/christmas/top_decorate.png',
        },
        title: {
          imgUrl: marketingImageServer + '/templates/christmas/title.png',
          style: {
            width: '54%',
            marginTop: '33%',
          },
        },
        photo: {
          wrapStyle: {

          },
          frameImgUrl: marketingImageServer + '/templates/christmas/frame.png',
          style: {
            width: '63%',
            top: '12%',
            zIndex: '3',
          },
        },
        saveTip: {
          imgUrl: marketingImageServer + '/templates/christmas/save_tip.png',
          style: {
            width: '76%',
          },
        },
      },
    };
  },
};
</script>
<style lang="less" scoped>

</style>
