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
}

module.exports = new CommentService()