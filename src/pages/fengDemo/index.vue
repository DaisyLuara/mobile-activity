<template>
  <div class="feng-wrap">
    <div 
      id="mapContainer" 
      class="container"/>
    <div 
      class="viewmode-group btn-group-vertical" 
      data-toggle="buttons">
      <div 
        :class="{'selected': viewMode == '2d'}" 
        class="btn btn-2d" 
        @click="change2d()">2D</div>
      <div 
        :class="{'selected': viewMode == '3d'}" 
        class="btn btn-3d" 
        @click="change3d()">3D</div>
    </div>
    <!-- <div class="floor-img">
      <img src="static/feng/image/1-1.gif" alt="">
    </div> -->
  </div>
</template>
<script>
import $ from 'jquery'

export default {
  data() {
    return {
      fMap: null,
      fmapID: '11839',
      ctlOpt: null,
      toolOpt: null,
      toolControl: null,
      groupControl: null,
      viewMode: '2d',
      jump: null
    }
  },
  beforeCreate() {
    document.title = '蜂鸟云demo'
  },
  mounted() {
    $('.feng-wrap').css('height', $(window).height())
    this.initCtlOpt()
    // this.initToolOpt();
    this.initFMap()
  },
  created() {},
  methods: {
    initFMap() {
      let that = this
      that.fMap = new fengmap.FMMap({
        container: document.getElementById('mapContainer'), //渲染dom
        //开发者申请应用名称
        appName: 'xingstation_mini',
        //开发者申请应用下web服务的key
        key: '528b65fa54ac6b1b207691a4abeadfb2',
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
      })

      // that.fMap.visibleGroupIDs = that.fMap.groupIDs; //设置所有楼层可见
      that.fMap.focusGroupID = 1 //设置聚焦楼层为第一层
      //打开Fengmap服务器的地图数据和主题
      that.fMap.openMapById(that.fmapID)

      //地图加载完成回掉方法
      that.fMap.on('loadComplete', function() {
        that.addImageMarker()
        that.addLocationMarker()
        //创建楼层(按钮型)，创建时请在地图加载后(loadComplete回调)创建。
        that.groupControl = new fengmap.buttonGroupsControl(
          that.fMap,
          that.ctlOpt
        )
        // that.toolControl = new fengmap.toolControl(that.fMapmap,that.toolOpt);
        //通过楼层切换控件切换聚焦楼层时的回调函数
        //groupContro 即为楼层控件对象
        that.groupControl.onChange(function(groups, allLayer) {
          //groups 表示当前要切换的楼层ID数组,
          //allLayer表示当前楼层是单层状态还是多层状态。
        })
      })

      // 点击地图结点事件
      that.fMap.on('mapClickNode', function(event) {
        console.dir(event)
        if (event.nodeType == fengmap.FMNodeType.IMAGE_MARKER) {
          //信息框控件大小配置
          let ctlOpt = new fengmap.controlOptions({
            mapCoord: {
              //设置弹框的x轴
              x: event.target.x,
              //设置弹框的y轴
              y: event.target.y,
              //设置弹框位于的楼层
              groupID: 1
            },
            //设置弹框的宽度
            width: 200,
            //设置弹框的高度
            height: 100,
            marginTop: 10,
            //设置弹框的内容
            content:
              '<a target="_bank" href="http://www.fengmap.com">这是一个信息框</a>'
          })

          //添加弹框到地图上
          let popMarker = new fengmap.FMPopInfoWindow(that.fMap, ctlOpt)
        }
      })
    },
    initCtlOpt() {
      this.ctlOpt = new fengmap.controlOptions({
        //默认在右上角
        position: fengmap.controlPositon.LEFT_BOTTOM,
        //默认显示楼层的个数
        showBtnCount: 7,
        //初始是否是多层显示，默认单层显示
        allLayer: false,
        //位置x,y的偏移量
        offset: {
          x: 20,
          y: 10
        }
      })
    },
    initToolOpt() {
      this.toolOpt = new fengmap.controlOptions({
        position: fengmap.controlPositon.RIGHT_TOP, //默认在右上角
        offset: { x: 0, y: 0 }, //位置偏移设置，默认(0,0)
        init2D: false, //二三维切换按钮初始是否2维状态。默认false.
        initGroups: false, //单楼层和多楼层切换控件初始显示是否是多楼层。默认false.
        expanded: false //初始是否展开所有工具按钮。默认false
      })
    },
    addImageMarker() {
      let that = this
      let jump
      let group = that.fMap.getFMGroup(that.fMap.groupIDs[0])
      let layer = group.getOrCreateLayer('imageMarker')
      let im = new fengmap.FMImageMarker({
        name: '测试',
        //设置图片路径
        url: 'static/feng/image/1-1.gif',
        //设置图片显示尺寸
        size: 64,
        height: 0,
        x: 13528081.142400462,
        y: 3662348.646981331,
        z: 1,
        callback: function() {
          // 在图片载入完成后，设置 "一直可见"
          im.alwaysShow()
        }
      })
      layer.addMarker(im)
      this.jump = im.jump({
        times: 0,
        duration: 1,
        delay: 0.5,
        height: 2
      })
    },
    addLocationMarker() {
      let that = this
      let locationMarker = new fengmap.FMLocationMarker({
        //设置图片的路径
        url: 'static/feng/image/pointer.png',
        //设置图片显示尺寸
        size: 46,
        //设置图片高度
        height: 10
      })
      that.fMap.addLocationMarker(locationMarker)
      locationMarker.setPosition({
        //设置定位点的x坐标
        x: that.fMap.center.x,
        //设置定位点的y坐标
        y: that.fMap.center.y,
        //设置定位点所在楼层
        groupID: that.fMap.groupIDs[0],
        //设置定位点的高于楼层多少
        zOffset: 1
      })
    },
    change2d() {
      this.fMap.viewMode = fengmap.FMViewMode.MODE_2D
      this.viewMode = '2d'
    },
    change3d() {
      this.fMap.viewMode = fengmap.FMViewMode.MODE_3D
      this.viewMode = '3d'
    }
  }
}
</script>
<style lang="less" scoped>
#mapContainer {
  height: 100%;
}
.viewmode-group {
  position: fixed;
  right: 30px;
  top: 30px;
  .btn {
    float: left;
    width: 50px;
    height: 38px;
    color: #c1c1c1;
    background: #fff;
    text-align: center;
    line-height: 36px;
    border: 1px solid #c1c1c1;
    &.selected {
      border-color: #3dadeb;
      background: rgba(179, 212, 252, 0.6);
      color: #000;
    }
  }
  .btn-2d {
    border-radius: 50px 0 0 50px;
    border-right: none;
    &.selected {
      border-right: 1px solid #3dadeb;
    }
  }
  .btn-3d {
    border-radius: 0 50px 50px 0;
    border-left: none;
    &.selected {
      border-left: 1px solid #3dadeb;
    }
  }
}
.floor-img {
  position: fixed;
  right: 30px;
  top: 30px;
  width: 100px;
  img {
    width: 100%;
  }
}
</style>
