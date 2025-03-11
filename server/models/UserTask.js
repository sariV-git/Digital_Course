const mongoose=require('mongoose')

const userTaskSchema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
task:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Task',
    required:true
},
answers:{
    type:
    [{type:mongoose.Schema.Types.ObjectId,
         ref:'Answer'
}],
default:true}
})




module.exports=mongoose.model('UserTask',userTaskSchema)