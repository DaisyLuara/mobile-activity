const getters = {
  z: state => {
    return state.loginState.z
  },
  loginState: state => {
    return state.loginState
  },
  lastBarrageTime: state => {
    return state.lastBarrageTime
  },
  wexinUrl: state => {
    return state.weixinUrl
  }
}

export default getters
