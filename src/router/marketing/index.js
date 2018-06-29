// 拆分成按照日期排列的路由配置
import lagacyPages from './legacy/index'
import Date201806 from './sortByDate/2018-06'

let marketingRouter = []

marketingRouter = marketingRouter.concat(lagacyPages)
marketingRouter = marketingRouter.concat(Date201806)

export default marketingRouter
