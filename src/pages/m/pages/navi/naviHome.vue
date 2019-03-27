<template>
  <div class="navi-root"></div>
</template>

<script>
export default {
  created() {
    if (this.$route.query.rp) {
      window.location.href = "http://h5.xingstation.com/m/d7mz317i/6498/wallet";
    } else {
      window.location.href =
        "http://h5.xingstation.com/m/d7mz317i/6498/barrage/index";
    }
  }
};
</script>
