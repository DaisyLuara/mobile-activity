# xingstation_activity

> develop static web page

## 约定配置

### 环境变量

/config 目录下面为各环境的通用变量配置

preprod 代表测试环境
dev 为本地
prod 为正式环境

### 图片

图片资源存储七牛，可以直接是用 process.env.CDN_URL 来作为链接的前缀

## 安装依赖

### 起步

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

可以观察打包之后体积情况

# run unit tests

yarn run unit

运行所有单元测试参考 https://vue-test-utils.vuejs.org/zh/

# run all tests
yarn test
```

### 新增依赖

新增的依赖如果在打包的时候需要用到(即不是开发依赖),使用 yarn add

如果是开发依赖，例如测试套件使用 yarn add --dev

线上打包使用 yarn --production 将不会带入 devDependencies 内容

## 路由配置

### 路由前处理

目前做了加入 meta 信息，打开某个页面的标题将会是 meta 中的 title，不需要另外设置

isAbandoned 代表废弃改页面，将不会打包

legacy 为以前的旧页面，新页面按照 sortByDate 文件夹排列

## 全局注入方法

### 预存变量

位于 services/utils/helper.js 挂载到 Vue 的原型上

可在任意单页内使用 this. 引用

例如 this.$innerWidth()

## Eslint

### 配置

.eslintrc.js 配置

extends 扩展了 vue 语法推荐的规则

yarn start webpack 跑起来之后如果有语法问题会提示(这个暂时去掉)

需要手动跑 yarn lint --fix 可以自动帮助修复一般的语法问题

## Babel

### 配置

.babelrc 配置 statge-0 可以使用 es6+ 的全部语法

后续可以改进的是按照实际需求引入 corejs 而不是在 main.js 引入 babel-polyfill

## Mixins

### 说明

可以把通用模式的方法直接存放在里面，在.vue 文件中可以直接使用 mixins[] 来引入混合

可以参考 mixins/normalPages.js 封装了获取照片和微信分享

### 约定

mixins 中调用组件的数据名称的约定

wxShareInfoValue - 微信分享 Object

mixins/normalPages.js 中 getPhotoByRouteQueryId 方法执行的是 this.photo = res.image

## Service 模块

### 约定

common 公共方法

merketing 营销页面

utils 纯的 js 工具方法

wechat 微信

### 使用

直接 import { methodName } from 'services'

services 已配置 alias

## Todo

### 整理旧方法、模块

需要去掉旧的方法和模块

### 静态资源走 cdn

static 文件下面只存不得不存的内容，其他都存放在 cdn

### 单元测试

抽出通用 components 来使用并且添加单元测试
