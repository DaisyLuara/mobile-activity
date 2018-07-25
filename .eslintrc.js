// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaVersion: 2017
  },
  extends: 'airbnb-base',
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/base',
    'plugin:vue/strongly-recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
