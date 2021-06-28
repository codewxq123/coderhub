const {
    create,
    reply,
    update,
    remove,
    getCommentBymonentId
} = require('../services/comment.service')
class CommentController {
    async create(ctx,next){
        
        const {monentId,content} = ctx.request.body
        const userId = ctx.user.id
        const result = await create(monentId,content,userId)
        ctx.body = result
    }
    
    async reply(ctx,next){
        console.log(ctx.params);
        const {commentId} = ctx.params
        console.log(commentId);
        const {monentId,content} = ctx.request.body
        const userId = ctx.user.id
        const result = await reply(monentId,content,userId,commentId)
        ctx.body = result
    }

    async update(ctx,next){
        const {commentId} = ctx.params
        const {content} = ctx.request.body
        const result = await update(commentId,content)
        ctx.body = result
    }

    async remove(ctx,next) {
        const {commentId} = ctx.params
        const result = await remove(commentId)
        ctx.body = result
    }
    async list(ctx,next){
        console.log(ctx.query);
        const {monentId} = ctx.query
        console.log(monentId);
        const result = await getCommentBymonentId(monentId)
        ctx.body = result
    }
}

module.exports = new CommentController()