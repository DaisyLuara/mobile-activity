<template>
  <div class="r-root">
    <ul class="couten">
      <!--<li>
				<a href="#"><img src="static/feng/image/redpack-list.png"></a>
			</li>-->
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'
const cdnUrl = process.env.CDN_URL
export default {
  data() {
    return {
      num: 0,
      win: null
    }
  },
  mounted() {
    // let elRoot = document.getElementById()
    $('.r-root').css('height', $(window).height())
    $('.couten').css('height', $(window).height())
    this.win = parseInt($('.couten').css('width')) - 60
    this.startAnimation()
  },
  methods: {
    startAnimation() {
      this.add()
    },
    add() {
      let hb = parseInt(Math.random() * (3 - 1) + 1)
      let Wh = parseInt(Math.random() * (70 - 30) + 20)
      let Left = parseInt(Math.random() * (this.win - 0) + 0)
      let rot = parseInt(Math.random() * (45 - -45) - 45) + 'deg'
      this.num++
      $('.couten').append(
        "<li style='position:absolute' class='li" +
          this.num +
          "'><a href='javascript:;'><img src='http://cdn.xingstation.cn/fe/img/wxmini/hb.png'></a></li>"
      )
      $('.li' + this.num).css({
        left: Left
      })
      $('.li' + this.num + ' a img').css({
        width: Wh,
        transform: 'rotate(' + rot + ')',
        '-webkit-transform': 'rotate(' + rot + ')',
        '-ms-transform': 'rotate(' + rot + ')' /* Internet Explorer */,
        '-moz-transform': 'rotate(' + rot + ')' /* Firefox */,
        '-webkit-transform': 'rotate(' + rot + ')' /* Safari 和 Chrome */,
        '-o-transform': 'rotate(' + rot + ')' /* Opera */
      })
      $('.li' + this.num).animate(
        { top: $(window).height() + 20 },
        4000,
        function() {
          //删掉已经显示的红包
          this.remove()
        }
      )
      if (this.num <= 30) {
        setTimeout(() => {
          this.add()
        }, 300)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.r-root {
  .couten {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: hidden;
    position: relative;
    background: transparent;
  }
}
</style>


