<template>
  <div class="map-wrap"></div>
</template>
<script>
// import THREE from './three.min.js';
// import Detector from './Detector.js';
// import OrbitControls from './OrbitControls.js';
// import IndoorMap from './IndoorMap.js';
// import Projector from './Projector.js';
// import IndoorMap3d from './IndoorMap3d.js';
// import Theme from './Theme.js';
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
  map.load('http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/smap/data/mapData.json', function(){
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
<style scoped>
</style>