// 拆分成按照日期排列的路由配置
import lagacyPages from './legacy/index'
import Date201806 from './sortByDate/2018-06'
import Date201807 from './sortByDate/2018-07'

let marketingRouter = []

marketingRouter = marketingRouter.concat(lagacyPages)
marketingRouter = marketingRouter.concat(Date201806)
marketingRouter = marketingRouter.concat(Date201807)

export default marketingRouter
