

const service = require('../services/user.service')
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
}

module.exports = new userContrlooer()