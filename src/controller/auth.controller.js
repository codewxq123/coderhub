const jwt = require('jsonwebtoken')
const config = require('../app/config')
class AuthController {
    async login(ctx,next){
        
        // 颁发token
        const {id,name} = ctx.user
        
        const token = jwt.sign({id,name},config.PRIVATE_KEY,{
            expiresIn:24*60*60,
            algorithm:'RS256'
        })

        ctx.body = {id,name,token}
    }

    async success(ctx,next) {
        ctx.body = '授权成功'
    }
}

module.exports = new AuthController()