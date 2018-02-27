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
    // this.initIndoor();
  },
  created() {
  },
  methods: {
    initGaode(){
      let that = this;
      // 方式一创建室内地图
      // this.gaodeMap = new AMap.Map('mapContainer', {
      //   showIndoorMap: true,
      //   center:[116.518542, 39.924677]
      // });
      // this.gaodeMap.on('indoor_create',function(){
      //     that.gaodeMap.indoorMap.showIndoorMap('B000A856LJ',5);
      // })
      // 方式二创建室内地图，控件形式
      AMap.plugin(['AMap.IndoorMap', 'AMap.Geocoder'], function() {
        var indoorMap = new AMap.IndoorMap({alwaysShow:true});
        //设定在没有矢量底图的时候也显示，默认情况下室内图仅在有矢量底图的时候显示
        that.gaodeMap = new AMap.Map('mapContainer', {
            zoom: 18,
            resizeEnable: false,
            showIndoorMap:false,//隐藏地图自带的室内地图图层
            layers:[indoorMap,new AMap.TileLayer()]
        });

        indoorMap.on('click', function(result){
          // console.log(result)
          // 新建地址查询
          let geoCoder = new AMap.Geocoder();

          // 新建信息窗体
          let infoWindow = new AMap.InfoWindow();

          let address = '';
          let lnglat = [result.lnglat.lng, result.lnglat.lat]
          geoCoder.getAddress(lnglat,function(status,result){
            if (status === 'complete' && result.info === 'OK') {
              console.log(result.regeocode)
              address = result.regeocode.formattedAddress; //返回地址描述
              infoWindow.setContent(address);
              infoWindow.open(that.gaodeMap, lnglat);
            }
          })
        })
        indoorMap.showLabels();
        indoorMap.showIndoorMap('B000A856LJ',2,"GD0000080210100027"); //building_id, 楼层，shop_id
      });
    },
    initIndoor(){
      var map = new Indoor.Map('mapContainer',{
        key:'开发者key',
        buildingId:'建筑物ID'
      });
      //由于地图数据使用了异步加载，为避免出错请把所有的逻辑放在mapready事件内
      map.once('mapready',function(){
        console.log(map.getFloor());
      })
    }
  },
}
</script>
<style lang="less" scoped>
#mapContainer{
  height: 100%;
}
</style>
