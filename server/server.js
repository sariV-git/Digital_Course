require('dotenv').config()

const express=require('express')
const cors=require('cors')
const corsOptions=require('./config/corsOptions')

const connectDB=require('./config/dbConn')
const exp = require('constants')
const mongoose = require('mongoose')

const PORT=process.env.PORT||7001

const app=express()

connectDB()

app.get('/',(req,res)=>{
    res.send('home page')
})


app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('public'))

//user
app.use('/user',require('./routes/userRoute'))
app.use('/course',require('./routes/courseRoute'))
app.use('/lesson',require('./routes/lessonRoute'))
app.use('/answer',require('./routes/answerRoute'))
app.use('/question',require('./routes/questionRoute'))
app.use('/respond',require('./routes/respondRoute'))
app.use('/task',require('./routes/taskRoute'))
app.use('/userCourse',require('./routes/userCourseRouter'))
app.use('/userTask',require('./routes/userTaskRoute'))
// app.use('/task',require('./routes/taskRoute'))
//login and register
app.use('/auth',require('./routes/authRoutes'))
  
//for files:
app.use('/upload',express.static(__dirname+'/public/upload'))

  
//to get the video of the specific lesson
app.get('/upload/:fileName',(req,res)=>{
    const{fileName}=req.params
    const videoPath=path.join(__dirname,'public/upload',fileName)
    res.sendFile(videoPath)
})

mongoose.connection.once('open',()=>{console.log('connected to mongoDB')
    app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)})})

mongoose.connection.on('error',err=>console.log(`error with the connection to mongodb ${err}`))