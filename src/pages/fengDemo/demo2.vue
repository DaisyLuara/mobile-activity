<template>
  <div class="feng-wrap">
    <div id="mapContainer" class="container"></div>
    <div class="viewmode-group btn-group" data-toggle="buttons">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fMap: null,
      fMapId: '11839',
      ctlOpt: null
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
        // await this.addImageMarker()
        this.clickEventInit()
      } catch (e) {
        console.log(e)
      }
    },
    initMap() {
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
    clickEventInit() {
      this.fMap.on('mapClickNode', e => {
        console.log(e)
        if (e.nodeType === fengmap.FMNodeType.IMAGE_MARKER) {
          let group = this.fMap.getFMGroup(this.fMap.groupIDs[1])
          let layer = group.getOrCreateLayer('imageMarker')
          let addMarker = new fengmap.FMImageMarker({
            url: 'static/feng/image/redpack.png',
            size: 64,
            x: 13528128.411865031,
            y: 3662307.8463413287,
            z: 0,
            callback: () => {
              console.log('callback')
              addMarker.alwaysShow()
              addMarker.jump({
                times: 0,
                duration: 1,
                dalay: 0.5,
                height: 1
              })
            }
          })

          // addMarker.x = 13528128.411865031
          // addMarker.y = 3662307.8463413287
          // addMarker.z = 0
          layer.addMarker(addMarker)
          // console.dir(addMarker.jump)
        }
      })
    },
    addImageMarker() {
      return new Promise((resolve, reject) => {
        let group = this.fMap.getFMGroup(this.fMap.groupIDs[1])
        let layer = group.getOrCreateLayer('imageMarker')
        let F1_1 = new fengmap.FMImageMarker({
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
          url: 'static/feng/image/machine-0.png',
          size: 128,
          x: 13528069.603071805,
          y: 3662363.214140243,
          z: 0,
          callback: () => {
            F1_2.alwaysShow()
            F1_2.jump({
              times: 0,
              duration: 1,
              delay: 0.5,
              height: 10
            })
          }
        })
        let F1_3 = new fengmap.FMImageMarker({
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
        // F1_2.jump({
        //   times: 0,
        //   duration: 1,
        //   delay: 0.5,
        //   height: 10
        // })
        resolve()
      })
    },
    handleMarkerClick() {}
  }
}
</script>

<style lang="less" scoped>
#mapContainer {
  height: 100%;
}
</style>
