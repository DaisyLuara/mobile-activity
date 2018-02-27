<template>
  <div class="map-wrap">
    <div class="floors-content"></div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
    };
  },
   beforeCreate() {
    document.title = '室内图';
  },
  mounted() {
    $('.map-wrap').css('height', $(window).height());
  },
  created() {
     var params = {
    dim: "3d"
  }
  var map = IndoorMap(params);
  map.load('static/smap/data/mapData.json', function(){
    map.showFloor(1);
    map.setSelectable(false);
    map.showPubPoints(true);
    map.setSelectable(true);

    var ul = IndoorMap.getUI(map);
    document.body.appendChild(ul);
  });

  animate();

  function animate(){
    requestAnimationFrame(animate);
}
  },
  methods: {
  },
  computed: {
  },
};
</script>
<style scoped lang="less">
.map-wrap{
  .floors-content{
    width: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
    overflow: hidden;
    z-index: 300;
    text-align: center;
  }
}
</style>