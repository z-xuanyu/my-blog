const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 文章分类
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  // 文章标题
  title: {
    type: String
  },
  // 文章封面
  pic:{
    type:String
  },
  // 文章背景颜色
  bgColor:{
    type:String
  },
  // 文章发布时间
  time:{
    type:String
  },
  // 文章作者
  author: {
    type: String
  },
  // 文章内容
  body: {
    type: String
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)