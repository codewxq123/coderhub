const app = require('./app/index')
const config = require('./app/config')
const connection = require('./app/database')

app.listen(config.APP_PORT,() => {
    console.log('服务已启动');
})