const dotenv = require('dotenv')

dotenv.config()
// console.log(process.env.APP_PORT);
const {APP_PORT} = process.env
module.exports = {
    APP_PORT
}