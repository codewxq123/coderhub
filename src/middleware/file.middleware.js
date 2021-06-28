const Multer = require('koa-multer')
const {
    AVATAR_PATH,
    PICTURE_PATH
} = require('../constants/file-path')
const avatarUpload = Multer({
    dest:AVATAR_PATH
})
const pictureUpload = Multer({
    dest:PICTURE_PATH
})
const avatarHandle = avatarUpload.single('avatar')
const pictureHandle = pictureUpload.array('picture',9)
module.exports = {
    avatarHandle,
    pictureHandle
}