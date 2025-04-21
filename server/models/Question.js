

const mongoose=require('mongoose')
const questionSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
       enum:['American','Free']
    },
    options:{
        type:[String],
        trim:true/////////to check if it help in array
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true
    },
    numOfQuestion:{
        type:Number,
        required:true
    }
})  

module.exports=mongoose.model('Question',questionSchema)