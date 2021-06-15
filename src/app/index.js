const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const userRouter = require('../router/user.router')
const autoRouter = require('../router/auth.router')
const errorHandler = require('./error-handle')
const useRoutes = require('../router/index')

const app = new Koa()

app.use(bodyParser())
useRoutes(app)

app.on('error',errorHandler)
module.exports = app