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
CategorySchema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

CategorySchema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})
module.exports = mongoose.model('Category',CategorySchema)