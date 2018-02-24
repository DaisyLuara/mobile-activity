<template>
  <div class="money-photo-wrap">
    <photo-template :marketingOptions="marketingOptions"></photo-template>
  </div>
</template>
<script>
import photoTemplate from 'templates/noMoney/result';

const marketingImageServer = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing';
export default {
  components: {
    photoTemplate,
  },
  data() {
    return {
      marketingOptions: {
        name: 'jinjia',
        wxShareInfo: {
          title: '圣你为什么没有钱？只需「刷脸」，就能测验！',
          desc: '',
          imgUrl: marketingImageServer + '/wx_share_icon/jinjia_share_icon.jpeg',
        },
        bg: {
          backgroundImage: 'url(' + marketingImageServer + '/templates/noMoney/report-bg.jpg)',
        },
        bottom: {
        },
      },
    };
  },
  beforeCreate() {
    document.title = '金家';
  },
};
</script>
<style lang="less" scoped>

</style>
