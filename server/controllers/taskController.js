const Task = require('../models/Task')
const Question = require('../models/Question')
const UserTask=require('../models/UserTask')
const { funcDeleteUserTask } = require('./userTaskController');
const{funcDeleteQuestion}=require('./questionController')
//func delete task



const funcDeleteTask = async (_id) => {
    try {
        const task = await Task.findById(_id);
        if (!task) return true; // No task found, nothing to delete

        // Delete all questions associated with the task
        const questions = await Question.find({ task: _id });
        if (questions && questions.length > 0) {
            for (const q of questions) {
                const deleted = await funcDeleteQuestion(q._id); // Use funcDeleteQuestion
                if (!deleted) {
                    console.error(`Failed to delete question with ID: ${q._id}`);
                    return false; // If any question deletion fails, return false
                }
            }
        }

        // Delete all user tasks associated with the task
        const userTasks = await UserTask.find({ task: _id });
        if (userTasks && userTasks.length > 0) {
            for (const userTask of userTasks) {
                const deleted = await funcDeleteUserTask(userTask._id); // Use funcDeleteUserTask
                if (!deleted) {
                    console.error(`Failed to delete user task with ID: ${userTask._id}`);
                    return false; // If any user task deletion fails, return false
                }
            }
        }

        // Delete the task itself
        const deletedTask = await task.deleteOne();
        if (!deletedTask) {
            console.error(`Failed to delete task with ID: ${_id}`);
            return false;
        }

        console.log(`Successfully deleted task with ID: ${_id}`);
        return true; // All deletions were successful
    } catch (error) {
        console.error(`Error in funcDeleteTask: ${error.message}`);
        return false; // Return false if an error occurs
    }
};

//delete
const deleteTask = async (req, res) => {
    const { _id } = req.params; // Extract the task ID from the request parameters
    if (!_id) {
        return res.status(400).send('Error in deleteTask: Missing _id'); // Validate input
    }

    try {
        const deleted = await funcDeleteTask(_id); // Await the result of funcDeleteTask
        if (!deleted) {
            return res.status(400).send('Error in deleteTask: Failed to delete task'); // Handle failure
        }

        return res.status(200).send(`Task  deleted successfully!`); // Success response
    } catch (error) {
        console.error(`Error in deleteTask: ${error.message}`); // Log unexpected errors
        return res.status(500).send('Server error in deleteTask'); // Internal server error response
    }
};

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
        return res.status(400).send('error in getTaskAccordingLesson--missing id')
    const task=await Task.findOne({lesson:_id})   
    // if(!task)
    //     // return res.status(400).send('error in getTaskAccordingLesson--there is no task')
    // return res.json({name:"Chani"})
    if(!task)
        console.log("there is no task according to this lesson");
          
return res.json(task)
}   

module.exports = { deleteTask, funcDeleteTask,updateLesson,createTask,getAlltasks,getByIdTask,getTaskAccordingLesson }