const Task = require('../models/Task')
const Question = require('../models/Question')
const UserTask=require('../models/UserTask')
const {funcDeleteUserTask}=require('../models/UserTask')

//func delete task
const funcDeleteTask = async (_id) => {
    const task = await Task.findById(_id)
    if (!task)
        return false
    const questions = await Question.find({ task: _id })
    if (questions)
        questions.forEach(async q => {
            const deleted = await q.deleteOne()
            if (!deleted)
                return false
        })
    const userTasks=await UserTask.find({task:_id})
    const deleted = await task.deleteOne()
    if (deleted.deleteCount != 1)
        return false
    if(!userTasks)
        return false
    userTasks.forEach(async usertask=>{
      if(!await funcDeleteUserTask(usertask._id)) 
        return false
    })
    return true
}

//delete
const deleteTask = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(404).send('error in deletTask')
    if (!funcDeleteTask(_id))
        return res.status(404).send('error in deletTask')
    return res.send(`succeed delete task ${_id}`)
}

//create
const createTask=async(req,res)=>{
    const{title,lesson}=req.body
    if(!lesson||!title)
        return res.status(400).send('error in create task')
    const task=await Task.create({title,lesson})
    if(!task)
        return res.status(400).send('error in create task')
   return res.status(200).json(task)
}

//update
const updateLesson=async(req,res)=>{
    const{title,_id}=req.body
    if(!title||!_id)
        return res.status(400).send('error in update task')
    const lesson=await Lesson.findById(_id)
    lesson.title=title
    const updated=await lesson.save()
    if(!updated)
        return res.status(404).send('error in update lesson')
    return res.send('succeed update task')
}

//getById
const getByIdTask=async(req,res)=>{
    const{_id}=req.params
    if(!_id)
        return res.status(400).send('error in getById task')

    const task=await Task.findById(_id)
    if(!task)
        return res.status(400).send('error in getById task')
return res.json(task)
}

//getAll
const getAlltasks=async(req,res)=>{
    const tasks=await Task.find()
    if(!tasks)
        return res.status(400).send('error in getAll task')
return res.json(tasks)
}

//getTaskAccordingLesson
const getTaskAccordingLesson=async(req,res)=>{
    console.log("hhhhhhhhhh");
    
    const {_id}=req.params
    if(!_id)
        return res.status(400).send('error in getAllLessonAccordingCourse')
    const task=await Task.findOne({lesson:_id})
    if(!task)
        return res.status(400).send('error in getAllLessonAccordingCourse')
return res.json(task)
}

module.exports = { deleteTask, funcDeleteTask,updateLesson,createTask,getAlltasks,getByIdTask,getTaskAccordingLesson }