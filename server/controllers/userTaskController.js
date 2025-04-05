const UserTask = require('../models/UserTask')
const { funcDeleteAnswer } = require('./answerController')
const {Feedback }=require('../models/Feedback')
//create-all the answers of one user

const createUserTask = async (req, res) => {
   const { user, task, answers } = req.body
   if (!user || !task || !answers)
      return res.status(400).send('error in createUserTask')
   const userTask = await UserTask.create({ user, task, answers })
   if (!userTask)
      return res.status(400).send('error in createUserTask')
   return res.status(200).send('UserTask created')
}


//delete func
const funcDeleteUserTask = async (_id) => {
   const userTask = await UserTask.findById(_id)
   if (!userTask)
      return true//there is no usertask like this
   const answers=userTask.answers
   if(answers)
   {
      answers.forEach(answer=>{if(!funcDeleteAnswer(answer._id))return false})
   }
   const feedback=await Feedback.findOne({userTask:_id})
   if(feedback)
   {
      const deleted=await feedback.deleteOne()
      if(deleted.deleteCount!=1)
         {
            console.log('dont succeed delete feedback');       
            return false
         }
   }
   const deleted = await userTask.deleteOne()
   if (deleted.deleteCount != 1)
      return false
   return true
}

//delete
const deleteUserTask = async (req, res) => {
   const { _id } = req.body
   if (!_id)
      return res.status(400).send('error in deleteUserTask')
   if (!funcDeleteUserTask(_id))
      res.status(400).send('error in deleteUserTask')
   return res.status(200).send('userTask deleted')
}

module.exports = { deleteUserTask, funcDeleteUserTask, createUserTask }