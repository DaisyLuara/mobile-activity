<template>
  <div class="feng-wrap" id="feng-root">
    <div id="mapContainer" class="container"></div>
    <div class="viewmode-group btn-group" data-toggle="buttons">
    </div>
    <div 
      ref="detail"
      class="detail-wrap" 
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd">
        <img v-if="liandongStatus === true" @click="ldWindowOpen()" class="detail-button" src="static/feng/image/info.png"/>
        <div @click="handleArrow" class="detail-arrow">
          <img class="arrow-inner" v-show="detailScrollToTop === false" src="static/feng/image/arrow-up.png" />
          <img class="arrow-inner" v-show="detailScrollToTop === true" src="static/feng/image/arrow-down.png" />
        </div>
        <div class="detail-title">
          <span class="title-text">{{displayTitle}}</span>
          <img v-if="this.currentAct === 0" class="title-img" src="static/feng/image/redpack-list.png" />
          <img v-if="this.currentAct === 1" class="title-img" src="static/feng/image/air-list.png" />
        </div>
        <div class="detail-next">
          <span class="next-inner">
            下一个游戏: 你为什么没有
          </span>
        </div>
        <div class="detail-address">
          地址：{{currentActAddress}}
        </div>
        <div class="detail-into">
          {{displayContext}}
        </div>
        <div class="detail-div">
        </div>
        <div class="detail-img"> 
          <img class="inner-img" :src="this.act[this.currentAct].img"/>
        </div>
    </div>
    <img @click="handleNaviToMini" src="static/feng/image/list-button.png" class="list-change"/>
    <div class="rp" v-if="rpShow === true" @click="handleRpClose">
      <RedPackRain />
    </div>
    <div class="liandong-wrap" v-if="ldWindow === true">
      <div class="ld-context">
        <div class="ld-title">联动说明</div>
        <div class="ld-content">
          {{currentLd}}
        </div>
      </div>
      <img @click="ldWindowClose" class="ld-close" src="static/feng/image/close.png" />
    </div>
  </div>
</template>


