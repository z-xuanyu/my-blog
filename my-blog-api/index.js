const express = require("express")
const app = express()
const cors = require("cors")
const path = require('path')
// 端口监听
app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})
// 连接数据库
const mongoose = require("mongoose")
mongoose.connect("mongodb://121.42.14.221:27017/blog", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功")
}).catch(() => {
    console.log("数据库连接失败")
})
// 配置静态资源托管
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
//接口路由配置
const router = express.Router({
    mergeParams: true
})
// 默认中间件
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
// 跨越
app.use(cors())
// 引入web端路由
require('./router/web/index')(app)
// 首页路由
app.get("/", (req, res) => {
    res.send("Hello Express")
})
// 用户注册
app.post('/regist', require('./router/regist'))
// 用户登陆验证
app.get('/login', require('./router/login'))
// 查看所有用户
app.get("/users", require('./router/allusers'))

// 创建资源
router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
})
// 更新资源
router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
})
// 删除资源
router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
        success: true
    })
})
// 资源列表
router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'
    }
   if(req.Model.modelName === 'Article'){
       queryOptions.populate = 'categories'
   }
    const Category = require('./mongodb/models/Category')
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
})
// 资源详情
router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
})
// 登录校验中间件
const authMiddleware = require('./middleware/auth')
const resourceMiddleware = require('./middleware/resource')
app.use('/admin/api/rest/:resource', resourceMiddleware(),authMiddleware(), router)

//文件上次接口
const multer = require('multer')
const upload = multer({ dest: __dirname + '/uploads'})

app.post('/admin/api/upload', upload.single('file'), function (req, res, next) {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
// 错误处理函数
app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
        message: err.message
    })
})