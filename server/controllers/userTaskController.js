const UserTask=require('../models/UserTask')
const Task=require('../models/Task')
const {funcDeleteTask}=require('./taskController')

//create-all the answers of one user
const createUserTask=async(req,res)=>{
    const{user,task,answers}=req.body
    if(!user||!task||!answers)
        return res.status(400).send('error in createUserTask')
 const userTask=await UserTask.create({user,task,answers})
 if(!userTask)
    return res.status(400).send('error in createUserTask')
 return res.status(200).send('UserTask created')
}


//delete func
const funcDeleteUserTask=async(_id)=>{
const userTask=await UserTask.findById(_id)
const user_id=userTask.user
const tasks=await Task.find({user:user_id})
if(tasks)
   {
      tasks.forEach(async task=> {
         const deleted=await task.deleteOne()
         if(deleted.deleteCount!=1)
            return false
      });
   }
if(!userTask)
   return false
const deleted=await userTask.deleteOne()
if(deleted.deleteCount!=1)
    return false
   if(!task)
      return false
return true
}

//delete
const deleteUserTask=async(req,res)=>{
    const{_id}=req.body
    if(!_id)
        return res.status(400).send('error in deleteUserTask')
  if(! await funcDeleteUserTask(_id))
     res.status(400).send('error in deleteUserTask')
  return res.status(200).send('userTask deleted')
}

module.exports={deleteUserTask,funcDeleteUserTask,createUserTask}