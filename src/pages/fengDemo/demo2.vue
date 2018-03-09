<template>
  <div class="feng-wrap" id="feng-root">
    <div id="mapContainer" class="container"></div>
    <div class="viewmode-group btn-group" data-toggle="buttons">
    </div>
    <div class="detail-wrap" :class="{'detail-wrap': detailShow , 'fold': !detailShow}">
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
      controlStatus: true
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
        this.handleMapStartAnimation()
        this.handleAddControlBtn()
        this.clickEventInit()
        this.addControlEventListener()
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
    handleMapStartAnimation() {
      let startRotate = -45
      let that = this
      // setTimeout(() => {
      //   that.fMap.rotateAngle = startRotate + 1
      //   startRotate++
      //   console.log(that.fMap.rotateAngle)
      // }, 100)
      // setTimeout(() => {
      //   that.fMap.rotateAngle = startRotate + 1
      //   startRotate++
      //   console.log(that.fMap.rotateAngle)
      // }, 200)
      // this.fMap.rotateAngle = startRotate + 1
    },
    initMap() {
      return new Promise((resolve, reject) => {
        this.fMap = new fengmap.FMMap({
          container: document.getElementById('mapContainer'),
          mapThemeURL: 'static/data/theme',
          defaultThemeName: 3010,
          appName: 'xingstation_mini',
          key: '528b65fa54ac6b1b207691a4abeadfb2',
          mapServerURL: 'static/feng/data/' + this.fMapId,
          defaultMapScaleLevel: 20,
          focusAlphaMode: false,
          modelSelectedEffect: false,
          focusAlpha: 0,
          defaultControlsPose: -45
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
          that.fMap.setMapScaleLevelRange(19, 20)
          // that.fMap.gestureEnableController_.enableMapRotate = false
          that.fMap.gestureEnableController_.enableMapIncline = false
          // that.fMap.gestureEnableController_.enableMapPinch = false
          resolve()
        })
      })
    },
    addControlEventListener() {
      let that = this
      let btn = document.getElementsByClassName('fm-control-groups-btn')[0]
      let list = document.getElementsByClassName('fm-layer-list')[0]
      let ele = document.getElementById('ele')

      list.style.setProperty('height', '108px', 'important')
      list.style.setProperty('margin-top', '83px')
      list.style.setProperty('padding-top', '13px')
      btn.style.setProperty('height', '65px', 'important')

      setTimeout(() => {
        list.style.transition = '0.1s ease-out'
      }, 100)

      btn.addEventListener('click', () => {
        this.controlStatus = !this.controlStatus
        if (this.controlStatus) {
          btn.style.borderTopRightRadius = '2px'
          btn.style.borderTopLeftRadius = '2px'

          console.log('expend')
          list.style.setProperty('height', '108px', 'important')
          list.style.setProperty('padding-top', '13px')
          list.style.setProperty('margin-top', '83px')
        } else {
          console.log('fold')
          btn.style.borderTopRightRadius = '21px'
          btn.style.borderTopLeftRadius = '21px'

          list.style.setProperty('height', '0px', 'important')
          list.style.setProperty('padding-top', '0px')
          list.style.setProperty('margin-top', '65px')
        }
        if (btn.style.borderTopRightRadius === '21px') {
        } else if (btn.style.borderTopRightRadius === '2px') {
        }
      })
    },
    handleAddControlBtn() {
      let btn = document.getElementsByClassName('fm-control-groups-btn')[0]
      btn.style.borderBottomLeftRadius = '21px'
      btn.style.borderBottomRightRadius = '21px'

      // let btn_div = document.createElement('div')
      // btn_div.style =
      // 'width: 100%; height: 100%; position: absolute; bottom: -23px; left: 0; background-color: #ebecf4;'
      let btn_child = document.createElement('img')
      btn_child.src = 'static/feng/image/fm-control.png'
      btn_child.id = 'ele'
      btn_child.style =
        'width: 100%; border-bottom-left-radius: 21px; border-bottom-right-radius: 21px; position: absolute; top: 21px; left: 0;'
      // btn_div.appendChild(btn_child)
      btn.appendChild(btn_child)
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
          let group = this.fMap.getFMGroup(e.groupID || this.currentGroup)
          let layer = group.getOrCreateLayer('imageMarker')
          switch (e.nodeType) {
            case fengmap.FMNodeType.IMAGE_MARKER:
              this.handleLock = true
              if (
                e.name === 'f1_1' ||
                e.name === 'f1_2' ||
                e.name === 'f2_1' ||
                e.name === 'f1_3' ||
                e.name === 'f2_2' ||
                e.name === 'f3_1' ||
                e.name.slice(0, 3) === 'new'
              ) {
                this.handleDetailShow(e)
                this.handleMarkerReset(e)
                if (
                  e.name === 'f1_1' ||
                  e.name === 'f1_2' ||
                  e.name === 'f2_1'
                ) {
                  let addMarker = new fengmap.FMImageMarker({
                    url: 'static/feng/image/redpack.png',
                    size: 35,
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
                  layer.addMarker(addMarker)
                }
              } else {
                this.resetDetail()
              }
              break
            case 4:
              this.resetDetail()
              break
            case 0:
              this.resetDetail()
              break
            case 5:
              this.resetDetail()
              break
            default:
              this.handleLock = false
          }
        }
      })
    },
    handleMarkerReset(e) {
      let group = this.fMap.getFMGroup(e.groupID)
      let layer = group.getOrCreateLayer('imageMarker')
      layer.removeMarker(e)
      let newMarker = new fengmap.FMImageMarker({
        name: 'new_' + e.name,
        url: 'static/feng/image/machine-1.png',
        size: 64,
        x: e.x,
        y: e.y,
        // height: 10,
        z: 0,
        callback: () => {
          newMarker.alwaysShow()
        }
      })
      layer.addMarker(newMarker)
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
.feng-wrap {
  overflow: hidden;
  position: relative;
}
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
  padding: 10px;
  transition: 0.2s ease-in;
  &.fold {
    bottom: -200px;
  }
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

