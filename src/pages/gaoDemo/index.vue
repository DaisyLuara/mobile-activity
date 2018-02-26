<template>
  <div class="gaode-wrap">
    <div id="mapContainer" class="container"></div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      gaodeMap: null
    }
  },
  beforeCreate() {
    document.title = '高德地图demo';
  },
  mounted() {
    $('.gaode-wrap').css('height', $(window).height());
    this.initGaode();
  },
  created() {
  },
  methods: {
    initGaode(){
      let that = this;
      this.gaodeMap = new AMap.Map('mapContainer', {
        // resizeEnable: true,
        // floorControl: true,
        // floor: 1,
        showIndoorMap: true,
        center:[116.518542, 39.924677],
        // zoom:20
      });
      // this.gaodeMap.on('indoor_create',function(){
      //     that.gaodeMap.indoorMap.showIndoorMap('B000A856LJ',5);
      // })

      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView','AMap.IndoorMap'],
      function(){
        that.gaodeMap.addControl(new AMap.ToolBar());

        that.gaodeMap.addControl(new AMap.Scale());

        that.gaodeMap.addControl(new AMap.OverView({isOpen:true}));

        that.gaodeMap.addControl(new AMap.IndoorMap());
      });
    }
  },
}
</script>
<style lang="less" scoped>
#mapContainer{
  height: 100%;
}
</style>
