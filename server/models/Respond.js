const mongoose = require('mongoose')

const respondSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        defalult:'ע"ש'
    },
    introduce:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Respond', respondSchema)