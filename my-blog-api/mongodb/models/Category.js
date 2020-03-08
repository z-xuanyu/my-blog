const mongoose = require("mongoose")
const Schema = mongoose.Schema

let CategorySchema = new Schema({
    name: {
        type: String
    },
    icon:{
        type:String
    },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }
})
// 子分类的虚拟属性
CategorySchema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})
// 关联分类下文章虚拟属性
CategorySchema.virtual('articleList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})
module.exports = mongoose.model('Category',CategorySchema)