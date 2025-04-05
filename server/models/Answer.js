const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    text: {
        type: String,
        trim:true,
        required:true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

module.exports = mongoose.model('Answer',answerSchema)