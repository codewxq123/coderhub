const {
    getLabelByName
} = require('../services/label.service')
const { create } = require('../services/label.service')

const verifyLabelExist = async (ctx,next) => {
    // 取出所有要添加的标签
    const {labels} = ctx.request.body
    // 判断标签是否存在列表
    const newLabels = []
    for(let name of labels){
        const labelResult = await getLabelByName(name)
        const label = {name}
        if(!labelResult.length){
            // 不存在则创建标签
            const result = await create(name)
            
            label.id = result.insertId
        }else{
            
            label.id = labelResult[0].id
        }
        newLabels.push(label)
    }
    
    ctx.labels = newLabels
    await next()
}

module.exports = {
    verifyLabelExist
}