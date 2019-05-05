<template>
  <div
    id="feng-root" 
    :style="style.root" 
    class="feng-wrap"
  >
    <div 
      id="mapContainer" 
      class="container"
    />
    <div 
      class="viewmode-group btn-group" 
      data-toggle="buttons"
    />
    <div 
      ref="detail"
      class="detail-wrap" 
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <img 
        v-if="liandongStatus === true" 
        :src="imgUrl + 'info.png'" 
        class="detail-button" 
        @click="ldWindowOpen()"
      >
      <div 
        class="detail-arrow" 
        @click="handleArrow"
      >
        <img 
          v-show="detailScrollToTop === false" 
          :src="imgUrl + 'arrow-up.png'" 
          class="arrow-inner"
        >
        <img 
          v-show="detailScrollToTop === true" 
          :src="imgUrl + 'arrow-down.png'" 
          class="arrow-inner"
        >
      </div>
      <div class="detail-title">
        <span class="title-text">{{ displayTitle }}</span>
        <img 
          v-if="currentAct === 0" 
          :src="imgUrl + 'redpack-list.png'" 
          class="title-img"
        >
        <img 
          v-if="currentAct === 1" 
          :src="imgUrl + 'air-list.png'" 
          class="title-img"
        >
      </div>
      <div class="detail-next">
        <span class="next-inner">
          下一个游戏: 你为什么没有
        </span>
      </div>
      <div class="detail-address">
        地址：{{ currentActAddress }}
      </div>
      <div class="detail-into">
        {{ displayContext }}
      </div>
      <div class="detail-div" />
      <div class="detail-img"> 
        <img 
          :src="act[currentAct].img" 
          class="inner-img"
        >
      </div>
    </div>
    <img 
      :src="imgUrl + 'list-button.png'" 
      class="list-change" 
      @click="handleNaviToMini"
    >
    <div 
      v-if="rpShow === true" 
      class="rp" 
      @click="handleRpClose"
    >
      <RedPackRain />
    </div>
    <div 
      v-if="ldWindow === true" 
      class="liandong-wrap"
    >
      <div class="ld-context">
        <div class="ld-title">
          联动说明
        </div>
        <div class="ld-content">
          恭喜找到
          <span class="floor-name">
            {{ currentFloorName }}
          </span>
          的宝物吧！然后就可以去
          <span class="floor-name">
            {{ nextFloorName }}
          </span>
          发现新的宝藏了！
        </div>
      </div>
      <img 
        :src="imgUrl + 'close.png'" 
        class="ld-close" 
        @click="ldWindowClose"
      >
    </div>
  </div>
</template>


