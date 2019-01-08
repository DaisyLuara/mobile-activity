const getters = {
  z: state => {
    return state.loginState.z
  },
  loginState: state => {
    return state.loginState
  },
  lastBarrageTime: state => {
    return state.lastBarrageTime
  }
}

export default getters 