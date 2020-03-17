const mongoose = require("mongoose")
const Schema = mongoose.Schema


const commentSchema = new Schema({
    userUid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "userUid"
    },
    content: {
        type: String
    },
    articleId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Article"
    },
    parent:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Comment"
    }
}, {
    timestamps: true
})
// 二级评论虚拟属性
commentSchema.virtual('children',{
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref:"Comment"
})
module.exports = mongoose.model('Comment', commentSchema)