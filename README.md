# xingstation_activity

> develop static web page

## 注意事项

不要再使用 jQuery
https://github.com/nefe/You-Dont-Need-jQuery
https://github.com/nefe/You-Dont-Need-jQuery/blob/master/README.zh-CN.md

后续逐步移除 jQuery

## 注意事项 2018-5-28

去掉 assets/css/marketing.css 里面对图片 width: 100% 的定义，因为有可能你需要 height: 100%, 此时无法把 width 属性删去……

## Todo 2018-6-27

### 去除 Jquery

### polyfills 按需加载

### 整理旧方法、模块

### 静态资源走 cdn

~~ Router 模式化 Done ~~

## Build Setup

```bash
# install dependencies
不使用 npm install
只使用 yarn install
yarn 使用方法参考 https://yarnpkg.com/zh-Hans/

# serve with hot reload at localhost:8080
yarn start

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run all tests
yarn test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