<script>
import RedPackRain from './components/redPack'
import './add.css'
export default {
  components: {
    RedPackRain
  },
  data() {
    return {
      fMap: null,
      fMapId: '11839',
      ctlOpt: null,
      redPack: null,
      currentGroup: 1,
      detailShow: false,
      detailScrollToTop: false,
      detailInfo: {},
      handleLock: false,
      controlStatus: true,
      rpShow: false,
      bindInnerImg: 'static/feng/image/pro.png',
      p: {
        list: {
          marginTop: -45
        },
        groupBtn: {
          marginTop: -124
        },
        detailShowPosition: 150
      },
      touch: {
        targetTouch: {
          Y: null
        }
      },
      act: [
        {
          name: '天降红包',
          des: '找到红包屏，扫描屏内二维码，获得红包福利。',
          img: 'static/feng/image/act_0.png'
        },
        {
          name: '城市寻宝',
          img: 'static/feng/image/act_1.png',
          des:
            '扫描屏幕二维码，获取藏宝图，跟随地图指引，发现埋藏在商场里的神秘宝藏吧。'
        },
        {
          name: '勇闯三关',
          img: 'static/feng/image/act_2.png',
          des: '摇头摆脑 冲顶智慧高峰 闯敢连连 获取福利不断'
        }
      ],
      address: [
        {
          id: 'f1_1',
          name: 'F1层136-138',
          ld:
            '快来F1层136-138寻找藏在屏幕里的宝物吧！然后就可以去F2层205探索新的宝藏了！'
        },
        {
          id: 'f1_2',
          name: 'F1层106',
          ld:
            '快来F1层106寻找藏在屏幕里的宝物吧！然后就可以去F1层136-138探索新的宝藏了！'
        },
        {
          id: 'f1_3',
          name: 'F1层156'
        },
        {
          id: 'f2_1',
          name: 'F2层205',
          ld:
            '快来F2层205寻找藏在屏幕里的宝物吧！然后就可以去F1层106探索新的宝藏了！'
        },
        {
          id: 'f2_2',
          name: 'F2层228'
        },
        {
          id: 'f3_1',
          name: 'F3层303'
        }
      ],
      currentAct: 0,
      liandongStatus: false,
      currentActAddress: '',
      ldWindow: false,
      currentLd: '',
      overHeight: 0
    }
  },
  computed: {
    displayTitle: function() {
      return this.act[this.currentAct].name
    },
    displayContext: function() {
      return this.act[this.currentAct].des
    }
  },
  mounted() {
    $('.feng-wrap').css('height', $(window).height())
    // this.overHeight = 0.2 * $(window).height()
    this.p.detailShowPosition = 0.2 * $(window).height()
    document.title = '地图导览'
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
        await this.initMap()
        await this.ctlOptInit()
        // this.handleMapStartAnimation()
        this.handleAddControlBtn()
        this.clickEventInit()
        this.addControlEventListener()
      } catch (e) {
        console.log(e)
      }
    },
    showLianDong() {},
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
    ldWindowClose() {
      this.ldWindow = false
    },
    ldWindowOpen() {
      this.ldWindow = true
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
          defaultControlsPose: -45,
          defaultVisibleGroups: [2],
          defaultFocusGroup: 2
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

      list.style.setProperty('height', '108px', 'important')
      // list.style.setProperty('margin-top', '83px')
      list.style.setProperty('padding-top', '13px')
      btn.style.setProperty('height', '65px', 'important')

      setTimeout(() => {
        list.style.transition = '0.1s ease-out'
      }, 100)

      btn.addEventListener('click', () => {
        this.handleAddControlBtn()
        this.controlStatus = !this.controlStatus
        if (this.controlStatus) {
          btn.style.borderTopRightRadius = '2px'
          btn.style.borderTopLeftRadius = '2px'

          list.style.setProperty('height', '108px', 'important')
          list.style.setProperty('padding-top', '13px')
          // list.style.setProperty('margin-top', '83px')
        } else {
          btn.style.borderTopRightRadius = '21px'
          btn.style.borderTopLeftRadius = '21px'

          list.style.setProperty('height', '0px', 'important')
          list.style.setProperty('padding-top', '0px')
          // list.style.setProperty('margin-top', '65px')
        }
      })
    },
    handleAddControlBtn() {
      let btn = document.getElementsByClassName('fm-control-groups-btn')[0]
      btn.style.borderBottomLeftRadius = '21px'
      btn.style.borderBottomRightRadius = '21px'

      let btn_div = document.createElement('div')
      btn_div.style = 'width: 100%; position: absolute; top: 21px; left: 0;'
      let btn_img = document.createElement('img')
      btn_img.src = 'static/feng/image/fm-control.png'
      btn_img.style = 'width: 100%; height: 100%'
      btn_div.appendChild(btn_img)
      btn.appendChild(btn_div)

      let btns = document.getElementsByClassName('fm-layer-btn-default')
      for (let i = 0; i < btns.length; i++) {
        if (btns[i].dataset.gid === '3' || btns[i].dataset.gid === '2') {
          let redPoint = document.createElement('span')
          redPoint.style.setProperty('background-color', '#FF424B')
          redPoint.style.setProperty('border-radius', '50%')
          redPoint.style.width = '6px'
          redPoint.style.height = '6px'
          redPoint.style.top = '8.5px'
          redPoint.style.left = '30px'
          redPoint.style.position = 'absolute'

          btns[i].style.position = 'relative'
          btns[i].appendChild(redPoint)
        }
      }
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
        this.ctlOpt = ctlOpt
        resolve()
      })
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
                e.name === 'new_f1_1' ||
                e.name === 'HB_F1_1'
              ) {
                this.currentAct = 1
                this.liandongStatus = true
                this.currentActAddress = this.address[0].name
                this.currentLd = this.address[0].ld
              } else if (
                e.name === 'f1_2' ||
                e.name === 'new_f1_2' ||
                e.name === 'HB_F1_2'
              ) {
                this.currentAct = 1
                this.liandongStatus = true
                this.currentActAddress = this.address[1].name
                this.currentLd = this.address[1].ld
              } else if (
                e.name === 'f1_3' ||
                e.name === 'new_f1_3' ||
                e.name === 'HB_F1_3'
              ) {
                this.currentAct = 0
                this.liandongStatus = false
                this.currentActAddress = this.address[2].name
                this.rpShow = true
              } else if (
                e.name === 'f2_1' ||
                e.name === 'new_f2_1' ||
                e.name === 'HB_F2_1'
              ) {
                this.liandongStatus = true
                this.currentAct = 1
                this.currentActAddress = this.address[3].name
                this.currentLd = this.address[3].ld
              } else if (
                e.name === 'f2_2' ||
                e.name === 'new_f2_2' ||
                e.name === 'HB_F2_2'
              ) {
                this.liandongStatus = false
                this.currentAct = 0
                this.currentActAddress = this.address[4].name
                this.rpShow = true
              } else if (e.name === 'f3_1' || e.name === 'new_f3_1') {
                this.liandongStatus = false
                this.currentAct = 2
                this.currentActAddress = this.address[5].name
              }

              if (
                e.name === 'f1_1' ||
                e.name === 'f1_2' ||
                e.name === 'f2_1' ||
                e.name === 'f1_3' ||
                e.name === 'f2_2' ||
                e.name === 'f3_1' ||
                e.name.slice(0, 3) === 'new' ||
                e.name.slice(0, 2) === 'HB'
              ) {
                this.handleDetailShow(e)
                if (
                  e.name.slice(0, 3) !== 'new' &&
                  e.name.slice(0, 2) !== 'HB'
                ) {
                  this.handleMarkerReset(e)
                }
              } else {
                this.rpShow = false
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
      for (let i = 0; i <= layer.markers.length - 1; i++) {
        console.dir(layer.markers[i])
        if (layer.markers[i].hasOwnProperty('name_')) {
          console.log(layer.markers[i].name_)
          if (layer.markers[i].name_.slice(0, 3) === 'new') {
            let newName = layer.markers[i].name_.slice(4)
            let newX = layer.markers[i].x
            let newY = layer.markers[i].y
            layer.removeMarker(layer.markers[i])
            let newMarker = new fengmap.FMImageMarker({
              name: newName,
              url: 'static/feng/image/machine-0.png',
              size: 64,
              x: newX,
              y: newY,
              // height: 10,
              z: 0,
              callback: () => {
                newMarker.alwaysShow()
              }
            })
            layer.addMarker(newMarker)
          }
        }
      }
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
        let HB_F1_1 = new fengmap.FMImageMarker({
          name: 'HB_F1_1',
          url: 'static/feng/image/qq.png',
          size: 35,
          x: 13528113.343703128,
          y: 3662316.2432128466,
          z: 10,
          callback: () => {
            HB_F1_1.alwaysShow()
            HB_F1_1.jump({
              times: 0,
              duration: 1,
              dalay: 0.5,
              height: 1
            })
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

        let HB_F1_2 = new fengmap.FMImageMarker({
          name: 'HB_F1_2',
          url: 'static/feng/image/qq.png',
          size: 35,
          x: 13528069.603071805,
          y: 3662363.214140243,
          z: 10,
          callback: () => {
            HB_F1_2.alwaysShow()
            HB_F1_2.jump({
              times: 0,
              duration: 1,
              dalay: 0.5,
              height: 1
            })
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

        let HB_F1_3 = new fengmap.FMImageMarker({
          name: 'HB_F1_3',
          url: 'static/feng/image/redpack.png',
          size: 35,
          x: 13528115.001994299,
          y: 3662355.7043745373,
          // height: 10,
          z: 10,
          callback: () => {
            HB_F1_3.alwaysShow()
            HB_F1_3.jump({
              times: 0,
              duration: 1,
              dalay: 0.5,
              height: 1
            })
          }
        })
        layer.addMarker(F1_1)
        layer.addMarker(F1_2)
        layer.addMarker(F1_3)
        layer.addMarker(HB_F1_1)
        layer.addMarker(HB_F1_2)
        layer.addMarker(HB_F1_3)

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

        let HB_F2_1 = new fengmap.FMImageMarker({
          name: 'HB_f2_1',
          url: 'static/feng/image/qq.png',
          size: 35,
          x: 13528121.494989906,
          y: 3662306.967850478,
          // height: 10,
          z: 10,
          callback: () => {
            HB_F2_1.alwaysShow()
            HB_F2_1.jump({
              times: 0,
              duration: 1,
              dalay: 0.5,
              height: 1
            })
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

        let HB_F2_2 = new fengmap.FMImageMarker({
          name: 'HB_F2_2',
          url: 'static/feng/image/redpack.png',
          size: 35,
          x: 13528057.774711452,
          y: 3662370.564898199,
          // height: 10,
          z: 10,
          callback: () => {
            HB_F2_2.alwaysShow()
            HB_F2_2.jump({
              times: 0,
              duration: 1,
              dalay: 0.5,
              height: 1
            })
          }
        })
        layer2.addMarker(F2_1)
        layer2.addMarker(F2_2)
        layer2.addMarker(HB_F2_1)
        layer2.addMarker(HB_F2_2)

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
      let groupBtn = document.getElementsByClassName('fm-control-groups-btn')[0]

      list.style.marginTop =
        this.p.list.marginTop - this.p.detailShowPosition + 'px'
      groupBtn.style.marginTop =
        this.p.groupBtn.marginTop - this.p.detailShowPosition + 'px'

      // this.detailShow = true
      this.$refs['detail'].style.setProperty('bottom', '-218px')

      this.detailInfo = e
    },
    resetDetail() {
      let list = document.getElementsByClassName('fm-layer-list')[0]
      let groupBtn = document.getElementsByClassName('fm-control-groups-btn')[0]

      list.style.marginTop = this.p.list.marginTop + 'px'
      groupBtn.style.marginTop = this.p.groupBtn.marginTop + 'px'

      this.$refs['detail'].style.setProperty('bottom', '-403px')

      // this.detailShow = false
    },
    handleRpClose() {
      this.rpShow = false
    },
    handleTouchStart(e) {
      if (
        e.target.classList[0] !== 'detail-button' &&
        e.target.classList[0] !== 'detail-arrow' &&
        e.target.classList[0] !== 'arrow-inner'
      ) {
        e.preventDefault()
      }
      this.touch.targetTouch.Y = e.targetTouches[0].clientY
    },
    handleTouchMove(e) {
      if (
        e.target.classList[0] !== 'detail-button' &&
        e.target.classList[0] !== 'detail-arrow' &&
        e.target.classList[0] !== 'arrow-inner'
      ) {
        e.preventDefault()
      }
      if (this.touch.targetTouch.Y - e.targetTouches[0].clientY > 100) {
        this.$refs['detail'].style.setProperty('bottom', '0')
        this.detailScrollToTop = true
      } else if (this.touch.targetTouch.Y - e.targetTouches[0].clientY < 100) {
        this.$refs['detail'].style.setProperty('bottom', '-218px')
        this.detailScrollToTop = false
      }
    },
    handleTouchEnd(e) {
      if (
        e.target.classList[0] !== 'detail-button' &&
        e.target.classList[0] !== 'detail-arrow' &&
        e.target.classList[0] !== 'arrow-inner'
      ) {
        e.preventDefault()
      }
    },
    handleArrow() {
      if (this.detailScrollToTop === true) {
        this.detailScrollToTop = false
        this.$refs['detail'].style.setProperty('bottom', '-218px')
      } else {
        this.detailScrollToTop = true
        this.$refs['detail'].style.setProperty('bottom', '0')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.feng-wrap {
  overflow: hidden;
  position: relative;
  -webkit-tap-highlight-color: none;
  .rp {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
  }
  .liandong-wrap {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 40% 0;
    .ld-context {
      width: 328px;
      height: 285px;
      border-radius: 4px;
      background-color: #ffffff;
      border: solid 1px #979797;
      .ld-title {
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.4px;
        padding: 10px;
        color: #d9bb90;
        text-align: center;
      }
      .ld-content {
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.3px;
        text-align: left;
        color: #bbbac0;
        padding: 8px;
      }
    }
    .ld-close {
      margin-top: 10%;
      width: 50px;
      height: 50px;
    }
  }
}
#mapContainer {
  height: 120%;
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
  bottom: -403px;
  height: 366px;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: solid 0.5px rgba(151, 151, 151, 0.43);
  display: flex;
  flex-direction: column;
  // padding: 10px;
  transition: 0.2s ease-in;
  .detail-button {
    width: 68px;
    height: 68px;
    position: absolute;
    top: -34px;
    right: 20px;
  }
  .detail-arrow {
    width: 100%;
    height: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .arrow-inner {
      height: 8px;
      width: 20px;
    }
  }
  .detail-title {
    padding: 3px 8px;
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
    padding: 0 8px;
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
    padding: 8px 8px;
  }
  .detail-into {
    height: 54px;
    padding: 0 8px;
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
    -webkit-line-clamp: 3;
    display: flex;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .detail-div {
    height: 10px;
    width: 100%;
    background-color: #eeeeee;
  }
  .detail-img {
    height: 200px;
    width: 100%;
    padding: 4px 3px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    .inner-img {
      width: 100%;
    }
  }
}
</style>

