module.exports = app => {
    const router = require('express').Router()
    const Category = require('../../mongodb/models/Category')
    const Arcitle = require('../../mongodb/models/Article')
    app.use('/web/api', router)
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
        const model = await Arcitle.findById(req.params.id)
        res.send(model)
    })
    // 分类下的文章内容
    router.get('/arcitle/:id', async (req, res) => {
        const id = req.params.id
        const result = await Arcitle.find().populate('categories').where({
            categories:{
                $all:[id]
            }
        })

        res.send(result)
    })
}