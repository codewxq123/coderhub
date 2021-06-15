const jwt = require('jsonwebtoken')
const {PUBLIC_KEY} = require('../app/config')
const errorType = require('../constants/error-types')
const {
    getUserByName
} = require('../services/user.service')
const md5Password = require('../utils/password-handle')
// 校验用户登录
const verifyLogin = async (ctx,next) => {
    // 获取用户名和密码
    const {name,password} = ctx.request.body
    
    // 检验用户名或密码是否为空
    if(!name || !password){
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRE)
        return ctx.app.emit('error',error,ctx)
    }

    // 判断用户是否存在
    // console.log(name);
    const result = await getUserByName(name)
    const user = result[0]
    
    if(!user){
        const error = new Error(errorType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }

    // 判断用户的密码是否和数据库中一致
    if(md5Password(password) !== user.password){
        
        const error = new Error(errorType.PASSWORD_IS_INCORRECT)
        return ctx.app.emit('error',error,ctx)
    }
    ctx.user = user
        
    await next()
}   
// 检验用户是否认证成功
const verifyAuth = async(ctx,next) => {
    // 获取token
    console.log('验证授权的middleware');
    const authorization = ctx.headers.authorization
    if(!authorization){
        const error = new Error(errorType.UNAUTHORIZATION)
        return ctx.app.emit('error',error,ctx)
    }
    const token = authorization.replace("Bearer ","")
    

    // 验证token
    try {
        const result =  jwt.verify(token,PUBLIC_KEY,{
            algorithms:['RS256']
        })
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(errorType.UNAUTHORIZATION)
        return ctx.app.emit('error',error,ctx)
    }
}

module.exports = {
    verifyLogin,
    verifyAuth
}