import * as types from './mutation-types'
const mutations = {
  [types.SET_LOGIN_STATE](state, v) {
    state.loginState = v
  },

}

export default mutations