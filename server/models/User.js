const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength:9,
        minLength:6
    },
    password: {
        type: String,
        required: true,
        minLength:4
    },
     
       name:{
            firstName:{type: String,
                     required: true},
            lastName:{type: String,
                required: true}
      },
    
    // courses: {
    //     type: [{type:mongoose.Schema.Types.ObjectId,
    //           ref: 'Course',
    //     }],
    //     default: []
    // },
    role: {
        type: String,
        enum: ['Admin','Speeker', 'User'],
        default: 'User',
        required: true
    },
    email: {
        type: String,
        trim: true
    },

    phone:{
        type:String
    } ,
    informationOnSpeaker:{
        type:String,
        default:""
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)