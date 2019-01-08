import * as types from './mutation-types'
const mutations = {
  [types.SET_LOGIN_STATE](state, v) {
    state.loginState = v
  },
  [types.SET_LAST_BARRAGE_TIME](state, v) {
    state.lastBarrageTime = v
  },

}

export default mutations