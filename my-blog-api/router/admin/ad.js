
const ad = require('../../mongodb/models/Ad')
module.exports = async (req,res)=>{
    const id = req.params.id
    const result = await ad.deleteOne({items:{$elemMatch:{_id:id}}})
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