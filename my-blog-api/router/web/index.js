module.exports = app => {
    const router = require('express').Router()
    const Category = require('../../mongodb/models/Category')
    const Arcitle = require('../../mongodb/models/Article')
    const Comment = require('../../mongodb/models/Comment')
    const UsersUid = require('../../mongodb/models/userUid')
    app.use('/web/api', router)
    app.use(require('express').json())
    // 分类路由
    router.get('/category', async (req, res) => {
        const result = await Category.find().populate({
            path: 'children'
        }).lean()
        const data = result.filter(item => {
            return item.children.length > 0
        })
        res.send(data)
    })

    // 获取首页文章
    router.get('/arcitle', async (req, res) => {
        const {
            num,
            page
        } = req.query
        console.log(page)
        const resul = await Arcitle.find().populate('categories').skip(num * (page - 1)).limit(num * 1)
        if (!resul.length) {
            res.send({
                code: -1,
                msg: "已经没有文章了!"
            })
        }
        res.send(resul)
    })
    // 文章详情内容
    router.get('/arcitle/detail/:id', async (req, res) => {
        const model = await Arcitle.findById(req.params.id).populate('categories')
        let views = await model.views
        await Arcitle.updateOne({
            _id: req.params.id
        }, {
            $set: {
                views: views + 1
            }
        })
        res.send(model)
    })
    // 分类下的文章内容
    router.get('/arcitle/:id', async (req, res) => {
        const id = req.params.id
        const result = await Arcitle.find().populate('categories').where({
            categories: {
                $all: [id]
            }
        })
        res.send(result)
    })
    //文章评论
    router.post('/article/comment', async (req, res) => {
        console.log(req.body)
        const create = await Comment.create(req.body)
        const result = await Comment.find()

        res.send(result)
    })
    //获取文章评论
    router.get('/article/commentInfo', async (req,res)=>{
        const result = await Comment.find().populate('userUid').populate('articleId')
        res.send(result)
    })
    // 创建用户信息获取
    router.post('/userUid',async (req,res)=>{
        const avatar = `http://q1.qlogo.cn/g?b=qq&nk=${req.body.qq}&s=100`
        const data = req.body
        data.avatar = avatar
        const result = await UsersUid.create(data)
        res.send(result)
    })
    // 获取用户信息
    router.get('/userInfo',async (req,res)=>{
        const result = await UsersUid.find()
        res.send(result)
    })
}