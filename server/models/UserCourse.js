const mongoose = require('mongoose')

const userCoursSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        repuired: true
    },
    active:{
        type:Boolean,
        default:true
    },
    numLesson: {
        type: mongoose.Schema.Types.Number,
        default: 1
    }
})

module.exports=mongoose.model('UserCours',userCoursSchema)