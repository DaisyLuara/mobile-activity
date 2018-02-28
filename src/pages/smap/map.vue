<template>
  <div class="map-wrap">
    <div class="floors-content"></div>
    <!-- <div class="modal-content">
      <span @click="modalHandle('2d')">2D</span>
      <span @click="modalHandle('3d')">3D</span>
    </div> -->
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
    this.modalHandle("3d");
  },
  methods: {
    modalHandle(modalType) {
      var params = {
        dim: modalType
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
    }
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
    font-size: 28px;
    padding: 20px;
  }
  .modal-content{
    width: 25%;
    top: 50px;
    right: 20px;
    position: absolute;
    overflow: hidden;
    z-index: 300;
    font-size: 28px;
    padding: 20px;
    border: 1px solid #928d8d;
    border-radius: 50%;
    text-align: center;
  }
}
</style>