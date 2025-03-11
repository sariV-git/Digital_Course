const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lesson:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lesson',
        required:true
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Task', taskSchema)