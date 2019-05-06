<template>
  <div class="photo-merge">
    <div class="photo-area">
      <img
        v-if="mergedUrl"
        :src="mergedUrl"
        class="photo-merged"
      >
      <canvas
        id="canvas"
        style="display: none"
      />
    </div>
    <img
      :src="`${CDNURL}/dimond520/upload_success.png`"
      class="success-img"
    >
    <div class="love-rule">
      <div class="point-list">
        <div
          v-for="(item, index) in pointList"
          :key="index"
          class="area-item"
        >
          <div class="point-area-wrap">
            <div class="point-area">
              {{ item.area }}
            </div>
          </div>
          <div
            v-for="(point, pindex) in item.points"
            :key="pindex"
            class="point-item"
          >
            <div class="point-name">
              {{ point.name }}
            </div>
            <div class="point-location">
              {{ point.location }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MC from 'mcanvas'
import { Toast } from 'mand-mobile'
import "../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      CDNURL: CDNURL,
      mergedUrl: '',
      base64Data: null,
      imgList: ['mphoto_text_back.png', 'mphoto_frame.png'],
      baseUrl: CDNURL + '/dimond520/',
      fullWidth: 254,
      fullHeight: 530,
      photoWidth: 198,
      photoHeight: 353,
      pointList: [
        {
          area: '长宁',
          points: [
            {
              name: '长宁来福士',
              location: '长宁路1123号'
            },
            {
              name: '金石盟门店（中山公园龙之梦店）',
              location: '长宁区长宁路1018号龙之梦购物广场1楼1022号'
            }
          ]
        },
        {
          area: '杨浦',
          points: [
            {
              name: '控江旭辉',
              location: '控江路2028号'
            }
          ]
        },
        {
          area: '徐汇',
          points: [
            {
              name: '上海优幕星天地影城',
              location: '上海市徐汇区上中西路280号4楼403室'
            },
            {
              name: '巨影国际影城',
              location: '上海市徐汇区吴中路52号7楼'
            },
            {
              name: '太禾松江店',
              location: '上海市松江区九峰路118号平高广场四层'
            },
            {
              name: '佰伽乐大光明新南店',
              location: '上海市松江区新南路1号绿地金御广场4楼'
            },
            {
              name: 'DFC影院',
              location: '上海市松江区新松江路1277号4楼'
            },
            {
              name: '松江左岸影城',
              location: '松江区松汇中路568号鹿都国际购物广场F4'
            },
            {
              name: '松江五龙商业广场',
              location: '上海市松江区光星路1399号'
            },
            {
              name: 'DFC影院',
              location: '上海市松江区光星路1399号3楼'
            },
            {
              name: '金石盟门店（松江旗舰店）',
              location: '松江区中山中路193~197号'
            }
          ]
        },
        {
          area: '青浦',
          points: [
            {
              name: '上影青浦影城',
              location: '上海市青浦区公园东路1289弄富绅商业中心西4栋2楼'
            },
            {
              name: '青浦永乐1店',
              location: '上海市青浦区青松路37号'
            },
            {
              name: '青浦永乐2店',
              location: '上海市青浦区青湖东路900号3楼'
            },
            {
              name: '金石盟门店（青浦吾悦店）',
              location: '青浦区淀山湖大道218号1号门1F-006-1'
            },
            {
              name: '金石盟门店（青浦青安路店）',
              location: '青浦区青安路19-23号'
            }
          ]
        },
        {
          area: '普陀',
          points: [
            {
              name: '德信影城巴黎春天店',
              location: '上海市普陀区金沙江路1685号5楼'
            },
            {
              name: '上海星逸国际影城',
              location: '上海市普陀区武威路1118号（白丽广场4楼）'
            }
          ]
        },
        {
          area: '浦东新区',
          points: [
            {
              name: '红石影院',
              location: '浦东新区惠南镇东门大街200号浦商百货4楼'
            },
            {
              name: '翰金影城',
              location: '上海市浦东新区浦建路15号1层-b区'
            },
            {
              name: '金石盟门店（惠南店）',
              location: '浦东新区惠南镇东门大街291号'
            }
          ]
        },
        {
          area: '闵行',
          points: [
            {
              name: '上影国际影城东川店',
              location: '上海市闵行区东川路2088号3层-31商铺'
            },
            {
              name: '华彩弘歌鑫都影城',
              location: '上海市闵行区鑫都路2538弄1号楼3层'
            },
            {
              name: '7+影城',
              location: '上海市闵行区繁兴路399弄1号华漕生活馆3楼 影院正门'
            },
            {
              name: '太禾浦江店',
              location: '上海市闵行区陈行公路2688号OMALL华侨城商业中心F4'
            },
            {
              name: '太禾江园店',
              location: '上海市闵行区浦锦路309弄6号B1层06-B'
            },
            {
              name: '颛桥万达',
              location: '颛兴东路1559号'
            },
            {
              name: '七宝万科',
              location: '闵行区漕宝路3366号L七宝万科广场'
            },
            {
              name: 'CGV影城',
              location: '闵行区漕宝路3366号L七宝万科广场5层'
            },
            {
              name: '金石盟门店（涟泉大江户店）',
              location: '闵行区莘福路288号2#濂泉大江户'
            },
            {
              name: '金石盟门店（七宝万科店）',
              location: '闵行区漕宝路3366号L七宝万科广场1层L148号'
            }
          ]
        },
        {
          area: '嘉定',
          points: [
            {
              name: '中影嘉定影城',
              location: '上海市嘉定区胜竹路2050号三楼'
            },
            {
              name: '嘉定大地影院',
              location: '嘉定区清河路罗宾森广场四楼'
            },
            {
              name: '金石盟门店（嘉定店）',
              location: '嘉定区清河路100弄1号'
            }
          ]
        },
        {
          area: '黄浦',
          points: [
            {
              name: '凯德晶萃',
              location: '徐家汇路268号'
            },
            {
              name: '兜约',
              location: '马当路388号复兴Soho一层D108'
            }
          ]
        },
        {
          area: '虹口',
          points: [
            {
              name: '虹口龙之梦',
              location: '西江湾路388号'
            }
          ]
        },
        {
          area: '崇明',
          points: [
            {
              name: '崇明环球国际影城',
              location: '崇明区堡镇中路193号'
            },
            {
              name: '金石盟门店（崇明堡镇店）',
              location: '崇明区堡镇中路79号'
            },
            {
              name: '金石盟门店（崇明南门店）',
              location: '崇明区城桥镇八一路199号'
            }
          ]
        },
        {
          area: '宝山',
          points: [
            {
              name: 'SFC影城-淞南店',
              location: '宝山区长江西路380号1楼 影院票台左右两侧'
            },
            {
              name: '	宝山U天地',
              location: '美健路829号'
            }
          ]
        }
      ]
    }
  },
  async mounted() {
    Toast.loading('照片加载中')
    let r = await this.loadImage()
    let photoSize = await this.loadPhoto()
    this.drawing(photoSize)
  },
  methods: {
    loadPhoto() {
      const photo = this.image
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          })
        }
        img.src = photo
      })
    },
    loadImage() {
      let preList = []
      for (let i = 0; i < this.imgList.length; i++) {
        let pre = new Promise((resolve, reject) => {
          let img = new Image()
          img.onload = () => {
            resolve(img)
          }
          img.src = this.baseUrl + this.imgList[i]
        })
        preList.push(pre)
      }
      return Promise.all(preList)
    },
    // ResolutionX, ResolutionY为图片实际分辨率
    drawing({ width: ResolutionX, height: ResolutionY }) {
      const that = this
      const width = this.fullWidth * 4
      const height = this.fullHeight * 4
      const photoWidth = this.photoWidth * 4
      const photoHeight = this.photoHeight * 4
      const scaleHeight = 353 / 198 * ResolutionX
      const cropHeight = scaleHeight > ResolutionY ? '100%' : (Math.round(scaleHeight / ResolutionY * 100) + '%') // 图片裁剪高度
      let backgroundColor = 'transparent'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let photo = this.image
      mc
        .background(this.baseUrl + 'mphoto_frame.png', {
          left: 0,
          top: 0,
          type: 'origin',
          width: width
        })
        .add(photo, {
          width: photoWidth,
          crop:{
            x:0,
            y:0,
            width: '100%',
            height: cropHeight
          },
          pos: {
            x: 27.5 * 4,
            y: 117 * 4
          }
        })
        .add(this.baseUrl + 'mphoto_text_back.png', {
          width: 236 * 4,
          height: 128 * 4,
          pos: {
            x: 9 * 4,
            y: 377 * 4
          }
        })
        .draw({
          // 导出图片格式： png/jpg/jpeg/webp;
          // default : png;
          type: 'png',
          //  图片质量，对 png 格式无效； 0~1；
          // default: .9;
          // 成功回调；
          success(b64) {
            that.base64Data = b64
            that.drawingText()
          },
          // 错误回调；
          error(err) {
            console.log(err)
            Toast.failed('照片加载失败')
          }
        })
    },
    // 文字合成
    drawingText() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let image = new Image()
      let name = this.name
      let msg = this.msg
      let msgLine1 = msg.slice(0, 7)
      let msgLine2 = msg.slice(7)
      image.src = this.base64Data
      image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let x = 105 * 4
        let y = 98 * 4
        // 绘制名字
        ctx.font = '400 74px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillStyle = '#fff'
        ctx.fillText('', x, y)
        ctx.save()
        ctx.translate(x, y)
        ctx.fillText(name, 0, 0)
        ctx.restore()
        // 绘制告白信息
        ctx.font = 'oblique normal bold 84px sans-serif'
        ctx.fillStyle = '#fff'
        ctx.translate(190, 1820)
        ctx.rotate(-(15 * Math.PI/180))
        ctx.fillText(msgLine1, 0, 0)
        ctx.restore()
        ctx.translate(-50, 120)
        ctx.fillText(msgLine2, 0, 0)
        ctx.restore()
        let url = canvas.toDataURL('image/png')
        this.mergedUrl = url
        Toast.hide()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/cdnUrl.less";

