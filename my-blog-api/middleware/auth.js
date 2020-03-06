module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require("http-assert")
    const AdminUser = require("../mongodb/models/users")

    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        await next()
    }
}