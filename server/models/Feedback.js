const  mongoose=require('mongoose')



const feedbackSchema=new mongoose.Schema({
    userTask:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserTask',
        required:true
    },
    text:{
        type:String,
        requried:true
    }
},{timestamps:true})

module.exports=mongoose.model('Feedback',feedbackSchema)