img {
  display: block;
}

.photo-merge {
  position: relative;
  .photo-area {
    height: 536px;
    padding: 2px 0 4px;
    box-sizing: border-box;
    .photo-merged {
      display: block;
      width: 254px;
      height: 530px;
      margin: 0 auto;
    }
    #canvas {
      width: 254px;
      height: 530px;
    }
  }
  .success-img {
    width: 2.96rem;
    height: 0.61rem;
    margin: 0 auto 0.3rem;
  }
  .love-rule {
    position: relative;
    width: 3.28rem;
    height: 5.04rem;
    background-image: url("@{cdnUrl}/dimond520/love_rule_2.png");
    background-size: 100% 100%;
    margin: 0 auto 0.2rem;
    .point-list {
      position: absolute;
      width: 2.64rem;
      height: 3.25rem;
      top: 1.4rem;
      left: 0.32rem;
      background: #FFF;
      color: #000;
      overflow-y: scroll;
      padding: 0.07rem 0.22rem 0.07rem 0.07rem;
      box-sizing: border-box;
      .area-item {
        border-bottom: 1px dashed #000;
        margin-bottom: 0.15rem;
        .point-area-wrap {
          overflow: hidden;
          .point-area {
            float: left;
            padding: 0 0.07rem;
            line-height: 0.26rem;
            font-size: 0.15rem;
            border: 1px solid #010101;
            margin-bottom: 0.1rem;
          }
        }
        .point-item {
          margin-bottom: 0.18rem;
          font-size: 0.1rem;
          color: #010101;
          .point-name {
            margin-bottom: 0.06rem;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>