/*
 * @Author: xuanyu
 * @Date: 2020-03-29 11:29:10
 * @LastEditTime: 2020-03-29 11:48:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog/my-blog-api/mongodb/models/Link.js
 */

const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    name:{type:String,required:true},
    url:{type:String,required:true},
    desc:{type:String,default:"一个非常酷的网站!"},
    status:{type:Boolean,default:true}
},{
    timestamps:true
})

module.exports = mongoose.model('links',linkSchema)