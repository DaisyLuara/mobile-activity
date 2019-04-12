const devState = {
  loginState: {
    // z: '4al80b01d4c528dcd5eb9e094faf86f92cc25g',
    z: '',
    // z: '8b96bc7fba4c1176b3fc0861e94f22465c0f6a',
    gender: '1',
    username: 'Wending',
    face:
      'http://thirdwx.qlogo.cn/mmopen/vi_32/kPmo3eFGlBOPalDZHOpAicFPfQaicU7icJnypiaUxUcFEOE2kdddNsFXPkmiaeBo6LCRau0ibZK72fUtDpo9dSZccXTA/132'
  },
  lastBarrageTime: null,
  weixinUrl: ''
}
const productionState = {
  loginState: {
    z: ''
  },
  lastBarrageTime: null,
  weixinUrl: ''
}

let state = process.env.NODE_ENV === 'development' ? devState : productionState

export default state
