const connection = require('../app/database')
class CommentService {
    async create(monentId,content,userId){
        const statement = `INSERT INTO comment (monent_id,content,user_id) VALUES (?,?,?)`
        const result = await connection.execute(statement,[monentId,content,userId])
        return result[0]
    }

    async reply(monentId,content,userId,commentId){
        const statement = `INSERT INTO comment (monent_id,content,user_id,comment_id) VALUES (?,?,?,?)`
        const result = await connection.execute(statement,[monentId,content,userId,commentId])
        return result[0]
    }

    async update(commentId,content){
        const statement = `UPDATE comment SET content = ? WHERE id = ?`
        const result = await connection.execute(statement,[content,commentId])
        return result[0]
    }

    async remove(commentId){
        const statement = `DELETE FROM comment WHERE id = ? `
        const result = await connection.execute(statement,[commentId])
        return result[0]  
    }
    async getCommentBymonentId(monentId){
        const statement = `SELECT c.id,c.content,c.comment_id commentId,c.createAT createTime,
                           c.updateAT updateTime,JSON_OBJECT('id',u.id,'name',u.name) user FROM comment c
                           LEFT JOIN users u ON c.user_id = u.id  WHERE c.monent_id = ?`
        const result = await connection.execute(statement,[monentId])
        return result[0]
    }
}

module.exports = new CommentService()