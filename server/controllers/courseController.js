const Course = require('../models/Course')
const { funcDeleteLesson } = require('./lessonController')
const Lesson = require('../models/Lesson')
const { funcdDeleteUserCourse } = require('./userCourseController')
const Task = require('../models/Task')
const fs = require('fs');//for delete the video
const path=require('path')


//create
const createCourse = async (req, res) => {
    const { name, information, speaker } = req.body
   
    const pathTriler = req.file.filename
    if (!name)
        return res.status(400).send('need name in createCourse')
    const course = await Course.create({ name, speaker, information, pathTriler })
    if (!course)
        return res.status(400).send('error with create course')
    return res.send('succeed to create course')
}

//getAllLessonsOfThisCourse
const getAllLessonAccordingCourse=async(req,res)=>{
    const {_id}=req.params
    if(!_id)
        return res.status(400).send('error in getAllLessonAccordingCourse')
    const course=await Course.findById(_id)
    if(!course)
        return res.status(400).send('error in getAllLessonAccordingCourse')
    const lessons=await Lesson.find({course:_id})
    if(!lessons)
        return res.status(400).send('error in getAllLessonAccordingCourse')
res.json(lessons)
}
//update
const updateCourse = async (req, res) => {
    const { name, information } = req.body
    const course = await Course.findById(_id)
    if (!course)
        return res.status(400).send('error in updateCourse')
    course.name = name ? name : course.name
    course.information = information ? information : course.information
    const updated = await course.save()
    if (!updated)
        return res.status(400).send('error in updateCourse')
    return res.send(`updated course ${_id}`)
}

//getAll
const getAllCourses = async (req, res) => {
    const courses = await Course.find()
    if (!courses)
        return res.status(400).send('error in get AllCourse')
    return res.json(courses)
}

//getbyid
const getCourse = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).send('error in getCourse')
    const course = await Course.findById(_id)
    if (!course)
        return res.status(400).send('error in getCourse')

    return res.json(course)
}

const getSpeakerInformationByCoursId = async (req,res) => {
    const { _id } = req.params
    if (!_id) {
        return res.status(400).send('id is required')
    }
    const course = await Course.findById(_id).populate('speaker', { name: 1, informationOnSpeaker: 1 ,_id:0});
    if (!course) {
        return res.status(400).send('Course not found')
    }
    // const speaker =await course.speaker.populate('User', { name: 1, informationOnSpeaker: 1 })
    console.log("------------------",course.speaker);
    // if (!speaker) {
    //     return res.status(400).send('error in getSpeakerInformation')
    // }
    res.json(course.speaker)
}

//delete
const deleteCourse = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(401).send('error in deleteCourse')
    const course = await Course.findById(_id)
    if (!course)
        return res.status(401).send('error in deleteCourse')

    const lessons = await Lesson.find({ course: _id })
    if (lessons)
        lessons.forEach(async l => {
            if (!funcDeleteLesson(l._id))
                return res.status(401).send('error in deleteCourse')
        })
    const userTasks = await Task.find({ cours: _id })
    if (userTasks) {
        userTasks.forEach(async usertask => {
            if (!funcdDeleteUserCourse(usertask._id))
                return res.status(401).send('error in deleteCourse')
        });
    }
    const deleted = await course.deleteOne()
    if (deleted.deleteCount != 1)
        return res.status(401).send('error in deleteCourse')
    if (!userTasks || !lessons)
        return res.status(401).send('error in deleteCourse')
//to delete the video of a  course
    const absolatePath=path.join(__dirname,'../public/ upload',course.pathTriler)
   fs.unlink(absolatePath,(err)=>{
    if(err)
    {
        console.log('error in delete video in course',err);
        res.status(500).send('error in delete video in course')
        
    }
   })
    return res.status(200).send('succeed delete course')
}




module.exports = { createCourse, updateCourse, getAllCourses, deleteCourse, getCourse, getSpeakerInformationByCoursId ,getAllLessonAccordingCourse}