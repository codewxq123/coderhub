// 定义数据库的处理逻辑
const connection = require('../app/database')
class UserService {
    async create(user){
        const {name,password} = user
        const statement = `INSERT INTO users (name,password) VALUES (?,?)`
        const result = await connection.execute(statement,[name,password])
        // 将user存储到数据库中
        return result[0]
    }

    async getUserByName(name){
        const statement = `SELECT * FROM users WHERE name = ?`
        const result = await connection.execute(statement,[name])

        return result[0]
    }
}

module.exports = new UserService()