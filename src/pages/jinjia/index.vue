<template>
  <div class="tes-phone-wrap">
    <phone-template :marketingOptions="marketingOptions"></phone-template>
  </div>
</template>
<script>
import phoneTemplate from 'templates/noMoney/index';

const marketingImageServer = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing';

export default {
  components: {
    phoneTemplate,
  },
  beforeCreate() {
    document.title = '金家';
  },
  created() {

  },
  data() {
    return {
      marketingOptions: {
        name: 'jinjia',
        bg: {
          backgroundImage: 'url(' + marketingImageServer + '/templates/noMoney/phone-bg.jpg)',
        },
        phoneIcon: {
          imgUrl: marketingImageServer + '/templates/noMoney/phone-icon.png',
        },
      },
    };
  },
};
</script>
<style lang="less" scoped>
.tes-phone-wrap{
  overflow: hidden;
}
</style>