/*
 * @Author: xuanyu
 * @Date: 2020-03-24 12:29:38
 * @LastEditTime: 2020-04-02 13:28:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog/my-blog-api/router/admin/index.js
 */
module.exports = app=>{
    const router = require('express').Router()
    // 中间件校验
    const authMiddleware = require('../../middleware/auth')
    app.use('/admin/api/v2',authMiddleware(),router)
    
    /**
     * 广告删除
     * 
     * 
     * 
     * */ 
    router.delete('/ads/delete/:id',require('./ad'))
    /**友情链接
     * 1.创建链接 creatLink
     * 2.友情链接列表　ｇｅｔlinks
     * 
     * 
     * */ 
    const { createLink　,getLink ,deleteLink} = require('./link')
    // 创建链接路由
    router.post("/link",createLink)
    //友情链接列表
    router.get('/link/getLists',getLink)
    // 删除链接
    router.delete('/link/delete',deleteLink)
}