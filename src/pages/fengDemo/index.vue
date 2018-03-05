<template>
  <div class="feng-wrap">
    <div id="mapContainer" class="container"></div>
    <div class="viewmode-group btn-group-vertical" data-toggle="buttons">
	  	<div @click="change2d()" class="btn btn-default">2D</div>
		  <div @click="change3d()" class="btn btn-default btn-primary">3D</div>
	  </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      fMap: null,
      fmapID: '11839',
      ctlOpt: null,
      toolOpt: null,
      toolControl: null,
      groupControl: null
    }
  },
  beforeCreate() {
    document.title = '蜂鸟云demo';
  },
  mounted() {
    $('.feng-wrap').css('height', $(window).height());
    this.initCtlOpt();
    // this.initToolOpt();
    this.initFMap();
  },
  created() {
  },
  methods: {
    initFMap(){
      let that = this;
      that.fMap = new fengmap.FMMap({
        container: document.getElementById('mapContainer'), //渲染dom
        //开发者申请应用名称
        appName:'xingstation_mini',
        //开发者申请应用下web服务的key
        key:'528b65fa54ac6b1b207691a4abeadfb2',
				//地图数据位置
				mapServerURL: 'static/feng/data/' + that.fmapID,
				//主题数据位置
				// mapThemeURL: 'static/feng/data/theme',
				//设置主题
        // defaultThemeName: '3007',
        //开启2维，3维切换的动画显示
        viewModeAnimateMode: true,
				// 默认比例尺级别设置为20级
				defaultMapScaleLevel: 20,
				//是否对不可见图层启用透明设置 默认为true
				focusAlphaMode: false,
				//对不聚焦图层启用透明设置，当focusAlphaMode = true时有效
				focusAlpha: 0.1
      });

      // that.fMap.visibleGroupIDs = that.fMap.groupIDs; //设置所有楼层可见
      that.fMap.focusGroupID = 1; //设置聚焦楼层为第一层
      //打开Fengmap服务器的地图数据和主题
      that.fMap.openMapById(that.fmapID);

			//地图加载完成回掉方法
			that.fMap.on('loadComplete',function() {
				//创建楼层(按钮型)，创建时请在地图加载后(loadComplete回调)创建。
				that.groupControl = new fengmap.buttonGroupsControl(that.fMap, that.ctlOpt);
        // that.toolControl = new fengmap.toolControl(that.fMapmap,that.toolOpt);
				//通过楼层切换控件切换聚焦楼层时的回调函数
				//groupContro 即为楼层控件对象
				that.groupControl.onChange(function(groups, allLayer) {
					//groups 表示当前要切换的楼层ID数组,
          //allLayer表示当前楼层是单层状态还是多层状态。
				});
			});
    },
    initCtlOpt(){
      this.ctlOpt = new fengmap.controlOptions({
				//默认在右上角
				position: fengmap.controlPositon.RIGHT_TOP,
				//默认显示楼层的个数
				showBtnCount: 7,
				//初始是否是多层显示，默认单层显示
				allLayer:false,
				//位置x,y的偏移量
				offset: {
					x: 20,
					y: 10
				}
			});
    },
    initToolOpt(){
      this.toolOpt = new fengmap.controlOptions({
        position: fengmap.controlPositon.RIGHT_TOP,//默认在右上角
        offset:{x:0,y:0},    //位置偏移设置，默认(0,0)
        init2D:false,   //二三维切换按钮初始是否2维状态。默认false.
        initGroups: false, //单楼层和多楼层切换控件初始显示是否是多楼层。默认false.
        expanded:false //初始是否展开所有工具按钮。默认false
      });
    },
    change2d() {
      this.fMap.viewMode = fengmap.FMViewMode.MODE_2D;
    },
    change3d(){
      this.fMap.viewMode = fengmap.FMViewMode.MODE_3D;
    }
  },
}
</script>
<style lang="less" scoped>
#mapContainer{
  height: 100%;
}
.viewmode-group{
  position: fixed;
  left: 10%;
  bottom: 100px;
  width: 50px;
  .btn{
    display: block;
    height: 38px;
    background: #fff;
    text-align: center;
    line-height: 36px;
    border: 1px solid blue;
  }
}
</style>
