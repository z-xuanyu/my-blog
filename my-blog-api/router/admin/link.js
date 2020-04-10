/*
 * @Author: xuanyu
 * @Date: 2020-03-28 18:05:32
 * @LastEditTime: 2020-04-10 20:52:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog/my-blog-api/router/admin/link.js
 */
const Link = require('../../mongodb/models/Link')
module.exports = {
    // 创建链接
    createLink: async function (req, res) {
        const result = await Link.create(req.body)
        if (result) {
            res.send({
                code: 1,
                msg: '创建成功'
            })
        } else {
            res.send({
                code: 0,
                msg: '创建失败'
            })
        }

    },
    // 获取链接资源
    getLink: async function (req, res) {
        const result = await Link.find()
        res.send(result)
    },
    // 删了链接资源
    deleteLink: async function (req, res) {
        const id = req.body._id
        const result =  await Link.deleteOne({_id:id})
        if(result.ok){
            res.send({
                code:1,
                msg:"ok"
            })
        }else{
            res,send({
                code:-1,
                msg:"error"
            })
        } 
    }
}