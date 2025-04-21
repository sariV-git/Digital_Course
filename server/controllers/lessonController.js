// const Lesson = require('../models/Lesson')
const Lesson = require('../models/Lesson')
const Task = require('../models/Task');
const UserTask = require('../models/UserTask');
const { funcDeleteTask } = require('./taskController')
const fs = require('fs');//for delete the video
const path = require('path')

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
    tasks.forEach(task => {
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

//getLessonForUserAccordingCourse
const getLessonForUserAccordingCourse = async (req, res) => {
    let matchLessons = []; // the lessons that match for this specific user
    const { user, course } = req.params;

    if (!user || !course)
        return res.status(400).send('Error: Missing user or course');

    try {
        const allLessons = await Lesson.find({ course: course }); // Get all lessons for the course
        if (allLessons.length === 0) {
            return res.status(400).send('No lessons found for this course');
        }

        // Fetch all tasks for the lessons in the course in parallel
        const tasksArray = await Task.find({ lesson: { $in: allLessons.map(lesson => lesson._id) } });
        
        // Fetch all user tasks in parallel
        const userTasks = await UserTask.find({ user: user, task: { $in: tasksArray.map(task => task._id) } });

        // Get the lessons that the user has already completed
        const completedLessons = userTasks.map(userTask => {
            const task = tasksArray.find(task => task._id.toString() === userTask.task.toString());
            return allLessons.find(lesson => lesson._id.toString() === task.lesson.toString());
        });
console.log('completedLesson -the lesson which the user already saw and did task for him: ',completedLessons);
        // Find the last completed lesson (the one with the highest numOfLesson)
        const lastLesson = completedLessons.reduce((max, lesson) => { 
            return lesson.numOfLesson > max.numOfLesson ? lesson : max;
        }, { numOfLesson: -1 }); // Initialize with a numOfLesson that can't be beaten
console.log('lastLesson---',lastLesson);
        // If the user hasn't completed any lesson
        if (lastLesson.numOfLesson===-1) {
            const firstLesson = await Lesson.findOne({ numOfLesson: 1, course: course });
            if (!firstLesson) {
                return res.status(400).send('No lessons available in this course');
            }                       
            matchLessons = [firstLesson];
            return res.status(200).json({ lessons: matchLessons, finish: false });
        }

        // Find the next lesson (next numOfLesson)
        const nextLesson = await Lesson.findOne({ numOfLesson: lastLesson.numOfLesson + 1, course: course });
        
        if (!nextLesson) {
            return res.json({ lessons: allLessons, text: 'You have completed all the lessons and tasks', finish: true });
        }

        // Return the completed lessons and the next lesson
        matchLessons = [...completedLessons, nextLesson];
        return res.json({ lessons: matchLessons, finish: false });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};
               

module.exports = { getLessonForUserAccordingCourse,createLesson, updatLesson, deleteLesson, deleteLesson, getAllLessons, getByIdLesson, funcDeleteLesson, getTaskAccordingLesson }
