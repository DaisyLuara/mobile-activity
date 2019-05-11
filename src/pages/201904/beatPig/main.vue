<template>
  <div class="container">
    <audio 
      id="music" 
      autobuffer 
      autoloop 
      loop  
      hidden
    >
      <source :src="CDNURL + '/autio/wuyue-beatPig-bgm.mp3'">
    </audio>
    <router-view />
  </div>
</template>

<script>
const CDNURL = process.env.CDN_URL;
export default {
  data() {
    return {
			CDNURL: CDNURL
		}
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
.container {
	width: 100%;
  height: 100vh;
	overflow: hidden;
}
</style>