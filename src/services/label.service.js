const connection = require('../app/database')
class LabelService {
    async create(name){
        const statement = `INSERT INTO label (name )VALUES (?)`
        const result = await connection.execute(statement,[name])
        return result[0]
    }

    async getLabelByName(name){
        const statement = `SELECT * FROM label WHERE name = ?`
        const result = await connection.execute(statement,[name])
        return result[0]
    }
    async getLabels(limit,offset){
        const statement = `SELECT * FROM label LIMIT ?,?`
        const result = await connection.execute(statement,[offset,limit])
        return result[0]
    }
}

module.exports = new LabelService()