/**
 * 用户登陆验证
 * 
 * 信息注释：
 * 状态：code 
 * 0：代表用户不存在
 * 1：代表登录成功
 * 2：代表密码不正确
 **/
const Users = require("../mongodb/models/users")
const jwt = require("jsonwebtoken")
const TOKEN_SSH_KEY = "xuanyu812006298"  //token key
module.exports = async function (req, res) {
    // 查找用户
    const user = await Users.findOne({
        username: req.query.username
    });
    // 用户是否存在
    if (!user) {
        return res.send({
            code: 0,
            msg: "用户不存"
        })
    }
    // 匹配用户加密密码，验证用户密码是否正确
    const isPassWordValid = require("bcrypt").compareSync(
        req.query.password,
        user.password
    );
    // 密码错误
    if (!isPassWordValid) {
        return res.send({
            code: 2,
            message: "密码错误"
        });
    }
    //密码正确，设置用户的token
    const token = jwt.sign(
        {
            id: String(user._id)
        },
        TOKEN_SSH_KEY
    );
    //  给前段返回数据
    res.send({
        code:1,
        msg:"登录成功",
        token: token
    });
}