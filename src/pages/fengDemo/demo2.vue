<template>
  <div class="feng-wrap">
    <div id="mapContainer" class="container"></div>
    <div class="viewmode-group btn-group" data-toggle="buttons">
    </div>
    <div class="detail-wrap" v-if="detailShow">
      <div class="detail-title">
        <span class="title-text">{{detailInfo.name}}</span>
        <img class="title-img" src="static/feng/image/redpack.png" />
      </div>
      <div class="detail-next">
        <span class="next-inner">
          下一个游戏: 你为什么没有
        </span>
      </div>
      <div class="detail-address">
        地址：B1中庭
      </div>
      <div class="detail-into">
        这里游戏介绍 游戏说明这里游戏介绍 游戏说明这里游戏介绍 游戏说明这
这里游戏介绍 游戏说明这里游戏介绍 游戏说明这里游戏介绍 游戏说明这
这里游戏介绍 游戏说明这里游戏介绍 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fMap: null,
      fMapId: '11839',
      ctlOpt: null,
      redPack: null,
      currentGroup: 1,
      detailShow: false,
      detailInfo: {},
      handleLock: false
    }
  },
  mounted() {
    $('.feng-wrap').css('height', $(window).height())
    this.init()
  },
  methods: {
    async init() {
      try {
        this.ctlOpt = await this.ctlOptInit()
        await this.initMap()
        this.clickEventInit()

        let btn = document.getElementsByClassName('fm-control-groups-btn')[0]
        // btn.innerHTML = ''
        // let btn_child = document.createElement('img')
        // btn_child.src = 'static/feng/image/fm-control.png'
        // btn_child.style =
        // 'width: 100%; border-bottom-left-radius: 21px; border-bottom-right-radius: 21px; position: absolute; bottom: 0; left: 0;'
        // btn.appendChild(btn_child)
      } catch (e) {
        console.log(e)
      }
    },
    initMap() {
      let that = this
      return new Promise((resolve, reject) => {
        this.fMap = new fengmap.FMMap({
          container: document.getElementById('mapContainer'),
          appName: 'xingstation_mini',
          key: '528b65fa54ac6b1b207691a4abeadfb2',
          mapServerURL: 'static/data/' + this.fMapId,
          defaultMapScaleLevel: 20,
          focusAlphaMode: false,
          focusAlpha: 0.1
        })

        this.fMap.focusGroupID = 1
        this.fMap.openMapById(this.fMapId)

        this.fMap.on('loadComplete', () => {
          // 楼层
          this.groupControl = new fengmap.buttonGroupsControl(
            this.fMap,
            this.ctlOpt
          )
          this.addImageMarker()
          this.groupControl.onChange(function(groups, allLayer) {
            //groups 表示当前要切换的楼层ID数组,
            //allLayer表示当前楼层是单层状态还是多层状态。
            //...
            that.currentGroup = groups
          })
          resolve()
        })
      })
    },
    ctlOptInit() {
      return new Promise(resolve => {
        let ctlOpt = new fengmap.controlOptions({
          position: fengmap.controlPositon.LEFT_BOTTOM,
          showBtnCount: 7,
          allLayer: false,
          offset: {
            x: 20,
            y: 10
          }
        })
        resolve(ctlOpt)
      })
    },
    changeGroupInit() {
      this.fMap.on()
    },
    clickEventInit() {
      let that = this
      this.fMap.on('mapClickNode', e => {
        console.dir(e)
        if (this.handleLock) {
          if (e.nodeType !== fengmap.FMNodeType.IMAGE_MARKER) {
            this.handleLock = false
          }
        } else {
          let group = this.fMap.getFMGroup(this.fMap.groupIDs[1])
          let layer = group.getOrCreateLayer('imageMarker')
          switch (e.nodeType) {
            case fengmap.FMNodeType.IMAGE_MARKER:
              this.handleLock = true
              let addMarker = new fengmap.FMImageMarker({
                url: 'static/feng/image/redpack.png',
                size: 32,
                x: e.x - 0.5,
                y: e.y,
                z: 10,
                callback: () => {
                  addMarker.alwaysShow()
                  addMarker.jump({
                    times: 0,
                    duration: 1,
                    dalay: 0.5,
                    height: 1
                  })
                }
              })
              this.handleRemoveMarkers(layer)
              layer.addMarker(addMarker)
              this.handleDetailShow(e)
              e.eventInfo.domEvent.cancelBubble = true
              break
            case 4:
              this.handleRemoveMarkers(layer)
              this.resetDetail()
              break
            case 0:
              this.handleRemoveMarkers(layer)
              this.resetDetail()
              break
            default:
              this.handleLock = false
          }
        }
      })
    },
    handleRemoveMarkers(layer) {
      for (let i = 3; i <= layer.markers.length; i++) {
        layer.removeMarker(layer.markers[i])
      }
    },
    addImageMarker() {
      return new Promise((resolve, reject) => {
        let group = this.fMap.getFMGroup(this.fMap.groupIDs[1])
        let layer = group.getOrCreateLayer('imageMarker')
        let F1_1 = new fengmap.FMImageMarker({
          name: 'f1_1',
          url: 'static/feng/image/machine-0.png',
          size: 128,
          x: 13528113.343703128,
          y: 3662316.2432128466,
          z: 0,
          callback: () => {
            F1_1.alwaysShow()
          }
        })
        let F1_2 = new fengmap.FMImageMarker({
          name: 'f1_2',
          url: 'static/feng/image/machine-0.png',
          size: 128,
          x: 13528069.603071805,
          y: 3662363.214140243,
          z: 0,
          callback: () => {
            F1_2.alwaysShow()
          }
        })
        let F1_3 = new fengmap.FMImageMarker({
          name: 'f1_3',
          url: 'static/feng/image/machine-0.png',
          size: 128,
          x: 13528115.001994299,
          y: 3662355.7043745373,
          z: 0,
          callback: () => {
            F1_3.alwaysShow()
          }
        })
        layer.addMarker(F1_1)
        layer.addMarker(F1_2)
        layer.addMarker(F1_3)
        resolve()
      })
    },
    handleDetailShow(e) {
      let list = document.getElementsByClassName('fm-layer-list')[0]
      list.style.marginTop = 65 - 134 + 'px'
      let groupBtn = document.getElementsByClassName('fm-control-groups-btn')[0]
      groupBtn.style.marginTop = -14 - 134 + 'px'
      this.detailShow = true
      this.detailInfo = e
    },
    resetDetail() {
      let list = document.getElementsByClassName('fm-layer-list')[0]
      list.style.marginTop = 65 + 'px'
      let groupBtn = document.getElementsByClassName('fm-control-groups-btn')[0]
      groupBtn.style.marginTop = -14 + 'px'
      this.detailShow = false
    }
  }
}
</script>

