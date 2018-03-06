// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaVersion: 2017,
  },
  // env: {
  //   browser: true,
  // },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: ['html'],
  extends: [
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/base',
    'plugin:vue/strongly-recommended',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    //   'import/extensions': [
    //     'error',
    //     'always',
    //     {
    //       js: 'never',
    //       vue: 'never',
    //     },
    //   ],
    //   // allow optionalDependencies
    //   'import/no-extraneous-dependencies': [
    //     'error',
    //     {
    //       optionalDependencies: ['test/unit/index.js'],
    //     },
    //   ],
    //   // allow debugger during development
    //   'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
}
