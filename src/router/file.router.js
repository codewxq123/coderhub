const Router = require('koa-router')

const {
    verifyAuth
} = require('../middleware/auto.middleware')

const {
    avatarHandle,
    pictureHandle
} = require('../middleware/file.middleware')

const {
    saveAvatarInfo
} = require('../controller/file.controller')
const fileRouter = new Router({prefix:"/upload"})


fileRouter.post('/avatar',verifyAuth,avatarHandle,saveAvatarInfo)
fileRouter.post('/picture',verifyAuth,pictureHandle,savePictrueInfo)
module.exports = fileRouter