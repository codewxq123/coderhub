const connection = require('../app/database')

class MonentService {
    async create(userId,content){
        const statement = `INSERT INTO monent (content,user_id) VALUES (?,?)`
        const result = await connection.execute(statement,[content,userId])
        
        return result[0]
    }
    // 查询单个信息
    async getMonentById(monentId){
        const statement = 
            /* 只查询动态信息*/
        // `SELECT m.id id,m.content content,m.createAT createTime,m.updateAT updateTime,
        //     JSON_OBJECT('id',u.id,'name',u.name) author
        //     FROM monent m LEFT JOIN users u ON m.user_id = u.id WHERE m.id = ?;`

              /* 查询动态的同时查询评论信息*/
        `SELECT m.id id,m.content content,m.createAT createTime,m.updateAT updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) author,
		IF(COUNT(c.id),	JSON_ARRAYAGG(
		JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAT,'updateAT',c.updateAT,
		'user',JSON_OBJECT('id',cu.id,'name',cu.name)
		)),NULL) comments,
		(SELECT COUNT(*) FROM comment c WHERE c.monent_id = m.id) commentCount,
		(SELECT COUNT(*) FROM monent_label ml WHERE ml.monent_id = m.id) labelCount
        FROM monent m 
		LEFT JOIN users u ON m.user_id = u.id
		LEFT JOIN comment c ON c.monent_id = m.id 
		LEFT JOIN users cu ON cu.id = c.user_id 
		WHERE m.id = ?;`
        const result = await connection.execute(statement,[monentId])
        return result[0]
    }

    // 查询多条数据
    async getMonentList(offset,size){
        const statement = `SELECT m.id id,m.content content,m.createAT createTime,m.updateAT updateTime,
        JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar) author,
        (SELECT COUNT(*) FROM comment c WHERE c.monent_id = m.id) commentCount,
        (SELECT COUNT(*) FROM monent_label ml WHERE ml.monent_id = m.id) labelCount
        FROM monent m LEFT JOIN users u ON m.user_id = u.id LIMIT ?,?;`
        const result = await connection.execute(statement,[offset,size])
        console.log(result);
        return result[0]
    }
    // 修改内容
    async update(content,monentId){
        const statement = `UPDATE monent SET content = ? WHERE id = ?`
        const result = await connection.execute(statement,[content,monentId])
        return result[0]
    }

    async remove(monentId){
        const statement = `DELETE FROM monent WHERE id = ?`
        const result = await connection.execute(statement,[monentId])
        return result[0]
    }
    async hasLabel(monentId,labelId){
        const statement = `SELECT * FROM monent_label WHERE monent_id = ? AND label_id = ?`
        const result = await connection.execute(statement,[monentId,labelId])
        return result[0].length === 0? false : true
    }
    async addLabel(monentId,labelId){
        const statement = `INSERT INTO monent_label (monent_id,label_id) VALUES (?,?)`
        const result = await connection.execute(statement,[monentId,labelId])
        return result[0]
    }
    
}

module.exports = new MonentService()