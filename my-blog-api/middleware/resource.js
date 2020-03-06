/*
* inflection 包用来把英文单数变成复数
*
*/ 
module.exports = options =>{
    return async (req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../mongodb/models/${modelName}`)
        next()
    }
}