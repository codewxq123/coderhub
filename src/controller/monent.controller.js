
const {
    create,
    getMonentById,
    getMonentList,
    update,
    remove,
    hasLabel,
    addLabel
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
    async update(ctx,next){
        const {monentId} = ctx.params
        const {content }= ctx.request.body
        const {id} = ctx.user
        
        const result = await update(content,monentId)
        ctx.body = result
    }
    async remove(ctx,next){
        const monentId = ctx.params
        const result = await remove(monentId)
        ctx.body = result
    }
    async addLabels(ctx,next){
        console.log(ctx.request.body.labels);
        // 获取标签和动态id
        const labels = ctx.labels
        console.log(labels);
        const {monentId} = ctx.params
        
        // 添加所有标签
        for(let label of labels){
            // 判断标签是否已经和动态有过关系
            const isExist = await hasLabel(monentId,label.id)
            
            // 如果不存在，想表中插入数据
            if(!isExist){
                await addLabel(monentId,label.id)
            }
        }
        ctx.body = "添加标签成功"
    }

}

module.exports = new MonentController()