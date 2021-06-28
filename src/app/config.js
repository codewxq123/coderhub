const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()
// console.log(process.env.APP_PORT);
const {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_ROOT,
    MYSQL_PASSWORD
} = process.env

const PRIVATE_KEY = fs.readFileSync('src/app/keys/private.key')
const PUBLIC_KEY = fs.readFileSync('src/app/keys/public.key')
module.exports = {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_ROOT,
    MYSQL_PASSWORD,
    PRIVATE_KEY,
    PUBLIC_KEY
}