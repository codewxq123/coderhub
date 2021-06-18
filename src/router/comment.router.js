const Router = require('koa-router')
const {
    create,
    reply,
    update,
    remove
} = require('../controller/comment.controller')
const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auto.middleware')
const commentRouter = new Router({prefix:'/comment'})
// 评论接口
commentRouter.post('/',verifyAuth,create)
// 评论评论的接口
commentRouter.post('/:commentId/reply',verifyAuth,reply)
// 修改评论
commentRouter.patch('/:commentId',verifyAuth,verifyPermission,update)
// 删除评论
commentRouter.delete('/:commentId',verifyAuth,verifyPermission,remove)
module.exports = commentRouter