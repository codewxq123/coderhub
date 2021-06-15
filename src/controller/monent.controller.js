const {create} = require('../services/monent.service')
const {
    getMonentById,
    getMonentList
} = require('../services/monent.service')
class MonentController {
    async create(ctx,next){
        // 获取数据(user_id,content)
        const userId = ctx.user.id
        console.log(userId);
        const content = ctx.request.body.content
        console.log(content);

        // 将数据插入数据库中
        const result = await create(userId,content)
        ctx.body = result

    }

    async detail(ctx,next){
        // 获取monent
        const monentId = ctx.params.monentId
        // 根据monent查询数据
        const result = await getMonentById(monentId)
        ctx.body = result
    }
    async list(ctx,next){
        // 获取offset和size
        const {offset,size} = ctx.query
        // 通过offset和size查询数据
        const result = await getMonentList(offset,size)
        ctx.body = result
    }
}

module.exports = new MonentController()