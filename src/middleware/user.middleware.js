const errorType = require('../constants/error-types')
const service = require('../services/user.service')
const verifyUser = async (ctx,next) => {
    // 获取用户名密码
    const {name,password} = ctx.request.body
    console.log(name,password);
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

module.exports = {
    verifyUser
}