import Vue from 'vue'
Vue.prototype.innerHeight = () => {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  )
}

Vue.prototype.innerWidth = () => {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  )
}

//  全局帮助方法 可以直接  this. 引用
