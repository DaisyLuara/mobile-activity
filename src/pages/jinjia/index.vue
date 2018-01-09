<template>
  <div class="tes-phone-wrap">
    <phone-template :marketingOptions="marketingOptions"></phone-template>
  </div>
</template>
<script>
const marketing_image_server = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";
import phoneTemplate from 'templates/noMoney/index'
export default {
  components: {
    phoneTemplate
  },
  beforeCreate(){
    document.title = '金家'
  },
  created(){

  },
  data(){
    return {
      marketingOptions: {
        name: 'jinjia',
        bg: {
          'backgroundImage':  'url('+ marketing_image_server +'/templates/noMoney/phone-bg.jpg)'
        },
        phoneIcon: {
          imgUrl: marketing_image_server +'/templates/noMoney/phone-icon.png'
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tes-phone-wrap{
  overflow: hidden;
}
</style>