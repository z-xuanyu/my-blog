/*
 * @Author: xuanyu
 * @Date: 2020-03-24 12:24:31
 * @LastEditTime: 2020-03-27 10:54:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit.
 * @FilePath: /my-blog/my-blog-api/router/admin/ad.js
 */

const ad = require('../../mongodb/models/Ad')
module.exports = async (req,res)=>{
    const id = req.params.id
    // 清除items为空的
    await ad.deleteMany({'items':[]})
    const result = await ad.update({"items._id":id},{$pull:{items:{'_id':id}}})
    // const result = await ad.deleteOne({items:{$elemMatch:{_id:id}}})
    console.log(result)
    if(result.ok){
        res.send({
            code:1,
            success:'ok'
        })
    }else{
        res.send({
            code:-1,
            success:'err'
        })
    }
    
}