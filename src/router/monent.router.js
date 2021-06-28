const Router = require('koa-router')

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auto.middleware')
const {
    verifyLabelExist
} = require('../middleware/label.middleware')
const {
    create,
    detail,
    list,
    update,
    remove,
    addLabels
   
} = require('../controller/monent.controller')

const monentRouter = new Router({prefix:'/monent'})
monentRouter.post('/',verifyAuth,create) 
// 查询单条
monentRouter.get('/:monentId',detail)
// 查询多条
monentRouter.get('/',list)
// 修改内容
// 用户必须登录，验证权限
monentRouter.patch('/:monentId',verifyAuth,verifyPermission,update)
// 删除内容
monentRouter.delete('/:monentId',verifyAuth,verifyPermission,remove)
// 给动态添加标签
monentRouter.post('/:monentId/labels',verifyAuth,verifyPermission,verifyLabelExist,addLabels)

module.exports = monentRouter