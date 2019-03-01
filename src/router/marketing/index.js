// 拆分成按照日期排列的路由配置
import lagacyPages from './legacy/index'
import Date201806 from './sortByDate/2018-06'
import Date201807 from './sortByDate/2018-07'
import Date201808 from './sortByDate/2018-08'
import Date201809 from './sortByDate/2018-09'
import Date201810 from './sortByDate/2018-10'
import Date201811 from './sortByDate/2018-11'
import Date201812 from './sortByDate/2018-12'
import Date201901 from './sortByDate/2019-01'
import Date201902 from './sortByDate/2019-02'
import Date201903 from './sortByDate/2019-03'
let marketingRouter = []

marketingRouter = marketingRouter.concat(lagacyPages)
marketingRouter = marketingRouter.concat(Date201806)
marketingRouter = marketingRouter.concat(Date201807)
marketingRouter = marketingRouter.concat(Date201808)
marketingRouter = marketingRouter.concat(Date201809)
marketingRouter = marketingRouter.concat(Date201810)
marketingRouter = marketingRouter.concat(Date201811)
marketingRouter = marketingRouter.concat(Date201812)
marketingRouter = marketingRouter.concat(Date201901)
marketingRouter = marketingRouter.concat(Date201902)
marketingRouter = marketingRouter.concat(Date201903)
export default marketingRouter
