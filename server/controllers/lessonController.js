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
        return res.status(400).send('error in create lesson video--missing some parametters')
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
// const funcDeleteLesson = async (_id) => {

//     const lesson = await Lesson.findById(_id)
//     if (!lesson)
//         return false
//     const tasks = await Task.find({ lesson: _id })
//     if (!tasks)
//         return true
//     tasks.forEach(task => {
//         if (!funcDeleteTask(task._id))
//             return false
//     })
//     const absolatePath = path.join(__dirname, '../public/upload', lesson.path)
//     console.log('the path', absolatePath);
//     fs.unlink(absolatePath, (err) => {
//         if (err) {
//             console.log('error in delete video file', err);
//             return false
//         }
//     })

//     const deleted = await lesson.deleteOne()
//     if (deleted.deleteCount != 1)
//         return false
//     return true
// }

//funcDeleteLesson
const funcDeleteLesson = async (_id) => {
    try {
        const lesson = await Lesson.findById(_id);
        if (!lesson) return false; // No lesson found, nothing to delete

        // Delete all tasks associated with the lesson
        const tasks = await Task.find({ lesson: _id });
        if (tasks && tasks.length > 0) {
            for (const task of tasks) {
                const deleted = await funcDeleteTask(task._id); // Await the result of funcDeleteTask
                if (!deleted) {
                    console.error(`Failed to delete task with ID: ${task._id}`);
                    return false; // If any task deletion fails, return false
                }
            }
        }

        // Delete the video file associated with the lesson
        const absolutePath = path.join(__dirname, '../public/upload', lesson.path);
        console.log('Deleting video file at path:', absolutePath);
        await fs.promises.unlink(absolutePath).catch((err) => {
            console.error('Error deleting video file:', err.message);
            throw new Error('Failed to delete video file');
        });

        // Delete the lesson itself
        const deletedLesson = await lesson.deleteOne();
        if (!deletedLesson) {
            console.error(`Failed to delete lesson with ID: ${_id}`);
            return false;
        }

        console.log(`Successfully deleted lesson with ID: ${_id}`);
        return true; // All deletions were successful
    } catch (error) {
        console.error(`Error in funcDeleteLesson: ${error.message}`);
        return false; // Return false if an error occurs
    }
};
//delete
const deleteLesson = async (req, res) => {
    const { _id } = req.params; // Extract the lesson ID from the request parameters
    if (!_id) {
        return res.status(400).send('Error in deleteLesson: Missing _id'); // Validate input
    }

    try {
        const deleted = await funcDeleteLesson(_id); // Await the result of funcDeleteLesson
        if (!deleted) {
            return res.status(400).send('Error in deleteLesson: Failed to delete lesson'); // Handle failure
        }

        return res.status(200).send(`Lesson with ID ${_id} deleted successfully!`); // Success response
    } catch (error) {
        console.error(`Error in deleteLesson: ${error.message}`); // Log unexpected errors
        return res.status(500).send('Server error in deleteLesson'); // Internal server error response
    }
};

//getAll
const getAllLessons = async (req, res) => {
    const lessons = await Lesson.find()
    if (!lessons)
        return res.status(404).send('error with getAll Lesson')
    console.log(lessons);

    return res.json(lessons)
}



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

const getAllLessonsAccordingCourse = async (req, res) => {
    const { course } = req.params
    
    if (!course)
        return res.status(400).send('error in getAllLessonsAccordingCourse--missing course')
    const lessons = await Lesson.find({ course: course })
    if (!lessons)
        return res.status(400).send('error in getAllLessonsAccordingCourse--missing lessons')
    return res.json(lessons)
}

//getLessonForUserAccordingCours
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
               

module.exports = {getAllLessonsAccordingCourse ,getLessonForUserAccordingCourse,createLesson, updatLesson, deleteLesson, deleteLesson, getAllLessons, getByIdLesson, funcDeleteLesson, getTaskAccordingLesson }
