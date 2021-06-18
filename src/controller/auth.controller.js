const jwt = require('jsonwebtoken')
const config = require('../app/config')
class AuthController {
    async login(ctx,next){
        console.log(config.PRIVATE_KEY);
        // 颁发token
        const {id,name} = ctx.user
        
        const token = jwt.sign({id,name},config.PRIVATE_KEY,{
            expiresIn:24*60*60,
            algorithm:'RS256'
        })
        console.log(token);
        console.log(ctx.user);
        ctx.body = {id,name,token}
    }

    async success(ctx,next) {
        ctx.body = '授权成功'
    }
}

module.exports = new AuthController()