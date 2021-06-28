const fs = require('fs')

const service = require('../services/user.service')
const {
    getAvatarByUserId
} = require('../services/file.service')
const { AVATAR_PATH } = require('../constants/file-path')
// 定义中间件的处理逻辑类
class userContrlooer {
    async create(ctx,next){
        // 获取用户请求传递的参数
        const user = ctx.request.body
        // 查询数据库
       const result = await service.create(user)

        // 返回数据
        ctx.body = result
    }
    async avatarInfo(ctx,next){
        // 获取信息
        const {userId} = ctx.params
        const result = await getAvatarByUserId(userId)
        const avatarInfo = result[0]
        // 将图像显示
        ctx.response.set('content-type',avatarInfo.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    }
}

module.exports = new userContrlooer()