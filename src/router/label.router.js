const Router = require('koa-router')
const {
    create,
    list
} = require('../controller/label.controller')
const {
    verifyAuth
} = require('../middleware/auto.middleware')
const labelRouter = new Router({prefix:'/label'})
labelRouter.post('/',verifyAuth,create)
// 展示标签的接口
labelRouter.get('/',list)
module.exports = labelRouter