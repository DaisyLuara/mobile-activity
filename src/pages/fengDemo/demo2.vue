<template>
  <div class="feng-wrap" id="feng-root">
    <div id="mapContainer" class="container"></div>
    <div class="viewmode-group btn-group" data-toggle="buttons">
    </div>
    <div class="detail-wrap" v-if="detailShow">
      <img class="detail-button" src="static/feng/image/info.png"/>
      <div class="detail-title">
        <span class="title-text">{{detailInfo.name}}</span>
        <img class="title-img" src="static/feng/image/redpack-list.png" />
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
    <img @click="handleNaviToMini" src="static/feng/image/list-button.png" class="list-change"/>
  </div>
</template>


<script>
import './add.css'
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
      handleLock: false,
      controlStatus: false
    }
  },
  mounted() {
    $('.feng-wrap').css('height', $(window).height())
    this.init()
  },
  methods: {
    handleNaviToMini() {
      // wx.miniProgram.getEnv(function(res) {
      //   console.log(res.miniprogram)
      // })
      wx.miniProgram.redirectTo({ url: '/pages/floor' })
    },
    async init() {
      try {
        await this.getWxJSSDKReady()
        this.ctlOpt = await this.ctlOptInit()
        await this.initMap()
        this.clickEventInit()
        this.addControlEventListener()
        this.handleAddControlBtn()
      } catch (e) {
        console.log(e)
      }
    },
    getWxJSSDKReady() {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.src = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'
        let fengDiv = document.getElementById('feng-root')
        fengDiv.appendChild(script)
        resolve()
      })
    },
    initMap() {
      return new Promise((resolve, reject) => {
        this.fMap = new fengmap.FMMap({
          container: document.getElementById('mapContainer'),
          mapThemeURL: 'static/data/theme',
          defaultThemeName: 3006,
          appName: 'xingstation_mini',
          key: '528b65fa54ac6b1b207691a4abeadfb2',
          mapServerURL: 'static/feng/data/' + this.fMapId,
          defaultMapScaleLevel: 20,
          focusAlphaMode: false,
          modelSelectedEffect: false,
          focusAlpha: 0
        })

        this.fMap.openMapById(this.fMapId)

        this.fMap.on('loadComplete', () => {
          // 楼层
          this.groupControl = new fengmap.buttonGroupsControl(
            this.fMap,
            this.ctlOpt
          )
          this.addImageMarker()
          let that = this
          this.groupControl.onChange(function(groups, allLayer) {
            //groups 表示当前要切换的楼层ID数组,
            //allLayer表示当前楼层是单层状态还是多层状态。
            //...
            that.handleAddControlBtn()
            that.currentGroup = groups[0]
          })
          that.fMap.setMapScaleLevelRange(20, 20)
          that.fMap.gestureEnableController_.enableMapRotate = false
          that.fMap.gestureEnableController_.enableMapIncline = false
          that.fMap.gestureEnableController_.enableMapPinch = false

          resolve()
        })
      })
    },
    addControlEventListener() {
      let that = this
      let btn = document.getElementsByClassName('fm-control-groups-btn')[0]
      btn.style.borderTopRightRadius = '21px'
      btn.style.borderTopLeftRadius = '21px'
      btn.addEventListener('click', () => {
        if (btn.style.borderTopRightRadius === '21px') {
          btn.style.borderTopRightRadius = '2px'
          btn.style.borderTopLeftRadius = '2px'
        } else if (btn.style.borderTopRightRadius === '2px') {
          btn.style.borderTopRightRadius = '21px'
          btn.style.borderTopLeftRadius = '21px'
        }
      })
    },
    handleAddControlBtn() {
      let btn = document.getElementsByClassName('fm-control-groups-btn')[0]
      let btn_div = document.createElement('div')
      btn_div.style =
        'width: 100%; height: 100%; position: absolute; bottom: -23px; left: 0; background-color: #ebecf4;'
      let btn_child = document.createElement('img')
      btn_child.src = 'static/feng/image/fm-control.png'
      btn_child.style =
        'width: 100%; border-bottom-left-radius: 21px; border-bottom-right-radius: 21px;'
      btn_div.appendChild(btn_child)
      btn.appendChild(btn_div)
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
        // console.dir(e)
        if (this.handleLock) {
          if (e.nodeType !== fengmap.FMNodeType.IMAGE_MARKER) {
            this.handleLock = false
          }
        } else {
          let group = this.fMap.getFMGroup(e.groupID || this.currentGroup)
          let layer = group.getOrCreateLayer('imageMarker')
          switch (e.nodeType) {
            case fengmap.FMNodeType.IMAGE_MARKER:
              this.handleLock = true
              let addMarker = new fengmap.FMImageMarker({
                url: 'static/feng/image/redpack.png',
                size: 20,
                x: e.x,
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
              this.handleRemoveMarkers(e.groupID)
              if (e.name === 'f1_1' || e.name === 'f1_2' || e.name === 'f2_1') {
                layer.addMarker(addMarker)
                this.handleDetailShow(e)
              } else {
                this.resetDetail()
              }
              break
            case 4:
              this.handleRemoveMarkers(e.groupID)
              this.resetDetail()
              break
            case 0:
              this.handleRemoveMarkers(e.groupID)
              this.resetDetail()
              break
            case 5:
              this.handleRemoveMarkers(e.groupID)
              this.resetDetail()
              break
            default:
              this.handleLock = false
          }
        }
      })
    },
    handleRemoveMarkers(id) {
      if (id >= 2 && id <= 4) {
        let group = this.fMap.getFMGroup(id)
        let layer = group.getOrCreateLayer('imageMarker')
        for (let i = 5 - id; i <= layer.markers.length; i++) {
          layer.removeMarker(layer.markers[i])
        }
      }
    },
    addImageMarker() {
      return new Promise((resolve, reject) => {
        let group = this.fMap.getFMGroup(this.fMap.groupIDs[1])
        let layer = group.getOrCreateLayer('imageMarker')
        let F1_1 = new fengmap.FMImageMarker({
          name: 'f1_1',
          url: 'static/feng/image/machine-0.png',
          size: 64,
          x: 13528113.343703128,
          y: 3662316.2432128466,
          // height: 10,
          z: 0,
          callback: () => {
            F1_1.alwaysShow()
          }
        })
        let F1_2 = new fengmap.FMImageMarker({
          name: 'f1_2',
          url: 'static/feng/image/machine-0.png',
          size: 64,
          x: 13528069.603071805,
          y: 3662363.214140243,
          // height: 10,
          z: 0,
          callback: () => {
            F1_2.alwaysShow()
          }
        })
        let F1_3 = new fengmap.FMImageMarker({
          name: 'f1_3',
          url: 'static/feng/image/machine-0.png',
          size: 64,
          x: 13528115.001994299,
          y: 3662355.7043745373,
          // height: 10,
          z: 0,
          callback: () => {
            F1_3.alwaysShow()
          }
        })
        layer.addMarker(F1_1)
        layer.addMarker(F1_2)
        layer.addMarker(F1_3)

        let group2 = this.fMap.getFMGroup(this.fMap.groupIDs[2])
        let layer2 = group2.getOrCreateLayer('imageMarker')

        let F2_1 = new fengmap.FMImageMarker({
          name: 'f2_1',
          url: 'static/feng/image/machine-0.png',
          size: 64,
          x: 13528121.494989906,
          y: 3662306.967850478,
          // height: 10,
          z: 0,
          callback: () => {
            F2_1.alwaysShow()
          }
        })
        let F2_2 = new fengmap.FMImageMarker({
          name: 'f2_2',
          url: 'static/feng/image/machine-0.png',
          size: 64,
          x: 13528057.774711452,
          y: 3662370.564898199,
          // height: 10,
          z: 0,
          callback: () => {
            F2_2.alwaysShow()
          }
        })
        layer2.addMarker(F2_1)
        layer2.addMarker(F2_2)

        let group3 = this.fMap.getFMGroup(this.fMap.groupIDs[3])
        let layer3 = group3.getOrCreateLayer('imageMarker')

        let F3_1 = new fengmap.FMImageMarker({
          name: 'f3_1',
          url: 'static/feng/image/machine-0.png',
          size: 64,
          x: 13528141.977265798,
          y: 3662355.9839765457,
          // height: 10,
          z: 0,
          callback: () => {
            F3_1.alwaysShow()
          }
        })
        layer3.addMarker(F3_1)
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
.list-change {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
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
  .detail-button {
    width: 68px;
    height: 68px;
    position: absolute;
    top: -34px;
    right: 20px;
  }
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
      margin-left: 10px;
      height: 13px;
      width: 13px;
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
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.8px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: flex;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>

