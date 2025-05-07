require('dotenv').config()
const path = require('path');

const express=require('express')
const cors=require('cors')
const corsOptions=require('./config/corsOptions')

const connectDB=require('./config/dbConn')
const exp = require('constants')
const mongoose = require('mongoose')

const PORT=process.env.PORT||7001

const app=express()

connectDB()
          
                                                 

     
app.use(cors(corsOptions))  
app.use(express.json({ limit: '2gb' })); // מגביל את גודל הבקשות ל-2GB
app.use(express.urlencoded({ extended: true, limit: '2gb' })); // עבור נתונים מקודדים ב-URL           
app.use(express.json())
app.use(express.static('public'))
  
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, 'public/upload'));
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 2147483648 }, // 2GB
// });

// נתיב להעלאת קבצים
// app.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send({ message: 'No file uploaded.' });
//     }
//     res.status(200).send({ message: 'File uploaded successfully.', file: req.file });
// });

app.get('/',(req,res)=>{
    res.send('home page')                 
})    
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
app.use('/feedback',require('./routes/feedbackRoute'))
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
// טיפול בשגיאות גלובליות
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!', error: err.message });
});
mongoose.connection.once('open',()=>{console.log('connected to mongoDB')
    app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)})})
   
mongoose.connection.on('error',err=>console.log(`error with the connection to mongodb ${err}`))