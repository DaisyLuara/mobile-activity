<template>
  <div 
    class="wrap"
  />
</template>
<script>
import $ from 'jquery'
import { getInfoById } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      utm_term: this.$route.query.utm_term,
      utm_campaign: this.$route.query.utm_campaign,
      face_id: this.$route.query.utm_campaign
    }
  },
  mounted() {
    $('.wrap').css('min-height', $(window).height())
  },
  created() {
    this.getImageById()
  },
  methods: {
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      console.log(id)
      getInfoById(id)
        .then(result => {
          console.log(result)
          var URL =
            'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=115B7636F396DF71'
          window.location.href = URL
          console.log(URL)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/war';
.wrap {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
}
</style>


