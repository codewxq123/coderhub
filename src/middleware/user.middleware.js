const errorType = require('../constants/error-types')
const service = require('../services/user.service')
const md5Password = require('../utils/password-handle')
const verifyUser = async (ctx,next) => {
    // 获取用户名密码
    const {name,password} = ctx.request.body
    // console.log(name,password);
    // 判断用户名密码不为空
    if(!name || !password){
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRE)
        return ctx.app.emit('error',error,ctx)
    }
    // 判断用户名没有被注册
    const result = await service.getUserByName(name)
    if(result.length){
        const error = new Error(errorType.USER_ALREADY_EXIST)
        return ctx.app.emit('error',error,ctx)
    }
    

    await next();
}

// 对密码进行加密中间件
const handlePassword = async (ctx,next) => {
    
    let {password} = ctx.request.body
    console.log(md5Password(password));
    ctx.request.body.password = md5Password(password)

    await next();
}

module.exports = {
    verifyUser,
    handlePassword
}