<template>
  <div class="article">
    <ArticleSwiper 
      :expend="expend" 
      @onExpend="handleExpend"/>

    <div class="function">
      <!-- author -->
      <ArticleAuthor 
      />

      <!-- question -->
      <ArticleQuestion 
        @onExpend="handleExpend"/>

      <!-- choose -->
      <ArticleChoose 
        :choose="choose" 
        :expend="expend" 
        @onChoose="handleChoose" 
      />

      <!-- comment -->
      <ArticleCommentBoard 
        :choose="choose" 
        :expend="expend"/>
    </div>
  </div>
</template>

<script>
import ArticleAuthor from './ArticleAuthor'
import ArticleSwiper from './ArticleSwiper'
import ArticleQuestion from './ArticleQuestion'
import ArticleChoose from './ArticleChoose'
import ArticleCommentBoard from './ArticleCommentBoard'
export default {
  components: {
    ArticleAuthor,
    ArticleSwiper,
    ArticleChoose,
    ArticleQuestion,
    ArticleCommentBoard
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      choose: '',
      expend: false
    }
  },
  methods: {
    handleGoComment() {
      this.$router.push({
        path: 'comment'
      })
    },
    handleChoose(payload) {
      this.choose = payload
    },
    handleExpend() {
      this.expend = true
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  display: flex;
  flex-direction: column;
  z-index: 10;
  .function {
    z-index: 30;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 10px;
    border-bottom-left-radius: 0.18rem;
    border-bottom-right-radius: 0.18rem;
  }
}
</style>
