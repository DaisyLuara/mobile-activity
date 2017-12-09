<template>
  <div>aa</div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created() {
    if(process.env.NODE_ENV === "test"){
      console.log('test')
    }
  }
}
</script>
<style lang="less" scoped>

</style>

