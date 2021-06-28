const { AVATAR_PATH } = require('../constants/file-path')
const {
    updateAvatarUrlById
} = require('../services/user.service')
const {
    createAvatar
} = require('../services/file.service')
const {
    APP_HOST,
    APP_PORT
} = require('../app/config')
class FileController {
    async saveAvatarInfo(ctx,next){
        console.log(111);
        // 1. 获取图像相关信息
        const {filename,mimetype,size} = ctx.req.file
        const userId = ctx.user.id
        // 2. 将图像信息保存到数据库中
        const result = await createAvatar(filename,mimetype,size,userId)
        // 3. 将图像的url保存到数据库中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`
        console.log(avatarUrl);
        await updateAvatarUrlById(avatarUrl,userId)
        ctx.body = '上传头像成功'
    }
    async savePictrueInfo(ctx,next){
        // 获取信息
        const files = ctx.req.files
    }
}

module.exports = new FileController()