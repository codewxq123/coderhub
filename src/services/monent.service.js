const connection = require('../app/database')

class MonentService {
    async create(userId,content){
        const statement = `INSERT INTO monent (content,user_id) VALUES (?,?)`
        const result = await connection.execute(statement,[content,userId])
        console.log(result);
        return result[0]
    }
    // 查询单个信息
    async getMonentById(monentId){
        const statement = `SELECT m.id id,m.content content,m.createAT createTime,m.updateAT updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) author
            FROM monent m LEFT JOIN users u ON m.user_id = u.id WHERE m.id = ?;`
        const result = await connection.execute(statement,[monentId])
        return result[0]
    }

    // 查询多条数据
    async getMonentList(offset,size){
        const statement = `SELECT m.id id,m.content content,m.createAT createTime,m.updateAT updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) author
        FROM monent m LEFT JOIN users u ON m.user_id = u.id LIMIT ?,?;`
        const result = await connection.execute(statement,[offset,size])
        return result[0]
    }
}

module.exports = new MonentService()