<script>
import RedPackRain from './components/redPack'
import './add.css'
const cdnUrl = process.env.CDN_URL
export default {
  components: {
    RedPackRain
  },
  data() {
    return {
      imgUrl: cdnUrl + '/fe/img/wxmini/',
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
      bindInnerImg: cdnUrl + '/fe/img/wxmini' + '/pro.png',
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
          img: cdnUrl + '/fe/img/wxmini/' + 'act_0.png'
        },
        {
          name: '城市寻宝',
          img: cdnUrl + '/fe/img/wxmini/' + 'act_1.png',
          des:
            '扫描屏幕二维码，获取藏宝图，跟随地图指引，发现埋藏在商场里的神秘宝藏吧。'
        },
        {
          name: '勇闯三关',
          img: cdnUrl + '/fe/img/wxmini/' + 'act_2.png',
          des: '摇头摆脑 冲顶智慧高峰 闯敢连连 获取福利不断'
        }
      ],
      address: [
        {
          id: 'f1_1',
          name: 'F1层136-138',
          nextActIndex: 1
        },
        {
          id: 'f1_2',
          name: 'F1层106',
          nextActIndex: 3
        },
        {
          id: 'f1_3',
          name: 'F1层156'
        },
        {
          id: 'f2_1',
          name: 'F2层205',
          nextActIndex: 0
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
      currentMarker: 0,
      liandongStatus: false,
      currentActAddress: '',
      ldWindow: false,
      overHeight: 0,
      style: {
        root: {
          height: window.innerHeight + 'px'
        }
      }
    }
  },
  computed: {
    displayTitle: function() {
      return this.act[this.currentAct].name
    },
    displayContext: function() {
      return this.act[this.currentAct].des
    },
    currentFloorName: function() {
      return this.address[this.currentMarker].name
    },
    nextFloorName: function() {
      if (this.address[this.currentMarker].hasOwnProperty('nextActIndex')) {
        return this.address[this.address[this.currentMarker].nextActIndex].name
      }
      return ''
    }
  },
  mounted() {
    this.p.detailShowPosition = 0.2 * this.$innerHeight() + 'px'
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
        await this.handleMapJsReady()
        await this.getWxJSSDKReady()
        await this.initMap()
        await this.ctlOptInit()
        this.handleAddControlBtn()
        this.clickEventInit()
        this.addControlEventListener()
      } catch (e) {
        console.log(e)
      }
    },
    handleMapJsReady() {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.src = '/static/feng/fengmap.min.js'
        script.async = false
        document.head.appendChild(script)
        let layer = document.createElement('script')
        layer.async = false
        layer.src = '/static/feng/layerGroup.js'
        document.head.appendChild(layer)
        script.onload = () => {
          layer.onload = () => {
            resolve()
          }
        }
      })
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
          mapThemeURL: '/static/feng/theme',
          defaultThemeName: 3010,
          appName: 'xingstation_mini',
          key: '528b65fa54ac6b1b207691a4abeadfb2',
          mapServerURL: '/static/feng/data/11839',
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
      list.style.setProperty('padding-top', '13px')
      btn.style.setProperty('height', '65px', 'important')

      setTimeout(() => {
        list.style.setProperty('transition', '0.1s', 'ease-out')
      }, 100)

      btn.addEventListener('click', () => {
        this.handleAddControlBtn()
        this.controlStatus = !this.controlStatus
        if (this.controlStatus) {
          btn.style.setProperty('borderTopRightRadius', '2px')
          btn.style.setProperty('borderTopLeftRadius', '2px')

          list.style.setProperty('height', '108px', 'important')
          list.style.setProperty('padding-top', '13px')
        } else {
          btn.style.setProperty('borderTopRightRadius', '21px')
          btn.style.setProperty('borderTopLeftRadius', '21px')

          list.style.setProperty('height', '0px', 'important')
          list.style.setProperty('padding-top', '0px')
        }
      })
    },
    handleAddControlBtn() {
      let btn = document.getElementsByClassName('fm-control-groups-btn')[0]
      btn.style.setProperty('borderBottomLeftRadius', '21px')
      btn.style.setProperty('borderBottomRightRadius', '21px')

      let btn_div = document.createElement('div')
      btn_div.style.setProperty('width', '100%')
      btn_div.style.setProperty('position', 'absolute')
      btn_div.style.setProperty('top', '21px')
      btn_div.style.setProperty('left', '0')

      let btn_img = document.createElement('img')
      btn_img.setAttribute('src', this.imgUrl + '/fm-control.png')
      btn_img.style.setProperty('width', '100%')
      btn_img.style.setProperty('height', '100%')
      btn_div.appendChild(btn_img)
      btn.appendChild(btn_div)

      let btns = document.getElementsByClassName('fm-layer-btn-default')
      for (let i = 0; i < btns.length; i++) {
        if (btns[i].dataset.gid === '3' || btns[i].dataset.gid === '2') {
          let redPoint = document.createElement('span')
          redPoint.style.setProperty('background-color', '#FF424B')
          redPoint.style.setProperty('border-radius', '50%')
          redPoint.style.setProperty('width', '6px')
          redPoint.style.setProperty('height', '6px')
          redPoint.style.setProperty('top', '8.5px')
          redPoint.style.setProperty('left', '30px')
          redPoint.style.setProperty('position', 'absolute')

          btns[i].style.setProperty('position', 'relative')
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
                this.currentMarker = 0
                this.liandongStatus = true
                this.currentActAddress = this.address[0].name
              } else if (
                e.name === 'f1_2' ||
                e.name === 'new_f1_2' ||
                e.name === 'HB_F1_2'
              ) {
                this.currentAct = 1
                this.currentMarker = 1
                this.liandongStatus = true
                this.currentActAddress = this.address[1].name
              } else if (
                e.name === 'f1_3' ||
                e.name === 'new_f1_3' ||
                e.name === 'HB_F1_3'
              ) {
                this.currentAct = 0
                this.currentMarker = 2
                this.liandongStatus = false
                this.currentActAddress = this.address[2].name
                this.rpShow = true
              } else if (
                e.name === 'f2_1' ||
                e.name === 'new_f2_1' ||
                e.name === 'HB_F2_1'
              ) {
                this.liandongStatus = true
                this.currentMarker = 3
                this.currentAct = 1
                this.currentActAddress = this.address[3].name
              } else if (
                e.name === 'f2_2' ||
                e.name === 'new_f2_2' ||
                e.name === 'HB_F2_2'
              ) {
                this.liandongStatus = false
                this.currentMarker = 4
                this.currentAct = 0
                this.currentActAddress = this.address[4].name
                this.rpShow = true
              } else if (e.name === 'f3_1' || e.name === 'new_f3_1') {
                this.liandongStatus = false
                this.currentAct = 2
                this.currentMarker = 5
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
              url: this.imgUrl + 'machine-0.png',
              size: 64,
              x: newX,
              y: newY,
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
        url: this.imgUrl + 'machine-1.png',
        size: 64,
        x: e.x,
        y: e.y,
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
          url: this.imgUrl + 'machine-0.png',
          size: 64,
          x: 13528113.343703128,
          y: 3662316.2432128466,
          z: 0,
          callback: () => {
            F1_1.alwaysShow()
          }
        })
        let HB_F1_1 = new fengmap.FMImageMarker({
          name: 'HB_F1_1',
          url: this.imgUrl + 'qq.png',
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
          url: this.imgUrl + 'machine-0.png',
          size: 64,
          x: 13528069.603071805,
          y: 3662363.214140243,
          z: 0,
          callback: () => {
            F1_2.alwaysShow()
          }
        })

        let HB_F1_2 = new fengmap.FMImageMarker({
          name: 'HB_F1_2',
          url: this.imgUrl + 'qq.png',
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
          url: this.imgUrl + '/machine-0.png',
          size: 64,
          x: 13528115.001994299,
          y: 3662355.7043745373,
          z: 0,
          callback: () => {
            F1_3.alwaysShow()
          }
        })

        let HB_F1_3 = new fengmap.FMImageMarker({
          name: 'HB_F1_3',
          url: this.imgUrl + 'redpack.png',
          size: 35,
          x: 13528115.001994299,
          y: 3662355.7043745373,
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
          url: this.imgUrl + 'machine-0.png',
          size: 64,
          x: 13528121.494989906,
          y: 3662306.967850478,
          z: 0,
          callback: () => {
            F2_1.alwaysShow()
          }
        })

        let HB_F2_1 = new fengmap.FMImageMarker({
          name: 'HB_f2_1',
          url: this.imgUrl + 'qq.png',
          size: 35,
          x: 13528121.494989906,
          y: 3662306.967850478,
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
          url: this.imgUrl + 'machine-0.png',
          size: 64,
          x: 13528057.774711452,
          y: 3662370.564898199,
          z: 0,
          callback: () => {
            F2_2.alwaysShow()
          }
        })

        let HB_F2_2 = new fengmap.FMImageMarker({
          name: 'HB_F2_2',
          url: this.imgUrl + 'redpack.png',
          size: 35,
          x: 13528057.774711452,
          y: 3662370.564898199,
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
          url: this.imgUrl + 'machine-0.png',
          size: 64,
          x: 13528141.977265798,
          y: 3662355.9839765457,
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

      list.style.setProperty(
        'marginTop',
        this.p.list.marginTop - this.p.detailShowPosition + 'px'
      )
      groupBtn.style.setProperty(
        'marginTop',
        this.p.groupBtn.marginTop - this.p.detailShowPosition + 'px'
      )

      this.$refs['detail'].style.setProperty('bottom', '-218px')
      this.detailInfo = e
    },
    resetDetail() {
      let list = document.getElementsByClassName('fm-layer-list')[0]
      let groupBtn = document.getElementsByClassName('fm-control-groups-btn')[0]

      list.style.setProperty('marginTop', this.p.list.marginTop + 'px')
      groupBtn.style.setProperty('marginTop', this.p.groupBtn.marginTop + 'px')
      this.$refs['detail'].style.setProperty('bottom', '-403px')
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
      .floor-name {
        color: #e7565c;
      }
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
  width: 56px;
  height: 56px;
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
    border-top: 0.5px #d4d5de solid;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.8px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
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

