/**
 * 用户注册路由
 * 
 * 信息注释：
 * 状态：code 
 * 0：代表用户已存在
 * 1：代表注册成功
 * 2：代表两次密码不一致
 * 3: 代表邮箱已存在
 * 4：代表服务器端错误
 * 
 **/
const Users = require('../mongodb/models/users')
module.exports = function (req, res) {
    // 接收前段传过来的数据
    let reqData = req.body
    // 判断用户是否已存在
    Users.findOne({
        username: reqData.username
    }).then(data => {
        // 判断data是否有数据
        if (data) {
            res.send({
                code: 0,
                msg: "用户已经存在"
            })
        } else {
            // 设置两次密码是否一致
            if (reqData.password === reqData.confirmpassword) {
                // 判断邮箱是否存在
                Users.findOne({
                    email: reqData.email
                }).then(emailData => {
                    console.log(emailData)
                    if (emailData) {
                        res.send({
                            code:3,
                            msg: "邮箱已经存在"
                        })
                    } else {
                        // 把数据存储到数据库
                        Users.create({
                            username: reqData.username,
                            password: reqData.password,
                            email: reqData.email
                        }).then(() => {
                            //数据库存储成功
                            res.send({
                                code: 1,
                                msg: "注册成功"
                            })
                        }).catch(() => {
                            // 数据库存储失败
                            res.send({
                                code: 4,
                                msg: "服务器异常，注册失败，请重新试试o(╥﹏╥)o"
                            })
                        })
                    }
                })
            } else {
                // 密码不一致
                res.send({
                    code:2,
                    mes: "两次的密码不一致"
                })
            }
        }
    }).catch(() => {
        res.send({
            code: 4,
            msg: "服务器异常，请重新试试o(╥﹏╥)o"
        })
    })
}