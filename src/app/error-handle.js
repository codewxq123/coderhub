const errorType = require('../constants/error-types')

const errorHandler = (error,ctx) => {
    let status,message;
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRE:
            status = 400    //Bad  Request
            message = "用户名或者密码不能为空"
            break;
        case errorType.USER_ALREADY_EXIST:
            status = 409    //conflict  冲突
            message = "用户名已存在~~"
            break;
        case errorType.USER_DOES_NOT_EXISTS:
            status = 400   //参数错误
            message = "用户名不存在~~"
            break;
        case errorType.PASSWORD_IS_INCORRECT:
            status = 400   //参数错误
            message = "密码错误"
            break;    
        case errorType.UNAUTHORIZATION:
            status = 401   
            message = "无效的token~"
            break;
        case errorType.UNPREMISSION:
            status = 401   
            message = "没有权限"
            break;        
        default:
            status = 404
            message = "NOT FOUND"
            break;
    }

    ctx.status = status
    ctx.body = message
     
}
module.exports = errorHandler