<style lang="less" scoped>
#mapContainer {
  height: 100%;
}
.detail-wrap {
  position: absolute;
  bottom: 0;
  height: 134px;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: solid 0.5px rgba(151, 151, 151, 0.43);
  display: flex;
  flex-direction: column;
  padding: 8px;
  .detail-title {
    padding: 3px 0;
    height: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .title-text {
      font-size: 18px;
      font-weight: 500;
    }
    .title-img {
      padding-left: 10px;
      height: 13px;
    }
  }
  .detail-next {
    height: 15px;
    font-size: 10px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.8px;
    text-align: left;
    .next-inner {
      background-color: #d8d8d8;
      padding: 0 10px;
      border-radius: 7.5px;
      color: white;
    }
  }
  .detail-address {
    font-size: 10px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.8px;
    text-align: left;
    padding: 8px 0;
  }
  .detail-into {
    border-top: 1px #d4d5de solid;
    font-size: 10px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.8px;
    text-align: left;
  }
}
</style>

<style lang="less">
hr {
  border-top: none !important;
}
.fm-control-groups-btn {
  margin-top: -14px;
  box-shadow: none !important;
  border-bottom-left-radius: 21px !important;
  border-bottom-right-radius: 21px !important;
  // background-color: #d6b88a !important;
  // color: white !important;
}
.fm-layer-list {
  border-top-left-radius: 21px !important;
  border-top-right-radius: 21px !important;
  box-shadow: none !important;
  overflow: hidden;
  background-color: #ebecf4 !important;
  margin-top: 65px;
  height: auto !important;
  padding-top: 13px;
}
.fm-control-groups-layer {
  &.fm-layer-btn-default {
    height: 23px !important;
    line-height: 23px !important;
    &.active {
      color: white !important;
      background-color: #d6b88a;
      height: 23px !important;
      line-height: 23px !important;
    }
  }
}
.detail-container {
  height: 134px;
  width: 100%;
  background-color: white;
  position: absolute;
  top: 0;
}
</style>
