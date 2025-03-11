 

const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
   
    course: {
        type: mongoose.ObjectId,
        ref: 'Course',
        required: true
    },
    numOfLesson:{
type:Number,
required:true
    },
    path:{
        type:String,
        required:true
    }
    // recorder://to check how we can rise an recorder
}, { timestamps: true })


module.exports = mongoose.model('Lesson', lessonSchema)

