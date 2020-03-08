module.exports = options => {
    const jwt = require('jsonwebtoken')
    const AdminUser = require("../mongodb/models/users")
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        if(!token){
            res.send({
                code:-1,
                msg:'请先登录'
            })
        }
        await next()
    }
}