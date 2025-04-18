// const Lesson = require('../models/Lesson')
const Lesson = require('../models/Lesson')
const Task = require('../models/Task')
const { funcDeleteTask } = require('./taskController')
const fs = require('fs');//for delete the video
const path=require('path')

//create
const createLesson = async (req, res) => {

    const { name, course, numOfLesson } = req.body
    const path = req.file.filename
    if (!name || !course || !path || !numOfLesson)
        return res.status(400).send('error in create lesson video')
    // console.log({name, course, path, numOfLesson });
    const lesson = await Lesson.create({ name, course, path, numOfLesson })
    if (!lesson)
        return res.status(400).send('error in create lesson video')
    return res.status(200).json(lesson)
}

//update
const updatLesson = async (req, res) => {
    //to check how delete the old video
    const { _id, name, numOfLesson } = req.body
    if (!_id)
        return res.status(400).send('error in update lesson')
    // const path = req.file.originalname
    const lesson = await Lesson.findById(_id)
    if (!lesson)
        return res.status(400).send('error in update lesson')

    // lesson.path = path ? path : lesson.path
    lesson.name = name ? name : lesson.name
    lesson.numOfLesson = numOfLesson ? numOfLesson : lesson.numOfLesson

    const update = await lesson.save()
    if (!update)
        return res.status(400).send('error in update lesson')
    return res.status(200).json(lesson)
}

//delete
const funcDeleteLesson = async (_id) => {

    const lesson = await Lesson.findById(_id)
    if (!lesson)
        return false
    const tasks = await Task.find({ lesson: _id })
    if (!tasks)
        return true
    tasks.forEach(task=>{
        if (!funcDeleteTask(task._id))
            return false
    })
    const absolatePath = path.join(__dirname, '../public/upload', lesson.path)
    console.log('the path', absolatePath);
    fs.unlink(absolatePath, (err) => {
        if (err) {
              console.log('error in delete video file', err);
                 return false
        }
    })

    const deleted = await lesson.deleteOne()
    if (deleted.deleteCount != 1)
        return false
    return true
}
//delete
const deleteLesson = async (req, res) => {
    //to check how delete the old video
    const { _id } = req.params
    if (!_id)
        return res.status(404).send('error with deleteLesson')
    if (!funcDeleteLesson(_id))
        return res.status(404).send('there are any lesson or some mistakes')

    return res.send('succeed delete lesson')
}

//getAll
const getAllLessons = async (req, res) => {
    const lessons = await Lesson.find()
    if (!lessons)
        return res.status(404).send('error with getAll Lesson')
    console.log(lessons);

    return res.json(lessons)
}

//getAllLessonAccordingCourse


//getById
const getByIdLesson = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(404).send('error with getById Lesson')

    const lesson = await Lesson.findById(_id)
    if (!lesson)
        return res.status(404).send('error with getById Lesson')
    res.json(lesson)

}

//getTaskAccordingLesson
const getTaskAccordingLesson = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).send('error in getTaskAccordingLesson task')
    const task = await Task.findOne({ lesson: _id })
    if (!task)
        return res.status(400).send('error in getTaskAccordingLesson task')
    return res.json(task)
}

module.exports = { createLesson, updatLesson, deleteLesson, deleteLesson, getAllLessons, getByIdLesson,funcDeleteLesson, getTaskAccordingLesson }
