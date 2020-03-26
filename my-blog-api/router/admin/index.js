module.exports = app=>{
    const router = require('express').Router()
    // 中间件校验
    const authMiddleware = require('../../middleware/auth')
    app.use('/admin/api/v2',authMiddleware(),router)
    // 广告删除
    router.delete('/ads/delete/:id',require('./ad'))
}