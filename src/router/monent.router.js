const Router = require('koa-router')

const {verifyAuth} = require('../middleware/auto.middleware')
const {
    create,
    detail,
    list
} = require('../controller/monent.controller')

const monentRouter = new Router({prefix:'/monent'})
monentRouter.post('/',verifyAuth,create) 
// 查询单条
monentRouter.get('/:monentId',detail)
// 查询多条
monentRouter.get('/',list)

module.exports = monentRouter