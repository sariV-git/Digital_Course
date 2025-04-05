const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    information:{
         type:String,
         trim:true
    },
    pathTriler:{
        type:String,
        required:true
    },
    speaker:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    backgroundImage:{
       type:String
    }

},{timestamps:true})
module.exports=mongoose.model('Course',courseSchema)