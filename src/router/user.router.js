
const Router = require('koa-router')

const {
    create
} = require('../controller/user.controller')
const {
    verifyUser
} = require('../middleware/user.middleware')
const userRouter = new Router({prefix:'/users'})

// 注册接口
// userRouter.post('/',create)
userRouter.post('/',verifyUser,create)
module.exports = userRouter